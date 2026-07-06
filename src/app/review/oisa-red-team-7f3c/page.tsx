import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Mail, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Private OISA Red-Team Review Room | NULLWORKS",
  description:
    "An unlisted review room prepared from a public LinkedIn discussion about arbitration, telemetry, and human-centered Operational Intelligence systems.",
  robots: { index: false, follow: false, nocache: true },
};

const arbitration = [
  {
    label: "Specialists may disagree",
    body: "Parallel digital workers can produce conflicting recommendations without either being obviously wrong.",
  },
  {
    label: "The coordination layer classifies the conflict",
    body: "It preserves both claims, checks source quality, identifies missing evidence, and separates duplication from meaningful disagreement.",
  },
  {
    label: "Human authority resolves consequence",
    body: "Anything consequential, uncertain, or outside delegated authority returns to the accountable human operator.",
  },
];

const valueChain = [
  "Verified real-world outcome",
  "Human capacity genuinely returned",
  "Quality and rework improved",
  "Decision quality strengthened",
  "Learning preserved for the next cycle",
  "Human burden, risk, and dependency measured",
];

const redTeamQuestions = [
  "Where can the arbitration layer quietly become a hidden decision-maker?",
  "Which disagreements should never be auto-resolved?",
  "What evidence would prove that recovered human capacity became real value rather than more throughput pressure?",
  "Which metric is most likely to become a vanity proxy?",
  "Where could OI SUITe create dependency, surveillance, or false confidence?",
  "What would falsify the need for an OISA role?",
];

export default function OisaRedTeamReviewRoom() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a href="/" className={styles.brand}>
            <span className={styles.monogram}>NW</span>
            <span><strong>NULLWORKS</strong><small>Private red-team review room</small></span>
          </a>
          <span className={styles.unlisted}><ShieldCheck size={14} /> Unlisted · noindex</span>
        </header>

        <section className={styles.hero}>
          <div className={styles.kicker}>Prepared from your public questions</div>
          <h1>You found the two places where OI SUITe can fail hardest.</h1>
          <p className={styles.deck}>
            Your comments challenged conflict arbitration and the risk of mistaking throughput for value. This page turns those questions into a focused review room rather than burying the answers inside a thread.
          </p>
          <div className={styles.profileNote}>
            <strong>Personalization boundary</strong>
            <p>
              This page uses only the public professional context and public questions shared in the discussion. No private data, scraping, inferred personal traits, or hidden scoring were used.
            </p>
          </div>
        </section>

        <section className={styles.contextCard}>
          <span>Relevant public context</span>
          <h2>AI engineering, document intelligence, LLMs, RAG, and AWS</h2>
          <p>
            That background makes the questions especially useful: they challenge not only technical capability, but the operating architecture around it.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>Challenge 01</div>
          <h2>What happens when the tentacles disagree?</h2>
          <p className={styles.sectionIntro}>The many-specialists model only works when the system has arbitration, not merely parallel output.</p>

          <div className={styles.cardGrid}>
            {arbitration.map((item, index) => (
              <article key={item.label} className={styles.card}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <blockquote className={styles.quote}>The coordination layer reduces conflict. Human authority resolves consequence.</blockquote>

          <div className={styles.decisionPacket}>
            <span>What the human should receive</span>
            <p>“Here are the competing claims. Here is the evidence behind each. Here is the risk. Here is the recommendation. This requires your call.”</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>Challenge 02</div>
          <h2>How do we keep telemetry from becoming résumé theater?</h2>
          <p className={styles.sectionIntro}>Throughput measures motion. Operational Intelligence must measure consequence.</p>

          <div className={styles.valueEquation}>
            <strong>Net operational gain</strong>
            <p>Validated outcome + human capacity returned + preserved learning − rework − risk − human burden</p>
          </div>

          <div className={styles.metricList}>
            {valueChain.map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
            ))}
          </div>

          <blockquote className={styles.quote}>Measured tells us what happened. Telemetrized means the feedback changed the system.</blockquote>
        </section>

        <section className={styles.caseStudy}>
          <div>
            <div className={styles.sectionLabel}>Field receipt</div>
            <h2>ORI TAC OPS</h2>
            <p>
              The software is deliberately simple. The operating architecture is the point: phone, camera, OCR, human correction, printer, barcode, approved process, and downstream scanner become one bounded recovery work cell.
            </p>
            <p>
              The case forces the distinction between a clever app and a human-centered operating system assembled from ordinary components.
            </p>
          </div>
          <a className={styles.caseLink} href="/field-notes/ori-tac-ops-oisa-beta-test">Open the OISA field case <ArrowRight size={16} /></a>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>Red-team assignment</div>
          <h2>Please try to break the architecture.</h2>
          <p className={styles.sectionIntro}>Agreement is less useful than a concrete failure mode. These are the questions I most want challenged.</p>

          <div className={styles.questionList}>
            {redTeamQuestions.map((question) => (
              <div key={question}><span>?</span><p>{question}</p></div>
            ))}
          </div>

          <div className={styles.actions}>
            <a href="mailto:masoncalcolsol@gmail.com?subject=OISA%20Red-Team%20Review" className={styles.primaryAction}><Mail size={16} /> Send Mason the critique</a>
            <a href="/field-notes" className={styles.secondaryAction}>Review the public Field Notes <ExternalLink size={15} /></a>
          </div>
        </section>

        <section className={styles.telemetryReceipt}>
          <div className={styles.sectionLabel}>OI SUITe test-flight receipt</div>
          <h2>This page is itself part of the test.</h2>
          <div className={styles.receiptGrid}>
            <div><span>Human intent</span><p>Turn a serious public exchange into a useful one-person review environment.</p></div>
            <div><span>Input boundary</span><p>Public professional context and public comments only.</p></div>
            <div><span>Digital work</span><p>Context extraction, issue classification, page architecture, copy, route, and deployment package.</p></div>
            <div><span>Human authority</span><p>Mason decides whether to send, revise, publish, or delete the page.</p></div>
            <div><span>Success condition</span><p>The reviewer identifies a real weakness, missing boundary, or better test.</p></div>
            <div><span>Failure condition</span><p>The page feels invasive, flattering, sales-driven, or substitutes personalization for substance.</p></div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div><strong>NULLWORKS</strong><span>Human-centered Operational Intelligence systems</span></div>
          <p>Human authority remains final.</p>
        </footer>
      </div>
    </main>
  );
}
