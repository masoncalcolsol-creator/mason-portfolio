import {
  ArrowRight,
  CircuitBoard,
  Factory,
  Gauge,
  Mail,
  Map,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import styles from "./operational-systems.module.css";

const receipts = [
  {
    title: "Industrial maintenance",
    body: "Automation, conveyors, electrical infrastructure, controls, fault isolation, and equipment reliability inside live operations.",
    icon: Wrench,
  },
  {
    title: "Traffic and logistics systems",
    body: "Flow planning, parking operations, stakeholder coordination, exception handling, field adjustment, and documented operating plans.",
    icon: Map,
  },
  {
    title: "Reliability engineering",
    body: "Failure analysis, versioned redesign, field testing, maintenance compression, lifecycle extension, and measurable improvement.",
    icon: Gauge,
  },
  {
    title: "Operational intelligence",
    body: "Human-readable workflows, evidence, authority boundaries, telemetry, review gates, continuity, and AI workers organized around real work.",
    icon: Network,
  },
];

const operatingLoop = [
  ["Observe", "Walk the real work and preserve failures, workarounds, constraints, and prior attempts."],
  ["Map", "Name the flow, actors, tools, evidence, handoffs, authority, and exception paths."],
  ["Diagnose", "Find the actual constraint: physical, organizational, software, data, governance, or a collision between them."],
  ["Prototype", "Build the smallest intervention capable of changing the outcome."],
  ["Measure", "Capture the receipt, compare before and after, and keep Human Authority in control."],
  ["Improve", "Standardize what worked, expose what failed, and repeat."],
];

const fitAreas = [
  "Production engineering",
  "Operational excellence",
  "Equipment reliability",
  "Material handling",
  "Maintenance systems",
  "Operational technology",
  "Manufacturing transformation",
  "Knowledge systems",
  "Human-AI workflow design",
  "Continuous improvement",
];

const architecture = [
  { step: "01", label: "ROLE", title: "OISA", body: "Owns the complete human-AI operating system.", href: "/oisa-category" },
  { step: "02", label: "PRODUCT", title: "OI SUITe", body: "The operating framework installed around the work.", href: "/field-notes/oi-suite" },
  { step: "03", label: "DEPLOYMENT", title: "OI Work Cells", body: "Bounded implementations inside real workflows.", href: "/operating-map#work-cells" },
  { step: "04", label: "PROOF", title: "Receipts", body: "Measured outcomes, corrections, failures, and telemetry.", href: "/operating-map#receipts" },
];

export default function OperationalSystemsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS</strong>
              <small>Operational Systems</small>
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="/operating-map" style={{ color: "inherit", textDecoration: "none", fontSize: "13px", fontWeight: 850 }}>Operating map</a>
            <a
              className={styles.headerContact}
              href="mailto:masoncalcolsol@gmail.com?subject=Operational%20Systems%20Conversation"
            >
              <Mail size={16} /> Contact Mason
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Factory size={16} /> Industrial systems builder · Founder of NULLWORKS
            </div>
            <h1>I improve the flow of work.</h1>
            <p className={styles.heroLead}>
              I have spent my career repairing physical systems. Today I apply the same engineering mindset to organizational systems, knowledge work, and human-AI operations.
            </p>
            <p className={styles.heroBody}>
              The materials changed. The operating philosophy never did: observe the real work, find the constraint, build a repeatable system, preserve evidence, measure the outcome, and improve again.
            </p>
            <div className={styles.heroActions}>
              <a href="#architecture" className={styles.primaryButton}>
                See the NULLWORKS architecture <ArrowRight size={17} />
              </a>
              <a href="#receipts" className={styles.secondaryButton}>
                See operational receipts <CircuitBoard size={17} />
              </a>
            </div>
          </div>

          <div className={styles.factoryCard}>
            <div className={styles.factoryTopline}>
              <span>DIFFERENT MATERIALS</span>
              <span>SAME OPERATING MODEL</span>
            </div>
            <div className={styles.flowStack}>
              {[
                "Mission",
                "Flow",
                "Operating system",
                "Organization",
                "Workflow",
                "People + AI",
                "Tools",
                "Telemetry",
                "Continuous improvement",
              ].map((item, index) => (
                <div className={styles.flowItem} key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.statement}>
          <p>Most people start with the tool.</p>
          <h2>I start with the flow.</h2>
          <blockquote>
            AI is one machine on the factory floor. It is not the factory.
          </blockquote>
        </section>

        <section id="architecture" style={{ padding: "58px 0", borderTop: "1px solid rgba(255,255,255,.12)" }}>
          <div style={{ maxWidth: "880px" }}>
            <span style={{ color: "#ff5a18", fontSize: "11px", fontWeight: 950, letterSpacing: ".16em" }}>00 // NULLWORKS PRODUCT ARCHITECTURE</span>
            <h2 style={{ margin: "12px 0 0", fontSize: "clamp(38px, 6vw, 70px)", lineHeight: .95 }}>The applications are proof vehicles. The factory is the product.</h2>
            <p style={{ color: "#aeb8bd", fontSize: "18px", lineHeight: 1.7 }}>The public system now has one navigation spine. The OISA discovers and designs the operating model. OI SUITe is the framework installed around it. Work cells apply it to bounded workflows. Receipts prove whether the intervention worked.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "12px", marginTop: "26px" }}>
            {architecture.map((item) => (
              <a key={item.step} href={item.href} style={{ display: "block", minHeight: "190px", padding: "21px", borderRadius: "18px", border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.035)", color: "inherit", textDecoration: "none" }}>
                <span style={{ color: "#ff7c3f", fontSize: "11px", fontWeight: 950, letterSpacing: ".13em" }}>{item.step} // {item.label}</span>
                <strong style={{ display: "block", marginTop: "13px", fontSize: "27px" }}>{item.title}</strong>
                <span style={{ display: "block", marginTop: "10px", color: "#aeb8bd", lineHeight: 1.55 }}>{item.body}</span>
                <span style={{ display: "block", marginTop: "17px", color: "#f4b56e", fontWeight: 900 }}>Open →</span>
              </a>
            ))}
          </div>
        </section>

        <section id="receipts" className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>01 // OPERATIONAL RECEIPTS</span>
            <h2>Evidence from real systems.</h2>
            <p>
              Different industries, same cognitive job: observe the system, expose the failure, redesign the operating model, and verify whether it improved.
            </p>
          </div>
          <div className={styles.receiptGrid}>
            {receipts.map((receipt) => {
              const Icon = receipt.icon;
              return (
                <article className={styles.receiptCard} key={receipt.title}>
                  <div className={styles.iconBox}><Icon size={22} /></div>
                  <h3>{receipt.title}</h3>
                  <p>{receipt.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.loopSection}>
          <div className={styles.sectionHeading}>
            <span>02 // THE OPERATING LOOP</span>
            <h2>Repair the system, not just the symptom.</h2>
          </div>
          <div className={styles.loopGrid}>
            {operatingLoop.map(([title, body], index) => (
              <article className={styles.loopCard} key={title}>
                <div className={styles.loopNumber}>{String(index + 1).padStart(2, "0")}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.toyotaSection}>
          <div className={styles.toyotaCopy}>
            <span>03 // WHY TOYOTA MATTERS</span>
            <h2>The visible product is not the whole product.</h2>
            <p>
              Toyota demonstrated that durable capability comes from the production system around people, machines, quality, flow, and continuous improvement—not from one impressive machine.
            </p>
            <p>
              NULLWORKS is exploring how similar operational discipline can be applied to knowledge work and AI-enabled organizations: human-readable workflows, evidence, authority, telemetry, review gates, and measurable value.
            </p>
            <div className={styles.disclaimer}>
              Inspired by proven operating principles. Not affiliated with or endorsed by Toyota.
            </div>
          </div>
          <div className={styles.analogyCard}>
            <div><Factory size={25} /><strong>Physical factory</strong><span>People · machines · material · quality · flow</span></div>
            <ArrowRight size={22} />
            <div><Network size={25} /><strong>Digital factory</strong><span>People · AI workers · evidence · authority · telemetry</span></div>
          </div>
        </section>

        <section id="fit" className={styles.fitSection}>
          <div className={styles.fitCopy}>
            <span>04 // WHERE DOES THIS FIT?</span>
            <h2>The work already exists. The category is catching up.</h2>
            <p>
              I founded OISA because the existing titles split the work apart. The valuable function sits across hands-on operations, systems thinking, continuous improvement, evidence, governance, software specialists, and emerging AI capability.
            </p>
            <div className={styles.fitTags}>
              {fitAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
          </div>
          <aside className={styles.questionCard}>
            <ShieldCheck size={30} />
            <p>One question</p>
            <h2>Where does an Operational Intelligence Systems Architect create the most value in your organization?</h2>
            <a href="mailto:masoncalcolsol@gmail.com?subject=Where%20Operational%20Systems%20Fits">
              Start the conversation <ArrowRight size={17} />
            </a>
          </aside>
        </section>

        <footer className={styles.footer}>
          <div>
            <strong>Mason Perry</strong>
            <span>Founder, NULLWORKS · Operational Intelligence Systems Architect</span>
          </div>
          <a href="/operating-map">Open the complete operating map</a>
        </footer>
      </div>
    </main>
  );
}
