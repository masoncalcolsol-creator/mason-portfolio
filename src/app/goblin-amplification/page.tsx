"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";
import styles from "./amplification.module.css";

const REAL_SEAM_SECONDS = 11.861;
const COMPRESSION = 100;
const GOBLIN_SECONDS = REAL_SEAM_SECONDS * COMPRESSION;
const CASCADE_POINT = 0.55;

type CurveMode = "linear" | "quadratic" | "exponential";

const curveCopy: Record<CurveMode, { label: string; note: string }> = {
  linear: {
    label: "Measured 100×",
    note: "Observed Goblin Clock behavior: one existing seam, amplified linearly by the compression factor.",
  },
  quadratic: {
    label: "Cascade",
    note: "Illustrative only: after one bad decision, each later cycle inherits more accumulated error.",
  },
  exponential: {
    label: "Feedback loop",
    note: "Illustrative only: outputs recursively become inputs, creating an accelerating failure loop.",
  },
};

function formatCountdown(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const secs = safe - minutes * 60;
  return `${String(minutes).padStart(2, "0")}:${secs.toFixed(1).padStart(4, "0")}`;
}

function formatSeconds(seconds: number) {
  if (seconds < 60) return `${seconds.toFixed(2)} sec`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds - minutes * 60;
  return `${minutes}m ${secs.toFixed(1)}s`;
}

function amplifiedValue(progress: number, mode: CurveMode) {
  const base = GOBLIN_SECONDS * progress;
  if (mode === "linear" || progress <= CASCADE_POINT) return base;

  const q = (progress - CASCADE_POINT) / (1 - CASCADE_POINT);
  if (mode === "quadratic") {
    return GOBLIN_SECONDS * (progress + 1.5 * q * q);
  }

  const normalized = (Math.exp(3 * q) - 1) / (Math.exp(3) - 1);
  return GOBLIN_SECONDS * (progress + 2.5 * normalized);
}

function yMaximum(mode: CurveMode) {
  if (mode === "quadratic") return GOBLIN_SECONDS * 2.5;
  if (mode === "exponential") return GOBLIN_SECONDS * 3.5;
  return GOBLIN_SECONDS;
}

function Dial({
  progress,
  title,
  value,
  subvalue,
  revolutions,
  tone,
}: {
  progress: number;
  title: string;
  value: string;
  subvalue: string;
  revolutions?: number;
  tone: "human" | "goblin";
}) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * Math.min(1, Math.max(0, progress));

  return (
    <article className={`${styles.dialCard} ${styles[tone]}`}>
      <div className={styles.dialTitle}>{title}</div>
      <div className={styles.dialWrap}>
        <svg viewBox="0 0 110 110" className={styles.dialSvg} aria-hidden="true">
          <circle cx="55" cy="55" r={radius} className={styles.dialTrack} />
          <circle
            cx="55"
            cy="55"
            r={radius}
            className={styles.dialProgress}
            strokeDasharray={`${dash} ${circumference - dash}`}
          />
        </svg>
        <div className={styles.dialCenter}>
          {typeof revolutions === "number" && (
            <span className={styles.revolution}>REV {String(revolutions).padStart(3, "0")}</span>
          )}
          <strong>{value}</strong>
          <span>{subvalue}</span>
        </div>
      </div>
    </article>
  );
}

