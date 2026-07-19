"use client";

import { useEffect, useRef } from "react";
import type { LivingSignalMode } from "./signals";

type Props = {
  mode: LivingSignalMode;
  accentRgb: string;
};

type Fish = {
  x: number;
  y: number;
  speed: number;
  size: number;
  direction: 1 | -1;
  skeleton: boolean;
  opacity: number;
};

type Packet = {
  lane: number;
  progress: number;
  speed: number;
  state: "moving" | "waiting" | "failed" | "approved";
  holdUntil: number;
};

type Parcel = {
  progress: number;
  speed: number;
  lane: number;
  state: "moving" | "paused" | "diverted" | "recovered";
  stateUntil: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export default function LivingSignalCanvas({ mode, accentRgb }: Props) {
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
    let nextFishAt = 2600;
    let nextPacketAt = 0;
    let nextParcelAt = 0;

    const fish: Fish[] = [];
    const packets: Packet[] = [];
    const parcels: Parcel[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!particles.length) {
        const count = Math.min(130, Math.max(58, Math.floor(width / 8)));
        for (let i = 0; i < count; i += 1) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            size: 0.7 + Math.random() * 1.6,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const rgba = (alpha: number) => `rgba(${accentRgb}, ${alpha})`;

    const drawGrid = (minor = 30, opacity = 0.035) => {
      context.save();
      context.lineWidth = 1;
      context.strokeStyle = rgba(opacity);
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
      context.strokeStyle = rgba(opacity * 2.1);
      context.beginPath();
      for (let x = 0; x <= width; x += minor * 5) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += minor * 5) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();
      context.restore();
    };

    const sweepX = (time: number, speed = 0.075, reverse = false) => {
      const span = width + 300;
      const raw = (time * speed) % span;
      return reverse ? width + 150 - raw : raw - 150;
    };

    const drawVerticalSweep = (x: number, reverseTrail = false, strength = 1) => {
      context.save();
      const start = reverseTrail ? x - 20 : x - 220;
      const end = reverseTrail ? x + 220 : x + 20;
      const gradient = context.createLinearGradient(start, 0, end, 0);
      if (reverseTrail) {
        gradient.addColorStop(0, rgba(0.22 * strength));
        gradient.addColorStop(0.18, rgba(0.065 * strength));
        gradient.addColorStop(1, rgba(0));
      } else {
        gradient.addColorStop(0, rgba(0));
        gradient.addColorStop(0.82, rgba(0.065 * strength));
        gradient.addColorStop(1, rgba(0.22 * strength));
      }
      context.fillStyle = gradient;
      context.fillRect(Math.min(start, end), 0, Math.abs(end - start), height);
      context.strokeStyle = rgba(0.34 * strength);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
      context.restore();
    };

    const drawPing = (x: number, y: number, time: number, period = 1700) => {
      const phase = (time % period) / period;
      const radius = 4 + phase * 34;
      context.save();
      context.strokeStyle = rgba((1 - phase) * 0.38);
      context.lineWidth = 1;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = rgba(0.72);
      context.shadowColor = rgba(0.95);
      context.shadowBlur = 14;
      context.beginPath();
      context.arc(x, y, 2.1, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawFishShape = (item: Fish, scan: number) => {
      const reveal = clamp(1 - Math.abs(item.x - scan) / Math.max(120, width * 0.18), 0, 1);
      const alpha = item.opacity * (0.12 + reveal * 0.78);
      const direction = item.direction;
      const x = item.x;
      const y = item.y;
      const s = item.size;

      context.save();
      context.translate(x, y);
      context.scale(direction, 1);
      context.strokeStyle = rgba(alpha);
      context.fillStyle = rgba(alpha * 0.22);
      context.shadowColor = rgba(reveal * 0.65);
      context.shadowBlur = reveal * 13;
      context.lineWidth = Math.max(0.7, s * 0.025);

      if (item.skeleton && reveal > 0.18) {
        context.beginPath();
        context.moveTo(-s * 0.46, 0);
        context.lineTo(s * 0.38, 0);
        context.stroke();
        for (let i = -4; i <= 4; i += 1) {
          const px = i * s * 0.075;
          const rib = s * (0.23 - Math.abs(i) * 0.017);
          context.beginPath();
          context.moveTo(px, 0);
          context.quadraticCurveTo(px + s * 0.025, -rib * 0.52, px + s * 0.06, -rib);
          context.moveTo(px, 0);
          context.quadraticCurveTo(px + s * 0.025, rib * 0.52, px + s * 0.06, rib);
          context.stroke();
        }
        context.beginPath();
        context.moveTo(-s * 0.42, 0);
        context.lineTo(-s * 0.62, -s * 0.22);
        context.lineTo(-s * 0.62, s * 0.22);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.arc(s * 0.43, 0, s * 0.13, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(s * 0.47, -s * 0.025, Math.max(1, s * 0.018), 0, Math.PI * 2);
        context.fill();
      } else {
        context.beginPath();
        context.ellipse(0, 0, s * 0.48, s * 0.22, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(-s * 0.42, 0);
        context.lineTo(-s * 0.68, -s * 0.22);
        context.lineTo(-s * 0.64, s * 0.23);
        context.closePath();
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(s * 0.02, -s * 0.19);
        context.lineTo(-s * 0.09, -s * 0.39);
        context.lineTo(s * 0.2, -s * 0.18);
        context.stroke();
        context.beginPath();
        context.arc(s * 0.31, -s * 0.04, Math.max(1.2, s * 0.018), 0, Math.PI * 2);
        context.fill();
      }
      context.restore();

      if (reveal > 0.82) drawPing(item.x, item.y, elapsed, 1900);
    };

    const drawSonar = (time: number, dt: number) => {
      drawGrid(32, 0.024);
      const scan = sweepX(time, 0.062, true);
      drawVerticalSweep(scan, true, 0.86);

      const centerX = width * 0.52;
      const centerY = height * 0.54;
      context.save();
      for (let i = 1; i <= 4; i += 1) {
        context.strokeStyle = rgba(0.035 + i * 0.007);
        context.beginPath();
        context.arc(centerX, centerY, i * Math.min(width, height) * 0.115, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();

      if (elapsed >= nextFishAt) {
        const direction: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
        fish.push({
          x: direction === 1 ? -130 : width + 130,
          y: height * (0.23 + Math.random() * 0.58),
          speed: 22 + Math.random() * 28,
          size: 70 + Math.random() * 85,
          direction,
          skeleton: Math.random() < 0.17,
          opacity: 0.48 + Math.random() * 0.28,
        });
        nextFishAt = elapsed + 16000 + Math.random() * 23000;
      }

      fish.forEach((item) => {
        item.x += item.speed * item.direction * dt;
        item.y += Math.sin(elapsed * 0.0011 + item.size) * dt * 2.3;
        drawFishShape(item, scan);
      });
      for (let i = fish.length - 1; i >= 0; i -= 1) {
        if (fish[i].x < -220 || fish[i].x > width + 220) fish.splice(i, 1);
      }
    };

    const drawMachine = () => {
      const ox = width * 0.5;
      const oy = height * 0.55;
      const scale = Math.min(width / 900, height / 620, 1.15);
      context.save();
      context.translate(ox, oy);
      context.scale(scale, scale);
      context.strokeStyle = rgba(0.13);
      context.lineWidth = 1;
      context.strokeRect(-310, -135, 620, 270);
      context.strokeRect(-240, -82, 150, 164);
      context.strokeRect(80, -92, 150, 184);
      context.beginPath();
      context.arc(-165, 0, 52, 0, Math.PI * 2);
      context.arc(155, 0, 68, 0, Math.PI * 2);
      context.moveTo(-113, 0);
      context.lineTo(87, 0);
      context.moveTo(-65, -62);
      context.lineTo(68, -62);
      context.moveTo(-65, 62);
      context.lineTo(68, 62);
      context.stroke();
      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * Math.PI * 2;
        context.beginPath();
        context.moveTo(155 + Math.cos(angle) * 28, Math.sin(angle) * 28);
        context.lineTo(155 + Math.cos(angle) * 54, Math.sin(angle) * 54);
        context.stroke();
      }
      context.restore();
    };

    const drawFault = (time: number) => {
      drawGrid(26, 0.026);
      drawMachine();
      const scan = sweepX(time, 0.085, false);
      drawVerticalSweep(scan, false, 0.92);
      const faults = [
        { x: width * 0.36, y: height * 0.5, type: "HEAT" },
        { x: width * 0.63, y: height * 0.57, type: "VIB" },
        { x: width * 0.51, y: height * 0.43, type: "ALIGN" },
      ];
      faults.forEach((fault, index) => {
        const reveal = clamp(1 - Math.abs(fault.x - scan) / 125, 0, 1);
        if (reveal <= 0.01) return;
        context.save();
        const pulse = 0.55 + Math.sin(time * 0.006 + index) * 0.18;
        const radius = 18 + reveal * 34;
        const gradient = context.createRadialGradient(fault.x, fault.y, 0, fault.x, fault.y, radius);
        gradient.addColorStop(0, rgba(reveal * pulse * 0.42));
        gradient.addColorStop(1, rgba(0));
        context.fillStyle = gradient;
        context.fillRect(fault.x - radius, fault.y - radius, radius * 2, radius * 2);
        context.strokeStyle = rgba(reveal * 0.6);
        context.setLineDash([5, 5]);
        context.strokeRect(fault.x - 24, fault.y - 17, 48, 34);
        context.setLineDash([]);
        context.fillStyle = rgba(reveal * 0.72);
        context.font = "10px ui-monospace, monospace";
        context.fillText(fault.type, fault.x + 30, fault.y - 10);
        context.restore();
      });
    };

    const networkPoints = () => [
      { x: width * 0.08, y: height * 0.32 },
      { x: width * 0.28, y: height * 0.32 },
      { x: width * 0.48, y: height * 0.5 },
      { x: width * 0.68, y: height * 0.34 },
      { x: width * 0.88, y: height * 0.34 },
    ];

    const pointOnNetwork = (progress: number, lane: number) => {
      const points = networkPoints().map((point, index) => ({
        x: point.x,
        y: point.y + (lane - 1) * 54 + Math.sin(index * 1.7 + lane) * 10,
      }));
      const segments = points.length - 1;
      const raw = clamp(progress, 0, 0.9999) * segments;
      const index = Math.floor(raw);
      const local = raw - index;
      const a = points[index];
      const b = points[index + 1];
      return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
    };

    const drawReceipts = (time: number, dt: number) => {
      drawGrid(30, 0.021);
      const points = networkPoints();
      context.save();
      for (let lane = 0; lane < 3; lane += 1) {
        context.strokeStyle = rgba(0.105);
        context.beginPath();
        points.forEach((point, index) => {
          const y = point.y + (lane - 1) * 54 + Math.sin(index * 1.7 + lane) * 10;
          if (index === 0) context.moveTo(point.x, y);
          else context.lineTo(point.x, y);
        });
        context.stroke();
      }
      points.forEach((point, index) => {
        const y = point.y + Math.sin(index * 1.7 + 1) * 10;
        context.strokeStyle = rgba(index === points.length - 1 ? 0.42 : 0.18);
        context.strokeRect(point.x - 19, y - 19, 38, 38);
        if (index === points.length - 1) {
          context.fillStyle = rgba(0.54);
          context.font = "9px ui-monospace, monospace";
          context.fillText("HUMAN", point.x - 17, y + 34);
        }
      });
      context.restore();

      if (elapsed >= nextPacketAt) {
        const roll = Math.random();
        packets.push({
          lane: Math.floor(Math.random() * 3),
          progress: 0,
          speed: 0.055 + Math.random() * 0.025,
          state: roll < 0.15 ? "failed" : roll < 0.3 ? "waiting" : roll < 0.52 ? "approved" : "moving",
          holdUntil: 0,
        });
        nextPacketAt = elapsed + 1200 + Math.random() * 1200;
      }

      packets.forEach((packet) => {
        if (packet.state === "waiting" && packet.progress > 0.46 && packet.holdUntil === 0) {
          packet.holdUntil = elapsed + 2600;
        }
        const waiting = packet.holdUntil > elapsed;
        if (!waiting) packet.progress += packet.speed * dt;
        const point = pointOnNetwork(packet.progress, packet.lane);
        const failed = packet.state === "failed" && packet.progress > 0.58;
        const alpha = failed ? 0.45 : 0.62;
        context.save();
        context.translate(point.x, point.y);
        context.strokeStyle = failed ? "rgba(255,72,82,.62)" : rgba(alpha);
        context.fillStyle = failed ? "rgba(255,72,82,.12)" : rgba(0.1);
        context.shadowColor = failed ? "rgba(255,72,82,.85)" : rgba(0.65);
        context.shadowBlur = 9;
        context.fillRect(-11, -7, 22, 14);
        context.strokeRect(-11, -7, 22, 14);
        context.shadowBlur = 0;
        if (waiting) {
          context.fillStyle = rgba(0.7);
          context.font = "9px ui-monospace, monospace";
          context.fillText("WAIT", -13, -13);
        }
        if (packet.state === "approved" && packet.progress > 0.88) drawPing(point.x, point.y, elapsed, 1300);
        context.restore();
      });
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        if (packets[i].progress > 1.04 || (packets[i].state === "failed" && packets[i].progress > 0.7)) packets.splice(i, 1);
      }
    };

    const conveyorPoint = (progress: number, lane: number) => {
      const startX = width * 0.05;
      const endX = width * 0.94;
      const x = startX + (endX - startX) * progress;
      const base = height * (0.45 + lane * 0.15);
      const rise = progress > 0.42 && progress < 0.66 ? -Math.sin(((progress - 0.42) / 0.24) * Math.PI) * height * 0.08 : 0;
      return { x, y: base + rise };
    };

    const drawConveyor = (time: number, dt: number) => {
      drawGrid(34, 0.019);
      context.save();
      for (let lane = 0; lane < 2; lane += 1) {
        context.strokeStyle = rgba(0.13);
        context.lineWidth = 2;
        context.beginPath();
        for (let i = 0; i <= 120; i += 1) {
          const p = i / 120;
          const point = conveyorPoint(p, lane);
          if (i === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.stroke();
        context.lineWidth = 1;
        for (let i = 0; i < 22; i += 1) {
          const point = conveyorPoint(i / 21, lane);
          context.beginPath();
          context.arc(point.x, point.y + 9, 3.2, 0, Math.PI * 2);
          context.stroke();
        }
      }
      context.restore();

      if (elapsed >= nextParcelAt) {
        const roll = Math.random();
        parcels.push({
          progress: 0,
          speed: 0.07 + Math.random() * 0.025,
          lane: Math.floor(Math.random() * 2),
          state: roll < 0.16 ? "paused" : roll < 0.28 ? "diverted" : "moving",
          stateUntil: 0,
        });
        nextParcelAt = elapsed + 700 + Math.random() * 900;
      }

      parcels.forEach((parcel) => {
        if (parcel.state === "paused" && parcel.progress > 0.48 && parcel.stateUntil === 0) parcel.stateUntil = elapsed + 2300;
        const paused = parcel.stateUntil > elapsed;
        if (!paused) {
          if (parcel.state === "paused" && parcel.stateUntil > 0) parcel.state = "recovered";
          parcel.progress += parcel.speed * dt;
        }
        const point = conveyorPoint(parcel.progress, parcel.lane);
        const divert = parcel.state === "diverted" && parcel.progress > 0.57;
        const y = point.y + (divert ? clamp((parcel.progress - 0.57) * 170, 0, 46) : 0);
        context.save();
        context.translate(point.x, y - 10);
        context.strokeStyle = divert ? "rgba(255,90,82,.62)" : rgba(parcel.state === "recovered" ? 0.8 : 0.58);
        context.fillStyle = divert ? "rgba(255,90,82,.12)" : rgba(0.095);
        context.shadowColor = divert ? "rgba(255,90,82,.8)" : rgba(0.52);
        context.shadowBlur = divert || parcel.state === "recovered" ? 10 : 4;
        context.fillRect(-11, -8, 22, 16);
        context.strokeRect(-11, -8, 22, 16);
        context.restore();
        if (paused) drawPing(point.x, point.y - 10, elapsed, 1450);
      });
      for (let i = parcels.length - 1; i >= 0; i -= 1) {
        if (parcels[i].progress > 1.06) parcels.splice(i, 1);
      }
    };

    const drawMemory = (time: number) => {
      drawGrid(36, 0.014);
      const scan = sweepX(time, 0.053, false);
      drawVerticalSweep(scan, false, 0.62);
      const notes = [
        { x: width * 0.17, y: height * 0.31, text: "listen before explaining" },
        { x: width * 0.44, y: height * 0.58, text: "the bracket moved in heat" },
        { x: width * 0.71, y: height * 0.39, text: "preserve the original why" },
      ];
      notes.forEach((note, index) => {
        const reveal = clamp(1 - Math.abs(note.x - scan) / 160, 0.05, 1);
        context.save();
        context.translate(note.x, note.y);
        context.rotate((index - 1) * 0.045);
        context.fillStyle = rgba(0.02 + reveal * 0.08);
        context.strokeStyle = rgba(0.05 + reveal * 0.3);
        context.strokeRect(-115, -45, 230, 90);
        context.font = `${13 + reveal * 2}px Georgia, serif`;
        context.fillStyle = rgba(0.08 + reveal * 0.62);
        context.fillText(note.text, -96, 3);
        context.restore();
        if (reveal > 0.62) {
          const nodes = 5;
          for (let i = 0; i < nodes; i += 1) {
            const nx = note.x + 128 + i * 20;
            const ny = note.y - 28 + Math.sin(i * 1.4 + index) * 25;
            context.strokeStyle = rgba(reveal * 0.28);
            if (i > 0) {
              context.beginPath();
              context.moveTo(nx - 20, note.y - 28 + Math.sin((i - 1) * 1.4 + index) * 25);
              context.lineTo(nx, ny);
              context.stroke();
            }
            context.fillStyle = rgba(reveal * 0.5);
            context.beginPath();
            context.arc(nx, ny, 2.3, 0, Math.PI * 2);
            context.fill();
          }
        }
      });

      context.save();
      const toolX = width * 0.55;
      const toolY = height * 0.76;
      const reveal = clamp(1 - Math.abs(toolX - scan) / 180, 0.05, 1);
      context.strokeStyle = rgba(0.05 + reveal * 0.47);
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(toolX - 80, toolY + 35);
      context.lineTo(toolX + 40, toolY - 25);
      context.arc(toolX + 55, toolY - 35, 22, 0.7, 5.5);
      context.stroke();
      context.restore();
    };

    const drawOrbit = (time: number) => {
      drawGrid(34, 0.018);
      const cx = width * 0.5;
      const cy = height * 0.53;
      const radiusBase = Math.min(width, height) * 0.25;
      context.save();
      for (let ring = 1; ring <= 3; ring += 1) {
        context.strokeStyle = rgba(0.045 + ring * 0.018);
        context.beginPath();
        context.arc(cx, cy, radiusBase * (0.5 + ring * 0.28), 0, Math.PI * 2);
        context.stroke();
      }
      context.fillStyle = rgba(0.16);
      context.strokeStyle = rgba(0.65);
      context.shadowColor = rgba(0.7);
      context.shadowBlur = 15;
      context.beginPath();
      context.arc(cx, cy, 29, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.shadowBlur = 0;
      context.fillStyle = rgba(0.78);
      context.font = "10px ui-monospace, monospace";
      context.textAlign = "center";
      context.fillText("HUMAN", cx, cy + 4);

      const nodeCount = 9;
      for (let i = 0; i < nodeCount; i += 1) {
        const ring = i % 3;
        const radius = radiusBase * (0.58 + ring * 0.23);
        const angle = time * (0.00012 + ring * 0.000035) * (i % 2 ? -1 : 1) + (i / nodeCount) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.72;
        context.strokeStyle = rgba(0.16);
        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(x, y);
        context.stroke();
        context.fillStyle = rgba(0.45);
        context.beginPath();
        context.arc(x, y, 4 + ring, 0, Math.PI * 2);
        context.fill();
      }

      const escalationPhase = (time % 9200) / 9200;
      if (escalationPhase > 0.62) {
        const local = (escalationPhase - 0.62) / 0.38;
        const angle = time * 0.00015 + 2.1;
        const sx = cx + Math.cos(angle) * radiusBase * 0.86;
        const sy = cy + Math.sin(angle) * radiusBase * 0.62;
        const x = sx + (cx - sx) * local;
        const y = sy + (cy - sy) * local;
        context.strokeStyle = rgba(0.52);
        context.setLineDash([4, 6]);
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(cx, cy);
        context.stroke();
        context.setLineDash([]);
        drawPing(x, y, time, 1100);
      }
      context.restore();
    };

    const drawAudio = (time: number, dt: number) => {
      drawGrid(30, 0.018);
      const gateX = width * 0.72;
      context.save();
      context.strokeStyle = rgba(0.28);
      context.setLineDash([6, 7]);
      context.beginPath();
      context.moveTo(gateX, height * 0.18);
      context.lineTo(gateX, height * 0.82);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = rgba(0.58);
      context.font = "10px ui-monospace, monospace";
      context.fillText("APPROVAL GATE", gateX - 39, height * 0.16);
      context.restore();

      const phase = (time % 11000) / 11000;
      particles.forEach((particle, index) => {
        const targetX = phase < 0.58 ? width * (0.24 + (index % 3) * 0.14) : width * 0.82;
        const targetY = height * 0.52 + Math.sin(index * 0.42 + time * 0.003) * (phase < 0.58 ? 60 : 32);
        const attraction = phase < 0.16 ? 0.0008 : phase < 0.58 ? 0.0019 : 0.0032;
        particle.vx += (targetX - particle.x) * attraction * dt;
        particle.vy += (targetY - particle.y) * attraction * dt;
        particle.vx *= 0.965;
        particle.vy *= 0.965;
        particle.x += particle.vx * dt * 58;
        particle.y += particle.vy * dt * 58;
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
        context.fillStyle = rgba(phase > 0.58 && particle.x > gateX ? 0.62 : 0.24);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      if (phase > 0.58) {
        context.save();
        context.strokeStyle = rgba(0.56);
        context.shadowColor = rgba(0.66);
        context.shadowBlur = 9;
        context.beginPath();
        for (let x = gateX; x <= width; x += 3) {
          const normalized = (x - gateX) / Math.max(1, width - gateX);
          const y = height * 0.52 + Math.sin(normalized * Math.PI * 9 + time * 0.005) * 26 * Math.sin(normalized * Math.PI);
          if (x === gateX) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
        context.restore();
        drawPing(gateX, height * 0.52, time, 1600);
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

      switch (mode) {
        case "sonar":
          drawSonar(time, dt);
          break;
        case "fault":
          drawFault(time);
          break;
        case "receipts":
          drawReceipts(time, dt);
          break;
        case "conveyor":
          drawConveyor(time, dt);
          break;
        case "memory":
          drawMemory(time);
          break;
        case "orbit":
          drawOrbit(time);
          break;
        case "audio":
          drawAudio(time, dt);
          break;
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
  }, [mode, accentRgb]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.92,
        mixBlendMode: "screen",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 94%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 94%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(to bottom, rgba(${accentRgb},0.015) 0, rgba(${accentRgb},0.015) 1px, transparent 1px, transparent 4px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 170px rgba(0,0,0,0.95)",
        }}
      />
    </div>
  );
}
