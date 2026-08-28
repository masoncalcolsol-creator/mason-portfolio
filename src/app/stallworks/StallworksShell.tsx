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
          --sw-green:#97ff16;
          --sw-ink:#050706;
          background:#020806 !important;
          color:#fff !important;
        }
        .stallworks-root a {
          color:inherit !important;
          text-decoration:none !important;
        }
        .stallworks-root .sw-button {
          display:flex !important;
          align-items:center !important;
          justify-content:space-between !important;
          gap:18px !important;
          width:100% !important;
          min-height:72px !important;
          padding:15px 20px !important;
          border:1px solid rgba(151,255,22,.44) !important;
          border-radius:999px !important;
          background:rgba(5,7,6,.82) !important;
          color:#f3f6ef !important;
          box-shadow:0 14px 40px rgba(0,0,0,.34) !important;
          backdrop-filter:blur(12px);
          -webkit-backdrop-filter:blur(12px);
          transition:transform .15s ease, background .15s ease, border-color .15s ease, box-shadow .15s ease !important;
        }
        .stallworks-root .sw-button:hover,
        .stallworks-root .sw-button:focus-visible {
          transform:translateY(-1px);
          border-color:var(--sw-green) !important;
          background:rgba(151,255,22,.08) !important;
          box-shadow:0 16px 48px rgba(0,0,0,.42),0 0 0 1px rgba(151,255,22,.12),0 0 30px rgba(151,255,22,.10) !important;
        }
        .stallworks-root .sw-button:active { transform:translateY(1px) scale(.995); }
        .stallworks-root .sw-button > div { min-width:0; }
        .stallworks-root .sw-button > div > div:first-child {
          color:#fff !important;
          font-weight:950 !important;
          letter-spacing:-.025em !important;
          line-height:1 !important;
        }
        .stallworks-root .sw-button > div > div:nth-child(2) {
          margin-top:5px !important;
          color:rgba(243,246,239,.62) !important;
          line-height:1.25 !important;
        }
        .stallworks-root .sw-button > span {
          display:grid !important;
          place-items:center !important;
          flex:0 0 auto !important;
          width:42px !important;
          height:42px !important;
          border-radius:999px !important;
          background:rgba(151,255,22,.10) !important;
          color:var(--sw-green) !important;
          font-weight:950 !important;
        }
        .stallworks-root .sw-primary {
          border-color:var(--sw-green) !important;
          background:var(--sw-green) !important;
          color:var(--sw-ink) !important;
          box-shadow:0 14px 42px rgba(0,0,0,.36),0 0 34px rgba(151,255,22,.14) !important;
        }
        .stallworks-root .sw-primary > div > div:first-child,
        .stallworks-root .sw-primary > div > div:nth-child(2) { color:var(--sw-ink) !important; }
        .stallworks-root .sw-primary > div > div:nth-child(2) { opacity:.65; }
        .stallworks-root .sw-primary > span {
          background:rgba(5,7,6,.12) !important;
          color:var(--sw-ink) !important;
        }
        .stallworks-root .sw-card {
          border:1px solid rgba(134,255,98,.28) !important;
          border-radius:24px !important;
          background:rgba(0,0,0,.72) !important;
          color:#fff !important;
          box-shadow:0 16px 55px rgba(0,0,0,.38),0 0 28px rgba(90,255,70,.07) !important;
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
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
          min-height:52px !important;
          padding:12px 18px !important;
          border:1px solid var(--sw-green) !important;
          border-radius:999px !important;
          background:var(--sw-green) !important;
          color:var(--sw-ink) !important;
          font-weight:950 !important;
          letter-spacing:.01em !important;
          box-shadow:0 12px 34px rgba(0,0,0,.34),0 0 28px rgba(151,255,22,.13) !important;
        }
        .stallworks-root .sw-muted { color:rgba(255,255,255,.58) !important; }
        .stallworks-root .sw-accent { color:var(--sw-green) !important; }
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
