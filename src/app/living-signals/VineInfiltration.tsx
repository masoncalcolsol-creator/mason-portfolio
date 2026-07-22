"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};

type RootPath = {
  d: string;
  width: number;
  delay: number;
  duration: number;
  opacity: number;
};

type Layout = {
  width: number;
  height: number;
  backPaths: RootPath[];
  frontPaths: RootPath[];
};

const emptyLayout: Layout = {
  width: 1,
  height: 1,
  backPaths: [],
  frontPaths: [],
};

const cards = [
  {
    code: "01",
    title: "The primary vessel establishes first.",
    body: "A narrow central root rises slowly from below the interface and carries the continuity of the complete system.",
  },
  {
    code: "02",
    title: "Each vessel fractures into smaller vessels.",
    body: "Secondary branches split again into tertiary roots and finally into hairline capillaries instead of ending as decorative leaves.",
  },
  {
    code: "03",
    title: "The timing refuses perfect synchronization.",
    body: "New fractures emerge at uneven intervals around two seconds apart, producing biological growth rather than a coordinated animation cue.",
  },
  {
    code: "04",
    title: "One vascular branch breaks the plane.",
    body: "A thin foreground vessel climbs the outer edge of this card, crosses the corner, and fractures across the content plane.",
    front: true,
  },
  {
    code: "05",
    title: "The final generation becomes tiny fingers.",
    body: "Every generation loses diameter and reach until the network terminates in fine capillary threads.",
  },
  {
    code: "06",
    title: "The complete root system can regrow.",
    body: "Regrow restarts the staggered vascular sequence without reloading the page or changing the measured terrain.",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const between = (seed: number, min: number, max: number) => min + noise(seed) * (max - min);

function toBox(element: HTMLElement, rootRect: DOMRect): Box {
  const rect = element.getBoundingClientRect();
  const left = rect.left - rootRect.left;
  const top = rect.top - rootRect.top;
  return {
    left,
    top,
    width: rect.width,
    height: rect.height,
    right: left + rect.width,
    bottom: top + rect.height,
  };
}

function curvedSegment(start: Point, end: Point, seed: number) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const normalX = -dy / length;
  const normalY = dx / length;
  const wobble = between(seed, -0.18, 0.18) * length;
  return [
    `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
    `C ${(start.x + dx * 0.31 + normalX * wobble).toFixed(1)} ${(start.y + dy * 0.31 + normalY * wobble).toFixed(1)},`,
    `${(start.x + dx * 0.69 - normalX * wobble * 0.72).toFixed(1)} ${(start.y + dy * 0.69 - normalY * wobble * 0.72).toFixed(1)},`,
    `${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
  ].join(" ");
}

function fracture(
  paths: RootPath[],
  start: Point,
  angle: number,
  length: number,
  generation: number,
  delay: number,
  seed: number,
  bounds: { width: number; height: number },
  foreground = false,
) {
  const widths = foreground ? [0.96, 0.5, 0.24] : [1.08, 0.54, 0.24];
  const durations = [11.8, 8.4, 5.8];
  const end = {
    x: clamp(start.x + Math.cos(angle) * length, 4, bounds.width - 4),
    y: clamp(start.y + Math.sin(angle) * length, 4, bounds.height - 4),
  };

  paths.push({
    d: curvedSegment(start, end, seed),
    width: widths[generation],
    delay,
    duration: durations[generation] * between(seed + 2, 0.86, 1.18),
    opacity: foreground ? 0.92 - generation * 0.13 : 0.68 - generation * 0.12,
  });

  if (generation >= 2 || Math.hypot(end.x - start.x, end.y - start.y) < 22) return;

  const childCount = generation === 0 && noise(seed + 9) > 0.58 ? 3 : 2;
  const spread = generation === 0 ? 0.54 : 0.72;

  for (let child = 0; child < childCount; child += 1) {
    const centered = child - (childCount - 1) / 2;
    const childAngle = angle + centered * spread + between(seed + child * 17, -0.17, 0.17);
    const childLength = length * between(seed + child * 23 + generation, 0.46, 0.66);
    const splitDelay = delay + between(seed + child * 31 + generation * 7, 1.45, 2.85) + child * 0.22;
    fracture(
      paths,
      end,
      childAngle,
      childLength,
      generation + 1,
      splitDelay,
      seed * 7.13 + child * 19.7 + generation * 41,
      bounds,
      foreground,
    );
  }
}

function buildLayout(root: HTMLElement): Layout {
  const rootRect = root.getBoundingClientRect();
  const width = Math.max(1, root.clientWidth);
  const height = Math.max(1, root.scrollHeight);
  const bounds = { width, height };
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-vine-target]"))
    .map((element) => toBox(element, rootRect))
    .sort((a, b) => a.top - b.top);

  if (!targets.length) return { ...emptyLayout, width, height };

  const backPaths: RootPath[] = [];
  const frontPaths: RootPath[] = [];
  const descending = [...targets].sort((a, b) => b.top - a.top);

  let mainX = width * 0.5;
  let mainY = height + 36;
  let main = `M ${mainX.toFixed(1)} ${mainY.toFixed(1)}`;
  const mainAnchors: Array<{ point: Point; side: number; box: Box; delay: number; seed: number }> = [];

  descending.forEach((box, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    const nextX = side < 0 ? box.left - 18 : box.right + 18;
    const nextY = box.top + box.height * (0.31 + (index % 3) * 0.13);
    const midY = mainY - Math.max(120, (mainY - nextY) * 0.54);
    main += ` C ${(mainX + side * 66).toFixed(1)} ${midY.toFixed(1)}, ${(nextX - side * 56).toFixed(1)} ${(nextY + 94).toFixed(1)}, ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;

    mainAnchors.push({
      point: { x: nextX, y: nextY },
      side,
      box,
      delay: 2.4 + index * between(index + 8, 1.75, 2.5),
      seed: 101 + index * 37,
    });

    mainX = nextX;
    mainY = nextY;
  });

  backPaths.push({
    d: main,
    width: 2.5,
    delay: 0.35,
    duration: 29.5,
    opacity: 0.84,
  });

  mainAnchors.forEach(({ point, side, box, delay, seed }, index) => {
    const outwardAngle = side < 0 ? -2.42 : -0.72;
    const inwardAngle = side < 0 ? -0.98 : -2.16;
    const primaryLength = clamp(box.width * 0.38, 90, 190);

    fracture(backPaths, point, outwardAngle, primaryLength, 0, delay, seed, bounds);
    fracture(
      backPaths,
      point,
      inwardAngle + between(seed + 3, -0.16, 0.16),
      primaryLength * 0.76,
      0,
      delay + between(seed + 5, 1.3, 2.4),
      seed + 503,
      bounds,
    );

    if (index % 2 === 0) {
      const horizontalAngle = side < 0 ? Math.PI : 0;
      fracture(
        backPaths,
        point,
        horizontalAngle + between(seed + 11, -0.34, 0.34),
        clamp(box.width * 0.26, 62, 132),
        0,
        delay + between(seed + 15, 2.1, 3.8),
        seed + 907,
        bounds,
      );
    }
  });

  const rootXs = [width * 0.1, width * 0.88];
  rootXs.forEach((rootX, rootIndex) => {
    const selected = descending.filter((_, index) => index % 2 === rootIndex).slice(0, 5);
    let x = rootX;
    let y = height + 24;
    let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;

    selected.forEach((box, index) => {
      const targetX = rootIndex === 0 ? box.left + box.width * 0.12 : box.right - box.width * 0.12;
      const targetY = box.bottom - box.height * (0.14 + index * 0.07);
      const bend = rootIndex === 0 ? 58 : -58;
      d += ` C ${(x + bend).toFixed(1)} ${(y - 150).toFixed(1)}, ${(targetX - bend * 0.7).toFixed(1)} ${(targetY + 128).toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;

      const branchDelay = 3.2 + rootIndex * 1.1 + index * between(index + rootIndex * 13, 1.8, 2.7);
      const angle = rootIndex === 0 ? -0.82 : -2.32;
      fracture(
        backPaths,
        { x: targetX, y: targetY },
        angle + between(index + rootIndex * 71, -0.23, 0.23),
        clamp(box.width * 0.3, 72, 148),
        0,
        branchDelay,
        1401 + rootIndex * 311 + index * 43,
        bounds,
      );

      x = targetX;
      y = targetY;
    });

    backPaths.push({
      d,
      width: 1.8,
      delay: 1.2 + rootIndex * 1.05,
      duration: 25.5 + rootIndex * 2.4,
      opacity: 0.62,
    });
  });

  const frontElement = root.querySelector<HTMLElement>("[data-vine-front]");
  if (frontElement) {
    const box = toBox(frontElement, rootRect);
    const start = { x: Math.min(width - 8, box.right + 76), y: box.bottom + 220 };
    const corner = { x: box.right + 2, y: box.top + 18 };
    const cross = { x: box.left + box.width * 0.43, y: box.top + 8 };
    const end = { x: cross.x - 122, y: cross.y + 56 };
    const foregroundPath = [
      `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
      `C ${(box.right + 38).toFixed(1)} ${(box.bottom + 132).toFixed(1)}, ${(box.right + 11).toFixed(1)} ${(box.top + box.height * 0.56).toFixed(1)}, ${corner.x.toFixed(1)} ${corner.y.toFixed(1)}`,
      `C ${(box.right - 18).toFixed(1)} ${(box.top - 8).toFixed(1)}, ${(box.right - 82).toFixed(1)} ${(box.top + 2).toFixed(1)}, ${cross.x.toFixed(1)} ${cross.y.toFixed(1)}`,
      `C ${(cross.x - 44).toFixed(1)} ${(cross.y + 2).toFixed(1)}, ${(cross.x - 92).toFixed(1)} ${(cross.y + 31).toFixed(1)}, ${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
    ].join(" ");

    frontPaths.push({
      d: foregroundPath,
      width: 2.85,
      delay: 16.8,
      duration: 18.5,
      opacity: 0.94,
    });

    const foregroundAnchors = [
      { point: { x: box.right + 2, y: box.top + box.height * 0.63 }, angle: -2.58, delay: 20.1, seed: 3101 },
      { point: corner, angle: -2.9, delay: 22.3, seed: 3203 },
      { point: cross, angle: 2.72, delay: 24.2, seed: 3307 },
      { point: end, angle: -2.35, delay: 26.7, seed: 3413 },
    ];

    foregroundAnchors.forEach(({ point, angle, delay, seed }) => {
      fracture(frontPaths, point, angle, clamp(box.width * 0.2, 62, 118), 0, delay, seed, bounds, true);
    });
  }

  return { width, height, backPaths, frontPaths };
}

function RootSvg({ layout, layer, growthKey }: { layout: Layout; layer: "back" | "front"; growthKey: number }) {
  const paths = layer === "back" ? layout.backPaths : layout.frontPaths;
  const gradientId = layer === "back" ? "root-back-gradient" : "root-front-gradient";

  return (
    <svg
      key={`${layer}-${growthKey}`}
      className={layer === "back" ? "root-layer root-layer-back" : "root-layer root-layer-front"}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={layer === "back" ? "#102d18" : "#1b4b25"} />
          <stop offset="0.48" stopColor={layer === "back" ? "#2b7138" : "#45a957"} />
          <stop offset="1" stopColor={layer === "back" ? "#69bc70" : "#a4e98d"} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={layer === "back" ? "0.9" : "1.6"} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {paths.map((path, index) => (
        <path
          key={`${layer}-root-${index}`}
          d={path.d}
          pathLength={1}
          className="root-stem"
          stroke={`url(#${gradientId})`}
          strokeWidth={path.width}
          opacity={path.opacity}
          filter={`url(#${gradientId}-glow)`}
          vectorEffect="non-scaling-stroke"
          style={{ animationDelay: `${path.delay}s`, animationDuration: `${path.duration}s` }}
        />
      ))}
    </svg>
  );
}

export default function VineInfiltration() {
  const rootRef = useRef<HTMLElement>(null);
  const [layout, setLayout] = useState<Layout>(emptyLayout);
  const [growthKey, setGrowthKey] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLayout(buildLayout(root)));
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

  const regrow = () => {
    setGrowthKey((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main ref={rootRef} className="vine-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #040805; }
        .vine-page {
          --root: #72d66f;
          --root-bright: #b7f59a;
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          color: #eff8ec;
          background:
            radial-gradient(circle at 15% 4%, rgba(74,153,78,.13), transparent 26rem),
            radial-gradient(circle at 86% 30%, rgba(119,205,103,.08), transparent 34rem),
            linear-gradient(180deg, #050a06 0%, #071009 45%, #030604 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .vine-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .16;
          background-image:
            linear-gradient(rgba(173,231,157,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(173,231,157,.05) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .root-layer { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
        .root-layer-back { z-index: 1; mix-blend-mode: screen; opacity: .94; }
        .root-layer-front { z-index: 8; mix-blend-mode: screen; }
        .root-stem {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation-name: rootGrow;
          animation-timing-function: cubic-bezier(.2,.5,.24,1);
          animation-fill-mode: forwards;
        }
        @keyframes rootGrow { to { stroke-dashoffset: 0; } }
        .shell { width: min(1160px, calc(100% - 30px)); margin: 0 auto; }
        .content-layer { position: relative; z-index: 4; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          border-bottom: 1px solid rgba(173,231,157,.13);
          background: rgba(4,8,5,.79);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 66px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .brand { color: #f2faef; text-decoration: none; font-size: 12px; font-weight: 950; letter-spacing: .14em; }
        .brand span { color: var(--root-bright); }
        .nav-actions { display: flex; gap: 7px; align-items: center; }
        .nav-actions a, .regrow {
          appearance: none;
          border: 1px solid rgba(183,245,154,.22);
          border-radius: 999px;
          padding: 8px 11px;
          color: #cfe2ca;
          background: rgba(255,255,255,.025);
          text-decoration: none;
          font: 850 10px ui-monospace, monospace;
          cursor: pointer;
        }
        .regrow { color: #061008; background: var(--root-bright); border-color: var(--root-bright); }
        .hero { min-height: 92svh; display: grid; align-items: center; border-bottom: 1px solid rgba(173,231,157,.12); }
        .hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 30px; align-items: end; padding: 88px 0 112px; }
        .eyebrow { color: var(--root-bright); font: 900 11px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; }
        h1 { max-width: 980px; margin: 18px 0 0; font-size: clamp(58px, 9.7vw, 126px); line-height: .82; letter-spacing: -.073em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(183,245,154,.72); }
        .lead { max-width: 820px; margin-top: 27px; color: #c3d2bf; font-size: clamp(18px, 2.1vw, 25px); line-height: 1.58; }
        .hero-card, .signal-card, .feature-card, .closing-card {
          position: relative;
          border: 1px solid rgba(138,218,128,.23);
          background: linear-gradient(145deg, rgba(34,72,42,.53), rgba(7,13,8,.82));
          box-shadow: 0 28px 90px rgba(0,0,0,.42);
          backdrop-filter: blur(11px);
        }
        .hero-card { border-radius: 28px; padding: 25px; }
        .hero-card b { color: var(--root-bright); font: 900 10px ui-monospace, monospace; letter-spacing: .15em; }
        .hero-card strong { display: block; margin-top: 16px; font-size: clamp(31px, 4.3vw, 54px); line-height: .94; letter-spacing: -.052em; }
        .hero-card p { color: #b4c7b0; line-height: 1.68; }
        .section { position: relative; z-index: 4; padding: 86px 0; border-bottom: 1px solid rgba(173,231,157,.11); }
        .section-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: var(--root-bright); font: 900 10px ui-monospace, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h2 { max-width: 900px; margin: 12px 0 0; font-size: clamp(42px, 6.4vw, 80px); line-height: .94; letter-spacing: -.058em; }
        .section-head p { color: #afc0ab; font-size: 17px; line-height: 1.68; }
        .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .signal-card { min-height: 290px; border-radius: 24px; padding: 22px; overflow: visible; }
        .signal-card::after { content: ""; position: absolute; inset: 12px; border: 1px solid rgba(183,245,154,.06); border-radius: 17px; pointer-events: none; }
        .signal-card b { color: var(--root-bright); font: 950 12px ui-monospace, monospace; letter-spacing: .14em; }
        .signal-card h3 { max-width: 560px; margin: 58px 0 0; font-size: clamp(30px, 4vw, 52px); line-height: .96; letter-spacing: -.048em; }
        .signal-card p { max-width: 620px; color: #b5c7b1; line-height: 1.62; }
        .feature-zone { padding-top: 102px; padding-bottom: 118px; }
        .feature-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 22px; align-items: center; }
        .feature-copy p { color: #afc0ab; font-size: 18px; line-height: 1.72; }
        .feature-card { min-height: 460px; border-radius: 31px; padding: 28px; overflow: visible; }
        .feature-card .corner-label { color: var(--root-bright); font: 900 10px ui-monospace, monospace; letter-spacing: .17em; }
        .feature-card h3 { max-width: 700px; margin: 92px 0 0; font-size: clamp(42px, 6vw, 76px); line-height: .92; letter-spacing: -.058em; }
        .feature-card p { max-width: 670px; color: #bdcdb9; font-size: 17px; line-height: 1.65; }
        .closing { position: relative; z-index: 4; padding: 92px 0 120px; }
        .closing-card { border-radius: 30px; padding: clamp(28px, 5vw, 50px); }
        .closing-card strong { display: block; max-width: 900px; font-size: clamp(40px, 6vw, 78px); line-height: .94; letter-spacing: -.058em; }
        .closing-card p { max-width: 840px; color: #b7c7b3; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .cta { display: inline-flex; padding: 12px 16px; border-radius: 999px; color: #061008; background: var(--root-bright); text-decoration: none; font-weight: 950; }
        .cta.secondary { color: var(--root-bright); background: rgba(4,8,5,.65); border: 1px solid rgba(183,245,154,.38); }
        footer { position: relative; z-index: 4; padding: 40px 0 70px; color: #72836f; }
        footer a { color: var(--root-bright); }
        @media (max-width: 900px) {
          .hero-grid, .section-head, .feature-grid { grid-template-columns: 1fr; }
          .card-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 22px, 1160px); }
          .nav-inner { align-items: flex-start; padding: 10px 0; }
          .nav-actions { flex-wrap: wrap; justify-content: flex-end; }
          .nav-actions a, .regrow { padding: 7px 8px; font-size: 8px; }
          .hero-grid { padding: 58px 0 92px; }
          h1 { font-size: clamp(56px, 17vw, 82px); }
          .section { padding: 62px 0; }
          .signal-card { min-height: 260px; }
          .feature-zone { padding-top: 72px; padding-bottom: 82px; }
          .feature-card { min-height: 410px; padding: 23px; }
          .feature-card h3 { margin-top: 74px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .root-stem { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <RootSvg layout={layout} layer="back" growthKey={growthKey} />
      <RootSvg layout={layout} layer="front" growthKey={growthKey} />

      <nav className="nav content-layer">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>LIVING SIGNALS</span></a>
          <div className="nav-actions">
            <a href="/living-signals">Signal portfolio</a>
            <a href="/operating-map">Page index</a>
            <button type="button" className="regrow" onClick={regrow}>REGROW</button>
          </div>
        </div>
      </nav>

      <header className="hero content-layer">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">LIVING SIGNAL 11 // VASCULAR ROOT FRACTURE</div>
            <h1>The system starts growing.<span>Then it fractures into capillaries.</span></h1>
            <p className="lead">Green root vessels rise from the bottom of the page, route through the measured gaps between content panels, and repeatedly split into smaller circulation-like fingers.</p>
          </div>
          <aside className="hero-card" data-vine-target>
            <b>THREE GENERATIONS OF FRACTURE</b>
            <strong>Vessel. Branch. Capillary.</strong>
            <p>The growth now behaves like roots, blood circulation, or mycelium: a narrow trunk establishes slowly, then uneven secondary and tertiary vessels fracture outward.</p>
          </aside>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Growth logic</div><h2>The layout becomes vascular terrain.</h2></div>
            <p>The paths are measured from the actual card positions after the page renders. Primary vessels seek the gaps; each arrival point becomes a new fracture source for smaller roots.</p>
          </div>
          <div className="card-grid">
            {cards.slice(0, 3).map((card) => (
              <article className="signal-card" data-vine-target key={card.code}>
                <b>{card.code}</b><h3>{card.title}</h3><p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section feature-zone">
        <div className="shell feature-grid">
          <div className="feature-copy">
            <div className="section-label">Foreground event</div>
            <h2>One vessel still jumps planes.</h2>
            <p>The foreground vessel is now one-third the old diameter. It climbs the card slowly, crosses the top-right corner, and then fractures into smaller capillaries across the content plane.</p>
          </div>
          <article className="feature-card" data-vine-target data-vine-front>
            <div className="corner-label">FOREGROUND CAPILLARY EVENT // DELAYED</div>
            <h3>The page is no longer containing the circulation.</h3>
            <p>The main crossing remains readable, but the final fingers become thin enough to feel like roots or capillaries rather than a heavy decorative vine.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Fracture hierarchy</div><h2>Every split loses diameter and gains complexity.</h2></div>
            <p>The primary vessels are roughly one-third their previous width. Secondary branches split at staggered intervals, tertiary roots split again, and the final generation resolves into hairline fingers.</p>
          </div>
          <div className="card-grid">
            {cards.slice(4).map((card) => (
              <article className="signal-card" data-vine-target key={card.code}>
                <b>{card.code}</b><h3>{card.title}</h3><p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing content-layer">
        <div className="shell">
          <article className="closing-card" data-vine-target>
            <div className="section-label">NULLWORKS Living Signal Portfolio</div>
            <strong>The interface becomes a circulatory habitat.</strong>
            <p>Vine Infiltration now tests slow vascular growth: measured terrain, three generations of fracture, uneven split timing, hairline capillaries, and one restrained foreground boundary crossing. Use Regrow to restart the complete sequence.</p>
            <div className="cta-row">
              <a className="cta" href="/living-signals">Open the signal portfolio</a>
              <a className="cta secondary" href="/living-signals/bleeding-matrix">Return to Bleeding Matrix</a>
            </div>
          </article>
        </div>
      </section>

      <footer><div className="shell">NULLWORKS Living Signals // Vine Infiltration. <a href="/living-signals">Browse all eleven signals →</a></div></footer>
    </main>
  );
}
