"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SpeakerId = "mason" | "founder" | "neuraxis";
type SegmentKind = "question" | "answer" | "decision" | "note";
type ViewMode = "timeline" | "quotes" | "artifact" | "report";

type Segment = {
  id: string;
  speaker: SpeakerId;
  text: string;
  elapsedSeconds: number;
  createdAt: string;
  kind: SegmentKind;
  finalized: boolean;
  source: "typed" | "voice" | "demo";
};

type SpeechAlternativeLike = {
  transcript: string;
};

type SpeechResultLike = {
  0: SpeechAlternativeLike;
  isFinal: boolean;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechResultLike>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const STORAGE_KEY = "nullworks-oi-conversation-canvas-v1";

const SPEAKERS: Record<SpeakerId, { name: string; role: string; color: string }> = {
  mason: { name: "Mason", role: "NULLWORKS", color: "#f0c86f" },
  founder: { name: "Founder", role: "Guest operator", color: "#82c7d5" },
  neuraxis: { name: "NEURAXIS", role: "OI command layer", color: "#9bd59f" },
};

const DEMO_SEGMENTS: Segment[] = [
  {
    id: "demo-1",
    speaker: "mason",
    text: "What is the biggest delay in your brokerage today?",
    elapsedSeconds: 14,
    createdAt: new Date().toISOString(),
    kind: "question",
    finalized: true,
    source: "demo",
  },
  {
    id: "demo-2",
    speaker: "founder",
    text: "Nobody knows where the deal is once documents start coming in. We chase attachments across email and text messages.",
    elapsedSeconds: 22,
    createdAt: new Date().toISOString(),
    kind: "answer",
    finalized: true,
    source: "demo",
  },
  {
    id: "demo-3",
    speaker: "neuraxis",
    text: "I heard three workflow failures: document chasing, status ambiguity, and no shared deal timeline. I am opening a prototype section for each one.",
    elapsedSeconds: 39,
    createdAt: new Date().toISOString(),
    kind: "note",
    finalized: true,
    source: "demo",
  },
  {
    id: "demo-4",
    speaker: "founder",
    text: "The dashboard also needs to show whether underwriting has actually reviewed the file.",
    elapsedSeconds: 57,
    createdAt: new Date().toISOString(),
    kind: "decision",
    finalized: true,
    source: "demo",
  },
  {
    id: "demo-5",
    speaker: "mason",
    text: "Would a single deal page with a live status rail and missing-document list solve the first test case?",
    elapsedSeconds: 76,
    createdAt: new Date().toISOString(),
    kind: "question",
    finalized: true,
    source: "demo",
  },
  {
    id: "demo-6",
    speaker: "founder",
    text: "Yes. Let me click through it while we are still on the call, and I can tell you what the broker would need next.",
    elapsedSeconds: 85,
    createdAt: new Date().toISOString(),
    kind: "answer",
    finalized: true,
    source: "demo",
  },
];

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "and",
  "are",
  "because",
  "been",
  "being",
  "but",
  "can",
  "could",
  "from",
  "have",
  "into",
  "just",
  "like",
  "need",
  "needs",
  "that",
  "the",
  "their",
  "there",
  "they",
  "this",
  "through",
  "what",
  "when",
  "where",
  "while",
  "with",
  "would",
  "your",
]);

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatElapsed(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (safeSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function inferKind(text: string): SegmentKind {
  const normalized = text.trim().toLowerCase();
  if (normalized.endsWith("?") || /^(who|what|when|where|why|how|would|could|can|do|does|is|are)\b/.test(normalized)) {
    return "question";
  }
  if (/\b(decide|decision|approved|approve|lock|locked|must|will|ship|commit)\b/.test(normalized)) {
    return "decision";
  }
  return "answer";
}

function buildMarkdown(title: string, segments: Segment[]) {
  const lines = [
    `# ${title}`,
    "",
    `Exported: ${new Date().toLocaleString()}`,
    "",
    "## Conversation timeline",
    "",
  ];

  for (const segment of segments) {
    const speaker = SPEAKERS[segment.speaker];
    lines.push(`### ${formatElapsed(segment.elapsedSeconds)} — ${speaker.name} — ${segment.kind}`);
    lines.push("");
    lines.push(segment.text);
    lines.push("");
  }

  return lines.join("\n");
}

function getThemes(segments: Segment[]) {
  const frequency = new Map<string, number>();

  for (const segment of segments) {
    const words = segment.text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 4 && !STOP_WORDS.has(word));

    for (const word of words) {
      frequency.set(word, (frequency.get(word) ?? 0) + 1);
    }
  }

  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => ({ word, count }));
}

