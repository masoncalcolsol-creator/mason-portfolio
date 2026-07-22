import type { Metadata } from "next";
import LivingSignalCanvas from "../../living-signals/LivingSignalCanvas";
import styles from "./page.module.css";

const canonical =
  "https://mason-portfolio-main.vercel.app/field-notes/laboratory-leak";

export const metadata: Metadata = {
  title: "The Laboratory Leak | NULLWORKS",
  description:
    "How emerging work becomes keyword soup and marketing slop before it becomes a category—and how NULLWORKS is turning runtime truth into accountable operational architecture.",
  alternates: { canonical },
  openGraph: {
    title: "The Laboratory Leak",
    description:
      "The profile became a laboratory notebook wearing a name tag. Then the category became clear.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Laboratory Leak",
    description:
      "How emerging work becomes keyword soup and marketing slop before it becomes a category.",
  },
};

const lineage = [
  "Evidence",
  "Judgment",
  "Authority",
  "Decision",
  "Action",
  "Outcome",
  "Revision",
];

const method = [
  {
    title: "Observe",
    body: "Watch the work where it actually happens. Find the runtime reality, not the narrated version.",
  },
  {
    title: "Preserve",
    body: "Retain evidence, context, exceptions, conditions, and the moment professional judgment formed.",
  },
  {
    title: "Map",
    body: "Identify where authority formally exists, where it actually moved, and who could commit the organization.",
  },
  {
    title: "Change",
    body: "Turn runtime truth into accountable intervention, measured outcomes, and retained organizational memory.",
  },
];

const outcomes = [
  "Clearer authority",
  "Less operational friction",
  "Better decisions",
  "Stronger frontline capability",
  "A system that remembers what actually happened",
];

