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

type PublicLink = {
  title: string;
  tag: string;
  body: string;
  auditFit: string;
  href: string;
  external?: boolean;
  icon: typeof Workflow;
};

const foundations: PublicLink[] = [
  {
    title: "Operational Intelligence Field Notes",
    tag: "Start here",
    body: "A six-part public briefing series explaining the progression from AI assistant to governed digital workforce, OI SUITe, OISA, workflow compression, and Digital Toyota.",
    auditFit: "Explains the operating doctrine behind the audit.",
    href: "/field-notes",
    icon: FileSearch,
  },
  {
    title: "OI SUITe",
    tag: "Operating layer",
    body: "The human-readable system around AI workers: roles, workrooms, evidence, authority, memory, exception paths, review gates, and telemetry.",
    auditFit: "Defines the layers an audit inspects after the workflow is understood.",
    href: "/field-notes/oi-suite",
    icon: Network,
  },
  {
    title: "The OI Architect",
    tag: "OISA role",
    body: "Why organizations need a systems function that can connect live operations, software, AI, evidence, authority, human judgment, and implementation.",
    auditFit: "Clarifies when a company needs a permanent or fractional OISA function.",
    href: "/field-notes/the-oi-architect",
    icon: UserRoundCheck,
  },
  {
    title: "Da Vinci or Toyota?",
    tag: "Digital organization",
    body: "One brilliant generalist can do almost anything. A coordinated company of bounded specialists can do it repeatedly, visibly, and at scale.",
    auditFit: "Tests whether AI work is organized as a company or trapped inside one overloaded assistant.",
    href: "/field-notes/da-vinci-vs-toyota",
    icon: Factory,
  },
  {
    title: "Workflow Compression",
    tag: "Value measurement",
    body: "The practical difference between adding tools and changing the operating system: less searching, waiting, retyping, duplication, rework, and uncertainty.",
    auditFit: "Provides the measurement frame for deciding whether an intervention created value.",
    href: "/field-notes/horse-cart-to-toyota",
    icon: Gauge,
  },
  {
    title: "AI Operating Model Audit",
    tag: "Diagnostic front door",
    body: "A workflow-first assessment of whether AI is improving the work, multiplying the mess, or exposing a deeper operating-model problem.",
    auditFit: "Starts with one real workflow and determines the smallest defensible next move.",
    href: "/ai-audit",
    icon: ShieldCheck,
  },
];

const systems: PublicLink[] = [
  {
    title: "ORI TAC OPS",
    tag: "Physical operations",
    body: "A compact damaged-label recovery cell combining OCR, human verification, helper-label output, re-entry into automated flow, and measurable exception recovery.",
    auditFit: "Shows how a field exception becomes a system redesign instead of another software feature request.",
    href: "/tac-ops",
    icon: ScanLine,
  },
  {
    title: "LenderFlow / LENA",
    tag: "Lending OI",
    body: "A human-reviewed lender-fit and workflow system built through direct broker discovery, source receipts, exception handling, freshness, and visible missing information.",
    auditFit: "Demonstrates forward deployment: learn the work, prototype the missing layer, validate it with the expert, and hand it back.",
    href: "https://lf-lender-intake.vercel.app/",
    external: true,
    icon: BriefcaseBusiness,
  },
  {
    title: "LegalFlow LF2 / KONRAN",
    tag: "Evidence OI",
    body: "Source-linked evidence search, derivative records, chronology reconstruction, uncertainty separation, and human-expert authority for complex document workflows.",
    auditFit: "Tests whether evidence, provenance, and review survive when the volume becomes too large for memory alone.",
    href: "https://legalflow-lf2-beta.vercel.app/dashboard",
    external: true,
    icon: FileSearch,
  },
  {
    title: "PAPERGOBLIN",
    tag: "OCR + intake OI",
    body: "A document-intake prototype that converts messy receipts, labels, and scans into editable corrections, structured packets, persistence, and reusable human-feedback telemetry.",
    auditFit: "Shows that unreliable input is an operating condition to design around—not a reason to blame the user.",
    href: "https://ori-intake-papergoblin.vercel.app/",
    external: true,
    icon: ScanLine,
  },
  {
    title: "NULLWORKS AIRLIFT",
    tag: "Talent evidence",
    body: "A candidate-controlled evidence environment for people whose real capability is larger than their title, degree, industry, or résumé format can explain.",
    auditFit: "Applies the same evidence-first architecture to broken hiring filters and hidden systems talent.",
    href: "/airlift",
    icon: BriefcaseBusiness,
  },
  {
    title: "ANVIL / CUTSYNC",
    tag: "Creative production OI",
    body: "Structured creative intake, reusable production packets, versioning, canon, licensing boundaries, direction, selection, and human review for high-output media work.",
    auditFit: "Shows how creative work becomes observable and governable without reducing authorship to a prompt.",
    href: "https://anvil-custom-records.vercel.app/",
    external: true,
    icon: Sparkles,
  },
  {
    title: "Voice Foundry",
    tag: "Voice + continuity",
    body: "A private voice-first recorder and story vault that preserves original audio, editable transcripts, corrections, vocabulary, and transferable context.",
    auditFit: "Demonstrates that continuity is infrastructure: original source, corrected derivative, and decision history remain connected.",
    href: "/voice-foundry",
    icon: Network,
  },
  {
    title: "NULLWORKS Company Structure",
    tag: "Digital factory map",
    body: "A public visual of Mason as final Human Authority, the AI Operator interface, executive functions, specialist cells, review gates, telemetry, and client boundaries.",
    auditFit: "Makes the operating company around AI workers visible instead of leaving it inside the founder's head.",
    href: "/nullworks-company-structure-oisa.svg",
    external: true,
    icon: Boxes,
  },
];

