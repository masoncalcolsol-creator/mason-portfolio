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
import {
  archiveRecords,
  challenges,
  evidenceReceipts,
  papers,
  recoveryLoop,
  type Disposition,
  type PaperRecord,
} from "./instantiation-final-data";

const stats = [
  ["CURRENT MANUSCRIPTS", "3"],
  ["CURRENT VERSIONS", "0.6 / 0.4 / 0.4"],
  ["FINAL REVIEW BUNDLE", "61 PAGES"],
  ["LEDGER RECEIPTS", String(challenges.length)],
  ["PUBLIC RELEASES", "0"],
  ["REVIEW STATE", "FINAL RED TEAM"],
];

function shortHash(hash: string) {
  return `${hash.slice(0, 12)}…${hash.slice(-10)}`;
}

export default function InstantiationExperienceFinal() {
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
          <span>
            <strong>NULLWORKS</strong>
            <small>Operational Intelligence</small>
          </span>
        </a>
        <nav aria-label="Instantiation navigation">
          <a href="#series">Series</a>
          <a href="#lineage">Lineage</a>
          <a href="#ledger">Ledger</a>
          <a href="#challenge">Challenge</a>
        </nav>
        <span className={styles.headerStatus}>
          <span /> FINAL RED TEAM · NOINDEX
        </span>
      </header>

      <section className={styles.hero} id="hero">
        <div className={styles.heroPoster} aria-hidden="true">
          <img src="/api/assets/instantiation-poster?v=20260721-1" alt="" fetchPriority="high" />
          <div className={styles.posterVeil} />
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              <Fingerprint size={16} /> A living demonstration of its own theory
            </p>
            <h1>INSTANTIATION</h1>
            <h2>THE LIVING OPERATIONAL RECOVERY SERIES</h2>
            <p className={styles.heroLead}>
              The work can change.
              <br />
              The record cannot disappear.
            </p>
            <p className={styles.heroBody}>
              The three-paper architecture is frozen for final material review. Paper 1 now carries only the MUSE
              empirical case. Papers 2 and 3 retain the AI influence, governance, assurance, and implementation
              machinery where those controls are actually instantiated.
            </p>
            <div className={styles.heroActions}>
              <a href="#series" className={styles.primaryButton}>
                Inspect the final review state <ArrowDown size={18} />
              </a>
              <a href="#ledger" className={styles.secondaryButton}>
                Read the correction receipts <GitBranch size={18} />
              </a>
              <a href="#challenge" className={styles.textButton}>
                Submit a material challenge <ArrowRight size={17} />
              </a>
            </div>
            <p className={styles.heroFine}>MASON PERRY / NULLWORKS · EMPIRICAL → CONCEPTUAL → TECHNICAL</p>
          </div>

          <div className={styles.heroSystem} aria-label="Current series state">
            <div className={styles.systemHeader}>
              <span>LIVE SERIES STATE</span>
              <span className={styles.pulse}>FINAL REVIEW</span>
            </div>
            {stats.map(([label, value]) => (
              <div className={styles.statRow} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <div className={styles.lineageMini}>
              <span>0.1</span>
              <i />
              <span>0.8</span>
              <i className={styles.branchLine} />
              <span>0.6 · 0.4 · 0.4</span>
            </div>
            <small>
              Final red-team circulation is prepared. No public manuscript release or independent validation is
              claimed.
            </small>
          </div>
        </div>
      </section>

      <section className={styles.premise} id="premise">
        <div className={styles.sectionMarker}>01 // THE FINAL BOUNDARY REPAIR</div>
        <div className={styles.premiseGrid}>
          <h2>The field case stopped carrying machinery it never instantiated.</h2>
          <div>
            <p>
              The final external review confirmed that Paper 1 contained AI influence controls even though the MUSE
              event had no AI reviewer, confidence score, ranked interface, or decision-support state.
            </p>
            <p>
              Paper 1 v0.6 removes that machinery. Paper 2 retains the conceptual governance controls. Paper 3
              retains the technical sequencing, influence receipts, reconciliation, and blind-sample design.
            </p>
            <blockquote>The criticism did not weaken the series. It restored the architecture.</blockquote>
            <p>
              Content and structure are now frozen. Only material defects involving facts, evidence, attribution,
              authority, safety, privacy, implementation, or cross-paper leakage may reopen the manuscripts.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.seriesSection} id="series">
        <div className={styles.sectionHeading}>
          <span>02 // FINAL RED-TEAM MANUSCRIPTS</span>
          <h2>One operating problem. Three accountable papers.</h2>
          <p>
            The final review packet contains Paper 1 v0.6, Paper 2 v0.4, and Paper 3 v0.4. The combined governed
            bundle is 61 pages.
          </p>
        </div>

        <div className={styles.paperGrid}>
          {papers.map((paper) => (
            <article className={styles.paperCard} key={paper.id}>
              <div className={styles.paperTop}>
                <span>{paper.number}</span>
                <strong>{paper.accent}</strong>
              </div>
              <div className={styles.paperStatus}>
                <FileCheck2 size={17} />
                <span>VERSION {paper.version}</span>
                <strong>{paper.status}</strong>
              </div>
              <h3>{paper.title}</h3>
              <p className={styles.paperSubtitle}>{paper.subtitle}</p>
              <p>{paper.purpose}</p>
              <ul>
                {paper.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <dl className={styles.metadataList}>
                <div>
                  <dt>State</dt>
                  <dd>Final review packet prepared</dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>v{paper.version}</dd>
                </div>
                <div>
                  <dt>PDF SHA-256</dt>
                  <dd>
                    <code>{shortHash(paper.hash)}</code>
                  </dd>
                </div>
              </dl>
              <div className={styles.cardActions}>
                <button className={styles.primaryButton} onClick={() => setActivePaper(paper)}>
                  <BookOpen size={17} /> Review scope
                </button>
                <a className={styles.secondaryButton} href="#challenge">
                  Challenge this paper <ArrowRight size={16} />
                </a>
              </div>
              {paper.evidenceRoom && (
                <a className={styles.evidenceButton} href="#evidence-room">
                  Open evidence-room index <FileArchive size={17} />
                </a>
              )}
            </article>
          ))}
        </div>

        {activePaper && (
          <div className={styles.readerPanel}>
            <div className={styles.readerHeader}>
              <div>
                <span>REVIEW SCOPE</span>
                <strong>
                  {activePaper.title} · v{activePaper.version}
                </strong>
              </div>
              <button onClick={() => setActivePaper(null)} aria-label="Close review scope">
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: "28px" }}>
              <p style={{ color: "#b7c3c0", lineHeight: 1.7 }}>{activePaper.purpose}</p>
              <p style={{ color: "#b7c3c0", lineHeight: 1.7 }}>
                The governed circulation packet is held privately. Use the exact paper and version selectors below;
                accepted challenges create a descendant state rather than overwriting this artifact.
              </p>
              <a className={styles.primaryButton} href="#challenge">
                Submit a challenge <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </section>

      <section className={styles.lineageSection} id="lineage">
        <div className={styles.sectionHeading}>
          <span>03 // BRANCHED LINEAGE</span>
          <h2>The original remains. The descendants keep learning.</h2>
          <p>Series lineage preserves the split; document lineage preserves every later correction and dissent.</p>
        </div>

        <div className={styles.lineageMap}>
          <div className={styles.parentNode}>
            <span>IMMUTABLE ORIGIN</span>
            <strong>Combined draft v0.1</strong>
            <small>First preserved complete state</small>
          </div>
          <div className={styles.verticalRail} />
          <div className={styles.parentNode}>
            <span>PRESERVED PARENT</span>
            <strong>Combined red-team manuscript v0.8</strong>
            <small>Field case + framework + TAC OPS</small>
          </div>
          <div className={styles.verticalRail} />
          <div className={styles.decisionNode}>
            <Split size={28} />
            <div>
              <span>STRUCTURAL DECISION</span>
              <strong>INST-DEC-20260722-SPLIT-001</strong>
              <p>Split the combined manuscript into empirical, conceptual, and technical descendants.</p>
            </div>
          </div>
          <div className={styles.branchRail}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.childNodes}>
            <div>
              <span>FINAL REVIEW DESCENDANT</span>
              <strong>Paper 1</strong>
              <small>v0.6 · empirical boundary repaired</small>
            </div>
            <div>
              <span>FINAL REVIEW DESCENDANT</span>
              <strong>Paper 2</strong>
              <small>v0.4 · framework and governance</small>
            </div>
            <div>
              <span>FINAL REVIEW DESCENDANT</span>
              <strong>Paper 3</strong>
              <small>v0.4 · technical implementation</small>
            </div>
          </div>
        </div>

        <div className={styles.decisionReceipt}>
          <div>
            <span>RUNTIME EVIDENCE</span>
            <p>External reviewers found scope, evidence, authority, provenance, invariant, and influence defects.</p>
          </div>
          <div>
            <span>AUTHORITY</span>
            <p>Mason Perry retained accountable editorial authority and accepted the material receipts.</p>
          </div>
          <div>
            <span>DECISION</span>
            <p>Repair descendants, preserve parent states, and stop reopening structure without a material defect.</p>
          </div>
          <div>
            <span>OUTCOME</span>
            <p>Paper 1 v0.6, Paper 2 v0.4, Paper 3 v0.4, and a governed 61-page final review bundle.</p>
          </div>
        </div>
      </section>

      <section className={styles.archiveSection} id="archive">
        <div className={styles.sectionHeading}>
          <span>04 // IMMUTABLE PARENT ARCHIVE</span>
          <h2>Superseded does not mean erased.</h2>
          <p>The preserved parent URLs remain active. No descendant silently replaces its source state.</p>
        </div>

        <div className={styles.archiveGrid}>
          {archiveRecords.map((record) => (
            <article key={record.version}>
              <span>
                VERSION {record.version} · {record.label}
              </span>
              <h3>{record.status}</h3>
              <p>{record.note}</p>
              <dl>
                <div>
                  <dt>Date</dt>
                  <dd>{record.date}</dd>
                </div>
                <div>
                  <dt>Hash</dt>
                  <dd>
                    <code>{shortHash(record.hash)}</code>
                  </dd>
                </div>
              </dl>
              <a href={record.href} target="_blank" rel="noreferrer">
                Open preserved parent artifact <ExternalLink size={16} />
              </a>
            </article>
          ))}
        </div>

        <button className={styles.compareButton} onClick={() => setShowCompare((value) => !value)}>
          <Split size={18} />
          {showCompare ? "Hide correction comparison" : "Compare the first split packet with final-review descendants"}
          <ChevronDown size={18} />
        </button>

        {showCompare && (
          <div className={styles.compareGrid}>
            <article>
              <span>FIRST THREE-PAPER STATE</span>
              <h3>The architecture still leaked across its own boundaries</h3>
              <ul>
                <li>MUSE artifacts were intake-pending</li>
                <li>Cost classification lacked sufficient authority controls</li>
                <li>Adaptation lacked an invariant table</li>
                <li>AI influence machinery appeared inside Paper 1</li>
              </ul>
            </article>
            <article>
              <span>FINAL REVIEW DESCENDANTS</span>
              <h3>The receipts now match the architecture</h3>
              <ul>
                <li>Paper 1 v0.6 is a bounded empirical narrative</li>
                <li>Paper 2 v0.4 carries governance and conceptual influence controls</li>
                <li>Paper 3 v0.4 carries technical influence and closed-loop recovery controls</li>
                <li>Internal, external, generated, and unresolved provenance remain explicit</li>
              </ul>
            </article>
          </div>
        )}
      </section>

      <section className={styles.archiveSection} id="evidence-room">
        <div className={styles.sectionHeading}>
          <span>05 // EVIDENCE-ROOM INDEX</span>
          <h2>The technical and field arguments carry bounded receipts.</h2>
          <p>Private originals retain source metadata and access restrictions. Public descriptions never claim more than the artifact shows.</p>
        </div>
        <div className={styles.archiveGrid}>
          <article>
            <span>FIELD + RECOVERY EVIDENCE</span>
            <h3>Observed conditions and closed-loop output</h3>
            <ul>
              {evidenceReceipts.slice(0, 5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>TELEMETRY + ASSURANCE BOUNDARIES</span>
            <h3>Operational divergence, fieldability, and negative receipts</h3>
            <ul>
              {evidenceReceipts.slice(5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.ledgerSection} id="ledger">
        <div className={styles.sectionHeading}>
          <span>06 // CROSS-PAPER RED-TEAM LEDGER</span>
          <h2>Every challenge keeps its target and provenance.</h2>
          <p>
            Internal pressure testing is labeled internal. External challenge is labeled external. Withholding a name
            never changes the origin class.
          </p>
        </div>

        <div className={styles.filterBar} role="group" aria-label="Filter challenges by disposition">
          {(["All", "Submitted", "Under review", "Accepted", "Accepted with modification", "Rejected", "Deferred"] as const).map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={filter === item ? styles.activeFilter : ""}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <div className={styles.ledgerList}>
          {filteredChallenges.map((challenge) => (
            <article className={styles.ledgerEntry} key={challenge.id}>
              <div className={styles.entryTop}>
                <div>
                  <span className={styles.receiptId}>{challenge.id}</span>
                  <h3>{challenge.label}</h3>
                </div>
                <span className={styles.disposition}>{challenge.disposition}</span>
              </div>
              <div className={styles.entryGrid}>
                <div>
                  <span>CONTRIBUTOR</span>
                  <strong>{challenge.contributor}</strong>
                  <small>{challenge.attribution}</small>
                </div>
                <div>
                  <span>DOCUMENT</span>
                  <strong>{challenge.document}</strong>
                  <small>Source: {challenge.sourceVersion}</small>
                </div>
                <div>
                  <span>TARGET</span>
                  <strong>{challenge.target}</strong>
                </div>
                <div className={styles.entrySummary}>
                  <span>CHALLENGE</span>
                  <p>{challenge.summary}</p>
                </div>
                <div className={styles.entrySummary}>
                  <span>EVIDENCE BOUNDARY</span>
                  <p>{challenge.evidence}</p>
                </div>
                <div className={styles.entrySummary}>
                  <span>RESULT / NEXT STATE</span>
                  <p>{challenge.result}</p>
                </div>
              </div>
              <footer>
                <LockKeyhole size={15} /> {challenge.permission}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.loopSection} id="recovery-loop">
        <div className={styles.sectionHeading}>
          <span>07 // LIVING LEARNING ARCHITECTURE</span>
          <h2>Step Zero surrounds the loop. Invariants constrain it.</h2>
          <p>
            Practice may adapt. Truthfulness, lineage, authority, safety, source integrity, assurance boundaries,
            rollback, and human consequence ownership may not silently disappear.
          </p>
        </div>

        <div className={styles.continuityShell}>
          <div className={styles.continuityLabel}>
            <Network size={20} />
            <div>
              <span>STEP ZERO</span>
              <strong>CONTINUITY + INVARIANTS</strong>
              <small>Shared purpose, evidence boundaries, authority map, versioned state, and binding obligations.</small>
            </div>
          </div>
          <div className={styles.loopGrid}>
            <div className={styles.loopControls} role="tablist" aria-label="Recovery loop stages">
              {recoveryLoop.map(([stage], index) => (
                <button
                  key={stage}
                  role="tab"
                  aria-selected={loopIndex === index}
                  onClick={() => setLoopIndex(index)}
                  className={loopIndex === index ? styles.activeLoop : ""}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {stage}
                </button>
              ))}
            </div>
            <article className={styles.loopDetail}>
              <div className={styles.loopOrb}>
                <RefreshCw size={34} />
              </div>
              <span>ADAPTIVE STAGE {String(loopIndex + 1).padStart(2, "0")}</span>
              <h3>{recoveryLoop[loopIndex][0]}</h3>
              <p>{recoveryLoop[loopIndex][1]}</p>
              <div>
                <Waypoints size={18} /> Constrained by the invariant boundary
              </div>
            </article>
          </div>
        </div>

        <blockquote className={styles.wallQuote}>
          The process may evolve. Its truth, lineage, authority, safety, assurance, and rollback obligations may not
          silently evaporate.
        </blockquote>
      </section>

      <section className={styles.challengeSection} id="challenge">
        <div className={styles.challengeIntro}>
          <span>08 // CHALLENGE THE FINAL REVIEW SET</span>
          <h2>
            Find the material defect.
            <br />
            Name the missing evidence.
          </h2>
          <p>
            Choose the exact paper and version. The final gate is deliberately narrow: factual accuracy, evidence,
            attribution, authority, safety, privacy, implementation, or cross-paper boundary leakage.
          </p>
          <div className={styles.boundaryCard}>
            <ShieldCheck size={28} />
            <div>
              <strong>THE ASSURANCE BOUNDARY</strong>
              <p>
                NULLWORKS owns the editorial decision. NULLWORKS does not get to serve as the sole witness to the
                integrity of its own evidence or conclusions.
              </p>
            </div>
          </div>
        </div>

        <form className={styles.challengeForm} onSubmit={submitChallenge}>
          <label className={styles.honeypot}>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          <div className={styles.formRow}>
            <label>
              Name
              <input name="name" required maxLength={120} />
            </label>
            <label>
              Email
              <input name="email" type="email" required maxLength={180} />
            </label>
          </div>

          <label>
            Role / organization
            <input name="role" maxLength={180} placeholder="Optional" />
          </label>

          <div className={styles.formRow}>
            <label>
              Document being challenged
              <select name="document" required defaultValue="">
                <option value="" disabled>
                  Select target
                </option>
                <option>Series architecture</option>
                <option>Paper 1 — Field case</option>
                <option>Paper 2 — Framework</option>
                <option>Paper 3 — TAC OPS implementation</option>
                <option>Combined parent manuscript</option>
                <option>Cross-paper terminology</option>
                <option>Evidence or privacy boundary</option>
              </select>
            </label>
            <label>
              Document version
              <select name="documentVersion" required defaultValue="">
                <option value="" disabled>
                  Select version
                </option>
                <option>Current final review set</option>
                <option>Paper 1 v0.6</option>
                <option>Paper 2 v0.4</option>
                <option>Paper 3 v0.4</option>
                <option>Combined v0.8</option>
                <option>Original v0.1</option>
              </select>
            </label>
          </div>

          <label>
            Exact section, claim, figure, or evidence receipt
            <input
              name="target"
              required
              maxLength={260}
              placeholder="Example: Paper 1 · cross-paper boundary · AI influence controls"
            />
          </label>

          <label>
            Contribution type
            <select name="contributionType" required defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option>Factual correction</option>
              <option>Missing evidence</option>
              <option>Counterargument</option>
              <option>Operational failure mode</option>
              <option>Safety or authority concern</option>
              <option>Privacy / attribution issue</option>
              <option>Implementation or measurement critique</option>
              <option>Cross-paper boundary defect</option>
              <option>Proposed wording</option>
            </select>
          </label>

          <label>
            Argument or contribution
            <textarea
              name="argument"
              required
              rows={7}
              maxLength={8000}
              placeholder="State the material defect clearly. What is wrong, incomplete, unsupported, unsafe, or placed in the wrong paper?"
            />
          </label>

          <label>
            Supporting evidence
            <textarea
              name="evidence"
              rows={5}
              maxLength={6000}
              placeholder="Sources, observations, reproducible steps, or evidence that would change the claim."
            />
          </label>

          <label className={styles.fileField}>
            Optional attachment
            <input name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.doc,.docx" />
            <small>
              Intake currently records the filename. Attach the actual file when replying to the delivered receipt if
              required.
            </small>
          </label>

          <div className={styles.formRow}>
            <label>
              Attribution preference
              <select name="attribution" required>
                <option>Anonymous public summary</option>
                <option>Named attribution if accepted</option>
                <option>Private review only</option>
              </select>
            </label>
            <label>
              Quotation permission
              <select name="quotePermission" required>
                <option>No direct quotation</option>
                <option>Quote only after written approval</option>
                <option>Direct quotation permitted with attribution</option>
                <option>Direct quotation permitted anonymously</option>
              </select>
            </label>
          </div>

          <label>
            Conflict disclosure
            <input name="conflict" maxLength={500} placeholder="Optional but encouraged" />
          </label>

          <label className={styles.consent}>
            <input type="checkbox" name="consent" required />
            <span>I understand submission does not guarantee publication, acceptance, attribution, or incorporation.</span>
          </label>

          <button className={styles.submitButton} type="submit" disabled={submitting}>
            {submitting ? "DELIVERING…" : "SUBMIT CHALLENGE"} <Send size={18} />
          </button>

          {receipt && (
            <div className={styles.receiptNotice}>
              <strong>RECEIPT {receipt.id}</strong>
              <p>{receipt.message}</p>
            </div>
          )}
        </form>
      </section>

      <footer className={styles.footer}>
        <div>
          <span className={styles.brandMark}>NW</span>
          <div>
            <strong>NULLWORKS</strong>
            <small>Operational Intelligence Architecture</small>
          </div>
        </div>
        <p>The work may change. The evidence, lineage, and accountable decisions remain.</p>
        <a href="/">
          Return to NULLWORKS <ArrowRight size={16} />
        </a>
      </footer>
    </main>
  );
}
