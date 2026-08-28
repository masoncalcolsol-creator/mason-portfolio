'use client';

import { QRCodeSVG } from 'qrcode.react';

const tags = Array.from({ length: 30 }, (_, i) => `PM-${String(i + 1).padStart(6, '0')}`);
const base = 'https://mason-portfolio-main.vercel.app/pmar/t';

export default function PMARPrintPage() {
  return (
    <main className="min-h-screen bg-white p-4 text-black print:p-0">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center justify-between print:hidden">
          <div><div className="text-xs font-black tracking-[.25em] text-cyan-600">PMARS DEPLOYMENT KIT</div><h1 className="text-3xl font-black">Field Alpha QR Batch</h1><p className="text-sm text-slate-500">30 generic, unbound markers. Print, stick, scan, pair.</p></div>
          <button onClick={()=>window.print()} className="rounded-2xl bg-black px-6 py-4 font-black text-white">PRINT 30 QRS</button>
        </div>

        <section className="grid grid-cols-3 gap-3 print:gap-1">
          {tags.map((tag) => {
            const url = `${base}/${tag}`;
            return (
              <div key={tag} className="break-inside-avoid rounded-xl border-2 border-black p-3 text-center print:rounded-none print:p-2">
                <div className="text-[10px] font-black tracking-[.18em]">PMARS PILOT</div>
                <div className="mx-auto mt-2 w-fit bg-white p-1"><QRCodeSVG value={url} size={128} level="H" /></div>
                <div className="mt-1 text-sm font-black">{tag}</div>
                <div className="text-[9px] font-bold text-slate-500">SCAN TO PAIR</div>
              </div>
            );
          })}
        </section>
      </div>
      <style jsx global>{`@media print { @page { margin: 6mm; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>
    </main>
  );
}
