import type { Metadata } from "next";
import {
  BulletGrid,
  FieldNoteShell,
  H2,
  Lead,
  P,
  Quote,
  TruthBox,
} from "../field-notes/_components/FieldNoteShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "7 Seconds to a Working AI Company | NULLWORKS",
  description:
    "A telemetrized experiment showing how a fresh AI workroom reached a governed operational floor in seven seconds through better organizational architecture—not a smarter model.",
};

const countableRuns = [
  { time: "12s", label: "Countable cold-schema run 01", note: "One schema initialization. One bundle read. Zero discovery." },
  { time: "19s", label: "Countable cold-schema run 02", note: "Same controlled path. Runtime variance remained visible." },
  { time: "8s", label: "Countable cold-schema run 03", note: "The optimized path beat the original 10-second target." },
  { time: "7s", label: "Bundle 2026-07-10.5 run 01", note: "First countable run after the mobile-output policy update." },
];

function ExperimentBoard() {
  return (
    <section className={styles.board} aria-labelledby="experiment-board-title">
      <div className={styles.boardHeader}>
        <div>
          <div className={styles.boardEyebrow}>Instrumented materialization experiment</div>
          <h3 id="experiment-board-title" className={styles.boardTitle}>From fresh thread to governed working floor</h3>
        </div>
        <div className={styles.boardBadge}>Human authority remains final</div>
      </div>

      <div className={styles.bigStatement}>
        <span>The model did not get smarter.</span>
        <strong>The organization got better.</strong>
      </div>

      <div className={styles.timeline}>
        <article className={`${styles.timelineCard} ${styles.baselineCard}`}>
          <div className={styles.timelineTag}>Baseline</div>
          <div className={styles.timelineTime}>52s</div>
          <h4>Four-file boot</h4>
          <p>Multiple serial reads before the governed floor was available.</p>
        </article>

        <article className={`${styles.timelineCard} ${styles.rejectedCard}`}>
          <div className={styles.timelineTag}>Rejected</div>
          <div className={styles.timelineTime}>66.178s</div>
          <h4>Discovery-path violation</h4>
          <p>The bundle loaded, but GitHub discovery occurred first. The result was preserved and excluded.</p>
        </article>

        <article className={`${styles.timelineCard} ${styles.rejectedCard}`}>
          <div className={styles.timelineTag}>Rejected</div>
          <div className={styles.timelineTime}>—</div>
          <h4>Clock receipt missing</h4>
          <p>The path was clean, but T0 and T1 were not instrumented. No time was invented.</p>
        </article>

        {countableRuns.map((run) => (
          <article key={run.label} className={`${styles.timelineCard} ${styles.countableCard}`}>
            <div className={styles.timelineTag}>Countable</div>
            <div className={styles.timelineTime}>{run.time}</div>
            <h4>{run.label}</h4>
            <p>{run.note}</p>
          </article>
        ))}
      </div>

      <div className={styles.flow} aria-label="Full Spectrum Clone controlled boot path">
        <div><span>01</span><strong>T0</strong><p>Trusted clock receipt</p></div>
        <b>→</b>
        <div><span>02</span><strong>Schema</strong><p>Only when required</p></div>
        <b>→</b>
        <div><span>03</span><strong>One bundle</strong><p>Exact governed read</p></div>
        <b>→</b>
        <div><span>04</span><strong>T1</strong><p>Immediate second clock</p></div>
        <b>→</b>
        <div><span>05</span><strong>Work</strong><p>Scope loads after floor</p></div>
      </div>
    </section>
  );
}

function EvidenceTable() {
  return (
    <div className={styles.evidenceTable}>
      <div className={styles.evidenceRow}>
        <span>Original controlled path</span>
        <strong>52 seconds</strong>
      </div>
      <div className={styles.evidenceRow}>
        <span>Best countable cold-schema path</span>
        <strong>7 seconds</strong>
      </div>
      <div className={styles.evidenceRow}>
        <span>Time removed</span>
        <strong>45 seconds</strong>
      </div>
      <div className={styles.evidenceRow}>
        <span>Reduction</span>
        <strong>86.5%</strong>
      </div>
      <div className={styles.evidenceRow}>
        <span>Corporate WiFi calls</span>
        <strong>0</strong>
      </div>
      <div className={styles.evidenceRow}>
        <span>Repository discovery calls</span>
        <strong>0</strong>
      </div>
      <div className={styles.evidenceRow}>
        <span>Pre-floor content reads</span>
        <strong>1</strong>
      </div>
    </div>
  );
}

