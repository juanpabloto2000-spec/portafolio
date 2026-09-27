import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeGalaxyPreloader({ pageKey }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPageKeyRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Disparar al entrar al index ('home') o al diagnóstico ('diagnostico')
  useEffect(() => {
    if (pageKey === 'home' || pageKey === 'diagnostico') {
      if (prevPageKeyRef.current !== pageKey) {
        setProgress(0);
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
    prevPageKeyRef.current = pageKey;
  }, [pageKey]);

  // Duración cinemática calibrada (~1.85 segundos: ágil, nítida y sin esperas largas)
  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const duration = 1850; // 1.85s: un tris más corto y dinámico

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const linear = Math.min(1, elapsed / duration);
      // Curva cúbica suave
      const eased = 1 - Math.pow(1 - linear, 3);
      const currentVal = Math.min(100, Math.round(eased * 100));
      setProgress(currentVal);

      if (linear < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsVisible(false);
        }, 320);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  // Motor Canvas de Dos Galaxias Diagonales (Esquina Superior Izquierda + Inferior Derecha)
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    const colorsGal1 = [
      { r: 56, g: 189, b: 248 },  // Cian Eléctrico
      { r: 168, g: 85, b: 247 },  // Púrpura Nebular
      { r: 96, g: 165, b: 250 },  // Azul Cobalto
      { r: 255, g: 255, b: 255 }   // Luz Estelar
    ];

    const colorsGal2 = [
      { r: 245, g: 158, b: 11 },  // Ámbar Estelar
      { r: 217, g: 70, b: 239 },  // Fuchsia Cuántico
      { r: 251, g: 191, b: 36 },  // Oro Solar
      { r: 255, g: 255, b: 255 }   // Luz Estelar
    ];

    // Galaxia 1 (Esquina Superior Izquierda) - 240 partículas
    const COUNT_PER_GALAXY = 240;
    const particlesGal1 = [];
    const particlesGal2 = [];

    const maxRadius = Math.min(width, height) * 0.38;

    for (let i = 0; i < COUNT_PER_GALAXY; i++) {
      const arm = i % 2;
      const armOffset = arm * Math.PI;
      const dist = Math.pow(Math.random(), 1.5) * maxRadius + 15;
      const spiralAngle = dist * 0.018 + armOffset + (Math.random() - 0.5) * 0.5;

      particlesGal1.push({
        dist,
        angle: spiralAngle,
        speed: (0.01 + (1 / Math.sqrt(dist)) * 0.22) * (0.85 + Math.random() * 0.3),
        radius: (Math.random() * 2.2 + 0.8) * dpr,
        color: colorsGal1[Math.floor(Math.random() * colorsGal1.length)],
        alpha: Math.random() * 0.75 + 0.25,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });

      particlesGal2.push({
        dist,
        angle: spiralAngle + Math.PI * 0.5,
        speed: -(0.01 + (1 / Math.sqrt(dist)) * 0.22) * (0.85 + Math.random() * 0.3), // Contragiro
        radius: (Math.random() * 2.2 + 0.8) * dpr,
        color: colorsGal2[Math.floor(Math.random() * colorsGal2.length)],
        alpha: Math.random() * 0.75 + 0.25,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Micro-polvo cósmico ambiental muy sutil
    const ambientStars = [];
    for (let i = 0; i < 40; i++) {
      ambientStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 * dpr,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let rot1 = 0;
    let rot2 = 0;

    const render = () => {
      // Estela limpia de fondo
      ctx.fillStyle = 'rgba(3, 5, 10, 0.24)';
      ctx.fillRect(0, 0, width, height);

      // Posiciones de los dos centros galácticos:
      // Galaxia 1: Esquina Superior Izquierda
      const g1X = width * 0.12;
      const g1Y = height * 0.15;

      // Galaxia 2: Esquina Inferior Derecha
      const g2X = width * 0.88;
      const g2Y = height * 0.85;

      // 1. Quasar y Plasma de Galaxia 1 (Superior Izquierda - Cian/Púrpura)
      const qGrad1 = ctx.createRadialGradient(g1X, g1Y, 0, g1X, g1Y, 130 * dpr);
      qGrad1.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      qGrad1.addColorStop(0.35, 'rgba(168, 85, 247, 0.22)');
      qGrad1.addColorStop(1, 'rgba(3, 5, 10, 0)');
      ctx.fillStyle = qGrad1;
      ctx.beginPath();
      ctx.arc(g1X, g1Y, 130 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // 2. Quasar y Plasma de Galaxia 2 (Inferior Derecha - Ámbar/Fuchsia)
      const qGrad2 = ctx.createRadialGradient(g2X, g2Y, 0, g2X, g2Y, 130 * dpr);
      qGrad2.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
      qGrad2.addColorStop(0.35, 'rgba(217, 70, 239, 0.22)');
      qGrad2.addColorStop(1, 'rgba(3, 5, 10, 0)');
      ctx.fillStyle = qGrad2;
      ctx.beginPath();
      ctx.arc(g2X, g2Y, 130 * dpr, 0, Math.PI * 2);
      ctx.fill();

      rot1 += 0.008;
      rot2 -= 0.008;

      // Dibujar Partículas Galaxia 1 (Top-Left)
      for (let i = 0; i < COUNT_PER_GALAXY; i++) {
        const p = particlesGal1[i];
        p.angle += p.speed;
        p.pulsePhase += p.pulseSpeed;

        const currentAngle = p.angle + rot1;
        const x = g1X + Math.cos(currentAngle) * p.dist;
        const y = g1Y + Math.sin(currentAngle) * p.dist * 0.62;

        const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulsePhase) * 0.2);

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${dynamicAlpha})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.75)`;
        ctx.shadowBlur = 5 * dpr;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Dibujar Partículas Galaxia 2 (Bottom-Right)
      for (let i = 0; i < COUNT_PER_GALAXY; i++) {
        const p = particlesGal2[i];
        p.angle += p.speed;
        p.pulsePhase += p.pulseSpeed;

        const currentAngle = p.angle + rot2;
        const x = g2X + Math.cos(currentAngle) * p.dist;
        const y = g2Y + Math.sin(currentAngle) * p.dist * 0.62;

        const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulsePhase) * 0.2);

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${dynamicAlpha})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.75)`;
        ctx.shadowBlur = 5 * dpr;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Micro-estrellas ambientales de fondo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < ambientStars.length; i++) {
        const s = ambientStars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={`galaxy-preloader-${pageKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03050a] text-white select-none overflow-hidden"
        >
          {/* ============================================================== */}
          {/* 1. LIENZO CANVAS CON DOS GALAXIAS EN ESQUINAS DIAGONALES       */}
          {/* ============================================================== */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* ============================================================== */}
          {/* 2. HUD HYPERFRAMES TÁCTICO: 4 BRACKETS ESQUINEROS DE TITANIO    */}
          {/* ============================================================== */}
          <div className="absolute top-6 left-6 flex items-start gap-2 text-cyan-400 font-mono text-[10px] tracking-widest pointer-events-none z-20">
            <span className="w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <span className="opacity-80">GALAXY ALPHA // SECTOR 01</span>
          </div>

          <div className="absolute top-6 right-6 flex items-start gap-2 text-cyan-400 font-mono text-[10px] tracking-widest pointer-events-none z-20">
            <span className="opacity-80">60 FPS // GPU RETINA</span>
            <span className="w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          </div>

          <div className="absolute bottom-6 left-6 flex items-end gap-2 text-zinc-400 font-mono text-[10px] tracking-widest pointer-events-none z-20">
            <span className="w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <span className="opacity-75">ORBITAL MATRIX // ONLINE</span>
          </div>

          <div className="absolute bottom-6 right-6 flex items-end gap-2 text-amber-400 font-mono text-[10px] tracking-widest pointer-events-none z-20">
            <span className="opacity-75">GALAXY BETA // SECTOR 02</span>
            <span className="w-4 h-4 border-b-2 border-r-2 border-amber-400" />
          </div>

          {/* Línea Láser de Escaneo Luminiscente Hyperframes */}
          <div className="hyperframe-laser opacity-35 pointer-events-none z-10" />

          {/* ============================================================== */}
          {/* 3. CENTRO COMPLETAMENTE LIMPIO: LOGO MAESTRO Y NOMBRE          */}
          {/* (Sin partículas estorbando la lectura)                         */}
          {/* ============================================================== */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            
            {/* Monograma en Alta Definición Flotando Libremente */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.95, 1.03, 0.98], 
                opacity: 1 
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center pointer-events-none"
            >
              <img 
                src="/logo sin fondo.png" 
                alt="Dynamind Studios Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] drop-shadow-[0_0_60px_rgba(168,85,247,0.25)]"
              />
            </motion.div>

            {/* Telemetría y Barra de Progreso Holográfica Centrada */}
            <div className="mt-5 space-y-3 text-center max-w-sm px-6 w-full pointer-events-none">
              
              <div className="space-y-1">
                <h2 className="font-display font-bold text-base sm:text-lg uppercase tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Dynamind Studios
                </h2>
                <p className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider">
                  {pageKey === 'diagnostico' 
                    ? 'ESCÁNER DE CUELLOS DE BOTELLA // CALIBRANDO' 
                    : 'SISTEMAS DE OTRA GALAXIA // INICIALIZANDO'}
                </p>
              </div>

              {/* Barra de Progreso Holográfica */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20 backdrop-blur-md">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.85)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.08 }}
                />
              </div>

              {/* Indicadores Numéricos */}
              <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between font-bold">
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{pageKey === 'diagnostico' ? 'TRIAJE 45s' : 'CORE SOBERANO'}</span>
                </span>
                <span className="text-white font-mono text-xs">{progress}%</span>
              </div>

            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
