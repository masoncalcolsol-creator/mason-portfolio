'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { dbGet, dbPatch, dbPost } from '../../../lib/fieldBackend';

type Row = {
  tag_id: string;
  alias: string;
  kind: string;
  displayed_hours: number | null;
  status: 'IN SERVICE' | 'OUT OF SERVICE';
  paired_at: string;
  updated_at: string;
  last_scanned_at: string;
};

const card =
  'rounded-2xl border border-white/10 bg-black/75 p-4 shadow-xl backdrop-blur-md';

export default function PMARTagPage() {
  const params = useParams<{ tag: string }>();
  const tag = useMemo(
    () => decodeURIComponent(params?.tag || '').toUpperCase(),
    [params],
  );
  const [binding, setBinding] = useState<Row | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [alias, setAlias] = useState('');
  const [kind, setKind] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    if (!tag) return;
    (async () => {
      try {
        const rows = await dbGet<Row[]>(
          `pmars_tags?tag_id=eq.${encodeURIComponent(tag)}&select=*`,
        );
        if (rows[0]) {
          setBinding(rows[0]);
          await dbPatch(`pmars_tags?tag_id=eq.${encodeURIComponent(tag)}`, {
            last_scanned_at: new Date().toISOString(),
          });
        }
      } catch {
        setError('Shared backend unavailable. Try again.');
      } finally {
        setLoaded(true);
      }
    })();
  }, [tag]);

  async function bind() {
    if (!alias.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const rows = await dbPost<Row[]>('pmars_tags', {
        tag_id: tag,
        alias: alias.trim().toUpperCase(),
        kind: kind.trim() || 'Physical asset',
        displayed_hours: hours.trim() ? Number(hours) : null,
        status: 'IN SERVICE',
      });
      setBinding(rows[0]);
      await dbPost(
        'pmars_events',
        { tag_id: tag, event_type: 'PAIRED', value_text: alias.trim().toUpperCase() },
        'return=minimal',
      );
    } catch {
      setError('Could not pair this marker. Check connection and retry.');
    } finally {
      setBusy(false);
    }
  }

  async function toggleStatus() {
    if (!binding || busy) return;
    setBusy(true);
    const status =
      binding.status === 'IN SERVICE' ? 'OUT OF SERVICE' : 'IN SERVICE';
    try {
      const rows = await dbPatch<Row[]>(
        `pmars_tags?tag_id=eq.${encodeURIComponent(tag)}`,
        {
          status,
          updated_at: new Date().toISOString(),
          last_scanned_at: new Date().toISOString(),
        },
      );
      setBinding(rows[0]);
      await dbPost(
        'pmars_events',
        { tag_id: tag, event_type: 'STATUS', value_text: status },
        'return=minimal',
      );
    } catch {
      setError('Status update failed. Retry.');
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) {
    return <main className="relative min-h-screen bg-transparent" />;
  }

  const inService = binding?.status === 'IN SERVICE';

  return (
    <main className="relative min-h-screen bg-transparent px-5 py-8 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-black/25"
      />
      <div className="relative z-10 mx-auto max-w-md space-y-4">
        <header className={card}>
          <div className="text-xs font-black tracking-[.28em] text-emerald-400">
            PMARS LIVE
          </div>
          <h1 className="mt-2 text-4xl font-black text-white">
            {tag || 'UNKNOWN TAG'}
          </h1>
        </header>

        {error && (
          <div className={`${card} border-red-500/40 bg-red-950/80 text-sm font-bold text-red-100`}>
            {error}
          </div>
        )}

        {!binding ? (
          <section className={`${card} p-6`}>
            <div className="text-xs font-bold tracking-[.2em] text-emerald-400">
              NEW TRIANGLE
            </div>
            <h2 className="mt-2 text-3xl font-black text-white">
              What did you put this on?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Pair this marker once. The record will then be shared across every device.
            </p>
            <label className="mt-6 block text-sm font-bold text-white/50">Asset ID</label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="PJ53"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/50 p-4 text-xl font-black text-white placeholder:text-white/30"
            />
            <label className="mt-4 block text-sm font-bold text-white/50">Type</label>
            <input
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              placeholder="Toyota pallet jack"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/50 p-4 text-white placeholder:text-white/30"
            />
            <label className="mt-4 block text-sm font-bold text-white/50">Displayed hours</label>
            <input
              inputMode="decimal"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="1624"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/50 p-4 text-xl text-white placeholder:text-white/30"
            />
            <button
              disabled={busy}
              onClick={bind}
              className="mt-6 w-full rounded-2xl border border-emerald-400/30 bg-emerald-500 py-5 text-lg font-black text-black disabled:opacity-50"
            >
              {busy ? 'PAIRING...' : 'PAIR THIS TRIANGLE'}
            </button>
          </section>
        ) : (
          <section className={`${card} p-6`}>
            <div className="text-xs font-bold tracking-[.2em] text-white/50">YOU SCANNED</div>
            <h2 className="mt-1 text-5xl font-black text-white">{binding.alias}</h2>
            <p className="mt-1 text-white/55">{binding.kind}</p>
            <button
              disabled={busy}
              onClick={toggleStatus}
              className={`mt-6 w-full rounded-2xl border p-5 text-left text-xl font-black ${
                inService
                  ? 'border-emerald-400/40 bg-emerald-500 text-black'
                  : 'border-red-400/40 bg-red-600 text-white'
              }`}
            >
              {binding.status}
            </button>
            {binding.displayed_hours !== null && (
              <div className="mt-4 flex justify-between border-b border-white/10 py-4 text-white">
                <span className="text-white/50">Displayed hours</span>
                <strong>{binding.displayed_hours}</strong>
              </div>
            )}
            <div className="flex justify-between border-b border-white/10 py-4 text-sm text-white">
              <span className="text-white/50">PMARS point</span>
              <strong>{tag}</strong>
            </div>
            <p className={`${card} mt-5 text-sm font-bold text-emerald-200`}>
              LIVE SHARED RECORD · changes persist across devices.
            </p>
          </section>
        )}

        <a
          href="/pmar/overview"
          className={`${card} block text-center text-sm font-black text-emerald-300`}
        >
          OPEN MAINTENANCE OVERVIEW
        </a>
        <p className={`${card} py-3 text-center text-xs font-bold tracking-[.16em] text-white/55`}>
          FIND BLUE. SCAN BLUE.
        </p>
      </div>
    </main>
  );
}