function OrganizationComparison() {
  return (
    <section className={styles.comparison} aria-labelledby="comparison-title">
      <div className={styles.comparisonHeader}>
        <div className={styles.boardEyebrow}>Capability versus organization</div>
        <h3 id="comparison-title">What changed—and what did not</h3>
      </div>

      <div className={styles.comparisonGrid}>
        <article className={styles.sameColumn}>
          <div className={styles.columnLabel}>Stayed essentially the same</div>
          <ul>
            <li>The underlying frontier-model class</li>
            <li>The human operator and objective</li>
            <li>The GitHub system of record</li>
            <li>The need for authority and evidence</li>
          </ul>
        </article>

        <article className={styles.changedColumn}>
          <div className={styles.columnLabel}>Changed deliberately</div>
          <ul>
            <li>Serial reads became one governed bundle</li>
            <li>Known-broken live coordination left the critical path</li>
            <li>Repository discovery became prohibited</li>
            <li>T0 and T1 became literal trusted tool calls</li>
            <li>Invalid runs were rejected instead of averaged</li>
            <li>Cold and warm connector states were separated</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default function FullSpectrumClonePage() {
  return (
    <FieldNoteShell
      number={7}
      standalone
      standaloneLabel="Live operational experiment"
      eyebrow="AI workrooms // telemetry // organizational architecture"
      title="7 Seconds to a Working AI Company"
      deck="A fresh ChatGPT thread reached a governed NULLWORKS operating floor in seven instrumented seconds. The breakthrough was not a smarter model. It was better organization."
      source={{
        label: "View the NULLWORKS Hive repository",
        href: "https://github.com/masoncalcolsol-creator/nullworks-corporate-wifi-hive",
      }}
    >
      <Lead>
        I wanted to know how quickly a brand-new AI workroom could become operational without asking the human to rebuild context manually. Not merely “remember the vibe.” Load authority, identity, doctrine, project state, blockers, truth boundaries, and the exact next action—then prove how long it took.
      </Lead>

      <Quote>
        This was not a model benchmark. It was an organizational benchmark.
      </Quote>

      <H2>What “cloning” means here</H2>

      <P>
        A FULL SPECTRUM CLONE is not a copy of consciousness, personality, or model weights. It is the controlled rehydration of a bounded AI workroom from a governed operating packet. The new thread receives the current organizational floor, preserves Human Authority, and loads additional project detail only after readiness is declared.
      </P>

      <P>
        The experiment measured the time from the first trusted clock receipt, T0, to the moment the complete governed floor had been loaded and parsed, T1. Every connector initialization, repository read, and failure remained inside the stopwatch.
      </P>

      <ExperimentBoard />

      <H2>Telemetry changed the behavior of the experiment</H2>

      <P>
        The first attempt looked successful but was not countable because the thread had already touched context before the stopwatch began. The next attempt loaded the right bundle but performed discovery reads first. Another used the correct path but failed to create trusted clock receipts. Each failure produced a more precise protocol.
      </P>

      <BulletGrid
        items={[
          {
            title: "No fake T0",
            body: "The first executable action became a trusted clock call. A late or inferred timestamp automatically made the run non-countable.",
          },
          {
            title: "One governed read",
            body: "Four serial pre-floor files were compressed into one current bundle containing the authority floor and broad project map.",
          },
          {
            title: "No discovery tax",
            body: "The exact repository and file path were known in advance. Searching for either before T1 invalidated the optimized race.",
          },
          {
            title: "Failure stayed useful",
            body: "Rejected runs were preserved as receipts. They improved the system without contaminating the valid performance average.",
          },
          {
            title: "Connector states separated",
            body: "Cold-schema and warm-schema runs became different populations instead of being mixed into one misleading number.",
          },
          {
            title: "Known 502 removed",
            body: "Corporate WiFi was prohibited from clone boot. GitHub remained the durable source of truth and live coordination stopped blocking readiness.",
          },
        ]}
      />

      <H2>The measured result</H2>

      <EvidenceTable />

      <TruthBox title="Measurement boundary">
        The seven-second result is the first countable COLD_SCHEMA run for bundle version 2026-07-10.5. It includes one permitted tool-schema initialization, zero repository-discovery calls, one exact bundle read, and zero Corporate WiFi calls. More matching runs are required before treating seven seconds as a stable population average.
      </TruthBox>

      <H2>Why this is about organization—not smarter AI</H2>

      <P>
        Nothing magical happened to the model between the slower and faster runs. The work became faster because the surrounding organization removed ambiguity and unnecessary motion. The system knew where the truth lived, what had to load, what must not be touched, how readiness would be proven, and which failures were allowed into the benchmark.
      </P>

      <OrganizationComparison />

      <P>
        This is the same distinction organizations face at larger scale. Buying a more capable model may increase the potential of the worker. It does not automatically create role boundaries, source evidence, authority controls, continuity, handoffs, review gates, telemetry, or a defensible definition of “done.”
      </P>

      <Quote>
        Smarter AI creates capability. Better organization converts capability into dependable work.
      </Quote>

      <H2>The organizational pattern</H2>

      <BulletGrid
        items={[
          {
            title: "The model is a worker",
            body: "It may be extraordinarily capable, but capability alone does not define ownership, authority, evidence, or completion.",
          },
          {
            title: "The bundle is standard work",
            body: "One governed packet supplies the current operating floor instead of forcing each worker to reconstruct the company from scattered history.",
          },
          {
            title: "Telemetry is management sight",
            body: "T0, T1, action counts, connector state, and rejection classes make the production process observable rather than anecdotal.",
          },
          {
            title: "The human remains authority",
            body: "The workroom can load, investigate, organize, draft, and build. The accountable human still defines intent and approves consequential action.",
          },
        ]}
      />

      <H2>The larger question</H2>

      <P>
        How are organizations cloning or rehydrating AI agents today? Are they copying prompts manually? Maintaining giant context documents? Relying on vendor memory? Rebuilding project state in every new conversation? And how do they know whether the clone is current, complete, authorized, or measurably ready to work?
      </P>

      <P>
        The seven-second number is useful, but the deeper result is the controlled path beneath it: one governed source, explicit authority, exact initialization, honest telemetry, preserved failures, and no unsupported finish line.
      </P>

      <Quote>
        The next generation of AI advantage may come less from finding a smarter worker—and more from building a better company around the workers we already have.
      </Quote>
    </FieldNoteShell>
  );
}
