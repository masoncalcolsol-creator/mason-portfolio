class HaloAdapter {
  constructor(onStatus = () => {}) {
    this.ble = null;
    this.connected = false;
    this.onStatus = onStatus;
  }

  async loadSdk() {
    if (this.BrilliantBle) return;
    this.onStatus('Loading official Brilliant Web Bluetooth SDK…');
    const sdk = await import('https://unpkg.com/brilliant-ble@0.4.0/dist/brilliant-ble.es.js');
    this.BrilliantBle = sdk.BrilliantBle;
    this.DeviceType = sdk.BrilliantDeviceType;
  }

  async connect() {
    if (!navigator.bluetooth) throw new Error('Web Bluetooth is unavailable. Use Chrome or Edge on Android/desktop over HTTPS.');
    await this.loadSdk();
    this.ble = new this.BrilliantBle();
    this.onStatus('Choose Halo in the Bluetooth picker…');
    await this.ble.connect();
    this.connected = true;
    const type = this.ble.type ?? 'UNKNOWN';
    this.onStatus(`Connected to Brilliant device: ${String(type)}`);
    await this.sendLua('frame.stay_awake(true)');
    return type;
  }

  async disconnect() {
    if (this.ble) await this.ble.disconnect();
    this.connected = false;
    this.ble = null;
    this.onStatus('Halo disconnected.');
  }

  async sendLua(command, awaitPrint = false) {
    if (!this.connected || !this.ble) throw new Error('Halo is not connected.');
    return this.ble.sendLua(command, { awaitPrint });
  }

  sanitize(text, max = 22) {
    return String(text ?? '')
      .replace(/[^A-Za-z0-9 .:%+\-/]/g, '')
      .slice(0, max);
  }

  stateColor(state) {
    return state === 'GREEN' ? '0x70FFAD' : state === 'RED' ? '0xFF626F' : '0xFFD75B';
  }

  async clear() {
    await this.sendLua('frame.display.clear(0x000000)');
  }

  async displayCard(card) {
    const state = this.sanitize(card.state || 'YELLOW', 8);
    const distance = this.sanitize(card.distance || '0.0 ft', 16);
    const measurement = this.sanitize(card.measurement || 'NO SCALE', 18);
    const message = this.sanitize(card.message || 'READY', 22);
    const color = this.stateColor(state);

    await this.sendLua('frame.display.clear(0x000000)');
    await this.sendLua('frame.display.circle(128,128,123,0x2B6672,false)');
    await this.sendLua(`frame.display.text("${state}",82,43,${color})`);
    await this.sendLua(`frame.display.text("${distance}",74,82,0xFFFFFF)`);
    await this.sendLua(`frame.display.text("${measurement}",55,120,0x70FFAD)`);
    await this.sendLua(`frame.display.text("${message}",36,162,0xCDEFF5)`);
    await this.sendLua('frame.display.line(55,151,201,151,0x2B6672)');
    this.onStatus('Current inspection HUD sent to Halo.');
  }
}

/* V3.1 additive field patch: keep the proven rotary control inside the viewfinder. */
window.addEventListener('load', () => {
  const viewport = document.getElementById('viewport');
  const colorControl = document.querySelector('.color-control');
  const dial = document.getElementById('colorDial');
  if (!viewport || !colorControl || !dial) return;

  const style = document.createElement('style');
  style.textContent = `
    .reticle-layout{grid-template-columns:1fr!important}
    .floating-color-control{position:absolute!important;right:12px;bottom:38px;z-index:24;width:104px;padding:7px;border:1px solid rgba(101,239,255,.36);border-radius:16px;background:rgba(2,7,11,.64);backdrop-filter:blur(8px);box-shadow:0 8px 28px rgba(0,0,0,.42);gap:4px!important;transition:opacity .18s ease,transform .18s ease}
    .floating-color-control .color-dial{width:86px!important;height:86px!important}
    .floating-color-control .color-swatch{inset:27px!important}
    .floating-color-control .dial-arm{inset:4px!important}
    .floating-color-control .dial-arm span{height:18px!important;width:7px!important}
    .floating-color-control .dial-label{font-size:.52rem!important;letter-spacing:.06em!important}
    .floating-color-control .compact{grid-template-columns:1fr 1fr!important;gap:4px!important;margin:0!important}
    .floating-color-control .compact button{padding:5px 3px!important;font-size:.57rem!important;border-radius:7px!important}
    .viewport:fullscreen .floating-color-control,.viewport.pseudo-fullscreen .floating-color-control{right:max(14px,env(safe-area-inset-right));bottom:max(42px,env(safe-area-inset-bottom));transform:scale(1.08);transform-origin:right bottom;background:rgba(2,7,11,.54)}
    @media(max-width:430px){.floating-color-control{right:8px;bottom:34px;width:94px;padding:5px}.floating-color-control .color-dial{width:76px!important;height:76px!important}.floating-color-control .color-swatch{inset:24px!important}.floating-color-control .compact button{font-size:.52rem!important}}
  `;
  document.head.appendChild(style);

  colorControl.classList.add('floating-color-control');
  colorControl.setAttribute('aria-label', 'Floating reticle color screw');
  viewport.appendChild(colorControl);

  ['pointerdown','pointerup','pointermove','dblclick','click','touchstart','touchend'].forEach((type) => {
    colorControl.addEventListener(type, (event) => event.stopPropagation(), { passive: type.startsWith('touch') });
  });

  const adjust = (delta) => {
    const current = Number(dial.getAttribute('aria-valuenow') || 0);
    if (typeof window.setColorDialValue === 'function') window.setColorDialValue(current + delta, true);
  };

  document.addEventListener('keydown', (event) => {
    const tag = event.target?.tagName;
    if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
    const decrease = event.key === '[' || event.key === 'PageDown' || (event.shiftKey && event.key === 'ArrowLeft');
    const increase = event.key === ']' || event.key === 'PageUp' || (event.shiftKey && event.key === 'ArrowRight');
    if (!decrease && !increase) return;
    event.preventDefault();
    adjust(increase ? 6 : -6);
  });

  if (typeof window.addEvent === 'function') window.addEvent('FLOATING_COLOR_SCREW_ENABLED', { controls: ['touch rotary', '[ and ]', 'PageUp/PageDown', 'Shift+Arrow'] });
});
