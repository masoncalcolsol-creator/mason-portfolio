"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type VesselColor = "red" | "blue";

type VesselPath = {
  d: string;
  width: number;
  delay: number;
  duration: number;
  opacity: number;
  color: VesselColor;
};

type VascularField = {
  width: number;
  height: number;
  paths: VesselPath[];
};

const emptyField: VascularField = { width: 1, height: 1, paths: [] };
const BEAT_SECONDS = 1.35;

const cards = [
  {
    code: "01",
    title: "Arteries begin as major pressure lines.",
    body: "The red system enters from the upper-left as a heavy vessel, then sheds diameter every time it branches.",
  },
  {
    code: "02",
    title: "Veins answer from the opposite corner.",
    body: "The blue system rises from the lower-right on its own route and grows toward the same central exchange field.",
  },
  {
    code: "03",
    title: "Every generation truncates and divides.",
    body: "Large vessels become secondary branches, smaller arterioles and venules, then hairline capillaries that stop at different lengths.",
  },
  {
    code: "04",
    title: "One heartbeat owns the complete page.",
    body: "The red network, blue network, EKG trace, scanner and glow all share one timing cycle instead of drifting independently.",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const between = (seed: number, min: number, max: number) => min + noise(seed) * (max - min);

const mixAngle = (first: number, second: number, amount: number) => {
  const x = Math.cos(first) * (1 - amount) + Math.cos(second) * amount;
  const y = Math.sin(first) * (1 - amount) + Math.sin(second) * amount;
  return Math.atan2(y, x);
};

function curvedSegment(start: Point, end: Point, seed: number) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const normalX = -dy / length;
  const normalY = dx / length;
  const wobble = between(seed, -0.15, 0.15) * length;

  return [
    `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
    `C ${(start.x + dx * 0.3 + normalX * wobble).toFixed(1)} ${(start.y + dy * 0.3 + normalY * wobble).toFixed(1)},`,
    `${(start.x + dx * 0.7 - normalX * wobble * 0.76).toFixed(1)} ${(start.y + dy * 0.7 - normalY * wobble * 0.76).toFixed(1)},`,
    `${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
  ].join(" ");
}

function branchVessel(
  paths: VesselPath[],
  start: Point,
  angle: number,
  length: number,
  generation: number,
  delay: number,
  seed: number,
  color: VesselColor,
  bounds: { width: number; height: number; center: Point },
) {
  const widths = [5.6, 3.1, 1.65, 0.72];
  const durations = [12.4, 9.7, 7.3, 5.4];
  const end = {
    x: clamp(start.x + Math.cos(angle) * length, 4, bounds.width - 4),
    y: clamp(start.y + Math.sin(angle) * length, 4, bounds.height - 4),
  };

  paths.push({
    d: curvedSegment(start, end, seed),
    width: widths[generation],
    delay,
    duration: durations[generation] * between(seed + 2, 0.9, 1.18),
    opacity: 0.82 - generation * 0.12,
    color,
  });

  if (generation >= 3 || Math.hypot(end.x - start.x, end.y - start.y) < 18) return;

  const childCount = generation === 0 && noise(seed + 7) > 0.48 ? 3 : 2;
  const spread = generation === 0 ? 0.68 : generation === 1 ? 0.82 : 0.96;
  const centerAngle = Math.atan2(bounds.center.y - end.y, bounds.center.x - end.x);

  for (let child = 0; child < childCount; child += 1) {
    const centered = child - (childCount - 1) / 2;
    const splitAngle = angle + centered * spread + between(seed + child * 19, -0.2, 0.2);
    const childAngle = mixAngle(splitAngle, centerAngle, generation === 0 ? 0.2 : 0.08);
    const childLength = length * between(seed + child * 29 + generation, 0.43, 0.63);
    const splitDelay = delay + between(seed + child * 37 + generation * 11, 1.55, 3.55) + child * 0.18;

    branchVessel(
      paths,
      end,
      childAngle,
      childLength,
      generation + 1,
      splitDelay,
      seed * 7.31 + child * 23.7 + generation * 43,
      color,
      bounds,
    );
  }
}

function buildMainSystem(
  paths: VesselPath[],
  color: VesselColor,
  start: Point,
  target: Point,
  seed: number,
  bounds: { width: number; height: number; center: Point },
) {
  const steps = 6;
  const points: Point[] = [start];
  const mainWidths = [12, 10.2, 8.2, 6.4, 4.5, 2.8];
  const baseDelay = color === "red" ? 0.45 : 0.82;

  for (let index = 1; index <= steps; index += 1) {
    const amount = index / steps;
    const direction = color === "red" ? 1 : -1;
    const lateral = Math.sin(amount * Math.PI * 2.4 + seed) * bounds.width * 0.055 * direction;
    const vertical = Math.sin(amount * Math.PI * 1.6 + seed * 0.7) * Math.min(90, bounds.height * 0.018);
    points.push({
      x: start.x + (target.x - start.x) * amount + lateral,
      y: start.y + (target.y - start.y) * amount + vertical,
    });
  }

  for (let index = 0; index < steps; index += 1) {
    const segmentStart = points[index];
    const segmentEnd = points[index + 1];
    const segmentDelay = baseDelay + index * between(seed + index * 17, 4.6, 5.9);
    const segmentAngle = Math.atan2(segmentEnd.y - segmentStart.y, segmentEnd.x - segmentStart.x);

    paths.push({
      d: curvedSegment(segmentStart, segmentEnd, seed + index * 73),
      width: mainWidths[index],
      delay: segmentDelay,
      duration: between(seed + index * 41, 10.4, 13.2),
      opacity: 0.95 - index * 0.045,
      color,
    });

    if (index === 0) continue;

    const anchor = segmentStart;
    const available = Math.min(bounds.width * 0.34, 190 + index * 18);
    const sides = [-1, 1];

    sides.forEach((side, branchIndex) => {
      const angle = segmentAngle + side * between(seed + index * 101 + branchIndex, 0.64, 1.08);
      const length = available * between(seed + index * 131 + branchIndex * 17, 0.68, 1.05);
      const delay = segmentDelay + between(seed + index * 149 + branchIndex * 23, 1.2, 3.8);
      branchVessel(
        paths,
        anchor,
        angle,
        length,
        0,
        delay,
        seed + index * 211 + branchIndex * 997,
        color,
        bounds,
      );
    });
  }

  const terminalAngle = Math.atan2(bounds.center.y - target.y, bounds.center.x - target.x);
  for (let index = 0; index < 7; index += 1) {
    const angle = terminalAngle + between(seed + 4000 + index * 53, -1.05, 1.05);
    const length = between(seed + 5000 + index * 79, 72, Math.min(150, bounds.width * 0.28));
    branchVessel(
      paths,
      target,
      angle,
      length,
      1,
      29.5 + between(seed + 6000 + index * 83, 0.4, 6.2),
      seed + 7000 + index * 113,
      color,
      bounds,
    );
  }
}

function buildField(width: number, height: number): VascularField {
  const center = { x: width * 0.5, y: height * 0.5 };
  const bounds = { width, height, center };
  const paths: VesselPath[] = [];

  buildMainSystem(
    paths,
    "red",
    { x: -22, y: Math.max(86, height * 0.035) },
    { x: width * 0.47, y: height * 0.49 },
    13,
    bounds,
  );

  buildMainSystem(
    paths,
    "blue",
    { x: width + 22, y: height - Math.max(86, height * 0.035) },
    { x: width * 0.53, y: height * 0.51 },
    29,
    bounds,
  );

  return { width, height, paths };
}

function VascularSvg({ field, replayKey }: { field: VascularField; replayKey: number }) {
  return (
    <svg
      key={`vascular-field-${replayKey}`}
      className="vascular-field"
      viewBox={`0 0 ${field.width} ${field.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="artery-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff172f" />
          <stop offset="0.5" stopColor="#d81429" />
          <stop offset="1" stopColor="#7f0718" />
        </linearGradient>
        <linearGradient id="vein-gradient" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#128cff" />
          <stop offset="0.5" stopColor="#1760d6" />
          <stop offset="1" stopColor="#102b85" />
        </linearGradient>
        <filter id="artery-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="vein-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {field.paths.map((path, index) => {
        const gradient = path.color === "red" ? "artery-gradient" : "vein-gradient";
        const glow = path.color === "red" ? "artery-glow" : "vein-glow";
        const timing = {
          "--grow-delay": `${path.delay}s`,
          "--grow-duration": `${path.duration}s`,
          "--beat-seconds": `${BEAT_SECONDS}s`,
        } as CSSProperties;

        return (
          <g key={`${path.color}-${index}`}>
            <path
              d={path.d}
              pathLength={1}
              className="vessel-stroke"
              stroke={`url(#${gradient})`}
              strokeWidth={path.width}
              opacity={path.opacity}
              filter={`url(#${glow})`}
              vectorEffect="non-scaling-stroke"
              style={timing}
            />
            <path
              d={path.d}
              pathLength={1}
              className="vessel-pulse"
              stroke={path.color === "red" ? "#ff8390" : "#73c4ff"}
              strokeWidth={path.width * 1.75}
              vectorEffect="non-scaling-stroke"
              style={timing}
            />
          </g>
        );
      })}
    </svg>
  );
}

