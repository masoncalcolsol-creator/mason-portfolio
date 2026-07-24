import type { Metadata } from "next";
import styles from "./page.module.css";

const canonical =
  "https://mason-portfolio-main.vercel.app/reports/credential-without-context";

export const metadata: Metadata = {
  title: "Credential Without Context | NULLWORKS",
  description:
    "A NULLWORKS operational-systems report on Arizona mobile identity, cryptographic trust, and the missing decision lineage behind a valid digital credential.",
  alternates: { canonical },
  openGraph: {
    title: "Credential Without Context",
    description:
      "A valid digital credential can prove authenticity without proving the governed decision that created it.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credential Without Context",
    description:
      "The certificate can preserve the claim. Can the institution preserve the judgment behind it?",
  },
};

const questions = [
  {
    number: "01",
    question: "What exactly happened?",
    answer:
      "A digital credential was provisioned and signed by an institutional issuer. The visible artifact does not reveal whether the case was approved automatically, reviewed by a person, escalated as an exception, or accepted despite conflicting evidence.",
    status: "Partially answered",
    tone: "amber",
  },
  {
    number: "02",
    question: "What evidence and policy produced the decision?",
    answer:
      "Public onboarding material describes identity-document capture and identity verification. The credential does not expose the case-specific evidence package, matching thresholds, policy version, vendor roles, exception criteria, or reason the evidence was judged sufficient.",
    status: "Mostly unanswered by the artifact",
    tone: "red",
  },
  {
    number: "03",
    question: "Who possessed authority to approve it?",
    answer:
      "The institutional issuer is identifiable. The accountable authority path is not. The artifact does not show which person or system exercised delegated authority, who could override a failed match, or what authorization governed that override.",
    status: "Institution named; authority lineage missing",
    tone: "amber",
  },
  {
    number: "04",
    question: "What happens if the decision is wrong?",
    answer:
      "The credential can be updated, disabled, or replaced. The artifact does not preserve the challenge path, investigator, evidence reviewed, correction rationale, downstream notification, or whether the failure changed the process for the next case.",
    status: "Correction exists; correction lineage is not visible",
    tone: "amber",
  },
] as const;

const lineage = [
  "Evidence",
  "Judgment",
  "Authority",
  "Decision",
  "Action",
  "Outcome",
  "Revision",
];

const visibleProof = [
  "Institutional issuer",
  "Signed credential data",
  "Tamper detection",
  "Certificate validity window",
  "Compatible verifier checks",
];

const missingContext = [
  "Case-specific evidence package",
  "Policy and threshold version",
  "Human and automated judgment path",
  "Delegated authority basis",
  "Conditions, exceptions, and overrides",
  "Challenge and correction receipt",
  "Operational learning after failure",
];

const requiredRecord = [
  {
    title: "Decision frame",
    body: "What was being decided, under which legal and operational conditions?",
  },
  {
    title: "Evidence state",
    body: "What information was available, trusted, disputed, omitted, or unavailable at that moment?",
  },
  {
    title: "Qualified assessment",
    body: "What did the relevant systems and professionals conclude, and with what confidence?",
  },
  {
    title: "Authority basis",
    body: "Who could commit the institution, and what delegation made that authority legitimate?",
  },
  {
    title: "Conditions and exceptions",
    body: "What thresholds, overrides, limitations, or unresolved risks were accepted?",
  },
  {
    title: "Action and revision",
    body: "What happened next, did it work, and what changed when the result was challenged?",
  },
];

const sources = [
  {
    label: "Arizona MVD — Mobile Driver License",
    href: "https://azdot.gov/mvd/mobile-driver-license",
  },
  {
    label: "Google Wallet Help — Add your ID or driver license",
    href: "https://support.google.com/wallet/answer/12436402?hl=en",
  },
  {
    label: "Google Developers — Supported issuer certificates",
    href: "https://developers.google.com/wallet/identity/verify/supported-issuers-iaca-certs",
  },
  {
    label: "ISO/IEC 18013-5 — Mobile driving licence application",
    href: "https://www.iso.org/standard/69084.html",
  },
];

