'use client';

import { useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

type Asset = {
  id: string;
  alias: string;
  kind: string;
  status: 'IN SERVICE' | 'OUT OF SERVICE' | 'UNBOUND';
  hours?: number;
  lastService?: string;
  note?: string;
};

const seed: Record<string, Asset> = {
  'demo-pj54': { id: 'demo-pj54', alias: 'PJ54', kind: 'Toyota electric pallet jack', status: 'IN SERVICE', hours: 1657, lastService: '2026-06-07', note: 'PM current' },
  'demo-door': { id: 'demo-door', alias: 'Parts Clerk Office', kind: 'Location', status: 'IN SERVICE', note: 'Clerk stepped out. Expected back at 12:40 PM.' },
};

export default function PMARPage() {
  const [assets, setAssets] = useState(seed);
  const [point, setPoint] = useState('demo-pj54');
  const [mode, setMode] = useState<'scan' | 'bind'>('scan');
  const [newAlias, setNewAlias] = useState('');
  const [newKind, setNewKind] = useState('');
  const asset = assets[point];
  const qrValue = useMemo(() => `https://mason-portfolio-main.vercel.app/pmar?p=${encodeURIComponent(point)}`, [point]);

  function bind() {
    if (!newAlias.trim()) return;
    const id = `point-${Date.now()}`;
    setAssets((old) => ({ ...old, [id]: { id, alias: newAlias.trim(), kind: newKind.trim() || 'Physical asset', status: 'IN SERVICE', note: 'New PMAR point bound' } }));
    setPoint(id);
    setMode('scan');
    setNewAlias('');
    setNewKind('');
  }

  return (
    <main className="min-h-screen bg-[#f3f6f7] text-[#101418] px-5 py-8 font-sans">
      <div className="mx-auto max-w-md">
        <header className="mb-6 flex items-center justify-between">
          <div><div className="text-xs font-black tracking-[.28em] text-cyan-600">NULLWORKS</div><h1 className="text-3xl font-black tracking-tight">PMAR</h1></div>
          <div className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-xs font-bold">FIND BLUE. SCAN BLUE.</div>
        </header>

        <section className="mb-5 rounded-[28px] bg-[#17d7e8] p-5 shadow-sm">
          <div className="mx-auto flex aspect-[1.05] max-w-[330px] flex-col items-center justify-center rounded-[34px] border-[14px] border-black px-5 text-center" style={{clipPath:'polygon(50% 0,100% 100%,0 100%)'}}>
            <div className="mt-20 rounded-xl bg-white p-2"><QRCodeSVG value={qrValue} size={126} level="H" imageSettings={{src:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB4PSI1MCIgeT0iNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSI5MDAiPz88L3RleHQ+PC9zdmc+',height:34,width:34,excavate:true}} /></div>
            <div className="mt-2 text-2xl font-black">PMAR</div>
          </div>
        </section>

        {mode === 'scan' && asset && <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="text-xs font-bold tracking-[.2em] text-slate-500">YOU SCANNED</div>
          <h2 className="mt-1 text-4xl font-black">{asset.alias}</h2>
          <p className="mt-1 text-slate-500">{asset.kind}</p>
          <div className={`mt-5 rounded-2xl p-4 font-black ${asset.status === 'IN SERVICE' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>{asset.status}</div>
          {asset.hours !== undefined && <div className="mt-4 flex justify-between border-b py-3"><span>Last reported hours</span><strong>{asset.hours.toLocaleString()}</strong></div>}
          {asset.lastService && <div className="flex justify-between border-b py-3"><span>Last service</span><strong>{asset.lastService}</strong></div>}
          {asset.note && <p className="mt-4 rounded-2xl bg-slate-100 p-4">{asset.note}</p>}
          <button onClick={() => setMode('bind')} className="mt-5 w-full rounded-2xl bg-black py-4 font-black text-white">BIND A NEW BLUE TRIANGLE</button>
        </section>}

        {mode === 'bind' && <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="text-xs font-bold tracking-[.2em] text-cyan-600">NEW PMAR POINT</div>
          <h2 className="mt-2 text-3xl font-black">What did you put this on?</h2>
          <label className="mt-5 block text-sm font-bold">Name / local alias</label>
          <input value={newAlias} onChange={(e)=>setNewAlias(e.target.value)} placeholder="e.g. PJ55" className="mt-2 w-full rounded-2xl border p-4 text-lg" />
          <label className="mt-4 block text-sm font-bold">What is it?</label>
          <input value={newKind} onChange={(e)=>setNewKind(e.target.value)} placeholder="e.g. Toyota pallet jack" className="mt-2 w-full rounded-2xl border p-4 text-lg" />
          <button onClick={bind} className="mt-5 w-full rounded-2xl bg-[#17d7e8] py-4 font-black text-black">YES — BIND THIS POINT</button>
          <button onClick={()=>setMode('scan')} className="mt-2 w-full py-3 font-bold text-slate-500">Cancel</button>
        </section>}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {Object.values(assets).slice(0,4).map((a)=><button key={a.id} onClick={()=>{setPoint(a.id);setMode('scan')}} className="rounded-2xl border bg-white p-4 text-left"><div className="text-xs text-slate-500">DEMO POINT</div><strong>{a.alias}</strong></button>)}
        </div>
        <p className="mt-8 text-center text-xs text-slate-400">The marker is the address. The record is the identity.</p>
      </div>
    </main>
  );
}
