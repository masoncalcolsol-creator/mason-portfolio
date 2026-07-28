"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./forest.module.css";

const SOURCES = {
  "rof-bio": {
    id: "SRC-ROF-ROSSINI-BIO",
    class: "B",
    publisher: "Rossini Opera Festival",
    title: "Gioachino Rossini — chronology",
    url: "https://www.rossinioperafestival.it/en/foundation/rof-people/gioachino-rossini/",
    note: "Institutional chronology identifying Guillaume Tell as Rossini's last work for the operatic stage.",
  },
  "rof-tell": {
    id: "SRC-ROF-GUILLAUME-TELL",
    class: "B",
    publisher: "Rossini Opera Festival",
    title: "Guillaume Tell — story and production record",
    url: "https://www.rossinioperafestival.it/en/stories/guillaume-tell/",
    note: "Institutional synopsis, premiere record, Schiller source, and the apple test involving Tell's son Jemmy.",
  },
  "loc-dawn": {
    id: "SRC-LOC-TELL-DAWN-1904",
    class: "A",
    publisher: "Library of Congress",
    title: "William Tell overture — Part 1: At dawn",
    url: "https://www.loc.gov/item/jukebox-245816/",
    note: "Archival catalog record for a 1904 recording naming Rossini as composer.",
  },
  "loc-storm": {
    id: "SRC-LOC-TELL-STORM-1907",
    class: "A",
    publisher: "Library of Congress",
    title: "William Tell overture — Part 2: The storm",
    url: "https://www.loc.gov/resource/jukebox-119720.1",
    note: "Archival catalog record for a 1907 recording of the storm section.",
  },
  "loc-calm": {
    id: "SRC-LOC-TELL-CALM-1909",
    class: "A",
    publisher: "Library of Congress",
    title: "William Tell overture — Part 3: The calm",
    url: "https://www.loc.gov/item/jukebox-119725/",
    note: "Archival catalog record for a 1909 recording of the calm section.",
  },
  "loc-finale": {
    id: "SRC-LOC-TELL-FINALE-1909",
    class: "A",
    publisher: "Library of Congress",
    title: "William Tell overture — Part 4: Finale",
    url: "https://www.loc.gov/item/jukebox-119734/",
    note: "Archival catalog record for a 1909 recording of the finale.",
  },
  "tchaikovsky-1812": {
    id: "SRC-TCH-1812-RESEARCH",
    class: "B",
    publisher: "Tchaikovsky Research",
    title: "The Year 1812",
    url: "https://en.tchaikovsky-research.net/pages/1812_Overture",
    note: "Specialist source documenting the commission, composition in 1880, commemorative purpose, and performance history.",
  },
};

