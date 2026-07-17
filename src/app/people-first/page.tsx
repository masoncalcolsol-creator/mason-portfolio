import type { Metadata } from "next";
import {
  ArrowRight,
  Factory,
  Gauge,
  Mail,
  Network,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import styles from "./people-first.module.css";

export const metadata: Metadata = {
  title: "The Point Was Never More AI | NULLWORKS",
  description:
    "A people-first operating thesis from Mason Perry and NULLWORKS: AI is one possible tool for increasing human capability while preserving intent, judgment, and final human authority.",
  robots: { index: false, follow: false },
};

const authority = [
  ["The person defines the outcome", "The system begins with a human purpose, not an available model or a product feature."],
  ["The person grants authority", "AI receives a bounded role. It does not silently inherit the right to decide."],
  ["The person can inspect the evidence", "Sources, assumptions, handoffs, and uncertainty remain visible enough to question."],
  ["The person can intervene", "Exception paths and review gates are designed into the workflow before autonomy expands."],
  ["The person can revoke autonomy", "Control is real only when it can be reduced, paused, corrected, or removed."],
];

const systemLayers = [
  { title: "Intent", body: "What is the person actually trying to accomplish?", icon: UserRoundCheck },
  { title: "Workflow", body: "How does the real work move, including handoffs and exceptions?", icon: Workflow },
  { title: "Evidence", body: "What information supports the result, and what remains uncertain?", icon: Network },
  { title: "Authority", body: "Who may decide, approve, correct, stop, or own the consequence?", icon: ShieldCheck },
  { title: "Measurement", body: "Did the intervention make the person safer, faster, clearer, or more capable?", icon: Gauge },
  { title: "Improvement", body: "Preserve the receipt, learn from failure, and improve the operating system.", icon: Wrench },
];

export default function PeopleFirstPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS</strong>
              <small>People-first operating systems</small>
            </span>
          </a>
          <div className={styles.headerActions}>
            <a href="/operational-systems" className={styles.headerLink}>
              <Factory size={15} /> Operational systems
            </a>
            <a
              href="mailto:masoncalcolsol@gmail.com?subject=People-First%20Operational%20Systems"
              className={styles.headerContact}
            >
              <Mail size={15} /> Contact Mason
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <UserRoundCheck size={16} /> A NULLWORKS people-first field note
            </div>
            <h1>The point was never more AI.</h1>
            <p className={styles.heroLead}>
              The point was always more human capability.
            </p>
            <p className={styles.heroBody}>
              AI can be useful, powerful, and transformative. But it is still a tool. The work begins with a person, their intent, their judgment, and the outcome they are trying to create.
            </p>
            <div className={styles.heroActions}>
              <a href="#thesis" className={styles.primaryButton}>
                Read the thesis <ArrowRight size={17} />
              </a>
              <a href="#authority" className={styles.secondaryButton}>
                See final human authority <ShieldCheck size={17} />
              </a>
            </div>
            <div className={styles.betaNote}>BETA FIELD NOTE · OWNER REVIEW IN PROGRESS · NOINDEX</div>
          </div>

          <figure className={styles.photoFrame}>
            <img
              src="/api/assets/people-first-driveway?v=20260717-1"
              alt="Two young people working in a driveway, one sanding wood and one repairing a vehicle"
              className={styles.photo}
            />
            <figcaption>
              <span>REAL PEOPLE · REAL WORK · DIFFERENT TOOLS</span>
              <strong>The tool extends the person. It does not become the purpose.</strong>
            </figcaption>
          </figure>
        </section>

        <section id="thesis" className={styles.opening}>
          <div className={styles.openingLabel}>01 // THE PHOTOGRAPH</div>
          <div className={styles.openingGrid}>
            <div>
              <h2>This is my driveway. Those are my kids.</h2>
            </div>
            <div className={styles.articleCopy}>
              <p>
                One is sanding wood. The other is underneath a vehicle. They are solving different problems with different tools in the same physical space.
              </p>
              <p>
                Neither tool determines the objective. The sander does not decide what should be built. The jack stands do not decide what needs to be repaired. The people do.
              </p>
              <blockquote>The tools extend their reach.</blockquote>
              <p>
                That is how I think about artificial intelligence. AI is not the purpose of the work. People are.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.statementBand}>
          <p>Sometimes the right answer is AI.</p>
          <h2>Sometimes it is a sander, a jack stand, a clearer process, better evidence, or room for an experienced person to use their judgment.</h2>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>02 // START WITH THE PERSON</span>
            <h2>Capability without intent is just motion.</h2>
            <p>
              The current conversation often begins with models, agents, harnesses, benchmarks, and autonomy. Those matter. But they are not the starting point. The starting point is a person trying to accomplish something.
            </p>
          </div>
          <div className={styles.questionGrid}>
            {[
              "What are they attempting to do?",
              "What do they already know?",
              "Where is the actual friction?",
              "What decisions should remain theirs?",
              "What help would make the work safer, clearer, faster, or more rewarding?",
              "Would they choose AI at all?",
            ].map((question, index) => (
              <article className={styles.questionCard} key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{question}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="authority" className={styles.authoritySection}>
          <div className={styles.sectionHeading}>
            <span>03 // FINAL HUMAN AUTHORITY</span>
            <h2>Not a ceremonial approval button.</h2>
            <p>
              Final human authority means the workflow is designed around human intent from the beginning. It remains visible, usable, and revocable when the system becomes consequential.
            </p>
          </div>
          <div className={styles.authorityList}>
            {authority.map(([title, body], index) => (
              <article className={styles.authorityRow} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>04 // WHAT NULLWORKS DESIGNS</span>
            <h2>The environment around the tool.</h2>
            <p>
              I am less interested in deploying the largest collection of agents than in designing the operating system around the people who may use them.
            </p>
          </div>
          <div className={styles.layerGrid}>
            {systemLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <article className={styles.layerCard} key={layer.title}>
                  <div className={styles.iconBox}><Icon size={22} /></div>
                  <h3>{layer.title}</h3>
                  <p>{layer.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.outcomeSection}>
          <div className={styles.outcomeCopy}>
            <span>05 // THE MEASURE</span>
            <h2>Did anybody become more capable?</h2>
            <p>
              Success is not the number of agents deployed. It is a person becoming more capable without becoming less authoritative.
            </p>
            <p>
              It is expertise being amplified rather than ignored. Repetitive burden reduced without removing meaningful judgment. Better information. A stronger decision. A completed project. A learned capability. Part of someone&apos;s day returned to them.
            </p>
          </div>
          <aside className={styles.quoteCard}>
            <ShieldCheck size={32} />
            <blockquote>
              Technology changes. Human intent remains the reason for using it.
            </blockquote>
            <strong>The point was always more human capability.</strong>
          </aside>
        </section>

        <section className={styles.cta}>
          <div>
            <span>NULLWORKS // OPERATIONAL INTELLIGENCE</span>
            <h2>Build the system around the person.</h2>
            <p>
              Start with one real workflow, the people closest to the outcome, and the smallest intervention that can make the work better.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <a href="/operational-systems" className={styles.primaryButton}>
              Explore operational systems <ArrowRight size={17} />
            </a>
            <a
              href="mailto:masoncalcolsol@gmail.com?subject=People-First%20Operational%20Systems"
              className={styles.secondaryButton}
            >
              Start a conversation <Mail size={17} />
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div>
            <strong>Mason Perry</strong>
            <span>Founder, NULLWORKS · Operational Intelligence Systems Architect</span>
          </div>
          <span>Human Authority Final</span>
        </footer>
      </div>
    </main>
  );
}
