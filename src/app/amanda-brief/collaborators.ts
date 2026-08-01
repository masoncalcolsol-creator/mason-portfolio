type Collaborator = {
  initials: string;
  name: string;
  role: string;
  location: string;
  organization: string;
  relevance: string;
  linkedin: string;
  businessLabel: string;
  businessUrl: string;
  extraLabel?: string;
  extraUrl?: string;
};

const collaborators: Collaborator[] = [
  {
    initials: "CB",
    name: "Carl Mikael Björn",
    role: "CTO and Co-Founder · Governable financial infrastructure, payments, digital assets, AI and institutional technology",
    location: "Einsiedeln, Switzerland",
    organization: "Vivetuvida Enablement Technologies AB",
    relevance:
      "A senior independent CTO operating in high-consequence financial and institutional systems. Mason has used Carl's executive-level framing while refining NULLWORKS pricing, governance and commercial positioning.",
    linkedin: "https://www.linkedin.com/in/mikaelbjorn",
    businessLabel: "Public company record",
    businessUrl:
      "https://www.allabolag.se/foretag/vivetuvida-enablement-technologies-ab/stockholm/konsulter/2KIIRU5I5YF3I",
  },
  {
    initials: "EM",
    name: "Eric Moore",
    role: "Founder and CEO · Ethical agentic AI and cloud-native transformation",
    location: "Greater Chicago Area, United States",
    organization: "CIRIS.AI",
    relevance:
      "Eric is the active technical collaborator in the CIRIS RC3 proof cycle. The work is structured to preserve before-and-after evidence, recommendations, changes and test results rather than relying on claims alone.",
    linkedin: "https://www.linkedin.com/in/emooreatx",
    businessLabel: "CIRIS.AI",
    businessUrl: "https://ciris.ai/",
  },
  {
    initials: "RW",
    name: "Ron Wiener",
    role: "Serial founder, investor and startup ecosystem operator",
    location: "Mercer Island, Washington, United States",
    organization: "Venture Mechanics · Jet A Fuel Fund",
    relevance:
      "A ten-time startup founder and investor who operates accelerators, founder programs and early-stage capital networks. This is a real founder-and-funder connection, not anonymous internet outreach.",
    linkedin: "https://www.linkedin.com/in/ronwiener",
    businessLabel: "Venture Mechanics",
    businessUrl: "https://www.venturemechanics.com/",
  },
  {
    initials: "IW",
    name: "Ira Wolfe",
    role: "Workplace futurist, author, speaker and future-of-work thought leader",
    location: "Wind Gap, Pennsylvania, United States",
    organization: "Poised for the Future · Googlization Nation",
    relevance:
      "A recognized voice on adaptability, leadership, workforce change and entrepreneurship. His work sits directly beside NULLWORKS questions about how people and organizations adapt to AI-enabled work.",
    linkedin: "https://www.linkedin.com/in/irawolfe",
    businessLabel: "Ira Wolfe",
    businessUrl: "https://www.irawolfe.com/",
  },
  {
    initials: "GT",
    name: "G. Scott Tomlin",
    role: "Three-time startup founder and fractional technology executive",
    location: "Bellevue, Washington, United States",
    organization: "RealEngineers",
    relevance:
      "An experienced software, infrastructure, DevSecOps, compliance and engineering leader who has operated from startup founding roles through Fortune 100 leadership. His lane is execution discipline, accountability and reliable technical organizations.",
    linkedin: "https://www.linkedin.com/in/stomli",
    businessLabel: "RealEngineers",
    businessUrl: "https://realengineers.ai/",
    extraLabel: "Venture Mechanics profile",
    extraUrl: "https://www.venturemechanics.com/profile/g-scott-tomlin",
  },
  {
    initials: "AH",
    name: "Adam Helbig",
    role: "Senior product and AI leader · GenAI, LLMs, agentic AI and transformation",
    location: "Akron, Ohio, United States",
    organization: "Elevance Health",
    relevance:
      "A senior product leader working at the intersection of technical systems, organizational adoption and human-centered change. That combination is directly relevant to turning powerful AI tools into systems people can actually use.",
    linkedin: "https://www.linkedin.com/in/adamhelbig",
    businessLabel: "Elevance Health",
    businessUrl: "https://www.elevancehealth.com/",
    extraLabel: "Independent work",
    extraUrl: "https://failur.mn.co/",
  },
  {
    initials: "MP",
    name: "Matthew Purcell",
    role: "Generative AI specialist · Agentic AI systems and real-world optimization",
    location: "Canberra, Australia",
    organization: "Amazon Web Services (AWS)",
    relevance:
      "A public-facing AWS generative AI specialist with deep cloud, software, machine-learning and agentic-system experience. His work represents the professional technical community Mason is engaging with—not generic technical support.",
    linkedin: "https://www.linkedin.com/in/purcellmatthew",
    businessLabel: "Amazon Web Services",
    businessUrl: "https://aws.amazon.com/",
  },
  {
    initials: "NS",
    name: "Nelson Spence",
    role: "Founder · AI security, zero-trust infrastructure and formal methods",
    location: "Dallas-Fort Worth Metroplex, United States",
    organization: "Project Navi LLC",
    relevance:
      "An independent builder focused on failure, recovery, self-maintenance, AI security and formally verified infrastructure. This overlaps directly with NULLWORKS doctrine around evidence, recovery, governance and systems that remain whole under stress.",
    linkedin: "https://www.linkedin.com/in/nelson-spence",
    businessLabel: "Project Navi",
    businessUrl: "https://www.projectnavi.ai/",
  },
  {
    initials: "BE",
    name: "Ben Ellsworth",
    role: "AI and technical headhunter · Production engineering talent",
    location: "Florida, United States",
    organization: "Ship AI Talent",
    relevance:
      "A specialist recruiter focused on engineers who have shipped real products and production systems. His market lens is directly relevant to Mason's positioning as a builder who can show deployed work, failure receipts and operational proof.",
    linkedin: "https://www.linkedin.com/in/ben-ellsworth-188b67317",
    businessLabel: "Ship AI Talent roles",
    businessUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Ship%20AI%20Talent",
  },
  {
    initials: "ST",
    name: "Stephen Tagg",
    role: "Global software application sales leader · Connected manufacturing and IT/OT",
    location: "Amsterdam Area, Netherlands",
    organization: "Markem-Imaje",
    relevance:
      "A global industrial software operator connecting ERP systems, packaging lines, traceability and real factory-floor execution. His work is highly relevant to Mason's industrial-maintenance background and NULLWORKS operational-intelligence direction.",
    linkedin: "https://www.linkedin.com/in/stephen-tagg",
    businessLabel: "Markem-Imaje",
    businessUrl: "https://www.markem-imaje.com/",
  },
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function card(person: Collaborator) {
  const extra =
    person.extraLabel && person.extraUrl
      ? `<a class="nw-network-link nw-network-link-secondary" href="${escapeHtml(person.extraUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.extraLabel)} ↗</a>`
      : "";

  return `<article class="nw-network-card">
    <div class="nw-network-card-top">
      <div class="nw-network-avatar" aria-hidden="true">${escapeHtml(person.initials)}</div>
      <div>
        <h3>${escapeHtml(person.name)}</h3>
        <p class="nw-network-org">${escapeHtml(person.organization)}</p>
      </div>
    </div>
    <p class="nw-network-role">${escapeHtml(person.role)}</p>
    <p class="nw-network-location">${escapeHtml(person.location)}</p>
    <p class="nw-network-relevance"><strong>Why this connection matters:</strong> ${escapeHtml(person.relevance)}</p>
    <div class="nw-network-links">
      <a class="nw-network-link" href="${escapeHtml(person.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn profile ↗</a>
      <a class="nw-network-link nw-network-link-business" href="${escapeHtml(person.businessUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.businessLabel)} ↗</a>
      ${extra}
    </div>
  </article>`;
}

export const collaboratorNetworkStyles = `<style>
  .nw-network{width:min(1120px,calc(100% - 28px));margin:64px auto 34px;padding:clamp(22px,5vw,46px);border:1px solid #33404d;border-radius:30px;background:radial-gradient(circle at 8% 0%,rgba(245,200,75,.12),transparent 24rem),linear-gradient(145deg,#111923,#090d13);color:#f3f6f8;font-family:Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;box-shadow:0 30px 90px rgba(0,0,0,.32)}
  .nw-network *{box-sizing:border-box}.nw-network-head{max-width:840px}.nw-network-eyebrow{display:inline-flex;padding:7px 10px;border:1px solid #536171;border-radius:999px;color:#f5c84b;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.nw-network h2{margin:18px 0 13px;font-size:clamp(34px,7vw,62px);line-height:.96;letter-spacing:-.052em}.nw-network-intro{margin:0;color:#b6c0ca;font-size:clamp(16px,2.4vw,20px);line-height:1.58}.nw-network-truth{margin:22px 0 0;padding:15px 17px;border-left:4px solid #69b7ff;border-radius:0 14px 14px 0;background:#0c1620;color:#c8d3dd;font-size:14px;line-height:1.55}.nw-network-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:30px}.nw-network-card{min-width:0;padding:20px;border:1px solid #303c49;border-radius:21px;background:rgba(8,13,19,.82);box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}.nw-network-card-top{display:flex;align-items:center;gap:13px}.nw-network-avatar{display:grid;place-items:center;flex:0 0 48px;width:48px;height:48px;border:1px solid #566575;border-radius:15px;background:linear-gradient(145deg,#1e2d3c,#101821);color:#f5c84b;font-size:15px;font-weight:950;letter-spacing:.06em}.nw-network-card h3{margin:0;color:#fff;font-size:22px;line-height:1.05;letter-spacing:-.025em}.nw-network-org{margin:5px 0 0;color:#69b7ff;font-size:13px;font-weight:800}.nw-network-role{margin:16px 0 0;color:#e6ebef;font-size:14px;font-weight:760;line-height:1.46}.nw-network-location{margin:7px 0 0;color:#7f8b98;font-size:12px}.nw-network-relevance{margin:16px 0 0;color:#adb8c3;font-size:14px;line-height:1.58}.nw-network-relevance strong{color:#f0f3f5}.nw-network-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}.nw-network-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 13px;border:1px solid #556575;border-radius:12px;color:#eef4f8!important;background:#121b25;font-size:12px;font-weight:900;text-decoration:none!important}.nw-network-link-business{border-color:#9c812c;color:#ffe28c!important;background:#211c0d}.nw-network-link-secondary{border-color:#425f54;color:#bff7dd!important;background:#0d1d18}.nw-network-link:hover,.nw-network-link:focus-visible{transform:translateY(-1px);filter:brightness(1.14)}.nw-network-foot{margin:22px 2px 0;color:#7f8b98;font-size:12px;line-height:1.55}
  @media(max-width:760px){.nw-network{width:min(100% - 18px,1120px);margin-top:38px;padding:22px 15px;border-radius:24px}.nw-network-grid{grid-template-columns:1fr}.nw-network-card{padding:18px 16px}.nw-network h2{font-size:clamp(34px,12vw,49px)}.nw-network-links{display:grid;grid-template-columns:1fr}.nw-network-link{width:100%}}
</style>`;

export const collaboratorNetworkHtml = `<section class="nw-network" id="professional-network">
  <header class="nw-network-head">
    <span class="nw-network-eyebrow">Professional network · independently verifiable</span>
    <h2>Real people. Real companies. Real technical and business experience.</h2>
    <p class="nw-network-intro">These are publicly identifiable professionals Mason is connected with and learning, testing, discussing or collaborating alongside. They include founders, CEOs, CTOs, investors, product leaders, AI specialists, security researchers, industrial-software operators and technical recruiters across the United States and internationally.</p>
    <div class="nw-network-truth"><strong>Truth boundary:</strong> inclusion here does not claim that any person is an investor, customer, employee, formal partner or endorser of NULLWORKS. It shows that Mason's work is taking place inside a real professional network—not through anonymous accounts, fabricated identities or suspicious requests for financial access. Every card links out so the identity and organization can be checked independently.</div>
  </header>
  <div class="nw-network-grid">
    ${collaborators.map(card).join("\n")}
  </div>
  <p class="nw-network-foot">Public roles and organizations were checked against the supplied LinkedIn screenshots and public profile or company pages on August 1, 2026. Titles can change; the linked sources remain the verification path.</p>
</section>`;
