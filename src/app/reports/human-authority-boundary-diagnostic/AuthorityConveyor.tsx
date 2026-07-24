"use client";

import { useEffect, useRef } from "react";

type PackageBox = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  rotationVelocity: number;
  sleep: number;
};

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
    let lastTime = performance.now();
    let elapsed = 0;
    let nextSpawnAt = 300;
    let resetAt = 0;
    let resetFlash = 0;
    const packages: PackageBox[] = [];

    const geometry = () => {
      const mobile = width < 700;
      const conveyorY = Math.max(mobile ? 138 : 154, height * (mobile ? 0.235 : 0.255));
      const conveyorStart = width * (mobile ? 0.035 : 0.06);
      const dropX = width * (mobile ? 0.72 : 0.79);
      const floorY = height - 3;
      return { mobile, conveyorY, conveyorStart, dropX, floorY };
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
      packages.splice(0, packages.length);
      resetAt = 0;
      resetFlash = 0;
    };

    const spawnPackage = () => {
      const { mobile, conveyorY, dropX } = geometry();
      const scale = mobile ? 0.9 : 1;
      const packageWidth = (18 + Math.random() * 10) * scale;
      const packageHeight = (13 + Math.random() * 8) * scale;
      packages.push({
        x: dropX + (Math.random() - 0.5) * 8,
        y: conveyorY - 20,
        vx: (Math.random() - 0.42) * (mobile ? 34 : 42),
        vy: 18 + Math.random() * 12,
        width: packageWidth,
        height: packageHeight,
        rotation: (Math.random() - 0.5) * 0.24,
        rotationVelocity: (Math.random() - 0.5) * 1.2,
        sleep: 0,
      });
    };

    const seedReducedMotionPile = () => {
      const { dropX, floorY } = geometry();
      packages.splice(0, packages.length);
      const boxWidth = width < 700 ? 20 : 24;
      const boxHeight = width < 700 ? 15 : 18;
      for (let row = 0; row < 7; row += 1) {
        const count = 9 - row;
        for (let column = 0; column < count; column += 1) {
          packages.push({
            x: dropX + (column - (count - 1) / 2) * (boxWidth + 1),
            y: floorY - boxHeight / 2 - row * (boxHeight + 1),
            vx: 0,
            vy: 0,
            width: boxWidth,
            height: boxHeight,
            rotation: (column % 2 ? 1 : -1) * 0.035,
            rotationVelocity: 0,
            sleep: 999,
          });
        }
      }
    };

    const resolvePhysics = (dt: number) => {
      const { conveyorY, dropX, floorY } = geometry();
      const gravity = 355;

      packages.forEach((item) => {
        if (item.sleep > 0.9) return;
        item.vy += gravity * dt;
        item.vx *= Math.pow(0.992, dt * 60);
        item.rotationVelocity *= Math.pow(0.985, dt * 60);
        item.x += item.vx * dt;
        item.y += item.vy * dt;
        item.rotation += item.rotationVelocity * dt;

        const halfWidth = item.width / 2;
        const halfHeight = item.height / 2;
        if (item.x - halfWidth < 2) {
          item.x = halfWidth + 2;
          item.vx = Math.abs(item.vx) * 0.34;
        }
        if (item.x + halfWidth > width - 2) {
          item.x = width - halfWidth - 2;
          item.vx = -Math.abs(item.vx) * 0.34;
        }
        if (item.y + halfHeight > floorY) {
          item.y = floorY - halfHeight;
          item.vy *= -0.19;
          item.vx *= 0.76;
          item.rotationVelocity *= 0.55;
          if (Math.abs(item.vy) < 9 && Math.abs(item.vx) < 5) item.sleep += dt * 1.3;
        }
      });

      for (let pass = 0; pass < 3; pass += 1) {
        for (let i = 0; i < packages.length; i += 1) {
          const upper = packages[i];
          for (let j = 0; j < packages.length; j += 1) {
            if (i === j) continue;
            const lower = packages[j];
            if (upper.y >= lower.y) continue;

            const overlapX =
              upper.width / 2 + lower.width / 2 - Math.abs(upper.x - lower.x);
            const overlapY =
              upper.height / 2 + lower.height / 2 - Math.abs(upper.y - lower.y);
            if (overlapX <= 0 || overlapY <= 0) continue;

            if (overlapY <= overlapX * 1.18) {
              upper.y -= overlapY + 0.35;
              if (upper.vy > 0) upper.vy *= -0.12;
              const direction = upper.x === lower.x ? (Math.random() > 0.5 ? 1 : -1) : Math.sign(upper.x - lower.x);
              upper.vx += direction * (3.5 + overlapY * 0.34);
              upper.rotationVelocity += direction * 0.08;
              upper.sleep = Math.max(0, upper.sleep - 0.08);
            } else {
              const direction = upper.x < lower.x ? -1 : 1;
              upper.x += direction * overlapX * 0.52;
              upper.vx += direction * 7;
            }
          }
        }
      }

      packages.forEach((item) => {
        if (item.sleep > 0.75) {
          item.vx *= 0.7;
          item.vy = 0;
          item.rotationVelocity *= 0.6;
        }
      });

      if (packages.length > 32) {
        const highestTop = Math.min(...packages.map((item) => item.y - item.height / 2));
        if (highestTop <= conveyorY + 24 && resetAt === 0) {
          resetAt = elapsed + 1300;
          resetFlash = 1;
        }
      }

      if (resetAt > 0 && elapsed >= resetAt) {
        packages.splice(0, packages.length);
        resetAt = 0;
        resetFlash = 0;
        nextSpawnAt = elapsed + 900;
      }

      if (packages.length > 170) packages.splice(0, packages.length - 170);

      const pileCenter = packages.length
        ? packages.reduce((sum, item) => sum + item.x, 0) / packages.length
        : dropX;
      packages.forEach((item) => {
        if (item.y < floorY - height * 0.19 && item.sleep < 0.8) {
          item.vx += Math.sign(item.x - pileCenter || Math.random() - 0.5) * dt * 6;
        }
      });
    };

    const drawGrid = () => {
      context.save();
      context.strokeStyle = "rgba(20, 14, 0, 0.075)";
      context.lineWidth = 1;
      context.beginPath();
      const step = width < 700 ? 28 : 36;
      for (let x = 0; x <= width; x += step) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += step) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();
      context.restore();
    };

    const drawPackage = (item: PackageBox, alpha = 1) => {
      context.save();
      context.translate(item.x, item.y);
      context.rotate(item.rotation);
      context.globalAlpha = alpha;
      context.fillStyle = "#d51d2e";
      context.strokeStyle = "rgba(18, 8, 2, 0.88)";
      context.lineWidth = 1.25;
      context.shadowColor = "rgba(88, 8, 12, 0.22)";
      context.shadowBlur = 7;
      context.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
      context.shadowBlur = 0;
      context.strokeRect(-item.width / 2, -item.height / 2, item.width, item.height);
      context.strokeStyle = "rgba(255, 222, 172, 0.62)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(-item.width * 0.18, -item.height / 2);
      context.lineTo(item.width * 0.18, item.height / 2);
      context.stroke();
      context.restore();
    };

    const drawConveyor = (time: number) => {
      const { mobile, conveyorY, conveyorStart, dropX } = geometry();
      const beltHeight = mobile ? 24 : 28;

      context.save();
      context.fillStyle = "rgba(22, 15, 1, 0.92)";
      context.fillRect(conveyorStart, conveyorY - beltHeight / 2, dropX - conveyorStart, beltHeight);
      context.strokeStyle = "rgba(22, 15, 1, 0.94)";
      context.lineWidth = 3;
      context.strokeRect(conveyorStart, conveyorY - beltHeight / 2, dropX - conveyorStart, beltHeight);

      const rollerSpacing = mobile ? 30 : 38;
      const rollerOffset = (time * 0.028) % rollerSpacing;
      for (let x = conveyorStart - rollerOffset; x < dropX; x += rollerSpacing) {
        context.strokeStyle = "rgba(240, 188, 31, 0.52)";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x, conveyorY - beltHeight / 2 + 3);
        context.lineTo(x + beltHeight * 0.45, conveyorY + beltHeight / 2 - 3);
        context.stroke();
      }

      context.strokeStyle = "rgba(22, 15, 1, 0.9)";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(conveyorStart + 18, conveyorY + beltHeight / 2);
      context.lineTo(conveyorStart + 5, conveyorY + 76);
      context.moveTo(dropX - 18, conveyorY + beltHeight / 2);
      context.lineTo(dropX - 5, conveyorY + 76);
      context.stroke();

      const beltSpan = dropX - conveyorStart;
      const movingCount = mobile ? 5 : 7;
      for (let index = 0; index < movingCount; index += 1) {
        const progress = ((time * 0.000055 + index / movingCount) % 1 + 1) % 1;
        const x = conveyorStart + 18 + progress * Math.max(1, beltSpan - 42);
        drawPackage({
          x,
          y: conveyorY - beltHeight / 2 - 9,
          vx: 0,
          vy: 0,
          width: mobile ? 18 : 22,
          height: mobile ? 13 : 15,
          rotation: 0,
          rotationVelocity: 0,
          sleep: 1,
        }, 0.88);
      }

      context.fillStyle = "#d51d2e";
      context.strokeStyle = "rgba(22, 15, 1, 0.92)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(dropX - 3, conveyorY - 27);
      context.lineTo(dropX + 18, conveyorY - 12);
      context.lineTo(dropX + 4, conveyorY + 8);
      context.closePath();
      context.fill();
      context.stroke();

      context.fillStyle = "rgba(22, 15, 1, 0.76)";
      context.font = `${mobile ? 9 : 10}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.letterSpacing = "0.12em";
      context.fillText("PREPARE / DRAFT / STAGE", conveyorStart, conveyorY - 43);
      context.fillStyle = "#a30e1e";
      context.fillText("EXTERNAL BOUNDARY", Math.max(conveyorStart, dropX - (mobile ? 118 : 132)), conveyorY + 101);
      context.restore();
    };

    const draw = (time: number) => {
      const dt = clamp((time - lastTime) / 1000, 0, 0.033);
      lastTime = time;
      elapsed += dt * 1000;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawConveyor(time);

      if (!reducedMotion) {
        if (elapsed >= nextSpawnAt && resetAt === 0) {
          spawnPackage();
          nextSpawnAt = elapsed + (width < 700 ? 610 : 520) + Math.random() * 210;
        }
        resolvePhysics(dt);
      }

      packages.forEach((item) => drawPackage(item));

      if (resetAt > 0) {
        resetFlash = Math.max(0, resetFlash - dt * 0.55);
        context.save();
        context.fillStyle = `rgba(213, 29, 46, ${0.05 + resetFlash * 0.09})`;
        context.fillRect(0, 0, width, height);
        context.fillStyle = "rgba(22, 15, 1, 0.86)";
        context.font = `${width < 700 ? 10 : 12}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.textAlign = "center";
        context.fillText("BOUNDARY SATURATED / RESETTING THE SYSTEM", width / 2, height * 0.54);
        context.restore();
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    if (reducedMotion) seedReducedMotionPile();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="authority-conveyor-canvas" aria-hidden="true" />;
}
