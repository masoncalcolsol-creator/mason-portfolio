export const visualEnhancementStyles = `<style>
  html{background:#050607!important}
  body{background:transparent!important;isolation:isolate}
  body>*:not(.nw-ambient-bg){position:relative;z-index:1}
  .nw-ambient-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:#050607}
  .nw-ambient-frame{position:absolute;inset:0;width:100%;height:100%;border:0;opacity:.72;filter:saturate(1.02) contrast(1.04)}
  .nw-ambient-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,6,7,.16),rgba(5,6,7,.30) 38%,rgba(5,6,7,.40))}

  /* Match the Living Signal visual system: translucent surfaces, visible motion. */
  .hero{background:linear-gradient(180deg,rgba(8,10,11,.40),rgba(7,9,12,.70))!important;backdrop-filter:blur(7px)}
  .heroShade{background:linear-gradient(90deg,rgba(7,9,12,.84) 0%,rgba(7,9,12,.67) 42%,rgba(7,9,12,.12) 72%,rgba(7,9,12,.52) 100%)!important}
  .heroStat,.card,.definition,.proofMain,.status,.priceBand,.price,.money,.opsBox,.llcCard,.final{background:linear-gradient(145deg,rgba(255,216,77,.025),rgba(8,10,11,.68))!important;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)}
  .flowBox,.gateRow{background:rgba(8,10,11,.64)!important;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)}
  .section{padding-top:92px!important;padding-bottom:92px!important}
  .section + .section{margin-top:34px}
  .cards,.proofGrid,.prices,.moneyGrid,.ops,.llc{gap:20px!important}
  .nw-network{margin-top:104px!important;margin-bottom:104px!important;background:linear-gradient(145deg,rgba(255,216,77,.03),rgba(8,10,11,.62))!important;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .nw-network-card{background:rgba(8,10,11,.66)!important;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)}

  .nw-continuity{width:min(1180px,calc(100% - 28px));margin:112px auto;padding:clamp(18px,4vw,38px);border:1px solid rgba(255,216,77,.26);border-radius:30px;background:linear-gradient(145deg,rgba(255,216,77,.03),rgba(8,10,11,.58));color:#f3f6f8;font-family:Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;box-shadow:0 30px 90px rgba(0,0,0,.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .nw-continuity *{box-sizing:border-box}.nw-continuity-eyebrow{display:inline-flex;padding:7px 10px;border:1px solid #536171;border-radius:999px;color:#ffd84d;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.nw-continuity h2{margin:18px 0 12px;font-size:clamp(34px,7vw,60px);line-height:.96;letter-spacing:-.052em}.nw-continuity-intro{margin:0;color:#c0c8cf;font-size:clamp(16px,2.2vw,19px);line-height:1.58}.nw-continuity-image-link{display:block;margin-top:24px;border:1px solid rgba(255,216,77,.35);border-radius:22px;overflow:hidden;background:#07101a;box-shadow:0 24px 70px rgba(0,0,0,.38)}.nw-continuity-image{display:block;width:100%;height:auto;object-fit:contain}.nw-continuity-hint{margin:12px 3px 0;color:#9ca8b2;font-size:13px;text-align:center}

  @media(max-width:840px){
    .nw-ambient-frame{opacity:.78}
    .nw-ambient-shade{background:linear-gradient(180deg,rgba(5,6,7,.10),rgba(5,6,7,.27) 44%,rgba(5,6,7,.36))}
    .heroShade{background:linear-gradient(180deg,rgba(7,9,12,.60),rgba(7,9,12,.74) 54%,rgba(7,9,12,.82))!important}
    .section{padding-top:76px!important;padding-bottom:76px!important}
    .section + .section{margin-top:44px}
    .nw-continuity,.nw-network{width:min(100% - 18px,1180px)!important;margin-top:92px!important;margin-bottom:92px!important;padding:22px 15px!important;border-radius:24px!important}
  }
  @media(prefers-reduced-motion:reduce){.nw-ambient-frame{display:none}}
</style>`;

export const ambientBackgroundHtml = `<div class="nw-ambient-bg" aria-hidden="true">
  <iframe class="nw-ambient-frame" src="/amanda-conveyor" tabindex="-1" loading="eager" title=""></iframe>
  <div class="nw-ambient-shade"></div>
</div>`;

export const continuityCalculusHtml = `<section class="nw-continuity" id="continuity-calculus">
  <header>
    <span class="nw-continuity-eyebrow">The complete framework</span>
    <h2>NULLWORKS Continuity Calculus</h2>
    <p class="nw-continuity-intro">The original full-resolution infographic is preserved as one complete image so the entire architecture can be seen together rather than reconstructed into separate scrolling pieces.</p>
  </header>
  <a class="nw-continuity-image-link" href="/amanda-brief?asset=continuity-calculus" target="_blank" rel="noopener noreferrer" aria-label="Open the full-resolution Continuity Calculus infographic">
    <img class="nw-continuity-image" src="/amanda-brief?asset=continuity-calculus" alt="NULLWORKS Continuity Calculus full infographic" loading="eager" decoding="async">
  </a>
  <p class="nw-continuity-hint">Tap the image to open the original at full resolution.</p>
</section>`;
