import type { Metadata } from "next";
import {
  Activity,
  BrainCircuit,
  Clock3,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Operational Relativity | NULLWORKS",
  description:
    "The Digital Time Travel Hypothesis: how work compression, telemetry, and continuity offload let a digital organization accumulate experience faster than calendar time without surrendering human authority.",
  robots: {
    index: false,
    follow: false,
  },
};

const theoryStack = [
  {
    icon: Layers3,
    title: "Work compression",
    body: "Parallel specialists, reusable context, faster routing, and narrower work cells increase the number and scope of bounded attempts inside one calendar window.",
  },
  {
    icon: Activity,
    title: "Telemetry density",
    body: "Intent, evidence, failures, corrections, approvals, and outcomes are preserved so activity can become reusable organizational experience.",
  },
  {
    icon: BrainCircuit,
    title: "Continuity offload",
    body: "Memory, state, routing, handoffs, and unfinished work move out of the operator's head and into the operating layer.",
  },
  {
    icon: UserRoundCheck,
    title: "Human authority",
    body: "The system can accelerate work and learning without accelerating permission. The human retains intent, judgment, approval, and stop-the-line authority.",
  },
];

const telemetryEvents = [
  "Sourced decision",
  "Completed handoff",
  "Blocked state",
  "Tool failure",
  "Human correction",
  "Rejected approach",
  "Verified deployment",
  "Authority escalation",
  "Reusable lesson",
  "Measured outcome",
];

const predictions = [
  "Parallel specialist systems should accumulate more operational events per calendar week than serial workflows.",
  "Teams that preserve failure-and-correction receipts should repeat the same failures less often.",
  "Source-linked telemetry should improve specialist performance faster than final-output archives alone.",
  "Agent count will eventually produce diminishing returns when routing, reconciliation, and review overload the operator.",
  "The strongest gains should come from increasing useful experience while reducing continuity tax and coordination overhead.",
];

const fieldReceipt = [
  ["01", "Concept", "Turned a workplace observation into the Da Vinci-versus-Toyota operating thesis."],
  ["02", "Write", "Drafted the long-form argument, measurement boundaries, and public-safe claims."],
  ["03", "Render", "Directed cinematic visuals, infographics, and specialist revisions through Mr Smith."],
  ["04", "Publish", "Built the LinkedIn package, alt text, comments, and public distribution copy."],
  ["05", "Deploy", "Created the landing page, committed through GitHub, and deployed through Vercel."],
  ["06", "Recover", "Preserved blocked writes, stale builds, 404s, weak visuals, corrections, and final verification."],
];

function Metric({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className={styles.metric}>
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{note}</small>
    </div>
  );
}

function SectionTitle({ eyebrow, title, deck }: { eyebrow: string; title: string; deck?: string }) {
  return (
    <div className={styles.sectionHeading}>
      <div className={styles.sectionEyebrow}>{eyebrow}</div>
      <h2>{title}</h2>
      {deck ? <p>{deck}</p> : null}
    </div>
  );
}

