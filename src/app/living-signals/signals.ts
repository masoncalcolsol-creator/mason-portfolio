export type LivingSignalMode =
  | "sonar"
  | "fault"
  | "receipts"
  | "conveyor"
  | "memory"
  | "orbit"
  | "audio";

export type LivingSignalConfig = {
  slug: string;
  mode: LivingSignalMode;
  name: string;
  eyebrow: string;
  headline: string;
  outlinedHeadline: string;
  summary: string;
  accent: string;
  accentRgb: string;
  secondary: string;
  signalLanguage: string;
  communicates: string[];
  bestFor: string[];
  rules: string[];
  demoNote: string;
};

export const livingSignals: LivingSignalConfig[] = [
  {
    slug: "sonar-fish",
    mode: "sonar",
    name: "Sonar Fish",
    eyebrow: "LIVING SIGNAL 01 // SEARCHING BELOW THE SURFACE",
    headline: "The system is quiet.",
    outlinedHeadline: "Until something moves beneath it.",
    summary:
      "A grayscale sonar field with a pale scanner, expanding pings, and rare digital fish events. Most passes reveal only water and noise. Occasionally a silhouette crosses the beam. Rarer still, the scan catches a skeletal receipt hiding inside the shape.",
    accent: "#d6dde2",
    accentRgb: "214,221,226",
    secondary: "#77838d",
    signalLanguage: "Discovery, buried knowledge, uncertainty, depth, and patient observation.",
    communicates: [
      "Useful evidence may exist before the system knows how to name it.",
      "Scarcity is signal: most scans should not manufacture a discovery.",
      "The reveal belongs to the scanner, not a permanently exposed decoration.",
      "Rare events feel earned when the background remains mostly calm.",
    ],
    bestFor: [
      "KIKIGAKI and wisdom-mining work",
      "Research, discovery, and archive interfaces",
      "Marine, fishing, environmental, or exploration concepts",
      "Hidden-pattern and anomaly-detection stories",
    ],
    rules: [
      "First fish appears quickly for the demo; production timing can be widened to 45–120 seconds.",
      "Skeleton reveal remains uncommon and never becomes the default animation.",
      "The scanner reveals the target; targets do not glow continuously.",
      "No implication of real sonar data unless a live data source is connected.",
    ],
    demoNote: "Wait a few seconds. A fish should cross the field; some passes carry a skeletal surprise.",
  },
  {
    slug: "industrial-fault-scan",
    mode: "fault",
    name: "Industrial Fault Scanner",
    eyebrow: "LIVING SIGNAL 02 // MACHINE TRUTH UNDER LOAD",
    headline: "The machine looks normal.",
    outlinedHeadline: "The scan catches what the dashboard missed.",
    summary:
      "A subdued machine blueprint lives behind the page while a technical scanner exposes heat, vibration, a hairline crack, or a misaligned sensor only as the beam passes. The effect turns hidden failure into a moment of operational discovery.",
    accent: "#ff9b42",
    accentRgb: "255,155,66",
    secondary: "#866446",
    signalLanguage: "Maintenance, root cause, hidden failure, heat, vibration, and expert inspection.",
    communicates: [
      "Normal-looking equipment can contain a developing failure.",
      "The important event is not the alert alone, but where it intersects the physical system.",
      "Inspection reveals evidence; it does not invent certainty.",
      "A fault can be localized without turning the entire page into an alarm state.",
    ],
    bestFor: [
      "Operational Intelligence and maintenance case studies",
      "The Lost Why and silent-workaround records",
      "Industrial product, reliability, and field-service pages",
      "Root-cause and failure-receipt storytelling",
    ],
    rules: [
      "Fault regions appear only while the scan crosses them.",
      "Heat, crack, vibration, and alignment are visual metaphors unless backed by telemetry.",
      "Foreground content remains readable and operationally calm.",
      "Alerts should indicate location and state, not generic danger everywhere.",
    ],
    demoNote: "Watch the scanner cross the machine field. Different fault signatures surface briefly.",
  },
  {
    slug: "receipt-packets",
    mode: "receipts",
    name: "Receipt Packet Flow",
    eyebrow: "LIVING SIGNAL 03 // EVIDENCE MOVING THROUGH AUTHORITY",
    headline: "Work is not complete",
    outlinedHeadline: "until the evidence survives the trip.",
    summary:
      "Small evidence packets move through a faint governed network. Some arrive, some wait, one expires, one turns red, and a human approval gate releases the final action. The page makes invisible handoffs, queues, and authority boundaries visible without pretending that every packet succeeds.",
    accent: "#67d7ff",
    accentRgb: "103,215,255",
    secondary: "#486d7b",
    signalLanguage: "Evidence lineage, queues, handoffs, approvals, expiration, and failure receipts.",
    communicates: [
      "A recommendation is not the same thing as an authorized action.",
      "Waiting, expiration, rejection, and escalation are valid workflow states.",
      "Evidence should remain traceable as it crosses tools and roles.",
      "A failed packet is more useful than a fake finish line.",
    ],
    bestFor: [
      "Governance, workflow, and agent-orchestration pages",
      "Receipt Wallet and evidence-chain demonstrations",
      "Compliance, legal, lending, and document workflows",
      "Human approval and controlled-autonomy stories",
    ],
    rules: [
      "No packet ships through the final gate without an explicit approval state.",
      "Failed, stalled, and expired packets remain visible as telemetry.",
      "Movement should show lineage, not decorative particle noise.",
      "Real client evidence must never be exposed in a public sample.",
    ],
    demoNote: "Follow the packets. At least one will stall or fail before the gate releases another.",
  },
  {
    slug: "conveyor-telemetry",
    mode: "conveyor",
    name: "Conveyor Telemetry",
    eyebrow: "LIVING SIGNAL 04 // PHYSICAL FLOW WITH RECOVERY",
    headline: "Most items keep moving.",
    outlinedHeadline: "The system earns trust at the exception.",
    summary:
      "Ghost parcels move through a simplified conveyor path. Most pass quietly. Occasionally one diverts, bunches, jams, or receives a recovery marker before rejoining the stream. It is a physical-workflow signal system, not a generic logistics animation.",
    accent: "#ffd84d",
    accentRgb: "255,216,77",
    secondary: "#827442",
    signalLanguage: "Flow, throughput, exceptions, rehandling, recovery, and physical truth.",
    communicates: [
      "Healthy operations are mostly boring movement.",
      "Exceptions deserve more visual attention than normal throughput.",
      "Recovery is part of the workflow, not an embarrassing side channel.",
      "The employee closest to the work remains the physical source of truth.",
    ],
    bestFor: [
      "TAC OPS and parcel-recovery concepts",
      "Warehouse, logistics, and manufacturing pages",
      "Queue, routing, and exception-handling demonstrations",
      "Operational telemetry and workflow-compression stories",
    ],
    rules: [
      "Normal flow dominates; exceptions remain occasional.",
      "A jam is shown with a recovery path, not only a red alarm.",
      "The visual does not claim real throughput or machine status.",
      "Human intervention remains explicit at ambiguous exceptions.",
    ],
    demoNote: "Watch several parcels pass. One will eventually divert or pause, then receive a recovery path.",
  },
  {
    slug: "memory-ghosts",
    mode: "memory",
    name: "Memory Ghosts",
    eyebrow: "LIVING SIGNAL 05 // PRESERVE THE WHY",
    headline: "A procedure records the action.",
    outlinedHeadline: "A memory carries the reason.",
    summary:
      "Faint handwritten notes, tool outlines, and human traces emerge only under a soft scanner. As the beam passes, fragments translate into structured nodes without erasing the original marks. The visual language is continuity, not extraction.",
    accent: "#d8c3ff",
    accentRgb: "216,195,255",
    secondary: "#746782",
    signalLanguage: "Tacit knowledge, memory, handwriting, source preservation, and respectful translation.",
    communicates: [
      "The source should remain visible beside the structured record.",
      "Translation is useful only if it does not flatten the person who earned the knowledge.",
      "A remembered reason can outlive the original procedure.",
      "The scanner observes before the system explains.",
    ],
    bestFor: [
      "KIKIGAKI, Mr. Sloth, and wisdom-mining pages",
      "Education, oral history, and apprenticeship systems",
      "Field notes, maintenance memory, and knowledge transfer",
      "Human-centered archive and continuity projects",
    ],
    rules: [
      "Original marks remain present after structure appears.",
      "No invented quotation, handwriting, or source claim is presented as real.",
      "The visual should feel reverent, not haunted-house theatrical.",
      "Human context remains primary; structured nodes are secondary.",
    ],
    demoNote: "Let the scanner pass over the page. Notes and tools should briefly resolve into structured memory nodes.",
  },
  {
    slug: "operator-orbit",
    mode: "orbit",
    name: "Operator Orbit",
    eyebrow: "LIVING SIGNAL 06 // THE COMPANY MOVES AROUND THE HUMAN",
    headline: "The operator stays central.",
    outlinedHeadline: "The digital organization moves around them.",
    summary:
      "Specialized worker nodes orbit a central human authority. Signals pass between roles, some wait at boundaries, and one occasionally escalates inward for judgment. The motion makes an organizational chart behave like an operating system rather than a static hierarchy.",
    accent: "#63f5c7",
    accentRgb: "99,245,199",
    secondary: "#47766a",
    signalLanguage: "Human authority, specialized workers, coordination, escalation, and organizational continuity.",
    communicates: [
      "The human operator is not another node in the machine.",
      "Different workers can move in parallel while authority remains bounded.",
      "Escalation is a designed path, not an admission of failure.",
      "Organizational memory prevents every interaction from restarting at zero.",
    ],
    bestFor: [
      "NULLWORKS company-structure and OISA pages",
      "Agent teams, digital workforce, and boardroom systems",
      "Human-in-the-loop operating models",
      "Authority and escalation architecture",
    ],
    rules: [
      "The operator remains visually stable while worker motion occurs around them.",
      "No node implies independent authority beyond its defined lane.",
      "Signals may wait, fail, or escalate rather than always completing.",
      "The animation represents architecture, not consciousness or headcount claims.",
    ],
    demoNote: "Watch the orbiting roles. A signal should eventually break pattern and escalate to the center.",
  },
  {
    slug: "audio-particles",
    mode: "audio",
    name: "Audio Particle Assembly",
    eyebrow: "LIVING SIGNAL 07 // FROM POSSIBILITY TO APPROVED SOUND",
    headline: "Noise becomes direction.",
    outlinedHeadline: "Approval turns it into an asset.",
    summary:
      "Loose frequency particles drift through the field, gather into competing waveforms, and stabilize only after passing an approval gate. The effect separates rapid musical possibility from the governed decision that makes a reusable sound identity.",
    accent: "#ff70d2",
    accentRgb: "255,112,210",
    secondary: "#8a4d78",
    signalLanguage: "Music generation, comparison, selection, approval, and stable creative identity.",
    communicates: [
      "Fast generation creates options; it does not define the artist.",
      "Competing directions should remain distinguishable before selection.",
      "A stable waveform represents an approved lane, not merely the latest output.",
      "The human decision closes the loop between possibility and release.",
    ],
    bestFor: [
      "ANVIL custom music and education pages",
      "Athlete, brand, and creator sound-identity systems",
      "Genre comparison and rapid pre-production demos",
      "Audio tools, music libraries, and release workflows",
    ],
    rules: [
      "Particles should organize around an explicit gate rather than magically resolving.",
      "The page never exposes private prompts or production recipes.",
      "Approved sound remains distinct from rejected or experimental directions.",
      "Motion supports the musical concept without becoming a nightclub visualizer.",
    ],
    demoNote: "Watch the loose particles gather, compare, and settle into one approved signal lane.",
  },
];

export const livingSignalBySlug = Object.fromEntries(
  livingSignals.map((signal) => [signal.slug, signal]),
) as Record<string, LivingSignalConfig>;
