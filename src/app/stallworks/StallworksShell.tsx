'use client';

import type { ReactNode } from 'react';
import OscilloscopeBackground from '../receipt-wallet/OscilloscopeBackground';

export default function StallworksShell({ children }: { children: ReactNode }) {
  return (
    <main className="stallworks-root relative min-h-screen overflow-hidden bg-[#020806] text-white">
      <OscilloscopeBackground />
      <div className="pointer-events-none fixed inset-0 z-[2] bg-[linear-gradient(rgba(2,8,6,.34),rgba(2,8,6,.34)),radial-gradient(circle_at_50%_20%,rgba(68,112,76,.09),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(38,77,49,.05),transparent_36%)]" />
      <div className="relative z-[3] min-h-screen px-5 py-8">
        {children}
      </div>
      <style jsx global>{`
        .stallworks-root {
          --sw-green:#4f7a58;
          --sw-green-bright:#6f9b77;
          --sw-green-soft:rgba(79,122,88,.18);
          --sw-ink:#050706;
          background:#020806 !important;
          color:#fff !important;
        }
        .stallworks-root a { color:inherit !important; text-decoration:none !important; }
        .stallworks-root .sw-button {
          display:flex !important; align-items:center !important; justify-content:space-between !important; gap:18px !important;
          width:100% !important; min-height:72px !important; padding:15px 20px !important;
          border:1px solid rgba(111,155,119,.46) !important; border-radius:999px !important;
          background:rgba(5,10,7,.86) !important; color:#f1f4ef !important;
          box-shadow:0 14px 40px rgba(0,0,0,.34) !important;
          backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          transition:transform .15s ease, background .15s ease, border-color .15s ease, box-shadow .15s ease !important;
        }
        .stallworks-root .sw-button:hover,.stallworks-root .sw-button:focus-visible {
          transform:translateY(-1px); border-color:var(--sw-green-bright) !important;
          background:rgba(79,122,88,.12) !important;
          box-shadow:0 16px 48px rgba(0,0,0,.42),0 0 0 1px rgba(111,155,119,.10),0 0 26px rgba(79,122,88,.10) !important;
        }
        .stallworks-root .sw-button:active { transform:translateY(1px) scale(.995); }
        .stallworks-root .sw-button > div { min-width:0; }
        .stallworks-root .sw-button > div > div:first-child { color:#fff !important; font-weight:950 !important; letter-spacing:-.025em !important; line-height:1 !important; }
        .stallworks-root .sw-button > div > div:nth-child(2) { margin-top:5px !important; color:rgba(243,246,239,.62) !important; line-height:1.25 !important; }
        .stallworks-root .sw-button > span {
          display:grid !important; place-items:center !important; flex:0 0 auto !important;
          width:42px !important; height:42px !important; border-radius:999px !important;
          background:rgba(79,122,88,.18) !important; color:var(--sw-green-bright) !important; font-weight:950 !important;
        }
        .stallworks-root .sw-primary {
          border-color:#5f8968 !important;
          background:linear-gradient(135deg,#5d8665,#456b4e) !important;
          color:#f6f8f4 !important;
          box-shadow:0 14px 42px rgba(0,0,0,.36),0 0 26px rgba(79,122,88,.13) !important;
        }
        .stallworks-root .sw-primary > div > div:first-child,.stallworks-root .sw-primary > div > div:nth-child(2) { color:#fff !important; }
        .stallworks-root .sw-primary > div > div:nth-child(2) { opacity:.72; }
        .stallworks-root .sw-primary > span { background:rgba(0,0,0,.14) !important; color:#fff !important; }
        .stallworks-root .sw-card,.stallworks-root .sw-panel {
          border:1px solid rgba(111,155,119,.24) !important; border-radius:24px !important;
          background:rgba(0,0,0,.74) !important; color:#fff !important;
          box-shadow:0 16px 55px rgba(0,0,0,.38),0 0 24px rgba(79,122,88,.06) !important;
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
        }
        .stallworks-root input,.stallworks-root textarea,.stallworks-root select {
          width:100% !important;
          max-width:100% !important;
          box-sizing:border-box !important;
          border:1px solid rgba(111,155,119,.28) !important;
          border-radius:18px !important;
          background:rgba(0,0,0,.80) !important;
          color:#fff !important;
          box-shadow:none !important;
          padding:12px 14px !important;
          line-height:1.35 !important;
          overflow:hidden !important;
        }
        .stallworks-root textarea {
          min-height:112px !important;
          resize:vertical !important;
          overflow:auto !important;
        }
        .stallworks-root input[type='file'] {
          min-height:52px !important;
          padding:7px 9px !important;
        }
        .stallworks-root input::placeholder,.stallworks-root textarea::placeholder { color:rgba(255,255,255,.35) !important; }
        .stallworks-root button {
          min-height:52px !important; padding:12px 18px !important;
          border:1px solid #5f8968 !important; border-radius:999px !important;
          background:linear-gradient(135deg,#5d8665,#456b4e) !important; color:#fff !important;
          font-weight:950 !important; letter-spacing:.01em !important;
          box-shadow:0 12px 34px rgba(0,0,0,.34),0 0 24px rgba(79,122,88,.12) !important;
        }
        .stallworks-root .sw-muted { color:rgba(255,255,255,.58) !important; }
        .stallworks-root .sw-accent { color:var(--sw-green-bright) !important; }
      `}</style>
    </main>
  );
}

export const stallButton = 'sw-button';
export const stallInput = 'sw-input';
