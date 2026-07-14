import type { Metadata } from "next";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import styles from "./founding.module.css";

export const metadata: Metadata = {
  title: "Operational Intelligence Systems Architect (OISA) | NULLWORKS",
  description:
    "The founding definition, professional scope, field method, and proof system for the Operational Intelligence Systems Architect role.",
};

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
            <a href="/field-notes/the-oi-architect" className={styles.headerLink}>Field note</a>
            <a href="mailto:masoncalcolsol@gmail.com?subject=OISA%20Conversation" className={styles.headerPrimary}>
              <Mail size={15} /> Contact Mason
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Emerging profession // founded through field work</div>
            <h1 className={styles.heroTitle}>Operational Intelligence Systems Architect</h1>
            <p className={styles.heroLead}>
              The AI engineer builds the worker. The OISA builds the operating company the worker needs.
            </p>
            <p className={styles.heroBody}>
              Organizations are adding models, copilots, agents, automations, and digital labor faster than they are defining roles, authority, evidence, review, continuity, exceptions, recovery, and measurable value. OISA names the systems function responsible for connecting those pieces to real human operations.
            </p>
            <div className={styles.heroActions}>
              <a href="#method" className={styles.primaryButton}>Inspect the field method <ArrowRight size={16} /></a>
              <a href="/ai-audit" className={styles.secondaryButton}>Start with one workflow <ShieldCheck size={16} /></a>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.definitionBox}>
              <small>Canonical definition // v0.1</small>
              <blockquote>
                An OISA designs, installs, governs, measures, and continuously improves the operating system connecting human experts, AI workers, software, evidence, authority, exceptions, recovery, telemetry, and organizational intent.
              </blockquote>
              <p>
                The role is model-agnostic. It coordinates multiple AI providers, specialist agents, conventional software, automation, and human-only steps without confusing any tool with the operating system itself.
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
            <article className={styles.card}><div className={styles.cardTag}>Discover</div><h3>Find the real workflow</h3><p>Work with the person closest to the outcome and capture the actual sequence, exceptions, workarounds, delays, constraints, and authority.</p></article>
            <article className={styles.card}><div className={styles.cardTag}>Architect</div><h3>Design the operating company</h3><p>Connect human experts, digital workers, software, sources, handoffs, controls, and measurable outcomes around one organizational intent.</p></article>
            <article className={styles.card}><div className={styles.cardTag}>Authority</div><h3>Protect human decision rights</h3><p>Define what AI may draft, recommend, execute, or never do, with visible review, escalation, stop-the-line, and final authority.</p></article>
            <article className={styles.card}><div className={styles.cardTag}>Evidence</div><h3>Preserve source and uncertainty</h3><p>Keep original evidence, provenance, transformation history, verified fact, inference, model output, user report, and unknown distinguishable.</p></article>
            <article className={styles.card}><div className={styles.cardTag}>Recovery</div><h3>Design for exceptions and failure</h3><p>Build correction, escalation, rollback, service restoration, and failure-receipt paths before a confident error becomes an organizational action.</p></article>
            <article className={styles.card}><div className={styles.cardTag}>Telemetry</div><h3>Measure value or damage</h3><p>Instrument time, waiting, searching, retyping, rework, quality, cost, risk, adoption, operator confidence, and recovered expert capacity.</p></article>
          </div>
        </section>

        <section id="method" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionEyebrow}>OISA field method // v0.1</div>
              <h2 className={styles.sectionTitle}>From messy reality to a governed work cell</h2>
            </div>
            <p className={styles.sectionIntro}>
              Observe the real work. Map intent, evidence, roles, authority, and exceptions. Build the smallest governed intervention. Forward deploy it with the expert. Preserve failures. Measure the result. Transfer the validated frame. Improve the system.
            </p>
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
              Hire Mason to design the operating architecture internally, or hire NULLWORKS to audit one consequential workflow, install one governed digital work cell, and produce a before-and-after operating receipt.
            </p>
          </div>
          <div className={styles.pathGrid}>
            <article className={styles.pathCard}><div className={styles.cardTag}>Internal role</div><h3>Hire Mason as an OISA</h3><p>I built and operate a model-agnostic digital company around one human. I install the equivalent operating architecture around experts, workflows, and existing AI stacks.</p><a href="mailto:masoncalcolsol@gmail.com?subject=Internal%20OISA%20Role" className={styles.textLink}>Discuss an internal role <ArrowRight size={15} /></a></article>
            <article className={styles.pathCard}><div className={styles.cardTag}>Client installation</div><h3>Hire NULLWORKS</h3><p>Start with one expert, one bounded workflow, one governed digital work cell, and one measurable before-and-after receipt before scaling.</p><a href="/ai-audit" className={styles.textLink}>Inspect the audit path <ArrowRight size={15} /></a></article>
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <h2>The model may be the worker. The operator still needs the factory.</h2>
            <p>Organization &gt; More AI.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="mailto:masoncalcolsol@gmail.com?subject=OISA%20or%20NULLWORKS%20Conversation" className={styles.primaryButton}><Mail size={16} /> Start a conversation</a>
            <a href="/" className={styles.secondaryButton}>Explore the proof vehicles <ArrowRight size={16} /></a>
          </div>
        </section>

        <footer className={styles.footer}>OISA founding definition and field standard v0.1 · Mason Perry / NULLWORKS · July 2026</footer>
      </div>
    </main>
  );
}
