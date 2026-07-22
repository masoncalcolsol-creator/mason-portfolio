import type { Metadata } from "next";
import LivingSignalCanvas from "../../living-signals/LivingSignalCanvas";
import styles from "../laboratory-leak/page.module.css";

const canonical =
  "https://mason-portfolio-main.vercel.app/field-notes/talent-hollow";

export const metadata: Metadata = {
  title: "The Talent Hollow | NULLWORKS",
  description:
    "When AI removes the work that used to form judgment, organizations can gain efficiency while quietly consuming their future leadership bench.",
  alternates: { canonical },
  openGraph: {
    title: "The Talent Hollow",
    description:
      "Organizations are automating labor faster than they are preserving the formation of judgment.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Talent Hollow",
    description:
      "When AI automates the work that used to form judgment.",
  },
};

const developmentalLineage = [
  "Context",
  "Observation",
  "Participation",
  "Challenge",
  "Judgment",
  "Authority",
  "Transfer",
];

const method = [
  {
    title: "Expose",
    body: "Let developing people see consequential decisions while the evidence, uncertainty, and constraints are still present.",
  },
  {
    title: "Preserve",
    body: "Retain the context behind expert judgment—not only the polished answer or final approval record.",
  },
  {
    title: "Bound",
    body: "Create safe participation, delegated authority, review gates, and exception paths where capability can grow without uncontrolled risk.",
  },
  {
    title: "Measure",
    body: "Test whether judgment, ownership, and decision quality improved—not merely whether training was completed.",
  },
];

const outcomes = [
  "A deeper decision-making bench",
  "Faster, safer delegation",
  "Expert reasoning that survives turnover",
  "Clearer authority at every level",
  "Measurable capability transfer",
];

