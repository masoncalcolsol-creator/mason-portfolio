"use client";

import { useEffect, useRef, useState } from "react";

type Props = { accentRgb: string };

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
  age: number;
  life: number;
  strength: number;
};

type MotionState = "idle" | "enabled" | "denied" | "unsupported";
type LockState = "idle" | "locked" | "failed" | "unsupported";

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|:+-=アイウエオカキクケコサシスセソタチツテト";
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function BleedingMatrix({ accentRgb }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionEnabledRef = useRef(false);
  const deviceTiltRef = useRef(0);
  const touchTiltRef = useRef(0);
  const resetCounterRef = useRef(0);
  const [motionState, setMotionState] = useState<MotionState>("idle");
  const [lockState, setLockState] = useState<LockState>("idle");
  const [fillPercent, setFillPercent] = useState(7);
  const [cycleState, setCycleState] = useState("FILLING");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("DeviceOrientationEvent" in window)) setMotionState("unsupported");

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrame = 0;
    let lastTime = performance.now();
    let lastUiUpdate = 0;
    let fillLevel = 0.07;
    let emptyHold = 0;
    let tilt = 0;
    let tiltVelocity = 0;
    let waveEnergy = 0.18;
    let previousTargetTilt = 0;
    let previousResetCounter = resetCounterRef.current;
    let rainStreams: RainStream[] = [];
    let particles: MatrixParticle[] = [];
    let ripples: ImpactRipple[] = [];

    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];
    const rgba = (alpha: number) => `rgba(${accentRgb}, ${alpha})`;

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
      const beta = typeof event.beta === "number" ? event.beta : 0;
      const orientationAngle = screen.orientation?.angle ?? 0;
      let sideTilt = gamma;
      if (orientationAngle === 90) sideTilt = -beta;
      if (orientationAngle === 270 || orientationAngle === -90) sideTilt = beta;
      deviceTiltRef.current = clamp(sideTilt, -88, 88);
    };

    const drawGrid = () => {
      context.save();
      context.strokeStyle = rgba(0.025);
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

    const slopeForTilt = () => {
      const radians = (clamp(tilt, -88, 88) * Math.PI) / 180;
      return clamp(-Math.tan(radians) * 0.92, -28, 28);
    };

    const waveOffset = (x: number, time: number) => {
      const primary = Math.sin(x * 0.018 + time * 0.0024) * (3.5 + waveEnergy * 10);
      const secondary = Math.sin(x * 0.041 - time * 0.0031) * (1.7 + waveEnergy * 5);
      return primary + secondary;
    };

    const surfaceAt = (x: number, time: number, base: number) =>
      base + (x - width / 2) * slopeForTilt() + waveOffset(x, time);

    const solveSurfaceBase = (time: number) => {
      const targetAverageDepth = fillLevel * height;
      let low = -height * 16;
      let high = height * 16;
      const samples = 64;

      for (let iteration = 0; iteration < 16; iteration += 1) {
        const candidate = (low + high) / 2;
        let depthSum = 0;
        for (let sample = 0; sample < samples; sample += 1) {
          const x = ((sample + 0.5) / samples) * width;
          depthSum += clamp(height - surfaceAt(x, time, candidate), 0, height);
        }
        const averageDepth = depthSum / samples;
        if (averageDepth > targetAverageDepth) low = candidate;
        else high = candidate;
      }
      return (low + high) / 2;
    };

    const buildLiquidPath = (time: number, base: number) => {
      const step = Math.max(8, Math.floor(width / 54));
      context.beginPath();
      context.moveTo(0, surfaceAt(0, time, base));
      for (let x = step; x < width; x += step) context.lineTo(x, surfaceAt(x, time, base));
      context.lineTo(width, surfaceAt(width, time, base));
      context.lineTo(width, height + 40);
      context.lineTo(0, height + 40);
      context.closePath();
    };

    const addImpact = (x: number) => {
      if (ripples.length > 24) ripples.shift();
      ripples.push({ x, age: 0, life: 0.75 + Math.random() * 0.45, strength: 0.5 + Math.random() * 0.55 });
      waveEnergy = clamp(waveEnergy + 0.045, 0.08, 1.35);
    };

    const drawRain = (time: number, dt: number, base: number) => {
      const fontSize = width < 680 ? 13 : 16;
      context.save();
      context.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      rainStreams.forEach((stream) => {
        stream.y += stream.speed * dt;
        const liquidSurface = surfaceAt(stream.x, time, base);
        if (stream.y >= liquidSurface) {
          addImpact(stream.x);
          stream.y = -60 - Math.random() * height * 0.65;
          stream.speed = 34 + Math.random() * 74;
          stream.length = 8 + Math.floor(Math.random() * 20);
          stream.phase = Math.random() * Math.PI * 2;
        }

        for (let index = 0; index < stream.length; index += 1) {
          const y = stream.y - index * fontSize * 1.06;
          if (y < -30 || y >= liquidSurface + 2) continue;
          const head = index === 0;
          const decay = 1 - index / stream.length;
          const flicker = 0.72 + Math.sin(time * 0.003 + stream.phase + index) * 0.24;
          const alpha = head ? 0.78 : Math.max(0.025, decay * decay * 0.3 * flicker);
          context.fillStyle = head ? "rgba(255,205,210,.9)" : rgba(alpha);
          context.shadowColor = rgba(head ? 0.78 : 0.24);
          context.shadowBlur = head ? 10 : 2;
          context.fillText(randomGlyph(), stream.x, y);
        }
      });
      context.restore();
    };

    const drawLiquid = (time: number, dt: number, pouring: boolean, base: number) => {
      context.save();
      buildLiquidPath(time, base);
      const topReference = clamp(base - 90, 0, height);
      const gradient = context.createLinearGradient(0, topReference, 0, height);
      gradient.addColorStop(0, "rgba(255,64,82,.84)");
      gradient.addColorStop(0.13, "rgba(171,7,29,.92)");
      gradient.addColorStop(0.58, "rgba(77,0,14,.95)");
      gradient.addColorStop(1, "rgba(30,0,8,.99)");
      context.fillStyle = gradient;
      context.shadowColor = rgba(0.5);
      context.shadowBlur = 28;
      context.fill();
      context.clip();

      const glow = context.createRadialGradient(width * 0.28, height * 0.62, 0, width * 0.28, height * 0.62, Math.max(width, height) * 0.8);
      glow.addColorStop(0, "rgba(255,49,73,.18)");
      glow.addColorStop(0.46, "rgba(92,0,18,.08)");
      glow.addColorStop(1, "rgba(0,0,0,.3)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.textAlign = "center";
      context.textBaseline = "middle";
      particles.forEach((particle, index) => {
        particle.y += particle.speed * dt * (pouring ? 1.55 : 1);
        particle.x += (particle.drift + tilt * 0.12) * dt;
        const localSurface = surfaceAt(particle.x, time, base);
        if (particle.y > height + 28 || particle.y < localSurface - 18) {
          particle.x = Math.random() * width;
          particle.y = surfaceAt(particle.x, time, base) + 12 + Math.random() * 78;
          particle.glyph = randomGlyph();
        }
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;

        const shimmer = 0.55 + Math.sin(time * 0.002 + particle.phase) * 0.38;
        const depth = clamp((particle.y - localSurface) / Math.max(1, height - localSurface), 0, 1);
        const alpha = 0.14 + depth * 0.42 * shimmer;
        context.font = `800 ${particle.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillStyle = index % 13 === 0 ? "rgba(255,210,214,.72)" : rgba(alpha);
        context.shadowColor = rgba(alpha * 1.5);
        context.shadowBlur = index % 13 === 0 ? 9 : 2;
        context.fillText(particle.glyph, particle.x, particle.y);
      });
      context.restore();

      context.save();
      context.strokeStyle = "rgba(255,183,190,.82)";
      context.lineWidth = 1.5;
      context.shadowColor = rgba(0.82);
      context.shadowBlur = 15;
      context.beginPath();
      const step = Math.max(8, Math.floor(width / 54));
      context.moveTo(0, surfaceAt(0, time, base));
      for (let x = step; x <= width; x += step) context.lineTo(x, surfaceAt(x, time, base));
      context.stroke();

      ripples.forEach((ripple) => {
        ripple.age += dt;
        const progress = clamp(ripple.age / ripple.life, 0, 1);
        const y = surfaceAt(ripple.x, time, base);
        context.globalAlpha = (1 - progress) * 0.68 * ripple.strength;
        context.strokeStyle = "rgba(255,220,223,.88)";
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(ripple.x, y, 4 + progress * 24 * ripple.strength, 1.3 + progress * 3.5, 0, 0, Math.PI * 2);
        context.stroke();
      });
      ripples = ripples.filter((ripple) => ripple.age < ripple.life);
      context.restore();
    };

    const drawTopCornerOverflow = (spillX: number, overflowDepth: number, pouring: boolean) => {
      if (!pouring) return;
      const right = spillX === width;
      const inward = right ? -1 : 1;
      const visibleLength = clamp(24 + overflowDepth * 0.16, 24, 82);
      const thickness = clamp(9 + overflowDepth * 0.08, 9, 28);

      context.save();
      const gradient = context.createLinearGradient(spillX, 0, spillX + inward * visibleLength, thickness);
      gradient.addColorStop(0, "rgba(255,85,100,.98)");
      gradient.addColorStop(0.35, "rgba(173,7,31,.94)");
      gradient.addColorStop(1, "rgba(76,0,12,0)");
      context.fillStyle = gradient;
      context.shadowColor = rgba(0.88);
      context.shadowBlur = 20;
      context.beginPath();
      context.moveTo(spillX, 0);
      context.lineTo(spillX + inward * visibleLength, 0);
      context.bezierCurveTo(
        spillX + inward * visibleLength * 0.76,
        thickness * 0.25,
        spillX + inward * visibleLength * 0.34,
        thickness * 1.05,
        spillX,
        thickness * 0.58,
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
        waveEnergy = 0.62;
      }

      const targetTilt = motionEnabledRef.current ? deviceTiltRef.current : touchTiltRef.current;
      const targetChange = targetTilt - previousTargetTilt;
      previousTargetTilt = targetTilt;
      waveEnergy = clamp(waveEnergy + Math.abs(targetChange) * 0.024, 0.08, 1.35);
      waveEnergy += (0.1 - waveEnergy) * Math.min(1, dt * 1.65);

      const spring = 14;
      const damping = 7.8;
      tiltVelocity += (targetTilt - tilt) * spring * dt;
      tiltVelocity *= Math.exp(-damping * dt);
      tilt += tiltVelocity * dt * 8;
      tilt = clamp(tilt, -88, 88);

      if (reducedMotion) {
        fillLevel = 0.62;
      } else if (fillLevel <= 0.002) {
        emptyHold += dt;
        if (emptyHold > 1.1) fillLevel = 0.012;
      } else {
        emptyHold = 0;
        fillLevel = Math.min(0.94, fillLevel + dt * 0.0125);
      }

      let base = solveSurfaceBase(time);
      let leftEdgeY = surfaceAt(0, time, base);
      let rightEdgeY = surfaceAt(width, time, base);
      let spillX = leftEdgeY <= rightEdgeY ? 0 : width;
      let spillY = Math.min(leftEdgeY, rightEdgeY);
      let overflowDepth = Math.max(0, -spillY);
      let pouring = motionEnabledRef.current && overflowDepth > 1.5;

      if (pouring && !reducedMotion) {
        const overflowStrength = clamp(overflowDepth / Math.max(80, height * 0.18), 0, 1);
        fillLevel = Math.max(0, fillLevel - dt * (0.045 + overflowStrength * 0.34));
        base = solveSurfaceBase(time);
        leftEdgeY = surfaceAt(0, time, base);
        rightEdgeY = surfaceAt(width, time, base);
        spillX = leftEdgeY <= rightEdgeY ? 0 : width;
        spillY = Math.min(leftEdgeY, rightEdgeY);
        overflowDepth = Math.max(0, -spillY);
        pouring = overflowDepth > 1.5;
      }

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRain(time, dt, base);
      drawLiquid(time, dt, pouring, base);
      drawTopCornerOverflow(spillX, overflowDepth, pouring);

      if (time - lastUiUpdate > 220) {
        lastUiUpdate = time;
        setFillPercent(Math.round(fillLevel * 100));
        setCycleState(pouring ? "OVERFLOWING" : fillLevel < 0.02 ? "EMPTY" : fillLevel >= 0.935 ? "FULL" : "FILLING");
      }

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("deviceorientation", onOrientation, true);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("deviceorientation", onOrientation, true);
    };
  }, [accentRgb]);

  const enableMotion = async () => {
    if (!("DeviceOrientationEvent" in window)) {
      setMotionState("unsupported");
      return;
    }

    try {
      const orientationConstructor = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof orientationConstructor.requestPermission === "function") {
        const permission = await orientationConstructor.requestPermission();
        if (permission !== "granted") {
          setMotionState("denied");
          return;
        }
      }

      motionEnabledRef.current = true;
      setMotionState("enabled");

      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (orientation: "portrait-primary") => Promise<void>;
        };
        if (typeof orientation.lock === "function") {
          await orientation.lock("portrait-primary");
          setLockState("locked");
        } else {
          setLockState("unsupported");
        }
      } catch {
        setLockState("failed");
      }
    } catch {
      setMotionState("denied");
    }
  };

  const resetCycle = () => {
    touchTiltRef.current = 0;
    resetCounterRef.current += 1;
  };

  const statusText =
    motionState === "enabled"
      ? lockState === "locked"
        ? "PORTRAIT LOCKED // REACH A TOP CORNER TO POUR"
        : "TILT ACTIVE // KEEP AUTO-ROTATE OFF"
      : "TOUCH SLIDER SLOSHES // ENABLE TILT TO POUR";

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0.98,
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 97%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 97%, transparent 100%)",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(to bottom, rgba(${accentRgb},0.018) 0, rgba(${accentRgb},0.018) 1px, transparent 1px, transparent 4px)`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px rgba(0,0,0,0.94)" }} />
      </div>

      <aside
        aria-label="Bleeding Matrix mobile controls"
        style={{
          position: "fixed",
          left: "max(10px, env(safe-area-inset-left))",
          right: "max(10px, env(safe-area-inset-right))",
          bottom: "max(10px, env(safe-area-inset-bottom))",
          zIndex: 140,
          display: "grid",
          gap: 8,
          maxWidth: 560,
          margin: "0 auto",
          padding: 10,
          border: `1px solid rgba(${accentRgb},.34)`,
          borderRadius: 20,
          background: "rgba(7,2,4,.78)",
          boxShadow: "0 18px 60px rgba(0,0,0,.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          touchAction: "pan-y",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ color: `rgb(${accentRgb})`, font: "900 10px ui-monospace, monospace", letterSpacing: ".14em" }}>
              ANDROID LIQUID TEST V3
            </div>
            <div style={{ color: "#fff4f5", font: "900 14px ui-monospace, monospace" }}>
              {cycleState} // {fillPercent}%
            </div>
          </div>
          <div style={{ color: "#bcaeb1", fontSize: 9, lineHeight: 1.35, textAlign: "right", maxWidth: 190 }}>
            {statusText}
          </div>
        </div>

        <input
          aria-label="Manual liquid slosh"
          type="range"
          min="-42"
          max="42"
          defaultValue="0"
          onChange={(event) => {
            touchTiltRef.current = Number(event.currentTarget.value);
          }}
          style={{ width: "100%", accentColor: `rgb(${accentRgb})` }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          <button type="button" onClick={enableMotion} style={controlButtonStyle(accentRgb, motionState === "enabled")}>
            {motionState === "enabled" ? "TILT + LOCK ON" : motionState === "denied" ? "TILT BLOCKED" : "ENABLE TILT + LOCK"}
          </button>
          <button type="button" onClick={resetCycle} style={controlButtonStyle(accentRgb, false)}>
            RESET
          </button>
        </div>
      </aside>
    </>
  );
}

function controlButtonStyle(accentRgb: string, active: boolean) {
  return {
    minHeight: 44,
    border: `1px solid rgba(${accentRgb},${active ? 0.72 : 0.3})`,
    borderRadius: 12,
    color: active ? "#160106" : "#f4e9eb",
    background: active ? `rgb(${accentRgb})` : "rgba(255,255,255,.035)",
    font: "900 10px ui-monospace, monospace",
    letterSpacing: ".04em",
    touchAction: "manipulation" as const,
  };
}
