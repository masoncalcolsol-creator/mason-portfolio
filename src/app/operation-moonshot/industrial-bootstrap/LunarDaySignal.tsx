"use client";

import { useEffect, useRef } from "react";
import light from "./lightmoon.module.css";

type Star = {
  x: number;
  y: number;
  depth: number;
  size: number;
  phase: number;
};

const craters = [
  [0.31, 0.28, 0.08, 0.34],
  [0.61, 0.24, 0.05, 0.22],
  [0.70, 0.53, 0.09, 0.25],
  [0.39, 0.66, 0.11, 0.24],
  [0.22, 0.56, 0.045, 0.2],
  [0.56, 0.72, 0.055, 0.19],
  [0.77, 0.34, 0.035, 0.18],
  [0.47, 0.41, 0.027, 0.18],
] as const;

export default function LunarDaySignal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let scrollY = window.scrollY;

    const seedStars = () => {
      stars.length = 0;
      const count = Math.min(150, Math.max(68, Math.floor(width / 7)));
      for (let index = 0; index < count; index += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          depth: 0.25 + Math.random() * 0.75,
          size: 0.45 + Math.random() * 1.35,
          phase: Math.random() * Math.PI * 2,
        });
      }
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
      seedStars();
      if (reducedMotion) draw(0);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      if (reducedMotion) draw(0);
    };

    const drawBackground = (time: number) => {
      const cycle = 0.5 + Math.sin(time * 0.000075) * 0.5;
      const top = cycle > 0.5 ? "#f8fbfe" : "#eef2f6";
      const bottom = cycle > 0.5 ? "#edf3f8" : "#e3e9ef";
      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, top);
      gradient.addColorStop(1, bottom);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const sunriseX = width * (0.08 + cycle * 0.12);
      const sunriseY = height * 0.88;
      const glow = context.createRadialGradient(sunriseX, sunriseY, 0, sunriseX, sunriseY, Math.max(width, height) * 0.72);
      glow.addColorStop(0, `rgba(255,255,255,${0.66 + cycle * 0.18})`);
      glow.addColorStop(0.34, `rgba(221,229,237,${0.2 + cycle * 0.08})`);
      glow.addColorStop(1, "rgba(214,222,231,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const drawStars = (time: number) => {
      context.save();
      for (const star of stars) {
        const driftX = ((time * 0.0022 * star.depth) + scrollY * 0.012 * star.depth) % (width + 80);
        const x = (star.x + driftX) % (width + 80) - 40;
        const y = star.y + Math.sin(time * 0.00025 + star.phase) * 3 * star.depth - scrollY * 0.003 * star.depth;
        const twinkle = 0.32 + Math.sin(time * 0.0011 + star.phase) * 0.14;
        context.fillStyle = `rgba(68,82,98,${Math.max(0.08, twinkle * star.depth)})`;
        context.beginPath();
        context.arc(x, y, star.size * star.depth, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const drawMoon = (time: number) => {
      const mobile = width < 720;
      const radius = Math.min(width, height) * (mobile ? 0.29 : 0.34);
      const x = width * (mobile ? 0.76 : 0.79) + Math.sin(time * 0.00014) * 18;
      const y = height * (mobile ? 0.37 : 0.43) + Math.cos(time * 0.00011) * 12 - scrollY * 0.018;
      const phase = 0.5 + Math.sin(time * 0.000085) * 0.5;

      context.save();
      const halo = context.createRadialGradient(x, y, radius * 0.82, x, y, radius * 1.65);
      halo.addColorStop(0, `rgba(255,255,255,${0.28 + phase * 0.16})`);
      halo.addColorStop(0.42, "rgba(180,192,204,0.12)");
      halo.addColorStop(1, "rgba(160,174,188,0)");
      context.fillStyle = halo;
      context.beginPath();
      context.arc(x, y, radius * 1.65, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.clip();

      const moonGradient = context.createRadialGradient(
        x - radius * 0.34,
        y - radius * 0.32,
        radius * 0.08,
        x,
        y,
        radius,
      );
      moonGradient.addColorStop(0, "#ffffff");
      moonGradient.addColorStop(0.48, "#e3e8ed");
      moonGradient.addColorStop(0.78, "#bcc5ce");
      moonGradient.addColorStop(1, "#7e8994");
      context.fillStyle = moonGradient;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);

      for (const [cx, cy, size, shade] of craters) {
        const craterX = x - radius + cx * radius * 2;
        const craterY = y - radius + cy * radius * 2;
        const craterRadius = size * radius;
        const crater = context.createRadialGradient(
          craterX - craterRadius * 0.24,
          craterY - craterRadius * 0.22,
          craterRadius * 0.12,
          craterX,
          craterY,
          craterRadius,
        );
        crater.addColorStop(0, `rgba(255,255,255,${0.18 + shade})`);
        crater.addColorStop(0.58, `rgba(95,106,118,${0.15 + shade})`);
        crater.addColorStop(1, "rgba(70,80,91,0)");
        context.fillStyle = crater;
        context.beginPath();
        context.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
        context.fill();
      }

      const terminatorX = x + radius * (-1.05 + phase * 2.1);
      const penumbra = context.createLinearGradient(terminatorX - radius * 0.48, 0, terminatorX + radius * 0.44, 0);
      penumbra.addColorStop(0, "rgba(29,38,49,0.7)");
      penumbra.addColorStop(0.45, "rgba(42,53,65,0.42)");
      penumbra.addColorStop(0.72, "rgba(73,84,96,0.13)");
      penumbra.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = penumbra;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      context.restore();

      context.save();
      context.strokeStyle = "rgba(76,91,108,0.18)";
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(x, y, radius * 1.45, radius * 0.42, -0.25, 0, Math.PI * 2);
      context.stroke();

      const orbitPhase = (time * 0.000055) % 1;
      const angle = orbitPhase * Math.PI * 2;
      const markerX = x + Math.cos(angle) * radius * 1.45;
      const markerY = y + Math.sin(angle) * radius * 0.42;
      context.fillStyle = "rgba(64,82,103,0.64)";
      context.shadowColor = "rgba(255,255,255,0.9)";
      context.shadowBlur = 12;
      context.beginPath();
      context.arc(markerX, markerY, 2.6, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      drawBackground(time);
      drawStars(time);
      drawMoon(time);
    };

    const animate = (time: number) => {
      draw(time);
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={light.canvas} aria-hidden="true" />;
}
