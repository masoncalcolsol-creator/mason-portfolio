# CIRIS Operational Assurance — Public Proof Stub

**Published by:** NULLWORKS / Mason Perry  
**Published:** August 5, 2026  
**Subject:** CIRISAI / CIRISAgent  
**Status:** Sanitized public proof  
**Review posture:** Read-only, source-preserving, builder-respectful, exact-version pinned

## Purpose

This file proves that NULLWORKS completed a source-pinned operational assurance review of CIRISAgent and preserved reproducible test receipts. It is intentionally narrower than the confidential builder report.

It does **not** publish:

- the full confidential report;
- raw test logs or JUnit files;
- private correspondence;
- the complete NULLWORKS internal assurance method;
- any claim of CIRISAI endorsement, partnership, certification, or production approval.

## Subject pins

- CIRISAgent: `7f2369bed22c626404a1dcf8e09bfeb81a573d82`
- CIRISPersist: `e8cdb535b60a549948f2b0ceb43deb6921009260`
- Review execution date: July 31, 2026

## Evidence reached

| Evidence class | Result |
|---|---|
| Documented | CIRIS public and repository claims were inventoried |
| Code present | Relevant controls were located in pinned source |
| Project tested | Relevant CIRIS-owned tests were identified |
| Independently reproduced | 42 selected tests, 10 source checks, and a direct authority probe were executed |
| Production observed | Not claimed |
| Certified compliant | Not claimed |

## Reproduced results

- **42 / 42** selected CIRIS project tests passed
- **10 / 10** deterministic source-conformance checks passed
- **3 / 3** direct authorization calls completed as preregistered
- JUnit, logs, dependency inventory, source manifests, and SHA-256 checksums were preserved
- A selected CIRISPersist Rust test reached native compilation but required the runner's TPM2-TSS development library; this was recorded as an environment dependency blocker, not counted as a product failure

## Preliminary disposition

**Credible architecture / conditional assurance.**

The reviewed CIRIS revision contains substantive constitutional-AI machinery, including:

- a multi-stage reasoning and conscience pipeline;
- human deferral;
- persistent task lineage;
- domain-aware Wise Authority service routing;
- signed completed-trace custody;
- append-only correction primitives;
- candid compliance and open-gap documentation.

## Sanitized findings

1. **Human authority placement:** domain-aware service routing was meaningful, while the inspected core human authorization result remained broader than resource-specific jurisdiction.
2. **Timeout semantics:** pure scheduling and approval-required deferral should be mechanically distinct so time cannot impersonate authorization.
3. **Decision-signature custody:** the exact human decision signature should be verified and preserved before consequential state mutation.
4. **Incomplete-path receipts:** aborted or incomplete execution paths should produce explicit receipts before partial traces are swept.
5. **Completion semantics:** consequential completion should be supported by terminal evidence, not only an action label.

## Direct authority-boundary probe

The pinned implementation was imported and called directly:

```text
AUTHORITY + medical resource   -> authorized
AUTHORITY + financial resource -> authorized
OBSERVER + medical resource    -> denied
```

Interpretation: the role gate functioned, while the supplied resource did not mechanically narrow the inspected core result.

This is a method-level reproduction. It is not a claim about every external Wise Authority provider or every CIRIS deployment.

## Artifact integrity manifest

| Artifact | SHA-256 |
|---|---|
| Final PDF report | `087cb3335749384472e9dd0b6679ac0fa6e4d1eb4303065192c168c470e69d8d` |
| Editable DOCX report | `5b7621729a6382a05731fdf9bb659c1a6cb0dadf9fbbc9de4e0ddba96a9103f4` |
| Final evidence ZIP | `873d9c5dd80683e4796d733937bd42b7bf85a61393c66a09d67d0f1db100c68e` |

A matching hash proves byte-for-byte artifact identity. It does not independently prove the report's conclusions.

## Public truth boundary

This proof stub does not claim:

- certification;
- statutory compliance approval;
- penetration-test coverage;
- observation of a CIRIS production deployment;
- exploitability;
- universal correctness;
- that later revisions behave identically to the pinned source;
- CIRISAI endorsement of NULLWORKS or this review.

## NULLWORKS assurance pattern

> **Claim → Control → Test → Receipt.**

NULLWORKS independently pressure-tests whether an AI system's operational claims are supported by its architecture, controls, tests, authority structure, and preserved evidence.
