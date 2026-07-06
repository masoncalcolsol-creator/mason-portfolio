import {
  ArrowRight,
  Boxes,
  BriefcaseBusiness,
  ExternalLink,
  Factory,
  FileSearch,
  Gauge,
  GitBranch,
  Mail,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import styles from "./home.module.css";

const systems = [
  {
    title: "LenderFlow / LENA",
    tag: "Lending OI",
    body: "A human-reviewed lender-fit and workflow system built from direct broker discovery. It structures appetite, exceptions, freshness, source receipts, and missing information without making lending decisions.",
    href: "https://lf-lender-intake.vercel.app/",
    icon: BriefcaseBusiness,
  },
  {
    title: "LegalFlow LF2 / KONRAN",
    tag: "Evidence OI",
    body: "Source-linked evidence search, derivative records, timeline reconstruction, and human-expert authority for complex legal-document workflows.",
    href: "https://legalflow-lf2-beta.vercel.app/dashboard",
    icon: FileSearch,
  },
  {
    title: "PAPERGOBLIN",
    tag: "OCR + Intake OI",
    body: "OCR intake, editable correction, validation, persistence, and reusable human-correction telemetry built as a functional prototype during an airline flight.",
    href: "https://ori-intake-papergoblin.vercel.app/",
    icon: ScanLine,
  },
  {
    title: "ANVIL / CUTSYNC",
    tag: "Production OI",
    body: "Structured creative intake, media workflows, reusable production packets, versioning, licensing boundaries, and human review for high-output creative work.",
    href: "https://anvil-custom-records.vercel.app/",
    icon: Sparkles,
  },
];

const services = [
  {
    title: "Personal OI SUITe",
    body: "One command layer for projects, AI Operators, sources, decisions, unfinished work, commitments, and personal operating continuity.",
    icon: UserRoundCheck,
  },
  {
    title: "Team OI SUITe",
    body: "Visible ownership, scoped workrooms, AI Operator coordination, evidence, approval gates, continuity, and operating telemetry.",
    icon: Network,
  },
  {
    title: "Enterprise OI Control Layer",
    body: "AI Operator, model, and tool inventory, governance, permissions, cross-functional routing, source traceability, auditability, and measurable value.",
    icon: Factory,
  },
];

const loop = [
  ["Discover", "Sit with the expert and map the real workflow, exceptions, authority, evidence, delays, and informal knowledge."],
  ["Structure", "Define work cells, ownership, context boundaries, routing, sources, review gates, continuity, and telemetry."],
  ["Build", "Create the smallest useful dashboard, workflow, agent tools, data model, and human control surface."],
  ["Verify", "Run real cases, preserve failures, expose uncertainty, compare to sources, and keep final authority human."],
  ["Improve", "Measure cycle time, rework, errors, duplicate effort, recovered capacity, adoption, and business outcomes."],
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <div className={styles.brandMark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>Operational Intelligence</div>
              <div className={styles.brandName}>NULLWORKS - Mason Perry</div>
            </div>
          </a>

          <div className={styles.headerActions}>
            <a href="https://github.com/masoncalcolsol-creator" target="_blank" rel="noreferrer" className={styles.headerLink}>
              <GitBranch size={15} /> GitHub
            </a>
            <a href="mailto:masoncalcolsol@gmail.com?subject=Operational%20Intelligence%20Systems%20Architecture" className={styles.headerPrimary}>
              <Mail size={15} /> Contact Mason
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Workflow size={15} /> Operational Intelligence Systems Architect
            </div>

            <h1 className={styles.heroTitle}>I build the company around the AI Operator.</h1>

            <p className={styles.heroLead}>
              I help individuals and organizations turn disconnected AI Operators, tools, agents, expert knowledge, records, and workflows into a human-readable Operational Intelligence operating system.
            </p>

            <p className={styles.heroBody}>
              The goal is not another chatbot. It is visible ownership, scoped workrooms, source-linked decisions, authority boundaries, review gates, continuity, telemetry, and final human control.
            </p>

            <div className={styles.heroActions}>
              <a href="/field-notes" className={styles.primaryButton}>
                Read the OI Field Notes <ArrowRight size={17} />
              </a>
              <a href="#systems" className={styles.secondaryButton}>
                View working systems <Boxes size={17} />
              </a>
            </div>

            <div className={styles.proofRow}>
              <Proof value="Industrial" label="Electronics, automation, logistics, OCR, controls, and fault isolation." />
              <Proof value="Applied AI" label="Workflow discovery, full-stack prototypes, and human-in-loop systems." />
              <Proof value="OISA" label="Orchestration, authority, continuity, telemetry, and workflow compression." />
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="OI SUITe visual operating model">
            <div className={styles.visualTopline}>
              <div className={styles.visualLabel}>Da Vinci or Toyota?</div>
              <div className={styles.visualTruth}>Human authority remains final</div>
            </div>

            <div className={`${styles.ghostPanel} ${styles.ghostLeft}`}>
              <div className={styles.ghostTitle}>One brilliant generalist</div>
              <div className={styles.ghostBody}>Capability expands. Context and coordination load expand with it.</div>
              <div className={styles.nodeRow}>
                {["PLAN", "BUILD", "TOOLS", "MEMORY", "CHECK"].map((node) => (
                  <span key={node} className={styles.node}>{node}</span>
                ))}
              </div>
            </div>

            <div className={`${styles.ghostPanel} ${styles.ghostRight}`}>
              <div className={styles.ghostTitle}>Digital Toyota</div>
              <div className={styles.ghostBody}>Specialists coordinate through one visible operating layer.</div>
              <div className={styles.nodeRow}>
                {["ROUTER", "BUILD", "QA", "MEMORY", "DEPLOY"].map((node) => (
                  <span key={node} className={styles.node}>{node}</span>
                ))}
              </div>
            </div>

            <div className={styles.operatorCore} aria-label="Human operator in OI SUITe armor">
              <div className={styles.operatorHelmet}>
                <div className={styles.operatorVisor} />
              </div>
              <div className={styles.operatorChest}>
                <div className={styles.operatorCoreLight}>NW</div>
              </div>
              <div className={styles.operatorArms} />
              <div className={styles.operatorName}>Human Operator</div>
              <div className={styles.operatorRole}>Intent - judgment - final authority</div>
            </div>

            <div className={styles.visualStatement}>The operator needs the factory.</div>

            <div className={styles.visualMetrics}>
              <Metric value="65+" label="specialists" />
              <Metric value="800+" label="workrooms" />
              <Metric value="119+" label="failure receipts" />
            </div>
          </div>
        </section>

        <section className={styles.thesis}>
          <div className={styles.thesisIntro}>
            <div className={styles.darkEyebrow}>The operating thesis</div>
            <h2 className={styles.thesisTitle}>The AI engineer builds the worker. The OI architect builds the operating company around the AI Operator.</h2>
          </div>

          <div className={styles.thesisBody}>
            <p>
              NULLWORKS evolved because a growing digital workforce exceeded one human&apos;s ability to mentally track ownership, context, duplication, handoffs, authority, failures, and unfinished work.
            </p>
            <blockquote className={styles.quote}>
              I did not organize the agents because they needed managers. I organized them because I did.
            </blockquote>
            <a href="/nullworks-company-structure-oisa.svg" target="_blank" rel="noreferrer" className={styles.goldButton}>
              View NULLWORKS structure <ExternalLink size={16} />
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>OI SUITe layers</div>
              <h2 className={styles.sectionTitle}>Structure that scales with the operator.</h2>
            </div>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className={styles.serviceCard}>
                  <div className={styles.cardIcon}><Icon size={22} /></div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardBody}>{service.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="systems" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>Selected systems</div>
              <h2 className={styles.sectionTitle}>Operational problems converted into working software.</h2>
              <p className={styles.sectionBody}>
                Functional prototypes and live betas validate workflows, reduce uncertainty, preserve human review, and give specialist teams a working frame to harden, secure, scale, polish, and operate.
              </p>
            </div>
          </div>

          <div className={styles.systemGrid}>
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <article key={system.title} className={styles.systemCard}>
                  <div className={styles.systemTop}>
                    <div className={styles.cardIcon}><Icon size={22} /></div>
                    <div className={styles.systemTag}>{system.tag}</div>
                  </div>
                  <h3 className={styles.cardTitle}>{system.title}</h3>
                  <p className={styles.cardBody}>{system.body}</p>
                  <a href={system.href} target="_blank" rel="noreferrer" className={styles.inlineLink}>
                    Open system <ExternalLink size={15} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.loopSection}>
          <div className={styles.loopHeader}>
            <div className={styles.darkEyebrow}>The OISA operating loop</div>
            <h2 className={styles.loopTitle}>From real workflow to measurable improvement.</h2>
            <div className={styles.loopFlow} aria-label="Discover, Structure, Build, Verify, Improve">
              {loop.map(([title], index) => (
                <span key={title}>{String(index + 1).padStart(2, "0")} {title}</span>
              ))}
            </div>
          </div>

          <div className={styles.loopSteps}>
            {loop.map(([title, body], index) => (
              <article key={title} className={styles.loopCard}>
                <div className={styles.loopNumber}>{String(index + 1).padStart(2, "0")}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.twoColumn}>
          <article className={styles.lightCard}>
            <div className={styles.cardIcon}><ShieldCheck size={23} /></div>
            <h2 className={styles.bigCardTitle}>Human authority remains final.</h2>
            <p className={styles.bigCardBody}>
              The AI Operator may investigate, organize, retrieve, compare, draft, test, build, and recommend. Consequential action remains with the accountable expert. Sources, uncertainty, review status, permissions, and stop-the-line controls should be visible by design.
            </p>
          </article>

          <article className={styles.warmCard}>
            <div className={styles.cardIcon}><Gauge size={23} /></div>
            <h2 className={styles.bigCardTitle}>Measure the mess before claiming the compression.</h2>
            <p className={styles.bigCardBody}>
              Start with one real workflow and a defensible baseline. Measure searching, waiting, retyping, duplication, errors, corrections, handoffs, and cycle time. Then build, test, and show what changed.
            </p>
          </article>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaIcon}><GitBranch size={25} /></div>
          <h2 className={styles.ctaTitle}>Need a Toyota-style operating system for your AI Operator workforce?</h2>
          <p className={styles.ctaBody}>
            Give me one painful workflow, one willing expert, the sources needed to understand the work, and permission to measure reality honestly.
          </p>
          <div className={styles.ctaActions}>
            <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20Pilot%20Conversation" className={styles.primaryButton}>
              Start an OI pilot <ArrowRight size={17} />
            </a>
            <a href="/field-notes/da-vinci-vs-toyota" className={styles.secondaryButton}>
              Read Da Vinci or Toyota? <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div>
            <strong>Mason Perry</strong> - Founder, NULLWORKS - Operational Intelligence Systems Architect - Phoenix, Arizona
          </div>
          <div className={styles.footerNote}>
            Views are Mason&apos;s own. Public architecture only. No customer, employer, or USPS confidential information is included.
          </div>
        </footer>
      </div>
    </main>
  );
}

function Proof({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.proof}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
