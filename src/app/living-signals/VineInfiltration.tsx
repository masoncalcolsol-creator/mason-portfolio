"use client";

import { useEffect, useRef, useState } from "react";

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};

type VinePath = {
  d: string;
  width: number;
  delay: number;
  duration: number;
  opacity: number;
};

type Leaf = {
  x: number;
  y: number;
  angle: number;
  scale: number;
  delay: number;
  layer: "back" | "front";
};

type Layout = {
  width: number;
  height: number;
  backPaths: VinePath[];
  frontPaths: VinePath[];
  leaves: Leaf[];
};

const emptyLayout: Layout = {
  width: 1,
  height: 1,
  backPaths: [],
  frontPaths: [],
  leaves: [],
};

const cards = [
  {
    code: "01",
    title: "Growth starts below the interface.",
    body: "The first stems rise from beneath the page rather than appearing as decorative borders pasted onto the cards.",
  },
  {
    code: "02",
    title: "Most of the organism stays behind the structure.",
    body: "Dark stems and leaves remain visible through translucent surfaces without competing with the text.",
  },
  {
    code: "03",
    title: "The gaps become pathways.",
    body: "Branches deliberately seek the negative space between panels, headlines, and section boundaries.",
  },
  {
    code: "04",
    title: "One branch breaks the plane.",
    body: "A foreground vine climbs the outer edge of this card and crawls across its corner to prove the layers are real.",
    front: true,
  },
  {
    code: "05",
    title: "Leaves open after the stem arrives.",
    body: "Secondary growth follows the primary path, creating an actual sequence instead of a looping green particle field.",
  },
  {
    code: "06",
    title: "The page can be regrown.",
    body: "The animation can restart without reloading, preserving the page as a testable interaction system.",
  },
];

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

