'use client';

import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import OscilloscopeBackground from '../../receipt-wallet/OscilloscopeBackground';

const url = 'https://mason-portfolio-main.vercel.app/stallworks';

const pooSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges">
  <rect width="64" height="64" fill="white"/>
  <g fill="black">
    <rect x="28" y="4" width="8" height="8"/>
    <rect x="20" y="12" width="24" height="8"/>
    <rect x="16" y="20" width="32" height="8"/>
    <rect x="12" y="28" width="40" height="8"/>
    <rect x="8" y="36" width="48" height="8"/>
    <rect x="4" y="44" width="56" height="12"/>
    <rect x="12" y="52" width="40" height="8"/>
  </g>
  <g fill="white">
    <rect x="20" y="36" width="8" height="8"/>
    <rect x="36" y="36" width="8" height="8"/>
    <rect x="28" y="48" width="8" height="4"/>
  </g>
</svg>`;
const pooDataUri = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pooSvg)}`;

export default function StallworksSharePage() {
  return (
    <main className="stallworks-scope min-h-screen px-5 py-8 text-white">
      <div className="stallworks-signal screen-only"><OscilloscopeBackground /></div>

      <div className="screen-only relative z-10 mx-auto max-w-md">
        <Link href="/stallworks" className="text-sm font-bold text-emerald-100/70">← STALLWORKS</Link>
        <h1 className="mt-6 text-4xl font-black">PROPAGATE IT.</h1>
        <p className="mt-2 text-sm text-white/65">
          The POO R code: a real QR with a pixel-poop embedded in its recoverable center region.
        </p>
        <button
          onClick={() => window.print()}
          className="mt-6 w-full rounded-full border border-[#6f9b77]/50 bg-[#4f7a58] px-5 py-4 font-black text-white"
        >
          PRINT POO R CODE
        </button>
      </div>

      <section className="label-stage relative z-10 mx-auto mt-8 flex max-w-md justify-center">
        <div className="stall-label">
          <div className="label-content">
            <div className="qr-wrap">
              <QRCodeSVG
                value={url}
                size={256}
                level="H"
                marginSize={4}
                bgColor="#ffffff"
                fgColor="#000000"
                imageSettings={{
                  src: pooDataUri,
                  x: undefined,
                  y: undefined,
                  height: 70,
                  width: 70,
                  excavate: true,
                }}
                className="stall-qr"
              />
            </div>
            <div className="scan-copy">SCAN INSTEAD OF SHARPIE</div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .stallworks-scope {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background:
            radial-gradient(circle at 78% 4%, rgba(79,122,88,.12), transparent 28rem),
            radial-gradient(circle at 15% 42%, rgba(79,122,88,.055), transparent 31rem),
            #050706;
        }
        .stallworks-signal { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .stall-label {
          position: relative;
          width: 1.1in;
          height: 3.5in;
          box-sizing: border-box;
          overflow: hidden;
          background: #fff;
          color: #000;
          text-align: center;
        }
        .label-content {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: .96in;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .qr-wrap {
          width: .82in;
          height: .82in;
          flex: 0 0 auto;
          margin: 0 auto;
        }
        .stall-qr {
          display: block;
          width: .82in !important;
          height: .82in !important;
          margin: 0 auto;
          image-rendering: pixelated;
        }
        .scan-copy {
          width: .96in;
          margin: .09in auto 0;
          font-size: 5.1pt;
          line-height: 1;
          font-weight: 900;
          letter-spacing: .015em;
          white-space: nowrap;
          text-align: center;
        }

        @media print {
          @page { size: 1.1in 3.5in; margin: 0; }
          html, body {
            width: 1.1in !important;
            height: 3.5in !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #fff !important;
          }
          .screen-only,
          .stallworks-signal,
          .nw-public-quicknav { display: none !important; }
          .stallworks-scope {
            width: 1.1in !important;
            height: 3.5in !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #fff !important;
            color: #000 !important;
          }
          .label-stage {
            display: block !important;
            width: 1.1in !important;
            height: 3.5in !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .stall-label {
            position: relative !important;
            width: 1.1in !important;
            height: 3.5in !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            break-after: avoid !important;
            page-break-after: avoid !important;
          }
          .label-content {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}