export default function CredentialWithoutContextPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: "Credential Without Context",
    headline:
      "Why a valid digital identity credential still does not prove governed decision-making",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    url: canonical,
    description:
      "A NULLWORKS report applying four operational-accountability questions to Arizona mobile identity and cryptographic credential infrastructure.",
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.signalField} aria-hidden="true">
        <div className={`${styles.signalRing} ${styles.signalRingOne}`} />
        <div className={`${styles.signalRing} ${styles.signalRingTwo}`} />
        <div className={`${styles.signalRing} ${styles.signalRingThree}`} />
        <div className={styles.signalSweep} />
        <div className={`${styles.signalNode} ${styles.signalNodeOne}`} />
        <div className={`${styles.signalNode} ${styles.signalNodeTwo}`} />
        <div className={`${styles.signalNode} ${styles.signalNodeThree}`} />
      </div>

      <header className={styles.nav}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span>NULLWORKS</span>
        </a>
        <span className={styles.navLabel}>SYSTEMS REPORT / 001</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>
            DIGITAL IDENTITY / OPERATIONAL PROVENANCE / PUBLIC SYSTEMS
          </p>
          <h1>
            Credential <span>Without Context</span>
          </h1>
          <p className={styles.subtitle}>
            Why a valid digital identity credential still does not prove the
            governed decision-making that created it.
          </p>
          <div className={styles.heroStatement}>
            <span>Core finding</span>
            <strong>
              The certificate can preserve the claim. It does not preserve the
              complete evidence, judgment, authority, correction, and learning
              surrounding the claim.
            </strong>
          </div>
          <div className={styles.actions}>
            <a href="#four-questions" className={styles.primaryButton}>
              Run the four questions
            </a>
            <a href="#finding" className={styles.secondaryButton}>
              Read the finding
            </a>
          </div>
          <p className={styles.privacyLine}>
            This public report contains no driver-license image, license number,
            address, birth date, portrait, barcode, certificate identifier, or
            other case-specific personal data.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.shell} ${styles.narrowShell}`}>
          <p className={styles.kicker}>THE TRUST OBJECT</p>
          <h2>A cryptographic certificate is useful. It is not the whole receipt.</h2>
          <div className={styles.prose}>
            <p>
              A mobile identity credential can let a verifier establish that
              signed data came from a trusted issuer, that the data has not been
              silently altered, and that the credential remains technically
              valid within a defined certificate and device-verification model.
            </p>
            <p>
              Those are meaningful controls. They reduce forgery, manual entry,
              and unverifiable claims.
            </p>
            <p>
              But authenticity of the artifact is not the same thing as
              accountability for the decision that produced the artifact.
            </p>
          </div>

          <div className={styles.credentialDiagram} aria-label="Credential trust diagram">
            <div className={styles.credentialCard}>
              <div className={styles.credentialHeader}>
                <span className={styles.stateSeal}>AZ</span>
                <div>
                  <strong>Mobile identity credential</strong>
                  <span>Sanitized systems representation</span>
                </div>
              </div>
              <div className={styles.credentialLines}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.certificateStrip}>
                <span>Issuer signature</span>
                <span>Integrity check</span>
                <span>Validity state</span>
              </div>
            </div>
            <div className={styles.diagramArrow} aria-hidden="true">
              <span />
              <strong>?</strong>
              <span />
            </div>
            <div className={styles.decisionStack}>
              <span>Evidence</span>
              <span>Policy</span>
              <span>Judgment</span>
              <span>Authority</span>
              <span>Exception</span>
              <span>Correction</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.comparisonSection}`}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>BOUNDARY TEST</p>
              <h2>What the artifact shows—and what it cannot show alone.</h2>
            </div>
            <p>
              The left side is cryptographic and technical validity. The right
              side is operational governance. Both matter. They answer different
              questions.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            <article className={`${styles.comparisonCard} ${styles.proofCard}`}>
              <span className={styles.cardIndex}>VISIBLE</span>
              <h3>What can be verified</h3>
              <ul>
                {visibleProof.map((item) => (
                  <li key={item}>
                    <span />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className={`${styles.comparisonCard} ${styles.contextCard}`}>
              <span className={styles.cardIndex}>NOT VISIBLE FROM THE ARTIFACT</span>
              <h3>What remains organizational</h3>
              <ul>
                {missingContext.map((item) => (
                  <li key={item}>
                    <span />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="four-questions" className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>THE FOUR QUESTIONS</p>
              <h2>Could the State of Arizona reconstruct the decision?</h2>
            </div>
            <p>
              The honest answer is not “no.” The honest answer is that the public
              credential and public documentation do not prove that it can answer
              these questions for the individual issuance event.
            </p>
          </div>

          <div className={styles.questionGrid}>
            {questions.map((item) => (
              <article className={styles.questionCard} key={item.number}>
                <div className={styles.questionTopline}>
                  <span>{item.number}</span>
                  <span
                    className={`${styles.status} ${
                      item.tone === "red" ? styles.statusRed : styles.statusAmber
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="finding" className={`${styles.section} ${styles.findingSection}`}>
        <div className={`${styles.shell} ${styles.narrowShell}`}>
          <p className={styles.kicker}>THE FINDING</p>
          <h2>The institution may possess the context. The credential does not demonstrate it.</h2>
          <div className={styles.findingQuote}>
            <span>Cryptographic truth</span>
            <p>Arizona signed this claim, and the signed data can be verified.</p>
            <span>Operational truth</span>
            <p>
              Here is why the claim was accepted, who possessed authority, what
              exceptions were accepted, and how the institution learns when the
              decision is wrong.
            </p>
          </div>
          <div className={styles.lockedLine}>
            Cryptography can prove Arizona signed the claim. It cannot, by itself,
            prove Arizona governed the judgment behind the signature.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>ACCOUNTABLE RUNTIME RECORD</p>
              <h2>What a governed issuance system would preserve.</h2>
            </div>
            <p>
              The objective is not to expose sensitive identity evidence to every
              verifier. It is to ensure the accountable institution can reconstruct,
              challenge, correct, and learn from the decision under lawful access controls.
            </p>
          </div>

          <div className={styles.recordGrid}>
            {requiredRecord.map((item, index) => (
              <article className={styles.recordCard} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.lineageGrid}>
            {lineage.map((item, index) => (
              <div className={styles.lineageCard} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.scaleSection}`}>
        <div className={`${styles.shell} ${styles.narrowShell}`}>
          <p className={styles.kicker}>WHY THIS SCALES</p>
          <h2>This is not only a driver-license problem.</h2>
          <div className={styles.prose}>
            <p>
              Governments and regulated organizations are becoming increasingly
              capable of producing trusted digital artifacts: credentials,
              approvals, attestations, licenses, benefits determinations, AI
              outputs, and ledger entries.
            </p>
            <p>
              The artifact may be authentic while the surrounding operating
              decision remains fragmented across vendors, automated systems,
              policy manuals, human review queues, and exception processes.
            </p>
            <p>
              That is the missing layer NULLWORKS calls Operational Systems
              Architecture: preserve the evidence, judgment, authority, action,
              outcome, and revision surrounding the trusted record.
            </p>
          </div>
          <div className={styles.scaleCallout}>
            <span>Blockchain and cryptography preserve claims.</span>
            <strong>
              Operational lineage preserves the accountable system surrounding
              those claims.
            </strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>PUBLIC SOURCE BOUNDARY</p>
              <h2>What this report relies on.</h2>
            </div>
            <p>
              This report tests the visible public architecture. It does not claim
              access to Arizona&apos;s internal case records, vendor contracts,
              identity-proofing thresholds, or individual approval logs.
            </p>
          </div>

          <div className={styles.sourceGrid}>
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className={styles.sourceCard}
              >
                <span>Official source</span>
                <strong>{source.label}</strong>
                <em>Open source ↗</em>
              </a>
            ))}
          </div>

          <div className={styles.truthBoundary}>
            <strong>Truth boundary</strong>
            <p>
              A certificate is not useless because it lacks decision lineage. It
              performs a different function. The finding is that cryptographic
              validity and governed institutional judgment are separate layers,
              and a defensible public system needs both.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div>
            <span className={styles.footerMark}>NW</span>
            <div>
              <strong>NULLWORKS</strong>
              <p>Operational Systems Architecture</p>
            </div>
          </div>
          <p>
            Founder: Mason Perry · Human authority remains explicit · Published
            July 23, 2026
          </p>
          <div className={styles.footerLinks}>
            <a href="/">Home</a>
            <a href="/field-notes">Field Notes</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
