"use client";

import Link from "next/link";
import { useState } from "react";
import type { AnvilAlbum, AnvilProject } from "./catalog";

export default function ArtistCard({ project }: { project: AnvilProject }) {
  const albums: AnvilAlbum[] = project.albums?.length
    ? project.albums
    : [{ slug: project.slug, title: project.name, note: project.kicker }];
  const multi = albums.length > 1;
  const [open, setOpen] = useState(false);

  if (!multi) {
    return (
      <Link className="card" href={`/anvil/${project.slug}`} style={{ "--accent": project.accent } as React.CSSProperties}>
        <b>{project.status}</b>
        <h2>{project.name}</h2>
        <p>{project.summary}</p>
      </Link>
    );
  }

  return (
    <div className="card" style={{ "--accent": project.accent } as React.CSSProperties}>
      <button type="button" className="cardHit" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <b>{project.status} · {albums.length} ALBUMS</b>
        <h2>{project.name}</h2>
        <p>{project.summary}</p>
        <span className="dropCue">{open ? "CLOSE ALBUMS ▴" : "CHOOSE ALBUM ▾"}</span>
      </button>
      {open && (
        <div className="albumList">
          {albums.map((album) => (
            <Link key={album.slug} href={`/anvil/${album.slug}`} className="albumRow">
              <strong>{album.title}</strong>
              <span>{album.note}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
