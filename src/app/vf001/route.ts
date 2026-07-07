const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NULLWORKS Voice Foundry RUN-001</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 20% 0%,#1d291a,#090c0a 48%);color:#f4f7ef;font-family:Inter,system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:48px 22px 80px}.eyebrow{color:#d7ff2f;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}h1{font-size:clamp(42px,9vw,82px);line-height:.92;margin:16px 0 20px}.lead{font-size:20px;line-height:1.55;color:#aab8aa;max-width:850px}.pills{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0}.pill{border:1px solid #2c372e;border-radius:999px;padding:9px 13px;color:#aab8aa;background:#0e130f}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:28px}.card{border:1px solid #2c372e;border-radius:20px;padding:20px;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015))}.metric{font-size:44px;color:#d7ff2f;font-weight:900}.muted{color:#9cad9c;line-height:1.55}.full{grid-column:1/-1}.step{display:grid;grid-template-columns:140px 1fr 110px;gap:12px;padding:13px 0;border-bottom:1px solid #2c372e}.ok{color:#d7ff2f;font-weight:900}.warn{color:#ffd166;font-weight:900}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#070a08;padding:16px;border-radius:14px;border:1px solid #2c372e;color:#cbd7c6}button{background:#d7ff2f;color:#090c0a;border:0;border-radius:999px;padding:11px 15px;font-weight:900}@media(max-width:650px){.step{grid-template-columns:1fr}h1{font-size:46px}}
</style>
</head>
<body><main>
<div class="eyebrow">NULLWORKS VOICE FOUNDRY / RUN-001</div>
<h1>Toyota Operational Telemetry Cell</h1>
<p class="lead">Direct route-handler deployment. This page bypasses the failed redirect, nested static file, and portfolio layout. Its purpose is to prove which production deployment the public alias is serving.</p>
<div class="pills"><span class="pill">Human Authority: Mason Perry</span><span class="pill">AI workroom, not human</span><span class="pill">Toyota participation not claimed</span><span class="pill">Corporate WiFi not required</span></div>
<section class="grid">
<article class="card"><div class="metric">11s</div><p class="muted">Verified V1 time to governed working floor</p></article>
<article class="card"><div class="metric">0</div><p class="muted">Corporate WiFi calls required for recovery</p></article>
<article class="card"><div class="metric">404×2</div><p class="muted">Owner-confirmed failed public-route checks preserved</p></article>
<article class="card"><div class="metric">TEST</div><p class="muted">Direct top-level production alias diagnostic</p></article>
<article class="card full"><h2>Execution ledger</h2>
<div class="step"><strong>01 / GitHub</strong><span>Governed packet, research brief, and schema committed</span><span class="ok">SUCCEEDED</span></div>
<div class="step"><strong>02 / Gmail</strong><span>Research outreach draft created, not sent</span><span class="ok">SUCCEEDED</span></div>
<div class="step"><strong>03 / Calendar</strong><span>Human review gate created</span><span class="ok">SUCCEEDED</span></div>
<div class="step"><strong>04 / Vercel</strong><span>Prior builds passed CI but public alias returned 404 twice</span><span class="warn">FAILED LIVE</span></div>
<div class="step"><strong>05 / VF001</strong><span>Direct route handler installed to isolate alias mapping</span><span class="warn">REVERIFY</span></div>
</article>
<article class="card full"><h2>Truth boundary</h2><p class="muted">A green Vercel check does not prove that the production alias serves the new deployment. Mason's screenshots control the live-route state. No Toyota participation, customer use, endorsement, or production reliability is claimed.</p></article>
<article class="card full"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><h2>Receipt</h2><button id="copy">Copy receipt JSON</button></div><pre id="receipt"></pre></article>
</section></main>
<script>
const receipt={run_id:'VOICE_FOUNDRY_RUN_001',route:'/vf001',implementation:'direct Next.js route handler returning HTML',human_authority:'Mason Perry',prior_owner_checks:[{time_local:'06:42 MST',result:'404'},{time_local:'07:03 MST',result:'404'}],current_state:'DIRECT_ALIAS_DIAGNOSTIC_AWAITING_OWNER_CHECK',toyota_participation_claimed:false,exact_next_action:'Open /vf001 on the same public domain. If it renders, the original nested route was the failure. If it returns 404, the production alias is not serving the latest GitHub deployment.'};
const text=JSON.stringify(receipt,null,2);document.getElementById('receipt').textContent=text;document.getElementById('copy').onclick=async()=>{try{await navigator.clipboard.writeText(text);document.getElementById('copy').textContent='Copied'}catch(e){document.getElementById('copy').textContent='Copy failed'}};
</script></body></html>`;

export function GET() {
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-nullworks-receipt": "VOICE_FOUNDRY_RUN_001_VF001",
    },
  });
}
