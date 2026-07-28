const $ = (id) => document.getElementById(id);
const video = $('video');
const imageSource = $('imageSource');
const demoCanvas = $('demoCanvas');
const overlay = $('overlay');
const viewport = $('viewport');
const octx = overlay.getContext('2d');
const dctx = demoCanvas.getContext('2d');

const STORAGE_KEY = 'nullworks-remote-eye-sessions-v1';
const RETICLE_KEY = 'nullworks-remote-eye-reticle-v3';
let activeSource = { type: 'demo', label: 'SYNTHETIC PIPE', element: demoCanvas };
let mediaStream = null;
let objectUrl = null;
let frozenCanvas = null;
let frozen = false;
let gridOn = true;
let inputMode = 'idle';
let tapPoints = [];
let calibration = null;
let measurements = [];
let inspectionState = 'YELLOW';
let recognition = null;
let sessionStart = Date.now();
let session = createSession();
const RETICLES = [
  { id: 'precision-cross', label: 'Precision Cross' },
  { id: 'circle-dot', label: 'Circle Dot' },
  { id: 'ring-cross', label: 'Ring Cross' },
  { id: 'duplex', label: 'Duplex Reference' },
  { id: 'box-cross', label: 'Box Cross' },
  { id: 'chevron', label: 'Chevron Index' },
  { id: 'survey-grid', label: 'Survey Tick Grid' },
  { id: 'concentric', label: 'Concentric Rings' },
  { id: 'spot-meter', label: 'Spot Meter' },
  { id: 'corner-brackets', label: 'Corner Brackets' },
  { id: 'reference-ladder', label: 'Reference Ladder' },
  { id: 'lateral-bars', label: 'Lateral Reference Bars' },
];
let reticleStyle = 'precision-cross';
let colorDialValue = 215;
let reticleColor = 'hsl(185 100% 58%)';
let pseudoFullscreen = false;
let lastTouchTap = 0;
let lastFullscreenToggle = 0;

const halo = new HaloAdapter((message) => {
  $('haloDetail').textContent = message;
  addEvent('HALO_STATUS', { message }, false);
});

function newId() {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  return `NW-ROE-${stamp}-${crypto.getRandomValues(new Uint16Array(1))[0].toString(36).toUpperCase()}`;
}

function metadataFromInputs() {
  return {
    asset: $('assetInput').value.trim(),
    location: $('locationInput').value.trim(),
    operator: $('operatorInput').value.trim(),
    distanceFromEntry: Number($('entryDistance').value || 0),
    distanceUnit: $('entryUnit').value,
    nominalSize: $('nominalSize').value.trim(),
  };
}

function createSession() {
  return {
    schema: 'nullworks.remote-eye.inspection.v3',
    id: newId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {},
    source: { type: 'demo', label: 'SYNTHETIC PIPE' },
    truthBoundary: 'Measurements and machine observations are supplemental estimates until physically verified.',
    events: [],
  };
}

