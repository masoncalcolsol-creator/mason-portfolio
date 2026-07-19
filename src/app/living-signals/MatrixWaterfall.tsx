"use client";

import { useEffect, useRef } from "react";

type Props = {
  accentRgb: string;
};

type Stream = {
  x: number;
  y: number;
  speed: number;
  length: number;
  phase: number;
};

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|:+-=アイウエオカキクケコサシスセソタチツテト";
const lockedPhrases = [
  "DATA IS GOD",
  "PRESERVE THE SOURCE",
  "HUMAN AUTHORITY FINAL",
  "NO FAKE FINISH LINES",
  "ORGANIZATION > MORE AI",
  "OBSERVE BEFORE EXPLAINING",
  "RECORD BEFORE IMPROVING",
  "PRESERVE THE WHY",
  "PASS IT FORWARD",
  "UNKNOWN IS A VALID OUTPUT",
];

export default function MatrixWaterfall({ accentRgb }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let fontSize = 16;
    let lastFrame = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let nextLockAt = 2200;
    let lockStartedAt = -1;
    let activePhrase = lockedPhrases[0];
    let streams: Stream[] = [];

    const rgba = (alpha: number) => `rgba(${accentRgb}, ${alpha})`;

    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

    const rebuildStreams = () => {
      fontSize = width < 680 ? 14 : 17;
      const columnWidth = fontSize * 1.15;
      const count = Math.ceil(width / columnWidth) + 2;
      streams = Array.from({ length: count }, (_, index) => ({
        x: index * columnWidth,
        y: -Math.random() * height * 1.6,
        speed: 35 + Math.random() * 95,
        length: 8 + Math.floor(Math.random() * 24),
        phase: Math.random() * Math.PI * 2,
      }));
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
      rebuildStreams();
    };

    const drawGrid = () => {
      context.save();
      context.strokeStyle = rgba(0.022);
      context.lineWidth = 1;
      context.beginPath();
      for (let x = 0; x <= width; x += 36) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += 36) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();
      context.restore();
    };

    const drawRain = (time: number, dt: number) => {
      context.save();
      context.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      streams.forEach((stream, streamIndex) => {
        stream.y += stream.speed * dt;
        if (stream.y - stream.length * fontSize > height + 80) {
          stream.y = -80 - Math.random() * height * 0.75;
          stream.speed = 35 + Math.random() * 95;
          stream.length = 8 + Math.floor(Math.random() * 24);
          stream.phase = Math.random() * Math.PI * 2;
        }

        for (let index = 0; index < stream.length; index += 1) {
          const y = stream.y - index * fontSize * 1.08;
          if (y < -40 || y > height + 40) continue;
          const head = index === 0;
          const decay = 1 - index / stream.length;
          const flicker = 0.78 + Math.sin(time * 0.004 + stream.phase + index * 0.7) * 0.18;
          const alpha = head ? 0.78 : Math.max(0.025, decay * decay * 0.36 * flicker);
          const character = randomGlyph();

          context.shadowColor = rgba(head ? 0.95 : 0.28);
          context.shadowBlur = head ? 13 : 3;
          context.fillStyle = head ? "rgba(225,255,218,.88)" : rgba(alpha);
          context.fillText(character, stream.x, y);
        }

        if (streamIndex % 9 === 0) {
          context.strokeStyle = rgba(0.035);
          context.beginPath();
          context.moveTo(stream.x, 0);
          context.lineTo(stream.x, height);
          context.stroke();
        }
      });
      context.restore();
    };

    const drawSignalLock = (time: number) => {
      const duration = 3400;
      const local = lockStartedAt < 0 ? 0 : time - lockStartedAt;
      if (local < 0 || local > duration) return;

      const fadeIn = Math.min(1, local / 420);
      const fadeOut = Math.min(1, (duration - local) / 620);
      const alpha = Math.max(0, Math.min(fadeIn, fadeOut));
      const pulse = 0.72 + Math.sin(local * 0.009) * 0.18;
      const boxWidth = Math.min(width - 34, Math.max(310, activePhrase.length * (width < 680 ? 9.4 : 13.5)));
      const boxHeight = width < 680 ? 92 : 112;
      const x = width / 2;
      const y = height * (width < 680 ? 0.4 : 0.46);

      context.save();
      context.fillStyle = `rgba(2,8,3,${0.72 * alpha})`;
      context.strokeStyle = rgba(0.46 * alpha);
      context.lineWidth = 1;
      context.shadowColor = rgba(0.5 * alpha);
      context.shadowBlur = 24;
      context.beginPath();
      context.roundRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight, 14);
      context.fill();
      context.stroke();
      context.shadowBlur = 0;

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = rgba(0.64 * alpha);
      context.font = `800 ${width < 680 ? 9 : 11}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.fillText("SIGNAL LOCK // HUMAN-READABLE CONTEXT", x, y - boxHeight * 0.24);

      context.fillStyle = `rgba(226,255,219,${alpha * pulse})`;
      context.shadowColor = rgba(0.9 * alpha);
      context.shadowBlur = 18;
      context.font = `950 ${width < 680 ? 20 : 31}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.fillText(activePhrase, x, y + boxHeight * 0.1);
      context.restore();
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 30) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;
      const dt = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      elapsed += dt * 1000;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRain(time, reducedMotion ? 0 : dt);

      if (!reducedMotion && elapsed >= nextLockAt) {
        activePhrase = lockedPhrases[Math.floor(Math.random() * lockedPhrases.length)];
        lockStartedAt = time;
        nextLockAt = elapsed + 9200 + Math.random() * 5600;
      }
      if (reducedMotion && lockStartedAt < 0) {
        lockStartedAt = time;
        activePhrase = "PRESERVE THE WHY";
      }
      drawSignalLock(time);

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [accentRgb]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.94,
        mixBlendMode: "screen",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `repeating-linear-gradient(to bottom, rgba(${accentRgb},0.018) 0, rgba(${accentRgb},0.018) 1px, transparent 1px, transparent 4px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.96)",
        }}
      />
    </div>
  );
}
