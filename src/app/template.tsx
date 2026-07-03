import type { ReactNode } from "react";
import "./home-cinematic-global.css";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        [aria-label="OI SUITe visual operating model"] {
          background-color: #050b12 !important;
          background-image: url('/rendersmith-oi-suite-hero.svg') !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: contain !important;
        }
        [aria-label="OI SUITe visual operating model"] > * {
          opacity: 0 !important;
        }
      `}</style>
      {children}
    </>
  );
}
