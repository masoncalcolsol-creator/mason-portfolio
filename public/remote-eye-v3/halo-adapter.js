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
