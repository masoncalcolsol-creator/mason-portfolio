"use client";

import {
  ArrowDown,
  ArrowRight,
  CircleAlert,
  ChevronDown,
  Download,
  ExternalLink,
  FileCheck2,
  FileClock,
  FileText,
  Fingerprint,
  GitBranch,
  LockKeyhole,
  Mail,
  Quote,
  RefreshCw,
  Scale,
  Send,
  ShieldCheck,
  Split,
  Stamp,
  Waypoints,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import styles from "./instantiation.module.css";

type Disposition =
  | "Submitted"
  | "Under review"
  | "Accepted"
  | "Accepted with modification"
  | "Rejected"
  | "Deferred"
  | "Withdrawn";

type Challenge = {
  id: string;
  label: string;
  contributor: string;
  attribution: string;
  target: string;
  summary: string;
  evidence: string;
  disposition: Disposition;
  version: string;
  permission: string;
};

const challenges: Challenge[] = [
  {
    id: "SEED-INST-001",
    label: "Institutional courage",
    contributor: "Attribution withheld",
    attribution: "Private review only",
    target: "Chapter 05 · The courage boundary",
    summary:
      "A permission-gated challenge argues that courage cannot be manufactured as a product, but evidence can make avoidance specific and make inaction more expensive.",
    evidence: "Private correspondence preserved; no public quotation or screenshot permission recorded.",
    disposition: "Under review",
    version: "0.8",
    permission: "PLACEHOLDER RECORD — NOT A PUBLISHED CONTRIBUTOR RECEIPT",
  },
  {
    id: "SEED-INST-002",
    label: "Independent assurance",
    contributor: "Source attribution pending",
    attribution: "Anonymous public summary",
    target: "Assurance boundary",
    summary:
      "Continuous self-inspection is operationally useful, but the builder cannot be the sole independent assurer of its own evidence, scope, incentives, and conclusions.",
    evidence: "Working doctrine record; reviewer identity and exact source receipt are not public on this build.",
    disposition: "Under review",
    version: "0.8",
    permission: "SEED SUMMARY — SOURCE RECEIPT REQUIRED BEFORE PUBLICATION",
  },
  {
    id: "SEED-INST-003",
    label: "Exception handling proves the operating model",
    contributor: "No contributor asserted",
    attribution: "Anonymous public summary",
    target: "Recovery loop · abnormal conditions",
    summary:
      "Shared language in a meeting does not prove shared understanding. Independent predictions under abnormal conditions reveal whether the team actually shares an operating model.",
    evidence: "Conceptual red-team prompt only; not represented as an accepted external finding.",
    disposition: "Submitted",
    version: "0.8",
    permission: "SEED PROMPT — NOT AN ENDORSEMENT OR REVIEW OUTCOME",
  },
];

const recoveryLoop = [
  ["Observe", "Receive the challenge and identify the exact claim, section, condition, or missing evidence."],
  ["Preserve", "Create an immutable receipt while keeping private material inside the permission boundary."],
  ["Decide", "An accountable human authority publishes a disposition and the reasoning behind it."],
  ["Act", "An accepted decision creates a new version. The prior version remains intact."],
  ["Measure", "Gather further review, check the operational result, and inspect whether the change solved the stated problem."],
  ["Learn", "Explain what changed, what remained uncertain, and what the evidence now supports."],
  ["Repeat", "Publish the next preserved state and reconnect every lineage path."],
] as const;

const receiptFlow = [
  "Challenge submitted",
  "Receipt created",
  "Permission and attribution checked",
  "Evidence reviewed",
  "Accountable authority decides",
  "Disposition published",
  "Revision incorporated into a new version",
  "Outcome and diff preserved",
];

const versionRecords = [
  {
    version: "0.8",
    label: "PUBLIC RED-TEAM EDITION",
    date: "July 21, 2026",
    status: "RED TEAM WORKING DRAFT",
    hash: "fd3ffa8ba35b53804f9f878a8a74760d09120f6accd2b4e667dd439ba05593e9",
    href: "/api/instantiation/current-pdf?v=20260721-1",
    note: "Chapter 5 integrated. Permission-gated correspondence and screenshots are omitted from the public edition while the private source record remains preserved.",
  },
  {
    version: "0.1",
    label: "ORIGINAL RECONSTRUCTED WORKING DRAFT",
    date: "July 21, 2026",
    status: "IMMUTABLE HISTORICAL ARTIFACT",
    hash: "1e2a20197a26acdbcb818578528ea075d4709452ca548ebc777ee3505f6b63cb",
    href: "/api/instantiation/original-pdf?v=20260721-1",
    note: "The first complete reconstructed working draft. Chapters 1–4 are present; Chapter 5 remains a transition brief.",
  },
];

const stats = [
  ["CURRENT VERSION", "0.8"],
  ["PUBLIC RELEASES", "0"],
  ["PRESERVED STATES", "2"],
  ["SEED CHALLENGES", "3"],
  ["REVIEW STATUS", "RED TEAM"],
];

function shortHash(hash: string) {
  return `${hash.slice(0, 12)}…${hash.slice(-10)}`;
}

export default function InstantiationExperience() {
  const [filter, setFilter] = useState<"All" | Disposition>("All");
  const [loopIndex, setLoopIndex] = useState(0);
  const [showPaper, setShowPaper] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [receipt, setReceipt] = useState<null | {
    id: string;
    stored: boolean;
    mailto?: string;
    message: string;
  }>(null);
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
    const payload = {
      name: fields.get("name"),
      email: fields.get("email"),
      role: fields.get("role"),
      target: fields.get("target"),
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

      const body = [
        `INSTANTIATION RED-TEAM RECEIPT: ${result.receiptId}`,
        "Document version: 0.8",
        `Name: ${String(payload.name)}`,
        `Email: ${String(payload.email)}`,
        `Role / organization: ${String(payload.role || "Not supplied")}`,
        `Target: ${String(payload.target)}`,
        `Contribution type: ${String(payload.contributionType)}`,
        `Attribution preference: ${String(payload.attribution)}`,
        `Quotation permission: ${String(payload.quotePermission)}`,
        `Conflict disclosure: ${String(payload.conflict || "Not supplied")}`,
        `Attachment to add manually: ${String(payload.attachmentName || "None")}`,
        "",
        "ARGUMENT OR CONTRIBUTION",
        String(payload.argument),
        "",
        "SUPPORTING EVIDENCE",
        String(payload.evidence || "Not supplied"),
        "",
        "This email is the private delivery handoff for the receipt above. It does not publish or directly edit the paper.",
      ].join("\n");
      const email = result.fallbackEmail || "masoncalcolsol@gmail.com";
      const mailto = `mailto:${email}?subject=${encodeURIComponent(`INSTANTIATION challenge ${result.receiptId}`)}&body=${encodeURIComponent(body)}`;

      setReceipt({
        id: result.receiptId,
        stored: Boolean(result.stored),
        mailto: result.stored ? undefined : mailto,
        message: result.stored
          ? "The private review endpoint accepted the submission. Nothing was published automatically."
          : "A receipt was created, but durable private storage is not connected on this deployment. Complete delivery through the private email handoff below and attach any selected file in your mail client.",
      });
      if (result.stored) form.reset();
    } catch (error) {
      setReceipt({
        id: "NOT CREATED",
        stored: false,
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
          <a href="#paper">Paper</a>
          <a href="#ledger">Ledger</a>
          <a href="#challenge">Challenge</a>
        </nav>
        <span className={styles.headerStatus}><span /> RED TEAM · NOINDEX</span>
      </header>

      <section className={styles.hero} id="hero">
        <div className={styles.heroPoster} aria-hidden="true">
          <img
            src="/api/assets/instantiation-poster?v=20260721-1"
            alt=""
            fetchPriority="high"
          />
          <div className={styles.posterVeil} />
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><Fingerprint size={16} /> A living demonstration of its own theory</p>
            <h1>INSTANTIATION</h1>
            <h2>THE PAPER WITHIN THE PAPER</h2>
            <p className={styles.heroLead}>The document is alive.<br />The record is immutable.</p>
            <p className={styles.heroBody}>
              A white paper about runtime truth, preserved evidence, accountable decisions, and external challenge has become a publicly inspectable system that performs those functions on itself.
            </p>
            <div className={styles.heroActions}>
              <a href="#paper" className={styles.primaryButton}>Read the current paper <ArrowDown size={18} /></a>
              <a href="#ledger" className={styles.secondaryButton}>Inspect the evidence trail <GitBranch size={18} /></a>
              <a href="#challenge" className={styles.textButton}>Submit a challenge <ArrowRight size={17} /></a>
            </div>
            <p className={styles.heroFine}>MASON PERRY / NULLWORKS · A TAC OPS FIELD CASE</p>
          </div>

          <div className={styles.heroSystem} aria-label="Current document state">
            <div className={styles.systemHeader}><span>LIVE DOCUMENT STATE</span><span className={styles.pulse}>OBSERVING</span></div>
            {stats.map(([label, value]) => (
              <div className={styles.statRow} key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
            <div className={styles.lineageMini}>
              <span>0.1</span><i /><span>0.8</span><i className={styles.pendingLine} /><span>1.0</span>
            </div>
            <small>Version 1.0 remains pending. No public release is claimed.</small>
          </div>
        </div>
      </section>

      <section className={styles.premise} id="premise">
        <div className={styles.sectionMarker}>01 // THE PREMISE</div>
        <div className={styles.premiseGrid}>
          <h2>The paper became the system.</h2>
          <div>
            <p>The white paper argues that organizations must observe what actually happens, preserve inconvenient evidence, identify who may decide, accept external challenge, and retain the lineage of every consequential revision.</p>
            <p>Then the paper was placed inside those same mechanisms.</p>
            <blockquote>This paper does not merely argue for receipts. It has receipts.</blockquote>
            <p>The current document can change. The historical record cannot disappear.</p>
          </div>
        </div>
      </section>

      <section className={styles.documentSection} id="paper">
        <div className={styles.sectionHeading}>
          <span>02 // CURRENT ACCEPTED WORKING VERSION</span>
          <h2>The Workflow on Paper Was Never the Workflow</h2>
          <p>From Runtime Truth to Operational Recovery · A TAC OPS Field Case</p>
        </div>

        <div className={styles.documentGrid}>
          <article className={styles.paperCard}>
            <div className={styles.paperStatus}><FileCheck2 size={18} /><span>VERSION 0.8</span><strong>RED TEAM WORKING DRAFT</strong></div>
            <h3>Public red-team edition</h3>
            <p>
              This edition preserves the working argument while omitting permission-gated correspondence, screenshots, names, and direct quotations from the public asset. Those records remain private until affirmative publication permission exists.
            </p>
            <dl className={styles.metadataList}>
              <div><dt>Author</dt><dd>Mason Perry / NULLWORKS</dd></div>
              <div><dt>Publication state</dt><dd>Not yet publicly released</dd></div>
              <div><dt>Edition date</dt><dd>July 21, 2026</dd></div>
              <div><dt>Document hash</dt><dd><code>{shortHash(versionRecords[0].hash)}</code></dd></div>
              <div><dt>Review status</dt><dd>External red team requested</dd></div>
            </dl>
            <div className={styles.cardActions}>
              <button className={styles.primaryButton} onClick={() => setShowPaper((value) => !value)}>
                {showPaper ? "Close web reader" : "Read online"} <FileText size={17} />
              </button>
              <a className={styles.secondaryButton} href={versionRecords[0].href} target="_blank" rel="noreferrer">
                Open PDF <ExternalLink size={17} />
              </a>
              <a className={styles.iconButton} href={versionRecords[0].href} download aria-label="Download version 0.8 PDF"><Download size={18} /></a>
            </div>
          </article>

          <aside className={styles.lineageCard}>
            <span className={styles.monoLabel}>LINEAGE STATUS</span>
            <div className={styles.lineageNode}><span>ORIGINAL</span><strong>DRAFT 0.1</strong><small>Immutable reconstruction</small></div>
            <div className={styles.lineageRail}><i /><i /><i /></div>
            <div className={styles.lineageNode}><span>CURRENT</span><strong>VERSION 0.8</strong><small>Public red-team edition</small></div>
            <div className={styles.lineageRail}><i /><i /><i /></div>
            <div className={`${styles.lineageNode} ${styles.futureNode}`}><span>PENDING</span><strong>VERSION 1.0</strong><small>Requires completed review gate</small></div>
          </aside>
        </div>

        {showPaper && (
          <div className={styles.readerPanel}>
            <div className={styles.readerHeader}>
              <div><span>WEB READER</span><strong>INSTANTIATION · VERSION 0.8</strong></div>
              <button onClick={() => setShowPaper(false)} aria-label="Close paper reader"><X size={20} /></button>
            </div>
            <iframe
              title="The Workflow on Paper Was Never the Workflow, version 0.8 public red-team edition"
              src="/api/instantiation/current-pdf?v=20260721-1#view=FitH"
            />
            <p>If your mobile browser does not render the embedded document, use <a href={versionRecords[0].href} target="_blank" rel="noreferrer">Open PDF</a>.</p>
          </div>
        )}
      </section>

      <section className={styles.originalSection} id="original-draft">
        <div>
          <span className={styles.monoLabel}>IMMUTABLE ORIGIN · VERSION 0.1</span>
          <h2>Original Working Draft</h2>
          <p>The first complete reconstructed working draft remains independently accessible. It is not replaced when the current paper changes.</p>
        </div>
        <div className={styles.originalReceipt}>
          <FileClock size={30} />
          <div><span>SHA-256</span><code>{shortHash(versionRecords[1].hash)}</code><small>Known limitation: Chapter 5 was still a transition brief.</small></div>
          <a href={versionRecords[1].href} target="_blank" rel="noreferrer">Inspect original <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className={styles.ledgerSection} id="ledger">
        <div className={styles.sectionHeading}>
          <span>03 // PUBLIC RED-TEAM LEDGER</span>
          <h2>Every challenge leaves a decision trail.</h2>
          <p>These initial entries are deliberately marked as seed or permission-gated records. They are not fabricated endorsements, public quotations, or completed review outcomes.</p>
        </div>

        <div className={styles.filterBar} role="group" aria-label="Filter challenges by disposition">
          {(["All", "Submitted", "Under review", "Accepted", "Rejected", "Deferred"] as const).map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={filter === item ? styles.activeFilter : ""}>{item}</button>
          ))}
        </div>

        <div className={styles.ledgerList}>
          {filteredChallenges.map((challenge) => (
            <article className={styles.ledgerEntry} key={challenge.id}>
              <div className={styles.entryTop}>
                <div><span className={styles.receiptId}>{challenge.id}</span><h3>{challenge.label}</h3></div>
                <span className={`${styles.disposition} ${styles[challenge.disposition.toLowerCase().replaceAll(" ", "")]}`}>{challenge.disposition}</span>
              </div>
              <div className={styles.entryGrid}>
                <div><span>CONTRIBUTOR</span><strong>{challenge.contributor}</strong><small>{challenge.attribution}</small></div>
                <div><span>TARGET</span><strong>{challenge.target}</strong><small>Document version {challenge.version}</small></div>
                <div className={styles.entrySummary}><span>CHALLENGE</span><p>{challenge.summary}</p></div>
                <div className={styles.entrySummary}><span>EVIDENCE BOUNDARY</span><p>{challenge.evidence}</p></div>
              </div>
              <footer><LockKeyhole size={15} /> {challenge.permission}</footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.receiptSection} id="decision-receipt">
        <div className={styles.sectionHeading}>
          <span>04 // DECISION RECEIPT</span>
          <h2>A contribution proposes a change. It does not edit the paper.</h2>
          <p>The public may challenge. The author retains accountable editorial authority. The decision must leave a receipt.</p>
        </div>
        <ol className={styles.flowList}>
          {receiptFlow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
        </ol>
      </section>

      <section className={styles.versionSection} id="versions">
        <div className={styles.sectionHeading}>
          <span>05 // VERSION HISTORY</span>
          <h2>A correction creates a new state.</h2>
          <p>Never overwrite an existing version. Preserve the PDF, web state, hash, material change, and challenge lineage that produced the next edition.</p>
        </div>
        <div className={styles.versionGrid}>
          {versionRecords.map((version, index) => (
            <article className={styles.versionCard} key={version.version}>
              <div className={styles.versionNumber}>v{version.version}</div>
              <span>{version.label}</span>
              <h3>{version.status}</h3>
              <p>{version.note}</p>
              <dl><div><dt>Date</dt><dd>{version.date}</dd></div><div><dt>Hash</dt><dd><code>{shortHash(version.hash)}</code></dd></div></dl>
              <a href={version.href} target="_blank" rel="noreferrer">Open preserved artifact <ExternalLink size={16} /></a>
              {index === 0 && <i className={styles.currentFlag}>CURRENT</i>}
            </article>
          ))}
        </div>
        <button className={styles.compareButton} onClick={() => setShowCompare((value) => !value)}>
          <Split size={18} /> {showCompare ? "Hide version comparison" : "Compare 0.1 with 0.8"} <ChevronDown size={18} />
        </button>
        {showCompare && (
          <div className={styles.compareGrid}>
            <article><span>VERSION 0.1</span><h3>Before external red-team integration</h3><ul><li>Chapters 1–4 reconstructed</li><li>Chapter 5 represented as a transition brief</li><li>No public living-document layer</li></ul></article>
            <article><span>VERSION 0.8</span><h3>Current working state</h3><ul><li>Normalization of deviance chapter integrated</li><li>Institutional-courage and assurance boundaries surfaced</li><li>Permission-gated source material separated from the public edition</li><li>Version and challenge lineage instantiated on this page</li></ul></article>
          </div>
        )}
      </section>

      <section className={styles.featuredSection} id="featured-challenges">
        <div className={styles.sectionHeading}>
          <span>06 // CHALLENGES THAT MAY CHANGE THE PAPER</span>
          <h2>The system rewards close inspection.</h2>
        </div>
        <div className={styles.featureGrid}>
          {challenges.map((challenge, index) => (
            <article key={challenge.id}>
              <span>0{index + 1}</span>
              <Quote size={24} />
              <h3>{challenge.label}</h3>
              <p>{challenge.summary}</p>
              <small>{challenge.permission}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.loopSection} id="recovery-loop">
        <div className={styles.sectionHeading}>
          <span>07 // THE RECOVERY LOOP</span>
          <h2>The doctrine is running on the page.</h2>
          <p>Internal observation creates operational intelligence. Independent challenge creates credible assurance.</p>
        </div>
        <div className={styles.loopGrid}>
          <div className={styles.loopControls} role="tablist" aria-label="Recovery loop stages">
            {recoveryLoop.map(([stage], index) => (
              <button key={stage} role="tab" aria-selected={loopIndex === index} onClick={() => setLoopIndex(index)} className={loopIndex === index ? styles.activeLoop : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>{stage}
              </button>
            ))}
          </div>
          <article className={styles.loopDetail}>
            <div className={styles.loopOrb}><RefreshCw size={34} /></div>
            <span>STAGE {String(loopIndex + 1).padStart(2, "0")}</span>
            <h3>{recoveryLoop[loopIndex][0]}</h3>
            <p>{recoveryLoop[loopIndex][1]}</p>
            <div><Waypoints size={18} /> Implemented by this page</div>
          </article>
        </div>
      </section>

      <section className={styles.challengeSection} id="challenge">
        <div className={styles.challengeIntro}>
          <span className={styles.monoLabel}>08 // EXTERNAL CHALLENGE INTAKE</span>
          <h2>Challenge the paper.</h2>
          <p>The current document is not self-validating. Submit a correction, disagreement, missing source, field example, operational counterexample, or implementation concern.</p>
          <div className={styles.boundaryNotice}><ShieldCheck size={22} /><p><strong>Submission does not guarantee incorporation.</strong> Nothing is published automatically. Attribution and quotation remain controlled by the permission selected below.</p></div>
        </div>

        <form className={styles.challengeForm} onSubmit={submitChallenge}>
          <input className={styles.honeypot} tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" />
          <div className={styles.twoFields}>
            <label>Name<input name="name" required maxLength={120} /></label>
            <label>Email<input name="email" type="email" required maxLength={180} /></label>
          </div>
          <label>Role or organization <span>Optional</span><input name="role" maxLength={180} /></label>
          <label>Section or claim being challenged<textarea name="target" required rows={2} maxLength={240} /></label>
          <label>Contribution type<select name="contributionType" required defaultValue=""><option value="" disabled>Select one</option><option>Factual correction</option><option>Counterargument</option><option>Missing evidence</option><option>Field case</option><option>Editorial clarification</option><option>Implementation concern</option><option>Other</option></select></label>
          <label>Argument or contribution<textarea name="argument" required rows={7} maxLength={8000} /></label>
          <label>Supporting evidence or source <span>Optional</span><textarea name="evidence" rows={3} maxLength={2000} /></label>
          <label>File or receipt <span>Optional · add manually to the email handoff when no private webhook is configured</span><input name="attachment" type="file" /></label>
          <div className={styles.twoFields}>
            <label>Attribution preference<select name="attribution" required defaultValue="Keep this private"><option>Use my name publicly</option><option>Publish an anonymous summary</option><option>Keep this private</option></select></label>
            <label>Permission to quote<select name="quotePermission" required defaultValue="Contact me first"><option>Yes, after final approval</option><option>No direct quotation</option><option>Contact me first</option></select></label>
          </div>
          <label>Conflict-of-interest disclosure <span>Optional</span><textarea name="conflict" rows={2} maxLength={800} /></label>
          <label className={styles.consent}><input name="consent" type="checkbox" required /><span>I understand that submission does not guarantee incorporation into the paper and that an accepted, modified, rejected, or deferred disposition may be preserved according to my selected privacy permissions.</span></label>
          <button className={styles.submitButton} disabled={submitting}>{submitting ? "Creating receipt…" : "Create private challenge receipt"}<Send size={18} /></button>

          {receipt && (
            <div className={`${styles.receiptResult} ${receipt.id === "NOT CREATED" ? styles.receiptError : ""}`} role="status">
              <Stamp size={26} />
              <div><span>RECEIPT</span><strong>{receipt.id}</strong><p>{receipt.message}</p>{receipt.mailto && <a href={receipt.mailto}>Open private email handoff <Mail size={16} /></a>}</div>
            </div>
          )}
        </form>
      </section>

      <section className={styles.assuranceSection} id="assurance">
        <div className={styles.assuranceIcon}><Scale size={42} /></div>
        <div>
          <span>09 // ASSURANCE BOUNDARY</span>
          <h2>The system cannot independently assure itself.</h2>
          <p>The operating loop must run internally. Operators detect conditions. Systems preserve evidence. Accountable authorities decide. Teams implement repairs. The organization measures the result.</p>
          <p>But the organization cannot be the only party deciding whether it measured the right things, preserved inconvenient evidence, scoped the review honestly, or identified authority correctly.</p>
          <blockquote>A system can inspect itself. It cannot independently assure itself.</blockquote>
          <strong>The organization owns the repair. Credible assurance requires another set of eyes.</strong>
        </div>
      </section>

      <section className={styles.nullworksSection} id="nullworks">
        <div className={styles.sectionMarker}>10 // NULLWORKS</div>
        <div className={styles.nullworksGrid}>
          <div><h2>This work is not for everyone.</h2><p>NULLWORKS can reveal the execution architecture, identify where the declared workflow diverges from reality, preserve the evidence, locate the decision authority, and prescribe a practical path to recovery.</p><p>We are not interested in producing another report that confirms an organization is broken and then disappears into a folder.</p></div>
          <aside><CircleAlert size={30} /><p>If your organization wants validation without disruption, NULLWORKS is probably not the right partner.</p><strong>Do not hire us to produce another report.<br />Hire us when you are ready to change what the evidence proves.</strong><a href="mailto:masoncalcolsol@gmail.com?subject=Operational%20Recovery%20Review">Begin an operational recovery review <ArrowRight size={18} /></a></aside>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>MASON PERRY / NULLWORKS</strong><span>The Workflow on Paper Was Never the Workflow · A TAC OPS Field Case</span></div>
        <nav><a href="#versions">Version archive</a><a href="#challenge">Contribution terms</a><a href="#assurance">Evidence policy</a></nav>
        <blockquote>A human fixed the problem. The system forgot. TAC OPS remembers.</blockquote>
        <p>THE DOCUMENT IS ALIVE. THE RECORD IS IMMUTABLE.</p>
      </footer>
    </main>
  );
}
