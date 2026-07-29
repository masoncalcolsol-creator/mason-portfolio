const baseAddEvent = addEvent;
addEvent = function bridgedAddEvent(type, detail = {}, rerender = true) {
  const event = baseAddEvent(type, detail, rerender);
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: 'NW_REMOTE_EYE_EVENT',
        event,
        sessionId: session.id,
        source: session.source,
      },
      window.location.origin,
    );
  }
  return event;
};

const ZOOM_KEY = 'nullworks-remote-eye-zoom-v3';
let viewZoom = Math.max(1, Math.min(6, Number(localStorage.getItem(ZOOM_KEY)) || 1));
const zoomPointers = new Map();
let pinchStartDistance = 0;
let pinchStartZoom = viewZoom;
let pinchMoved = false;

function setViewZoom(value, logEvent = true) {
  const next = Math.max(1, Math.min(6, Math.round((Number(value) || 1) * 10) / 10));
  viewZoom = next;
  viewport.style.setProperty('--source-zoom', String(viewZoom));
  viewport.classList.toggle('zooming', viewZoom > 1);
  const label = `${viewZoom.toFixed(1)}×`;
  $('zoomReadout').textContent = `ZOOM: ${label}`;
  $('zoomResetBtn').textContent = label;
  localStorage.setItem(ZOOM_KEY, String(viewZoom));
  if (logEvent) addEvent('VIEW_ZOOM_CHANGED', { zoom: viewZoom, visualAidOnly: true });
}

function setColorDialValue(value, logEvent = false) {
  colorDialValue = Math.max(0, Math.min(420, Number(value) || 0));
  updateReticleUi(logEvent);
}

function setupColorDial() {
  const dial = $('colorDial');
  let active = false;
  let lastAngle = 0;
  const angleFor = (event) => {
    const box = dial.getBoundingClientRect();
    return Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180 / Math.PI;
  };
  dial.addEventListener('pointerdown', (event) => {
    active = true; lastAngle = angleFor(event); dial.setPointerCapture(event.pointerId); event.preventDefault();
  });
  dial.addEventListener('pointermove', (event) => {
    if (!active) return;
    const angle = angleFor(event);
    let delta = angle - lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngle = angle;
    setColorDialValue(colorDialValue + delta * (420 / 720), false);
  });
  const finish = () => { if (!active) return; active = false; addEvent('RETICLE_COLOR_CHANGED', { color: reticleColor, colorDialValue: Math.round(colorDialValue) }); };
  dial.addEventListener('pointerup', finish); dial.addEventListener('pointercancel', finish);
  dial.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') setColorDialValue(0, true);
    else if (event.key === 'End') setColorDialValue(420, true);
    else setColorDialValue(colorDialValue + (event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 3 : -3), true);
  });
}

function fallbackFullscreenToggle() {
  pseudoFullscreen = !pseudoFullscreen;
  viewport.classList.toggle('pseudo-fullscreen', pseudoFullscreen);
  document.body.classList.toggle('viewport-expanded', pseudoFullscreen);
  setTimeout(resizeCanvases, 30);
}

async function toggleViewportFullscreen() {
  const now = Date.now();
  if (now - lastFullscreenToggle < 500) return;
  lastFullscreenToggle = now;
  try {
    if (document.fullscreenElement === viewport) await document.exitFullscreen();
    else if (document.fullscreenElement) await document.exitFullscreen();
    else if (viewport.requestFullscreen) await viewport.requestFullscreen({ navigationUI: 'hide' });
    else fallbackFullscreenToggle();
  } catch {
    fallbackFullscreenToggle();
  }
  addEvent('VIEWPORT_MODE_TOGGLED', { fullscreen: document.fullscreenElement === viewport || pseudoFullscreen });
  setTimeout(resizeCanvases, 50);
}

function pointerDistance() {
  const values = [...zoomPointers.values()];
  if (values.length < 2) return 0;
  return Math.hypot(values[1].x - values[0].x, values[1].y - values[0].y);
}

