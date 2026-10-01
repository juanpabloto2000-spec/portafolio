import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * AndroidVoiceAvatar - Asistente AURA
 * Motor Vectorial Mecha Femenino a 60 FPS con Animación Orgánica Multi-Acción:
 * - Aceleración GPU con CSS Transforms y `transform-box: view-box` (Pivotes anatómicos de alta fidelidad).
 * - Multi-Acciones Autónomas & Manuales:
 *   1. 'wave': Levanta el brazo izquierdo (-70°) y agita la mano saludando con entusiasmo.
 *   2. 'jump': Salto cuántico antigravedad (-38px) con anticipación, squash & stretch y eyección de plasma.
 *   3. 'glasses': Gesto de secretaria ejecutiva acomodándose las gafas inteligentes de montura cat-eye.
 *   4. 'speaking': Gesticulación oratoria activa con ambas manos, cabeceo empático y ecualizador bucal.
 *   5. 'hover': Flotación suave y natural con balanceo pendular del bolso y respiración biónica.
 * - Inercia Física Pendular del Bolso de Mano: Balanceo continuo con retardo físico.
 * - Chorro de Plasma y Chispas Reactivas que caen al acelerar el propulsor.
 * - Cabeza y Cabeceo Independiente del Torso.
 * - Control Manual y Clic Reactivo: Recibe prop `forcedAction` y reacciona al clic.
 * - 100% SVG Vectorial GPU-acelerado sin imágenes rasterizadas ni estáticas.
 */
