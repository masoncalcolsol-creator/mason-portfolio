const practices = [
  ["観察する", "大きな問題になる前に、小さな変化に気づく。"],
  ["記録する", "言葉だけでなく、背景、迷い、不確実性も残す。"],
  ["保存する", "答えだけではなく、答えにたどり着いた『なぜ』を守る。"],
  ["伝える", "未来の誰かが使える形で、学びを静かに渡す。"],
];

export default function Page() {
  return (
    <main>
      <style>{`
        *{box-sizing:border-box}body{margin:0;background:#efe5d1;color:#2a211a}a{color:inherit}
        .page{min-height:100vh;background:linear-gradient(180deg,#f4ead6 0%,#ead9bd 100%);font-family:Arial,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif}
        .shell{width:min(1040px,100%);margin:auto;padding:0 22px}.nav{height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #a88c65}
        .brand{font-family:Georgia,'Yu Mincho',serif;font-size:24px;font-weight:700;letter-spacing:.12em;text-decoration:none}.brand small{display:block;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.2em;color:#7b2f25;margin-top:4px}
        .lang{border:1px solid #6b5740;padding:9px 14px;text-decoration:none;border-radius:999px;font-size:13px;background:#f7efdf}
        .hero{display:grid;grid-template-columns:1fr .9fr;gap:46px;align-items:center;padding:64px 0 70px;border-bottom:1px solid #a88c65}
        .label{font-size:11px;font-weight:900;letter-spacing:.2em;color:#8d2e22;text-transform:uppercase}.hero h1,h2,h3{font-family:Georgia,'Yu Mincho',serif;font-weight:600;letter-spacing:-.035em}
        .hero h1{font-size:clamp(56px,9vw,96px);line-height:.9;margin:18px 0 22px}.hero h1 span{display:block;font-size:.36em;color:#6a4c2f;letter-spacing:.04em;margin-top:16px}
        .lead{font-family:Georgia,'Yu Mincho',serif;font-size:clamp(28px,4vw,43px);line-height:1.35;margin:0 0 22px}.copy{font-size:17px;line-height:1.95;color:#594b3d}
        .heroArt{margin:0;background:#2b211a;border:10px solid #f7efdf;outline:1px solid #8d6a43;box-shadow:0 24px 55px rgba(61,42,25,.25)}.heroArt img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover}
        .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.button{display:inline-flex;padding:13px 16px;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:.04em;text-transform:uppercase;border-radius:3px}
        .primary{background:#8d2e22;color:#fff8eb}.secondary{border:1px solid #6b5740;background:#f7efdf;color:#352a21}
        section{padding:62px 0;border-bottom:1px solid #a88c65}h2{font-size:clamp(38px,6vw,66px);line-height:1.06;margin:14px 0 24px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:28px}
        .card{background:#f8f0df;border:1px solid #b79b72;padding:24px;box-shadow:0 8px 22px rgba(70,48,28,.08)}.card strong{display:block;font-family:Georgia,'Yu Mincho',serif;font-size:25px;color:#6a4027;margin-bottom:10px}.card p{margin:0;line-height:1.8;color:#665544}
        .letter{background:#493225;color:#fff6e5;padding:38px;border-left:6px solid #a84734;box-shadow:0 16px 36px rgba(52,36,24,.2)}.letter h3{font-size:34px;margin:0 0 18px}.letter p{font-size:17px;line-height:1.95;color:#f3e7d4}
        .music{display:grid;grid-template-columns:.7fr 1.3fr;gap:28px;align-items:center;background:#2d241d;color:#fff8e8;padding:30px;border:1px solid #6f543b}.cover{width:100%;border:8px solid #efe1c8;display:block}.music h3,.music h3 *{font-size:34px;margin:0 0 12px;color:#fff8e8!important}.music p,.music p *{color:#f1e2c8!important;line-height:1.8}.music a,.music a *{color:#fff7df!important;text-decoration-thickness:2px;text-underline-offset:4px}.music [style]{color:#fff8e8!important}
        .quote{background:#c69b57;padding:34px;font-family:Georgia,'Yu Mincho',serif;font-size:clamp(30px,5vw,50px);line-height:1.25;color:#231b14}
        .contact{display:grid;grid-template-columns:1fr 1fr;gap:14px}.contact a{background:#f8f0df;border:1px solid #b79b72;padding:18px;text-decoration:none;font-weight:800;color:#53392a}
        .status{display:inline-block;border:1px solid #8e7657;background:#f8f0df;padding:12px 16px;border-radius:999px;font-weight:800}.footer{padding:34px 0 60px;color:#796957;font-size:13px;line-height:1.7}
        @media(max-width:760px){.shell{padding:0 16px}.nav{height:68px}.brand{font-size:20px}.hero{grid-template-columns:1fr;padding:42px 0 48px;gap:28px}.hero h1{font-size:58px}.copy{font-size:16px}.grid,.music,.contact{grid-template-columns:1fr}section{padding:46px 0}.heroArt{border-width:7px}.music{padding:22px}.music h3,.music h3 *{font-size:30px}h2{font-size:41px}.letter{padding:26px 22px}}
      `}</style>

      <div className="page"><div className="shell">
        <nav className="nav">
          <a className="brand" href="/jp/mr-sloth">聞き書き<small>KIKIGAKI</small></a>
          <a className="lang" href="/mr-sloth">English</a>
        </nav>

        <header className="hero">
          <div>
            <div className="label">文化プロジェクト // 最初の観測者</div>
            <h1>聞き書き<span>KIKIGAKI</span></h1>
            <p className="lead">現場が忘れてしまうものを、消える前に残す。</p>
            <p className="copy">小さな兆候、熟練者の判断、失敗した道、そして「なぜそうしたのか」。聞き書きは、仕事の中で生まれた知恵を文脈ごと未来へ渡すための独立した教育・文化プロジェクトです。</p>
            <div className="actions"><a className="button primary" href="#story">物語を読む</a><a className="button secondary" href="#music">音楽を聴く</a></div>
          </div>
          <figure className="heroArt"><img src="/api/mr-sloth-hero" alt="ナマケモノ氏が静かな作業机で記録している姿" /></figure>
        </header>

        <section id="story"><div className="label">01 // なぜ存在するのか</div><h2>小さな観察は、最初に消えていく。</h2><p className="copy">誰かが異変に気づく。問題が解決する。記録には最後の修理だけが残る。やがて専門家が去り、最も大切だった手がかりや判断の理由が失われます。聞き書きは、完成した答えだけでなく、そこへ至る人間の経験を保存します。</p></section>

        <section><div className="label">02 // ナマケモノ氏</div><h2>ゆっくりだから、速い仕組みが見落とすものに気づける。</h2><p className="copy">ナマケモノ氏は、聞き書きの最初の観測者です。売り込まず、急いで結論を出さず、まず見て、聞いて、記録します。キャラクターを通して、実務知識の保存を親しみやすく伝えます。</p><div className="grid">{practices.map(([t,b])=><div className="card" key={t}><strong>{t}</strong><p>{b}</p></div>)}</div></section>

        <section><div className="label">03 // 聞き書きとは</div><h2>よく聞き、忠実に残し、文脈ごと渡す。</h2><p className="copy">この名称は、語り手の経験を丁寧に聞き、その声を尊重して記録する「聞き書き」という考え方から選びました。日本の文化を所有したり代表したりする主張ではありません。敬意を持って学び、その精神を現場知の保存へ応用する試みです。</p></section>

        <section id="music"><div className="label">04 // 旅のための歌</div><h2>消える前に</h2><div className="music"><img className="cover" src="/api/mr-sloth-hero" alt="消える前に アートワーク"/><div><h3>消える前に<br/>Kieru Mae ni<br/>Before It Disappears</h3><p>聞き書き / KIKIGAKI の最初の作品。現場の声、迷い、痛み、知恵を、まだ会っていない誰かのために残す歌です。</p><p><a href="https://distrokid.com/hyperfollow/kikigaki/-kieru-mae-ni-before-it-disappears/" target="_blank" rel="noreferrer">公式リリースページで聴く →</a></p></div></div></section>

        <section><div className="label">05 // 日本の皆さまへ</div><h2>採用を求めるのではなく、対話のきっかけとして。</h2><div className="letter"><h3>日本の皆さまへ</h3><p>現場で最も価値のある学びは、静かに発見され、問題が解決したあとに忘れられてしまうことがあります。</p><p>ナマケモノ氏と聞き書きが、知識を謙虚に、丁寧に、文脈とともに残すことについて、一つでも新しい会話を生むなら、それだけで十分です。</p><p>これは独立した教育・文化プロジェクトです。Toyota、Woven City、その他の組織との提携、採用、承認を示すものではありません。</p></div></section>

        <section><div className="quote">観察する。記録する。未来へ渡す。</div></section>

        <section><div className="label">06 // つながる</div><h2>静かなプロジェクト。開かれた招待。</h2><div className="contact"><a href="https://www.instagram.com/operational_observer/" target="_blank" rel="noreferrer">Instagram<br/>@operational_observer</a><a href="mailto:operational.observer@gmail.com">Email<br/>operational.observer@gmail.com</a></div><p className="copy" style={{marginTop:24}}>聞き書きは、NULLWORKS Research が発行する独立した文化プロジェクトです。実務知識を、失われる前に保存する方法を探求しています。</p><div className="status">最初の対話候補：WOVEN CITY // 未承認・未提携</div></section>

        <footer className="footer">聞き書き / KIKIGAKI — Preserving what work forgets.<br/>Published by NULLWORKS Research · Arizona, USA.</footer>
      </div></div>
    </main>
  );
}