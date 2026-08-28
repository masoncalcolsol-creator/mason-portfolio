'use client';

import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import OscilloscopeBackground from '../../receipt-wallet/OscilloscopeBackground';

const url = 'https://mason-portfolio-main.vercel.app/stallworks';

export default function StallworksSharePage() {
  return (
    <main className="stallworks-scope min-h-screen px-5 py-8 text-white">
      <div className="stallworks-signal screen-only"><OscilloscopeBackground /></div>

      <div className="screen-only relative z-10 mx-auto max-w-md">
        <Link href="/stallworks" className="text-sm font-bold text-emerald-100/70">← STALLWORKS</Link>
        <h1 className="mt-6 text-4xl font-black">PROPAGATE IT.</h1>
        <p className="mt-2 text-sm text-white/65">
          One real QR. One label. Scan the digital wall instead of taking a Sharpie to the physical one.
        </p>
        <button
          onClick={() => window.print()}
          className="mt-6 w-full rounded-full border border-[#6f9b77]/50 bg-[#4f7a58] px-5 py-4 font-black text-white"
        >
          PRINT STALLWORKS QR
        </button>
      </div>

      <section className="label-stage relative z-10 mx-auto mt-8 flex max-w-md justify-center">
        <div className="stall-label">
          <div className="stall-wordmark">STALLWORKS</div>

          <div className="poo-mark" aria-hidden="true">
            <span className="poo-row poo-row-1" />
            <span className="poo-row poo-row-2" />
            <span className="poo-row poo-row-3" />
          </div>

          <div className="qr-wrap">
            <QRCodeSVG
              value={url}
              size={256}
              level="H"
              marginSize={4}
              bgColor="#ffffff"
              fgColor="#000000"
              className="stall-qr"
            />
          </div>

          <div className="scan-copy">SCAN THE WALL</div>
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
          width: 1.4in;
          height: 3.5in;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: #fff;
          color: #000;
          padding: .12in .10in .10in;
          text-align: center;
        }
        .stall-wordmark {
          font-size: 7.5pt;
          line-height: 1;
          font-weight: 900;
          letter-spacing: .18em;
          white-space: nowrap;
        }

        /* Simple poop silhouette made from plain thermal-printer-safe black blocks.
           It is decorative only. The QR below remains completely standards-compliant. */
        .poo-mark {
          width: .52in;
          height: .24in;
          margin-top: .08in;
          position: relative;
          flex: 0 0 auto;
        }
        .poo-row {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: block;
          height: .065in;
          background: #000;
          border-radius: .025in;
        }
        .poo-row-1 { top: 0; width: .18in; }
        .poo-row-2 { top: .073in; width: .34in; }
        .poo-row-3 { top: .146in; width: .50in; }

        .qr-wrap {
          margin-top: .08in;
          width: 1.02in;
          height: 1.02in;
          flex: 0 0 auto;
        }
        .stall-qr {
          display: block;
          width: 1.02in !important;
          height: 1.02in !important;
        }
        .scan-copy {
          margin-top: .08in;
          font-size: 7pt;
          line-height: 1;
          font-weight: 900;
          letter-spacing: .08em;
          white-space: nowrap;
        }

        @media print {
          @page { size: 1.4in 3.5in; margin: 0; }
          html, body {
            width: 1.4in !important;
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
            width: 1.4in !important;
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
            width: 1.4in !important;
            height: 3.5in !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .stall-label {
            width: 1.4in !important;
            height: 3.5in !important;
            margin: 0 !important;
            box-shadow: none !important;
            break-after: avoid !important;
            page-break-after: avoid !important;
          }
        }
      `}</style>
    </main>
  );
}
