import styles from "./page.module.css";

export const metadata = {
  title: "TAC OPS // Workflow Redesign",
  description:
    "TAC OPS reframes damaged-label recovery as infrastructure redesign: restore machine-readable identity, recover telemetry, and hold the workflow accountable.",
};

const steps = [
  {
    n: "01",
    title: "See the break",
    body:
      "Damaged labels, weak print, no-read barcodes, hidden queues, and ghost scans are not edge annoyances. They are places where the workflow loses visibility.",
  },
  {
    n: "02",
    title: "Redesign the flow",
    body:
      "TAC OPS moves recovery upstream. It gives the operator a defined recovery path instead of waiting for downstream manual exception handling.",
  },
  {
    n: "03",
    title: "Deploy the kit",
    body:
      "Mobile scanner workflow, OCR, human verification, label printer, and helper label become one compact operating cell at the edge of the process.",
  },
  {
    n: "04",
    title: "Restore telemetry",
    body:
      "The goal is not only to save a parcel. It is to restore machine-readable identity, scan continuity, destination certainty, and process visibility.",
  },
  {
    n: "05",
    title: "Hold accountable",
    body:
      "Once the recovery path exists, the operation can measure failure mode, recovery time, recurrence, handoffs avoided, and downstream burden reduced.",
  },
];

const metrics = [
  "Unreadable-label exception rate",
  "Time from detection to recovered barcode",
  "Human verification count and confidence",
  "Failure mode recurrence by source",
  "Downstream manual handling avoided",
  "Packages returned to automated flow",
  "Tracking continuity restored",
  "Rework, delay, and customer visibility risk reduced",
];

export default function TacOpsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>NULLWORKS // TAC OPS / MORK</p>
          <h1>Workflow redesign, deployed.</h1>
          <p className={styles.lede}>
            TAC OPS is a field-proven recovery pattern for damaged logistics workflows:
            restore machine-readable identity, bring humans into the right verification gate,
            and create telemetry the operation was not measuring before.
          </p>

          <div className={styles.heroGrid}>
            <article className={styles.quoteCard}>
              <span>Core idea</span>
              <strong>
                The value is not just the machine. It is the operating design around the machine.
              </strong>
              <p>
                Fresh logistics makes that obvious because the clock is unforgiving. If the
                workflow is wrong, quality loss, rework, and invisible exceptions show up fast.
              </p>
            </article>
            <article className={styles.statusCard}>
              <span>Status</span>
              <strong>Field prototype validated</strong>
              <p>Real labels. Real printer. Real packages. Real recovery path.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.strip} aria-label="TAC OPS flow">
        <div>Broken label / unreadable package</div>
        <b>→</b>
        <div>OCR + candidate extraction</div>
        <b>→</b>
        <div>Human verifies</div>
        <b>→</b>
        <div>Helper label printed</div>
        <b>→</b>
        <div>Package re-enters flow</div>
        <b>→</b>
        <div>Tracking + telemetry restored</div>
      </section>

      <section className={styles.shell}>
        <div className={styles.sectionHeader}>
          <span>Infrastructure redesign</span>
          <h2>From broken exception handling to accountable recovery flow.</h2>
        </div>
        <div className={styles.stepGrid}>
          {steps.map((step) => (
            <article className={styles.stepCard} key={step.n}>
              <div className={styles.stepNumber}>{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeader}>
            <span>Field proof</span>
            <h2>The kit is small because the workflow is the product.</h2>
          </div>
          <div className={styles.evidenceGrid}>
            <article className={styles.evidenceCard}>
              <div className={styles.visual}>KIT</div>
              <h3>Deployed kit</h3>
              <p>
                Rugged case, Android field phone, Brother QL-820NWB printer, label media,
                and a recovery workflow built for daily operational pressure.
              </p>
            </article>
            <article className={styles.evidenceCard}>
              <div className={styles.visual}>PRINT</div>
              <h3>Verification / print loop</h3>
              <p>
                The operator captures the damaged label, verifies the recovered tracking identity,
                and prints a clean helper label without turning the worker into the patch.
              </p>
            </article>
            <article className={styles.evidenceCard}>
              <div className={styles.visual}>FLOW</div>
              <h3>Telemetry restored</h3>
              <p>
                The package can re-enter automated movement with a machine-readable identity,
                while the operation gains a measurable recovery event.
              </p>
            </article>
          </div>
          <p className={styles.privacyNote}>
            Public-page note: detailed package identifiers and addresses are intentionally excluded.
            The point is the operating pattern, not exposing package data.
          </p>
        </div>
      </section>

      <section className={styles.shell}>
        <article className={styles.article}>
          <p className={styles.articleKicker}>TAC OPS as normal operating design</p>
          <h2>
            Automation should not be bolted onto a broken workflow. The workflow should be
            redesigned around the recovery path.
          </h2>
          <p>
            The common automation question is, <em>can we automate this?</em> That is not
            enough. A better question is: <em>can we redesign the flow so automation, humans,
            data, and exceptions all move together?</em>
          </p>
          <p>
            TAC OPS starts where many systems get quiet: the exception. A damaged label, a weak
            barcode, a no-read scan, a package that is physically moving but digitally uncertain.
            Those moments create hidden work. They create blind spots. They force people to
            improvise without giving the organization telemetry about what failed or how often it
            happens.
          </p>
          <p>
            The infrastructure redesign is simple: identify the failure mode, place the human at
            the verification point, generate a clean machine-readable recovery artifact, return the
            item to the flow, and measure the result. The worker does not become the patch. The
            worker becomes the authority gate inside a better process.
          </p>
          <p>
            That is the bridge between physical automation and AI operations. The future is not
            isolated tools. It is operating systems around the work: clear boundaries, evidence,
            recovery paths, telemetry, and human authority.
          </p>
        </article>
      </section>

      <section className={styles.telemetry}>
        <div className={styles.shell}>
          <div className={styles.sectionHeader}>
            <span>Telemetry we are not measuring yet</span>
            <h2>The recovery workflow creates new data.</h2>
          </div>
          <div className={styles.metricGrid}>
            {metrics.map((metric) => (
              <div className={styles.metric} key={metric}>✓ {metric}</div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.shell}>
          <h2>TAC OPS redesigns the exception path.</h2>
          <p>
            See it. Fix it. Keep it moving. Restore the package, restore the signal, and hold the
            new process accountable.
          </p>
        </div>
      </section>
    </main>
  );
}
