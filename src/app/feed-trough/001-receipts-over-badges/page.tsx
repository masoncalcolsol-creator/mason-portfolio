import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock3,
  ExternalLink,
  Gauge,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import FarmScope from "../FarmScope";
import styles from "./issue.module.css";

export default function FeedTroughIssueOnePage() {
  return (
    <main className={styles.page}>
      <FarmScope intensity={1.12} />
      <div className={styles.noise} aria-hidden="true" />

      <nav className={styles.nav}>
        <a href="/feed-trough" className={styles.backLink}>
          <ArrowLeft size={17} />
          Feed Trough
        </a>
        <div className={styles.issueStatus}>
          <span /> ISSUE 001 · LIVE
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span>BOINKEDIN PRESENTS</span>
          <span><Clock3 size={14} /> 30-SECOND READ</span>
        </div>
        <p className={styles.issueNumber}>ISSUE 001</p>
        <h1>A Badge Tells You the Claim.</h1>
        <h2>A Receipt Tells You Whether to Believe It.</h2>
        <p className={styles.heroLead}>
          Credentials, demonstrated capabilities, and professional positioning can share a wall. They should not share the same truth label.
        </p>
      </header>

      <section className={styles.scopePanel} aria-label="Issue 001 visual placeholder">
        <div className={styles.scopeTopline}>
          <span>FARM SCOPE / CHANNEL 001</span>
          <span>GRAPHIC SLOT RESERVED</span>
        </div>
        <div className={styles.scopeEquation}>
          <span>BADGE</span>
          <strong>≠</strong>
          <span>RECEIPT</span>
        </div>
        <p>The live infographic will replace this panel after the page language is locked.</p>
      </section>

      <section className={styles.serving}>
        <div className={styles.servingLabel}>
          <span>01</span>
          <p>THE SLOP</p>
        </div>
        <div className={styles.servingCopy}>
          <p className={styles.bigCopy}>
            Credly shows that somebody awarded you a badge.
          </p>
          <p>
            I wanted a wallet that could also show what the person actually did, what evidence survives, who issued or verified the claim, what remains self-declared, and where the claim stops.
          </p>
        </div>
      </section>

      <section className={styles.truthSection}>
        <div className={styles.sectionHeading}>
          <span>02</span>
          <div>
            <p>THE CUT</p>
            <h2>Three claims. Three truth states.</h2>
          </div>
        </div>

        <div className={styles.truthGrid}>
          <article className={styles.externalCard}>
            <div className={styles.truthTop}>
              <ShieldCheck size={26} />
              <span>EXTERNAL</span>
            </div>
            <h3>External credential</h3>
            <p>Issued or evaluated by an employer, trainer, school, or independent authority.</p>
          </article>
          <article className={styles.evidenceCard}>
            <div className={styles.truthTop}>
              <Gauge size={26} />
              <span>EVIDENCE</span>
            </div>
            <h3>Evidence-backed capability</h3>
            <p>Supported by visible work, deployments, records, photographs, witnesses, or measurable outcomes.</p>
          </article>
          <article className={styles.positioningCard}>
            <div className={styles.truthTop}>
              <Sparkles size={26} />
              <span>POSITIONING</span>
            </div>
            <h3>Positioning statement</h3>
            <p>A clearly marked role, method, or identity claim—not presented as outside certification.</p>
          </article>
        </div>
      </section>

      <section className={styles.serving}>
        <div className={styles.servingLabel}>
          <span>03</span>
          <p>WHY IT MATTERS</p>
        </div>
        <div className={styles.servingCopy}>
          <p className={styles.bigCopy}>
            “Forklift certified,” “built a deployed workflow system,” and “Operational Intelligence Systems Architect” are not the same kind of claim.
          </p>
          <p>
            They can live on the same wall. They just should not borrow credibility from one another by pretending they came from the same source.
          </p>
        </div>
      </section>

      <section className={styles.receiptPanel}>
        <div className={styles.receiptIcon}>
          <ReceiptText size={35} />
        </div>
        <div>
          <p className={styles.receiptKicker}>THE RECEIPT</p>
          <h2>The NULLWORKS Receipt Wallet is live.</h2>
          <p>
            The working page classifies every badge, exposes its evidence, and states the claim boundary instead of hiding behind iconography.
          </p>
        </div>
        <a href="/receipt-wallet" className={styles.receiptButton}>
          Inspect the wallet
          <ExternalLink size={17} />
        </a>
      </section>

      <section className={styles.finalCut}>
        <BadgeCheck size={42} />
        <p>Forklift certified.</p>
        <p>Doesn&apos;t write production code.</p>
        <p className={styles.highlight}>Still shipped the wallet.</p>
        <div className={styles.timerLine}>
          <span />
          <strong>THIRTY SECONDS ARE UP.</strong>
          <span />
        </div>
        <h2>That&apos;s enough slop. Back to work.</h2>
        <a href="/feed-trough" className={styles.nextButton}>
          Return to the trough
          <ArrowRight size={17} />
        </a>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>THE FEED TROUGH</strong>
          <span>Issue 001 · July 19, 2026</span>
        </div>
        <p>Thirty-second systems slop from Farmer Mason.</p>
        <span>NULLWORKS</span>
      </footer>
    </main>
  );
}
