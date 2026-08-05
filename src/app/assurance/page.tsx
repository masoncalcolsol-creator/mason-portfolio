import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operational Assurance Services | NULLWORKS",
  description:
    "Triage, architecture diagnosis, operational pressure testing, remediation planning, and retest receipts for consequential AI systems.",
  robots: {
    index: true,
    follow: true,
  },
};

const triageEmail =
  "mailto:nullworks.neuraxis@gmail.com?subject=I%27m%20interested%20in%20NULLWORKS%20Triage&body=I%27m%20interested%20in%20NULLWORKS%20Triage.%0A%0AName%3A%0ACompany%20or%20project%3A%0ASystem%20or%20product%20URL%3A%0AWhat%20the%20system%20claims%20to%20do%3A%0AWhat%20you%27re%20most%20concerned%20about%3A%0ATimeline%3A%0A%0AAnything%20else%20we%20should%20know%3A";

const styles = `
:root{color-scheme:dark;--bg:#06080c;--panel:#0e141d;--text:#f8f6f2;--muted:#aab4c1;--orange:#ff6a1a;--orange2:#ff9a3d;--green:#5de2a5;--blue:#7fb2ff;--amber:#ffbd65;--red:#ff8d8d;--line:rgba(255,255,255,.12);--orangeLine:rgba(255,106,26,.42);--max:1120px}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 82% 2%,rgba(255,106,26,.14),transparent 30rem),radial-gradient(circle at 12% 38%,rgba(77,149,255,.08),transparent 28rem),linear-gradient(180deg,#06080c,#0a1018 48%,#06080c);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.55}.page{min-height:100vh;position:relative;overflow:hidden}.scope{position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.46}.scope:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:120px 120px;mask-image:linear-gradient(to bottom,black,transparent 86%)}.scope:after{content:"";position:absolute;left:-5%;right:-5%;top:43%;height:2px;background:linear-gradient(90deg,transparent,rgba(255,106,26,.2) 12%,rgba(255,190,130,.9) 48%,rgba(255,106,26,.2) 84%,transparent);box-shadow:0 0 28px rgba(255,106,26,.38);transform:skewY(-2deg)}.wrap{width:min(var(--max),calc(100% - 28px));margin:auto}.nav{position:sticky;top:0;z-index:30;border-bottom:1px solid var(--line);background:rgba(7,9,13,.88);backdrop-filter:blur(18px)}.navin{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}.brand{font-size:13px;font-weight:950;letter-spacing:.11em;text-transform:uppercase}.navlinks{display:flex;gap:9px;align-items:center}.navlink{font-size:12px;color:var(--muted);text-decoration:none;padding:8px 10px;border-radius:999px}.navlink:hover{color:#fff;background:rgba(255,255,255,.05)}.navcta{font-size:12px;font-weight:900;color:#fff;text-decoration:none;padding:9px 12px;border-radius:999px;background:linear-gradient(135deg,var(--orange),#9a310b)}.hero{padding:76px 0 46px;border-bottom:1px solid var(--line)}.eyebrow{font-size:12px;font-weight:950;color:var(--orange);letter-spacing:.16em;text-transform:uppercase;margin-bottom:16px}h1{font-size:clamp(46px,8vw,88px);line-height:.92;letter-spacing:-.06em;margin:0;text-transform:uppercase;max-width:1030px}h1 span{color:var(--orange)}.lead{font-size:clamp(18px,2.3vw,24px);max-width:890px;color:#e7ebf1;margin:24px 0 0}.sublead{font-size:16px;max-width:820px;color:var(--muted)}.truth{margin-top:24px;border:1px solid var(--orangeLine);background:rgba(255,106,26,.08);padding:15px 17px;border-radius:16px;color:#f7dfcf;max-width:930px}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border:1px solid var(--orangeLine);background:rgba(255,106,26,.08);color:var(--text);font-weight:900;padding:13px 17px;border-radius:999px}.btn.primary{background:linear-gradient(135deg,var(--orange),#9a310b);border-color:rgba(255,255,255,.16)}.btn.secondary{border-color:rgba(127,178,255,.35);background:rgba(77,149,255,.08)}.section{padding:52px 0}.section.alt{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:rgba(255,255,255,.018)}.section h2{font-size:clamp(30px,5vw,52px);line-height:.98;margin:0 0 18px;letter-spacing:-.045em;text-transform:uppercase}.intro{max-width:820px;color:var(--muted);font-size:17px}.grid{display:grid;gap:15px}.cols2{grid-template-columns:repeat(2,1fr)}.cols3{grid-template-columns:repeat(3,1fr)}.card{border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.04),transparent),rgba(14,20,29,.9);border-radius:22px;padding:21px;box-shadow:0 18px 52px rgba(0,0,0,.23)}.card.hot{border-color:var(--orangeLine);background:linear-gradient(145deg,rgba(255,106,26,.13),rgba(10,15,22,.95))}.card.good{border-color:rgba(93,226,165,.26)}.card h3{font-size:21px;margin:8px 0}.card p,.card li{color:var(--muted)}.tag{display:inline-flex;padding:5px 8px;border-radius:999px;border:1px solid var(--line);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.tag.orange{color:var(--orange2);border-color:var(--orangeLine)}.tag.green{color:var(--green);border-color:rgba(93,226,165,.3)}.tag.blue{color:var(--blue);border-color:rgba(127,178,255,.3)}.tag.amber{color:var(--amber);border-color:rgba(255,189,101,.35)}.path{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:26px}.step{position:relative;border:1px solid var(--line);border-radius:19px;padding:18px;background:rgba(10,15,22,.8);min-height:205px}.step:after{content:"→";position:absolute;right:-17px;top:50%;transform:translateY(-50%);color:var(--orange);font-weight:900;font-size:23px;z-index:3}.step:last-child:after{display:none}.stepnum{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--orange);font-size:12px;font-weight:900}.step h3{font-size:18px;margin:13px 0 8px}.step p{font-size:14px;color:var(--muted);margin:0}.clinic{display:grid;grid-template-columns:1fr 1.25fr;gap:22px;align-items:start}.clinicquote{font-size:clamp(26px,4vw,46px);line-height:1.06;letter-spacing:-.04em;font-weight:950;margin:0}.clinicquote span{color:var(--orange)}.diagnostic-list{display:grid;gap:10px}.diagnostic{display:grid;grid-template-columns:36px 1fr;gap:12px;align-items:start;padding:13px;border-bottom:1px solid var(--line)}.diagnostic:last-child{border-bottom:0}.dot{width:30px;height:30px;border-radius:999px;display:grid;place-items:center;background:rgba(255,106,26,.13);border:1px solid var(--orangeLine);color:var(--orange);font-weight:950;font-size:12px}.diagnostic strong{display:block}.diagnostic span{color:var(--muted);font-size:14px}.pricegrid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:24px}.pricecard{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:22px;background:rgba(14,20,29,.91);overflow:hidden}.pricehead{padding:21px;border-bottom:1px solid var(--line)}.pricebody{padding:21px;display:flex;flex-direction:column;gap:14px;flex:1}.price{font-size:37px;font-weight:950;letter-spacing:-.04em;color:var(--green)}.price small{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:800}.pricebody ul{padding-left:18px;margin:0}.pricebody li{color:var(--muted);margin:7px 0}.pricefoot{margin-top:auto;color:var(--amber);font-size:12px;font-weight:800}.proof{border:1px solid rgba(93,226,165,.25);background:linear-gradient(145deg,rgba(93,226,165,.07),rgba(10,15,22,.95));border-radius:24px;padding:24px;display:grid;grid-template-columns:1.25fr .75fr;gap:25px;align-items:center}.proofmetric{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.metric{padding:14px;border-radius:16px;border:1px solid var(--line);background:rgba(5,10,15,.5)}.metric b{display:block;font-size:27px;color:var(--green)}.metric span{font-size:12px;color:var(--muted)}.cta{padding:58px 0 68px}.ctabox{border:1px solid var(--orangeLine);border-radius:28px;padding:clamp(24px,5vw,48px);background:radial-gradient(circle at 88% 10%,rgba(255,106,26,.2),transparent 24rem),rgba(11,15,22,.94);box-shadow:0 30px 90px rgba(0,0,0,.35)}.ctabox h2{max-width:880px}.email{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--blue);font-size:13px}.fine{font-size:12px;color:var(--muted)}.footer{padding:30px 0 50px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}@media(max-width:920px){.path{grid-template-columns:1fr 1fr}.step:after{display:none}.pricegrid{grid-template-columns:1fr 1fr}.proof,.clinic{grid-template-columns:1fr}}@media(max-width:720px){.navlinks .navlink{display:none}.cols2,.cols3,.pricegrid,.path,.proofmetric{grid-template-columns:1fr}.hero{padding-top:52px}.section{padding:42px 0}.btn{width:100%}.step{min-height:auto}.navin{align-items:flex-start}.brand{max-width:180px}.navcta{white-space:nowrap}.price{font-size:33px}}
`;

