"use client";

import { useEffect, useRef } from "react";

const SIGNAL_RGB = "111, 145, 96";

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
    let pointerY = 0.5;
    let targetX = pointerX;
    let targetY = pointerY;
    let lastTime = performance.now();

    const rgba = (alpha: number) => `rgba(${SIGNAL_RGB}, ${alpha})`;

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
      targetY = Math.max(0.18, Math.min(0.82, event.clientY / Math.max(height, 1)));
    };

    const drawGrid = () => {
      context.save();
      context.lineWidth = 1;

      for (let step = 30, major = false; step <= 150; step *= 5, major = true) {
        context.strokeStyle = major ? rgba(0.072) : rgba(0.032);
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
      const sweep = ((time * 0.043) % (width + 420)) - 210;
      const gradient = context.createLinearGradient(sweep - 300, 0, sweep + 20, 0);
      gradient.addColorStop(0, rgba(0));
      gradient.addColorStop(0.8, rgba(0.07));
      gradient.addColorStop(1, rgba(0.28));
      context.fillStyle = gradient;
      context.fillRect(Math.max(0, sweep - 300), 0, 320, height);
      context.strokeStyle = rgba(0.42);
      context.lineWidth = 1.2;
      context.beginPath();
      context.moveTo(sweep, 0);
      context.lineTo(sweep, height);
      context.stroke();
    };

    const traceState = (time: number) => {
      const baseY = height * (0.5 + (pointerY - 0.5) * 0.2);
      const eventCenter = width * pointerX;
      const pulseCycle = reducedMotion ? 0.28 : (time % 6200) / 6200;
      const pulseStrength = Math.pow(Math.sin(Math.PI * pulseCycle), 7);

      const yAt = (x: number) => {
        const normalized = x / Math.max(width, 1);
        const quietSignal =
          Math.sin(normalized * 26 + time * 0.00105) * 8.2 +
          Math.sin(normalized * 69 - time * 0.00072) * 3.8 +
          Math.sin(normalized * 177 + time * 0.00185) * 1.9;
        const distance = (x - eventCenter) / Math.max(66, width * 0.075);
        const envelope = Math.exp(-distance * distance * 2.2);
        const learnedSignal =
          envelope *
          pulseStrength *
          (Math.sin(distance * 18 - time * 0.006) * 54 -
            Math.exp(-Math.pow(distance + 0.2, 2) * 85) * 96 +
            Math.exp(-Math.pow(distance - 0.12, 2) * 115) * 142);

        return baseY + quietSignal + learnedSignal;
      };

      return { baseY, eventCenter, pulseStrength, yAt };
    };

    const drawTrace = (time: number) => {
      const { baseY, eventCenter, pulseStrength, yAt } = traceState(time);
      const sampleStep = Math.max(2, Math.floor(width / 520));

      const plot = (blur: number, alpha: number, lineWidth: number) => {
        context.save();
        context.beginPath();

        for (let x = -sampleStep; x <= width + sampleStep; x += sampleStep) {
          const y = yAt(x);
          if (x === -sampleStep) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = rgba(alpha);
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = rgba(0.88);
        context.shadowBlur = blur;
        context.stroke();
        context.restore();
      };

      plot(32, 0.16, 14);
      plot(18, 0.38, 6.4);
      plot(5, 0.92, 2.2);

      context.save();
      context.fillStyle = rgba(0.9);
      context.shadowColor = rgba(0.96);
      context.shadowBlur = 24;
      context.beginPath();
      context.arc(eventCenter, baseY, 3.4 + pulseStrength * 3.3, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawSignalDrops = (time: number) => {
      const { yAt } = traceState(time);
      const dropCount = width < 700 ? 4 : 7;

      for (let index = 0; index < dropCount; index += 1) {
        const speed = 0.028 + index * 0.0038;
        const span = width + 180;
        const x = ((time * speed + index * (span / dropCount)) % span) - 90;
        const y = yAt(x);
        const phase = (time * 0.0012 + index * 0.9) % (Math.PI * 2);
        const radius = 4.6 + Math.sin(phase) * 1.2;

        context.save();
        context.translate(x, y);
        context.rotate(-0.2);
        context.fillStyle = rgba(0.52);
        context.shadowColor = rgba(0.85);
        context.shadowBlur = 18;
        context.beginPath();
        context.ellipse(0, 0, radius * 1.65, radius, 0, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = rgba(0.92);
        context.shadowBlur = 8;
        context.beginPath();
        context.ellipse(radius * 0.25, -radius * 0.15, radius * 0.46, radius * 0.3, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    };

    const drawGhost = (time: number) => {
      const x = width * pointerX;
      const y = height * pointerY;
      const radius = 150 + Math.sin(time * 0.0011) * 24;
      const glow = context.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, rgba(0.12));
      glow.addColorStop(0.35, rgba(0.048));
      glow.addColorStop(1, rgba(0));
      context.fillStyle = glow;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const render = (time: number) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      pointerX += (targetX - pointerX) * Math.min(1, delta * 0.0032);
      pointerY += (targetY - pointerY) * Math.min(1, delta * 0.0032);

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawGhost(time);
      drawSweep(time);
      drawTrace(time);
      drawSignalDrops(time);

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
