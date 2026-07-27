export type Disposition =
  | "Submitted"
  | "Under review"
  | "Accepted"
  | "Accepted with modification"
  | "Rejected"
  | "Deferred";

export type PaperRecord = {
  id: "paper-1" | "paper-2" | "paper-3";
  number: string;
  title: string;
  subtitle: string;
  purpose: string;
  status: string;
  version: string;
  accent: string;
  points: string[];
  hash: string;
  evidenceRoom?: boolean;
};

export type Challenge = {
  id: string;
  label: string;
  contributor: string;
  attribution: string;
  document: string;
  target: string;
  summary: string;
  evidence: string;
  disposition: Disposition;
  sourceVersion: string;
  result: string;
  permission: string;
};

export const papers: PaperRecord[] = [
  {
    id: "paper-1",
    number: "01",
    title: "The Workflow on Paper Was Never the Workflow",
    subtitle: "Empirical field narrative · MUSE thirty-second recovery case",
    purpose: "Wins one bounded empirical argument: the documented workflow differed from the workflow executed at runtime.",
    status: "FINAL RED TEAM WORKING DRAFT",
    version: "0.6",
    accent: "FIELD CASE",
    hash: "0841875e0555812ec497e698ad6a440e519a86dea596184a66c68a9c69bd4ada",
    points: [
      "AI reviewer, confidence-score, and decision-support machinery removed from the field narrative",
      "MUSE still-image receipts are ingested and classified claim by claim",
      "Timing, route distance, authority, and safety remain bounded where receipts are absent",
      "Cross-paper boundary explicitly routes AI influence controls to Papers 2 and 3",
    ],
  },
  {
    id: "paper-2",
    number: "02",
    title: "From Runtime Truth to Operational Recovery",
    subtitle: "Conceptual framework · Living Learning Architecture",
    purpose: "Carries the broader theory of continuity, wisdom mining, accountable recovery, and organizational repair.",
    status: "FINAL RED TEAM WORKING DRAFT",
    version: "0.4",
    accent: "FRAMEWORK",
    hash: "8c76bd2a55d90da7c27e4dfc7922f014108689f364891c3a35259f20b1abf7ef",
    points: [
      "Step Zero preserves shared intent, definitions, constraints, authority, and prior state",
      "Invariant principles constrain adaptive practice and prevent rationalized drift",
      "Cost classification is governed, conflict-aware, sampled, and reviewable",
      "Influence receipts preserve pre-exposure judgment, score exposure, decision shift, and rationale",
    ],
  },
  {
    id: "paper-3",
    number: "03",
    title: "TAC OPS: A Governed Label Recovery Architecture",
    subtitle: "Technical implementation · Evidence-bearing field system",
    purpose: "Demonstrates a governed implementation for damaged-label recovery without confusing confidence with authority.",
    status: "FINAL RED TEAM TECHNICAL DRAFT",
    version: "0.4",
    accent: "IMPLEMENTATION",
    hash: "181d317beb4838a2f5e398c54439aea5154156ff44fc2805461d7cf276c8af15",
    evidenceRoom: true,
    points: [
      "Evidence-first review and candidate generation",
      "Pre-exposure judgment before confidence or ranking is revealed",
      "Decision reconciliation, influence receipts, and blind sampling",
      "Physical output, telemetry reconciliation, and measured learning",
    ],
  },
];

