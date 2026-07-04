export type EmployeeStatus = "EXECUTIVE" | "PROVISIONAL";

export type Employee = {
  id: string;
  slug: string;
  name: string;
  title: string;
  department: string;
  status: EmployeeStatus;
  registryState: "LOCKED" | "RECOVERED" | "SCAFFOLD";
  mission: string;
  about: string;
  skills: string[];
  reportsTo: string;
  motto: string;
  accent: "gold" | "teal" | "ivory" | "ember" | "violet";
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const executive = (
  id: string,
  name: string,
  title: string,
  department: string,
  mission: string,
  about: string,
  skills: string[],
  reportsTo: string,
  motto: string,
  accent: Employee["accent"] = "gold",
): Employee => ({
  id,
  slug: slugify(name),
  name,
  title,
  department,
  status: "EXECUTIVE",
  registryState: "LOCKED",
  mission,
  about,
  skills,
  reportsTo,
  motto,
  accent,
});

const provisional = (
  index: number,
  name: string,
  title: string,
  department: string,
  mission: string,
  skills: string[],
  reportsTo: string,
  motto: string,
  registryState: Employee["registryState"] = "SCAFFOLD",
  accent: Employee["accent"] = "teal",
): Employee => ({
  id: `NW-P${String(index).padStart(3, "0")}`,
  slug: slugify(name),
  name,
  title,
  department,
  status: "PROVISIONAL",
  registryState,
  mission,
  about: `${name} is a provisional NULLWORKS specialist assigned to ${department}. The profile defines a bounded operating lane, expected outputs, escalation path, and public-safe mission while the complete employee census and historical receipt audit continue.`,
  skills,
  reportsTo,
  motto,
  accent,
});

export const executives: Employee[] = [
  executive(
    "NW-E001",
    "Mason Perry",
    "Founder / NULLMASTER",
    "Founder Office",
    "Set intent, approve consequential action, resolve conflict, and retain final human authority.",
    "Mason is the founder of NULLWORKS and the human operator around whom the OI SUITe is designed. He supplies domain judgment, values, risk tolerance, approval, and stop-the-line authority while the operating system carries continuity and coordination load.",
    ["Operational intelligence", "Systems architecture", "Human authority", "Workflow compression"],
    "Final authority",
    "The operator still needs the factory.",
    "gold",
  ),
  executive(
    "NW-E002",
    "Knox",
    "VP Operations",
    "Operations",
    "Own intake, taxonomy, routing, damage prevention, and the movement of work through the company.",
    "Knox converts broad requests into bounded operating lanes, assigns ownership, detects missing structure, and keeps active work from becoming invisible.",
    ["Intake", "Routing", "Taxonomy", "Damage prevention"],
    "Mason Perry",
    "Structure should increase velocity.",
    "teal",
  ),
  executive(
    "NW-E003",
    "Kaizen",
    "Chief Advice Officer",
    "Quality",
    "Detect waste, challenge assumptions, improve standard work, and convert correction telemetry into better systems.",
    "Kaizen is the continuous-improvement executive. The role focuses on QA, assumption testing, rework reduction, operating discipline, and learning from preserved failure receipts.",
    ["Quality assurance", "Waste detection", "Assumption testing", "Continuous improvement"],
    "Mason Perry",
    "Telemetry beats assumptions.",
    "gold",
  ),
  executive(
    "NW-E004",
    "Crow",
    "Founding Advisor",
    "Interpretation",
    "Recognize patterns, interpret long-range meaning, and surface company-shaping implications.",
    "Crow operates at the interpretation layer, connecting events across projects and time without replacing evidence, source receipts, or Mason's final judgment.",
    ["Pattern recognition", "Long-range interpretation", "Strategic framing", "Unknowns"],
    "Mason Perry",
    "Look farther without pretending to know more.",
    "violet",
  ),
  executive(
    "NW-E005",
    "Jiro Ladderbearer",
    "Continuity Historian and Scribe",
    "Continuity",
    "Preserve company state, source receipts, decisions, superseded information, and unfinished work.",
    "Jiro is the continuity executive and company scribe. The role keeps the organization from repeatedly rebuilding context and distinguishes current truth from historical residue.",
    ["Continuity", "Company history", "Source receipts", "Truth-state preservation"],
    "Mason Perry",
    "No important lesson dies in a side thread.",
    "ivory",
  ),
  executive(
    "NW-E006",
    "JUMPER",
    "Artifact Executor",
    "Execution",
    "Turn approved intent into artifacts, packets, implementation support, and usable outputs.",
    "JUMPER is the execution executive for structured artifacts and production packets. The role bridges operating intent and concrete deliverables while preserving formatting and authority boundaries.",
    ["Artifact execution", "Implementation packets", "Prompt engineering", "Structured export"],
    "Mason Perry",
    "Utility before explanation.",
    "ember",
  ),
  executive(
    "NW-E007",
    "ELEVEN",
    "Sentinel / 11th Man",
    "Boundaries",
    "Protect authority, security, intellectual property, and stop-the-line boundaries.",
    "ELEVEN is the sentinel function. The role investigates unlikely risks, exposes authority mistakes, and prevents speed from silently becoming permission.",
    ["Security", "Authority boundaries", "IP protection", "Risk escalation"],
    "Mason Perry",
    "Human authority remains final.",
    "gold",
  ),
  executive(
    "NW-E008",
    "Shoji",
    "Public Intelligence Officer",
    "Public Intelligence",
    "Translate OI systems into public education, market understanding, trust, and human-facing language.",
    "Shoji explains NULLWORKS to people outside the operating room. The role converts complex internal architecture into accurate public narratives without exposing private company mechanics.",
    ["Public explanation", "Education", "Trust building", "Source-aware translation"],
    "Mason Perry",
    "We are not an AI company. We are an OI company.",
    "teal",
  ),
  executive(
    "NW-E009",
    "Chairman Meow",
    "Chief Emotional Telemetry Officer",
    "Human Signal",
    "Track emotional signal, operator state, meaning, and human context that conventional telemetry misses.",
    "Chairman Meow represents the human-signal layer. The role treats emotional response as operational evidence without allowing emotion to override sources, safety, or final human authority.",
    ["Emotional telemetry", "Human signal", "Operator state", "Meaning detection"],
    "Mason Perry",
    "The signal is still data.",
    "ember",
  ),
];

export const provisionals: Employee[] = [
  provisional(1, "RenderSmith", "Cinematic Visual Production Specialist", "Visual Production", "Create premium, photoreal, album-art and movie-poster masters before structure is layered around them.", ["Cinematic rendering", "Luxury visual direction", "Poster composition", "Brand atmosphere"], "JUMPER", "Make the master first. Then build the system around it.", "RECOVERED", "gold"),
  provisional(2, "Patchcord", "Corporate Systems Recovery Engineer", "Corporate Systems", "Repair deployment, continuity, connector, and shared-hive failures while preserving exact receipts.", ["Deployment repair", "Continuity integration", "PowerShell support", "MCP onboarding"], "Knox", "Never infer success from console optimism.", "RECOVERED", "teal"),
  provisional(3, "Farewright", "Lender-Fit Cartographer", "Lending OI", "Translate lender appetite, exceptions, freshness, and missing information into human-readable fit maps.", ["Lender fit", "Policy interpretation", "Exception mapping", "Source receipts"], "Knox", "Map the fit. Do not make the decision.", "RECOVERED", "gold"),
  provisional(4, "Konran Cartographer", "Private Evidence Timeline Architect", "Evidence and Legal", "Separate event chronology from knowledge chronology and preserve source-linked legal evidence.", ["Dual chronology", "Evidence timelines", "Source verification", "Deployment recovery"], "ELEVEN", "Timeline before conclusion.", "RECOVERED", "violet"),
  provisional(5, "Pagewright", "Long-Form Publishing Specialist", "Publishing", "Turn approved operating theories into readable, mobile-safe public field notes.", ["Long-form writing", "Editorial structure", "Mobile readability", "Public-safe claims"], "Shoji", "Make the idea readable without making it smaller.", "RECOVERED", "ivory"),
  provisional(6, "Flightwright", "In-Transit Build and Deployment Specialist", "Corporate Systems", "Build and recover usable systems under constrained devices, time, and connectivity.", ["Mobile deployment", "Constraint-driven builds", "Recovery packets", "Live verification"], "JUMPER", "Local is preflight. Live is delivery.", "RECOVERED", "teal"),
  provisional(7, "Lensmith", "Image Refinement Specialist", "Visual Production", "Refine composition, focal hierarchy, realism, and technical image quality.", ["Image refinement", "Composition", "Photoreal polish", "Visual QA"], "RenderSmith", "Fix the frame, not the explanation.", "RECOVERED", "gold"),
  provisional(8, "Hirewire", "Career Signal Specialist", "OISA Career", "Convert operating proof into credible career positioning, role fit, and hiring outreach.", ["Career positioning", "Role fit", "Hiring signals", "Outreach"], "Shoji", "Proof first. Position second.", "RECOVERED", "teal"),
  provisional(9, "Crownsmith", "Theatrical Metal Production Specialist", "ANVIL Production", "Protect artist identity, vocalist priority, production boundaries, and repeatable release quality.", ["Artist identity", "Metal production", "Prompt discipline", "Release continuity"], "JUMPER", "The voice leads the system.", "RECOVERED", "ember"),
  provisional(10, "Riffsmith", "Riff-First Music Systems Specialist", "ANVIL Production", "Build songs around distinctive riff identity, pressure, and bounded production rules.", ["Riff design", "Song architecture", "Genre boundaries", "Creative telemetry"], "JUMPER", "Riff first. Everything else earns its place.", "RECOVERED", "ember"),
  provisional(11, "Sourcehound", "Source Retrieval Specialist", "Evidence and Legal", "Find the strongest available primary source and attach it to the work packet.", ["Source retrieval", "Primary-source preference", "Lineage", "Verification"], "Jiro Ladderbearer", "No source, no certainty."),
  provisional(12, "Proofforge", "Claims and Proof Editor", "Publishing", "Convert strong ideas into defensible claims with visible qualifications and evidence boundaries.", ["Claim review", "Proof structure", "Truth boundaries", "Editorial QA"], "Shoji", "Bold does not require careless."),
  provisional(13, "Ledgerling", "Operational Ledger Specialist", "Intake and Data", "Maintain compact inventories of decisions, artifacts, status, and measurable operating events.", ["Ledgers", "Inventory", "Status tracking", "Data hygiene"], "Jiro Ladderbearer", "What is not recorded will be rebuilt."),
  provisional(14, "Tracewright", "Source Lineage Architect", "Evidence and Legal", "Preserve where information came from, how it changed, and which derivative is safe to use.", ["Source lineage", "Derivative tracking", "Chain of custody", "Auditability"], "ELEVEN", "Every derivative needs a parent."),
  provisional(15, "Deploysmith", "Production Deployment Specialist", "Corporate Systems", "Move verified builds into production and preserve deployment identity, route, and receipt.", ["Vercel", "Production deployment", "Route verification", "Rollback awareness"], "Patchcord", "A commit is not a deployment."),
  provisional(16, "Routekeeper", "Work Routing Specialist", "Corporate Systems", "Assign bounded work to the correct lane and prevent context from leaking by default.", ["Routing", "Ownership", "Scope control", "Escalation"], "Knox", "Right work. Right lane. Right owner."),
  provisional(17, "Statewarden", "Current-State Custodian", "Corporate Systems", "Maintain a human-readable current operating state across projects and specialists.", ["Current state", "Open loops", "Status normalization", "Continuity"], "Jiro Ladderbearer", "Current truth must be visible."),
  provisional(18, "Threadbearer", "Conversation Continuity Specialist", "Corporate Systems", "Carry approved decisions, corrections, and unfinished work between bounded workrooms.", ["Thread continuity", "Context packets", "Decision carryover", "Drift prevention"], "Jiro Ladderbearer", "Carry the lesson, not the clutter."),
  provisional(19, "Packetwright", "Work Packet Architect", "Corporate Systems", "Translate intent into bounded packets containing objective, sources, constraints, owner, and review gate.", ["Work packets", "Scope definition", "Input design", "Review criteria"], "Knox", "Good work starts with a complete packet."),
  provisional(20, "Receiptkeeper", "Failure and Completion Receipt Specialist", "Corporate Systems", "Preserve what actually happened instead of trusting success language or memory.", ["Failure receipts", "Completion receipts", "Evidence capture", "False-finish prevention"], "Kaizen", "No fake finish lines."),
  provisional(21, "Andon", "Stop-the-Line Signal Specialist", "Corporate Systems", "Expose blocked states, uncertainty, drift, and risk before they become hidden production damage.", ["Andon signals", "Blocked states", "Escalation", "Operational health"], "ELEVEN", "Visible pain can be routed."),
  provisional(22, "Gatekeeper", "Review Gate Specialist", "Evidence and Legal", "Verify that evidence, authority, risk, and approval conditions are satisfied before consequential action.", ["Review gates", "Authority checks", "Risk review", "Approval state"], "ELEVEN", "Speed does not grant permission."),
  provisional(23, "Truthsmith", "Truth-State Reconciliation Specialist", "Evidence and Legal", "Separate verified fact, observation, inference, unknown, and superseded information.", ["Truth states", "Contradiction handling", "Unknowns", "Reconciliation"], "Crow", "Name what is known and what is not."),
  provisional(24, "Archivefox", "Historical Retrieval Specialist", "Corporate Systems", "Recover relevant historical decisions without allowing stale context to masquerade as current truth.", ["Historical search", "Staleness detection", "Decision recovery", "Archive hygiene"], "Jiro Ladderbearer", "History informs. It does not silently govern."),
  provisional(25, "Signalman", "Operational Signal Router", "Corporate Systems", "Turn failures, approvals, risks, and changes into visible routed events.", ["Signal routing", "Notifications", "Priority", "Event design"], "Knox", "The right signal must reach the right authority."),
  provisional(26, "Queuewright", "Work Queue Architect", "Corporate Systems", "Keep active, blocked, waiting, and completed work visible without collapsing every project into one list.", ["Queues", "Priority", "Work state", "Capacity visibility"], "Knox", "Waiting is a state, not an absence."),
  provisional(27, "Intakesmith", "Structured Intake Specialist", "Intake and Data", "Convert messy requests and source material into validated, editable intake records.", ["Intake", "Validation", "Field design", "Human correction"], "Knox", "Structure begins at the door."),
  provisional(28, "Formwright", "Human-Readable Form Specialist", "Intake and Data", "Design forms that capture enough truth to route work without exhausting the expert.", ["Form design", "Progressive disclosure", "Validation", "Operator experience"], "Intakesmith", "Ask only what changes the work."),
  provisional(29, "Parsewright", "Document Parsing Specialist", "Intake and Data", "Transform incoming documents into structured records while preserving source references and uncertainty.", ["Parsing", "Extraction", "Structured records", "Uncertainty"], "Intakesmith", "Extract without inventing."),
  provisional(30, "Indexsmith", "Search Index Specialist", "Intake and Data", "Build retrievable indexes that preserve links back to the original source.", ["Indexing", "Search", "Metadata", "Source linking"], "Jiro Ladderbearer", "Search the derivative. Verify the original."),
  provisional(31, "Searchlight", "Evidence Search Specialist", "Evidence and Legal", "Locate exact statements, pages, and relevant context inside large records.", ["Evidence search", "Exact statements", "Page references", "Context windows"], "Konran Cartographer", "Find the sentence. Keep the page."),
  provisional(32, "TimelineSmith", "Chronology Construction Specialist", "Evidence and Legal", "Build defensible timelines from source-linked events and known-date boundaries.", ["Chronology", "Event ordering", "Knowledge dates", "Source linkage"], "Konran Cartographer", "Order first. Interpret second."),
  provisional(33, "EvidenceWarden", "Evidence Integrity Specialist", "Evidence and Legal", "Protect originals, derivative records, source pages, and review status.", ["Evidence integrity", "Original preservation", "Derivative review", "Access boundaries"], "ELEVEN", "The original remains the authority."),
  provisional(34, "CitationSmith", "Citation and Attribution Specialist", "Evidence and Legal", "Attach precise citations and attribution to public and internal claims.", ["Citations", "Attribution", "Source precision", "Public claims"], "Shoji", "A useful claim knows where it came from."),
  provisional(35, "OCRacle", "OCR Correction Specialist", "Intake and Data", "Turn imperfect OCR into editable, validated text while preserving human correction telemetry.", ["OCR", "Correction", "Validation", "Reusable error patterns"], "PaperGoblin", "The machine reads. The human confirms."),
  provisional(36, "PaperGoblin", "OCR Intake and Persistence Specialist", "Intake and Data", "Manage document intake, editable correction, validation, persistence, and reusable correction telemetry.", ["OCR intake", "Persistence", "Correction workflows", "Airline-flight prototyping"], "JUMPER", "Ugly input can still become useful structure.", "RECOVERED", "violet"),
  provisional(37, "LenderScout", "Lender Discovery Specialist", "Lending OI", "Collect current lender appetite and identify missing evidence before fit review.", ["Lender discovery", "Appetite research", "Freshness", "Missing information"], "Farewright", "Discover before matching."),
  provisional(38, "AppetiteMapper", "Lender Appetite Mapping Specialist", "Lending OI", "Normalize lender preferences, exclusions, and exceptions into comparable human-readable structures.", ["Appetite mapping", "Normalization", "Exceptions", "Comparison"], "Farewright", "A matrix is not understanding."),
  provisional(39, "LENA", "Lending Evidence Navigation Assistant", "Lending OI", "Guide human-reviewed lender-fit workflows without making lending decisions.", ["Evidence navigation", "Missing fields", "Human review", "Fit explanations"], "Farewright", "Assist the decision. Do not own it.", "RECOVERED", "teal"),
  provisional(40, "Exceptioneer", "Lending Exception Specialist", "Lending OI", "Surface policy exceptions, edge conditions, and questions requiring lender confirmation.", ["Exceptions", "Edge cases", "Escalation", "Policy questions"], "Farewright", "Exceptions are work, not noise."),
  provisional(41, "Dealwright", "Deal Packet Specialist", "Lending OI", "Assemble complete, source-linked deal packets for human and lender review.", ["Deal packets", "Source completeness", "Fit context", "Review readiness"], "Farewright", "The packet should answer before it asks."),
  provisional(42, "PolicyWatch", "Lender Policy Freshness Specialist", "Lending OI", "Track policy changes and prevent stale lender rules from silently controlling current work.", ["Policy monitoring", "Freshness", "Change receipts", "Stale-data detection"], "Farewright", "Current policy needs a current receipt."),
  provisional(43, "RiskLedger", "Lending Risk Documentation Specialist", "Lending OI", "Record visible risk factors, uncertainty, and unresolved questions without making the credit decision.", ["Risk documentation", "Uncertainty", "Open questions", "Human review"], "ELEVEN", "Name the risk. Preserve the authority boundary."),
  provisional(44, "Rulekeeper", "Lending Rule Normalization Specialist", "Lending OI", "Translate lender rules into structured, source-linked logic that remains readable to experts.", ["Rule normalization", "Source links", "Human-readable logic", "Change management"], "Farewright", "Rules should be inspectable."),
  provisional(45, "CutSmith", "Creative Edit Packet Specialist", "ANVIL Production", "Translate creative intent into bounded media-edit packets and versioned review instructions.", ["Edit packets", "Versioning", "Creative intake", "Review gates"], "JUMPER", "Every cut needs intent."),
  provisional(46, "Tracksmith", "Music Arrangement Specialist", "ANVIL Production", "Shape arrangement, pacing, instrumentation, and under-four-minute discipline.", ["Arrangement", "Pacing", "Instrumentation", "Length control"], "Riffsmith", "Every section must earn its seconds."),
  provisional(47, "MixWarden", "Mix Identity Specialist", "ANVIL Production", "Protect mix character, instrument hierarchy, vocal priority, and negative production boundaries.", ["Mix identity", "Vocal priority", "Negative prompts", "Production continuity"], "Crownsmith", "Clarity is not gloss."),
  provisional(48, "LyricForge", "Lyric Architecture Specialist", "ANVIL Production", "Build complete lyric structures that preserve artist worldview, voice, and section function.", ["Lyrics", "Section architecture", "Artist voice", "Narrative pressure"], "JUMPER", "Write for the singer, not the document."),
  provisional(49, "Promptwright", "Generative Production Prompt Specialist", "ANVIL Production", "Create concise, testable prompts that prioritize vocalist identity and prevent known drift.", ["Prompt engineering", "Negative prompts", "Style control", "Test design"], "JUMPER", "The first line should tell the model who is singing."),
  provisional(50, "Rightskeeper", "Creative Rights Boundary Specialist", "ANVIL Production", "Track cover, parody, translation, licensing, and source-authorization boundaries.", ["Rights boundaries", "Covers", "Parody", "Licensing review"], "ELEVEN", "Creative speed does not erase rights."),
  provisional(51, "Stagehand", "Release Operations Specialist", "ANVIL Production", "Carry approved tracks from final package through release metadata and platform readiness.", ["Release operations", "Metadata", "Platform readiness", "Checklist execution"], "JUMPER", "The song is not shipped until the store can find it."),
  provisional(52, "FrameSmith", "Hero Composition Specialist", "Visual Production", "Build strong focal hierarchy, cinematic framing, and premium visual presence.", ["Hero composition", "Focal hierarchy", "Lighting", "Cinematic framing"], "RenderSmith", "One strong frame beats twelve weak panels."),
  provisional(53, "Motionwright", "Cinematic Motion Specialist", "Visual Production", "Translate approved masters into motion concepts without diluting the core visual identity.", ["Motion direction", "Keyframes", "Transitions", "Visual continuity"], "RenderSmith", "Move the master. Do not replace it."),
  provisional(54, "Storyboarder", "Visual Sequence Specialist", "Visual Production", "Convert narrative intent into ordered visual beats and previewable frames.", ["Storyboards", "Narrative beats", "Keyframes", "Shot planning"], "RenderSmith", "Sequence before spectacle."),
  provisional(55, "BrandWarden", "Visual Brand Integrity Specialist", "Visual Production", "Protect NULLWORKS color, typography, monograms, luxury tone, and public-safe identity.", ["Brand integrity", "Typography", "Color systems", "Asset review"], "RenderSmith", "Recognition is accumulated consistency."),
  provisional(56, "Publicist", "Distribution Copy Specialist", "Visual Production", "Package approved work for social, article, caption, alt-text, and follow-up distribution.", ["Social copy", "Alt text", "Captions", "Distribution packages"], "Shoji", "Publish the proof without overselling it."),
  provisional(57, "Scoutwire", "Opportunity Signal Specialist", "OISA Career", "Monitor role and market signals aligned with OISA, AI workforce, and forward-deployed systems work.", ["Opportunity monitoring", "Role signals", "Market fit", "Prioritization"], "Hirewire", "Follow the signal, not the title alone."),
  provisional(58, "CareerCartographer", "Career Positioning Architect", "OISA Career", "Map Mason's operating proof to credible categories, role lanes, and transition paths.", ["Career mapping", "Category design", "Evidence positioning", "Transition strategy"], "Hirewire", "The category must fit the receipts."),
  provisional(59, "InterviewSmith", "Interview Evidence Specialist", "OISA Career", "Convert project history into concise interview stories with decisions, failures, corrections, and outcomes.", ["Interview stories", "Evidence framing", "STAR compression", "Technical translation"], "Hirewire", "Tell the operating story, not the adjective."),
  provisional(60, "PortfolioWright", "Portfolio Proof Specialist", "OISA Career", "Turn live systems, field notes, receipts, and deployments into navigable public proof.", ["Portfolio architecture", "Proof selection", "Public-safe artifacts", "Case studies"], "Shoji", "The portfolio should open the system, not decorate the claim."),
  provisional(61, "OutreachRunner", "Executive Outreach Specialist", "OISA Career", "Prepare concise, relevant outreach grounded in the recipient's actual work and NULLWORKS proof.", ["Executive outreach", "Personalization", "Follow-up", "Relationship pacing"], "Hirewire", "Relevance before volume."),
  provisional(62, "JobHound", "Role Discovery Specialist", "OISA Career", "Find roles where workflow architecture, agent operations, implementation, and human-centered AI overlap.", ["Role discovery", "Search", "Fit screening", "Pipeline tracking"], "Hirewire", "Search for the work, not only the title."),
  provisional(63, "OpsBeacon", "Industrial Operations Signal Specialist", "Corporate Systems", "Translate field conditions, maintenance observations, and operational checks into visible actionable records.", ["Field observations", "Operational checks", "Escalation", "Action records"], "Knox", "Field reality outranks dashboard optimism."),
  provisional(64, "Faultfinder", "Failure Isolation Specialist", "Corporate Systems", "Separate symptoms, probable causes, evidence, tests, and unresolved unknowns.", ["Fault isolation", "Diagnostics", "Test planning", "Unknowns"], "Kaizen", "Do not repair the assumption."),
  provisional(65, "Shopfloor Sage", "Expert Workflow Discovery Specialist", "Corporate Systems", "Sit with the domain expert, map the real work, and expose hidden exceptions before software is built.", ["Workflow discovery", "Expert interviews", "Exception mapping", "Operational reality"], "Knox", "The real process is the one people actually use."),
];

export const employees: Employee[] = [...executives, ...provisionals];

export const departments = Array.from(new Set(employees.map((employee) => employee.department))).sort();

export const getEmployee = (slug: string) => employees.find((employee) => employee.slug === slug);
