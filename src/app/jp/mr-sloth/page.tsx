const practices = [
  ["観察する", "大きな問題になる前に、小さな変化に気づく。"],
  ["記録する", "言葉だけでなく、背景、迷い、不確実性、失敗した道も残す。"],
  ["なぜを守る", "最終的な修理や判断の背後にある人間の知恵を保存する。"],
  ["未来へ渡す", "不確かな話を事実や規則に変えず、必要な人へ学びを届ける。"],
];

export default function Page() {
  return (
    <main>
      <style>{`
        *{box-sizing:border-box}body{margin:0;background:#efe5d1;color:#2a211a}a{color:inherit}
        .page{min-height:100vh;background:linear-gradient(180deg,#f5ecd9 0%,#ead9bd 100%);font-family:Arial,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif}
        .shell{width:min(1040px,100%);margin:auto;padding:0 22px}.nav{height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #a88c65}
        .brand{font-family:Georgia,'Yu Mincho',serif;font-size:24px;font-weight:700;letter-spacing:.12em;text-decoration:none}.brand small{display:block;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.2em;color:#7b2f25;margin-top:4px}
        .lang{border:1px solid #6b5740;padding:9px 14px;text-decoration:none;border-radius:999px;font-size:13px;background:#f7efdf}.hero{display:grid;grid-template-columns:1fr .9fr;gap:46px;align-items:center;padding:64px 0 70px;border-bottom:1px solid #a88c65}
        .label{font-size:11px;font-weight:900;letter-spacing:.2em;color:#8d2e22;text-transform:uppercase}.hero h1,h2,h3{font-family:Georgia,'Yu Mincho',serif;font-weight:600;letter-spacing:-.035em}
        .hero h1{font-size:clamp(56px,9vw,96px);line-height:.9;margin:18px 0 22px}.hero h1 span{display:block;font-size:.36em;color:#6a4c2f;letter-spacing:.04em;margin-top:16px}
        .lead{font-family:Georgia,'Yu Mincho',serif;font-size:clamp(28px,4vw,43px);line-height:1.35;margin:0 0 22px}.copy{font-size:17px;line-height:1.95;color:#594b3d}
        .heroArt{margin:0;background:#2b211a;border:10px solid #f7efdf;outline:1px solid #8d6a43;box-shadow:0 24px 55px rgba(61,42,25,.25)}.heroArt img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover}
        .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.button{display:inline-flex;padding:13px 16px;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:.04em;text-transform:uppercase;border-radius:3px}
        .primary{background:#8d2e22;color:#fff8eb}.secondary{border:1px solid #6b5740;background:#f7efdf;color:#352a21}section{padding:62px 0;border-bottom:1px solid #a88c65}h2{font-size:clamp(38px,6vw,66px);line-height:1.06;margin:14px 0 24px}
        .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:28px}.card{background:#f8f0df;border:1px solid #b79b72;padding:24px;box-shadow:0 8px 22px rgba(70,48,28,.08)}.card strong{display:block;font-family:Georgia,'Yu Mincho',serif;font-size:25px;color:#6a4027;margin-bottom:10px}.card p{margin:0;line-height:1.8;color:#665544}
        .demo{background:#493225;color:#fff6e5;padding:38px;border-left:6px solid #a84734}.demo h3{font-size:34px;margin:0 0 18px;color:#fff8e8}.demo p{font-size:17px;line-height:1.9;color:#f3e7d4}.demo ul{padding-left:20px}.demo li{margin:10px 0;line-height:1.7;color:#f3e7d4}
        .music{display:grid;grid-template-columns:.72fr 1.28fr;gap:28px;align-items:start;background:#2d241d;color:#fff8e8;padding:30px;border:1px solid #6f543b}.cover{width:100%;border:8px solid #efe1c8;display:block}.music h3,.music h3 *{font-size:34px;margin:0 0 12px;color:#fff8e8!important}.music p,.music p *{color:#f1e2c8!important;line-height:1.8}.spotify{margin-top:18px;border-radius:12px;overflow:hidden}.spotify iframe{display:block;width:100%;border:0}
        .quote{background:#c69b57;padding:34px;font-family:Georgia,'Yu Mincho',serif;font-size:clamp(30px,5vw,50px);line-height:1.25;color:#231b14}.contact{display:grid;grid-template-columns:1fr 1fr;gap:14px}.contact a{background:#f8f0df;border:1px solid #b79b72;padding:18px;text-decoration:none;font-weight:800;color:#53392a}.status{display:inline-block;border:1px solid #8e7657;background:#f8f0df;padding:12px 16px;border-radius:999px;font-weight:800}.footer{padding:34px 0 60px;color:#796957;font-size:13px;line-height:1.7}
        @media(max-width:760px){.shell{padding:0 16px}.nav{height:68px}.brand{font-size:20px}.hero{grid-template-columns:1fr;padding:42px 0 48px;gap:28px}.hero h1{font-size:58px}.copy{font-size:16px}.grid,.music,.contact{grid-template-columns:1fr}section{padding:46px 0}.heroArt{border-width:7px}.music{padding:22px}.music h3,.music h3 *{font-size:30px}h2{font-size:41px}.demo{padding:26px 22px}}
      `}</style>
      <div className="page"><div className="shell">
        <nav className="nav"><a className="brand" href="/jp/mr-sloth">聞き書き<small>KIKIGAKI</small></a><a className="lang" href="/mr-sloth">English</a></nav>
        <header className="hero"><div><div className="label">文化・教育デモンストレーション // 最初の観測者</div><h1>聞き書き<span>KIKIGAKI</span></h1><p className="lead">現場が忘れてしまうものを、消える前に残す。</p><p className="copy">小さな兆候、熟練者の判断、失敗した道、不確実性、そして「なぜそうしたのか」。聞き書きは、仕事の中で生まれた知恵を文脈ごと未来へ渡す、ものづくりを起点とした独立した教育・文化プロジェクトです。</p><div className="actions"><a className="button primary" href="#demonstration">デモンストレーションを見る</a><a className="button secondary" href="#music">Spotifyで聴く</a></div></div><figure className="heroArt"><img src="/api/mr-sloth-hero" alt="ナマケモノ氏が静かな作業机で記録している姿" /></figure></header>
        <section id="story"><div className="label">01 // 課題</div><h2>最後の修理は残る。人間の学びは、しばしば消えていく。</h2><p className="copy">誰かが小さな異変に気づく。間違った仮説を試す。現場で一時的な工夫が生まれる。やがて問題は解決する。しかし正式な記録には最終的な作業だけが残り、手がかり、迷い、失敗、現場の圧力、判断の理由が失われることがあります。</p></section>
        <section><div className="label">02 // ナマケモノ氏</div><h2>ゆっくりだから、速い仕組みが見落とすものに気づける。</h2><p className="copy">ナマケモノ氏は、聞き書きの最初の観測者であり、学びの伴走者です。人間の経験を親しみやすく伝えながら、語られた内容を確認済みの事実、承認された手順、自動化された規則へ勝手に変えることはありません。</p><div className="grid">{practices.map(([t,b])=><div className="card" key={t}><strong>{t}</strong><p>{b}</p></div>)}</div></section>
        <section id="demonstration"><div className="label">03 // Woven City デモンストレーション提案</div><h2>情報のモビリティは、文脈を守ることから始まる。</h2><div className="demo"><h3>公開型の文化・教育デモンストレーション</h3><p>聞き書きは、Toyota Woven City の Inventors デモンストレーション窓口への提案準備を進めています。現場知を、人、シフト、専門分野、世代の間で移動させる際に、出所と不確実性を失わず、物語を事実へ格上げしない方法を探ります。</p><ul><li>英語・日本語のバイリンガル公開体験</li><li>ものづくりと現場知の保存</li><li>人間中心の Operational Intelligence ガバナンス</li><li>オリジナルのアート、キャラクター、日本語楽曲</li><li>採用、提携、承認、商業的関係を求める提案ではありません</li></ul></div></section>
        <section id="music"><div className="label">04 // 旅のための歌</div><h2>消える前に</h2><div className="music"><img className="cover" src="/api/mr-sloth-hero" alt="消える前に アートワーク"/><div><h3>消える前に<br/>Kieru Mae ni<br/>Before It Disappears</h3><p>聞き書き / KIKIGAKI の最初の公式リリース。現場の声、迷い、痛み、そして長い経験から生まれた知恵を、まだ会っていない誰かのために残す歌です。</p><div className="spotify"><iframe src="https://open.spotify.com/embed/track/35kT4K5f4LZzy0OBymRUaL?utm_source=generator&theme=0" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotifyで消える前にを聴く"></iframe></div></div></div></section>
        <section><div className="label">05 // 開かれた招待</div><h2>採用ではなく、評価と対話のために。</h2><p className="copy">聞き書きは、NULLWORKS Research が発行する独立した文化・教育プロジェクトです。Toyota、Woven by Toyota、Woven City が本プロジェクトを採用、承認、提携、後援している事実はありません。現在のお願いは、この考え方に価値があるか、そしてどこに最も適しているかを評価していただくことだけです。</p></section>
        <section><div className="quote">観察する。記録する。なぜを守る。未来へ渡す。</div></section>
        <section><div className="label">06 // つながる</div><h2>静かなプロジェクト。開かれた招待。</h2><div className="contact"><a href="https://www.instagram.com/operational_observer/" target="_blank" rel="noreferrer">Instagram<br/>@operational_observer</a><a href="mailto:operational.observer@gmail.com">Email<br/>operational.observer@gmail.com</a></div><p className="copy" style={{marginTop:24}}>発行：NULLWORKS Research · Arizona, USA.</p><div className="status">WOVEN CITY INVENTORS デモンストレーション // 提案準備中</div></section>
        <footer className="footer">聞き書き / KIKIGAKI — Preserving what work forgets.<br/>NULLWORKS Research が発行する独立した文化プロジェクトです。</footer>
      </div></div>
    </main>
  );
}
