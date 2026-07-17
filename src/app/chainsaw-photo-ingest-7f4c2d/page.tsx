"use client";

import { useState } from "react";

async function compressPhoto(file: File, index: number): Promise<File> {
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = url;
    });

    const maxWidth = 1200;
    const maxHeight = 1600;
    const ratio = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
    const width = Math.max(1, Math.round(image.naturalWidth * ratio));
    const height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Browser canvas is unavailable.");
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error("WebP conversion failed.")),
        "image/webp",
        0.78,
      );
    });
    return new File([blob], `chainsaw-${index + 1}.webp`, { type: "image/webp" });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function ChainsawPhotoIngestPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("Choose the five original Stihl photos in the order you want them shown.");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);

  async function upload() {
    if (!files.length) return;
    setBusy(true);
    setStatus("Compressing the original photos in your browser…");
    try {
      const compressed: File[] = [];
      for (let index = 0; index < files.length; index += 1) {
        setStatus(`Compressing photo ${index + 1} of ${files.length}…`);
        compressed.push(await compressPhoto(files[index], index));
      }

      const form = new FormData();
      compressed.forEach((file) => form.append("photos", file));
      setStatus("Encoding deterministic chunks and committing the internal asset route…");
      const response = await fetch("/api/chainsaw-photo-ingest-7f4c2d", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || `Upload failed with ${response.status}`);

      setComplete(true);
      setStatus(`${result.count} photos committed. Vercel is deploying commit ${String(result.commit).slice(0, 8)}. Give it about one minute, then open the chainsaw page.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page">
      <style>{`
        *{box-sizing:border-box}
        body{margin:0;background:#101820;color:#fff;font-family:Arial,Helvetica,sans-serif}
        .page{min-height:100vh;padding:28px 18px;background:radial-gradient(circle at 90% 0%,rgba(216,77,0,.35),transparent 30%),#101820}
        .card{width:min(720px,100%);margin:0 auto;background:#f4ecdf;color:#101820;border:1px solid #ff7b32;box-shadow:12px 12px 0 #d84d00;padding:28px}
        .label{font-size:12px;font-weight:950;letter-spacing:.16em;color:#9a3400;text-transform:uppercase}
        h1{font-family:Georgia,serif;font-size:clamp(42px,10vw,76px);line-height:.92;margin:16px 0 20px;letter-spacing:-.05em}
        p{font-size:17px;line-height:1.65;color:#20262c}
        input{display:block;width:100%;margin:24px 0;padding:18px;background:#fffaf2;border:1px solid #725f49;color:#101820;font-weight:800}
        button,a{width:100%;display:flex;align-items:center;justify-content:center;min-height:58px;border:1px solid #101820;text-decoration:none;text-transform:uppercase;letter-spacing:.05em;font-weight:950;font-size:13px}
        button{background:#d84d00;color:#fff;cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}
        a{margin-top:12px;background:#101820;color:#fff}
        .status{margin-top:20px;padding:18px;border-left:6px solid #d84d00;background:#fffaf2;font-weight:800;color:#101820}
        .receipt{margin-top:24px;font-size:13px;color:#5b4b3b}
      `}</style>
      <div className="card">
        <div className="label">NULLWORKS // MR. SMITH ONE-USE IMAGE BRIDGE</div>
        <h1>Put the real Stihl photos on the real page.</h1>
        <p>This keeps the final images inside the portfolio itself: browser-safe WebP, deterministic base64 chunks, an internal asset route, cache-safe delivery, and a real production deployment.</p>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={busy || complete}
          onChange={(event) => {
            const selected = Array.from(event.target.files || []).slice(0, 5);
            setFiles(selected);
            setStatus(selected.length ? `${selected.length} photo${selected.length === 1 ? "" : "s"} ready.` : "Choose between one and five photos.");
          }}
        />
        <button type="button" disabled={!files.length || busy || complete} onClick={upload}>
          {busy ? "Working…" : complete ? "Photos committed" : `Install ${files.length || ""} photo${files.length === 1 ? "" : "s"}`}
        </button>
        <div className="status">{status}</div>
        {complete && <a href="/chainsaw?photos=mr-smith-v1">Open the chainsaw page</a>}
        <div className="receipt">The ingest closes after the first successful commit. Original files stay on your device; compressed derivatives become the served portfolio assets.</div>
      </div>
    </main>
  );
}
