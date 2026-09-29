import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * AndroidVoiceAvatar - Asistente AURA
 * Motor Vectorial Mecha Femenino a 60 FPS en Azul y Morado:
 * - Traje de secretaria ejecutiva biónica (blazer morado imperial con solapas satinadas, blusa blanca con cuello camisero y broche estelar).
 * - Chignon / recogido biónico ejecutivo pulido en la parte superior sin cabellos sueltos ni mechones raros.
 * - Gafas inteligentes de secretaria (montura estilizada con lentes tintadas y reflejo de cristal).
 * - Bolso de mano de diseñador cibernético llevado con elegancia en el brazo.
 * - Conexiones anatómicas continuas y ensambladas (cuello camisero integrado y tobera de propulsión encajada a la cadera).
 * - Pestañas curvadas biónicas, rubor en mejillas, maquillaje y ojos vivaces con parpadeo procedural.
 * - Sintetizador bucal fono-reactivo con ecualizador dinámico al hablar y labios con sonrisa en reposo.
 * - 3D Parallax Tilt interactivo al mover el mouse.
 * - 100% SVG vectorial GPU-acelerado a 60 FPS sin imágenes rasterizadas.
 */
export default function AndroidVoiceAvatar({
  size = 'md',
  isSpeaking = false,
  showBadge = false,
  className = ''
}) {
  // Parpadeo procedural humano (cada 3.0s a 5.5s)
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
        // Micro-doble parpadeo ocasional
        if (Math.random() < 0.22) {
          setTimeout(() => {
            if (!isMounted) return;
            setBlink(true);
            setTimeout(() => {
              if (isMounted) setBlink(false);
            }, 90);
          }, 120);
        }
        blinkTimeout = setTimeout(triggerBlink, 3000 + Math.random() * 2600);
      }, 130);
    };

    blinkTimeout = setTimeout(triggerBlink, 2000);
    return () => {
      isMounted = false;
      clearTimeout(blinkTimeout);
    };
  }, []);

  // Coordenadas del puntero para 3D Parallax Tilt
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

  // Dimensiones según el tamaño
  const dimensions = useMemo(() => {
    switch (size) {
      case 'hero':
      case 'xl':
        return { w: 310, h: 410, tiltFactor: 8 };
      case 'lg':
        return { w: 220, h: 290, tiltFactor: 6 };
      case 'sm':
        return { w: 80, h: 105, tiltFactor: 3 };
      case 'md':
      default:
        return { w: 160, h: 210, tiltFactor: 5 };
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
      {/* 1. Aura Volumétrica Ambiental en Púrpura y Azul Cósmico */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.28, 1.15, 1.24, 1] : [1, 1.08, 1],
          opacity: isSpeaking ? [0.55, 0.85, 0.65, 0.8, 0.55] : [0.3, 0.48, 0.3]
        }}
        transition={{
          duration: isSpeaking ? 1.2 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute rounded-full blur-3xl pointer-events-none z-0"
        style={{
          width: dimensions.w * 0.95,
          height: dimensions.h * 0.95,
          background: 'radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(59,130,246,0.35) 45%, rgba(99,102,241,0.15) 70%, transparent 80%)'
        }}
      />

      {/* 2. Cuerpo Androide Articulado con 3D Parallax Tilt */}
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
          viewBox="0 0 210 275"
          className="w-full h-full filter drop-shadow-[0_16px_36px_rgba(124,58,237,0.3)] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente Chasis Principal (Azul Noche Profundo & Púrpura) */}
            <linearGradient id="auraChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="45%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>

            {/* Gradiente Traje de Secretaria Ejecutiva (Púrpura Imperial a Índigo Real) */}
            <linearGradient id="auraSuitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="40%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>

            {/* Gradiente Solapa de Blazer (Morado Vibrante Satinado) */}
            <linearGradient id="auraLapelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>

            {/* Gradiente Blusa Interior Ejecutiva Cuello V (Blanco Perla Tecnológico) */}
            <linearGradient id="auraBlouseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </linearGradient>

            {/* Gradiente Chignon / Recogido Ejecutivo Biónico */}
            <linearGradient id="auraBunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* Gradiente Casco/Chasis de Cabeza Femenina (Azul Cobalto & Violeta Oscuro) */}
            <linearGradient id="auraHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="35%" stopColor="#312e81" />
              <stop offset="70%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Gradiente Montura de Gafas Inteligentes */}
            <linearGradient id="auraGlassesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Gradiente Bolso de Mano Cibernético */}
            <linearGradient id="auraBagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* Filtro de Resplandor Neón */}
            <filter id="auraGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* A. RECOGIDO / CHIGNON EJECUTIVO SUPERIOR (Elegancia Pura)  */}
          {/* ========================================================= */}
          <g transform="translate(105, 52)">
            {/* Moño Biónico Ovalado Satinado */}
            <ellipse
              cx="0"
              cy="0"
              rx="20"
              ry="12"
              fill="url(#auraBunGrad)"
              stroke="#8b5cf6"
              strokeWidth="1.8"
            />
            {/* Pasador / Tiara de Luz Azul Cian en el Recogido */}
            <path
              d="M -16 2 Q 0 -6 16 2"
              stroke="#38bdf8"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              filter="url(#auraGlow)"
            />
            <circle cx="0" cy="-2" r="2" fill="#ffffff" />
          </g>

          {/* ========================================================= */}
          {/* B. PROPULSOR / BASE ANTI-GRAVEDAD ENSAMBLADA A LA CADERA  */}
          {/* ========================================================= */}
          <g transform="translate(105, 206)">
            {/* Plasma Púrpura y Cian de Levitación */}
            <motion.ellipse
              cx="0"
              cy="16"
              rx="18"
              ry="9"
              fill="#a855f7"
              filter="url(#auraGlow)"
              animate={{
                ry: isSpeaking ? [9, 18, 9] : [7, 13, 7],
                opacity: isSpeaking ? [0.8, 1, 0.8] : [0.65, 0.9, 0.65],
                scaleX: [1, 1.14, 1]
              }}
              transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="0"
              cy="14"
              rx="11"
              ry="5"
              fill="#38bdf8"
              filter="url(#auraGlow)"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            {/* Núcleo Blanco de Flotación */}
            <circle cx="0" cy="12" r="3.2" fill="#ffffff" />
            
            {/* Tobera Mecánica Ensamblada Directamente a la Falda */}
            <path
              d="M -15 0 L -10 11 L 10 11 L 15 0 Z"
              fill="#1e1b4b"
              stroke="#8b5cf6"
              strokeWidth="1.8"
            />
            <line x1="-9" y1="5" x2="9" y2="5" stroke="#38bdf8" strokeWidth="1.4" />
          </g>

          {/* ========================================================= */}
          {/* C. TORSO: TRAJE DE SECRETARIA EJECUTIVA (BLAZER & BLUSA)  */}
          {/* ========================================================= */}
          <g transform="translate(105, 164)">
            {/* Falda de Tubo / Cadera Ejecutiva Biónica */}
            <path
              d="M -22 22 L 22 22 L 15 42 L -15 42 Z"
              fill="url(#auraSuitGrad)"
              stroke="#8b5cf6"
              strokeWidth="1.6"
            />
            {/* Cinturón Delgado Ejecutivo con Hebilla de Gema */}
            <rect x="-21" y="20" width="42" height="5" rx="1.5" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
            <circle cx="0" cy="22.5" r="2.8" fill="#38bdf8" filter="url(#auraGlow)" />

            {/* Base del Blazer Ejecutivo */}
            <path
              d="M -30 -26 L 30 -26 L 22 22 L -22 22 Z"
              fill="url(#auraSuitGrad)"
              stroke="#7c3aed"
              strokeWidth="1.8"
            />

            {/* Cuello y Garganta Biónica Elegante Conectada Continuamente */}
            <rect
              x="-9"
              y="-40"
              width="18"
              height="15"
              rx="4"
              fill="#1e1b4b"
              stroke="#8b5cf6"
              strokeWidth="1.4"
            />
            <line x1="-7" y1="-34" x2="7" y2="-34" stroke="#38bdf8" strokeWidth="1.2" />
            <line x1="-7" y1="-30" x2="7" y2="-30" stroke="#a855f7" strokeWidth="1.2" />

            {/* Cuello Camisero Blanco de Secretaria */}
            <path
              d="M -16 -26 L -7 -38 L 0 -26 L 7 -38 L 16 -26 Z"
              fill="#ffffff"
              stroke="#c7d2fe"
              strokeWidth="1"
            />

            {/* Blusa Interior Escote en V (Blanco Perla) */}
            <path
              d="M -13 -26 L 13 -26 L 0 -4 Z"
              fill="url(#auraBlouseGrad)"
              stroke="#c7d2fe"
              strokeWidth="0.8"
            />

            {/* Broche / Corbata Cuántica Estelar de Secretaria */}
            <g transform="translate(0, -14)">
              <polygon points="0,-4 3.5,0 0,6 -3.5,0" fill="#38bdf8" filter="url(#auraGlow)" />
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </g>

            {/* Solapa Izquierda del Blazer (Corte Ejecutivo Cruzado) */}
            <path
              d="M -30 -26 L -10 -26 L -2 -4 L -18 10 L -25 -6 Z"
              fill="url(#auraLapelGrad)"
              stroke="#a855f7"
              strokeWidth="1.4"
            />
            {/* Solapa Derecha del Blazer */}
            <path
              d="M 30 -26 L 10 -26 L 2 -4 L 18 10 L 25 -6 Z"
              fill="url(#auraLapelGrad)"
              stroke="#a855f7"
              strokeWidth="1.4"
            />

            {/* Botones Biónicos Dorados/Cian del Traje */}
            <circle cx="0" cy="6" r="2" fill="#38bdf8" stroke="#8b5cf6" strokeWidth="0.8" />
            <circle cx="0" cy="14" r="2" fill="#38bdf8" stroke="#8b5cf6" strokeWidth="0.8" />

            {/* Pañuelo de Bolsillo Ejecutivo en el Pecho */}
            <path d="M -23 -14 L -16 -14 L -19 -18 Z" fill="#38bdf8" opacity="0.9" />
          </g>

          {/* ========================================================= */}
          {/* D. BRAZO DERECHO: SOSTENIENDO EL BOLSO DE MANO             */}
          {/* ========================================================= */}
          <motion.g
            animate={
              isSpeaking
                ? { rotate: [-1, 2, -1], y: [0, -1, 0] }
                : { rotate: [0, 1, 0], y: [0, 0.5, 0] }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '142px 146px' }}
          >
            {/* Hombrera Ejecutiva de la Manga Derecha */}
            <circle cx="140" cy="146" r="10" fill="url(#auraLapelGrad)" stroke="#a855f7" strokeWidth="1.8" />
            
            {/* Manga del Blazer (Brazo doblado sosteniendo el bolso) */}
            <path
              d="M 140 146 L 152 176 L 140 196"
              stroke="#581c87"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 140 146 L 152 176 L 140 196"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Muñeca y Mano Femenina Sujetando el Asa */}
            <circle cx="140" cy="196" r="4.2" fill="#e0e7ff" stroke="#7c3aed" strokeWidth="1.2" />

            {/* 👜 BOLSO DE MANO DE DISEÑADORA CIBERNÉTICA */}
            <g transform="translate(140, 196)">
              {/* Asa Curva del Bolso (Sujetada por la mano) */}
              <path
                d="M -7 0 C -7 -14 7 -14 7 0"
                stroke="#c084fc"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Cuerpo del Bolso Ejecutivo */}
              <rect
                x="-15"
                y="0"
                width="30"
                height="24"
                rx="4"
                fill="url(#auraBagGrad)"
                stroke="#a855f7"
                strokeWidth="1.6"
              />

              {/* Solapa / Broche del Bolso */}
              <path
                d="M -15 0 L 15 0 L 12 11 L -12 11 Z"
                fill="#6d28d9"
                stroke="#c084fc"
                strokeWidth="1"
              />

              {/* Cerradura Metálica de Lujo (Gema Azul Cian) */}
              <rect x="-3.5" y="9" width="7" height="5" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="0" cy="11.5" r="1.5" fill="#38bdf8" filter="url(#auraGlow)" />

              {/* Pespunte / Costura Biónica del Bolso */}
              <line x1="-12" y1="20" x2="12" y2="20" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.8" />
            </g>
          </motion.g>

          {/* ========================================================= */}
          {/* E. BRAZO IZQUIERDO: GESTO ELEGANTE DE BIENVENIDA          */}
          {/* ========================================================= */}
          <motion.g
            animate={
              isSpeaking
                ? { rotate: [3, 15, 5, 14, 3], y: [0, -3, 0] }
                : { rotate: [0, 4, 0], y: [0, 1, 0] }
            }
            transition={{
              duration: isSpeaking ? 1.2 : 3.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: '70px 146px' }}
          >
            {/* Hombrera Ejecutiva de la Manga Izquierda */}
            <circle cx="70" cy="146" r="10" fill="url(#auraLapelGrad)" stroke="#a855f7" strokeWidth="1.8" />
            
            {/* Manga del Blazer */}
            <line x1="70" y1="146" x2="56" y2="176" stroke="#581c87" strokeWidth="7" strokeLinecap="round" />
            <line x1="70" y1="146" x2="56" y2="176" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />

            {/* Antebrazo Biónico Púrpura y Articulación */}
            <circle cx="56" cy="176" r="4.2" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="56" y1="176" x2="44" y2="198" stroke="#1e1b4b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="56" y1="176" x2="44" y2="198" stroke="#a855f7" strokeWidth="1.4" strokeLinecap="round" />

            {/* Palma Femenina Biónica Abierta en Gesto de Acogida */}
            <circle cx="44" cy="198" r="3.2" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" />
            <path
              d="M 44 198 C 40 205 36 211 31 213 C 30 208 34 202 41 197 Z"
              fill="#e0e7ff"
              stroke="#a855f7"
              strokeWidth="0.8"
            />
            <path
              d="M 44 198 C 39 207 34 214 28 217"
              stroke="#c084fc"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* ========================================================= */}
          {/* F. CABEZA Y ROSTRO: AURA CON GAFAS Y MAQUILLAJE           */}
          {/* ========================================================= */}
          <g transform="translate(105, 86)">
            {/* Contorno del Chasis Craneal Femenino y Elegante (Sin pelo raro) */}
            <path
              d="M -34 -20 C -34 -44 34 -44 34 -20 C 34 8 28 32 0 38 C -28 32 -34 8 -34 -20 Z"
              fill="url(#auraHeadGrad)"
              stroke="#8b5cf6"
              strokeWidth="2.2"
            />

            {/* Placa Frontal Superior Estilizada en Morado Brillante */}
            <path
              d="M -26 -28 C -14 -40 14 -40 26 -28 C 16 -34 -16 -34 -26 -28 Z"
              fill="#7c3aed"
              stroke="#a855f7"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Auriculares / Pendientes Biónicos Ejecutivos a los Lados */}
            <g transform="translate(-36, -6)">
              <rect x="-4" y="-12" width="7" height="24" rx="3.5" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.6" />
              <circle cx="-0.5" cy="0" r="2.2" fill="#a855f7" filter="url(#auraGlow)" />
            </g>
            <g transform="translate(36, -6)">
              <rect x="-3" y="-12" width="7" height="24" rx="3.5" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.6" />
              <circle cx="0.5" cy="0" r="2.2" fill="#a855f7" filter="url(#auraGlow)" />
            </g>

            {/* Visera Panorámica de Cristal Oscuro y Pulido */}
            <rect
              x="-27"
              y="-20"
              width="54"
              height="40"
              rx="12"
              fill="#060913"
              stroke="#6366f1"
              strokeWidth="1.6"
            />

            {/* Reflejo Especular Superior de Cristal */}
            <path
              d="M -21 -16 L 16 -16 C 21 -16 21 -12 16 -12 L -21 -12 Z"
              fill="#ffffff"
              opacity="0.14"
            />

            {/* ======================================================= */}
            {/* MAQUILLAJE FEMENINO Y RUBOR EN MEJILLAS                */}
            {/* ======================================================= */}
            <ellipse cx="-16" cy="7" rx="5.5" ry="2.6" fill="#f472b6" opacity="0.32" filter="url(#auraGlow)" />
            <ellipse cx="16" cy="7" rx="5.5" ry="2.6" fill="#f472b6" opacity="0.32" filter="url(#auraGlow)" />

            {/* ======================================================= */}
            {/* OJOS FEMENINOS CON PESTAÑAS LARGAS Y PARPADEO           */}
            {/* ======================================================= */}
            <g filter="url(#auraGlow)">
              {/* Ojo Izquierdo */}
              <motion.g
                animate={{ scaleY: blink ? 0.08 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformOrigin: '-11px -4px' }}
              >
                {/* Pestañas Superiores Gruesas y Curvas */}
                <path
                  d="M -20 -9 C -14 -15 -7 -14 -2 -9"
                  stroke="#38bdf8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <line x1="-20" y1="-9" x2="-24" y2="-13" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="-18" y1="-12" x2="-21" y2="-16" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="-14" y1="-14" x2="-15" y2="-18" stroke="#c084fc" strokeWidth="1.2" strokeLinecap="round" />

                {/* Iris Morado / Azul Cian */}
                <ellipse cx="-11" cy="-4" rx="7.5" ry="8.5" fill="#4338ca" />
                <circle cx="-11" cy="-4" r="5.2" fill="#38bdf8" />
                <circle cx="-11" cy="-4" r="2.8" fill="#1e1b4b" />
                {/* Destellos Especulares */}
                <circle cx="-9" cy="-6" r="2.4" fill="#ffffff" />
                <circle cx="-13" cy="-2" r="1.1" fill="#ffffff" opacity="0.85" />
              </motion.g>

              {/* Ojo Derecho */}
              <motion.g
                animate={{ scaleY: blink ? 0.08 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformOrigin: '11px -4px' }}
              >
                {/* Pestañas Superiores Gruesas y Curvas */}
                <path
                  d="M 2 -9 C 7 -14 14 -15 20 -9"
                  stroke="#38bdf8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <line x1="20" y1="-9" x2="24" y2="-13" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="18" y1="-12" x2="21" y2="-16" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="14" y1="-14" x2="15" y2="-18" stroke="#c084fc" strokeWidth="1.2" strokeLinecap="round" />

                {/* Iris Morado / Azul Cian */}
                <ellipse cx="11" cy="-4" rx="7.5" ry="8.5" fill="#4338ca" />
                <circle cx="11" cy="-4" r="5.2" fill="#38bdf8" />
                <circle cx="11" cy="-4" r="2.8" fill="#1e1b4b" />
                {/* Destellos Especulares */}
                <circle cx="13" cy="-6" r="2.4" fill="#ffffff" />
                <circle cx="9" cy="-2" r="1.1" fill="#ffffff" opacity="0.85" />
              </motion.g>
            </g>

            {/* ======================================================= */}
            {/* 👓 GAFAS EJECUTIVAS INTELIGENTES DE SECRETARIA          */}
            {/* ======================================================= */}
            <g>
              {/* Lente Izquierda Tintada con Montura Cat-Eye */}
              <path
                d="M -23 -13 L -3 -11 C -2 1 -6 6 -12 6 C -19 6 -24 1 -23 -13 Z"
                fill="rgba(56, 189, 248, 0.12)"
                stroke="url(#auraGlassesGrad)"
                strokeWidth="1.8"
              />
              {/* Reflejo Angular en el Cristal Izquierdo */}
              <line x1="-20" y1="-8" x2="-8" y2="3" stroke="#ffffff" strokeWidth="1" opacity="0.45" strokeLinecap="round" />

              {/* Lente Derecha Tintada con Montura Cat-Eye */}
              <path
                d="M 3 -11 L 23 -13 C 24 1 19 6 12 6 C 6 6 2 1 3 -11 Z"
                fill="rgba(56, 189, 248, 0.12)"
                stroke="url(#auraGlassesGrad)"
                strokeWidth="1.8"
              />
              {/* Reflejo Angular en el Cristal Derecho */}
              <line x1="7" y1="-8" x2="19" y2="3" stroke="#ffffff" strokeWidth="1" opacity="0.45" strokeLinecap="round" />

              {/* Puente Central Elegante de las Gafas */}
              <path d="M -3 -8 Q 0 -11 3 -8" stroke="#c084fc" strokeWidth="1.8" fill="none" strokeLinecap="round" />

              {/* Patillas de las Gafas Hacia las Orejas */}
              <line x1="-23" y1="-12" x2="-32" y2="-10" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="23" y1="-12" x2="32" y2="-10" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
            </g>

            {/* ======================================================= */}
            {/* BOCA / SINTETIZADOR FONO-REACTIVO DINÁMICO              */}
            {/* ======================================================= */}
            {isSpeaking ? (
              // Ecualizador Dinámico de Voz cuando AURA habla
              <g transform="translate(0, 15)" filter="url(#auraGlow)">
                <motion.line
                  x1="-10"
                  y1="0"
                  x2="-10"
                  y2="0"
                  stroke="#a855f7"
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
                  stroke="#38bdf8"
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
                  stroke="#ffffff"
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
                  stroke="#38bdf8"
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
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y1: [-2, -4, -1, -3, -2], y2: [2, 4, 1, 3, 2] }}
                  transition={{ duration: 0.28, repeat: Infinity }}
                />
              </g>
            ) : (
              // Labios Femeninos y Sonrisa Amable de Asistente en Reposo
              <g transform="translate(0, 15)">
                <path
                  d="M -6 -1 Q 0 4 6 -1"
                  fill="none"
                  stroke="#f472b6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                {/* Brillo labial */}
                <circle cx="0" cy="1.5" r="1" fill="#ffffff" opacity="0.75" />
              </g>
            )}
          </g>

        </svg>
      </motion.div>

      {/* 3. Badge Táctico Opcional */}
      {showBadge && (
        <span
          className={`absolute bottom-1 right-2 w-2.5 h-2.5 rounded-full z-30 transition-colors ${
            isSpeaking
              ? 'bg-purple-400 shadow-[0_0_12px_#c084fc] animate-pulse'
              : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
          }`}
        />
      )}
    </div>
  );
}
