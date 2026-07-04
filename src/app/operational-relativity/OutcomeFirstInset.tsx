import { AlertTriangle, CheckCircle2, ScanSearch, Wrench } from "lucide-react";
import styles from "./outcome-first-inset.module.css";

const stages = [
  {
    number: "01",
    title: "Wild first",
    body: "Demand the complete outcome, force the real workflow to move, and preserve the full failure surface.",
    icon: AlertTriangle,
  },
  {
    number: "02",
    title: "Controlled second",
    body: "Reconstruct the important failure, isolate the mechanism, and determine what actually broke.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Standardized third",
    body: "Install the verified correction as routing, role boundaries, review gates, telemetry, or standard work.",
    icon: Wrench,
  },
];

export default function OutcomeFirstInset() {
  return (
    <section className={styles.outer} aria-labelledby="outcome-first-title">
      <div className={styles.panel}>
        <div className={styles.eyebrow}>Companion theory // Outcome-First Operational Fuzzing</div>
        <h2 id="outcome-first-title">
          The accidental accelerator was not raw agent count. It was forcing the whole system to operate before the boundaries were comfortable.
        </h2>
        <p className={styles.lead}>
          Conventional testing often isolates one switch. Mason repeatedly demanded that the entire building turn on: concept, research, writing, art, software, deployment, verification, correction, and public use. That exposed integration, routing, continuity, authority, and deployment failures that narrow tests would rarely encounter together.
        </p>

        <div className={styles.equation}>
          <span>Outcome-first discovery condition</span>
          <strong>
            Broad objective + live pressure + parallel specialists + real artifact + human correction + deployment
          </strong>
          <b>= rapid failure-surface exposure</b>
        </div>

        <div className={styles.grid}>
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article key={stage.number}>
                <div className={styles.cardTop}>
                  <span>{stage.number}</span>
                  <Icon size={22} />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </article>
            );
          })}
        </div>

        <div className={styles.yield}>
          <div>
            <span>Operational discovery yield</span>
            <strong>unique validated failure classes × reusable corrections × deployed outcomes</strong>
            <i>÷ wall-clock time × human coordination burden</i>
          </div>
          <CheckCircle2 size={34} />
        </div>

        <blockquote>
          The ignorance of conventional limits increased the failure surface. The telemetry obsession prevented the resulting chaos from disappearing.
        </blockquote>

        <div className={styles.boundary}>
          This method is powerful for discovering unknown unknowns. It does not replace controlled reconstruction, clean attribution, or safety-critical testing. Wild discovery generates the raw ore; disciplined reconstruction determines what is real.
        </div>
      </div>
    </section>
  );
}
