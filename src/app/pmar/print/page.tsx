'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const tags = Array.from({ length: 50 }, (_, i) => `PM-${String(i + 1).padStart(6, '0')}`);
const base = 'https://mason-portfolio-main.vercel.app/pmar/t';

export default function PMARPrintPage() {
  const [index, setIndex] = useState(0);
  const tag = tags[index];
  const url = `${base}/${tag}`;

  const move = (delta: number) => setIndex((current) => (current + delta + tags.length) % tags.length);

  return (
    <main className="pmars-print-page min-h-screen bg-slate-950 p-5 text-white">
      <div className="mx-auto max-w-md">
        <section className="screen-only mb-5">
          <div className="text-xs font-black tracking-[.25em] text-cyan-400">PMARS DEPLOYMENT KIT</div>
          <h1 className="mt-2 text-3xl font-black">Field Alpha OEM Labels</h1>
          <p className="mt-2 text-sm text-slate-400">Brother 1.1 in x 3.5 in media. Print one here, or open the dedicated pre-rendered 50-label batch.</p>
        </section>

        <section className="screen-only mb-5 rounded-2xl border border-slate-700 bg-slate-900 p-4">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Marker preview</label>
          <select value={index} onChange={(event) => setIndex(Number(event.target.value))} className="w-full rounded-xl border border-slate-600 bg-black px-4 py-3 text-lg font-black text-white">
            {tags.map((item, itemIndex) => <option key={item} value={itemIndex}>{item}</option>)}
          </select>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button onClick={() => move(-1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">PREV</button>
            <button onClick={() => window.print()} className="rounded-xl bg-white px-3 py-3 font-black text-black">PRINT ONE</button>
            <button onClick={() => move(1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">NEXT</button>
          </div>
          <a href="/pmar/print/batch" className="mt-3 block w-full rounded-xl bg-cyan-400 px-4 py-4 text-center text-lg font-black text-slate-950">OPEN 50-LABEL BATCH</a>
        </section>

        <section className="label-sheet flex justify-center bg-white">
          <div className="oem-label flex flex-col items-center justify-start bg-white pt-[3mm] text-black">
            <QRCodeSVG value={url} size={72} level="H" marginSize={0} />
            <div className="mt-[1mm] font-mono text-[6pt] font-bold leading-none tracking-tight">{tag}</div>
          </div>
        </section>

        <p className="screen-only mt-5 text-center text-xs text-slate-500">Single-label printing remains unchanged because Android and the Brother service have now proven this path works.</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: 1.1in 3.5in; margin: 0; }
          html, body {
            width: 1.1in !important;
            height: 3.5in !important;
            min-width: 0 !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }
          body > * { margin: 0 !important; padding: 0 !important; }
          .pmars-print-page {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 1.1in !important;
            height: 3.5in !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }
          .pmars-print-page > div {
            width: 1.1in !important;
            height: 3.5in !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          .screen-only, .nw-public-quicknav { display: none !important; }
          .label-sheet {
            display: block !important;
            width: 1.1in !important;
            height: 3.5in !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }
          .oem-label {
            width: 1.1in !important;
            height: 3.5in !important;
            margin: 0 !important;
            padding-top: 3mm !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </main>
  );
}
