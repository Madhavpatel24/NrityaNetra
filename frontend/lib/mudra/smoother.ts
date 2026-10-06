// Decides when a live prediction is stable enough to show as the answer.
//
// The server version counted a fixed 8 frames, which only made sense at its
// ~3 frames/second. On-device the frame rate is 10x higher and varies by
// device, so the rule is expressed in time instead: the same mudra must be the
// confident top prediction in at least `ratio` of the frames seen over the
// last `windowMs`.

type Entry = { t: number; label: string | null }

export class PredictionSmoother {
  private entries: Entry[] = []
  private windowMs: number
  private minFrames: number
  private minConfidence: number
  private ratio: number

  constructor(windowMs = 800, minFrames = 5, minConfidence = 0.5, ratio = 0.75) {
    this.windowMs = windowMs
    this.minFrames = minFrames
    this.minConfidence = minConfidence
    this.ratio = ratio
  }

  update(label: string | null, confidence: number, nowMs: number): string | null {
    const accepted = label !== null && confidence >= this.minConfidence ? label : null
    this.entries.push({ t: nowMs, label: accepted })

    while (this.entries.length && nowMs - this.entries[0].t > this.windowMs) {
      this.entries.shift()
    }

    if (this.entries.length < this.minFrames) return null
    // the window must be mostly full, so a brief burst of frames can't confirm
    if (nowMs - this.entries[0].t < this.windowMs * 0.7) return null

    const counts = new Map<string, number>()
    for (const e of this.entries) {
      if (e.label !== null) counts.set(e.label, (counts.get(e.label) ?? 0) + 1)
    }
    let top: string | null = null
    let topCount = 0
    for (const [l, c] of counts) {
      if (c > topCount) {
        top = l
        topCount = c
      }
    }
    return topCount >= Math.ceil(this.ratio * this.entries.length) ? top : null
  }

  reset() {
    this.entries = []
  }
}
