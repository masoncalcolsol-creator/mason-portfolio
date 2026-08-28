'use client';

import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import OscilloscopeBackground from '../../receipt-wallet/OscilloscopeBackground';

const url = 'https://mason-portfolio-main.vercel.app/stallworks';

export default function StallworksSharePage() {
  return (
    <main className="stallworks-scope min-h-screen px-5 py-8 text-white">
      <div className="stallworks-signal screen-only"><OscilloscopeBackground /></div>
      <div className="screen-only relative z-10 mx-auto max-w-md">
        <Link href="/stallworks" className="text-sm font-bold text-lime-200/70">← STALLWORKS</Link>
        <h1 className="mt-6 text-4xl font-black">PROPAGATE IT.</h1>
        <p className="mt-2 text-sm text-lime-50/65">One universal gateway. Print it, tape it, share it. Please don't vandalize property to deploy the thing about vandalism. That would be embarrassingly on-brand.</p>
        <button onClick={() => window.print()} className="mt-6 w-full rounded-2xl border border-lime-300/30 bg-black/70 px-5 py-4 font-black text-white backdrop-blur">PRINT QR</button>
      </div>
      <section className="relative z-10 mx-auto mt-8 flex max-w-md justify-center">
        <div className="stall-card flex w-[3in] flex-col items-center bg-white p-5 text-center text-black shadow-[0_0_35px_rgba(132,255,72,0.18)]">
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
            radial-gradient(circle at 78% 4%, rgba(151,255,22,.12), transparent 28rem),
            radial-gradient(circle at 15% 42%, rgba(151,255,22,.055), transparent 31rem),
            #050706;
        }
        .stallworks-signal { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        @media print {
          @page { margin: 0.25in; }
          .screen-only,.stallworks-signal,.nw-public-quicknav { display:none !important; }
          body { background:white !important; padding:0 !important; }
          .stallworks-scope { background:white !important; color:black !important; }
          .stall-card { margin:0 auto !important; box-shadow:none !important; }
        }
      `}</style>
    </main>
  );
}