export default function AndroidVoiceAvatar({
  size = 'md',
  isSpeaking = false,
  forcedAction = null,
  onActionComplete = null,
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
        if (Math.random() < 0.25) {
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

  // --------------------------------------------------------------------------
  // MÁQUINA DE ACCIONES DINÁMICAS (SALTOS, SALUDOS, GAFAS, ORATORIA)
  // --------------------------------------------------------------------------
  const [activeAction, setActiveAction] = useState('wave'); // Inicia con saludo visible
  const [actionKey, setActionKey] = useState(0);

  // Escuchar acciones forzadas desde botones externos
  useEffect(() => {
    if (forcedAction) {
      setActiveAction(forcedAction);
      setActionKey(k => k + 1);
    }
  }, [forcedAction]);

  // Manejo de habla
  useEffect(() => {
    if (isSpeaking) {
      setActiveAction('speaking');
      setActionKey(k => k + 1);
      return;
    }
  }, [isSpeaking]);

  // Ciclo autónomo variado cuando está en reposo
  useEffect(() => {
    if (isSpeaking || forcedAction) return;

    // Rutina coreográfica: Saludo -> Flotar -> Salto Antigravedad -> Flotar -> Acomodarse Gafas
    const actionList = ['wave', 'hover', 'jump', 'hover', 'glasses', 'hover', 'jump'];
    let idx = 0;

    const cycleTimer = setInterval(() => {
      idx = (idx + 1) % actionList.length;
      setActiveAction(actionList[idx]);
      setActionKey(k => k + 1);
    }, 4500);

    return () => clearInterval(cycleTimer);
  }, [isSpeaking, forcedAction]);

  // Clic en Aura: Salto cuántico seguido de saludo
  const handleAuraClick = () => {
    setActiveAction('jump');
    setActionKey(k => k + 1);
    setTimeout(() => {
      setActiveAction('wave');
      setActionKey(k => k + 1);
      setTimeout(() => {
        setActiveAction(isSpeaking ? 'speaking' : 'hover');
        setActionKey(k => k + 1);
        if (onActionComplete) onActionComplete();
      }, 2600);
    }, 1200);
  };

  // Dimensiones según el tamaño
  const dimensions = useMemo(() => {
    switch (size) {
      case 'hero':
      case 'xl':
        return { w: 290, h: 380, tiltFactor: 8 };
      case 'modal':
        return { w: 240, h: 315, tiltFactor: 7 };
      case 'compact-modal':
        return { w: 145, h: 190, tiltFactor: 5 };
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
      onClick={handleAuraClick}
      title="¡Haz clic en Aura para interactuar!"
      className={`relative flex items-center justify-center select-none overflow-visible cursor-pointer group ${className}`}
      style={{
        width: dimensions.w,
        height: dimensions.h,
        perspective: '900px'
      }}
    >
      {/* 1. Aura Volumétrica Ambiental en Púrpura y Azul Cósmico */}
      <motion.div
        animate={{
          scale: isSpeaking || activeAction === 'jump' ? [1, 1.38, 1.2, 1.3, 1] : [1, 1.08, 1],
          opacity: isSpeaking || activeAction === 'jump' ? [0.65, 0.95, 0.75, 0.9, 0.65] : [0.3, 0.48, 0.3]
        }}
        transition={{
          duration: activeAction === 'jump' ? 1.1 : isSpeaking ? 1.2 : 3.5,
          repeat: activeAction === 'jump' ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        className="absolute rounded-full blur-3xl pointer-events-none z-0"
        style={{
          width: dimensions.w * 0.95,
          height: dimensions.h * 0.95,
          background: 'radial-gradient(circle, rgba(168,85,247,0.52) 0%, rgba(59,130,246,0.4) 45%, rgba(99,102,241,0.15) 70%, transparent 80%)'
        }}
      />

      {/* 2. Cuerpo Androide Articulado con Físicas Vivas y 3D Parallax */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${tiltX}deg) rotateX(${tiltY}deg)`
        }}
      >
        <svg
          viewBox="0 0 210 275"
          className="w-full h-full filter drop-shadow-[0_16px_36px_rgba(124,58,237,0.3)] pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ========================================================= */}
          {/* DEFINICIÓN DE KEYFRAMES CSS DE ALTA VELOCIDAD A 60 FPS    */}
          {/* ========================================================= */}
          <defs>
            <style>{`
              @keyframes auraArmWave {
                0%, 100% { transform: rotate(92deg); }
                50% { transform: rotate(104deg); }
              }
              @keyframes auraForearmWave {
                0%, 100% { transform: rotate(26deg); }
                50% { transform: rotate(62deg); }
              }
              @keyframes auraGlassesArm {
                0%, 100% { transform: rotate(0deg); }
                30%, 75% { transform: rotate(145deg); }
              }
              @keyframes auraGlassesForearm {
                0%, 100% { transform: rotate(0deg); }
                30%, 75% { transform: rotate(45deg); }
              }
              @keyframes auraSpeakingArm {
                0%, 100% { transform: rotate(4deg); }
                50% { transform: rotate(24deg); }
              }
              @keyframes auraHandbagSwing {
                0%, 100% { transform: rotate(-6deg); }
                50% { transform: rotate(8deg); }
              }
              @keyframes auraHandbagJump {
                0%, 100% { transform: rotate(0deg); }
                20% { transform: rotate(-24deg); }
                50% { transform: rotate(28deg); }
                80% { transform: rotate(-10deg); }
              }
              @keyframes auraHeadTilt {
                0%, 100% { transform: rotate(-2deg); }
                50% { transform: rotate(3deg); }
              }
              @keyframes auraHeadSpeaking {
                0%, 100% { transform: rotate(-2.5deg) translateY(0); }
                50% { transform: rotate(2.5deg) translateY(-2px); }
              }
              @keyframes auraBodyHover {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              @keyframes auraBodyJump {
                0%, 100% { transform: translateY(0px) scale(1, 1); }
                12% { transform: translateY(8px) scale(1.08, 0.9); }
                40% { transform: translateY(-38px) scale(0.93, 1.12); }
                65% { transform: translateY(-28px) scale(1.02, 0.98); }
                82% { transform: translateY(3px) scale(0.99, 1.01); }
              }
              @keyframes auraThrusterPlasma {
                0%, 100% { transform: scale(1, 1); opacity: 0.7; }
                50% { transform: scale(1.15, 1.35); opacity: 0.95; }
              }
              @keyframes auraThrusterJump {
                0%, 100% { transform: scale(1, 1); }
                15% { transform: scale(0.8, 0.5); }
                42% { transform: scale(1.35, 2.3); opacity: 1; }
                70% { transform: scale(1.1, 1.4); }
              }
              @keyframes auraParticleDrop {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(36px) scale(0.2); opacity: 0; }
              }
            `}</style>

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
          {/* GRUPO MAESTRO CON SALTO Y SQUASH & STRETCH A 60 FPS       */}
          {/* ========================================================= */}
          <g
            key={actionKey}
            style={{
              transformOrigin: '105px 200px',
              transformBox: 'view-box',
              animation: activeAction === 'jump'
                ? 'auraBodyJump 1.2s cubic-bezier(0.16, 1, 0.3, 1) infinite'
                : activeAction === 'speaking'
                ? 'auraBodyHover 1.3s ease-in-out infinite'
                : 'auraBodyHover 3.0s ease-in-out infinite'
            }}
          >
            {/* ========================================================= */}
            {/* A. PROPULSOR / BASE ANTI-GRAVEDAD CON CHORRO DE PLASMA     */}
            {/* ========================================================= */}
            <g transform="translate(105, 206)">
              {/* Llama de Plasma Violeta Reactiva */}
              <ellipse
                cx="0"
                cy="16"
                rx="18"
                ry="10"
                fill="#a855f7"
                filter="url(#auraGlow)"
                style={{
                  transformOrigin: '0px 10px',
                  animation: activeAction === 'jump'
                    ? 'auraThrusterJump 1.2s ease-in-out infinite'
                    : 'auraThrusterPlasma 1.6s ease-in-out infinite'
                }}
              />

              {/* Núcleo de Plasma Azul Cian */}
              <ellipse
                cx="0"
                cy="14"
                rx="11"
                ry="6"
                fill="#38bdf8"
                filter="url(#auraGlow)"
                style={{
                  transformOrigin: '0px 10px',
                  animation: activeAction === 'jump'
                    ? 'auraThrusterJump 1.2s ease-in-out infinite'
                    : 'auraThrusterPlasma 1.2s ease-in-out infinite'
                }}
              />
              <circle cx="0" cy="12" r="3.2" fill="#ffffff" />

              {/* ✨ CHISPAS Y PARTÍCULAS CUÁNTICAS QUE CAEN */}
              {(activeAction === 'jump' || isSpeaking) && (
                <g>
                  <circle
                    cx="-6"
                    cy="20"
                    r="2"
                    fill="#38bdf8"
                    style={{ animation: 'auraParticleDrop 0.5s ease-out infinite' }}
                  />
                  <circle
                    cx="0"
                    cy="22"
                    r="2.5"
                    fill="#ffffff"
                    style={{ animation: 'auraParticleDrop 0.45s ease-out infinite 0.15s' }}
                  />
                  <circle
                    cx="6"
                    cy="20"
                    r="2"
                    fill="#c084fc"
                    style={{ animation: 'auraParticleDrop 0.52s ease-out infinite 0.08s' }}
                  />
                </g>
              )}

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
            {/* B. TORSO: TRAJE DE SECRETARIA EJECUTIVA (BLAZER & BLUSA)  */}
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
            {/* C. BRAZO DERECHO & BOLSO (INERCIA PENDULAR A 60 FPS)      */}
            {/* ========================================================= */}
            <g>
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

              {/* 👜 BOLSO DE MANO DE DISEÑADORA CON PÉNDULO FÍSICO */}
              <g
                style={{
                  transformOrigin: '140px 196px',
                  transformBox: 'view-box',
                  animation: activeAction === 'jump'
                    ? 'auraHandbagJump 1.2s ease-in-out infinite'
                    : 'auraHandbagSwing 2.4s ease-in-out infinite'
                }}
              >
                {/* Asa Curva del Bolso */}
                <path
                  d="M 133 196 C 133 182 147 182 147 196"
                  stroke="#c084fc"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Cuerpo del Bolso Ejecutivo */}
                <rect
                  x="125"
                  y="196"
                  width="30"
                  height="24"
                  rx="4"
                  fill="url(#auraBagGrad)"
                  stroke="#a855f7"
                  strokeWidth="1.6"
                />

                {/* Solapa / Broche del Bolso */}
                <path
                  d="M 125 196 L 155 196 L 152 207 L 128 207 Z"
                  fill="#6d28d9"
                  stroke="#c084fc"
                  strokeWidth="1"
                />

                {/* Cerradura Metálica de Lujo (Gema Azul Cian) */}
                <rect x="136.5" y="205" width="7" height="5" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="140" cy="207.5" r="1.5" fill="#38bdf8" filter="url(#auraGlow)" />

                {/* Pespunte / Costura Biónica del Bolso */}
                <line x1="128" y1="216" x2="152" y2="216" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.8" />
              </g>
            </g>

            {/* ========================================================= */}
            {/* D. BRAZO IZQUIERDO Y MANO: SALUDO ALTO, GAFAS Y ORATORIA   */}
            {/* ========================================================= */}
            <g
              style={{
                transformOrigin: '70px 146px',
                transformBox: 'view-box',
                animation: activeAction === 'wave'
                  ? 'auraArmWave 0.75s ease-in-out infinite'
                  : activeAction === 'glasses'
                  ? 'auraGlassesArm 2.2s ease-in-out infinite'
                  : activeAction === 'speaking'
                  ? 'auraSpeakingArm 1.3s ease-in-out infinite'
                  : 'none',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Hombrera Ejecutiva de la Manga Izquierda */}
              <circle cx="70" cy="146" r="10" fill="url(#auraLapelGrad)" stroke="#a855f7" strokeWidth="1.8" />
              
              {/* Manga del Blazer */}
              <line x1="70" y1="146" x2="56" y2="176" stroke="#581c87" strokeWidth="7" strokeLinecap="round" />
              <line x1="70" y1="146" x2="56" y2="176" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />

              {/* Antebrazo y Mano Articulados (Con flexión y agitación) */}
              <g
                style={{
                  transformOrigin: '56px 176px',
                  transformBox: 'view-box',
                  animation: activeAction === 'wave'
                    ? 'auraForearmWave 0.38s ease-in-out infinite'
                    : activeAction === 'glasses'
                    ? 'auraGlassesForearm 2.2s ease-in-out infinite'
                    : 'none',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Codo Biónico Púrpura */}
                <circle cx="56" cy="176" r="4.2" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="56" y1="176" x2="44" y2="198" stroke="#1e1b4b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="56" y1="176" x2="44" y2="198" stroke="#a855f7" strokeWidth="1.4" strokeLinecap="round" />

                {/* Mano Femenina Biónica con Palma y Dedos en Gesto Vivo */}
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
              </g>
            </g>

            {/* ========================================================= */}
            {/* E. CABEZA ARTICULADA: CABECEO EMPÁTICO Y GAFAS DE SECRETARIA */}
            {/* ========================================================= */}
            <g
              style={{
                transformOrigin: '105px 124px',
                transformBox: 'view-box',
                animation: activeAction === 'speaking'
                  ? 'auraHeadSpeaking 1.2s ease-in-out infinite'
                  : 'auraHeadTilt 3.2s ease-in-out infinite'
              }}
            >
              <g transform="translate(105, 86)">
                {/* Chignon / Recogido Ejecutivo Biónico */}
                <g transform="translate(0, -34)">
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="20"
                    ry="12"
                    fill="url(#auraBunGrad)"
                    stroke="#8b5cf6"
                    strokeWidth="1.8"
                  />
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

                {/* Contorno del Chasis Craneal Femenino y Elegante */}
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
                    <circle cx="0" cy="1.5" r="1" fill="#ffffff" opacity="0.75" />
                  </g>
                )}
              </g>
            </g>

          </g>

        </svg>
      </div>

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
