"""Export mudra_model.pkl (a scikit-learn HistGradientBoostingClassifier) to a
compact binary the browser can load, so the classifier can run on-device.

Usage (from the repo root):  python tools/export_model_for_browser.py
Writes frontend/public/model/mudra_trees.bin and mudra_meta.json.

Re-run this whenever mudra_model.pkl is retrained.
"""
import json
import os
import pickle
import sys

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "frontend", "public", "model")


def main():
    with open(os.path.join(ROOT, "mudra_model.pkl"), "rb") as f:
        saved = pickle.load(f)
    clf = saved["model"]
    classes = [str(c) for c in saved["label_encoder"].classes_]

    n_classes = clf.n_trees_per_iteration_
    assert n_classes == len(classes), "one tree per class per iteration expected"
    assert clf.loss == "log_loss", "softmax over raw scores assumed"

    trees = [tree for iteration in clf._predictors for tree in iteration]
    for t in trees:
        assert not t.nodes["is_categorical"].any(), "categorical splits are not supported"

    nodes = np.concatenate([t.nodes for t in trees])
    tree_start = np.zeros(len(trees) + 1, dtype=np.int32)
    tree_start[1:] = np.cumsum([len(t.nodes) for t in trees])

    n = len(nodes)
    sections = [
        ("threshold", nodes["num_threshold"].astype("<f8")),
        ("value", nodes["value"].astype("<f8")),
        ("left", nodes["left"].astype("<i4")),
        ("right", nodes["right"].astype("<i4")),
        ("treeStart", tree_start.astype("<i4")),
        ("feature", nodes["feature_idx"].astype("<i2")),
        ("isLeaf", nodes["is_leaf"].astype("u1")),
        ("missingLeft", nodes["missing_go_to_left"].astype("u1")),
    ]

    blob = bytearray()
    layout = {}
    for name, arr in sections:
        while len(blob) % 8:
            blob.append(0)
        layout[name] = {"offset": len(blob), "length": int(arr.shape[0])}
        blob += arr.tobytes()

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, "mudra_trees.bin"), "wb") as f:
        f.write(blob)

    meta = {
        "classes": classes,
        "nFeatures": int(clf.n_features_in_),
        "nClasses": n_classes,
        "nTrees": len(trees),
        "nNodes": int(n),
        "baseline": [float(x) for x in np.ravel(clf._baseline_prediction)],
        "layout": layout,
    }
    with open(os.path.join(OUT_DIR, "mudra_meta.json"), "w") as f:
        json.dump(meta, f)

    print(f"{len(trees)} trees, {n} nodes, {len(blob) / 1e6:.2f} MB -> {OUT_DIR}")


if __name__ == "__main__":
    sys.exit(main())
