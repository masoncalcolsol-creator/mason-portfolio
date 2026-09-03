'use client';

import { QRCodeSVG } from 'qrcode.react';

const tags = Array.from({ length: 50 }, (_, i) => `PM-${String(i + 51).padStart(6, '0')}`);
const base = 'https://mason-portfolio-main.vercel.app/pmar/t';

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

export default function PMARBatchPrintPage() {
  return (
    <main className="pmars-batch-page min-h-screen bg-slate-950 p-5 text-white">
      <section className="screen-only mx-auto max-w-md">
        <div className="text-xs font-black tracking-[.25em] text-cyan-400">PMARS DEPLOYMENT KIT</div>
        <h1 className="mt-2 text-3xl font-black">Fresh 50-Label Brother Batch</h1>
        <p className="mt-2 text-sm text-slate-400">Fresh deployment markers PM-000051 through PM-000100. All 50 markers are rendered before Android opens the print service.</p>
        <button onClick={() => window.print()} className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-4 text-lg font-black text-slate-950">PRINT PM-000051–PM-000100</button>
        <a href="/pmar/print" className="mt-3 block rounded-xl border border-slate-600 px-4 py-3 text-center font-bold">BACK TO SINGLE LABELS</a>
        <p className="mt-4 text-xs text-slate-500">Expected Android print preview: 50 pages at 1.1 in x 3.5 in. Page 1 = PM-000051. Page 50 = PM-000100.</p>
      </section>

      <section className="batch-labels" aria-label="PMARS labels PM-000051 through PM-000100">
        {tags.map((tag) => <MarkerLabel key={tag} tag={tag} />)}
      </section>

      <style jsx global>{`
        .batch-labels {
          position: absolute;
          left: -10000px;
          top: 0;
          width: 1.1in;
        }

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

          .screen-only, .nw-public-quicknav {
            display: none !important;
          }

          .pmars-batch-page {
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

          .batch-labels {
            position: static !important;
            left: auto !important;
            top: auto !important;
            display: block !important;
            width: 1.1in !important;
            margin: 0 !important;
            padding: 0 !important;
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
