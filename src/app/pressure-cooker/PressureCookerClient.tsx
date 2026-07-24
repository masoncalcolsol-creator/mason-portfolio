"use client";

import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileClock,
  FileSearch,
  Fingerprint,
  Gauge,
  GitBranch,
  Hammer,
  LockKeyhole,
  Mail,
  Network,
  Radar,
  RotateCcw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  UserRoundCheck,
  Waypoints,
  Wrench,
  XCircle,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";

type PressurePoint = {
  id: string;
  title: string;
  question: string;
  description: string;
  output: string;
  icon: typeof Radar;
};

type LedgerState = "Accepted" | "Accepted with modification" | "Preserved boundary";

const pressurePoints: PressurePoint[] = [
  {
    id: "01",
    title: "INCENTIVE",
    question: "Why will anyone inspect the system before failure forces them to?",
    description:
      "A system can possess excellent data and remain blind because nobody benefits from looking early—or because exposing drift creates personal risk.",
    output: "Inspection owner · review trigger · resistance map",
    icon: Radar,
  },
  {
    id: "02",
    title: "EVIDENCE",
    question: "Can the organization prove what actually happened?",
    description:
      "Policy describes intent. Pressure Cooker preserves sources, original claims, contradictions, missing evidence, exceptions, and the evidence available when decisions were made.",
    output: "Source ledger · evidence class · failure receipts",
    icon: FileSearch,
  },
  {
    id: "03",
    title: "GOVERNABILITY",
    question: "Can real execution be reconstructed without silently filling gaps?",
    description:
      "We map the intended system and the operating system, including workarounds, AI chains, handoffs, exceptions, drift, and viable intervention paths.",
    output: "Execution map · drift register · confidence boundary",
    icon: Network,
  },
  {
    id: "04",
    title: "AUTHORITY",
    question: "Who can approve, pause, override, repair, escalate, or own the consequence?",
    description:
      "Capability is not authority. Every consequential chain needs a named evaluation owner, consequence owner, stop rule, and return path to a human.",
    output: "Authority map · chain limit · human return path",
    icon: UserRoundCheck,
  },
  {
    id: "05",
    title: "TELEMETRY",
    question: "How will anyone know whether the intervention worked?",
    description:
      "Completion is not success. We establish the baseline, target outcome, failure signals, detection latency, interventions, corrections, and operating value.",
    output: "Baseline · outcome measures · correction history",
    icon: Gauge,
  },
];

const loop = [
  ["BOUND", "Define the outcome, prohibited actions, consequence owner, and evidence boundary."],
  ["RECONSTRUCT", "Map the system that was intended and the system that actually operates."],
  ["PRESSURIZE", "Apply the five questions, edge cases, hostile readings, and domain challenges."],
  ["PROTOTYPE", "Build only inside the authorized mode: read-only, shadow, or constrained pilot."],
  ["OBSERVE", "Preserve authority, evidence, exceptions, interventions, outcomes, and failures."],
  ["DECIDE", "Return a versioned recommendation to named Human Authority."],
  ["TRANSFER", "Adopt, revise, pause, reject, escalate, or commission independent assurance."],
] as const;

const ledger = [
  {
    id: "PC-RT-20260724-001",
    title: "Self-learning language implied silent authority",
    target: "Public product framing",
    pressure: "The framework cannot claim autonomous self-learning while requiring explicit Human Authority and versioned decisions.",
    result:
      "Reframed as continuously challenged, automatically organized, and human-governed. Silent self-modification remains prohibited.",
    state: "Accepted with modification" as LedgerState,
    source: "Internal architecture pressure test",
  },
  {
    id: "PC-RT-20260724-002",
    title: "Certification language exceeded the service boundary",
    target: "Commercial assurance claim",
    pressure:
      "A NULLWORKS review cannot certify itself, replace qualified independent assurance, or declare a system universally safe or compliant.",
    result:
      "Locked a no-certification boundary and separated operating receipts from formal independent assurance.",
    state: "Preserved boundary" as LedgerState,
    source: "Current NULLWORKS assurance model",
  },
  {
    id: "PC-RT-20260724-003",
    title: "Software-only review missed the operating organization",
    target: "Pressure Cooker scope",
    pressure:
      "Model accuracy and software function cannot explain incentives, workarounds, authority drift, physical operations, consequence ownership, or institutional ability to act.",
    result:
      "Expanded the product to test the complete operating architecture surrounding software and AI.",
    state: "Accepted" as LedgerState,
    source: "Founder systems thesis",
  },
];

