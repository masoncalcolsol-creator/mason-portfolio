import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIRIS Assurance Public Proof | NULLWORKS",
  description:
    "Sanitized public proof of a read-only, source-pinned operational assurance review of CIRISAgent.",
  robots: {
    index: true,
    follow: true,
  },
};

const agentCommit = "7f2369bed22c626404a1dcf8e09bfeb81a573d82";
const persistCommit = "e8cdb535b60a549948f2b0ceb43deb6921009260";

const styles = `
:root{color-scheme:dark;--bg:#07090d;--panel:#0e141d;--text:#f8f6f2;--muted:#aab4c1;--orange:#ff6a1a;--green:#5de2a5;--blue:#7fb2ff;--amber:#ffbd65;--line:rgba(255,255,255,.12);--max:1080px}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 84% 0,rgba(255,106,26,.13),transparent 28rem),linear-gradient(180deg,#06080c,#0a1018 48%,#06080c);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.55}.page{min-height:100vh}.wrap{width:min(var(--max),calc(100% - 28px));margin:auto}.nav{border-bottom:1px solid var(--line);background:rgba(7,9,13,.9);backdrop-filter:blur(16px);position:sticky;top:0;z-index:20}.navin{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0}.brand{font-size:13px;font-weight:950;letter-spacing:.11em;text-transform:uppercase}.status{font-size:11px;color:var(--amber);letter-spacing:.1em;text-transform:uppercase}.hero{padding:64px 0 36px;border-bottom:1px solid var(--line)}.eyebrow{font-size:12px;font-weight:950;color:var(--orange);letter-spacing:.16em;text-transform:uppercase;margin-bottom:15px}h1{font-size:clamp(42px,8vw,82px);line-height:.94;letter-spacing:-.055em;margin:0;text-transform:uppercase}h1 span{color:var(--orange)}.lead{font-size:clamp(18px,2.2vw,23px);max-width:860px;color:#e4e8ee}.truth{margin-top:22px;border:1px solid rgba(255,106,26,.42);background:rgba(255,106,26,.08);padding:15px 17px;border-radius:16px;color:#f7dfcf}.section{padding:44px 0}.section h2{font-size:clamp(28px,5vw,48px);line-height:1;margin:0 0 18px;letter-spacing:-.04em;text-transform:uppercase}.intro{max-width:790px;color:var(--muted)}.grid{display:grid;gap:14px}.cols2{grid-template-columns:repeat(2,1fr)}.cols4{grid-template-columns:repeat(4,1fr)}.card{border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.04),transparent),rgba(14,20,29,.88);border-radius:22px;padding:19px;box-shadow:0 14px 40px rgba(0,0,0,.22)}.card.hot{border-color:rgba(255,106,26,.42);background:linear-gradient(145deg,rgba(255,106,26,.12),rgba(10,15,22,.94))}.metric{font-size:36px;font-weight:950;line-height:1;color:var(--green);margin-bottom:8px}.metric.blue{color:var(--blue)}.metric.orange{color:var(--orange)}.metric.amber{color:var(--amber)}.card p,.card li{color:var(--muted)}.tag{display:inline-block;padding:5px 8px;border-radius:999px;border:1px solid var(--line);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.receipt{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#c6d5ea;word-break:break-all}.finding{border-left:4px solid var(--orange);padding-left:15px;margin:22px 0}.finding p{color:var(--muted);margin:7px 0}.finding b{color:var(--text)}.manifest{width:100%;border-collapse:collapse}.manifest th,.manifest td{text-align:left;vertical-align:top;border-bottom:1px solid var(--line);padding:11px 8px}.manifest th{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--amber)}.manifest td{font-size:13px;color:var(--muted)}.manifest td:first-child{color:var(--text);font-weight:800}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}.btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border:1px solid rgba(255,106,26,.42);background:rgba(255,106,26,.08);color:var(--text);font-weight:900;padding:12px 15px;border-radius:999px}.btn.primary{background:linear-gradient(135deg,var(--orange),#9a310b);border-color:rgba(255,255,255,.16)}.footer{padding:28px 0 50px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}@media(max-width:800px){.cols2,.cols4{grid-template-columns:1fr}.navin{align-items:flex-start}.status{text-align:right;font-size:9px}.section{padding:36px 0}.btn{width:100%}.manifest{display:block;overflow-x:auto}}
`;