const loop = [
  ["Observe", "Walk the real work with the person closest to the outcome and preserve the failures, workarounds, environmental constraints, and prior attempts."],
  ["Map", "Name the intended outcome, actors, tools, evidence, handoffs, authority, exception paths, and consequence owner."],
  ["Diagnose", "Determine whether the constraint is workflow, software, AI, data, physical conditions, governance, organization design, or some collision between them."],
  ["Prototype", "Build the smallest intervention that can change the outcome—sometimes software, sometimes an operating rule, sometimes a seven-dollar umbrella."],
  ["Validate + transfer", "Test with the people who know the work, measure what changed, preserve the receipt, and leave Human Authority in control."],
];

function PublicCard({ item }: { item: PublicLink }) {
  const Icon = item.icon;
  return (
    <article className={styles.mapCard}>
      <div className={styles.mapCardTop}>
        <div className={styles.cardIcon}><Icon size={21} /></div>
        <div className={styles.systemTag}>{item.tag}</div>
      </div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardBody}>{item.body}</p>
      <div className={styles.auditFit}>
        <strong>OISA audit connection</strong>
        <span>{item.auditFit}</span>
      </div>
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        className={styles.inlineLink}
      >
        Open {item.external ? "public system" : "page"}
        {item.external ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
      </a>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <div className={styles.brandMark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS PUBLIC OPERATING MAP</div>
              <div className={styles.brandName}>Mason Perry · Founder / OISA</div>
            </div>
          </a>

          <div className={styles.headerActions}>
            <a href="/ai-audit" className={styles.headerLink}>
              <ShieldCheck size={15} /> AI Audit
            </a>
            <a href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Operating%20Model%20Conversation" className={styles.headerPrimary}>
              <Mail size={15} /> Contact Mason
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Workflow size={15} /> Forward-Deployed Operational Architecture
            </div>

            <h1 className={styles.heroTitle}>I am not a software guy. I build the operating system around the work.</h1>

            <p className={styles.heroLead}>
              NULLWORKS is the public evidence map of one blue-collar systems operator force-multiplying a normal physical life with a second digital operating life: a coordinated company of specialist AI workrooms, not one more individual productivity tool.
            </p>

            <p className={styles.heroBody}>
              The digital company does not replace Mason&apos;s physical life. It extends his reach across digital time and space through parallel specialists, memory, evidence, review, and continuity. The projects below test the same OISA thesis: understand the real workflow, preserve authority, expose the exception path, build the smallest useful operating layer, and measure whether the outcome actually improved.
            </p>

            <div className={styles.heroActions}>
              <a href="#start" className={styles.primaryButton}>
                Explore the operating map <ArrowRight size={17} />
              </a>
              <a href="/ai-audit" className={styles.secondaryButton}>
                Start with one workflow <ShieldCheck size={17} />
              </a>
            </div>

            <div className={styles.proofRow}>
              <div className={styles.proof}><strong>Industrial reality</strong><span>Automation, logistics, electrical, mechanical, OCR, controls, and fault isolation.</span></div>
              <div className={styles.proof}><strong>Second digital life</strong><span>Specialist AI roles, scoped workrooms, evidence, review, continuity, and telemetry operating beside the physical one.</span></div>
              <div className={styles.proof}><strong>One thesis</strong><span>The model may be the worker. The operator still needs the factory.</span></div>
            </div>
          </div>

          <div className={styles.marsMission} aria-label="NULLWORKS Mars mission visual">
            <div className={styles.marsStars} />
            <div className={styles.marsTopline}>
              <span>PHRONONAUT // PUBLIC MISSION MAP</span>
              <span>HUMAN AUTHORITY FINAL</span>
            </div>
            <div className={styles.marsPlanet} />
            <div className={styles.flagPole}>
              <div className={styles.flag}>NULL<br />WORKS</div>
            </div>
            <div className={styles.operatorSilhouette}>
              <div className={styles.operatorHelmet} />
              <div className={styles.operatorBody}><span>NW</span></div>
            </div>
            <div className={styles.marsCaption}>
              <strong>Plant the flag where the category does not exist yet.</strong>
              <span>Then leave enough receipts for everyone else to find the route.</span>
            </div>
          </div>
        </section>

        <section className={styles.thesis}>
          <div className={styles.thesisIntro}>
            <div className={styles.darkEyebrow}>What this portfolio proves</div>
            <h2 className={styles.thesisTitle}>The work crosses software, operations, evidence, organization design, physical reality, and human judgment.</h2>
          </div>
          <div className={styles.thesisBody}>
            <p>
              A software portfolio asks what was coded. This operating map asks what was broken, why it mattered, what evidence was preserved, which intervention changed the outcome, and who retained authority when the system became consequential.
            </p>
            <blockquote className={styles.quote}>The tool is not the achievement. The working system is.</blockquote>
            <a href="/nullworks-company-structure-oisa.svg" target="_blank" rel="noreferrer" className={styles.goldButton}>
              View the digital company structure <ExternalLink size={16} />
            </a>
          </div>
        </section>

        <section id="start" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>01 // Understand the category</div>
              <h2 className={styles.sectionTitle}>Start with the operating thesis.</h2>
              <p className={styles.sectionBody}>These pages explain why organizational capability does not automatically appear when model capability improves.</p>
            </div>
          </div>
          <div className={styles.mapGrid}>
            {foundations.map((item) => <PublicCard item={item} key={item.title} />)}
          </div>
        </section>

        <section className={styles.loopSection}>
          <div className={styles.loopHeader}>
            <div className={styles.darkEyebrow}>02 // The OISA operating loop</div>
            <h2 className={styles.loopTitle}>From real workflow to measurable change.</h2>
            <p className={styles.loopLead}>The projects differ. The systems method stays recognizable.</p>
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

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionEyebrow}>03 // Working systems and field receipts</div>
              <h2 className={styles.sectionTitle}>Different domains. The same systems instinct.</h2>
              <p className={styles.sectionBody}>Each public system tests a different failure boundary: operations, lending, evidence, OCR, talent, creative production, voice continuity, or digital organization.</p>
            </div>
          </div>
          <div className={styles.mapGrid}>
            {systems.map((item) => <PublicCard item={item} key={item.title} />)}
          </div>
        </section>

        <section className={styles.twoColumn}>
          <article className={styles.lightCard}>
            <div className={styles.cardIcon}><ShieldCheck size={23} /></div>
            <h2 className={styles.bigCardTitle}>Human authority remains final.</h2>
            <p className={styles.bigCardBody}>AI may investigate, organize, retrieve, compare, draft, test, and recommend. Consequential action remains with the accountable human. Sources, uncertainty, permissions, review state, and stop-the-line controls should be visible by design.</p>
          </article>
          <article className={styles.warmCard}>
            <div className={styles.cardIcon}><Gauge size={23} /></div>
            <h2 className={styles.bigCardTitle}>The audit is allowed to say: do less.</h2>
            <p className={styles.bigCardBody}>The smallest correct intervention may be a workflow correction, a clear owner, a physical shelter, a lightweight prototype, a fractional OISA, or a full operating-model reset. More AI is not the default answer.</p>
          </article>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaIcon}><GitBranch size={25} /></div>
          <h2 className={styles.ctaTitle}>Bring one painful workflow and one person who knows the truth.</h2>
          <p className={styles.ctaBody}>We will start with the intended outcome, walk the actual work, preserve what has already been tried, find the constraint, and determine the smallest next test worth running.</p>
          <div className={styles.ctaActions}>
            <a href="/ai-audit" className={styles.primaryButton}>Open the AI Operating Model Audit <ArrowRight size={17} /></a>
            <a href="https://github.com/masoncalcolsol-creator" target="_blank" rel="noreferrer" className={styles.secondaryButton}><GitBranch size={16} /> GitHub receipts</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div><strong>NULLWORKS</strong> — Building the operating company around AI workers.</div>
          <div>Founder: Mason Perry · Forward-Deployed Operational Architect · OISA · Polymath² · Phrononaut by disposition.</div>
        </footer>
      </div>
    </main>
  );
}
