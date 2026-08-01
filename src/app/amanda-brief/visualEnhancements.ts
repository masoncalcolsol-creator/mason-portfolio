export const visualEnhancementStyles = `<style>
  html{background:#050b12!important}
  body{background:transparent!important;isolation:isolate}
  body>*:not(.nw-ambient-bg){position:relative;z-index:1}
  .nw-ambient-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:#050b12}
  .nw-ambient-frame{position:absolute;inset:-4%;width:108%;height:108%;border:0;opacity:.22;filter:saturate(1.1) contrast(1.04)}
  .nw-ambient-fallback{position:absolute;inset:0;background:radial-gradient(circle at 78% 8%,rgba(105,183,255,.16),transparent 28rem),radial-gradient(circle at 18% 18%,rgba(245,200,75,.08),transparent 20rem),linear-gradient(180deg,rgba(3,6,11,.58),rgba(3,6,11,.82) 34%,rgba(3,6,11,.94))}
  .nw-ambient-belt{position:absolute;left:-5%;right:-5%;bottom:7vh;height:10px;background:linear-gradient(90deg,transparent,rgba(105,183,255,.48),rgba(105,183,255,.15),transparent);box-shadow:0 0 26px rgba(105,183,255,.2)}
  .nw-ambient-box{position:absolute;left:-16%;bottom:calc(7vh + 14px);width:58px;height:58px;border:1px solid rgba(245,200,75,.58);border-radius:10px;background:linear-gradient(145deg,rgba(245,200,75,.1),rgba(105,183,255,.08));box-shadow:0 0 20px rgba(245,200,75,.12)}
  .nw-ambient-box:before{content:"";position:absolute;inset:8px;border:1px solid rgba(105,183,255,.25);border-radius:7px}
  .nw-box-a{animation:nwMoveA 18s linear infinite}.nw-box-b{animation:nwMoveB 23s linear infinite 3s;width:48px;height:48px}.nw-box-c{animation:nwMoveC 27s linear infinite 8s}.nw-box-d{animation:nwMoveD 21s linear infinite 12s;width:72px;height:72px}.nw-box-e{animation:nwMoveE 25s linear infinite 1s;width:52px;height:52px}
  @keyframes nwMoveA{0%{transform:translate3d(0,0,0)}72%{transform:translate3d(96vw,0,0)}100%{transform:translate3d(96vw,-88px,0) rotate(3deg)}}
  @keyframes nwMoveB{0%{transform:translate3d(0,0,0)}76%{transform:translate3d(98vw,0,0)}100%{transform:translate3d(98vw,-28px,0)}}
  @keyframes nwMoveC{0%{transform:translate3d(0,0,0)}70%{transform:translate3d(93vw,0,0)}100%{transform:translate3d(93vw,-142px,0) rotate(-2deg)}}
  @keyframes nwMoveD{0%{transform:translate3d(0,0,0)}74%{transform:translate3d(90vw,0,0)}100%{transform:translate3d(90vw,-72px,0)}}
  @keyframes nwMoveE{0%{transform:translate3d(0,0,0)}74%{transform:translate3d(95vw,0,0)}100%{transform:translate3d(95vw,-122px,0) rotate(2deg)}}
  .nw-continuity{width:min(1120px,calc(100% - 28px));margin:56px auto 34px;padding:clamp(20px,4vw,38px);border:1px solid #33404d;border-radius:30px;background:radial-gradient(circle at 84% 0%,rgba(105,183,255,.1),transparent 24rem),linear-gradient(145deg,rgba(17,25,35,.94),rgba(8,13,19,.96));color:#f3f6f8;font-family:Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;box-shadow:0 30px 90px rgba(0,0,0,.34);backdrop-filter:blur(12px)}
  .nw-continuity *{box-sizing:border-box}.nw-continuity-eyebrow{display:inline-flex;padding:7px 10px;border:1px solid #536171;border-radius:999px;color:#f5c84b;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.nw-continuity h2{margin:18px 0 12px;font-size:clamp(34px,7vw,60px);line-height:.96;letter-spacing:-.052em}.nw-continuity-intro{margin:0;color:#b6c0ca;font-size:clamp(16px,2.2vw,19px);line-height:1.58}.nw-calculus{margin-top:26px;padding:clamp(16px,3vw,26px);border:1px solid #3a4a59;border-radius:25px;background:radial-gradient(circle at 50% 0%,rgba(245,200,75,.16),transparent 24rem),linear-gradient(180deg,#07131d,#09101a 48%,#06101a);box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 24px 55px rgba(0,0,0,.34)}
  .nw-calculus-title{text-align:center;padding:10px 8px 18px}.nw-calculus-title strong{display:block;color:#f0d18a;font-family:Georgia,serif;font-size:clamp(32px,7vw,64px);letter-spacing:.08em;line-height:.95}.nw-calculus-title span{display:block;margin-top:8px;color:#86c3f5;font-size:clamp(14px,2vw,18px)}
  .nw-authority{margin:0 auto 18px;max-width:820px;padding:14px 18px;border:1px solid rgba(245,200,75,.55);border-radius:16px;background:linear-gradient(180deg,rgba(245,200,75,.11),rgba(245,200,75,.03));text-align:center}.nw-authority strong{display:block;color:#f4d386;font-family:Georgia,serif;font-size:clamp(20px,4vw,31px);letter-spacing:.08em}.nw-authority span{display:block;margin-top:5px;color:#ccd7e0;line-height:1.45}
  .nw-continuity-definition{max-width:860px;margin:0 auto 18px;padding:12px 16px;border:1px solid #38506a;border-radius:14px;background:rgba(105,183,255,.06);color:#d5e2ec;text-align:center;line-height:1.5}
  .nw-calculus-grid{display:grid;grid-template-columns:minmax(180px,.55fr) minmax(0,1.65fr) minmax(180px,.55fr);gap:14px;align-items:stretch}.nw-side-card{display:flex;flex-direction:column;justify-content:center;padding:18px;border:1px solid #31516b;border-radius:18px;background:rgba(6,19,30,.78);color:#c8d5df;line-height:1.55;text-align:center}.nw-side-card strong{color:#70c1ff;font-size:18px}.nw-side-card.gold strong{color:#f5c84b}.nw-packet-icon{width:72px;height:72px;margin:0 auto 14px;border:2px solid #66c2ff;border-radius:16px;transform:rotate(30deg);box-shadow:0 0 24px rgba(105,183,255,.25)}.nw-packet-icon:after{content:"";display:block;width:34px;height:34px;margin:17px;border:1px solid #f5c84b;border-radius:8px}
  .nw-layers{padding:14px;border:1px solid rgba(245,200,75,.52);border-radius:20px;background:linear-gradient(180deg,rgba(245,200,75,.08),rgba(7,16,26,.9))}.nw-layers h3{margin:0 0 12px;color:#f0d18a;text-align:center;font-family:Georgia,serif;font-size:clamp(20px,3vw,30px);letter-spacing:.06em}.nw-layer{display:grid;grid-template-columns:42px minmax(160px,.75fr) minmax(0,1.25fr);gap:12px;align-items:center;padding:11px 12px;border-top:1px solid rgba(245,200,75,.24)}.nw-layer:first-of-type{border-top:0}.nw-layer-num{display:grid;place-items:center;width:34px;height:34px;border:1px solid #f5c84b;border-radius:50%;color:#f5c84b;font-weight:950}.nw-layer-name{color:#f0d18a;font-weight:900;letter-spacing:.04em;text-transform:uppercase}.nw-layer-copy{color:#c5d0d8;line-height:1.45}
  .nw-systems{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;margin-top:18px}.nw-system{padding:12px 8px;border:1px solid #32485c;border-radius:13px;background:rgba(6,14,22,.88);text-align:center}.nw-system strong{display:block;color:#f0d18a;font-size:12px;text-transform:uppercase;letter-spacing:.05em}.nw-system span{display:block;margin-top:5px;color:#8fa1b1;font-size:11px;line-height:1.35}.nw-systems-note{margin:12px 0 0;color:#99b8d3;text-align:center;font-weight:850;letter-spacing:.04em}
  .nw-executive{display:grid;grid-template-columns:1.1fr .9fr;gap:14px;margin-top:18px}.nw-exec-card{padding:18px;border:1px solid #334a5d;border-radius:18px;background:rgba(6,14,22,.84)}.nw-exec-card h3{margin:0 0 12px;color:#f0d18a;font-family:Georgia,serif;letter-spacing:.06em}.nw-exec-points{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.nw-exec-point{padding:12px;border:1px solid rgba(255,255,255,.07);border-radius:12px;color:#c2cdd6;font-size:12px;line-height:1.4;text-align:center}.nw-doctrine{display:flex;align-items:center;justify-content:center;padding:20px;color:#f0d18a;font-family:Georgia,serif;font-size:clamp(22px,4vw,37px);line-height:1.35;text-align:center}.nw-final-line{margin-top:16px;padding:14px;border:1px solid rgba(245,200,75,.5);border-radius:15px;color:#9ed3ff;text-align:center;font-weight:950;letter-spacing:.08em;text-transform:uppercase}.nw-final-line strong{color:#f0d18a}
  @media(max-width:900px){.nw-ambient-frame{inset:-10%;width:120%;height:120%;opacity:.18}.nw-continuity{width:min(100% - 18px,1120px);margin-top:38px;padding:22px 15px;border-radius:24px}.nw-calculus-grid{grid-template-columns:1fr}.nw-side-card{min-height:150px}.nw-systems{grid-template-columns:repeat(2,minmax(0,1fr))}.nw-executive{grid-template-columns:1fr}.nw-exec-points{grid-template-columns:repeat(2,minmax(0,1fr))}.nw-layer{grid-template-columns:38px 1fr}.nw-layer-copy{grid-column:2}.nw-continuity h2{font-size:clamp(34px,12vw,49px)}}
  @media(prefers-reduced-motion:reduce){.nw-ambient-box{animation:none!important}.nw-ambient-frame{display:none}}
</style>`;

