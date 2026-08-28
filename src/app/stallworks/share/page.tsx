'use client';

import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

const url = 'https://mason-portfolio-main.vercel.app/stallworks';

export default function StallworksSharePage() {
  return (
    <main className="min-h-screen bg-[#f3efe4] px-5 py-8 text-black">
      <div className="screen-only mx-auto max-w-md">
        <Link href="/stallworks" className="text-sm font-bold text-black/50">← STALLWORKS</Link>
        <h1 className="mt-6 text-4xl font-black">PROPAGATE IT.</h1>
        <p className="mt-2 text-sm text-black/55">One universal gateway. Print it, tape it, share it. Please don't vandalize property to deploy the thing about vandalism. That would be embarrassingly on-brand.</p>
        <button onClick={() => window.print()} className="mt-6 w-full rounded-2xl bg-black px-5 py-4 font-black text-white">PRINT QR</button>
      </div>
      <section className="mx-auto mt-8 flex max-w-md justify-center">
        <div className="stall-card flex w-[3in] flex-col items-center bg-white p-5 text-center text-black">
          <div className="text-[9pt] font-black tracking-[.22em]">STALLWORKS</div>
          <div className="mt-2 text-[14pt] font-black leading-tight">THE WALL IS ONLINE.</div>
          <div className="mt-4"><QRCodeSVG value={url} size={190} level="H" marginSize={1} /></div>
          <div className="mt-3 text-[9pt] font-bold">POST · PRINT / SHARE · VIEW THE WALL</div>
          <div className="mt-2 text-[7pt] font-bold text-black/45">Anonymous bathroom graffiti archive</div>
        </div>
      </section>
      <style jsx global>{`@media print { @page { margin: 0.25in; } .screen-only,.nw-public-quicknav { display:none !important; } body { background:white !important; padding:0 !important; } .stall-card { margin:0 auto !important; } }`}</style>
    </main>
  );
}
