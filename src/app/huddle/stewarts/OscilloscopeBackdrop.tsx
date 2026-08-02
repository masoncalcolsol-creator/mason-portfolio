"use client";

import { useEffect, useRef } from "react";

export default function OscilloscopeBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const drawGrid = () => {
      context.save();
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#020504";
      context.fillRect(0, 0, width, height);

      const minor = width < 680 ? 24 : 32;
      const major = minor * 5;

      context.lineWidth = 1;
      context.strokeStyle = "rgba(117, 151, 124, 0.055)";
      context.beginPath();
      for (let x = 0; x <= width; x += minor) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += minor) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();

      context.strokeStyle = "rgba(126, 161, 133, 0.105)";
      context.beginPath();
      for (let x = 0; x <= width; x += major) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += major) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();

      context.strokeStyle = "rgba(140, 174, 146, 0.17)";
      context.beginPath();
      context.moveTo(width / 2 + 0.5, 0);
      context.lineTo(width / 2 + 0.5, height);
      context.moveTo(0, height / 2 + 0.5);
      context.lineTo(width, height / 2 + 0.5);
      context.stroke();
      context.restore();
    };

    const trace = (
      time: number,
      baseline: number,
      amplitude: number,
      speed: number,
      phase: number,
      alpha: number,
    ) => {
      context.save();
      context.beginPath();
      const step = width < 680 ? 3 : 4;
      for (let x = 0; x <= width + step; x += step) {
        const normalized = x / Math.max(1, width);
        const envelope = 0.72 + Math.sin(normalized * Math.PI * 2.2 + phase) * 0.16;
        const primary = Math.sin(normalized * Math.PI * 7.5 + time * speed + phase);
        const harmonic = Math.sin(normalized * Math.PI * 19 + time * speed * 0.47 + phase * 2.3) * 0.22;
        const pulseCenter = ((time * speed * 0.07 + phase) % 1 + 1) % 1;
        const pulseDistance = Math.abs(normalized - pulseCenter);
        const pulse = pulseDistance < 0.035
          ? Math.sin((1 - pulseDistance / 0.035) * Math.PI) * amplitude * 0.82
          : 0;
        const y = baseline + (primary + harmonic) * amplitude * envelope - pulse;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.lineWidth = 1.25;
      context.strokeStyle = `rgba(126, 158, 133, ${alpha})`;
      context.shadowColor = "rgba(115, 153, 123, 0.38)";
      context.shadowBlur = 8;
      context.stroke();
      context.restore();
    };

    const render = (timeMs: number) => {
      if (!reducedMotion && timeMs - lastFrame < 1000 / 30) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastFrame = timeMs;
      const time = reducedMotion ? 0 : timeMs / 1000;
      drawGrid();
      trace(time, height * 0.28, Math.min(30, height * 0.036), 1.25, 0.4, 0.34);
      trace(time, height * 0.52, Math.min(22, height * 0.027), 0.82, 2.3, 0.2);
      trace(time, height * 0.77, Math.min(35, height * 0.042), 0.58, 4.7, 0.14);

      context.save();
      context.fillStyle = "rgba(0, 0, 0, 0.055)";
      for (let y = 0; y < height; y += 4) context.fillRect(0, y, width, 1);
      context.restore();

      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, transparent 0%, rgba(0,0,0,.24) 55%, rgba(0,0,0,.78) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 120px rgba(0,0,0,.92)" }} />
    </div>
  );
}
