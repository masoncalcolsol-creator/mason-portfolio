"use client";

import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileArchive,
  FileCheck2,
  Fingerprint,
  GitBranch,
  LockKeyhole,
  Network,
  RefreshCw,
  Send,
  ShieldCheck,
  Split,
  Waypoints,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import styles from "./instantiation-series.module.css";

type Disposition =
  | "Submitted"
  | "Under review"
  | "Accepted"
  | "Accepted with modification"
  | "Rejected"
  | "Deferred";

type PaperRecord = {
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

type Challenge = {
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

const papers: PaperRecord[] = [
  {
    id: "paper-1",
    number: "01",
    title: "The Workflow on Paper Was Never the Workflow",
    subtitle: "Empirical field narrative · MUSE recovery case",
    purpose: "Shows the observable sickness through one bounded runtime case.",
    status: "RED TEAM WORKING DRAFT",
    version: "0.2",
    accent: "FIELD CASE",
    hash: "c289eee4ba4c21d9b400c92d644f90ff652a731db5d41ae7692f40d923348c98",
    points: [
      "MUSE thirty-second recovery",
      "Declared workflow versus executed workflow",
      "Claims bounded to firsthand runtime observation",
      "TAC OPS implementation removed from the evidentiary burden",
    ],
  },
  {
    id: "paper-2",
    number: "02",
    title: "From Runtime Truth to Operational Recovery",
    subtitle: "Conceptual framework · Living Learning Architecture",
    purpose: "Explains the underlying organizational condition and the recovery architecture.",
    status: "RED TEAM WORKING DRAFT",
    version: "0.2",
    accent: "FRAMEWORK",
    hash: "d339161dcb94cdeb6ce1ab26cbe4bcd3777ff81b1eab4924b0675ba306471749",
    points: [
      "Step Zero and the continuity layer",
      "Runtime truth and operational memory",
      "Source, authority, and action lineage",
      "Operational recovery as maintenance of a learning organization",
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

const challenges: Challenge[] = [
  {
    id: "INST-DEC-20260722-SPLIT-001",
    label: "The combined manuscript was serving multiple audiences",
    contributor: "External red-team synthesis",
    attribution: "Named reviewers remain permission-gated",
    document: "Series architecture",
    target: "Combined manuscript v0.8",
    summary:
      "The field narrative, organizational framework, and TAC OPS implementation were each strong enough to require separate evidentiary and audience boundaries.",
    evidence:
      "Multiple independent reviews converged on scope, audience, sourcing, and argument-load concerns.",
    disposition: "Accepted",
    sourceVersion: "Combined v0.8",
    result: "Created Papers 1, 2, and 3 as independently versioned descendants.",
    permission: "STRUCTURAL DECISION RECEIPT · REVIEWER QUOTATION REQUIRES PERMISSION",
  },
  {
    id: "SEED-INST-001",
    label: "Institutional courage must remain a bounded claim",
    contributor: "Attribution withheld",
    attribution: "Private review only",
    document: "Paper 2",
    target: "Institutional courage and decision accountability",
    summary:
      "Courage should apply where evidence requires a consequential change to the rule or authority structure—not as an explanation for every routine operational decision.",
    evidence: "Private correspondence preserved; public quotation permission is not recorded.",
    disposition: "Accepted with modification",
    sourceVersion: "Combined v0.8",
    result: "Narrowed and retained in Paper 2; removed from Paper 1 and Paper 3.",
    permission: "PERMISSION-GATED SOURCE RECORD",
  },
  {
    id: "SEED-INST-002",
    label: "A system cannot independently assure itself",
    contributor: "Source attribution pending",
    attribution: "Anonymous public summary",
    document: "Paper 2 / Series governance",
    target: "Independent assurance boundary",
    summary:
      "Continuous self-inspection is operationally useful, but the builder cannot be the sole independent assurer of its own evidence, scope, incentives, and conclusions.",
    evidence: "Working doctrine record; exact source receipt remains private on this build.",
    disposition: "Under review",
    sourceVersion: "Combined v0.8",
    result: "Retained as an explicit governance boundary across the series and landing page.",
    permission: "SOURCE RECEIPT REQUIRED BEFORE NAMED PUBLIC ATTRIBUTION",
  },
  {
    id: "SEED-INST-003",
    label: "The implementation requires a cost boundary",
    contributor: "External reviewer",
    attribution: "Anonymous public summary",
    document: "Paper 2 / Paper 3",
    target: "Evidence preservation overhead and pilot criteria",
    summary:
      "Preserving evidence at every exception creates operational cost. The framework must state when that burden is justified and how a bounded pilot measures value.",
    evidence: "Reviewer analysis preserved in the private intake record.",
    disposition: "Submitted",
    sourceVersion: "Paper 2 v0.2 / Paper 3 v0.2",
    result: "Targeted for the next editorial and pilot-design pass.",
    permission: "ANONYMOUS SUMMARY · NOT AN ENDORSEMENT",
  },
];

const recoveryLoop = [
  ["Observe", "Expose the runtime condition, challenge, contradiction, or missing evidence."],
  ["Preserve", "Retain the evidence and context before the intervention changes the condition."],
  ["Decide", "Route the decision to explicit, bounded, accountable human authority."],
  ["Act", "Implement without severing the connection between evidence, authority, and action."],
  ["Measure", "Inspect whether the intervention changed the real operation."],
  ["Learn", "Return the measured outcome to the operating model and shared understanding."],
  ["Repeat", "Publish the next preserved state without erasing the prior one."],
] as const;

const archiveRecords = [
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

const stats = [
  ["CURRENT MANUSCRIPTS", "3"],
  ["PRESERVED PARENT STATES", "2"],
  ["STRUCTURAL DECISIONS", "1"],
  ["PUBLIC RELEASES", "0"],
  ["REVIEW STATE", "RED TEAM"],
];

const evidenceReceipts = [
  "Original damaged-label delivery incident and retained physical label",
  "PaperGoblin intake, crop, preprocessing, and OCR record",
  "Human verification and tracking reconstruction",
  "Flattened helper-label generation and Brother printer output",
  "Physical application and live tracking confirmation",
  "Ghost mail, ghost scan, and fractured-telemetry casefiles",
  "Portable field-kit deployment and capability receipts",
];

function shortHash(hash: string) {
  return `${hash.slice(0, 12)}…${hash.slice(-10)}`;
}

export default function InstantiationExperience() {
  const [filter, setFilter] = useState<"All" | Disposition>("All");
  const [loopIndex, setLoopIndex] = useState(0);
  const [activePaper, setActivePaper] = useState<PaperRecord | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [receipt, setReceipt] = useState<null | { id: string; message: string }>(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredChallenges = useMemo(
    () => challenges.filter((challenge) => filter === "All" || challenge.disposition === filter),
    [filter],
  );

  async function submitChallenge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setReceipt(null);

    const form = event.currentTarget;
    const fields = new FormData(form);
    const attachment = fields.get("attachment");
    const documentName = String(fields.get("document") || "Series architecture");
    const version = String(fields.get("documentVersion") || "Current working version");
    const exactTarget = String(fields.get("target") || "Unspecified section");

    const payload = {
      name: fields.get("name"),
      email: fields.get("email"),
      role: fields.get("role"),
      target: `${documentName} · ${version} · ${exactTarget}`,
      contributionType: fields.get("contributionType"),
      argument: fields.get("argument"),
      evidence: fields.get("evidence"),
      attachmentName: attachment instanceof File && attachment.size ? attachment.name : "",
      attribution: fields.get("attribution"),
      quotePermission: fields.get("quotePermission"),
      conflict: fields.get("conflict"),
      consent: fields.get("consent") === "on",
      website: fields.get("website"),
    };

    try {
      const response = await fetch("/api/instantiation/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed.");
      setReceipt({
        id: result.receiptId,
        message: result.message || "Your submission has been sent for private review.",
      });
      form.reset();
    } catch (error) {
      setReceipt({
        id: "NOT CREATED",
        message: error instanceof Error ? error.message : "Submission failed.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.telemetry} aria-hidden="true" />

      <header className={styles.siteHeader}>
        <a className={styles.brand} href="/" aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span><strong>NULLWORKS</strong><small>Operational Intelligence</small></span>
        </a>
        <nav aria-label="Instantiation navigation">
          <a href="#series">Series</a>
          <a href="#lineage">Lineage</a>
          <a href="#ledger">Ledger</a>
          <a href="#challenge">Challenge</a>
        </nav>
        <span className={styles.headerStatus}><span /> RED TEAM SERIES · NOINDEX</span>
      </header>

      <section className={styles.hero} id="hero">
        <div className={styles.heroPoster} aria-hidden="true">
          <img src="/api/assets/instantiation-poster?v=20260721-1" alt="" fetchPriority="high" />
          <div className={styles.posterVeil} />
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><Fingerprint size={16} /> A living demonstration of its own theory</p>
            <h1>INSTANTIATION</h1>
            <h2>THE LIVING OPERATIONAL RECOVERY SERIES</h2>
            <p className={styles.heroLead}>The work can change.<br />The record cannot disappear.</p>
            <p className={styles.heroBody}>
              One combined manuscript entered external red-team review. The evidence showed that it contained three different arguments for three different audiences. The manuscript split. Its parent states remain immutable. Its descendants now evolve independently.
            </p>
            <div className={styles.heroActions}>
              <a href="#series" className={styles.primaryButton}>Inspect the three papers <ArrowDown size={18} /></a>
              <a href="#lineage" className={styles.secondaryButton}>Follow the split receipt <GitBranch size={18} /></a>
              <a href="#challenge" className={styles.textButton}>Submit a targeted challenge <ArrowRight size={17} /></a>
            </div>
            <p className={styles.heroFine}>MASON PERRY / NULLWORKS · EMPIRICAL → CONCEPTUAL → TECHNICAL</p>
          </div>

          <div className={styles.heroSystem} aria-label="Current series state">
            <div className={styles.systemHeader}><span>LIVE SERIES STATE</span><span className={styles.pulse}>OBSERVING</span></div>
            {stats.map(([label, value]) => (
              <div className={styles.statRow} key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
            <div className={styles.lineageMini}><span>0.1</span><i /><span>0.8</span><i className={styles.branchLine} /><span>01 · 02 · 03</span></div>
            <small>No public release is claimed. Current manuscripts remain working drafts under external challenge.</small>
          </div>
        </div>
      </section>

      <section className={styles.premise} id="premise">
        <div className={styles.sectionMarker}>01 // THE OBSERVED CHANGE</div>
        <div className={styles.premiseGrid}>
          <h2>The paper changed its architecture while it was running.</h2>
          <div>
            <p>The original manuscript argued that systems must let runtime evidence challenge the declared model, preserve the decision, and update without erasing history.</p>
            <p>External review then revealed a runtime truth about the manuscript itself: one document was carrying an empirical case, a conceptual framework, and a technical implementation.</p>
            <blockquote>The split is not a deletion. It is a documented learning event.</blockquote>
            <p>The parent paper remains. The decision receipt remains. Each descendant now has its own scope, version history, evidence burden, and challenge path.</p>
          </div>
        </div>
      </section>

      <section className={styles.seriesSection} id="series">
        <div className={styles.sectionHeading}>
          <span>02 // CURRENT DESCENDANT MANUSCRIPTS</span>
          <h2>One problem. Three accountable papers.</h2>
          <p>The v0.2 review packet is distributed directly to the red team. This page is the canonical map, lineage record, and challenge intake for that packet.</p>
        </div>

        <div className={styles.paperGrid}>
          {papers.map((paper) => (
            <article className={styles.paperCard} key={paper.id}>
              <div className={styles.paperTop}><span>{paper.number}</span><strong>{paper.accent}</strong></div>
              <div className={styles.paperStatus}><FileCheck2 size={17} /><span>VERSION {paper.version}</span><strong>{paper.status}</strong></div>
              <h3>{paper.title}</h3>
              <p className={styles.paperSubtitle}>{paper.subtitle}</p>
              <p>{paper.purpose}</p>
              <ul>{paper.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <dl className={styles.metadataList}>
                <div><dt>State</dt><dd>Review packet prepared</dd></div>
                <div><dt>Version</dt><dd>v{paper.version}</dd></div>
                <div><dt>SHA-256</dt><dd><code>{shortHash(paper.hash)}</code></dd></div>
              </dl>
              <div className={styles.cardActions}>
                <button className={styles.primaryButton} onClick={() => setActivePaper(paper)}><BookOpen size={17} /> Review scope</button>
                <a className={styles.secondaryButton} href="#challenge">Challenge this paper <ArrowRight size={16} /></a>
              </div>
              {paper.evidenceRoom && <a className={styles.evidenceButton} href="#evidence-room">Open evidence-room index <FileArchive size={17} /></a>}
            </article>
          ))}
        </div>

        {activePaper && (
          <div className={styles.readerPanel}>
            <div className={styles.readerHeader}>
              <div><span>REVIEW SCOPE</span><strong>{activePaper.title} · v{activePaper.version}</strong></div>
              <button onClick={() => setActivePaper(null)} aria-label="Close review scope"><X size={20} /></button>
            </div>
            <div style={{ padding: "28px" }}>
              <p style={{ color: "#b7c3c0", lineHeight: 1.7 }}>{activePaper.purpose}</p>
              <p style={{ color: "#b7c3c0", lineHeight: 1.7 }}>Use the exact paper and version selectors in the challenge form. The PDF supplied with the review packet is the immutable artifact identified by the hash shown above.</p>
              <a className={styles.primaryButton} href="#challenge">Submit a challenge <ArrowRight size={16} /></a>
            </div>
          </div>
        )}
      </section>

      <section className={styles.lineageSection} id="lineage">
        <div className={styles.sectionHeading}>
          <span>03 // BRANCHED LINEAGE</span>
          <h2>The original remains. The descendants branch.</h2>
          <p>Series lineage records how the combined manuscript changed. Document lineage records how each descendant changes from this point forward.</p>
        </div>

        <div className={styles.lineageMap}>
          <div className={styles.parentNode}><span>IMMUTABLE ORIGIN</span><strong>Combined draft v0.1</strong><small>First preserved complete state</small></div>
          <div className={styles.verticalRail} />
          <div className={styles.parentNode}><span>PRESERVED PARENT</span><strong>Combined red-team manuscript v0.8</strong><small>Field case + framework + TAC OPS implementation</small></div>
          <div className={styles.verticalRail} />
          <div className={styles.decisionNode}><Split size={28} /><div><span>DECISION RECEIPT</span><strong>INST-DEC-20260722-SPLIT-001</strong><p>Accepted external challenge: split the combined manuscript into empirical, conceptual, and technical descendants.</p></div></div>
          <div className={styles.branchRail}><i /><i /><i /></div>
          <div className={styles.childNodes}>
            <div><span>DESCENDANT</span><strong>Paper 1</strong><small>v0.2 · field case</small></div>
            <div><span>DESCENDANT</span><strong>Paper 2</strong><small>v0.2 · framework</small></div>
            <div><span>DESCENDANT</span><strong>Paper 3</strong><small>v0.2 · implementation</small></div>
          </div>
        </div>

        <div className={styles.decisionReceipt}>
          <div><span>OBSERVED PROBLEM</span><p>One manuscript was being asked to win three arguments.</p></div>
          <div><span>EVIDENCE</span><p>Independent red-team input converged on audience, scope, sourcing, and proof burden.</p></div>
          <div><span>AUTHORITY</span><p>Mason Perry retained accountable editorial authority.</p></div>
          <div><span>DECISION</span><p>Accept the structural challenge and split the work.</p></div>
          <div><span>OUTCOME</span><p>Three separately versioned manuscripts; two immutable parent states.</p></div>
        </div>
      </section>

      <section className={styles.archiveSection} id="archive">
        <div className={styles.sectionHeading}>
          <span>04 // IMMUTABLE PARENT ARCHIVE</span>
          <h2>Superseded does not mean erased.</h2>
          <p>The original URLs remain active. Nothing was renamed into a descendant or silently overwritten.</p>
        </div>
        <div className={styles.archiveGrid}>
          {archiveRecords.map((record) => (
            <article key={record.version}>
              <span>VERSION {record.version} · {record.label}</span>
              <h3>{record.status}</h3>
              <p>{record.note}</p>
              <dl><div><dt>Date</dt><dd>{record.date}</dd></div><div><dt>Hash</dt><dd><code>{shortHash(record.hash)}</code></dd></div></dl>
              <a href={record.href} target="_blank" rel="noreferrer">Open preserved parent artifact <ExternalLink size={16} /></a>
            </article>
          ))}
        </div>
        <button className={styles.compareButton} onClick={() => setShowCompare((value) => !value)}><Split size={18} /> {showCompare ? "Hide structural comparison" : "Compare combined v0.8 with the descendants"} <ChevronDown size={18} /></button>
        {showCompare && (
          <div className={styles.compareGrid}>
            <article><span>COMBINED v0.8</span><h3>One manuscript carrying the complete argument</h3><ul><li>MUSE field narrative</li><li>Runtime truth and recovery theory</li><li>Institutional courage and assurance</li><li>TAC OPS implementation material</li></ul></article>
            <article><span>DESCENDANT SERIES</span><h3>Each concern moved to its accountable home</h3><ul><li>MUSE field case → Paper 1</li><li>Living Learning Architecture and assurance → Paper 2</li><li>TAC OPS system and evidence receipts → Paper 3</li><li>Combined draft → immutable archive</li></ul></article>
          </div>
        )}
      </section>

      <section className={styles.archiveSection} id="evidence-room">
        <div className={styles.sectionHeading}>
          <span>05 // PAPER 3 EVIDENCE-ROOM INDEX</span>
          <h2>The technical argument carries receipts.</h2>
          <p>Real names and street addresses are masked in public/red-team figures. Tracking and operational timelines remain only where authorized as evidence. Originals remain segregated in the private source record.</p>
        </div>
        <div className={styles.archiveGrid}>
          <article>
            <span>FIELD EVIDENCE</span><h3>Closed-loop recovery proof</h3>
            <ul>{evidenceReceipts.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span>TELEMETRY + DEPLOYMENT</span><h3>Operational divergence and fieldability</h3>
            <ul>{evidenceReceipts.slice(4).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className={styles.ledgerSection} id="ledger">
        <div className={styles.sectionHeading}>
          <span>06 // CROSS-PAPER RED-TEAM LEDGER</span>
          <h2>Every challenge keeps its original target.</h2>
          <p>A review of combined v0.8 stays attached to combined v0.8, even when its accepted result changes one or more descendant papers.</p>
        </div>
        <div className={styles.filterBar} role="group" aria-label="Filter challenges by disposition">
          {(["All", "Submitted", "Under review", "Accepted", "Accepted with modification", "Rejected", "Deferred"] as const).map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={filter === item ? styles.activeFilter : ""}>{item}</button>
          ))}
        </div>
        <div className={styles.ledgerList}>
          {filteredChallenges.map((challenge) => (
            <article className={styles.ledgerEntry} key={challenge.id}>
              <div className={styles.entryTop}><div><span className={styles.receiptId}>{challenge.id}</span><h3>{challenge.label}</h3></div><span className={styles.disposition}>{challenge.disposition}</span></div>
              <div className={styles.entryGrid}>
                <div><span>CONTRIBUTOR</span><strong>{challenge.contributor}</strong><small>{challenge.attribution}</small></div>
                <div><span>DOCUMENT</span><strong>{challenge.document}</strong><small>Source: {challenge.sourceVersion}</small></div>
                <div><span>TARGET</span><strong>{challenge.target}</strong></div>
                <div className={styles.entrySummary}><span>CHALLENGE</span><p>{challenge.summary}</p></div>
                <div className={styles.entrySummary}><span>EVIDENCE BOUNDARY</span><p>{challenge.evidence}</p></div>
                <div className={styles.entrySummary}><span>RESULT / NEXT STATE</span><p>{challenge.result}</p></div>
              </div>
              <footer><LockKeyhole size={15} /> {challenge.permission}</footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.loopSection} id="recovery-loop">
        <div className={styles.sectionHeading}>
          <span>07 // LIVING LEARNING ARCHITECTURE</span>
          <h2>Step Zero surrounds the loop.</h2>
          <p>The sequence is stable. The practice is adaptive. Every measured cycle can update shared understanding without erasing prior states.</p>
        </div>
        <div className={styles.continuityShell}>
          <div className={styles.continuityLabel}><Network size={20} /><div><span>STEP ZERO</span><strong>CONTINUITY</strong><small>Shared purpose, context, definitions, intent, evidence boundaries, and current operational understanding.</small></div></div>
          <div className={styles.loopGrid}>
            <div className={styles.loopControls} role="tablist" aria-label="Recovery loop stages">
              {recoveryLoop.map(([stage], index) => (
                <button key={stage} role="tab" aria-selected={loopIndex === index} onClick={() => setLoopIndex(index)} className={loopIndex === index ? styles.activeLoop : ""}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</button>
              ))}
            </div>
            <article className={styles.loopDetail}>
              <div className={styles.loopOrb}><RefreshCw size={34} /></div><span>ADAPTIVE STAGE {String(loopIndex + 1).padStart(2, "0")}</span><h3>{recoveryLoop[loopIndex][0]}</h3><p>{recoveryLoop[loopIndex][1]}</p><div><Waypoints size={18} /> Implemented by the series lineage and review system</div>
            </article>
          </div>
        </div>
        <blockquote className={styles.wallQuote}>Operational recovery is the maintenance of a learning organization.</blockquote>
      </section>

      <section className={styles.challengeSection} id="challenge">
        <div className={styles.challengeIntro}>
          <span>08 // CHALLENGE THE SERIES</span><h2>Find the weak claim.<br />Name the missing evidence.</h2>
          <p>Choose the exact paper and version. Your challenge is delivered privately, receives a unique receipt, and cannot directly edit or publish anything.</p>
          <div className={styles.boundaryCard}><ShieldCheck size={28} /><div><strong>THE ASSURANCE BOUNDARY</strong><p>NULLWORKS owns the editorial decision. NULLWORKS does not get to serve as the sole witness to the integrity of its own evidence or conclusions.</p></div></div>
        </div>

        <form className={styles.challengeForm} onSubmit={submitChallenge}>
          <label className={styles.honeypot}>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className={styles.formRow}><label>Name<input name="name" required maxLength={120} /></label><label>Email<input name="email" type="email" required maxLength={180} /></label></div>
          <label>Role / organization<input name="role" maxLength={180} placeholder="Optional" /></label>
          <div className={styles.formRow}>
            <label>Document being challenged<select name="document" required defaultValue=""><option value="" disabled>Select target</option><option>Series architecture</option><option>Paper 1 — Field case</option><option>Paper 2 — Framework</option><option>Paper 3 — TAC OPS implementation</option><option>Combined parent manuscript</option><option>Cross-paper terminology</option><option>Evidence or privacy boundary</option></select></label>
            <label>Document version<select name="documentVersion" required defaultValue=""><option value="" disabled>Select version</option><option>Current working version</option><option>Paper 1 v0.2</option><option>Paper 2 v0.2</option><option>Paper 3 v0.2</option><option>Combined v0.8</option><option>Original v0.1</option></select></label>
          </div>
          <label>Exact section, claim, figure, or evidence receipt<input name="target" required maxLength={260} placeholder="Example: Paper 2 · Step Zero · continuity boundary" /></label>
          <label>Contribution type<select name="contributionType" required defaultValue=""><option value="" disabled>Select one</option><option>Factual correction</option><option>Missing evidence</option><option>Counterargument</option><option>Operational failure mode</option><option>Safety or authority concern</option><option>Privacy / attribution issue</option><option>Implementation or measurement critique</option><option>Proposed wording</option></select></label>
          <label>Argument or contribution<textarea name="argument" required rows={7} maxLength={8000} placeholder="State the challenge clearly. What is wrong, incomplete, unsupported, or operationally naive?" /></label>
          <label>Supporting evidence<textarea name="evidence" rows={5} maxLength={6000} placeholder="Sources, observations, reproducible steps, or the evidence that would change the claim." /></label>
          <label className={styles.fileField}>Optional attachment<input name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.doc,.docx" /><small>The intake currently records the filename. Attach the actual file when replying to the delivered receipt if required.</small></label>
          <div className={styles.formRow}><label>Attribution preference<select name="attribution" required><option>Anonymous public summary</option><option>Named attribution if accepted</option><option>Private review only</option></select></label><label>Quotation permission<select name="quotePermission" required><option>No direct quotation</option><option>Quote only after written approval</option><option>Direct quotation permitted with attribution</option><option>Direct quotation permitted anonymously</option></select></label></div>
          <label>Conflict disclosure<input name="conflict" maxLength={500} placeholder="Optional but encouraged" /></label>
          <label className={styles.consent}><input type="checkbox" name="consent" required /><span>I understand that submission does not guarantee publication, acceptance, attribution, or incorporation. The public record will follow my permission selection.</span></label>
          <button className={styles.submitButton} type="submit" disabled={submitting}>{submitting ? "DELIVERING…" : "SUBMIT CHALLENGE"} <Send size={18} /></button>
          {receipt && <div className={styles.receiptNotice}><strong>RECEIPT {receipt.id}</strong><p>{receipt.message}</p></div>}
        </form>
      </section>

      <footer className={styles.footer}>
        <div><span className={styles.brandMark}>NW</span><div><strong>NULLWORKS</strong><small>Operational Intelligence Architecture</small></div></div>
        <p>The work may change. The evidence, lineage, and accountable decisions remain.</p>
        <a href="/">Return to NULLWORKS <ArrowRight size={16} /></a>
      </footer>
    </main>
  );
}
