import type { Metadata } from "next";
import styles from "./continuity-calculus.module.css";
import { paperHtml } from "./paper-content";

const canonical = "https://mason-portfolio-main.vercel.app/continuity-calculus";
const pdfSha = "c0954a9a6dc787b77b437c20389cc71c73e4606e1e270e88615aa13d1b182494";

export const metadata: Metadata = {
  title: "Continuity Calculus | Preserving Institutional Judgment",
  description:
    "NULLWORKS Continuity Calculus White Paper V2.0: a governed architecture for preserving why decisions were made, detecting when assumptions fail, and correcting without rewriting history.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Continuity Calculus: Preserving Institutional Judgment",
    description:
      "Move the data. Preserve the why. Bound the authority. Carry the receipt.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Continuity Calculus: Preserving Institutional Judgment",
    description:
      "A constitutional architecture for maintaining institutional judgment across time, systems, and agents.",
  },
};

const layers = [
  ["01", "Transport Integrity", "Did the payload arrive accurately?"],
  ["02", "Semantic Identity", "What does the payload mean here?"],
  ["03", "Contextual Continuity", "What history, intent, assumptions, and constraints surround it?"],
  ["04", "Constitutional Authority", "Who may interpret, decide, execute, stop, or escalate?"],
  ["05", "Operational State Transition", "What state or action may legitimately change?"],
  ["06", "Assurance and Verification", "What evidence supports the interpretation and action?"],
];

const boundaries = [
  "Not a claim of mathematical completeness or universal semantic correctness.",
  "Not a certification, compliance determination, production deployment, or completed field pilot.",
  "The V0.6 reference implementation passed 70 discovered tests on Python 3.11, 3.12, and 3.13; independent external assurance remains unfinished.",
  "The exact earlier August 1 manuscript was not available for a claim-by-claim delta, so this release preserves that lineage gap instead of inventing it.",
];

