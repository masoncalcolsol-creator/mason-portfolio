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

const bubble: React.CSSProperties = {
  background: 'rgba(2, 8, 6, 0.88)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 18,
  boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
};

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

  if (!loaded) return <main style={{ minHeight: '100vh' }} />;

  const inService = binding?.status === 'IN SERVICE';

  return (
    <main style={{ position: 'relative', minHeight: '100vh', padding: '32px 20px', color: '#fff' }}>
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'rgba(0,0,0,0.28)', zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 440, margin: '0 auto', display: 'grid', gap: 16 }}>
        <header style={{ ...bubble, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.28em', color: '#4ade80' }}>PMARS LIVE</div>
          <h1 style={{ margin: '8px 0 0', fontSize: 36, fontWeight: 900 }}>{tag || 'UNKNOWN TAG'}</h1>
        </header>

        {error && (
          <div style={{ ...bubble, padding: 16, borderColor: 'rgba(248,113,113,0.45)', color: '#fecaca' }}>{error}</div>
        )}

        {!binding ? (
          <section style={{ ...bubble, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', color: '#4ade80' }}>NEW TRIANGLE</div>
            <h2 style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 900 }}>What did you put this on?</h2>
            <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.62)' }}>Pair this marker once. The record will then be shared across every device.</p>
            <label style={{ display: 'block', marginTop: 24, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Asset ID</label>
            <input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="PJ53" style={{ ...bubble, width: '100%', marginTop: 8, padding: 16, fontSize: 20, fontWeight: 900, color: '#fff' }} />
            <label style={{ display: 'block', marginTop: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Type</label>
            <input value={kind} onChange={(e) => setKind(e.target.value)} placeholder="Toyota pallet jack" style={{ ...bubble, width: '100%', marginTop: 8, padding: 16, color: '#fff' }} />
            <label style={{ display: 'block', marginTop: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Displayed hours</label>
            <input inputMode="decimal" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="1624" style={{ ...bubble, width: '100%', marginTop: 8, padding: 16, fontSize: 20, color: '#fff' }} />
            <button disabled={busy} onClick={bind} style={{ width: '100%', marginTop: 24, padding: 20, borderRadius: 16, border: 0, background: '#22c55e', color: '#052e16', fontWeight: 900, fontSize: 18 }}>
              {busy ? 'PAIRING...' : 'PAIR THIS TRIANGLE'}
            </button>
          </section>
        ) : (
          <section style={{ ...bubble, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>YOU SCANNED</div>
            <h2 style={{ margin: '4px 0 0', fontSize: 48, fontWeight: 900 }}>{binding.alias}</h2>
            <p style={{ marginTop: 4, color: 'rgba(255,255,255,0.58)' }}>{binding.kind}</p>
            <button disabled={busy} onClick={toggleStatus} style={{ width: '100%', marginTop: 24, padding: 20, borderRadius: 16, border: 0, fontWeight: 900, fontSize: 20, textAlign: 'left', background: inService ? '#22c55e' : '#dc2626', color: inService ? '#052e16' : '#fff' }}>
              {binding.status}
            </button>
            {binding.displayed_hours !== null && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Displayed hours</span>
                <strong>{binding.displayed_hours}</strong>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.12)', fontSize: 14 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>PMARS point</span>
              <strong>{tag}</strong>
            </div>
            <p style={{ ...bubble, marginTop: 20, padding: 16, color: '#bbf7d0', fontWeight: 700 }}>
              LIVE SHARED RECORD · changes persist across devices.
            </p>
          </section>
        )}

        <a href="/pmar/overview" style={{ ...bubble, display: 'block', padding: 16, textAlign: 'center', color: '#86efac', fontWeight: 900, textDecoration: 'none' }}>
          OPEN MAINTENANCE OVERVIEW
        </a>
        <p style={{ ...bubble, padding: '12px 16px', textAlign: 'center', letterSpacing: '0.16em', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.55)' }}>
          FIND BLUE. SCAN BLUE.
        </p>
      </div>
    </main>
  );
}
