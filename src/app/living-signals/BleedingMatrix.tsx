"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  accentRgb: string;
};

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

type MotionState = "idle" | "enabled" | "denied" | "unsupported";

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|:+-=アイウエオカキクケコサシスセソタチツテト";
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function BleedingMatrix({ accentRgb }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionEnabledRef = useRef(false);
  const deviceTiltRef = useRef(0);
  const touchTiltRef = useRef(0);
  const manualPourRef = useRef(false);
  const resetCounterRef = useRef(0);
  const [motionState, setMotionState] = useState<MotionState>("idle");
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
    let tilt = 0;
    let tiltVelocity = 0;
    let waveEnergy = 0.18;
    let previousTargetTilt = 0;
    let previousResetCounter = resetCounterRef.current;
    let rainStreams: RainStream[] = [];
    let particles: MatrixParticle[] = [];

    const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];
    const rgba = (alpha: number) => `rgba(${accentRgb}, ${alpha})`;

    const rebuildScene = () => {
      const rainFontSize = width < 680 ? 13 : 16;
      const columnWidth = rainFontSize * 1.25;
      const columnCount = Math.ceil(width / columnWidth) + 2;
      rainStreams = Array.from({ length: columnCount }, (_, index) => ({
        x: index * columnWidth,
        y: -Math.random() * height * 1.4,
        speed: 28 + Math.random() * 78,
        length: 6 + Math.floor(Math.random() * 18),
        phase: Math.random() * Math.PI * 2,
      }));

      const particleCount = width < 680 ? 105 : 190;
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 5 + Math.random() * 17,
        drift: -8 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        glyph: randomGlyph(),
        size: width < 680 ? 10 + Math.random() * 4 : 11 + Math.random() * 6,
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
      rebuildScene();
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (!motionEnabledRef.current) return;
      const gamma = typeof event.gamma === "number" ? event.gamma : 0;
      deviceTiltRef.current = clamp(gamma, -80, 80);
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

    const drawRain = (time: number, dt: number) => {
      const fontSize = width < 680 ? 13 : 16;
      context.save();
      context.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      rainStreams.forEach((stream) => {
        stream.y += stream.speed * dt;
        if (stream.y - stream.length * fontSize > height + 80) {
          stream.y = -80 - Math.random() * height * 0.8;
          stream.speed = 28 + Math.random() * 78;
          stream.length = 6 + Math.floor(Math.random() * 18);
        }

        for (let index = 0; index < stream.length; index += 1) {
          const y = stream.y - index * fontSize * 1.08;
          if (y < -30 || y > height + 30) continue;
          const decay = 1 - index / stream.length;
          const flicker = 0.7 + Math.sin(time * 0.003 + stream.phase + index) * 0.24;
          context.fillStyle = rgba(Math.max(0.018, decay * decay * 0.19 * flicker));
          context.fillText(randomGlyph(), stream.x, y);
        }
      });
      context.restore();
    };

    const surfaceY = (x: number, time: number) => {
      const baseY = height * (1 - fillLevel);
      const slope = Math.tan((tilt * Math.PI) / 180) * 0.31;
      const centeredX = x - width / 2;
      const primaryWave = Math.sin(x * 0.018 + time * 0.0024) * (4 + waveEnergy * 12);
      const secondaryWave = Math.sin(x * 0.041 - time * 0.0031) * (2 + waveEnergy * 6);
      return baseY + centeredX * slope + primaryWave + secondaryWave;
    };

    const buildLiquidPath = (time: number) => {
      const step = Math.max(9, Math.floor(width / 48));
      context.beginPath();
      context.moveTo(0, surfaceY(0, time));
      for (let x = step; x < width; x += step) context.lineTo(x, surfaceY(x, time));
      context.lineTo(width, surfaceY(width, time));
      context.lineTo(width, height + 40);
      context.lineTo(0, height + 40);
      context.closePath();
    };

    const drawLiquid = (time: number, dt: number, pouring: boolean) => {
      context.save();
      buildLiquidPath(time);
      const liquidGradient = context.createLinearGradient(0, Math.max(0, height * (1 - fillLevel) - 80), 0, height);
      liquidGradient.addColorStop(0, "rgba(255,64,82,.82)");
      liquidGradient.addColorStop(0.12, "rgba(171,7,29,.91)");
      liquidGradient.addColorStop(0.58, "rgba(77,0,14,.94)");
      liquidGradient.addColorStop(1, "rgba(30,0,8,.98)");
      context.fillStyle = liquidGradient;
      context.shadowColor = rgba(0.5);
      context.shadowBlur = 28;
      context.fill();
      context.clip();

      const innerGlow = context.createRadialGradient(width * 0.28, height * 0.62, 0, width * 0.28, height * 0.62, Math.max(width, height) * 0.8);
      innerGlow.addColorStop(0, "rgba(255,49,73,.18)");
      innerGlow.addColorStop(0.46, "rgba(92,0,18,.08)");
      innerGlow.addColorStop(1, "rgba(0,0,0,.3)");
      context.fillStyle = innerGlow;
      context.fillRect(0, 0, width, height);

      context.font = `800 ${width < 680 ? 12 : 14}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      particles.forEach((particle, index) => {
        particle.y -= particle.speed * dt * (pouring ? 2.4 : 1);
        particle.x += (particle.drift + tilt * 0.16) * dt;
        if (particle.y < -30) {
          particle.y = height + Math.random() * 80;
          particle.x = Math.random() * width;
          particle.glyph = randomGlyph();
        }
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        const shimmer = 0.55 + Math.sin(time * 0.002 + particle.phase) * 0.38;
        const depth = clamp(particle.y / Math.max(1, height), 0, 1);
        const alpha = 0.12 + depth * 0.38 * shimmer;
        context.font = `800 ${particle.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillStyle = index % 13 === 0 ? "rgba(255,210,214,.72)" : rgba(alpha);
        context.shadowColor = rgba(alpha * 1.5);
        context.shadowBlur = index % 13 === 0 ? 9 : 2;
        context.fillText(particle.glyph, particle.x, particle.y);
      });

      context.globalAlpha = 0.16;
      context.strokeStyle = "rgba(255,188,196,.5)";
      context.lineWidth = 1.2;
      for (let band = 0; band < 5; band += 1) {
        context.beginPath();
        const bandY = height * (0.54 + band * 0.1) + Math.sin(time * 0.0015 + band) * 12;
        context.moveTo(-20, bandY);
        context.bezierCurveTo(width * 0.25, bandY - 22, width * 0.68, bandY + 20, width + 20, bandY - 8);
        context.stroke();
      }
      context.restore();

      context.save();
      context.strokeStyle = "rgba(255,183,190,.78)";
      context.lineWidth = 1.4;
      context.shadowColor = rgba(0.82);
      context.shadowBlur = 15;
      context.beginPath();
      const step = Math.max(8, Math.floor(width / 54));
      context.moveTo(0, surfaceY(0, time));
      for (let x = step; x <= width; x += step) context.lineTo(x, surfaceY(x, time));
      context.stroke();
      context.restore();
    };

    const drawPourLip = (time: number, pouring: boolean) => {
      if (!pouring || fillLevel <= 0.002) return;
      const pourRight = tilt >= 0;
      const x = pourRight ? width : 0;
      const edgeY = clamp(surfaceY(x, time), 0, height);
      const streamWidth = 9 + fillLevel * 22;
      const streamHeight = Math.min(height * 0.34, 60 + fillLevel * 180);
      const gradient = context.createLinearGradient(x, edgeY, x, edgeY + streamHeight);
      gradient.addColorStop(0, "rgba(255,64,82,.9)");
      gradient.addColorStop(1, "rgba(76,0,12,0)");
      context.save();
      context.fillStyle = gradient;
      context.shadowColor = rgba(0.75);
      context.shadowBlur = 18;
      context.beginPath();
      const direction = pourRight ? 1 : -1;
      context.moveTo(x, edgeY - streamWidth * 0.35);
      context.bezierCurveTo(
        x + direction * streamWidth,
        edgeY + streamHeight * 0.18,
        x + direction * streamWidth * 0.4,
        edgeY + streamHeight * 0.72,
        x + direction * streamWidth * 0.18,
        edgeY + streamHeight,
      );
      context.lineTo(x, edgeY + streamHeight);
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

      const isLandscape = width > height * 1.08;
      const motionPour = motionEnabledRef.current && isLandscape;
      const pouring = manualPourRef.current || motionPour;
      const targetTilt = motionEnabledRef.current ? deviceTiltRef.current : touchTiltRef.current;
      const normalizedTarget = pouring && Math.abs(targetTilt) < 34 ? (targetTilt < 0 ? -72 : 72) : targetTilt;
      const targetChange = normalizedTarget - previousTargetTilt;
      previousTargetTilt = normalizedTarget;
      waveEnergy = clamp(waveEnergy + Math.abs(targetChange) * 0.025, 0.08, 1.45);
      waveEnergy += (0.1 - waveEnergy) * Math.min(1, dt * 1.7);

      const spring = 15;
      const damping = 7.4;
      tiltVelocity += (normalizedTarget - tilt) * spring * dt;
      tiltVelocity *= Math.exp(-damping * dt);
      tilt += tiltVelocity * dt * 8;
      tilt = clamp(tilt, -76, 76);

      if (reducedMotion) {
        fillLevel = 0.62;
      } else if (pouring) {
        fillLevel = Math.max(0, fillLevel - dt * (0.26 + Math.abs(tilt) / 150));
        emptyHold = 0;
      } else if (fillLevel <= 0.002) {
        emptyHold += dt;
        if (emptyHold > 0.85) fillLevel = 0.018;
      } else {
        emptyHold = 0;
        fillLevel = Math.min(0.94, fillLevel + dt * 0.026);
      }

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRain(time, dt);
      drawLiquid(time, dt, pouring);
      drawPourLip(time, pouring);

      if (time - lastUiUpdate > 220) {
        lastUiUpdate = time;
        setFillPercent(Math.round(fillLevel * 100));
        setCycleState(pouring ? "POURING" : fillLevel < 0.03 ? "EMPTY" : fillLevel >= 0.935 ? "FULL" : "FILLING");
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
    } catch {
      setMotionState("denied");
    }
  };

  const beginManualPour = () => {
    manualPourRef.current = true;
  };

  const endManualPour = () => {
    manualPourRef.current = false;
  };

  const resetCycle = () => {
    manualPourRef.current = false;
    touchTiltRef.current = 0;
    resetCounterRef.current += 1;
  };

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 180px rgba(0,0,0,0.94)",
          }}
        />
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
          touchAction: "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ color: `rgb(${accentRgb})`, font: "900 10px ui-monospace, monospace", letterSpacing: ".14em" }}>
              ANDROID LIQUID TEST
            </div>
            <div style={{ color: "#fff4f5", font: "900 14px ui-monospace, monospace" }}>
              {cycleState} // {fillPercent}%
            </div>
          </div>
          <div style={{ color: "#bcaeb1", fontSize: 10, lineHeight: 1.35, textAlign: "right" }}>
            {motionState === "enabled" ? "TURN SIDEWAYS TO POUR" : "TOUCH POUR WORKS NOW"}
          </div>
        </div>

        <input
          aria-label="Manual liquid tilt"
          type="range"
          min="-45"
          max="45"
          defaultValue="0"
          onChange={(event) => {
            touchTiltRef.current = Number(event.currentTarget.value);
          }}
          style={{ width: "100%", accentColor: `rgb(${accentRgb})` }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
          <button
            type="button"
            onClick={enableMotion}
            style={controlButtonStyle(accentRgb, motionState === "enabled")}
          >
            {motionState === "enabled" ? "TILT ON" : motionState === "denied" ? "TILT BLOCKED" : "ENABLE TILT"}
          </button>
          <button
            type="button"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              beginManualPour();
            }}
            onPointerUp={endManualPour}
            onPointerCancel={endManualPour}
            onLostPointerCapture={endManualPour}
            style={controlButtonStyle(accentRgb, true)}
          >
            HOLD TO POUR
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
