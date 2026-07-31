#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path("artifacts")
ROOT.mkdir(exist_ok=True)


def read_exit(name: str):
    path = ROOT / name
    if not path.exists():
        return "NOT_RUN"
    value = path.read_text(encoding="utf-8").strip()
    try:
        return int(value)
    except ValueError:
        return value


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


status = {
    "source_conformance_v2": read_exit("source-conformance-v2.exit"),
    "python_compile": read_exit("python-compile.exit"),
    "pip_install": read_exit("pip-install.exit"),
    "import_smoke": read_exit("import-smoke.exit"),
    "runtime_jurisdiction_probe": read_exit("runtime-jurisdiction-probe.exit"),
    "pytest_collect": read_exit("pytest-collect.exit"),
    "pytest_targeted": read_exit("pytest-targeted.exit"),
    "cargo_precedence": read_exit("cargo-precedence.exit"),
}

files = []
for path in sorted(ROOT.rglob("*")):
    if path.is_file() and path.name != "run_manifest.json":
        files.append(
            {
                "path": str(path),
                "bytes": path.stat().st_size,
                "sha256": digest(path),
            }
        )

manifest = {
    "record_type": "NULLWORKS_CIRIS_ISOLATED_TEST_RUN_V2",
    "generated_at_utc": datetime.now(timezone.utc).isoformat(),
    "github_run_id": os.getenv("GITHUB_RUN_ID"),
    "harness_commit": os.getenv("GITHUB_SHA"),
    "ciris_agent_commit": os.getenv("CIRIS_AGENT_COMMIT"),
    "ciris_persist_commit": os.getenv("CIRIS_PERSIST_COMMIT"),
    "status": status,
    "truth_boundary": (
        "GitHub-hosted isolated runner. Selected CIRIS project tests were independently rerun; "
        "the jurisdiction probe directly executed the pinned core method with mocked dependencies; "
        "source-conformance checks remain documentary/code checks. No result is a production "
        "observation, security certification, or proof of universal correctness."
    ),
    "files": files,
}
(ROOT / "run_manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

lines = [
    "# CIRIS Isolated Test Run V2",
    "",
    f"Generated: {manifest['generated_at_utc']}",
    "",
    "## Step status",
    "",
]
for key, value in status.items():
    lines.append(f"- **{key}:** `{value}`")
lines += ["", "## Truth boundary", "", manifest["truth_boundary"], ""]
(ROOT / "RUN_SUMMARY.md").write_text("\n".join(lines), encoding="utf-8")
