"use client";

import { useEffect, useRef } from "react";

type FishContact = {
  x: number;
  y: number;
  speed: number;
  size: number;
  direction: 1 | -1;
  skeleton: boolean;
  phase: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export default function EnhancedSonarContacts() {
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
    let lastTime = performance.now();
    let elapsed = 0;
    let nextContactAt = 900;
    let contactIndex = 0;
    const contacts: FishContact[] = [];

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

    const scannerX = (time: number) => {
      const span = width + 300;
      return width + 150 - ((time * 0.062) % span);
    };

    const chooseLane = () => {
      const mobile = width < 700;
      const lanes = mobile
        ? [0.14, 0.27, 0.72, 0.86]
        : [0.17, 0.31, 0.67, 0.82];
      const base = lanes[contactIndex % lanes.length];
      return height * clamp(base + (Math.random() - 0.5) * 0.045, 0.1, 0.9);
    };

    const spawnContact = () => {
      const direction: 1 | -1 = contactIndex % 2 === 0 ? 1 : -1;
      contacts.push({
        x: direction === 1 ? -150 : width + 150,
        y: chooseLane(),
        speed: 28 + Math.random() * 18,
        size: (width < 700 ? 92 : 118) + Math.random() * (width < 700 ? 38 : 62),
        direction,
        skeleton: contactIndex > 0 && contactIndex % 5 === 4,
        phase: Math.random() * Math.PI * 2,
      });
      contactIndex += 1;
      nextContactAt = elapsed + 9000 + Math.random() * 5500;
    };

    const drawFish = (fish: FishContact, scan: number, time: number) => {
      const revealWidth = Math.max(145, width * 0.23);
      const reveal = clamp(1 - Math.abs(fish.x - scan) / revealWidth, 0, 1);
      const focused = Math.pow(reveal, 1.65);
      const alpha = 0.035 + focused * 0.93;
      const s = fish.size;

      context.save();
      context.translate(fish.x, fish.y);
      context.scale(fish.direction, 1);
      context.lineWidth = Math.max(1.15, s * 0.021);
      context.strokeStyle = `rgba(224,232,238,${alpha})`;
      context.fillStyle = `rgba(210,220,227,${0.025 + focused * 0.18})`;
      context.shadowColor = `rgba(224,232,238,${focused * 0.92})`;
      context.shadowBlur = 4 + focused * 24;

      if (fish.skeleton && reveal > 0.13) {
        context.beginPath();
        context.moveTo(-s * 0.47, 0);
        context.lineTo(s * 0.37, 0);
        context.stroke();

        for (let index = -5; index <= 5; index += 1) {
          const x = index * s * 0.064;
          const rib = s * (0.24 - Math.abs(index) * 0.014);
          context.beginPath();
          context.moveTo(x, 0);
          context.quadraticCurveTo(x + s * 0.02, -rib * 0.58, x + s * 0.052, -rib);
          context.moveTo(x, 0);
          context.quadraticCurveTo(x + s * 0.02, rib * 0.58, x + s * 0.052, rib);
          context.stroke();
        }

        context.beginPath();
        context.moveTo(-s * 0.43, 0);
        context.lineTo(-s * 0.67, -s * 0.23);
        context.lineTo(-s * 0.67, s * 0.23);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.arc(s * 0.44, 0, s * 0.14, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(s * 0.485, -s * 0.025, Math.max(1.4, s * 0.019), 0, Math.PI * 2);
        context.fill();
      } else {
        context.beginPath();
        context.ellipse(0, 0, s * 0.48, s * 0.22, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(-s * 0.42, 0);
        context.lineTo(-s * 0.7, -s * 0.24);
        context.lineTo(-s * 0.66, s * 0.25);
        context.closePath();
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(s * 0.02, -s * 0.19);
        context.lineTo(-s * 0.1, -s * 0.4);
        context.lineTo(s * 0.21, -s * 0.18);
        context.stroke();

        context.beginPath();
        context.arc(s * 0.32, -s * 0.04, Math.max(1.5, s * 0.019), 0, Math.PI * 2);
        context.fill();
      }
      context.restore();

      if (focused > 0.56) {
        const pulse = (time % 1600) / 1600;
        const radius = 8 + pulse * 42;
        context.save();
        context.strokeStyle = `rgba(225,233,239,${(1 - pulse) * focused * 0.55})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(fish.x, fish.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = `rgba(235,241,245,${0.45 + focused * 0.45})`;
        context.shadowColor = "rgba(235,241,245,.95)";
        context.shadowBlur = 16;
        context.beginPath();
        context.arc(fish.x, fish.y, 2.8, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      if (focused > 0.72) {
        context.save();
        context.font = "800 9px ui-monospace, SFMono-Regular, Menlo, monospace";
        context.fillStyle = `rgba(230,237,242,${focused * 0.78})`;
        context.fillText(fish.skeleton ? "CONTACT // SOURCE SKELETON" : "CONTACT // MOVING TARGET", fish.x + 18, fish.y - s * 0.31);
        context.restore();
      }
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 30) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;
      const dt = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      elapsed += dt * 1000;
      context.clearRect(0, 0, width, height);

      if (reducedMotion && contacts.length === 0) {
        contacts.push({
          x: width * 0.68,
          y: height * 0.78,
          speed: 0,
          size: width < 700 ? 110 : 150,
          direction: -1,
          skeleton: false,
          phase: 0,
        });
      } else if (!reducedMotion && elapsed >= nextContactAt && contacts.length < 2) {
        spawnContact();
      }

      const scan = scannerX(time);
      contacts.forEach((fish) => {
        fish.x += fish.speed * fish.direction * dt;
        fish.y += Math.sin(elapsed * 0.0013 + fish.phase) * dt * 2.1;
        drawFish(fish, scan, time);
      });

      for (let index = contacts.length - 1; index >= 0; index -= 1) {
        if (contacts[index].x < -260 || contacts[index].x > width + 260) contacts.splice(index, 1);
      }

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
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
        mixBlendMode: "screen",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 96%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 96%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
