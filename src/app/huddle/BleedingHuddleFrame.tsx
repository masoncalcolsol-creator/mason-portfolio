"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import BleedingMatrix from "../living-signals/BleedingMatrix";
import huddleStyles from "./huddle.module.css";
import styles from "./bleeding-huddle.module.css";

const THEME_KEY = "nw-huddle-theme-jason-rains";
const MATRIX_SKIN = "bleeding-matrix";

function cleanParam(value: string | null): string {
  return (value || "").replace(/[^a-zA-Z0-9 ._'~-]/g, "").slice(0, 120);
}

export default function BleedingHuddleFrame({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const requestedSkin = searchParams.get("skin") === MATRIX_SKIN;
  const mode = searchParams.get("mode") || "";
  const room = cleanParam(searchParams.get("room"));
  const [active, setActive] = useState(requestedSkin);
  const [inviteUrl, setInviteUrl] = useState("");
  const [pin, setPin] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (requestedSkin) {
      sessionStorage.setItem(THEME_KEY, MATRIX_SKIN);
      setActive(true);
      return;
    }
    setActive(sessionStorage.getItem(THEME_KEY) === MATRIX_SKIN);
  }, [requestedSkin]);

  useEffect(() => {
    if (!active || mode !== "host" || !room || typeof window === "undefined") {
      setInviteUrl("");
      setPin("");
      return;
    }

    const invite = new URL("/huddle", window.location.origin);
    invite.searchParams.set("mode", "guest");
    for (const key of ["room", "key", "ph", "exp", "host"]) {
      const value = searchParams.get(key);
      if (value) invite.searchParams.set(key, value);
    }
    invite.searchParams.set("skin", MATRIX_SKIN);
    invite.searchParams.set("profile", "jason-rains");
    setInviteUrl(invite.toString());
    setPin(sessionStorage.getItem(`nw-huddle-pin-${room}`) || "");
  }, [active, mode, queryString, room, searchParams]);

  const roomLabel = useMemo(() => room ? room.slice(0, 8).toUpperCase() : "STANDBY", [room]);

  const copyText = async (label: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1800);
  };

  const shareInvite = async () => {
    if (!inviteUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jason Rains // NULLWORKS Huddle",
          text: "Join the private Bleeding Matrix Huddle. The four-digit PIN is sent separately.",
          url: inviteUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyText("link", inviteUrl);
  };

  if (!active) return <>{children}</>;

  return (
    <div className={`${styles.matrixTheme} ${mode === "host" ? styles.hostMode : ""}`}>
      <BleedingMatrix accentRgb="255, 48, 72" />
      <style>{`
        .${styles.matrixTheme} .${huddleStyles.shell} {
          min-height: 100svh;
          overflow: visible;
          padding: 104px 14px 260px;
          color: #fff4f5;
          background: linear-gradient(rgba(5,2,4,.38), rgba(5,2,4,.66));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .${styles.matrixTheme} .${huddleStyles.gridGlow} {
          opacity: .34;
          background-image:
            linear-gradient(rgba(255,48,72,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,48,72,.08) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: linear-gradient(to bottom, black, transparent 94%);
        }
        .${styles.matrixTheme} .${huddleStyles.creatorCard},
        .${styles.matrixTheme} .${huddleStyles.panel},
        .${styles.matrixTheme} .${huddleStyles.livePanel},
        .${styles.matrixTheme} .${huddleStyles.transcriptPanel} {
          border-color: rgba(255,48,72,.34);
          background: linear-gradient(145deg, rgba(255,48,72,.11), rgba(10,3,5,.84));
          box-shadow: 0 30px 90px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.045), 0 0 42px rgba(255,48,72,.05);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .${styles.matrixTheme} .${huddleStyles.creatorCard} {
          margin-top: clamp(22px, 6vh, 62px);
          border-radius: 30px;
        }
        .${styles.matrixTheme} .${huddleStyles.eyebrow} {
          color: #ff3048;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-weight: 950;
          letter-spacing: .18em;
        }
        .${styles.matrixTheme} .${huddleStyles.creatorCard} h1,
        .${styles.matrixTheme} .${huddleStyles.roomHeader} h1 {
          color: #fff4f5;
          font-size: clamp(3rem, 13vw, 6.3rem);
          line-height: .82;
          letter-spacing: -.072em;
          text-shadow: 0 16px 60px rgba(0,0,0,.76), 0 0 32px rgba(255,48,72,.12);
        }
        .${styles.matrixTheme} .${huddleStyles.lead},
        .${styles.matrixTheme} .${huddleStyles.panel} > p,
        .${styles.matrixTheme} .${huddleStyles.transcriptEntry} p {
          color: #d2c4c7;
        }
        .${styles.matrixTheme} .${huddleStyles.fieldLabel} { color: #e3d4d7; }
        .${styles.matrixTheme} .${huddleStyles.fieldLabel} input {
          border-color: rgba(255,48,72,.28);
          border-radius: 16px;
          background: rgba(7,2,4,.82);
          color: #fff4f5;
          box-shadow: inset 0 0 24px rgba(255,48,72,.025);
        }
        .${styles.matrixTheme} .${huddleStyles.fieldLabel} input:focus {
          border-color: #ff3048;
          box-shadow: 0 0 0 4px rgba(255,48,72,.12), 0 0 28px rgba(255,48,72,.08);
        }
        .${styles.matrixTheme} .${huddleStyles.primaryButton},
        .${styles.matrixTheme} .${huddleStyles.secondaryButton},
        .${styles.matrixTheme} .${huddleStyles.dangerButton},
        .${styles.matrixTheme} .${huddleStyles.micButton},
        .${styles.matrixTheme} .${huddleStyles.textButton} {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-weight: 950;
          letter-spacing: .035em;
          text-transform: uppercase;
        }
        .${styles.matrixTheme} .${huddleStyles.primaryButton} {
          border: 1px solid rgba(255,255,255,.14);
          background: linear-gradient(135deg, #ff596d, #ff3048 54%, #b60824);
          color: #190106;
          box-shadow: 0 16px 42px rgba(255,48,72,.22), inset 0 1px 0 rgba(255,255,255,.26);
        }
        .${styles.matrixTheme} .${huddleStyles.secondaryButton} {
          border-color: rgba(255,48,72,.34);
          background: rgba(10,3,5,.82);
          color: #f5e8ea;
        }
        .${styles.matrixTheme} .${huddleStyles.micButton} {
          border: 1px solid rgba(255,48,72,.38);
          background: #fff0f2;
          color: #190106;
        }
        .${styles.matrixTheme} .${huddleStyles.micButton}.${huddleStyles.muted},
        .${styles.matrixTheme} .${huddleStyles.dangerButton} {
          border-color: rgba(255,48,72,.54);
          background: rgba(126,5,28,.58);
          color: #ffd9df;
        }
        .${styles.matrixTheme} .${huddleStyles.roomCode},
        .${styles.matrixTheme} .${huddleStyles.finePrint},
        .${styles.matrixTheme} .${huddleStyles.footerNote},
        .${styles.matrixTheme} .${huddleStyles.transcriptHeader} span,
        .${styles.matrixTheme} .${huddleStyles.transcriptEntry} time {
          color: #9c858b;
        }
        .${styles.matrixTheme} .${huddleStyles.statusPill} {
          background: rgba(7,2,4,.76);
          border-color: rgba(255,48,72,.28);
          color: #ff8898;
          backdrop-filter: blur(10px);
        }
        .${styles.matrixTheme} .${huddleStyles.participant} {
          border-color: rgba(255,48,72,.18);
          background: rgba(255,48,72,.035);
        }
        .${styles.matrixTheme} .${huddleStyles.liveDot} {
          background: #ff3048;
          box-shadow: 0 0 0 4px rgba(255,48,72,.12), 0 0 18px rgba(255,48,72,.78);
        }
        .${styles.matrixTheme} .${huddleStyles.waitDot} {
          background: #d78745;
          box-shadow: 0 0 0 4px rgba(215,135,69,.12);
        }
        .${styles.matrixTheme} .${huddleStyles.bigStatus} {
          border-left-color: #ff3048;
          background: rgba(255,48,72,.055);
          color: #eadadd;
        }
        .${styles.matrixTheme} .${huddleStyles.textButton},
        .${styles.matrixTheme} .${huddleStyles.transcriptEntry} strong {
          color: #ff7184;
        }
        .${styles.matrixTheme} .${huddleStyles.transcriptHeader} {
          border-bottom-color: rgba(255,48,72,.16);
        }
        .${styles.matrixTheme} .${huddleStyles.transcriptEntry} {
          border-bottom-color: rgba(255,48,72,.11);
        }
        .${styles.hostMode} .${huddleStyles.shareGrid} { display: none !important; }
        .${styles.hostMode} .${huddleStyles.panel} > p:first-of-type { display: none; }
        @media (max-width: 620px) {
          .${styles.matrixTheme} .${huddleStyles.shell} { padding: 92px 10px 278px; }
          .${styles.matrixTheme} .${huddleStyles.creatorCard} h1,
          .${styles.matrixTheme} .${huddleStyles.roomHeader} h1 { font-size: clamp(3rem, 17vw, 5rem); }
        }
      `}</style>

      <header className={styles.matrixNav}>
        <div>
          <span>NULLWORKS HUDDLE // PRIVATE VOICE</span>
          <strong>JASON RAINS <i>BLEEDING MATRIX</i></strong>
        </div>
        <div className={styles.matrixStatus}>ROOM {roomLabel} · LIVE EPHEMERAL</div>
      </header>

      {mode === "host" && room && inviteUrl && (
        <aside className={styles.matrixSharePanel} aria-label="Jason Rains Matrix Huddle invite controls">
          <div>
            <span>JASON INVITE RAIL</span>
            <strong>Send the Matrix link. Send the PIN separately.</strong>
          </div>
          <div className={styles.shareActions}>
            <button type="button" onClick={() => void shareInvite()}>{copied === "link" ? "LINK COPIED" : "SHARE MATRIX LINK"}</button>
            <button type="button" disabled={!pin} onClick={() => void copyText("pin", pin)}>{copied === "pin" ? "PIN COPIED" : `COPY PIN ${pin || "----"}`}</button>
          </div>
        </aside>
      )}

      <div className={styles.huddleContent}>{children}</div>
    </div>
  );
}
