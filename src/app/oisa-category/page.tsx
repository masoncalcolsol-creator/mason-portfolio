export default function OisaCategoryPage() {
  const stack = [
    { step: "01", label: "ROLE", title: "OISA", body: "The professional function that designs and governs the whole operating system.", href: "/oisa-category" },
    { step: "02", label: "PRODUCT", title: "OI SUITe", body: "The model-agnostic operating layer installed around humans, AI workers, evidence, and authority.", href: "/field-notes/oi-suite" },
    { step: "03", label: "DEPLOYMENT", title: "OI Work Cells", body: "Bounded implementations inside real workflows with measurable outcomes and clear review paths.", href: "/operating-map#work-cells" },
    { step: "04", label: "PROOF", title: "Receipts", body: "Field artifacts, corrections, failures, telemetry, and before-and-after operating evidence.", href: "/operating-map#receipts" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f4efe4", color: "#171914", padding: "24px" }}>
      <div style={{ width: "min(1060px, 100%)", margin: "0 auto" }}>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <a href="/" style={{ color: "#76551d", fontWeight: 800, textDecoration: "none" }}>NULLWORKS</a>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", fontSize: "13px", fontWeight: 800 }}>
            <a href="/field-notes/oi-suite" style={{ color: "#655b49", textDecoration: "none" }}>OI SUITe</a>
            <a href="/operating-map" style={{ color: "#655b49", textDecoration: "none" }}>Operating map</a>
          </div>
        </nav>

        <p style={{ margin: "12px 0 0", color: "#766c59", fontSize: "12px", fontWeight: 750, letterSpacing: "0.04em" }}>Field definition v0.1 · Founded by Mason Perry / NULLWORKS · July 2026</p>
        <p style={{ marginTop: "48px", color: "#8b6520", fontSize: "12px", fontWeight: 900, letterSpacing: "0.16em" }}>EMERGING PROFESSION // FOUNDED THROUGH FIELD WORK</p>
        <h1 style={{ margin: "18px 0 0", fontFamily: "Georgia, serif", fontSize: "clamp(46px, 8vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.055em" }}>Operational Intelligence Systems Architect</h1>
        <h2 style={{ maxWidth: "820px", marginTop: "28px", color: "#4d4639", fontSize: "clamp(20px, 3vw, 30px)", lineHeight: 1.4 }}>The AI engineer builds the worker. The OISA builds the operating company the worker needs.</h2>
        <blockquote style={{ margin: "42px 0 0", padding: "28px", borderRadius: "24px", background: "#0a1520", color: "#f7f0df", fontFamily: "Georgia, serif", fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.3 }}>
          An OISA designs, installs, governs, measures, and continuously improves the operating system connecting human experts, AI workers, software, evidence, authority, exceptions, recovery, telemetry, and organizational intent.
        </blockquote>
        <p style={{ maxWidth: "820px", marginTop: "30px", color: "#655b49", fontSize: "17px", lineHeight: 1.8 }}>AI companies provide digital workers. OISAs design the organizations those workers require. NULLWORKS is building the field standard, proof system, and governed work-cell installation method around that role.</p>

        <section style={{ marginTop: "42px", paddingTop: "28px", borderTop: "1px solid rgba(153,113,37,.28)" }}>
          <p style={{ margin: 0, color: "#8b6520", fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em" }}>HOW THE PUBLIC SYSTEM FITS TOGETHER</p>
          <h2 style={{ margin: "12px 0 0", fontFamily: "Georgia, serif", fontSize: "clamp(30px, 5vw, 48px)", lineHeight: 1 }}>The role is only the first layer.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "12px", marginTop: "24px" }}>
            {stack.map((item) => (
              <a key={item.step} href={item.href} style={{ display: "block", minHeight: "210px", padding: "20px", border: "1px solid rgba(118,85,29,.25)", borderRadius: "18px", background: "rgba(255,250,240,.66)", color: "inherit", textDecoration: "none" }}>
                <span style={{ color: "#8b6520", fontSize: "11px", fontWeight: 900, letterSpacing: "0.12em" }}>{item.step} // {item.label}</span>
                <strong style={{ display: "block", marginTop: "13px", fontFamily: "Georgia, serif", fontSize: "26px" }}>{item.title}</strong>
                <span style={{ display: "block", marginTop: "10px", color: "#655b49", lineHeight: 1.55 }}>{item.body}</span>
                <span style={{ display: "block", marginTop: "18px", color: "#76551d", fontWeight: 850 }}>Open →</span>
              </a>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "32px" }}>
          <a href="mailto:masoncalcolsol@gmail.com?subject=OISA%20Conversation" style={{ padding: "13px 18px", borderRadius: "999px", background: "#0a1520", color: "#fffaf0", fontWeight: 850, textDecoration: "none" }}>Contact Mason</a>
          <a href="/field-notes/oi-suite" style={{ padding: "13px 18px", border: "1px solid #b88a34", borderRadius: "999px", background: "#fffaf0", color: "#76551d", fontWeight: 850, textDecoration: "none" }}>See the OI SUITe</a>
          <a href="/operating-map" style={{ padding: "13px 18px", border: "1px solid #b88a34", borderRadius: "999px", background: "transparent", color: "#76551d", fontWeight: 850, textDecoration: "none" }}>Open the full map</a>
          <a href="/ai-audit" style={{ padding: "13px 18px", border: "1px solid #b88a34", borderRadius: "999px", background: "#fffaf0", color: "#76551d", fontWeight: 850, textDecoration: "none" }}>Start with one workflow</a>
        </div>

        <p style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid rgba(153,113,37,.3)", color: "#766c59", fontSize: "13px", lineHeight: 1.7 }}><strong>Truth boundary:</strong> OISA is an emerging category under active field definition. It is not yet a universally recognized credential or accredited profession. The title alone proves nothing; competence must be demonstrated through field artifacts, human authority, evidence discipline, recovery, measured outcomes, and honest limitations.</p>
      </div>
    </main>
  );
}
