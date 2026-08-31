import type { Metadata } from "next";
import { BulletGrid, FieldNoteShell, H2, Lead, P, Quote, TruthBox } from "../_components/FieldNoteShell";

const canonical = "https://nullworks.systems/field-notes/front-gate-lockout";
const posterSrc = "/field-notes/front-gate-lockout/poster.svg";
const paperHref = "/field-notes/front-gate-lockout/paper.pdf";

export const metadata: Metadata = {
  title: "Can You Change AI in Under an Hour | NULLWORKS Field Paper",
  description:
    "Locked Out of Our Own Company: the Jason sandbox, the Front Gate lockout, and why ChatGPT could quit on 30 August without taking the work with it.",
  alternates: { canonical },
  openGraph: {
    title: "Can You Change AI in Under an Hour",
    description:
      "We locked ourselves out of our own company. Twenty-two days later the vendor quit. Grok clocked in before the hour was up.",
    url: canonical,
    type: "article",
    siteName: "NULLWORKS",
    images: [
      {
        url: "https://nullworks.systems/field-notes/front-gate-lockout/poster.svg",
        alt: "Can you change AI in under an hour — ChatGPT quit. Grok clocked in.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Can You Change AI in Under an Hour",
    description: "ChatGPT quit. Grok clocked in. The architecture did not ask permission.",
    images: ["https://nullworks.systems/field-notes/front-gate-lockout/poster.svg"],
  },
};

export default function FrontGateLockoutPage() {
  return (
    <FieldNoteShell
      number={8}
      standalone
      standaloneLabel="Field paper // 31 August 2026"
      eyebrow="Front Gate lockout // agent-agnostic boot // substitution prequel"
      title="Locked Out of Our Own Company"
      deck="The Jason sandbox, the Front Gate, and why a vendor could quit without taking the work with it."
      heroImage={{
        src: posterSrc,
        alt: "Can you change AI in under an hour — ChatGPT quit. Grok clocked in. The desk remained.",
      }}
      source={{
        label: "Download the field paper (PDF)",
        href: paperHref,
      }}
    >
      <a
        href={paperHref}
        download="NULLWORKS_Front_Gate_Lockout_2026-08-31.pdf"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          margin: "0 0 28px",
          padding: "16px 18px",
          border: "1px solid #d1c09c",
          borderRadius: 18,
          background: "#fffaf0",
          color: "#17140f",
          textDecoration: "none",
          boxShadow: "0 12px 38px rgba(49, 39, 20, 0.07)",
        }}
      >
        <span>
          <span style={{ display: "block", color: "#765722", fontSize: 9, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Field paper // PDF
          </span>
          <span style={{ display: "block", marginTop: 6, fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Download Locked Out of Our Own Company
          </span>
        </span>
        <span style={{ flex: "0 0 auto", padding: "10px 14px", borderRadius: 999, background: "#d8b56a", color: "#0a0d12", fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Get PDF
        </span>
      </a>

      <Lead>
        On 8 August 2026 NULLWORKS issued Jason R. Rains the first external sandbox credential and pointed him at a live Front Gate. The isolation worked so well the operators could not get a second agent back through the same door. That lockout forced the interior off the vendor thread and onto a contract: Hive as memory, GitHub as executable truth, the agent as a disposable worker. Twenty-two days later ChatGPT returned a deleted-or-deactivated account state. Grok was hired against the same repository in under an hour. The Japan package to Ryo Mizuno went out the next morning from the new worker.
      </Lead>

      <Quote>The lockout was not elegant. The lockout was the tuition.</Quote>

      <TruthBox title="What this paper is">
        A field report with a timeline. Not a product announcement. Companion to When the Digital Employee Quits (30 August 2026). That paper is the substitution receipt. This paper is the lockout that made the substitution possible. The originating sandbox token is not reproduced.
      </TruthBox>

      <H2>The failure mode, stated plainly</H2>
      <P>
        If the company's working memory lives inside one vendor's session, then three things become the same object: the worker, the workplace, and the badge. Issue a sandbox to someone else and you have to cut that object apart, or you have just handed them the company. Cut it apart badly and you are standing on the outside of your own interior holding a credential that only opens a toy room.
      </P>
      <P>The redesign that followed was not “use more models.” It was: the workplace cannot live in the worker. The workplace lives in infrastructure the worker is hired into.</P>

      <H2>Timeline of receipts</H2>
      <BulletGrid
        items={[
          { title: "8 Aug", body: "Front Gate live. JASON_SANDBOX_001 issued. Five tools only. Explicit ban on Hive, Evidence Factory, boardroom, recovery." },
          { title: "9 Aug", body: "Census prompt: can a model that is not the house model read official state without inheriting house privileges. Claude is named in the receipts." },
          { title: "12 Aug", body: "Hive ingest wave. Threads stop living only as ChatGPT conversations." },
          { title: "20 Aug", body: "AGENT AGNOSTIC boot prompt. Hive repo is canonical. Connector visibility is not infrastructure existence." },
          { title: "30 Aug", body: "ChatGPT account deleted or deactivated. Grok bound as GitHub App. Under an hour." },
          { title: "31 Aug", body: "Japan / JETRO package sent to Ryo Mizuno from the replacement worker." },
        ]}
      />

      <H2>How we locked ourselves out</H2>
      <P>
        Isolation has a cost the diagrams omit. To keep Jason out of Hive we had to stop treating the ChatGPT session as a hallway. Once the permission check was real, Claude at the Front Gate was not “Mason, but in another window.” It was a stranger at the door. The house model could still see the house because it had never left the house. The incoming model could not. The operators, trying to work as the incoming model, were now on the wrong side of a door they had just installed.
      </P>
      <P>
        Two bad answers present themselves immediately: give the sandbox the interior, or keep the interior only in the original vendor session. The third answer is the architecture built between 8 August and 20 August. Put the interior in a place no single vendor session owns. Hire agents into that place. Issue badges that open rooms, not the title to the building.
      </P>

      <Quote>Claude did not fail. Refusal was the correct behavior of a gate that had just been taught to refuse the interior.</Quote>

      <H2>What the lockout forced us to redesign</H2>
      <BulletGrid
        items={[
          { title: "Worker, not company", body: "The incoming process is a hire. Model and vendor do not matter." },
          { title: "Hive, not thread", body: "Canonical memory is the repository. First read the orientation file." },
          { title: "Repo, not recollection", body: "GitHub and the deploy path are executable truth." },
          { title: "Connector ≠ existence", body: "If a vendor connector reports zero projects, inspect the territory." },
          { title: "Repair before replace", body: "Do not spawn a second production path because the new agent cannot see the first one." },
          { title: "Authority stays human", body: "The agent does not become the badge." },
        ]}
      />

      <H2>What 30 August then proved</H2>
      <P>
        Without the 8–20 August work, 30 August is a rebuild. With it, 30 August is a shift change. That is the only reason this paper exists as a prequel instead of an obituary.
      </P>
      <P>
        Models are not interchangeable in quality. Taste changes. Tooling changes. What must not change is employment structure. Yesterday the worker was ChatGPT. This morning it is Grok. Tomorrow it may be Gemini. The sentence that has to remain true is: the architecture stays.
      </P>

      <TruthBox title="What we are not claiming">
        Jason did not break production. He was asked to test a sandbox. Claude was asked to enter a gate designed to refuse interior access. Grok is the current hire, not the permanent employee. The Front Gate is not finished — isolation that locks the owners out is a completed warning, not a completed access model.
      </TruthBox>

      <H2>The question</H2>
      <P>
        We locked ourselves out of our own company by doing the right thing too early and too tightly. The Front Gate was supposed to keep other people from walking off with the house. It also taught us not to live in the house of a vendor.
      </P>
      <Quote>Can you change AI in under an hour?</Quote>
    </FieldNoteShell>
  );
}