const diagnosticPath = [
  {
    number: "01",
    title: "Self-guided triage",
    body: "A short diagnostic screen identifies claim strength, consequence, authority, evidence, correction, and unknowns. It recommends the smallest defensible next step.",
  },
  {
    number: "02",
    title: "Specialist diagnosis",
    body: "NULLWORKS pins the subject, traces claims into controls and tests, separates evidence classes, and identifies the real failure surface.",
  },
  {
    number: "03",
    title: "Treatment plan",
    body: "Findings become a prioritized remediation map: what to preserve, what to repair, what to test next, and what must remain explicitly unknown.",
  },
  {
    number: "04",
    title: "Intervention",
    body: "Your team, NULLWORKS, or an implementation partner makes the approved changes without rewriting the original evidence or decision history.",
  },
  {
    number: "05",
    title: "Retest + follow-up",
    body: "The repaired system is rerun against the registered tests. The result is a new receipt, not a marketing promise that the patient is permanently cured.",
  },
];

const diagnostics = [
  ["Public claims", "Can the architecture support what the website, sales team, or compliance page says?"],
  ["Human authority", "Who can approve, stop, reverse, or correct consequential action—and are they the right authority?"],
  ["Evidence custody", "What gets recorded, signed, omitted, superseded, or silently discarded?"],
  ["Completion truth", "Does the system know that work is actually complete, or only that a terminal action was emitted?"],
  ["Failure and correction", "What happens under ambiguity, timeouts, conflicting evidence, interrupted execution, and later contradiction?"],
  ["Operational reality", "Do model behavior, software controls, human workflow, and real consequences remain connected?"],
];

