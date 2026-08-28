import Link from 'next/link';

export default function StallworksWallPage() {
  return (
    <main className="min-h-screen bg-[#f3efe4] px-5 py-8 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/stallworks" className="text-sm font-bold text-black/50">← STALLWORKS</Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-black tracking-[.3em] text-black/40">GLOBAL GRAFFITI ARCHIVE</div><h1 className="mt-2 text-5xl font-black">THE WALL</h1></div><Link href="/stallworks/post" className="rounded-2xl bg-black px-5 py-3 font-black text-white">+ POST</Link></div>
        <section className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <div className="mb-4 break-inside-avoid rounded-3xl border-2 border-dashed border-black/20 p-8 text-center"><div className="text-5xl">✎</div><h2 className="mt-4 text-xl font-black">THE WALL IS CLEAN.</h2><p className="mt-2 text-sm text-black/50">Suspicious. Field Alpha has not connected persistent submissions yet.</p></div>
        </section>
      </div>
    </main>
  );
}
