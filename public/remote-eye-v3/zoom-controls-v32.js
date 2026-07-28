/* NULLWORKS Remote Eye V3.2 — fullscreen pinch/camera zoom controls */
(() => {
  'use strict';

  let zoomLevel = 1;
  let zoomMode = 'digital';
  let pinchStartDistance = 0;
  let pinchStartZoom = 1;
  let pinching = false;
  let suppressTapUntil = 0;
  const pointers = new Map();

  const isExpanded = () => document.fullscreenElement === viewport || pseudoFullscreen || viewport.classList.contains('pseudo-fullscreen');
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function activeVideoTrack() {
    if (activeSource?.type !== 'video' || !mediaStream) return null;
    return mediaStream.getVideoTracks?.()[0] || null;
  }

  function cameraZoomRange() {
    const track = activeVideoTrack();
    if (!track || typeof track.getCapabilities !== 'function') return null;
    const capability = track.getCapabilities()?.zoom;
    if (!capability || !Number.isFinite(capability.min) || !Number.isFinite(capability.max)) return null;
    return {
      track,
      min: capability.min,
      max: capability.max,
      step: Number.isFinite(capability.step) && capability.step > 0 ? capability.step : 0.1,
      current: track.getSettings?.().zoom || capability.min,
    };
  }

  function clearDigitalTransform() {
    [video, imageSource, demoCanvas].forEach((element) => {
      element.style.transform = '';
      element.style.transformOrigin = '';
    });
  }

  function applyDigitalTransform(value) {
    clearDigitalTransform();
    const element = activeSource?.element;
    if (!element) return;
    element.style.transformOrigin = '50% 50%';
    element.style.transform = `scale(${value})`;
  }

  function updateZoomUi() {
    const value = `${zoomLevel.toFixed(1)}×`;
    const readout = document.getElementById('zoomReadout');
    const mode = document.getElementById('zoomMode');
    if (readout) readout.textContent = value;
    if (mode) mode.textContent = zoomMode === 'camera' ? 'CAM' : 'DIG';
  }

  async function setInspectionZoom(requested, logEvent = false) {
    let next = Number(requested);
    if (!Number.isFinite(next)) return;

    const camera = cameraZoomRange();
    if (camera) {
      const stepped = Math.round(clamp(next, camera.min, camera.max) / camera.step) * camera.step;
      try {
        await camera.track.applyConstraints({ advanced: [{ zoom: clamp(stepped, camera.min, camera.max) }] });
        zoomLevel = camera.track.getSettings?.().zoom || clamp(stepped, camera.min, camera.max);
        zoomMode = 'camera';
        clearDigitalTransform();
      } catch {
        zoomLevel = clamp(next, 1, 8);
        zoomMode = 'digital';
        applyDigitalTransform(zoomLevel);
      }
    } else {
      zoomLevel = clamp(next, 1, 8);
      zoomMode = 'digital';
      applyDigitalTransform(zoomLevel);
    }

    updateZoomUi();
    if (logEvent && typeof addEvent === 'function') {
      addEvent('VIEW_ZOOM_CHANGED', { zoom: Number(zoomLevel.toFixed(2)), mode: zoomMode });
    }
  }

  function resetZoom(logEvent = false) {
    zoomLevel = 1;
    zoomMode = 'digital';
    clearDigitalTransform();
    const camera = cameraZoomRange();
    if (camera) {
      setInspectionZoom(camera.min, logEvent);
      return;
    }
    updateZoomUi();
    if (logEvent && typeof addEvent === 'function') addEvent('VIEW_ZOOM_RESET', { zoom: 1, mode: zoomMode });
  }

  function pointerDistance() {
    const points = [...pointers.values()];
    if (points.length < 2) return 0;
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  }

  function setupPinchZoom() {
    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch' || !isExpanded() || inputMode !== 'idle') return;
      if (event.target.closest?.('.floating-color-control,.floating-zoom-control')) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      try { viewport.setPointerCapture(event.pointerId); } catch {}
      if (pointers.size === 2) {
        pinching = true;
        suppressTapUntil = Date.now() + 700;
        lastTouchTap = 0;
        pinchStartDistance = pointerDistance() || 1;
        pinchStartZoom = zoomLevel;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    viewport.addEventListener('pointermove', (event) => {
      if (!pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (!pinching || pointers.size < 2) return;
      const ratio = pointerDistance() / pinchStartDistance;
      setInspectionZoom(pinchStartZoom * ratio, false);
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);

    const finish = (event) => {
      if (!pointers.has(event.pointerId)) return;
      pointers.delete(event.pointerId);
      if (pinching) {
        suppressTapUntil = Date.now() + 700;
        lastTouchTap = 0;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (pointers.size < 2) {
          pinching = false;
          setInspectionZoom(zoomLevel, true);
        }
      }
    };

    viewport.addEventListener('pointerup', finish, true);
    viewport.addEventListener('pointercancel', finish, true);
    viewport.addEventListener('pointerup', (event) => {
      if (Date.now() < suppressTapUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  function createZoomControl() {
    const control = document.createElement('div');
    control.className = 'floating-zoom-control';
    control.setAttribute('aria-label', 'Viewfinder zoom control');
    control.innerHTML = `
      <button type="button" id="zoomOut" aria-label="Zoom out">−</button>
      <button type="button" id="zoomReadout" class="zoom-readout" aria-label="Reset zoom">1.0×</button>
      <button type="button" id="zoomIn" aria-label="Zoom in">+</button>
      <span id="zoomMode" class="zoom-mode">DIG</span>
    `;
    viewport.appendChild(control);

    const style = document.createElement('style');
    style.textContent = `
      .floating-zoom-control{position:absolute;left:10px;bottom:38px;z-index:25;display:grid;grid-template-columns:32px 52px 32px;gap:4px;align-items:center;padding:5px;border:1px solid rgba(101,239,255,.34);border-radius:13px;background:rgba(2,7,11,.64);backdrop-filter:blur(8px);box-shadow:0 8px 24px rgba(0,0,0,.38)}
      .floating-zoom-control button{min-width:0;padding:6px 4px;border-radius:8px;font-size:.78rem;line-height:1}
      .floating-zoom-control .zoom-readout{font:800 .68rem ui-monospace}
      .floating-zoom-control .zoom-mode{grid-column:1/-1;text-align:center;font:800 .48rem ui-monospace;color:#a8c8cf;letter-spacing:.12em}
      .viewport:fullscreen .floating-zoom-control,.viewport.pseudo-fullscreen .floating-zoom-control{left:max(12px,env(safe-area-inset-left));bottom:max(42px,env(safe-area-inset-bottom));transform:scale(1.08);transform-origin:left bottom}
    `;
    document.head.appendChild(style);

    ['pointerdown','pointerup','pointermove','dblclick','click','touchstart','touchend'].forEach((type) => {
      control.addEventListener(type, (event) => event.stopPropagation(), { passive: type.startsWith('touch') });
    });

    control.querySelector('#zoomOut').addEventListener('click', () => setInspectionZoom(zoomLevel - 0.25, true));
    control.querySelector('#zoomIn').addEventListener('click', () => setInspectionZoom(zoomLevel + 0.25, true));
    control.querySelector('#zoomReadout').addEventListener('click', () => resetZoom(true));
  }

  function setupZoomKeys() {
    document.addEventListener('keydown', (event) => {
      const tag = event.target?.tagName;
      if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
      const zoomIn = event.key === '+' || event.key === '=' || event.key === 'PageUp';
      const zoomOut = event.key === '-' || event.key === '_' || event.key === 'PageDown';
      const reset = event.key === '0';
      if (!zoomIn && !zoomOut && !reset) return;
      event.preventDefault();
      if (reset) resetZoom(true);
      else setInspectionZoom(zoomLevel + (zoomIn ? 0.25 : -0.25), true);
    });
  }

  function setupSourceReset() {
    const sourceState = document.getElementById('sourceState');
    if (!sourceState) return;
    new MutationObserver(() => resetZoom(false)).observe(sourceState, { childList: true, subtree: true });
  }

  window.setInspectionZoom = setInspectionZoom;
  window.resetInspectionZoom = resetZoom;
  createZoomControl();
  setupPinchZoom();
  setupZoomKeys();
  setupSourceReset();
  updateZoomUi();

  if (typeof addEvent === 'function') {
    addEvent('FULLSCREEN_ZOOM_ENABLED', {
      pinch: true,
      cameraZoomWhenSupported: true,
      digitalFallback: true,
      hidKeys: ['+', '-', 'PageUp', 'PageDown', '0'],
      phoneVolumeKeys: 'OS_RESERVED_IN_BROWSER',
    });
  }
})();