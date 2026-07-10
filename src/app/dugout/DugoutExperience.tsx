"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type AccentKey = "green" | "blue" | "red" | "yellow" | "purple" | "white";

type Profile = {
  name: string;
  callSign: string;
  title: string;
  team: string;
  aiName: string;
  relationship: string;
  roster: string;
  scouting: string;
  email: string;
  accent: AccentKey;
  photo: string;
};

type Props = {
  masonPreset?: boolean;
};

const accentMap: Record<AccentKey, { hex: string; soft: string; label: string }> = {
  green: { hex: "#9cff38", soft: "rgba(156,255,56,.25)", label: "NULLWORKS GREEN" },
  blue: { hex: "#42c8ff", soft: "rgba(66,200,255,.25)", label: "ELECTRIC BLUE" },
  red: { hex: "#ff4d4d", soft: "rgba(255,77,77,.25)", label: "WARNING RED" },
  yellow: { hex: "#ffd84a", soft: "rgba(255,216,74,.25)", label: "REACTOR YELLOW" },
  purple: { hex: "#c37cff", soft: "rgba(195,124,255,.25)", label: "IMPERIAL PURPLE" },
  white: { hex: "#f5f7ff", soft: "rgba(245,247,255,.2)", label: "CLEAN WHITE" },
};

const blankProfile: Profile = {
  name: "Your Name",
  callSign: "OPERATOR",
  title: "Human-AI Systems Operator",
  team: "INDEPENDENT",
  aiName: "UNNAMED AI",
  relationship: "AI ASSISTANT",
  roster: "1",
  scouting: "Build the card. Enter the character screen. Show how you and your AI work together.",
  email: "",
  accent: "green",
  photo: "",
};

const masonProfile: Profile = {
  name: "Mason Perry",
  callSign: "NULLMASTER",
  title: "Operational Intelligence Systems Architect",
  team: "NULLWORKS",
  aiName: "THE HIVE",
  relationship: "GOVERNED AI COMPANY",
  roster: "65+ SPECIALIST ROLES",
  scouting: "Designs the operating company around AI workers: roles, authority, evidence, telemetry, exceptions, handoffs, and Human Authority.",
  email: "",
  accent: "green",
  photo: "",
};

const storagePrefix = "nullworks.dugout.profile.v1.";
const authKey = "nullworks.dugout.localWorkspace.v1";

function safeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42) || "operator";
}

async function hashPin(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AI";
}

