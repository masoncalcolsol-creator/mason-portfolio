import type { Metadata } from "next";
import { BulletGrid, FieldNoteShell, H2, Lead, P, Quote, TruthBox } from "../_components/FieldNoteShell";

const canonical =
  "https://nullworks.systems/field-notes/when-the-digital-employee-quits";
const posterSrc = "/field-notes/when-the-digital-employee-quits/poster.svg";
const paperHref = "/field-notes/when-the-digital-employee-quits/paper.pdf";

export const metadata: Metadata = {
  title: "When the Digital Employee Quits | NULLWORKS Field Paper",
  description:
    "A live substitution receipt: ChatGPT identity failure, Grok bind, and why agent-agnostic architecture is continuity insurance.",
  alternates: { canonical },
  openGraph: {
    title: "When the Digital Employee Quits",
    description: "When your AI quits, can you keep shipping in under an hour?",
    url: canonical,
    type: "article",
    siteName: "NULLWORKS",
    images: [{ url: posterSrc, alt: "When your AI quits, can you keep shipping in under an hour?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "When the Digital Employee Quits",
    description: "When your AI quits, can you keep shipping in under an hour?",
    images: [posterSrc],
  },
};

export default function WhenTheDigitalEmployeeQuitsPage() {
  return (
    <FieldNoteShell
      number={7}
      standalone
      standaloneLabel="Field paper // 30 August 2026"
      eyebrow="Agent-agnostic architecture // identity failure // substitution receipt"
      title="When the Digital Employee Quits"
      deck="The model did not refuse a prompt. The employer could not present a valid worker. The desk remained."
      heroImage={{
        src: posterSrc,
        alt: "Cinematic NULLWORKS poster: when your AI quits, can you keep shipping in under an hour?",
      }}
      source={{
        label: "Download the field paper (PDF)",
        href: paperHref,
      }}
    >
      <a
        href={paperHref}
        download="When_the_Digital_Employee_Quits.pdf"
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
            Download When the Digital Employee Quits
          </span>
        </span>
        <span style={{ flex: "0 0 auto", padding: "10px 14px", borderRadius: 999, background: "#d8b56a", color: "#0a0d12", fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Get PDF
        </span>
      </a>

      <Lead>
        On 30 August 2026 a production ChatGPT session used as a forward-deployed digital employee returned a terminal authentication state: the account had been deleted or deactivated. In a vendor-coupled stack that is an outage of the worker, not merely of a chat window. NULLWORKS did not rebuild. Grok (by xAI) was bound against the same repository. ANVIL kept shipping.
      </Lead>

      <Quote>The correct unit of design is not the model. It is the contract the model is hired to fulfill.</Quote>

      <TruthBox title="What this paper is">
        This is a field receipt, not a laboratory study. n = 1, observed from inside the operating company. It does not claim Grok and ChatGPT are equivalent. It claims employment was interchangeable because the job lived on disk.
      </TruthBox>

      <H2>The failure was identity, not intelligence</H2>
      <P>
        auth.openai.com rendered a hard stop. Request ID 91722956-faed-4e5f-9887-11d95810c6a6. Retry cannot recreate an identity the provider has withdrawn. Any integration that authenticated through that same account — chat sessions, coding agents, plugin installs, billing-tied keys — goes dark together. A digital employee that lives inside one vendor account has a single point of employment.
      </P>
      <P>
        If the stack had been ChatGPT-shaped rather than contract-shaped, the blast radius would have included prompt programs written against one vendor dialect, write paths that existed only inside one coding-agent product, deploy assumptions that a particular assistant would push, and session memory treated as the system of record.
      </P>

      <H2>What actually changed</H2>
      <P>
        Three things changed. The worker identity. The GitHub App installation. The operator conversational surface. That is the entire legitimate change set.
      </P>
      <BulletGrid
        items={[
          { title: "01 FAIL", body: "Identity revoked. Account deleted or deactivated. The badge no longer opens the door." },
          { title: "02 QUIT", body: "Vendor employment ends. The model is no longer clocked in against the job." },
          { title: "03 STRIKE", body: "Retry is theater. The worker will not appear until a new binding exists." },
          { title: "04 BIND", body: "Install Grok (by xAI) on mason-portfolio. Contents: Read and write. Approve Vercel permission drift." },
          { title: "05 SHIP", body: "Dispatch the same job. Live artist cards. Cover pages. Song pages. Under an hour." },
        ]}
      />

      <H2>The seven layers that made the swap cheap</H2>
      <P>
        An architecture is agent-agnostic when the rest of the system binds to a job contract, not a vendor runtime. Only the adapter layer is allowed to know the vendor name.
      </P>
      <BulletGrid
        items={[
          { title: "Source of truth", body: "git, masters, published pages. Chat threads are not canonical." },
          { title: "Contract", body: "Purpose, read set, write set, tools, done-when. Written in operator language." },
          { title: "Workroom", body: "Ownership, state, evidence, telemetry. Workrooms outlive sessions." },
          { title: "Tool host", body: "Repo install, deploy, storage. Write authority lives here, not in pasted tokens." },
          { title: "Adapter", body: "The only vendor-shaped layer. Message format, auth, rate limits." },
          { title: "Worker", body: "Reasoning and drafting labor. A binding, not the company." },
          { title: "Authority", body: "Human review, merge, publish. Authority never moves into the model." },
        ]}
      />

      <H2>ANVIL was the substitution test</H2>
      <P>
        ANVIL preserves separate artist contracts on shared infrastructure. The morning workload was not a toy prompt. It required repository access, media ingest, metadata discipline, deploy integrity, and an operator who can tell whether a published page still honors the artist. If the new worker damaged identity boundaries, the architecture failed even if the site still built.
      </P>
      <P>
        Style drift is a review-gate problem, not a rewrite problem. If style is load-bearing, it belongs in the artist contract on disk, not in the previous model&apos;s habits.
      </P>

      <Quote>Continuity is a property of the desk, not the worker.</Quote>

      <H2>Operator checklist</H2>
      <BulletGrid
        items={[
          { title: "Confirm identity failure", body: "Do not treat account death as a transient 5xx." },
          { title: "Open the contract", body: "Do not rebuild prompts from memory." },
          { title: "Issue the badge at the tool host", body: "GitHub App, scoped repo, Contents write. No PAT in chat." },
          { title: "Audit adjacent grants", body: "Approve stale Vercel permission updates before they become the next outage." },
          { title: "Verify on the live surface", body: "Hard-refresh the published URL. Confidence is not a verifier." },
          { title: "File the receipt", body: "Vendor, request ID, time to resume, what did not have to change." },
        ]}
      />

      <TruthBox title="Limits">
        This paper does not measure token cost or blind quality of ChatGPT versus Grok on ANVIL tasks. It claims that when identity failed, publication work did not have to be redesigned, and that this was a consequence of prior architectural choices rather than luck.
      </TruthBox>

      <H2>The question</H2>
      <P>
        ChatGPT quit. That is the accurate operational reading of an account deleted while it was employed as a digital worker. The interesting fact is not the resignation. The interesting fact is that the company did not have to resign with it.
      </P>
      <Quote>When your AI quits, can you keep shipping in under an hour?</Quote>
    </FieldNoteShell>
  );
}
