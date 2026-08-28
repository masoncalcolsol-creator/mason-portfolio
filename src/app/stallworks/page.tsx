'use client';

import Link from 'next/link';
import StallworksShell, { stallButton } from './StallworksShell';

export default function StallworksPage() {
  return <StallworksShell><div className="mx-auto flex min-h-[86vh] max-w-md flex-col justify-between">
    <header className="pt-5">
      <div className="font-mono text-[11px] font-black tracking-[.28em] text-[#86ff62]">NULLWORKS // FIELD ALPHA</div>
      <h1 className="mt-5 text-6xl font-black tracking-[-.06em]">STALLWORKS</h1>
      <p className="mt-3 max-w-sm text-lg font-semibold leading-relaxed text-white/60">A living archive of bathroom graffiti.</p>
    </header>
    <section className="my-10 grid gap-4">
      <Link href="/stallworks/post" className={`${stallButton} min-h-28 border-[#86ff62]/45 bg-[#86ff62]/10`}><div><div className="text-3xl font-black">POST</div><div className="mt-1 text-sm text-white/55">Add graffiti anonymously</div></div><span className="text-4xl text-[#86ff62]">+</span></Link>
      <Link href="/stallworks/share" className={`${stallButton} min-h-24`}><div><div className="text-2xl font-black">PRINT / SHARE QR</div><div className="mt-1 text-sm text-white/50">Put STALLWORKS somewhere new</div></div><span className="text-3xl text-[#86ff62]">↗</span></Link>
      <Link href="/stallworks/wall" className={`${stallButton} min-h-24`}><div><div className="text-2xl font-black">VIEW THE WALL</div><div className="mt-1 text-sm text-white/50">See what humanity wrote</div></div><span className="text-3xl text-[#86ff62]">→</span></Link>
    </section>
    <footer className="pb-4 text-center font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#86ff62]/45">Post · Propagate · Observe</footer>
  </div></StallworksShell>;
}
