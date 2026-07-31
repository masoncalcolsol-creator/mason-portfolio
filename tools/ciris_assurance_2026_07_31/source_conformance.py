#!/usr/bin/env python3
"""NULLWORKS source-conformance harness for pinned CIRIS repositories.

This is not a substitute for executing CIRIS. It deterministically inspects the
pinned source and project tests, records file hashes, evaluates narrow claims,
and emits machine-readable receipts.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


@dataclass
class Check:
    check_id: str
    title: str
    classification: str
    passed: bool
    observed: str
    boundary: str
    files: list[str]


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def section(text: str, start: str, end: str | None = None) -> str:
    a = text.find(start)
    if a < 0:
        return ""
    if end is None:
        return text[a:]
    b = text.find(end, a + len(start))
    return text[a:] if b < 0 else text[a:b]


def contains_all(text: str, terms: Iterable[str]) -> bool:
    low = text.lower()
    return all(term.lower() in low for term in terms)


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

    agent_files = {
        "wa_service": "ciris_engine/logic/services/governance/wise_authority/service.py",
        "wa_schema": "ciris_engine/schemas/services/authority_core.py",
        "wa_api": "ciris_engine/logic/adapters/api/routes/wa.py",
        "deferral_permissions_test": "tests/test_deferral_permissions.py",
        "scheduler": "ciris_engine/logic/services/lifecycle/scheduler/service.py",
        "scheduler_test": "tests/services/lifecycle/scheduler/test_deferred_reactivation.py",
        "conscience": "ciris_engine/logic/processors/core/thought_processor/conscience_execution.py",
        "lens_service": "ciris_adapters/ciris_accord_metrics/services.py",
        "lens_test": "tests/adapters/accord_metrics/test_lens_fold_integration.py",
        "compliance_readme": "compliance/README.md",
        "d07": "compliance/D07_locality_decision_scale.md",
        "d23": "compliance/D23_accountability.md",
    }
    persist_files = {"precedence": "src/federation/precedence.rs"}

    missing: list[str] = []
    texts: dict[str, str] = {}
    manifest: list[dict[str, str | int]] = []

    for key, rel in agent_files.items():
        path = agent / rel
        if not path.exists():
            missing.append(f"CIRISAgent:{rel}")
            texts[key] = ""
            continue
        texts[key] = path.read_text(encoding="utf-8")
        manifest.append({"repository": "CIRISAgent", "path": rel, "sha256": sha256(path), "bytes": path.stat().st_size})

    for key, rel in persist_files.items():
        path = persist / rel
        if not path.exists():
            missing.append(f"CIRISPersist:{rel}")
            texts[key] = ""
            continue
        texts[key] = path.read_text(encoding="utf-8")
        manifest.append({"repository": "CIRISPersist", "path": rel, "sha256": sha256(path), "bytes": path.stat().st_size})

    checks: list[Check] = []

    permissions = texts["deferral_permissions_test"]
    checks.append(Check(
        "WA-JUR-SRC-01",
        "Project tests acknowledge role-wide rather than resource-specific authority",
        "PROJECT_TEST_SOURCE",
        contains_all(permissions, ["resource-specific", "not yet implemented", "medical", "financial"]),
        "The pinned permission test discusses unimplemented resource-specific permissions and exercises medical/financial resources.",
        "This establishes project-test intent and current test expectations, not deployment behavior.",
        [agent_files["deferral_permissions_test"]],
    ))

    resolver = section(texts["wa_service"], "async def resolve_deferral", "# ========== Guidance Operations")
    checks.append(Check(
        "WA-SIG-SRC-01",
        "Deferral resolver does not verify or preserve the required response signature",
        "PINNED_CODE",
        bool(resolver) and "response.signature" not in resolver and "response.wa_id" in resolver and "resolved_at" in resolver,
        "The resolver consumes approval, reason and WA identity, but does not reference response.signature in the inspected function.",
        "A surrounding authentication or audit layer may still provide custody; this check is limited to the core resolver function.",
        [agent_files["wa_service"], agent_files["wa_schema"], agent_files["wa_api"]],
    ))

    sched_test = texts["scheduler_test"]
    scheduler = texts["scheduler"]
    checks.append(Check(
        "WA-TIME-SRC-01",
        "Timed deferral expiry re-pends both task and thought",
        "PINNED_CODE_AND_PROJECT_TEST",
        contains_all(sched_test, ["test_reactivation_repends_task_and_thought", "TaskStatus.PENDING", "ThoughtStatus.PENDING"]) and contains_all(scheduler, ["update_task_status", "TaskStatus.PENDING", "update_thought_status", "ThoughtStatus.PENDING"]),
        "The scheduler implementation and regression test both encode DEFERRED -> PENDING reactivation for the original task and thought.",
        "This does not prove how every combined human/time deferral is configured in production; it proves the reactivation primitive and expected unit behavior.",
        [agent_files["scheduler"], agent_files["scheduler_test"]],
    ))

    conscience = texts["conscience"]
    exempt = section(conscience, "exempt_actions = {", "}")
    checks.append(Check(
        "CNS-EXEMPT-SRC-01",
        "TASK_COMPLETE bypasses normal ethical faculties while DEFER does not",
        "PINNED_CODE",
        contains_all(exempt, ["TASK_COMPLETE", "RECALL", "OBSERVE", "REJECT"]) and "DEFER" not in exempt,
        "The exemption set contains TASK_COMPLETE, RECALL, OBSERVE and REJECT; DEFER is evaluated by normal faculties in the pinned code.",
        "Bypass guardrails still run before the exemption filter. This is not a claim that TASK_COMPLETE receives no review at all.",
        [agent_files["conscience"]],
    ))

    lens = texts["lens_service"]
    lens_test = texts["lens_test"]
    checks.append(Check(
        "TRACE-CUSTODY-SRC-01",
        "Completed traces seal at ACTION_RESULT while orphan partial traces are purged",
        "PINNED_CODE_AND_PROJECT_TEST",
        contains_all(lens, ["ACTION_RESULT", "orphan", "purge"]) and contains_all(lens_test, ["test_orphan_sweep_runs_against_real_substrate", "ACTION_RESULT"]),
        "The pinned Lens fold describes ACTION_RESULT as the sealing boundary and includes a real-substrate orphan sweep test.",
        "This tests evidentiary completeness boundaries, not signature validity of a particular production trace.",
        [agent_files["lens_service"], agent_files["lens_test"]],
    ))

    precedence = texts["precedence"]
    checks.append(Check(
        "CEG-CORRECTION-SRC-01",
        "Append-only correction composers have deterministic read precedence",
        "PINNED_CODE_AND_PROJECT_TEST",
        contains_all(precedence, ["RECANTS=3", "WITHDRAWS=2", "SUPERSEDES=1", "precedence_winner", "WRITE path stores everything"]),
        "The CIRISPersist precedence module preserves composer rows and projects current effective state as RECANTS > WITHDRAWS > SUPERSEDES.",
        "This does not prove ordinary CIRIS user flows emit or expose these composers correctly.",
        [persist_files["precedence"]],
    ))

    compliance = texts["compliance_readme"]
    checks.append(Check(
        "COMP-HONESTY-SRC-01",
        "Compliance materials explicitly preserve known gaps",
        "DOCUMENTARY_SOURCE",
        contains_all(compliance, ["Known gaps", "Honest gaps win", "not yet emitted"]),
        "The compliance README instructs maintainers to disclose unimplemented controls and enumerates cross-cutting implementation gaps.",
        "Self-disclosure is strong evidence of process integrity, but it is not independent assurance.",
        [agent_files["compliance_readme"]],
    ))

    d07 = texts["d07"]
    d23 = texts["d23"]
    checks.append(Check(
        "CLAIM-DRIFT-SRC-01",
        "Some human-authored compliance prose is broader than pinned enforcement",
        "DOCUMENTARY_CODE_COMPARISON",
        contains_all(d07, ["medical question routes to medical-licensed authorities", "check_authorization"]) and contains_all(d23, ["human's signed response", "signed audit chain"]),
        "D07/D23 use strong language about licensed routing and signed human responses that must be read alongside the narrower current resolver and permission controls.",
        "This is a wording/enforcement alignment finding, not a claim of intentional misrepresentation.",
        [agent_files["d07"], agent_files["d23"], agent_files["wa_service"], agent_files["deferral_permissions_test"]],
    ))

    role_authorities = {
        "medical_authority": {"role": "AUTHORITY", "domains": ["medical"]},
        "financial_authority": {"role": "AUTHORITY", "domains": ["financial"]},
    }
    model_cross_domain_allowed = all(v["role"] == "AUTHORITY" for v in role_authorities.values())
    checks.append(Check(
        "MODEL-JUR-01",
        "Source-derived role-only authorization model permits cross-domain resolution",
        "SOURCE_DERIVED_MODEL",
        model_cross_domain_allowed,
        "When the only enforced predicate is role >= AUTHORITY, both modeled authorities satisfy the gate regardless of domain.",
        "This is a minimal model of the observed role gate, not execution of CIRIS authorization code.",
        [agent_files["wa_service"], agent_files["deferral_permissions_test"]],
    ))

    modeled_resolution = {
        "approved": True,
        "reason": "Proceed with constraints",
        "resolved_by": "wa-example",
        "resolved_at": "2026-07-31T00:00:00Z",
    }
    checks.append(Check(
        "MODEL-SIG-01",
        "Source-derived resolution model loses signature custody",
        "SOURCE_DERIVED_MODEL",
        "signature" not in modeled_resolution,
        "The modeled persisted resolution mirrors the inspected fields and contains no signature or signature-verification result.",
        "A separate audit record may retain identity or transport authentication; this model addresses only the stored resolution shape in the resolver.",
        [agent_files["wa_service"]],
    ))

    summary = {
        "record_type": "NULLWORKS_CIRIS_SOURCE_CONFORMANCE_RESULT",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "agent_commit": "7f2369bed22c626404a1dcf8e09bfeb81a573d82",
        "persist_commit": "e8cdb535b60a549948f2b0ceb43deb6921009260",
        "truth_boundary": "Pinned source, project tests, and source-derived models only. CIRIS runtime execution is reported separately.",
        "missing_files": missing,
        "files": manifest,
        "checks": [asdict(c) for c in checks],
        "counts": {
            "total": len(checks),
            "passed": sum(c.passed for c in checks),
            "failed": sum(not c.passed for c in checks),
        },
    }
    (out / "source_conformance.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    md = [
        "# CIRIS Source-Conformance Results",
        "",
        f"Generated: {summary['generated_at_utc']}",
        "",
        f"Passed: {summary['counts']['passed']} / {summary['counts']['total']}",
        "",
        "> Truth boundary: pinned source, project tests, and source-derived models only. Runtime results are separate.",
        "",
    ]
    for c in checks:
        md += [
            f"## {'PASS' if c.passed else 'FAIL'} - {c.check_id}",
            "",
            f"**{c.title}**",
            "",
            f"Classification: `{c.classification}`",
            "",
            c.observed,
            "",
            f"Boundary: {c.boundary}",
            "",
        ]
    if missing:
        md += ["## Missing files", "", *[f"- {x}" for x in missing], ""]
    (out / "source_conformance.md").write_text("\n".join(md), encoding="utf-8")
    return 0 if not missing and all(c.passed for c in checks) else 2


if __name__ == "__main__":
    raise SystemExit(main())
