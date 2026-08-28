'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { dbGet, dbPatch, dbPost } from '../../../lib/fieldBackend';

type Row = { tag_id:string; alias:string; kind:string; displayed_hours:number|null; status:'IN SERVICE'|'OUT OF SERVICE'; paired_at:string; updated_at:string; last_scanned_at:string };

export default function PMARTagPage() {
  const params = useParams<{ tag:string }>();
  const tag = useMemo(()=>decodeURIComponent(params?.tag || '').toUpperCase(),[params]);
  const [binding,setBinding]=useState<Row|null>(null); const [loaded,setLoaded]=useState(false); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  const [alias,setAlias]=useState(''); const [kind,setKind]=useState(''); const [hours,setHours]=useState('');

  useEffect(()=>{ if(!tag)return; (async()=>{ try { const rows=await dbGet<Row[]>(`pmars_tags?tag_id=eq.${encodeURIComponent(tag)}&select=*`); if(rows[0]) { setBinding(rows[0]); await dbPatch(`pmars_tags?tag_id=eq.${encodeURIComponent(tag)}`,{last_scanned_at:new Date().toISOString()}); } } catch(e){setError('Shared backend unavailable. Try again.');} finally{setLoaded(true);} })(); },[tag]);

  async function bind(){ if(!alias.trim()||busy)return; setBusy(true);setError(''); try { const rows=await dbPost<Row[]>('pmars_tags',{tag_id:tag,alias:alias.trim().toUpperCase(),kind:kind.trim()||'Physical asset',displayed_hours:hours.trim()?Number(hours):null,status:'IN SERVICE'}); setBinding(rows[0]); await dbPost('pmars_events',{tag_id:tag,event_type:'PAIRED',value_text:alias.trim().toUpperCase()},'return=minimal'); } catch(e){setError('Could not pair this marker. Check connection and retry.');} finally{setBusy(false);} }
  async function toggleStatus(){ if(!binding||busy)return; setBusy(true); const status=binding.status==='IN SERVICE'?'OUT OF SERVICE':'IN SERVICE'; try { const rows=await dbPatch<Row[]>(`pmars_tags?tag_id=eq.${encodeURIComponent(tag)}`,{status,updated_at:new Date().toISOString(),last_scanned_at:new Date().toISOString()}); setBinding(rows[0]); await dbPost('pmars_events',{tag_id:tag,event_type:'STATUS',value_text:status},'return=minimal'); } catch(e){setError('Status update failed. Retry.');} finally{setBusy(false);} }

  if(!loaded)return <main className="min-h-screen bg-[#f3f6f7]"/>;
  return <main className="min-h-screen bg-[#f3f6f7] px-5 py-8 text-[#101418]"><div className="mx-auto max-w-md"><header className="mb-6"><div className="text-xs font-black tracking-[.28em] text-cyan-600">PMARS LIVE</div><h1 className="text-4xl font-black">{tag||'UNKNOWN TAG'}</h1></header>
  {error&&<div className="mb-4 rounded-2xl bg-red-100 p-4 text-sm font-bold text-red-900">{error}</div>}
  {!binding?<section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><div className="text-xs font-bold tracking-[.2em] text-cyan-600">NEW TRIANGLE</div><h2 className="mt-2 text-3xl font-black">What did you put this on?</h2><p className="mt-2 text-sm text-slate-500">Pair this marker once. The record will then be shared across every device.</p><label className="mt-6 block text-sm font-bold">Asset ID</label><input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="PJ53" className="mt-2 w-full rounded-2xl border p-4 text-xl font-black"/><label className="mt-4 block text-sm font-bold">Type</label><input value={kind} onChange={e=>setKind(e.target.value)} placeholder="Toyota pallet jack" className="mt-2 w-full rounded-2xl border p-4"/><label className="mt-4 block text-sm font-bold">Displayed hours</label><input inputMode="decimal" value={hours} onChange={e=>setHours(e.target.value)} placeholder="1624" className="mt-2 w-full rounded-2xl border p-4 text-xl"/><button disabled={busy} onClick={bind} className="mt-6 w-full rounded-2xl bg-[#17d7e8] py-5 text-lg font-black text-black disabled:opacity-50">{busy?'PAIRING...':'PAIR THIS TRIANGLE'}</button></section>:
  <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><div className="text-xs font-bold tracking-[.2em] text-slate-500">YOU SCANNED</div><h2 className="mt-1 text-5xl font-black">{binding.alias}</h2><p className="mt-1 text-slate-500">{binding.kind}</p><button disabled={busy} onClick={toggleStatus} className={`mt-6 w-full rounded-2xl p-5 text-left text-xl font-black ${binding.status==='IN SERVICE'?'bg-emerald-100 text-emerald-900':'bg-red-100 text-red-900'}`}>{binding.status}</button>{binding.displayed_hours!==null&&<div className="mt-4 flex justify-between border-b py-4"><span>Displayed hours</span><strong>{binding.displayed_hours}</strong></div>}<div className="flex justify-between border-b py-4 text-sm"><span>PMARS point</span><strong>{tag}</strong></div><p className="mt-5 rounded-2xl bg-cyan-50 p-4 text-sm font-bold">LIVE SHARED RECORD · changes persist across devices.</p></section>}
  <a href="/pmar/overview" className="mt-5 block text-center text-sm font-black text-cyan-700">OPEN MAINTENANCE OVERVIEW</a><p className="mt-8 text-center text-xs font-bold tracking-[.16em] text-slate-400">FIND BLUE. SCAN BLUE.</p></div></main>;
}
