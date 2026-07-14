import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  Factory,
  FileSearch,
  Gauge,
  GitBranch,
  Mail,
  Network,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import styles from "./oisa.module.css";

export const metadata: Metadata = {
  title: "Operational Intelligence Systems Architect (OISA) | NULLWORKS",
  description:
    "The founding definition, professional scope, field method, and proof system for the Operational Intelligence Systems Architect role.",
};

type Mandate = {
  icon: typeof Workflow;
  tag: string;
  title: string;
  body: string;
};

type TextPair = [title: string, body: string];

const mandates: Mandate[] = [
  {
    icon: Workflow,
    tag: "01 // Discover",
    title: "Find the real workflow",
    body: "Work with the person closest to the outcome and capture the actual sequence, exceptions, workarounds, delays, environmental constraints, and authority—not merely the documented process.",
  },
  {
    icon: Factory,
    tag: "02 // Architect",
    title: "Design the operating company",
    body: "Translate organizational intent into a visible production system connecting human experts, digital workers, tools, sources, handoffs, controls, and measurable outcomes.",
  },
  {
    icon: UserRoundCheck,
    tag: "03 // Authority",
    title: "Protect human decision rights",
    body: "Define what AI may draft, recommend, execute, or never do. Place review, escalation, stop-the-line, and final authority where consequence and uncertainty require them.",
  },
  {
    icon: FileSearch,
    tag: "04 // Evidence",
    title: "Preserve source and uncertainty",
    body: "Keep original evidence, provenance, transformation history, fact, inference, model output, user report, and unknown distinguishable throughout the workflow.",
  },
  {
    icon: GitBranch,
    tag: "05 // Recovery",
    title: "Design for exceptions and failure",
    body: "Build correction, escalation, rollback, service restoration, and failure-receipt paths before a confident model error becomes an organizational action.",
  },
  {
    icon: Gauge,
    tag: "06 // Telemetry",
    title: "Measure value or damage",
    body: "Instrument time, waiting, searching, retyping, rework, errors, quality, cost, risk, adoption, operator confidence, and recovered expert capacity.",
  },
];

const roles: TextPair[] = [
  ["AI engineer", "Builds and improves intelligent capabilities and model-enabled systems."],
  ["Software engineer", "Builds, tests, secures, scales, and maintains software systems."],
  ["Solutions architect", "Designs technical solutions and integrations around business requirements."],
  ["Product manager", "Owns users, product outcomes, priorities, roadmap, and delivery decisions."],
  ["AI governance specialist", "Defines policy, risk, compliance, assurance, and accountability requirements."],
  ["OISA", "Designs the combined operating system across humans, AI workers, software, evidence, authority, exceptions, recovery, telemetry, and organizational intent."],
];

const method: TextPair[] = [
  ["Observe", "Walk the real work and preserve failures, workarounds, constraints, and operator language."],
  ["Map", "Name the outcome, people, systems, sources, handoffs, rules, authority, and exception path."],
  ["Diagnose", "Determine whether the constraint is workflow, software, data, physical conditions, governance, organization design, or a collision between them."],
  ["Specify", "Define the smallest governed human-AI work cell that can materially change the outcome."],
  ["Build", "Create or direct the minimum control surface required for the operator to understand and control the work."],
  ["Forward deploy", "Put the artifact in front of the domain expert, remove assumptions, and capture what is useful, hated, missing, or wrong."],
  ["Recover", "Preserve failures, correct rules, restore service, and turn the lesson into reusable doctrine."],
  ["Measure", "Produce a before-and-after operating receipt showing value, damage, limits, and remaining uncertainty."],
  ["Transfer", "Hand a validated operating frame to engineering, security, compliance, operations, or the next work cell."],
  ["Improve", "Version the roles, authority, sources, controls, interfaces, telemetry, and reasons for change."],
];

const proofs: TextPair[] = [
  ["The Hive", "Continuity, bounded roles, organizational memory, policy enforcement, and failure receipts."],
  ["LenderFlow", "Forward-deployed discovery, messy input to structured data, rule matching, review, and existing-system export."],
  ["LegalFlow", "Source-linked evidence, provenance, uncertainty separation, chronology, and human review."],
  ["TAC OPS", "Physical exception recovery, OCR, operator verification, helper output, and re-entry into automation."],
  ["ANVIL", "Canonical creative identity, emotional telemetry, reusable production recipes, and human authorship."],
  ["LINKED-OUT", "Parallel research and production work cells producing one evidence-backed public campaign."],
  ["PAPERGOBLIN", "Messy OCR intake, human correction, persistence, structured packets, and reusable feedback telemetry."],
  ["NULLWORKS", "The founder-operated reference implementation: one human directing a model-agnostic digital company."],
];

