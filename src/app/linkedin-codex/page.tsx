"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type Headline = {
  label: string;
  title: string;
  body: string;
  status: string;
};

type Signal = {
  source: string;
  signal: string;
  read: string;
  action: string;
};

type CapturedSignal = Signal & {
  id: string;
  url: string;
  rawText: string;
  score: number;
  capturedAt: string;
};

type MemeTemplate = {
  id: string;
  name: string;
  top: string;
  bottom: string;
  accent: string;
  glow: string;
};

const seedHeadlines: Headline[] = [
  {
    label: "OISA SIGNAL",
    title: "AI hiring says it wants builders. The filters still reject the operator who built the system.",
    body: "The market is looking for traditional AI titles while the highest-leverage work is happening between operations, messy exception paths, human authority, and AI-worker coordination.",
    status: "field note",
  },
  {
    label: "TAC OPS",
    title: "The app is not the point. Redesigning the exception path is the point.",
    body: "Broken label → OCR candidate extraction → human verification → helper label printed → re-enter flow → telemetry restored.",
    status: "receipt",
  },
  {
    label: "CANARY",
    title: "Humans respond to specificity. Bots respond to mentions.",
    body: "LinkedIn becomes a live field lab: tag, observe, classify, score, follow up, and preserve what each interaction proves.",
    status: "active test",
  },
  {
    label: "JOB MARKET",
    title: "The title stack is noisy. Receipts are getting more valuable.",
    body: "What shipped? What broke? What changed? What evidence exists? What outcome did the system actually produce?",
    status: "positioning",
  },
  {
    label: "OI SUITE",
    title: "The product is not the AI. It is the organizational capability created around messy reality.",
    body: "People, AI workers, workflow, evidence, authority, context, exceptions, telemetry, and accountability have to move together.",
    status: "doctrine",
  },
  {
    label: "RECRUITER GAP",
    title: "Show me something you built or changed because of AI.",
    body: "Interviews should move from tool familiarity to proof: systems shipped, workflows compressed, failures observed, and reusable operating logic created.",
    status: "hiring test",
  },
];

const seedSignals: Signal[] = [
  {
    source: "Kyle Spivey",
    signal: "AI Operations Architect / product-builder lane",
    read: "Potential peer/operator. Same messy-ops-to-system instinct; distribution may be the constraint.",
    action: "Review walkthrough, deck, demo, and buyer/distribution path.",
  },
  {
    source: "Alex King",
    signal: "AI-native operator recruiter",
    read: "Confirms companies need people who consolidate fragmented systems, but job-title language is still unstable.",
    action: "Ask which roles actually hire the OISA shape without forcing a software-engineer frame.",
  },
  {
    source: "Imran Afzal",
    signal: "Enterprise Execution Systems overlap",
    read: "Shared understanding upstream matters as much as workflow efficiency upstream.",
    action: "Treat EES as adjacent language; map to OISA without fighting terminology.",
  },
  {
    source: "Ron Higgs",
    signal: "Warning/caution/advisory response paths",
    read: "Operational intelligence is not more signals; it is pre-agreed response logic.",
    action: "Tie EMS/aviation clarity to AI-worker roles, authority, and escalation paths.",
  },
  {
    source: "Ron Wiener",
    signal: "Industrial automation / Siemens angle",
    read: "USPS may not be the first adopter; equipment integrators may understand the label-recovery value faster.",
    action: "Prepare Siemens / automation-integrator version of TAC OPS packet.",
  },
  {
    source: "Nelson Spence",
    signal: "GM metaphor lands",
    read: "AI has too many DPS and not enough raid leaders. OISA = GM for hybrid human/digital worker systems.",
    action: "Use GM framing carefully: funny hook, serious operating-system point.",
  },
];

const roleTargets = [
  "Operational Intelligence Systems Architect",
  "AI Operations Architect",
  "Forward-Deployed AI Systems Builder",
  "Workflow Automation / Exception Path Lead",
  "Customer Engineer — Applied AI Operations",
  "Enterprise Execution Systems Architect",
  "AI Implementation / Human-in-the-loop Systems",
  "Automation Integrator — Human Authority + Telemetry",
];

const canaryQuestions = [
  "Did the person respond to the actual operating idea or only acknowledge the mention?",
  "Did they name a buyer, role, deployment path, or adjacent category?",
  "Did they understand that TAC OPS is an exception-path redesign, not just a label app?",
  "Did they ask for evidence, demo, walkthrough, or metrics?",
  "Did the thread produce a new term, lead, role, company, or proof artifact?",
];

