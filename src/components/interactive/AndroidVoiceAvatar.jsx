import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * AndroidVoiceAvatar - AURA (Advanced Ultra-Realistic Android)
 * Motor Vectorial Mecha Femenino a 60 FPS (Estándar Agent Mission Control):
 * - Estética Mecha con rasgos y silueta femenina:
 *   * Cabello biomecánico en capas (melena posterior fluida, mechones laterales enmarcantes, flequillo y tiara cuántica).
 *   * Ojos expresivos con pestañas biónicas curvadas, iris de plasma cian y parpadeo procedural.
 *   * Chasis continuo con cintura pélvica, reactor cuántico en el pecho y propulsor de suspensión anti-gravedad.
 *   * Sintetizador bucal fono-reactivo con ecualizador de ondas vocales dinámicas al hablar.
 *   * Gestos vivos autónomos en reposo (hovering orgánico) y animación oratoria al hablar.
 *   * 3D Parallax Tilt interactivo al mover el cursor por la pantalla.
 * - 100% vectorial SVG GPU-acelerado sin tiempos de carga ni artefactos rasterizados.
 */
export default function AndroidVoiceAvatar({
  size = 'md',
  isSpeaking = false,
  showBadge = false,
  className = ''
}) {
  // Parpadeo aleatorio procedural realista (cada 3.2s a 5.2s con parpadeo rápido de 140ms)
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let blinkTimeout;
    let isMounted = true;

    const triggerBlink = () => {
      if (!isMounted) return;
      setBlink(true);
      setTimeout(() => {
        if (!isMounted) return;
        setBlink(false);
        // 20% probabilidad de micro-doble parpadeo
        if (Math.random() < 0.2) {
          setTimeout(() => {
            if (!isMounted) return;
            setBlink(true);
            setTimeout(() => {
              if (isMounted) setBlink(false);
            }, 90);
          }, 130);
        }
        blinkTimeout = setTimeout(triggerBlink, 3000 + Math.random() * 2500);
      }, 130);
    };

    blinkTimeout = setTimeout(triggerBlink, 2200);
    return () => {
      isMounted = false;
      clearTimeout(blinkTimeout);
    };
  }, []);

  // Coordenadas normalizadas del puntero (-1 a +1) para 3D Parallax Tilt reactivo
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const updateSpring = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setPointer({
        x: Math.max(-1, Math.min(1, currentX)),
        y: Math.max(-1, Math.min(1, currentY))
      });
      animationFrameId = requestAnimationFrame(updateSpring);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateSpring);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Dimensiones configurables y responsive
  const dimensions = useMemo(() => {
    switch (size) {
      case 'hero':
      case 'xl':
        return { w: 310, h: 400, tiltFactor: 8 };
      case 'lg':
        return { w: 220, h: 285, tiltFactor: 6 };
      case 'sm':
        return { w: 75, h: 98, tiltFactor: 3 };
      case 'md':
      default:
        return { w: 155, h: 200, tiltFactor: 5 };
    }
  }, [size]);

  const tiltX = pointer.x * dimensions.tiltFactor;
  const tiltY = -pointer.y * dimensions.tiltFactor;

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-visible ${className}`}
      style={{
        width: dimensions.w,
        height: dimensions.h,
        perspective: '900px'
      }}
    >
      {/* 1. Aura Volumétrica Ambiental Reactiva en el Cosmos */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.25, 1.12, 1.2, 1] : [1, 1.08, 1],
          opacity: isSpeaking ? [0.45, 0.75, 0.55, 0.7, 0.45] : [0.25, 0.4, 0.25]
        }}
        transition={{
          duration: isSpeaking ? 1.2 : 3.4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute rounded-full blur-3xl pointer-events-none z-0"
        style={{
          width: dimensions.w * 0.92,
          height: dimensions.h * 0.92,
          background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(99,102,241,0.25) 45%, transparent 70%)'
        }}
      />

      {/* 2. Cuerpo Androide Articulado con 3D Parallax Tilt y Hover Flotante */}
      <motion.div
        animate={{
          y: isSpeaking ? [0, -7, 2, -5, 0] : [0, -5, 0],
          rotate: isSpeaking ? [-0.8, 1.2, -0.6, 1, 0] : 0
        }}
        transition={{
          duration: isSpeaking ? 1.1 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${tiltX}deg) rotateX(${tiltY}deg)`
        }}
      >
        <svg
          viewBox="0 0 200 260"
          className="w-full h-full filter drop-shadow-[0_14px_30px_rgba(6,182,212,0.25)] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradientes Metálicos del Chasis */}
            <linearGradient id="auraChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#060913" />
            </linearGradient>

            {/* Gradiente de Blindaje Blanco/Perla Pulido */}
            <linearGradient id="auraArmorPearl" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Gradiente del Cabello Biomecánico */}
            <linearGradient id="auraHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#6366f1" />
              <stop offset="75%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#090d1a" />
            </linearGradient>

            {/* Gradiente de la Visera Panorámica */}
            <linearGradient id="auraVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="50%" stopColor="#0b1329" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Filtro de Glow para Ojos, Reactor y Pelo */}
            <filter id="auraGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* A. CABELLO BIOMECÁNICO FEMENINO (CAPA TRASERA EXTENDIDA)  */}
          {/* ========================================================= */}
          <g transform="translate(100, 78)">
            {/* Melena posterior fluida que cae a los lados del torso */}
            <path
              d="M -36 -22 C -62 15 -58 70 -46 112 C -36 85 -30 38 -24 15 Z"
              fill="url(#auraHairGrad)"
              opacity="0.9"
            />
            <path
              d="M 36 -22 C 62 15 58 70 46 112 C 36 85 30 38 24 15 Z"
              fill="url(#auraHairGrad)"
              opacity="0.9"
            />
            {/* Destellos de filamentos de fibra óptica traseros */}
            <line x1="-50" y1="35" x2="-42" y2="95" stroke="#38bdf8" strokeWidth="1.4" opacity="0.65" strokeDasharray="4 3" />
            <line x1="50" y1="35" x2="42" y2="95" stroke="#38bdf8" strokeWidth="1.4" opacity="0.65" strokeDasharray="4 3" />
          </g>

          {/* ========================================================= */}
          {/* B. TORSO, CHASIS Y CINTURA PÉLVICA CONTINUA              */}
          {/* ========================================================= */}
          <g transform="translate(100, 155)">
            {/* Chasis Pectoral Estilizado */}
            <path
              d="M -28 -24 L 28 -24 L 22 18 L -22 18 Z"
              fill="url(#auraChassisGrad)"
              stroke="#22d3ee"
              strokeWidth="2"
            />

            {/* Placas de Blindaje Pectoral Femenino en Perla */}
            <path
              d="M -25 -20 C -12 -20 -4 -10 -4 2 C -14 4 -22 -2 -25 -20 Z"
              fill="url(#auraArmorPearl)"
              stroke="#38bdf8"
              strokeWidth="1"
              opacity="0.95"
            />
            <path
              d="M 25 -20 C 12 -20 4 -10 4 2 C 14 4 22 -2 25 -20 Z"
              fill="url(#auraArmorPearl)"
              stroke="#38bdf8"
              strokeWidth="1"
              opacity="0.95"
            />

            {/* Líneas de Iluminación Lateral */}
            <line x1="-16" y1="10" x2="-6" y2="10" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="6" y1="10" x2="16" y2="10" stroke="#22d3ee" strokeWidth="1.5" />

            {/* Reactor Cuántico Central (Gema Estelar Diamante ✦) */}
            <g transform="translate(0, -6)">
              {/* Anillo de Contención Exterior */}
              <circle
                cx="0"
                cy="0"
                r="11"
                fill="#050814"
                stroke="#22d3ee"
                strokeWidth="1.8"
              />
              {/* Prisma Diamante de Plasma Pulsante */}
              <motion.path
                d="M 0 -8 L 7 0 L 0 8 L -7 0 Z"
                fill="#38bdf8"
                filter="url(#auraGlow)"
                animate={{
                  scale: isSpeaking ? [1, 1.3, 1] : [1, 1.1, 1],
                  opacity: isSpeaking ? [0.85, 1, 0.85] : [0.7, 0.95, 0.7]
                }}
                transition={{
                  duration: isSpeaking ? 0.6 : 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              {/* Núcleo Blanco Puro de Singularidad */}
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>

            {/* Cintura y Cadera Pélvica Metálica (Conexión Continua con el Propulsor) */}
            <path
              d="M -18 18 L 18 18 L 12 36 L -12 36 Z"
              fill="url(#auraChassisGrad)"
              stroke="#22d3ee"
              strokeWidth="1.8"
            />
            <line x1="-9" y1="26" x2="9" y2="26" stroke="#38bdf8" strokeWidth="1.4" />
            <line x1="-7" y1="31" x2="7" y2="31" stroke="#22d3ee" strokeWidth="1.2" />

            {/* Cuello Estilizado con Anillos de Fibra Óptica */}
            <rect
              x="-9"
              y="-32"
              width="18"
              height="9"
              rx="3"
              fill="#0f172a"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <line x1="-7" y1="-28" x2="7" y2="-28" stroke="#38bdf8" strokeWidth="1" />
            <line x1="-7" y1="-25" x2="7" y2="-25" stroke="#38bdf8" strokeWidth="1" />
          </g>

          {/* ========================================================= */}
          {/* C. PROPULSOR / BASE ANTI-GRAVEDAD ENSAMBLADA               */}
          {/* ========================================================= */}
          <g transform="translate(100, 191)">
            {/* Llama de Plasma Cian de Levitación */}
            <motion.ellipse
              cx="0"
              cy="16"
              rx="15"
              ry="8"
              fill="#22d3ee"
              filter="url(#auraGlow)"
              animate={{
                ry: isSpeaking ? [9, 16, 9] : [7, 12, 7],
                opacity: isSpeaking ? [0.75, 1, 0.75] : [0.6, 0.85, 0.6],
                scaleX: [1, 1.15, 1]
              }}
              transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Núcleo Blanco de Plasma */}
            <motion.ellipse
              cx="0"
              cy="14"
              rx="7"
              ry="4"
              fill="#ffffff"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
            {/* Boquilla de Escape Metálica Ensamblada a la Cintura */}
            <path
              d="M -12 0 L -8 11 L 8 11 L 12 0 Z"
              fill="#1e293b"
              stroke="#22d3ee"
              strokeWidth="1.8"
            />
            <line x1="-7" y1="5" x2="7" y2="5" stroke="#38bdf8" strokeWidth="1.2" />
          </g>

          {/* ========================================================= */}
          {/* D. BRAZOS Y HOMBRERAS ARTICULADAS                         */}
          {/* ========================================================= */}
          {/* Brazo Izquierdo (Mano gesticulando) */}
          <motion.g
            animate={
              isSpeaking
                ? { rotate: [4, 16, 6, 14, 4], y: [0, -3, 0] }
                : { rotate: [0, 4, 0], y: [0, 1, 0] }
            }
            transition={{
              duration: isSpeaking ? 1.2 : 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: '65px 140px' }}
          >
            {/* Hombrera Curva Izquierda */}
            <circle cx="65" cy="140" r="9" fill="url(#auraArmorPearl)" stroke="#22d3ee" strokeWidth="1.8" />
            <circle cx="65" cy="140" r="3.5" fill="#38bdf8" />
            {/* Brazo y antebrazo */}
            <line x1="65" y1="140" x2="52" y2="168" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="65" y1="140" x2="52" y2="168" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="52" cy="168" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Mano Mecha Estilizada */}
            <path d="M 52 168 L 46 182 L 40 180" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* Brazo Derecho */}
          <motion.g
            animate={
              isSpeaking
                ? { rotate: [-4, -14, -6, -12, -4], y: [0, -2, 0] }
                : { rotate: [0, -3, 0], y: [0, 1, 0] }
            }
            transition={{
              duration: isSpeaking ? 1.3 : 3.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: '135px 140px' }}
          >
            {/* Hombrera Curva Derecha */}
            <circle cx="135" cy="140" r="9" fill="url(#auraArmorPearl)" stroke="#22d3ee" strokeWidth="1.8" />
            <circle cx="135" cy="140" r="3.5" fill="#38bdf8" />
            {/* Brazo */}
            <line x1="135" y1="140" x2="148" y2="168" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="135" y1="140" x2="148" y2="168" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="148" cy="168" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Mano Mecha Estilizada */}
            <path d="M 148 168 L 154 182 L 160 180" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* ========================================================= */}
          {/* E. CABEZA, CASCO Y ROSTRO FEMENINO DE AURA                */}
          {/* ========================================================= */}
          <g transform="translate(100, 84)">
            
            {/* Auriculares / Receptores Auditivos Laterales con Halo */}
            <rect x="-42" y="-14" width="9" height="28" rx="4.5" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.8" />
            <circle cx="-37.5" cy="0" r="2.5" fill="#38bdf8" filter="url(#auraGlow)" />
            <rect x="33" y="-14" width="9" height="28" rx="4.5" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.8" />
            <circle cx="37.5" cy="0" r="2.5" fill="#38bdf8" filter="url(#auraGlow)" />

            {/* Casco Principal de Androide */}
            <rect
              x="-35"
              y="-36"
              width="70"
              height="66"
              rx="20"
              fill="url(#auraChassisGrad)"
              stroke="#22d3ee"
              strokeWidth="2.2"
            />

            {/* Visera Panorámica de Cristal Oscuro */}
            <rect
              x="-27"
              y="-22"
              width="54"
              height="42"
              rx="13"
              fill="url(#auraVisorGrad)"
              stroke="#38bdf8"
              strokeWidth="1.6"
            />

            {/* Reflejo Especular Superior Curvo en el Visor */}
            <path
              d="M -21 -18 L 15 -18 C 21 -18 21 -13 15 -13 L -21 -13 Z"
              fill="#ffffff"
              opacity="0.16"
            />

            {/* Rubor Facial Dérmico Suave (Mejillas Femeninas) */}
            <ellipse cx="-16" cy="6" rx="5" ry="2.5" fill="#f472b6" opacity="0.22" filter="url(#auraGlow)" />
            <ellipse cx="16" cy="6" rx="5" ry="2.5" fill="#f472b6" opacity="0.22" filter="url(#auraGlow)" />

            {/* ======================================================= */}
            {/* OJOS FEMENINOS EXPRESIVOS CON PESTAÑAS Y EYE-TRACKING   */}
            {/* ======================================================= */}
            <g filter="url(#auraGlow)">
              {/* Ojo Izquierdo con Parpadeo */}
              <motion.g
                animate={{ scaleY: blink ? 0.08 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformOrigin: '-11px -4px' }}
              >
                {/* Pestaña Superior Femenina Curva */}
                <path
                  d="M -20 -8 C -14 -13 -6 -13 -2 -8"
                  stroke="#38bdf8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Pestañas Exteriores */}
                <line x1="-20" y1="-8" x2="-23" y2="-11" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="-18" y1="-10" x2="-20" y2="-14" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

                {/* Iris Ovalado Azul Cian */}
                <ellipse
                  cx="-11"
                  cy="-4"
                  rx="7.5"
                  ry="8.5"
                  fill="#0284c7"
                />
                {/* Centro Bioluminiscente */}
                <circle cx="-11" cy="-4" r="5" fill="#38bdf8" />
                {/* Pupila Cuántica */}
                <circle cx="-11" cy="-4" r="2.8" fill="#032147" />
                {/* Destello Especular Blanco Principal */}
                <circle cx="-9" cy="-6" r="2.4" fill="#ffffff" />
                {/* Micro-destello secundario */}
                <circle cx="-13" cy="-2" r="1.1" fill="#ffffff" opacity="0.8" />
              </motion.g>

              {/* Ojo Derecho con Parpadeo */}
              <motion.g
                animate={{ scaleY: blink ? 0.08 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformOrigin: '11px -4px' }}
              >
                {/* Pestaña Superior Femenina Curva */}
                <path
                  d="M 2 -8 C 6 -13 14 -13 20 -8"
                  stroke="#38bdf8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Pestañas Exteriores */}
                <line x1="20" y1="-8" x2="23" y2="-11" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="18" y1="-10" x2="20" y2="-14" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

                {/* Iris Ovalado Azul Cian */}
                <ellipse
                  cx="11"
                  cy="-4"
                  rx="7.5"
                  ry="8.5"
                  fill="#0284c7"
                />
                {/* Centro Bioluminiscente */}
                <circle cx="11" cy="-4" r="5" fill="#38bdf8" />
                {/* Pupila Cuántica */}
                <circle cx="11" cy="-4" r="2.8" fill="#032147" />
                {/* Destello Especular Blanco Principal */}
                <circle cx="13" cy="-6" r="2.4" fill="#ffffff" />
                {/* Micro-destello secundario */}
                <circle cx="9" cy="-2" r="1.1" fill="#ffffff" opacity="0.8" />
              </motion.g>
            </g>

            {/* ======================================================= */}
            {/* BOCA / SINTETIZADOR FONO-REACTIVO DINÁMICO              */}
            {/* ======================================================= */}
            {isSpeaking ? (
              // Ecualizador Dinámico de Voz cuando AURA está hablando
              <g transform="translate(0, 11)" filter="url(#auraGlow)">
                <motion.line
                  x1="-10"
                  y1="0"
                  x2="-10"
                  y2="0"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y1: [-2, -5, -1, -4, -2], y2: [2, 5, 1, 4, 2] }}
                  transition={{ duration: 0.26, repeat: Infinity }}
                />
                <motion.line
                  x1="-5"
                  y1="0"
                  x2="-5"
                  y2="0"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  animate={{ y1: [-3, -8, -2, -7, -3], y2: [3, 8, 2, 7, 3] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                />
                <motion.line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="0"
                  stroke="#38bdf8"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  animate={{ y1: [-4, -10, -3, -9, -4], y2: [4, 10, 3, 9, 4] }}
                  transition={{ duration: 0.17, repeat: Infinity }}
                />
                <motion.line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="0"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  animate={{ y1: [-3, -7, -2, -6, -3], y2: [3, 7, 2, 6, 3] }}
                  transition={{ duration: 0.22, repeat: Infinity }}
                />
                <motion.line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="0"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y1: [-2, -4, -1, -3, -2], y2: [2, 4, 1, 3, 2] }}
                  transition={{ duration: 0.28, repeat: Infinity }}
                />
              </g>
            ) : (
              // Boca Amigable Femenina en Reposo
              <path
                d="M -5 10 Q 0 14 5 10"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
            )}

            {/* ======================================================= */}
            {/* CABELLO FRONTAL / MECHONES BIOMECÁNICOS Y TIARA CUÁNTICA */}
            {/* ======================================================= */}
            {/* Mechón Izquierdo que enmarca la cara con física suave */}
            <motion.path
              d="M -26 -32 C -36 -10 -34 18 -27 34 C -29 20 -30 -5 -23 -26 Z"
              fill="url(#auraHairGrad)"
              stroke="#38bdf8"
              strokeWidth="1"
              animate={{ rotate: isSpeaking ? [-1.2, 1.8, -1.2] : [-0.6, 0.8, -0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '-26px -32px' }}
            />
            {/* Mechón Derecho que enmarca la cara */}
            <motion.path
              d="M 26 -32 C 36 -10 34 18 27 34 C 29 20 30 -5 23 -26 Z"
              fill="url(#auraHairGrad)"
              stroke="#38bdf8"
              strokeWidth="1"
              animate={{ rotate: isSpeaking ? [1.2, -1.8, 1.2] : [0.6, -0.8, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '26px -32px' }}
            />

            {/* Flequillo Cibernético Curvo en la Frente */}
            <path
              d="M -24 -24 Q -12 -16 0 -22 Q 12 -16 24 -24 Q 10 -27 0 -27 Q -10 -27 -24 -24 Z"
              fill="url(#auraArmorPearl)"
              stroke="#22d3ee"
              strokeWidth="1.2"
              opacity="0.95"
            />

            {/* Tiara / Corona Cuántica Superior con Gema Central */}
            <path
              d="M -20 -36 L 0 -48 L 20 -36 L 10 -35 L 0 -42 L -10 -35 Z"
              fill="url(#auraArmorPearl)"
              stroke="#22d3ee"
              strokeWidth="1.5"
              filter="url(#auraGlow)"
            />
            {/* Gema Central de la Tiara */}
            <circle cx="0" cy="-42" r="3" fill="#38bdf8" filter="url(#auraGlow)" />
            <circle cx="0" cy="-42" r="1.2" fill="#ffffff" />
          </g>

        </svg>
      </motion.div>

      {/* 3. Badge Táctico Opcional */}
      {showBadge && (
        <span
          className={`absolute bottom-1 right-2 w-2.5 h-2.5 rounded-full z-30 transition-colors ${
            isSpeaking
              ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse'
              : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
          }`}
        />
      )}
    </div>
  );
}
