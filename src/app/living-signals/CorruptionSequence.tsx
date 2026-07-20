"use client";

import { useEffect, useRef, useState } from "react";

type RainColumn = {
  x: number;
  y: number;
  speed: number;
  length: number;
  seed: number;
};

type LogoGlyph = {
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  delay: number;
  char: string;
};

type OozePath = {
  x: number;
  anchorY: number;
  direction: 1 | -1;
  maxLength: number;
  width: number;
  delay: number;
  phase: number;
};

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|:+-=アイウエオカキクケコサシスセソタチツテト";
const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
const mix = (a: number, b: number, amount: number) => a + (b - a) * amount;

export default function CorruptionSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef(false);
  const [runId, setRunId] = useState(0);
  const [settled, setSettled] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState("BLACKOUT");

  const replay = () => {
    skipRef.current = false;
    setSettled(false);
    setPhaseLabel("BLACKOUT");
    setRunId((value) => value + 1);
  };

  const skip = () => {
    skipRef.current = true;
    setSettled(true);
    setPhaseLabel("CORRUPTION LOCKED");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrame = 0;
    let lastTime = performance.now();
    let startTime = performance.now();
    let rain: RainColumn[] = [];
    let logoGlyphs: LogoGlyph[] = [];
    let oozePaths: OozePath[] = [];
    let logoFontSize = 64;
    let logoY = 0;
    let logoLeft = 0;
    let logoWidth = 0;
    let lastPhase = "";
    let completionSent = false;

    const setPhase = (next: string) => {
      if (next === lastPhase) return;
      lastPhase = next;
      setPhaseLabel(next);
    };

    const rebuildRain = () => {
      const columnWidth = width < 680 ? 17 : 20;
      const count = Math.ceil(width / columnWidth) + 2;
      rain = Array.from({ length: count }, (_, index) => ({
        x: index * columnWidth,
        y: -Math.random() * height * 1.4,
        speed: 34 + Math.random() * 68,
        length: 7 + Math.floor(Math.random() * 20),
        seed: Math.floor(Math.random() * glyphs.length),
      }));
    };

    const rebuildLogo = () => {
      logoFontSize = Math.min(148, Math.max(48, width / 5.65));
      logoY = height * 0.46;

      const mask = document.createElement("canvas");
      mask.width = Math.max(1, Math.floor(width));
      mask.height = Math.max(1, Math.floor(height));
      const maskContext = mask.getContext("2d", { willReadFrequently: true });
      if (!maskContext) return;

      maskContext.clearRect(0, 0, width, height);
      maskContext.font = `950 ${logoFontSize}px Inter, Arial Black, sans-serif`;
      maskContext.textAlign = "center";
      maskContext.textBaseline = "middle";
      const measurement = maskContext.measureText("NULLWORKS");
      logoWidth = measurement.width;
      logoLeft = width / 2 - logoWidth / 2;
      maskContext.fillStyle = "#fff";
      maskContext.fillText("NULLWORKS", width / 2, logoY);

      const image = maskContext.getImageData(0, 0, mask.width, mask.height);
      const step = width < 680 ? 8 : 9;
      const points: Array<{ x: number; y: number }> = [];
      const top = Math.max(0, Math.floor(logoY - logoFontSize * 0.7));
      const bottom = Math.min(height, Math.ceil(logoY + logoFontSize * 0.7));
      const left = Math.max(0, Math.floor(logoLeft - 8));
      const right = Math.min(width, Math.ceil(logoLeft + logoWidth + 8));

      for (let y = top; y < bottom; y += step) {
        for (let x = left; x < right; x += step) {
          const alpha = image.data[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3];
          if (alpha > 90) points.push({ x, y });
        }
      }

      logoGlyphs = points.map((point, index) => ({
        targetX: point.x,
        targetY: point.y,
        startX: point.x + (Math.random() - 0.5) * Math.min(190, width * 0.35),
        startY: -30 - Math.random() * height * 0.85,
        delay: Math.random() * 0.42,
        char: glyphs[(index * 7 + Math.floor(Math.random() * glyphs.length)) % glyphs.length],
      }));

      const pathCount = width < 680 ? 23 : 34;
      oozePaths = Array.from({ length: pathCount }, (_, index) => {
        const direction: 1 | -1 = index % 4 === 0 ? -1 : 1;
        const x = logoLeft + (index + 0.35 + Math.random() * 0.3) * (logoWidth / pathCount);
        return {
          x,
          anchorY: logoY + direction * logoFontSize * (direction === 1 ? 0.37 : 0.32),
          direction,
          maxLength: 70 + Math.random() * Math.min(340, height * 0.46),
          width: 1.2 + Math.random() * (index % 5 === 0 ? 4.1 : 2.2),
          delay: Math.random() * 2.8,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildRain();
      rebuildLogo();
    };

    const drawRain = (time: number, dt: number, elapsed: number) => {
      if (elapsed < 900) return;
      const ignition = clamp((elapsed - 900) / 2700);
      const redShift = clamp((elapsed - 3900) / 2500);
      const formationFade = 1 - clamp((elapsed - 6900) / 5200) * 0.72;
      const idleAlpha = elapsed > 12400 ? 0.28 : 1;
      const activeFraction = 0.12 + ignition * 0.88;
      const red = Math.round(mix(46, 255, redShift));
      const green = Math.round(mix(255, 38, redShift));
      const blue = Math.round(mix(88, 64, redShift));
      const fontSize = width < 680 ? 14 : 16;

      context.save();
      context.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      rain.forEach((column, columnIndex) => {
        if (columnIndex / Math.max(1, rain.length - 1) > activeFraction) return;
        column.y += column.speed * dt;
        if (column.y - column.length * fontSize > height + 80) {
          column.y = -70 - Math.random() * height * 0.7;
          column.speed = 34 + Math.random() * 68;
          column.length = 7 + Math.floor(Math.random() * 20);
        }

        for (let index = 0; index < column.length; index += 1) {
          const y = column.y - index * fontSize * 1.05;
          if (y < -30 || y > height + 30) continue;
          const head = index === 0;
          const decay = 1 - index / column.length;
          const alpha = (head ? 0.82 : decay * decay * 0.36) * formationFade * idleAlpha;
          const charIndex = (column.seed + index + Math.floor(time / 105)) % glyphs.length;
          context.fillStyle = head
            ? `rgba(${Math.min(255, red + 30)},${Math.min(255, green + 40)},${Math.min(255, blue + 35)},${alpha})`
            : `rgba(${red},${green},${blue},${alpha})`;
          context.shadowColor = `rgba(${red},${green},${blue},${head ? 0.72 : 0.18})`;
          context.shadowBlur = head ? 11 : 3;
          context.fillText(glyphs[charIndex], column.x, y);
        }
      });
      context.restore();
    };

    const drawFormation = (elapsed: number) => {
      if (elapsed < 6400) return;
      const progress = clamp((elapsed - 6400) / 4100);
      const lockProgress = clamp((elapsed - 9300) / 1600);
      const glyphSize = width < 680 ? 8 : 9;

      context.save();
      context.font = `800 ${glyphSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      logoGlyphs.forEach((glyph) => {
        const local = easeOutCubic(clamp((progress - glyph.delay) / Math.max(0.001, 1 - glyph.delay)));
        if (local <= 0) return;
        const x = mix(glyph.startX, glyph.targetX, local);
        const y = mix(glyph.startY, glyph.targetY, local);
        const alpha = 0.22 + local * 0.76;
        context.fillStyle = `rgba(255,35,62,${alpha})`;
        context.shadowColor = "rgba(255,20,48,.9)";
        context.shadowBlur = 3 + local * 7;
        context.fillText(glyph.char, x, y);
      });
      context.restore();

      if (lockProgress > 0) {
        context.save();
        context.font = `950 ${logoFontSize}px Inter, Arial Black, sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = `rgba(255,34,57,${0.14 + lockProgress * 0.82})`;
        context.shadowColor = "rgba(255,0,34,.92)";
        context.shadowBlur = 12 + lockProgress * 28;
        context.fillText("NULLWORKS", width / 2, logoY);
        context.strokeStyle = `rgba(255,173,182,${lockProgress * 0.34})`;
        context.lineWidth = 1;
        context.strokeText("NULLWORKS", width / 2, logoY);
        context.restore();
      }
    };

    const drawCorruption = (time: number, elapsed: number) => {
      if (elapsed < 10800) return;
      const oozeSeconds = (elapsed - 10800) / 1000;
      const spread = clamp((elapsed - 11800) / 4200);

      const wash = context.createRadialGradient(
        width / 2,
        logoY,
        Math.max(20, logoWidth * 0.08),
        width / 2,
        logoY,
        Math.max(width, height) * 0.82,
      );
      wash.addColorStop(0, `rgba(180,0,23,${0.12 + spread * 0.14})`);
      wash.addColorStop(0.36, `rgba(112,0,18,${spread * 0.075})`);
      wash.addColorStop(1, "rgba(35,0,8,0)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      context.save();
      context.lineCap = "round";
      context.lineJoin = "round";
      oozePaths.forEach((path) => {
        const local = easeOutCubic(clamp((oozeSeconds - path.delay) / 4.8));
        if (local <= 0) return;
        const length = path.maxLength * local;
        const endY = path.anchorY + path.direction * length;
        const bend = Math.sin(path.phase + time * 0.00055) * (4 + path.width * 1.6);

        context.strokeStyle = `rgba(92,0,14,${0.45 + local * 0.42})`;
        context.lineWidth = path.width * 1.8;
        context.shadowColor = "rgba(255,0,36,.82)";
        context.shadowBlur = 10 + path.width * 2;
        context.beginPath();
        context.moveTo(path.x, path.anchorY);
        context.bezierCurveTo(
          path.x + bend * 0.35,
          path.anchorY + path.direction * length * 0.3,
          path.x - bend * 0.2,
          path.anchorY + path.direction * length * 0.72,
          path.x + bend,
          endY,
        );
        context.stroke();

        context.strokeStyle = `rgba(230,12,42,${0.4 + local * 0.45})`;
        context.lineWidth = Math.max(0.8, path.width * 0.58);
        context.shadowBlur = 5;
        context.beginPath();
        context.moveTo(path.x, path.anchorY);
        context.bezierCurveTo(
          path.x + bend * 0.35,
          path.anchorY + path.direction * length * 0.3,
          path.x - bend * 0.2,
          path.anchorY + path.direction * length * 0.72,
          path.x + bend,
          endY,
        );
        context.stroke();

        context.fillStyle = `rgba(162,0,27,${0.6 + local * 0.32})`;
        context.beginPath();
        context.ellipse(path.x + bend, endY, 2 + path.width * 0.55, 4 + path.width * 1.1, 0, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      context.save();
      context.font = `950 ${logoFontSize}px Inter, Arial Black, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "rgba(145,0,22,.96)";
      context.shadowColor = "rgba(255,0,38,.92)";
      context.shadowBlur = 22;
      context.fillText("NULLWORKS", width / 2, logoY);
      context.strokeStyle = "rgba(255,116,132,.35)";
      context.lineWidth = 1;
      context.strokeText("NULLWORKS", width / 2, logoY);
      context.restore();
    };

    const drawVignette = () => {
      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,.82)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      const frameInterval = reducedMotion ? 1000 / 12 : 1000 / 30;
      if (time - lastFrame < frameInterval) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      lastFrame = time;
      const elapsed = reducedMotion || skipRef.current ? 16000 : time - startTime;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      if (elapsed < 900) setPhase("BLACKOUT");
      else if (elapsed < 3900) setPhase("GREEN SIGNAL IGNITION");
      else if (elapsed < 6400) setPhase("RED CORRUPTION");
      else if (elapsed < 10800) setPhase("IDENTITY FORMATION");
      else setPhase("CORRUPTION LOCKED");

      drawRain(time, dt, elapsed);
      drawFormation(elapsed);
      drawCorruption(time, elapsed);
      drawVignette();

      if (elapsed >= 13200 && !completionSent) {
        completionSent = true;
        setSettled(true);
      }

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    startTime = performance.now();
    lastTime = startTime;
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [runId]);

  return (
    <main className={`corruption-page ${settled ? "is-settled" : "is-running"}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <nav className="sequence-nav">
        <a href="/">NULLWORKS <span>CORRUPTION SEQUENCE</span></a>
        <div>
          <b>{phaseLabel}</b>
          {settled ? (
            <button type="button" onClick={replay}>Replay sequence</button>
          ) : (
            <button type="button" onClick={skip}>Skip intro</button>
          )}
        </div>
      </nav>

      <section className="settled-content" aria-hidden={!settled}>
        <div className="content-card">
          <div className="eyebrow">LIVING SIGNAL 11 // CINEMATIC IDENTITY FORMATION</div>
          <h1>Noise becomes identity.<span>Identity corrupts the field.</span></h1>
          <p>
            A staged canvas sequence moves from blackout to green code rain to red corruption. Falling glyphs resolve into NULLWORKS, then the locked identity begins bleeding upward and downward into the surrounding screen.
          </p>
          <div className="actions">
            <button type="button" onClick={replay}>Replay from black</button>
            <a href="/living-signals">Open signal library</a>
          </div>
          <small>SIMULATED CINEMATIC ATMOSPHERE // NO LIVE DATA // MOBILE 30-FPS CAP</small>
        </div>
      </section>

      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html, body { margin: 0; min-height: 100%; background: #000; }
        .corruption-page {
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          color: #fff;
          background: #000;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .corruption-page canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; }
        .scanlines { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .65; background: repeating-linear-gradient(to bottom, rgba(255,255,255,.018) 0, rgba(255,255,255,.018) 1px, transparent 1px, transparent 4px); box-shadow: inset 0 0 180px rgba(0,0,0,.84); }
        .sequence-nav { position: fixed; z-index: 20; top: 0; left: 0; right: 0; min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px clamp(14px, 4vw, 42px); border-bottom: 1px solid rgba(255,255,255,.09); background: rgba(0,0,0,.28); backdrop-filter: blur(12px); }
        .sequence-nav > a { color: #fff; text-decoration: none; font-size: 12px; font-weight: 950; letter-spacing: .13em; }
        .sequence-nav > a span { color: #ff3048; }
        .sequence-nav > div { display: flex; align-items: center; justify-content: flex-end; gap: 10px; }
        .sequence-nav b { color: rgba(255,255,255,.62); font: 850 10px ui-monospace, monospace; letter-spacing: .1em; text-align: right; }
        .sequence-nav button, .actions button, .actions a { border: 1px solid rgba(255,48,72,.4); border-radius: 999px; padding: 9px 12px; color: #ff6c7f; background: rgba(0,0,0,.58); font: 850 11px inherit; text-decoration: none; cursor: pointer; }
        .settled-content { position: relative; z-index: 10; min-height: 100svh; display: flex; align-items: flex-end; justify-content: center; padding: 90px 16px 24px; opacity: 0; transform: translateY(18px); pointer-events: none; transition: opacity 1.1s ease, transform 1.1s ease; }
        .is-settled .settled-content { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .content-card { width: min(880px, 100%); border: 1px solid rgba(255,48,72,.28); border-radius: 28px; padding: clamp(22px, 4vw, 38px); background: linear-gradient(145deg, rgba(32,0,7,.74), rgba(0,0,0,.82)); box-shadow: 0 30px 110px rgba(0,0,0,.55); backdrop-filter: blur(14px); }
        .eyebrow { color: #ff4058; font: 900 11px ui-monospace, monospace; letter-spacing: .15em; }
        h1 { margin: 14px 0 0; max-width: 780px; font-size: clamp(38px, 7.5vw, 78px); line-height: .9; letter-spacing: -.058em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,70,92,.68); }
        p { max-width: 760px; color: #cbbdc0; font-size: 17px; line-height: 1.62; }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
        .actions button { border: 0; color: #080002; background: #ff3048; font-weight: 950; }
        .actions a { display: inline-flex; align-items: center; }
        small { display: block; margin-top: 20px; color: #806d72; font: 800 10px/1.5 ui-monospace, monospace; letter-spacing: .1em; }
        @media (max-width: 640px) {
          .sequence-nav { align-items: flex-start; }
          .sequence-nav > div { flex-direction: column; align-items: flex-end; gap: 6px; }
          .sequence-nav b { max-width: 145px; }
          .settled-content { padding-bottom: 14px; }
          .content-card { border-radius: 23px; padding: 21px; }
          h1 { font-size: clamp(38px, 11vw, 57px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .settled-content { transition: none; }
        }
      `}</style>
    </main>
  );
}
