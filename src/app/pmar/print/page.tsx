'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const tags = Array.from({ length: 50 }, (_, i) => `PM-${String(i + 1).padStart(6, '0')}`);
const base = 'https://mason-portfolio-main.vercel.app/pmar/t';

type PrintMode = 'idle' | 'one' | 'batch';

function MarkerLabel({ tag }: { tag: string }) {
  const url = `${base}/${tag}`;

  return (
    <div className="label-page bg-white text-black">
      <div className="oem-label flex flex-col items-center justify-start bg-white pt-[3mm] text-black">
        <QRCodeSVG value={url} size={72} level="H" marginSize={0} />
        <div className="mt-[1mm] font-mono text-[6pt] font-bold leading-none tracking-tight">{tag}</div>
      </div>
    </div>
  );
}

export default function PMARPrintPage() {
  const [index, setIndex] = useState(0);
  const [printMode, setPrintMode] = useState<PrintMode>('idle');
  const tag = tags[index];

  const move = (delta: number) => setIndex((current) => (current + delta + tags.length) % tags.length);

  useEffect(() => {
    const reset = () => setPrintMode('idle');
    window.addEventListener('afterprint', reset);
    return () => window.removeEventListener('afterprint', reset);
  }, []);

  const print = (mode: Exclude<PrintMode, 'idle'>) => {
    setPrintMode(mode);
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  };

  return (
    <main className={`pmars-print-page print-${printMode} min-h-screen bg-slate-950 p-5 text-white`}>
      <div className="screen-shell mx-auto max-w-md">
        <section className="screen-only mb-5">
          <div className="text-xs font-black tracking-[.25em] text-cyan-400">PMARS DEPLOYMENT KIT</div>
          <h1 className="mt-2 text-3xl font-black">Field Alpha OEM Labels</h1>
          <p className="mt-2 text-sm text-slate-400">Brother 1.1 in x 3.5 in media. Marker numbers are arbitrary keys, so print the whole field batch first and pair each one when it lands on an asset.</p>
        </section>

        <section className="screen-only mb-5 rounded-2xl border border-slate-700 bg-slate-900 p-4">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Marker preview</label>
          <select value={index} onChange={(event) => setIndex(Number(event.target.value))} className="w-full rounded-xl border border-slate-600 bg-black px-4 py-3 text-lg font-black text-white">
            {tags.map((item, itemIndex) => <option key={item} value={itemIndex}>{item}</option>)}
          </select>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button onClick={() => move(-1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">PREV</button>
            <button onClick={() => print('one')} className="rounded-xl bg-white px-3 py-3 font-black text-black">PRINT ONE</button>
            <button onClick={() => move(1)} className="rounded-xl border border-slate-600 px-3 py-3 font-bold">NEXT</button>
          </div>
          <button onClick={() => print('batch')} className="mt-3 w-full rounded-xl bg-cyan-400 px-4 py-4 text-lg font-black text-slate-950">PRINT PM-000001 THROUGH PM-000050</button>
        </section>

        <section className="screen-only flex justify-center bg-white">
          <MarkerLabel tag={tag} />
        </section>

        <p className="screen-only mt-5 text-center text-xs text-slate-500">Batch print sends 50 pages in one job. Each page is exactly one physical Brother label and should cut after each marker.</p>
      </div>

      <section className="print-single" aria-hidden={printMode !== 'one'}>
        <MarkerLabel tag={tag} />
      </section>

      <section className="print-batch" aria-hidden={printMode !== 'batch'}>
        {tags.map((item) => <MarkerLabel key={item} tag={item} />)}
      </section>

      <style jsx global>{`
        .print-single, .print-batch { display: none; }

        @media print {
          @page { size: 1.1in 3.5in; margin: 0; }

          html, body {
            width: 1.1in !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          body > * {
            margin: 0 !important;
            padding: 0 !important;
          }

          .screen-only, .screen-shell, .nw-public-quicknav {
            display: none !important;
          }

          .pmars-print-page {
            position: static !important;
            width: 1.1in !important;
            min-width: 0 !important;
            min-height: 0 !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: white !important;
          }

          .pmars-print-page .print-single,
          .pmars-print-page .print-batch {
            display: none !important;
            width: 1.1in !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .pmars-print-page.print-one .print-single,
          .pmars-print-page.print-batch .print-batch {
            display: block !important;
          }

          .label-page {
            display: block !important;
            width: 1.1in !important;
            height: 3.5in !important;
            min-width: 1.1in !important;
            min-height: 3.5in !important;
            max-width: 1.1in !important;
            max-height: 3.5in !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            background: white !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            page-break-after: always !important;
          }

          .label-page:last-child {
            break-after: auto !important;
            page-break-after: auto !important;
          }

          .oem-label {
            width: 1.1in !important;
            height: 3.5in !important;
            margin: 0 !important;
            padding-top: 3mm !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </main>
  );
}
