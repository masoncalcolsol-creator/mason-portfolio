import type { Metadata } from "next";
import Link from "next/link";
import styles from "./toyotaBridge.module.css";

export const metadata: Metadata = {
  title: "Toyota Automated Logistics Software Project Engineer - Mason Perry",
  description:
    "A role-specific application brief connecting Mason Perry's industrial logistics automation, software project delivery, and Operational Intelligence Systems Architecture experience.",
};

const matchRows = [
  [
    "Customer operations into system design",
    "Direct workflow discovery, field observation, requirements translation, and evidence-first separation of actual operating conditions from assumed software causes.",
  ],
  [
    "Installation, testing, debugging, turnover",
    "Production recovery across conveyors, OCR/scanning, sensors, controls, networks, electrical and mechanical systems, plus NULLWORKS QA, debugging, deployment, and handoff receipts.",
  ],
  [
    "Warehouse and material handling",
    "High-throughput USPS logistics automation, conveyor feed systems, pallet jacks, docks, OCR/scanning, controls, and uptime-sensitive maintenance.",
  ],
  [
    "Work with software developers",
    "Coordinates AI-assisted delivery across requirements, UX, architecture, implementation, debugging, QA, documentation, and prioritized handoff packages.",
  ],
  [
    "Customer and internal training",
    "Field leadership, operator-facing explanations, practical work instructions, public-site operations, and human-readable system packets.",
  ],
  [
    "Comprehensive system QA",
    "Fault isolation across physical, control, network, data, software, and human-workflow boundaries rather than treating each layer in isolation.",
  ],
];

const receipts = [
  {
    value: "48",
    label: "conveyor feed chutes",
    body: "Identified systemic mechanical installation misalignment rather than software configuration and helped rebuild the affected assemblies.",
  },
  {
    value: "94 → 11 sec",
    label: "fresh-workroom startup",
    body: "Improved the process by separating current state from history, creating a governed entry point, removing an unreliable connector from the critical path, and requiring a receipt.",
  },
  {
    value: "6 hr",
    label: "constrained software prototype",
    body: "Built a functional OCR intake and correction-telemetry prototype during commercial air travel using an aging laptop, mobile debugging, and airplane Wi-Fi.",
  },
];

export default function ToyotaBridgePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS</strong>
              <small>Mason Perry</small>
            </span>
          </Link>
          <a
            className={styles.contactButton}
            href="mailto:masoncalcolsol@gmail.com?subject=Toyota%20Automated%20Logistics%20Software%20Project%20Engineer"
          >
            Contact Mason
          </a>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Role-specific application brief</p>
          <h1>Software Project Engineer is the bridge.</h1>
          <p className={styles.lead}>
            Toyota Automated Logistics needs someone who can understand the customer operation,
            help software teams make the right design decisions, test the complete system, train
            the user, and remain accountable when physical and digital layers meet.
          </p>
          <div className={styles.heroGrid}>
            <article>
              <span>Current field</span>
              <strong>USPS industrial logistics automation</strong>
            </article>
            <article>
              <span>Emerging discipline</span>
              <strong>Operational Intelligence Systems Architecture</strong>
            </article>
            <article>
              <span>Bridge role</span>
              <strong>Customer-facing software and automation integration</strong>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p>Posting need → operating receipt</p>
            <h2>The role is not only about writing code.</h2>
          </div>
          <div className={styles.matchGrid}>
            {matchRows.map(([need, receipt]) => (
              <article className={styles.matchCard} key={need}>
                <h3>{need}</h3>
                <p>{receipt}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className={styles.sectionHeadingLight}>
            <p>Selected evidence</p>
            <h2>Field judgment converted into software-speed execution.</h2>
          </div>
          <div className={styles.receiptGrid}>
            {receipts.map((receipt) => (
              <article key={receipt.label} className={styles.receiptCard}>
                <strong>{receipt.value}</strong>
                <span>{receipt.label}</span>
                <p>{receipt.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.twoColumn}>
          <article className={styles.storyCard}>
            <p className={styles.kicker}>What I bring</p>
            <h2>An operator who can now fabricate systems at software speed.</h2>
            <p>
              I do not present myself as the deepest conventional software developer in the room.
              My value is understanding the operation the software must serve, identifying the
              missing system, translating field conditions into implementable requirements, and
              helping specialist engineers deliver something that survives contact with reality.
            </p>
          </article>

          <article className={styles.storyCard}>
            <p className={styles.kicker}>The honest bridge</p>
            <h2>Strong systems fit, with explicit ramp-up areas.</h2>
            <p>
              My degree is not in engineering, and I do not claim deep SQL Server or Oracle tenure.
              I bring hands-on industrial automation, material handling, root-cause isolation,
              customer and operator translation, relational-data workflow experience, and a clear
              plan to ramp into the company stack without overstating what is already proven.
            </p>
          </article>
        </section>

        <section className={styles.planSection}>
          <div className={styles.sectionHeading}>
            <p>First 90 days</p>
            <h2>Learn the platform, own a bounded workstream, improve one handoff.</h2>
          </div>
          <div className={styles.planGrid}>
            <article>
              <strong>0–30</strong>
              <p>Learn architecture, installation standards, reporting, QA, warehouse controls, database interfaces, and escalation paths.</p>
            </article>
            <article>
              <strong>31–60</strong>
              <p>Own defined installation and test work, write clear defect receipts, support training, and map one recurring troubleshooting waste point.</p>
            </article>
            <article>
              <strong>61–90</strong>
              <p>Coordinate a bounded customer workstream and present one measured improvement grounded in field evidence.</p>
            </article>
          </div>
        </section>

        <section className={styles.cta}>
          <p className={styles.eyebrow}>Mason Perry</p>
          <h2>Industrial operator. Software project builder. Human-AI systems architect.</h2>
          <p>
            The strongest implementation teams pair deep production engineering with people who
            understand the operation well enough to make sure the right system gets built.
          </p>
          <div className={styles.actions}>
            <a href="mailto:masoncalcolsol@gmail.com?subject=Toyota%20Automated%20Logistics%20Conversation">
              Start a conversation
            </a>
            <Link href="/">View full portfolio</Link>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>
            Independent application page prepared by Mason Perry / NULLWORKS. No affiliation with or endorsement by Toyota Automated Logistics is implied.
          </p>
        </footer>
      </div>
    </main>
  );
}
