import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mason Perry for RLI | Solutions Architect - Applications",
  description:
    "RLI-specific beta application landing page for Mason Perry, Operational Intelligence Systems Architect.",
  robots: {
    index: false,
    follow: false,
  },
};

const fitRows = [
  {
    ask: "Application architecture across broad programs",
    bring:
      "Operating-frame design for workflows, approvals, tool use, handoffs, and exception paths.",
    receipt: "NULLWORKS OI SUITe, Field Notes, and architecture packets.",
  },
  {
    ask: "Business and IT translation",
    bring:
      "Ability to convert operator pain and business goals into explicit system rules.",
    receipt: "USPS industrial systems plus forward-deployed prototype work.",
  },
  {
    ask: "Governance, standards, and risk-aware design",
    bring:
      "Source basis, authority boundaries, human approval gates, escalation, audit, and telemetry.",
    receipt: "Public AI governance and deployment-control writing.",
  },
  {
    ask: "Integration and data-flow thinking",
    bring:
      "Decision lineage, source provenance, API/workflow boundaries, and handoff records.",
    receipt: "LenderFlow, LegalFlow LF2, CHECKMATE, TAC OPS, and related OI prototypes.",
  },
  {
    ask: "Architecture leadership and influence",
    bring:
      "Plain-language architecture explanations for operators, founders, engineers, and skeptical stakeholders.",
    receipt: "LinkedIn field lab, technical field notes, and applied implementation threads.",
  },
];

const firstThirty = [
  "Where application decisions are clear on paper but ambiguous in execution.",
  "Where business users, IT, and architecture use different names for the same workflow.",
  "Where source systems, ownership, approvals, and exception paths are not explicit enough.",
  "Where a modernization effort needs fewer slogans and more operating receipts.",
];

const workingStyle = [
  "Start with the real workflow, not the ideal diagram.",
  "Define authority and evidence before execution.",
  "Translate messy operations into clean architecture language.",
  "Ship maps, specs, decision logs, handoff packets, review gates, and receipts people can use.",
];

const receipts = [
  {
    label: "Receipt 01",
    title: "USPS field operations",
    body:
      "Industrial maintenance, warehouse systems, repair evidence, material lists, escalation discipline, and live operational constraints.",
  },
  {
    label: "Receipt 02",
    title: "NULLWORKS prototypes",
    body:
      "LenderFlow, LegalFlow LF2, CHECKMATE, TAC OPS, ANVIL, and related operating-frame artifacts.",
  },
  {
    label: "Receipt 03",
    title: "OISA field notes",
    body:
      "Public translation of AI governance, human authority, deployment control, workflow compression, and proof-of-work career signaling.",
  },
];

const theses = [
  {
    title: "Software architecture is not only structure.",
    body:
      "It is the operating agreement between business intent, technical capability, human authority, source evidence, and consequence.",
  },
  {
    title: "Governance cannot be added only after execution.",
    body:
      "A system has to know what it is allowed to do, what it is allowed to trust, when it must stop, and who can say no.",
  },
  {
    title: "Operational architecture is where ambiguity gets reduced.",
    body:
      "A warning without authority becomes panic. A caution without an owner becomes noise. An advisory without review rhythm becomes background clutter.",
  },
];

const tags = [
  "Application architecture",
  "Workflow orchestration",
  "Human authority",
  "Telemetry",
  "Integration boundaries",
  "Governance before execution",
];

export default function RliSolutionsArchitectPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>NULLWORKS // RLI application beta</div>
          <h1>Application architecture should survive contact with operations.</h1>
          <p className={styles.lead}>
            I am Mason Perry, an Operational Intelligence Systems Architect. I build the operating
            frame around software and AI systems: what source they can trust, what action they can
            take, when they must stop, who owns the decision, and what receipt gets left behind.
          </p>
          <div className={styles.cta}>
            <a className={styles.btn} href="mailto:masoncalcolsol@gmail.com">
              Contact Mason
            </a>
            <a className={`${styles.btn} ${styles.secondary}`} href="/">
              View portfolio
            </a>
          </div>
        </div>
      </header>

      <div className={styles.wrap}>
        <section className={styles.grid}>
          <article className={`${styles.card} ${styles.span7}`}>
            <h2>Why RLI, why this role</h2>
            <p>
              The Solutions Architect - Applications role reads like more than diagram ownership.
              It is about maintaining solution architecture across programs, aligning business and
              IT, guiding implementation, resolving tradeoffs, and keeping application decisions
              connected to real operating outcomes.
            </p>
            <p>
              That is the lane I have been building toward: not software as isolated features, but
              software as a governed operating system around people, evidence, handoffs,
              exceptions, and accountability.
            </p>
            <p className={styles.quote}>
              The AI engineer builds the worker. The OI architect builds the company the worker
              operates inside.
            </p>
          </article>
          <article className={`${styles.card} ${styles.span5}`}>
            <h2>The honest fit</h2>
            <p>I am not presenting as a conventional insurance-enterprise-architecture lifer.</p>
            <p>
              I am presenting as an operations-first architect with field experience, working
              prototypes, implementation receipts, and a clear growth lane into formal enterprise
              application architecture.
            </p>
            <p className={styles.small}>
              This application is also a live study: can proof-of-work, operational clarity, and
              architecture reasoning translate across a formal hiring screen?
            </p>
          </article>
        </section>

        <section className={styles.card}>
          <h2>RLI role fit map</h2>
          <div className={styles.fit}>
            <div className={styles.head}>RLI asks for</div>
            <div className={styles.head}>I bring</div>
            <div className={styles.head}>Receipt</div>
            {fitRows.map((row) => (
              <div className={styles.row} key={row.ask}>
                <div>{row.ask}</div>
                <div>{row.bring}</div>
                <div>{row.receipt}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.grid}>
          <article className={`${styles.card} ${styles.span6}`}>
            <h2>What I would look for in the first 30 days</h2>
            <ul>
              {firstThirty.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className={`${styles.card} ${styles.span6}`}>
            <h2>How I work</h2>
            <ul>
              {workingStyle.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.grid}>
          {receipts.map((receipt) => (
            <article className={`${styles.card} ${styles.span4}`} key={receipt.label}>
              <h3>{receipt.label}</h3>
              <p>
                <strong>{receipt.title}</strong>
              </p>
              <p className={styles.small}>{receipt.body}</p>
            </article>
          ))}
        </section>

        <section className={styles.card}>
          <h2>Core thesis</h2>
          {theses.map((thesis) => (
            <div className={styles.receipt} key={thesis.title}>
              <strong>{thesis.title}</strong>
              <br />
              {thesis.body}
            </div>
          ))}
          <div className={styles.tagrow}>
            {tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          Mason Perry // Operational Intelligence Systems Architect // masoncalcolsol@gmail.com
        </div>
      </footer>
    </main>
  );
}
