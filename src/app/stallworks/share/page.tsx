'use client';

import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

const url = 'https://mason-portfolio-main.vercel.app/stallworks';

export default function StallworksSharePage() {
  return (
    <main className="stallworks-scope min-h-screen px-5 py-8 text-white">
      <div className="screen-only mx-auto max-w-md">
        <Link href="/stallworks" className="text-sm font-bold text-emerald-100/70">← STALLWORKS</Link>
        <h1 className="mt-6 text-4xl font-black">PROPAGATE IT.</h1>
        <p className="mt-2 text-sm text-emerald-50/65">One universal gateway. Print it, tape it, share it. Please don't vandalize property to deploy the thing about vandalism. That would be embarrassingly on-brand.</p>
        <button onClick={() => window.print()} className="mt-6 w-full rounded-2xl border border-emerald-300/30 bg-black/70 px-5 py-4 font-black text-white backdrop-blur">PRINT QR</button>
      </div>
      <section className="mx-auto mt-8 flex max-w-md justify-center">
        <div className="stall-card flex w-[3in] flex-col items-center bg-white p-5 text-center text-black shadow-[0_0_35px_rgba(74,222,128,0.18)]">
          <div className="text-[9pt] font-black tracking-[.22em]">STALLWORKS</div>
          <div className="mt-2 text-[14pt] font-black leading-tight">THE WALL IS ONLINE.</div>
          <div className="mt-4"><QRCodeSVG value={url} size={190} level="H" marginSize={1} /></div>
          <div className="mt-3 text-[9pt] font-bold">POST · PRINT / SHARE · VIEW THE WALL</div>
          <div className="mt-2 text-[7pt] font-bold text-black/45">Anonymous bathroom graffiti archive</div>
        </div>
      </section>
      <style jsx global>{`
        .stallworks-scope {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 42%, rgba(20, 255, 133, .10), transparent 34%),
            linear-gradient(rgba(34, 197, 94, .055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, .055) 1px, transparent 1px),
            #020806;
          background-size: auto, 28px 28px, 28px 28px, auto;
        }
        .stallworks-scope::before {
          content: '';
          position: fixed;
          z-index: -1;
          left: -8vw;
          right: -8vw;
          top: 27vh;
          height: 42vh;
          opacity: .72;
          filter: drop-shadow(0 0 7px rgba(74, 222, 128, .85)) drop-shadow(0 0 18px rgba(34, 197, 94, .35));
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 320' preserveAspectRatio='none'%3E%3Cpath d='M0 168 L70 168 L95 160 L115 176 L138 168 L210 168 L228 155 L245 184 L266 168 L338 168 L360 164 L382 170 L405 168 L470 168 L492 130 L512 210 L535 168 L600 168 L625 160 L645 178 L668 168 L742 168 L760 153 L780 188 L800 168 L875 168 L898 164 L920 172 L945 168 L1005 168 L1030 140 L1050 198 L1072 168 L1200 168' fill='none' stroke='%234ade80' stroke-width='3' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E");
        }
        .stallworks-scope::after {
          content: '';
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: -1;
          background: repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0px, rgba(255,255,255,.018) 1px, transparent 1px, transparent 4px);
        }
        @media print {
          @page { margin: 0.25in; }
          .screen-only,.nw-public-quicknav { display:none !important; }
          body { background:white !important; padding:0 !important; }
          .stallworks-scope { background:white !important; color:black !important; }
          .stallworks-scope::before,.stallworks-scope::after { display:none !important; }
          .stall-card { margin:0 auto !important; box-shadow:none !important; }
        }
      `}</style>
    </main>
  );
}
