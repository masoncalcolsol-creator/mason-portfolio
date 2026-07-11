"use client";

import { ChangeEvent, useState } from "react";
import DoubleheaderStudio from "./DoubleheaderStudio";
import styles from "./forge-shell.module.css";

type Preset =
  | "operational-commander"
  | "field-engineer"
  | "founder-noir"
  | "mars-pathfinder";

const STUDIO_STORAGE_KEY = "nullworks.aiDoubleheader.cinematic.v1";

function loadStudioState() {
  try {
    return JSON.parse(localStorage.getItem(STUDIO_STORAGE_KEY) || "{}") as {
      profile?: Record<string, unknown>;
      cardData?: {
        human_card?: Record<string, unknown>;
      };
    };
  } catch {
    return {};
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not load."));
    image.src = src;
  });
}

async function prepareImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Image must be smaller than 10 MB.");
  const source = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
  const image = await loadImage(source);
  const maxEdge = 1600;
  const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.88);
}

export default function ForgeShell() {
  const [open, setOpen] = useState(false);
  const [sourceImage, setSourceImage] = useState("");
  const [forgedImage, setForgedImage] = useState("");
  const [preset, setPreset] = useState<Preset>("operational-commander");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [isForging, setIsForging] = useState(false);
  const [studioVersion, setStudioVersion] = useState(0);

  function openForge() {
    const saved = loadStudioState();
    const current = String(saved.profile?.headshot || "");
    if (!sourceImage && current) setSourceImage(current);
    setOpen(true);
  }

  async function chooseSource(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setSourceImage(await prepareImage(file));
      setForgedImage("");
      setConsent(false);
      setStatus("Face source loaded locally. Nothing has been transmitted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image failed.");
    }
  }

  async function chooseFinishedArt(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setForgedImage(await prepareImage(file));
      setStatus("Finished cinematic art loaded locally. Apply it to the card when ready.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image failed.");
    }
  }

  async function forgePortrait() {
    if (!sourceImage) {
      setStatus("Choose a clear face source first.");
      return;
    }
    if (!consent) {
      setStatus("Confirm image ownership or authorization before rendering.");
      return;
    }

    const saved = loadStudioState();
    const profile = saved.profile || {};
    const humanCard = saved.cardData?.human_card || {};

    setIsForging(true);
    setStatus("Building wardrobe, lighting, and world around the face. Keep this tab open.");
    try {
      const response = await fetch("/api/ai-doubleheader/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceImage,
          preset,
          humanName: String(profile.humanName || humanCard.name || ""),
          role: String(humanCard.current_role || profile.headline || ""),
          archetype: String(humanCard.archetype || ""),
          callSign: String(humanCard.call_sign || ""),
          visualConcept: String(humanCard.visual_concept || ""),
          consent: true,
        }),
      });
      const payload = (await response.json()) as { imageDataUrl?: string; error?: string };
      if (!response.ok || !payload.imageDataUrl) {
        throw new Error(payload.error || "The portrait forge returned no image.");
      }
      setForgedImage(payload.imageDataUrl);
      setStatus("Cinematic portrait complete. Check the face, then apply it to the card.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Portrait forge failed.");
    } finally {
      setIsForging(false);
    }
  }

  function applyToCard() {
    if (!forgedImage) {
      setStatus("Forge or upload finished cinematic art first.");
      return;
    }
    const saved = loadStudioState();
    const next = {
      ...saved,
      profile: {
        ...(saved.profile || {}),
        headshot: forgedImage,
      },
    };
    localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(next));
    setStudioVersion((value) => value + 1);
    setStatus("Cinematic portrait applied. The human-card preview has been rebuilt.");
    setOpen(false);
  }

  return (
    <>
      <DoubleheaderStudio key={studioVersion} />

      <button className={styles.forgeLauncher} type="button" onClick={openForge}>
        <span>IMAGE FORGE</span>
        Build the world around the face
      </button>

      {open && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setOpen(false)}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="forge-title" onMouseDown={(event) => event.stopPropagation()}>
            <header className={styles.modalHeader}>
              <div>
                <span>NULLWORKS / AI DOUBLEHEADER</span>
                <h2 id="forge-title">Cinematic Portrait Forge</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close portrait forge">×</button>
            </header>

            <p className={styles.lead}>
              The source supplies the recognizable face. The image model rebuilds the clothing, light, and environment. The website adds all names, stats, and card typography afterward.
            </p>

            <div className={styles.imagePair}>
              <article>
                <span>SOURCE FACE</span>
                <div className={styles.imageWell} style={sourceImage ? { backgroundImage: `url(${sourceImage})` } : undefined}>
                  {!sourceImage && <strong>UPLOAD FACE</strong>}
                </div>
                <label className={styles.fileButton}>Choose source portrait<input type="file" accept="image/*" onChange={chooseSource} /></label>
              </article>
              <article>
                <span>FINISHED ART</span>
                <div className={`${styles.imageWell} ${styles.finishedWell}`} style={forgedImage ? { backgroundImage: `url(${forgedImage})` } : undefined}>
                  {!forgedImage && <strong>AWAITING FORGE</strong>}
                </div>
                <label className={styles.secondaryFile}>Upload finished art instead<input type="file" accept="image/*" onChange={chooseFinishedArt} /></label>
              </article>
            </div>

            <div className={styles.controls}>
              <label>
                Visual lane
                <select value={preset} onChange={(event) => setPreset(event.target.value as Preset)}>
                  <option value="operational-commander">Operational Commander</option>
                  <option value="field-engineer">Field Engineer</option>
                  <option value="founder-noir">Founder Noir</option>
                  <option value="mars-pathfinder">Mars Pathfinder</option>
                </select>
              </label>
              <label className={styles.consent}>
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span>I own this image or am authorized to use it, and I approve sending it to the configured image provider for this render.</span>
              </label>
            </div>

            {status && <div className={styles.status}>{status}</div>}

            <div className={styles.actions}>
              <button className={styles.forgeButton} type="button" onClick={forgePortrait} disabled={isForging}>
                {isForging ? "Forging portrait..." : "Forge cinematic portrait"}
              </button>
              <button className={styles.applyButton} type="button" onClick={applyToCard} disabled={!forgedImage}>
                Apply art to human card
              </button>
            </div>

            <p className={styles.boundary}>
              The source image remains local until Forge is pressed. The generated image is returned to this browser and stored in the existing local Doubleheader workspace. Human review remains final.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
