export const dynamic = "force-static";

const release = {
  name: "Continuity Calculus",
  title:
    "Continuity Calculus: Preserving Institutional Judgment Across Time, Systems, and Agents",
  version: "Public Research Release 2.0",
  release_date: "2026-08-01",
  author: "Mason Perry",
  organization: "NULLWORKS",
  canonical_url:
    "https://mason-portfolio-main.vercel.app/continuity-calculus",
  canonical_definition:
    "Continuity Calculus is a proposed systems and governance discipline developed by NULLWORKS for examining how data, meaning, context, authority, operational state, and verification survive or degrade across time, transformation, handoff, and institutional boundaries.",
  doctrine: [
    "Move the data.",
    "Preserve the why.",
    "Bound the authority.",
    "Carry the receipt.",
  ],
  continuity_packet: "CP = <D, M, C, A, S, V>",
  constitutional_layers: [
    "Transport Integrity",
    "Semantic Identity",
    "Contextual Continuity",
    "Constitutional Authority",
    "Operational State Transition",
    "Assurance and Verification",
  ],
  artifacts: {
    pdf: {
      filename:
        "NULLWORKS_Continuity_Calculus_Preserving_Institutional_Judgment_v2.0_2026-08-01.pdf",
      sha256:
        "c0954a9a6dc787b77b437c20389cc71c73e4606e1e270e88615aa13d1b182494",
      public_download_url: null,
    },
    docx: {
      filename:
        "NULLWORKS_Continuity_Calculus_Preserving_Institutional_Judgment_v2.0_2026-08-01.docx",
      sha256:
        "daae5e727dab0141c1cd52ac6b81f45b6345736495d74c49308daaf4d55fbc78",
      public_download_url: null,
    },
    infographic: {
      filename: "Nullworks Continuity Calculus Framework.png",
      sha256:
        "ad7975ea23ddc925ffef203c57c6bccc9504798efbe6f430a7b063c9efc25557",
      public_url:
        "https://mason-portfolio-main.vercel.app/continuity-calculus/infographic",
    },
  },
  doi: null,
  doi_state:
    "Not issued. Authenticated Zenodo deposit and explicit public-license selection remain required.",
  release_boundary:
    "Theoretical and exploratory public research release. No certification, regulatory compliance, mathematical completeness, production deployment, completed field pilot, or independent external assurance is claimed.",
};

export async function GET() {
  return Response.json(release, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