const services = [
  {
    name: "PRESSURE SNAPSHOT",
    price: "Launch scope · from $3,500",
    mode: "READ-ONLY",
    description:
      "One bounded workflow. Intended-versus-executed reconstruction, five-pressure assessment, authority gaps, evidence gaps, and an executive receipt packet.",
  },
  {
    name: "PRESSURE CYCLE",
    price: "$8,500–$15,000",
    mode: "SHADOW PROTOTYPE",
    description:
      "A meaningful operating problem with interviews, evidence ledger, constraint map, shadow prototype, failure scenarios, and repair prescription.",
  },
  {
    name: "CONSTRAINED PILOT",
    price: "$20,000–$50,000+",
    mode: "BOUNDED LIVE TEST",
    description:
      "A narrow live work cell with Human Authority, runtime receipts, stop rules, error budget, evaluation ownership, telemetry, and transfer recommendation.",
  },
  {
    name: "CONTINUOUS PRESSURE",
    price: "$4,000–$10,000 / month",
    mode: "ONGOING GOVERNANCE",
    description:
      "Recurring drift detection, receipt review, evaluation maintenance, authority-path testing, and versioned operating updates.",
  },
];

const publicLayer = [
  "Purpose and governing boundaries",
  "Five public pressure categories",
  "Sanitized challenge receipts",
  "Version and correction history",
  "Reasoned accepted and rejected findings",
  "Engagement modes and measured outcomes",
];

const privateLayer = [
  "Complete assessment trees and scoring logic",
  "Client evidence and raw submissions",
  "Internal prompts and reviewer-routing logic",
  "Control thresholds and stop conditions",
  "Commercial implementation playbooks",
  "Private telemetry and crown-jewel orchestration",
];