export default function ContinuityCalculusPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: "Continuity Calculus: Preserving Institutional Judgment Across Time, Systems, and Agents",
    alternativeHeadline:
      "A constitutional architecture for preserving why decisions were made, recognizing when their assumptions fail, and preventing automation from accelerating forgotten judgment",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    datePublished: "2026-08-01",
    version: "2.0",
    url: canonical,
    isAccessibleForFree: true,
    encoding: {
      "@type": "MediaObject",
      contentUrl: canonical,
      encodingFormat: "text/html",
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className={styles.nav}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span>NW</span>
          <strong>NULLWORKS</strong>
        </a>
        <nav aria-label="Page navigation">
          <a href="#constitution">Constitution</a>
          <a href="#descendant">Descendant</a>
          <a href="#boundaries">Boundaries</a>
          <a href="#verify">Verify</a>
        </nav>
        <span className={styles.release}>PUBLIC RESEARCH RELEASE · V2.0</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>NULLWORKS CONTINUITY CALCULUS WHITE PAPER</p>
          <h1>Preserving Institutional Judgment Across Time, Systems, and Agents</h1>
          <p className={styles.subtitle}>
            A constitutional architecture for preserving why decisions were made,
            recognizing when their assumptions fail, and preventing automation from
            accelerating forgotten judgment.
          </p>
          <blockquote>
            Move the data. Preserve the why. Bound the authority. Carry the receipt.
          </blockquote>
          <div className={styles.actions}>
            <a className={styles.primary} href="#paper">
              Read the full web edition
            </a>
            <a className={styles.secondary} href="#constitution">
              Inspect the architecture
            </a>
          </div>
          <p className={styles.byline}>Mason Perry · Founder, NULLWORKS · August 1, 2026</p>
        </div>

        <aside className={styles.releaseCard}>
          <div>
            <span>FORMAL OBJECT</span>
            <strong>CP = ⟨D, M, C, A, S, V⟩</strong>
          </div>
          <div>
            <span>CORE</span>
            <strong>Six constitutional requirements</strong>
          </div>
          <div>
            <span>DESCENDANT</span>
            <strong>Governed reinterpretation</strong>
          </div>
          <div>
            <span>ASSURANCE STATE</span>
            <strong>Internal evidence; external challenge pending</strong>
          </div>
          <div>
            <span>RELEASE HASH</span>
            <code>{pdfSha.slice(0, 16)}…</code>
          </div>
        </aside>
      </section>

      <section className={styles.abstract}>
        <p className={styles.sectionLabel}>ABSTRACT</p>
        <h2>Data can survive while judgment disappears.</h2>
        <p>
          Institutions routinely preserve records yet lose the meaning, assumptions,
          authority, state, uncertainty, and verification that made a decision fit its
          original reality. Continuity Calculus treats those dimensions as a governed
          handoff contract. The paper extends the architecture toward maintainable
          institutional judgment: the capacity to reconstruct why a decision was justified,
          detect when its fit has failed, and reopen it through legitimate authority without
          pretending the institution always knew.
        </p>
      </section>

      <section className={styles.section} id="constitution">
        <div className={styles.heading}>
          <p className={styles.sectionLabel}>01 // CONSTITUTIONAL CORE</p>
          <h2>Six requirements travel together.</h2>
          <p>
            A handoff is not trustworthy merely because the bytes arrived. Each required
            dimension must remain explicit, governed, and inspectable at the consequence
            level of the work.
          </p>
        </div>
        <div className={styles.layerGrid}>
          {layers.map(([number, name, question]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{name}</h3>
              <p>{question}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.descendant} id="descendant">
        <div>
          <p className={styles.sectionLabel}>02 // EXPLICIT DESCENDANT</p>
          <h2>Correction without historical rewrite.</h2>
        </div>
        <div className={styles.descendantGrid}>
          <article>
            <span>HISTORY</span>
            <h3>What occurred and what was preserved</h3>
            <p>Original events and receipts remain append-only. Missing evidence is not silently reconstructed.</p>
          </article>
          <article>
            <span>INTERPRETATION</span>
            <h3>What the institution was justified in concluding then</h3>
            <p>The conclusion remains bound to the evidence, policy, authority, jurisdiction, and uncertainty available at decision time.</p>
          </article>
          <article>
            <span>REINTERPRETATION</span>
            <h3>What materially new evidence now justifies</h3>
            <p>Evidence may reopen a decision, but it does not self-authorize the replacement decision or erase the original record.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.sectionLabel}>03 // GOVERNED COMPOSITION</p>
          <h2>Adjacent disciplines solve pieces of the continuity problem.</h2>
          <p>
            Provenance, records management, event sourcing, architecture decision records,
            belief revision, privacy engineering, safety assurance, and AI risk management
            each contribute essential controls. This paper does not claim those ideas as new.
            Its proposed contribution is their consequence-scaled composition into a single
            handoff, state-transition, assurance, and correction architecture.
          </p>
        </div>
        <div className={styles.compositionRail}>
          <span>PROVENANCE</span><i>+</i><span>MEANING</span><i>+</i><span>CONTEXT</span><i>+</i>
          <span>AUTHORITY</span><i>+</i><span>STATE</span><i>+</i><span>ASSURANCE</span>
        </div>
      </section>

      <section className={styles.boundaries} id="boundaries">
        <div className={styles.heading}>
          <p className={styles.sectionLabel}>04 // TRUTH BOUNDARIES</p>
          <h2>What this release does not claim.</h2>
        </div>
        <div className={styles.boundaryGrid}>
          {boundaries.map((boundary, index) => (
            <article key={boundary}>
              <span>0{index + 1}</span>
              <p>{boundary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.verify} id="verify">
        <div>
          <p className={styles.sectionLabel}>05 // RELEASE RECEIPT</p>
          <h2>Verify the exact public artifact.</h2>
          <p>
            The paginated PDF is preserved as an immutable, content-addressed release object.
            Any changed byte produces a different SHA-256 digest.
          </p>
        </div>
        <div className={styles.hashCard}>
          <span>SHA-256 · PDF</span>
          <code>{pdfSha}</code>
          <a href="#paper">Read the public web edition</a>
        </div>
      </section>

      <article className={styles.paper} id="paper">
        <div className={styles.paperHeader}>
          <p className={styles.sectionLabel}>06 // FULL WEB EDITION</p>
          <h2>The complete publication text</h2>
          <p>Figures are described by their captions. The typeset PDF remains the canonical paginated release artifact identified by the SHA-256 digest above.</p>
        </div>
        <div className={styles.paperContent} dangerouslySetInnerHTML={{ __html: paperHtml }} />
      </article>

      <footer>
        <div>
          <strong>NULLWORKS</strong>
          <p>Operational intelligence systems with bounded authority and inspectable evidence.</p>
        </div>
        <p>Public Research Release 2.0 · August 1, 2026 · Human Authority: Mason Perry</p>
      </footer>
    </main>
  );
}