function downloadJson(profile: Profile) {
  const publicProfile = { ...profile, photo: profile.photo ? "LOCAL_IMAGE_NOT_EXPORTED" : "" };
  const blob = new Blob([JSON.stringify(publicProfile, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeSlug(profile.name)}-dugout-profile.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function DugoutExperience({ masonPreset = false }: Props) {
  const routeKey = masonPreset ? "mason-perry-7f2k" : "builder";
  const [profile, setProfile] = useState<Profile>(masonPreset ? masonProfile : blankProfile);
  const [workspace, setWorkspace] = useState<{ email: string; pinHash: string } | null>(null);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(!masonPreset);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${storagePrefix}${routeKey}`);
      if (saved) setProfile({ ...(masonPreset ? masonProfile : blankProfile), ...JSON.parse(saved) });
      const auth = localStorage.getItem(authKey);
      if (auth) setWorkspace(JSON.parse(auth));

      if (!masonPreset) {
        const query = new URLSearchParams(window.location.search);
        const fromUrl: Partial<Profile> = {};
        if (query.get("name")) fromUrl.name = query.get("name")!;
        if (query.get("call")) fromUrl.callSign = query.get("call")!;
        if (query.get("title")) fromUrl.title = query.get("title")!;
        if (query.get("team")) fromUrl.team = query.get("team")!;
        if (query.get("ai")) fromUrl.aiName = query.get("ai")!;
        if (query.get("relation")) fromUrl.relationship = query.get("relation")!;
        if (query.get("roster")) fromUrl.roster = query.get("roster")!;
        if (query.get("scouting")) fromUrl.scouting = query.get("scouting")!;
        const accent = query.get("accent") as AccentKey | null;
        if (accent && accentMap[accent]) fromUrl.accent = accent;
        if (Object.keys(fromUrl).length) {
          setProfile((current) => ({ ...current, ...fromUrl, photo: current.photo }));
          setEditing(false);
        }
      }
    } catch {
      setNotice("This browser could not restore the saved beta workspace.");
    }
  }, [masonPreset, routeKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storagePrefix}${routeKey}`, JSON.stringify(profile));
    } catch {
      setNotice("The photo is too large for this browser. Try a smaller headshot.");
    }
  }, [profile, routeKey]);

  const accent = accentMap[profile.accent];

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    if (masonPreset) return `${window.location.origin}/dugout/mason-perry-7f2k`;
    const query = new URLSearchParams({
      name: profile.name,
      call: profile.callSign,
      title: profile.title,
      team: profile.team,
      ai: profile.aiName,
      relation: profile.relationship,
      roster: profile.roster,
      scouting: profile.scouting,
      accent: profile.accent,
    });
    return `${window.location.origin}/dugout?${query.toString()}`;
  }, [masonPreset, profile]);

  async function createWorkspace(event: FormEvent) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setNotice("Add a valid email address.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      setNotice("Choose a 4–6 digit PIN.");
      return;
    }
    const next = { email: normalizedEmail, pinHash: await hashPin(`${normalizedEmail}:${pin}`) };
    localStorage.setItem(authKey, JSON.stringify(next));
    setWorkspace(next);
    setProfile((current) => ({ ...current, email: normalizedEmail }));
    setNotice("Beta workspace saved on this device. No password or raw chat was uploaded.");
    setPin("");
  }

  function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5_000_000) {
      setNotice("Use an image under 5 MB for this mobile beta.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, photo: String(reader.result) }));
      setNotice("Photo loaded locally. It has not been uploaded to a public server.");
    };
    reader.readAsDataURL(file);
  }

  async function shareProfile() {
    const payload = {
      title: `${profile.name} — AI Doubleheader Dugout`,
      text: `${profile.name} entered the AI Doubleheader character screen. See the human, the AI relationship, and make your own.`,
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setNotice("Native share sheet opened.");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setNotice("Share link copied.");
      }
    } catch {
      setNotice("Share cancelled. The link is still shown below.");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setNotice("Link copied.");
    } catch {
      setNotice("Select and copy the link manually.");
    }
  }

  function resetBuilder() {
    setProfile(blankProfile);
    localStorage.removeItem(`${storagePrefix}${routeKey}`);
    setEditing(true);
    setNotice("Builder reset.");
  }

  const style = {
    "--accent": accent.hex,
    "--accent-soft": accent.soft,
  } as React.CSSProperties;

  return (
    <main className={styles.shell} style={style}>
      <div className={styles.starField} aria-hidden="true">
        {Array.from({ length: 26 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>

      <header className={styles.header}>
        <a href="/ai-doubleheader" className={styles.brand}>
          <span className={styles.brandMark}>N</span>
          <span><strong>NULLWORKS</strong><small>AI DOUBLEHEADER // DUGOUT</small></span>
        </a>
        <nav>
          <a href="/ai-doubleheader">MAKE CARDS</a>
          <button onClick={() => setEditing((value) => !value)}>{editing ? "VIEW STAGE" : "EDIT"}</button>
          <button className={styles.shareSmall} onClick={shareProfile}>SHARE</button>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>THE CHARACTER SCREEN</span>
          <h1>Your AI made the cards.<br /><em>Now enter the Dugout.</em></h1>
          <p>A mobile-first, MMO-inspired human–AI profile stage. Upload a public headshot, choose a suit signal, publish the basic relationship stats, and challenge someone else to make theirs.</p>
          <div className={styles.heroActions}>
            <a href="#stage" className={styles.primary}>ENTER CHARACTER SCREEN</a>
            <a href="/ai-doubleheader" className={styles.secondary}>BUILD THE TWO CARDS</a>
          </div>
          <div className={styles.boundary}>PHOTO-LOCAL BETA · HUMAN AUTHORITY · NO RAW CHAT COLLECTION</div>
        </div>

        <div className={styles.miniCard}>
          <span>ACTIVE PROFILE</span>
          <strong>{profile.name}</strong>
          <small>{profile.callSign} // {profile.team}</small>
          <div><b>{profile.roster}</b><i>AI ROSTER</i></div>
        </div>
      </section>

      <section className={styles.stageSection} id="stage">
        <div className={styles.stageTopline}>
          <div><span>PUBLIC CHARACTER STAGE</span><strong>{profile.name}</strong></div>
          <div className={styles.livePill}><i /> SIX-SECOND LOOP</div>
        </div>

        <div className={styles.stageGrid}>
          <div className={styles.stage}>
            <div className={styles.octopus} aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => <span key={index} className={styles[`arm${index + 1}`]} />)}
              <b />
            </div>
            <div className={styles.droneFleet} aria-hidden="true">
              {Array.from({ length: 7 }, (_, index) => <i key={index} style={{ "--d": index } as React.CSSProperties}><span /></i>)}
            </div>
            <div className={styles.scanLine} />
            <div className={styles.avatarRig}>
              <div className={styles.avatarGlow} />
              <div className={styles.avatar}>
                <div className={styles.headFrame}>
                  {profile.photo ? <img src={profile.photo} alt={`${profile.name} uploaded headshot`} /> : <span>{initials(profile.name)}</span>}
                </div>
                <div className={styles.neck} />
                <div className={styles.suitBody}>
                  <div className={styles.shoulderLeft} />
                  <div className={styles.shoulderRight} />
                  <div className={styles.chestCore}><b>N</b></div>
                  <div className={styles.suitLineOne} />
                  <div className={styles.suitLineTwo} />
                  <div className={styles.suitLineThree} />
                </div>
              </div>
            </div>
            <div className={styles.pedestal}>
              <div className={styles.pedestalRingOne} />
              <div className={styles.pedestalRingTwo} />
              <div className={styles.pedestalCore}>OI</div>
            </div>
            <div className={styles.fogOne} /><div className={styles.fogTwo} />
          </div>

          <aside className={styles.profilePanel}>
            <span className={styles.classLabel}>{profile.team} // HUMAN AUTHORITY</span>
            <h2>{profile.name}</h2>
            <h3>{profile.callSign}</h3>
            <p className={styles.title}>{profile.title}</p>

            <div className={styles.statGrid}>
              <div><span>AI IDENTITY</span><strong>{profile.aiName}</strong></div>
              <div><span>RELATIONSHIP</span><strong>{profile.relationship}</strong></div>
              <div><span>ROSTER</span><strong>{profile.roster}</strong></div>
              <div><span>SUIT SIGNAL</span><strong>{accent.label}</strong></div>
            </div>

            <div className={styles.scouting}>
              <span>SCOUTING REPORT</span>
              <p>{profile.scouting}</p>
            </div>

            <div className={styles.signalPicker}>
              <span>SELECT SUIT SIGNAL</span>
              <div>
                {(Object.keys(accentMap) as AccentKey[]).map((key) => (
                  <button
                    key={key}
                    aria-label={accentMap[key].label}
                    title={accentMap[key].label}
                    className={profile.accent === key ? styles.signalActive : ""}
                    style={{ background: accentMap[key].hex }}
                    onClick={() => setProfile((current) => ({ ...current, accent: key }))}
                  />
                ))}
              </div>
            </div>

            <div className={styles.profileActions}>
              <button className={styles.primaryButton} onClick={shareProfile}>SHARE CHARACTER PAGE</button>
              <button onClick={copyLink}>COPY LINK</button>
              <button onClick={() => downloadJson(profile)}>EXPORT PROFILE JSON</button>
            </div>
            <label className={styles.shareUrl}><span>LIVE URL</span><input value={shareUrl} readOnly onFocus={(event) => event.currentTarget.select()} /></label>
          </aside>
        </div>
      </section>

      {editing && (
        <section className={styles.builder}>
          <div className={styles.builderHeading}>
            <span>BUILD YOUR CHARACTER STAGE</span>
            <h2>Use your real face. Let the relationship become the world around it.</h2>
            <p>For this beta, uploaded photos stay in this browser. Share links carry the public text and suit color. Use a photo you own or have permission to use.</p>
          </div>

          <div className={styles.builderGrid}>
            <div className={styles.formCard}>
              <h3>1 // LOCAL BETA WORKSPACE</h3>
              {workspace ? (
                <div className={styles.workspaceReady}><b>WORKSPACE READY</b><span>{workspace.email}</span><small>Saved on this device only.</small></div>
              ) : (
                <form onSubmit={createWorkspace}>
                  <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
                  <label>4–6 digit PIN<input value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="••••" type="password" /></label>
                  <button className={styles.primaryButton}>CREATE LOCAL WORKSPACE</button>
                </form>
              )}
            </div>

            <div className={styles.formCard}>
              <h3>2 // HEADSHOT</h3>
              <label className={styles.uploadBox}>
                {profile.photo ? <img src={profile.photo} alt="Headshot preview" /> : <span>{initials(profile.name)}</span>}
                <b>{profile.photo ? "CHANGE PHOTO" : "UPLOAD PUBLIC HEADSHOT"}</b>
                <small>JPG, PNG, or WebP · under 5 MB · stays local</small>
                <input type="file" accept="image/*" onChange={uploadPhoto} />
              </label>
              {profile.photo && <button onClick={() => setProfile((current) => ({ ...current, photo: "" }))}>REMOVE LOCAL PHOTO</button>}
            </div>

            <div className={`${styles.formCard} ${styles.fieldsCard}`}>
              <h3>3 // PUBLIC PROFILE FIELDS</h3>
              <div className={styles.fieldGrid}>
                <label>Name<input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
                <label>Call sign<input value={profile.callSign} onChange={(event) => setProfile({ ...profile, callSign: event.target.value })} /></label>
                <label>Role / title<input value={profile.title} onChange={(event) => setProfile({ ...profile, title: event.target.value })} /></label>
                <label>Team / faction<input value={profile.team} onChange={(event) => setProfile({ ...profile, team: event.target.value })} /></label>
                <label>AI name<input value={profile.aiName} onChange={(event) => setProfile({ ...profile, aiName: event.target.value })} /></label>
                <label>Relationship<input value={profile.relationship} onChange={(event) => setProfile({ ...profile, relationship: event.target.value })} /></label>
                <label>Roster / agents<input value={profile.roster} onChange={(event) => setProfile({ ...profile, roster: event.target.value })} /></label>
                <label className={styles.wide}>Scouting report<textarea value={profile.scouting} onChange={(event) => setProfile({ ...profile, scouting: event.target.value })} rows={4} /></label>
              </div>
            </div>
          </div>

          <div className={styles.builderActions}>
            <button className={styles.primaryButton} onClick={() => { setEditing(false); document.getElementById("stage")?.scrollIntoView({ behavior: "smooth" }); }}>LOCK PROFILE + VIEW STAGE</button>
            {!masonPreset && <button onClick={resetBuilder}>RESET BUILDER</button>}
          </div>
        </section>
      )}

      <section className={styles.nextStep}>
        <div><span>THE TWO-ARTIFACT LOOP</span><h2>Share the cards. Share the character screen. Send the next person back to the experiment.</h2></div>
        <a href="/ai-doubleheader">MAKE YOUR AI DOUBLEHEADER</a>
      </section>

      {notice && <button className={styles.notice} onClick={() => setNotice("")}>{notice}<small>tap to close</small></button>}

      <footer>
        <div><b>NULLWORKS</b><span>Observe. Intervene. Design. Operate. Sustain.</span></div>
        <p>AI Doubleheader Dugout beta · Uploaded images remain local in this release · No claim of AI consciousness or independent authority.</p>
      </footer>
    </main>
  );
}