export default function CanvasClient() {
  const [title, setTitle] = useState("Founder Discovery Session");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<SpeakerId>("mason");
  const [draft, setDraft] = useState("");
  const [selectedKind, setSelectedKind] = useState<SegmentKind>("question");
  const [view, setView] = useState<ViewMode>("timeline");
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [listening, setListening] = useState(false);
  const [provisional, setProvisional] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [notice, setNotice] = useState("Local beta ready. No audio is uploaded by this prototype.");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { title?: string; segments?: Segment[]; startedAt?: number };
        if (parsed.title) setTitle(parsed.title);
        if (parsed.segments) setSegments(parsed.segments);
        if (parsed.startedAt) setStartedAt(parsed.startedAt);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    const speechWindow = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    setSpeechSupported(Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, segments, startedAt }));
  }, [title, segments, startedAt]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const exchanges = useMemo(() => {
    const groups: Array<{ id: string; label: string; time: number; segments: Segment[] }> = [];
    let current: { id: string; label: string; time: number; segments: Segment[] } | null = null;

    for (const segment of segments) {
      if (segment.kind === "question" || !current) {
        current = {
          id: segment.id,
          label: segment.kind === "question" ? segment.text : "Opening context",
          time: segment.elapsedSeconds,
          segments: [segment],
        };
        groups.push(current);
      } else {
        current.segments.push(segment);
      }
    }

    return groups;
  }, [segments]);

  const themes = useMemo(() => getThemes(segments), [segments]);
  const quoteSegments = useMemo(
    () => segments.filter((segment) => segment.kind === "answer" || segment.kind === "decision"),
    [segments],
  );

  function addSegment(text: string, source: Segment["source"] = "typed", forcedKind?: SegmentKind) {
    const clean = text.trim();
    if (!clean) return;

    const segment: Segment = {
      id: makeId(),
      speaker: activeSpeaker,
      text: clean,
      elapsedSeconds: Math.max(elapsed, 0),
      createdAt: new Date().toISOString(),
      kind: forcedKind ?? selectedKind ?? inferKind(clean),
      finalized: true,
      source,
    };

    setSegments((current) => [...current, segment]);
    setDraft("");
    setProvisional("");
    setSelectedExchange(segment.kind === "question" ? segment.id : selectedExchange);
    setNotice(`${SPEAKERS[activeSpeaker].name} block added at ${formatElapsed(segment.elapsedSeconds)}.`);
  }

  function submitDraft() {
    addSegment(draft, "typed", selectedKind);
  }

  function startListening() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      setNotice("Voice capture stopped.");
      return;
    }

    const speechWindow = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Constructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!Constructor) {
      setNotice("Browser speech recognition is unavailable. Use the typed capture box instead.");
      return;
    }

    const recognition = new Constructor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      let interim = "";
      const finalParts: string[] = [];

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) finalParts.push(transcript);
        else interim += transcript;
      }

      if (interim) setProvisional(interim.trim());
      if (finalParts.length > 0) {
        addSegment(finalParts.join(" "), "voice", inferKind(finalParts.join(" ")));
      }
    };
    recognition.onerror = (event) => {
      setNotice(`Voice capture error: ${event.error}. Typed capture remains available.`);
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
      setProvisional("");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setNotice(`Listening as ${SPEAKERS[activeSpeaker].name}. Change speaker before the next turn.`);
  }

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(`${label} copied.`);
    } catch {
      setNotice("Clipboard permission was blocked by the browser.");
    }
  }

  function loadDemo() {
    setSegments(DEMO_SEGMENTS.map((segment) => ({ ...segment, createdAt: new Date().toISOString() })));
    setStartedAt(Date.now() - 95_000);
    setSelectedExchange("demo-1");
    setView("timeline");
    setNotice("Guided founder-discovery demo loaded.");
  }

  function resetSession() {
    if (!window.confirm("Clear the local beta session and start fresh?")) return;
    setSegments([]);
    setStartedAt(Date.now());
    setElapsed(0);
    setSelectedExchange(null);
    setProvisional("");
    setNotice("Fresh local session created.");
  }

  function exportMarkdown() {
    const markdown = buildMarkdown(title, segments);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "conversation"}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Markdown session export created.");
  }

  return (
    <main className="cc-shell">
      <header className="cc-topbar">
        <div>
          <p className="cc-kicker">NULLWORKS // OI AUDIO // BETA 0.1</p>
          <h1>OI Conversation Canvas</h1>
          <p className="cc-subtitle">The conversation becomes the interface, evidence record, and first version of the product.</p>
        </div>
        <div className="cc-session-health" aria-label="Session status">
          <span className="cc-live-dot" />
          <div>
            <strong>LOCAL BETA</strong>
            <span>{formatElapsed(elapsed)} elapsed</span>
          </div>
        </div>
      </header>

      <section className="cc-command-strip">
        <label className="cc-title-field">
          <span>SESSION</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Session title" />
        </label>
        <div className="cc-command-actions">
          <button type="button" className="cc-button cc-button-secondary" onClick={loadDemo}>Load guided demo</button>
          <button type="button" className="cc-button cc-button-secondary" onClick={exportMarkdown} disabled={segments.length === 0}>Export Markdown</button>
          <button type="button" className="cc-button cc-button-danger" onClick={resetSession}>New session</button>
        </div>
      </section>

      <div className="cc-workspace">
        <aside className="cc-left-rail">
          <section className="cc-panel">
            <div className="cc-panel-heading">
              <span>01</span>
              <div>
                <h2>Capture a turn</h2>
                <p>Assign the speaker before each voice or text block.</p>
              </div>
            </div>

            <div className="cc-speaker-grid">
              {(Object.keys(SPEAKERS) as SpeakerId[]).map((speakerId) => {
                const speaker = SPEAKERS[speakerId];
                return (
                  <button
                    key={speakerId}
                    type="button"
                    className={`cc-speaker ${activeSpeaker === speakerId ? "is-active" : ""}`}
                    style={{ "--speaker-color": speaker.color } as React.CSSProperties}
                    onClick={() => {
                      setActiveSpeaker(speakerId);
                      setNotice(`Active speaker changed to ${speaker.name}.`);
                    }}
                  >
                    <span className="cc-speaker-mark">{speaker.name.slice(0, 1)}</span>
                    <span>
                      <strong>{speaker.name}</strong>
                      <small>{speaker.role}</small>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="cc-kind-row" aria-label="Segment type">
              {(["question", "answer", "decision", "note"] as SegmentKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  className={selectedKind === kind ? "is-active" : ""}
                  onClick={() => setSelectedKind(kind)}
                >
                  {kind}
                </button>
              ))}
            </div>

            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Capture ${SPEAKERS[activeSpeaker].name}'s next turn…`}
              rows={5}
            />

            {provisional ? (
              <div className="cc-provisional">
                <span>LIVE / PROVISIONAL</span>
                <p>{provisional}</p>
              </div>
            ) : null}

            <div className="cc-capture-actions">
              <button type="button" className="cc-button cc-button-primary" onClick={submitDraft} disabled={!draft.trim()}>
                Add speaker block
              </button>
              <button
                type="button"
                className={`cc-button ${listening ? "cc-button-listening" : "cc-button-secondary"}`}
                onClick={startListening}
                title={speechSupported ? "Use browser speech recognition" : "Speech recognition may be unavailable in this browser"}
              >
                {listening ? "Stop listening" : "Voice capture"}
              </button>
            </div>

            <p className="cc-microcopy">
              Browser voice support varies. Typed capture is the guaranteed beta path. This build stores the session in this browser only.
            </p>
          </section>

          <section className="cc-panel cc-status-panel">
            <div className="cc-panel-heading compact">
              <span>02</span>
              <div>
                <h2>Live telemetry</h2>
                <p>Current local session state.</p>
              </div>
            </div>
            <dl className="cc-stats">
              <div><dt>Speaker blocks</dt><dd>{segments.length}</dd></div>
              <div><dt>Questions</dt><dd>{segments.filter((segment) => segment.kind === "question").length}</dd></div>
              <div><dt>Decisions</dt><dd>{segments.filter((segment) => segment.kind === "decision").length}</dd></div>
              <div><dt>Views generated</dt><dd>{segments.length ? 4 : 1}</dd></div>
            </dl>
          </section>
        </aside>

        <section className="cc-main-stage">
          <nav className="cc-view-tabs" aria-label="Canvas views">
            {([
              ["timeline", "Timeline"],
              ["quotes", "Quote blocks"],
              ["artifact", "Living page"],
              ["report", "Beta report"],
            ] as Array<[ViewMode, string]>).map(([mode, label]) => (
              <button key={mode} type="button" className={view === mode ? "is-active" : ""} onClick={() => setView(mode)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="cc-stage-content">
            {view === "timeline" ? (
              <section>
                <div className="cc-stage-heading">
                  <div>
                    <p>LIVE INTERVIEW TIMELINE</p>
                    <h2>Every question becomes a navigable branch.</h2>
                  </div>
                  <span>{exchanges.length} exchanges</span>
                </div>

                {exchanges.length === 0 ? (
                  <div className="cc-empty-state">
                    <strong>No conversation blocks yet.</strong>
                    <p>Load the guided demo or add the first speaker turn. Questions automatically create timeline nodes.</p>
                  </div>
                ) : (
                  <div className="cc-timeline">
                    {exchanges.map((exchange, index) => {
                      const open = selectedExchange === exchange.id || selectedExchange === null;
                      return (
                        <article className={`cc-exchange ${open ? "is-open" : ""}`} key={exchange.id}>
                          <div className="cc-timeline-spine">
                            <span>{String(index + 1).padStart(2, "0")}</span>
                          </div>
                          <div className="cc-exchange-body">
                            <button
                              type="button"
                              className="cc-question-bubble"
                              onClick={() => setSelectedExchange(open && selectedExchange !== null ? null : exchange.id)}
                            >
                              <span>{formatElapsed(exchange.time)}</span>
                              <strong>{exchange.label}</strong>
                              <em>{open ? "Collapse" : "Open transcript"}</em>
                            </button>

                            {open ? (
                              <div className="cc-speaker-blocks">
                                {exchange.segments.map((segment) => {
                                  const speaker = SPEAKERS[segment.speaker];
                                  return (
                                    <div className="cc-transcript-block" key={segment.id} style={{ "--speaker-color": speaker.color } as React.CSSProperties}>
                                      <div className="cc-block-meta">
                                        <span>{speaker.name}</span>
                                        <span>{formatElapsed(segment.elapsedSeconds)}</span>
                                        <span>{segment.kind}</span>
                                        <span>{segment.finalized ? "FINAL" : "PROVISIONAL"}</span>
                                      </div>
                                      <p>{segment.text}</p>
                                      <div className="cc-block-actions">
                                        <button type="button" onClick={() => copyText(segment.text, `${speaker.name} quote`)}>Copy block</button>
                                        <button type="button" onClick={() => copyText(`“${segment.text}” — ${speaker.name}, ${formatElapsed(segment.elapsedSeconds)}`, "Attributed quote")}>Copy attributed</button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            ) : null}

            {view === "quotes" ? (
              <section>
                <div className="cc-stage-heading">
                  <div>
                    <p>SPEAKER-SEPARATED QUOTE VIEW</p>
                    <h2>Copy the exact words without replaying the call.</h2>
                  </div>
                  <span>{quoteSegments.length} quote-ready blocks</span>
                </div>

                <div className="cc-quote-grid">
                  {quoteSegments.length === 0 ? (
                    <div className="cc-empty-state"><strong>No quote blocks yet.</strong><p>Answers and decisions appear here automatically.</p></div>
                  ) : quoteSegments.map((segment) => {
                    const speaker = SPEAKERS[segment.speaker];
                    return (
                      <article className="cc-quote-card" key={segment.id} style={{ "--speaker-color": speaker.color } as React.CSSProperties}>
                        <div className="cc-quote-header">
                          <span>{speaker.name}</span>
                          <span>{formatElapsed(segment.elapsedSeconds)}</span>
                        </div>
                        <blockquote>{segment.text}</blockquote>
                        <div className="cc-quote-footer">
                          <span>{segment.kind}</span>
                          <button type="button" onClick={() => copyText(segment.text, "Quote")}>Copy</button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {view === "artifact" ? (
              <section>
                <div className="cc-stage-heading">
                  <div>
                    <p>LIVING PAGE / GENERATED STRUCTURE</p>
                    <h2>The artifact expands as the conversation develops.</h2>
                  </div>
                  <span>{themes.length} emerging themes</span>
                </div>

                <div className="cc-artifact-hero">
                  <p>SESSION SYNTHESIS</p>
                  <h3>{title}</h3>
                  <span>{segments.length ? "Generated from current speaker blocks" : "Waiting for conversation data"}</span>
                </div>

                <div className="cc-artifact-grid">
                  <article>
                    <span>01</span>
                    <h4>Questions asked</h4>
                    <p>{segments.filter((segment) => segment.kind === "question").length} discovery questions are linked to their answers and timestamps.</p>
                  </article>
                  <article>
                    <span>02</span>
                    <h4>Decisions captured</h4>
                    <p>{segments.filter((segment) => segment.kind === "decision").length} explicit decisions are ready for follow-up work and review.</p>
                  </article>
                  <article>
                    <span>03</span>
                    <h4>Source-linked quotes</h4>
                    <p>{quoteSegments.length} speaker-separated blocks are available for proposals, briefs, or customer language.</p>
                  </article>
                </div>

                <section className="cc-theme-section">
                  <div>
                    <p>EMERGING PAGE SECTIONS</p>
                    <h3>Conversation themes</h3>
                  </div>
                  {themes.length === 0 ? (
                    <div className="cc-empty-state compact"><strong>No themes yet.</strong><p>Add more conversation turns to generate structure.</p></div>
                  ) : (
                    <div className="cc-theme-list">
                      {themes.map((theme, index) => (
                        <article key={theme.word}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{theme.word}</strong>
                          <em>{theme.count} mention{theme.count === 1 ? "" : "s"}</em>
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                <section className="cc-source-layers">
                  <div><span>VERBATIM</span><p>Exact speaker blocks and timestamps.</p></div>
                  <div><span>STRUCTURED</span><p>Questions, answers, decisions, and themes.</p></div>
                  <div><span>GENERATED</span><p>Page sections, requirements, and next artifacts.</p></div>
                </section>
              </section>
            ) : null}

            {view === "report" ? (
              <section className="cc-report">
                <div className="cc-stage-heading">
                  <div>
                    <p>CONCEPT → USABLE PROTOTYPE</p>
                    <h2>Beta 0.1 implementation receipt.</h2>
                  </div>
                  <span>Day 15 // Full send</span>
                </div>

                <div className="cc-report-grid">
                  <article>
                    <span>CONCEPT</span>
                    <h3>Living founder interview page</h3>
                    <p>A phone, Zoom, or recorded conversation grows into a timestamped page while the humans are still talking.</p>
                  </article>
                  <article>
                    <span>IMPLEMENTED NOW</span>
                    <h3>Browser-native beta</h3>
                    <p>Typed capture, optional browser speech recognition, speaker assignment, timeline branching, copyable quotes, local persistence, generated themes, and Markdown export.</p>
                  </article>
                  <article>
                    <span>TRUTH BOUNDARY</span>
                    <h3>No Twilio or Zoom connector yet</h3>
                    <p>This beta proves the interaction model. It does not yet ingest a live telephone or Zoom stream, perform automatic speaker diarization, or write back to the Hive Brain.</p>
                  </article>
                  <article>
                    <span>NEXT BUILD</span>
                    <h3>Authenticated live audio pipeline</h3>
                    <p>Add Twilio/Zoom ingestion, consent controls, diarization, provisional-to-final transcript correction, secure shared sessions, and source-linked artifact generation.</p>
                  </article>
                </div>

                <div className="cc-acceptance-list">
                  <h3>Usable-prototype acceptance checks</h3>
                  <ul>
                    <li><span>PASS</span> Create timestamped speaker blocks.</li>
                    <li><span>PASS</span> Questions create expandable timeline branches.</li>
                    <li><span>PASS</span> Copy verbatim and attributed quotes.</li>
                    <li><span>PASS</span> Preserve verbatim, structured, and generated layers.</li>
                    <li><span>PASS</span> Persist a session locally and export Markdown.</li>
                    <li><span>PASS</span> Support mobile browser use and optional voice capture.</li>
                    <li><span className="is-pending">NEXT</span> Multi-party live phone/Zoom ingestion and diarization.</li>
                    <li><span className="is-pending">NEXT</span> Authenticated collaborative founder observation mode.</li>
                  </ul>
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </div>

      <footer className="cc-footer">
        <div>
          <span className="cc-live-dot" />
          <p>{notice}</p>
        </div>
        <p>Human authority final • Local browser beta • Recording consent required for future live-audio integrations</p>
      </footer>
    </main>
  );
}
