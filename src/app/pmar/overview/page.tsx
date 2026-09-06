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

const bubble: React.CSSProperties = {
  background: 'rgba(2, 8, 6, 0.88)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 18,
  boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
};

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
    <main style={{ position: 'relative', minHeight: '100vh', padding: '32px 20px', color: '#fff' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'rgba(0,0,0,0.28)', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 960, margin: '0 auto', display: 'grid', gap: 16 }}>
        <header style={{ ...bubble, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.28em', color: '#4ade80' }}>PMARS LIVE</div>
          <h1 style={{ margin: '8px 0 0', fontSize: 36, fontWeight: 900 }}>MAINTENANCE OVERVIEW</h1>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
          <div style={{ ...bubble, padding: 16 }}>
            <div style={{ fontSize: 30, fontWeight: 900 }}>{rows.length}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>ACTIVE TAGS</div>
          </div>
          <div style={{ ...bubble, padding: 16 }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#86efac' }}>{rows.length - out}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>IN SERVICE</div>
          </div>
          <div style={{ ...bubble, padding: 16 }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#fca5a5' }}>{out}</div>
            <div style={{ fontSize: 12, color: 'rgba(252,165,165,0.8)' }}>OUT OF SERVICE</div>
          </div>
        </div>
        {error && <p style={{ ...bubble, padding: 16, color: '#fecaca' }}>{error}</p>}
        <div style={{ display: 'grid', gap: 12 }}>
          {rows.map((r) => (
            <Link key={r.tag_id} href={`/pmar/t/${r.tag_id}`} style={{ ...bubble, padding: 16, display: 'block', color: '#fff', textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{r.alias}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{r.kind} · {r.tag_id}</div>
                </div>
                <span style={{ alignSelf: 'flex-start', borderRadius: 999, padding: '4px 12px', fontSize: 12, fontWeight: 900, background: r.status === 'IN SERVICE' ? '#22c55e' : '#dc2626', color: r.status === 'IN SERVICE' ? '#052e16' : '#fff' }}>
                  {r.status}
                </span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {r.displayed_hours !== null && <span>{r.displayed_hours} HOURS</span>}
                <span>LAST SCAN {new Date(r.last_scanned_at).toLocaleString()}</span>
              </div>
            </Link>
          ))}
          {!rows.length && !error && (
            <p style={{ ...bubble, padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
              No paired markers yet. The first field scan creates the fleet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
