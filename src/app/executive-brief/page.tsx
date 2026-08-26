import {
  ArrowRight,
  BriefcaseBusiness,
  Factory,
  Gauge,
  Mail,
  Network,
  ScanLine,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import styles from "./executive-brief.module.css";

const steps = [
  { number: "01", title: "Learn the real work", body: "Walk one high-friction workflow with the people closest to the outcome. Preserve the workarounds, exceptions, missing context, and evidence the documented process leaves out.", icon: ScanLine },
  { number: "02", title: "Reconnect intent to execution", body: "Map where organizational intent, authority, evidence, and actual execution have drifted apart. Design the smallest governable intervention that can close the gap.", icon: Network },
  { number: "03", title: "Prove it before scaling", body: "Prototype with AI where it helps, keep human authority final, test with the expert, measure what changed, and hand production hardening to the right specialists.", icon: Gauge },
];

const fits = ["Industrial operations","Logistics and supply chain","Healthcare operations","Financial infrastructure","Critical infrastructure","Energy and utilities","Regulated enterprise workflows"];

export default function ExecutiveBriefPage() {
  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span><strong>NULLWORKS</strong><small>Executive brief</small></span>
          </a>
          <a href="mailto:nullworks.neuraxis@gmail.com?subject=NULLWORKS%20Executive%20Brief%20Conversation" className={styles.headerAction}>
            <Mail size={16} /> Contact NULLWORKS
          </a>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><Workflow size={16} /> Operational transformation for the AI era</div>
            <h1>Your company may be following the process and still losing the intent.</h1>
            <p className={styles.lead}>I enter one high-friction workflow, learn how it really works, identify where intent, authority, evidence, and execution have drifted apart, and prototype a governable human-AI operating system that reconnects them.</p>
            <div className={styles.actions}>
              <a href="/triage" className={styles.primaryButton}>Start with one workflow <ArrowRight size={17} /></a>
              <a href="/operating-map" className={styles.secondaryButton}>Inspect the receipts <ShieldCheck size={17} /></a>
            </div>
            <div className={styles.truthLine}><ShieldCheck size={16} /> Human authority remains final. Prototypes are validated before specialists harden, secure, and scale them.</div>
          </div>

          <aside className={styles.twentySecondCard}>
            <div className={styles.cardTopline}><span>20-SECOND READ</span><span>CEO / COO / TRANSFORMATION</span></div>
            <div className={styles.cardStatement}><span>THE PROBLEM</span><strong>Intent, authority, and execution slowly drift apart.</strong></div>
            <div className={styles.cardStatement}><span>THE WORK</span><strong>Find the real operating system and redesign the missing layer.</strong></div>
            <div className={styles.cardStatement}><span>THE PROOF</span><strong>Test one workflow, preserve the evidence, measure the outcome.</strong></div>
            <div className={styles.cardFooter}><Factory size={22} /><div><strong>AI is one worker inside the system.</strong><span>It is not the operating company.</span></div></div>
          </aside>
        </section>

        <section className={styles.definitionStrip}>
          <div><span>MARKET LANGUAGE</span><strong>Operational transformation · organizational design · AI enablement</strong></div>
          <div><span>NULLWORKS METHOD</span><strong>Observe · map · diagnose · prototype · validate · transfer</strong></div>
          <div><span>MASON&apos;S ROLE</span><strong>Forward-deployed operational architect</strong></div>
        </section>

        <section className={styles.stepsSection}>
          <div className={styles.sectionHeading}><span>HOW THE ENGAGEMENT WORKS</span><h2>One workflow. One visible operating problem. One defensible next move.</h2></div>
          <div className={styles.stepsGrid}>{steps.map((step) => { const Icon = step.icon; return <article className={styles.stepCard} key={step.number}><div className={styles.stepTop}><span>{step.number}</span><Icon size={23} /></div><h3>{step.title}</h3><p>{step.body}</p></article>; })}</div>
        </section>

        <section className={styles.fitSection}>
          <div className={styles.fitCopy}>
            <div className={styles.sectionHeading}><span>WHERE THIS CREATES THE MOST VALUE</span><h2>Environments where operational failure is expensive.</h2></div>
            <p>The strongest fit is not “a company that wants more AI.” It is an organization where people are already compensating for broken handoffs, outdated procedures, hidden workarounds, missing context, or authority that exists only informally.</p>
            <div className={styles.fitTags}>{fits.map((fit) => <span key={fit}>{fit}</span>)}</div>
          </div>
          <aside className={styles.offerCard}>
            <BriefcaseBusiness size={28} /><span>THE ENTRY POINT</span><h2>Operational Assurance Triage</h2>
            <p>Start with one consequential workflow. Determine what the organization believes is happening, what the evidence shows is happening, and the smallest intervention capable of improving the outcome.</p>
            <a href="/triage">Open Triage <ArrowRight size={17} /></a>
          </aside>
        </section>

        <section className={styles.finalSection}>
          <span>THE SIMPLE VERSION</span>
          <h2>I find the operating system people are actually using, then help the organization make it visible, governable, and better.</h2>
          <div className={styles.finalActions}>
            <a href="mailto:nullworks.neuraxis@gmail.com?subject=NULLWORKS%20Operational%20Transformation" className={styles.primaryButton}>Talk about the workflow <Mail size={17} /></a>
            <a href="/operational-systems" className={styles.secondaryButton}>See the operating method <ArrowRight size={17} /></a>
          </div>
        </section>

        <footer className={styles.footer}><div><strong>Mason Perry</strong><span>Founder, NULLWORKS · Operational Transformation & AI Systems Architect</span></div><a href="/">Open the complete NULLWORKS system</a></footer>
      </div>
    </main>
  );
}