function LiveGraph({ progress, mode }: { progress: number; mode: CurveMode }) {
  const width = 720;
  const height = 255;
  const left = 48;
  const right = 18;
  const top = 20;
  const bottom = 38;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxY = yMaximum(mode);

  const paths = useMemo(() => {
    const count = Math.max(2, Math.ceil(progress * 72));
    const humanPoints: string[] = [];
    const goblinPoints: string[] = [];

    for (let index = 0; index < count; index += 1) {
      const pointProgress = count === 1 ? 0 : (progress * index) / (count - 1);
      const x = left + pointProgress * plotWidth;
      const humanY = top + plotHeight - (REAL_SEAM_SECONDS * pointProgress * plotHeight) / maxY;
      const goblinY = top + plotHeight - (amplifiedValue(pointProgress, mode) * plotHeight) / maxY;
      humanPoints.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)},${humanY.toFixed(2)}`);
      goblinPoints.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)},${goblinY.toFixed(2)}`);
    }

    return { human: humanPoints.join(" "), goblin: goblinPoints.join(" ") };
  }, [progress, mode, maxY, plotWidth, plotHeight]);

  const eventX = left + CASCADE_POINT * plotWidth;
  const currentX = left + progress * plotWidth;

  return (
    <div className={styles.graphCard}>
      <div className={styles.graphHeader}>
        <div>
          <span className={styles.kicker}>LIVE XY GRAPH</span>
          <strong>Operational drift over the same elapsed run</strong>
        </div>
        <div className={styles.legend}>
          <span><i className={styles.humanDot} /> Human speed</span>
          <span><i className={styles.goblinDot} /> AI-amplified</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className={styles.graph} role="img" aria-label="Live comparison of human-speed drift and amplified drift">
        <defs>
          <linearGradient id="goblinGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#65d8ff" />
            <stop offset="100%" stopColor="#8f7dff" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = top + plotHeight - fraction * plotHeight;
          return <line key={`h-${fraction}`} x1={left} y1={y} x2={width - right} y2={y} className={styles.gridLine} />;
        })}
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const x = left + fraction * plotWidth;
          return <line key={`v-${fraction}`} x1={x} y1={top} x2={x} y2={top + plotHeight} className={styles.gridLine} />;
        })}

        <line x1={left} y1={top + plotHeight} x2={width - right} y2={top + plotHeight} className={styles.axis} />
        <line x1={left} y1={top} x2={left} y2={top + plotHeight} className={styles.axis} />

        {mode !== "linear" && (
          <g>
            <line x1={eventX} y1={top} x2={eventX} y2={top + plotHeight} className={styles.eventLine} />
            <text x={eventX + 7} y={top + 14} className={styles.eventLabel}>AI DECISION / BAD HANDOFF</text>
          </g>
        )}

        <path d={paths.human} className={styles.humanLine} />
        <path d={paths.goblin} className={styles.goblinLine} filter="url(#softGlow)" />
        <line x1={currentX} y1={top} x2={currentX} y2={top + plotHeight} className={styles.cursorLine} />

        <text x={left} y={height - 10} className={styles.axisLabel}>00:00</text>
        <text x={width - right} y={height - 10} textAnchor="end" className={styles.axisLabel}>19:46.1</text>
        <text x={10} y={top + 4} className={styles.axisLabel}>{Math.round(maxY)}s</text>
        <text x={10} y={top + plotHeight} className={styles.axisLabel}>0</text>
      </svg>

      <div className={styles.graphReadout}>
        <span>Human drift <strong>{formatSeconds(REAL_SEAM_SECONDS * progress)}</strong></span>
        <span>Amplified drift <strong>{formatSeconds(amplifiedValue(progress, mode))}</strong></span>
      </div>
    </div>
  );
}

