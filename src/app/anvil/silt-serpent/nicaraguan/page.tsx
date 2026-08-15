import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./release.module.css";

export const metadata: Metadata = {
  title: "NICARAGUAN — SILT SERPENT | NULLWORKS // ANVIL",
  description: "One slow spark. One hour where the world cannot reach you. Listen to NICARAGUAN by SILT SERPENT, forged through NULLWORKS // ANVIL.",
  openGraph: {
    title: "NICARAGUAN — SILT SERPENT",
    description: "A one-hour vacation in a ring of smoke. An original SILT SERPENT song forged through NULLWORKS // ANVIL.",
    type: "music.song",
    images: [{ url: "/anvil/silt-serpent/nicaraguan-cover.png", width: 1536, height: 1536, alt: "SILT SERPENT — NICARAGUAN album cover" }],
  },
  twitter: { card: "summary_large_image", title: "NICARAGUAN — SILT SERPENT", description: "A one-hour vacation in a ring of smoke.", images: ["/anvil/silt-serpent/nicaraguan-cover.png"] },
};

const lyrics = `[Intro]\nNicaraguan\nSweet on the tongue\nLeather rose burning\nWhen the long day’s done\n\n[Verse 1]\nClock hit heavy\nHands still sore\nDust on my boots\nFrom the worksite floor\nPhone won’t stop\nWorld wants more\nI step outside\nAnd I close that door\nDark little flower\nWrapped up tight\nSweet on the draw\nIn the copper light\nOne slow spark\nOne deep breath\nLet the grind fall off\nLike a bad old debt\n\n[Pre-Chorus]\nNo race tonight\nNo war to win\nJust fire at the edge\nAnd the smoke rolling in\nI don’t need a plane\nI don’t need a sea\nJust one good hour\nWhere the world can’t reach me\n\n[Chorus]\nNicaraguan\nLeather rose\nLittle sweet fire\nWhen the evening slows\nNicaraguan\nLet it all go\nOne hour vacation\nIn a ring of smoke\nSweet like trouble\nSmooth like rain\nLeather rose\nTake me away\n\n[Verse 2]\nTastes like shade\nWhen the sun burns mean\nTastes like wood\nAnd a hidden green\nLittle bit of sugar\nLittle bit of earth\nLittle bit of silence\nThat knows what it’s worth\nTrumpet cries soft\nGuitar leans low\nSmoke curls up\nWhere the tired hearts go\nNo boss, no clock\nNo buzzing phone\nJust me and the night\nAnd the ember glow\n\n[Bridge]\nMira, mira\nSlow it down\nLet the smoke\nTurn the whole world brown\nWarm wind whisper\nSoft guitar\nFor one small hour\nI am somewhere far\nNo hurry\nNo pain\nNo grind\nNo chain\nJust ash\nJust air\nJust me\nRight there\n\n[Breakdown]\nDraw it slow\nDraw it slow\nLet it ride\nSweet dark rose\nBurning by my side\nDraw it slow\nLet it rise\nNicaragua\nIn my tired eyes\n\n[Final Chorus]\nNicaraguan\nLeather rose\nLittle sweet fire\nWhen the evening slows\nNicaraguan\nLet it all go\nOne hour vacation\nIn a ring of smoke\nSweet like trouble\nSmooth like rain\nLeather rose\nTake me away\n\n[Outro]\nNicaraguan\nSweet on the tongue\nLeather rose fading\nAnd the night feels young`;

export default function NicaraguanReleasePage() {
  return (
    <main className={styles.page}>
      <div className={styles.grain} aria-hidden="true" />
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/">NULLWORKS <span>{"// ANVIL"}</span></Link>
        <span className={styles.releaseTag}>FIELD RELEASE 001</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.artWrap}>
          <Image className={styles.art} src="/anvil/silt-serpent/nicaraguan-cover.png" alt="SILT SERPENT — NICARAGUAN album cover featuring a crystal ashtray, cigar, and smoke serpent" width={1536} height={1536} priority sizes="(max-width: 820px) 92vw, 48vw" />
          <span className={styles.stamp}>ORIGINAL MUSIC / 04:47</span>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>SILT SERPENT</p>
          <h1>NICARA<wbr />GUAN</h1>
          <p className={styles.lede}>One slow spark. One deep breath. One hour where the world cannot reach you.</p>
          <div className={styles.player}>
            <div className={styles.now}><span className={styles.pulse} /> <span>NOW PLAYING</span><b>NICARAGUAN</b></div>
            <audio controls preload="metadata" controlsList="nodownload" aria-label="Play NICARAGUAN by SILT SERPENT">
              <source src="/anvil/silt-serpent/NICARAGUAN.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>Headphones recommended. Let the whole thing breathe.</p>
          </div>
          <a className={styles.jump} href="#story">THE STORY BEHIND THE SONG ↓</a>
        </div>
      </section>

      <section className={styles.quote}>
        <p>“Little bit of silence<br />that knows what it’s worth.”</p>
      </section>

      <section className={styles.story} id="story">
        <div className={styles.sectionLabel}>THE OBJECT / THE SIGNAL</div>
        <div className={styles.storyGrid}>
          <h2>A $2.39 crystal ashtray found the song that was waiting for it.</h2>
          <div>
            <p>Goodwill marked it $2.99. The register took another twenty percent off. But the cuts still caught the light, the weight still carried the unknown hands that made it, and the object still knew exactly what it was.</p>
            <p><em>NICARAGUAN</em> lives in that same gap between price and value: sore hands after work, a phone that will not stop, one cigar, and a small private ritual that makes the world release its grip for an hour.</p>
            <p>The artifact and the song met by accident. The meaning did not.</p>
          </div>
        </div>
      </section>

      <section className={styles.anvil}>
        <div className={styles.sectionLabel}>NULLWORKS // ANVIL</div>
        <h2>Custom music is becoming a normal custom product.</h2>
        <p>You can order a shirt around your identity. A sticker around your joke. A print around your memory. Now you can forge an original song around your story, your person, your crew, your brand, or one strangely perfect object you found at Goodwill.</p>
        <div className={styles.cards}>
          <article><span>01</span><h3>Give us the signal.</h3><p>A memory, ritual, person, place, inside joke, product, event, or feeling.</p></article>
          <article><span>02</span><h3>We forge the world.</h3><p>Band identity, lyrics, sound, cover art, metadata, and a coherent release package.</p></article>
          <article><span>03</span><h3>You get the artifact.</h3><p>A song people can actually hear, share, remember, and connect back to you.</p></article>
        </div>
        <a className={styles.cta} href="mailto:hello@nullworks.ai?subject=ANVIL%20Custom%20Song">WHAT SHOULD YOUR STORY SOUND LIKE? →</a>
      </section>

      <section className={styles.lyricSection}>
        <details>
          <summary>READ THE FULL LYRICS <span>+</span></summary>
          <pre>{lyrics}</pre>
        </details>
      </section>

      <footer className={styles.footer}>
        <span>SILT SERPENT // NICARAGUAN</span>
        <span>FORGED THROUGH NULLWORKS // ANVIL</span>
      </footer>
    </main>
  );
}
