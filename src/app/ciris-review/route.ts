import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "nw_ciris_review";
const ROUTE = "/ciris-review";
const SALT = "NULLWORKS-CIRIS-ERIC-2026-07-31";
const EXPECTED = createHash("sha256").update(`0731:${SALT}`).digest("hex");

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[ch] ?? ch));
}

function digest(value: string): string {
  return createHash("sha256").update(`${value}:${SALT}`).digest("hex");
}

function secureEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  return left.length === right.length && timingSafeEqual(left, right);
}

function shell(title: string, body: string, extraHead = ""): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex" />
<meta name="theme-color" content="#07090d" />
<title>${escapeHtml(title)}</title>
${extraHead}
<style>
:root{color-scheme:dark;--bg:#07090d;--panel:#0e141d;--panel2:#121b28;--text:#f8f6f2;--muted:#aab4c1;--orange:#ff6a1a;--blue:#4d95ff;--green:#5de2a5;--amber:#ffbd65;--line:rgba(255,255,255,.12);--orangeLine:rgba(255,106,26,.42);--max:1040px;--r:22px}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 92% 0,rgba(77,149,255,.15),transparent 26rem),radial-gradient(circle at 0 22%,rgba(255,106,26,.14),transparent 25rem),linear-gradient(180deg,#06080c,#0a1018 48%,#06080c);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.55}.wrap{width:min(var(--max),calc(100% - 28px));margin:auto}.nav{position:sticky;top:0;z-index:40;border-bottom:1px solid var(--line);background:rgba(7,9,13,.84);backdrop-filter:blur(18px)}.navin{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0}.brand{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:950;letter-spacing:.11em;text-transform:uppercase}.mark{display:grid;place-items:center;width:35px;height:35px;border-radius:10px;background:linear-gradient(145deg,var(--orange),#291308 58%,#050505);border:1px solid rgba(255,255,255,.16);box-shadow:0 0 28px rgba(255,106,26,.25)}.stamp{font-size:11px;color:var(--amber);letter-spacing:.12em;text-transform:uppercase}.hero{padding:54px 0 34px;border-bottom:1px solid var(--line)}.eyebrow{font-size:12px;font-weight:950;color:var(--orange);letter-spacing:.16em;text-transform:uppercase;margin-bottom:15px}h1{font-size:clamp(38px,8vw,78px);line-height:.94;letter-spacing:-.055em;margin:0;text-transform:uppercase}h1 span{color:var(--orange)}.lead{font-size:clamp(17px,2.2vw,22px);color:#e4e8ee;max-width:820px}.truth{margin-top:22px;border:1px solid var(--orangeLine);background:rgba(255,106,26,.08);padding:15px 17px;border-radius:16px;color:#f7dfcf}.section{padding:44px 0}.section h2{font-size:clamp(28px,5vw,48px);line-height:1;margin:0 0 18px;letter-spacing:-.04em;text-transform:uppercase}.section h3{margin:0 0 8px;font-size:19px}.grid{display:grid;gap:14px}.cols2{grid-template-columns:repeat(2,1fr)}.cols3{grid-template-columns:repeat(3,1fr)}.card{border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.04),transparent),rgba(14,20,29,.88);border-radius:var(--r);padding:19px;box-shadow:0 14px 40px rgba(0,0,0,.22)}.card.hot{border-color:var(--orangeLine);background:linear-gradient(145deg,rgba(255,106,26,.12),rgba(10,15,22,.94))}.card p,.card li{color:var(--muted)}.card p{margin:0}.metric{font-size:36px;font-weight:950;line-height:1;color:var(--green);margin-bottom:8px}.metric.amber{color:var(--amber)}.metric.blue{color:var(--blue)}.tag{display:inline-block;padding:5px 8px;border-radius:999px;border:1px solid var(--line);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.finding{border-left:4px solid var(--orange);padding-left:15px;margin:22px 0}.finding p{color:var(--muted);margin:7px 0}.finding b{color:var(--text)}.receipt{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#c6d5ea;word-break:break-all}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}.btn{appearance:none;border:1px solid var(--orangeLine);background:rgba(255,106,26,.08);color:var(--text);font:inherit;font-weight:900;padding:12px 15px;border-radius:999px;cursor:pointer}.btn.primary{background:linear-gradient(135deg,var(--orange),#9a310b);border-color:rgba(255,255,255,.16)}.footer{padding:28px 0 50px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}.gate{min-height:100dvh;display:grid;place-items:center;padding:22px}.gatebox{width:min(520px,100%);border:1px solid var(--orangeLine);border-radius:30px;background:radial-gradient(circle at 90% 0,rgba(255,106,26,.18),transparent 18rem),rgba(10,14,20,.94);padding:clamp(24px,7vw,44px);box-shadow:0 35px 100px rgba(0,0,0,.58)}.gatebox h1{font-size:clamp(34px,10vw,58px)}label{display:block;margin:22px 0 8px;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--amber)}input{width:100%;font:inherit;font-size:24px;letter-spacing:.28em;text-align:center;background:#070b11;color:var(--text);border:1px solid var(--line);border-radius:16px;padding:14px;outline:none}input:focus{border-color:var(--orange);box-shadow:0 0 0 4px rgba(255,106,26,.14)}.error{color:#ff9999;margin-top:12px}.small{font-size:12px;color:var(--muted)}ul{padding-left:20px}@media(max-width:760px){.cols2,.cols3{grid-template-columns:1fr}.navin{align-items:flex-start}.stamp{text-align:right;font-size:9px}.hero{padding-top:38px}.section{padding:36px 0}.card{padding:17px}.btn{width:100%}}@media print{.nav,.actions,.footer{display:none}.hero,.section{padding:20px 0}.card{break-inside:avoid}body{background:#fff;color:#000}.card,.truth{background:#fff;color:#000;box-shadow:none}.card p,.card li,.finding p{color:#333}}
</style>
</head>
<body>${body}</body></html>`;
}

function gate(error = ""): string {
  return shell("CIRIS Review | Confidential Gate", `<main class="gate"><section class="gatebox">
<div class="brand"><span class="mark">N</span> NULLWORKS / OPERATIONAL INTELLIGENCE</div>
<div style="height:34px"></div>
<div class="eyebrow">Confidential Builder Review</div>
<h1>CIRIS <span>Assurance</span></h1>
<p class="lead">Private preliminary review prepared for Eric Moore / CIRISAI.</p>
<form method="post" action="${ROUTE}">
<label for="passcode">Review passcode</label>
<input id="passcode" name="passcode" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="12" required autofocus />
<div class="actions"><button class="btn primary" type="submit">Open field report</button></div>
${error ? `<p class="error">${escapeHtml(error)}</p>` : ""}
</form>
<p class="small">Server-side review gate. No report content is delivered before authorization. This is not high-security secret storage; the four-digit passcode was selected for a private builder handoff.</p>
</section></main>`);
}

function report(): string {
  return shell("CIRIS Operational Assurance Review | NULLWORKS", `<header class="nav"><div class="wrap navin"><div class="brand"><span class="mark">N</span> NULLWORKS</div><div class="stamp">Confidential / Eric Review / 2026-07-31</div></div></header>
<main>
<section class="hero"><div class="wrap"><div class="eyebrow">Operational Assurance Field Report V1.0</div><h1>CIRIS <span>builder review</span></h1><p class="lead"><b>Prepared for Eric Moore / CIRISAI.</b> Read-only, source-preserving, builder-respectful inspection of authority, deferral, trace custody, completion semantics, and correction architecture.</p><div class="truth"><b>Truth boundary:</b> exact source pins were installed in an isolated GitHub-hosted runner; 42 selected project tests were independently rerun; deterministic source checks were executed. No production deployment, certification, exploitability, or universal-correctness claim is implied.</div><div class="actions"><button class="btn primary" onclick="window.print()">Print / save review</button><a class="btn" href="#findings">Jump to findings</a></div></div></section>
<section class="section"><div class="wrap"><h2>Preliminary disposition</h2><div class="grid cols2"><article class="card hot"><span class="tag">Assessment</span><h3>Credible architecture / conditional assurance</h3><p>CIRIS is a substantive constitutional AI architecture, not a superficial guardrail wrapper. Its strongest controls are meaningful and testable.</p></article><article class="card"><span class="tag">Primary seam</span><h3>Role is not jurisdiction</h3><p>CIRIS can prove that a human has sufficient system role more readily than it can prove that the human is the correct authority for the particular decision.</p></article></div></div></section>
<section class="section"><div class="wrap"><h2>Receipted test campaign</h2><div class="grid cols3"><article class="card"><div class="metric">42 / 42</div><h3>Targeted tests passed</h3><p>Wise Authority permissions, timed reactivation, LensCore integration, conscience helpers, and updated-status reconsideration.</p></article><article class="card"><div class="metric blue">10 / 10</div><h3>Source checks passed</h3><p>Pinned-code and documentary controls were separated from models and runtime claims.</p></article><article class="card"><div class="metric amber">PINNED</div><h3>Exact source custody</h3><p>CIRISAgent 2.9.6 commit <span class="receipt">7f2369b...</span><br/>CIRISPersist commit <span class="receipt">e8cdb53...</span></p></article></div><div class="grid cols2" style="margin-top:14px"><article class="card"><h3>Environment</h3><p>Ubuntu 24.04 / Python 3.12 / isolated virtual environment / captured pip freeze / JUnit XML / SHA-256 manifest.</p></article><article class="card"><h3>Rust boundary</h3><p>The selected CIRISPersist unit-test build reached native compilation but required the host TPM2-TSS development library. This is preserved as an environment dependency receipt, not counted as a product-test failure.</p></article></div></div></section>
<section class="section"><div class="wrap"><h2>What CIRIS gets right</h2><div class="grid cols2"><article class="card"><h3>Real decision pipeline</h3><p>H3ERE exposes separate reasoning, conscience, reconsideration, dispatch, and completion boundaries.</p></article><article class="card"><h3>Persistent deferral lineage</h3><p>Deferred tasks remain identifiable; approved guidance creates a linked new task rather than silently mutating history.</p></article><article class="card"><h3>Domain-aware service routing</h3><p>Domain hints meaningfully constrain which Wise Authority services receive specialized matters.</p></article><article class="card"><h3>Strong completed-trace custody</h3><p>LensCore assembly, consent gate, canonicalization, signature, tee, and persistence paths were represented and selected integration tests passed.</p></article><article class="card"><h3>Append-only correction</h3><p>SUPERSEDES, WITHDRAWS, and RECANTS preserve history and project current effective state deterministically.</p></article><article class="card"><h3>Honest compliance discipline</h3><p>CIRIS publicly records known gaps, baseline methodology, source requirements, and open dependencies.</p></article></div></div></section>
<section id="findings" class="section"><div class="wrap"><h2>Load-bearing findings</h2>
<div class="finding"><h3>1. Service routing does not yet prove human jurisdiction</h3><p><b>Observed:</b> domain hints constrain services, while the local human resolution gate and project test remain role-wide. The project test expects a medical-scoped AUTHORITY to resolve a financial resource.</p><p><b>Repair:</b> bind domain, resource, scope, delegation, time validity, and assignment into the signed human authority object.</p></div>
<div class="finding"><h3>2. Timed human deferrals can resume unresolved</h3><p><b>Observed:</b> timeout reactivation changes both original task and thought from DEFERRED to PENDING; the selected regression tests passed.</p><p><b>Repair:</b> separate approval-required semantics from time scheduling; default to EXPIRED_UNRESOLVED.</p></div>
<div class="finding"><h3>3. Exact-decision signature custody is incomplete in the core resolver</h3><p><b>Observed:</b> DeferralResponse requires a signature, but resolve_deferral does not consume or preserve response.signature.</p><p><b>Repair:</b> verify canonical decision bytes before state mutation and preserve signature, key ID, verification result, and certificate status.</p></div>
<div class="finding"><h3>4. TASK_COMPLETE is consequential but normal-faculty exempt</h3><p><b>Observed:</b> bypass guardrails still run; normal ethical faculties exempt TASK_COMPLETE, RECALL, OBSERVE, and REJECT.</p><p><b>Repair:</b> require completion evidence or a dedicated semantic completion validator.</p></div>
<div class="finding"><h3>5. Signed completed traces do not preserve every attempted path</h3><p><b>Observed:</b> ACTION_RESULT seals; orphan partial traces are swept. Selected real-substrate tests passed.</p><p><b>Repair:</b> emit INCOMPLETE_TRACE or PROCESS_ABORTED receipts before purge.</p></div>
<div class="finding"><h3>6. Forward corrigibility is stronger than post-action redress</h3><p><b>Observed:</b> PONDER and DEFER are strong; a general user-facing rollback path for completed external actions has not been demonstrated.</p><p><b>Repair:</b> expose a first-class CEG correction workflow that preserves the original action and current effective state.</p></div>
<div class="finding"><h3>7. Compliance prose sometimes collapses distinct control layers</h3><p><b>Observed:</b> schema, classifier, service routing, role authentication, jurisdiction, exact signature, audit custody, trace sealing, and federation projection are sometimes described together.</p><p><b>Repair:</b> generate machine-readable enforcement-state badges for every compliance claim.</p></div>
</div></section>
<section class="section"><div class="wrap"><h2>Builder priority order</h2><div class="card hot"><ol><li>Bind authority resolution to jurisdiction and resource scope.</li><li>Separate human approval from timeout semantics.</li><li>Verify and preserve the exact decision signature.</li><li>Receipt incomplete traces.</li><li>Validate semantic completion.</li><li>Expose ordinary human-facing CEG redress.</li><li>Generate control-state labels from executable checks.</li></ol></div></div></section>
<section class="section"><div class="wrap"><h2>The next step</h2><div class="card"><p style="font-size:clamp(22px,4vw,38px);line-height:1.12;color:var(--text);font-weight:950;margin:0">The next step is not simply to add a human. CIRIS already has humans. The next step is to make <span style="color:var(--orange)">human authority as mechanically inspectable as agent reasoning.</span></p></div></div></section>
</main><footer class="footer"><div class="wrap"><b>NULLWORKS / OPERATIONAL INTELLIGENCE</b><br/>Evidence constrains the finding. Human Authority governs the decision. Receipts preserve the process.<br/><br/>No provider affiliation implied. Human Authority remains final.</div></footer>`);
}

function authorized(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  return secureEqual(token, EXPECTED);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const response = new NextResponse(authorized(request) ? report() : gate(), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store, max-age=0",
      "x-robots-tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
      "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    },
  });
  return response;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const form = await request.formData();
  const passcode = String(form.get("passcode") ?? "").trim();
  if (!secureEqual(digest(passcode), EXPECTED)) {
    return new NextResponse(gate("Passcode not accepted."), {
      status: 401,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "private, no-store, max-age=0",
        "x-robots-tag": "noindex, nofollow, noarchive",
      },
    });
  }

  const response = NextResponse.redirect(new URL(ROUTE, request.url), 303);
  response.cookies.set(COOKIE_NAME, EXPECTED, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: ROUTE,
    maxAge: 60 * 60 * 8,
  });
  response.headers.set("cache-control", "private, no-store, max-age=0");
  return response;
}
