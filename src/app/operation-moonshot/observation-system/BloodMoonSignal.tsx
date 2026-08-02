"use client";

import { useEffect, useRef } from "react";
import styles from "./bloodmoon.module.css";

type Star = {
  x: number;
  y: number;
  radius: number;
  depth: number;
  phase: number;
};

const craters = [
  [0.29, 0.25, 0.035, 0.52],
  [0.65, 0.24, 0.073, 0.48],
  [0.43, 0.42, 0.052, 0.34],
  [0.73, 0.55, 0.045, 0.5],
  [0.34, 0.69, 0.096, 0.42],
  [0.58, 0.72, 0.036, 0.36],
  [0.22, 0.51, 0.025, 0.44],
  [0.52, 0.18, 0.019, 0.38],
  [0.79, 0.36, 0.021, 0.46],
  [0.48, 0.57, 0.024, 0.33],
] as const;

export default function BloodMoonSignal() {
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
    let scrollY = window.scrollY;
    let stars: Star[] = [];

    const rebuildStars = () => {
      const count = Math.min(190, Math.max(72, Math.floor((width * height) / 10500)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.45 + Math.random() * 1.35,
        depth: 0.18 + Math.random() * 0.82,
        phase: Math.random() * Math.PI * 2,
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
      rebuildStars();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const drawStars = (time: number, scrollProgress: number) => {
      context.save();
      for (const star of stars) {
        const drift = reducedMotion ? 0 : time * 0.0018 * star.depth;
        const x = (star.x - drift * 8 - scrollProgress * 74 * star.depth + width * 2) % width;
        const y = (star.y + drift * 2.2 + scrollProgress * 42 * star.depth + height * 2) % height;
        const twinkle = reducedMotion ? 0.62 : 0.38 + Math.sin(time * 0.0012 + star.phase) * 0.2;
        context.fillStyle = `rgba(238, 231, 232, ${Math.max(0.12, twinkle * star.depth)})`;
        context.beginPath();
        context.arc(x, y, star.radius * (0.72 + star.depth * 0.48), 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const drawMoon = (time: number, scrollProgress: number) => {
      const mobile = width < 720;
      const radius = Math.min(
        mobile ? width * 0.68 : width * 0.34,
        mobile ? height * 0.36 : height * 0.43,
        mobile ? 360 : 510,
      );
      const motion = reducedMotion ? 0 : time * 0.00012;
      const centerX = width * (mobile ? 0.88 : 0.79) - scrollProgress * width * (mobile ? 0.18 : 0.25) + Math.sin(motion) * 18;
      const centerY = height * (mobile ? 0.31 : 0.36) + scrollProgress * height * 0.12 + Math.cos(motion * 0.82) * 11;

      context.save();
      const glow = context.createRadialGradient(centerX, centerY, radius * 0.72, centerX, centerY, radius * 1.65);
      glow.addColorStop(0, "rgba(118, 15, 27, 0.16)");
      glow.addColorStop(0.55, "rgba(76, 4, 13, 0.08)");
      glow.addColorStop(1, "rgba(35, 0, 6, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.65, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();

      const surface = context.createRadialGradient(
        centerX - radius * 0.32,
        centerY - radius * 0.34,
        radius * 0.08,
        centerX,
        centerY,
        radius * 1.08,
      );
      surface.addColorStop(0, "rgba(142, 49, 56, 0.88)");
      surface.addColorStop(0.37, "rgba(91, 22, 31, 0.92)");
      surface.addColorStop(0.72, "rgba(43, 8, 14, 0.97)");
      surface.addColorStop(1, "rgba(7, 2, 4, 1)");
      context.fillStyle = surface;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      for (const [cx, cy, size, opacity] of craters) {
        const craterX = centerX - radius + cx * radius * 2;
        const craterY = centerY - radius + cy * radius * 2;
        const craterRadius = radius * size;
        const crater = context.createRadialGradient(
          craterX - craterRadius * 0.35,
          craterY - craterRadius * 0.35,
          craterRadius * 0.08,
          craterX,
          craterY,
          craterRadius,
        );
        crater.addColorStop(0, `rgba(183, 80, 82, ${opacity * 0.24})`);
        crater.addColorStop(0.5, `rgba(29, 3, 8, ${opacity * 0.66})`);
        crater.addColorStop(0.82, `rgba(9, 1, 3, ${opacity * 0.78})`);
        crater.addColorStop(1, "rgba(72, 14, 22, 0)");
        context.fillStyle = crater;
        context.beginPath();
        context.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
        context.fill();
      }

      const terminator = context.createLinearGradient(centerX - radius, 0, centerX + radius, 0);
      terminator.addColorStop(0, "rgba(15, 2, 5, 0.08)");
      terminator.addColorStop(0.44, "rgba(6, 1, 3, 0.22)");
      terminator.addColorStop(0.73, "rgba(0, 0, 0, 0.76)");
      terminator.addColorStop(1, "rgba(0, 0, 0, 0.96)");
      context.fillStyle = terminator;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      context.restore();

      context.save();
      context.strokeStyle = "rgba(139, 48, 59, 0.2)";
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(centerX, centerY, radius * 1.22, radius * 0.48, -0.28, 0, Math.PI * 2);
      context.stroke();

      const sweepPhase = reducedMotion ? 0.42 : (time % 16000) / 16000;
      const sweepAngle = sweepPhase * Math.PI * 2 - Math.PI * 0.9;
      context.strokeStyle = "rgba(177, 56, 69, 0.34)";
      context.lineWidth = 1.2;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.08, sweepAngle - 0.26, sweepAngle + 0.12);
      context.stroke();

      const signalCycle = reducedMotion ? 0.1 : (time % 23000) / 23000;
      if (signalCycle > 0.78) {
        const phase = (signalCycle - 0.78) / 0.22;
        const pointX = centerX - radius * 0.22;
        const pointY = centerY + radius * 0.08;
        context.strokeStyle = `rgba(197, 70, 82, ${(1 - phase) * 0.45})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(pointX, pointY, 7 + phase * 42, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = `rgba(208, 83, 93, ${(1 - phase) * 0.7})`;
        context.beginPath();
        context.arc(pointX, pointY, 2.2, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const render = (time: number) => {
      const documentHeight = Math.max(document.documentElement.scrollHeight - height, 1);
      const scrollProgress = Math.max(0, Math.min(1, scrollY / documentHeight));
      context.clearRect(0, 0, width, height);

      const haze = context.createLinearGradient(0, 0, width, height);
      haze.addColorStop(0, "rgba(3, 3, 5, 0.08)");
      haze.addColorStop(0.5, "rgba(10, 5, 8, 0.02)");
      haze.addColorStop(1, "rgba(3, 2, 4, 0.18)");
      context.fillStyle = haze;
      context.fillRect(0, 0, width, height);

      drawStars(time, scrollProgress);
      drawMoon(time, scrollProgress);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.signalCanvas} aria-hidden="true" />;
}
