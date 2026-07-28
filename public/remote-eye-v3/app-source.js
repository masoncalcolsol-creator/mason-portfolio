function stopMedia() {
  if (mediaStream) { mediaStream.getTracks().forEach((track) => track.stop()); mediaStream = null; }
  if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
}

function setSource(type, label, element) {
  activeSource = { type, label, element };
  session.source = { type, label };
  video.style.display = 'none'; imageSource.style.display = 'none'; demoCanvas.style.display = 'none';
  element.style.display = 'block';
  $('sourceState').textContent = `SOURCE: ${label.toUpperCase()}`;
  $('sourceReadout').textContent = label.toUpperCase();
  $('sourceDetail').textContent = `${label} is active.`;
  calibration = null; measurements = []; tapPoints = []; inputMode = 'idle';
  updateScaleReadout(); drawOverlay();
  addEvent('SOURCE_SELECTED', { source: session.source });
}

async function usePhoneCamera() {
  try {
    stopMedia();
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
    video.srcObject = mediaStream; video.removeAttribute('src'); video.controls = false; await video.play();
    setSource('video', 'PHONE CAMERA', video);
  } catch (error) { alert(`Camera unavailable: ${error.message}`); }
}

function openFile(file) {
  if (!file) return;
  stopMedia(); objectUrl = URL.createObjectURL(file);
  if (file.type.startsWith('video/')) {
    video.srcObject = null; video.src = objectUrl; video.controls = true; video.loop = true; video.play();
    setSource('video-file', file.name, video);
  } else {
    imageSource.removeAttribute('crossorigin'); imageSource.src = objectUrl;
    imageSource.onload = () => { setSource('image-file', file.name, imageSource); resizeCanvases(); };
  }
}

function connectStream() {
  const url = $('streamUrl').value.trim(); if (!url) return;
  stopMedia(); imageSource.crossOrigin = 'anonymous';
  imageSource.onerror = () => alert('Stream could not be displayed. Confirm the URL, phone network, and whether it is JPEG/MJPEG. Same-origin streams are best for evidence capture.');
  imageSource.onload = () => resizeCanvases();
  imageSource.src = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  setSource('mjpeg', url, imageSource);
}

function useDemo() {
  stopMedia(); setSource('demo', 'SYNTHETIC PIPE', demoCanvas);
}

function sourceElement() { return frozenCanvas || activeSource.element; }

function renderSourceToCanvas(canvas) {
  const { width, height } = sourceDimensions();
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height);
  const element = sourceElement();
  try { ctx.drawImage(element, 0, 0, width, height); }
  catch { throw new Error('Browser blocked source capture. Use a same-origin Optical Eye stream or a local image/video file.'); }
}

function freezeToggle() {
  if (!frozen) {
    frozenCanvas = document.createElement('canvas');
    try { renderSourceToCanvas(frozenCanvas); }
    catch (error) { frozenCanvas = null; alert(error.message); return; }
    if (activeSource.element === video) video.pause();
    frozen = true; $('freezeBadge').classList.remove('hidden'); $('freezeBtn').textContent = 'Unfreeze'; addEvent('SOURCE_FROZEN');
  } else {
    frozenCanvas = null; if (activeSource.element === video) video.play();
    frozen = false; $('freezeBadge').classList.add('hidden'); $('freezeBtn').textContent = 'Freeze'; addEvent('SOURCE_UNFROZEN');
  }
}

function downloadBlob(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1200);
}

function canvasBlob(canvas, type = 'image/png') { return new Promise((resolve) => canvas.toBlob(resolve, type)); }

async function captureEvidencePair() {
  const sourceCanvas = document.createElement('canvas');
  try { renderSourceToCanvas(sourceCanvas); }
  catch (error) { alert(error.message); return; }
  const annotatedCanvas = document.createElement('canvas'); annotatedCanvas.width = sourceCanvas.width; annotatedCanvas.height = sourceCanvas.height;
  const ctx = annotatedCanvas.getContext('2d'); ctx.drawImage(sourceCanvas, 0, 0); drawOverlay(ctx, annotatedCanvas.width, annotatedCanvas.height, true);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const [sourceBlob, annotatedBlob] = await Promise.all([canvasBlob(sourceCanvas), canvasBlob(annotatedCanvas)]);
  downloadBlob(sourceBlob, `${session.id}_${stamp}_SOURCE.png`);
  setTimeout(() => downloadBlob(annotatedBlob, `${session.id}_${stamp}_ANNOTATED.png`), 350);
  addEvent('EVIDENCE_PAIR_EXPORTED', { source: 'SOURCE.png', annotated: 'ANNOTATED.png', width: sourceCanvas.width, height: sourceCanvas.height });
}

function setInputMode(mode) {
  inputMode = mode; tapPoints = [];
  $('calibrationStatus').textContent = mode === 'calibrate' ? 'Tap two endpoints of the known reference.' : mode === 'measure' ? 'Tap two endpoints to measure.' : calibration ? `Scale locked: ${calibration.pixelsPerUnit.toFixed(2)} source px/${calibration.unit}` : 'Calibration not set';
  drawOverlay();
}

overlay.addEventListener('pointerdown', (event) => {
  if (!['calibrate', 'measure'].includes(inputMode)) return;
  const point = viewportToSource(event.clientX, event.clientY); if (!point) return;
  tapPoints.push(point);
  if (tapPoints.length === 2) {
    const [a, b] = tapPoints; const pixelDistance = Math.hypot(b.x - a.x, b.y - a.y);
    if (inputMode === 'calibrate') {
      const known = Number($('knownValue').value);
      if (!known || known <= 0) { alert('Enter a valid known reference.'); tapPoints = []; return; }
      calibration = { pixelsPerUnit: pixelDistance / known, unit: $('unitSelect').value, knownValue: known, a, b };
      addEvent('CALIBRATION_SET', { knownValue: known, unit: calibration.unit, sourcePixelDistance: pixelDistance, pixelsPerUnit: calibration.pixelsPerUnit });
    } else {
      if (!calibration) { alert('Calibrate a known reference first.'); tapPoints = []; return; }
      const value = pixelDistance / calibration.pixelsPerUnit;
      const measurement = { id: measurements.length + 1, a, b, value, unit: calibration.unit, label: `${value.toFixed(2)} ${calibration.unit}`, verified: false };
      measurements.push(measurement);
      addEvent('MEASUREMENT_ESTIMATE', measurement);
    }
    tapPoints = []; inputMode = 'idle'; updateScaleReadout(); updateHudPreview();
  }
  drawOverlay();
});
