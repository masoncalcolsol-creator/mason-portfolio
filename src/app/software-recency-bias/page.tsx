import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Clock3,
  Database,
  Factory,
  GitBranch,
  History,
  Network,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Software Recency Bias | Mason Perry · NULLWORKS",
  description:
    "When what is new replaces what already works: a field essay on contextual continuity, organizational memory, and treating software as one tool inside the operating system.",
};

const recencySignals = [
  ["New framework", "progress"],
  ["New model", "strategy"],
  ["New agent", "system"],
  ["Faster build", "value"],
  ["More automation", "maturity"],
];

const inheritedSystems = [
  ["Authority boundaries", "Who may decide, approve, stop, or override."],
  ["Work handoffs", "How responsibility and context move between people."],
  ["Evidence trails", "Why a decision was made and what supported it."],
  ["Apprenticeship", "How judgment transfers instead of merely information."],
  ["Exception escalation", "What happens when the normal path fails."],
  ["Maintenance logs", "How repeated failures become usable knowledge."],
  ["Quality gates", "Where work is checked before consequences spread."],
  ["Continuity under turnover", "What survives when a person or tool disappears."],
];

const questions = [
  "What does the real world already know about this problem?",
  "What history, relationship, and decision context must be preserved?",
  "What survives when the model, vendor, or developer changes?",
  "Who owns the exception when the happy path breaks?",
  "How does today’s work become usable context tomorrow?",
];

export default function SoftwareRecencyBiasPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS FIELD ESSAY</strong>
              <small>Mason Perry · Operational Intelligence Systems Architect</small>
            </span>
          </a>
          <nav className={styles.nav}>
            <a href="/operating-map"><Network size={16} /> Operating map</a>
            <a href="/"><ArrowLeft size={16} /> Portfolio</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}><Clock3 size={16} /> FIELD NOTE // SOFTWARE RECENCY BIAS</div>
            <h1>When “what’s new?” replaces “what already works.”</h1>
            <p className={styles.lead}>
              An honest question for software people at every level: when was the last time you deliberately looked backward into the real world before building forward?
            </p>
            <div className={styles.heroActions}>
              <a href="#article" className={styles.primaryButton}>Read the essay <ArrowRight size={17} /></a>
              <a href="#questions" className={styles.secondaryButton}>Use the build questions <ShieldCheck size={17} /></a>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelIcon}><History size={28} /></div>
            <p className={styles.panelLabel}>THE CORE QUESTION</p>
            <blockquote>
              When was the last time you used real-world contextual continuity—not merely historical data—to shape a deployed system?
            </blockquote>
            <div className={styles.panelRule} />
            <p className={styles.panelFooter}>Build forward. Learn backward. Preserve continuity.</p>
          </aside>
        </section>

        <section className={styles.signalStrip} aria-label="Common recency bias signals">
          {recencySignals.map(([left, right]) => (
            <div key={left} className={styles.signal}>
              <strong>{left}</strong><span>=</span><em>{right}</em>
            </div>
          ))}
        </section>

        <article id="article" className={styles.article}>
          <section className={styles.articleSection}>
            <div className={styles.sectionNumber}>01</div>
            <div>
              <p className={styles.eyebrow}>LOOK BACKWARD BEFORE BUILDING FORWARD</p>
              <h2>Not through the repository. Into the real world.</h2>
              <p>
                Not backward through product analytics. Not backward through last quarter’s roadmap. Not backward through the latest framework comparison.
              </p>
              <p>
                I mean backward into factories, hospitals, military units, maintenance departments, trades, family businesses, field service teams, and mature organizations that have spent generations learning how work survives reality.
              </p>
              <p>
                When was the last time you studied how those systems preserve knowledge, transfer judgment, assign authority, recover from failure, and coordinate people—then used that continuity to shape something deployed, usable, and consequential?
              </p>
            </div>
          </section>

          <section className={styles.articleSection}>
            <div className={styles.sectionNumber}>02</div>
            <div>
              <p className={styles.eyebrow}>THE MOVEMENT TRAP</p>
              <h2>Software has a recency bias.</h2>
              <p>
                The industry rewards whatever is newer, faster, smarter, more autonomous, more scalable, or more technically impressive. New framework. New model. New agent. New abstraction. New interface.
              </p>
              <p>
                Movement starts to look like progress. Build speed starts to look like value. A technical component starts to look like the complete system.
              </p>
              <blockquote className={styles.pullQuote}>
                The newest tool is not automatically the missing operating model.
              </blockquote>
            </div>
          </section>

          <section className={styles.articleSection}>
            <div className={styles.sectionNumber}>03</div>
            <div>
              <p className={styles.eyebrow}>WHAT ORGANIZATIONS ALREADY KNOW</p>
              <h2>Many “software problems” were organizational problems first.</h2>
              <p>
                Human organizations solved versions of today’s coordination problems long before software arrived. Their methods may look manual, old, local, or inefficient—but many survived because they preserved continuity, responsibility, and recovery under pressure.
              </p>
              <div className={styles.knowledgeGrid}>
                {inheritedSystems.map(([title, body]) => (
                  <div key={title} className={styles.knowledgeCard}>
                    <Wrench size={19} />
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.articleSection} ${styles.darkSection}`}>
            <div className={styles.sectionNumber}>04</div>
            <div>
              <p className={styles.eyebrow}>THE MISSING LAYER</p>
              <h2>Contextual continuity is more than memory.</h2>
              <p>
                It is the preservation of relationships, decisions, evidence, sequence, authority, local knowledge, corrections, failures, and meaning across time.
              </p>
              <div className={styles.continuityCompare}>
                <div><Database size={24} /><strong>Data stores state.</strong><span>What exists now.</span></div>
                <div><GitBranch size={24} /><strong>Continuity preserves meaning.</strong><span>How we got here, why it matters, and what must survive next.</span></div>
              </div>
              <p>
                A maintenance technician who remembers the environmental condition behind three repeated failures possesses more than data. A nurse who understands why a procedure changed possesses more than documentation. A supervisor who knows which workaround became permanent, who authorized it, and what risk it introduced possesses more than workflow history.
              </p>
              <p>
                When software preserves only the current state, people are forced to rediscover the same lesson. Then the next rediscovery gets labeled innovation.
              </p>
            </div>
          </section>

          <section className={styles.articleSection}>
            <div className={styles.sectionNumber}>05</div>
            <div>
              <p className={styles.eyebrow}>THE REFRAME</p>
              <h2>Software is a tool inside the organization.</h2>
              <p>
                A model is a tool. An API is a tool. A database is a tool. A developer is a tool. An AI agent is a tool. I am also a tool when I perform a defined function inside a larger system.
              </p>
              <p>
                Calling something a tool does not diminish its value. It places that value inside the complete operating context: purpose, authority, evidence, handoffs, exception paths, review, recovery, and consequence ownership.
              </p>
              <div className={styles.systemDiagram}>
                <div><BrainCircuit size={25} /><span>AI</span></div>
                <div><Database size={25} /><span>Software</span></div>
                <div className={styles.systemCore}><Factory size={30} /><strong>THE ORGANIZATION</strong><small>is the system</small></div>
                <div><UserRoundCheck size={25} /><span>People</span></div>
                <div><Wrench size={25} /><span>Tools</span></div>
              </div>
              <p>
                This distinction matters even more with AI. The durable capability is not merely a powerful model. It is the organizational structure that makes models, software, specialists, evidence, and human judgment work together reliably.
              </p>
            </div>
          </section>

          <section id="questions" className={styles.questionSection}>
            <div className={styles.questionHeader}>
              <p className={styles.eyebrow}>ASK BEFORE YOU BUILD</p>
              <h2>Five questions that force the system back into view.</h2>
            </div>
            <ol>
              {questions.map((question, index) => (
                <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></li>
              ))}
            </ol>
          </section>

          <section className={styles.articleSection}>
            <div className={styles.sectionNumber}>06</div>
            <div>
              <p className={styles.eyebrow}>THE HONEST QUESTION</p>
              <h2>What did the real world already learn that your software forgot to include?</h2>
              <p>
                Sometimes the answer will be technical. Often it will be organizational: an apprenticeship model, a shift-change briefing, a traveler, a checklist, a work order, a quality gate, a maintenance log, a safety investigation, or the foreman who knows where the process actually breaks.
              </p>
              <p>
                We should not blindly recreate the past. We should extract what the past already learned, preserve the context that made it useful, and build forward from there.
              </p>
              <blockquote className={styles.finalQuote}>
                Treat software as one tool inside the organization—not the organization as something that exists inside the software.
              </blockquote>
            </div>
          </section>
        </article>

        <section className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>NULLWORKS // OPERATIONAL INTELLIGENCE</p>
            <h2>The application is a proof vehicle. The reusable operating system is the product.</h2>
          </div>
          <div className={styles.ctaActions}>
            <a href="/operating-map" className={styles.primaryButton}>Open the operating map <ArrowRight size={17} /></a>
            <a href="/oisa-category" className={styles.secondaryButton}>Explore the OISA role <UserRoundCheck size={17} /></a>
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
