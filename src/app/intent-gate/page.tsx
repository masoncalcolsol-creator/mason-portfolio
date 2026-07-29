import type { Metadata } from "next";
import {
  ArrowRight,
  GitBranch,
  Mail,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import styles from "./intent-gate.module.css";

export const metadata: Metadata = {
  title: "Intent Integrity Gate",
  description:
    "A human-authority checkpoint that catches language drift, tool-selection errors, deliverable substitution, and false finish lines before AI work escapes into production.",
  openGraph: {
    title: "Intent Integrity Gate | NULLWORKS",
    description:
      "Reconcile what the human meant, what the machine heard, and what the system is about to deliver.",
    type: "website",
    url: "/intent-gate",
  },
};

const workflow = [
  {
    number: "01",
    title: "Preserve the request",
    body: "Keep the human’s source language intact, including shorthand, speech-to-text errors, and uncertain terms.",
  },
  {
    number: "02",
    title: "Name the real deliverable",
    body: "Separate the primary outcome from supporting components, visual references, and tool-triggering words.",
  },
  {
    number: "03",
    title: "Reconcile context",
    body: "Compare new wording against canonical vocabulary, prior decisions, project state, and known authority boundaries.",
  },
  {
    number: "04",
    title: "Gate the ambiguity",
    body: "Silently correct high-confidence slips. Ask one narrow question only when the difference changes the work.",
  },
  {
    number: "05",
    title: "Match tool to outcome",
    body: "Block any tool whose output class cannot create the requested artifact, action, or deployed state.",
  },
  {
    number: "06",
    title: "Verify before completion",
    body: "Compare the actual result to the original request before the machine is allowed to claim success.",
  },
];

const controls = [
  [
    "Canonical term reconciliation",
    "Catches near-homophones, misspellings, stale labels, and accidental new entities before they become durable system language.",
  ],
  [
    "Deliverable hierarchy",
    "Keeps the requested end state in control when prompts also mention renders, diagrams, screenshots, mockups, or infographics.",
  ],
  [
    "Tool-output compatibility",
    "Checks whether the selected tool can produce the required modality: website, document, action, code, image, or deployment.",
  ],
  [
    "Human authority micro-gate",
    "Escalates only consequential ambiguity, with a single concrete confirmation instead of a broad restart of the workflow.",
  ],
  [
    "Recursive completion check",
    "Prevents a representation of the work from being reported as the work itself.",
  ],
  [
    "Drift telemetry",
    "Preserves what was heard, what was corrected, why the correction was made, and whether the intervention changed the outcome.",
  ],
];

export default function IntentGatePage() {
  return (
    <main className={styles.page}>
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand} aria-label="NULLWORKS home">
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS</strong>
              <small>Intent Integrity Gate</small>
            </span>
          </a>
          <nav className={styles.nav} aria-label="Page navigation">
            <a href="#workflow">Workflow</a>
            <a href="#controls">Controls</a>
            <a href="#pilot" className={styles.navCta}>Pilot the gate</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <ShieldCheck size={16} /> HUMAN-AUTHORITY CHECKPOINT FOR AI EXECUTION
            </div>
            <h1>
              Catch the tiny language error
              <span> before it becomes a system decision.</span>
            </h1>
            <p className={styles.heroLead}>
              The Intent Integrity Gate reconciles what the human meant, what the machine heard,
              and what the system is about to deliver—before a typo becomes doctrine, a mockup
              becomes a fake deployment, or a convincing artifact becomes a false finish line.
            </p>
            <div className={styles.heroActions}>
              <a href="#workflow" className={styles.primaryButton}>
                See the workflow <ArrowRight size={17} />
              </a>
              <a
                href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Intent%20Integrity%20Gate%20Pilot"
                className={styles.secondaryButton}
              >
                <Mail size={17} /> Start a pilot
              </a>
            </div>
            <div className={styles.truthStrip}>
              <span>Human authority remains final.</span>
              <span>A representation is not the deliverable.</span>
              <span>No receipt, no completion.</span>
            </div>
          </div>

          <div className={styles.heroPanel} aria-label="Intent Integrity Gate live decision example">
            <div className={styles.panelTopline}>
              <span><Workflow size={15} /> LIVE INTENT CHECK</span>
              <span className={styles.statusDot}>GATE ACTIVE</span>
            </div>

            <div className={styles.signalBlock}>
              <span className={styles.signalLabel}>Human request</span>
              <p>“Build and deploy a live landing page. Include a custom infographic.”</p>
            </div>

            <div className={styles.parseGrid}>
              <div>
                <span>PRIMARY DELIVERABLE</span>
                <strong>Live deployed website</strong>
              </div>
              <div>
                <span>EMBEDDED COMPONENT</span>
                <strong>Custom infographic</strong>
              </div>
            </div>

            <div className={styles.blockedRow}>
              <span className={styles.blockedIcon}>×</span>
              <div>
                <small>BLOCKED SUBSTITUTION</small>
                <strong>PNG that only looks like a landing page</strong>
              </div>
            </div>

            <div className={styles.allowedRow}>
              <span className={styles.allowedIcon}>✓</span>
              <div>
                <small>AUTHORIZED OUTPUT</small>
                <strong>Functional URL with infographic inside the page</strong>
              </div>
            </div>

            <div className={styles.panelReceipt}>
              <span>DECISION</span>
              <strong>TOOL + OUTPUT CLASS MATCH</strong>
            </div>
          </div>
        </section>

        <section className={styles.problemBand}>
          <div>
            <span className={styles.sectionKicker}>THE FAILURE PATTERN</span>
            <h2>The machine can be locally correct and globally wrong.</h2>
          </div>
          <p>
            AI systems often grab the most salient noun, nearest familiar label, or easiest tool
            trigger. The output can look polished while silently changing the requested outcome.
            The gate restores sentence hierarchy, project context, and human authority before execution.
          </p>
        </section>

        <section id="workflow" className={styles.workflowSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>CUSTOM WORKFLOW INFOGRAPHIC</span>
            <h2>One recursive loop before execution. One more before completion.</h2>
            <p>
              The infographic below is part of this live page—not a static image standing in for it.
            </p>
          </div>

          <div className={styles.flowDiagram}>
            {workflow.map((step, index) => (
              <article className={styles.flowCard} key={step.number}>
                <div className={styles.flowNumber}>{step.number}</div>
                <div className={styles.flowContent}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className={styles.flowConnector} aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className={styles.recursiveRail}>
            <div className={styles.railStart}>
              <GitBranch size={20} />
              <span>PRE-EXECUTION</span>
            </div>
            <div className={styles.railLine} />
            <div className={styles.railLoop}>
              <span>EXECUTE</span>
            </div>
            <div className={styles.railLine} />
            <div className={styles.railEnd}>
              <ShieldCheck size={20} />
              <span>POST-EXECUTION</span>
            </div>
          </div>
        </section>

        <section className={styles.examplesSection}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleTopline}>
              <span>LEXICAL DRIFT</span>
              <strong>High brain → Hive Brain</strong>
            </div>
            <div className={styles.exampleBody}>
              <div>
                <small>HEARD</small>
                <p>“Update the high brain.”</p>
              </div>
              <div className={styles.exampleArrow}>→</div>
              <div>
                <small>RECONCILED</small>
                <p>Canonical project term: Hive Brain.</p>
              </div>
            </div>
            <footer>High confidence: correct silently and preserve the source receipt.</footer>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.exampleTopline}>
              <span>MODALITY DRIFT</span>
              <strong>Website request → Page-shaped PNG</strong>
            </div>
            <div className={styles.exampleBody}>
              <div>
                <small>REQUESTED</small>
                <p>Live page with an infographic.</p>
              </div>
              <div className={styles.exampleArrow}>→</div>
              <div>
                <small>GATED</small>
                <p>Build the site; embed the visual.</p>
              </div>
            </div>
            <footer>Output mismatch: block image generation as the final deliverable.</footer>
          </div>
        </section>

        <section id="controls" className={styles.controlsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>WHAT THE GATE CONTROLS</span>
            <h2>Small intervention. Large reduction in downstream drift.</h2>
          </div>
          <div className={styles.controlGrid}>
            {controls.map(([title, body], index) => (
              <article className={styles.controlCard} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.decisionSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>HUMAN AUTHORITY WITHOUT HUMAN BOTTLENECK</span>
            <h2>The gate asks only when the answer changes the work.</h2>
          </div>
          <div className={styles.decisionGrid}>
            <article>
              <span className={styles.confidenceHigh}>HIGH CONFIDENCE</span>
              <h3>Reconcile automatically</h3>
              <p>Established term, obvious homophone, no material change in scope or consequence.</p>
            </article>
            <article>
              <span className={styles.confidenceMedium}>MATERIAL AMBIGUITY</span>
              <h3>Ask one narrow question</h3>
              <p>Two plausible meanings would produce different artifacts, actions, costs, or risks.</p>
            </article>
            <article>
              <span className={styles.confidenceStop}>OUTPUT CONFLICT</span>
              <h3>Stop the tool call</h3>
              <p>The selected tool cannot create the requested end state or would cross an authority boundary.</p>
            </article>
          </div>
        </section>

        <section id="pilot" className={styles.ctaSection}>
          <div>
            <span className={styles.sectionKicker}>START WITH ONE REAL FAILURE</span>
            <h2>Install the gate where intent is currently leaking.</h2>
            <p>
              Begin with one consequential workflow: customer intake, document production,
              deployment, maintenance, approvals, evidence handling, or agent orchestration.
              Map the drift, add the smallest defensible gate, and measure what stops escaping.
            </p>
          </div>
          <a
            href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Intent%20Integrity%20Gate%20Pilot&body=Workflow%20to%20inspect%3A%0AWhere%20intent%20currently%20drifts%3A%0AConsequence%20owner%3A"
            className={styles.ctaButton}
          >
            <Mail size={18} /> Request a workflow pilot <ArrowRight size={18} />
          </a>
        </section>

        <footer className={styles.footer}>
          <a href="/" className={styles.footerBrand}>NULLWORKS</a>
          <p>Intent Integrity Gate · Human authority remains final.</p>
          <a href="/operating-map">Open operating map <ArrowRight size={14} /></a>
        </footer>
      </div>
    </main>
  );
}