function addEvent(type, detail = {}, rerender = true) {
  const event = {
    seq: session.events.length + 1,
    time: new Date().toISOString(),
    type,
    state: inspectionState,
    distanceFromEntry: Number($('entryDistance').value || 0),
    distanceUnit: $('entryUnit').value,
    ...detail,
  };
  session.updatedAt = event.time;
  session.events.push(event);
  if (rerender) renderEvents();
  return event;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

function renderEvents() {
  $('eventCount').textContent = `${session.events.length} EVENTS`;
  const reversed = [...session.events].reverse();
  $('eventLog').innerHTML = reversed.length ? reversed.map((event) => {
    const detail = { ...event };
    delete detail.type; delete detail.time; delete detail.state; delete detail.seq;
    return `<div class="event"><b>#${event.seq} ${escapeHtml(event.type)}</b> · ${new Date(event.time).toLocaleTimeString()} · ${escapeHtml(event.state)}<br>${escapeHtml(JSON.stringify(detail))}</div>`;
  }).join('') : '<div class="event">Session initialized. Waiting for field evidence.</div>';
  const last = session.events.at(-1);
  $('receiptSummary').textContent = `${session.id} · ${session.events.length} events${last ? ` · last: ${last.type}` : ''}`;
}

function saveMetadata() {
  session.metadata = metadataFromInputs();
  addEvent('JOB_METADATA_SAVED', { metadata: session.metadata });
  updateHudPreview();
}

function sourceDimensions() {
  const element = frozenCanvas || activeSource.element;
  if (element === video) return { width: video.videoWidth || 1280, height: video.videoHeight || 720 };
  if (element === imageSource) return { width: imageSource.naturalWidth || 1280, height: imageSource.naturalHeight || 720 };
  return { width: demoCanvas.width || 1280, height: demoCanvas.height || 720 };
}

function contentRect() {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  const { width: sw, height: sh } = sourceDimensions();
  const scale = Math.min(vw / sw, vh / sh);
  const width = sw * scale;
  const height = sh * scale;
  return { x: (vw - width) / 2, y: (vh - height) / 2, width, height, scale, sw, sh };
}

function viewportToSource(clientX, clientY) {
  const box = overlay.getBoundingClientRect();
  const vx = clientX - box.left;
  const vy = clientY - box.top;
  const r = contentRect();
  if (vx < r.x || vy < r.y || vx > r.x + r.width || vy > r.y + r.height) return null;
  return { x: (vx - r.x) / r.scale, y: (vy - r.y) / r.scale };
}

function sourceToViewport(point) {
  const r = contentRect();
  return { x: r.x + point.x * r.scale, y: r.y + point.y * r.scale };
}

function resizeCanvases() {
  const box = viewport.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  overlay.width = Math.round(box.width * dpr);
  overlay.height = Math.round(box.height * dpr);
  overlay.style.width = `${box.width}px`;
  overlay.style.height = `${box.height}px`;
  octx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawOverlay();
}

function initializeDemo() {
  demoCanvas.width = 1280;
  demoCanvas.height = 720;
  const w = demoCanvas.width, h = demoCanvas.height;
  const gradient = dctx.createRadialGradient(w * .5, h * .5, 50, w * .5, h * .5, 720);
  gradient.addColorStop(0, '#20373c'); gradient.addColorStop(.35, '#0a1519'); gradient.addColorStop(.72, '#14262b'); gradient.addColorStop(1, '#010203');
  dctx.fillStyle = gradient; dctx.fillRect(0, 0, w, h);
  dctx.strokeStyle = 'rgba(142,190,190,.24)'; dctx.lineWidth = 9;
  for (let i = 0; i < 8; i++) {
    dctx.beginPath(); dctx.ellipse(w * .5, h * .52, 185 + i * 68, 132 + i * 48, -.05, 0, Math.PI * 2); dctx.stroke();
  }
  dctx.strokeStyle = 'rgba(255,215,91,.5)'; dctx.lineWidth = 18; dctx.beginPath(); dctx.arc(w * .59, h * .59, 95, .15, 2.1); dctx.stroke();
  dctx.fillStyle = 'rgba(255,215,91,.18)'; dctx.beginPath(); dctx.ellipse(w * .63, h * .68, 150, 42, .15, 0, Math.PI * 2); dctx.fill();
  dctx.fillStyle = '#d9f9fd'; dctx.font = '700 28px ui-monospace'; dctx.fillText('SYNTHETIC 4-IN PIPE · CALIBRATION DEMO', 34, h - 34);
}

function reticleColorFromValue(value) {
  const v = Math.max(0, Math.min(420, Number(value) || 0));
  if (v <= 30) {
    const t = v / 30;
    return `hsl(0 100% ${100 - t * 44}%)`;
  }
  if (v <= 390) return `hsl(${v - 30} 100% 58%)`;
  const t = (v - 390) / 30;
  return `hsl(0 100% ${58 * (1 - t)}%)`;
}

function reticleLabel() {
  return RETICLES.find((item) => item.id === reticleStyle)?.label || reticleStyle;
}

function updateReticleUi(logEvent = false) {
  reticleColor = reticleColorFromValue(colorDialValue);
  $('reticleSelect').value = reticleStyle;
  $('colorDial').setAttribute('aria-valuenow', String(Math.round(colorDialValue)));
  $('colorDial').setAttribute('aria-valuetext', `${reticleLabel()} ${reticleColor}`);
  $('dialArm').style.transform = `rotate(${(colorDialValue / 420) * 720}deg)`;
  $('colorSwatch').style.background = reticleColor;
  $('reticleReadout').textContent = `${reticleLabel()} · ${reticleColor}`;
  localStorage.setItem(RETICLE_KEY, JSON.stringify({ style: reticleStyle, colorDialValue }));
  drawOverlay();
  if (logEvent) addEvent('RETICLE_CHANGED', { style: reticleStyle, color: reticleColor, colorDialValue: Math.round(colorDialValue) });
}

function setReticleStyle(style, logEvent = true) {
  if (!RETICLES.some((item) => item.id === style)) return;
  reticleStyle = style;
  updateReticleUi(logEvent);
}

function cycleReticle(direction) {
  const index = RETICLES.findIndex((item) => item.id === reticleStyle);
  const next = (index + direction + RETICLES.length) % RETICLES.length;
  setReticleStyle(RETICLES[next].id);
}

function drawReticle(target, r, sourceSpace, sw, sh) {
  const cx = r.x + r.width / 2;
  const cy = r.y + r.height / 2;
  const size = Math.min(r.width, r.height);
  const u = size / 100;
  const thin = sourceSpace ? Math.max(2, sw / 720) : 1.7;
  const thick = sourceSpace ? Math.max(5, sw / 300) : 4;
  const line = (x1, y1, x2, y2, width = thin) => { target.lineWidth = width; target.beginPath(); target.moveTo(x1, y1); target.lineTo(x2, y2); target.stroke(); };
  const circle = (radius, width = thin, start = 0, end = Math.PI * 2) => { target.lineWidth = width; target.beginPath(); target.arc(cx, cy, radius, start, end); target.stroke(); };
  const dot = (radius = 1.5 * u) => { target.beginPath(); target.arc(cx, cy, radius, 0, Math.PI * 2); target.fill(); };
  const ticks = (axis, count, span, tickSize) => {
    for (let i = -count; i <= count; i++) {
      if (!i) continue;
      const offset = i * span / count;
      if (axis === 'x') line(cx + offset, cy - tickSize, cx + offset, cy + tickSize);
      else line(cx - tickSize, cy + offset, cx + tickSize, cy + offset);
    }
  };
  target.save();
  target.strokeStyle = reticleColor;
  target.fillStyle = reticleColor;
  target.lineCap = 'round';
  target.lineJoin = 'round';
  target.shadowColor = reticleColor;
  target.shadowBlur = sourceSpace ? 0 : 2;

  switch (reticleStyle) {
    case 'circle-dot':
      circle(12 * u); dot(1.7 * u); break;
    case 'ring-cross':
      circle(13 * u); line(cx - 27 * u, cy, cx - 14 * u, cy); line(cx + 14 * u, cy, cx + 27 * u, cy); line(cx, cy - 27 * u, cx, cy - 14 * u); line(cx, cy + 14 * u, cx, cy + 27 * u); dot(1.2 * u); break;
    case 'duplex':
      line(cx - 34 * u, cy, cx - 11 * u, cy, thick); line(cx + 11 * u, cy, cx + 34 * u, cy, thick); line(cx, cy - 34 * u, cx, cy - 11 * u, thick); line(cx, cy + 11 * u, cx, cy + 34 * u, thick); line(cx - 11 * u, cy, cx - 3 * u, cy); line(cx + 3 * u, cy, cx + 11 * u, cy); line(cx, cy - 11 * u, cx, cy - 3 * u); line(cx, cy + 3 * u, cx, cy + 11 * u); dot(1.2 * u); break;
    case 'box-cross':
      target.lineWidth = thin; target.strokeRect(cx - 9 * u, cy - 9 * u, 18 * u, 18 * u); line(cx - 28 * u, cy, cx - 10 * u, cy); line(cx + 10 * u, cy, cx + 28 * u, cy); line(cx, cy - 28 * u, cx, cy - 10 * u); line(cx, cy + 10 * u, cx, cy + 28 * u); break;
    case 'chevron':
      line(cx - 11 * u, cy + 6 * u, cx, cy - 6 * u, thick * .7); line(cx, cy - 6 * u, cx + 11 * u, cy + 6 * u, thick * .7); line(cx, cy + 9 * u, cx, cy + 30 * u); ticks('y', 4, 27 * u, 2.5 * u); dot(1.2 * u); break;
    case 'survey-grid':
      line(cx - 32 * u, cy, cx + 32 * u, cy); line(cx, cy - 32 * u, cx, cy + 32 * u); ticks('x', 8, 30 * u, 2 * u); ticks('y', 8, 30 * u, 2 * u); circle(5 * u); break;
    case 'concentric':
      circle(6 * u); circle(13 * u); circle(22 * u); dot(1.2 * u); break;
    case 'spot-meter':
      circle(10 * u, thick * .55); dot(2 * u); line(cx - 22 * u, cy, cx - 13 * u, cy); line(cx + 13 * u, cy, cx + 22 * u, cy); line(cx, cy - 22 * u, cx, cy - 13 * u); line(cx, cy + 13 * u, cx, cy + 22 * u); break;
    case 'corner-brackets': {
      const b = 18 * u, l = 8 * u;
      line(cx - b, cy - b, cx - b + l, cy - b, thick * .6); line(cx - b, cy - b, cx - b, cy - b + l, thick * .6);
      line(cx + b, cy - b, cx + b - l, cy - b, thick * .6); line(cx + b, cy - b, cx + b, cy - b + l, thick * .6);
      line(cx - b, cy + b, cx - b + l, cy + b, thick * .6); line(cx - b, cy + b, cx - b, cy + b - l, thick * .6);
      line(cx + b, cy + b, cx + b - l, cy + b, thick * .6); line(cx + b, cy + b, cx + b, cy + b - l, thick * .6); dot(1.5 * u); break;
    }
    case 'reference-ladder':
      line(cx, cy - 28 * u, cx, cy + 31 * u); for (let i = 0; i < 6; i++) { const y = cy + (7 + i * 5) * u; const half = (3 + i * .65) * u; line(cx - half, y, cx + half, y); } line(cx - 22 * u, cy, cx - 5 * u, cy); line(cx + 5 * u, cy, cx + 22 * u, cy); circle(3 * u); break;
    case 'lateral-bars':
      line(cx - 33 * u, cy, cx + 33 * u, cy); ticks('x', 10, 30 * u, 2.5 * u); circle(8 * u); line(cx, cy - 24 * u, cx, cy - 9 * u); line(cx, cy + 9 * u, cx, cy + 24 * u); dot(1.2 * u); break;
    case 'precision-cross':
    default:
      line(cx - 30 * u, cy, cx - 7 * u, cy); line(cx + 7 * u, cy, cx + 30 * u, cy); line(cx, cy - 30 * u, cx, cy - 7 * u); line(cx, cy + 7 * u, cx, cy + 30 * u); circle(4.5 * u); dot(1.1 * u); break;
  }
  target.restore();
}

function drawOverlay(target = octx, targetWidth = viewport.clientWidth, targetHeight = viewport.clientHeight, sourceSpace = false) {
  target.clearRect(0, 0, targetWidth, targetHeight);
  const map = sourceSpace ? (p) => p : sourceToViewport;
  const { width: sw, height: sh } = sourceDimensions();
  const r = sourceSpace ? { x: 0, y: 0, width: sw, height: sh, scale: 1 } : contentRect();

  if (gridOn) {
    target.save(); target.strokeStyle = reticleColor; target.globalAlpha = .18; target.lineWidth = sourceSpace ? Math.max(1, sw / 900) : 1;
    for (let i = 0; i <= 8; i++) { const x = r.x + r.width * i / 8; target.beginPath(); target.moveTo(x, r.y); target.lineTo(x, r.y + r.height); target.stroke(); }
    for (let i = 0; i <= 6; i++) { const y = r.y + r.height * i / 6; target.beginPath(); target.moveTo(r.x, y); target.lineTo(r.x + r.width, y); target.stroke(); }
    target.restore();
  }

  drawReticle(target, r, sourceSpace, sw, sh);

  for (const measurement of measurements) drawMeasurement(target, measurement, map, sourceSpace);
  if (tapPoints.length === 1) {
    const p = map(tapPoints[0]); target.fillStyle = '#ffd75b'; target.beginPath(); target.arc(p.x, p.y, sourceSpace ? 9 : 5, 0, Math.PI * 2); target.fill();
  }
}

function drawMeasurement(target, measurement, map, sourceSpace) {
  const a = map(measurement.a), b = map(measurement.b);
  target.strokeStyle = '#70ffad'; target.fillStyle = '#70ffad'; target.lineWidth = sourceSpace ? 4 : 2;
  target.beginPath(); target.moveTo(a.x, a.y); target.lineTo(b.x, b.y); target.stroke();
  [a, b].forEach((p) => { target.beginPath(); target.arc(p.x, p.y, sourceSpace ? 9 : 5, 0, Math.PI * 2); target.fill(); });
  target.font = `${sourceSpace ? 26 : 13}px ui-monospace`; target.fillText(measurement.label, (a.x + b.x) / 2 + 8, (a.y + b.y) / 2 - 8);
}
