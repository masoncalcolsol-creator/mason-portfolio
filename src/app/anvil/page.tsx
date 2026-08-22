import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANVIL // The Living Music Universe",
  description:
    "A living reverse-chronology of the NULLWORKS // ANVIL music universe: songs, artists, ancestry, influence, and the fictional history connecting them.",
};

type TimelineEntry = {
  id: string;
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
    id: "song-godscrotum-harry",
    year: "2026",
    era: "PRESENT DAY",
    artist: "GODSCROTUM",
    title: "HARRY PLOPPINS // lineage experiment",
    kind: "PROOF",
    description:
      "A descendant song forced backward through another phenotype. The point is not the joke. The point is that performer identity survives violent changes in style.",
    roots: ["modern ANVIL", "9 VOLT composition", "REX lineage experiments"],
    url: "https://suno.com/s/pnAkXcc4dZ4eI4VQ",
    accent: "#ff4d57",
  },
  {
    id: "song-vex-likes-sex",
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
    id: "song-harry-ploppins",
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
    id: "song-amplified",
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
    id: "song-burning-wire",
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
    id: "blood-university-incident",
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
    id: "song-closed-gate",
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
    id: "song-red-lamp",
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
    id: "vex-born",
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
    id: "unnamed-son",
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
    id: "rex-capstone",
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
    id: "song-spin-me-around",
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
    id: "song-last-table",
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
    id: "song-mind-wandering",
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
    id: "song-dead-sun-mass",
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
    id: "song-iron-wire",
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

const rootTargets: Record<string, string> = {
  "modern ANVIL": "#genealogy-modern",
  "9 VOLT composition": "#song-harry-ploppins",
  "REX lineage experiments": "#genealogy-rex",
  "1978 9 VOLT": "#song-harry-ploppins",
  "proto-9 VOLT punk": "#song-burning-wire",
  "Rex family line": "#genealogy-rex",
  AMPLIFIED: "#song-amplified",
  "proto-punk recordings": "#song-burning-wire",
  "scavenged amplification": "#song-burning-wire",
  "BURNING WIRE": "#song-burning-wire",
  "TOO FUCKING LOUD": "#song-burning-wire",
  "IRON WIRE STUDY": "#song-iron-wire",
  "Rex club infrastructure": "#vex-born",
  "punk / raw amplified rock": "#genealogy-vex",
  "classical training": "#blood-university-incident",
  amplification: "#blood-university-incident",
  "stolen museum pump organ": "#song-red-lamp",
  "university orchestra": "#blood-university-incident",
  "DEAD SUN MASS ancestry": "#song-dead-sun-mass",
  "early amplification": "#song-red-lamp",
  "classical school tapes": "#song-red-lamp",
  "home dubbing": "#song-red-lamp",
  "museum pump organ": "#song-red-lamp",
  "Rex & The Wreckers": "#genealogy-rex",
  "club infrastructure": "#vex-born",
  "British friends": "#vex-born",
  "Yokohama 1947": "#rex-capstone",
  "Japanese reconstruction": "#unnamed-son",
  Rex: "#genealogy-rex",
  "jump jazz": "#song-spin-me-around",
  swing: "#song-spin-me-around",
  "postwar dance halls": "#rex-capstone",
  "working dance bands": "#song-spin-me-around",
  "Rex vocal phenotype": "#song-mind-wandering",
  "My Mind Goes Wandering": "#song-mind-wandering",
  "small-club jazz": "#song-mind-wandering",
  "late-career Rex": "#rex-capstone",
  "1940s jazz mutation": "#song-mind-wandering",
  "higher worn tenor": "#song-mind-wandering",
  "small working ensemble": "#song-mind-wandering",
  "pump organ": "#song-dead-sun-mass",
  "late Romantic / early modernist composition": "#song-dead-sun-mass",
  "physical low-frequency mass": "#song-dead-sun-mass",
  contrabass: "#song-iron-wire",
  "cello pursuit": "#song-iron-wire",
  "riff ancestry": "#song-iron-wire",
};

function TreeNode({
  id,
  href,
  color,
  eyebrow,
  name,
  detail,
}: {
  id?: string;
  href: string;
  color: string;
  eyebrow: string;
  name: string;
  detail: string;
}) {
  return (
    <a id={id} className="treeNode" href={href} style={{ borderColor: color }}>
      <span className="nodeDot" style={{ background: color, boxShadow: `0 0 24px ${color}` }} />
      <span className="nodeEyebrow">{eyebrow}</span>
      <strong>{name}</strong>
      <small>{detail}</small>
      <span className="nodeJump">JUMP TO RECORD ↓</span>
    </a>
  );
}

export default function AnvilUniversePage() {
  return (
    <main className="anvilPage">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin:0; background:#070707; }
        .anvilPage { min-height:100vh; color:#eee9df; background:
          radial-gradient(circle at 85% 3%, rgba(194,70,255,.12), transparent 23rem),
          radial-gradient(circle at 10% 20%, rgba(246,183,60,.08), transparent 28rem),
          linear-gradient(#070707,#0d0c0b 45%,#060606); font-family:Arial,Helvetica,sans-serif; overflow:hidden; }
        .hero { min-height:92vh; display:flex; align-items:flex-end; padding:clamp(28px,6vw,86px); position:relative; border-bottom:1px solid #26231f; }
        .hero:before { content:""; position:absolute; inset:0; background:repeating-linear-gradient(90deg,transparent 0 79px,rgba(255,255,255,.018) 80px); pointer-events:none; }
        .kicker { font:700 12px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.22em; color:#a89f91; margin-bottom:18px; }
        h1 { font-size:clamp(48px,11vw,150px); line-height:.82; letter-spacing:-.065em; margin:0; max-width:1100px; text-transform:uppercase; }
        .heroCopy { max-width:760px; margin-top:28px; font-size:clamp(17px,2vw,23px); line-height:1.5; color:#bdb5a9; }
        .heroCopy b { color:#fff7e6; }
        .scrollCue { position:absolute; right:clamp(24px,6vw,80px); bottom:42px; writing-mode:vertical-rl; font:700 10px ui-monospace,monospace; letter-spacing:.22em; color:#716a60; }
        .section { width:min(1180px,calc(100% - 32px)); margin:0 auto; padding:96px 0; }
        .sectionTitle { display:flex; gap:18px; align-items:baseline; border-bottom:1px solid #2a2722; padding-bottom:18px; margin-bottom:42px; }
        .sectionTitle h2 { margin:0; font-size:clamp(30px,5vw,64px); letter-spacing:-.045em; text-transform:uppercase; }
        .sectionTitle span { color:#756e64; font:700 11px ui-monospace,monospace; letter-spacing:.18em; }

        .genealogy { position:relative; padding:22px 0 0; }
        .treeHint { max-width:780px; color:#958d81; line-height:1.55; margin:0 0 40px; }
        .treeFlow { display:flex; flex-direction:column; align-items:center; }
        .treeNode { width:min(440px,100%); position:relative; display:block; text-decoration:none; color:#eee9df; background:rgba(10,10,10,.9); border:1px solid; padding:18px 20px 16px 44px; transition:transform .18s ease,background .18s ease,box-shadow .18s ease; }
        .treeNode:hover,.treeNode:focus-visible { transform:translateY(-2px); background:#111; box-shadow:0 14px 40px rgba(0,0,0,.28); outline:none; }
        .nodeDot { position:absolute; left:18px; top:22px; width:10px; height:10px; border-radius:50%; }
        .nodeEyebrow,.nodeJump { display:block; font:800 9px/1.2 ui-monospace,monospace; letter-spacing:.16em; color:#777066; text-transform:uppercase; }
        .treeNode strong { display:block; margin:6px 0 6px; font-size:clamp(18px,2.5vw,27px); letter-spacing:-.025em; }
        .treeNode small { display:block; color:#9b9388; line-height:1.42; }
        .nodeJump { margin-top:13px; color:#b6aea2; }
        .trunk { width:1px; height:34px; background:#3b3731; }
        .splitWrap { width:min(1000px,100%); position:relative; padding-top:34px; }
        .splitWrap:before { content:""; position:absolute; top:0; left:25%; right:25%; height:1px; background:#3b3731; }
        .splitWrap:after { content:""; position:absolute; top:0; left:50%; width:1px; height:34px; background:#3b3731; }
        .splitRow { display:grid; grid-template-columns:1fr 1fr; gap:70px; position:relative; }
        .splitCol { display:flex; flex-direction:column; align-items:center; position:relative; }
        .splitCol:before { content:""; width:1px; height:34px; background:#3b3731; margin-top:-34px; }
        .branchLine { width:1px; height:28px; background:#3b3731; }
        .merge { width:min(1000px,100%); height:54px; position:relative; }
        .merge:before { content:""; position:absolute; left:25%; right:25%; top:0; height:1px; background:#3b3731; }
        .merge:after { content:""; position:absolute; left:50%; top:0; bottom:0; width:1px; background:#3b3731; }
        .rootLabel { margin:18px 0 14px; font:800 10px ui-monospace,monospace; letter-spacing:.18em; color:#6f685f; text-transform:uppercase; }
        .influenceRoots { width:min(1000px,100%); display:grid; grid-template-columns:1fr 1fr; gap:70px; position:relative; }
        .influenceRoots:before { content:""; position:absolute; left:25%; right:25%; top:-22px; border-top:1px dashed #39352f; }
        .influenceRoots .treeNode { border-style:dashed; }
        .legend { display:flex; gap:18px; flex-wrap:wrap; justify-content:center; margin-top:28px; color:#716a61; font:700 9px ui-monospace,monospace; letter-spacing:.12em; text-transform:uppercase; }
        .legend span:before { content:""; display:inline-block; width:22px; border-top:1px solid #615b52; vertical-align:middle; margin-right:7px; }
        .legend .musical:before { border-top-style:dashed; }

        .timeline { position:relative; }
        .timeline:before { content:""; position:absolute; left:110px; top:0; bottom:0; width:1px; background:#302c26; }
        .entry { display:grid; grid-template-columns:90px 1fr; gap:44px; padding:0 0 54px; position:relative; scroll-margin-top:24px; }
        .date { text-align:right; font:700 13px ui-monospace,monospace; color:#777066; padding-top:16px; }
        .card { position:relative; border:1px solid #292621; border-left:3px solid var(--accent); background:linear-gradient(135deg,rgba(255,255,255,.025),rgba(255,255,255,.008)); padding:24px; border-radius:2px; }
        .card:before { content:""; position:absolute; left:-48px; top:19px; width:10px; height:10px; border-radius:50%; background:var(--accent); box-shadow:0 0 18px var(--accent); }
        .cardTop { display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }
        .artist { color:var(--accent); font:900 12px ui-monospace,monospace; letter-spacing:.17em; text-transform:uppercase; }
        .era { margin-top:8px; color:#6f685f; font:800 10px ui-monospace,monospace; letter-spacing:.17em; text-transform:uppercase; }
        .badge { border:1px solid #3b3630; padding:7px 9px; color:#91887d; font:800 9px ui-monospace,monospace; letter-spacing:.14em; }
        .song { margin:25px 0 13px; font-size:clamp(30px,5vw,64px); line-height:.98; letter-spacing:-.045em; text-transform:uppercase; }
        .desc { max-width:840px; color:#b3aba0; font-size:17px; line-height:1.58; }
        .roots { display:flex; flex-wrap:wrap; gap:8px; margin-top:22px; }
        .root { display:inline-block; border:1px solid #3a352e; padding:8px 10px; color:#9c9387; text-decoration:none; font:700 10px ui-monospace,monospace; letter-spacing:.08em; transition:border-color .15s,color .15s,transform .15s; }
        .root:hover,.root:focus-visible { color:#fff4df; border-color:var(--accent); transform:translateY(-1px); outline:none; }
        .listen { display:inline-block; margin-top:20px; color:#070707; background:var(--accent); padding:10px 13px; text-decoration:none; font:800 10px ui-monospace,monospace; letter-spacing:.12em; text-transform:uppercase; }
        .manifesto { border-top:1px solid #2b2823; border-bottom:1px solid #2b2823; padding:70px 0; margin-top:10px; }
        .manifesto p { max-width:950px; margin:0; font-size:clamp(25px,5vw,60px); line-height:1.08; letter-spacing:-.035em; }
        .manifesto em { color:#f6b73c; font-style:normal; }
        .easter { margin:120px auto 70px; width:min(1180px,calc(100% - 32px)); display:flex; justify-content:center; }
        .tape { appearance:none; border:0; transform:rotate(-2deg); padding:14px 28px; background:#b79b63; color:#17130d; font:900 18px/1.1 "Courier New",monospace; box-shadow:0 8px 30px rgba(0,0,0,.35); cursor:pointer; }
        .tape span { display:none; }
        .tape:focus span,.tape:hover span { display:inline; }
        .tape:focus b,.tape:hover b { display:none; }
        footer { border-top:1px solid #201e1a; padding:34px 24px 50px; color:#5f5a52; text-align:center; font:700 10px ui-monospace,monospace; letter-spacing:.13em; text-transform:uppercase; }

        @media(max-width:800px){
          .hero { min-height:78vh; padding:32px 20px 70px; }
          .scrollCue { display:none; }
          .section { padding:72px 0; }
          .sectionTitle { align-items:flex-start; flex-direction:column; gap:8px; }
          .treeHint { font-size:14px; margin-bottom:30px; }
          .treeNode { width:100%; }
          .splitWrap { padding-top:24px; }
          .splitWrap:before,.splitWrap:after,.merge:before,.merge:after,.influenceRoots:before { display:none; }
          .splitRow,.influenceRoots { grid-template-columns:1fr; gap:18px; }
          .splitCol:before { display:none; }
          .splitCol { border-left:1px solid #312e29; padding-left:16px; align-items:stretch; }
          .splitCol:first-child { border-left-color:#5b451d; }
          .splitCol:last-child { border-left-color:#5e286e; }
          .branchLine { height:18px; margin-left:22px; }
          .merge { height:24px; }
          .rootLabel { text-align:center; margin-top:8px; }
          .influenceRoots .treeNode { margin-bottom:0; }
          .timeline:before { left:26px; }
          .entry { grid-template-columns:1fr; gap:8px; padding-left:50px; padding-bottom:34px; }
          .date { text-align:left; padding:0; color:#938b80; }
          .card { padding:19px; }
          .card:before { left:-31px; top:18px; }
          .cardTop { flex-direction:column; gap:10px; }
          .badge { align-self:flex-start; }
          .song { font-size:29px; }
          .desc { font-size:15px; }
          .root { padding:8px 9px; }
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
        <div className="sectionTitle"><h2>The family tree</h2><span>TAP A NODE TO TIME-TRAVEL</span></div>
        <p className="treeHint">
          Solid lines are family / artist lineage. Dashed roots are musical ancestry. This is deliberately upside down: descendants live above their ancestors, because the page begins now and digs backward.
        </p>

        <div className="genealogy">
          <div className="treeFlow">
            <TreeNode id="genealogy-modern" href="#song-godscrotum-harry" color="#ff4d57" eyebrow="1980s → PRESENT" name="LATER ANVIL" detail="Modern descendants, mutations, covers, athlete work, and bands still being discovered." />
            <div className="trunk" />

            <div className="splitWrap">
              <div className="splitRow">
                <div className="splitCol">
                  <TreeNode id="genealogy-9v" href="#song-vex-likes-sex" color="#f6b73c" eyebrow="1970s → 1982" name="9 VOLT" detail="Systems people discover music. Punk/raw amplification hardens into mainstream hard rock and heavy metal." />
                  <div className="branchLine" />
                  <TreeNode id="genealogy-vex" href="#vex-born" color="#f6b73c" eyebrow="BORN 1955 // ENGLAND" name="VEX" detail="Club kid, cable coiler, scavenger, repair helper, eventual singer and systems-first musician." />
                </div>

                <div className="splitCol">
                  <TreeNode id="genealogy-blood" href="#blood-university-incident" color="#c246ff" eyebrow="1960s → ONWARD" name="BLOOD PAGODA" detail="Music people discover systems. Classical precision collides with primitive amplification, feedback, electric cello, and doom." />
                  <div className="branchLine" />
                  <TreeNode id="genealogy-unnamed" href="#unnamed-son" color="#c246ff" eyebrow="BORN 1948 // JAPAN" name="THE UNNAMED SON" detail="Raised Japanese, musically gifted, scholarship-trained, and never given a canonical proper name." />
                </div>
              </div>
            </div>

            <div className="merge" />
            <TreeNode id="genealogy-rex" href="#rex-capstone" color="#63d2ff" eyebrow="1940s → MID-1950s" name="REX & THE WRECKERS" detail="Shared family root. Working swing / jump-jazz band. Rex unknowingly seeds two radically different musical bloodlines." />
            <div className="trunk" />
            <div className="rootLabel">OLDER MUSICAL ANCESTRY // NOT BLOODLINE</div>
            <div className="influenceRoots">
              <TreeNode href="#song-iron-wire" color="#d8d1c2" eyebrow="1895–1910" name="IRON WIRE STUDY" detail="Neutral low-string riff ancestry later used to probe proto-9 VOLT evolution." />
              <TreeNode href="#song-dead-sun-mass" color="#d8d1c2" eyebrow="1890–1915" name="DEAD SUN MASS" detail="Pump organ, low brass, cello, contrabass, repetition, dissonance, and slow physical mass feeding later branches." />
            </div>
          </div>

          <div className="legend">
            <span>family / artist lineage</span>
            <span className="musical">musical ancestry / influence</span>
          </div>
        </div>
      </section>

      <section className="section" id="timeline">
        <div className="sectionTitle"><h2>The historical record</h2><span>NOW → THEN</span></div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="entry" id={item.id} key={item.id}>
              <div className="date">{item.year}</div>
              <div className="card" style={{ "--accent": item.accent } as React.CSSProperties}>
                <div className="cardTop">
                  <div><div className="artist">{item.artist}</div><div className="era">{item.era}</div></div>
                  <div className="badge">{item.kind}</div>
                </div>
                <h3 className="song">{item.title}</h3>
                <p className="desc">{item.description}</p>
                <div className="roots">
                  {item.roots.map((root) => (
                    <a className="root" href={rootTargets[root] ?? "#genealogy"} key={root}>{root} ↙</a>
                  ))}
                </div>
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
