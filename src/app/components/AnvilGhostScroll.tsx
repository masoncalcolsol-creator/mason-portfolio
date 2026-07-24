"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const pageWords: Record<string, [string, string, string]> = {
  "/sound-library": ["HEAR", "THE", "RANGE"],
  "/kaironull-assurance": ["PRESSURE", "THE", "TEST"],
};

export default function AnvilGhostScroll() {
  const pathname = usePathname();
  const words = useMemo(() => pageWords[pathname], [pathname]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!words) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, window.scrollY / max)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [words]);

  if (!words) return null;

  const eased = progress * progress * (3 - 2 * progress);

  return (
    <div className="anvil-ghost-scroll" aria-hidden="true">
      <style>{`
        .anvil-ghost-scroll {
          position: fixed;
          inset: 0;
          z-index: 25;
          overflow: hidden;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .anvil-ghost-word {
          position: absolute;
          white-space: nowrap;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-weight: 950;
          line-height: .72;
          letter-spacing: -.09em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(174,255,54,.11);
          text-shadow: 0 0 38px rgba(151,255,22,.035);
          will-change: transform, opacity;
        }
        .anvil-ghost-word.one {
          left: -13vw;
          top: 15vh;
          font-size: clamp(105px, 28vw, 390px);
        }
        .anvil-ghost-word.two {
          right: -10vw;
          top: 45vh;
          font-size: clamp(92px, 23vw, 325px);
          -webkit-text-stroke-color: rgba(255,255,255,.075);
        }
        .anvil-ghost-word.three {
          left: -4vw;
          bottom: -1vh;
          font-size: clamp(100px, 26vw, 360px);
        }
        .anvil-ghost-rail {
          position: absolute;
          right: max(8px, 1.25vw);
          top: 18vh;
          width: 1px;
          height: 64vh;
          background: linear-gradient(transparent, rgba(151,255,22,.32), transparent);
          opacity: .52;
        }
        .anvil-ghost-dot {
          position: absolute;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a4ff27;
          box-shadow: 0 0 17px rgba(164,255,39,.75);
          transform: translate(-50%, -50%);
        }
        @media (max-width: 640px) {
          .anvil-ghost-scroll { z-index: 24; }
          .anvil-ghost-word { -webkit-text-stroke-width: .8px; }
          .anvil-ghost-word.one { left: -31vw; top: 18vh; }
          .anvil-ghost-word.two { right: -30vw; top: 49vh; }
          .anvil-ghost-word.three { left: -20vw; bottom: 5vh; }
          .anvil-ghost-rail { right: 5px; opacity: .4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .anvil-ghost-scroll { display: none; }
        }
      `}</style>
      <span
        className="anvil-ghost-word one"
        style={{
          opacity: 0.13 + Math.sin(eased * Math.PI) * 0.09,
          transform: `translate3d(${(-20 + eased * 43).toFixed(2)}vw, ${(-7 + eased * 21).toFixed(2)}vh, 0) rotate(${(-5 + eased * 8).toFixed(2)}deg)`,
        }}
      >
        {words[0]}
      </span>
      <span
        className="anvil-ghost-word two"
        style={{
          opacity: 0.1 + Math.sin((eased + 0.18) * Math.PI) * 0.07,
          transform: `translate3d(${(15 - eased * 40).toFixed(2)}vw, ${(9 - eased * 24).toFixed(2)}vh, 0) rotate(${(6 - eased * 10).toFixed(2)}deg)`,
        }}
      >
        {words[1]}
      </span>
      <span
        className="anvil-ghost-word three"
        style={{
          opacity: 0.11 + Math.sin((eased + 0.35) * Math.PI) * 0.08,
          transform: `translate3d(${(-10 + eased * 31).toFixed(2)}vw, ${(12 - eased * 28).toFixed(2)}vh, 0) rotate(${(-3 + eased * 6).toFixed(2)}deg)`,
        }}
      >
        {words[2]}
      </span>
      <div className="anvil-ghost-rail">
        <span className="anvil-ghost-dot" style={{ top: `${(eased * 100).toFixed(2)}%` }} />
      </div>
    </div>
  );
}
