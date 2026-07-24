import type { Metadata } from "next";
import { ArrowRight, BookOpen, Radio, Waves } from "lucide-react";
import OscilloscopeField from "./OscilloscopeField";
import styles from "./page.module.css";

const canonical =
  "https://www.pioneeringoperationalarchitecture.com/field-notes/kikigaki-first-nugget";

export const metadata: Metadata = {
  title: "The First Nugget: Mining Wisdom in Public | NULLWORKS",
  description:
    "A public LinkedIn exchange became a live demonstration of KIKIGAKI wisdom mining: practitioner language named hero-ops, separated instrumentation from calibration, and sharpened the transfer test for expert knowledge.",
  alternates: { canonical },
  openGraph: {
    title: "The First Nugget: Mining Wisdom in Public",
    description:
      "The conversation did not merely discuss knowledge capture. It became knowledge capture in public.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "The First Nugget: Mining Wisdom in Public",
    description:
      "A live field receipt from the first public KIKIGAKI wisdom-mining exchange.",
  },
};

const signalRows = [
  ["01", "Observed pattern", "One unusually informed operator was quietly holding the system together."],
  ["02", "Practitioner term", "An experienced CIO supplied the operating-language label: hero-ops."],
  ["03", "Hidden mechanics", "Instrumentation can expose interpretation variance; calibration must resolve it."],
  ["04", "Architecture changed", "Baseline creation and transfer testing became explicit parts of the design."],
];

const ledger = [
  {
    number: "NUGGET 01",
    title: "Hero-ops",
    body: "A system can appear reliable while depending on one unusually informed person whose judgment, context, and edge-case interpretation were never externalized.",
  },
  {
    number: "NUGGET 02",
    title: "Instrumentation is not calibration",
    body: "Telemetry can reveal that two operators interpret the same threshold differently. It cannot create the shared judgment required to settle the difference.",
  },
  {
    number: "NUGGET 03",
    title: "The baseline may be the first product",
    body: "Before a work cell can prove improvement, the client may need a defensible current-state baseline and an explicit definition of what better means.",
  },
  {
    number: "NUGGET 04",
    title: "Externalization is not transfer",
    body: "Captured knowledge is not yet operational knowledge. Another qualified operator must be able to apply it at the edge without the original expert standing beside them.",
  },
];

const miningLoop = [
  {
    number: "01",
    title: "Notice",
    body: "Recognize when a passing comment contains more than opinion: a term, distinction, exception, or field-earned judgment that changes the model.",
  },
  {
    number: "02",
    title: "Attribute",
    body: "Preserve who contributed the knowledge, where it appeared, when it appeared, and the context that made it meaningful.",
  },
  {
    number: "03",
    title: "Interrogate",
    body: "Ask what the contribution reveals, what it contradicts, which edge cases remain, and whether different practitioners would interpret it the same way.",
  },
  {
    number: "04",
    title: "Transfer-test",
    body: "Confirm that someone other than the original expert can use the knowledge without silently depending on the expert to repair the gaps.",
  },
];

const transfer = [
  ["01", "Pattern", "The hidden dependency is noticed."],
  ["02", "Language", "A practitioner supplies the field term."],
  ["03", "Mechanics", "The term exposes how the failure actually works."],
  ["04", "Architecture", "The system changes in response."],
  ["05", "Transfer", "Another operator proves the knowledge survived."],
];

export default function KikigakiFirstNuggetPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The First Nugget: Mining Wisdom in Public",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    url: canonical,
    description:
      "A NULLWORKS KIKIGAKI field note about hero-ops, practitioner terminology, calibration, baseline creation, and the transfer test for operational wisdom.",
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
        <div className={styles.navMeta}>KIKIGAKI FIELD NOTE / 001 / PUBLIC RECEIPT</div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>KIKIGAKI / WISDOM MINING / FIELD RECEIPT 001</p>
            <h1>
              The First <span>Nugget.</span>
            </h1>
            <p className={styles.subtitle}>
              A public LinkedIn exchange became a live demonstration of expert
              knowledge being surfaced, named, tested, and made more transferable.
            </p>
            <p className={styles.lede}>
              We were discussing how organizations capture hard-earned judgment.
              Then an experienced practitioner supplied the exact field language and
              operating distinction the emerging architecture was missing. The
              conversation did not merely describe wisdom mining. It became wisdom
              mining in public.
            </p>
            <div className={styles.actions}>
              <a href="#field-note" className={styles.primaryButton}>
                Read the field note <ArrowRight size={17} />
              </a>
              <a href="/journal/mr-sloth-first-nugget" className={styles.secondaryButton}>
                Read the raw Mr. Sloth entry <BookOpen size={17} />
              </a>
            </div>
          </div>

          <aside className={styles.signalCard} aria-label="Wisdom mining signal ledger">
            <div className={styles.signalTop}>
              <span className={styles.liveDot}>SIGNAL ACQUIRED</span>
              <span>2026-07-24</span>
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
          <h2>One phrase changed the shape of the problem.</h2>
          <div className={styles.prose}>
            <p>
              The thread began with a scaling question. Could a governed human-AI
              work cell remain dependable when the number of operators, models,
              shifts, and consequential decisions increased?
            </p>
            <p>
              The honest answer was that the prototype still depended heavily on one
              unusually informed operator. That operator could absorb model variance,
              resolve ambiguous thresholds, recognize weak evidence, and decide when
              the work was allowed to cross the next authority boundary.
            </p>
            <p>
              Then Emmanuel Gob—an experienced CIO, CDO, and CTO—supplied the
              practitioner term: <strong>hero-ops</strong>.
            </p>
            <div className={styles.pullQuote}>
              A system can appear reliable while one person is silently supplying the
              judgment the documented architecture lacks.
            </div>
            <p>
              The term did more than improve the vocabulary. It made the dependency
              operationally legible. The organization may believe it owns a reliable
              process while the real reliability lives inside one person whose
              knowledge has never been sufficiently externalized, tested, or
              transferred.
            </p>
            <p>
              That exposure often remains invisible until the person takes leave,
              changes roles, retires, or the system attempts to scale beyond the reach
              of their direct intervention.
            </p>
            <div className={styles.truthBoundary}>
              <strong>Source and truth boundary:</strong> This article documents and
              paraphrases a public LinkedIn exchange on July 24, 2026. Emmanuel Gob is
              credited for contributing the practitioner term and distinctions
              described here. This receipt does not imply a formal partnership,
              endorsement, or client relationship.
            </div>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.sectionBorder}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>WHAT WAS MINED</p>
          <h2>Four pieces of operational wisdom became explicit.</h2>
          <p className={styles.sectionIntro}>
            The value was not a single clever phrase. The exchange surfaced a linked
            set of constraints that changed what the system would need to prove before
            anyone could honestly claim it was scalable.
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
          <p className={styles.kicker}>THE DISTINCTION</p>
          <h2>Telemetry can reveal disagreement. It cannot manufacture shared judgment.</h2>
          <div className={styles.prose}>
            <p>
              Many parts of a governed work cell are instrumentable. We can record
              which model ran, what evidence was supplied, which threshold was
              reached, how long the task took, what the operator approved, and what
              happened afterward.
            </p>
            <p>
              That instrumentation is necessary. It is not sufficient.
            </p>
            <p>
              Two qualified operators may see the same edge case and interpret the
              same threshold differently. Telemetry can expose the divergence. It
              cannot decide which interpretation should become the shared operating
              standard.
            </p>
            <div className={styles.pullQuote}>
              Instrumentation reveals variance. Calibration creates aligned judgment.
            </div>
            <p>
              Calibration requires training, comparison, explicit disagreement,
              adjudication, revised examples, and repeated testing at the edges. The
              goal is not to erase professional judgment. The goal is to prevent the
              organization from pretending that an unexamined judgment gap is a stable
              control.
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.sectionBorder}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>THE KIKIGAKI LOOP</p>
          <h2>Wisdom mining is not collecting quotes. It is preserving transferable judgment.</h2>
          <p className={styles.sectionIntro}>
            A useful field contribution has lineage. It remains connected to the
            person, the incident, the operating conditions, the challenge it raised,
            and the system change it caused.
          </p>
          <div className={styles.loopGrid}>
            {miningLoop.map((item) => (
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
          <p className={styles.kicker}>FROM SIGNAL TO TRANSFER</p>
          <h2>The knowledge has to survive more than the conversation.</h2>
          <p className={styles.sectionIntro}>
            A comment becomes operational intelligence only when the insight changes
            the architecture and another qualified person can use the result without
            requiring the original expert to silently finish the work.
          </p>
          <div className={styles.transferChain}>
            {transfer.map(([number, title, body]) => (
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
          <p className={styles.kicker}>WHY THE FIRST NUGGET MATTERS</p>
          <h2>The method revealed itself while we were discussing the method.</h2>
          <div className={styles.prose}>
            <p>
              KIKIGAKI is often imagined as a formal interview: sit with the retiring
              expert, ask careful questions, preserve the story, and translate it into
              something the organization can carry forward.
            </p>
            <p>
              That remains important. But this receipt shows that wisdom mining can
              also happen at the live edge of public work.
            </p>
            <p>
              An emerging architecture was exposed to an experienced operator. The
              operator recognized a familiar failure pattern, supplied the field term,
              challenged a weak assumption, and separated two activities that had
              been too easily collapsed into one.
            </p>
            <p>
              The contribution was attributed. The architecture changed. The
              remaining uncertainty stayed visible.
            </p>
            <div className={styles.pullQuote}>
              We were talking about capturing expert knowledge while capturing expert
              knowledge.
            </div>
            <p>
              That is why this is the first nugget. Not because it is the first useful
              thing an experienced person has ever said in public, but because the
              full mining loop became visible enough to preserve as a repeatable field
              method.
            </p>
          </div>
        </article>
      </section>

      <section className={styles.closing}>
        <div className={styles.shell}>
          <p className={styles.kicker}>FIELD NOTE 001 / SIGNAL PRESERVED</p>
          <h2>
            The conversation did not merely discuss knowledge capture. It <span>became</span> knowledge capture.
          </h2>
          <p>
            Notice the signal. Preserve the contributor. Test the distinction. Change
            the architecture. Prove the knowledge can travel.
          </p>
          <div className={styles.actions} style={{ justifyContent: "center" }}>
            <a href="/journal/mr-sloth-first-nugget" className={styles.primaryButton}>
              Open the raw journal receipt <BookOpen size={17} />
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
          KIKIGAKI / FIELD RECEIPTS <Waves size={13} style={{ verticalAlign: "middle" }} />
        </a>
      </footer>
    </main>
  );
}
