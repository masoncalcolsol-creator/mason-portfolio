import type { ReactNode } from "react";
import OscilloscopeBackground from "../receipt-wallet/OscilloscopeBackground";

export default function MonsterMusicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="monster-osc-shell">
      <OscilloscopeBackground />
      <style>{`
        .monster-osc-shell {
          position: relative;
          min-height: 100vh;
          background: #050706;
          isolation: isolate;
        }

        .monster-osc-shell main.monster-page {
          position: relative;
          min-height: 100vh;
          background:
            radial-gradient(circle at 78% 4%, rgba(151,255,22,.12), transparent 28rem),
            radial-gradient(circle at 15% 42%, rgba(151,255,22,.055), transparent 31rem),
            rgba(5,7,6,.66) !important;
        }

        .monster-osc-shell main.monster-page > nav,
        .monster-osc-shell main.monster-page > header,
        .monster-osc-shell main.monster-page > section,
        .monster-osc-shell main.monster-page > footer {
          position: relative;
          z-index: 2;
        }

        .monster-osc-shell .ghost-sticky {
          background:
            radial-gradient(circle at 50% 50%, rgba(151,255,22,.075), transparent 34%),
            linear-gradient(135deg, rgba(7,16,8,.72), rgba(5,7,6,.68) 56%) !important;
        }

        .monster-osc-shell .hero-card,
        .monster-osc-shell .step-card,
        .monster-osc-shell .scale-card,
        .monster-osc-shell .proof {
          box-shadow:
            0 30px 100px rgba(0,0,0,.5),
            inset 0 0 0 1px rgba(151,255,22,.025);
        }

        .monster-osc-shell .tile,
        .monster-osc-shell .control {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @media (max-width: 640px) {
          .monster-osc-shell main.monster-page {
            background: rgba(5,7,6,.7) !important;
          }

          .monster-osc-shell .ghost-sticky {
            background: rgba(5,9,6,.7) !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