const templates: MemeTemplate[] = [
  {
    id: "tokens",
    name: "Token Beggar",
    top: "Y'ALL GOT ANY MORE",
    bottom: "OF THEM AI TOKENS?",
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.35)",
  },
  {
    id: "receipts",
    name: "Receipts",
    top: "TITLES ARE NOISY",
    bottom: "RECEIPTS ARE LOUDER",
    accent: "#22c55e",
    glow: "rgba(34, 197, 94, 0.35)",
  },
  {
    id: "oisa",
    name: "OISA Gap",
    top: "YOU HIRED MORE DPS",
    bottom: "WHO IS RUNNING THE RAID?",
    accent: "#f97316",
    glow: "rgba(249, 115, 22, 0.35)",
  },
  {
    id: "canary",
    name: "Canary Test",
    top: "THE APP IS NOT THE POINT",
    bottom: "WHERE SHOULD THE EXCEPTION LIVE?",
    accent: "#a3e635",
    glow: "rgba(163, 230, 53, 0.35)",
  },
];

const storageKey = "nullworks.linkedinCodex.capturedSignals.v1";

function scoreSignal(rawText: string) {
  const text = rawText.toLowerCase();
  let score = 30;
  if (text.includes("role") || text.includes("hiring") || text.includes("recruiter")) score += 12;
  if (text.includes("workflow") || text.includes("system") || text.includes("operations")) score += 14;
  if (text.includes("exception") || text.includes("recovery") || text.includes("telemetry")) score += 16;
  if (text.includes("demo") || text.includes("walkthrough") || text.includes("deck")) score += 10;
  if (text.includes("buyer") || text.includes("distribution") || text.includes("sales")) score += 8;
  return Math.min(score, 99);
}

function createRead(rawText: string) {
  const text = rawText.toLowerCase();
  if (text.includes("exception") || text.includes("recovery")) {
    return "They are reacting to the exception-path argument, not just the surface app.";
  }
  if (text.includes("recruiter") || text.includes("hiring") || text.includes("role")) {
    return "The job-market filter gap is visible: the work exists, but the role language is unstable.";
  }
  if (text.includes("demo") || text.includes("walkthrough") || text.includes("deck")) {
    return "This is an operator-to-operator proof request. Preserve the receipt and review the system path.";
  }
  if (text.includes("distribution") || text.includes("sales") || text.includes("buyer")) {
    return "Distribution may be the real bottleneck; map buyer, channel, and adoption friction.";
  }
  return "Human signal captured. Translate the interaction into role language, proof language, and next action.";
}

function createAction(rawText: string) {
  const text = rawText.toLowerCase();
  if (text.includes("demo") || text.includes("walkthrough") || text.includes("deck")) {
    return "Request the demo packet, review where the workflow breaks, and capture the buyer/distribution hypothesis.";
  }
  if (text.includes("recruiter") || text.includes("hiring") || text.includes("role")) {
    return "Ask what roles actually hire this shape and which companies reward proof over title stack.";
  }
  if (text.includes("exception") || text.includes("recovery")) {
    return "Turn this into a field note about exception ownership, authority gates, and telemetry restoration.";
  }
  return "Follow up with one specific question and preserve the answer as a LinkedIn Codex receipt.";
}

function createSignal(rawText: string) {
  const text = rawText.toLowerCase();
  if (text.includes("exception") || text.includes("recovery")) return "Exception-path redesign signal";
  if (text.includes("recruiter") || text.includes("hiring") || text.includes("role")) return "Hiring-language / OISA translation signal";
  if (text.includes("demo") || text.includes("walkthrough") || text.includes("deck")) return "Demo / product-review signal";
  if (text.includes("distribution") || text.includes("sales") || text.includes("buyer")) return "Distribution and buyer-path signal";
  return "Human response signal";
}