function EkgDeck() {
  return (
    <aside className="ekg-deck" aria-label="Synchronized EKG scanner">
      <div className="ekg-head">
        <span>CAPILLARY CONVERGENCE // LIVE</span>
        <strong>QRS / ST SYNCHRONIZED PULSE</strong>
      </div>
      <div className="ekg-screen">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="ekg-baseline" d="M 0 72 L 1000 72" />
          <path
            className="ekg-trace"
            d="M 0 72 L 250 72 C 285 72 300 58 320 58 C 340 58 350 72 378 72 L 500 72 L 526 80 L 548 42 L 570 106 L 596 12 L 621 86 L 648 62 L 735 62 C 770 62 786 48 810 48 C 842 48 855 72 900 72 L 1000 72"
          />
          <path className="st-segment" d="M 648 62 L 735 62" />
        </svg>
        <div className="st-zone" />
        <div className="ekg-scanner"><i /></div>
      </div>
    </aside>
  );
}

export default function VineInfiltration() {
  const rootRef = useRef<HTMLElement>(null);
  const [field, setField] = useState<VascularField>(emptyField);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setField(buildField(Math.max(1, root.clientWidth), Math.max(1, root.scrollHeight)));
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const replay = () => {
    setReplayKey((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main ref={rootRef} className="capillary-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #040508; }
        .capillary-page {
          --red: #ff3048;
          --blue: #2a8fff;
          --beat: ${BEAT_SECONDS}s;
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding-bottom: 142px;
          color: #f6f7fb;
          background:
            radial-gradient(circle at 0% 0%, rgba(255,30,56,.2), transparent 31rem),
            radial-gradient(circle at 100% 100%, rgba(25,113,255,.2), transparent 34rem),
            radial-gradient(circle at 50% 50%, rgba(153,52,119,.07), transparent 34rem),
            linear-gradient(180deg, #050508 0%, #08060b 50%, #040509 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .capillary-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .18;
          background-image:
            linear-gradient(rgba(255,255,255,.038) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.038) 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, black, transparent 95%);
        }
        .vascular-field { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
        .vessel-stroke, .vessel-pulse {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .vessel-stroke {
          animation:
            vesselGrow var(--grow-duration) cubic-bezier(.18,.72,.22,1) var(--grow-delay) forwards,
            vesselBaseBeat var(--beat-seconds) linear 0s infinite;
        }
        .vessel-pulse {
          opacity: 0;
          animation:
            vesselGrow var(--grow-duration) cubic-bezier(.18,.72,.22,1) var(--grow-delay) forwards,
            vesselFlash var(--beat-seconds) linear 0s infinite;
        }
        @keyframes vesselGrow { to { stroke-dashoffset: 0; } }
        @keyframes vesselBaseBeat {
          0%, 53%, 100% { filter: brightness(.92); }
          58% { filter: brightness(1.08); }
          61% { filter: brightness(1.55); }
          65% { filter: brightness(1.02); }
          71% { filter: brightness(1.24); }
          76% { filter: brightness(.94); }
        }
        @keyframes vesselFlash {
          0%, 54%, 100% { opacity: 0; }
          58% { opacity: .12; }
          61% { opacity: .78; }
          64% { opacity: .18; }
          70% { opacity: .42; }
          76% { opacity: 0; }
        }
        .content-layer { position: relative; z-index: 4; }
        .shell { width: min(1160px, calc(100% - 30px)); margin: 0 auto; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 30;
          border-bottom: 1px solid rgba(255,255,255,.11);
          background: rgba(4,5,8,.79);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 66px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .brand { color: #fff; text-decoration: none; font-size: 12px; font-weight: 950; letter-spacing: .14em; }
        .brand .red { color: var(--red); }
        .brand .blue { color: var(--blue); }
        .nav-actions { display: flex; gap: 7px; align-items: center; }
        .nav-actions a, .replay {
          appearance: none;
          border: 1px solid rgba(255,255,255,.17);
          border-radius: 999px;
          padding: 8px 11px;
          color: #cbd0db;
          background: rgba(255,255,255,.025);
          text-decoration: none;
          font: 850 10px ui-monospace, monospace;
          cursor: pointer;
        }
        .replay { color: #fff; border-color: rgba(255,66,91,.48); background: linear-gradient(90deg, rgba(255,48,72,.24), rgba(42,143,255,.24)); }
        .hero { min-height: 94svh; display: grid; align-items: center; border-bottom: 1px solid rgba(255,255,255,.1); }
        .hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 30px; align-items: end; padding: 92px 0 126px; }
        .eyebrow { color: #d7dbe5; font: 900 11px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; }
        h1 { max-width: 980px; margin: 18px 0 0; font-size: clamp(58px, 9.7vw, 126px); line-height: .82; letter-spacing: -.073em; }
        h1 .artery { color: var(--red); }
        h1 .vein { color: var(--blue); }
        .lead { max-width: 820px; margin-top: 28px; color: #c6cad4; font-size: clamp(18px, 2.1vw, 25px); line-height: 1.58; }
        .hero-card, .signal-card, .convergence-card, .closing-card {
          position: relative;
          border: 1px solid rgba(255,255,255,.14);
          background: linear-gradient(145deg, rgba(18,16,23,.78), rgba(5,6,10,.84));
          box-shadow: 0 28px 90px rgba(0,0,0,.44);
          backdrop-filter: blur(12px);
        }
        .hero-card { border-radius: 28px; padding: 25px; }
        .hero-card b { color: #fff; font: 900 10px ui-monospace, monospace; letter-spacing: .15em; }
        .hero-card strong { display: block; margin-top: 17px; font-size: clamp(31px, 4.3vw, 54px); line-height: .94; letter-spacing: -.052em; }
        .hero-card p { color: #b8bdc8; line-height: 1.68; }
        .legend { display: grid; gap: 8px; margin-top: 20px; }
        .legend span { display: flex; align-items: center; gap: 9px; color: #aeb4c0; font: 800 10px ui-monospace, monospace; }
        .legend i { width: 40px; height: 4px; border-radius: 999px; box-shadow: 0 0 16px currentColor; }
        .legend .artery-line { color: var(--red); background: var(--red); }
        .legend .vein-line { color: var(--blue); background: var(--blue); }
        .section { position: relative; z-index: 4; padding: 88px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .section-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: #e5e7ed; font: 900 10px ui-monospace, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h2 { max-width: 900px; margin: 12px 0 0; font-size: clamp(42px, 6.4vw, 80px); line-height: .94; letter-spacing: -.058em; }
        .section-head p { color: #aeb4c0; font-size: 17px; line-height: 1.68; }
        .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .signal-card { min-height: 292px; border-radius: 24px; padding: 22px; overflow: hidden; }
        .signal-card::before { content: ""; position: absolute; inset: 0; opacity: .3; background: linear-gradient(135deg, rgba(255,48,72,.16), transparent 42%, rgba(42,143,255,.14)); }
        .signal-card b, .signal-card h3, .signal-card p { position: relative; z-index: 2; }
        .signal-card b { color: #f3f4f8; font: 950 12px ui-monospace, monospace; letter-spacing: .14em; }
        .signal-card h3 { max-width: 560px; margin: 56px 0 0; font-size: clamp(30px, 4vw, 52px); line-height: .96; letter-spacing: -.048em; }
        .signal-card p { max-width: 620px; color: #b9bec9; line-height: 1.62; }
        .convergence-zone { padding-top: 110px; padding-bottom: 126px; }
        .convergence-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 24px; align-items: center; }
        .convergence-copy p { color: #afb5c1; font-size: 18px; line-height: 1.72; }
        .convergence-card { min-height: 470px; border-radius: 31px; padding: 30px; overflow: hidden; }
        .convergence-card::before, .convergence-card::after {
          content: "";
          position: absolute;
          width: 280px;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(48px);
          opacity: .18;
          animation: chamberPulse var(--beat) linear infinite;
        }
        .convergence-card::before { left: -100px; top: -80px; background: var(--red); }
        .convergence-card::after { right: -100px; bottom: -80px; background: var(--blue); }
        @keyframes chamberPulse {
          0%, 54%, 100% { transform: scale(.82); opacity: .1; }
          61% { transform: scale(1.18); opacity: .3; }
          71% { transform: scale(.98); opacity: .17; }
        }
        .convergence-card > * { position: relative; z-index: 2; }
        .convergence-card .corner-label { color: #e6e8ef; font: 900 10px ui-monospace, monospace; letter-spacing: .17em; }
        .convergence-card h3 { max-width: 700px; margin: 96px 0 0; font-size: clamp(42px, 6vw, 76px); line-height: .92; letter-spacing: -.058em; }
        .convergence-card p { max-width: 670px; color: #c0c4ce; font-size: 17px; line-height: 1.65; }
        .closing { position: relative; z-index: 4; padding: 94px 0 126px; }
        .closing-card { border-radius: 30px; padding: clamp(28px, 5vw, 50px); }
        .closing-card strong { display: block; max-width: 900px; font-size: clamp(40px, 6vw, 78px); line-height: .94; letter-spacing: -.058em; }
        .closing-card p { max-width: 840px; color: #b9bec8; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .cta { display: inline-flex; padding: 12px 16px; border-radius: 999px; color: #fff; background: linear-gradient(90deg, #d51d35, #176fdc); text-decoration: none; font-weight: 950; }
        .cta.secondary { color: #dfe2e9; background: rgba(4,5,8,.68); border: 1px solid rgba(255,255,255,.2); }
        footer { position: relative; z-index: 4; padding: 40px 0 72px; color: #767d8a; }
        footer a { color: #dfe2e9; }
        .ekg-deck {
          position: fixed;
          left: max(10px, env(safe-area-inset-left));
          right: max(10px, env(safe-area-inset-right));
          bottom: max(10px, env(safe-area-inset-bottom));
          z-index: 80;
          max-width: 760px;
          margin: 0 auto;
          padding: 10px 12px 12px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 20px;
          background: rgba(5,6,10,.84);
          box-shadow: 0 22px 70px rgba(0,0,0,.58);
          backdrop-filter: blur(18px);
        }
        .ekg-head { display: flex; justify-content: space-between; gap: 12px; color: #929aa8; font: 850 9px ui-monospace, monospace; letter-spacing: .11em; }
        .ekg-head strong { color: #f1f3f7; text-align: right; }
        .ekg-screen {
          position: relative;
          height: 62px;
          margin-top: 7px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 12px;
          background:
            linear-gradient(rgba(91,213,142,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,213,142,.05) 1px, transparent 1px),
            #040806;
          background-size: 12px 12px;
        }
        .ekg-screen svg { width: 100%; height: 100%; display: block; }
        .ekg-baseline { fill: none; stroke: rgba(91,213,142,.15); stroke-width: 1; }
        .ekg-trace { fill: none; stroke: #5bd58e; stroke-width: 3; vector-effect: non-scaling-stroke; filter: drop-shadow(0 0 6px rgba(91,213,142,.68)); }
        .st-segment { fill: none; stroke: #f1ff9a; stroke-width: 4; vector-effect: non-scaling-stroke; filter: drop-shadow(0 0 9px rgba(241,255,154,.9)); }
        .st-zone { position: absolute; left: 64.8%; width: 8.7%; top: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(241,255,154,.09), transparent); }
        .ekg-scanner {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: #eafff1;
          box-shadow: 0 0 14px #5bd58e, 0 0 28px rgba(91,213,142,.72);
          animation: ekgSweep var(--beat) linear infinite;
        }
        .ekg-scanner i { position: absolute; left: 50%; top: 61%; width: 8px; height: 8px; border-radius: 50%; background: #fff; transform: translate(-50%,-50%); box-shadow: 0 0 18px #fff; }
        @keyframes ekgSweep { from { transform: translateX(0); } to { transform: translateX(calc(100vw - 46px)); } }
        @media (min-width: 790px) { @keyframes ekgSweep { from { transform: translateX(0); } to { transform: translateX(718px); } } }
        @media (max-width: 900px) {
          .hero-grid, .section-head, .convergence-grid { grid-template-columns: 1fr; }
          .card-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 22px, 1160px); }
          .nav-inner { align-items: flex-start; padding: 10px 0; }
          .nav-actions { flex-wrap: wrap; justify-content: flex-end; }
          .nav-actions a, .replay { padding: 7px 8px; font-size: 8px; }
          .hero-grid { padding: 60px 0 110px; }
          h1 { font-size: clamp(55px, 17vw, 82px); }
          .section { padding: 64px 0; }
          .signal-card { min-height: 265px; }
          .convergence-zone { padding-top: 78px; padding-bottom: 92px; }
          .convergence-card { min-height: 420px; padding: 24px; }
          .convergence-card h3 { margin-top: 78px; }
          .ekg-head { font-size: 7px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vessel-stroke, .vessel-pulse { animation: none; stroke-dashoffset: 0; }
          .vessel-pulse { opacity: 0; }
          .convergence-card::before, .convergence-card::after { animation: none; }
          .ekg-scanner { animation: none; left: 64%; }
        }
      `}</style>

      <VascularSvg field={field} replayKey={replayKey} />

      <nav className="nav content-layer">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span className="red">ARTERY</span> / <span className="blue">VEIN</span></a>
          <div className="nav-actions">
            <a href="/living-signals">Signal portfolio</a>
            <a href="/operating-map">Page index</a>
            <button type="button" className="replay" onClick={replay}>RESTART FLOW</button>
          </div>
        </div>
      </nav>

      <header className="hero content-layer">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">LIVING SIGNAL 11 // DUAL VASCULAR CONVERGENCE</div>
            <h1><span className="artery">Arteries descend.</span><span className="vein">Veins rise.</span></h1>
            <p className="lead">A red arterial system grows slowly from the upper-left while a blue venous system advances from the lower-right. Each major vessel divides into smaller branches until both fields terminate as capillaries near the same exchange zone.</p>
          </div>
          <aside className="hero-card">
            <b>ONE CLOCK // THREE SIGNALS</b>
            <strong>Growth. Pulse. EKG.</strong>
            <p>The vascular networks and scanner share one heartbeat cycle. The complete field brightens when the EKG scanner reaches the QRS-to-ST transition, then settles before the next pass.</p>
            <div className="legend">
              <span><i className="artery-line" /> OXYGENATED / UPPER-LEFT</span>
              <span><i className="vein-line" /> RETURN FLOW / LOWER-RIGHT</span>
            </div>
          </aside>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Vascular hierarchy</div><h2>Every large line earns its capillaries.</h2></div>
            <p>The page no longer grows one root from one edge. Two independent circulation trees establish pressure vessels, branch into smaller lines, truncate at different distances, and repeatedly divide until the final paths are nearly hairline.</p>
          </div>
          <div className="card-grid">
            {cards.map((card) => (
              <article className="signal-card" key={card.code}>
                <b>{card.code}</b><h3>{card.title}</h3><p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section convergence-zone">
        <div className="shell convergence-grid">
          <div className="convergence-copy">
            <div className="section-label">Exchange field</div>
            <h2>They grow toward each other without becoming the same system.</h2>
            <p>Red and blue remain visibly distinct all the way into the middle. Their terminal capillaries overlap inside the same central territory, creating a shared exchange zone rather than one merged purple trunk.</p>
          </div>
          <article className="convergence-card">
            <div className="corner-label">SYNCHRONIZED EVENT // QRS → ST</div>
            <h3>The beat arrives when the scanner reaches the work.</h3>
            <p>The EKG scanner is not decorative timing. Its sweep defines the heartbeat phase used by both vascular fields and the central exchange glow. Watch the ST segment: that is where the complete page fires together.</p>
          </article>
        </div>
      </section>

      <section className="closing content-layer">
        <div className="shell">
          <article className="closing-card">
            <div className="section-label">NULLWORKS Living Signal Portfolio</div>
            <strong>Two networks. One pulse. One measured moment of convergence.</strong>
            <p>Capillary Convergence replaces the botanical root experiment with a dual circulation system: large red arteries, large blue veins, recursive branch hierarchy, capillary termination, slow opposing growth, and an EKG scanner synchronized to the visible heartbeat.</p>
            <div className="cta-row">
              <a className="cta" href="/living-signals">Open the signal portfolio</a>
              <a className="cta secondary" href="/living-signals/bleeding-matrix">Return to Bleeding Matrix</a>
            </div>
          </article>
        </div>
      </section>

      <footer><div className="shell">NULLWORKS Living Signals // Capillary Convergence. <a href="/living-signals">Browse all eleven signals →</a></div></footer>
      <EkgDeck />
    </main>
  );
}
