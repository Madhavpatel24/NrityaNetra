import type { HandLandmarker } from "@mediapipe/tasks-vision"

// Keep in step with the @mediapipe/tasks-vision version in package.json: the
// WASM files must match the JS library.
const TASKS_VISION_VERSION = "1.1.0"
const WASM_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VISION_VERSION}/wasm`
const MODEL_URL = "/model/hand_landmarker_float16.task"

export type CreatedLandmarker = {
  landmarker: HandLandmarker
  delegate: "GPU" | "CPU"
}

// Prefers the GPU (WebGL) and falls back to the CPU if the browser can't
// provide it, so detection still works on every device.
//
// Defaults to IMAGE mode on purpose: every frame is detected from scratch, the
// same way the model's accuracy was measured. VIDEO mode tracks the hand from
// the previous frame and can stay locked on a stale position (seen in testing:
// a confident wrong answer after the hand changed abruptly).
export async function createHandLandmarker(
  runningMode: "VIDEO" | "IMAGE" = "IMAGE",
  preferred: "GPU" | "CPU" = "GPU"
): Promise<CreatedLandmarker> {
  const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision")
  const vision = await FilesetResolver.forVisionTasks(WASM_URL)

  const make = (delegate: "GPU" | "CPU") =>
    HandLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate },
      runningMode,
      numHands: 1,
    })

  if (preferred === "GPU") {
    try {
      return { landmarker: await make("GPU"), delegate: "GPU" }
    } catch {
      // fall through to CPU
    }
  }
  return { landmarker: await make("CPU"), delegate: "CPU" }
}
