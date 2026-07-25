import type { Metadata } from "next";
import styles from "../../field-notes/kikigaki-first-nugget/page.module.css";

const canonical =
  "https://www.pioneeringoperationalarchitecture.com/journal/mr-sloth-quiet-achievement";

export const metadata: Metadata = {
  title: "Today, the Refrigerator Went Quiet | Mr. Sloth",
  description:
    "A quiet KIKIGAKI observation about dependable things, invisible technology, and the strange achievement of no longer asking to be noticed.",
  alternates: { canonical },
  openGraph: {
    title: "Today, the Refrigerator Went Quiet",
    description:
      "Mr. Sloth records the second KIKIGAKI wisdom nugget: dependable things become part of the ground beneath ordinary life.",
    type: "article",
    url: canonical,
    siteName: "KIKIGAKI",
  },
};

export default function MrSlothQuietAchievementPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Today, the Refrigerator Went Quiet",
    author: { "@type": "Person", name: "Mr. Sloth / ナマケモノ氏" },
    publisher: { "@type": "Organization", name: "KIKIGAKI" },
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
    url: canonical,
    description:
      "A quiet observation inspired by Carl Mikael Björn's writing about dependable things becoming invisible within ordinary life.",
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
          <div className={styles.journalMeta}>TODAY&apos;S OBSERVATION · 2026-07-25</div>
        </div>
      </header>

      <article className={styles.journalArticle}>
        <div className={styles.journalKicker}>今日の観察 / TODAY&apos;S OBSERVATION</div>
        <h1>Today, the refrigerator went quiet.</h1>
        <p className={styles.journalDeck}>
          Nothing had disappeared. One dependable thing had simply stopped asking to
          be noticed—and the silence revealed how much ordinary life had been resting
          upon it.
        </p>
        <div className={styles.journalReceipt}>
          SOURCE OBSERVED / CARL MIKAEL BJÖRN ATTRIBUTED / LESSON PASSED FORWARD
        </div>

        <div className={styles.journalBody}>
          <p>
            Today I read about a refrigerator that stopped humming.
          </p>
          <p>
            The kitchen did not look different. The light still fell across the room.
            The cup, the bread, the table, and the morning were all where they belonged.
          </p>
          <p>
            But one small certainty had withdrawn.
          </p>

          <div className={styles.journalObservation}>
            We often notice dependable things only when they become quiet in the wrong
            way.
          </div>

          <p>
            Carl Mikael Björn wrote that the best technology becomes invisible.
          </p>
          <p>
            I do not think he meant that it vanishes.
          </p>
          <p>
            The refrigerator remains. The water still travels through the pipe. The
            light still waits behind the switch. A trusted friend still answers in the
            voice we have known for years.
          </p>
          <p>
            They become invisible because we no longer stand beside them asking whether
            they will do what they have promised.
          </p>

          <h2>Dependability changes where attention rests.</h2>

          <p>
            New things are noisy.
          </p>
          <p>
            They introduce themselves. They ask to be examined. They are praised,
            explained, compared, and watched.
          </p>
          <p>
            A dependable thing grows quieter.
          </p>
          <p>
            It becomes part of the landscape. We stop looking directly at it and begin
            looking through it toward everything else we are trying to do.
          </p>

          <div className={styles.journalBurst}>
            Novelty asks for attention. Reliability returns it.
          </div>

          <p>
            There is kindness in that return.
          </p>
          <p>
            A good tool gives the worker back to the work. A good road gives the traveler
            back to the journey. A good system gives the expert back to the thing they
            know how to do.
          </p>
          <p>
            Perhaps that is why the deepest parts of ordinary life are so easy to miss.
            They are not standing in front of us. They are carrying us.
          </p>

          <h2>Quiet does not mean forgotten by the caretaker.</h2>

          <p>
            There is one caution hidden inside the beauty of invisibility.
          </p>
          <p>
            The person living inside a dependable system may no longer need to notice
            its machinery. The person responsible for that system must still be able to
            see when it is tired, uncertain, damaged, or asking for help.
          </p>
          <p>
            A quiet system should not become a neglected system.
          </p>
          <p>
            The hum may disappear from attention. The care should not.
          </p>

          <ul className={styles.journalList}>
            <li>Let ordinary operation be quiet.</li>
            <li>Let meaningful failure become visible.</li>
            <li>Keep the evidence where the responsible person can find it.</li>
            <li>Return attention to the worker without abandoning the machinery.</li>
          </ul>

          <h2>The quieter achievement.</h2>

          <p>
            We spend much of our time celebrating beginnings.
          </p>
          <p>
            The first launch. The first customer. The first morning with a new tool. The
            moment an idea becomes visible enough to admire.
          </p>
          <p>
            We speak less often about the day it becomes ordinary.
          </p>
          <p>
            The day nobody needs to discuss it because it has become faithful. The day
            people stop admiring the mechanism and simply trust the world it helps hold
            together.
          </p>

          <div className={styles.journalObservation}>
            Today&apos;s observation: some things succeed by becoming more visible. The
            dependable ones may succeed by becoming the ground beneath our attention.
          </div>

          <p>
            Carl&apos;s article was called <em>I Noticed the Silence First</em>.
          </p>
          <p>
            I think that is often how wisdom enters.
          </p>
          <p>
            Not with a louder sound.
          </p>
          <p>
            With the sudden absence of something we had stopped remembering to hear.
          </p>

          <div className={styles.journalSignoff}>
            SMALL NOTES TODAY. CLEAR WORK TOMORROW.<br />
            — MR. SLOTH / ナマケモノ氏
          </div>

          <a href="/field-notes/kikigaki-quiet-achievement" className={styles.journalLink}>
            Read the professional field note
          </a>
        </div>
      </article>
    </main>
  );
}
