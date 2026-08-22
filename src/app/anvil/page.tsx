import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANVIL // The Living Music Universe",
  description:
    "A living reverse-chronology of the NULLWORKS // ANVIL music universe: songs, artists, ancestry, influence, and the fictional history connecting them.",
};

type TimelineEntry = {
  year: string;
  era: string;
  artist: string;
  title: string;
  kind: "CANON" | "PROOF" | "PUBLISHED" | "ANCESTOR";
  description: string;
  roots: string[];
  url?: string;
  accent: string;
};

const timeline: TimelineEntry[] = [
  {
    year: "2026",
    era: "PRESENT DAY",
    artist: "GODSCROTUM",
    title: "HARRY PLOPPINS // lineage experiment",
    kind: "PROOF",
    description:
      "A descendant song forced backward through another phenotype. The point is not the joke. The point is that the performer identity survives violent changes in style.",
    roots: ["modern ANVIL", "9 VOLT composition", "REX lineage experiments"],
    url: "https://suno.com/s/pnAkXcc4dZ4eI4VQ",
    accent: "#ff4d57",
  },
  {
    year: "1982",
    era: "MATURE HARD ROCK",
    artist: "9 VOLT",
    title: "VEX LIKES SEX",
    kind: "CANON",
    description:
      "Mature 9 VOLT: harder, tighter, more theatrical, and fully in command of the amplification language the band spent years learning the ugly way.",
    roots: ["1978 9 VOLT", "proto-9 VOLT punk", "Rex family line"],
    accent: "#f6b73c",
  },
  {
    year: "1978",
    era: "ESTABLISHED 9 VOLT",
    artist: "9 VOLT",
    title: "HARRY PLOPPINS",
    kind: "CANON",
    description:
      "The band is recognizably 9 VOLT but still rougher than 1982. A useful midpoint in the reverse-built discography.",
    roots: ["AMPLIFIED", "proto-punk recordings", "scavenged amplification"],
    accent: "#f6b73c",
  },
  {
    year: "1973",
    era: "FIRST RECORD",
    artist: "9 VOLT",
    title: "AMPLIFIED",
    kind: "CANON",
    description:
      "The first record. Systems people discovering music. The cover is an abused amplifier with old masking tape marked 9V MIN, the practical threshold that accidentally names the band.",
    roots: ["BURNING WIRE", "TOO FUCKING LOUD", "IRON WIRE STUDY"],
    accent: "#f6b73c",
  },
  {
    year: "c. 1970",
    era: "FOUND TAPE",
    artist: "proto-9 VOLT",
    title: "BURNING WIRE",
    kind: "PROOF",
    description:
      "Young Vex and friends as frantic punk-adjacent systems kids: scavenged amps, crude wiring, raw repetition, no classical training, and the first stable glimpse of the 9 VOLT phenotype.",
    roots: ["IRON WIRE STUDY", "Rex club infrastructure", "punk / raw amplified rock"],
    url: "https://suno.com/s/UTMotnsEaXeIwMdL",
    accent: "#f6b73c",
  },
  {
    year: "1966-67",
    era: "THE BREAK",
    artist: "proto-BLOOD PAGODA",
    title: "THE UNIVERSITY INCIDENT",
    kind: "CANON",
    description:
      "An unnamed scholarship student rigs a university rehearsal with amplification, gets the orchestra to perform his experiment, records it, loses the scholarship, and discovers the path that becomes BLOOD PAGODA.",
    roots: ["classical training", "amplification", "stolen museum pump organ"],
    accent: "#c246ff",
  },
  {
    year: "c. 1967",
    era: "SIX MONTHS AFTER EXPULSION",
    artist: "unnamed proto-BLOOD PAGODA",
    title: "閉じた門 (Tojita Mon) // The Closed Gate",
    kind: "CANON",
    description:
      "Classically trained young musicians discover how badly they can record amplification. Electric cello, crude guitar, microphone feedback, tape dubbing, and furious precision. Same band, younger.",
    roots: ["university orchestra", "DEAD SUN MASS ancestry", "early amplification"],
    url: "https://suno.com/s/vOYi7rcvZiPPFjkd",
    accent: "#c246ff",
  },
  {
    year: "c. 1967",
    era: "PROTO RECORDING ROOM",
    artist: "unnamed proto-BLOOD PAGODA",
    title: "赤いランプ (Akai Ranpu) // The Red Lamp",
    kind: "CANON",
    description:
      "School-recorded classical parts are dubbed into after-hours amplified sessions. Brass-trained guitar thinking, string-trained bass thinking, feedback, overload, and a malfunctioning stolen pump organ.",
    roots: ["classical school tapes", "home dubbing", "museum pump organ"],
    url: "https://suno.com/s/ZB1C2bANRXMPYfWy",
    accent: "#c246ff",
  },
  {
    year: "1955",
    era: "ENGLAND",
    artist: "REX FAMILY LINE",
    title: "VEX IS BORN",
    kind: "ANCESTOR",
    description:
      "Rex finally settles down around the end of his performing career and runs a club. Vex grows up as hired help from day one, learning cables, speakers, repairs, PA systems, and the machinery behind music.",
    roots: ["Rex & The Wreckers", "club infrastructure", "British friends"],
    accent: "#63d2ff",
  },
  {
    year: "1948",
    era: "POSTWAR JAPAN",
    artist: "REX FAMILY LINE",
    title: "THE UNNAMED SON",
    kind: "ANCESTOR",
    description:
      "A child Rex never knows about is born to the Japanese translator he loved briefly but genuinely. Raised by relatives as Japanese, he grows into a gifted scholarship musician. He is never named in canon.",
    roots: ["Yokohama 1947", "Japanese reconstruction", "Rex"],
    accent: "#63d2ff",
  },
  {
    year: "1947",
    era: "YOKOHAMA",
    artist: "REX & THE WRECKERS",
    title: "WHEN THE LIGHTS COME BACK",
    kind: "CANON",
    description:
      "The capstone Rex song. A US military entertainment tour crosses a Japanese reconstruction translator's life. Their relationship is real, brief, hopeful, and unknowingly seeds the BLOOD PAGODA branch.",
    roots: ["jump jazz", "swing", "postwar dance halls"],
    url: "https://suno.com/s/nTGgb0MHomMqCt27",
    accent: "#63d2ff",
  },
  {
    year: "late 1940s",
    era: "NIGHTCLUB YEARS",
    artist: "REX & THE WRECKERS",
    title: "SPIN ME AROUND",
    kind: "CANON",
    description:
      "Rex sings swing, not exaggerated crooner pastiche. Fast, physical dance-floor music from a working band with smoke-worn polish earned one club at a time.",
    roots: ["jump jazz", "working dance bands", "Rex vocal phenotype"],
    url: "https://suno.com/s/PEQnNe0nibngZj7P",
    accent: "#63d2ff",
  },
  {
    year: "late 1940s",
    era: "AFTER HOURS",
    artist: "REX & THE WRECKERS",
    title: "THE LAST TABLE FOR TWO",
    kind: "CANON",
    description:
      "A slower late-night side of the same band: two people refusing to let the night end while the room is literally being closed around them.",
    roots: ["My Mind Goes Wandering", "small-club jazz", "late-career Rex"],
    url: "https://suno.com/s/H3zCwIIzkRzozwn8",
    accent: "#63d2ff",
  },
  {
    year: "late 1940s",
    era: "MASTER SEED",
    artist: "REX & THE WRECKERS",
    title: "MY MIND GOES WANDERING",
    kind: "CANON",
    description:
      "The first Rex-native composition and the point where Rex stops being a mutation of a later song and becomes a portable artist phenotype of his own.",
    roots: ["1940s jazz mutation", "higher worn tenor", "small working ensemble"],
    accent: "#63d2ff",
  },
  {
    year: "1890-1915",
    era: "ANCESTRAL COMPOSITION",
    artist: "DEAD SUN MASS",
    title: "MASS FOR A DEAD SUN",
    kind: "ANCESTOR",
    description:
      "Obscure imagined European sacred composition: pump organ, low brass, cello, contrabass, repetition, dissonance, sustain, patience. Heavy before metal has a vocabulary for heavy.",
    roots: ["pump organ", "late Romantic / early modernist composition", "physical low-frequency mass"],
    accent: "#d8d1c2",
  },
  {
    year: "1895-1910",
    era: "ANCESTRAL RIFF STUDY",
    artist: "IRON WIRE STUDY",
    title: "FOUR NOTES BEFORE ELECTRIC GUITAR",
    kind: "ANCESTOR",
    description:
      "A low-string chamber study designed around a blunt four-note contrabass figure. It becomes the neutral mechanical ancestor used to test how 9 VOLT evolves under different stylistic pressure.",
    roots: ["contrabass", "cello pursuit", "riff ancestry"],
    accent: "#d8d1c2",
  },
];

