import type { Metadata } from "next";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  GitBranch,
  LockKeyhole,
  Network,
  ShieldCheck,
  Siren,
  Workflow,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Aimpoint AI Platforms Fit | Mason Perry · NULLWORKS",
  description:
    "Application landing page for Aimpoint Digital's Director of AI Platforms and Infrastructure role, connecting NULLWORKS, OI SUITe, Hive Gateway, and Continuity Calculus to enterprise AI operations.",
};

const fitCards = [
  {
    title: "AI platform operations",
    body: "NULLWORKS Hive Gateway coordinates AI workrooms through identity, check-in/check-out, scoped continuity, checkout receipts, escalation routing, and protected operating state.",
    icon: Network,
  },
  {
    title: "Governance and authority",
    body: "Red/yellow/green escalation, human approval gates, protected paths, source receipts, anti-spam cooldowns, and the operating rule: no receipt, no sync.",
    icon: ShieldCheck,
  },
  {
    title: "Reusable deployment playbooks",
    body: "Workroom identity, check-in request, artifact manifest, checkout receipt, escalation alert, next-worker brief, and post-run telemetry are built as reusable operating templates.",
    icon: ClipboardCheck,
  },
  {
    title: "Client-facing enablement",
    body: "The same structure used to coordinate NULLWORKS can become client-facing deployment support for ChatGPT Enterprise, Claude Enterprise, and mixed AI platform environments.",
    icon: Workflow,
  },
];

const proofSystems = [
  [
    "Hive Gateway V0.1",
    "A GitHub-backed factory gate for AI workrooms: worker identity, scoped context, receipts, escalation rail, dry-run alert router, and safed Twilio/email siren design.",
  ],
  [
    "Continuity Calculus",
    "A framework for preserving intent, source evidence, correction history, context, and human authority across long-running human-AI work.",
  ],
  [
    "OI SUITe",
    "A human-readable operating layer around AI workers, workflows, authority, memory, review gates, exception handling, telemetry, and value measurement.",
  ],
  [
    "LenderFlow / LENA",
    "Human-reviewed workflow operating layer that turns lender rules, edge cases, freshness, broker discovery, and source receipts into a usable matching frame.",
  ],
  [
    "LegalFlow LF2 / KONRAN",
    "Source-linked evidence and timeline system designed around the rule: search the derivative, verify against the original; expert authority remains human.",
  ],
  [
    "USPS industrial operations",
    "Hands-on production reliability background in automated systems, fault isolation, root-cause analysis, maintenance receipts, and operational recovery.",
  ],
];

const ninetyDay = [
  {
    days: "0-30",
    title: "Map the operating reality",
    body: "Inventory AI platforms, users, license flows, adoption friction, sensitive-use boundaries, admin pain points, client deployment patterns, and current governance gaps.",
  },
  {
    days: "31-60",
    title: "Standardize the control layer",
    body: "Create practical procedures for provisioning, workspace configuration, permissions, usage policy, cost tracking, escalation, enablement, and administrator training.",
  },
  {
    days: "61-90",
    title: "Productize repeatable deployment",
    body: "Turn the internal operating model into reusable client-facing playbooks, reference architecture, governance workshop materials, adoption telemetry, and handoff receipts.",
  },
];

export default function AimpointAIPlatformsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/">
            <span className={styles.mark}>NW</span>
            <span>
              <strong>NULLWORKS</strong>
              <small>Mason Perry · Operational Intelligence Systems Architect</small>
            </span>
          </a>
          <nav className={styles.nav}>
            <a href="/architecture-lineage"><GitBranch size={16} /> Lineage</a>
            <a href="/field-notes/when-ai-becomes-a-company"><Network size={16} /> OI field note</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}><BrainCircuit size={17} /> AIMPOINT APPLICATION RECEIPT</div>
            <h1>Enterprise AI does not become reliable because the model is good.</h1>
            <p className={styles.lead}>
              It becomes reliable when platform access, governance, cost, permissions, enablement, client deployment, source evidence, and operating telemetry are designed as one system. That is the layer I have been building through NULLWORKS.
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href="mailto:masoncalcolsol@gmail.com?subject=Aimpoint%20AI%20Platforms%20-%20Mason%20Perry">Contact Mason <ArrowRight size={16} /></a>
              <a className={styles.secondary} href="/">View portfolio</a>
            </div>
          </div>
          <aside className={styles.heroPanel}>
            <div className={styles.panelLabel}>ROLE TARGET</div>
            <h2>Director of AI Platforms and Infrastructure</h2>
            <p>
              Aimpoint needs reliable, secure, governed enterprise AI operations across ChatGPT, Claude, platform administration, client enablement, reusable playbooks, reporting, adoption, and ROI. I call that work Operational Intelligence Systems Architecture.
            </p>
          </aside>
        </section>

        <section className={styles.statement}>
          <Siren size={24} />
          <p>
            The point is not to manage AI as a novelty tool. The point is to build the operating discipline that lets consultants and clients use AI repeatedly, safely, measurably, and with human authority intact.
          </p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.sectionTitle}>
            <span>01</span>
            <h2>Where the role and NULLWORKS overlap</h2>
          </div>
          <div className={styles.cardGrid}>
            {fitCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className={styles.card} key={card.title}>
                  <Icon size={24} />
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className={styles.sectionTitleLight}>
            <span>02</span>
            <h2>Continuity Calculus is the governance primitive</h2>
          </div>
          <p>
            Enterprise AI operations fail when context, source evidence, intent, correction history, and authority separate from the work. Continuity Calculus treats those as first-class operating objects. It is not an abstract philosophy; it is a practical way to prevent drift when AI work spans many tools, models, people, clients, and weeks of changing decisions.
          </p>
          <div className={styles.inlineChecks}>
            <div><CheckCircle2 size={18} /> preserve original sources</div>
            <div><CheckCircle2 size={18} /> expose uncertainty</div>
            <div><CheckCircle2 size={18} /> record corrections</div>
            <div><CheckCircle2 size={18} /> route authority back to humans</div>
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.sectionTitle}>
            <span>03</span>
            <h2>Proof systems already built</h2>
          </div>
          <div className={styles.proofGrid}>
            {proofSystems.map(([title, body]) => (
              <article className={styles.proofCard} key={title}>
                <FileText size={21} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.sectionTitle}>
            <span>04</span>
            <h2>First 90 days at Aimpoint</h2>
          </div>
          <div className={styles.planGrid}>
            {ninetyDay.map((item) => (
              <article className={styles.planCard} key={item.days}>
                <strong>{item.days}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.receipt}>
          <LockKeyhole size={24} />
          <div>
            <h2>Truth boundary</h2>
            <p>
              NULLWORKS includes functional prototypes, public artifacts, live betas, internal operating scaffolds, and field-tested doctrine. I am not claiming enterprise production ownership where it is not supported. I am showing architecture-level evidence that I already build the governance, continuity, escalation, enablement, and operational telemetry layer around AI workers.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <div className={styles.kicker}><Gauge size={17} /> WORKING FRAME &gt; SLIDE DECK</div>
            <h2>They build the intelligence. NULLWORKS builds the operating company around it.</h2>
          </div>
          <a className={styles.primary} href="mailto:masoncalcolsol@gmail.com?subject=Aimpoint%20AI%20Platforms%20-%20Mason%20Perry">Start the conversation <ArrowRight size={16} /></a>
        </section>

        <footer className={styles.footer}>
          <span>NULLWORKS · Operational Intelligence Systems Architecture</span>
          <span>Human authority remains final.</span>
        </footer>
      </div>
    </main>
  );
}
