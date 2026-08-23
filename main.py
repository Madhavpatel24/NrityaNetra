from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import base64
import cv2
import numpy as np
import pickle
import asyncio
import os
import urllib.request

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

    try:
        while True:
            data = await websocket.receive_json()
            img_b64 = data["image"]

            img_bytes = base64.b64decode(img_b64)
            np_img = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

            if img is None:
                continue

            result = await asyncio.to_thread(predict_mudra, img)
            await websocket.send_json(result)

    except WebSocketDisconnect:
        print("❌ WebSocket disconnected")
