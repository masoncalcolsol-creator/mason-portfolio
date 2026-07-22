"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  accentRgb: string;
};

type Point = {
  x: number;
  y: number;
};

type GravityVector = {
  x: number;
  y: number;
};

type Rgb = [number, number, number];

type RainStream = {
  x: number;
  y: number;
  speed: number;
  length: number;
  phase: number;
};

type MatrixParticle = {
  x: number;
  y: number;
  speed: number;
  drift: number;
  phase: number;
  glyph: string;
  size: number;
};

type ImpactRipple = {
  x: number;
  y: number;
  age: number;
  life: number;
  strength: number;
};

type MotionState = "idle" | "enabled" | "denied" | "unsupported";
type LockState = "idle" | "locked" | "failed" | "unsupported";

type PaletteStop = {
  position: number;
  rgb: Rgb;
  name: string;
};

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|:+-=アイウエオカキクケコサシスセソタチツテト";
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const EPSILON = 0.0001;
const DEFAULT_COLOR_POSITION = 100;

const paletteStops: PaletteStop[] = [
  { position: 0, rgb: [245, 245, 245], name: "WHITE" },
  { position: 100, rgb: [255, 48, 72], name: "RED" },
  { position: 205, rgb: [255, 126, 25], name: "ORANGE" },
  { position: 310, rgb: [255, 220, 45], name: "YELLOW" },
  { position: 420, rgb: [48, 220, 100], name: "GREEN" },
  { position: 535, rgb: [25, 225, 235], name: "CYAN" },
  { position: 645, rgb: [48, 105, 255], name: "BLUE" },
  { position: 755, rgb: [167, 70, 255], name: "PURPLE" },
  { position: 845, rgb: [255, 55, 190], name: "MAGENTA" },
  { position: 925, rgb: [124, 76, 42], name: "BROWN" },
  { position: 1000, rgb: [10, 10, 13], name: "BLACK" },
];

const paletteGradient =
  "linear-gradient(90deg,#f5f5f5 0%,#ff3048 10%,#ff7e19 20.5%,#ffdc2d 31%,#30dc64 42%,#19e1eb 53.5%,#3069ff 64.5%,#a746ff 75.5%,#ff37be 84.5%,#7c4c2a 92.5%,#0a0a0d 100%)";

