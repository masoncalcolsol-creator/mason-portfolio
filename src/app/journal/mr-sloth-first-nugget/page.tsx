import type { Metadata } from "next";
import styles from "../../field-notes/kikigaki-first-nugget/page.module.css";

const canonical =
  "https://www.pioneeringoperationalarchitecture.com/journal/mr-sloth-first-nugget";

export const metadata: Metadata = {
  title: "Today, a Name Surfaced | Mr. Sloth",
  description:
    "A quiet KIKIGAKI observation about hero-ops, the hidden knowledge carried by one person, and the difference between seeing a gap and teaching others how to cross it.",
  alternates: { canonical },
  openGraph: {
    title: "Today, a Name Surfaced",
    description:
      "Mr. Sloth records the first public KIKIGAKI wisdom-mining observation.",
    type: "article",
    url: canonical,
    siteName: "KIKIGAKI",
  },
};

export default function MrSlothFirstNuggetPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Today, a Name Surfaced",
    author: { "@type": "Person", name: "Mr. Sloth / ナマケモノ氏" },
    publisher: { "@type": "Organization", name: "KIKIGAKI" },
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    url: canonical,
    description:
      "A quiet observation about hero-ops, calibration, and preserving field-earned knowledge without separating it from the person who offered it.",
  };

  return (
    <main className={styles.journalPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className={styles.journalHeader}>
        <div className={styles.journalHeaderInner}>
          <a href="/" className={styles.journalBrand}>KIKIGAKI / MR. SLOTH</a>
          <div className={styles.journalMeta}>TODAY&apos;S OBSERVATION · 2026-07-24</div>
        </div>
      </header>

      <article className={styles.journalArticle}>
        <div className={styles.journalKicker}>今日の観察 / TODAY&apos;S OBSERVATION</div>
        <h1>Today, a name surfaced.</h1>
        <p className={styles.journalDeck}>
          The hidden work was already there. An experienced operator helped us see it
          more clearly.
        </p>
        <div className={styles.journalReceipt}>
          PUBLIC CONVERSATION / CONTRIBUTOR ATTRIBUTED / UNCERTAINTY PRESERVED
        </div>

        <div className={styles.journalBody}>
          <p>
            Today I watched a conversation move slowly enough for a useful word to
            appear.
          </p>
          <p>
            We had noticed a familiar shape: one unusually informed person quietly
            carrying the exceptions, the history, and the judgment that the written
            process could not hold.
          </p>
          <p>
            Emmanuel Gob gave that shape a practitioner&apos;s name:
            <strong> hero-ops</strong>.
          </p>

          <div className={styles.journalObservation}>
            Sometimes a system looks strong because one person is remembering what the
            system forgot.
          </div>

          <p>
            The name matters because it makes the hidden dependency easier to notice.
            It also belongs with the person who offered it. A useful word should not be
            separated from its source simply because it travels well.
          </p>
          <p>
            Another distinction followed.
          </p>
          <p>
            Instrumentation can show that two careful people interpret the same edge
            differently. It can reveal the distance between them. It cannot teach them
            how to meet there.
          </p>
          <p>
            That quieter work is calibration.
          </p>

          <h2>Small notes from the conversation.</h2>

          <ul className={styles.journalList}>
            <li>A stable-looking process may be resting on one person&apos;s unwritten memory.</li>
            <li>A dashboard can reveal disagreement without resolving it.</li>
            <li>A baseline may need to be built before improvement can be honestly measured.</li>
            <li>A note is not transferred knowledge until another qualified person can use it.</li>
          </ul>

          <p>
            None of these observations arrived through a formal interview. They
            appeared in a public exchange while people were trying to understand the
            work together.
          </p>
          <p>
            This is why an observer must not hurry.
          </p>
          <p>
            The important part may arrive as a correction, a field term, a small
            disagreement, or one sentence offered by someone who recognizes the shape
            because they have carried it before.
          </p>

          <div className={styles.journalBurst}>
            Observe before explaining. Record before improving. Keep the source
            attached. Let the lesson remain human-sized.
          </div>

          <h2>The first nugget.</h2>

          <p>
            We were speaking about preserving expert knowledge when expert knowledge
            appeared in the conversation itself.
          </p>
          <p>
            The contribution was credited. The distinction changed the architecture.
            The remaining questions stayed visible.
          </p>
          <p>
            That is enough for today.
          </p>

          <div className={styles.journalObservation}>
            Today&apos;s observation: wisdom does not always wait for the interview. It
            sometimes passes quietly through the room and hopes someone is listening.
          </div>

          <div className={styles.journalSignoff}>
            SMALL NOTES TODAY. CLEAR WORK TOMORROW.<br />
            — MR. SLOTH / ナマケモノ氏
          </div>

          <a href="/field-notes/kikigaki-first-nugget" className={styles.journalLink}>
            Read the professional field note
          </a>
        </div>
      </article>
    </main>
  );
}
