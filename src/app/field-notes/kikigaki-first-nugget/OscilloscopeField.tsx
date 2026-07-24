"use client";

import { useEffect, useRef } from "react";

export default function OscilloscopeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let pointerX = 0.68;
    let pointerY = 0.36;
    let targetX = pointerX;
    let targetY = pointerY;
    let lastTime = performance.now();

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

    const onPointerMove = (event: PointerEvent) => {
      targetX = Math.max(0, Math.min(1, event.clientX / Math.max(width, 1)));
      targetY = Math.max(0, Math.min(1, event.clientY / Math.max(height, 1)));
    };

    const drawGrid = () => {
      context.save();
      context.lineWidth = 1;

      for (let step = 28, major = false; step <= 140; step *= 5, major = true) {
        context.strokeStyle = major
          ? "rgba(104, 255, 141, 0.055)"
          : "rgba(104, 255, 141, 0.024)";
        context.beginPath();
        for (let x = 0; x <= width; x += step) {
          context.moveTo(x + 0.5, 0);
          context.lineTo(x + 0.5, height);
        }
        for (let y = 0; y <= height; y += step) {
          context.moveTo(0, y + 0.5);
          context.lineTo(width, y + 0.5);
        }
        context.stroke();
      }

      context.restore();
    };

    const drawSweep = (time: number) => {
      const sweep = ((time * 0.055) % (width + 360)) - 180;
      const gradient = context.createLinearGradient(sweep - 240, 0, sweep + 18, 0);
      gradient.addColorStop(0, "rgba(104, 255, 141, 0)");
      gradient.addColorStop(0.82, "rgba(104, 255, 141, 0.045)");
      gradient.addColorStop(1, "rgba(104, 255, 141, 0.19)");
      context.fillStyle = gradient;
      context.fillRect(Math.max(0, sweep - 240), 0, 258, height);
      context.strokeStyle = "rgba(145, 255, 171, 0.28)";
      context.beginPath();
      context.moveTo(sweep, 0);
      context.lineTo(sweep, height);
      context.stroke();
    };

    const drawTrace = (time: number) => {
      const baseY = height * (0.43 + (pointerY - 0.5) * 0.08);
      const eventCenter = width * pointerX;
      const pulseCycle = reducedMotion ? 0.25 : (time % 7200) / 7200;
      const pulseStrength = Math.pow(Math.sin(Math.PI * pulseCycle), 9);
      const sampleStep = Math.max(2, Math.floor(width / 480));

      const plot = (blur: number, alpha: number, lineWidth: number) => {
        context.save();
        context.beginPath();

        for (let x = -sampleStep; x <= width + sampleStep; x += sampleStep) {
          const normalized = x / Math.max(width, 1);
          const quietSignal =
            Math.sin(normalized * 28 + time * 0.0011) * 3.2 +
            Math.sin(normalized * 73 - time * 0.0007) * 1.4 +
            Math.sin(normalized * 181 + time * 0.0019) * 0.65;
          const distance = (x - eventCenter) / Math.max(58, width * 0.07);
          const envelope = Math.exp(-distance * distance * 2.4);
          const learnedSignal =
            envelope *
            pulseStrength *
            (Math.sin(distance * 18 - time * 0.006) * 30 -
              Math.exp(-Math.pow(distance + 0.18, 2) * 90) * 58 +
              Math.exp(-Math.pow(distance - 0.12, 2) * 120) * 88);
          const y = baseY + quietSignal + learnedSignal;

          if (x === -sampleStep) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = `rgba(104, 255, 141, ${alpha})`;
        context.lineWidth = lineWidth;
        context.shadowColor = "rgba(104, 255, 141, 0.9)";
        context.shadowBlur = blur;
        context.stroke();
        context.restore();
      };

      plot(22, 0.12, 7);
      plot(10, 0.34, 3.2);
      plot(3, 0.82, 1.2);

      context.save();
      context.fillStyle = "rgba(104, 255, 141, 0.72)";
      context.shadowColor = "rgba(104, 255, 141, 0.95)";
      context.shadowBlur = 16;
      context.beginPath();
      context.arc(eventCenter, baseY, 2.2 + pulseStrength * 1.8, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawGhost = (time: number) => {
      const x = width * pointerX;
      const y = height * pointerY;
      const radius = 110 + Math.sin(time * 0.0012) * 16;
      const glow = context.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, "rgba(104, 255, 141, 0.075)");
      glow.addColorStop(0.35, "rgba(104, 255, 141, 0.026)");
      glow.addColorStop(1, "rgba(104, 255, 141, 0)");
      context.fillStyle = glow;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const render = (time: number) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      pointerX += (targetX - pointerX) * Math.min(1, delta * 0.0034);
      pointerY += (targetY - pointerY) * Math.min(1, delta * 0.0034);

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawGhost(time);
      drawSweep(time);
      drawTrace(time);

      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
