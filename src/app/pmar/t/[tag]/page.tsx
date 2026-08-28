'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Binding = {
  alias: string;
  kind: string;
  hours?: string;
  status: 'IN SERVICE' | 'OUT OF SERVICE';
  pairedAt: string;
};

export default function PMARTagPage() {
  const params = useParams<{ tag: string }>();
  const tag = useMemo(() => decodeURIComponent(params?.tag || '').toUpperCase(), [params]);
  const storageKey = `pmar-binding:${tag}`;
  const [binding, setBinding] = useState<Binding | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [alias, setAlias] = useState('');
  const [kind, setKind] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setBinding(JSON.parse(raw));
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  function bind() {
    if (!alias.trim()) return;
    const next: Binding = {
      alias: alias.trim().toUpperCase(),
      kind: kind.trim() || 'Physical asset',
      hours: hours.trim() || undefined,
      status: 'IN SERVICE',
      pairedAt: new Date().toISOString(),
    };
    localStorage.setItem(storageKey, JSON.stringify(next));
    setBinding(next);
  }

  function toggleStatus() {
    if (!binding) return;
    const next = { ...binding, status: binding.status === 'IN SERVICE' ? 'OUT OF SERVICE' : 'IN SERVICE' } as Binding;
    localStorage.setItem(storageKey, JSON.stringify(next));
    setBinding(next);
  }

  if (!loaded) return <main className="min-h-screen bg-[#f3f6f7]" />;

  return (
    <main className="min-h-screen bg-[#f3f6f7] px-5 py-8 text-[#101418]">
      <div className="mx-auto max-w-md">
        <header className="mb-6">
          <div className="text-xs font-black tracking-[.28em] text-cyan-600">PMARS FIELD ALPHA</div>
          <h1 className="text-4xl font-black">{tag || 'UNKNOWN TAG'}</h1>
        </header>

        {!binding ? (
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold tracking-[.2em] text-cyan-600">NEW TRIANGLE</div>
            <h2 className="mt-2 text-3xl font-black">What did you put this on?</h2>
            <p className="mt-2 text-sm text-slate-500">This marker is unbound. Pair it to the physical asset in front of you.</p>

            <label className="mt-6 block text-sm font-bold">Asset ID</label>
            <input autoCapitalize="characters" value={alias} onChange={(e)=>setAlias(e.target.value)} placeholder="PJ53" className="mt-2 w-full rounded-2xl border p-4 text-xl font-black" />

            <label className="mt-4 block text-sm font-bold">Type</label>
            <input value={kind} onChange={(e)=>setKind(e.target.value)} placeholder="Toyota pallet jack" className="mt-2 w-full rounded-2xl border p-4" />

            <label className="mt-4 block text-sm font-bold">Displayed hours</label>
            <input inputMode="decimal" value={hours} onChange={(e)=>setHours(e.target.value)} placeholder="1624" className="mt-2 w-full rounded-2xl border p-4 text-xl" />

            <button onClick={bind} className="mt-6 w-full rounded-2xl bg-[#17d7e8] py-5 text-lg font-black text-black">PAIR THIS TRIANGLE</button>
          </section>
        ) : (
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold tracking-[.2em] text-slate-500">YOU SCANNED</div>
            <h2 className="mt-1 text-5xl font-black">{binding.alias}</h2>
            <p className="mt-1 text-slate-500">{binding.kind}</p>
            <button onClick={toggleStatus} className={`mt-6 w-full rounded-2xl p-5 text-left text-xl font-black ${binding.status === 'IN SERVICE' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>{binding.status}</button>
            {binding.hours && <div className="mt-4 flex justify-between border-b py-4"><span>Displayed hours</span><strong>{binding.hours}</strong></div>}
            <div className="flex justify-between border-b py-4 text-sm"><span>PMARS point</span><strong>{tag}</strong></div>
            <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm">Pilot binding is stored on this field phone. Production PMARS will sync bindings and events to the shared backend.</p>
          </section>
        )}

        <p className="mt-8 text-center text-xs font-bold tracking-[.16em] text-slate-400">FIND BLUE. SCAN BLUE.</p>
      </div>
    </main>
  );
}
