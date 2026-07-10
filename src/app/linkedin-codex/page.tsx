"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type MemeTemplate = {
  id: string;
  name: string;
  top: string;
  bottom: string;
  accent: string;
  glow: string;
};

const headlines: Headline[] = [
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

const signals: Signal[] = [
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

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }

    if (index === words.length - 1 && line) {
      ctx.fillText(line, x, currentY);
    }
  });
}

export default function LinkedInCodexPage() {
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

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
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
      ctx.fillRect(0, 0, width, 150);
      ctx.fillRect(0, height - 170, width, 170);

      ctx.strokeStyle = activeTemplate.accent;
      ctx.lineWidth = 8;
      ctx.strokeRect(28, 28, width - 56, height - 56);

      ctx.fillStyle = activeTemplate.accent;
      ctx.font = "900 42px Arial, sans-serif";
      ctx.fillText("NULLWORKS // LINKEDIN CODEX", 54, height - 102);

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "700 30px Arial, sans-serif";
      wrapText(ctx, smallText.toUpperCase(), 54, height - 58, width - 108, 34);
    };

    const drawText = () => {
      ctx.textAlign = "center";
      ctx.lineJoin = "round";
      ctx.miterLimit = 2;

      ctx.font = "900 92px Impact, Arial Black, sans-serif";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 16;
      ctx.fillStyle = "#ffffff";
      wrapText(ctx, topText.toUpperCase(), width / 2, 100, width - 120, 98);
      ctx.strokeText(topText.toUpperCase(), width / 2, 100);
      ctx.fillText(topText.toUpperCase(), width / 2, 100);

      ctx.font = "900 88px Impact, Arial Black, sans-serif";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 16;
      ctx.fillStyle = "#ffffff";
      ctx.strokeText(bottomText.toUpperCase(), width / 2, height - 62);
      ctx.fillText(bottomText.toUpperCase(), width / 2, height - 62);

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
        overlay.addColorStop(0.24, "rgba(0,0,0,0.25)");
        overlay.addColorStop(0.7, "rgba(0,0,0,0.25)");
        overlay.addColorStop(1, "rgba(0,0,0,0.86)");
        ctx.fillStyle = overlay;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = activeTemplate.accent;
        ctx.lineWidth = 8;
        ctx.strokeRect(28, 28, width - 56, height - 56);
        finish();
      };
      img.src = imageDataUrl;
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(140, 220, 1320, 410);
      ctx.strokeStyle = activeTemplate.accent;
      ctx.lineWidth = 6;
      ctx.strokeRect(140, 220, 1320, 410);

      ctx.fillStyle = activeTemplate.accent;
      ctx.font = "900 72px Arial Black, Arial, sans-serif";
      ctx.fillText("AI", 210, 360);
      ctx.fillText("OPS", 210, 454);
      ctx.fillText("RECEIPTS", 210, 548);

      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.font = "700 38px Arial, sans-serif";
      wrapText(
        ctx,
        "UPLOAD A SCREENSHOT, POST RECEIPT, PRODUCT CAPTURE, OR FIELD NOTE TO TURN IT INTO A LINKEDIN-READY MEME CARD.",
        620,
        335,
        720,
        46,
      );
      finish();
    }
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>NULLWORKS // OISA FIELD LAB</p>
          <h1>LinkedIn Codex</h1>
          <p>
            A Drudge-style signal wall for proving what the hiring market misses: receipts,
            exception-path thinking, human canaries, recruiter gaps, and OISA-shaped demand.
          </p>
          <div className={styles.heroActions}>
            <a href="#headlines">Read the board</a>
            <a href="#meme">Build a meme</a>
            <a href="/oisa">OISA landing page</a>
          </div>
        </div>
        <div className={styles.statusCard}>
          <span>FIELD STATUS</span>
          <strong>LIVE LAB</strong>
          <p>LinkedIn is being used as telemetry, not ego. Post, tag, observe, classify, follow up, preserve receipts.</p>
        </div>
      </section>

      <section id="headlines" className={styles.board} aria-label="LinkedIn Codex headline board">
        <div className={styles.boardHeader}>
          <p>THE HEADLINE WALL</p>
          <h2>Human signals from the job-market machine</h2>
        </div>
        <div className={styles.headlineGrid}>
          {headlines.map((headline, index) => (
            <article className={index === 0 ? styles.leadHeadline : styles.headlineCard} key={headline.title}>
              <div className={styles.cardMeta}>
                <span>{headline.label}</span>
                <em>{headline.status}</em>
              </div>
              <h3>{headline.title}</h3>
              <p>{headline.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.panel}>
          <p className={styles.sectionKicker}>CANARY PROTOCOL</p>
          <h2>Do the humans understand the signal?</h2>
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
          <p>SIGNAL LEDGER</p>
          <h2>Who reacted, what it means, what to do next</h2>
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
              {signals.map((signal) => (
                <tr key={signal.source}>
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
          <h2>Make the receipt shareable</h2>
          <p>
            Upload a screenshot or field image, pick a Codex template, rewrite the caption,
            and export a LinkedIn-ready PNG.
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
            <button type="button" onClick={() => drawMeme(true)}>
              Export PNG
            </button>
            <button type="button" onClick={() => setImageDataUrl(null)}>
              Clear image
            </button>
          </div>
        </div>
        <div className={styles.canvasWrap}>
          <canvas ref={canvasRef} aria-label="Generated LinkedIn Codex meme preview" />
        </div>
      </section>

      <section className={styles.footerBand}>
        <p>LINKEDIN IS THE LAB. RECEIPTS ARE THE SPECIMENS. OISA IS THE ROLE THE MARKET HAS NOT NAMED CLEANLY YET.</p>
      </section>
    </main>
  );
}