export default function OperationalRelativityPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brandLockup}>
            <div className={styles.brandMark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS // OI SUITe theory lab</div>
              <div className={styles.brandName}>Operational Intelligence</div>
            </div>
          </div>
          <div className={styles.unlisted}>Unlisted field note</div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}>
              <TimerReset size={16} /> The Digital Time Travel Hypothesis
            </div>
            <h1>Operational Relativity</h1>
            <p className={styles.heroDeck}>
              How work compression, telemetry, and continuity offload let a digital organization age faster than the calendar—without crushing the human operator.
            </p>
            <div className={styles.heroStatement}>
              <span>Calendar time measures existence.</span>
              <strong>Telemetry measures experience.</strong>
            </div>
            <nav className={styles.heroNav} aria-label="Page sections">
              <a href="#two-clocks">Two clocks</a>
              <a href="#continuity-tax">Continuity tax</a>
              <a href="#measurement">Measurement</a>
              <a href="#field-receipt">Field receipt</a>
            </nav>
          </div>

          <div className={styles.heroVisual} aria-label="Operational relativity two-clock model">
            <div className={styles.clockField}>
              <div className={`${styles.clock} ${styles.wallClock}`}>
                <span className={styles.clockLabel}>Wall clock</span>
                <strong>T<sub>w</sub></strong>
                <small>Elapsed calendar time</small>
                <i className={styles.handOne} />
                <i className={styles.handTwo} />
              </div>
              <div className={`${styles.clock} ${styles.operationalClock}`}>
                <span className={styles.clockLabel}>Operational clock</span>
                <strong>T<sub>o</sub></strong>
                <small>Validated experience</small>
                <i className={styles.handOne} />
                <i className={styles.handTwo} />
              </div>
              <div className={styles.operatorCore}>
                <div className={styles.coreRing} />
                <span>OI</span>
                <strong>Human operator</strong>
                <small>Intent • judgment • final authority</small>
              </div>
            </div>
            <div className={styles.visualFormula}>
              <span>Operational compression ratio</span>
              <strong>C = T<sub>o</sub> ÷ T<sub>w</sub></strong>
              <small>Conceptual measurement model—not a law of physics</small>
            </div>
          </div>
        </section>

        <section className={styles.metricBand} aria-label="NULLWORKS operating context">
          <Metric value="12" label="company days" note="Day 12 field theory" />
          <Metric value="65+" label="specialists" note="working inventory" />
          <Metric value="800+" label="workrooms" note="operational environments" />
          <Metric value="119+" label="failure receipts" note="recovered floor" />
        </section>

        <section id="two-clocks" className={styles.paperSection}>
          <SectionTitle
            eyebrow="01 // The premise"
            title="A digital organization can operate on more than one clock."
            deck="One clock measures elapsed time. The other measures the amount of validated work, failure, correction, and learning accumulated inside that time."
          />
          <div className={styles.proseColumns}>
            <div>
              <p>
                One human receives twenty-four chronological hours each day. A coordinated digital workforce can perform many bounded activities during those same hours. Ten digital workers operating for eight active hours can produce eighty aggregate worker-hours inside one calendar day. Twenty workers can produce 160.
              </p>
              <p>
                This does not mean the organization created an equal number of expert human hours. It means the system traversed a larger volume of operational states than one serial human could personally experience during the same calendar window.
              </p>
            </div>
            <blockquote>
              An instrumented digital organization can accumulate validated operational experience faster than calendar time passes for its human operator.
            </blockquote>
          </div>
          <div className={styles.equationPanel}>
            <div>
              <span>Wall-clock time</span>
              <strong>T<sub>w</sub> = elapsed chronological time</strong>
            </div>
            <div>
              <span>Operational experience time</span>
              <strong>T<sub>o</sub> = accumulated validated experience</strong>
            </div>
          </div>
        </section>

        <section className={styles.darkSection}>
          <SectionTitle
            eyebrow="02 // Theory stack"
            title="Compression creates attempts. Telemetry creates experience."
            deck="The theory only works when four systems operate together."
          />
          <div className={styles.theoryGrid}>
            {theoryStack.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={styles.theoryCard}>
                  <div className={styles.iconBox}><Icon size={23} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
          <div className={styles.thesisStrip}>
            <span>Compression without telemetry creates speed.</span>
            <span>Telemetry without compression creates history.</span>
            <strong>Compression plus telemetry creates accelerated organizational experience.</strong>
          </div>
        </section>

        <section className={styles.paperSection}>
          <SectionTitle
            eyebrow="03 // Digital time travel"
            title="The company does not travel into the future. It pulls future lessons forward."
          />
          <div className={styles.proseWide}>
            <p>
              More bounded attempts expose more edge cases. More observable failures reveal hidden dependencies, missing sources, authority gaps, weak handoffs, stale deployments, and false completion. When the exact correction is preserved, later work can begin from the recovered lesson instead of rediscovering it from zero.
            </p>
            <p>
              Lessons that might normally be separated by months or years can therefore be encountered, corrected, verified, and reused within weeks. The organization becomes operationally older than its calendar age—not because physical time changed, but because experience stopped disappearing.
            </p>
          </div>
          <div className={styles.timeTravelDiagram}>
            <div><span>More bounded attempts</span><b>01</b></div>
            <i>→</i>
            <div><span>More observed failures</span><b>02</b></div>
            <i>→</i>
            <div><span>More preserved corrections</span><b>03</b></div>
            <i>→</i>
            <div><span>Earlier reusable lessons</span><b>04</b></div>
          </div>
        </section>

        <section id="continuity-tax" className={styles.continuitySection}>
          <div className={styles.continuityIntro}>
            <div className={styles.sectionEyebrow}>04 // The missing human-side law</div>
            <h2>The operator can be crushed by the same compression that accelerates the company.</h2>
            <p>
              Parallel work produces more decisions, handoffs, unfinished loops, corrections, exceptions, and context switches per hour. If the human remains the continuity agent, the digital workforce becomes faster while the person becomes more burdened.
            </p>
          </div>

          <div className={styles.continuityModel}>
            <article className={styles.overloadCard}>
              <div className={styles.cardTopline}><Gauge size={19} /> Before continuity offload</div>
              <h3>Compression creates operator overload.</h3>
              <ul>
                <li>The human is the memory bus.</li>
                <li>The human tracks every unfinished state.</li>
                <li>The human manually routes every handoff.</li>
                <li>The human absorbs every exception.</li>
              </ul>
              <div className={styles.formulaDanger}>Useful work − continuity tax − review burden</div>
            </article>

            <div className={styles.thresholdCore}>
              <span>Operator relief threshold</span>
              <strong>Continuity moves into the system</strong>
              <small>Memory • routing • state • receipts • unfinished work</small>
            </div>

            <article className={styles.leverageCard}>
              <div className={styles.cardTopline}><Sparkles size={19} /> After continuity offload</div>
              <h3>Compression becomes human leverage.</h3>
              <ul>
                <li>The human sets direction.</li>
                <li>The system preserves company state.</li>
                <li>The human reviews evidence and risk.</li>
                <li>The human approves consequential action.</li>
              </ul>
              <div className={styles.formulaGood}>Useful work + preserved learning − coordination waste</div>
            </article>
          </div>

          <blockquote className={styles.bigQuote}>
            The goal is not to make the human experience more work per hour. It is to let the organization experience more work per hour while the human remains focused on judgment.
          </blockquote>
        </section>

        <section id="measurement" className={styles.measurementSection}>
          <SectionTitle
            eyebrow="05 // Measurement discipline"
            title="Activity is not experience, and runtime is not human-equivalent labor."
            deck="The theory becomes credible only when aggregate activity is separated from validated learning and deployed value."
          />
          <div className={styles.formulaBlock}>
            <span>Effective operational time</span>
            <strong>
              T<sub>o</sub> = Σ(activity × verification × novelty × reuse) − duplication − coordination overhead
            </strong>
            <small>Proposed NULLWORKS operating model</small>
          </div>
          <div className={styles.measureGrid}>
            <article>
              <Database size={22} />
              <h3>Telemetry density</h3>
              <p>Validated operational events divided by wall-clock time.</p>
              <div className={styles.eventCloud}>
                {telemetryEvents.map((event) => <span key={event}>{event}</span>)}
              </div>
            </article>
            <article>
              <Workflow size={22} />
              <h3>Audit dashboard</h3>
              <p>A serious claim should separate wall-clock days, agent runtime, unique task cycles, human interventions, verified outputs, duplication, reuse, and downstream value.</p>
              <div className={styles.auditList}>
                <span>Wall-clock days</span>
                <span>Active agent-hours</span>
                <span>Unique task cycles</span>
                <span>Failure/correction pairs</span>
                <span>Human intervention minutes</span>
                <span>Verified deployments</span>
              </div>
            </article>
          </div>
          <div className={styles.truthBoundary}>
            <ShieldCheck size={22} />
            <div>
              <strong>Truth boundary</strong>
              <p>
                “Thousands of aggregate digital activity hours” is not the same claim as “thousands of expert human labor hours.” The public model must show what was active, unique, verified, reused, duplicated, corrected, and actually deployed.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.paperSection}>
          <SectionTitle
            eyebrow="06 // Established neighbors"
            title="The theory is new mainly in its combination."
            deck="Operational Relativity sits beside several established engineering and learning ideas without pretending to be a law of physics."
          />
          <div className={styles.neighborGrid}>
            <article><Clock3 size={21} /><h3>Parallel computing</h3><p>More workers can expand the achievable problem, while sequential dependencies and final approval still limit total speed.</p></article>
            <article><Gauge size={21} /><h3>Accelerated testing</h3><p>More controlled operating cycles can expose failure information sooner, provided the conditions still represent real work.</p></article>
            <article><GitBranch size={21} /><h3>Experience replay</h3><p>Previous corrections become more valuable when they can be retrieved and applied instead of forgotten inside old conversations.</p></article>
            <article><Network size={21} /><h3>Digital twins</h3><p>Visible models of ownership, authority, sources, work state, and failure make organizational behavior easier to test and improve.</p></article>
          </div>
        </section>

        <section className={styles.predictionSection}>
          <SectionTitle
            eyebrow="07 // Falsifiable predictions"
            title="A serious theory should be capable of being wrong."
          />
          <div className={styles.predictionList}>
            {predictions.map((prediction, index) => (
              <div key={prediction}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{prediction}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="field-receipt" className={styles.fieldReceiptSection}>
          <SectionTitle
            eyebrow="08 // Day 12 field receipt"
            title="The Da Vinci or Toyota campaign became its own proof of operation."
            deck="The system did not merely describe a coordinated digital factory. It used the factory to publish the factory."
          />
          <div className={styles.receiptGrid}>
            {fieldReceipt.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className={styles.receiptFooter}>
            <div>
              <strong>Mobile operating environment</strong>
              <p>Concept, art direction, code, deployment, verification, and recovery were coordinated from Mason's phone under intermittent canyon connectivity.</p>
            </div>
            <div>
              <strong>Human authority remained final</strong>
              <p>Mason set intent, selected claims, approved imagery, corrected failures, and authorized consequential repository and deployment changes.</p>
            </div>
          </div>
        </section>

        <section className={styles.authoritySection}>
          <div className={styles.authorityIcon}><ShieldCheck size={30} /></div>
          <div>
            <div className={styles.sectionEyebrow}>09 // Authority boundary</div>
            <h2>Operational acceleration must not become authority acceleration.</h2>
            <p>
              The OI SUITe should compress the work surrounding judgment—not erase judgment. AI may investigate, retrieve, compare, draft, test, route, and recommend. The accountable human retains values, risk tolerance, approval, conflict resolution, final interpretation, and stop-the-line authority.
            </p>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className={styles.finalEyebrow}>NULLWORKS // Operational Relativity</div>
          <h2>The human operator should direct compressed time—not be crushed by it.</h2>
          <p>
            The calendar measures how long the company has existed. Telemetry measures how much it has survived, corrected, verified, and learned. Continuity offload determines whether that acceleration becomes leverage for the operator or another form of overload.
          </p>
          <div className={styles.finalRule}>
            <span>Compress the work.</span>
            <span>Preserve the lesson.</span>
            <strong>Return the human to judgment.</strong>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>NULLWORKS // OI SUITe</span>
          <strong>Human authority remains final.</strong>
        </footer>
      </div>
    </main>
  );
}
