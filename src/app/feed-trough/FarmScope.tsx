"use client";

import { useEffect, useRef } from "react";

type FarmScopeProps = {
  intensity?: number;
};

export default function FarmScope({ intensity = 1 }: FarmScopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
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

    const pulse = (position: number) => {
      const wrapped = ((position % 1) + 1) % 1;
      const spike = (center: number, spread: number, amount: number) => {
        const distance = Math.abs(wrapped - center);
        return distance < spread ? amount * (1 - distance / spread) : 0;
      };

      return (
        spike(0.27, 0.018, -7) +
        spike(0.31, 0.012, 29) +
        spike(0.327, 0.008, -52) +
        spike(0.345, 0.014, 22) +
        spike(0.42, 0.052, -8)
      );
    };

    const drawGrid = () => {
      const minor = 30;
      const major = minor * 4;

      context.save();
      context.lineWidth = 1;
      context.strokeStyle = `rgba(185, 125, 47, ${0.026 * intensity})`;
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

      context.strokeStyle = `rgba(109, 150, 58, ${0.055 * intensity})`;
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
      color: "green" | "amber",
    ) => {
      const points = Math.max(180, Math.floor(width / 3));
      const sweep = (time * speed) % (width + 220) - 110;
      const rgb = color === "green" ? "151, 196, 79" : "224, 155, 61";

      context.save();
      context.beginPath();

      for (let i = 0; i <= points; i += 1) {
        const x = (i / points) * width;
        const normalized = x / Math.max(width, 1);
        const phase = normalized * 13.5 + time * 0.0011;
        const grain = Math.sin(phase * 12.4) * 1.35 + Math.sin(phase * 4.2) * 2.4;
        const field = Math.sin(phase) * amplitude + Math.sin(phase * 0.38 + 2.1) * amplitude * 0.32;
        const heartbeat = pulse(normalized * 2.05 - time * 0.00016) * (amplitude / 17);
        const y = baseline + field + grain + heartbeat;

        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.lineWidth = color === "green" ? 1.25 : 0.9;
      context.strokeStyle = `rgba(${rgb}, ${alpha * intensity})`;
      context.shadowColor = `rgba(${rgb}, ${0.7 * intensity})`;
      context.shadowBlur = color === "green" ? 7 : 4;
      context.stroke();

      context.shadowBlur = 0;
      const gradient = context.createLinearGradient(sweep - 190, 0, sweep + 24, 0);
      gradient.addColorStop(0, `rgba(${rgb}, 0)`);
      gradient.addColorStop(0.78, `rgba(${rgb}, ${0.02 * intensity})`);
      gradient.addColorStop(1, `rgba(${rgb}, ${0.16 * intensity})`);
      context.fillStyle = gradient;
      context.fillRect(sweep - 190, 0, 214, height);

      context.strokeStyle = `rgba(${rgb}, ${0.2 * intensity})`;
      context.beginPath();
      context.moveTo(sweep, 0);
      context.lineTo(sweep, height);
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 28) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawTrace(time, height * 0.42, Math.min(20, height * 0.022), 0.23, 0.11, "green");
      drawTrace(time + 1240, height * 0.67, Math.min(12, height * 0.013), 0.12, 0.075, "amber");

      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.86,
        mixBlendMode: "screen",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 9%, black 92%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 9%, black 92%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(to bottom, rgba(209,156,67,0.018) 0, rgba(209,156,67,0.018) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 170px rgba(12,9,4,0.94)",
        }}
      />
    </div>
  );
}
