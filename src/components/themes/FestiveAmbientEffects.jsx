import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { festiveThemeStore } from '../../services/festiveThemeStore';

/**
 * FESTIVE AMBIENT EFFECTS (HALLOWEEN EDITION)
 * Dynamind Studios - 60 FPS Hardware-Accelerated Ambient Layer
 * 
 * Despliega niebla espectral sutil, orbes de fuego fatuo bioluminiscentes
 * y siluetas cinemáticas de murciélagos estilizados cuando la temática
 * Cyber-Gothic Halloween está activa desde el DSB.
 */
export default function FestiveAmbientEffects() {
  const [config, setConfig] = useState(() => festiveThemeStore.getFestiveConfig());
  const canvasRef = useRef(null);

  useEffect(() => {
    const unsubscribe = festiveThemeStore.subscribe(
      (newConfig) => setConfig(newConfig),
      null
    );
    return unsubscribe;
  }, []);

  const isHalloween = config.themeId === 'halloween';
  const isEnabled = config.ambientEffectEnabled;

  useEffect(() => {
    if (!isHalloween || !isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 24 fuegos fatuos flotantes ámbar y morados bioluminiscentes
    const orbs = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 45 + 20,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.18 + 0.05,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      isOrange: Math.random() > 0.45
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Dibujar niebla espectral y fuegos fatuos
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        o.x += o.vx;
        o.y += o.vy;

        // Wrap suave por bordes
        if (o.x < -100) o.x = width + 100;
        if (o.x > width + 100) o.x = -100;
        if (o.y < -100) o.y = height + 100;
        if (o.y > height + 100) o.y = -100;

        const dynamicAlpha = o.alpha + Math.sin(frame * o.pulseSpeed + o.phase) * 0.04;
        const colorInner = o.isOrange 
          ? `rgba(249, 115, 22, ${Math.max(0.01, dynamicAlpha)})`
          : `rgba(168, 85, 247, ${Math.max(0.01, dynamicAlpha)})`;

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius);
        grad.addColorStop(0, colorInner);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHalloween, isEnabled]);

  if (!isHalloween || !isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {/* 1. Canvas de Niebla & Fuegos Fatuos a 60 FPS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* 2. Micro-Siluetas Cinemáticas de Murciélagos Cruzando Suavemente */}
      <HalloweenFlightBats />
    </div>
  );
}

/**
 * Murciélagos vectoriales minimalistas que cruzan el horizonte con gracia
 */
function HalloweenFlightBats() {
  const [bats, setBats] = useState([]);

  useEffect(() => {
    // Generar un vuelo de 2-3 murciélagos cada 16 segundos
    const spawnBatFlight = () => {
      const flightId = Date.now();
      const startY = Math.random() * 40 + 15; // 15% a 55% de altura
      const flightDuration = Math.random() * 4 + 7; // 7 a 11 segundos
      const isLeftToRight = Math.random() > 0.3;

      const newBatch = [
        {
          id: `${flightId}-1`,
          startY: startY,
          duration: flightDuration,
          delay: 0,
          scale: 0.85,
          leftToRight: isLeftToRight
        },
        {
          id: `${flightId}-2`,
          startY: startY + (Math.random() * 8 - 4),
          duration: flightDuration + 0.8,
          delay: 0.5,
          scale: 0.65,
          leftToRight: isLeftToRight
        }
      ];

      setBats(newBatch);

      // Limpiar al terminar
      setTimeout(() => {
        setBats([]);
      }, (flightDuration + 2) * 1000);
    };

    spawnBatFlight();
    const interval = setInterval(spawnBatFlight, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {bats.map((bat) => (
          <motion.div
            key={bat.id}
            initial={{
              x: bat.leftToRight ? '-10vw' : '110vw',
              y: `${bat.startY}vh`,
              opacity: 0,
              scale: bat.scale
            }}
            animate={{
              x: bat.leftToRight ? '110vw' : '-10vw',
              y: [
                `${bat.startY}vh`,
                `${bat.startY - 3}vh`,
                `${bat.startY + 4}vh`,
                `${bat.startY - 2}vh`
              ],
              opacity: [0, 0.45, 0.55, 0.4, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: bat.duration,
              delay: bat.delay,
              ease: 'easeInOut'
            }}
            className="absolute will-change-transform"
          >
            {/* SVG Minimalista Silueta Murciélago Púrpura Espectral */}
            <svg
              width="28"
              height="16"
              viewBox="0 0 48 24"
              fill="none"
              className={`drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] ${
                bat.leftToRight ? 'rotate-[4deg]' : '-scale-x-100 -rotate-[4deg]'
              }`}
            >
              <path
                d="M24 12C20 6 15 4 8 7C3 9 0 16 0 16C3 15 7 14 11 16C15 18 18 22 24 18C30 22 33 18 37 16C41 14 45 15 48 16C48 16 45 9 40 7C33 4 28 6 24 12Z"
                fill="#a855f7"
                fillOpacity="0.55"
              />
              <path
                d="M24 10C22 7 18 6 12 8C8 9 5 13 4 14C7 13 10 12 13 14C17 16 20 19 24 16C28 19 31 16 35 14C38 12 41 13 44 14C43 13 40 9 36 8C30 6 26 7 24 10Z"
                fill="#f97316"
                fillOpacity="0.3"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
