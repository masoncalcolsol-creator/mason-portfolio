import {
  Archive,
  ArrowRight,
  Clock3,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import FarmScope from "./FarmScope";
import styles from "./feed-trough.module.css";

const servings = [
  {
    number: "001",
    title: "A Badge Tells You the Claim. A Receipt Tells You Whether to Believe It.",
    summary:
      "Why external credentials, evidence-backed capabilities, and positioning statements can share a wall—but should never share the same truth label.",
    href: "/feed-trough/001-receipts-over-badges",
    date: "July 19, 2026",
    time: "30 sec",
  },
];

export default function FeedTroughPage() {
  return (
    <main className={styles.page}>
      <FarmScope intensity={0.78} />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.sunGlow} aria-hidden="true" />

      <nav className={styles.nav}>
        <a className={styles.brand} href="/">
          <span className={styles.brandMark}>N</span>
          <span>NULLWORKS</span>
        </a>
        <span className={styles.navStatus}>
          <span /> TROUGH OPEN
        </span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>BOINKEDIN PRESENTS</p>
          <h1>
            THE FEED
            <span>TROUGH</span>
          </h1>
          <p className={styles.heroLead}>
            Thirty-second systems slop from <strong>Farmer Mason.</strong>
          </p>
          <p className={styles.heroBody}>
            One infographic. One useful systems observation. No artificial publishing schedule. No thought-leadership packing peanuts.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="/feed-trough/001-receipts-over-badges">
              Eat the latest serving
              <ArrowRight size={18} />
            </a>
            <a className={styles.secondaryButton} href="#archive">
              Browse the trough
              <Archive size={17} />
            </a>
          </div>
        </div>

        <div className={styles.troughStage} aria-label="Feed Trough publication model">
          <div className={styles.troughHeader}>
            <span>ISSUE 001</span>
            <span>30 SEC</span>
          </div>
          <div className={styles.troughBody}>
            <div className={styles.feedToken}>CLAIM</div>
            <div className={styles.feedToken}>SOURCE</div>
            <div className={styles.feedToken}>EVIDENCE</div>
            <div className={styles.feedToken}>BOUNDARY</div>
            <div className={styles.feedToken}>RECEIPT</div>
          </div>
          <div className={styles.troughLip}>
            <span>USEFUL SLOP ONLY</span>
          </div>
          <div className={styles.troughLegs}>
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className={styles.promiseStrip} aria-label="Feed Trough promise">
        <span>NO WEEKLY DEADLINE</span>
        <span>NO FLUFF</span>
        <span>NO SOFTWARE THEATER</span>
        <span>ONE USEFUL THING</span>
        <span>THIRTY SECONDS</span>
      </section>

      <section className={styles.latestSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>01</span>
          <div>
            <p className={styles.kicker}>LATEST SERVING</p>
            <h2>Fresh slop at the top.</h2>
          </div>
        </div>

        <a className={styles.featureCard} href="/feed-trough/001-receipts-over-badges">
          <div className={styles.featureVisual}>
            <div className={styles.visualStamp}>GRAPHIC SLOT RESERVED</div>
            <div className={styles.visualEquation}>
              <span>BADGE</span>
              <strong>≠</strong>
              <span>RECEIPT</span>
            </div>
            <p>Text serving live now. Native infographic drops separately.</p>
          </div>
          <div className={styles.featureCopy}>
            <div className={styles.cardMeta}>
              <span>ISSUE 001</span>
              <span className={styles.livePill}>LIVE</span>
            </div>
            <h3>A Badge Tells You the Claim. A Receipt Tells You Whether to Believe It.</h3>
            <p>
              A credential, a demonstrated capability, and a professional positioning statement can all be useful. They are not the same kind of truth.
            </p>
            <div className={styles.cardFooter}>
              <span><Clock3 size={15} /> 30-second read</span>
              <span>Enter the trough <ArrowRight size={16} /></span>
            </div>
          </div>
        </a>
      </section>

      <section className={styles.methodSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>02</span>
          <div>
            <p className={styles.kicker}>THE FEEDING SYSTEM</p>
            <h2>LinkedIn distributes it. NULLWORKS remembers it.</h2>
          </div>
        </div>

        <div className={styles.methodGrid}>
          <article>
            <span>01</span>
            <Sparkles size={24} />
            <h3>Native bait</h3>
            <p>The infographic lives directly in the LinkedIn feed where busy people can consume the point without leaving.</p>
          </article>
          <article>
            <span>02</span>
            <Clock3 size={24} />
            <h3>Thirty-second cut</h3>
            <p>The link opens one permanent, aggressively compressed breakdown with no padded introduction.</p>
          </article>
          <article>
            <span>03</span>
            <ReceiptText size={24} />
            <h3>Receipts attached</h3>
            <p>Each serving connects to the real experiment, source, deployed system, failure record, or evidence boundary.</p>
          </article>
          <article>
            <span>04</span>
            <Archive size={24} />
            <h3>Old slop survives</h3>
            <p>Every issue stays in the archive instead of disappearing underneath tomorrow&apos;s algorithmic feed.</p>
          </article>
        </div>
      </section>

      <section className={styles.archiveSection} id="archive">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>03</span>
          <div>
            <p className={styles.kicker}>THE ARCHIVE</p>
            <h2>Previous servings.</h2>
          </div>
        </div>

        <div className={styles.archiveList}>
          {servings.map((serving) => (
            <a className={styles.archiveCard} href={serving.href} key={serving.number}>
              <span className={styles.archiveNumber}>{serving.number}</span>
              <div>
                <div className={styles.archiveMeta}>{serving.date} · {serving.time}</div>
                <h3>{serving.title}</h3>
                <p>{serving.summary}</p>
              </div>
              <ArrowRight size={20} />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.finalSection}>
        <p className={styles.kicker}>THE PUBLISHING SCHEDULE</p>
        <h2>The trough gets filled when there is something worth feeding you.</h2>
        <p>No manufactured cadence. No padded issue. No obligation to publish before the thought earns a receipt.</p>
        <a className={styles.primaryButton} href="/feed-trough/001-receipts-over-badges">
          Start with Issue 001
          <ArrowRight size={18} />
        </a>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>THE FEED TROUGH</strong>
          <span>Thirty-second systems slop from Farmer Mason.</span>
        </div>
        <p>Built by NULLWORKS. Distributed through LinkedIn. Preserved here.</p>
        <span>EST. 2026</span>
      </footer>
    </main>
  );
}