function buildLayout(root: HTMLElement): Layout {
  const rootRect = root.getBoundingClientRect();
  const width = Math.max(1, root.clientWidth);
  const height = Math.max(1, root.scrollHeight);
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-vine-target]"))
    .map((element) => toBox(element, rootRect))
    .sort((a, b) => a.top - b.top);

  if (!targets.length) return { ...emptyLayout, width, height };

  const backPaths: VinePath[] = [];
  const frontPaths: VinePath[] = [];
  const leaves: Leaf[] = [];
  const descending = [...targets].sort((a, b) => b.top - a.top);

  let mainX = width * 0.5;
  let mainY = height + 36;
  let main = `M ${mainX.toFixed(1)} ${mainY.toFixed(1)}`;

  descending.forEach((box, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    const nextX = side < 0 ? box.left - 24 : box.right + 24;
    const nextY = box.top + box.height * (0.34 + (index % 3) * 0.14);
    const midY = mainY - Math.max(100, (mainY - nextY) * 0.52);
    main += ` C ${(mainX + side * 86).toFixed(1)} ${midY.toFixed(1)}, ${(nextX - side * 72).toFixed(1)} ${(nextY + 82).toFixed(1)}, ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;

    leaves.push({
      x: nextX + side * 2,
      y: nextY + 4,
      angle: side < 0 ? -34 : 34,
      scale: 0.82 + (index % 3) * 0.16,
      delay: 2.6 + index * 0.55,
      layer: "back",
    });

    if (index % 2 === 0) {
      const branchEndX = side < 0 ? box.right - box.width * 0.2 : box.left + box.width * 0.2;
      const branchEndY = box.top + box.height * 0.18;
      backPaths.push({
        d: `M ${nextX.toFixed(1)} ${nextY.toFixed(1)} C ${(nextX + side * 48).toFixed(1)} ${(nextY - 34).toFixed(1)}, ${(branchEndX - side * 54).toFixed(1)} ${(branchEndY + 24).toFixed(1)}, ${branchEndX.toFixed(1)} ${branchEndY.toFixed(1)}`,
        width: 3.2,
        delay: 3.1 + index * 0.46,
        duration: 2.6,
        opacity: 0.72,
      });
      leaves.push({
        x: branchEndX,
        y: branchEndY,
        angle: side < 0 ? 28 : -28,
        scale: 0.72,
        delay: 4 + index * 0.42,
        layer: "back",
      });
    }

    mainX = nextX;
    mainY = nextY;
  });

  backPaths.unshift({
    d: main,
    width: 7.5,
    delay: 0.15,
    duration: 9.2,
    opacity: 0.86,
  });

  const rootXs = [width * 0.12, width * 0.83];
  rootXs.forEach((rootX, rootIndex) => {
    const selected = descending.filter((_, index) => index % 2 === rootIndex).slice(0, 4);
    let x = rootX;
    let y = height + 22;
    let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    selected.forEach((box, index) => {
      const targetX = rootIndex === 0 ? box.left + box.width * 0.16 : box.right - box.width * 0.16;
      const targetY = box.bottom - box.height * (0.18 + index * 0.08);
      const bend = rootIndex === 0 ? 78 : -78;
      d += ` C ${(x + bend).toFixed(1)} ${(y - 120).toFixed(1)}, ${(targetX - bend * 0.7).toFixed(1)} ${(targetY + 110).toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
      leaves.push({
        x: targetX,
        y: targetY,
        angle: rootIndex === 0 ? -42 : 42,
        scale: 0.65 + index * 0.09,
        delay: 3.5 + rootIndex * 0.7 + index * 0.75,
        layer: "back",
      });
      x = targetX;
      y = targetY;
    });
    backPaths.push({
      d,
      width: 5.4,
      delay: 0.7 + rootIndex * 0.55,
      duration: 8.1,
      opacity: 0.68,
    });
  });

  const frontElement = root.querySelector<HTMLElement>("[data-vine-front]");
  if (frontElement) {
    const box = toBox(frontElement, rootRect);
    const startX = Math.min(width - 10, box.right + 92);
    const startY = box.bottom + 220;
    const cornerX = box.right + 3;
    const cornerY = box.top + 18;
    const crossX = box.left + box.width * 0.43;
    const crossY = box.top + 8;
    const d = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(box.right + 44).toFixed(1)} ${(box.bottom + 120).toFixed(1)}, ${(box.right + 14).toFixed(1)} ${(box.top + box.height * 0.58).toFixed(1)}, ${cornerX.toFixed(1)} ${cornerY.toFixed(1)}`,
      `C ${(box.right - 18).toFixed(1)} ${(box.top - 10).toFixed(1)}, ${(box.right - 86).toFixed(1)} ${(box.top + 1).toFixed(1)}, ${crossX.toFixed(1)} ${crossY.toFixed(1)}`,
      `C ${(crossX - 44).toFixed(1)} ${(crossY + 2).toFixed(1)}, ${(crossX - 92).toFixed(1)} ${(crossY + 30).toFixed(1)}, ${(crossX - 122).toFixed(1)} ${(crossY + 55).toFixed(1)}`,
    ].join(" ");

    frontPaths.push({
      d,
      width: 8.6,
      delay: 5.4,
      duration: 5.6,
      opacity: 0.96,
    });

    [
      { x: box.right + 7, y: box.top + box.height * 0.68, angle: 38, scale: 1 },
      { x: box.right - 8, y: box.top + 20, angle: -52, scale: 1.12 },
      { x: box.right - box.width * 0.2, y: box.top + 8, angle: 26, scale: 0.92 },
      { x: crossX - 82, y: crossY + 28, angle: -28, scale: 0.82 },
    ].forEach((leaf, index) => {
      leaves.push({ ...leaf, delay: 7 + index * 0.48, layer: "front" });
    });
  }

  return { width, height, backPaths, frontPaths, leaves };
}

function VineSvg({ layout, layer, growthKey }: { layout: Layout; layer: "back" | "front"; growthKey: number }) {
  const paths = layer === "back" ? layout.backPaths : layout.frontPaths;
  const leaves = layout.leaves.filter((leaf) => leaf.layer === layer);
  const gradientId = layer === "back" ? "vine-back-gradient" : "vine-front-gradient";

  return (
    <svg
      key={`${layer}-${growthKey}`}
      className={layer === "back" ? "vine-layer vine-layer-back" : "vine-layer vine-layer-front"}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={layer === "back" ? "#123b1e" : "#1d5a29"} />
          <stop offset="0.45" stopColor={layer === "back" ? "#2d7e3e" : "#49b85b"} />
          <stop offset="1" stopColor={layer === "back" ? "#79d47b" : "#a8f08e"} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={layer === "back" ? "2.5" : "4"} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {paths.map((path, index) => (
        <path
          key={`${layer}-path-${index}`}
          d={path.d}
          pathLength={1}
          className="vine-stem"
          stroke={`url(#${gradientId})`}
          strokeWidth={path.width}
          opacity={path.opacity}
          filter={layer === "front" ? `url(#${gradientId}-glow)` : undefined}
          style={{ animationDelay: `${path.delay}s`, animationDuration: `${path.duration}s` }}
        />
      ))}

      {leaves.map((leaf, index) => (
        <g key={`${layer}-leaf-${index}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale})`}>
          <path
            className="vine-leaf"
            style={{ animationDelay: `${leaf.delay}s` }}
            d="M 0 0 C 11 -16, 31 -15, 39 0 C 29 13, 11 15, 0 0 Z"
            fill={layer === "front" ? "#72d66f" : "#3f9c4b"}
            stroke={layer === "front" ? "#c1f5a4" : "#75c67a"}
            strokeWidth="1"
          />
          <path d="M 3 0 C 15 0, 25 0, 35 0" stroke="rgba(229,255,211,.58)" strokeWidth="1" fill="none" />
        </g>
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
          --leaf: #72d66f;
          --leaf-bright: #b7f59a;
          --moss: #21462a;
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
        .vine-layer { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
        .vine-layer-back { z-index: 1; mix-blend-mode: screen; opacity: .9; }
        .vine-layer-front { z-index: 8; mix-blend-mode: screen; }
        .vine-stem {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation-name: vineGrow;
          animation-timing-function: cubic-bezier(.19,.72,.24,1);
          animation-fill-mode: forwards;
        }
        .vine-leaf {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scale(0) rotate(-12deg);
          opacity: 0;
          animation: leafOpen 1.1s cubic-bezier(.18,.86,.22,1.25) forwards;
        }
        @keyframes vineGrow { to { stroke-dashoffset: 0; } }
        @keyframes leafOpen { to { transform: scale(1) rotate(0deg); opacity: 1; } }
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
        .brand span { color: var(--leaf-bright); }
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
        .regrow { color: #061008; background: var(--leaf-bright); border-color: var(--leaf-bright); }
        .hero { min-height: 92svh; display: grid; align-items: center; border-bottom: 1px solid rgba(173,231,157,.12); }
        .hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 30px; align-items: end; padding: 88px 0 112px; }
        .eyebrow { color: var(--leaf-bright); font: 900 11px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; }
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
        .hero-card b { color: var(--leaf-bright); font: 900 10px ui-monospace, monospace; letter-spacing: .15em; }
        .hero-card strong { display: block; margin-top: 16px; font-size: clamp(31px, 4.3vw, 54px); line-height: .94; letter-spacing: -.052em; }
        .hero-card p { color: #b4c7b0; line-height: 1.68; }
        .section { position: relative; z-index: 4; padding: 86px 0; border-bottom: 1px solid rgba(173,231,157,.11); }
        .section-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: var(--leaf-bright); font: 900 10px ui-monospace, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h2 { max-width: 900px; margin: 12px 0 0; font-size: clamp(42px, 6.4vw, 80px); line-height: .94; letter-spacing: -.058em; }
        .section-head p { color: #afc0ab; font-size: 17px; line-height: 1.68; }
        .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .signal-card { min-height: 290px; border-radius: 24px; padding: 22px; overflow: visible; }
        .signal-card::after { content: ""; position: absolute; inset: 12px; border: 1px solid rgba(183,245,154,.06); border-radius: 17px; pointer-events: none; }
        .signal-card b { color: var(--leaf-bright); font: 950 12px ui-monospace, monospace; letter-spacing: .14em; }
        .signal-card h3 { max-width: 560px; margin: 58px 0 0; font-size: clamp(30px, 4vw, 52px); line-height: .96; letter-spacing: -.048em; }
        .signal-card p { max-width: 620px; color: #b5c7b1; line-height: 1.62; }
        .feature-zone { padding-top: 102px; padding-bottom: 118px; }
        .feature-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 22px; align-items: center; }
        .feature-copy p { color: #afc0ab; font-size: 18px; line-height: 1.72; }
        .feature-card { min-height: 460px; border-radius: 31px; padding: 28px; overflow: visible; }
        .feature-card .corner-label { color: var(--leaf-bright); font: 900 10px ui-monospace, monospace; letter-spacing: .17em; }
        .feature-card h3 { max-width: 700px; margin: 92px 0 0; font-size: clamp(42px, 6vw, 76px); line-height: .92; letter-spacing: -.058em; }
        .feature-card p { max-width: 670px; color: #bdcdb9; font-size: 17px; line-height: 1.65; }
        .closing { position: relative; z-index: 4; padding: 92px 0 120px; }
        .closing-card { border-radius: 30px; padding: clamp(28px, 5vw, 50px); }
        .closing-card strong { display: block; max-width: 900px; font-size: clamp(40px, 6vw, 78px); line-height: .94; letter-spacing: -.058em; }
        .closing-card p { max-width: 840px; color: #b7c7b3; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .cta { display: inline-flex; padding: 12px 16px; border-radius: 999px; color: #061008; background: var(--leaf-bright); text-decoration: none; font-weight: 950; }
        .cta.secondary { color: var(--leaf-bright); background: rgba(4,8,5,.65); border: 1px solid rgba(183,245,154,.38); }
        footer { position: relative; z-index: 4; padding: 40px 0 70px; color: #72836f; }
        footer a { color: var(--leaf-bright); }
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
          .vine-stem { animation: none; stroke-dashoffset: 0; }
          .vine-leaf { animation: none; transform: scale(1); opacity: 1; }
        }
      `}</style>

      <VineSvg layout={layout} layer="back" growthKey={growthKey} />
      <VineSvg layout={layout} layer="front" growthKey={growthKey} />

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
            <div className="eyebrow">LIVING SIGNAL 11 // ORGANIC INTERFACE INTRUSION</div>
            <h1>The system starts growing.<span>Then it stops respecting the boxes.</span></h1>
            <p className="lead">Green vines rise from the bottom of the page, seek the negative space between content panels, and eventually cross the interface boundary into the foreground.</p>
          </div>
          <aside className="hero-card" data-vine-target>
            <b>PLANE-SWITCHING GROWTH</b>
            <strong>Behind. Between. Across.</strong>
            <p>Most growth remains atmospheric. One deliberate foreground branch proves the organism can move from background environment to physical-looking interface object.</p>
          </aside>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Growth logic</div><h2>The vines use the layout as terrain.</h2></div>
            <p>The paths are measured from the actual positions of the cards after the page renders. They are not a canned wallpaper animation, so the stems respond to mobile and desktop layout changes.</p>
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
            <h2>One vine jumps planes.</h2>
            <p>The brighter stem climbs outside the card, rolls over the top-right corner, and crosses the content plane. It happens later than the background growth so the layer transition reads as an event.</p>
          </div>
          <article className="feature-card" data-vine-target data-vine-front>
            <div className="corner-label">FOREGROUND BRANCH // DELAYED EVENT</div>
            <h3>The page is no longer containing the signal.</h3>
            <p>The branch is rendered on a separate foreground SVG layer above the text-box plane. The leaves open only after the stem has crawled across the edge.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Secondary growth</div><h2>The effect stays structured instead of becoming jungle noise.</h2></div>
            <p>Different stems have different thickness, timing, and opacity. The main trunk carries continuity; side branches and leaves provide controlled complexity.</p>
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
            <strong>The interface becomes habitat.</strong>
            <p>Vine Infiltration tests a different kind of living page: growth that reads the layout, respects most boundaries, then intentionally violates one. Use Regrow to restart the complete sequence.</p>
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