export const ambientBackgroundHtml = `<div class="nw-ambient-bg" aria-hidden="true">
  <iframe class="nw-ambient-frame" src="/living-signals/conveyor-telemetry" tabindex="-1" loading="eager" title=""></iframe>
  <div class="nw-ambient-fallback"></div>
  <div class="nw-ambient-belt"></div>
  <div class="nw-ambient-box nw-box-a"></div>
  <div class="nw-ambient-box nw-box-b"></div>
  <div class="nw-ambient-box nw-box-c"></div>
  <div class="nw-ambient-box nw-box-d"></div>
  <div class="nw-ambient-box nw-box-e"></div>
</div>`;

const layers = [
  ["Transport integrity", "The packet arrives without loss or tampering."],
  ["Semantic identity", "The information keeps the same meaning across systems."],
  ["Contextual continuity", "The reason it matters remains attached to the work."],
  ["Constitutional authority", "The system knows who may act, how, and within what bounds."],
  ["Operational state transition", "Work moves forward without silent breaks, duplication or fake completion."],
  ["Assurance and verification", "Receipts, evidence and auditability prove what actually happened."],
];

const systems = [
  ["Models", "Any LLM or specialized model"],
  ["AI agents", "Any agent or assistant"],
  ["Clouds", "Any cloud or environment"],
  ["Tools", "Any tool or service"],
  ["Workflows", "Any process or automation"],
  ["Departments", "Any team or function"],
  ["Systems", "Any system or application"],
];