export default function PressureCookerExperience() {
  const [activePoint, setActivePoint] = useState(0);
  const [loopIndex, setLoopIndex] = useState(0);
  const [ledgerFilter, setLedgerFilter] = useState<"All" | LedgerState>("All");
  const [challengeReceipt, setChallengeReceipt] = useState<null | { id: string; message: string }>(null);
  const [subscribeReceipt, setSubscribeReceipt] = useState<null | { id: string; message: string }>(null);
  const [submittingChallenge, setSubmittingChallenge] = useState(false);
  const [submittingSubscribe, setSubmittingSubscribe] = useState(false);

  const filteredLedger = useMemo(
    () => ledger.filter((entry) => ledgerFilter === "All" || entry.state === ledgerFilter),
    [ledgerFilter],
  );

  async function submitChallenge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingChallenge(true);
    setChallengeReceipt(null);
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
      const response = await fetch("/api/pressure-cooker/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed.");
      setChallengeReceipt({
        id: result.receiptId,
        message: result.message || "Your pressure receipt has been delivered for private review.",
      });
      form.reset();
    } catch (error) {
      setChallengeReceipt({
        id: "NOT CREATED",
        message: error instanceof Error ? error.message : "Submission failed.",
      });
    } finally {
      setSubmittingChallenge(false);
    }
  }

  async function submitSubscription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingSubscribe(true);
    setSubscribeReceipt(null);
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: fields.get("name"),
      email: fields.get("email"),
      role: fields.get("role"),
      expertise: fields.get("expertise"),
      consent: fields.get("consent") === "on",
      website: fields.get("website"),
    };

    try {
      const response = await fetch("/api/pressure-cooker/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Subscription request failed.");
      setSubscribeReceipt({
        id: result.receiptId,
        message: result.message || "Your Pressure Wave request has been received.",
      });
      form.reset();
    } catch (error) {
      setSubscribeReceipt({
        id: "NOT CREATED",
        message: error instanceof Error ? error.message : "Subscription request failed.",
      });
    } finally {
      setSubmittingSubscribe(false);
    }
  }

  const ActiveIcon = pressurePoints[activePoint].icon;

  return (
    <main className={styles.page}>
      <div className={styles.ambientGrid} aria-hidden="true" />
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span><strong>NULLWORKS</strong><small>Operational Systems Architecture</small></span>
        </a>
        <nav aria-label="Pressure Cooker navigation">
          <a href="#framework">Framework</a>
          <a href="#ledger">Ledger</a>
          <a href="#services">Services</a>
          <a href="#challenge">Apply pressure</a>
        </nav>
        <span className={styles.headerState}><span /> PC-0.1 · LIVE</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.chamber} aria-hidden="true">
          <div className={styles.chamberRingOne} />
          <div className={styles.chamberRingTwo} />
          <div className={styles.chamberRingThree} />
          <div className={styles.documentStack}>
            <div className={styles.paperBack} />
            <div className={styles.paperMiddle} />
            <div className={styles.paperFront}>
              <span>NULLWORKS</span>
              <strong>PRESSURE<br />COOKER</strong>
              <i />
              <small>PC-0.1</small>
            </div>
          </div>
          <div className={`${styles.needle} ${styles.needleOne}`} />
          <div className={`${styles.needle} ${styles.needleTwo}`} />
          <div className={`${styles.needle} ${styles.needleThree}`} />
          <div className={`${styles.needle} ${styles.needleFour}`} />
          <div className={`${styles.impact} ${styles.impactOne}`} />
          <div className={`${styles.impact} ${styles.impactTwo}`} />
          <div className={`${styles.impact} ${styles.impactThree}`} />
        </div>

        <div className={styles.heroCopy}>
          <p className={styles.kicker}><Fingerprint size={16} /> Living operational architecture pressure test</p>
          <h1>PRESSURE<br /><span>COOKER</span></h1>
          <h2>Attack the framework before reality does.</h2>
          <p className={styles.heroLead}>
            Every challenge becomes a receipt. Every accepted correction becomes a version. Nothing silently disappears.
          </p>
          <div className={styles.operatingPromise}>
            <span>CONTINUOUSLY CHALLENGED</span>
            <i />
            <span>AUTOMATICALLY ORGANIZED</span>
            <i />
            <span>HUMAN-GOVERNED</span>
          </div>
          <div className={styles.heroActions}>
            <a href="#challenge" className={styles.primaryButton}>APPLY PRESSURE <ArrowDown size={18} /></a>
            <a href="#services" className={styles.secondaryButton}>PUT YOUR SYSTEM IN THE COOKER <ArrowRight size={18} /></a>
          </div>
          <p className={styles.heroBoundary}>NO CERTIFICATION · NO SILENT REVISIONS · NO FAKE FINISH LINES</p>
        </div>

        <aside className={styles.livePanel} aria-label="Current Pressure Cooker state">
          <div className={styles.panelHeader}><span>LIVE SYSTEM STATE</span><span className={styles.pulse}>OBSERVING</span></div>
          <div><span>CURRENT VERSION</span><strong>PC-0.1</strong></div>
          <div><span>PRESSURE WAVE</span><strong>001</strong></div>
          <div><span>PUBLIC RECEIPTS</span><strong>{ledger.length}</strong></div>
          <div><span>CERTIFICATION CLAIM</span><strong>NONE</strong></div>
          <div><span>HUMAN AUTHORITY</span><strong>EXPLICIT</strong></div>
          <div><span>SILENT SELF-REVISION</span><strong>PROHIBITED</strong></div>
          <small>Public attacks can inform a proposed change. They cannot directly edit the framework or publish themselves.</small>
        </aside>
      </section>

      <section className={styles.premise}>
        <div className={styles.sectionMarker}>01 // WHY THIS EXISTS</div>
        <div className={styles.premiseGrid}>
          <h2>The documented system is rarely the complete system that operates.</h2>
          <div>
            <p>Policies describe intent. Dashboards describe selected measurements. Software logs describe tool activity. Certifications describe conformity to a defined scope.</p>
            <p>Pressure Cooker reconstructs the complete operating chain around the work:</p>
            <div className={styles.lineageRail}>
              {['Evidence', 'Judgment', 'Authority', 'Decision', 'Action', 'Outcome', 'Revision'].map((item, index) => (
                <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
              ))}
            </div>
            <blockquote>We do not only test whether the software works. We test whether the organization can see, govern, correct, and learn from what the software does.</blockquote>
          </div>
        </div>
      </section>

      <section className={styles.frameworkSection} id="framework">
        <div className={styles.sectionHeading}>
          <span>02 // THE FIVE PRESSURE POINTS</span>
          <h2>Five questions that force the operating architecture into view.</h2>
          <p>The public sees the instrument. The complete scoring trees, control thresholds, client evidence, and implementation playbooks remain inside the private core.</p>
        </div>
        <div className={styles.pressureLayout}>
          <div className={styles.pointControls} role="tablist" aria-label="Pressure points">
            {pressurePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <button key={point.id} role="tab" aria-selected={activePoint === index} onClick={() => setActivePoint(index)} className={activePoint === index ? styles.activePoint : ""}>
                  <span>{point.id}</span><Icon size={20} /><strong>{point.title}</strong><ChevronRight size={18} />
                </button>
              );
            })}
          </div>
          <article className={styles.pointDetail}>
            <div className={styles.pointOrb}><ActiveIcon size={38} /></div>
            <span>PRESSURE POINT {pressurePoints[activePoint].id}</span>
            <h3>{pressurePoints[activePoint].title}</h3>
            <h4>{pressurePoints[activePoint].question}</h4>
            <p>{pressurePoints[activePoint].description}</p>
            <div><Waypoints size={18} /><strong>Required output</strong><span>{pressurePoints[activePoint].output}</span></div>
          </article>
        </div>
      </section>

      <section className={styles.loopSection}>
        <div className={styles.sectionHeading}>
          <span>03 // GOVERNED PRESSURE LOOP</span>
          <h2>Criticism is a production input—not an editing permission.</h2>
          <p>The system can receive, classify, cluster, compare, and propose. Only named Human Authority can promote a finding into the framework.</p>
        </div>
        <div className={styles.loopShell}>
          <div className={styles.loopControls} role="tablist" aria-label="Pressure Cooker stages">
            {loop.map(([stage], index) => (
              <button key={stage} onClick={() => setLoopIndex(index)} aria-selected={loopIndex === index} className={loopIndex === index ? styles.activeLoop : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>{stage}
              </button>
            ))}
          </div>
          <article className={styles.loopDetail}>
            <div className={styles.loopIcon}><RotateCcw size={36} /></div>
            <span>STAGE {String(loopIndex + 1).padStart(2, "0")}</span>
            <h3>{loop[loopIndex][0]}</h3>
            <p>{loop[loopIndex][1]}</p>
            <div><LockKeyhole size={18} /> Versioned evidence and Human Authority remain binding.</div>
          </article>
        </div>
        <div className={styles.flywheel}>
          {['Public framework', 'Bounded attack', 'Immutable receipt', 'Automated triage', 'Human disposition', 'Versioned change', 'Next pressure wave'].map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className={styles.ledgerSection} id="ledger">
        <div className={styles.sectionHeading}>
          <span>04 // PUBLIC PRESSURE LEDGER</span>
          <h2>The criticism stays attached to what it changed.</h2>
          <p>These founding receipts show the method operating on itself. Public contributor records will be sanitized and published only after review and permission checks.</p>
        </div>
        <div className={styles.filterBar} role="group" aria-label="Filter pressure receipts">
          {(["All", "Accepted", "Accepted with modification", "Preserved boundary"] as const).map((item) => (
            <button key={item} onClick={() => setLedgerFilter(item)} className={ledgerFilter === item ? styles.activeFilter : ""}>{item}</button>
          ))}
        </div>
        <div className={styles.ledgerList}>
          {filteredLedger.map((entry) => (
            <article key={entry.id} className={styles.ledgerCard}>
              <div className={styles.ledgerTop}>
                <div><span>{entry.id}</span><h3>{entry.title}</h3></div>
                <strong>{entry.state}</strong>
              </div>
              <div className={styles.ledgerGrid}>
                <div><span>TARGET</span><p>{entry.target}</p></div>
                <div><span>ORIGIN</span><p>{entry.source}</p></div>
                <div className={styles.wide}><span>PRESSURE</span><p>{entry.pressure}</p></div>
                <div className={styles.wide}><span>RESULT / NEXT STATE</span><p>{entry.result}</p></div>
              </div>
              <footer><GitBranch size={16} /> Preserved in Pressure Cooker v0.1 lineage</footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.versionSection}>
        <div className={styles.sectionHeading}>
          <span>05 // LIVING VERSION RECORD</span>
          <h2>The framework can evolve. Its parents do not disappear.</h2>
          <p>Every public version will preserve what changed, why it changed, which receipts caused it, who approved it, and what remains unresolved.</p>
        </div>
        <div className={styles.versionMap}>
          <article><span>IMMUTABLE ORIGIN</span><strong>PRESSURE COOKER V0</strong><small>Founding service architecture</small></article>
          <i />
          <article className={styles.currentVersion}><span>CURRENT PUBLIC VERSION</span><strong>PC-0.1</strong><small>Landing page + governed intake + founding ledger</small></article>
          <i className={styles.dashed} />
          <article><span>NEXT DESCENDANT</span><strong>PC-0.2</strong><small>Created only after reviewed pressure receipts justify change</small></article>
        </div>
        <div className={styles.versionRules}>
          <div><FileClock size={24} /><strong>Preserve every parent</strong><p>Superseded does not mean erased.</p></div>
          <div><BookOpenCheck size={24} /><strong>Publish the reason</strong><p>Accepted and rejected findings keep their disposition.</p></div>
          <div><UserRoundCheck size={24} /><strong>Name the authority</strong><p>No anonymous machine decision promotes a new version.</p></div>
          <div><TimerReset size={24} /><strong>Carry unknowns forward</strong><p>Unresolved evidence remains visible instead of becoming false certainty.</p></div>
        </div>
      </section>

      <section className={styles.boundarySection}>
        <div className={styles.boundaryIntro}>
          <span>06 // NO-CERTIFICATION BOUNDARY</span>
          <h2>A receipt is not a magic badge.</h2>
          <p>Pressure Cooker does not declare a company, model, workflow, government process, or product universally safe, compliant, ethical, or approved.</p>
        </div>
        <div className={styles.boundaryGrid}>
          <article className={styles.doesCard}>
            <CheckCircle2 size={30} /><h3>WHAT IT PRODUCES</h3>
            <ul><li>Bounded assessment</li><li>Source and evidence ledger</li><li>Execution reconstruction</li><li>Authority and consequence map</li><li>Prototype and runtime receipts</li><li>Corrections and open unknowns</li><li>Human-owned disposition</li></ul>
          </article>
          <article className={styles.doesNotCard}>
            <XCircle size={30} /><h3>WHAT IT DOES NOT CLAIM</h3>
            <ul><li>Self-certification</li><li>Universal safety</li><li>Guaranteed compliance</li><li>Automatic legal assurance</li><li>Production success from a prototype</li><li>Institutional courage on the client’s behalf</li><li>Removal of uncertainty from unbounded AI chains</li></ul>
          </article>
        </div>
        <blockquote>A certificate says a defined test was passed. A Pressure Cooker receipt shows what was tested, what evidence existed, what failed, what changed, who decided, and what remains unknown.</blockquote>
      </section>

      <section className={styles.ipSection}>
        <div className={styles.sectionHeading}>
          <span>07 // PUBLIC FAÇADE / PRIVATE CORE</span>
          <h2>Explain the product without publishing the machinery.</h2>
          <p>Pressure Cooker invites attack against the public framework while keeping client evidence, internal controls, and reproducible crown-jewel architecture inside governed systems.</p>
        </div>
        <div className={styles.ipGrid}>
          <article><ShieldCheck size={28} /><h3>PUBLIC BY INTENT</h3><ul>{publicLayer.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><LockKeyhole size={28} /><h3>PRIVATE BY DESIGN</h3><ul>{privateLayer.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionHeading}>
          <span>08 // PUT A SYSTEM IN THE COOKER</span>
          <h2>The public framework is free to attack. Client systems are paid engagements.</h2>
          <p>Pricing is a launch architecture, not a binding quote. Scope, sensitivity, regulation, access, consequence, and specialist requirements control the final engagement.</p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <article key={service.name}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><strong>{service.mode}</strong></div>
              <h3>{service.name}</h3>
              <h4>{service.price}</h4>
              <p>{service.description}</p>
              <a href="#challenge">START THE CONVERSATION <ArrowRight size={17} /></a>
            </article>
          ))}
        </div>
        <div className={styles.commercialLine}><Hammer size={27} /><strong>We can reveal the execution architecture and prescribe the repair. We cannot manufacture the institutional courage required to perform it.</strong></div>
      </section>

      <section className={styles.challengeSection} id="challenge">
        <div className={styles.challengeIntro}>
          <span>09 // APPLY PRESSURE</span>
          <h2>Find the weak claim.<br />Name the missing evidence.</h2>
          <p>Target the framework, propose a better control, or tell us about a system that needs to enter the cooker. Every valid delivery receives a private receipt. Nothing publishes automatically.</p>
          <div className={styles.challengeRules}>
            <div><Target size={20} /><span><strong>Be specific.</strong> Name the exact claim, pressure point, service assumption, or missing boundary.</span></div>
            <div><ShieldAlert size={20} /><span><strong>Do no harm.</strong> No secrets, personal data, exploit payloads, denial-of-service testing, or unauthorized access.</span></div>
            <div><BadgeCheck size={20} /><span><strong>Preserve provenance.</strong> Attribution preferences never change whether a challenge was internal, external, direct evidence, or inference.</span></div>
          </div>
        </div>

        <form className={styles.challengeForm} onSubmit={submitChallenge}>
          <label className={styles.honeypot}>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className={styles.formRow}>
            <label>Name<input name="name" required maxLength={120} /></label>
            <label>Email<input name="email" type="email" required maxLength={180} /></label>
          </div>
          <label>Role / organization<input name="role" maxLength={180} placeholder="Optional" /></label>
          <div className={styles.formRow}>
            <label>Target<select name="target" required defaultValue=""><option value="" disabled>Select target</option><option>Pressure Cooker public framework</option><option>Incentive pressure point</option><option>Evidence pressure point</option><option>Governability pressure point</option><option>Authority pressure point</option><option>Telemetry pressure point</option><option>No-certification boundary</option><option>Public / private IP boundary</option><option>Commercial service model</option><option>Put my system in the cooker</option><option>Security or privacy report</option></select></label>
            <label>Pressure type<select name="contributionType" required defaultValue=""><option value="" disabled>Select one</option><option>False assumption</option><option>Missing evidence</option><option>Technical failure mode</option><option>Authority gap</option><option>Organizational objection</option><option>Regulatory or legal concern</option><option>Security or privacy concern</option><option>Commercial objection</option><option>Domain-specific edge case</option><option>Better framework</option><option>Contradiction</option><option>Client system inquiry</option></select></label>
          </div>
          <label>Argument or contribution<textarea name="argument" required rows={7} maxLength={8000} placeholder="What is wrong, incomplete, unsupported, operationally naive, or worth testing in a real system?" /></label>
          <label>Supporting evidence<textarea name="evidence" rows={5} maxLength={6000} placeholder="Sources, observations, reproducible steps, operating experience, or evidence that would change the claim." /></label>
          <label className={styles.fileField}>Optional attachment<input name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.doc,.docx" /><small>The live intake records the filename. Reply to the receipt with the actual file when required.</small></label>
          <div className={styles.formRow}>
            <label>Attribution preference<select name="attribution" required><option>Anonymous public summary</option><option>Named attribution if accepted</option><option>Private review only</option></select></label>
            <label>Quotation permission<select name="quotePermission" required><option>No direct quotation</option><option>Quote only after written approval</option><option>Direct quotation permitted with attribution</option><option>Direct quotation permitted anonymously</option></select></label>
          </div>
          <label>Conflict disclosure<input name="conflict" maxLength={500} placeholder="Optional but encouraged" /></label>
          <label className={styles.consent}><input type="checkbox" name="consent" required /><span>I understand submission does not guarantee publication, acceptance, attribution, incorporation, payment, certification, or permission to exceed the stated research boundaries.</span></label>
          <button className={styles.submitButton} type="submit" disabled={submittingChallenge}>{submittingChallenge ? "DELIVERING…" : "SUBMIT PRESSURE RECEIPT"} <Send size={18} /></button>
          {challengeReceipt && <div className={styles.receiptNotice}><strong>RECEIPT {challengeReceipt.id}</strong><p>{challengeReceipt.message}</p></div>}
        </form>
      </section>

      <section className={styles.subscribeSection}>
        <div className={styles.subscribeCopy}>
          <p className={styles.kicker}><Sparkles size={16} /> Pressure Wave 001</p>
          <h2>Get the next version—and the attacks that caused it.</h2>
          <p>Pressure Wave subscribers receive major accepted corrections, reasoned rejections, unresolved questions, and targeted calls for domain expertise.</p>
          <div className={styles.automationBoundary}><BrainCircuit size={24} /><div><strong>AUTOMATION BOUNDARY</strong><p>Intake and private receipt delivery are live in this MVP. Automatic weekly clustering and broadcast require the durable webhook/store and mailing audience to be connected and verified. The page does not claim that backend is active until those receipts exist.</p></div></div>
        </div>
        <form className={styles.subscribeForm} onSubmit={submitSubscription}>
          <label className={styles.honeypot}>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label>Name<input name="name" required maxLength={120} /></label>
          <label>Email<input name="email" type="email" required maxLength={180} /></label>
          <label>Role / organization<input name="role" maxLength={180} placeholder="Optional" /></label>
          <label>Expertise<select name="expertise" required defaultValue=""><option value="" disabled>Select your strongest lane</option><option>Operations / frontline systems</option><option>AI / software architecture</option><option>Governance / assurance</option><option>Government / municipalities</option><option>Legal / regulatory</option><option>Cybersecurity / privacy</option><option>Safety / reliability</option><option>Commercial / procurement</option><option>Research / evaluation</option><option>General pressure tester</option></select></label>
          <label className={styles.consent}><input type="checkbox" name="consent" required /><span>I consent to receive Pressure Cooker version and challenge updates. This request may require manual activation during the MVP.</span></label>
          <button className={styles.subscribeButton} type="submit" disabled={submittingSubscribe}>{submittingSubscribe ? "RECORDING…" : "REQUEST PRESSURE WAVE ACCESS"} <Mail size={18} /></button>
          {subscribeReceipt && <div className={styles.receiptNotice}><strong>RECEIPT {subscribeReceipt.id}</strong><p>{subscribeReceipt.message}</p></div>}
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><span className={styles.brandMark}>NW</span><div><strong>NULLWORKS PRESSURE COOKER</strong><small>Living operational architecture pressure test</small></div></div>
        <p>Continuously challenged. Automatically organized. Human-governed.</p>
        <a href="/">Return to NULLWORKS <ArrowRight size={16} /></a>
      </footer>
    </main>
  );
}
