const missions = [
  ["Observe", "Notice the weak signal before the system normalizes it."],
  ["Record", "Preserve the original story, uncertainty, context, and source."],
  ["Route", "Connect the lesson to the person, problem, or decision that can use it."],
  ["Review", "Keep Human Authority final before promotion, policy, or action."],
];

const boundaries = [
  "No Toyota, Woven City, or provider affiliation is claimed.",
  "No mascot adoption, donation, partnership, or endorsement is claimed until explicitly accepted.",
  "Mr. Sloth does not turn accidents, workarounds, or stories into verified fact.",
  "Readiness never transfers authorization. Human Authority remains final.",
];

export default function MrSlothPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#02070c", color: "#f5f8fb", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box} body{margin:0} a{color:inherit}
        .shell{width:min(1120px,100%);margin:0 auto;padding:20px}
        .nav{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:10px 0 24px;border-bottom:1px solid #23323d}
        .mark{font-weight:950;letter-spacing:.08em;text-decoration:none}.mark span{color:#ffad00}
        .navlinks{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:#9fb1be}
        .hero{display:grid;grid-template-columns:1.08fr .92fr;gap:34px;align-items:center;padding:58px 0 42px}
        .eyebrow,.sectionLabel{font-size:12px;font-weight:900;letter-spacing:.18em;color:#ffad00;text-transform:uppercase}
        h1{font-size:clamp(54px,9vw,108px);line-height:.84;letter-spacing:-.07em;margin:18px 0 24px;text-transform:uppercase}
        .jp{display:block;color:#ffad00;font-size:.48em;letter-spacing:-.03em;margin-top:16px}
        .lead{font-size:clamp(22px,3vw,34px);line-height:1.16;color:#d8e8f2;max-width:780px}
        .body{font-size:18px;line-height:1.72;color:#a8bbc7;max-width:820px}
        .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
        .button{display:inline-flex;padding:14px 18px;border-radius:5px;text-decoration:none;font-size:13px;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
        .primary{background:#ffad00;color:#071017}.secondary{border:1px solid #33546a;color:#dff5ff}
        .portrait{min-height:520px;border:1px solid #29475a;border-radius:18px;background:radial-gradient(circle at 50% 24%,#183448 0,#071018 45%,#02070c 100%);position:relative;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.5)}
        .sloth{font-size:220px;line-height:1;filter:drop-shadow(0 18px 35px rgba(0,0,0,.65));transform:rotate(-3deg)}
        .tag{position:absolute;right:20px;top:20px;background:#ffad00;color:#061018;padding:10px 12px;font-weight:950;border-radius:4px;transform:rotate(4deg);font-size:13px;letter-spacing:.08em}
        .passport{position:absolute;left:20px;bottom:20px;background:#071018;border:1px solid #2a526b;padding:14px;border-radius:8px;color:#9fb1be;font-size:13px;max-width:230px}
        section{padding:58px 0;border-top:1px solid #1c2a34}
        h2{font-size:clamp(38px,6vw,70px);letter-spacing:-.055em;line-height:.94;margin:14px 0 24px;text-transform:uppercase}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .card{border:1px solid #233844;background:#071018;padding:24px;border-radius:8px}.card strong{display:block;color:white;font-size:20px;margin-bottom:9px}.card p{color:#9fb1be;line-height:1.58;margin:0}
        .quote{background:#ffad00;color:#051018;padding:32px;font-size:clamp(30px,5vw,56px);font-weight:950;line-height:.98;letter-spacing:-.045em;text-transform:uppercase}
        .status{display:inline-flex;align-items:center;gap:10px;border:1px solid #34546a;background:#071018;padding:12px 14px;border-radius:999px;color:#d8e8f2;font-weight:850}.dot{width:10px;height:10px;border-radius:50%;background:#ffad00;box-shadow:0 0 18px #ffad00}
        .jpblock{font-size:clamp(26px,4vw,46px);line-height:1.3;color:white;font-weight:850}.translation{color:#9fb1be;font-size:18px;line-height:1.7}
        .list{display:grid;gap:12px}.boundary{border-left:4px solid #ffad00;padding-left:18px;color:#b9cad4;line-height:1.6}
        .footer{padding:38px 0 64px;color:#6f8593;font-size:13px;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}
        @media(max-width:820px){
          .hero,.grid2,.grid4{grid-template-columns:1fr}.navlinks{display:none}.shell{padding:16px}.hero{padding-top:34px;gap:24px}.portrait{min-height:390px}.sloth{font-size:160px}.passport{font-size:12px;max-width:190px}.body{font-size:16px}section{padding:44px 0}h1{font-size:58px}.lead{font-size:23px}.quote{padding:24px}.card{padding:20px}
        }
      `}</style>

      <div className="shell">
        <nav className="nav">
          <a href="/" className="mark"><span>NW</span> NULLWORKS</a>
          <div className="navlinks"><a href="/the-lost-why">BENCHMARK 001</a><a href="/wisdom-mining">WISDOM MINING</a><a href="/model-agnostic-transplant">TRANSPLANT</a></div>
        </nav>

        <header className="hero">
          <div>
            <div className="eyebrow">Forward-deployed observer // Japan candidate</div>
            <h1>Mr. Sloth<span className="jp">ナマケモノ氏</span></h1>
            <p className="lead">Slow enough to notice what fast systems miss.</p>
            <p className="body">Mr. Sloth is a NULLWORKS educational mascot for preserving accidents, workarounds, weak signals, and the reasons behind operational decisions before those lessons disappear or harden into policy without evidence.</p>
            <div className="actions"><a className="button primary" href="#mission">Meet the observer</a><a className="button secondary" href="#gift">View the gift proposal</a></div>
          </div>
          <div className="portrait" aria-label="Mr. Sloth forward-deployed observer illustration">
            <div className="tag">NRT → JAPAN</div>
            <div className="sloth">🦥</div>
            <div className="passport"><strong style={{color:"white"}}>STATUS</strong><br/>PACKED — NOT YET ACCEPTED<br/><br/><strong style={{color:"white"}}>ROLE</strong><br/>FORWARD-DEPLOYED OBSERVER</div>
          </div>
        </header>

        <section id="mission">
          <div className="sectionLabel">01 // Purpose</div>
          <h2>Observe the accident before it becomes policy.</h2>
          <p className="body">Every mistake, workaround, odd behavior, and failed attempt may contain value—but not necessarily for the person who first encounters it. Mr. Sloth represents the deliberate act of preserving that learning, keeping its uncertainty attached, and routing it later to whoever can use it.</p>
          <div className="grid4" style={{marginTop:28}}>{missions.map(([t,b])=><div className="card" key={t}><strong>{t}</strong><p>{b}</p></div>)}</div>
        </section>

        <section>
          <div className="sectionLabel">02 // Why Japan</div>
          <h2>A mascot for patient observation and useful accidents.</h2>
          <div className="grid2"><div className="card"><strong>Educational role</strong><p>Mr. Sloth turns operational governance into a friendly public lesson: slow down, preserve the source, separate observation from interpretation, and do not convert a temporary workaround into approved doctrine.</p></div><div className="card"><strong>Experiment-city fit</strong><p>The first outreach hypothesis is a respectful gift proposal to a human-centered experimentation community in Japan, beginning with Woven City. This page does not claim acceptance, affiliation, adoption, or endorsement.</p></div></div>
        </section>

        <section id="gift">
          <div className="sectionLabel">03 // Proposed gift</div>
          <h2>A free mascot with a real job.</h2>
          <div className="grid2"><div><p className="jpblock">偶然の失敗にも、正しい文脈があれば学びの価値があります。</p><p className="translation">Even an accidental failure can have learning value when the correct context is preserved.</p></div><div className="card"><strong>What is offered</strong><p>A respectful, no-cost educational mascot concept and starter asset package for experimentation, learning, public engagement, or internal reflection—subject entirely to the recipient's approval and brand requirements.</p></div></div>
          <div className="actions"><a className="button primary" href="mailto:masoncalcolsol@gmail.com?subject=Mr.%20Sloth%20Educational%20Mascot%20Proposal">Discuss the proposal</a><a className="button secondary" href="/the-lost-why">See the research origin</a></div>
        </section>

        <section>
          <div className="sectionLabel">04 // Operating boundary</div>
          <h2>Friendly does not mean ungoverned.</h2>
          <div className="list">{boundaries.map((b)=><div className="boundary" key={b}>{b}</div>)}</div>
        </section>

        <section><div className="quote">The artifact is not waste. The artifact plus context plus the right recipient is the useful unit.</div></section>

        <section>
          <div className="sectionLabel">05 // Current deployment state</div>
          <h2>One respectful recipient at a time.</h2>
          <p className="body">The outreach sequence is intentionally narrow: prepare the packet, select one best-fit recipient, send once, preserve the response or defined no-response interval, then route to the next candidate. No bulk blast. No implied partnership. No fake finish line.</p>
          <div className="status"><span className="dot"></span>WOVEN CITY CANDIDATE // NOT YET CONTACTED</div>
        </section>

        <footer className="footer"><span>NULLWORKS · Operational Intelligence Systems Architecture</span><span>ナマケモノ氏 · Educational mascot proposal · Human Authority remains final.</span></footer>
      </div>
    </main>
  );
}
