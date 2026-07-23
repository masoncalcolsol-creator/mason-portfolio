"use client";

import {
  ArrowDown, ArrowRight, BookOpen, ChevronDown, ExternalLink, FileArchive,
  FileCheck2, Fingerprint, GitBranch, LockKeyhole, Network, RefreshCw,
  Send, ShieldCheck, Split, Waypoints, X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import styles from "./instantiation-series.module.css";
import {
  archiveRecords, challenges, evidenceReceipts, papers, recoveryLoop,
  type Disposition, type PaperRecord,
} from "./instantiation-v03-data";

const stats = [
  ["CURRENT MANUSCRIPTS", "3"],
  ["CURRENT VERSIONS", "0.3 / 0.3 / 0.2"],
  ["PRESERVED PARENT STATES", "2"],
  ["PUBLIC LEDGER RECEIPTS", String(challenges.length)],
  ["PUBLIC RELEASES", "0"],
  ["REVIEW STATE", "RED TEAM"],
];

function shortHash(hash: string) {
  return `${hash.slice(0, 12)}…${hash.slice(-10)}`;
}

export default function InstantiationExperienceV03() {
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
      name: fields.get("name"), email: fields.get("email"), role: fields.get("role"),
      target: `${documentName} · ${version} · ${exactTarget}`,
      contributionType: fields.get("contributionType"), argument: fields.get("argument"),
      evidence: fields.get("evidence"),
      attachmentName: attachment instanceof File && attachment.size ? attachment.name : "",
      attribution: fields.get("attribution"), quotePermission: fields.get("quotePermission"),
      conflict: fields.get("conflict"), consent: fields.get("consent") === "on",
      website: fields.get("website"),
    };
    try {
      const response = await fetch("/api/instantiation/challenges", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed.");
      setReceipt({ id: result.receiptId, message: result.message || "Your submission has been sent for private review." });
      form.reset();
    } catch (error) {
      setReceipt({ id: "NOT CREATED", message: error instanceof Error ? error.message : "Submission failed." });
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
          <a href="#series">Series</a><a href="#lineage">Lineage</a>
          <a href="#ledger">Ledger</a><a href="#challenge">Challenge</a>
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
              External reviewers found an authority loophole, an empirical verification gap, an assurance-provenance ambiguity, and a missing invariant boundary. The challenges were accepted. Papers 1 and 2 changed. Their v0.2 parents remain preserved.
            </p>
            <div className={styles.heroActions}>
              <a href="#series" className={styles.primaryButton}>Inspect the current papers <ArrowDown size={18} /></a>
              <a href="#ledger" className={styles.secondaryButton}>Read the correction receipts <GitBranch size={18} /></a>
              <a href="#challenge" className={styles.textButton}>Submit a targeted challenge <ArrowRight size={17} /></a>
            </div>
            <p className={styles.heroFine}>MASON PERRY / NULLWORKS · EMPIRICAL → CONCEPTUAL → TECHNICAL</p>
          </div>
          <div className={styles.heroSystem} aria-label="Current series state">
            <div className={styles.systemHeader}><span>LIVE SERIES STATE</span><span className={styles.pulse}>OBSERVING</span></div>
            {stats.map(([label, value]) => <div className={styles.statRow} key={label}><span>{label}</span><strong>{value}</strong></div>)}
            <div className={styles.lineageMini}><span>0.1</span><i /><span>0.8</span><i className={styles.branchLine} /><span>01 · 02 · 03</span></div>
            <small>No public release is claimed. Current manuscripts remain working drafts under external challenge.</small>
          </div>
        </div>
      </section>

      <section className={styles.premise} id="premise">
        <div className={styles.sectionMarker}>01 // THE OBSERVED CHANGE</div>
        <div className={styles.premiseGrid}>
          <h2>The framework was required to apply its own rules to itself.</h2>
          <div>
            <p>The series says runtime evidence must challenge the declared model and the resulting decision must remain inspectable.</p>
            <p>The red team showed where that was not yet true: an ungoverned Cost Boundary classifier, mixed MUSE evidence classes, ambiguous provenance, and no explicit invariant boundary.</p>
            <blockquote>The criticism did not break the thesis. It forced the thesis to become operational.</blockquote>
            <p>The v0.2 manuscripts remain immutable. Papers 1 and 2 continue as v0.3 descendants with the challenge receipts attached.</p>
          </div>
        </div>
      </section>

      <section className={styles.seriesSection} id="series">
        <div className={styles.sectionHeading}>
          <span>02 // CURRENT DESCENDANT MANUSCRIPTS</span>
          <h2>One problem. Three accountable papers.</h2>
          <p>The current packet contains Paper 1 v0.3, Paper 2 v0.3, and Paper 3 v0.2. This page is the canonical map, lineage record, and challenge intake.</p>
        </div>
        <div className={styles.paperGrid}>
          {papers.map((paper) => (
            <article className={styles.paperCard} key={paper.id}>
              <div className={styles.paperTop}><span>{paper.number}</span><strong>{paper.accent}</strong></div>
              <div className={styles.paperStatus}><FileCheck2 size={17} /><span>VERSION {paper.version}</span><strong>{paper.status}</strong></div>
              <h3>{paper.title}</h3><p className={styles.paperSubtitle}>{paper.subtitle}</p><p>{paper.purpose}</p>
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
              <p style={{ color: "#b7c3c0", lineHeight: 1.7 }}>Use the exact paper and version selectors below. The PDF in the review packet is the immutable artifact identified by the hash shown above.</p>
              <a className={styles.primaryButton} href="#challenge">Submit a challenge <ArrowRight size={16} /></a>
            </div>
          </div>
        )}
      </section>

      <section className={styles.lineageSection} id="lineage">
        <div className={styles.sectionHeading}>
          <span>03 // BRANCHED LINEAGE</span><h2>The original remains. The descendants keep learning.</h2>
          <p>Series lineage records the original split. Document lineage records later corrections without rewriting the parents.</p>
        </div>
        <div className={styles.lineageMap}>
          <div className={styles.parentNode}><span>IMMUTABLE ORIGIN</span><strong>Combined draft v0.1</strong><small>First preserved complete state</small></div>
          <div className={styles.verticalRail} />
          <div className={styles.parentNode}><span>PRESERVED PARENT</span><strong>Combined red-team manuscript v0.8</strong><small>Field case + framework + TAC OPS</small></div>
          <div className={styles.verticalRail} />
          <div className={styles.decisionNode}><Split size={28} /><div><span>STRUCTURAL DECISION</span><strong>INST-DEC-20260722-SPLIT-001</strong><p>Split the combined manuscript into empirical, conceptual, and technical descendants.</p></div></div>
          <div className={styles.branchRail}><i /><i /><i /></div>
          <div className={styles.childNodes}>
            <div><span>CURRENT DESCENDANT</span><strong>Paper 1</strong><small>v0.3 · evidence correction</small></div>
            <div><span>CURRENT DESCENDANT</span><strong>Paper 2</strong><small>v0.3 · governance correction</small></div>
            <div><span>CURRENT DESCENDANT</span><strong>Paper 3</strong><small>v0.2 · implementation</small></div>
          </div>
        </div>
        <div className={styles.decisionReceipt}>
          <div><span>RUNTIME EVIDENCE</span><p>External reviewers identified four places where the architecture did not yet satisfy its own standard.</p></div>
          <div><span>AUTHORITY</span><p>Mason Perry retained accountable editorial authority and accepted the receipts.</p></div>
          <div><span>DECISION</span><p>Revise the descendants; preserve every parent state and the dissent that caused the change.</p></div>
          <div><span>OUTCOME</span><p>Paper 1 v0.3, Paper 2 v0.3, corrected provenance, and an open MUSE artifact intake.</p></div>
        </div>
      </section>

      <section className={styles.archiveSection} id="archive">
        <div className={styles.sectionHeading}>
          <span>04 // IMMUTABLE PARENT ARCHIVE</span><h2>Superseded does not mean erased.</h2>
          <p>The original URLs remain active. Nothing was renamed into a descendant or silently overwritten.</p>
        </div>
        <div className={styles.archiveGrid}>
          {archiveRecords.map((record) => (
            <article key={record.version}>
              <span>VERSION {record.version} · {record.label}</span><h3>{record.status}</h3><p>{record.note}</p>
              <dl><div><dt>Date</dt><dd>{record.date}</dd></div><div><dt>Hash</dt><dd><code>{shortHash(record.hash)}</code></dd></div></dl>
              <a href={record.href} target="_blank" rel="noreferrer">Open preserved parent artifact <ExternalLink size={16} /></a>
            </article>
          ))}
        </div>
        <button className={styles.compareButton} onClick={() => setShowCompare((value) => !value)}><Split size={18} /> {showCompare ? "Hide correction comparison" : "Compare the v0.2 parents with current descendants"} <ChevronDown size={18} /></button>
        {showCompare && (
          <div className={styles.compareGrid}>
            <article><span>v0.2 PARENT STATE</span><h3>The first three-paper packet</h3><ul><li>MUSE register identified open receipts</li><li>Cost classes were delegated to the operating environment</li><li>Adaptation lacked an invariant table</li><li>SEED provenance was ambiguous</li></ul></article>
            <article><span>CURRENT DESCENDANTS</span><h3>The criticism is part of the architecture</h3><ul><li>Paper 1 v0.3 separates evidence classes and open claims</li><li>Paper 2 v0.3 governs classifier incentives</li><li>Paper 2 v0.3 states invariant obligations</li><li>INSTANTIATION labels internal tests plainly</li></ul></article>
          </div>
        )}
      </section>

      <section className={styles.archiveSection} id="evidence-room">
        <div className={styles.sectionHeading}>
          <span>05 // PAPER 3 EVIDENCE-ROOM INDEX</span><h2>The technical argument carries receipts.</h2>
          <p>Names and street addresses are masked in review figures. Originals remain segregated in the private source record.</p>
        </div>
        <div className={styles.archiveGrid}>
          <article><span>FIELD EVIDENCE</span><h3>Closed-loop recovery proof</h3><ul>{evidenceReceipts.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><span>TELEMETRY + DEPLOYMENT</span><h3>Operational divergence and fieldability</h3><ul>{evidenceReceipts.slice(4).map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className={styles.ledgerSection} id="ledger">
        <div className={styles.sectionHeading}>
          <span>06 // CROSS-PAPER RED-TEAM LEDGER</span><h2>Every challenge keeps its target and provenance.</h2>
          <p>Internal pressure testing is labeled internal. External challenge is labeled external. Withholding a name never changes the origin class.</p>
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
          <span>07 // LIVING LEARNING ARCHITECTURE</span><h2>Step Zero surrounds the loop. Invariants constrain it.</h2>
          <p>The practice may adapt. Truthfulness, lineage, authority, safety, source integrity, assurance boundaries, rollback, and human consequence ownership may not silently disappear.</p>
        </div>
        <div className={styles.continuityShell}>
          <div className={styles.continuityLabel}><Network size={20} /><div><span>STEP ZERO</span><strong>CONTINUITY + INVARIANTS</strong><small>Shared purpose, evidence boundaries, authority map, versioned state, and binding obligations.</small></div></div>
          <div className={styles.loopGrid}>
            <div className={styles.loopControls} role="tablist" aria-label="Recovery loop stages">
              {recoveryLoop.map(([stage], index) => <button key={stage} role="tab" aria-selected={loopIndex === index} onClick={() => setLoopIndex(index)} className={loopIndex === index ? styles.activeLoop : ""}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</button>)}
            </div>
            <article className={styles.loopDetail}>
              <div className={styles.loopOrb}><RefreshCw size={34} /></div><span>ADAPTIVE STAGE {String(loopIndex + 1).padStart(2, "0")}</span><h3>{recoveryLoop[loopIndex][0]}</h3><p>{recoveryLoop[loopIndex][1]}</p><div><Waypoints size={18} /> Constrained by the invariant boundary</div>
            </article>
          </div>
        </div>
        <blockquote className={styles.wallQuote}>The process may evolve. Its truth, lineage, authority, safety, assurance, and rollback obligations may not silently evaporate.</blockquote>
      </section>

      <section className={styles.challengeSection} id="challenge">
        <div className={styles.challengeIntro}>
          <span>08 // CHALLENGE THE SERIES</span><h2>Find the weak claim.<br />Name the missing evidence.</h2>
          <p>Choose the exact paper and version. Your challenge is delivered privately, receives a receipt, and cannot directly edit or publish anything.</p>
          <div className={styles.boundaryCard}><ShieldCheck size={28} /><div><strong>THE ASSURANCE BOUNDARY</strong><p>NULLWORKS owns the editorial decision. NULLWORKS does not get to serve as the sole witness to the integrity of its own evidence or conclusions.</p></div></div>
        </div>
        <form className={styles.challengeForm} onSubmit={submitChallenge}>
          <label className={styles.honeypot}>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className={styles.formRow}><label>Name<input name="name" required maxLength={120} /></label><label>Email<input name="email" type="email" required maxLength={180} /></label></div>
          <label>Role / organization<input name="role" maxLength={180} placeholder="Optional" /></label>
          <div className={styles.formRow}>
            <label>Document being challenged<select name="document" required defaultValue=""><option value="" disabled>Select target</option><option>Series architecture</option><option>Paper 1 — Field case</option><option>Paper 2 — Framework</option><option>Paper 3 — TAC OPS implementation</option><option>Combined parent manuscript</option><option>Cross-paper terminology</option><option>Evidence or privacy boundary</option></select></label>
            <label>Document version<select name="documentVersion" required defaultValue=""><option value="" disabled>Select version</option><option>Current working version</option><option>Paper 1 v0.3</option><option>Paper 2 v0.3</option><option>Paper 3 v0.2</option><option>Paper 1 v0.2 parent</option><option>Paper 2 v0.2 parent</option><option>Combined v0.8</option><option>Original v0.1</option></select></label>
          </div>
          <label>Exact section, claim, figure, or evidence receipt<input name="target" required maxLength={260} placeholder="Example: Paper 2 · Cost Boundary · classifier authority" /></label>
          <label>Contribution type<select name="contributionType" required defaultValue=""><option value="" disabled>Select one</option><option>Factual correction</option><option>Missing evidence</option><option>Counterargument</option><option>Operational failure mode</option><option>Safety or authority concern</option><option>Privacy / attribution issue</option><option>Implementation or measurement critique</option><option>Proposed wording</option></select></label>
          <label>Argument or contribution<textarea name="argument" required rows={7} maxLength={8000} placeholder="State the challenge clearly. What is wrong, incomplete, unsupported, or operationally naive?" /></label>
          <label>Supporting evidence<textarea name="evidence" rows={5} maxLength={6000} placeholder="Sources, observations, reproducible steps, or evidence that would change the claim." /></label>
          <label className={styles.fileField}>Optional attachment<input name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.doc,.docx" /><small>The intake currently records the filename. Attach the actual file when replying to the delivered receipt if required.</small></label>
          <div className={styles.formRow}><label>Attribution preference<select name="attribution" required><option>Anonymous public summary</option><option>Named attribution if accepted</option><option>Private review only</option></select></label><label>Quotation permission<select name="quotePermission" required><option>No direct quotation</option><option>Quote only after written approval</option><option>Direct quotation permitted with attribution</option><option>Direct quotation permitted anonymously</option></select></label></div>
          <label>Conflict disclosure<input name="conflict" maxLength={500} placeholder="Optional but encouraged" /></label>
          <label className={styles.consent}><input type="checkbox" name="consent" required /><span>I understand submission does not guarantee publication, acceptance, attribution, or incorporation.</span></label>
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
