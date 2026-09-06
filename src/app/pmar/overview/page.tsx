'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { dbGet } from '../../lib/fieldBackend';

type Row = {
  tag_id: string;
  alias: string;
  kind: string;
  displayed_hours: number | null;
  status: string;
  last_scanned_at: string;
  updated_at: string;
};

const card =
  'rounded-2xl border border-white/10 bg-black/75 p-4 shadow-xl backdrop-blur-md';

export default function Overview() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    dbGet<Row[]>('pmars_tags?select=*&order=updated_at.desc')
      .then(setRows)
      .catch(() => setError('Could not load shared fleet data.'));
  }, []);

  const out = rows.filter((r) => r.status === 'OUT OF SERVICE').length;

  return (
    <main className="relative min-h-screen bg-transparent px-5 py-8 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-black/25"
      />
      <div className="relative z-10 mx-auto max-w-5xl space-y-4">
        <header className={card}>
          <div className="text-xs font-black tracking-[.28em] text-emerald-400">
            PMARS LIVE
          </div>
          <h1 className="mt-2 text-4xl font-black">MAINTENANCE OVERVIEW</h1>
        </header>

        <div className="grid grid-cols-3 gap-3">
          <div className={card}>
            <div className="text-3xl font-black">{rows.length}</div>
            <div className="text-xs text-white/50">ACTIVE TAGS</div>
          </div>
          <div className={card}>
            <div className="text-3xl font-black text-emerald-300">{rows.length - out}</div>
            <div className="text-xs text-white/50">IN SERVICE</div>
          </div>
          <div className={`${card} border-red-500/30`}>
            <div className="text-3xl font-black text-red-300">{out}</div>
            <div className="text-xs text-red-200/80">OUT OF SERVICE</div>
          </div>
        </div>

        {error && (
          <p className={`${card} border-red-500/40 bg-red-950/80`}>{error}</p>
        )}

        <div className="space-y-3">
          {rows.map((r) => (
            <Link
              key={r.tag_id}
              href={`/pmar/t/${r.tag_id}`}
              className={`${card} block`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl font-black text-white">{r.alias}</div>
                  <div className="text-sm text-white/50">
                    {r.kind} · {r.tag_id}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    r.status === 'IN SERVICE'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/50">
                {r.displayed_hours !== null && <span>{r.displayed_hours} HOURS</span>}
                <span>LAST SCAN {new Date(r.last_scanned_at).toLocaleString()}</span>
              </div>
            </Link>
          ))}
          {!rows.length && !error && (
            <p className={`${card} border-dashed p-8 text-center text-white/50`}>
              No paired markers yet. The first field scan creates the fleet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
