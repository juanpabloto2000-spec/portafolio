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
 * 🌌 CelestialAmbientDrone - Sonido Angelical & Cósmico Sublime de La Galaxia Dynamind
 * - Frecuencias sagradas Solfeggio: 432 Hz (Paz y orden cósmico), 528 Hz (Transformación y amor divino).
 * - Armónicos de catedral celestial: 648 Hz (E5), 720 Hz (F#5), 864 Hz (A5), 1056 Hz (C6), 1296 Hz (E6).
 * - Doble filtrado: Highpass en 180 Hz (gravedad cero, sin retumbos) + Lowpass cálido en 1150 Hz con LFO.
 * - Shimmer de arpa celestial esporádico: micro-tonos cristalinos pentatónicos que flotan en el espacio.
 * - Control de ciclo de vida completo: start(), stop(), toggleMute(), setMuted().
 * - Conmutación suave y limpia cuando el usuario entra o sale de la sección de La Galaxia.
 */
class CelestialAmbientDrone {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.highpassFilter = null;
    this.lowpassFilter = null;
    this.oscillators = [];
    this.isRunning = false;
    this.isMuted = false;
    this.chimeInterval = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try { fn(this.isMuted, this.isRunning); } catch (e) {}
    });
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

      // Master Gain con rampa suave angelical
      this.masterGain = this.ctx.createGain();
      const targetVol = this.isMuted ? 0.00001 : 0.055;
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(targetVol, now + 2.8);

      // Filtro 1: Pasa-altos suave para sensación de ingravidez
      this.highpassFilter = this.ctx.createBiquadFilter();
      this.highpassFilter.type = 'highpass';
      this.highpassFilter.frequency.setValueAtTime(175, now);
      this.highpassFilter.Q.setValueAtTime(0.7, now);

      // Filtro 2: Pasa-bajos sedoso resonante (voz celestial)
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = 'lowpass';
      this.lowpassFilter.frequency.setValueAtTime(1150, now);
      this.lowpassFilter.Q.setValueAtTime(1.4, now);

      // Conexión en cadena: Fuentes -> Highpass -> Lowpass -> MasterGain -> Destination
      this.highpassFilter.connect(this.lowpassFilter);
      this.lowpassFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Polifonía celestial angélica (Solfeggio 432Hz y 528Hz + Acorde Maj9 Lydian celestial)
      const angelicalPitches = [
        { freq: 216.0, type: 'sine', vol: 0.06 },     // Sub-respiración etérea
        { freq: 432.0, type: 'sine', vol: 0.11 },     // Frecuencia sagrada 432 Hz (A4)
        { freq: 528.0, type: 'sine', vol: 0.095 },    // Frecuencia Solfeggio 528 Hz (Transformación)
        { freq: 648.0, type: 'sine', vol: 0.045 },    // Quinta pura E5
        { freq: 720.0, type: 'sine', vol: 0.035 },    // F#5 Lydian celestial
        { freq: 864.0, type: 'sine', vol: 0.022 },    // Octava pura A5
        { freq: 1056.0, type: 'sine', vol: 0.016 },   // Shimmer celestial 1056 Hz
        { freq: 1296.0, type: 'sine', vol: 0.009 }    // Resonancia de arpa de luz E6
      ];

      this.oscillators = [];

      angelicalPitches.forEach(({ freq, type, vol }, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Batimiento de coro angelical (detuning micrométrico estéreo)
        const detuneCents = (idx % 2 === 0 ? 1 : -1) * (2.8 + (idx % 3) * 1.2);
        osc.detune.setValueAtTime(detuneCents, now);

        oscGain.gain.setValueAtTime(vol, now);

        osc.connect(oscGain);
        oscGain.connect(this.highpassFilter);

        osc.start(now);
        this.oscillators.push(osc);
      });

      // LFO Lento de respiración cósmica (Ciclo lento de ~18 segundos)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.055, now);
      lfoGain.gain.setValueAtTime(260, now);
      lfo.connect(lfoGain);
      lfoGain.connect(this.lowpassFilter.frequency);
      lfo.start(now);
      this.oscillators.push(lfo);

      // Campanitas de cristal estelar (Arpa celestial esporádica)
      this.chimeInterval = setInterval(() => {
        if (!this.isRunning || !this.ctx || this.isMuted) return;
        this.triggerAngelicalHarpChime();
      }, 5500);

      this.isRunning = true;
      this.notify();
    } catch (e) {
      console.warn('Celestial drone audio error:', e);
    }
  }

  // Micro-arpegio angelical de campanas celestiales
  triggerAngelicalHarpChime() {
    try {
      if (!this.ctx || this.ctx.state !== 'running' || this.isMuted) return;
      const now = this.ctx.currentTime;
      const harpPitches = [1296, 1536, 1728, 2112, 2592];

      // Lanzar 2 micro-tonos en cascada armónica suave
      [0, 0.22].forEach((delay, i) => {
        const freq = harpPitches[(Math.floor(Math.random() * harpPitches.length) + i) % harpPitches.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.00001, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.014, now + delay + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + delay + 3.8);

        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 3.9);
      });
    } catch (e) {}
  }

  // Fade-out y apagado absoluto cuando el usuario sale de La Galaxia
  stop() {
    if (!this.isRunning) return;
    try {
      if (this.chimeInterval) {
        clearInterval(this.chimeInterval);
        this.chimeInterval = null;
      }

      if (this.masterGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);

        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
          this.oscillators = [];
          this.isRunning = false;
          this.notify();
        }, 1300);
      } else {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        this.oscillators = [];
        this.isRunning = false;
        this.notify();
      }
    } catch (e) {
      this.isRunning = false;
      this.notify();
    }
  }

  // Conmutador de Mute / Desmute
  toggleMute() {
    return this.setMuted(!this.isMuted);
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    if (this.masterGain && this.ctx && this.isRunning) {
      const now = this.ctx.currentTime;
      const target = this.isMuted ? 0.00001 : 0.055;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || 0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(target, now + 0.35);
    }
    this.notify();
    return this.isMuted;
  }
}

export const celestialDrone = new CelestialAmbientDrone();
export const startCelestialGalaxyDrone = () => celestialDrone.start();
export const stopCelestialGalaxyDrone = () => celestialDrone.stop();
export const toggleCelestialMute = () => celestialDrone.toggleMute();


