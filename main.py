from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import base64
import cv2
import numpy as np
import tensorflow as tf
import json
import asyncio

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
# Load model ONCE
# ==========================
model = tf.keras.models.load_model(
    "bharatnatyam_model.keras",
    compile=False
)

# ==========================
# Load labels
# ==========================
with open("class_indices.json") as f:
    class_indices = json.load(f)

labels = {int(v): k for k, v in class_indices.items()}

def preprocess(img):
    img = cv2.resize(img, (160, 160))
    img = img.astype("float32") / 255.0
    return np.expand_dims(img, axis=0)

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

    img = preprocess(img)
    preds = model.predict(img, verbose=0)[0]
    idx = int(np.argmax(preds))

    return {
        "label": labels[idx],
        "confidence": float(preds[idx])
    }

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

            img = preprocess(img)

            preds = await asyncio.to_thread(
                model.predict, img, verbose=0
            )

            preds = preds[0]
            idx = int(np.argmax(preds))

            await websocket.send_json({
                "label": labels[idx],
                "confidence": float(preds[idx])
            })

    except WebSocketDisconnect:
        print("❌ WebSocket disconnected")
