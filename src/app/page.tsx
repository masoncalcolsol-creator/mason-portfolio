import type { Metadata } from "next";
import styles from "./corporate.module.css";

export const metadata: Metadata = {
  title: "NULLWORKS | AI Architecture for Consequential Systems",
  description: "NULLWORKS designs governable operating architecture connecting humans, AI, software, evidence, authority, and physical systems.",
};

const capabilities = [
  ["Architecture", "UMBRA / PENUMBRA", "Governed operational architecture for identity, authority, intent, policy, execution, telemetry, verification, and receipts.", "/architecture"],
  ["Systems", "Products + deployments", "Working systems across assurance, maintenance, evidence, document intake, lending, creative production, and continuity.", "/products"],
  ["Evidence", "Proof, not promises", "Field receipts, targeted tests, case studies, research, and the boundaries around every claim.", "/proof"],
];

export default function HomePage() {
  return <main className={styles.page}>
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="/">NULLWORKS<span>AI ARCHITECTURE · GOVERNED OPERATIONAL INTELLIGENCE</span></a>
        <div className={styles.links}><a href="/architecture">Architecture</a><a href="/products">Systems</a><a href="/proof">Proof</a><a href="/research">Research</a><a href="/japan">Japan</a><a href="/company">Company</a></div>
      </nav>

      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>NULLWORKS · CONSEQUENTIAL SYSTEMS</div>
          <h1 className={styles.title}>Intelligence is easy. Giving it a safe place to work is the hard part.</h1>
          <p className={styles.lead}>NULLWORKS finds where organizational intent and real execution have drifted apart, then designs and builds governable systems that reconnect humans, AI, software, evidence, authority, and physical operations.</p>
          <div className={styles.actions}><a className={styles.primary} href="/architecture">See the architecture</a><a className={styles.secondary} href="/proof">Inspect the proof</a></div>
        </div>
        <aside className={styles.side}><strong>One company. Multiple doors.</strong><br/><br/>We do not sell a model. We build the architecture through which intelligence is permitted to interact with consequential systems. Human authority remains final.</aside>
      </section>

      <div className={styles.band}>REQUEST → IDENTITY → AUTHORITY → INTENT → POLICY → PLAN → SAFE EXECUTION → TELEMETRY → VERIFICATION → RECEIPT</div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}><div className={styles.kicker}>What NULLWORKS actually does</div><h2 className={styles.h2}>Start with the work. Find the break. Build only what changes the outcome.</h2><p className={styles.body}>The intervention may be software, AI, an operating rule, a physical change, or a new architecture around all four. The tool is not the achievement. The working system is.</p></div>
        <div className={styles.grid}>{capabilities.map(([label,title,body,href]) => <a className={styles.card} href={href} key={title}><div className={styles.cardLabel}>{label}</div><h3>{title}</h3><p>{body}</p></a>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.statement}><strong>AI is one worker inside the system.</strong><p>Models can investigate, organize, retrieve, compare, draft, test, and recommend. Consequential action belongs inside explicit authority, evidence, review, exception, recovery, and stop-the-line boundaries.</p></div>
        <div className={styles.process}>{["OBSERVE","MAP","DIAGNOSE","PROTOTYPE","VALIDATE","TRANSFER","RECEIPT"].map(x=><div className={styles.step} key={x}>{x}</div>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}><div className={styles.kicker}>Audience routes</div><h2 className={styles.h2}>The same company, viewed from the problem you are trying to solve.</h2></div>
        <div className={styles.grid}>
          <a className={styles.card} href="/japan"><div className={styles.cardLabel}>Japan / JETRO</div><h3>Partnership + infrastructure</h3><p>Governed AI, robotics, industrial systems, infrastructure, interoperability, and concrete applications for Japan.</p></a>
          <a className={styles.card} href="/ober-nolte"><div className={styles.cardLabel}>Ober Nolte</div><h3>The two-minute route</h3><p>What NULLWORKS is, what has been built, why it matters, and a bounded path into deeper questions.</p></a>
          <a className={styles.card} href="/ai-audit"><div className={styles.cardLabel}>Operational entry point</div><h3>Start with one workflow</h3><p>Use the existing interactive triage to locate authority, access, data, evidence, recovery, and continuity gaps.</p></a>
        </div>
      </section>

      <footer className={styles.footer}><span>NULLWORKS · nullworks.systems</span><span>Architecture before automation. Evidence before claims. Human authority remains final.</span></footer>
    </div>
  </main>;
}
