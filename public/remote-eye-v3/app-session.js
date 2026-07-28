function updateScaleReadout() {
  if (calibration) {
    $('calibrationStatus').textContent = `Scale locked: ${calibration.pixelsPerUnit.toFixed(2)} source px/${calibration.unit}`;
    $('scaleReadout').textContent = `SCALE: ${calibration.unit.toUpperCase()}`;
    $('measurementReadout').textContent = measurements.at(-1)?.label || 'SCALE READY';
  } else {
    $('calibrationStatus').textContent = 'Calibration not set'; $('scaleReadout').textContent = 'SCALE: UNSET'; $('measurementReadout').textContent = 'NO SCALE';
  }
}

function setState(state) {
  inspectionState = state; $('truthState').textContent = state; $('truthState').className = `chip state-${state.toLowerCase()}`;
  document.querySelectorAll('[data-state]').forEach((button) => button.classList.toggle('active', button.dataset.state === state)); updateHudPreview();
}

function logFinding() {
  const observation = $('observation').value.trim(); if (!observation) { alert('Add an observation first.'); return; }
  addEvent('FIELD_FINDING', { observation, nominalSize: $('nominalSize').value.trim() }); $('observation').value = ''; updateHudPreview();
}

function clearMarks() { measurements = []; tapPoints = []; inputMode = 'idle'; updateScaleReadout(); drawOverlay(); addEvent('ANNOTATIONS_CLEARED'); updateHudPreview(); }

function exportInspection() {
  session.metadata = metadataFromInputs();
  const payload = { ...session, exportedAt: new Date().toISOString(), calibration, measurements, currentState: inspectionState, reticle: { style: reticleStyle, color: reticleColor, colorDialValue }, halo: { connected: halo.connected } };
  downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), `${session.id}_inspection_receipt.json`);
  addEvent('RECEIPT_JSON_EXPORTED');
}

function csvCell(value) { const s = typeof value === 'string' ? value : JSON.stringify(value); return `"${String(s ?? '').replace(/"/g, '""')}"`; }
function downloadEventCsv() {
  const headers = ['seq', 'time', 'type', 'state', 'distanceFromEntry', 'distanceUnit', 'detail'];
  const rows = session.events.map((event) => {
    const detail = { ...event }; headers.slice(0, 6).forEach((key) => delete detail[key]);
    return [event.seq, event.time, event.type, event.state, event.distanceFromEntry, event.distanceUnit, detail].map(csvCell).join(',');
  });
  downloadBlob(new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' }), `${session.id}_events.csv`);
}

async function copySummary() {
  const meta = metadataFromInputs();
  const summary = `${session.id}\nAsset: ${meta.asset}\nLocation: ${meta.location}\nState: ${inspectionState}\nDistance: ${meta.distanceFromEntry} ${meta.distanceUnit}\nEvents: ${session.events.length}\nTruth boundary: ${session.truthBoundary}`;
  await navigator.clipboard.writeText(summary); $('copyBtn').textContent = 'Copied'; setTimeout(() => $('copyBtn').textContent = 'Copy Receipt Summary', 1000);
}

function saveSessionLocal() {
  session.metadata = metadataFromInputs();
  const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter((saved) => saved.id !== session.id);
  sessions.unshift({ ...session, calibration, measurements, currentState: inspectionState });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 12)));
  addEvent('SESSION_SAVED_LOCAL');
}

function loadMostRecent() {
  const [saved] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!saved) { alert('No saved session is available on this device.'); return; }
  session = saved; calibration = saved.calibration || null; measurements = saved.measurements || []; inspectionState = saved.currentState || 'YELLOW'; sessionStart = Date.now();
  const meta = saved.metadata || {};
  $('assetInput').value = meta.asset || ''; $('locationInput').value = meta.location || ''; $('operatorInput').value = meta.operator || ''; $('entryDistance').value = meta.distanceFromEntry || 0; $('entryUnit').value = meta.distanceUnit || 'ft'; $('nominalSize').value = meta.nominalSize || '';
  setState(inspectionState); updateScaleReadout(); renderEvents(); drawOverlay(); updateHudPreview();
}

function startNewSession() {
  session = createSession(); calibration = null; measurements = []; tapPoints = []; inputMode = 'idle'; sessionStart = Date.now(); setState('YELLOW'); updateScaleReadout(); renderEvents(); addEvent('SESSION_STARTED');
}

function currentHudCard() {
  const lastFinding = [...session.events].reverse().find((e) => e.type === 'FIELD_FINDING');
  return {
    state: inspectionState,
    distance: `${Number($('entryDistance').value || 0).toFixed(1)} ${$('entryUnit').value}`,
    measurement: measurements.at(-1)?.label || 'NO SCALE',
    message: lastFinding?.observation || 'READY',
  };
}

function updateHudPreview() {
  const card = currentHudCard(); $('haloSimState').textContent = card.state; $('haloSimState').style.color = card.state === 'GREEN' ? '#70ffad' : card.state === 'RED' ? '#ff626f' : '#ffd75b';
  $('haloSimDistance').textContent = card.distance; $('haloSimMeasurement').textContent = card.measurement; $('haloSimMessage').textContent = card.message.slice(0, 46);
  $('depthReadout').textContent = `ENTRY: ${card.distance}`;
}

async function connectHalo() {
  try { const type = await halo.connect(); $('haloState').textContent = `HALO: ${String(type)}`; $('haloState').className = 'chip state-green'; addEvent('HALO_CONNECTED', { type }); }
  catch (error) { $('haloDetail').textContent = error.message; addEvent('HALO_ERROR', { error: error.message }); }
}
async function sendHalo() { try { const card = currentHudCard(); updateHudPreview(); if (halo.connected) await halo.displayCard(card); else $('haloDetail').textContent = 'HUD simulator updated. Connect Halo to transmit this card.'; addEvent('HALO_HUD_UPDATED', card); } catch (error) { $('haloDetail').textContent = error.message; addEvent('HALO_ERROR', { error: error.message }); } }
async function clearHalo() { try { if (halo.connected) await halo.clear(); $('haloDetail').textContent = halo.connected ? 'Halo display cleared.' : 'Simulator has no persistent hardware display to clear.'; } catch (error) { $('haloDetail').textContent = error.message; } }
async function disconnectHalo() { try { await halo.disconnect(); $('haloState').textContent = 'HALO: OFFLINE'; $('haloState').className = 'chip'; addEvent('HALO_DISCONNECTED'); } catch (error) { $('haloDetail').textContent = error.message; } }
