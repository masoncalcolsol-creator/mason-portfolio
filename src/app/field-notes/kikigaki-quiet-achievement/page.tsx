import type { Metadata } from "next";
import { ArrowRight, BookOpen, Eye, Radio } from "lucide-react";
import OscilloscopeField from "../kikigaki-first-nugget/OscilloscopeField";
import styles from "../kikigaki-first-nugget/page.module.css";

const canonical =
  "https://www.pioneeringoperationalarchitecture.com/field-notes/kikigaki-quiet-achievement";

export const metadata: Metadata = {
  title: "The Quiet Achievement: When Dependability Becomes Invisible | NULLWORKS",
  description:
    "KIKIGAKI Field Note 002, drawn from Carl Mikael Björn's reflection on invisible technology: dependable systems stop asking for attention, but must remain inspectable at authority and failure boundaries.",
  alternates: { canonical },
  openGraph: {
    title: "The Quiet Achievement: When Dependability Becomes Invisible",
    description:
      "The best technology stops asking to be noticed. The best operating architecture does the same—without becoming opaque.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Quiet Achievement",
    description:
      "KIKIGAKI Field Note 002 on dependable systems, released attention, and inspectable invisibility.",
  },
};

const signalRows = [
  ["01", "Silence noticed", "A refrigerator stopped humming. Its absence revealed how completely its reliability had entered ordinary life."],
  ["02", "Practitioner phrase", "Carl Mikael Björn named the pattern: the best technology becomes invisible."],
  ["03", "Boundary crossed", "A dependable tool stops feeling separate and becomes part of the environment through which other work happens."],
  ["04", "Architecture extended", "Invisible in normal operation must still mean visible at failure, review, and authority boundaries."],
];

const ledger = [
  {
    number: "NUGGET 01",
    title: "Reliability releases attention",
    body: "Novelty asks to be watched. Dependability gives attention back. The system succeeds when the person can return to the work instead of supervising the machinery.",
  },
  {
    number: "NUGGET 02",
    title: "The tool becomes the ground",
    body: "Mature infrastructure is no longer experienced as a separate object. It becomes part of the dependable world from which everything else is experienced.",
  },
  {
    number: "NUGGET 03",
    title: "Invisibility is not opacity",
    body: "A quiet interface may disappear from ordinary attention. Evidence, ownership, state, and authority must remain inspectable to the people responsible for consequences.",
  },
  {
    number: "NUGGET 04",
    title: "Failure restores visibility",
    body: "When a dependable certainty withdraws, the interruption should surface clearly, reach the right operator, preserve its evidence, and support recovery without drama or ambiguity.",
  },
];

const architecture = [
  ["01", "Quiet", "Normal operation does not demand unnecessary attention."],
  ["02", "Dependable", "The expected service remains available and consistent."],
  ["03", "Interruptible", "Meaningful exceptions can break through the quiet."],
  ["04", "Inspectable", "Evidence and decision lineage remain available on demand."],
  ["05", "Recoverable", "Failure can be bounded, explained, and repaired."],
];

const operatingTests = [
  {
    number: "01",
    title: "Does it disappear for the worker?",
    body: "The person doing the real work should not have to manage prompts, model personalities, retries, memory fragments, and routing mechanics as a second job.",
  },
  {
    number: "02",
    title: "Does it appear for the accountable operator?",
    body: "When a consequential decision approaches, the system must surface evidence, uncertainty, authority, and the exact reason human attention is required.",
  },
  {
    number: "03",
    title: "Does silence mean health—or missing telemetry?",
    body: "A quiet system is only trustworthy when silence is supported by observable state, not by the absence of instrumentation or an operator quietly compensating off-record.",
  },
  {
    number: "04",
    title: "Can it fail without becoming mysterious?",
    body: "The architecture should make interruption legible: what changed, what remains safe, who owns the next move, and how ordinary operation can be restored.",
  },
];

export default function KikigakiQuietAchievementPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Quiet Achievement: When Dependability Becomes Invisible",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
    url: canonical,
    description:
      "A KIKIGAKI field note extending Carl Mikael Björn's reflection on invisible technology into an operating-architecture principle for dependable, inspectable systems.",
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.background} aria-hidden="true">
        <OscilloscopeField />
      </div>
      <div className={styles.backgroundVeil} aria-hidden="true" />

      <header className={styles.nav}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span>NULLWORKS</span>
        </a>
        <div className={styles.navMeta}>KIKIGAKI FIELD NOTE / 002 / PUBLIC RECEIPT</div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>KIKIGAKI / WISDOM MINING / FIELD RECEIPT 002</p>
            <h1>
              The Quiet <span>Achievement.</span>
            </h1>
            <p className={styles.subtitle}>
              When something becomes truly dependable, it stops asking for attention
              and becomes part of the world in which ordinary work can happen.
            </p>
            <p className={styles.lede}>
              Carl Mikael Björn began with the silence left by a refrigerator that had
              stopped humming. From that small interruption came a larger observation:
              successful technology may not remain an object we admire. It may become a
              certainty we simply live inside.
            </p>
            <div className={styles.actions}>
              <a href="#field-note" className={styles.primaryButton}>
                Read the field note <ArrowRight size={17} />
              </a>
              <a href="/journal/mr-sloth-quiet-achievement" className={styles.secondaryButton}>
                Read Mr. Sloth&apos;s observation <BookOpen size={17} />
              </a>
            </div>
          </div>

          <aside className={styles.signalCard} aria-label="Quiet achievement signal ledger">
            <div className={styles.signalTop}>
              <span className={styles.liveDot}>SIGNAL ACQUIRED</span>
              <span>SOURCE · 2026-07-12</span>
            </div>
            <div className={styles.signalRows}>
              {signalRows.map(([number, title, body]) => (
                <div className={styles.signalRow} key={number}>
                  <div className={styles.signalIndex}>{number}</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="field-note" className={styles.section}>
        <article className={styles.articleShell}>
          <p className={styles.kicker}>THE MOMENT</p>
          <h2>The refrigerator had not disappeared. It had stopped asking to be noticed.</h2>
          <div className={styles.prose}>
            <p>
              In <em>I Noticed the Silence First</em>, Carl describes an ordinary kitchen
              made suddenly strange by the absence of a familiar hum. Nothing else had
              changed. The silence simply revealed a dependable background certainty
              that had become almost impossible to separate from ordinary life.
            </p>
            <p>
              Later, when asked what successful technology looked like, the answer came
              quickly:
            </p>
            <div className={styles.pullQuote}>
              “The best technology becomes invisible.”
            </div>
            <p>
              The insight is not that useful systems literally vanish. The refrigerator,
              electricity, water, and internet remain physically and operationally
              present. What disappears is the need to keep them in active attention.
            </p>
            <p>
              Dependability crosses a boundary. The system stops feeling like a thing
              being used and starts functioning as part of the environment from which
              everything else is experienced.
            </p>
            <div className={styles.truthBoundary}>
              <strong>Source and truth boundary:</strong> This field note is based on the
              user-supplied screen recording of Carl Mikael Björn&apos;s public LinkedIn
              article, <em>I Noticed the Silence First</em>, dated July 12, 2026. Carl is
              credited for the source observation and quoted language. The NULLWORKS
              operating-architecture extension below is Mason Perry&apos;s interpretation.
              This receipt does not imply endorsement, partnership, or client relationship.
            </div>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.sectionBorder}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>WHAT WAS MINED</p>
          <h2>Dependability changes the economics of human attention.</h2>
          <p className={styles.sectionIntro}>
            The nugget is larger than interface simplicity. It describes what happens
            when a reliable system becomes environmental—and the governance required
            to keep that invisibility from becoming dangerous opacity.
          </p>
          <div className={styles.ledgerGrid}>
            {ledger.map((item) => (
              <article className={styles.ledgerCard} key={item.number}>
                <div className={styles.cardNumber}>{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <article className={styles.articleShell}>
          <p className={styles.kicker}>THE NULLWORKS DISTINCTION</p>
          <h2>Invisible to the worker. Inspectable to the person responsible.</h2>
          <div className={styles.prose}>
            <p>
              A dependable operating system should release the worker from supervising
              the machinery. The right evidence appears. The handoff survives. The
              system remembers. Ordinary cases continue without demanding admiration.
            </p>
            <p>
              But invisible operation cannot mean invisible authority, invisible
              failure, or invisible consequences.
            </p>
            <div className={styles.pullQuote}>
              Quiet in normal operation. Visible at the authority boundary. Inspectable
              during failure. Traceable during review.
            </div>
            <p>
              The worker should not need to see every route, model call, retry, memory
              transfer, or policy check. The accountable operator must be able to inspect
              exactly those things when the system approaches a consequential action or
              when expected certainty withdraws.
            </p>
            <p>
              That is the difference between mature infrastructure and hidden machinery.
              One releases attention while preserving control. The other merely makes the
              risk harder to see.
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.sectionBorder}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>THE OPERATING TEST</p>
          <h2>Four questions for systems that want to disappear responsibly.</h2>
          <p className={styles.sectionIntro}>
            Invisibility is earned by reliability, not by hiding complexity. These tests
            keep quiet operation connected to evidence, human authority, and recovery.
          </p>
          <div className={styles.loopGrid}>
            {operatingTests.map((item) => (
              <article className={styles.loopCard} key={item.number}>
                <div className={styles.cardNumber}>{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.kicker}>FROM NOVELTY TO INFRASTRUCTURE</p>
          <h2>A mature system becomes quieter without becoming less accountable.</h2>
          <p className={styles.sectionIntro}>
            The progression is not toward disappearance alone. It is toward ordinary,
            dependable operation with precise visibility when human judgment is needed.
          </p>
          <div className={styles.transferChain}>
            {architecture.map(([number, title, body]) => (
              <div className={styles.transferStep} key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionBorder}`}>
        <article className={styles.articleShell}>
          <p className={styles.kicker}>THE QUIETER DEFINITION OF SUCCESS</p>
          <h2>Not in being admired. In being forgotten.</h2>
          <div className={styles.prose}>
            <p>
              Organizations naturally celebrate beginnings: launches, pilots, new
              models, new dashboards, new transformation programs. The quieter
              achievement receives less attention.
            </p>
            <p>
              It is the moment the system stops feeling new because it has become part
              of the organization&apos;s dependable world. People stop discussing the tool
              and begin doing better work through it.
            </p>
            <p>
              That does not make the system less important. It may mean the system has
              become foundational enough that attention can move elsewhere.
            </p>
            <div className={styles.pullQuote}>
              Novelty demands attention. Reliability releases it. Maturity becomes part
              of the world.
            </div>
            <p>
              For NULLWORKS, that is a meaningful destination: the operating architecture
              no longer feels like another layer imposed on the expert. It becomes the
              dependable environment in which the expert can finally expert.
            </p>
          </div>
        </article>
      </section>

      <section className={styles.closing}>
        <div className={styles.shell}>
          <p className={styles.kicker}>FIELD NOTE 002 / SIGNAL PRESERVED</p>
          <h2>
            The best system may be the one people stop noticing—until they need to <span>trust it.</span>
          </h2>
          <p>
            Build for quiet operation. Preserve inspectability. Let reliability return
            attention to the human work that matters.
          </p>
          <div className={styles.actions} style={{ justifyContent: "center" }}>
            <a href="/journal/mr-sloth-quiet-achievement" className={styles.primaryButton}>
              Open Mr. Sloth&apos;s observation <BookOpen size={17} />
            </a>
            <a href="/field-notes" className={styles.secondaryButton}>
              Return to Field Notes <Radio size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>Mason Perry</strong> · Founder, NULLWORKS · Operational Systems Architect
        </div>
        <a href="/field-notes">
          KIKIGAKI / FIELD RECEIPTS <Eye size={13} style={{ verticalAlign: "middle" }} />
        </a>
      </footer>
    </main>
  );
}
