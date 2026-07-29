"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";
import styles from "./amplification.module.css";

const REAL_SEAM_SECONDS = 11.861;
const COMPRESSION = 100;
const GOBLIN_SECONDS = REAL_SEAM_SECONDS * COMPRESSION;
const CASCADE_POINT = 0.55;

const GRAPH = {
  width: 720,
  height: 228,
  left: 58,
  right: 20,
  top: 27,
  bottom: 40,
};

const PLOT_WIDTH = GRAPH.width - GRAPH.left - GRAPH.right;
const PLOT_HEIGHT = GRAPH.height - GRAPH.top - GRAPH.bottom;

type CurveMode = "linear" | "quadratic" | "exponential";
type LensPoint = { x: number; y: number; progress: number };

const curveCopy: Record<CurveMode, { label: string; note: string }> = {
  linear: {
    label: "Measured 100×",
    note: "Observed result: one existing seam amplified linearly by a constant 100× compression factor.",
  },
  quadratic: {
    label: "Cascade",
    note: "Illustrative: after one bad handoff, every later cycle inherits a larger accumulated error.",
  },
  exponential: {
    label: "Feedback loop",
    note: "Illustrative: AI output recursively becomes the next input, accelerating the failure loop.",
  },
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

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
  const dash = circumference * clamp(progress, 0, 1);

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

function GraphArtwork({
  progress,
  mode,
  idPrefix,
}: {
  progress: number;
  mode: CurveMode;
  idPrefix: string;
}) {
  const maxY = yMaximum(mode);
  const count = Math.max(2, Math.ceil(progress * 96));
  const humanPoints: string[] = [];
  const goblinPoints: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const pointProgress = count === 1 ? 0 : (progress * index) / (count - 1);
    const x = GRAPH.left + pointProgress * PLOT_WIDTH;
    const humanY = GRAPH.top + PLOT_HEIGHT - (REAL_SEAM_SECONDS * pointProgress * PLOT_HEIGHT) / maxY;
    const goblinY = GRAPH.top + PLOT_HEIGHT - (amplifiedValue(pointProgress, mode) * PLOT_HEIGHT) / maxY;
    humanPoints.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)},${humanY.toFixed(2)}`);
    goblinPoints.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)},${goblinY.toFixed(2)}`);
  }

  const eventX = GRAPH.left + CASCADE_POINT * PLOT_WIDTH;
  const currentX = GRAPH.left + progress * PLOT_WIDTH;
  const gradientId = `${idPrefix}-gradient`;
  const glowId = `${idPrefix}-glow`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0%" stopColor="#65d8ff" />
          <stop offset="100%" stopColor="#8f7dff" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
        const y = GRAPH.top + PLOT_HEIGHT - fraction * PLOT_HEIGHT;
        return <line key={`h-${fraction}`} x1={GRAPH.left} y1={y} x2={GRAPH.width - GRAPH.right} y2={y} className={styles.gridLine} />;
      })}
      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
        const x = GRAPH.left + fraction * PLOT_WIDTH;
        return <line key={`v-${fraction}`} x1={x} y1={GRAPH.top} x2={x} y2={GRAPH.top + PLOT_HEIGHT} className={styles.gridLine} />;
      })}

      <line x1={GRAPH.left} y1={GRAPH.top + PLOT_HEIGHT} x2={GRAPH.width - GRAPH.right} y2={GRAPH.top + PLOT_HEIGHT} className={styles.axis} />
      <line x1={GRAPH.left} y1={GRAPH.top} x2={GRAPH.left} y2={GRAPH.top + PLOT_HEIGHT} className={styles.axis} />

      {mode !== "linear" && (
        <g>
          <line x1={eventX} y1={GRAPH.top} x2={eventX} y2={GRAPH.top + PLOT_HEIGHT} className={styles.eventLine} />
          <rect x={eventX + 7} y={GRAPH.top + 2} width="210" height="25" rx="6" className={styles.eventBadge} />
          <text x={eventX + 16} y={GRAPH.top + 19} className={styles.eventLabel}>AI DECISION / BAD HANDOFF</text>
        </g>
      )}

      <path d={humanPoints.join(" ")} className={styles.humanLine} />
      <path
        d={goblinPoints.join(" ")}
        className={styles.goblinLine}
        stroke={`url(#${gradientId})`}
        filter={`url(#${glowId})`}
      />
      <line x1={currentX} y1={GRAPH.top} x2={currentX} y2={GRAPH.top + PLOT_HEIGHT} className={styles.cursorLine} />

      <text x={GRAPH.left} y={GRAPH.height - 9} className={styles.axisLabel}>00:00</text>
      <text x={GRAPH.width - GRAPH.right} y={GRAPH.height - 9} textAnchor="end" className={styles.axisLabel}>19:46.1</text>
      <text x="8" y={GRAPH.top + 5} className={styles.axisLabel}>{Math.round(maxY)}s</text>
      <text x="21" y={GRAPH.top + PLOT_HEIGHT} className={styles.axisLabel}>0</text>
    </>
  );
}

