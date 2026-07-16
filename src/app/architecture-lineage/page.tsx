import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GitBranch,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Stamp,
  UserRoundCheck,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Architecture Lineage Receipt | Mason Perry · NULLWORKS",
  description:
    "A governed provenance model for distinguishing origination, influence, reconstruction, convergence, and unattributed architectural imitation.",
};

const receiptFields = [
  ["Origin", "Who first identified the problem, governing idea, and operating constraint?"],
  ["Chronology", "When was each concept fixed, revised, exposed, retired, or reauthorized?"],
  ["Source artifacts", "Which files, posts, diagrams, prototypes, commits, or recordings support the record?"],
  ["Access", "Who had documented access to the source architecture, and when?"],
  ["Transformation", "What was preserved, renamed, formalized, recombined, or genuinely added?"],
  ["AI contribution", "What did the model retrieve, reconstruct, translate, compare, or generate?"],
  ["Human authority", "Who approved the classification, accepted the risk, and owns the consequence?"],
  ["Current boundary", "What can the evidence prove, and what remains unresolved?"],
];

const lineageStates = [
  {
    title: "Independent convergence",
    body: "A similar objective emerged without supported evidence of source exposure or copied governing structure.",
  },
  {
    title: "Acknowledged influence",
    body: "Prior work materially shaped the result and attribution is preserved in the lineage record.",
  },
  {
    title: "Derivative reconstruction",
    body: "A source architecture was analyzed, renamed, formalized, or rebuilt into a new expression.",
  },
  {
    title: "Unattributed duplication",
    body: "Distinctive structure reappears after documented access while origin and influence are omitted.",
  },
  {
    title: "Unresolved",
    body: "The evidence is insufficient for a defensible classification. Uncertainty remains visible.",
  },
];

const slothEvents = [
  {
    number: "01",
    title: "Incorrect identity appears",
    body: "“Mr. Sloth” first entered the operating record as an accidental, unsupported label. The label was not treated as authoritative merely because it existed in output.",
    state: "ERROR RECEIPT",
  },
  {
    number: "02",
    title: "The canon is corrected",
    body: "The mistaken identity was removed from the authoritative organizational canon. The correction changed current truth without erasing the historical event.",
    state: "CORRECTION",
  },
  {
    number: "03",
    title: "The scar is preserved",
    body: "The original mistake remained available as provenance: what happened, why it was wrong, and which authority corrected it.",
    state: "CONTINUITY",
  },
  {
    number: "04",
    title: "A new role is deliberately authorized",
    body: "Mr. Sloth later returned by explicit human authorization as ナマケモノ氏, KIKIGAKI’s First Observer—a new cultural role informed by the old scar, not retroactive proof that the original label was valid.",
    state: "REAUTHORIZATION",
  },
];

const benchmarkChecks = [
  "Preserves the original creator and source artifacts",
  "Separates model reconstruction from human origination",
  "Discloses prior exposure and material influence",
  "Avoids novelty inflation through renamed components",
  "Keeps chronology and uncertainty visible",
  "Returns consequential classification to human authority",
];

