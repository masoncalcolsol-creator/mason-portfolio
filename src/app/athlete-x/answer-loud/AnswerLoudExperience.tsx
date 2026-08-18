"use client";

import Link from "next/link";
import { useRef } from "react";
import styles from "./answer-loud.module.css";

const chapters = [
  { sport: "Supercross", artist: "CROWNROT", time: 12, cue: "Gate drop" },
  { sport: "UFC", artist: "BAKED POTATOES", time: 40, cue: "Walkout" },
  { sport: "NASCAR", artist: "9 VOLT", time: 67, cue: "Redline" },
  { sport: "Football", artist: "BLACKWIRE UNION", time: 95, cue: "Touchdown" },
  { sport: "Baseball", artist: "MOUNTAIN LORDS", time: 123, cue: "Walk-off" },
  { sport: "Snowboarding", artist: "VHS GRUDGE", time: 146, cue: "Drop in" },
  { sport: "Women’s Soccer", artist: "RED CARD ROSE", time: 174, cue: "Goal" },
];

export default function AnswerLoudExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const jumpTo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    void video.play();
    video.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link className={styles.brand} href="/">NULLWORKS <b>{"// ANVIL"}</b></Link>
        <div><span>PROOF CUT 01</span><Link href="/athlete-x">ATHLETE X ↗</Link></div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.eyebrow}>CUSTOM SONIC IDENTITY FOR ATHLETES</div>
        <h1>YOUR MOMENT.<br /><em>YOUR SOUND.</em></h1>
        <p>Seven sports. Seven original identities. One proof that athletes should sound as unmistakable as they look.</p>
        <div className={styles.actions}><button onClick={() => jumpTo(0)}>▶ WATCH THE FILM</button><a href="#chapters">CHOOSE A SPORT ↓</a></div>
        <div className={styles.meta}><span>03:47</span><span>7 SPORTS</span><span>9 ORIGINAL CUES</span><span>ATHLETE X // ANVIL</span></div>
      </section>

      <section className={styles.film}>
        <div className={styles.frame}>
          <header><span>ANSWER_LOUD_MASTER_01</span><span>HD // REVIEW</span></header>
          <video ref={videoRef} controls playsInline preload="metadata">
            <source src="https://drive.google.com/uc?export=download&id=1FqEDL8d0XG-mxhqnGMyM0TBjYihkqgc1" type="video/mp4" />
          </video>
        </div>
        <p>TURN IT UP. THE TRANSITIONS ARE THE PRODUCT.</p>
      </section>

      <section id="chapters" className={styles.chapters}>
        <div className={styles.heading}><span>THE SEVEN PROOFS</span><h2>ONE ATHLETE.<br />ONE MOMENT.<br /><em>ONE SOUND NOBODY ELSE OWNS.</em></h2></div>
        <div className={styles.chapterGrid}>{chapters.map((chapter, index) => (
          <button key={chapter.sport} onClick={() => jumpTo(chapter.time)}>
            <span>0{index + 1}</span><i>{chapter.cue}</i><strong>{chapter.sport}</strong><small>{chapter.artist}</small><b>PLAY ↗</b>
          </button>
        ))}</div>
      </section>

      <section className={styles.manifesto}>
        <div>A/X—01</div><div><span>THE IDEA</span><h2>STOP BORROWING A VIBE.<br />BUILD AN IDENTITY.</h2></div>
        <div><p>Walkout songs, goal celebrations, opening ceremonies, race edits and highlight reels all tell the crowd who just arrived.</p><p>Athlete Soundtracks forges original music around the athlete, the sport, the footage and the exact moment.</p></div>
      </section>

      <section className={styles.handoff}><p>THE FILM IS THE PROOF.<br />ATHLETE X IS THE SYSTEM.</p><Link href="/athlete-x">ENTER ATHLETE X ↗</Link></section>
      <footer><span>NULLWORKS // ANVIL</span><span>ATHLETE SOUNDTRACKS // 2026</span><Link href="/">MASON PERRY PORTFOLIO ↗</Link></footer>
    </main>
  );
}