export default function TalentHollowPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Talent Hollow",
    alternativeHeadline:
      "When AI automates the work that used to form judgment",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    dateModified: "2026-07-22",
    url: canonical,
    description:
      "A NULLWORKS field note on developmental lineage, apprenticeship architecture, and preserving the formation of judgment in AI-enabled organizations.",
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
          opacity: 0.23,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.24) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.24) 100%)",
        }}
      >
        <LivingSignalCanvas mode="memory" accentRgb="93, 190, 164" />
      </div>

      <header className={styles.nav}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span>NULLWORKS</span>
        </a>
        <div className={styles.navLabel}>FIELD NOTE / 002</div>
      </header>

      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>
            NULLWORKS / OPERATIONAL SYSTEMS ARCHITECTURE
          </p>
          <h1>
            The <span>Talent Hollow</span>
          </h1>
          <p className={styles.subtitle}>
            When AI automates the work that used to form judgment.
          </p>
          <p className={styles.lede}>
            AI can raise output, reduce hiring, and make the current organization
            look more efficient while quietly removing the environment that used
            to produce its future experts, managers, and leaders.
          </p>
          <div className={styles.actions}>
            <a href="#field-note" className={styles.primaryButton}>
              Read the field note
            </a>
            <a href="#architecture" className={styles.secondaryButton}>
              See developmental lineage
            </a>
          </div>
          <p className={styles.heroLine}>
            Organizations are automating labor faster than they are preserving the
            formation of judgment.
          </p>
        </div>
      </section>

      <section id="field-note" className={styles.section}>
        <article className={`${styles.shell} ${styles.articleShell}`}>
          <p className={styles.kicker}>THE TALENT HOLLOW</p>
          <h2>Present-day efficiency can conceal a future capacity failure.</h2>

          <div className={styles.prose}>
            <p>
              The most visible AI story is job replacement. The quieter story is
              the job that is never opened, the junior person who is never hired,
              and the apprenticeship layer that disappears without creating a
              single layoff headline.
            </p>
            <p>
              The current experts remain. Output rises. Payroll stays lean. The
              quarterly result looks rational.
            </p>
            <p>The missing capacity does not become visible until later.</p>
            <p>
              A senior person leaves. A manager retires. A novel exception appears.
              The organization looks down the bench and discovers that the people
              who would normally have spent years absorbing the work were never
              brought into it.
            </p>

            <div className={styles.statement}>
              Companies can book today&apos;s efficiency by borrowing against
              tomorrow&apos;s supply of judgment.
            </div>

            <p>
              This field note was prompted by Alex King&apos;s argument in
              <a
                href="https://www.linkedin.com/pulse/talent-hollow-alex-king-m81qc"
                target="_blank"
                rel="noreferrer"
              >
                {" "}<strong>The Talent Hollow</strong>
              </a>
              : the risk is not only the work AI replaces, but the judgment that
              never gets the chance to form.
            </p>
            <p>
              That distinction matters because junior employees do not become
              capable merely by completing a volume of routine tasks. They become
              capable by operating near consequential work long enough to see how
              experienced people interpret incomplete evidence, recognize weak
              signals, navigate exceptions, challenge assumptions, exercise
              authority, and live with the outcome.
            </p>

            <div className={styles.quoteBlock}>
              <p>The junior did not merely produce the work.</p>
              <p>They watched what counted as evidence.</p>
              <p>They saw when the written procedure stopped matching reality.</p>
              <p>They learned when an exception was safe—and when it was not.</p>
              <p>They observed how judgment became institutional authorization.</p>
            </div>

            <p>
              The routine task was often the visible assignment. The real product
              was proximity to context.
            </p>
            <p>
              AI can remove the assignment while accidentally removing that
              proximity with it.
            </p>
            <p>
              The answer is not to preserve obsolete work for nostalgia&apos;s sake.
              It is to stop treating apprenticeship as an accidental byproduct of
              employment and begin designing it as operational infrastructure.
            </p>

            <div className={`${styles.statement} ${styles.statementBlue}`}>
              Do not preserve every old task. Preserve the formation of judgment.
            </div>
          </div>
        </article>
      </section>

      <section
        id="architecture"
        className={`${styles.section} ${styles.architecture}`}
      >
        <div className={styles.shell}>
          <p className={styles.kicker}>DEVELOPMENTAL LINEAGE</p>
          <h2>The organization must remember how capability was formed.</h2>
          <p className={styles.sectionIntro}>
            Decision lineage preserves how evidence became authorized action.
            Developmental lineage preserves how a person became capable of making,
            challenging, and eventually owning those decisions.
          </p>

          <div className={styles.lineageGrid}>
            {developmentalLineage.map((item, index) => (
              <div className={styles.lineageCard} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>

          <div className={styles.architectureCallout}>
            <span>Decision lineage protects the current operation.</span>
            <strong>Developmental lineage protects its future operators.</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <article className={`${styles.shell} ${styles.articleShell}`}>
          <p className={styles.kicker}>THE OSA EXTENSION</p>
          <h2>Governed work is not enough if nobody is becoming capable of governing it.</h2>
          <div className={styles.prose}>
            <p>
              Operational Systems Architecture already asks whether the complete
              decision chain survives reality:
            </p>
            <p>
              <strong>
                Evidence → Judgment → Authority → Decision → Action → Outcome →
                Revision
              </strong>
            </p>
            <p>
              The Talent Hollow exposes a second chain that must survive alongside
              it:
            </p>
            <p>
              <strong>
                Context → Observation → Participation → Challenge → Judgment →
                Authority → Transfer
              </strong>
            </p>
            <p>
              The first chain makes decisions accountable. The second makes
              capability renewable.
            </p>
            <p>
              An organization can govern today&apos;s decisions perfectly and still
              fail if it does not produce anyone capable of owning tomorrow&apos;s.
            </p>
            <p>
              That means AI deployment cannot be evaluated only by task savings,
              throughput, headcount avoidance, or model performance. It must also
              ask what human learning path was removed and what architecture now
              replaces it.
            </p>
          </div>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.kicker}>METHOD</p>
          <h2>Expose. Preserve. Bound. Measure.</h2>
          <p className={styles.sectionIntro}>
            The objective is not classroom training detached from operations. It is
            structured participation in real work with retained context, explicit
            authority, safe boundaries, and measurable capability growth.
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
            <h2>Apprenticeship becomes part of the operating model.</h2>
            <p className={styles.sectionIntro}>
              The organization stops hoping that exposure, judgment, and leadership
              emerge by accident. It creates visible paths from observation to
              bounded authority—and preserves the evidence that capability actually
              grew.
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
          <p className={styles.kicker}>DESIGN QUESTIONS</p>
          <h2>Before automating the task, map what the task was quietly teaching.</h2>
          <div className={styles.prose}>
            <div className={styles.quoteBlock}>
              <p>What decisions should a developing person observe?</p>
              <p>Where should they participate?</p>
              <p>What context must remain visible?</p>
              <p>How is their judgment challenged and reviewed?</p>
              <p>What authority can be delegated safely?</p>
              <p>How does the organization know capability improved?</p>
            </div>
            <p>
              These are not human-resources questions sitting outside the technical
              architecture. They are operating-system questions.
            </p>
            <p>
              When AI changes who performs the work, it also changes who sees the
              work, who learns from it, and who becomes qualified to own it later.
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.closing}`}>
        <div className={`${styles.shell} ${styles.articleShell}`}>
          <p className={styles.kicker}>THE CONTROL</p>
          <h2>Do not automate away the path to human authority.</h2>
          <div className={styles.prose}>
            <p>
              AI is a tool inside the architecture. It is not the architecture.
            </p>
            <p>
              A system that increases output while destroying the formation of
              judgment is not fully optimized. It has converted a visible labor cost
              into an invisible succession risk.
            </p>
            <p>
              The durable organization will use AI to expand capability while
              deliberately preserving the environment where people learn to
              interpret evidence, exercise judgment, accept authority, and carry
              responsibility for the result.
            </p>
          </div>
          <div className={styles.finalCard}>
            <span>NULLWORKS / OSA</span>
            <strong>Preserve the work. Preserve the judgment. Preserve the future.</strong>
            <p>
              Operational Systems Architecture for organizations prepared to build
              AI-enabled efficiency without hollowing out human capability.
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
