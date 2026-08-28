'use client';

import Link from 'next/link';
import StallworksShell, { stallButton } from './StallworksShell';

export default function StallworksPage() {
  return <StallworksShell><div className="mx-auto flex min-h-[86vh] max-w-md flex-col justify-between">
    <header className="pt-5">
      <div className="sw-accent font-mono text-[11px] font-black tracking-[.28em]">NULLWORKS // FIELD ALPHA</div>
      <h1 className="mt-5 text-6xl font-black tracking-[-.06em] text-white">STALLWORKS</h1>
      <p className="sw-muted mt-3 max-w-sm text-lg font-semibold leading-relaxed">A living archive of bathroom graffiti.</p>
    </header>
    <section className="my-10 grid gap-4">
      <Link href="/stallworks/post" className={`${stallButton} sw-primary min-h-28 px-6 py-6`}><div><div className="text-3xl font-black text-white">POST</div><div className="sw-muted mt-1 text-sm">Add graffiti anonymously</div></div><span className="sw-accent text-4xl" aria-hidden>+</span></Link>
      <Link href="/stallworks/share" className={`${stallButton} min-h-24 px-6 py-5`}><div><div className="text-2xl font-black text-white">PRINT / SHARE QR</div><div className="sw-muted mt-1 text-sm">Put STALLWORKS somewhere new</div></div><span className="sw-accent text-3xl" aria-hidden>↗</span></Link>
      <Link href="/stallworks/wall" className={`${stallButton} min-h-24 px-6 py-5`}><div><div className="text-2xl font-black text-white">VIEW THE WALL</div><div className="sw-muted mt-1 text-sm">See what humanity wrote</div></div><span className="sw-accent text-3xl" aria-hidden>→</span></Link>
    </section>
    <footer className="sw-accent pb-4 text-center font-mono text-[10px] font-bold uppercase tracking-[.22em] opacity-50">Post · Propagate · Observe</footer>
  </div></StallworksShell>;
}
