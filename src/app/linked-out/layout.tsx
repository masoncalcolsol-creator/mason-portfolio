import type { ReactNode } from "react";

export default function LinkedOutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="linkedOutRoute">
      {children}
      <style>{`
        .linkedOutRoute .hero {
          grid-template-columns: 1fr !important;
          gap: 42px !important;
          align-items: start !important;
        }

        .linkedOutRoute .heroCopy {
          max-width: 900px;
        }

        .linkedOutRoute .hero .poster {
          width: min(760px, 100%) !important;
          margin: 0 auto !important;
          padding: 12px !important;
          border-radius: 28px !important;
        }

        .linkedOutRoute .hero .poster img {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 2 / 3 !important;
          object-fit: contain !important;
          object-position: center !important;
          border-radius: 18px !important;
          background: #030405 !important;
        }

        .linkedOutRoute .hero .poster figcaption {
          text-align: center;
          margin: 13px 8px 4px !important;
        }

        .linkedOutRoute .posterWrap .poster {
          width: min(760px, 100%) !important;
          margin: 0 auto !important;
          min-height: 0 !important;
          aspect-ratio: 2 / 3 !important;
          padding: 0 !important;
          border-radius: 24px !important;
          background: #030405 url("/images/linked-out-parallel-universe-poster.svg?v=linked-out-paper-2") center / contain no-repeat !important;
          box-shadow: 0 35px 110px rgba(0,0,0,.52) !important;
        }

        .linkedOutRoute .posterWrap .poster > *,
        .linkedOutRoute .posterWrap .poster::after,
        .linkedOutRoute .posterWrap .caption {
          display: none !important;
        }

        @media (min-width: 1000px) {
          .linkedOutRoute .hero {
            padding-bottom: 90px !important;
          }
        }

        @media (max-width: 640px) {
          .linkedOutRoute .hero {
            gap: 30px !important;
          }

          .linkedOutRoute .hero .poster {
            width: 100% !important;
            padding: 7px !important;
            border-radius: 20px !important;
          }

          .linkedOutRoute .hero .poster img {
            border-radius: 14px !important;
          }

          .linkedOutRoute .posterWrap .poster {
            width: 100% !important;
            padding: 0 !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}