export const challenges: Challenge[] = [
  {
    id: "INST-DEC-20260722-SPLIT-001",
    label: "The combined manuscript was serving multiple audiences",
    contributor: "External red-team synthesis",
    attribution: "Named identities remain permission-gated",
    document: "Series architecture",
    target: "Combined manuscript v0.8",
    summary: "The field narrative, organizational framework, and TAC OPS implementation required separate evidentiary and audience boundaries.",
    evidence: "Multiple external reviews converged on scope, audience, sourcing, and argument-load concerns.",
    disposition: "Accepted",
    sourceVersion: "Combined v0.8",
    result: "Created Papers 1, 2, and 3 as independently versioned descendants.",
    permission: "EXTERNAL RED-TEAM SYNTHESIS · NAMED QUOTATION REQUIRES PERMISSION",
  },
  {
    id: "SEED-INST-001",
    label: "Institutional courage must remain a bounded claim",
    contributor: "Mason Perry / NULLWORKS",
    attribution: "Author-generated internal pressure test",
    document: "Paper 2",
    target: "Institutional courage and decision accountability",
    summary: "Courage belongs where evidence requires consequential change, not as an explanation for every routine operational decision.",
    evidence: "Internal doctrine test. This entry is not independent assurance.",
    disposition: "Accepted with modification",
    sourceVersion: "Combined v0.8",
    result: "Narrowed and retained in Paper 2; excluded from Papers 1 and 3.",
    permission: "INTERNAL PRESSURE TEST · NOT INDEPENDENT ASSURANCE",
  },
  {
    id: "SEED-INST-002",
    label: "A system cannot independently assure itself",
    contributor: "Mason Perry / NULLWORKS",
    attribution: "Author-generated internal pressure test",
    document: "Paper 2 / Series governance",
    target: "Independent assurance boundary",
    summary: "Continuous self-inspection is useful, but the builder cannot be the sole independent assurer of its own evidence, scope, incentives, and conclusions.",
    evidence: "Internal doctrine test. External red-team receipts are recorded separately.",
    disposition: "Accepted",
    sourceVersion: "Combined v0.8",
    result: "Retained as an explicit governance boundary across the series and canonical page.",
    permission: "INTERNAL PRESSURE TEST · NOT AN EXTERNAL ENDORSEMENT",
  },
  {
    id: "SEED-INST-003",
    label: "The implementation requires a cost boundary",
    contributor: "Mason Perry / NULLWORKS",
    attribution: "Author-generated internal pressure test",
    document: "Paper 2 / Paper 3",
    target: "Evidence-preservation overhead and pilot criteria",
    summary: "Evidence burden must scale with consequence without creating an ungoverned escape hatch.",
    evidence: "Internal pressure test later sharpened by an external authority challenge.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 2 v0.2 / Paper 3 v0.2",
    result: "Paper 2 v0.4 governs classification authority, conflicts, automatic escalation, expiry, recurrence, and sampling.",
    permission: "INTERNAL ORIGIN · EXTERNAL CHALLENGE RECORDED SEPARATELY",
  },
  {
    id: "RT-20260723-AUTH-001",
    label: "The Cost Boundary moved the authority conflict one level up",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Paper 2",
    target: "Cost Boundary · consequence classification",
    summary: "The actor benefiting from reduced evidence burden may also control the decision to call an event low consequence.",
    evidence: "Direct external red-team correspondence is preserved in the private review record.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 2 v0.2",
    result: "Paper 2 v0.4 names classifier authority, conflicts, automatic escalators, expiry, aggregation, and independent sampling.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · ATTRIBUTION PERMISSION PENDING",
  },
  {
    id: "RT-20260723-MUSE-001",
    label: "The MUSE anchor remained partly self-reported",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Paper 1",
    target: "MUSE field narrative and verification register",
    summary: "The empirical anchor needed an inspectable distinction between firsthand account, contemporaneous artifact, estimate, corroboration, and unresolved claim.",
    evidence: "Original still images were ingested and redacted review copies prepared. Timing, causation, authorization, and safety are not inferred from images alone.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 1 v0.2",
    result: "Paper 1 v0.6 contains claim-specific receipt classes and preserves negative receipts for missing authority and safety evidence.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · PRIVATE SOURCE RECORD RETAINED",
  },
  {
    id: "RT-20260723-PROV-001",
    label: "Anonymous language obscured whether a challenge was independent",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Series architecture",
    target: "Challenge provenance and assurance labels",
    summary: "An internal pressure test must not appear to be an anonymous external review.",
    evidence: "Direct external correspondence is preserved in the private review record.",
    disposition: "Accepted",
    sourceVersion: "INSTANTIATION 2026-07-22",
    result: "Internal, external, generated, and unverified provenance classes are now explicit.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · PUBLIC LEDGER CORRECTED",
  },
  {
    id: "RT-20260723-INVAR-001",
    label: "Adaptive practice requires invariant principles",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Paper 2 / Series architecture",
    target: "Living Learning Architecture · adaptation boundary",
    summary: "A living system can rationalize drift unless it states which mechanisms may evolve and which obligations remain binding.",
    evidence: "Direct external correspondence is preserved in the private review record.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 2 v0.2",
    result: "Paper 2 v0.4 preserves truthfulness, lineage, authority, safety, source integrity, assurance, rollback, and human consequence ownership.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · ATTRIBUTION PERMISSION PENDING",
  },
  {
    id: "RT-20260723-GAURAV-001",
    label: "A confidence score can shape judgment before independent review exists",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Papers 2 and 3",
    target: "AI influence, anchoring, and reviewer sequencing",
    summary: "Formal human approval does not prove independent judgment when a score, ranking, default, warning color, or time-pressure cue appears first.",
    evidence: "External review recording and correction receipt are preserved in the private evidence record.",
    disposition: "Accepted with modification",
    sourceVersion: "Papers 1-3 pre-final review state",
    result: "Papers 2 and 3 now require evidence-first sequencing, pre-exposure judgment, influence receipts, decision reconciliation, and blind sampling.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · ATTRIBUTION PERMISSION PENDING",
  },
  {
    id: "RT-20260727-BOUNDARY-001",
    label: "Paper 1 inherited machinery its field case did not instantiate",
    contributor: "External red-team review synthesis",
    attribution: "Named identities held in the private receipt",
    document: "Paper 1 / Cross-paper architecture",
    target: "AI influence machinery inside the MUSE empirical narrative",
    summary: "The MUSE case contains no AI reviewer, confidence score, scoring interface, or decision-support state. Carrying those controls inside Paper 1 blurred the three-paper boundary.",
    evidence: "The final review recording confirmed the same boundary already indicated by the paper split and influence challenge.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 1 v0.5",
    result: "Paper 1 v0.6 removes AI influence machinery; Papers 2 and 3 retain the controls where they are conceptually and technically instantiated.",
    permission: "EXTERNAL REVIEW RECEIPT · NAMED PUBLIC ATTRIBUTION REQUIRES PERMISSION",
  },
];

