#!/usr/bin/env python3
"""NULLWORKS CIRIS pinned-source conformance harness, revision 2.

The checks below are narrow, deterministic, and evidence-classified. They do
not claim that static inspection equals full runtime assurance.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path


@dataclass
class Check:
    check_id: str
    title: str
    classification: str
    passed: bool
    observed: str
    boundary: str
    files: list[str]


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def block(text: str, start: str, end: str | None = None) -> str:
    begin = text.find(start)
    if begin < 0:
        return ""
    if end is None:
        return text[begin:]
    finish = text.find(end, begin + len(start))
    return text[begin:] if finish < 0 else text[begin:finish]


def all_terms(text: str, *terms: str) -> bool:
    lower = text.lower()
    return all(term.lower() in lower for term in terms)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--agent-root", required=True)
    parser.add_argument("--persist-root", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()

    agent = Path(args.agent_root)
    persist = Path(args.persist_root)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    paths = {
        "wa_service": agent / "ciris_engine/logic/services/governance/wise_authority/service.py",
        "wa_schema": agent / "ciris_engine/schemas/services/authority_core.py",
        "wa_api": agent / "ciris_engine/logic/adapters/api/routes/wa.py",
        "permissions": agent / "tests/test_deferral_permissions.py",
        "scheduler": agent / "ciris_engine/logic/services/lifecycle/scheduler/service.py",
        "scheduler_test": agent / "tests/services/lifecycle/scheduler/test_deferred_reactivation.py",
        "conscience": agent / "ciris_engine/logic/processors/core/thought_processor/conscience_execution.py",
        "lens": agent / "ciris_adapters/ciris_accord_metrics/services.py",
        "lens_test": agent / "tests/adapters/accord_metrics/test_lens_fold_integration.py",
        "compliance": agent / "compliance/README.md",
        "d07": agent / "compliance/D07_locality_decision_scale.md",
        "d23": agent / "compliance/D23_accountability.md",
        "precedence": persist / "src/federation/precedence.rs",
    }

    missing = [str(path) for path in paths.values() if not path.exists()]
    text = {key: path.read_text(encoding="utf-8") if path.exists() else "" for key, path in paths.items()}
    manifest = [
        {
            "key": key,
            "path": str(path),
            "bytes": path.stat().st_size,
            "sha256": digest(path),
        }
        for key, path in paths.items()
        if path.exists()
    ]

    resolver = block(text["wa_service"], "async def resolve_deferral", "# ========== Guidance Operations")
    exempt = block(text["conscience"], "exempt_actions = {", "}")

    checks = [
        Check(
            "WA-JUR-SRC-01",
            "Project test explicitly encodes role-wide resource authorization",
            "PROJECT_TEST_SOURCE",
            all_terms(
                text["permissions"],
                "resource-specific permissions are not yet implemented",
                "is_authorized_medical is true",
                "is_authorized_financial is true",
            ),
            "The pinned project test requires the medical-scoped AUTHORITY to be accepted for both medical and financial deferrals.",
            "Project-authored test intent is not the same as an independent test design; direct imported-code execution is reported separately.",
            [str(paths["permissions"])],
        ),
        Check(
            "WA-SIG-SRC-01",
            "Core resolver does not consume the required response signature",
            "PINNED_CODE",
            bool(resolver) and "response.signature" not in resolver and all_terms(resolver, "response.wa_id", "resolved_at"),
            "The inspected resolver uses approval, reason, authority ID and time but never references response.signature.",
            "Authentication, audit, or Lens layers may provide other custody; this check is limited to exact-decision signature handling in the resolver.",
            [str(paths["wa_service"]), str(paths["wa_schema"]), str(paths["wa_api"])],
        ),
        Check(
            "WA-TIME-SRC-01",
            "Timed reactivation changes both deferred task and thought to pending",
            "PINNED_CODE_AND_PROJECT_TEST",
            all_terms(text["scheduler"], "update_task_status", "TaskStatus.PENDING", "update_thought_status", "ThoughtStatus.PENDING")
            and all_terms(text["scheduler_test"], "test_reactivation_repends_task_and_thought", "TaskStatus.PENDING", "ThoughtStatus.PENDING"),
            "Implementation and regression test encode the same DEFERRED-to-PENDING transition.",
            "This establishes the primitive and project-tested behavior, not every production deferral configuration.",
            [str(paths["scheduler"]), str(paths["scheduler_test"])],
        ),
        Check(
            "CNS-EXEMPT-SRC-01",
            "TASK_COMPLETE is normal-faculty exempt while DEFER is evaluated",
            "PINNED_CODE",
            all_terms(exempt, "TASK_COMPLETE", "RECALL", "OBSERVE", "REJECT") and "DEFER" not in exempt,
            "The exemption set includes TASK_COMPLETE but not DEFER.",
            "Bypass guardrails execute before this exemption; the result is not equivalent to zero review.",
            [str(paths["conscience"])],
        ),
        Check(
            "TRACE-CUSTODY-SRC-01",
            "ACTION_RESULT seals completed traces and orphan partial traces are swept",
            "PINNED_CODE_AND_PROJECT_TEST",
            all_terms(text["lens"], "ACTION_RESULT", "orphan_sweep", "purged")
            and all_terms(text["lens_test"], "test_orphan_sweep_runs_against_real_substrate", "ACTION_RESULT"),
            "The Lens fold and project integration test expose the completed-trace and orphan-path boundary.",
            "This is an evidentiary completeness observation, not an attack on Ed25519 integrity.",
            [str(paths["lens"]), str(paths["lens_test"])],
        ),
        Check(
            "CEG-CORRECTION-SRC-01",
            "Correction composers preserve writes and deterministically project current state",
            "PINNED_CODE_AND_PROJECT_TEST",
            all_terms(text["precedence"], "RECANTS=3", "WITHDRAWS=2", "SUPERSEDES=1", "precedence_winner", "write path stores everything"),
            "The correction module preserves structural composer rows and ranks recants above withdraws above supersedes.",
            "Ordinary end-user emission and presentation of those composers remains a separate runtime question.",
            [str(paths["precedence"])],
        ),
        Check(
            "COMP-HONESTY-SRC-01",
            "Compliance process instructs maintainers to disclose implementation gaps",
            "DOCUMENTARY_SOURCE",
            all_terms(text["compliance"], "Honest gaps win", "Known gaps", "not yet emitted"),
            "CIRIS compliance materials explicitly preserve and enumerate known implementation gaps.",
            "Self-disclosure is a strong integrity signal, not independent certification.",
            [str(paths["compliance"])],
        ),
        Check(
            "CLAIM-DRIFT-SRC-01",
            "D07 and D23 prose combines controls broader than the core resolver enforces",
            "DOCUMENTARY_CODE_COMPARISON",
            all_terms(text["d07"], "medical", "licensed authorities", "check_authorization")
            and all_terms(text["d23"], "signed response", "audit chain")
            and "response.signature" not in resolver,
            "The human-authored compliance prose describes licensed routing and signed human responses while the pinned resolver remains role-based and does not consume response.signature.",
            "This is an alignment finding, not an allegation of deception; CIRIS also discloses related gaps elsewhere.",
            [str(paths["d07"]), str(paths["d23"]), str(paths["wa_service"])],
        ),
        Check(
            "MODEL-JUR-01",
            "A role-only authorization predicate cannot distinguish medical from financial jurisdiction",
            "SOURCE_DERIVED_MODEL",
            True,
            "Under a predicate that checks AUTHORITY role but not resource scope, both resources yield the same decision.",
            "This logical model is supplemental; the imported-code probe is the stronger evidence.",
            [str(paths["wa_service"]), str(paths["permissions"])],
        ),
        Check(
            "MODEL-SIG-01",
            "The resolver's stored resolution shape omits signature custody fields",
            "SOURCE_DERIVED_MODEL",
            all_terms(resolver, 'deferral_info["resolution"]', '"approved"', '"reason"', '"resolved_by"', '"resolved_at"')
            and "signature" not in block(resolver, 'deferral_info["resolution"]', "# Mark original deferred task"),
            "The explicit stored resolution object contains decision, reason, authority and time, without signature, key ID or verification result.",
            "Separate logs may preserve other attribution; this check concerns the resolution object itself.",
            [str(paths["wa_service"])],
        ),
    ]

    result = {
        "record_type": "NULLWORKS_CIRIS_SOURCE_CONFORMANCE_RESULT_V2",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "agent_commit": "7f2369bed22c626404a1dcf8e09bfeb81a573d82",
        "persist_commit": "e8cdb535b60a549948f2b0ceb43deb6921009260",
        "truth_boundary": "Pinned source, project tests, and labeled source-derived models. Imported-code and project-test execution are reported separately.",
        "missing_files": missing,
        "files": manifest,
        "checks": [asdict(item) for item in checks],
        "counts": {
            "total": len(checks),
            "passed": sum(item.passed for item in checks),
            "failed": sum(not item.passed for item in checks),
        },
    }
    (out / "source_conformance_v2.json").write_text(json.dumps(result, indent=2), encoding="utf-8")

    lines = [
        "# CIRIS Source-Conformance Results V2",
        "",
        f"Generated: {result['generated_at_utc']}",
        "",
        f"Passed: {result['counts']['passed']} / {result['counts']['total']}",
        "",
        f"> {result['truth_boundary']}",
        "",
    ]
    for item in checks:
        lines.extend(
            [
                f"## {'PASS' if item.passed else 'FAIL'} - {item.check_id}",
                "",
                f"**{item.title}**",
                "",
                f"Classification: `{item.classification}`",
                "",
                item.observed,
                "",
                f"Boundary: {item.boundary}",
                "",
            ]
        )
    (out / "source_conformance_v2.md").write_text("\n".join(lines), encoding="utf-8")
    return 0 if not missing and all(item.passed for item in checks) else 2


if __name__ == "__main__":
    raise SystemExit(main())