export default function OisaPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <div className={styles.mark}>OI</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS CATEGORY FOUNDING PAGE</div>
              <div className={styles.brandName}>Operational Intelligence Systems Architect</div>
            </div>
          </a>

          <div className={styles.headerActions}>
            <a href="/field-notes/the-oi-architect" className={styles.headerLink}>
              Field note
            </a>
            <a href="mailto:masoncalcolsol@gmail.com?subject=OISA%20Conversation" className={styles.headerPrimary}>
              <Mail size={15} /> Contact Mason
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Network size={15} /> Emerging profession // founded through field work
            </div>
            <h1 className={styles.heroTitle}>Operational Intelligence Systems Architect</h1>
            <p className={styles.heroLead}>
              The AI engineer builds the worker. The OISA builds the operating company the worker needs.
            </p>
            <p className={styles.heroBody}>
              Organizations are adding models, copilots, agents, automations, and digital labor faster than they are defining roles, authority, evidence, review, continuity, exceptions, recovery, and measurable value. OISA names the systems function responsible for connecting those pieces to real human operations.
            </p>
            <div className={styles.heroActions}>
              <a href="#method" className={styles.primaryButton}>
                Inspect the field method <ArrowRight size={16} />
              </a>
              <a href="/ai-audit" className={styles.secondaryButton}>
                Start with one workflow <ShieldCheck size={16} />
              </a>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.definitionBox}>
              <small>Canonical definition // v0.1</small>
              <blockquote>
                An OISA designs, installs, governs, measures, and continuously improves the operating system connecting human experts, AI workers, software, evidence, authority, exceptions, recovery, telemetry, and organizational intent.
              </blockquote>
              <p>
                The role is model-agnostic. It coordinates OpenAI, Anthropic, Google, Microsoft, local models, specialist agents, conventional software, automation, and human-only steps without confusing any provider or tool with the operating system itself.
              </p>
            </div>
          </aside>
        </section>

        <div className={styles.banner}>AI companies provide digital workers. OISAs design the organizations those workers require.</div>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionEyebrow}>Role mandate</div>
              <h2 className={styles.sectionTitle}>What an OISA is accountable for</h2>
            </div>
            <p className={styles.sectionIntro}>
              The role does not exist to add more AI activity. It exists to make the combined human and digital production system understandable, controllable, recoverable, and valuable.
            </p>
          </div>

          <div className={styles.grid}>
            {mandates.map(({ icon: Icon, tag, title, body }) => (
              <article key={title} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.icon}><Icon size={20} /></div>
                  <div className={styles.cardTag}>{tag}</div>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionEyebrow}>Professional boundary</div>
              <h2 className={styles.sectionTitle}>A systems role across essential specialties</h2>
            </div>
            <p className={styles.sectionIntro}>
              OISA does not replace engineering, security, governance, product, change management, or domain expertise. It designs the production system that allows those specialties and the digital workforce to function together around one accountable outcome.
            </p>
          </div>

          <div className={styles.roleGrid}>
            {roles.map(([title, body], index) => (
              <article key={title} className={styles.roleCard}>
                <div className={styles.cardTag}>{index === roles.length - 1 ? "Integrating role" : "Adjacent specialty"}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="method" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionEyebrow}>OISA field method // v0.1</div>
              <h2 className={styles.sectionTitle}>From messy reality to a governed work cell</h2>
            </div>
            <p className={styles.sectionIntro}>
              The method begins with the operating floor, not the model catalog. Every build must preserve a named human owner, source evidence, exception handling, recovery, telemetry, and an honest handoff boundary.
            </p>
          </div>

          <div className={styles.method}>
            {method.map(([name, description], index) => (
              <div key={name} className={styles.methodRow}>
                <div className={styles.methodNumber}>{String(index + 1).padStart(2, "0")}</div>
                <div className={styles.methodName}>{name}</div>
                <div className={styles.methodDescription}>{description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionEyebrow}>Operating receipts</div>
              <h2 className={styles.sectionTitle}>The category emerged from shipped systems</h2>
            </div>
            <p className={styles.sectionIntro}>
              These are not presented as finished enterprise products. They are cross-domain field receipts showing that the same architecture repeatedly converts messy intent, evidence, rules, authority, exceptions, and human review into usable output.
            </p>
          </div>

          <div className={styles.proofGrid}>
            {proofs.map(([title, body]) => (
              <article key={title} className={styles.proofCard}>
                <div className={styles.cardTag}>Proof vehicle</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>

          <div className={styles.truth}>
            <strong>Truth boundary:</strong> Operational Intelligence Systems Architect is an emerging category description under active field definition. It is not yet a universally recognized credential, accredited profession, or established labor classification. The title alone proves nothing; competence must be demonstrated through field artifacts, human authority, evidence discipline, recovery, measured outcomes, and honest limitations.
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionEyebrow}>Two deployment paths</div>
              <h2 className={styles.sectionTitle}>Hire the architect or install the work cell</h2>
            </div>
            <p className={styles.sectionIntro}>
              The same operating architecture supports an internal executive or principal role and a bounded external NULLWORKS engagement.
            </p>
          </div>

          <div className={styles.pathGrid}>
            <article className={styles.pathCard}>
              <div className={styles.icon}><UserRoundCheck size={20} /></div>
              <h3>Hire Mason as an OISA</h3>
              <p>
                I built and operate a model-agnostic digital company around one human. Hire me to design and install the equivalent operating architecture around your experts, workflows, and existing AI stack.
              </p>
              <a href="mailto:masoncalcolsol@gmail.com?subject=Internal%20OISA%20Role" className={styles.textLink}>
                Discuss an internal role <ArrowRight size={15} />
              </a>
            </article>

            <article className={styles.pathCard}>
              <div className={styles.icon}><Boxes size={20} /></div>
              <h3>Hire NULLWORKS</h3>
              <p>
                We audit one consequential workflow, install one governed digital work cell, and produce a before-and-after operating receipt before you decide whether to stop, harden, expand, support, or license it.
              </p>
              <a href="/ai-audit" className={styles.textLink}>
                Inspect the audit path <ArrowRight size={15} />
              </a>
            </article>
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <h2>The model may be the worker. The operator still needs the factory.</h2>
            <p>
              Start with one expert, one bounded workflow, one governed digital work cell, and one measurable before-and-after receipt.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <a href="mailto:masoncalcolsol@gmail.com?subject=OISA%20or%20NULLWORKS%20Conversation" className={styles.primaryButton}>
              <Mail size={16} /> Start a conversation
            </a>
            <a href="/" className={styles.secondaryButton}>
              Explore the proof vehicles <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          OISA founding definition and field standard v0.1 · Mason Perry / NULLWORKS · July 2026
        </footer>
      </div>
    </main>
  );
}