const parseRgb = (value: string): Rgb => {
  const parts = value.split(",").map((part) => Number(part.trim()));
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return [255, 48, 72];
  return [clamp(parts[0], 0, 255), clamp(parts[1], 0, 255), clamp(parts[2], 0, 255)];
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => [
  Math.round(from[0] + (to[0] - from[0]) * amount),
  Math.round(from[1] + (to[1] - from[1]) * amount),
  Math.round(from[2] + (to[2] - from[2]) * amount),
];

const rgbAtPosition = (position: number): Rgb => {
  const bounded = clamp(position, 0, 1000);
  for (let index = 0; index < paletteStops.length - 1; index += 1) {
    const start = paletteStops[index];
    const end = paletteStops[index + 1];
    if (bounded <= end.position) {
      const span = Math.max(1, end.position - start.position);
      return mixRgb(start.rgb, end.rgb, (bounded - start.position) / span);
    }
  }
  return paletteStops[paletteStops.length - 1].rgb;
};

const paletteNameAtPosition = (position: number) => {
  let closest = paletteStops[0];
  paletteStops.forEach((stop) => {
    if (Math.abs(stop.position - position) < Math.abs(closest.position - position)) closest = stop;
  });
  return closest.name;
};

const rgba = (rgb: Rgb, alpha: number) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
const rgbCss = (rgb: Rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

const polygonArea = (polygon: Point[]) => {
  if (polygon.length < 3) return 0;
  let twiceArea = 0;
  for (let index = 0; index < polygon.length; index += 1) {
    const current = polygon[index];
    const next = polygon[(index + 1) % polygon.length];
    twiceArea += current.x * next.y - next.x * current.y;
  }
  return Math.abs(twiceArea) / 2;
};

const normalizeGravity = (x: number, y: number): GravityVector => {
  const magnitude = Math.hypot(x, y);
  if (magnitude < EPSILON) return { x: 0, y: 1 };
  return { x: x / magnitude, y: y / magnitude };
};

const potential = (point: Point, gravity: GravityVector) => point.x * gravity.x + point.y * gravity.y;

const clipPolygonToLiquid = (polygon: Point[], gravity: GravityVector, threshold: number) => {
  const output: Point[] = [];

  for (let index = 0; index < polygon.length; index += 1) {
    const current = polygon[index];
    const next = polygon[(index + 1) % polygon.length];
    const currentPotential = potential(current, gravity);
    const nextPotential = potential(next, gravity);
    const currentInside = currentPotential >= threshold - EPSILON;
    const nextInside = nextPotential >= threshold - EPSILON;

    if (currentInside) output.push(current);

    if (currentInside !== nextInside) {
      const denominator = nextPotential - currentPotential;
      if (Math.abs(denominator) > EPSILON) {
        const ratio = clamp((threshold - currentPotential) / denominator, 0, 1);
        output.push({
          x: current.x + (next.x - current.x) * ratio,
          y: current.y + (next.y - current.y) * ratio,
        });
      }
    }
  }

  return output;
};

const uniquePoints = (points: Point[]) => {
  const result: Point[] = [];
  points.forEach((point) => {
    if (!result.some((existing) => Math.hypot(existing.x - point.x, existing.y - point.y) < 0.75)) {
      result.push(point);
    }
  });
  return result;
};

export default function BleedingMatrix({ accentRgb }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionEnabledRef = useRef(false);
  const touchAngleRef = useRef(0);
  const activeRgbRef = useRef<Rgb>(parseRgb(accentRgb));
  const resetCounterRef = useRef(0);
  const [motionState, setMotionState] = useState<MotionState>("idle");
  const [lockState, setLockState] = useState<LockState>("idle");
  const [touchAngle, setTouchAngle] = useState(0);
  const [colorPosition, setColorPosition] = useState(DEFAULT_COLOR_POSITION);
  const [activeRgb, setActiveRgb] = useState<Rgb>(parseRgb(accentRgb));
  const [fillPercent, setFillPercent] = useState(7);
  const [cycleState, setCycleState] = useState("FILLING");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsMotion = "DeviceOrientationEvent" in window;
    if (!supportsMotion) setMotionState("unsupported");

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrame = 0;
    let lastTime = performance.now();
    let lastUiUpdate = 0;
    let fillLevel = 0.07;
    let emptyHold = 0;
    let previousResetCounter = resetCounterRef.current;
    let visualGravity: GravityVector = { x: 0, y: 1 };
    let gravityVelocity: GravityVector = { x: 0, y: 0 };
    let measuredGravity: GravityVector = { x: 0, y: 1 };
    let gravityReady = false;
    let lastMotionSampleAt = 0;
    let lastGamma = 0;
    let yCalibration = 0;
    let xCalibration = 0;
    let rainStreams: RainStream[] = [];
    let particles: MatrixParticle[] = [];
    let ripples: ImpactRipple[] = [];

    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];
    const currentRgb = () => activeRgbRef.current;
    const color = (alpha: number) => rgba(currentRgb(), alpha);
    const lightColor = (amount: number, alpha: number) => rgba(mixRgb(currentRgb(), [255, 255, 255], amount), alpha);
    const darkColor = (amount: number, alpha: number) => rgba(mixRgb(currentRgb(), [0, 0, 0], amount), alpha);
    const rectangle = () => [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ];

    const rebuildScene = () => {
      const rainFontSize = width < 680 ? 13 : 16;
      const columnWidth = rainFontSize * 1.22;
      const columnCount = Math.ceil(width / columnWidth) + 2;
      rainStreams = Array.from({ length: columnCount }, (_, index) => ({
        x: index * columnWidth,
        y: -Math.random() * height * 1.2,
        speed: 34 + Math.random() * 74,
        length: 8 + Math.floor(Math.random() * 20),
        phase: Math.random() * Math.PI * 2,
      }));

      const particleCount = width < 680 ? 118 : 205;
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 7 + Math.random() * 18,
        drift: -7 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        glyph: randomGlyph(),
        size: width < 680 ? 10 + Math.random() * 4 : 11 + Math.random() * 6,
      }));
      ripples = [];
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
      rebuildScene();
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (!motionEnabledRef.current) return;
      const gamma = typeof event.gamma === "number" ? event.gamma : 0;
      lastGamma = gamma;

      if (performance.now() - lastMotionSampleAt > 500) {
        const radians = (clamp(gamma, -89.8, 89.8) * Math.PI) / 180;
        measuredGravity = normalizeGravity(Math.sin(radians), Math.cos(radians));
      }
    };

    const onDeviceMotion = (event: DeviceMotionEvent) => {
      if (!motionEnabledRef.current) return;
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration || typeof acceleration.x !== "number" || typeof acceleration.y !== "number") return;

      const rawX = acceleration.x;
      const rawY = acceleration.y;
      if (Math.hypot(rawX, rawY) < 1.5) return;

      if (yCalibration === 0 && Math.abs(rawY) > 2) yCalibration = rawY >= 0 ? 1 : -1;
      if (xCalibration === 0 && Math.abs(lastGamma) > 7 && Math.abs(rawX) > 0.6) {
        xCalibration = Math.sign(lastGamma) * Math.sign(rawX) || 1;
      }

      const calibratedY = rawY * (yCalibration || 1);
      const calibratedX =
        xCalibration !== 0
          ? rawX * xCalibration
          : Math.sin((clamp(lastGamma, -89.8, 89.8) * Math.PI) / 180) * Math.hypot(rawX, rawY);

      measuredGravity = normalizeGravity(calibratedX, calibratedY);
      gravityReady = true;
      lastMotionSampleAt = performance.now();
    };

    const drawGrid = () => {
      context.save();
      context.strokeStyle = color(0.03);
      context.lineWidth = 1;
      context.beginPath();
      for (let x = 0; x <= width; x += 34) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += 34) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();
      context.restore();
    };

    const solveThresholdForFill = (gravity: GravityVector, requestedFill: number) => {
      const corners = rectangle();
      const cornerPotentials = corners.map((point) => potential(point, gravity));
      let low = Math.min(...cornerPotentials) - 1;
      let high = Math.max(...cornerPotentials) + 1;
      const targetArea = clamp(requestedFill, 0, 1) * width * height;

      for (let iteration = 0; iteration < 18; iteration += 1) {
        const threshold = (low + high) / 2;
        const liquidArea = polygonArea(clipPolygonToLiquid(corners, gravity, threshold));
        if (liquidArea > targetArea) low = threshold;
        else high = threshold;
      }
      return (low + high) / 2;
    };

    const surfaceIntersections = (gravity: GravityVector, threshold: number) => {
      const corners = rectangle();
      const intersections: Point[] = [];

      for (let index = 0; index < corners.length; index += 1) {
        const current = corners[index];
        const next = corners[(index + 1) % corners.length];
        const currentPotential = potential(current, gravity);
        const nextPotential = potential(next, gravity);
        const denominator = nextPotential - currentPotential;

        if (Math.abs(currentPotential - threshold) < 0.5) intersections.push(current);
        if ((currentPotential - threshold) * (nextPotential - threshold) < 0 && Math.abs(denominator) > EPSILON) {
          const ratio = (threshold - currentPotential) / denominator;
          intersections.push({
            x: current.x + (next.x - current.x) * ratio,
            y: current.y + (next.y - current.y) * ratio,
          });
        }
      }
      return uniquePoints(intersections).slice(0, 2);
    };

    const pointInsideLiquid = (point: Point, gravity: GravityVector, threshold: number) =>
      potential(point, gravity) >= threshold - 0.5;

    const randomPointInsideLiquid = (gravity: GravityVector, threshold: number) => {
      for (let attempt = 0; attempt < 40; attempt += 1) {
        const candidate = { x: Math.random() * width, y: Math.random() * height };
        if (pointInsideLiquid(candidate, gravity, threshold)) return candidate;
      }
      const polygon = clipPolygonToLiquid(rectangle(), gravity, threshold);
      if (polygon.length > 0) return polygon[Math.floor(Math.random() * polygon.length)];
      return { x: width / 2, y: height };
    };

    const addImpact = (point: Point) => {
      if (ripples.length > 24) ripples.shift();
      ripples.push({
        x: point.x,
        y: point.y,
        age: 0,
        life: 0.75 + Math.random() * 0.45,
        strength: 0.5 + Math.random() * 0.55,
      });
    };

    const drawRain = (time: number, dt: number, gravity: GravityVector, threshold: number) => {
      const fontSize = width < 680 ? 13 : 16;
      context.save();
      context.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      rainStreams.forEach((stream) => {
        stream.y += stream.speed * dt;
        const headPoint = { x: stream.x, y: stream.y };

        if (pointInsideLiquid(headPoint, gravity, threshold)) {
          addImpact(headPoint);
          stream.y = -60 - Math.random() * height * 0.65;
          stream.speed = 34 + Math.random() * 74;
          stream.length = 8 + Math.floor(Math.random() * 20);
          stream.phase = Math.random() * Math.PI * 2;
        }

        for (let index = 0; index < stream.length; index += 1) {
          const y = stream.y - index * fontSize * 1.06;
          if (y < -30 || y > height + 30) continue;
          const point = { x: stream.x, y };
          if (pointInsideLiquid(point, gravity, threshold)) continue;

          const head = index === 0;
          const decay = 1 - index / stream.length;
          const flicker = 0.72 + Math.sin(time * 0.003 + stream.phase + index) * 0.24;
          const alpha = head ? 0.86 : Math.max(0.03, decay * decay * 0.34 * flicker);
          context.fillStyle = head ? lightColor(0.68, 0.95) : lightColor(0.2, alpha);
          context.shadowColor = color(head ? 0.88 : 0.3);
          context.shadowBlur = head ? 11 : 2;
          context.fillText(randomGlyph(), stream.x, y);
        }
      });
      context.restore();
    };

    const drawLiquid = (
      time: number,
      dt: number,
      gravity: GravityVector,
      threshold: number,
      liquidPolygon: Point[],
      overflowing: boolean,
    ) => {
      if (liquidPolygon.length < 3) return;

      context.save();
      context.beginPath();
      context.moveTo(liquidPolygon[0].x, liquidPolygon[0].y);
      for (let index = 1; index < liquidPolygon.length; index += 1) context.lineTo(liquidPolygon[index].x, liquidPolygon[index].y);
      context.closePath();

      const liquidGradient = context.createLinearGradient(0, 0, 0, height);
      liquidGradient.addColorStop(0, lightColor(0.27, 0.88));
      liquidGradient.addColorStop(0.16, color(0.93));
      liquidGradient.addColorStop(0.6, darkColor(0.58, 0.96));
      liquidGradient.addColorStop(1, darkColor(0.82, 0.99));
      context.fillStyle = liquidGradient;
      context.shadowColor = color(0.55);
      context.shadowBlur = 28;
      context.fill();
      context.clip();

      const innerGlow = context.createRadialGradient(width * 0.28, height * 0.62, 0, width * 0.28, height * 0.62, Math.max(width, height) * 0.8);
      innerGlow.addColorStop(0, lightColor(0.18, 0.2));
      innerGlow.addColorStop(0.46, color(0.09));
      innerGlow.addColorStop(1, "rgba(0,0,0,.34)");
      context.fillStyle = innerGlow;
      context.fillRect(0, 0, width, height);

      context.textAlign = "center";
      context.textBaseline = "middle";
      particles.forEach((particle, index) => {
        particle.x += (gravity.x * particle.speed + particle.drift * 0.25) * dt * (overflowing ? 1.7 : 1);
        particle.y += gravity.y * particle.speed * dt * (overflowing ? 1.7 : 1);

        if (particle.x < -30 || particle.x > width + 30 || particle.y < -30 || particle.y > height + 30 || !pointInsideLiquid(particle, gravity, threshold)) {
          const replacement = randomPointInsideLiquid(gravity, threshold);
          particle.x = replacement.x;
          particle.y = replacement.y;
          particle.glyph = randomGlyph();
        }

        const normalizedPotential = clamp((potential(particle, gravity) - threshold) / Math.max(1, Math.hypot(width, height)), 0, 1);
        const shimmer = 0.55 + Math.sin(time * 0.002 + particle.phase) * 0.38;
        const alpha = 0.16 + normalizedPotential * 0.52 * shimmer;
        context.font = `800 ${particle.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillStyle = index % 13 === 0 ? lightColor(0.72, 0.78) : lightColor(0.14, alpha);
        context.shadowColor = color(alpha * 1.55);
        context.shadowBlur = index % 13 === 0 ? 9 : 2;
        context.fillText(particle.glyph, particle.x, particle.y);
      });
      context.restore();

      const intersections = surfaceIntersections(gravity, threshold);
      if (intersections.length === 2) {
        context.save();
        context.strokeStyle = lightColor(0.72, 0.9);
        context.lineWidth = 1.6;
        context.shadowColor = color(0.88);
        context.shadowBlur = 15;
        context.beginPath();
        context.moveTo(intersections[0].x, intersections[0].y);
        context.lineTo(intersections[1].x, intersections[1].y);
        context.stroke();
        context.restore();
      }

      context.save();
      ripples.forEach((ripple) => {
        ripple.age += dt;
        const progress = clamp(ripple.age / ripple.life, 0, 1);
        context.globalAlpha = (1 - progress) * 0.66 * ripple.strength;
        context.strokeStyle = lightColor(0.82, 0.92);
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, 4 + progress * 22 * ripple.strength, 1.3 + progress * 3.2, 0, 0, Math.PI * 2);
        context.stroke();
      });
      ripples = ripples.filter((ripple) => ripple.age < ripple.life);
      context.restore();
    };

    const drawCornerOverflow = (gravity: GravityVector, overflowDepth: number, spillCorner: Point, overflowing: boolean) => {
      if (!overflowing || overflowDepth <= 0) return;

      const direction = normalizeGravity(gravity.x, gravity.y);
      const streamLength = Math.min(Math.hypot(width, height) * 0.34, 90 + overflowDepth * 1.45);
      const streamWidth = 11 + clamp(overflowDepth / 18, 0, 24);
      const endX = spillCorner.x + direction.x * streamLength;
      const endY = spillCorner.y + direction.y * streamLength;
      const gradient = context.createLinearGradient(spillCorner.x, spillCorner.y, endX, endY);
      gradient.addColorStop(0, lightColor(0.24, 0.98));
      gradient.addColorStop(0.45, color(0.91));
      gradient.addColorStop(1, darkColor(0.68, 0));

      const perpendicular = { x: -direction.y, y: direction.x };
      context.save();
      context.fillStyle = gradient;
      context.shadowColor = color(0.82);
      context.shadowBlur = 20;
      context.beginPath();
      context.moveTo(spillCorner.x + perpendicular.x * streamWidth * 0.44, spillCorner.y + perpendicular.y * streamWidth * 0.44);
      context.bezierCurveTo(
        spillCorner.x + direction.x * streamLength * 0.3 + perpendicular.x * streamWidth * 0.34,
        spillCorner.y + direction.y * streamLength * 0.3 + perpendicular.y * streamWidth * 0.34,
        spillCorner.x + direction.x * streamLength * 0.72 - perpendicular.x * streamWidth * 0.18,
        spillCorner.y + direction.y * streamLength * 0.72 - perpendicular.y * streamWidth * 0.18,
        endX,
        endY,
      );
      context.bezierCurveTo(
        spillCorner.x + direction.x * streamLength * 0.72 - perpendicular.x * streamWidth * 0.5,
        spillCorner.y + direction.y * streamLength * 0.72 - perpendicular.y * streamWidth * 0.5,
        spillCorner.x + direction.x * streamLength * 0.24 - perpendicular.x * streamWidth * 0.42,
        spillCorner.y + direction.y * streamLength * 0.24 - perpendicular.y * streamWidth * 0.42,
        spillCorner.x - perpendicular.x * streamWidth * 0.32,
        spillCorner.y - perpendicular.y * streamWidth * 0.32,
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    const render = (time: number) => {
      if (!reducedMotion && time - lastFrame < 1000 / 30) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      lastFrame = time;
      const dt = reducedMotion ? 0 : Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;

      if (resetCounterRef.current !== previousResetCounter) {
        previousResetCounter = resetCounterRef.current;
        fillLevel = 0.04;
        emptyHold = 0;
        visualGravity = { x: 0, y: 1 };
        gravityVelocity = { x: 0, y: 0 };
        measuredGravity = { x: 0, y: 1 };
        gravityReady = false;
        lastMotionSampleAt = 0;
        lastGamma = 0;
        yCalibration = 0;
        xCalibration = 0;
        rebuildScene();
      }

      let targetGravity: GravityVector;
      if (motionEnabledRef.current) targetGravity = measuredGravity;
      else {
        const radians = (touchAngleRef.current * Math.PI) / 180;
        targetGravity = normalizeGravity(Math.sin(radians), Math.cos(radians));
      }

      const spring = gravityReady ? 18 : 14;
      const damping = 8.6;
      gravityVelocity.x += (targetGravity.x - visualGravity.x) * spring * dt;
      gravityVelocity.y += (targetGravity.y - visualGravity.y) * spring * dt;
      gravityVelocity.x *= Math.exp(-damping * dt);
      gravityVelocity.y *= Math.exp(-damping * dt);
      visualGravity = normalizeGravity(visualGravity.x + gravityVelocity.x * dt * 7, visualGravity.y + gravityVelocity.y * dt * 7);

      if (reducedMotion) fillLevel = 0.62;
      else if (fillLevel <= 0.002) {
        emptyHold += dt;
        if (emptyHold > 1.1) fillLevel = 0.012;
      } else {
        emptyHold = 0;
        fillLevel = Math.min(0.94, fillLevel + dt * 0.0125);
      }

      let threshold = solveThresholdForFill(visualGravity, fillLevel);
      const topLeft = { x: 0, y: 0 };
      const topRight = { x: width, y: 0 };
      const leftOpeningPotential = potential(topLeft, visualGravity);
      const rightOpeningPotential = potential(topRight, visualGravity);
      const spillCorner = rightOpeningPotential >= leftOpeningPotential ? topRight : topLeft;
      const openingLowPointPotential = Math.max(leftOpeningPotential, rightOpeningPotential);
      let overflowDepth = Math.max(0, openingLowPointPotential - threshold);
      let overflowing = motionEnabledRef.current && overflowDepth > 1.2;

      if (overflowing && !reducedMotion) {
        const overflowStrength = clamp(overflowDepth / Math.max(70, Math.hypot(width, height) * 0.14), 0, 1);
        fillLevel = Math.max(0, fillLevel - dt * (0.04 + overflowStrength * 0.46));
        threshold = solveThresholdForFill(visualGravity, fillLevel);
        overflowDepth = Math.max(0, openingLowPointPotential - threshold);
        overflowing = overflowDepth > 1.2;
      }

      const liquidPolygon = clipPolygonToLiquid(rectangle(), visualGravity, threshold);
      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRain(time, dt, visualGravity, threshold);
      drawLiquid(time, dt, visualGravity, threshold, liquidPolygon, overflowing);
      drawCornerOverflow(visualGravity, overflowDepth, spillCorner, overflowing);

      if (time - lastUiUpdate > 220) {
        lastUiUpdate = time;
        setFillPercent(Math.round(fillLevel * 100));
        setCycleState(overflowing ? "OVERFLOWING" : fillLevel < 0.02 ? "EMPTY" : fillLevel >= 0.935 ? "FULL" : "FILLING");
      }

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("deviceorientation", onOrientation, true);
    window.addEventListener("devicemotion", onDeviceMotion, true);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("deviceorientation", onOrientation, true);
      window.removeEventListener("devicemotion", onDeviceMotion, true);
    };
  }, [accentRgb]);

  const enableMotion = async () => {
    if (!("DeviceOrientationEvent" in window)) {
      setMotionState("unsupported");
      return;
    }

    try {
      const orientationConstructor = DeviceOrientationEvent as typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> };
      const motionConstructor = DeviceMotionEvent as typeof DeviceMotionEvent & { requestPermission?: () => Promise<"granted" | "denied"> };

      if (typeof orientationConstructor.requestPermission === "function") {
        const permission = await orientationConstructor.requestPermission();
        if (permission !== "granted") {
          setMotionState("denied");
          return;
        }
      }

      if (typeof motionConstructor.requestPermission === "function") {
        const permission = await motionConstructor.requestPermission();
        if (permission !== "granted") {
          setMotionState("denied");
          return;
        }
      }

      motionEnabledRef.current = true;
      setMotionState("enabled");

      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
        const orientation = screen.orientation as ScreenOrientation & { lock?: (orientation: "portrait-primary") => Promise<void> };
        if (typeof orientation.lock === "function") {
          await orientation.lock("portrait-primary");
          setLockState("locked");
        } else setLockState("unsupported");
      } catch {
        setLockState("failed");
      }
    } catch {
      setMotionState("denied");
    }
  };

  const updateTouchAngle = (value: number) => {
    touchAngleRef.current = value;
    setTouchAngle(value);
  };

  const updateColor = (value: number) => {
    const nextRgb = rgbAtPosition(value);
    activeRgbRef.current = nextRgb;
    setActiveRgb(nextRgb);
    setColorPosition(value);
  };

  const resetCycle = () => {
    motionEnabledRef.current = false;
    touchAngleRef.current = 0;
    const defaultRgb = rgbAtPosition(DEFAULT_COLOR_POSITION);
    activeRgbRef.current = defaultRgb;
    setTouchAngle(0);
    setColorPosition(DEFAULT_COLOR_POSITION);
    setActiveRgb(defaultRgb);
    setMotionState("idle");
    setFillPercent(4);
    setCycleState("FILLING");
    resetCounterRef.current += 1;
  };

  const statusText = motionState === "enabled"
    ? lockState === "locked" ? "WORLD-LEVEL SURFACE // TOP EDGE IS THE ONLY OPENING" : "TILT ACTIVE // KEEP AUTO-ROTATE OFF"
    : "SLOSH SLIDER ACTIVE // ENABLE TILT FOR TRUE OVERFLOW";

  const accentCss = rgbCss(activeRgb);

  return (
    <>
      <style>{`
        .bleeding-range { width: 100%; height: 18px; margin: 0; background: transparent; accent-color: ${accentCss}; }
        .bleeding-color-range { appearance: none; -webkit-appearance: none; width: 100%; height: 9px; margin: 3px 0 4px; border: 1px solid rgba(255,255,255,.22); border-radius: 999px; background: ${paletteGradient}; box-shadow: inset 0 0 8px rgba(0,0,0,.45); }
        .bleeding-color-range::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 20px; height: 20px; border: 2px solid #fff; border-radius: 50%; background: ${accentCss}; box-shadow: 0 2px 12px rgba(0,0,0,.7); }
        .bleeding-color-range::-moz-range-thumb { width: 18px; height: 18px; border: 2px solid #fff; border-radius: 50%; background: ${accentCss}; box-shadow: 0 2px 12px rgba(0,0,0,.7); }
      `}</style>

      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.98, WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 97%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 0%, black 97%, transparent 100%)" }}>
        <canvas ref={canvasRef} style={{ display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(to bottom, ${rgba(activeRgb, 0.02)} 0, ${rgba(activeRgb, 0.02)} 1px, transparent 1px, transparent 4px)` }} />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px rgba(0,0,0,0.94)" }} />
      </div>

      <aside aria-label="Bleeding Matrix mobile controls" style={{ position: "fixed", left: "max(10px, env(safe-area-inset-left))", right: "max(10px, env(safe-area-inset-right))", bottom: "max(10px, env(safe-area-inset-bottom))", zIndex: 140, display: "grid", gap: 7, maxWidth: 560, margin: "0 auto", padding: 10, border: `1px solid ${rgba(activeRgb, 0.42)}`, borderRadius: 20, background: "rgba(7,2,4,.8)", boxShadow: `0 18px 60px rgba(0,0,0,.55), 0 0 28px ${rgba(activeRgb, 0.1)}`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", touchAction: "pan-y" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ color: accentCss, font: "900 10px ui-monospace, monospace", letterSpacing: ".14em" }}>BLEEDING MATRIX // LIVE</div>
            <div style={{ color: "#fff4f5", font: "900 14px ui-monospace, monospace" }}>{cycleState} // {fillPercent}%</div>
          </div>
          <div style={{ color: "#bcaeb1", fontSize: 9, lineHeight: 1.35, textAlign: "right", maxWidth: 190 }}>{statusText}</div>
        </div>

        <div style={{ display: "grid", gap: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#ab9da1", font: "800 9px ui-monospace, monospace" }}><span>SLOSH</span><span>{touchAngle > 0 ? "+" : ""}{touchAngle}°</span></div>
          <input className="bleeding-range" aria-label="Manual liquid slosh" type="range" min="-42" max="42" value={touchAngle} onChange={(event) => updateTouchAngle(Number(event.currentTarget.value))} />
        </div>

        <div style={{ display: "grid", gap: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#ab9da1", font: "800 9px ui-monospace, monospace" }}>
            <span>SIGNAL COLOR</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><i aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: accentCss, border: "1px solid rgba(255,255,255,.55)" }} />{paletteNameAtPosition(colorPosition)}</span>
          </div>
          <input className="bleeding-color-range" aria-label="Matrix and liquid color" type="range" min="0" max="1000" value={colorPosition} onChange={(event) => updateColor(Number(event.currentTarget.value))} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          <button type="button" onClick={enableMotion} style={controlButtonStyle(activeRgb, motionState === "enabled")}>{motionState === "enabled" ? "TILT + LOCK ON" : motionState === "denied" ? "TILT BLOCKED" : "ENABLE TILT + LOCK"}</button>
          <button type="button" onClick={resetCycle} style={controlButtonStyle(activeRgb, false)}>RESET SCENE</button>
        </div>
      </aside>
    </>
  );
}

function controlButtonStyle(accentRgb: Rgb, active: boolean) {
  return {
    minHeight: 44,
    border: `1px solid ${rgba(accentRgb, active ? 0.76 : 0.36)}`,
    borderRadius: 12,
    color: active ? "#080104" : "#f4e9eb",
    background: active ? rgbCss(mixRgb(accentRgb, [255, 255, 255], 0.08)) : "rgba(255,255,255,.035)",
    font: "900 10px ui-monospace, monospace",
    letterSpacing: ".04em",
    touchAction: "manipulation" as const,
  };
}
