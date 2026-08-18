"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LivingSignalCanvas from "../living-signals/LivingSignalCanvas";
import OscilloscopeBackground from "../receipt-wallet/OscilloscopeBackground";
import styles from "./athlete.module.css";

const sports = {
  football: { label: "Football", accent: "101,255,135", mode: "receipts", mark: "01", line: "OWN THE MOMENT", copy: "Walkout. Rivalry. Season film. One athlete-owned identity across every cut." },
  ufc: { label: "UFC", accent: "255,69,69", mode: "orbit", mark: "02", line: "ENTER WITH INTENT", copy: "A walkout is more than an entrance. It is the first round of the story." },
  supercross: { label: "Supercross", accent: "132,255,72", mode: "scope", mark: "03", line: "THE GATE DROPS", copy: "Rider, machine, sponsor and crowd—compressed into one recognizable signal." },
  nascar: { label: "NASCAR", accent: "255,205,62", mode: "conveyor", mark: "04", line: "BUILT AT SPEED", copy: "Launch films, race-week edits and sponsor media without returning to a stock library." },
  snowboarding: { label: "Snowboarding", accent: "138,218,255", mode: "sonar", mark: "05", line: "LEAVE A LINE", copy: "A cinematic identity for mountain films, contest runs and the quiet before the drop." },
  soccer: { label: "Soccer", accent: "102,244,203", mode: "operator", mark: "06", line: "ONE TOUCH AHEAD", copy: "Club, country and athlete campaigns can share a sound without losing the individual." },
  baseball: { label: "Baseball", accent: "255,150,112", mode: "memory", mark: "07", line: "MAKE THE INNING YOURS", copy: "At-bat themes, player stories and sponsor-safe season media built from the same canon." },
} as const;

const identities = {
  samurai: { label: "Samurai", title: "DISCIPLINE // STEEL", note: "Japanese doom · ceremonial weight · controlled force" },
  outlaw: { label: "Outlaw", title: "DUST // OCTANE", note: "Modern western · earned confidence · open road" },
  machine: { label: "Machine", title: "PULSE // PRESSURE", note: "Industrial techno · mechanical rhythm · night event" },
} as const;

type SportKey = keyof typeof sports;
type IdentityKey = keyof typeof identities;

export default function AthleteExperience() {
  const [sport, setSport] = useState<SportKey>("supercross");
  const [identity, setIdentity] = useState<IdentityKey>("machine");
  const active = sports[sport];
  const sonic = identities[identity];
  const visualMode = useMemo(() => active.mode === "operator" ? "orbit" : active.mode, [active.mode]);

  return (
    <main className={styles.page} style={{ "--accent-rgb": active.accent } as React.CSSProperties} data-sport={sport}>
      {active.mode === "scope" ? <OscilloscopeBackground /> : <LivingSignalCanvas mode={visualMode as "receipts" | "orbit" | "conveyor" | "sonar" | "memory"} accentRgb={active.accent} />}
      <div className={styles.sportField} aria-hidden="true"><i /><i /><i /><i /></div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>NULLWORKS <b>{"// ANVIL"}</b></Link>
        <div className={styles.sports} aria-label="Choose a sport">
          {(Object.keys(sports) as SportKey[]).map((key) => <button key={key} className={sport === key ? styles.active : ""} onClick={() => setSport(key)}>{sports[key].label}</button>)}
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.kicker}>ATHLETE X / LIVE CAMPAIGN CONCEPT / {active.mark}</div>
        <h1>{active.line}</h1>
        <p>{active.copy}</p>
        <div className={styles.actions}><Link href="/athlete-x/answer-loud">Watch ANSWER LOUD ▶</Link><a className={styles.secondary} href="#system">See the system</a></div>
        <aside className={styles.status}><span>CONCEPT SIGNAL</span><b>{active.label.toUpperCase()}</b><small>Simulated visual atmosphere · media-ready page architecture</small></aside>
      </section>

      <section id="sound" className={styles.section}>
        <div className={styles.sectionTop}><div><span>01 / SONIC IDENTITIES</span><h2>Same athlete. Different campaign language.</h2></div><p>The story stays true while genre, market and visual treatment change around it.</p></div>
        <div className={styles.identityTabs}>{(Object.keys(identities) as IdentityKey[]).map((key) => <button key={key} className={identity === key ? styles.active : ""} onClick={() => setIdentity(key)}>{identities[key].label}</button>)}</div>
        <article className={styles.player}>
          <div className={styles.cover}><span>ANVIL / ATHLETE X</span><strong>{sonic.title}</strong><em>{active.label} campaign edition</em></div>
          <div className={styles.track}><span>NOW PREVIEWING</span><h3>{sonic.title}</h3><p>{sonic.note}</p><div className={styles.transport}><button aria-label="Play concept preview">▶</button><div><i /><b /></div><time>00:00 / MEDIA SLOT</time></div><small>Final mastered audio will replace this labeled concept slot.</small></div>
        </article>
      </section>

      <section id="system" className={styles.section}>
        <div className={styles.sectionTop}><div><span>02 / ONE IDENTITY SYSTEM</span><h2>Built once. Deployed everywhere.</h2></div></div>
        <div className={styles.grid}>
          {[['01','DISCOVER','Athlete story, taste, footage, goals and sponsor boundaries.'],['02','FORGE','Original tracks, variants, edits and language-market versions.'],['03','APPROVE','Athlete and sponsor review before the campaign leaves the room.'],['04','DEPLOY','Social, broadcast, event, QR, documentary and sponsor channels.']].map(([n,t,c]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{c}</p></article>)}
        </div>
      </section>

      <section className={styles.manifesto}><span>THE ANVIL ADVANTAGE</span><h2>The athlete stops borrowing a soundtrack and starts building an asset.</h2><p>One governed creative canon can produce sponsor-safe music, regional variants, social cuts and campaign pages without making the athlete sound generic.</p><a href="mailto:masoncalcolsol@gmail.com?subject=ANVIL%20Athlete%20Soundtrack%20Pilot">Build an athlete pilot →</a></section>
      <footer>NULLWORKS // ANVIL · Athlete X is a fictional demonstration. Visual signals are simulated and are not athlete telemetry. <Link href="/living-signals">Living Signal Framework</Link></footer>
    </main>
  );
}