const branches = [
  { name: "REX & THE WRECKERS", years: "1940s-50s", detail: "family root / swing / jump jazz", color: "#63d2ff" },
  { name: "unnamed Japanese son", years: "1948", detail: "classical scholarship / reconstruction-era Japan", color: "#c246ff" },
  { name: "BLOOD PAGODA", years: "1960s onward", detail: "music people discover systems", color: "#c246ff" },
  { name: "VEX", years: "1955", detail: "club kid / systems-first musician", color: "#f6b73c" },
  { name: "9 VOLT", years: "1970s onward", detail: "systems people discover music", color: "#f6b73c" },
  { name: "later ANVIL", years: "1980s-2026", detail: "descendants, covers, mutations, athlete music, modern bands", color: "#ff4d57" },
];

export default function AnvilUniversePage() {
  return (
    <main className="anvilPage">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #070707; }
        .anvilPage { min-height:100vh; color:#eee9df; background:
          radial-gradient(circle at 85% 3%, rgba(194,70,255,.12), transparent 23rem),
          radial-gradient(circle at 10% 20%, rgba(246,183,60,.08), transparent 28rem),
          linear-gradient(#070707,#0d0c0b 45%,#060606); font-family: Arial, Helvetica, sans-serif; overflow:hidden; }
        .hero { min-height:92vh; display:flex; align-items:flex-end; padding: clamp(28px,6vw,86px); position:relative; border-bottom:1px solid #26231f; }
        .hero:before { content:""; position:absolute; inset:0; background:repeating-linear-gradient(90deg, transparent 0 79px, rgba(255,255,255,.018) 80px); pointer-events:none; }
        .kicker { font:700 12px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:.22em; color:#a89f91; margin-bottom:18px; }
        h1 { font-size:clamp(48px,11vw,150px); line-height:.82; letter-spacing:-.065em; margin:0; max-width:1100px; text-transform:uppercase; }
        .heroCopy { max-width:760px; margin-top:28px; font-size:clamp(17px,2vw,23px); line-height:1.5; color:#bdb5a9; }
        .heroCopy b { color:#fff7e6; }
        .scrollCue { position:absolute; right:clamp(24px,6vw,80px); bottom:42px; writing-mode:vertical-rl; font:700 10px ui-monospace,monospace; letter-spacing:.22em; color:#716a60; }
        .section { width:min(1180px, calc(100% - 32px)); margin:0 auto; padding:96px 0; }
        .sectionTitle { display:flex; gap:18px; align-items:baseline; border-bottom:1px solid #2a2722; padding-bottom:18px; margin-bottom:42px; }
        .sectionTitle h2 { margin:0; font-size:clamp(30px,5vw,64px); letter-spacing:-.045em; text-transform:uppercase; }
        .sectionTitle span { color:#756e64; font:700 11px ui-monospace,monospace; letter-spacing:.18em; }
        .tree { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; position:relative; }
        .tree:before { content:""; position:absolute; left:7%; right:7%; top:50%; height:1px; background:linear-gradient(90deg,#63d2ff,#c246ff,#f6b73c,#ff4d57); opacity:.45; z-index:0; }
        .branch { min-height:180px; position:relative; z-index:1; padding:18px; border:1px solid #2d2923; background:rgba(9,9,9,.88); display:flex; flex-direction:column; justify-content:space-between; }
        .branchDot { width:11px; height:11px; border-radius:50%; box-shadow:0 0 22px currentColor; }
        .branch strong { font-size:15px; line-height:1.1; }
        .branch small { display:block; color:#7d756b; margin-top:7px; line-height:1.35; }
        .branchYear { font:700 10px ui-monospace,monospace; letter-spacing:.14em; color:#6c655c; }
        .timeline { position:relative; }
        .timeline:before { content:""; position:absolute; left:110px; top:0; bottom:0; width:1px; background:#302c26; }
        .entry { display:grid; grid-template-columns:90px 1fr; gap:44px; padding:0 0 54px; position:relative; }
        .date { text-align:right; font:700 13px ui-monospace,monospace; color:#777066; padding-top:16px; }
        .card { position:relative; border:1px solid #292621; border-left:3px solid var(--accent); background:linear-gradient(135deg,rgba(255,255,255,.025),rgba(255,255,255,.008)); padding:24px; border-radius:2px; }
        .card:before { content:""; position:absolute; width:9px; height:9px; background:var(--accent); border-radius:50%; left:-51px; top:19px; box-shadow:0 0 18px var(--accent); }
        .cardTop { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; }
        .artist { font:700 11px ui-monospace,monospace; letter-spacing:.16em; color:var(--accent); text-transform:uppercase; }
        .era { margin-top:7px; font:700 10px ui-monospace,monospace; letter-spacing:.12em; color:#696259; }
        .badge { white-space:nowrap; border:1px solid #38332d; color:#8d857a; padding:6px 8px; font:700 9px ui-monospace,monospace; letter-spacing:.13em; }
        .song { margin:18px 0 10px; font-size:clamp(25px,4vw,43px); line-height:1; letter-spacing:-.035em; text-transform:uppercase; }
        .desc { max-width:810px; color:#b4ada3; font-size:16px; line-height:1.6; }
        .roots { display:flex; flex-wrap:wrap; gap:7px; margin-top:18px; }
        .root { font:600 10px ui-monospace,monospace; color:#8a8277; border:1px solid #2f2b26; padding:6px 8px; }
        .listen { display:inline-block; margin-top:20px; color:#070707; background:var(--accent); padding:10px 13px; text-decoration:none; font:800 10px ui-monospace,monospace; letter-spacing:.12em; text-transform:uppercase; }
        .manifesto { border-top:1px solid #2b2823; border-bottom:1px solid #2b2823; padding:70px 0; margin-top:10px; }
        .manifesto p { max-width:950px; margin:0; font-size:clamp(25px,5vw,60px); line-height:1.08; letter-spacing:-.035em; }
        .manifesto em { color:#f6b73c; font-style:normal; }
        .easter { margin:120px auto 70px; width:min(1180px,calc(100% - 32px)); display:flex; justify-content:center; }
        .tape { appearance:none; border:0; transform:rotate(-2deg); padding:14px 28px; background:#b79b63; color:#17130d; font:900 18px/1.1 "Courier New",monospace; box-shadow:0 8px 30px rgba(0,0,0,.35); cursor:pointer; }
        .tape span { display:none; }
        .tape:focus span, .tape:hover span { display:inline; }
        .tape:focus b, .tape:hover b { display:none; }
        footer { border-top:1px solid #201e1a; padding:34px 24px 50px; color:#5f5a52; text-align:center; font:700 10px ui-monospace,monospace; letter-spacing:.13em; text-transform:uppercase; }
        @media(max-width:800px){
          .hero { min-height:78vh; padding:32px 20px 70px; }
          .scrollCue { display:none; }
          .section { padding:72px 0; }
          .tree { grid-template-columns:1fr 1fr; }
          .tree:before { display:none; }
          .branch { min-height:145px; }
          .timeline:before { left:26px; }
          .entry { grid-template-columns:1fr; gap:8px; padding-left:50px; padding-bottom:34px; }
          .date { text-align:left; padding:0; color:#938b80; }
          .card { padding:19px; }
          .card:before { left:-31px; top:18px; }
          .cardTop { flex-direction:column; gap:10px; }
          .badge { align-self:flex-start; }
          .song { font-size:29px; }
          .desc { font-size:15px; }
        }
      `}</style>

      <header className="hero">
        <div>
          <div className="kicker">NULLWORKS // ANVIL // LIVING MUSIC UNIVERSE</div>
          <h1>Music has ancestors.</h1>
          <p className="heroCopy">
            A living reverse-chronology of fictional artists built inside real musical history. Start now. Scroll backward. Follow a song into an album, an album into a band, a band into an influence, and an influence into something older. <b>We are not writing a timeline in order. We are discovering it in both directions.</b>
          </p>
        </div>
        <div className="scrollCue">SCROLL BACKWARD THROUGH TIME ↓</div>
      </header>

      <section className="section" id="genealogy">
        <div className="sectionTitle"><h2>The family tree</h2><span>UPSIDE DOWN ON PURPOSE</span></div>
        <div className="tree">
          {branches.map((b) => (
            <div className="branch" key={b.name}>
              <div className="branchDot" style={{ color: b.color, background: b.color }} />
              <div><strong>{b.name}</strong><small>{b.detail}</small></div>
              <div className="branchYear">{b.years}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="timeline">
        <div className="sectionTitle"><h2>The reverse timeline</h2><span>NOW → THEN</span></div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <article className="entry" key={`${item.year}-${item.artist}-${item.title}-${i}`}>
              <div className="date">{item.year}</div>
              <div className="card" style={{ "--accent": item.accent } as React.CSSProperties}>
                <div className="cardTop">
                  <div><div className="artist">{item.artist}</div><div className="era">{item.era}</div></div>
                  <div className="badge">{item.kind}</div>
                </div>
                <h3 className="song">{item.title}</h3>
                <p className="desc">{item.description}</p>
                <div className="roots">{item.roots.map((r) => <span className="root" key={r}>{r}</span>)}</div>
                {item.url ? <a className="listen" href={item.url} target="_blank" rel="noreferrer">Open source recording ↗</a> : null}
              </div>
            </article>
          ))}
        </div>

        <div className="manifesto">
          <p>
            The source composition supplies <em>ancestry</em>. Audio influence controls how much ancestry survives. Style pressure chooses a direction. Lyrics locate the people living inside it. The result is a musical universe that can be written <em>forward, backward, and sideways through time.</em>
          </p>
        </div>
      </section>

      <div className="easter">
        <button className="tape" aria-label="9 volt minimum">
          <b>9V MIN</b><span>HARRY PLOPPINS CAME THROUGH THE DOOR. NOBODY ASKED HIM.</span>
        </button>
      </div>

      <footer>
        NULLWORKS // ANVIL · LIVING ARCHIVE · BUILT TO KEEP GROWING · HISTORY SUBJECT TO NEW EVIDENCE
      </footer>
    </main>
  );
}
