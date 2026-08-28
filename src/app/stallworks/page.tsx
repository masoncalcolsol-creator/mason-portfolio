'use client';

import Link from 'next/link';

export default function StallworksPage() {
  return (
    <main className="min-h-screen bg-[#f3efe4] px-5 py-8 text-[#111]">
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-between">
        <header className="pt-4 text-center">
          <div className="text-xs font-black tracking-[.35em]">NULLWORKS // FIELD ALPHA</div>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">STALLWORKS</h1>
          <p className="mx-auto mt-3 max-w-xs text-sm font-semibold text-black/60">A living archive of bathroom graffiti.</p>
        </header>

        <section className="my-10 grid gap-4">
          <Link href="/stallworks/post" className="flex min-h-28 items-center justify-between rounded-3xl bg-black px-6 py-6 text-white">
            <div><div className="text-3xl font-black">POST</div><div className="mt-1 text-sm text-white/60">Add graffiti anonymously</div></div><span className="text-4xl" aria-hidden>+</span>
          </Link>
          <Link href="/stallworks/share" className="flex min-h-24 items-center justify-between rounded-3xl border-2 border-black px-6 py-5">
            <div><div className="text-2xl font-black">PRINT / SHARE QR</div><div className="mt-1 text-sm text-black/55">Put STALLWORKS somewhere new</div></div><span className="text-3xl" aria-hidden>↗</span>
          </Link>
          <Link href="/stallworks/wall" className="flex min-h-24 items-center justify-between rounded-3xl border-2 border-black px-6 py-5">
            <div><div className="text-2xl font-black">VIEW THE WALL</div><div className="mt-1 text-sm text-black/55">See what humanity wrote</div></div><span className="text-3xl" aria-hidden>→</span>
          </Link>
        </section>

        <footer className="pb-4 text-center text-[10px] font-bold uppercase tracking-[.18em] text-black/35">Post · Propagate · Observe</footer>
      </div>
    </main>
  );
}