export default function CirisProofPage() {
  return (
    <main className="page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <header className="nav">
        <div className="wrap navin">
          <div className="brand">NULLWORKS / Operational Intelligence</div>
          <div className="status">Public proof stub / sanitized / 2026-08-05</div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Independent operational assurance</div>
          <h1>
            CIRIS <span>public proof</span>
          </h1>
          <p className="lead">
            Sanitized evidence that NULLWORKS completed a read-only, exact-version-pinned
            operational assurance review of CIRISAgent and preserved reproducible test receipts.
          </p>
          <div className="truth">
            <b>Truth boundary:</b> this page is not the confidential report, a certification, a
            compliance approval, a penetration test, or an endorsement by CIRISAI. It publishes
            only non-confidential evidence classes, test counts, source pins, balanced conclusions,
            and artifact hashes.
          </div>
          <div className="actions">
            <a className="btn primary" href="#receipts">View public receipts</a>
            <a
              className="btn"
              href={`https://github.com/CIRISAI/CIRISAgent/tree/${agentCommit}`}
              target="_blank"
              rel="noreferrer"
            >
              Open pinned source
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What was proved</h2>
          <div className="grid cols4">
            <article className="card">
              <div className="metric">42 / 42</div>
              <h3>Targeted tests passed</h3>
              <p>Selected CIRIS-owned tests were independently rerun in an isolated runner.</p>
            </article>
            <article className="card">
              <div className="metric blue">10 / 10</div>
              <h3>Source checks passed</h3>
              <p>Deterministic claim-to-control checks passed against the pinned source.</p>
            </article>
            <article className="card">
              <div className="metric orange">3 / 3</div>
              <h3>Authority calls executed</h3>
              <p>A direct imported-code probe tested role behavior across resource labels.</p>
            </article>
            <article className="card">
              <div className="metric amber">PINNED</div>
              <h3>Exact source custody</h3>
              <p>The reviewed Agent and Persist revisions were frozen before execution.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Preliminary disposition</h2>
          <div className="grid cols2">
            <article className="card hot">
              <span className="tag">Assessment</span>
              <h3>Credible architecture / conditional assurance</h3>
              <p>
                CIRIS contains substantive constitutional-AI machinery, including a multi-stage
                reasoning pipeline, human deferral, persistent lineage, completed-trace signing,
                and append-only correction primitives.
              </p>
            </article>
            <article className="card">
              <span className="tag">Primary seam</span>
              <h3>Role is not the same as jurisdiction</h3>
              <p>
                The review found meaningful domain-aware service routing, while the inspected core
                human authorization surface remained broader than resource-specific jurisdiction.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="receipts" className="section">
        <div className="wrap">
          <h2>Public receipts</h2>
          <p className="intro">
            These receipts show how the engagement was grounded without exposing the confidential
            builder report, raw evidence packet, private correspondence, or NULLWORKS internal
            orchestration method.
          </p>

          <div className="finding">
            <h3>R-001 — Source custody</h3>
            <p><b>CIRISAgent:</b> <span className="receipt">{agentCommit}</span></p>
            <p><b>CIRISPersist:</b> <span className="receipt">{persistCommit}</span></p>
            <p><b>Meaning:</b> findings apply to these exact revisions unless later retesting says otherwise.</p>
          </div>

          <div className="finding">
            <h3>R-002 — Independent test reproduction</h3>
            <p><b>Method:</b> isolated GitHub-hosted runner, Python 3.12 environment, dependency inventory, JUnit output, logs, and SHA-256 manifest.</p>
            <p><b>Result:</b> 42 selected CIRIS project tests passed; 0 failed.</p>
          </div>

          <div className="finding">
            <h3>R-003 — Authority-boundary probe</h3>
            <p><b>Observed:</b> AUTHORITY + medical resource was authorized; the same AUTHORITY + financial resource was also authorized; OBSERVER + medical resource was denied.</p>
            <p><b>Interpretation:</b> the role gate functioned, while the supplied resource did not mechanically narrow the inspected core result.</p>
          </div>

          <div className="finding">
            <h3>R-004 — Environment blocker preserved honestly</h3>
            <p>A selected CIRISPersist Rust test reached native compilation but required the runner&apos;s TPM2-TSS development library. It was recorded as an environment dependency blocker, not mislabeled as a CIRIS failure or silently discarded.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Sanitized findings</h2>
          <div className="grid cols2">
            <article className="card"><h3>Human authority placement</h3><p>Bind domain, resource, scope, assignment, delegation, and time validity into the human decision object.</p></article>
            <article className="card"><h3>Timeout semantics</h3><p>Separate pure scheduling from human-approval-required deferral so time cannot impersonate authorization.</p></article>
            <article className="card"><h3>Decision-signature custody</h3><p>Verify and preserve the exact Wise Authority decision signature before consequential state mutation.</p></article>
            <article className="card"><h3>Incomplete-path receipts</h3><p>Preserve an explicit aborted or incomplete trace receipt before partial execution records are swept.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Artifact integrity</h2>
          <table className="manifest">
            <thead><tr><th>Artifact</th><th>Purpose</th><th>SHA-256</th></tr></thead>
            <tbody>
              <tr><td>Final PDF report</td><td>Confidential human-readable report</td><td className="receipt">087cb3335749384472e9dd0b6679ac0fa6e4d1eb4303065192c168c470e69d8d</td></tr>
              <tr><td>Editable DOCX report</td><td>Builder-editable report source</td><td className="receipt">5b7621729a6382a05731fdf9bb659c1a6cb0dadf9fbbc9de4e0ddba96a9103f4</td></tr>
              <tr><td>Evidence packet ZIP</td><td>Logs, JUnit, manifests, and probe outputs</td><td className="receipt">873d9c5dd80683e4796d733937bd42b7bf85a61393c66a09d67d0f1db100c68e</td></tr>
            </tbody>
          </table>
          <p className="intro">A matching hash proves byte-for-byte artifact identity. It does not independently prove the report&apos;s conclusions.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What remains private</h2>
          <div className="card hot">
            <ul>
              <li>The full confidential report and editable report source.</li>
              <li>Raw test logs, JUnit files, dependency inventories, and execution artifacts.</li>
              <li>Private correspondence and builder-specific discussion.</li>
              <li>NULLWORKS internal orchestration, scoring, and assurance methodology.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <b>NULLWORKS / OPERATIONAL INTELLIGENCE</b><br />
          Claim → Control → Test → Receipt.<br /><br />
          No CIRISAI endorsement, partnership, or certification is implied. Human Authority remains final.
        </div>
      </footer>
    </main>
  );
}
