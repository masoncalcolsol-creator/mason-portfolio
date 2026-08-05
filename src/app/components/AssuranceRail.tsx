"use client";

import { usePathname } from "next/navigation";

export default function AssuranceRail() {
  const pathname = usePathname();

  if (pathname === "/assurance" || pathname.startsWith("/ciris-review")) {
    return null;
  }

  return (
    <>
      <a className="nw-assurance-rail" href="/assurance" aria-label="Open NULLWORKS AI operational assurance services">
        <span className="nw-assurance-pulse" aria-hidden="true" />
        <span className="nw-assurance-copy">
          <b>AI Assurance</b>
          <small>Start with Triage</small>
        </span>
        <span className="nw-assurance-arrow" aria-hidden="true">→</span>
      </a>
      <style jsx global>{`
        .nw-assurance-rail {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 90;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 210px;
          padding: 11px 13px;
          border: 1px solid rgba(255, 106, 26, 0.48);
          border-radius: 999px;
          background: linear-gradient(145deg, rgba(17, 22, 30, 0.95), rgba(9, 12, 18, 0.97));
          color: #f8f6f2;
          text-decoration: none;
          box-shadow: 0 18px 48px rgba(0,0,0,.38), 0 0 28px rgba(255,106,26,.11);
          backdrop-filter: blur(16px);
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .nw-assurance-rail:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 145, 66, 0.78);
          box-shadow: 0 22px 58px rgba(0,0,0,.45), 0 0 34px rgba(255,106,26,.18);
        }
        .nw-assurance-pulse {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ff6a1a;
          box-shadow: 0 0 0 5px rgba(255,106,26,.11), 0 0 18px rgba(255,106,26,.65);
          flex: 0 0 auto;
        }
        .nw-assurance-copy {
          display: grid;
          line-height: 1.05;
          flex: 1;
        }
        .nw-assurance-copy b {
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .nw-assurance-copy small {
          margin-top: 4px;
          color: #ffbd65;
          font-size: 11px;
          font-weight: 800;
        }
        .nw-assurance-arrow {
          color: #ff8c38;
          font-size: 19px;
          font-weight: 900;
        }
        @media (max-width: 640px) {
          .nw-assurance-rail {
            left: 12px;
            right: 12px;
            bottom: max(12px, env(safe-area-inset-bottom));
            min-width: 0;
            justify-content: center;
          }
        }
        @media print {
          .nw-assurance-rail { display: none !important; }
        }
      `}</style>
    </>
  );
}
