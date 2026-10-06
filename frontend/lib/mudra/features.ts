// Turns the 21 hand landmarks into the 93-number feature vector the classifier
// was trained on. This is a line-by-line port of normalize_2d_coords and
// compute_engineered_features in main.py; the two must stay in step.

export type Landmark = { x: number; y: number; z: number }

const FINGER_JOINTS = [
  [1, 2, 3, 4], // thumb
  [5, 6, 7, 8], // index
  [9, 10, 11, 12], // middle
  [13, 14, 15, 16], // ring
  [17, 18, 19, 20], // pinky
]
const FINGERTIPS = [4, 8, 12, 16, 20]

function norm3(a: number[], b?: number[]): number {
  const dx = a[0] - (b ? b[0] : 0)
  const dy = a[1] - (b ? b[1] : 0)
  const dz = a[2] - (b ? b[2] : 0)
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

function angleBetween(p1: number[], p2: number[], p3: number[]): number {
  const v1 = [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]]
  const v2 = [p3[0] - p2[0], p3[1] - p2[1], p3[2] - p2[2]]
  const dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
  const cos = dot / (norm3(v1) * norm3(v2) + 1e-8)
  return Math.acos(Math.min(1, Math.max(-1, cos)))
}

function fingerState(avgAngleRad: number): number {
  const deg = (avgAngleRad * 180) / Math.PI
  if (deg < 90) return 0 // closed
  if (deg < 150) return 1 // half-open
  return 2 // fully open
}

function normalize(landmarks: ArrayLike<Landmark>): number[][] {
  const wrist = landmarks[0]
  const c: number[][] = []
  for (let i = 0; i < 21; i++) {
    c.push([landmarks[i].x - wrist.x, landmarks[i].y - wrist.y, landmarks[i].z - wrist.z])
  }

  // rotate in the image plane so the wrist-to-middle-knuckle direction is fixed
  const angle = Math.atan2(c[9][0], -c[9][1])
  const cosA = Math.cos(-angle)
  const sinA = Math.sin(-angle)
  for (const p of c) {
    const x = p[0]
    const y = p[1]
    p[0] = x * cosA + y * -sinA
    p[1] = x * sinA + y * cosA
  }

  const scale = norm3(c[9])
  if (scale > 0) {
    for (const p of c) {
      p[0] /= scale
      p[1] /= scale
      p[2] /= scale
    }
  }
  return c
}

export function computeFeatures(landmarks: ArrayLike<Landmark>): Float64Array {
  const c = normalize(landmarks)
  const out: number[] = []

  for (const p of c) out.push(p[0], p[1], p[2])

  const fingerAngles: number[] = []
  for (const idx of FINGER_JOINTS) {
    const a0 = angleBetween(c[idx[0]], c[idx[1]], c[idx[2]])
    const a1 = angleBetween(c[idx[1]], c[idx[2]], c[idx[3]])
    out.push(a0, a1)
    fingerAngles.push((a0 + a1) / 2)
  }

  for (let i = 0; i < FINGERTIPS.length; i++) {
    for (let j = i + 1; j < FINGERTIPS.length; j++) {
      out.push(norm3(c[FINGERTIPS[i]], c[FINGERTIPS[j]]))
    }
  }
  for (const tip of FINGERTIPS) out.push(norm3(c[tip]))

  for (const a of fingerAngles) out.push(fingerState(a))

  return Float64Array.from(out)
}
