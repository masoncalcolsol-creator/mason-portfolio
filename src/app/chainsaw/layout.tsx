import type { ReactNode } from "react";

export default function ChainsawLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .page .nav {
          background: #101820 !important;
          color: #ffffff !important;
          border: 1px solid #101820 !important;
          border-radius: 0 0 34px 34px !important;
          padding-left: 22px !important;
          padding-right: 22px !important;
          box-shadow: 0 8px 0 rgba(216, 77, 0, .13) !important;
        }
        .page .nav .brand,
        .page .nav .back {
          color: #ffffff !important;
          opacity: 1 !important;
          text-shadow: none !important;
        }
        .page .nav .brand span {
          color: #ff5b00 !important;
        }
        .page .heroCopy h1,
        .page .heroCopy h1 * {
          opacity: 1 !important;
          text-shadow: none !important;
        }
        .page .heroCopy h1 {
          color: #101820 !important;
          -webkit-text-fill-color: #101820 !important;
        }
        .page .heroCopy h1 span {
          color: #d84d00 !important;
          -webkit-text-fill-color: #d84d00 !important;
        }
        .page .heroCopy .lead,
        .page .heroCopy .copy {
          opacity: 1 !important;
          text-shadow: none !important;
        }
        .page .photoFrame figcaption {
          display: none !important;
        }
        @media (max-width: 780px) {
          .page .nav {
            margin-left: -16px !important;
            margin-right: -16px !important;
            width: calc(100% + 32px) !important;
            padding-left: 30px !important;
            padding-right: 30px !important;
          }
          .page .heroCopy h1 {
            font-size: clamp(62px, 20vw, 88px) !important;
            line-height: .86 !important;
          }
          .page .visualText strong {
            font-size: 31px !important;
            line-height: 1.02 !important;
          }
          .page .visualText span {
            font-size: 16px !important;
            line-height: 1.45 !important;
          }
        }
      `}</style>
      {children}
    </>
  );
}
