import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowDown,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Workflow,
  Wrench,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Outcome-First Operational Fuzzing | NULLWORKS",
  description:
    "How demanding complete outcomes under live pressure exposed integration failures, coordination bottlenecks, and the need for the OI SUITe faster than narrow controlled testing alone.",
  robots: {
    index: false,
    follow: false,
  },
};

const failureClasses = [
  "Technically correct output that was visually useless",
  "Good code trapped behind a failed deployment",
  "A successful build attached to the wrong public route",
  "Stale production builds and hidden 404 states",
  "Mobile layouts that failed only after live verification",
  "Tool permissions blocking otherwise valid work",
  "Context loss and identity drift between specialists",
  "One worker reviewing its own bad assumptions",
  "Unfinished work becoming invisible between handoffs",
  "The human becoming the routing, memory, and continuity layer",
];

const phases = [
  {
    number: "01",
    title: "Wild operational discovery",
    subtitle: "Demand the complete outcome.",
    body: "Run the real workflow with real artifacts, real deployment pressure, incomplete specifications, and human correction. Preserve every consequential failure and recovery receipt.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Controlled reconstruction",
    subtitle: "Find the actual mechanism.",
    body: "Take the important failures, remove irrelevant variables, reproduce them intentionally, and determine what actually caused the system to break.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Standard work",
    subtitle: "Stop paying twice for the lesson.",
    body: "Convert the verified correction into routing, role boundaries, templates, quality gates, telemetry, training, or automated tests.",
    icon: Wrench,
  },
];

const advantages = [
  {
    title: "Outcome pressure",
    body: "The system had to produce something usable outside the conversation, not merely a plausible answer inside it.",
  },
  {
    title: "Early integration",
    body: "Writing, design, code, deployment, publishing, verification, and recovery were treated as one operating workflow instead of separate departments.",
  },
  {
    title: "Heterogeneous work",
    body: "Different domains, tools, stakes, formats, and emotional conditions forced the organization through a unusually broad range of operational states.",
  },
  {
    title: "Immediate human correction",
    body: "Failures were corrected while intent and context were still active, making the recovery path easier to preserve as reusable telemetry.",
  },
];

const boundaries = [
  "It does not isolate variables cleanly.",
  "It cannot prove which single change caused an outcome without reconstruction.",
  "It can inflate activity through duplication, rework, and abandoned attempts.",
  "It can overload the operator if continuity remains inside the human brain.",
  "It should not replace controlled testing for safety-critical or high-stakes systems.",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className={styles.eyebrow}>{children}</div>;
}

export default function OutcomeFirstOperationalFuzzingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.mark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS // OI SUITe field theory</div>
              <div className={styles.brandName}>Operational Intelligence</div>
            </div>
          </div>
          <div className={styles.unlisted}>Unlisted field note</div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}>
              <AlertTriangle size={16} /> High-pressure systems discovery
            </div>
            <h1>Outcome-First Operational Fuzzing</h1>
            <p className={styles.deck}>
              Why demanding the whole system now exposed more useful failure states than narrow controlled experiments alone.
            </p>
            <blockquote>
              I did not ask whether the switch worked. I demanded that the entire building turn on.
            </blockquote>
          </div>

          <div className={styles.heroVisual} aria-label="Outcome-first operational fuzzing model">
            <div className={styles.inputStack}>
              <span>Broad objective</span>
              <span>Live time pressure</span>
              <span>Parallel specialists</span>
              <span>Real artifact requirement</span>
              <span>Human correction</span>
              <span>Public deployment</span>
            </div>
            <ArrowDown className={styles.downArrow} size={30} />
            <div className={styles.failureCore}>
              <div className={styles.coreRing} />
              <strong>Failure surface</strong>
              <span>Integration • routing • continuity • authority • deployment</span>
            </div>
            <ArrowDown className={styles.downArrow} size={30} />
            <div className={styles.outputStrip}>
              <span>Observed failure</span>
              <span>Human correction</span>
              <span>Reusable operating rule</span>
            </div>
          </div>
        </section>

        <section className={styles.thesisBand}>
          <div>
            <span>Conventional optimization</span>
            <strong>Controlled attribution</strong>
          </div>
          <div className={styles.versus}>VS</div>
          <div>
            <span>NULLWORKS discovery mode</span>
            <strong>Whole-system motion</strong>
          </div>
        </section>

        <section className={styles.paperSection}>
          <Eyebrow>01 // What actually happened</Eyebrow>
          <h2>The method was accidental in intention, but not random in mechanism.</h2>
          <div className={styles.proseGrid}>
            <div>
              <p>
                Mason did not begin with a formal plan to maximize heterogeneous failure-state discovery. He began with a simpler demand: build the complete usable outcome as hard and fast as possible.
              </p>
              <p>
                The request was rarely limited to a prompt, component, or isolated feature. A single idea could expand immediately into research, writing, visual direction, software, deployment, public communication, mobile verification, debugging, and recovery.
              </p>
              <p>
                That behavior repeatedly created the same experimental condition: broad objectives, high pressure, parallel digital workers, real artifacts, live tool chains, human correction, and a requirement that the result actually exist outside the chat.
              </p>
            </div>
            <blockquote>
              Broad objective + live pressure + parallel specialists + real artifact + human correction + deployment = rapid failure-surface exposure.
            </blockquote>
          </div>
        </section>

        <section className={styles.darkSection}>
          <Eyebrow>02 // The outsider advantage</Eyebrow>
          <h2>Not knowing the customary boundaries increased the experimental surface.</h2>
          <p className={styles.sectionLead}>
            Conventional software practice often reduces uncertainty before integration. That is rational when production failure is expensive. It can also delay the discovery of coupled failures that only appear when the complete system is forced to operate.
          </p>
          <div className={styles.advantageGrid}>
            {advantages.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.outsiderRule}>
            <BrainCircuit size={25} />
            <p>
              The outsider advantage was not ignorance itself. It was the refusal to accept departmental boundaries as proof that the requested outcome had to remain fragmented.
            </p>
          </div>
        </section>

        <section className={styles.paperSection}>
          <Eyebrow>03 // Switch test versus operating test</Eyebrow>
          <h2>A controlled test asks whether the switch works. An operating test asks whether the building functions.</h2>
          <div className={styles.comparisonGrid}>
            <article>
              <div className={styles.cardIcon}><CheckCircle2 size={23} /></div>
              <h3>Controlled experiment</h3>
              <ul>
                <li>One or a few variables</li>
                <li>Strictly bounded conditions</li>
                <li>Clean pass/fail attribution</li>
                <li>Repeatable comparison</li>
                <li>Narrow failure target</li>
              </ul>
              <strong>Best for proving a mechanism.</strong>
            </article>
            <article>
              <div className={styles.cardIcon}><Network size={23} /></div>
              <h3>Outcome-first operating test</h3>
              <ul>
                <li>Many interacting subsystems</li>
                <li>Incomplete real-world specifications</li>
                <li>Live handoffs and tool chains</li>
                <li>Deployment and public verification</li>
                <li>Unknown failure combinations</li>
              </ul>
              <strong>Best for discovering the system.</strong>
            </article>
          </div>
        </section>

        <section className={styles.failureSection}>
          <Eyebrow>04 // What the pressure exposed</Eyebrow>
          <h2>The most valuable failures were rarely simple software bugs.</h2>
          <p className={styles.sectionLead}>
            They were organizational failures: technically valid components that could not move together under real operating pressure.
          </p>
          <div className={styles.failureGrid}>
            {failureClasses.map((failure, index) => (
              <div key={failure}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{failure}</p>
              </div>
            ))}
          </div>
          <blockquote className={styles.bigQuote}>
            A switch test can prove the switch works. It cannot prove the operator, wiring, power source, instructions, maintenance process, and building work together.
          </blockquote>
        </section>

        <section className={styles.paperSection}>
          <Eyebrow>05 // The correct sequence</Eyebrow>
          <h2>Wild first. Controlled second. Standardized third.</h2>
          <p className={styles.paperLead}>
            NULLWORKS should not replace disciplined testing with permanent chaos. The discovery mode and the proof mode serve different purposes and should occur in sequence.
          </p>
          <div className={styles.phaseGrid}>
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <article key={phase.number}>
                  <div className={styles.phaseTop}>
                    <span>{phase.number}</span>
                    <Icon size={24} />
                  </div>
                  <h3>{phase.title}</h3>
                  <strong>{phase.subtitle}</strong>
                  <p>{phase.body}</p>
                </article>
              );
            })}
          </div>
          <div className={styles.sequenceStrip}>
            <span>Expose the full failure surface</span>
            <b>→</b>
            <span>Reconstruct the important mechanism</span>
            <b>→</b>
            <span>Install the verified correction</span>
          </div>
        </section>

        <section className={styles.measurementSection}>
          <Eyebrow>06 // Better than agent-hours</Eyebrow>
          <h2>The true prize is operational discovery yield.</h2>
          <p className={styles.sectionLead}>
            Raw agent-hours can be inflated by duplication, idle workrooms, context rebuilding, abandoned attempts, and low-quality output. A better measure asks how many genuinely new and reusable lessons were acquired without destroying the operator.
          </p>
          <div className={styles.formula}>
            <span>Operational discovery yield</span>
            <strong>
              unique validated failure classes × reusable corrections × deployed outcomes
            </strong>
            <i>÷</i>
            <strong>wall-clock time × human coordination burden</strong>
          </div>
          <div className={styles.measureCards}>
            <article><Gauge size={22} /><h3>Novel failure classes</h3><p>Did the organization encounter a genuinely different operating condition?</p></article>
            <article><GitBranch size={22} /><h3>Reusable corrections</h3><p>Did the recovery change routing, memory, authority, standard work, or future decisions?</p></article>
            <article><Layers3 size={22} /><h3>Deployed outcomes</h3><p>Did the result reach a real user, system, repository, publication, or operating workflow?</p></article>
            <article><TimerReset size={22} /><h3>Operator cost</h3><p>How much human attention, continuity, correction, and nervous-system load did the discovery consume?</p></article>
          </div>
        </section>

        <section className={styles.paradoxSection}>
          <Eyebrow>07 // The compression paradox</Eyebrow>
          <h2>The method accelerated the company and overloaded the human at the same time.</h2>
          <div className={styles.paradoxGrid}>
            <article>
              <AlertTriangle size={25} />
              <h3>Before continuity offload</h3>
              <p>The human became the memory bus, status board, router, handoff tracker, exception handler, and unfinished-work database.</p>
            </article>
            <article>
              <ShieldCheck size={25} />
              <h3>After continuity offload</h3>
              <p>The system carries state, receipts, routing, and unfinished work while the human returns to direction, judgment, approval, and final authority.</p>
            </article>
          </div>
          <blockquote className={styles.bigQuote}>
            The human operator should direct compressed time—not personally absorb every intermediate state created by it.
          </blockquote>
        </section>

        <section className={styles.boundarySection}>
          <Eyebrow>08 // Credibility boundary</Eyebrow>
          <h2>This method is powerful for discovery. It is not proof by itself.</h2>
          <div className={styles.boundaryGrid}>
            <div>
              {boundaries.map((boundary) => (
                <p key={boundary}><AlertTriangle size={16} /> {boundary}</p>
              ))}
            </div>
            <blockquote>
              The field method generates the raw ore. Controlled reconstruction determines what is real. Standard work turns the verified lesson into company property.
            </blockquote>
          </div>
        </section>

        <section className={styles.conclusionSection}>
          <div className={styles.conclusionIcon}><Workflow size={30} /></div>
          <Eyebrow>09 // Serious conclusion</Eyebrow>
          <h2>The ignorance of conventional limits increased the failure surface. The telemetry obsession prevented the chaos from disappearing.</h2>
          <p>
            The result was not merely a pile of prototypes or a large number of agent-hours. It was a concentrated body of evidence about what breaks when one human tries to operate a rapidly expanding digital workforce across real work.
          </p>
          <p>
            That evidence exposed the central problem the OI SUITe exists to solve: the difficult part is not only making each digital worker capable. It is making the organization function while preventing the human from becoming its invisible continuity machine.
          </p>
          <div className={styles.finalRule}>
            <span>Demand the whole outcome.</span>
            <span>Preserve the failure.</span>
            <span>Reconstruct the mechanism.</span>
            <strong>Install the lesson.</strong>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>NULLWORKS // Outcome-First Operational Fuzzing</span>
          <strong>Human authority remains final.</strong>
        </footer>
      </div>
    </main>
  );
}