function createHeadlineFromSignal(signal: CapturedSignal): Headline {
  const raw = signal.rawText.toLowerCase();
  let title = "LinkedIn produced a human signal. Now turn it into a receipt.";
  let body = signal.read;
  let label = "LIVE CAPTURE";
  let status = `score ${signal.score}`;

  if (raw.includes("exception") || raw.includes("recovery")) {
    label = "EXCEPTION PATH";
    title = "The normal path is easy to diagram. The exception path reveals what the organization understands.";
    body = "Captured signal points back to OISA: authority, evidence, re-entry logic, response ownership, and telemetry need to be designed before failure reaches the downstream pile.";
  } else if (raw.includes("recruiter") || raw.includes("hiring") || raw.includes("role")) {
    label = "HIRING GAP";
    title = "The market wants AI operators, but the filters still look for old title stacks.";
    body = "Use the response as proof that OISA language needs role translation, receipts, and examples of shipped systems instead of generic software labels.";
  } else if (raw.includes("demo") || raw.includes("walkthrough") || raw.includes("deck")) {
    label = "OPERATOR SIGNAL";
    title = "A real human asked to see the system. That is the signal worth preserving.";
    body = "Demo requests, walkthroughs, and deck asks are stronger than empty reactions. They reveal buyer curiosity and peer validation.";
  } else if (raw.includes("distribution") || raw.includes("sales") || raw.includes("buyer")) {
    label = "GO TO MARKET";
    title = "The product may work. The distribution path still has to be designed.";
    body = "Capture who can buy it, who can deploy it, who can approve it, and where the operating pain is already visible.";
  }

  return { label, title, body, status };
}

function getCanvasLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawOutlinedLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) {
  lines.forEach((line, index) => {
    const currentY = y + index * lineHeight;
    ctx.strokeText(line, x, currentY);
    ctx.fillText(line, x, currentY);
  });
}