function setupViewportGestures() {
  viewport.addEventListener('dblclick', (event) => {
    if (inputMode !== 'idle') return;
    event.preventDefault();
    toggleViewportFullscreen();
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' || inputMode !== 'idle') return;
    zoomPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    try { viewport.setPointerCapture(event.pointerId); } catch {}
    if (zoomPointers.size === 2) {
      pinchStartDistance = pointerDistance();
      pinchStartZoom = viewZoom;
      pinchMoved = false;
    }
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!zoomPointers.has(event.pointerId) || inputMode !== 'idle') return;
    zoomPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (zoomPointers.size === 2 && pinchStartDistance > 0) {
      const distance = pointerDistance();
      if (Math.abs(distance - pinchStartDistance) > 8) pinchMoved = true;
      setViewZoom(pinchStartZoom * (distance / pinchStartDistance), false);
      event.preventDefault();
    }
  });

  const finishPointer = (event) => {
    if (event.pointerType !== 'touch') return;
    const wasPinching = zoomPointers.size > 1 || pinchMoved;
    zoomPointers.delete(event.pointerId);
    if (zoomPointers.size < 2) pinchStartDistance = 0;
    if (wasPinching) {
      if (zoomPointers.size === 0) addEvent('VIEW_ZOOM_CHANGED', { zoom: viewZoom, visualAidOnly: true, source: 'pinch' });
      return;
    }
    if (inputMode !== 'idle') return;
    const now = Date.now();
    if (now - lastTouchTap < 360) {
      event.preventDefault();
      lastTouchTap = 0;
      toggleViewportFullscreen();
    } else {
      lastTouchTap = now;
    }
  };

  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  viewport.addEventListener('wheel', (event) => {
    if (!event.ctrlKey && Math.abs(event.deltaY) < 1) return;
    event.preventDefault();
    setViewZoom(viewZoom + (event.deltaY < 0 ? 0.2 : -0.2));
  }, { passive: false });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && pseudoFullscreen) return;
    document.body.classList.toggle('viewport-expanded', document.fullscreenElement === viewport);
    setTimeout(resizeCanvases, 40);
  });
}

function voiceCommand(transcript) {
  const command = transcript.toLowerCase().trim(); addEvent('VOICE_COMMAND', { transcript });
  if (command.includes('freeze')) freezeToggle();
  else if (command.includes('capture')) captureEvidencePair();
  else if (command.includes('grid off')) { gridOn = false; $('gridBtn').textContent = 'Grid Off'; drawOverlay(); }
  else if (command.includes('grid on') || command === 'grid') { gridOn = true; $('gridBtn').textContent = 'Grid On'; drawOverlay(); }
  else if (command.includes('zoom in')) setViewZoom(viewZoom + .5);
  else if (command.includes('zoom out')) setViewZoom(viewZoom - .5);
  else if (command.includes('reset zoom') || command.includes('zoom one')) setViewZoom(1);
  else if (command.includes('mark red')) setState('RED');
  else if (command.includes('mark green')) setState('GREEN');
  else if (command.includes('mark yellow')) setState('YELLOW');
  else if (command.includes('clear marks')) clearMarks();
  else if (command.includes('measure')) setInputMode('measure');
  else if (command.includes('calibrate')) setInputMode('calibrate');
  else if (command.includes('next reticle')) cycleReticle(1);
  else if (command.includes('previous reticle') || command.includes('back reticle')) cycleReticle(-1);
  else if (command.includes('reticle white')) setColorDialValue(0, true);
  else if (command.includes('reticle black')) setColorDialValue(420, true);
  else if (command.includes('full screen') || command.includes('fullscreen')) toggleViewportFullscreen();
  else if (command.includes('send hud') || command.includes('halo')) sendHalo();
}

function toggleVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { alert('Speech recognition is unavailable. Chrome on Android is the primary target.'); return; }
  if (recognition) { recognition.stop(); recognition = null; $('voiceState').textContent = 'VOICE: OFF'; $('voiceBtn').textContent = 'Start Voice'; return; }
  recognition = new SpeechRecognition(); recognition.continuous = true; recognition.interimResults = false; recognition.lang = 'en-US';
  recognition.onresult = (event) => voiceCommand(event.results[event.results.length - 1][0].transcript);
  recognition.onend = () => { if (recognition) { try { recognition.start(); } catch {} } };
  recognition.onerror = (event) => addEvent('VOICE_ERROR', { error: event.error });
  recognition.start(); $('voiceState').textContent = 'VOICE: LISTENING'; $('voiceBtn').textContent = 'Stop Voice';
}

