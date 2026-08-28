'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function StallworksPostPage() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setDone(true); };

  if (done) return <main className="min-h-screen bg-black px-5 py-10 text-white"><div className="mx-auto max-w-md"><div className="text-xs font-black tracking-[.3em] text-white/50">STALLWORKS</div><h1 className="mt-5 text-5xl font-black">CAPTURED.</h1><p className="mt-4 text-white/60">Field Alpha currently proves the capture interface. Persistent public storage is the next backend connection, so this test submission has not been published.</p><Link href="/stallworks" className="mt-8 block rounded-2xl bg-white px-5 py-4 text-center font-black text-black">BACK</Link></div></main>;

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white">
      <form onSubmit={submit} className="mx-auto max-w-md">
        <Link href="/stallworks" className="text-sm font-bold text-white/50">← STALLWORKS</Link>
        <h1 className="mt-6 text-4xl font-black">POST TO THE WALL</h1>
        <p className="mt-2 text-sm text-white/55">No account. Don't photograph people. Location is optional.</p>
        <label className="mt-8 block text-xs font-black uppercase tracking-widest text-white/50">Graffiti photo</label>
        <input required type="file" accept="image/*" capture="environment" className="mt-2 block w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-base" />
        <label className="mt-5 block text-xs font-black uppercase tracking-widest text-white/50">Bathroom</label>
        <select className="mt-2 w-full rounded-2xl border border-white/20 bg-[#111] p-4 text-base" defaultValue="unknown"><option value="unknown">Unknown / don't care</option><option>Men</option><option>Women</option><option>Unisex</option><option>Porta potty</option></select>
        <label className="mt-5 block text-xs font-black uppercase tracking-widest text-white/50">City / area (optional)</label>
        <input name="place" placeholder="Phoenix, AZ" className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-base" />
        <label className="mt-5 block text-xs font-black uppercase tracking-widest text-white/50">Caption (optional)</label>
        <textarea name="caption" rows={3} maxLength={280} placeholder="Context, transcription, bathroom philosophy..." className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-base" />
        <button className="mt-7 w-full rounded-2xl bg-white px-5 py-5 text-xl font-black text-black">POST ANONYMOUSLY</button>
      </form>
    </main>
  );
}