export default function LinkedInCodexPage() {
  const [capturedSignals, setCapturedSignals] = useState<CapturedSignal[]>([]);
  const [source, setSource] = useState("LinkedIn");
  const [url, setUrl] = useState("");
  const [rawText, setRawText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [topText, setTopText] = useState(templates[0].top);
  const [bottomText, setBottomText] = useState(templates[0].bottom);
  const [smallText, setSmallText] = useState("OISA FIELD LAB // HUMAN SIGNALS > BOT NOISE");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplate) ?? templates[0],
    [selectedTemplate],
  );

  const allSignals = useMemo(() => [...capturedSignals, ...seedSignals], [capturedSignals]);

  const liveHeadlines = useMemo(
    () => [...capturedSignals.map(createHeadlineFromSignal), ...seedHeadlines],
    [capturedSignals],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setCapturedSignals(JSON.parse(saved) as CapturedSignal[]);
    } catch {
      setCapturedSignals([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(capturedSignals));
    } catch {
      // Local storage is optional. The field lab still works without persistence.
    }
  }, [capturedSignals]);

  useEffect(() => {
    drawMeme(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topText, bottomText, smallText, imageDataUrl, activeTemplate.id]);

  function handleTemplateChange(templateId: string) {
    const template = templates.find((item) => item.id === templateId) ?? templates[0];
    setSelectedTemplate(template.id);
    setTopText(template.top);
    setBottomText(template.bottom);
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImageDataUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function captureSignal() {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    const record: CapturedSignal = {
      id: `${Date.now()}`,
      source: source.trim() || "LinkedIn",
      url: url.trim(),
      rawText: trimmed,
      score: scoreSignal(trimmed),
      signal: createSignal(trimmed),
      read: createRead(trimmed),
      action: createAction(trimmed),
      capturedAt: new Date().toISOString(),
    };

    setCapturedSignals((items) => [record, ...items].slice(0, 24));
    setRawText("");
    const headline = createHeadlineFromSignal(record);
    loadHeadlineIntoMeme(headline);
  }

  function clearCapturedSignals() {
    setCapturedSignals([]);
  }

  function loadHeadlineIntoMeme(headline: Headline) {
    const cleanedTitle = headline.title.replace(/[“”]/g, "\"").replace(/[’]/g, "'");
    const words = cleanedTitle.toUpperCase().split(/\s+/).filter(Boolean);
    const top = words.slice(0, 6).join(" ");
    const bottom = words.slice(6, 14).join(" ") || headline.label;

    setTopText(top);
    setBottomText(bottom);
    setSmallText(`${headline.label} // ${headline.body}`.slice(0, 190));

    const templateId = headline.label.includes("HIRING")
      ? "receipts"
      : headline.label.includes("EXCEPTION")
        ? "canary"
        : headline.label.includes("OPERATOR")
          ? "oisa"
          : "tokens";
    setSelectedTemplate(templateId);
  }

  function drawMeme(download: boolean) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1600;
    const height = 900;
    canvas.width = width;
    canvas.height = height;

    const drawBase = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#020617");
      gradient.addColorStop(0.45, "#111827");
      gradient.addColorStop(1, "#020617");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      for (let x = 0; x < width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.fillStyle = activeTemplate.glow;
      ctx.beginPath();
      ctx.arc(width * 0.78, height * 0.48, 310, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.fillRect(0, 0, width, 170);
      ctx.fillRect(0, height - 190, width, 190);

      ctx.strokeStyle = activeTemplate.accent;
      ctx.lineWidth = 8;
      ctx.strokeRect(28, 28, width - 56, height - 56);

      ctx.fillStyle = activeTemplate.accent;
      ctx.font = "900 42px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("NULLWORKS // LINKEDIN CODEX", 54, height - 122);

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "700 30px Arial, sans-serif";
      const smallLines = getCanvasLines(ctx, smallText.toUpperCase(), width - 108).slice(0, 2);
      smallLines.forEach((line, index) => ctx.fillText(line, 54, height - 76 + index * 34));
    };

    const drawText = () => {
      ctx.textAlign = "center";
      ctx.lineJoin = "round";
      ctx.miterLimit = 2;

      ctx.font = "900 86px Impact, Arial Black, sans-serif";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 16;
      ctx.fillStyle = "#ffffff";
      const topLines = getCanvasLines(ctx, topText.toUpperCase(), width - 120).slice(0, 2);
      drawOutlinedLines(ctx, topLines, width / 2, 96, 88);

      ctx.font = "900 80px Impact, Arial Black, sans-serif";
      const bottomLines = getCanvasLines(ctx, bottomText.toUpperCase(), width - 120).slice(0, 2);
      const bottomStart = height - 78 - (bottomLines.length - 1) * 78;
      drawOutlinedLines(ctx, bottomLines, width / 2, bottomStart, 78);

      ctx.textAlign = "left";
    };

    const finish = () => {
      drawText();
      if (!download) return;
      const link = document.createElement("a");
      link.download = `linkedin-codex-${activeTemplate.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    drawBase();

    if (imageDataUrl) {
      const img = new Image();
      img.onload = () => {
        const imageRatio = img.width / img.height;
        const boxRatio = width / height;
        let drawWidth = width;
        let drawHeight = height;
        let dx = 0;
        let dy = 0;

        if (imageRatio > boxRatio) {
          drawHeight = height;
          drawWidth = height * imageRatio;
          dx = (width - drawWidth) / 2;
        } else {
          drawWidth = width;
          drawHeight = width / imageRatio;
          dy = (height - drawHeight) / 2;
        }

        ctx.globalAlpha = 0.78;
        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
        ctx.globalAlpha = 1;

        const overlay = ctx.createLinearGradient(0, 0, 0, height);
        overlay.addColorStop(0, "rgba(0,0,0,0.82)");
        overlay.addColorStop(0.25, "rgba(0,0,0,0.24)");
        overlay.addColorStop(0.7, "rgba(0,0,0,0.24)");
        overlay.addColorStop(1, "rgba(0,0,0,0.86)");
        ctx.fillStyle = overlay;
        ctx.fillRect(0, 0, width, height);
        drawBase();
        finish();
      };
      img.src = imageDataUrl;
    } else {
      finish();
    }
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>NULLWORKS // LINKEDIN CODEX</p>
          <h1>Human signal, bot noise, saved receipts.</h1>
          <p>
            A Drudge-style field board for turning LinkedIn replies, recruiter signals,
            TAC OPS reactions, and OISA role-language tests into headlines, canary reads,
            and shareable meme artifacts.
          </p>
          <div className={styles.heroActions}>
            <a href="#capture">Capture a signal</a>
            <a href="#headlines">Use headlines</a>
            <a href="#meme">Generate meme</a>
          </div>
        </div>
        <aside className={styles.statusCard}>
          <div>
            <span>MODE</span>
            <strong>Operator capture</strong>
          </div>
          <p>
            This does not run a blind LinkedIn scraper. Paste public thread text, screenshots notes,
            URLs, or recruiter messages you are allowed to use. The Codex converts that field input
            into local receipts, headlines, and meme captions.
          </p>
        </aside>
      </section>

      <section id="capture" className={styles.importDock}>
        <div className={styles.boardHeader}>
          <div>
            <p>LINKEDIN CAPTURE DOCK</p>
            <h2>Paste the field signal. Codex turns it into headlines.</h2>
          </div>
          <button className={styles.secondaryButton} type="button" onClick={clearCapturedSignals}>
            Clear local captures
          </button>
        </div>
        <div className={styles.intakeGrid}>
          <div className={styles.fieldGroup}>
            <label>
              Source / person / thread
              <input value={source} onChange={(event) => setSource(event.target.value)} />
            </label>
            <label>
              LinkedIn URL or receipt link
              <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Optional" />
            </label>
            <label>
              Paste comment, DM, recruiter reply, post text, or screenshot notes
              <textarea
                value={rawText}
                onChange={(event) => setRawText(event.target.value)}
                placeholder="Example: Alex said companies need someone who can take messy fragmented systems and consolidate / iterate / automate..."
                rows={8}
              />
            </label>
            <div className={styles.memeButtons}>
              <button type="button" onClick={captureSignal}>Capture + generate headline</button>
              <button type="button" onClick={() => setRawText("")}>Reset input</button>
            </div>
          </div>
          <div className={styles.receiptStack}>
            <p className={styles.sectionKicker}>LOCAL RECEIPTS</p>
            {capturedSignals.length === 0 ? (
              <div className={styles.emptyState}>No captured LinkedIn signals yet. Paste one and hit capture.</div>
            ) : (
              capturedSignals.slice(0, 5).map((signal) => (
                <article key={signal.id} className={styles.receiptCard}>
                  <div className={styles.cardMeta}>
                    <span>{signal.source}</span>
                    <em>{signal.score}/99</em>
                  </div>
                  <h3>{signal.signal}</h3>
                  <p>{signal.read}</p>
                  <button type="button" onClick={() => loadHeadlineIntoMeme(createHeadlineFromSignal(signal))}>
                    Send headline to meme generator
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="headlines" className={styles.board}>
        <div className={styles.boardHeader}>
          <div>
            <p>HEADLINE WALL</p>
            <h2>Drudge board for OISA field signals</h2>
          </div>
          <span>{capturedSignals.length} live captures</span>
        </div>
        <div className={styles.headlineGrid}>
          {liveHeadlines.map((headline, index) => (
            <article key={`${headline.title}-${index}`} className={index === 0 ? styles.leadHeadline : styles.headlineCard}>
              <div className={styles.cardMeta}>
                <span>{headline.label}</span>
                <em>{headline.status}</em>
              </div>
              <h3>{headline.title}</h3>
              <p>{headline.body}</p>
              <button className={styles.headlineButton} type="button" onClick={() => loadHeadlineIntoMeme(headline)}>
                Use for meme
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.panel}>
          <p className={styles.sectionKicker}>CANARY PROTOCOL</p>
          <h2>Separate real humans from empty engagement</h2>
          <div className={styles.checkList}>
            {canaryQuestions.map((question) => (
              <div key={question}>
                <span>✓</span>
                <p>{question}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <p className={styles.sectionKicker}>ROLE TRANSLATION</p>
          <h2>Titles to test against the market</h2>
          <div className={styles.roleCloud}>
            {roleTargets.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.signalLedger}>
        <div className={styles.boardHeader}>
          <div>
            <p>SIGNAL LEDGER</p>
            <h2>Who reacted, what it means, what to do next</h2>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Signal</th>
                <th>OISA read</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {allSignals.map((signal) => (
                <tr key={`${signal.source}-${signal.signal}`}>
                  <td>{signal.source}</td>
                  <td>{signal.signal}</td>
                  <td>{signal.read}</td>
                  <td>{signal.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="meme" className={styles.memeLab}>
        <div className={styles.memeControls}>
          <p className={styles.sectionKicker}>BUILT-IN MEME GENERATOR</p>
          <h2>Headlines become shareable</h2>
          <p>
            Capture a LinkedIn signal, click “Use for meme,” upload a screenshot if useful,
            then export the PNG. Fast field-to-artifact loop.
          </p>

          <label>
            Template
            <select value={selectedTemplate} onChange={(event) => handleTemplateChange(event.target.value)}>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Top headline
            <input value={topText} onChange={(event) => setTopText(event.target.value)} />
          </label>

          <label>
            Bottom headline
            <input value={bottomText} onChange={(event) => setBottomText(event.target.value)} />
          </label>

          <label>
            Small receipt line
            <textarea value={smallText} onChange={(event) => setSmallText(event.target.value)} rows={3} />
          </label>

          <label className={styles.fileInput}>
            Upload screenshot / image
            <input accept="image/*" type="file" onChange={handleImageUpload} />
          </label>

          <div className={styles.memeButtons}>
            <button type="button" onClick={() => drawMeme(true)}>Export PNG</button>
            <button type="button" onClick={() => setImageDataUrl(null)}>Clear image</button>
          </div>
        </div>
        <div className={styles.canvasWrap}>
          <canvas ref={canvasRef} aria-label="LinkedIn Codex meme canvas" />
        </div>
      </section>

      <section className={styles.footerBand}>
        <p>
          Do not just scroll the feed. Turn every useful human response into a receipt,
          a headline, a role test, and a next action.
        </p>
      </section>
    </main>
  );
}