const TOPICS = [
  {
    id: "TOPIC-ROSSINI-WILLIAM-TELL",
    slug: "rossini-william-tell",
    label: "Gioachino Rossini & the William Tell Overture",
    aliases: ["rossini", "william tell", "william tell overture", "rossini gallop", "horse song"],
    stage: "TREE · VERSION 1",
    summary: "A memory-reconciliation page connecting Rossini, Guillaume Tell, the famous four-part overture, the apple test involving Tell's son, and the neighboring 1812 Overture memory.",
    origin: "BLOOD PAGODA song concept → Rossini-inspired gallop → childhood encyclopedia memory → factual reconciliation → Live Learning Forest.",
    memory: [
      { status: "CORRECT", text: "Rossini is connected to the familiar fast overture you remembered." },
      { status: "CROSSED", text: "The 1812 Overture is by Tchaikovsky, not Rossini." },
      { status: "RECOVERED", text: "The son belongs to the William Tell story: Tell is forced to shoot an apple placed on Jemmy's head." },
      { status: "INTERPRETATION", text: "The horse-racing feeling most likely attaches to the fast finale rather than to a work Rossini wrote for his own son." },
    ],
    claims: [
      { id: "CLM-ROSSINI-001", depth: 1, state: "VERIFIED", text: "Guillaume Tell received its first performance at the Paris Opéra on August 3, 1829.", sources: ["rof-tell"] },
      { id: "CLM-ROSSINI-002", depth: 1, state: "VERIFIED", text: "Guillaume Tell was Rossini's last work for the operatic stage.", sources: ["rof-bio"] },
      { id: "CLM-ROSSINI-003", depth: 1, state: "VERIFIED", text: "In the opera, Tell is ordered to pierce an apple placed on the head of his young son, Jemmy.", sources: ["rof-tell"] },
      { id: "CLM-ROSSINI-004", depth: 2, state: "VERIFIED", text: "The opera's story is taken from Friedrich Schiller's Wilhelm Tell, published in 1804.", sources: ["rof-tell"] },
      { id: "CLM-ROSSINI-005", depth: 2, state: "VERIFIED", text: "Library of Congress catalog records preserve the overture as four named sections: dawn, storm, calm, and finale.", sources: ["loc-dawn", "loc-storm", "loc-calm", "loc-finale"] },
      { id: "CLM-ROSSINI-006", depth: 3, state: "VERIFIED", text: "The famous 1812 Overture belongs to Pyotr Ilyich Tchaikovsky and was composed in 1880 to commemorate Russia's defeat of Napoleon.", sources: ["tchaikovsky-1812"] },
      { id: "CLM-ROSSINI-007", depth: 3, state: "INTERPRETATION", text: "Your memory appears to have compressed two famous overtures and one real father-son plot element into a single durable packet.", sources: ["rof-tell", "tchaikovsky-1812"] },
    ],
    branches: [
      { label: "Tchaikovsky & the 1812 Overture", edge: "RECONCILES_WITH", target: "TOPIC-TCHAIKOVSKY-1812", status: "GROWN" },
      { label: "William Tell legend and Schiller's play", edge: "BASED_ON", status: "SEED" },
      { label: "Classical music in cartoons and television", edge: "CULTURAL_REUSE", status: "SEED" },
      { label: "Early CD-ROM encyclopedias", edge: "ORIGIN_MEMORY", status: "SEED" },
      { label: "Rossini after his final opera", edge: "BIOGRAPHICAL_BRANCH", status: "SEED" },
    ],
    version: { id: "NW-LLF-PAGE-ROSSINI-V1", published: "2026-07-27", authority: "Mason Perry · Final Human Authority", compiler: "LLF static compiler 0.1", previous: null },
    exportUrl: "/forest/rossini-v1.jsonld",
  },
  {
    id: "TOPIC-TCHAIKOVSKY-1812",
    slug: "tchaikovsky-1812",
    label: "Tchaikovsky & the 1812 Overture",
    aliases: ["1812", "1812 overture", "tchaikovsky", "cannons overture"],
    stage: "SEEDLING · VERSION 1",
    summary: "The first grown branch from the Rossini memory: the separate composer, purpose, date, and performance history of The Year 1812.",
    origin: "Branched from TOPIC-ROSSINI-WILLIAM-TELL through a memory-reconciliation edge.",
    memory: [
      { status: "CORRECT", text: "The 1812 Overture is one of the famous orchestral works in your remembered cluster." },
      { status: "CORRECTION", text: "Its composer is Pyotr Ilyich Tchaikovsky." },
      { status: "CONTEXT", text: "It commemorates Russia's defeat of Napoleon in 1812; it was not written in 1812." },
    ],
    claims: [
      { id: "CLM-1812-001", depth: 1, state: "VERIFIED", text: "Tchaikovsky composed the festival overture The Year 1812 in 1880.", sources: ["tchaikovsky-1812"] },
      { id: "CLM-1812-002", depth: 1, state: "VERIFIED", text: "The work commemorates Russia's defeat of Napoleon's invasion in 1812.", sources: ["tchaikovsky-1812"] },
      { id: "CLM-1812-003", depth: 2, state: "VERIFIED", text: "It was commissioned in connection with the All-Russian Arts and Industrial Exhibition planned for Moscow.", sources: ["tchaikovsky-1812"] },
      { id: "CLM-1812-004", depth: 3, state: "WELL_SUPPORTED", text: "The official premiere took place in Moscow in August 1882, after the composition was completed.", sources: ["tchaikovsky-1812"] },
      { id: "CLM-1812-005", depth: 3, state: "INTERPRETATION", text: "Its proximity in popular memory to Rossini's finale is understandable: both are highly recognizable overtures whose most familiar passages circulate beyond their original dramatic context.", sources: ["tchaikovsky-1812", "loc-finale"] },
    ],
    branches: [
      { label: "Rossini & the William Tell Overture", edge: "RECONCILES_WITH", target: "TOPIC-ROSSINI-WILLIAM-TELL", status: "GROWN" },
      { label: "Napoleon's 1812 campaign", edge: "COMMEMORATES", status: "SEED" },
      { label: "Cannons and bells in orchestral music", edge: "INSTRUMENTATION", status: "SEED" },
      { label: "Festival overtures", edge: "FORM", status: "SEED" },
    ],
    version: { id: "NW-LLF-PAGE-1812-V1", published: "2026-07-27", authority: "Mason Perry · Final Human Authority", compiler: "LLF static compiler 0.1", previous: null },
    exportUrl: "/forest/tchaikovsky-1812-v1.jsonld",
  },
];

