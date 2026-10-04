from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import base64
import cv2
import numpy as np
import pickle
import asyncio
import os
import urllib.request
import math
from collections import deque, Counter

import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision

app = FastAPI()



# ==========================
# CORS (REQUIRED)
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Load hand landmark model ONCE (download if not present)
# ==========================
HAND_LANDMARKER_PATH = "hand_landmarker.task"
HAND_LANDMARKER_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"

if not os.path.exists(HAND_LANDMARKER_PATH):
    urllib.request.urlretrieve(HAND_LANDMARKER_URL, HAND_LANDMARKER_PATH)

base_options = mp_python.BaseOptions(model_asset_path=HAND_LANDMARKER_PATH)
hand_options = mp_vision.HandLandmarkerOptions(base_options=base_options, num_hands=1)
hand_detector = mp_vision.HandLandmarker.create_from_options(hand_options)

# ==========================
# Load mudra classifier ONCE
# ==========================
with open("mudra_model.pkl", "rb") as f:
    _saved = pickle.load(f)

classifier = _saved["model"]
label_encoder = _saved["label_encoder"]

# ==========================
# Landmark feature extraction
# (must match the feature engineering used at training time)
# ==========================
FINGER_JOINTS = {
    "thumb":  [1, 2, 3, 4],
    "index":  [5, 6, 7, 8],
    "middle": [9, 10, 11, 12],
    "ring":   [13, 14, 15, 16],
    "pinky":  [17, 18, 19, 20],
}
FINGERTIPS = [4, 8, 12, 16, 20]


def normalize_2d_coords(coords):
    wrist = coords[0]
    coords = coords - wrist
    ref = coords[9]
    angle = np.arctan2(ref[0], -ref[1])
    cos_a, sin_a = np.cos(-angle), np.sin(-angle)
    rot = np.array([[cos_a, -sin_a], [sin_a, cos_a]])
    coords[:, :2] = coords[:, :2] @ rot.T
    scale = np.linalg.norm(coords[9])
    if scale > 0:
        coords = coords / scale
    return coords


def angle_between(p1, p2, p3):
    v1, v2 = p1 - p2, p3 - p2
    cos_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-8)
    return np.arccos(np.clip(cos_angle, -1, 1))


def finger_state(avg_angle_rad):
    deg = np.degrees(avg_angle_rad)
    if deg < 90:
        return 0  # closed
    elif deg < 150:
        return 1  # half-open
    else:
        return 2  # fully open


def compute_engineered_features(coords):
    features = []
    finger_angle_pairs = []
    for idxs in FINGER_JOINTS.values():
        pair_angles = []
        for i in range(len(idxs) - 2):
            a = angle_between(coords[idxs[i]], coords[idxs[i + 1]], coords[idxs[i + 2]])
            features.append(a)
            pair_angles.append(a)
        finger_angle_pairs.append(np.mean(pair_angles))

    for i in range(len(FINGERTIPS)):
        for j in range(i + 1, len(FINGERTIPS)):
            features.append(np.linalg.norm(coords[FINGERTIPS[i]] - coords[FINGERTIPS[j]]))
    for idx in FINGERTIPS:
        features.append(np.linalg.norm(coords[idx]))

    for avg_angle in finger_angle_pairs:
        features.append(finger_state(avg_angle))

    return np.array(features)


def extract_mudra_features(img_bgr):
    """Returns a 93-dim feature vector for the detected hand, or None if no hand found."""
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)
    result = hand_detector.detect(mp_image)

    if not result.hand_landmarks:
        return None

    coords = np.array([[lm.x, lm.y, lm.z] for lm in result.hand_landmarks[0]])
    coords = normalize_2d_coords(coords)
    return np.concatenate([coords.flatten(), compute_engineered_features(coords)])


def predict_mudra(img_bgr):
    features = extract_mudra_features(img_bgr)
    if features is None:
        return {"label": None, "confidence": 0.0, "error": "No hand detected"}

    probs = classifier.predict_proba(features.reshape(1, -1))[0]
    idx = int(np.argmax(probs))
    label = label_encoder.classes_[idx]

    return {"label": str(label), "confidence": float(probs[idx])}


# ==========================
# REALTIME SMOOTHING
# ==========================
SMOOTHING_WINDOW = 8       # frames considered for a "confirmed" prediction
CONFIDENCE_THRESHOLD = 0.5  # below this, a frame's prediction is treated as unknown
CONFIRM_RATIO = 0.75        # fraction of the window that must agree to confirm


class PredictionSmoother:
    """Tracks a rolling window of per-frame predictions for one connection and
    only reports a mudra as "confirmed" once it has been the consistent
    top prediction across most of the recent frames — avoids flickering
    between labels as a held pose is captured frame by frame."""

    def __init__(self, window_size=SMOOTHING_WINDOW):
        self.window = deque(maxlen=window_size)

    def update(self, label, confidence):
        accepted = label if (label is not None and confidence >= CONFIDENCE_THRESHOLD) else None
        self.window.append(accepted)

        if len(self.window) < self.window.maxlen:
            return None  # not enough frames yet to confirm anything

        counts = Counter(l for l in self.window if l is not None)
        if not counts:
            return None

        top_label, top_count = counts.most_common(1)[0]
        if top_count >= math.ceil(CONFIRM_RATIO * len(self.window)):
            return top_label
        return None


# ==========================
# IMAGE PREDICTION
# ==========================
@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Invalid image"}

    return predict_mudra(img)

# ==========================
# REALTIME WEBSOCKET
# ==========================
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ WebSocket connected")

    smoother = PredictionSmoother()

    # The client sends frames faster than a small instance can classify them.
    # Reading and predicting in one loop made frames queue up until the
    # connection was dropped (close code 1006), so frames are read in their
    # own task and only the newest one is ever classified; stale ones are skipped.
    latest_frame = None
    frame_ready = asyncio.Event()

    async def receive_frames():
        nonlocal latest_frame
        while True:
            data = await websocket.receive_json()
            img_bytes = base64.b64decode(data["image"])
            img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
            if img is not None:
                latest_frame = img
                frame_ready.set()

    receiver = asyncio.create_task(receive_frames())

    try:
        while not receiver.done():
            try:
                await asyncio.wait_for(frame_ready.wait(), timeout=1.0)
            except asyncio.TimeoutError:
                continue

            frame_ready.clear()
            img, latest_frame = latest_frame, None

            result = await asyncio.to_thread(predict_mudra, img)
            confirmed_label = smoother.update(result.get("label"), result.get("confidence", 0.0))

            await websocket.send_json({**result, "confirmed_label": confirmed_label})

        receiver.result()  # re-raises WebSocketDisconnect (or the real error)

    except WebSocketDisconnect:
        print("❌ WebSocket disconnected")
    finally:
        receiver.cancel()
        smoother.window.clear()
