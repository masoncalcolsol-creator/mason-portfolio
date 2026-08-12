import type { ReactNode } from "react";

export default function PersonalSoundtrackLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .sampler-page > div[aria-hidden="true"] { opacity: .72 !important; }
        .sampler-page h1 span {
          color: transparent !important;
          -webkit-text-stroke: 1.35px rgba(255,255,255,.92) !important;
          text-shadow: 0 0 22px rgba(0,0,0,.55) !important;
        }
      `}</style>
      {children}
    </>
  );
}
