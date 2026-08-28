'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const tags = Array.from({ length: 30 }, (_, i) => `PM-${String(i + 1).padStart(6, '0')}`);
const base = 'https://mason-portfolio-main.vercel.app/pmar/t';

export default function PMARPrintPage() {
  const [index, setIndex] = useState(0);
  const tag = tags[index];
  const url = `${base}/${tag}`;

  const move = (delta: number) => {
    setIndex((current) => (current + delta + tags.length) % tags.length);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-5 text-white print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto max-w-md print:max-w-none">
        <section className="mb-5 print:hidden">
          <div className="text-xs font-black tracking-[.25em] text-cyan-400">PMARS DEPLOYMENT KIT</div>
          <h1 className="mt-2 text-3xl font-black">Field Alpha OEM Label</h1>
          <p className="mt-2 text-sm text-slate-400">One quiet little factory-looking QR at a time. No branding on the equipment label.</p>
        </section>

        <section className="mb-5 rounded-2xl border border-slate-700 bg-slate-900 p-4 print:hidden">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Marker</label>
          <select
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-600 bg-black px-4 py-3 text-lg font-black text-white"
          >
            {tags.map((item, itemIndex) => (
              <option key={item} value={itemIndex}>{item}</option>
            ))}
          </select>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button onClick={() => move(-1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">PREV</button>
            <button onClick={() => window.print()} className="rounded-xl bg-white px-3 py-3 font-black text-black">PRINT ONE</button>
            <button onClick={() => move(1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">NEXT</button>
          </div>
        </section>

        <section className="flex justify-center print:block">
          <div className="oem-label flex h-[27mm] w-[27mm] flex-col items-center justify-center bg-white text-black">
            <QRCodeSVG value={url} size={72} level="H" marginSize={0} />
            <div className="mt-[1mm] font-mono text-[6pt] font-bold leading-none tracking-tight">{tag}</div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-500 print:hidden">QR payload stays PMARS-native: {url}</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: 29mm 29mm; margin: 1mm; }
          html, body { width: 29mm; height: 29mm; margin: 0; padding: 0; background: white; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .oem-label { break-inside: avoid; page-break-inside: avoid; overflow: hidden; }
        }
      `}</style>
    </main>
  );
}