const ROUTES = [
  { key: 1, label: "2-minute clearing", hint: "Essential correction and first facts" },
  { key: 2, label: "10-minute trail", hint: "Context, structure, and sources" },
  { key: 3, label: "Deep expedition", hint: "Interpretation, genealogy, and full receipts" },
];

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function ForestPage() {
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const [routeDepth, setRouteDepth] = useState(1);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState(null);
  const [seeds, setSeeds] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [proposals, setProposals] = useState([]);
  const [proposalText, setProposalText] = useState("");
  const [proposalSource, setProposalSource] = useState("");
  const [showLedger, setShowLedger] = useState(false);
  const [busy, setBusy] = useState(false);
  const [storageStatus, setStorageStatus] = useState({ state: "CHECKING", writesEnabled: false });

  useEffect(() => {
    setSeeds(safeRead("llf.server.seeds", []));
    setFeedback(safeRead("llf.server.feedback", {}));
    setProposals(safeRead("llf.server.proposals", []));
    fetch("/api/forest/status", { cache: "no-store" })
      .then(async (response) => ({ response, body: await response.json() }))
      .then(({ response, body }) => setStorageStatus({ state: body?.storage?.state || (response.ok ? "READY" : "UNAVAILABLE"), writesEnabled: Boolean(body?.writesEnabled) }))
      .catch(() => setStorageStatus({ state: "UNREACHABLE", writesEnabled: false }));
  }, []);

  const topic = useMemo(() => TOPICS.find((item) => item.id === topicId) || TOPICS[0], [topicId]);
  const visibleClaims = topic.claims.filter((claim) => claim.depth <= routeDepth);
  const sourceIds = [...new Set(visibleClaims.flatMap((claim) => claim.sources))];

  function cacheReceipt(key, value, setter) {
    setter(value);
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* server is canonical; cache is optional */ }
  }

  async function postEvent(payload) {
    const response = await fetch("/api/forest/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body?.error?.message || "The Forest could not preserve this event.");
    return body.event;
  }

  function selectTopic(id) {
    setTopicId(id);
    setNotice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function plantSeed(label, parentId = topic.id, edge = "USER_CURIOSITY") {
    const trimmed = label.trim();
    if (!trimmed || busy) return;
    const duplicate = seeds.find((seed) => seed.label?.toLowerCase() === trimmed.toLowerCase());
    if (duplicate) {
      setNotice({ type: "seed", title: "Seed already receipted", body: duplicate.receipt });
      return;
    }
    setBusy(true);
    try {
      const event = await postEvent({ kind: "seed", label: trimmed, topicId: parentId, edge });
      const seed = { ...event, storage: "SERVER_DURABLE" };
      cacheReceipt("llf.server.seeds", [seed, ...seeds], setSeeds);
      setNotice({ type: "seed", title: "Seed planted — durable receipt created", body: `${seed.receipt} · queued for source review in the shared Forest ledger.` });
    } catch (error) {
      setNotice({ type: "error", title: "Seed not saved", body: `${error instanceof Error ? error.message : "Unknown storage error"} No substitute local receipt was created.` });
    } finally {
      setBusy(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    if (!normalized || busy) return;
    const match = TOPICS.find((item) => item.label.toLowerCase().includes(normalized) || item.aliases.some((alias) => alias.includes(normalized) || normalized.includes(alias)));
    if (match) {
      selectTopic(match.id);
      setNotice({ type: "match", title: "Canonical topic resolved", body: `${match.id} · ${match.stage}` });
    } else {
      await plantSeed(query, topic.id, "SEARCHED_FOR");
    }
    setQuery("");
  }

  async function followBranch(branch) {
    if (branch.target) selectTopic(branch.target);
    else await plantSeed(branch.label, topic.id, branch.edge);
  }

  async function rate(value) {
    if (busy) return;
    setBusy(true);
    try {
      const event = await postEvent({ kind: "preference", topicId: topic.id, preference: value, routeDepth });
      cacheReceipt("llf.server.feedback", { ...feedback, [topic.id]: { ...event, value, storage: "SERVER_DURABLE" } }, setFeedback);
      setNotice({ type: "feedback", title: `${value.toUpperCase()} route preference preserved`, body: `${event.receipt} · this changes presentation preference only. It cannot change a claim's truth state.` });
    } catch (error) {
      setNotice({ type: "error", title: "Preference not saved", body: `${error instanceof Error ? error.message : "Unknown storage error"} Truth and routing remain unchanged.` });
    } finally {
      setBusy(false);
    }
  }

  async function submitProposal(event) {
    event.preventDefault();
    if (!proposalText.trim() || !proposalSource.trim() || busy) return;
    setBusy(true);
    try {
      const saved = await postEvent({ kind: "proposal", topicId: topic.id, proposalText: proposalText.trim(), sourceLocator: proposalSource.trim() });
      const proposal = { ...saved, text: proposalText.trim(), source: proposalSource.trim(), storage: "SERVER_DURABLE" };
      cacheReceipt("llf.server.proposals", [proposal, ...proposals], setProposals);
      setProposalText("");
      setProposalSource("");
      setNotice({ type: "proposal", title: "Proposal preserved in the review queue", body: `${proposal.receipt} · it is not canonical and has not been published.` });
    } catch (error) {
      setNotice({ type: "error", title: "Proposal not saved", body: `${error instanceof Error ? error.message : "Unknown storage error"} No local substitute was created.` });
    } finally {
      setBusy(false);
    }
  }

  const currentRating = feedback[topic.id]?.value;
  const ledgerReady = storageStatus.state === "READY" && storageStatus.writesEnabled;

  return (
    <main className={styles.page}>
      <div className={styles.canopy} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.mark}>NW</span>
            <span><strong>LIVE LEARNING FOREST</strong><small>NULLWORKS · PUBLIC GROVE 1.0</small></span>
          </a>
          <div className={styles.headerMeta}><span>FREE TO ENTER</span><span>NO ACCOUNT</span><span>{ledgerReady ? "DURABLE LEDGER" : "READ-ONLY SAFETY"}</span></div>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>CURIOSITY → SOURCES → CLAIMS → BRANCHES → RECEIPTS</div>
            <h1>Plant a question.<br />Grow a trustworthy path.</h1>
            <p>The Forest turns imperfect memories and new questions into governed living learning pages. Missing topics become queued seeds—not instant invented articles.</p>
          </div>
          <form className={styles.search} onSubmit={handleSearch}>
            <label htmlFor="forest-search">What do you want to learn about?</label>
            <div><input id="forest-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Rossini, 1812 Overture, or plant something new…" /><button type="submit" disabled={busy}>{busy ? "Preserving…" : "Ask the Librarian"}</button></div>
            <small>Canonical match if one exists. Otherwise: durable seed receipt queued for evidence review.</small>
          </form>
        </section>

        <section className={styles.notice} role="status">
          <strong>{ledgerReady ? "Production ledger connected" : storageStatus.state === "CHECKING" ? "Checking the production ledger" : "Production writes safely paused"}</strong>
          <span>{ledgerReady ? "Seeds, proposals, route signals, and lexical-review requests are now preserved in the shared append-only ledger." : "Reading remains available. New events will fail visibly rather than create fake local receipts until the database is connected."}</span>
          <a href="/forest/admin">Governed review console →</a>
        </section>

        {notice && <section className={styles.notice} role="status"><strong>{notice.title}</strong><span>{notice.body}</span><button onClick={() => setNotice(null)} aria-label="Dismiss notice">×</button></section>}

        <section className={styles.routeBar}>
          <div><span className={styles.sectionKicker}>CHOOSE YOUR ROUTE</span><strong>Same roots. Different depth.</strong></div>
          <div className={styles.routeButtons}>{ROUTES.map((route) => <button key={route.key} className={routeDepth === route.key ? styles.routeActive : ""} onClick={() => setRouteDepth(route.key)}><span>{route.label}</span><small>{route.hint}</small></button>)}</div>
        </section>

        <section className={styles.topicNav} aria-label="Existing trees">{TOPICS.map((item) => <button key={item.id} onClick={() => selectTopic(item.id)} className={topic.id === item.id ? styles.topicActive : ""}><span>{item.stage}</span><strong>{item.label}</strong></button>)}</section>

        <section className={styles.treeHeader}>
          <div><div className={styles.sectionKicker}>{topic.stage} · {topic.id}</div><h2>{topic.label}</h2><p>{topic.summary}</p></div>
          <div className={styles.versionCard}><span>CANONICAL VERSION</span><strong>{topic.version.id}</strong><small>Published {topic.version.published}</small><a href={topic.exportUrl} target="_blank" rel="noreferrer">Open JSON-LD export ↗</a></div>
        </section>

        <section className={styles.memoryPanel}>
          <div className={styles.memoryIntro}><span className={styles.sectionKicker}>MEMORY RECONCILIATION</span><h3>Your memory was compressed, not useless.</h3><p>The Librarian separates the fragments, keeps the originating thought, and marks where correction becomes interpretation.</p></div>
          <div className={styles.memoryGrid}>{topic.memory.map((item) => <article key={`${item.status}-${item.text}`}><span data-status={item.status}>{item.status}</span><p>{item.text}</p></article>)}</div>
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.claimColumn}>
            <div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>CANONICAL CLAIM REGISTRY</span><h3>{visibleClaims.length} claims on this route</h3></div><span className={styles.truthRule}>Preferences never vote on truth.</span></div>
            <div className={styles.claims}>{visibleClaims.map((claim) => <article className={styles.claim} key={claim.id}><div className={styles.claimTop}><span className={styles.claimId}>{claim.id}</span><span className={claim.state === "INTERPRETATION" ? styles.stateInterpretation : styles.stateVerified}>{claim.state}</span></div><p>{claim.text}</p><div className={styles.claimSources}>{claim.sources.map((sourceId) => <a key={sourceId} href={SOURCES[sourceId].url} target="_blank" rel="noreferrer">[{SOURCES[sourceId].class}] {SOURCES[sourceId].publisher} ↗</a>)}</div></article>)}</div>
          </div>
          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}><span className={styles.sectionKicker}>HOW DID WE GET HERE?</span><p>{topic.origin}</p></section>
            <section className={styles.sideCard}><span className={styles.sectionKicker}>ROUTE TRIAGE</span><h3>Should the Librarian offer more routes like this?</h3><div className={styles.triage}><button disabled={busy} className={currentRating === "red" ? styles.selectedRed : ""} onClick={() => rate("red")}><span>RED</span><small>Less like this</small></button><button disabled={busy} className={currentRating === "yellow" ? styles.selectedYellow : ""} onClick={() => rate("yellow")}><span>YELLOW</span><small>Context dependent</small></button><button disabled={busy} className={currentRating === "green" ? styles.selectedGreen : ""} onClick={() => rate("green")}><span>GREEN</span><small>More like this</small></button></div><p className={styles.microcopy}>This tunes routing and presentation only. Truth state remains source-governed.</p></section>
          </aside>
        </section>

        <section className={styles.branchesSection}>
          <div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>LIVING BRANCHES</span><h3>Choose a path or plant the missing tree.</h3></div><span>{topic.branches.filter((branch) => branch.status === "GROWN").length} grown · {topic.branches.filter((branch) => branch.status === "SEED").length} unplanted</span></div>
          <div className={styles.branches}>{topic.branches.map((branch) => <button disabled={busy} key={branch.label} onClick={() => followBranch(branch)}><span className={branch.status === "GROWN" ? styles.grown : styles.seed}>{branch.status}</span><strong>{branch.label}</strong><small>{branch.edge}</small><b>{branch.status === "GROWN" ? "Enter tree →" : "Plant seed +"}</b></button>)}</div>
        </section>

        <section className={styles.sourcesSection}>
          <div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>VISIBLE ROOTS</span><h3>Sources supporting this route</h3></div><span>Class A = archival / primary · Class B = institutional / specialist</span></div>
          <div className={styles.sources}>{sourceIds.map((sourceId) => { const source = SOURCES[sourceId]; return <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span className={styles.sourceClass}>CLASS {source.class}</span><strong>{source.title}</strong><small>{source.publisher}</small><p>{source.note}</p><b>{source.id} ↗</b></a>; })}</div>
        </section>

        <section className={styles.contributeSection}>
          <div><span className={styles.sectionKicker}>FERTILIZE THIS TREE</span><h3>Suggest a sourced improvement.</h3><p>You are creating a durable proposal, not editing the canonical page. Publication requires review and a new immutable version.</p></div>
          <form onSubmit={submitProposal}><textarea value={proposalText} onChange={(event) => setProposalText(event.target.value)} placeholder="What claim, correction, or branch should be reviewed?" required /><input value={proposalSource} onChange={(event) => setProposalSource(event.target.value)} placeholder="Source URL or precise source citation" required /><button type="submit" disabled={busy}>{busy ? "Preserving…" : "Create proposal receipt"}</button></form>
        </section>

        <section className={styles.ledgerSection}>
          <button className={styles.ledgerToggle} onClick={() => setShowLedger(!showLedger)}><span><span className={styles.sectionKicker}>DURABLE RECEIPT INDEX</span><strong>Server-accepted receipts cached on this device for convenience</strong></span><b>{showLedger ? "Close" : "Inspect"}</b></button>
          {showLedger && <div className={styles.ledger}><div><h4>Seeds ({seeds.length})</h4>{seeds.length ? seeds.map((seed) => <div key={seed.receipt}><pre>{JSON.stringify(seed, null, 2)}</pre><a href={`/api/forest/events?receipt=${encodeURIComponent(seed.receipt)}`} target="_blank" rel="noreferrer">Verify durable receipt ↗</a></div>) : <p>No accepted seed receipts cached on this device.</p>}</div><div><h4>Proposals ({proposals.length})</h4>{proposals.length ? proposals.map((proposal) => <div key={proposal.receipt}><pre>{JSON.stringify(proposal, null, 2)}</pre><a href={`/api/forest/events?receipt=${encodeURIComponent(proposal.receipt)}`} target="_blank" rel="noreferrer">Verify durable receipt ↗</a></div>) : <p>No accepted proposal receipts cached on this device.</p>}</div><div><h4>Route feedback</h4>{Object.keys(feedback).length ? Object.values(feedback).map((item) => <div key={item.receipt}><pre>{JSON.stringify(item, null, 2)}</pre><a href={`/api/forest/events?receipt=${encodeURIComponent(item.receipt)}`} target="_blank" rel="noreferrer">Verify durable receipt ↗</a></div>) : <p>No accepted route feedback cached on this device.</p>}</div></div>}
        </section>

        <footer className={styles.footer}><div><strong>The only credible forever-free system is one that can survive its original operator.</strong><span>Open exports · source-visible claims · static snapshots · append-only public receipts</span></div><div><span>Original seed planter: Mason Perry</span><span>NULLWORKS · PUBLIC GROVE 1.0 · 2026-07-28</span></div></footer>
      </div>
    </main>
  );
}
