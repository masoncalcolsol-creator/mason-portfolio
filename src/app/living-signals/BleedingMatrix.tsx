"use client";

import { useEffect, useRef } from "react";

type Props = {
  accentRgb: string;
};

type BloodStream = {
  x: number;
  y: number;
  speed: number;
  length: number;
  phase: number;
};

type BackgroundDrip = {
  x: number;
  y: number;
  speed: number;
  length: number;
  width: number;
  phase: number;
  opacity: number;
};

type ForegroundDrop = {
  x: number;
  y: number;
  speed: number;
  radius: number;
};

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|:+-=アイウエオカキクケコサシスセソタチツテト";

export default function BleedingMatrix({ accentRgb }: Props) {
  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const foregroundRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = backgroundRef.current;
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
    let streams: BloodStream[] = [];
    let backgroundDrips: BackgroundDrip[] = [];

    const rgba = (alpha: number) => `rgba(${accentRgb}, ${alpha})`;
    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

    const rebuildStreams = () => {
      fontSize = width < 680 ? 14 : 17;
      const columnWidth = fontSize * 1.15;
      const count = Math.ceil(width / columnWidth) + 2;
      streams = Array.from({ length: count }, (_, index) => ({
        x: index * columnWidth,
        y: -Math.random() * height * 1.5,
        speed: 30 + Math.random() * 88,
        length: 7 + Math.floor(Math.random() * 23),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const rebuildBackgroundDrips = () => {
      const count = width < 680 ? 8 : 14;
      backgroundDrips = Array.from({ length: count }, (_, index) => ({
        x: ((index + 0.5) / count) * width + (Math.random() - 0.5) * 30,
        y: -Math.random() * height * 1.25,
        speed: 5 + Math.random() * 7,
        length: 44 + Math.random() * 96,
        width: index % 4 === 0 ? 2.2 : 1.05,
        phase: Math.random() * Math.PI * 2,
        opacity: index % 4 === 0 ? 0.22 : 0.09 + Math.random() * 0.05,
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
      rebuildBackgroundDrips();
    };

    const drawGrid = () => {
      context.save();
      context.strokeStyle = rgba(0.022);
      context.lineWidth = 1;
      context.beginPath();
      for (let x = 0; x <= width; x += 34) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += 34) {
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

      streams.forEach((stream) => {
        stream.y += stream.speed * dt;
        if (stream.y - stream.length * fontSize > height + 90) {
          stream.y = -90 - Math.random() * height * 0.8;
          stream.speed = 30 + Math.random() * 88;
          stream.length = 7 + Math.floor(Math.random() * 23);
          stream.phase = Math.random() * Math.PI * 2;
        }

        for (let index = 0; index < stream.length; index += 1) {
          const y = stream.y - index * fontSize * 1.07;
          if (y < -40 || y > height + 40) continue;
          const head = index === 0;
          const decay = 1 - index / stream.length;
          const flicker = 0.76 + Math.sin(time * 0.004 + stream.phase + index * 0.71) * 0.2;
          const alpha = head ? 0.76 : Math.max(0.02, decay * decay * 0.34 * flicker);

          context.shadowColor = rgba(head ? 0.94 : 0.24);
          context.shadowBlur = head ? 13 : 3;
          context.fillStyle = head ? "rgba(255,188,193,.9)" : rgba(alpha);
          context.fillText(randomGlyph(), stream.x, y);
        }
      });
      context.restore();
    };

    const drawBackgroundDrips = (dt: number) => {
      context.save();
      context.lineCap = "round";

      backgroundDrips.forEach((drip) => {
        drip.y += drip.speed * dt;
        if (drip.y - drip.length > height + 70) {
          drip.y = -40 - Math.random() * height * 0.5;
          drip.speed = 5 + Math.random() * 7;
          drip.length = 44 + Math.random() * 96;
        }

        const top = drip.y - drip.length;
        const bend = Math.sin(drip.phase) * 5;
        context.strokeStyle = rgba(drip.opacity);
        context.lineWidth = drip.width;
        context.shadowColor = rgba(drip.opacity * 1.7);
        context.shadowBlur = drip.width > 2 ? 7 : 2;
        context.beginPath();
        context.moveTo(drip.x, top);
        context.bezierCurveTo(
          drip.x + bend * 0.35,
          top + drip.length * 0.32,
          drip.x - bend * 0.25,
          top + drip.length * 0.72,
          drip.x + bend,
          drip.y,
        );
        context.stroke();

        context.fillStyle = rgba(drip.opacity * 1.45);
        context.beginPath();
        context.ellipse(drip.x + bend, drip.y + 3, 2 + drip.width * 0.55, 4.4 + drip.width, 0, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 30) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;
      const dt = reducedMotion ? 0 : Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRain(time, dt);
      drawBackgroundDrips(dt);

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

  useEffect(() => {
    const canvas = foregroundRef.current;
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
    let elapsed = 0;
    let nextDropAt = 30000;
    const drops: ForegroundDrop[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnDrop = () => {
      drops.splice(0, drops.length);
      drops.push({
        x: width * (0.16 + Math.random() * 0.68),
        y: -28,
        speed: 90 + Math.random() * 50,
        radius: (width < 680 ? 6.5 : 8) + Math.random() * 3.5,
      });
      nextDropAt = elapsed + 30000;
    };

    const drawDrop = (drop: ForegroundDrop) => {
      const headX = drop.x;
      const gradient = context.createRadialGradient(
        headX - drop.radius * 0.25,
        drop.y - drop.radius * 0.25,
        1,
        headX,
        drop.y,
        drop.radius * 1.5,
      );
      gradient.addColorStop(0, "rgba(255,112,124,.98)");
      gradient.addColorStop(0.28, "rgba(224,14,38,.98)");
      gradient.addColorStop(1, "rgba(76,0,12,.98)");

      context.save();
      context.fillStyle = gradient;
      context.shadowColor = "rgba(255,18,42,.9)";
      context.shadowBlur = 14;
      context.beginPath();
      context.moveTo(headX, drop.y - drop.radius * 1.65);
      context.bezierCurveTo(
        headX + drop.radius * 0.9,
        drop.y - drop.radius * 0.45,
        headX + drop.radius,
        drop.y + drop.radius * 0.68,
        headX,
        drop.y + drop.radius * 1.18,
      );
      context.bezierCurveTo(
        headX - drop.radius,
        drop.y + drop.radius * 0.68,
        headX - drop.radius * 0.9,
        drop.y - drop.radius * 0.45,
        headX,
        drop.y - drop.radius * 1.65,
      );
      context.closePath();
      context.fill();

      context.strokeStyle = "rgba(255,205,209,.54)";
      context.lineWidth = 1;
      context.shadowBlur = 0;
      context.beginPath();
      context.moveTo(headX - drop.radius * 0.28, drop.y - drop.radius * 0.72);
      context.quadraticCurveTo(
        headX - drop.radius * 0.5,
        drop.y - drop.radius * 0.08,
        headX - drop.radius * 0.22,
        drop.y + drop.radius * 0.26,
      );
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 30) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;
      const dt = reducedMotion ? 0 : Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      elapsed += dt * 1000;

      context.clearRect(0, 0, width, height);

      if (!reducedMotion && elapsed >= nextDropAt && drops.length === 0) spawnDrop();
      drops.forEach((drop) => {
        drop.y += drop.speed * dt;
        drawDrop(drop);
      });
      for (let index = drops.length - 1; index >= 0; index -= 1) {
        if (drops[index].y - drops[index].radius > height + 40) drops.splice(index, 1);
      }

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0.96,
          mixBlendMode: "screen",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 94%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 94%, transparent 100%)",
        }}
      >
        <canvas ref={backgroundRef} style={{ display: "block" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(to bottom, rgba(${accentRgb},0.02) 0, rgba(${accentRgb},0.02) 1px, transparent 1px, transparent 4px)`,
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
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 120,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <canvas ref={foregroundRef} style={{ display: "block" }} />
      </div>
    </>
  );
}
