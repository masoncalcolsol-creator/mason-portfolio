'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const tags = Array.from({ length: 30 }, (_, i) => `PM-${String(i + 1).padStart(6, '0')}`);
const base = 'https://mason-portfolio-main.vercel.app/pmar/t';

export default function PMARPrintPage() {
  const [index, setIndex] = useState(0);
  const tag = tags[index];
  const url = `${base}/${tag}`;

  const move = (delta: number) => setIndex((current) => (current + delta + tags.length) % tags.length);

  return (
    <main className="min-h-screen bg-slate-950 p-5 text-white print:m-0 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto max-w-md print:m-0 print:w-auto print:max-w-none">
        <section className="mb-5 print:hidden">
          <div className="text-xs font-black tracking-[.25em] text-cyan-400">PMARS DEPLOYMENT KIT</div>
          <h1 className="mt-2 text-3xl font-black">Field Alpha OEM Label</h1>
          <p className="mt-2 text-sm text-slate-400">Built for the Brother continuous roll: one 29 mm-long label, then cut.</p>
        </section>

        <section className="mb-5 rounded-2xl border border-slate-700 bg-slate-900 p-4 print:hidden">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Marker</label>
          <select value={index} onChange={(event) => setIndex(Number(event.target.value))} className="w-full rounded-xl border border-slate-600 bg-black px-4 py-3 text-lg font-black text-white">
            {tags.map((item, itemIndex) => <option key={item} value={itemIndex}>{item}</option>)}
          </select>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button onClick={() => move(-1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">PREV</button>
            <button onClick={() => window.print()} className="rounded-xl bg-white px-3 py-3 font-black text-black">PRINT ONE</button>
            <button onClick={() => move(1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">NEXT</button>
          </div>
        </section>

        <section className="label-sheet flex justify-center bg-white print:block">
          <div className="oem-label flex h-[27mm] w-[27mm] flex-col items-center justify-center bg-white text-black">
            <QRCodeSVG value={url} size={72} level="H" marginSize={0} />
            <div className="mt-[1mm] font-mono text-[6pt] font-bold leading-none tracking-tight">{tag}</div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-500 print:hidden">Brother: select the installed continuous roll width, set length to 29 mm, margins minimum/none, scale 100%, then print one.</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { margin: 0; }
          html, body, main { margin: 0 !important; padding: 0 !important; background: white !important; }
          .label-sheet { width: 29mm !important; height: 29mm !important; margin: 0 !important; padding: 1mm !important; overflow: hidden !important; box-sizing: border-box !important; }
          .oem-label { width: 27mm !important; height: 27mm !important; margin: 0 !important; break-inside: avoid; page-break-inside: avoid; overflow: hidden; }
        }
      `}</style>
    </main>
  );
}
