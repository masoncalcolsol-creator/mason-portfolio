'use client';

import type { ReactNode } from 'react';
import OscilloscopeBackground from '../receipt-wallet/OscilloscopeBackground';

export default function StallworksShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020806] text-white">
      <OscilloscopeBackground />
      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_50%_20%,rgba(80,255,90,0.09),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(50,255,100,0.05),transparent_34%)]" />
      <div className="relative z-[3] min-h-screen px-5 py-8">
        {children}
      </div>
    </main>
  );
}

export const stallButton = 'flex items-center justify-between rounded-3xl border border-[#75ff4f]/25 bg-black/70 px-6 py-5 text-white shadow-[0_0_28px_rgba(90,255,70,0.08)] backdrop-blur-sm transition active:scale-[.99]';
export const stallInput = 'mt-2 w-full rounded-2xl border border-[#75ff4f]/20 bg-black/75 p-4 text-base text-white outline-none placeholder:text-white/30 focus:border-[#75ff4f]/55';