function GraphMagnifier({
  lens,
  progress,
  mode,
}: {
  lens: LensPoint;
  progress: number;
  mode: CurveMode;
}) {
  const crop = 132;
  const half = crop / 2;
  const centerX = clamp(lens.x, half, GRAPH.width - half);
  const centerY = clamp(lens.y, half, GRAPH.height - half);
  const pointTime = lens.progress * GOBLIN_SECONDS;

  return (
    <aside className={styles.magnifier} aria-live="polite">
      <div className={styles.magnifierHeader}>
        <span><Search size={18} /> CHEATER ZOOM</span>
        <strong>{formatCountdown(pointTime)} / 19:46.1</strong>
      </div>
      <div className={styles.magnifierViewport}>
        <svg
          viewBox={`${centerX - half} ${centerY - half} ${crop} ${crop}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <GraphArtwork progress={progress} mode={mode} idPrefix="lens" />
        </svg>
        <div className={styles.crosshairHorizontal} />
        <div className={styles.crosshairVertical} />
        <div className={styles.crosshairCenter} />
      </div>
      <div className={styles.magnifierReadout}>
        <span>Human <strong>{formatSeconds(REAL_SEAM_SECONDS * lens.progress)}</strong></span>
        <span>Amplified <strong>{formatSeconds(amplifiedValue(lens.progress, mode))}</strong></span>
      </div>
    </aside>
  );
}

function LiveGraph({ progress, mode }: { progress: number; mode: CurveMode }) {
  const [lens, setLens] = useState<LensPoint | null>(null);

  const updateLens = (event: ReactPointerEvent<SVGSVGElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * GRAPH.width;
    const y = ((event.clientY - rect.top) / rect.height) * GRAPH.height;
    const pointProgress = clamp((x - GRAPH.left) / PLOT_WIDTH, 0, 1);
    setLens({
      x: clamp(x, 0, GRAPH.width),
      y: clamp(y, 0, GRAPH.height),
      progress: pointProgress,
    });
  };

  const beginLens = (event: ReactPointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateLens(event);
  };

  const endLens = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setLens(null);
  };

  return (
    <div className={styles.graphCard}>
      {lens && <GraphMagnifier lens={lens} progress={progress} mode={mode} />}

      <div className={styles.graphHeader}>
        <div>
          <span className={styles.kicker}>LIVE XY GRAPH</span>
          <strong>Operational drift over the same elapsed run</strong>
        </div>
        <div className={styles.legend}>
          <span><i className={styles.humanDot} /> Human</span>
          <span><i className={styles.goblinDot} /> AI-amplified</span>
        </div>
      </div>

      <div className={styles.graphStage}>
        <svg
          viewBox={`0 0 ${GRAPH.width} ${GRAPH.height}`}
          className={styles.graph}
          role="img"
          aria-label="Live comparison of human-speed drift and amplified drift. Touch and drag to magnify."
          onPointerDown={beginLens}
          onPointerMove={(event) => lens && updateLens(event)}
          onPointerUp={endLens}
          onPointerCancel={endLens}
          onLostPointerCapture={() => setLens(null)}
        >
          <GraphArtwork progress={progress} mode={mode} idPrefix="main" />
        </svg>
        <div className={styles.dragHint}><Search size={16} /> Touch + drag to magnify</div>
      </div>

      <div className={styles.graphReadout}>
        <span>Human <strong>{formatSeconds(REAL_SEAM_SECONDS * progress)}</strong></span>
        <span>Amplified <strong>{formatSeconds(amplifiedValue(progress, mode))}</strong></span>
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

  const progress = clamp(elapsed / GOBLIN_SECONDS, 0, 1);
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
          <div className={styles.factor}><Zap size={18} /> 100×</div>
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
              {running ? <Pause size={20} /> : <Play size={20} />}
              {running ? "Pause" : elapsed >= GOBLIN_SECONDS ? "Replay" : "Run"}
            </button>
            <button type="button" className={styles.iconButton} onClick={reset} aria-label="Reset animation">
              <RotateCcw size={20} />
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
            {mode === "linear" ? <Gauge size={17} /> : <TriangleAlert size={17} />}
            {curveCopy[mode].note}
          </p>
        </div>

        <div className={styles.punchline}>
          <Sparkles size={20} />
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
