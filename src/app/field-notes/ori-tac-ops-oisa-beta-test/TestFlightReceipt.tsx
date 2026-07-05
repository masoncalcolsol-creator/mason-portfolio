"use client";

import { useEffect, useState } from "react";
import styles from "./test-flight-receipt.module.css";

type RuntimeTelemetry = {
  navigationMs: number | null;
  domReadyMs: number | null;
  viewport: string;
  cores: number | null;
  recordedAt: string;
};

const stages = [
  {
    number: "01",
    title: "Intent locked",
    body: "Build the ORI TAC OPS case as evidence for the developing OISA profession, not as a software-product victory lap.",
  },
  {
    number: "02",
    title: "Pattern recovered",
    body: "Reused the Da Vinci-versus-Toyota Field Note shell and visual grammar instead of inventing another disconnected publishing system.",
  },
  {
    number: "03",
    title: "Truth boundaries installed",
    body: "Separated working prototype, institutional routing, proposed pilot metrics, unvalidated ROI, and explicitly unestablished USPS approval or deployment.",
  },
  {
    number: "04",
    title: "Standalone route built",
    body: "Created a direct pre-release URL without adding the case to the public Field Notes series navigation.",
  },
  {
    number: "05",
    title: "Human authority preserved",
    body: "The article centers employee verification, approved process, uncertainty visibility, escalation, and final human responsibility.",
  },
  {
    number: "06",
    title: "Runtime telemetry added",
    body: "The page measures its own local load receipt without transmitting personal browser telemetry to NULLWORKS or a third-party analytics service.",
  },
];

export default function TestFlightReceipt() {
  const [runtime, setRuntime] = useState<RuntimeTelemetry>({
    navigationMs: null,
    domReadyMs: null,
    viewport: "pending",
    cores: null,
    recordedAt: "pending",
  });

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

    setRuntime({
      navigationMs: navigation ? Math.round(navigation.loadEventEnd || navigation.duration) : null,
      domReadyMs: navigation ? Math.round(navigation.domContentLoadedEventEnd) : null,
      viewport: `${window.innerWidth} × ${window.innerHeight}`,
      cores: typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : null,
      recordedAt: new Date().toISOString(),
    });
  }, []);

  return (
    <section className={styles.receipt} aria-labelledby="ori-test-flight-title">
      <div className={styles.topline}>
        <span>OI SUITe test flight // July 5, 2026</span>
        <strong>ORI TAC OPS case-page build</strong>
      </div>

      <h2 id="ori-test-flight-title" className={styles.title}>
        The case study became another test of the operating architecture.
      </h2>

      <p className={styles.lead}>
        Mason set the intent, selected the field receipt, defined the truth boundaries, authorized the repository work, and remains final authority. The OI SUITe recovered an existing publishing pattern, translated the case into a responsive route, preserved uncertainty, and instrumented the result.
      </p>

      <div className={styles.grid}>
        {stages.map((stage) => (
          <article key={stage.number} className={styles.card}>
            <span className={styles.number}>{stage.number}</span>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.runtime}>
        <div className={styles.runtimeHeader}>
          <div>
            <span>Local browser receipt</span>
            <strong>Runtime telemetry</strong>
          </div>
          <div className={styles.localOnly}>Local only · not transmitted</div>
        </div>

        <div className={styles.runtimeGrid}>
          <div><span>Page load</span><strong>{runtime.navigationMs === null ? "n/a" : `${runtime.navigationMs} ms`}</strong></div>
          <div><span>DOM ready</span><strong>{runtime.domReadyMs === null ? "n/a" : `${runtime.domReadyMs} ms`}</strong></div>
          <div><span>Viewport</span><strong>{runtime.viewport}</strong></div>
          <div><span>Logical cores</span><strong>{runtime.cores ?? "n/a"}</strong></div>
        </div>

        <p className={styles.timestamp}>Captured in this browser session: {runtime.recordedAt}</p>
      </div>

      <blockquote className={styles.statement}>
        The test is not whether NULLWORKS can publish another page. The test is whether one human intention can become a reusable, evidence-bounded, measurable operating artifact without hiding the decisions or the failures required to create it.
      </blockquote>

      <div className={styles.boundary}>
        <strong>Test-flight boundary</strong>
        <p>
          The route does not prove ORI TAC OPS works at institutional scale, that the OISA profession is validated, or that the proposed economics are correct. It proves that the case can be translated into a coherent public test article with visible claims, limitations, human authority, and runtime instrumentation. Deployment and public-route verification are recorded separately in the repository receipt.
        </p>
      </div>

      <div className={styles.flow} aria-label="Intent, recover, write, bound, build, instrument, verify, learn">
        <span>Intent</span><b>→</b><span>Recover</span><b>→</b><span>Write</span><b>→</b><span>Bound</span><b>→</b><span>Build</span><b>→</b><span>Instrument</span><b>→</b><span>Verify</span><b>→</b><span>Learn</span>
      </div>
    </section>
  );
}
