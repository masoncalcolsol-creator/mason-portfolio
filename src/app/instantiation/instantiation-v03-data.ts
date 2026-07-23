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
    subtitle: "Empirical field narrative · MUSE recovery case",
    purpose: "Shows the observable sickness through one bounded runtime case.",
    status: "RED TEAM WORKING DRAFT",
    version: "0.3",
    accent: "FIELD CASE",
    hash: "cbbea8031820dade4d07721934e47caf29589bff3d7ba1a39c686215bf754d4b",
    points: [
      "MUSE recovery presented as a firsthand field account",
      "Evidence classes distinguish observation, artifact, estimate, inference, and unresolved claim",
      "Photos and video remain in private artifact intake until reviewed and redacted",
      "No image is permitted to prove more than it actually shows",
    ],
  },
  {
    id: "paper-2",
    number: "02",
    title: "From Runtime Truth to Operational Recovery",
    subtitle: "Conceptual framework · Living Learning Architecture",
    purpose: "Explains the underlying organizational condition and the recovery architecture.",
    status: "RED TEAM WORKING DRAFT",
    version: "0.3",
    accent: "FRAMEWORK",
    hash: "31a07e9bd90ec329926f2ca754e1738adf9e9ead682220e125ae99dd7639a4e4",
    points: [
      "Step Zero and the continuity layer",
      "Invariant principles constrain adaptive practice",
      "Cost classification is a governed decision—not an exemption from governance",
      "Source, authority, action, provenance, and rollback remain inspectable",
    ],
  },
  {
    id: "paper-3",
    number: "03",
    title: "TAC OPS: A Governed Label Recovery Architecture",
    subtitle: "Technical implementation · Evidence-bearing field system",
    purpose: "Demonstrates one concrete implementation of the framework in damaged-label recovery.",
    status: "RED TEAM TECHNICAL DRAFT",
    version: "0.2",
    accent: "IMPLEMENTATION",
    hash: "5c889a024e74e38e66c9240885d257e9a1c0826e9d494aff9ad958ca540a17fa",
    evidenceRoom: true,
    points: [
      "Damaged-label evidence acquisition and OCR recovery",
      "Human verification and bounded authority",
      "Helper-label generation, printing, and physical application",
      "Telemetry divergence, evidence receipts, and portable deployment",
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
    summary: "Courage belongs at the boundary where evidence requires consequential change—not as an explanation for every routine operational decision.",
    evidence: "Internal doctrine test. This entry is not independent assurance.",
    disposition: "Accepted with modification",
    sourceVersion: "Combined v0.8",
    result: "Narrowed and retained in Paper 2; removed from Papers 1 and 3.",
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
    result: "Retained as an explicit governance boundary across the series and landing page.",
    permission: "INTERNAL PRESSURE TEST · NOT AN EXTERNAL ENDORSEMENT",
  },
  {
    id: "SEED-INST-003",
    label: "The implementation requires a cost boundary",
    contributor: "Mason Perry / NULLWORKS",
    attribution: "Author-generated internal pressure test",
    document: "Paper 2 / Paper 3",
    target: "Evidence-preservation overhead and pilot criteria",
    summary: "Preserving full evidence at every exception creates operational cost. The framework must scale its burden without creating an ungoverned escape hatch.",
    evidence: "Internal pressure test later sharpened by an external red-team authority challenge.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 2 v0.2 / Paper 3 v0.2",
    result: "Paper 2 v0.3 now governs the classification decision and its conflicts.",
    permission: "INTERNAL ORIGIN · EXTERNAL CHALLENGE RECORDED SEPARATELY",
  },
  {
    id: "RT-20260723-AUTH-001",
    label: "The Cost Boundary moved the authority conflict one level up",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Paper 2",
    target: "Section 7 · Cost Boundary · consequence classification",
    summary: "The actor benefiting from reduced evidence burden may also control the decision to call an event low consequence. The classification itself must meet the paper's accountability standard.",
    evidence: "Direct external red-team correspondence preserved in the private review record.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 2 v0.2",
    result: "Paper 2 v0.3 names the classifier, authority basis, conflict disclosure, automatic escalators, expiry, recurrence rule, and independent sampling requirement.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · ATTRIBUTION PERMISSION PENDING",
  },
  {
    id: "RT-20260723-MUSE-001",
    label: "The MUSE anchor remains partly self-reported",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Paper 1",
    target: "MUSE field narrative and verification register",
    summary: "The empirical anchor needs an inspectable distinction between author account, contemporaneous artifact, estimate, independent corroboration, and unresolved claim.",
    evidence: "Mason reports photographs of packages obstructing the sensor and images/video of bulk-line stoppage. Artifact intake is open; no claim has been upgraded before review.",
    disposition: "Under review",
    sourceVersion: "Paper 1 v0.2",
    result: "Paper 1 v0.3 adds evidence classes, claim-specific boundaries, and an artifact register while leaving timing, distance, authority, and safety claims unresolved where receipts are missing.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · PRIVATE ARTIFACT INTAKE OPEN",
  },
  {
    id: "RT-20260723-PROV-001",
    label: "Anonymous language obscured whether a challenge was independent",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Series architecture",
    target: "SEED-INST provenance and assurance labels",
    summary: "An internal pressure test must not appear to be an anonymous external review. Provenance has to be explicit even when identity is withheld.",
    evidence: "Direct external red-team correspondence preserved in the private review record.",
    disposition: "Accepted",
    sourceVersion: "INSTANTIATION 2026-07-22",
    result: "SEED entries now identify Mason Perry / NULLWORKS as author-generated internal pressure tests and state that they are not independent assurance.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · PUBLIC LEDGER CORRECTED",
  },
  {
    id: "RT-20260723-INVAR-001",
    label: "Adaptive practice requires invariant principles",
    contributor: "External red-team reviewer",
    attribution: "Identity held privately; public permission pending",
    document: "Paper 2 / Series architecture",
    target: "Living Learning Architecture · adaptation boundary",
    summary: "A living system can rationalize drift unless it states which mechanisms may evolve and which obligations must remain constant.",
    evidence: "Direct external red-team correspondence preserved in the private review record.",
    disposition: "Accepted with modification",
    sourceVersion: "Paper 2 v0.2",
    result: "Paper 2 v0.3 adds invariant truthfulness, lineage, authority, safety, source integrity, independent assurance, rollback, and human-consequence obligations.",
    permission: "EXTERNAL RED-TEAM CHALLENGE · ATTRIBUTION PERMISSION PENDING",
  },
];

export const recoveryLoop = [
  ["Observe", "Expose the runtime condition, challenge, contradiction, or missing evidence."],
  ["Preserve", "Retain the evidence and context before the intervention changes the condition."],
  ["Decide", "Route the decision to explicit, bounded, accountable human authority."],
  ["Act", "Implement without severing the connection between evidence, authority, and action."],
  ["Measure", "Inspect whether the intervention changed the real operation."],
  ["Learn", "Return the measured outcome to the operating model and shared understanding."],
  ["Repeat", "Publish the next preserved state without erasing the prior one."],
] as const;

export const archiveRecords = [
  {
    version: "0.8",
    label: "COMBINED RED-TEAM MANUSCRIPT",
    date: "July 21, 2026",
    status: "SUPERSEDED BY STRUCTURAL SPLIT",
    hash: "fd3ffa8ba35b53804f9f878a8a74760d09120f6accd2b4e667dd439ba05593e9",
    href: "/api/instantiation/current-pdf?v=20260721-1",
    note: "Preserved parent manuscript containing the field case, framework, and TAC OPS material before the accepted structural split.",
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
];
