"use client";

import { useEffect, useRef } from "react";

type FallingParcel = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  rotationVelocity: number;
  settled: number;
};

const AMBER = "255, 216, 77";
const RED = "255, 78, 88";
const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value));

export default function AuthorityConveyor() {
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
    let elapsed = 0;
    let lastTime = performance.now();
    let nextDropAt = 650;
    let resetAt = 0;
    const falling: FallingParcel[] = [];

    const amber = (alpha: number) => `rgba(${AMBER}, ${alpha})`;
    const red = (alpha: number) => `rgba(${RED}, ${alpha})`;

    const geometry = () => {
      const mobile = width < 700;
      const conveyorY = Math.max(mobile ? 142 : 162, height * (mobile ? 0.225 : 0.245));
      const startX = width * (mobile ? 0.04 : 0.07);
      const endX = width * (mobile ? 0.77 : 0.82);
      const floorY = height - 2;
      return { mobile, conveyorY, startX, endX, floorY };
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
      falling.splice(0, falling.length);
      resetAt = 0;
      nextDropAt = elapsed + 650;
    };

    const drawGrid = () => {
      const step = width < 700 ? 30 : 36;
      context.save();
      context.strokeStyle = amber(0.026);
      context.lineWidth = 1;
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

      context.strokeStyle = amber(0.052);
      context.beginPath();
      for (let x = 0; x <= width; x += step * 5) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += step * 5) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();
      context.restore();
    };

    const drawSweep = (time: number) => {
      const span = width + 360;
      const x = ((time * 0.036) % span) - 180;
      const gradient = context.createLinearGradient(x - 240, 0, x + 20, 0);
      gradient.addColorStop(0, amber(0));
      gradient.addColorStop(0.84, amber(0.04));
      gradient.addColorStop(1, amber(0.16));
      context.save();
      context.fillStyle = gradient;
      context.fillRect(Math.max(0, x - 240), 0, 260, height);
      context.strokeStyle = amber(0.23);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
      context.restore();
    };

    const parcelPoint = (progress: number, lane = 0) => {
      const { conveyorY, startX, endX } = geometry();
      const x = startX + (endX - startX) * progress;
      const rise = progress > 0.42 && progress < 0.66
        ? -Math.sin(((progress - 0.42) / 0.24) * Math.PI) * Math.min(34, height * 0.045)
        : 0;
      return { x, y: conveyorY + lane * 30 + rise };
    };

    const drawParcel = (
      x: number,
      y: number,
      parcelWidth: number,
      parcelHeight: number,
      color: "amber" | "red",
      alpha: number,
      rotation = 0,
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.strokeStyle = color === "red" ? red(alpha) : amber(alpha);
      context.fillStyle = color === "red" ? red(alpha * 0.12) : amber(alpha * 0.075);
      context.shadowColor = color === "red" ? red(alpha * 0.8) : amber(alpha * 0.42);
      context.shadowBlur = color === "red" ? 12 : 5;
      context.lineWidth = 1.15;
      context.fillRect(-parcelWidth / 2, -parcelHeight / 2, parcelWidth, parcelHeight);
      context.strokeRect(-parcelWidth / 2, -parcelHeight / 2, parcelWidth, parcelHeight);
      context.shadowBlur = 0;
      context.strokeStyle = color === "red" ? red(alpha * 0.7) : amber(alpha * 0.32);
      context.beginPath();
      context.moveTo(-parcelWidth * 0.18, -parcelHeight / 2);
      context.lineTo(parcelWidth * 0.18, parcelHeight / 2);
      context.stroke();
      context.restore();
    };

    const drawConveyor = (time: number) => {
      const { mobile, conveyorY, startX, endX } = geometry();
      context.save();
      context.strokeStyle = amber(0.18);
      context.lineWidth = 1.7;
      context.beginPath();
      for (let i = 0; i <= 120; i += 1) {
        const point = parcelPoint(i / 120);
        if (i === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.stroke();

      context.strokeStyle = amber(0.075);
      context.lineWidth = 1;
      for (let i = 0; i < 22; i += 1) {
        const point = parcelPoint(i / 21);
        context.beginPath();
        context.arc(point.x, point.y + 9, 3.2, 0, Math.PI * 2);
        context.stroke();
      }

      context.strokeStyle = amber(0.11);
      context.beginPath();
      context.moveTo(startX + 24, conveyorY + 12);
      context.lineTo(startX + 7, conveyorY + 82);
      context.moveTo(endX - 20, conveyorY + 12);
      context.lineTo(endX - 3, conveyorY + 82);
      context.stroke();

      const count = mobile ? 6 : 9;
      for (let index = 0; index < count; index += 1) {
        const progress = ((time * 0.000052 + index / count) % 1 + 1) % 1;
        const point = parcelPoint(progress);
        const nearExit = progress > 0.9;
        drawParcel(
          point.x,
          point.y - 11,
          mobile ? 18 : 21,
          mobile ? 13 : 15,
          nearExit && index % 4 === 0 ? "red" : "amber",
          nearExit && index % 4 === 0 ? 0.68 : 0.36,
        );
      }

      context.strokeStyle = red(0.74);
      context.fillStyle = red(0.1);
      context.shadowColor = red(0.7);
      context.shadowBlur = 13;
      context.lineWidth = 1.4;
      context.beginPath();
      context.moveTo(endX - 6, conveyorY - 26);
      context.lineTo(endX + 14, conveyorY - 10);
      context.lineTo(endX + 2, conveyorY + 9);
      context.closePath();
      context.fill();
      context.stroke();
      context.shadowBlur = 0;

      context.fillStyle = amber(0.38);
      context.font = `${mobile ? 9 : 10}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.fillText("PREPARE / DRAFT / STAGE", startX, conveyorY - 42);
      context.fillStyle = red(0.48);
      context.fillText("EXTERNAL ACTION", Math.max(startX, endX - (mobile ? 112 : 126)), conveyorY + 104);
      context.restore();
    };

    const spawn = () => {
      const { mobile, conveyorY, endX } = geometry();
      const scale = mobile ? 0.86 : 1;
      falling.push({
        x: endX + 3 + (Math.random() - 0.5) * 7,
        y: conveyorY - 6,
        vx: (Math.random() - 0.58) * (mobile ? 30 : 38),
        vy: 20 + Math.random() * 15,
        width: (18 + Math.random() * 8) * scale,
        height: (13 + Math.random() * 6) * scale,
        rotation: (Math.random() - 0.5) * 0.2,
        rotationVelocity: (Math.random() - 0.5) * 1.1,
        settled: 0,
      });
    };

    const resolvePhysics = (dt: number) => {
      const { conveyorY, floorY, endX } = geometry();
      const gravity = 340;

      falling.forEach((item) => {
        if (item.settled > 0.95) return;
        item.vy += gravity * dt;
        item.vx *= Math.pow(0.993, dt * 60);
        item.rotationVelocity *= Math.pow(0.986, dt * 60);
        item.x += item.vx * dt;
        item.y += item.vy * dt;
        item.rotation += item.rotationVelocity * dt;

        const halfWidth = item.width / 2;
        const halfHeight = item.height / 2;
        if (item.x - halfWidth < 1) {
          item.x = halfWidth + 1;
          item.vx = Math.abs(item.vx) * 0.28;
        }
        if (item.x + halfWidth > width - 1) {
          item.x = width - halfWidth - 1;
          item.vx = -Math.abs(item.vx) * 0.28;
        }
        if (item.y + halfHeight > floorY) {
          item.y = floorY - halfHeight;
          item.vy *= -0.18;
          item.vx *= 0.74;
          item.rotationVelocity *= 0.52;
          if (Math.abs(item.vy) < 8 && Math.abs(item.vx) < 4.5) item.settled += dt * 1.35;
        }
      });

      for (let pass = 0; pass < 3; pass += 1) {
        for (let i = 0; i < falling.length; i += 1) {
          const upper = falling[i];
          for (let j = 0; j < falling.length; j += 1) {
            if (i === j) continue;
            const lower = falling[j];
            if (upper.y >= lower.y) continue;
            const overlapX = upper.width / 2 + lower.width / 2 - Math.abs(upper.x - lower.x);
            const overlapY = upper.height / 2 + lower.height / 2 - Math.abs(upper.y - lower.y);
            if (overlapX <= 0 || overlapY <= 0) continue;

            if (overlapY <= overlapX * 1.15) {
              upper.y -= overlapY + 0.3;
              if (upper.vy > 0) upper.vy *= -0.1;
              const direction = upper.x === lower.x
                ? (Math.random() > 0.5 ? 1 : -1)
                : Math.sign(upper.x - lower.x);
              upper.vx += direction * (3 + overlapY * 0.28);
              upper.rotationVelocity += direction * 0.07;
              upper.settled = Math.max(0, upper.settled - 0.1);
            } else {
              const direction = upper.x < lower.x ? -1 : 1;
              upper.x += direction * overlapX * 0.5;
              upper.vx += direction * 5;
            }
          }
        }
      }

      falling.forEach((item) => {
        if (item.settled > 0.76) {
          item.vx *= 0.72;
          item.vy = 0;
          item.rotationVelocity *= 0.6;
        }
      });

      if (falling.length > 28 && resetAt === 0) {
        const highest = Math.min(...falling.map((item) => item.y - item.height / 2));
        if (highest <= conveyorY + 18) resetAt = elapsed + 1300;
      }

      if (resetAt > 0 && elapsed >= resetAt) {
        falling.splice(0, falling.length);
        resetAt = 0;
        nextDropAt = elapsed + 1100;
      }

      if (falling.length > 175) falling.splice(0, falling.length - 175);
      const center = falling.length
        ? falling.reduce((sum, item) => sum + item.x, 0) / falling.length
        : endX;
      falling.forEach((item) => {
        if (item.y < floorY - height * 0.2 && item.settled < 0.8) {
          item.vx += Math.sign(item.x - center || Math.random() - 0.5) * dt * 5;
        }
      });
    };

    const seedReducedMotion = () => {
      const { floorY, endX } = geometry();
      falling.splice(0, falling.length);
      const boxWidth = width < 700 ? 19 : 23;
      const boxHeight = width < 700 ? 14 : 17;
      for (let row = 0; row < 6; row += 1) {
        const count = 8 - row;
        for (let column = 0; column < count; column += 1) {
          falling.push({
            x: endX + (column - (count - 1) / 2) * (boxWidth + 1),
            y: floorY - boxHeight / 2 - row * (boxHeight + 1),
            vx: 0,
            vy: 0,
            width: boxWidth,
            height: boxHeight,
            rotation: (column % 2 ? 1 : -1) * 0.035,
            rotationVelocity: 0,
            settled: 1,
          });
        }
      }
    };

    const render = (time: number) => {
      const dt = clamp((time - lastTime) / 1000, 0, 0.033);
      lastTime = time;
      elapsed += dt * 1000;
      context.clearRect(0, 0, width, height);

      drawGrid();
      drawSweep(time);
      drawConveyor(time);

      if (!reducedMotion) {
        if (elapsed >= nextDropAt && resetAt === 0) {
          spawn();
          nextDropAt = elapsed + (width < 700 ? 690 : 610) + Math.random() * 240;
        }
        resolvePhysics(dt);
      }

      falling.forEach((item) =>
        drawParcel(item.x, item.y, item.width, item.height, "red", 0.72, item.rotation),
      );

      if (resetAt > 0) {
        const phase = clamp((resetAt - elapsed) / 1300, 0, 1);
        context.save();
        context.fillStyle = red(0.025 + (1 - phase) * 0.025);
        context.fillRect(0, 0, width, height);
        context.fillStyle = red(0.38);
        context.font = `${width < 700 ? 9 : 10}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.textAlign = "center";
        context.fillText("BOUNDARY SATURATION / RESET", width / 2, height * 0.55);
        context.restore();
      }

      frame = window.requestAnimationFrame(render);
    };

    resize();
    if (reducedMotion) seedReducedMotion();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="authority-conveyor-canvas" aria-hidden="true" />;
}
