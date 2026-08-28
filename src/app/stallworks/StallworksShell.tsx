'use client';

import type { ReactNode } from 'react';
import OscilloscopeBackground from '../receipt-wallet/OscilloscopeBackground';

export default function StallworksShell({ children }: { children: ReactNode }) {
  return (
    <main className="stallworks-root relative min-h-screen overflow-hidden bg-[#020806] text-white">
      <OscilloscopeBackground />
      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_50%_20%,rgba(80,255,90,0.09),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(50,255,100,0.05),transparent_34%)]" />
      <div className="relative z-[3] min-h-screen px-5 py-8">
        {children}
      </div>
      <style jsx global>{`
        .stallworks-root {
          background:#020806 !important;
          color:#fff !important;
        }
        .stallworks-root a {
          color:inherit !important;
          text-decoration:none !important;
        }
        .stallworks-root .sw-card,
        .stallworks-root .sw-button {
          display:flex;
          align-items:center;
          justify-content:space-between;
          border:1px solid rgba(134,255,98,.28) !important;
          border-radius:24px !important;
          background:rgba(0,0,0,.72) !important;
          color:#fff !important;
          box-shadow:0 16px 55px rgba(0,0,0,.38), 0 0 28px rgba(90,255,70,.07) !important;
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
        }
        .stallworks-root .sw-primary {
          border-color:rgba(134,255,98,.55) !important;
          background:linear-gradient(135deg,rgba(134,255,98,.17),rgba(0,0,0,.78)) !important;
        }
        .stallworks-root input,
        .stallworks-root textarea,
        .stallworks-root select {
          border:1px solid rgba(134,255,98,.24) !important;
          border-radius:18px !important;
          background:rgba(0,0,0,.78) !important;
          color:#fff !important;
          box-shadow:none !important;
        }
        .stallworks-root input::placeholder,
        .stallworks-root textarea::placeholder { color:rgba(255,255,255,.35) !important; }
        .stallworks-root button {
          border:1px solid rgba(134,255,98,.45) !important;
          border-radius:18px !important;
          background:linear-gradient(135deg,#86ff62,#51d938) !important;
          color:#041005 !important;
          font-weight:900 !important;
          box-shadow:0 0 28px rgba(90,255,70,.18) !important;
        }
        .stallworks-root .sw-muted { color:rgba(255,255,255,.58) !important; }
        .stallworks-root .sw-accent { color:#86ff62 !important; }
        .stallworks-root .sw-panel {
          border:1px solid rgba(134,255,98,.18) !important;
          background:rgba(0,0,0,.72) !important;
          color:#fff !important;
          border-radius:24px !important;
          box-shadow:0 16px 55px rgba(0,0,0,.36) !important;
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
        }
      `}</style>
    </main>
  );
}

export const stallButton = 'sw-button';
export const stallInput = 'sw-input';
