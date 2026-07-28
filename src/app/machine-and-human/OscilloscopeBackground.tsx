"use client";

import { useEffect, useRef } from "react";

export default function OscilloscopeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const pulse = (phase: number) => {
      const distance = Math.min(Math.abs(phase - 72), 420 - Math.abs(phase - 72));
      if (distance > 26) return 0;
      const normalized = 1 - distance / 26;
      return Math.sin(normalized * Math.PI) * normalized;
    };

    const drawGrid = () => {
      const minor = width < 640 ? 28 : 36;
      const major = minor * 5;

      context.lineWidth = 1;
      for (let x = 0; x <= width; x += minor) {
        const isMajor = Math.round(x / minor) % 5 === 0;
        context.strokeStyle = isMajor
          ? "rgba(120, 227, 224, 0.075)"
          : "rgba(120, 227, 224, 0.026)";
        context.beginPath();
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += minor) {
        const isMajor = Math.round(y / minor) % 5 === 0;
        context.strokeStyle = isMajor
          ? "rgba(120, 227, 224, 0.075)"
          : "rgba(120, 227, 224, 0.026)";
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
        context.stroke();
      }

      context.strokeStyle = "rgba(165, 255, 55, 0.08)";
      context.beginPath();
      context.moveTo(0, Math.round(height * 0.54) + 0.5);
      context.lineTo(width, Math.round(height * 0.54) + 0.5);
      context.stroke();

      context.strokeStyle = "rgba(120, 227, 224, 0.05)";
      context.strokeRect(major / 2 + 0.5, major / 2 + 0.5, Math.max(0, width - major), Math.max(0, height - major));
    };

    const drawTrace = (
      time: number,
      baseline: number,
      amplitude: number,
      color: string,
      glow: string,
      speed: number,
      secondary = false,
    ) => {
      context.save();
      context.lineJoin = "round";
      context.lineCap = "round";
      context.shadowColor = glow;
      context.shadowBlur = secondary ? 8 : 18;
      context.strokeStyle = color;
      context.lineWidth = secondary ? 1.15 : 1.8;
      context.beginPath();

      const step = width < 640 ? 2 : 3;
      for (let x = 0; x <= width + step; x += step) {
        const traveling = x + time * speed;
        const primaryWave = Math.sin(traveling * 0.012) * amplitude * 0.22;
        const harmonic = Math.sin(traveling * 0.031 + 1.4) * amplitude * 0.08;
        const slowDrift = Math.sin(traveling * 0.0031) * amplitude * 0.16;
        const pulsePhase = ((traveling % 420) + 420) % 420;
        const pulseHeight = pulse(pulsePhase) * amplitude * (secondary ? 0.9 : 1.9);
        const y = baseline + primaryWave + harmonic + slowDrift - pulseHeight;

        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.stroke();
      context.restore();
    };

    const drawSweep = (time: number) => {
      const sweepX = ((time * 0.12) % (width + 260)) - 130;
      const gradient = context.createLinearGradient(sweepX - 120, 0, sweepX + 25, 0);
      gradient.addColorStop(0, "rgba(165, 255, 55, 0)");
      gradient.addColorStop(0.72, "rgba(165, 255, 55, 0.018)");
      gradient.addColorStop(1, "rgba(165, 255, 55, 0.095)");
      context.fillStyle = gradient;
      context.fillRect(sweepX - 120, 0, 145, height);

      context.strokeStyle = "rgba(216, 255, 165, 0.16)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(sweepX + 0.5, 0);
      context.lineTo(sweepX + 0.5, height);
      context.stroke();
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#030604";
      context.fillRect(0, 0, width, height);
      drawGrid();
      drawTrace(
        time,
        height * 0.54,
        Math.min(92, Math.max(42, height * 0.09)),
        "rgba(165, 255, 55, 0.38)",
        "rgba(165, 255, 55, 0.46)",
        0.095,
      );
      drawTrace(
        time + 820,
        height * 0.72,
        Math.min(58, Math.max(25, height * 0.055)),
        "rgba(120, 227, 224, 0.18)",
        "rgba(120, 227, 224, 0.25)",
        0.052,
        true,
      );
      drawSweep(time);
    };

    const animate = (time: number) => {
      render(time);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      window.cancelAnimationFrame(animationFrame);
      if (reducedMotion.matches) render(0);
      else animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    start();

    const handleVisibility = () => {
      if (document.hidden) window.cancelAnimationFrame(animationFrame);
      else start();
    };

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", start);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div className="mh-scope-instrument" aria-hidden="true">
      <canvas ref={canvasRef} className="mh-scope-canvas" />
      <div className="mh-scope-glass" />
      <div className="mh-scope-readout">
        <span>CH1 · GOVERNED SIGNAL</span>
        <span>CH2 · HUMAN CLOCK</span>
      </div>
    </div>
  );
}
