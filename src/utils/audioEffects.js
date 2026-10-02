// Web Audio API procedural: Sonidos espaciales táctiles de micro-latencia (Cero archivos MP3 externos)
class AudioManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Bip suave y sutil de interfaz táctica al hacer clic en opciones
  playBlip(freq = 520, duration = 0.04) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // Sonido de escaneo / avance de fase
  playScanTone() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // Acorde armónico de victoria o éxito al confirmar cita / validar
  playSuccessChord() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A major chord
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const startTime = this.ctx.currentTime + idx * 0.04;
        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {}
  }

  // Sonido de propulsión / distorsión orbital gravitacional al viajar entre planetas
  playOrbitWarp() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Beep holográfico al seleccionar un planeta o satélite
  playPlanetSelect() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [587.33, 880]; // D5, A5
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.05, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.12);
      });
    } catch (e) {}
  }
}

export const soundFx = new AudioManager();

export const playPlanetSelect = () => soundFx.playPlanetSelect();
export const playOrbitWarp = () => soundFx.playOrbitWarp();
export const playTap = () => soundFx.playBlip(620, 0.03);
export const playSuccess = () => soundFx.playSuccessChord();

/**
 * 🌌 CelestialAmbientDrone - Sonido Angelical & Cósmico Perpetuo de La Galaxia Dynamind
 * - Frecuencias sagradas Solfeggio 432 Hz y 528 Hz (Paz mental, orden armónico y mística cósmica).
 * - Armónicos etéreos de baja ganancia con resonancia cálida en 864 Hz y 1056 Hz.
 * - Filtro passa-bajos Biquad de 680 Hz con Q=1.6 para un tono sedoso no estridente.
 * - LFO de modulación orgánica que hace respirar a la galaxia a 60 FPS.
 * - Shimmer celestial esporádico (campanas estelares de cristal cósmico).
 * - Sonido de fondo por defecto ininterrumpido.
 */
class CelestialAmbientDrone {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filter = null;
    this.oscillators = [];
    this.isRunning = false;
    this.chimeInterval = null;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  start() {
    if (this.isRunning) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master Gain con fade-in celestial suave de 3.2 segundos
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.045, now + 3.2);

      // Filtro pasa-bajos cálido para sonido sedoso y angelical
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(680, now);
      this.filter.Q.setValueAtTime(1.6, now);

      // Conexión en cadena: Filtro -> MasterGain -> Destination
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Frecuencias cósmicas angelicales (432Hz y 528Hz Solfeggio)
      const celestialPitches = [
        { freq: 216.0, type: 'sine', vol: 0.08 },    // Sub-raíz profunda
        { freq: 432.0, type: 'sine', vol: 0.12 },    // Frecuencia sagrada 432Hz
        { freq: 528.0, type: 'sine', vol: 0.09 },    // Frecuencia Solfeggio 528Hz
        { freq: 648.0, type: 'sine', vol: 0.04 },    // Armónico de quinta cósmica
        { freq: 864.0, type: 'sine', vol: 0.025 },   // Octava brillante suave
        { freq: 1056.0, type: 'sine', vol: 0.015 }   // Shimmer etéreo sutil
      ];

      this.oscillators = [];

      celestialPitches.forEach(({ freq, type, vol }, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Desafinado micrométrico para coro etéreo con batimiento de fase
        const detuneCents = (idx % 2 === 0 ? 1 : -1) * (2.5 + idx * 0.8);
        osc.detune.setValueAtTime(detuneCents, now);

        oscGain.gain.setValueAtTime(vol, now);

        osc.connect(oscGain);
        oscGain.connect(this.filter);

        osc.start(now);
        this.oscillators.push(osc);
      });

      // LFO Lento para la respiración de la nebulosa cósmica
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.07, now);
      lfoGain.gain.setValueAtTime(180, now);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      lfo.start(now);
      this.oscillators.push(lfo);

      // Micro-destellos celestiales esporádicos (Campanas de cristal cósmico)
      this.chimeInterval = setInterval(() => {
        if (!this.isRunning || !this.ctx) return;
        this.triggerCelestialChime();
      }, 6500);

      this.isRunning = true;
    } catch (e) {
      console.warn('Celestial drone audio init:', e);
    }
  }

  // Micro-campana celestial de cristal cósmico
  triggerCelestialChime() {
    try {
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const chimes = [1296, 1728, 2112, 2592];
      const freq = chimes[Math.floor(Math.random() * chimes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.015, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.6);
    } catch (e) {}
  }
}

export const celestialDrone = new CelestialAmbientDrone();
export const startCelestialGalaxyDrone = () => celestialDrone.start();

