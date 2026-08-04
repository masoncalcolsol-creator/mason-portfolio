"use client";

import { ExternalLink, Music2, Play, Radio } from "lucide-react";
import AnvilUniversalStudioClient from "./AnvilUniversalStudioClient";

const FEDERAL_HELL_URL = "https://suno.com/s/2JivRn1WZHUtIHEI";

export default function AnvilStudioWithTracks() {
  return (
    <>
      <section className="session-output" aria-labelledby="federal-hell-title">
        <style>{`
          .session-output {
            --cyan: #72e6ff;
            --lime: #d8ff55;
            color: #f7f9fc;
            background:
              radial-gradient(circle at 84% 8%, rgba(114,230,255,.14), transparent 28rem),
              linear-gradient(145deg, #050609, #0b0d14 52%, #050609);
            border-bottom: 1px solid rgba(255,255,255,.09);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          .session-output-shell {
            width: min(1180px, calc(100% - 28px));
            margin: 0 auto;
            padding: 52px 0 34px;
          }
          .session-output-kicker {
            color: var(--cyan);
            font: 900 11px ui-monospace, SFMono-Regular, Menlo, monospace;
            letter-spacing: .15em;
            text-transform: uppercase;
          }
          .session-output-grid {
            display: grid;
            grid-template-columns: .78fr 1.22fr;
            gap: 18px;
            align-items: stretch;
            margin-top: 16px;
          }
          .session-output-copy,
          .session-output-player {
            border: 1px solid rgba(255,255,255,.13);
            border-radius: 25px;
            overflow: hidden;
            background: rgba(7,9,14,.84);
          }
          .session-output-copy { padding: 24px; }
          .session-output-copy h2 {
            margin: 12px 0 0;
            font-size: clamp(40px, 6vw, 74px);
            line-height: .9;
            letter-spacing: -.06em;
          }
          .session-output-copy p {
            color: #adb6c2;
            font-size: 16px;
            line-height: 1.62;
          }
          .session-output-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 18px;
          }
          .session-output-chip {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: 1px solid rgba(216,255,85,.28);
            border-radius: 999px;
            padding: 8px 11px;
            color: #eaffae;
            background: rgba(216,255,85,.055);
            font-size: 10px;
            font-weight: 900;
          }
          .session-output-player {
            min-height: 420px;
            display: flex;
            flex-direction: column;
          }
          .session-output-player-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
            padding: 18px 20px;
            border-bottom: 1px solid rgba(255,255,255,.09);
          }
          .session-output-player-head b { font-size: 18px; }
          .session-output-player-head span { color: #8d97a4; font-size: 11px; }
          .session-output iframe {
            width: 100%;
            min-height: 315px;
            flex: 1;
            border: 0;
            background: #0a0c11;
          }
          .session-output-actions {
            padding: 14px 18px 18px;
            border-top: 1px solid rgba(255,255,255,.09);
          }
          .session-output-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: 1px solid rgba(114,230,255,.32);
            border-radius: 999px;
            padding: 10px 14px;
            color: #050609;
            background: var(--cyan);
            text-decoration: none;
            font-size: 11px;
            font-weight: 900;
          }
          .session-output-note {
            margin: 11px 0 0;
            color: #7f8996;
            font-size: 11px;
            line-height: 1.5;
          }
          @media (max-width: 850px) {
            .session-output-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 680px) {
            .session-output-shell { width: min(100% - 20px, 1180px); padding-top: 38px; }
            .session-output-player { min-height: 390px; }
            .session-output iframe { min-height: 285px; }
          }
        `}</style>

        <div className="session-output-shell">
          <div className="session-output-kicker">CURRENT SESSION OUTPUT // 001</div>
          <div className="session-output-grid">
            <article className="session-output-copy">
              <Music2 size={28} color="var(--cyan)" />
              <h2 id="federal-hell-title">FEDERAL HELL</h2>
              <p>
                The first concrete track delivered into the universal ANVIL workroom. This card is
                a session receipt and listening point, not a new house style: the studio beneath it
                remains free to build any band in any musical direction.
              </p>
              <div className="session-output-meta">
                <span className="session-output-chip"><Radio size={13} /> NULLWORKS</span>
                <span className="session-output-chip">2:58</span>
                <span className="session-output-chip">STEREO · 48 kHz</span>
                <span className="session-output-chip">SESSION OUTPUT 001</span>
              </div>
            </article>

            <article className="session-output-player">
              <div className="session-output-player-head">
                <div><b>Federal Hell</b><br /><span>Suno share supplied by Mason Perry</span></div>
                <Play size={20} color="var(--lime)" />
              </div>
              <iframe
                src={FEDERAL_HELL_URL}
                title="Federal Hell by NULLWORKS on Suno"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
              />
              <div className="session-output-actions">
                <a className="session-output-link" href={FEDERAL_HELL_URL} target="_blank" rel="noreferrer">
                  <Play size={15} /> Open Federal Hell <ExternalLink size={14} />
                </a>
                <p className="session-output-note">
                  Embedded playback depends on Suno allowing the share page to render inside another site.
                  The direct-open button is the reliable fallback.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <AnvilUniversalStudioClient />
    </>
  );
}