export const recoveryLoop = [
  ["Observe", "Expose the runtime condition, challenge, contradiction, or missing evidence."],
  ["Preserve", "Retain evidence and context before intervention changes the condition."],
  ["Interpret", "Separate observation, inference, proposal, and unresolved uncertainty."],
  ["Identify authority", "Locate the role permitted to decide and the boundary requiring escalation."],
  ["Decide", "Approve, reject, test, defer, escalate, or request more evidence."],
  ["Act", "Implement without severing evidence, authority, and action lineage."],
  ["Measure", "Inspect whether the intervention changed the real operation and safeguards."],
  ["Learn", "Preserve the result, dissent, and review state as operational memory."],
  ["Revise", "Publish the next governed state without erasing the state it supersedes."],
] as const;

export const archiveRecords = [
  {
    version: "0.8",
    label: "COMBINED RED-TEAM MANUSCRIPT",
    date: "July 21, 2026",
    status: "SUPERSEDED BY STRUCTURAL SPLIT",
    hash: "fd3ffa8ba35b53804f9f878a8a74760d09120f6accd2b4e667dd439ba05593e9",
    href: "/api/instantiation/current-pdf?v=20260721-1",
    note: "Preserved parent containing the field case, framework, and TAC OPS material before the accepted split.",
  },
  {
    version: "0.1",
    label: "ORIGINAL RECONSTRUCTED WORKING DRAFT",
    date: "July 21, 2026",
    status: "IMMUTABLE ORIGIN",
    hash: "1e2a20197a26acdbcb818578528ea075d4709452ca548ebc777ee3505f6b63cb",
    href: "/api/instantiation/original-pdf?v=20260721-1",
    note: "The first preserved complete state. It remains accessible and is never replaced by descendant manuscripts.",
  },
];

export const evidenceReceipts = [
  "Original damaged-label delivery incident and retained physical label",
  "PaperGoblin intake, crop, preprocessing, and OCR record",
  "Human verification and tracking reconstruction",
  "Flattened helper-label generation and Brother printer output",
  "Physical application and live tracking confirmation",
  "Ghost mail, ghost scan, and fractured-telemetry casefiles",
  "Portable field-kit deployment and capability receipts",
  "MUSE obstruction, control-state, and facility-context still images",
  "Negative authority and safety receipt preserved as unresolved",
];
