type Collaborator = {
  avatar: string;
  initials: string;
  name: string;
  role: string;
  location: string;
  organization: string;
  description: string;
  relevance: string;
  linkedin: string;
  businessLabel: string;
  businessUrl: string;
  extraLabel?: string;
  extraUrl?: string;
};

const collaborators: Collaborator[] = [
  {
    avatar: "https://unavatar.io/linkedin/user:mikaelbjorn",
    initials: "CB",
    name: "Carl Mikael Björn",
    role: "CTO and Co-Founder · Governable financial infrastructure, payments, digital assets, AI and institutional technology",
    location: "Einsiedeln, Switzerland",
    organization: "Vivetuvida Enablement Technologies AB",
    description:
      "Carl describes himself as an independent CTO who operates where systems are expected to work and do not. His work spans financial infrastructure, payment rails, digital-asset platforms, cybersecurity, distributed systems and governance under real operational constraints.",
    relevance:
      "Mason has used Carl's executive-level framing while refining NULLWORKS pricing, governance and commercial positioning.",
    linkedin: "https://www.linkedin.com/in/mikaelbjorn",
    businessLabel: "Company record",
    businessUrl:
      "https://www.allabolag.se/foretag/vivetuvida-enablement-technologies-ab/stockholm/konsulter/2KIIRU5I5YF3I",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:emooreatx",
    initials: "EM",
    name: "Eric Moore",
    role: "Founder and CEO · Ethical agentic AI and cloud-native transformation",
    location: "Greater Chicago Area, United States",
    organization: "CIRIS.AI",
    description:
      "Eric describes his work as helping organizations navigate automation, intelligence and ethical technology. He focuses on agentic systems, ethical AI, cloud-native engineering, multi-agent coordination and principled system design.",
    relevance:
      "Eric is the active technical collaborator in the CIRIS RC3 proof cycle. The work preserves before-and-after evidence, recommendations, changes and test results instead of relying on claims alone.",
    linkedin: "https://www.linkedin.com/in/emooreatx",
    businessLabel: "CIRIS.AI",
    businessUrl: "https://ciris.ai/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:ronwiener",
    initials: "RW",
    name: "Ron Wiener",
    role: "Serial founder, investor and startup ecosystem operator",
    location: "Mercer Island, Washington, United States",
    organization: "Venture Mechanics · Jet A Fuel Fund",
    description:
      "Ron presents himself as a multi-time founder, investor and startup operator working across venture studios, accelerators, fundraising, company formation and founder support. He runs real startup programs and capital networks.",
    relevance:
      "This is a real founder-and-funder connection inside the United States, not anonymous internet outreach.",
    linkedin: "https://www.linkedin.com/in/ronwiener",
    businessLabel: "Venture Mechanics",
    businessUrl: "https://www.venturemechanics.com/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:irawolfe",
    initials: "IW",
    name: "Ira Wolfe",
    role: "Workplace futurist, author, speaker and future-of-work thought leader",
    location: "Wind Gap, Pennsylvania, United States",
    organization: "Poised for the Future · Googlization Nation",
    description:
      "Ira describes himself as a workplace futurist focused on leadership, adaptability and the human effects of accelerating change. His work explores how people, schools and organizations prepare for technology-driven disruption.",
    relevance:
      "His work sits directly beside NULLWORKS questions about how people and organizations adapt to AI-enabled work.",
    linkedin: "https://www.linkedin.com/in/irawolfe",
    businessLabel: "Ira Wolfe",
    businessUrl: "https://www.irawolfe.com/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:stomli",
    initials: "GT",
    name: "G. Scott Tomlin",
    role: "Three-time startup founder and fractional technology executive",
    location: "Bellevue, Washington, United States",
    organization: "RealEngineers",
    description:
      "Scott describes himself as a senior technology leader, innovator, mentor and operator. His background includes software, infrastructure, site reliability, security, data, incident response and leadership from startups through Fortune 100 companies.",
    relevance:
      "His lane is execution discipline, accountability, standards and building technical organizations that can actually deliver.",
    linkedin: "https://www.linkedin.com/in/stomli",
    businessLabel: "RealEngineers",
    businessUrl: "https://realengineers.ai/",
    extraLabel: "Venture Mechanics profile",
    extraUrl: "https://www.venturemechanics.com/profile/g-scott-tomlin",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:adamhelbig",
    initials: "AH",
    name: "Adam Helbig",
    role: "Senior product and AI leader · GenAI, LLMs, agentic AI and transformation",
    location: "Akron, Ohio, United States",
    organization: "Elevance Health",
    description:
      "Adam describes his work as translating complex technology into real human understanding. He operates at the intersection of AI, product, education and organizational change so people can adopt new systems without being left behind.",
    relevance:
      "That human-and-technical combination is directly relevant to turning powerful AI tools into systems people can actually use.",
    linkedin: "https://www.linkedin.com/in/adamhelbig",
    businessLabel: "Elevance Health",
    businessUrl: "https://www.elevancehealth.com/",
    extraLabel: "Independent work",
    extraUrl: "https://failur.mn.co/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:purcellmatthew",
    initials: "MP",
    name: "Matthew Purcell",
    role: "Generative AI specialist · Agentic AI systems and real-world optimization",
    location: "Canberra, Australia",
    organization: "Amazon Web Services (AWS)",
    description:
      "Matthew presents himself as an AI specialist with experience across cloud services, software development, machine learning, generative AI and agentic systems. He focuses on simplifying complex technology and helping teams ship real systems.",
    relevance:
      "His work represents the professional technical community Mason is engaging with, not generic technical support.",
    linkedin: "https://www.linkedin.com/in/purcellmatthew",
    businessLabel: "Amazon Web Services",
    businessUrl: "https://aws.amazon.com/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:nelson-spence",
    initials: "NS",
    name: "Nelson Spence",
    role: "Founder · AI security, zero-trust infrastructure and formal methods",
    location: "Dallas-Fort Worth Metroplex, United States",
    organization: "Project Navi LLC",
    description:
      "Nelson describes his work as studying failure, recovery and self-maintenance across complex systems. His focus includes AI security, formal verification, open-source infrastructure and systems that remain coherent under stress.",
    relevance:
      "This overlaps directly with NULLWORKS doctrine around evidence, recovery, governance and continuity under failure.",
    linkedin: "https://www.linkedin.com/in/nelson-spence",
    businessLabel: "Project Navi",
    businessUrl: "https://www.projectnavi.ai/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:ben-ellsworth-188b67317",
    initials: "BE",
    name: "Ben Ellsworth",
    role: "AI and technical headhunter · Production engineering talent",
    location: "Florida, United States",
    organization: "Ship AI Talent",
    description:
      "Ben positions himself as a technical recruiter who looks for engineers who have shipped real products, deployed real models and understand production code. His focus is separating genuine builders from résumé buzzwords.",
    relevance:
      "His market lens is directly relevant to Mason's positioning as a builder who can show deployed work, failure receipts and operational proof.",
    linkedin: "https://www.linkedin.com/in/ben-ellsworth-188b67317",
    businessLabel: "Ship AI Talent",
    businessUrl: "https://www.linkedin.com/company/ship-ai-talent/",
  },
  {
    avatar: "https://unavatar.io/linkedin/user:stephen-tagg",
    initials: "ST",
    name: "Stephen Tagg",
    role: "Global software application sales leader · Connected manufacturing and IT/OT",
    location: "Amsterdam Area, Netherlands",
    organization: "Markem-Imaje",
    description:
      "Stephen describes his work as connecting business systems with real packaging lines and factory-floor operations. His experience spans IT/OT integration, traceability, ERP systems, production software and manufacturing execution.",
    relevance:
      "His work is highly relevant to Mason's industrial-maintenance background and NULLWORKS operational-intelligence direction.",
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
      <img class="nw-network-avatar" src="${escapeHtml(person.avatar)}" alt="${escapeHtml(person.name)} headshot" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
      <div class="nw-network-avatar-fallback" aria-hidden="true">${escapeHtml(person.initials)}</div>
      <div>
        <h3>${escapeHtml(person.name)}</h3>
        <p class="nw-network-org">${escapeHtml(person.organization)}</p>
      </div>
    </div>
    <p class="nw-network-role">${escapeHtml(person.role)}</p>
    <p class="nw-network-location">${escapeHtml(person.location)}</p>
    <p class="nw-network-description">${escapeHtml(person.description)}</p>
    <p class="nw-network-relevance"><strong>Why this connection matters:</strong> ${escapeHtml(person.relevance)}</p>
    <div class="nw-network-links">
      <a class="nw-network-link" href="${escapeHtml(person.linkedin)}" target="_blank" rel="noopener noreferrer">Open profile ↗</a>
      <a class="nw-network-link nw-network-link-business" href="${escapeHtml(person.businessUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.businessLabel)} ↗</a>
      ${extra}
    </div>
  </article>`;
}

export const collaboratorNetworkStyles = `<style>
  .nw-network{width:min(1120px,calc(100% - 28px));margin:56px auto 34px;padding:clamp(22px,5vw,46px);border:1px solid #33404d;border-radius:30px;background:radial-gradient(circle at 8% 0%,rgba(245,200,75,.12),transparent 24rem),linear-gradient(145deg,rgba(17,25,35,.94),rgba(9,13,19,.96));color:#f3f6f8;font-family:Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;box-shadow:0 30px 90px rgba(0,0,0,.32);backdrop-filter:blur(12px)}
  .nw-network *{box-sizing:border-box}.nw-network-head{max-width:880px}.nw-network-eyebrow{display:inline-flex;padding:7px 10px;border:1px solid #536171;border-radius:999px;color:#f5c84b;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.nw-network h2{margin:18px 0 13px;font-size:clamp(34px,7vw,62px);line-height:.96;letter-spacing:-.052em}.nw-network-intro{margin:0;color:#b6c0ca;font-size:clamp(16px,2.4vw,20px);line-height:1.58}.nw-network-truth{margin:22px 0 0;padding:15px 17px;border-left:4px solid #69b7ff;border-radius:0 14px 14px 0;background:#0c1620;color:#c8d3dd;font-size:14px;line-height:1.55}.nw-network-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:30px}.nw-network-card{min-width:0;padding:20px;border:1px solid #303c49;border-radius:21px;background:rgba(8,13,19,.84);box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}.nw-network-card-top{display:flex;align-items:flex-start;gap:14px}.nw-network-avatar{display:block;flex:0 0 72px;width:72px;height:72px;object-fit:cover;border:2px solid rgba(245,200,75,.62);border-radius:50%;background:#111923;box-shadow:0 0 0 4px rgba(255,255,255,.025)}.nw-network-avatar-fallback{display:none;place-items:center;flex:0 0 72px;width:72px;height:72px;border:2px solid rgba(245,200,75,.62);border-radius:50%;background:linear-gradient(145deg,#1e2d3c,#101821);color:#f5c84b;font-size:18px;font-weight:950;letter-spacing:.06em}.nw-network-card h3{margin:2px 0 0;color:#fff;font-size:23px;line-height:1.05;letter-spacing:-.025em}.nw-network-org{margin:7px 0 0;color:#69b7ff;font-size:13px;font-weight:800}.nw-network-role{margin:16px 0 0;color:#e6ebef;font-size:14px;font-weight:760;line-height:1.46}.nw-network-location{margin:7px 0 0;color:#7f8b98;font-size:12px}.nw-network-description{margin:16px 0 0;color:#bdc7d0;font-size:14px;line-height:1.6}.nw-network-relevance{margin:13px 0 0;padding-top:13px;border-top:1px solid rgba(255,255,255,.07);color:#9facb8;font-size:14px;line-height:1.58}.nw-network-relevance strong{color:#f0f3f5}.nw-network-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}.nw-network-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 13px;border:1px solid #556575;border-radius:12px;color:#eef4f8!important;background:#121b25;font-size:12px;font-weight:900;text-decoration:none!important}.nw-network-link-business{border-color:#9c812c;color:#ffe28c!important;background:#211c0d}.nw-network-link-secondary{border-color:#425f54;color:#bff7dd!important;background:#0d1d18}.nw-network-link:hover,.nw-network-link:focus-visible{transform:translateY(-1px);filter:brightness(1.14)}.nw-network-foot{margin:22px 2px 0;color:#7f8b98;font-size:12px;line-height:1.55}
  @media(max-width:760px){.nw-network{width:min(100% - 18px,1120px);margin-top:38px;padding:22px 15px;border-radius:24px}.nw-network-grid{grid-template-columns:1fr}.nw-network-card{padding:18px 16px}.nw-network h2{font-size:clamp(34px,12vw,49px)}.nw-network-avatar,.nw-network-avatar-fallback{flex-basis:68px;width:68px;height:68px}.nw-network-links{display:grid;grid-template-columns:1fr}.nw-network-link{width:100%}}
</style>`;

export const collaboratorNetworkHtml = `<section class="nw-network" id="professional-network">
  <header class="nw-network-head">
    <span class="nw-network-eyebrow">Real professional network · independently checkable</span>
    <h2>These are real people doing high-level technical and business work.</h2>
    <p class="nw-network-intro">Mason is talking, learning, testing or collaborating with identifiable founders, CEOs, CTOs, investors, product leaders, AI specialists, security researchers, industrial-software operators and technical recruiters. Their headshots and self-described work are shown here so Amanda can see the people behind the names.</p>
    <div class="nw-network-truth"><strong>Truth boundary:</strong> inclusion does not claim that any person is an investor, customer, employee, formal partner or endorser of NULLWORKS. It demonstrates that Mason's work is taking place inside a real professional network—not through anonymous accounts, fabricated identities or somebody asking for financial access.</div>
  </header>
  <div class="nw-network-grid">
    ${collaborators.map(card).join("\n")}
  </div>
  <p class="nw-network-foot">Roles and descriptions are paraphrased from the profile screenshots Mason supplied. Titles can change; the profile and business buttons are the verification path.</p>
</section>`;