export default function LaboratoryLeakPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "When the Laboratory Leaks Into the Profile",
    alternativeHeadline:
      "How emerging work becomes keyword soup and marketing slop before it becomes a category",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    dateModified: "2026-07-22",
    url: canonical,
    description:
      "A NULLWORKS field note on category formation, public experimentation, immutable records, and Operational Systems Architecture.",
  };

  return (
    <main
      className={styles.page}
      style={{ position: "relative", isolation: "isolate" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          opacity: 0.28,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.86) 58%, rgba(0,0,0,0.32) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.86) 58%, rgba(0,0,0,0.32) 100%)",
        }}
      >
        <LivingSignalCanvas mode="conveyor" accentRgb="212, 154, 74" />
      </div>

      <header className={styles.nav}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span>NULLWORKS</span>
        </a>
        <div className={styles.navLabel}>FIELD NOTE / 001</div>
      </header>

      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>
            NULLWORKS / OPERATIONAL SYSTEMS ARCHITECTURE
          </p>
          <h1>
            When the <span>Laboratory Leaks</span> Into the Profile
          </h1>
          <p className={styles.subtitle}>
            How emerging work becomes keyword soup and marketing slop before it
            becomes a category.
          </p>
          <p className={styles.lede}>
            For a while, my LinkedIn profile looked like a laboratory notebook
            that escaped into public. That was not an accident. The work was
            evolving faster than the language used to explain it.
          </p>
          <div className={styles.actions}>
            <a href="#field-note" className={styles.primaryButton}>
              Read the field note
            </a>
            <a href="#architecture" className={styles.secondaryButton}>
              See the architecture
            </a>
          </div>
          <p className={styles.heroLine}>
            Most organizations document one system and operate another.
          </p>
        </div>
      </section>

      <section id="field-note" className={styles.section}>
        <article className={`${styles.shell} ${styles.articleShell}`}>
          <p className={styles.kicker}>THE LABORATORY LEAK</p>
          <h2>The profile became the lab notebook wearing a name tag.</h2>

          <div className={styles.prose}>
            <p>
              When you are building in an emerging category, language
              accumulates faster than clarity. Every new distinction matters.
              Every experiment leaves a trace. Before long, the public profile
              starts reading like a workbench covered in parts.
            </p>
            <p>That is what happened here.</p>
            <p>
              I did not enter this work as a software engineer polishing a
              finished category from inside an established industry lane. I
              came from consequential operating environments: the fire service,
              EMS, armed security, public safety, law-enforcement work, industrial
              systems, and frontline decisions made under pressure.
            </p>
            <p>
              From that background, I began using AI the same way I approached
              every other system: observe it, test it, reduce friction, preserve
              evidence, and determine what was actually happening beneath the
              declared process.
            </p>
            <p>
              That produced what experienced software people reasonably called
              <strong> keyword soup</strong>—and what others reasonably saw as
              <strong> marketing slop</strong>.
            </p>
            <p>Neither criticism was wrong.</p>
            <p>
              But they were seeing a live frontier, not a mature product page.
              The language was trying to describe a problem most organizations
              still struggle to name cleanly:
            </p>

            <div className={styles.quoteBlock}>
              <p>The documented system is often not the system that runs.</p>
              <p>The org chart is often not where authority actually lives.</p>
              <p>
                The approval record is often not the moment the real decision
                was made.
              </p>
              <p>
                The workflow on paper is often not the workflow people navigate.
              </p>
            </div>

            <p>That gap is the work.</p>
            <p>
              Telemetry, orchestration, receipts, governance, decision lineage,
              evidence capture, runtime truth, authority boundaries, and
              operational intelligence were not random decorations. They were
              fragments of one architecture slowly becoming visible.
            </p>

            <div className={styles.statement}>
              I help organizations see how work really gets done and turn that
              evidence into accountable operational change.
            </div>

            <p>Everything else is method, tooling, or proof.</p>
            <p>
              The leak was useful. It preserved the path of discovery and let
              smart people challenge the thinking in public. It exposed where
              the language was too broad, too technical, too software-shaped,
              or simply unresolved.
            </p>
            <p>
              But eventually exploration has to harden into position. The
              public explanation cannot carry every instrument from the lab.
              It has to communicate the category clearly enough to act on it.
            </p>

            <div className={`${styles.statement} ${styles.statementBlue}`}>
              Most organizations document one system and operate another. I help
              leaders find the gap.
            </div>

            <p>
              I call the work <strong>Operational Systems Architecture</strong>.
            </p>
            <p>
              It maps how evidence moves, where authority actually sits, how
              judgment becomes authorization, what action follows, whether the
              intervention worked, and what the organization remembers afterward.
            </p>
            <p>
              It is also being designed around <strong>immutable records</strong>:
              durable decision receipts that preserve what was known, who exercised
              authority, what was authorized, and what happened next—without letting
              the history be quietly rewritten after the outcome is known.
            </p>
            <p>
              The point is not more documentation. The point is not another
              polished deck. The point is not AI theater.
            </p>
            <p>The point is measurable operational change.</p>
          </div>
        </article>
      </section>

      <section id="architecture" className={`${styles.section} ${styles.architecture}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>RUNTIME ARCHITECTURE</p>
          <h2>The chain that has to survive reality.</h2>
          <p className={styles.sectionIntro}>
            An audit trail may prove that a workflow ran. It does not necessarily
            prove that a decision was governed. That requires preserving the
            complete operating lineage while the decision is happening—and carrying
            it forward in records designed to resist silent revision.
          </p>

          <div className={styles.lineageGrid}>
            {lineage.map((item, index) => (
              <div className={styles.lineageCard} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>

          <div className={styles.architectureCallout}>
            <span>The product is not more documentation.</span>
            <strong>The product is accountable operational change.</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.kicker}>METHOD</p>
          <h2>Observe. Preserve. Map. Change.</h2>
          <p className={styles.sectionIntro}>
            NULLWORKS combines field observation, telemetry, external challenge,
            AI-assisted analysis, and decision receipts to convert runtime truth
            into an accountable operating model.
          </p>

          <div className={styles.methodGrid}>
            {method.map((item) => (
              <div className={styles.methodCard} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.outcomesSection}`}>
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div>
            <p className={styles.kicker}>WHAT CHANGES</p>
            <h2>AI is a tool inside the architecture. It is not the architecture.</h2>
            <p className={styles.sectionIntro}>
              The objective is not another platform or another report that
              disappears into a folder. The objective is measurable improvement
              in how the organization actually operates.
            </p>
          </div>
          <div className={styles.outcomeList}>
            {outcomes.map((item) => (
              <div className={styles.outcomeItem} key={item}>
                <span />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <article className={`${styles.shell} ${styles.articleShell}`}>
          <p className={styles.kicker}>FIELD LINEAGE</p>
          <h2>Why the voice is blunt.</h2>
          <div className={styles.prose}>
            <p>The tone did not come from software.</p>
            <p>
              It came from the fire service, EMS, armed security, public safety,
              law-enforcement work, industrial operations, and environments where
              confusion creates consequences.
            </p>
            <p>
              In those systems, clarity is not a communication preference. It is
              a control. You assess the scene, identify the immediate threat,
              intervene, reassess, and escalate when the evidence requires it.
            </p>
            <p>
              That is why the work can sound sharper than conventional business
              language. It is not hostility. It is operational discipline.
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.closing}`}>
        <div className={`${styles.shell} ${styles.articleShell}`}>
          <p className={styles.kicker}>THE INSTRUMENT</p>
          <h2>The laboratory leaked. Now the instrument is clearer.</h2>
          <div className={styles.prose}>
            <p>
              Laboratories leak experiments before they produce instruments.
            </p>
            <p>
              The public work preserved the exploration. The pressure tests
              sharpened the category. The cleanup removed the laboratory from the
              storefront without erasing the evidence that produced it.
            </p>
            <p>
              Do not hire me to produce another report. Hire me when you are
              ready to change what the evidence proves.
            </p>
          </div>
          <div className={styles.finalCard}>
            <span>NULLWORKS</span>
            <strong>Runtime truth → accountable change</strong>
            <p>
              Operational Systems Architecture for organizations prepared to see
              how the work actually gets done.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <span>NULLWORKS</span>
          <span>Mason Perry / Operational Systems Architect</span>
        </div>
      </footer>
    </main>
  );
}