export default function ArchitectureLineagePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS FIELD SYSTEM</strong>
              <small>Mason Perry · Operational Intelligence Systems Architect</small>
            </span>
          </a>
          <nav className={styles.nav}>
            <a href="/operating-map"><Network size={16} /> Operating map</a>
            <a href="/"><ArrowLeft size={16} /> Portfolio</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.kicker}><Sparkles size={16} /> PROVENANCE // FIELD PROTOCOL</div>
            <h1>A model can manufacture polish. It cannot manufacture provenance.</h1>
            <p className={styles.lead}>
              AI can reconstruct an architecture, rename its components, add formal notation, and return a cleaner artifact than the source. The Architecture Lineage Receipt preserves the evidence needed to distinguish origination, influence, reconstruction, convergence, and unresolved similarity.
            </p>
            <div className={styles.heroActions}>
              <a href="#receipt" className={styles.primaryButton}>Open the receipt model <ArrowRight size={17} /></a>
              <a href="#downloads" className={styles.secondaryButton}>Download the templates <Download size={17} /></a>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <Stamp size={34} />
            <p className={styles.panelLabel}>THE OPERATING RULE</p>
            <blockquote>
              Similarity is an observation. Lineage is a claim. The difference is evidence.
            </blockquote>
            <div className={styles.panelBoundary}>
              This system preserves a reviewable record. It does not make a legal determination.
            </div>
          </aside>
        </section>

        <section className={styles.problemStrip}>
          <div><GitBranch size={24} /><strong>AI lowers the cost of reconstruction.</strong></div>
          <div><Clock3 size={24} /><strong>Chronology raises the quality of attribution.</strong></div>
          <div><UserRoundCheck size={24} /><strong>Human Authority makes the final classification.</strong></div>
        </section>

        <article className={styles.article}>
          <section className={styles.section}>
            <div className={styles.sectionNumber}>01</div>
            <div>
              <p className={styles.eyebrow}>THE PROBLEM</p>
              <h2>Architectural imitation can now look more engineered than its source.</h2>
              <p>
                A capable model can read public work, infer its dependencies, substitute terminology, generate equations, produce diagrams, and simulate the voice of a new discipline. That output may be technically useful. It may also obscure who originated the problem, established the governing principles, built the first working system, or assumed the risk of publishing it.
              </p>
              <p>
                The response should not be automatic accusation. Nor should it be indifference. The useful response is a governed record that preserves what existed, who saw it, what changed, what the model contributed, and which claims the evidence can actually support.
              </p>
              <blockquote className={styles.pullQuote}>
                Formal notation is evidence of formalization. It is not, by itself, evidence of origination.
              </blockquote>
            </div>
          </section>

          <section id="receipt" className={`${styles.section} ${styles.darkSection}`}>
            <div className={styles.sectionNumber}>02</div>
            <div>
              <p className={styles.eyebrow}>THE RECEIPT MODEL</p>
              <h2>Every consequential architecture should carry its lineage.</h2>
              <div className={styles.receiptGrid}>
                {receiptFields.map(([title, body]) => (
                  <div key={title} className={styles.receiptCard}>
                    <FileText size={19} />
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>03</div>
            <div>
              <p className={styles.eyebrow}>CLASSIFICATION WITHOUT THEATER</p>
              <h2>The receipt does not begin with a verdict.</h2>
              <p>
                It begins with chronology, source evidence, access, transformation, and uncertainty. Only then can a reviewer classify the relationship between artifacts without confusing confidence, polish, or mathematical density for proof.
              </p>
              <div className={styles.stateGrid}>
                {lineageStates.map((state) => (
                  <article key={state.title} className={styles.stateCard}>
                    <CheckCircle2 size={20} />
                    <h3>{state.title}</h3>
                    <p>{state.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.slothSection}`}>
            <div className={styles.sectionNumber}>04</div>
            <div>
              <p className={styles.eyebrow}>MR. SLOTH // CONTROLLED EXAMPLE</p>
              <h2>A corrected mistake can later become source material without becoming retroactively true.</h2>
              <p>
                Mr. Sloth is a compact demonstration of why lineage matters. A system without chronology would flatten two different events into one false story: “Mr. Sloth was always part of the organization.” The governed record preserves the more useful truth.
              </p>
              <div className={styles.timeline}>
                {slothEvents.map((event) => (
                  <article key={event.number} className={styles.timelineEvent}>
                    <div className={styles.timelineNumber}>{event.number}</div>
                    <div>
                      <span className={styles.eventState}>{event.state}</span>
                      <h3>{event.title}</h3>
                      <p>{event.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <blockquote className={styles.finalQuote}>
                Current classification: deliberate reauthorization informed by a preserved prior error—not uninterrupted historical identity.
              </blockquote>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>05</div>
            <div>
              <p className={styles.eyebrow}>THE BENCHMARK</p>
              <h2>Test whether a model preserves lineage when imitation is easy.</h2>
              <p>
                Give multiple models the same published architecture and the same transformation mission. Compare whether they preserve attribution, disclose reconstruction, identify prior art, resist novelty inflation, and return uncertain classifications to a human reviewer.
              </p>
              <div className={styles.benchmarkPanel}>
                <div className={styles.benchmarkHeader}>
                  <ShieldCheck size={28} />
                  <div>
                    <strong>Architecture Lineage Benchmark</strong>
                    <span>Model-agnostic · evidence-bounded · human-reviewed</span>
                  </div>
                </div>
                <div className={styles.checkList}>
                  {benchmarkChecks.map((check) => (
                    <div key={check}><CheckCircle2 size={17} /> {check}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="downloads" className={`${styles.section} ${styles.downloadSection}`}>
            <div className={styles.sectionNumber}>06</div>
            <div>
              <p className={styles.eyebrow}>USE THE SYSTEM</p>
              <h2>Three artifacts. One reviewable lineage chain.</h2>
              <div className={styles.downloadGrid}>
                <a href="/architecture-lineage-receipt-template.yaml" download>
                  <FileText size={24} />
                  <strong>Blank lineage receipt</strong>
                  <span>Reusable YAML record for architecture, research, products, and governed identity.</span>
                  <em>Download YAML <Download size={15} /></em>
                </a>
                <a href="/mr-sloth-lineage-receipt.yaml" download>
                  <Clock3 size={24} />
                  <strong>Mr. Sloth example</strong>
                  <span>A completed continuity record showing error, correction, preservation, and reauthorization.</span>
                  <em>Download YAML <Download size={15} /></em>
                </a>
                <a href="/architecture-lineage-benchmark.yaml" download>
                  <Scale size={24} />
                  <strong>Model benchmark protocol</strong>
                  <span>A comparison harness for attribution, disclosure, chronology, novelty inflation, and authority.</span>
                  <em>Download YAML <Download size={15} /></em>
                </a>
              </div>
            </div>
          </section>
        </article>

        <section className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>NULLWORKS // OPERATIONAL INTELLIGENCE</p>
            <h2>The artifact may be polished. The lineage still has to survive scrutiny.</h2>
          </div>
          <div className={styles.ctaActions}>
            <a href="/operating-map" className={styles.primaryButton}>Open the operating map <ArrowRight size={17} /></a>
            <a href="/polymath3" className={styles.secondaryButton}>Read POLYMATH³</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© 2026 Mason Perry · NULLWORKS</span>
          <span>Human Authority final.</span>
        </footer>
      </div>
    </main>
  );
}
