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

function setupDoubleTapFullscreen() {
  viewport.addEventListener('dblclick', (event) => {
    if (inputMode !== 'idle') return;
    event.preventDefault(); toggleViewportFullscreen();
  });
  viewport.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'touch' || inputMode !== 'idle') return;
    const now = Date.now();
    if (now - lastTouchTap < 360) { event.preventDefault(); lastTouchTap = 0; toggleViewportFullscreen(); }
    else lastTouchTap = now;
  });
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

setInterval(() => {
  const seconds = Math.floor((Date.now() - sessionStart) / 1000);
  $('sessionClock').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}, 1000);

window.addEventListener('resize', resizeCanvases);
new ResizeObserver(resizeCanvases).observe(viewport);

const savedReticle = JSON.parse(localStorage.getItem(RETICLE_KEY) || '{}');
if (RETICLES.some((item) => item.id === savedReticle.style)) reticleStyle = savedReticle.style;
if (Number.isFinite(savedReticle.colorDialValue)) colorDialValue = savedReticle.colorDialValue;
setupColorDial(); setupDoubleTapFullscreen(); updateReticleUi(false);
initializeDemo(); demoCanvas.style.display = 'block'; resizeCanvases(); setState('YELLOW'); renderEvents(); addEvent('SESSION_STARTED'); updateHudPreview();

window.__roeBoot = true;
const bootFailure = document.getElementById('bootFailure');
if (bootFailure) bootFailure.hidden = true;
document.documentElement.dataset.remoteEyeBoot = 'ready';
console.info('NULLWORKS Remote Eye V3 booted');
