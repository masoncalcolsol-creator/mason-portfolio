"use client";

import { useEffect, useRef } from "react";

export default function AnvilEKGBackground() {
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

    const gaussian = (position: number, center: number, spread: number, heightValue: number) => {
      const distance = position - center;
      return heightValue * Math.exp(-(distance * distance) / (2 * spread * spread));
    };

    const ekgShape = (position: number) => {
      const wrapped = ((position % 1) + 1) % 1;
      return (
        gaussian(wrapped, 0.16, 0.026, 0.12) +
        gaussian(wrapped, 0.285, 0.009, -0.18) +
        gaussian(wrapped, 0.305, 0.006, 1.0) +
        gaussian(wrapped, 0.327, 0.011, -0.48) +
        gaussian(wrapped, 0.53, 0.055, 0.22)
      );
    };

    const drawGrid = () => {
      context.save();
      context.lineWidth = 1;

      const minor = 24;
      const major = minor * 5;

      context.strokeStyle = "rgba(255, 48, 65, 0.032)";
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

      context.strokeStyle = "rgba(255, 48, 65, 0.072)";
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
      context.restore();
    };

    const drawTrace = (
      time: number,
      baseline: number,
      amplitude: number,
      alpha: number,
      speed: number,
      cycles: number,
      showPing: boolean,
    ) => {
      const points = Math.max(220, Math.floor(width / 2.4));
      const sweepSpan = width + 240;
      const sweep = width + 120 - ((time * speed) % sweepSpan);

      context.save();
      context.beginPath();

      let sweepY = baseline;
      for (let i = 0; i <= points; i += 1) {
        const x = (i / points) * width;
        const normalized = x / Math.max(width, 1);
        const movingPosition = normalized * cycles + time * speed * 0.00078;
        const baselineJitter =
          Math.sin(normalized * 72 + time * 0.0011) * 0.72 +
          Math.sin(normalized * 19 - time * 0.0007) * 0.48;
        const y = baseline - ekgShape(movingPosition) * amplitude + baselineJitter;

        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);

        if (Math.abs(x - sweep) < width / points) sweepY = y;
      }

      context.lineWidth = showPing ? 1.45 : 1;
      context.strokeStyle = `rgba(255, 54, 72, ${alpha})`;
      context.shadowColor = "rgba(255, 34, 54, 0.95)";
      context.shadowBlur = showPing ? 10 : 5;
      context.stroke();

      context.shadowBlur = 0;
      const trailGradient = context.createLinearGradient(sweep - 18, 0, sweep + 205, 0);
      trailGradient.addColorStop(0, "rgba(255, 78, 92, 0.24)");
      trailGradient.addColorStop(0.16, "rgba(255, 48, 67, 0.08)");
      trailGradient.addColorStop(1, "rgba(255, 30, 50, 0)");
      context.fillStyle = trailGradient;
      context.fillRect(sweep - 18, 0, 223, height);

      context.strokeStyle = showPing
        ? "rgba(255, 110, 120, 0.38)"
        : "rgba(255, 70, 84, 0.15)";
      context.beginPath();
      context.moveTo(sweep, 0);
      context.lineTo(sweep, height);
      context.stroke();

      if (showPing && sweep >= -30 && sweep <= width + 30) {
        const heartbeat = Math.pow(Math.max(0, Math.sin(time * 0.0046)), 18);
        const radius = 3.2 + heartbeat * 12;

        context.fillStyle = `rgba(255, 115, 125, ${0.58 + heartbeat * 0.34})`;
        context.shadowColor = "rgba(255, 25, 48, 1)";
        context.shadowBlur = 13 + heartbeat * 20;
        context.beginPath();
        context.arc(sweep, sweepY, 2.4 + heartbeat * 1.8, 0, Math.PI * 2);
        context.fill();

        context.shadowBlur = 0;
        context.strokeStyle = `rgba(255, 62, 82, ${heartbeat * 0.72})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(sweep, sweepY, radius, 0, Math.PI * 2);
        context.stroke();
      }

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
      drawTrace(time, height * 0.52, Math.min(92, height * 0.1), 0.42, 0.13, 2.25, true);
      drawTrace(time + 760, height * 0.75, Math.min(42, height * 0.045), 0.12, 0.082, 2.8, false);

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
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.9,
        mixBlendMode: "screen",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 94%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 94%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(to bottom, rgba(255,48,66,0.018) 0, rgba(255,48,66,0.018) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 155px rgba(0,0,0,0.94)",
        }}
      />
    </div>
  );
}
