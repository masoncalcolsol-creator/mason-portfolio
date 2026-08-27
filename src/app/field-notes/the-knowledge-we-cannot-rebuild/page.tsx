import type { Metadata } from "next";

const canonical = "https://mason-portfolio-main.vercel.app/field-notes/the-knowledge-we-cannot-rebuild";

export const metadata: Metadata = {
  title: "The Knowledge We Cannot Rebuild | NULLWORKS Field Note",
  description: "The problem is not storage. The problem is time. A field note on preserving expert reasoning before its living sources disappear.",
  alternates: { canonical },
  openGraph: {
    title: "The Knowledge We Cannot Rebuild",
    description: "We can build the software later. We can build the database later. We cannot interview the 82-year-old after he is dead.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginTop: 48 }}>
    <h2 style={{ fontSize: "clamp(1.45rem, 4vw, 2rem)", lineHeight: 1.15, marginBottom: 18 }}>{title}</h2>
    <div style={{ fontSize: "1.08rem", lineHeight: 1.75, color: "#d7d7d7" }}>{children}</div>
  </section>
);

export default function FieldNote() {
  return (
    <main style={{ minHeight: "100vh", background: "#090909", color: "#f4f1e8", padding: "56px 20px 90px" }}>
      <article style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#aaa" }}>NULLWORKS FIELD NOTE · AUGUST 27, 2026</div>
        <h1 style={{ fontSize: "clamp(2.8rem, 9vw, 5.8rem)", lineHeight: .92, letterSpacing: "-.055em", margin: "22px 0" }}>The Knowledge We Cannot Rebuild</h1>
        <p style={{ fontSize: "clamp(1.35rem, 4vw, 2rem)", lineHeight: 1.3, color: "#bbb", marginBottom: 38 }}>The problem is not storage. The problem is time.</p>

        <div style={{ borderTop: "1px solid #555", borderBottom: "1px solid #555", padding: "30px 0", fontSize: "clamp(1.5rem, 5vw, 2.35rem)", lineHeight: 1.25, fontWeight: 700 }}>
          We can build the software later.<br /><br />We can build the database later.<br /><br />We cannot interview the 82-year-old engineer after he is dead.
        </div>

        <Section title="The most perishable layer of institutional knowledge">
          <p>Organizations usually treat knowledge preservation as a documentation problem: write the manual, record the procedure, archive the file, migrate the database, index the documents, then add AI retrieval.</p>
          <p>Those things matter. But they miss the judgment that exists only inside experienced people: why a procedure exists, when it stops working, what an expert notices that a novice does not, which old failure created a rule nobody remembers, which alternatives were rejected, which exceptions matter, what remains uncertain, and what the expert would investigate next.</p>
          <p>Much of that knowledge was never written down because the people carrying it were still there.</p>
        </Section>

        <Section title="Japan makes the problem unusually visible">
          <p>This is not unique to Japan, but Japan makes the urgency difficult to ignore. Toyota has publicly discussed the challenge of transferring tacit manufacturing skills, visualizing expert work digitally, and retaining knowledge for future generations.</p>
          <p>The narrower question we are asking is this: <strong>are we preserving how experts work, or are we also preserving why experts think the way they do?</strong></p>
          <p>A camera can record a hand movement. A digital twin can represent equipment. A procedure can document a sequence. An AI system can search every document an organization owns. None automatically preserves the decision context that made the procedure, movement, or rule meaningful.</p>
        </Section>

        <Section title="Once the source disappears, reconstruction becomes guesswork">
          <p>A lost document can sometimes be restored. A failed application can be rewritten. A database can be migrated. A physical archive can be scanned.</p>
          <p>Tacit knowledge is different because the original source may be a living person. When that person is gone, later systems can infer, summarize, interpolate, and speculate. They cannot conduct the missing interview.</p>
          <p><strong>AI makes preserved knowledge easier to process. It does not make unrecorded experience retroactively available.</strong></p>
        </Section>

        <Section title="Preserve epistemic structure, not just information">
          <p>Not everything deserves equal treatment forever. The harder problem is preserving what is authoritative, what is evidence, what is recollection, what is hypothesis, what is disputed, what has been superseded, what failed, what remains uncertain, and who had authority to decide.</p>
          <p>That is the distinction behind the NULLWORKS <strong>Cathedral</strong>: the <strong>Archive</strong> preserves canonical, provenance-bound knowledge; the <strong>Foundry</strong> preserves hypotheses, contradictions, alternatives, experiments and uncertainty; governed <strong>Instantiations</strong> assemble the right state for a particular purpose.</p>
          <p>The goal is not simply to save more information. It is to preserve enough context that future people and machines do not have to start from zero.</p>
        </Section>

        <Section title="Do not start with a giant platform">
          <p><strong>Find the people whose knowledge is most at risk of disappearing and start capturing it now.</strong></p>
          <p>A serious pilot can begin with a small number of experienced engineers, technicians, operators, craftspeople, researchers, or institutional leaders. Ask why things are done the way they are, what the manuals omit, what failure taught them, where they disagree with accepted practice, what younger practitioners have not learned to see, and what must not be forgotten.</p>
          <p>Then preserve those statements with provenance and epistemic status instead of flattening every recollection into institutional truth.</p>
          <p>The infrastructure can evolve afterward. The source material cannot wait.</p>
        </Section>

        <Section title="A race against irreversible loss">
          <p>Every retirement, illness, death, restructuring, acquisition, plant closure, platform migration, or organizational break can remove context that no later technology can fully reconstruct.</p>
          <p>That does not mean panic. It means prioritization: identify the most perishable knowledge first, learn what preservation work already exists, avoid duplicating it, and involve historians, archivists, engineers, operators, researchers, governments, universities, manufacturers and AI practitioners.</p>
        </Section>

        <Section title="Who needs to be in the room?">
          <p>NULLWORKS is beginning a landscape study with particular interest in Japan's manufacturing and institutional-knowledge ecosystem.</p>
          <p><strong>Who is already doing this well? What approaches have failed? What is still disappearing anyway? Which expert populations are most time-sensitive? Who should be in the room before we build anything larger?</strong></p>
        </Section>

        <div style={{ marginTop: 58, padding: "32px 0", borderTop: "1px solid #555", borderBottom: "1px solid #555", fontSize: "clamp(1.35rem, 4vw, 2rem)", lineHeight: 1.35, fontWeight: 700 }}>
          We can build the software later. We can build the database later. We cannot interview the 82-year-old after he is dead.
        </div>

        <Section title="Starting points">
          <ul>
            <li><a style={{ color: "#f4f1e8" }} href="https://global.toyota/en/newsroom/corporate/39758291.html">Toyota: “Monozukuri is Hitozukuri” (2023)</a></li>
            <li><a style={{ color: "#f4f1e8" }} href="https://global.toyota/en/newsroom/corporate/35433493.html">Toyota: Skilled Manufacturing Key to the Future (2021)</a></li>
            <li><a style={{ color: "#f4f1e8" }} href="https://global.toyota/en/newsroom/corporate/42805724.html">Toyota: AI and Software Skill Development, including Knowledge Retention and Transfer</a></li>
          </ul>
        </Section>

        <footer style={{ marginTop: 64, color: "#999", fontSize: 14 }}>NULLWORKS · See differently. Decide better. Build what matters.</footer>
      </article>
    </main>
  );
}