export default function AssuranceServicesPage() {
  return (
    <main className="page">
      <div className="scope" aria-hidden="true" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header className="nav">
        <div className="wrap navin">
          <a className="brand" href="/">NULLWORKS / Operational Assurance</a>
          <nav className="navlinks" aria-label="Assurance navigation">
            <a className="navlink" href="#method">Method</a>
            <a className="navlink" href="#pricing">Pricing</a>
            <a className="navlink" href="/ciris-proof">Public proof</a>
            <a className="navcta" href={triageEmail}>Start with Triage</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">AI architecture diagnosis, treatment, and retest</div>
          <h1>Your AI system makes claims. <span>We test whether the system can carry them.</span></h1>
          <p className="lead">
            NULLWORKS independently traces an AI product&apos;s promises into architecture,
            controls, tests, human-authority boundaries, runtime behavior, and preserved evidence.
          </p>
          <p className="sublead">
            The process begins with triage—not a giant audit. We determine whether the system is
            healthy enough to proceed, needs a focused diagnostic scan, or requires a full operational
            pressure test before customers, investors, procurement teams, or production incidents find the seams.
          </p>
          <div className="truth">
            <b>Claim → Control → Test → Receipt.</b> We do not certify perfection. We establish what is
            documented, implemented, project-tested, independently reproduced, observed, inferred,
            contradicted, blocked, or still unknown.
          </div>
          <div className="actions">
            <a className="btn primary" href={triageEmail}>I&apos;m interested in Triage</a>
            <a className="btn secondary" href="/ciris-proof">See a public proof</a>
          </div>
        </div>
      </section>

      <section className="section" id="method">
        <div className="wrap">
          <h2>The diagnostic ladder</h2>
          <p className="intro">
            Think of this as systems medicine. Triage determines urgency. Diagnosis finds the actual
            condition. Treatment repairs the architecture. Follow-up testing proves what changed.
            The clinical language is a metaphor; the work is technical and operational assurance.
          </p>
          <div className="path">
            {diagnosticPath.map((item) => (
              <article className="step" key={item.number}>
                <div className="stepnum">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap clinic">
          <div>
            <div className="eyebrow">What gets examined</div>
            <p className="clinicquote">
              Most AI failures are not just model failures. They are <span>authority, evidence, handoff, and correction failures</span> that AI exposes faster.
            </p>
          </div>
          <div className="card">
            <div className="diagnostic-list">
              {diagnostics.map(([title, body], index) => (
                <div className="diagnostic" key={title}>
                  <div className="dot">{index + 1}</div>
                  <div><strong>{title}</strong><span>{body}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What you receive</h2>
          <div className="grid cols3">
            <article className="card"><span className="tag orange">Reality</span><h3>Claim-to-control matrix</h3><p>Every important claim is traced into the implemented control, project test, independent reproduction, runtime observation, or explicit gap.</p></article>
            <article className="card"><span className="tag green">Evidence</span><h3>Reproducible test packet</h3><p>Source pins, environment manifests, selected tests, logs, checksums, blockers, and receipts make the work inspectable rather than anecdotal.</p></article>
            <article className="card"><span className="tag blue">Decision</span><h3>Executive assurance report</h3><p>Strengths, seams, consequence, confidence, known unknowns, and the smallest defensible repair order are written for builders and decision-makers.</p></article>
            <article className="card"><span className="tag amber">Repair</span><h3>Remediation roadmap</h3><p>Findings become prioritized changes with preserved strengths, explicit authority owners, registered retests, and acceptance criteria.</p></article>
            <article className="card"><span className="tag orange">Handoff</span><h3>Private review portal</h3><p>A mobile builder-facing evidence surface makes findings, receipts, artifact hashes, and truth boundaries easy to inspect and share internally.</p></article>
            <article className="card"><span className="tag green">Follow-up</span><h3>Retest receipt</h3><p>After remediation, the registered tests run again. The updated receipt shows what changed and what remains unresolved.</p></article>
          </div>
        </div>
      </section>

      <section className="section alt" id="pricing">
        <div className="wrap">
          <h2>Services and starting prices</h2>
          <p className="intro">
            Fixed-scope work is priced around consequence, repositories, integrations, access, and
            required evidence—not hours spent typing. Final scope is confirmed after triage.
          </p>
          <div className="pricegrid">
            <article className="pricecard">
              <div className="pricehead"><span className="tag green">First step</span><h3>Self-Guided Triage</h3></div>
              <div className="pricebody"><div className="price">No-cost <small>Initial diagnostic screen</small></div><ul><li>10–15 minute guided intake</li><li>Claim, consequence, authority, evidence, and correction screen</li><li>Green / amber / red routing</li><li>Recommended next engagement</li></ul><div className="pricefoot">Automated instrument is being built. Current intake begins by email.</div><a className="btn primary" href={triageEmail}>I&apos;m interested in Triage</a></div>
            </article>

            <article className="pricecard">
              <div className="pricehead"><span className="tag blue">Focused diagnosis</span><h3>Architecture Signal Scan</h3></div>
              <div className="pricebody"><div className="price">$7,500 <small>Typical five-business-day scope</small></div><ul><li>Documentation and pinned-code inspection</li><li>Claim map and control inventory</li><li>Initial authority and evidence review</li><li>Decision on whether deeper testing is warranted</li></ul><div className="pricefoot">Best for an early-stage product, enterprise-sales preparation, or a narrow question.</div></div>
            </article>

            <article className="pricecard">
              <div className="pricehead"><span className="tag orange">Core engagement</span><h3>Operational Assurance Sprint</h3></div>
              <div className="pricebody"><div className="price">$20K–$35K <small>Typical two-to-three-week scope</small></div><ul><li>Architecture and code trace</li><li>Targeted independent reproduction</li><li>Authority, evidence, completion, and correction tests</li><li>Executive report, portal, receipts, and remediation plan</li></ul><div className="pricefoot">Closest match to the CIRIS assurance engagement.</div></div>
            </article>

            <article className="pricecard">
              <div className="pricehead"><span className="tag amber">Consequential systems</span><h3>Full Operational Pressure Test</h3></div>
              <div className="pricebody"><div className="price">$50K–$125K+ <small>Typical four-to-eight-week scope</small></div><ul><li>Multiple repositories and components</li><li>Live authorized deployment testing</li><li>Failure injection and changed-condition scenarios</li><li>Semantic fracture, escalation, and recovery testing</li><li>Release-readiness determination</li></ul><div className="pricefoot">For enterprise, regulated, infrastructure, government, or safety-consequential systems.</div></div>
            </article>

            <article className="pricecard">
              <div className="pricehead"><span className="tag green">Follow-up</span><h3>Remediation Verification</h3></div>
              <div className="pricebody"><div className="price">$10K–$20K <small>After corrective changes</small></div><ul><li>Review proposed repairs</li><li>Rerun registered tests</li><li>Challenge regression paths</li><li>Issue updated finding and closure receipts</li></ul><div className="pricefoot">A repair is not closed because code changed. It closes when evidence supports the new state.</div></div>
            </article>

            <article className="pricecard">
              <div className="pricehead"><span className="tag blue">Ongoing care</span><h3>Continuous Assurance</h3></div>
              <div className="pricebody"><div className="price">$6K–$15K/mo <small>Release and architecture watch</small></div><ul><li>Claim and architecture drift</li><li>Control regression</li><li>Provider, model, and dependency changes</li><li>Targeted retesting and updated receipts</li></ul><div className="pricefoot">For systems whose risk surface changes every release.</div></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Proof before pitch</h2>
          <div className="proof">
            <div>
              <span className="tag green">Public case receipt</span>
              <h3>CIRIS operational assurance review</h3>
              <p className="intro">
                NULLWORKS pinned the exact public source, independently reran selected tests,
                executed a direct authorization probe, preserved environment blockers honestly,
                and published a sanitized evidence surface without exposing the confidential report.
              </p>
              <div className="actions"><a className="btn secondary" href="/ciris-proof">Open the public proof</a></div>
            </div>
            <div className="proofmetric">
              <div className="metric"><b>42/42</b><span>Targeted tests passed</span></div>
              <div className="metric"><b>10/10</b><span>Source checks passed</span></div>
              <div className="metric"><b>3/3</b><span>Authority calls executed</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div className="ctabox">
            <div className="eyebrow">Start with the smallest honest question</div>
            <h2>Do you need a full assurance engagement—or only a focused diagnostic scan?</h2>
            <p className="intro">
              Triage exists to answer that before either of us wastes time or money. Send the email,
              tell us what the system claims and what keeps you awake, and we will route the next step.
            </p>
            <div className="actions">
              <a className="btn primary" href={triageEmail}>Email: I&apos;m interested in Triage</a>
              <a className="btn" href="mailto:nullworks.neuraxis@gmail.com">Write your own message</a>
            </div>
            <p className="email">nullworks.neuraxis@gmail.com</p>
            <p className="fine">NULLWORKS provides independent operational assurance, architecture pressure testing, and pre-audit evidence readiness. It does not provide legal opinions, statutory certification, formal ISO audits, or regulatory conformity assessment.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <b>NULLWORKS / OPERATIONAL INTELLIGENCE</b><br />
          Reality informs. Evidence constrains. Authority decides. Receipts prevent revisionism.<br /><br />
          Human Authority remains final.
        </div>
      </footer>
    </main>
  );
}