$('cameraBtn').onclick = usePhoneCamera;
$('fileInput').onchange = (event) => openFile(event.target.files[0]);
$('streamBtn').onclick = connectStream;
$('demoBtn').onclick = useDemo;
$('freezeBtn').onclick = freezeToggle;
$('captureBtn').onclick = captureEvidencePair;
$('voiceBtn').onclick = toggleVoice;
$('gridBtn').onclick = () => { gridOn = !gridOn; $('gridBtn').textContent = gridOn ? 'Grid On' : 'Grid Off'; drawOverlay(); addEvent('GRID_TOGGLED', { enabled: gridOn }); };
$('zoomOutBtn').onclick = () => setViewZoom(viewZoom - .25);
$('zoomResetBtn').onclick = () => setViewZoom(1);
$('zoomInBtn').onclick = () => setViewZoom(viewZoom + .25);
$('clearBtn').onclick = clearMarks;
$('calibrateBtn').onclick = () => setInputMode('calibrate');
$('measureBtn').onclick = () => setInputMode('measure');
$('cancelModeBtn').onclick = () => setInputMode('idle');
$('markBtn').onclick = logFinding;
$('saveMetaBtn').onclick = saveMetadata;
$('exportBtn').onclick = exportInspection;
$('copyBtn').onclick = copySummary;
$('saveSessionBtn').onclick = saveSessionLocal;
$('loadSessionBtn').onclick = loadMostRecent;
$('newSessionBtn').onclick = startNewSession;
$('downloadLogBtn').onclick = downloadEventCsv;
$('haloConnectBtn').onclick = connectHalo;
$('haloSendBtn').onclick = sendHalo;
$('haloClearBtn').onclick = clearHalo;
$('haloDisconnectBtn').onclick = disconnectHalo;
$('reticlePrev').onclick = () => cycleReticle(-1);
$('reticleNext').onclick = () => cycleReticle(1);
$('reticleSelect').onchange = (event) => setReticleStyle(event.target.value);
$('colorWhite').onclick = () => setColorDialValue(0, true);
$('colorBlack').onclick = () => setColorDialValue(420, true);
document.querySelectorAll('[data-state]').forEach((button) => button.onclick = () => setState(button.dataset.state));
$('entryDistance').addEventListener('input', updateHudPreview);
$('entryUnit').addEventListener('change', updateHudPreview);

window.addEventListener('keydown', (event) => {
  const target = event.target;
  const typing = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
  if (typing) return;
  if (event.key === '+' || event.key === '=') { event.preventDefault(); setViewZoom(viewZoom + .25); }
  else if (event.key === '-' || event.key === '_') { event.preventDefault(); setViewZoom(viewZoom - .25); }
  else if (event.key === '0') { event.preventDefault(); setViewZoom(1); }
  else if (event.key.toLowerCase() === 'g') { event.preventDefault(); $('gridBtn').click(); }
  else if (event.key.toLowerCase() === 'r') { event.preventDefault(); cycleReticle(1); }
  else if (event.key === '[') { event.preventDefault(); setColorDialValue(colorDialValue - 4, true); }
  else if (event.key === ']') { event.preventDefault(); setColorDialValue(colorDialValue + 4, true); }
  else if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleViewportFullscreen(); }
  else if (event.code === 'Space') { event.preventDefault(); captureEvidencePair(); }
});

setInterval(() => {
  const seconds = Math.floor((Date.now() - sessionStart) / 1000);
  $('sessionClock').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}, 1000);

window.addEventListener('resize', resizeCanvases);
new ResizeObserver(resizeCanvases).observe(viewport);

const savedReticle = JSON.parse(localStorage.getItem(RETICLE_KEY) || '{}');
if (RETICLES.some((item) => item.id === savedReticle.style)) reticleStyle = savedReticle.style;
if (Number.isFinite(savedReticle.colorDialValue)) colorDialValue = savedReticle.colorDialValue;
setupColorDial();
setupViewportGestures();
updateReticleUi(false);
setViewZoom(viewZoom, false);
initializeDemo();
demoCanvas.style.display = 'block';
resizeCanvases();
setState('YELLOW');
renderEvents();
addEvent('SESSION_STARTED');
updateHudPreview();

window.__roeBoot = true;
const bootFailure = document.getElementById('bootFailure');
if (bootFailure) bootFailure.hidden = true;
document.documentElement.dataset.remoteEyeBoot = 'ready';
if (window.parent !== window) {
  window.parent.postMessage({ type: 'NW_REMOTE_EYE_READY', sessionId: session.id }, window.location.origin);
}
console.info('NULLWORKS Remote Eye V3.2 booted');
