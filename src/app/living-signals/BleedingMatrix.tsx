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
  liquid: boolean;
};

type ForegroundDrop = {
  x: number;
  y: number;
  speed: number;
  radius: number;
  trail: number;
  phase: number;
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
        liquid: index % 5 === 0 || Math.random() < 0.09,
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

    const drawTopBleed = (time: number) => {
      context.save();
      const count = width < 680 ? 9 : 16;
      for (let index = 0; index < count; index += 1) {
        const x = ((index + 0.5) / count) * width + Math.sin(index * 3.7) * 12;
        const pulse = 0.5 + Math.sin(time * 0.0012 + index * 1.91) * 0.5;
        const length = 10 + pulse * (index % 4 === 0 ? 80 : 34);
        const thickness = index % 4 === 0 ? 2.6 : 1.15;
        context.strokeStyle = rgba(index % 4 === 0 ? 0.34 : 0.13);
        context.lineWidth = thickness;
        context.lineCap = "round";
        context.shadowColor = rgba(0.42);
        context.shadowBlur = index % 4 === 0 ? 10 : 3;
        context.beginPath();
        context.moveTo(x, -4);
        context.bezierCurveTo(x + 4, length * 0.32, x - 4, length * 0.72, x + Math.sin(time * 0.001 + index) * 3, length);
        context.stroke();
        if (index % 4 === 0) {
          context.fillStyle = rgba(0.42);
          context.beginPath();
          context.ellipse(x, length + 3, 3.2, 6.2, 0, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.restore();
    };

    const drawRain = (time: number, dt: number) => {
      context.save();
      context.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      streams.forEach((stream, streamIndex) => {
        stream.y += stream.speed * dt;
        if (stream.y - stream.length * fontSize > height + 90) {
          stream.y = -90 - Math.random() * height * 0.8;
          stream.speed = 30 + Math.random() * 88;
          stream.length = 7 + Math.floor(Math.random() * 23);
          stream.phase = Math.random() * Math.PI * 2;
          stream.liquid = streamIndex % 5 === 0 || Math.random() < 0.09;
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

        if (stream.liquid) {
          const liquidTop = Math.max(-20, stream.y - stream.length * fontSize * 0.82);
          const liquidBottom = Math.min(height + 40, stream.y + 30);
          const wave = Math.sin(time * 0.0016 + stream.phase) * 4;
          context.lineCap = "round";
          context.strokeStyle = rgba(0.13);
          context.lineWidth = streamIndex % 10 === 0 ? 2.6 : 1.2;
          context.shadowColor = rgba(0.28);
          context.shadowBlur = 7;
          context.beginPath();
          context.moveTo(stream.x, liquidTop);
          context.bezierCurveTo(stream.x + wave, liquidTop + 40, stream.x - wave, liquidBottom - 28, stream.x + wave * 0.45, liquidBottom);
          context.stroke();
          if (liquidBottom > 0 && liquidBottom < height) {
            context.fillStyle = rgba(0.22);
            context.beginPath();
            context.ellipse(stream.x + wave * 0.45, liquidBottom + 3, 2.2, 4.8, 0, 0, Math.PI * 2);
            context.fill();
          }
        }
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
      drawTopBleed(time);

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
    let nextDropAt = 1200;
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
      drops.push({
        x: width * (0.16 + Math.random() * 0.68),
        y: -90,
        speed: 135 + Math.random() * 75,
        radius: (width < 680 ? 7 : 9) + Math.random() * 5,
        trail: 110 + Math.random() * 150,
        phase: Math.random() * Math.PI * 2,
      });
      nextDropAt = elapsed + 8500 + Math.random() * 6500;
    };

    const drawDrop = (drop: ForegroundDrop, time: number) => {
      const wobble = Math.sin(time * 0.0022 + drop.phase) * 6;
      const headX = drop.x + wobble;
      const trailTop = Math.max(-80, drop.y - drop.trail);

      context.save();
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowColor = "rgba(255,18,42,.92)";
      context.shadowBlur = 14;

      context.strokeStyle = "rgba(104,0,14,.92)";
      context.lineWidth = drop.radius * 0.92;
      context.beginPath();
      context.moveTo(drop.x + Math.sin(trailTop * 0.023 + drop.phase) * 3, trailTop);
      for (let step = 1; step <= 14; step += 1) {
        const progress = step / 14;
        const y = trailTop + (drop.y - trailTop) * progress;
        const x = drop.x + Math.sin(y * 0.023 + drop.phase) * (2.5 + progress * 4);
        context.lineTo(x, y);
      }
      context.stroke();

      context.strokeStyle = "rgba(229,16,38,.94)";
      context.lineWidth = Math.max(1.3, drop.radius * 0.38);
      context.shadowBlur = 8;
      context.beginPath();
      context.moveTo(drop.x + Math.sin(trailTop * 0.023 + drop.phase) * 3, trailTop);
      for (let step = 1; step <= 14; step += 1) {
        const progress = step / 14;
        const y = trailTop + (drop.y - trailTop) * progress;
        const x = drop.x + Math.sin(y * 0.023 + drop.phase) * (2.5 + progress * 4);
        context.lineTo(x, y);
      }
      context.stroke();

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
      context.fillStyle = gradient;
      context.shadowBlur = 18;
      context.beginPath();
      context.moveTo(headX, drop.y - drop.radius * 1.8);
      context.bezierCurveTo(
        headX + drop.radius * 0.9,
        drop.y - drop.radius * 0.55,
        headX + drop.radius * 1.05,
        drop.y + drop.radius * 0.72,
        headX,
        drop.y + drop.radius * 1.25,
      );
      context.bezierCurveTo(
        headX - drop.radius * 1.05,
        drop.y + drop.radius * 0.72,
        headX - drop.radius * 0.9,
        drop.y - drop.radius * 0.55,
        headX,
        drop.y - drop.radius * 1.8,
      );
      context.closePath();
      context.fill();

      context.strokeStyle = "rgba(255,205,209,.58)";
      context.lineWidth = 1;
      context.shadowBlur = 0;
      context.beginPath();
      context.moveTo(headX - drop.radius * 0.28, drop.y - drop.radius * 0.8);
      context.quadraticCurveTo(headX - drop.radius * 0.55, drop.y - drop.radius * 0.1, headX - drop.radius * 0.25, drop.y + drop.radius * 0.32);
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

      if (!reducedMotion && elapsed >= nextDropAt) spawnDrop();
      drops.forEach((drop) => {
        drop.y += drop.speed * dt;
        drawDrop(drop, time);
      });
      for (let index = drops.length - 1; index >= 0; index -= 1) {
        if (drops[index].y - drops[index].trail > height + 120) drops.splice(index, 1);
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
