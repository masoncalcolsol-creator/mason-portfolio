const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Software Project Engineer Is the Bridge | Mason Perry</title>
<meta name="description" content="A role-specific NULLWORKS field case connecting industrial logistics automation, customer operations, software implementation, QA, and human-AI systems architecture." />
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 85% 0%,#3d2b08 0,#10100d 31%,#080907 72%);color:#f5f1e8;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}main{max-width:1120px;margin:auto;padding:32px 20px 76px}.top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:58px}.brand{font-weight:950;letter-spacing:.08em}.brand span{color:#e7b84d}.contact{background:#e7b84d;color:#15130d;text-decoration:none;padding:12px 17px;border-radius:999px;font-weight:900}.eyebrow{color:#e7b84d;font-size:12px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}.hero h1{font-size:clamp(48px,9vw,92px);line-height:.9;letter-spacing:-.06em;margin:15px 0 24px;max-width:980px}.lead{font-size:clamp(18px,2.5vw,25px);line-height:1.55;color:#c8c1b3;max-width:900px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:15px;margin:34px 0}.card{border:1px solid #373329;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018));padding:22px}.card h2,.card h3{margin-top:0}.card p,.card li{color:#c7c0b4;line-height:1.58}.metric{font-size:43px;line-height:1;color:#e7b84d;font-weight:950;letter-spacing:-.05em}.label{margin-top:8px;color:#a9a294;font-size:12px;text-transform:uppercase;letter-spacing:.1em;font-weight:850}.wide{grid-column:1/-1}.quote{border-left:4px solid #e7b84d;padding:10px 0 10px 20px;font-size:clamp(23px,3.8vw,38px);line-height:1.2;font-weight:850;margin:48px 0}.match{display:grid;grid-template-columns:220px 1fr;gap:18px;padding:17px 0;border-bottom:1px solid #312e27}.match strong{color:#f3d58d}.truth{background:#18150f;border:1px solid #775917}.truth strong{color:#e7b84d}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.actions a{padding:12px 16px;border-radius:999px;text-decoration:none;font-weight:900}.actions a:first-child{background:#e7b84d;color:#15130d}.actions a:last-child{border:1px solid #5c5547;color:#f5f1e8}@media(max-width:650px){.match{grid-template-columns:1fr}.top{align-items:flex-start}.hero h1{font-size:50px}}
</style>
</head>
<body><main>
<header class="top"><div class="brand"><span>NULL</span>WORKS / MASON PERRY</div><a class="contact" href="mailto:masoncalcolsol@gmail.com?subject=Toyota%20Automated%20Logistics%20Software%20Project%20Engineer">CONTACT MASON</a></header>
<section class="hero">
<div class="eyebrow">Role-specific field case // warehouse automation // software integration</div>
<h1>Software Project Engineer Is the Bridge.</h1>
<p class="lead">Toyota Automated Logistics needs someone who can understand the customer operation, help software teams make the right design decisions, test the complete system, train the user, and remain accountable where physical and digital layers meet.</p>
</section>
<section class="grid">
<article class="card"><div class="metric">48</div><div class="label">conveyor feed chutes</div><p>A suspected controls problem was traced to systemic mechanical installation misalignment. The receipt: investigate software, hardware, installation, and operation as one production system.</p></article>
<article class="card"><div class="metric">94→11s</div><div class="label">governed AI workroom startup</div><p>The model did not change. The workflow did: current state separated from history, a known entry point, fewer source reads, a defined readiness gate, and a required receipt.</p></article>
<article class="card"><div class="metric">LIVE OPS</div><div class="label">industrial logistics foundation</div><p>USPS conveyors, OCR and scanning, sensors, controls, networks, electrical and mechanical systems, material-handling equipment, and production recovery.</p></article>
<article class="card wide"><h2>Posting need → operating evidence</h2>
<div class="match"><strong>Customer operations into system design</strong><span>Field observation, workflow discovery, exception mapping, requirements translation, and evidence-first separation of actual operating conditions from assumed software causes.</span></div>
<div class="match"><strong>Installation, testing, debugging, turnover</strong><span>Cross-layer fault isolation and recovery across equipment, controls, networks, data, applications, operator behavior, and handoff conditions.</span></div>
<div class="match"><strong>Work with software developers</strong><span>AI-assisted delivery across requirements, architecture framing, implementation, QA, defect receipts, documentation, and prioritized handoffs.</span></div>
<div class="match"><strong>Training and lifecycle support</strong><span>Human-readable work instructions, operator-facing explanation, escalation paths, source receipts, and recovery plans that remain useful after installation day.</span></div>
</article>
</section>
<div class="quote">I am not trying to replace deep production engineering. I make sure deep production engineering is solving the right operational problem.</div>
<section class="grid">
<article class="card"><h3>What I bring</h3><ul><li>High-throughput warehouse and material-handling experience</li><li>Operational diagnosis under uptime pressure</li><li>Customer workflow translated into implementable system requirements</li><li>Rapid software prototyping, QA, telemetry, and handoff design</li><li>Human authority, escalation, and failure receipts built into the work</li></ul></article>
<article class="card"><h3>The honest bridge</h3><p>I do not present myself as the deepest conventional software developer in the room. My degree is not in engineering, and I do not claim years of production SQL Server or Oracle administration.</p><p>I bring the operation, systems reasoning, customer translation, field troubleshooting, implementation discipline, and rapidly expanding software fluency.</p></article>
<article class="card truth wide"><h3>Truth boundary</h3><p><strong>Independent application page.</strong> This explains role fit. It does not claim employment by, endorsement from, affiliation with, or participation by Toyota Automated Logistics. Prototype work is not represented as unverified production experience. Mason Perry remains final Human Authority.</p></article>
</section>
<div class="actions"><a href="mailto:masoncalcolsol@gmail.com?subject=Toyota%20Automated%20Logistics%20Conversation">START A CONVERSATION</a><a href="/field-notes/software-project-engineer-bridge">READ THE FULL FIELD NOTE</a></div>
</main></body></html>`;

export function GET() {
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-nullworks-receipt": "TOYOTA_BRIDGE_DIRECT_ROUTE_V1",
    },
  });
}
