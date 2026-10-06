// Runs the exported scikit-learn HistGradientBoostingClassifier in the browser.
// The tree layout is produced by tools/export_model_for_browser.py; prediction
// follows scikit-learn's own rules (go left when x <= threshold, NaN follows the
// stored default direction, leaf values are summed per class, then softmax).

export type ClassifierMeta = {
  classes: string[]
  nFeatures: number
  nClasses: number
  nTrees: number
  nNodes: number
  baseline: number[]
  layout: Record<string, { offset: number; length: number }>
}

export class TreeClassifier {
  readonly classes: string[]
  private meta: ClassifierMeta
  private threshold: Float64Array
  private value: Float64Array
  private left: Int32Array
  private right: Int32Array
  private treeStart: Int32Array
  private feature: Int16Array
  private isLeaf: Uint8Array
  private missingLeft: Uint8Array

  constructor(meta: ClassifierMeta, buffer: ArrayBuffer) {
    this.meta = meta
    this.classes = meta.classes
    const L = meta.layout
    this.threshold = new Float64Array(buffer, L.threshold.offset, L.threshold.length)
    this.value = new Float64Array(buffer, L.value.offset, L.value.length)
    this.left = new Int32Array(buffer, L.left.offset, L.left.length)
    this.right = new Int32Array(buffer, L.right.offset, L.right.length)
    this.treeStart = new Int32Array(buffer, L.treeStart.offset, L.treeStart.length)
    this.feature = new Int16Array(buffer, L.feature.offset, L.feature.length)
    this.isLeaf = new Uint8Array(buffer, L.isLeaf.offset, L.isLeaf.length)
    this.missingLeft = new Uint8Array(buffer, L.missingLeft.offset, L.missingLeft.length)
  }

  predictProba(features: ArrayLike<number>): Float64Array {
    const { nTrees, nClasses, baseline } = this.meta
    const scores = Float64Array.from(baseline)

    for (let t = 0; t < nTrees; t++) {
      const start = this.treeStart[t]
      let i = 0
      while (!this.isLeaf[start + i]) {
        const n = start + i
        const x = features[this.feature[n]]
        if (Number.isNaN(x)) {
          i = this.missingLeft[n] ? this.left[n] : this.right[n]
        } else {
          i = x <= this.threshold[n] ? this.left[n] : this.right[n]
        }
      }
      scores[t % nClasses] += this.value[start + i]
    }

    let max = -Infinity
    for (let k = 0; k < nClasses; k++) if (scores[k] > max) max = scores[k]
    let sum = 0
    for (let k = 0; k < nClasses; k++) {
      scores[k] = Math.exp(scores[k] - max)
      sum += scores[k]
    }
    for (let k = 0; k < nClasses; k++) scores[k] /= sum
    return scores
  }

  predict(features: ArrayLike<number>): { label: string; confidence: number } {
    const probs = this.predictProba(features)
    let best = 0
    for (let k = 1; k < probs.length; k++) if (probs[k] > probs[best]) best = k
    return { label: this.classes[best], confidence: probs[best] }
  }
}

export async function loadClassifier(metaUrl: string, binUrl: string): Promise<TreeClassifier> {
  const [meta, buffer] = await Promise.all([
    fetch(metaUrl).then((r) => r.json() as Promise<ClassifierMeta>),
    fetch(binUrl).then((r) => r.arrayBuffer()),
  ])
  return new TreeClassifier(meta, buffer)
}