export const continuityCalculusHtml = `<section class="nw-continuity" id="continuity-calculus">
  <header>
    <span class="nw-continuity-eyebrow">The method behind the work</span>
    <h2>NULLWORKS Continuity Calculus</h2>
    <p class="nw-continuity-intro">A mobile-responsive version of Mason's Continuity Calculus infographic. It shows how NULLWORKS keeps meaning, context, authority, state and proof intact while work moves between people, AI models, tools, workflows and software systems.</p>
  </header>
  <div class="nw-calculus" role="img" aria-label="NULLWORKS Continuity Calculus infographic">
    <div class="nw-calculus-title"><strong>NULLWORKS</strong><span>Continuity Calculus · the framework above models, tools and workflows</span></div>
    <div class="nw-authority"><strong>FINAL HUMAN AUTHORITY</strong><span>Humans set intent. Humans decide. Humans can always intervene.</span></div>
    <div class="nw-continuity-definition">A constitutionally federated architecture that preserves governability and keeps human authority final.</div>
    <div class="nw-calculus-grid">
      <div class="nw-side-card"><div class="nw-packet-icon"></div><strong>Continuity packet</strong><span>Data + meaning + context + authority + state + verification</span></div>
      <div class="nw-layers"><h3>Constitutionally Federated Continuity Architecture</h3>${layers.map((layer,index)=>`<div class="nw-layer"><span class="nw-layer-num">${index+1}</span><span class="nw-layer-name">${layer[0]}</span><span class="nw-layer-copy">${layer[1]}</span></div>`).join("")}</div>
      <div class="nw-side-card gold"><strong>Software normally carries only the first.</strong><span>Humans silently carry the other five.<br><br>NULLWORKS makes the system carry all six.</span></div>
    </div>
    <div class="nw-systems">${systems.map(system=>`<div class="nw-system"><strong>${system[0]}</strong><span>${system[1]}</span></div>`).join("")}</div>
    <p class="nw-systems-note">NULLWORKS sits above and coordinates them — not inside or replacing them.</p>
    <div class="nw-executive">
      <div class="nw-exec-card"><h3>Executive value — why it matters</h3><div class="nw-exec-points"><div class="nw-exec-point">Preserves governability</div><div class="nw-exec-point">Keeps human authority final</div><div class="nw-exec-point">Routes the right tool for the job</div><div class="nw-exec-point">Prevents AI from amplifying broken workflow</div></div></div>
      <div class="nw-exec-card nw-doctrine">Move the data.<br>Preserve the why.<br>Bound the authority.<br>Carry the receipt.</div>
    </div>
    <div class="nw-final-line"><strong>Use any model.</strong> Keep the work governed. Escalate only when needed.<br>No fake finish lines.</div>
  </div>
</section>`;
