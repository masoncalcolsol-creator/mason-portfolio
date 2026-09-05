import type { Metadata } from "next";
import styles from "./corporate.module.css";
import OscilloscopeBackground from "./receipt-wallet/OscilloscopeBackground";

export const metadata: Metadata = {
  title: "NULLWORKS | AI Architecture for Consequential Systems",
  description:
    "NULLWORKS designs governed software and operational architecture connecting humans, AI, applications, evidence, authority, and physical systems.",
};

const capabilities = [
  ["Architecture", "Govern the operating loop", "Identity, authority, intent, policy, bounded execution, telemetry, verification, provenance, escalation, revocation, and receipts.", "/architecture"],
  ["Systems", "Build where the work breaks", "Working software and field systems across maintenance, assurance, evidence, intake, exception recovery, continuity, and human-AI operations.", "/products"],
  ["Proof", "Make claims earn their verbs", "Field receipts, reproducible tests, case studies, failure boundaries, retests, and explicit unknowns.", "/proof"],
];

const doors = [
  ["Japan / JETRO", "Partnership + infrastructure", "A relationship-first route for institutions, manufacturers, operators, researchers, and partners working on AI, robotics, infrastructure, and industrial systems.", "/japan"],
  ["Operational assurance", "Find the first material unknown", "Start with a consequential workflow and separate what is documented, observed, tested, assumed, or still unknown.", "/triage"],
  ["Research", "Inspect the doctrine underneath the software", "Continuity, operational relativity, architecture lineage, model-agnostic transfer, control coverage, and other working research.", "/research"],
];

export default function HomePage() {
  return <main className={styles.page}>
    <OscilloscopeBackground />
    <div className={styles.scopeWash} aria-hidden="true" />
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="/">NULLWORKS<span>AI ARCHITECTURE · GOVERNED OPERATIONAL INTELLIGENCE</span></a>
        <div className={styles.links}>
          <a href="/architecture">Architecture</a><a href="/products">Systems</a><a href="/proof">Proof</a><a href="/research">Research</a><a href="/japan">Japan</a><a href="/company">Company</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>NULLWORKS · CONSEQUENTIAL SYSTEMS</div>
          <h1 className={styles.title}>The intelligence is not the operating system.</h1>
          <p className={styles.lead}>NULLWORKS designs the governed architecture through which humans, AI, applications, and authorized systems are permitted to interact with consequential work.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/architecture">See the architecture</a>
            <a className={styles.secondary} href="/products">See what has been built</a>
          </div>
        </div>
        <aside className={styles.side}>
          <strong>What we sell is not a model.</strong><br/><br/>
          We find where organizational intent and actual execution have separated, then build the smallest governed system that reconnects authority, evidence, software, people, and physical operations. Human authority remains final.
        </aside>
      </section>

      <div className={styles.band}>REQUEST → IDENTITY → AUTHORITY → INTENT → POLICY → PLAN → SAFE EXECUTION → TELEMETRY → VERIFICATION → RECEIPT</div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.kicker}>One architecture, many applications</div>
          <h2 className={styles.h2}>Start with reality. Do not begin by shopping for AI.</h2>
          <p className={styles.body}>The intervention may be software, AI, a workflow change, an authority boundary, a physical modification, or a new architecture around all of them. The tool is not the achievement. The changed operating outcome is.</p>
        </div>
        <div className={styles.grid}>{capabilities.map(([label,title,body,href]) => <a className={styles.card} href={href} key={title}><div className={styles.cardLabel}>{label}</div><h3>{title}</h3><p>{body}</p></a>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.statement}><strong>AI is one worker inside a larger governed system.</strong><p>Models can investigate, retrieve, compare, draft, test, recommend, and operate bounded capabilities. Consequential action still requires explicit authority, evidence, review, exception handling, recovery, and stop-the-line controls.</p></div>
        <div className={styles.process}>{["OBSERVE","MAP","DIAGNOSE","PROTOTYPE","VALIDATE","TRANSFER","RECEIPT"].map(x=><div className={styles.step} key={x}>{x}</div>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}><div className={styles.kicker}>Enter through the problem</div><h2 className={styles.h2}>Different doors. Same source of truth.</h2><p className={styles.body}>Audience-specific pages change sequencing, not facts. Every route resolves back to the same architecture, systems, evidence, and company canon.</p></div>
        <div className={styles.grid}>{doors.map(([label,title,body,href]) => <a className={styles.card} href={href} key={title}><div className={styles.cardLabel}>{label}</div><h3>{title}</h3><p>{body}</p></a>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.two}>
          <div className={styles.panel}><h3>Have a consequential workflow?</h3><p>Bring the desired outcome, actors, constraints, authority, evidence, exceptions, failure cost, and current software. We map before prescribing.</p><a className={styles.route} href="/triage">Start with triage →</a></div>
          <div className={styles.panel}><h3>Trying to understand NULLWORKS?</h3><p>Start with the architecture, then inspect the systems and proof. The research layer exists for people who want the full rabbit hole.</p><a className={styles.route} href="/contact">Contact NULLWORKS →</a></div>
        </div>
      </section>

      <footer className={styles.footer}><span>NULLWORKS · nullworks.systems</span><span>Architecture before automation. Evidence before claims. Human authority remains final.</span></footer>
    </div>
  </main>;
}