export default function GoblinAmplificationPage() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<CurveMode>("linear");
  const lastFrame = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      lastFrame.current = null;
      return;
    }

    let frame = 0;
    const animate = (timestamp: number) => {
      if (lastFrame.current === null) lastFrame.current = timestamp;
      const delta = ((timestamp - lastFrame.current) / 1000) * speed;
      lastFrame.current = timestamp;
      setElapsed((previous) => {
        const next = Math.min(GOBLIN_SECONDS, previous + delta);
        if (next >= GOBLIN_SECONDS) setRunning(false);
        return next;
      });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [running, speed]);

  const progress = Math.min(1, elapsed / GOBLIN_SECONDS);
  const rawRevolutions = Math.floor(elapsed / REAL_SEAM_SECONDS);
  const revolutions = elapsed >= GOBLIN_SECONDS ? COMPRESSION : rawRevolutions;
  const realCycleProgress = elapsed >= GOBLIN_SECONDS ? 1 : (elapsed % REAL_SEAM_SECONDS) / REAL_SEAM_SECONDS;
  const realCycleRemaining = elapsed >= GOBLIN_SECONDS
    ? 0
    : REAL_SEAM_SECONDS - (elapsed % REAL_SEAM_SECONDS);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  const toggleRun = () => {
    if (elapsed >= GOBLIN_SECONDS) {
      setElapsed(0);
      setRunning(true);
      return;
    }
    setRunning((value) => !value);
  };

  return (
    <main className={styles.page}>
      <section className={styles.livePanel}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>NULLWORKS // GOBLIN CLOCK</span>
            <h1>The Amplification Seam</h1>
          </div>
          <div className={styles.factor}><Zap size={15} /> 100×</div>
        </header>

        <div className={styles.dials}>
          <Dial
            progress={realCycleProgress}
            title="REAL SEAM CYCLE"
            value={formatCountdown(realCycleRemaining)}
            subvalue="11.861 sec / revolution"
            revolutions={revolutions}
            tone="human"
          />
          <Dial
            progress={progress}
            title="100× EQUIVALENT"
            value={formatCountdown(GOBLIN_SECONDS - elapsed)}
            subvalue="19m 46.1s total"
            tone="goblin"
          />
        </div>

        <LiveGraph progress={progress} mode={mode} />

        <div className={styles.controlDeck}>
          <div className={styles.modeControl} aria-label="Graph model">
            {(Object.keys(curveCopy) as CurveMode[]).map((key) => (
              <button
                key={key}
                type="button"
                className={mode === key ? styles.activeMode : ""}
                onClick={() => setMode(key)}
              >
                {curveCopy[key].label}
              </button>
            ))}
          </div>

          <div className={styles.transportControls}>
            <button type="button" className={styles.runButton} onClick={toggleRun}>
              {running ? <Pause size={17} /> : <Play size={17} />}
              {running ? "Pause" : elapsed >= GOBLIN_SECONDS ? "Replay" : "Run"}
            </button>
            <button type="button" className={styles.iconButton} onClick={reset} aria-label="Reset animation">
              <RotateCcw size={17} />
            </button>
            <div className={styles.speedControl}>
              {[1, 10, 100].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={speed === value ? styles.activeSpeed : ""}
                  onClick={() => setSpeed(value)}
                >
                  {value}×
                </button>
              ))}
            </div>
          </div>

          <p className={styles.modeNote}>
            {mode === "linear" ? <Gauge size={15} /> : <TriangleAlert size={15} />}
            {curveCopy[mode].note}
          </p>
        </div>

        <div className={styles.punchline}>
          <Sparkles size={17} />
          <span><strong>AI does not create the seam.</strong> It compresses consequence until the seam becomes impossible to ignore.</span>
        </div>
      </section>

      <section className={styles.paperSection}>
        <span className={styles.paperKicker}>WHITE PAPER INSERT // REVISED</span>
        <h2>AI as an operational amplifier</h2>
        <p>
          AI does not merely accelerate systems; it amplifies their existing structure. In a well-instrumented workflow, that amplification produces speed, clarity, and leverage. In a poorly instrumented workflow, it magnifies ambiguity, drift, and downstream error. The Goblin Clock measurement seam demonstrates this directly: an 11.861-second boundary mismatch in real time became a 19-minute, 46.1-second discrepancy in the 100× coordinate system. The compressed system did not create the defect. It made the defect operationally visible.
        </p>
        <p>
          This is the same pattern confronting organizations implementing AI across legacy operations. Broken handoffs, unclear authority, inconsistent definitions, and weak telemetry may remain survivable at human speed because people quietly compensate for them. AI removes that cushioning. It executes faster, repeats more consistently, and propagates decisions farther, causing well-designed systems to improve rapidly while poorly designed systems expose or multiply their failures. AI therefore scales whatever is already present—including the mistakes. The prerequisite to safe acceleration is not merely a stronger model; it is a better-governed operating system around the model.
        </p>
      </section>
    </main>
  );
}
