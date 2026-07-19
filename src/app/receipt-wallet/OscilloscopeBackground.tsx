"use client";

import { useEffect, useRef } from "react";

export default function OscilloscopeBackground() {
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
    let lastFrame = 0;

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

    const pulseShape = (position: number) => {
      const wrapped = ((position % 1) + 1) % 1;
      const spike = (center: number, spread: number, heightValue: number) => {
        const distance = Math.abs(wrapped - center);
        return distance < spread ? heightValue * (1 - distance / spread) : 0;
      };

      return (
        spike(0.36, 0.018, -8) +
        spike(0.39, 0.012, 34) +
        spike(0.405, 0.009, -62) +
        spike(0.42, 0.014, 26) +
        spike(0.49, 0.05, -9)
      );
    };

    const drawGrid = () => {
      context.save();
      context.lineWidth = 1;

      const minor = 28;
      const major = minor * 5;

      context.strokeStyle = "rgba(107, 255, 53, 0.035)";
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

      context.strokeStyle = "rgba(107, 255, 53, 0.07)";
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

      context.strokeStyle = "rgba(135, 255, 72, 0.11)";
      context.beginPath();
      context.moveTo(0, height * 0.5 + 0.5);
      context.lineTo(width, height * 0.5 + 0.5);
      context.stroke();
      context.restore();
    };

    const drawTrace = (time: number, baseline: number, amplitude: number, alpha: number, speed: number) => {
      const points = Math.max(180, Math.floor(width / 3));
      const sweep = (time * speed) % (width + 180) - 90;

      context.save();
      context.beginPath();

      for (let i = 0; i <= points; i += 1) {
        const x = (i / points) * width;
        const normalized = x / Math.max(width, 1);
        const phase = normalized * 15 + time * 0.0013;
        const analogNoise = Math.sin(phase * 11.3) * 1.7 + Math.sin(phase * 3.7) * 3.5;
        const breathing = Math.sin(phase) * amplitude + Math.sin(phase * 0.42 + 1.8) * amplitude * 0.35;
        const heartbeat = pulseShape(normalized * 2.15 - time * 0.00018) * (amplitude / 18);
        const y = baseline + breathing + analogNoise + heartbeat;

        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.lineWidth = 1.15;
      context.strokeStyle = `rgba(132, 255, 72, ${alpha})`;
      context.shadowColor = "rgba(132, 255, 72, 0.8)";
      context.shadowBlur = 7;
      context.stroke();

      context.shadowBlur = 0;
      const sweepGradient = context.createLinearGradient(sweep - 160, 0, sweep + 25, 0);
      sweepGradient.addColorStop(0, "rgba(91, 255, 38, 0)");
      sweepGradient.addColorStop(0.72, "rgba(91, 255, 38, 0.035)");
      sweepGradient.addColorStop(1, "rgba(170, 255, 120, 0.22)");
      context.fillStyle = sweepGradient;
      context.fillRect(sweep - 160, 0, 185, height);

      context.strokeStyle = "rgba(175, 255, 122, 0.3)";
      context.beginPath();
      context.moveTo(sweep, 0);
      context.lineTo(sweep, height);
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 30) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawTrace(time, height * 0.47, Math.min(17, height * 0.018), 0.27, 0.12);
      drawTrace(time + 940, height * 0.68, Math.min(9, height * 0.01), 0.105, 0.075);

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
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.78,
        mixBlendMode: "screen",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 90%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 90%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(to bottom, rgba(125,255,70,0.018) 0, rgba(125,255,70,0.018) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 140px rgba(0,0,0,0.92)",
        }}
      />
    </div>
  );
}
