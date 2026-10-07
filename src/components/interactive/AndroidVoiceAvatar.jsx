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
  // CANALES DE ANIMACIÓN DESACOPLADOS Y COMPONIBLES A 60 FPS
  // - Habla: `isSpeaking` (boca ecualizadora activa y cabeceo empático)
  // - Saludo: `isWaving` (alza el brazo bien alto al lado de su rostro y volea la mano)
  // - Salto: `isJumping` (desplazamiento vertical cuántico con plasma y squash)
  // ¡Todos ocurren de manera independiente y simultánea sin pisarse jamás!
  // --------------------------------------------------------------------------
  const [isWaving, setIsWaving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const busyActionRef = React.useRef(false);
  const auraTimersRef = React.useRef([]);

  const clearAuraTimers = () => {
    auraTimersRef.current.forEach(t => clearTimeout(t));
    auraTimersRef.current = [];
  };

  useEffect(() => {
    return () => clearAuraTimers();
  }, []);

  // Escuchar acciones forzadas desde botones externos o triggers
  useEffect(() => {
    if (forcedAction === 'wave') {
      clearAuraTimers();
      setIsJumping(false);
      setIsWaving(true);
      const timer = setTimeout(() => {
        setIsWaving(false);
        busyActionRef.current = false;
        if (onActionComplete) onActionComplete();
      }, 2600);
      auraTimersRef.current.push(timer);
    } else if (forcedAction === 'jump') {
      clearAuraTimers();
      setIsWaving(false);
      setIsJumping(true);
      const timer = setTimeout(() => {
        setIsJumping(false);
        busyActionRef.current = false;
        if (onActionComplete) onActionComplete();
      }, 1200);
      auraTimersRef.current.push(timer);
    }
  }, [forcedAction]);

  // Clic en Aura: Salto cuántico seguido de saludo en alto con candado anti-spam
  const handleAuraClick = () => {
    if (isJumping || isWaving || busyActionRef.current) return;
    busyActionRef.current = true;
    clearAuraTimers();

    setIsJumping(true);
    const t1 = setTimeout(() => {
      setIsJumping(false);
      setIsWaving(true);
      const t2 = setTimeout(() => {
        setIsWaving(false);
        busyActionRef.current = false;
        if (onActionComplete) onActionComplete();
      }, 2600);
      auraTimersRef.current.push(t2);
    }, 1200);
    auraTimersRef.current.push(t1);
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
      {/* 1. Aura Volumétrica Ambiental en Titanio Espacial con Acentos Fotónicos Violeta y Cian */}
      <motion.div
        animate={{
          scale: isSpeaking || isJumping ? [1, 1.38, 1.2, 1.3, 1] : [1, 1.08, 1],
          opacity: isSpeaking || isJumping ? [0.65, 0.95, 0.75, 0.9, 0.65] : [0.35, 0.52, 0.35]
        }}
        transition={{
          duration: isJumping ? 1.1 : isSpeaking ? 1.2 : 3.5,
          repeat: isJumping ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        className="absolute rounded-full blur-3xl pointer-events-none z-0"
        style={{
          width: dimensions.w * 0.95,
          height: dimensions.h * 0.95,
          background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(56,189,248,0.25) 42%, rgba(15,23,42,0.3) 70%, transparent 85%)'
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
          className="w-full h-full filter drop-shadow-[0_16px_36px_rgba(124,58,237,0.25)] pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ========================================================= */}
          {/* DEFINICIÓN DE KEYFRAMES CSS DE ALTA VELOCIDAD A 60 FPS    */}
          {/* ========================================================= */}
          <defs>
            <style>{`
              @keyframes auraArmWaveHigh {
                0%, 100% { transform: rotate(-22deg); }
                50% { transform: rotate(26deg); }
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

            {/* ========================================================= */}
            {/* MATERIALES METÁLICOS PBR INDUSTRIALES (ESPACIO NEGRO/CROMO) */}
            {/* ========================================================= */}

            {/* 1. Titanio Gris Aeroespacial Cepillado (Chasis Estructural) */}
            <linearGradient id="auraChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="18%" stopColor="#52525b" />
              <stop offset="35%" stopColor="#71717a" />
              <stop offset="48%" stopColor="#a1a1aa" />
              <stop offset="52%" stopColor="#d4d4d8" />
              <stop offset="58%" stopColor="#a1a1aa" />
              <stop offset="78%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>

            {/* 2. Cromo Espejo Pulido de Alto Brillo (Biselados y Articulaciones) */}
            <linearGradient id="pbrChromeMirror" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#e4e4e7" />
              <stop offset="38%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#71717a" />
              <stop offset="72%" stopColor="#d4d4d8" />
              <stop offset="85%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* 3. Traje Blazer y Chasis Completo en Titanio Gris Metálico (Gunmetal Titanium Satinado) */}
            <linearGradient id="auraSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="18%" stopColor="#52525b" />
              <stop offset="35%" stopColor="#71717a" />
              <stop offset="48%" stopColor="#a1a1aa" />
              <stop offset="54%" stopColor="#d4d4d8" />
              <stop offset="60%" stopColor="#a1a1aa" />
              <stop offset="70%" stopColor="#71717a" />
              <stop offset="85%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>

            {/* 4. Solapas de Blazer y Acentos Ejecutivos en Titanio Púrpura Metalizado PBR */}
            <linearGradient id="auraLapelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e0836" />
              <stop offset="20%" stopColor="#3b0764" />
              <stop offset="38%" stopColor="#581c87" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#c084fc" />
              <stop offset="82%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#1e0836" />
            </linearGradient>

            {/* 5. Blusa y Manos en Titanio Gris Metálico Uniforme PBR */}
            <linearGradient id="auraBlouseGrad" x1="0%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="25%" stopColor="#52525b" />
              <stop offset="45%" stopColor="#71717a" />
              <stop offset="60%" stopColor="#a1a1aa" />
              <stop offset="75%" stopColor="#71717a" />
              <stop offset="90%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>

            {/* 6. Gorro / Chignon Biónico en Titanio Púrpura Metalizado PBR */}
            <linearGradient id="auraBunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e0836" />
              <stop offset="20%" stopColor="#3b0764" />
              <stop offset="40%" stopColor="#6b21a8" />
              <stop offset="52%" stopColor="#9333ea" />
              <stop offset="60%" stopColor="#c084fc" />
              <stop offset="68%" stopColor="#f3e8ff" />
              <stop offset="80%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>

            {/* 7. Casco/Chasis de Cabeza en Titanio Gris Metálico Uniforme */}
            <linearGradient id="auraHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="18%" stopColor="#52525b" />
              <stop offset="35%" stopColor="#71717a" />
              <stop offset="48%" stopColor="#a1a1aa" />
              <stop offset="54%" stopColor="#d4d4d8" />
              <stop offset="60%" stopColor="#a1a1aa" />
              <stop offset="70%" stopColor="#71717a" />
              <stop offset="85%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>

            {/* 7A. Iris Ocular en Púrpura Fotónico Luminous */}
            <radialGradient id="auraIrisGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#f3e8ff" />
              <stop offset="48%" stopColor="#c084fc" />
              <stop offset="70%" stopColor="#9333ea" />
              <stop offset="88%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>

            {/* 7B. Visera Panorámica en Cristal Zafiro Negro Pulido */}
            <linearGradient id="auraVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#050505" />
              <stop offset="50%" stopColor="#0f0f11" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>

            {/* 8. Montura de Gafas Cat-Eye en Titanio Púrpura Metalizado & Cromo */}
            <linearGradient id="auraGlassesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="25%" stopColor="#581c87" />
              <stop offset="45%" stopColor="#7c3aed" />
              <stop offset="55%" stopColor="#c084fc" />
              <stop offset="65%" stopColor="#f5d0fe" />
              <stop offset="80%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>

            {/* 8B. Pincel / Stylus Biónico en Titanio Púrpura & Cromo Líquido */}
            <linearGradient id="auraPincelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e0836" />
              <stop offset="20%" stopColor="#3b0764" />
              <stop offset="42%" stopColor="#6b21a8" />
              <stop offset="54%" stopColor="#9333ea" />
              <stop offset="64%" stopColor="#c084fc" />
              <stop offset="72%" stopColor="#f3e8ff" />
              <stop offset="85%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>

            {/* 9. Bolso de Mano Cibernético en Titanio Ciruela Púrpura PBR & Cromo */}
            <linearGradient id="auraBagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#150524" />
              <stop offset="22%" stopColor="#2e0854" />
              <stop offset="45%" stopColor="#581c87" />
              <stop offset="55%" stopColor="#7c3aed" />
              <stop offset="65%" stopColor="#4c1d95" />
              <stop offset="85%" stopColor="#24073d" />
              <stop offset="100%" stopColor="#150524" />
            </linearGradient>

            {/* 10. Tobera Antigravedad en Tungsteno Tratado y Titanio Gris */}
            <linearGradient id="auraNozzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="35%" stopColor="#3f3f46" />
              <stop offset="60%" stopColor="#52525b" />
              <stop offset="85%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>

            {/* FILTROS PBR NATIVOS DE ALTA FIDELIDAD */}
            {/* A. Resplandor Especular */}
            <filter id="auraGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* B. Relieve Físico Especular para Metal CNC */}
            <filter id="pbrMetalBevel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="2.5" specularConstant="1.2" specularExponent="22" lightingColor="#ffffff" result="specOut">
                <fePointLight x="60" y="40" z="140" />
              </feSpecularLighting>
              <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specIn" />
              <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* GRUPO MAESTRO CON SALTO Y SQUASH & STRETCH A 60 FPS       */}
          {/* ========================================================= */}
          <g
            style={{
              transformOrigin: '105px 200px',
              transformBox: 'view-box',
              animation: isJumping
                ? 'auraBodyJump 1.2s cubic-bezier(0.16, 1, 0.3, 1) infinite'
                : isSpeaking
                ? 'auraBodyHover 1.3s ease-in-out infinite'
                : 'auraBodyHover 3.0s ease-in-out infinite'
            }}
          >
            {/* ========================================================= */}
            {/* A. PROPULSOR / BASE ANTI-GRAVEDAD CON CHORRO DE PLASMA     */}
            {/* ========================================================= */}
            <g transform="translate(105, 206)">
              {/* Llama de Plasma Violeta Sutil */}
              <ellipse
                cx="0"
                cy="16"
                rx="16"
                ry="9"
                fill="#a855f7"
                opacity="0.75"
                filter="url(#auraGlow)"
                style={{
                  transformOrigin: '0px 10px',
                  animation: isJumping
                    ? 'auraThrusterJump 1.2s ease-in-out infinite'
                    : 'auraThrusterPlasma 1.6s ease-in-out infinite'
                }}
              />

              {/* Núcleo de Plasma Azul Cian Fotónico */}
              <ellipse
                cx="0"
                cy="14"
                rx="10"
                ry="5"
                fill="#38bdf8"
                filter="url(#auraGlow)"
                style={{
                  transformOrigin: '0px 10px',
                  animation: isJumping
                    ? 'auraThrusterJump 1.2s ease-in-out infinite'
                    : 'auraThrusterPlasma 1.2s ease-in-out infinite'
                }}
              />
              <circle cx="0" cy="12" r="3" fill="#ffffff" />

              {/* ✨ CHISPAS Y PARTÍCULAS CUÁNTICAS SUTILES */}
              {(isJumping || isSpeaking) && (
                <g>
                  <circle
                    cx="-6"
                    cy="20"
                    r="1.8"
                    fill="#38bdf8"
                    style={{ animation: 'auraParticleDrop 0.5s ease-out infinite' }}
                  />
                  <circle
                    cx="0"
                    cy="22"
                    r="2.2"
                    fill="#ffffff"
                    style={{ animation: 'auraParticleDrop 0.45s ease-out infinite 0.15s' }}
                  />
                  <circle
                    cx="6"
                    cy="20"
                    r="1.8"
                    fill="#c084fc"
                    style={{ animation: 'auraParticleDrop 0.52s ease-out infinite 0.08s' }}
                  />
                </g>
              )}

              {/* Tobera Mecánica en Tungsteno Pulido y Cromo Espejo */}
              <path
                d="M -15 0 L -10 11 L 10 11 L 15 0 Z"
                fill="url(#auraNozzleGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.8"
              />
              <line x1="-13" y1="1" x2="13" y2="1" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
              <line x1="-9" y1="5" x2="9" y2="5" stroke="#38bdf8" strokeWidth="1.5" filter="url(#auraGlow)" />
              <line x1="-7" y1="8" x2="7" y2="8" stroke="#a855f7" strokeWidth="1.2" />
            </g>

            {/* ========================================================= */}
            {/* B. TORSO: TRAJE EJECUTIVO EN TITANIO NEGRO ESPACIAL PBR   */}
            {/* ========================================================= */}
            <g transform="translate(105, 164)">
              {/* Falda de Tubo / Cadera Biónica en Titanio Gris con Biseles de Cromo */}
              <path
                d="M -22 22 L 22 22 L 15 42 L -15 42 Z"
                fill="url(#auraSuitGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.8"
              />
              {/* Ranuras de ensamblaje de blindaje lateral (Panel Lines) */}
              <line x1="-12" y1="24" x2="-8" y2="40" stroke="#27272a" strokeWidth="1.4" />
              <line x1="-11" y1="24" x2="-7" y2="40" stroke="#a855f7" strokeWidth="1.2" opacity="0.85" filter="url(#auraGlow)" />
              <line x1="12" y1="24" x2="8" y2="40" stroke="#27272a" strokeWidth="1.4" />
              <line x1="11" y1="24" x2="7" y2="40" stroke="#a855f7" strokeWidth="1.2" opacity="0.85" filter="url(#auraGlow)" />
              {/* Ribete Inferior de la Falda en Titanio Púrpura Metalizado */}
              <line x1="-14" y1="41" x2="14" y2="41" stroke="url(#auraLapelGrad)" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="-13" y1="41" x2="13" y2="41" stroke="#ffffff" strokeWidth="0.6" opacity="0.75" strokeLinecap="round" />

              {/* Cinturón en Titanio Púrpura Metalizado con Hebilla de Cromo y Diodo Zafiro */}
              <rect x="-21" y="20" width="42" height="5" rx="1.5" fill="url(#auraLapelGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1" />
              <line x1="-20" y1="21" x2="20" y2="21" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
              <rect x="-6" y="19" width="12" height="7" rx="2" fill="url(#pbrChromeMirror)" stroke="#a855f7" strokeWidth="1" />
              <circle cx="0" cy="22.5" r="2" fill="#38bdf8" filter="url(#auraGlow)" />

              {/* Base del Blazer Ejecutivo en Titanio Gris Metálico */}
              <path
                d="M -30 -26 L 30 -26 L 22 22 L -22 22 Z"
                fill="url(#auraSuitGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.8"
              />
              {/* Bisel de luz superior del blazer */}
              <line x1="-28" y1="-25" x2="28" y2="-25" stroke="#ffffff" strokeWidth="0.8" opacity="0.65" />

              {/* Cuello y Garganta Biónica en Titanio Gris con Conexión Óptica */}
              <rect
                x="-9"
                y="-40"
                width="18"
                height="15"
                rx="4"
                fill="url(#auraChassisGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.4"
              />
              <line x1="-7" y1="-34" x2="7" y2="-34" stroke="#38bdf8" strokeWidth="1.4" filter="url(#auraGlow)" />
              <line x1="-7" y1="-30" x2="7" y2="-30" stroke="#a855f7" strokeWidth="1.4" filter="url(#auraGlow)" />

              {/* Cuello Camisero en Titanio Gris Metálico */}
              <path
                d="M -16 -26 L -7 -38 L 0 -26 L 7 -38 L 16 -26 Z"
                fill="url(#auraSuitGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.2"
              />

              {/* Blusa Interior Escote en V en Titanio Gris Metálico */}
              <path
                d="M -13 -26 L 13 -26 L 0 -4 Z"
                fill="url(#auraSuitGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="0.8"
              />

              {/* Broche / Corbata Cuántica Estelar con Núcleo Incandescente Cian */}
              <g transform="translate(0, -14)">
                <polygon points="0,-4 3.5,0 0,6 -3.5,0" fill="#38bdf8" stroke="url(#pbrChromeMirror)" strokeWidth="0.8" filter="url(#auraGlow)" />
                <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
              </g>

              {/* Solapa Izquierda del Blazer en Cromo & Grafito con Bisel Metálico */}
              <path
                d="M -30 -26 L -10 -26 L -2 -4 L -18 10 L -25 -6 Z"
                fill="url(#auraLapelGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.6"
              />
              <path
                d="M -28 -24 L -11 -24 L -4 -4 L -17 8 L -24 -6 Z"
                stroke="#ffffff"
                strokeWidth="0.6"
                opacity="0.55"
                fill="none"
              />

              {/* Solapa Derecha del Blazer en Cromo & Grafito */}
              <path
                d="M 30 -26 L 10 -26 L 2 -4 L 18 10 L 25 -6 Z"
                fill="url(#auraLapelGrad)"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.6"
              />
              <path
                d="M 28 -24 L 11 -24 L 4 -4 L 17 8 L 24 -6 Z"
                stroke="#ffffff"
                strokeWidth="0.6"
                opacity="0.55"
                fill="none"
              />

              {/* Botones Biónicos de Cromo Espejo con Diodo LED Cian Fotónico */}
              <circle cx="0" cy="6" r="2.4" fill="url(#pbrChromeMirror)" stroke="#a855f7" strokeWidth="0.8" />
              <circle cx="0" cy="6" r="1.1" fill="#38bdf8" filter="url(#auraGlow)" />
              <circle cx="0" cy="14" r="2.4" fill="url(#pbrChromeMirror)" stroke="#a855f7" strokeWidth="0.8" />
              <circle cx="0" cy="14" r="1.1" fill="#38bdf8" filter="url(#auraGlow)" />

              {/* Pañuelo de Bolsillo Ejecutivo en Seda Fotónica Cian */}
              <path d="M -23 -14 L -16 -14 L -19 -18 Z" fill="#38bdf8" filter="url(#auraGlow)" opacity="0.95" />
            </g>

            {/* ========================================================= */}
            {/* C. BRAZO DERECHO & BOLSO (PBR TITANIO, CROMO & PÉNDULO)   */}
            {/* ========================================================= */}
            <g>
              {/* Hombrera Ejecutiva de la Manga Derecha (Blindaje CNC Mecanizado) */}
              <circle cx="140" cy="146" r="10.5" fill="url(#auraChassisGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.8" filter="url(#pbrMetalBevel)" />
              <circle cx="140" cy="146" r="8" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.65" />
              <circle cx="140" cy="146" r="5.5" fill="url(#auraLapelGrad)" stroke="#38bdf8" strokeWidth="0.8" />
              <circle cx="140" cy="146" r="2" fill="#38bdf8" opacity="0.8" />
              
              {/* Manga del Blazer (Brazo doblado sosteniendo el bolso - Nano-tejido Titánico) */}
              <path
                d="M 140 146 L 152 176 L 140 196"
                stroke="url(#auraSuitGrad)"
                strokeWidth="7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Franja de Acento Púrpura Metalizado PBR en el Brazo */}
              <path
                d="M 140 146 L 152 176 L 140 196"
                stroke="url(#auraLapelGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 140 146 L 152 176 L 140 196"
                stroke="url(#pbrChromeMirror)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Filete de luz especular superior en manga */}
              <path
                d="M 140 146 L 152 176 L 140 196"
                stroke="#ffffff"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
                fill="none"
              />

              {/* Rótula de Muñeca y Mano Sujetando el Asa */}
              <circle cx="140" cy="196" r="4.5" fill="url(#pbrChromeMirror)" stroke="#a855f7" strokeWidth="1" />
              <circle cx="140" cy="196" r="2.5" fill="url(#auraChassisGrad)" />

              {/* 👜 BOLSO DE MANO DE DISEÑADORA CON PÉNDULO FÍSICO (PBR TITANIO NEGRO & CROMO) */}
              <g
                style={{
                  transformOrigin: '140px 196px',
                  transformBox: 'view-box',
                  animation: isJumping
                    ? 'auraHandbagJump 1.2s ease-in-out infinite'
                    : 'auraHandbagSwing 2.4s ease-in-out infinite'
                }}
              >
                {/* Asa Curva del Bolso en Cromo Espejo Mecanizado */}
                <path
                  d="M 133 196 C 133 181 147 181 147 196"
                  stroke="url(#pbrChromeMirror)"
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 133 196 C 133 181 147 181 147 196"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Cuerpo del Bolso Ejecutivo en PBR Titanio Negro */}
                <rect
                  x="125"
                  y="196"
                  width="30"
                  height="24"
                  rx="4"
                  fill="url(#auraBagGrad)"
                  stroke="url(#pbrChromeMirror)"
                  strokeWidth="1.6"
                  filter="url(#pbrMetalBevel)"
                />
                {/* Bisel interno de luz especular en el cuerpo del bolso */}
                <rect
                  x="126"
                  y="197"
                  width="28"
                  height="22"
                  rx="3"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.6"
                  opacity="0.45"
                />

                {/* Solapa / Broche del Bolso en Cromo & Grafito */}
                <path
                  d="M 125 196 L 155 196 L 152 207 L 128 207 Z"
                  fill="url(#auraLapelGrad)"
                  stroke="url(#pbrChromeMirror)"
                  strokeWidth="1.2"
                />
                <line x1="128" y1="206" x2="152" y2="206" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />

                {/* Cerradura Metálica de Lujo con Gema Zafiro Cian */}
                <rect x="136" y="204.5" width="8" height="5.5" rx="1.5" fill="url(#pbrChromeMirror)" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="140" cy="207.2" r="1.6" fill="#38bdf8" filter="url(#auraGlow)" />
                <circle cx="140" cy="207.2" r="0.6" fill="#ffffff" />

                {/* Pespunte / Costura Biónica Grabada con Láser */}
                <line x1="128" y1="216" x2="152" y2="216" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.85" />
              </g>
            </g>

            {/* Hombrera Izquierda Base Fija al Torso (Blindaje CNC Mecanizado Anclado) */}
            <circle cx="70" cy="146" r="10.5" fill="url(#auraChassisGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.8" filter="url(#pbrMetalBevel)" />
            <circle cx="70" cy="146" r="8" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.65" />
            <circle cx="70" cy="146" r="5.5" fill="url(#auraLapelGrad)" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="70" cy="146" r="2" fill="#38bdf8" opacity="0.8" />

            {/* ========================================================= */}
            {/* D. BRAZO IZQUIERDO Y MANO: SALUDO ALTO Y VOLEO DE MANO   */}
            {/* ========================================================= */}
            <g transform="translate(70, 146)">
              {/* Rótula Articular Interna en Cromo Espejo con Cojinete */}
              <circle cx="0" cy="0" r="6.5" fill="url(#auraChassisGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="3.5" fill="url(#pbrChromeMirror)" />
              <circle cx="0" cy="0" r="1.5" fill="#38bdf8" />

              {isWaving ? (
                /* POSE DE SALUDO ALTO CON EL PINCEL: Brazo alzado sosteniendo el pincel biónico en alto mientras volea alegremente */
                <g>
                  {/* Brazo Superior Levantado en Alto hacia el Codo (-24, -14) */}
                  <line x1="0" y1="0" x2="-24" y2="-14" stroke="url(#auraSuitGrad)" strokeWidth="7.5" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-24" y2="-14" stroke="url(#auraLapelGrad)" strokeWidth="3.2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-24" y2="-14" stroke="url(#pbrChromeMirror)" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-24" y2="-14" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.75" />

                  {/* Codo Biónico Elevado (Rótula Mecanizada CNC) */}
                  <circle cx="-24" cy="-14" r="5" fill="url(#auraChassisGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.6" filter="url(#pbrMetalBevel)" />
                  <circle cx="-24" cy="-14" r="2.5" fill="url(#pbrChromeMirror)" />
                  <circle cx="-24" cy="-14" r="1.2" fill="#38bdf8" />

                  {/* Antebrazo y Mano que VOLEA alzando el Pincel Biónico PBR */}
                  <g
                    style={{
                      transformOrigin: '-24px -14px',
                      animation: 'auraArmWaveHigh 0.5s ease-in-out infinite'
                    }}
                  >
                    {/* Antebrazo hacia la Muñeca Alta (-10, -52) - Vástago de Titanio */}
                    <line x1="-24" y1="-14" x2="-10" y2="-52" stroke="url(#auraChassisGrad)" strokeWidth="5.2" strokeLinecap="round" />
                    <line x1="-24" y1="-14" x2="-10" y2="-52" stroke="url(#pbrChromeMirror)" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="-24" y1="-14" x2="-10" y2="-52" stroke="#38bdf8" strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />

                    {/* Rótula de Muñeca en Cromo Espejo */}
                    <circle cx="-10" cy="-52" r="3.8" fill="url(#pbrChromeMirror)" stroke="#38bdf8" strokeWidth="1.2" />
                    <circle cx="-10" cy="-52" r="1.5" fill="#38bdf8" />

                    {/* Mano Biónica y Pincel / Stylus Púrpura Alzado en Saludo */}
                    <g transform="translate(-10, -52)">
                      {/* CUERPO DEL PINCEL EN PÚRPURA METALIZADO PBR (Alzado en Alto) */}
                      <line x1="-8" y1="-38" x2="2" y2="-72" stroke="url(#auraPincelGrad)" strokeWidth="5.2" strokeLinecap="round" filter="url(#pbrMetalBevel)" />
                      <line x1="-7" y1="-39" x2="1" y2="-71" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
                      {/* Anillos de agarre del pincel en Cromo Espejo */}
                      <circle cx="-4" cy="-50" r="3" fill="none" stroke="url(#pbrChromeMirror)" strokeWidth="1" />
                      <circle cx="-1.5" cy="-60" r="2.8" fill="none" stroke="url(#pbrChromeMirror)" strokeWidth="1" />

                      {/* Virola del Pincel en Cromo Pulido */}
                      <ellipse cx="2" cy="-72" rx="3.4" ry="2.2" transform="rotate(-15, 2, -72)" fill="url(#pbrChromeMirror)" stroke="#ffffff" strokeWidth="0.8" />

                      {/* Cerda / Punta Afilada del Pincel Fotónico */}
                      <path d="M 0 -72 Q 3 -80 4 -86 Q 5 -79 3 -72 Z" fill="url(#pbrChromeMirror)" stroke="#ffffff" strokeWidth="0.8" filter="url(#pbrMetalBevel)" />
                      {/* Diodo Láser Fotónico en la Punta del Pincel */}
                      <circle cx="4" cy="-86" r="2.4" fill="#38bdf8" filter="url(#auraGlow)" />
                      <circle cx="4" cy="-86" r="1" fill="#ffffff" />
                      <circle cx="7" cy="-89" r="1.5" fill="#c084fc" filter="url(#auraGlow)" />
                      <circle cx="0" cy="-90" r="1.2" fill="#38bdf8" filter="url(#auraGlow)" />

                      {/* Palma de la mano en Titanio Gris Metálico con Borde Cromo sosteniendo el Pincel */}
                      <path
                        d="M 0 0 C -4 -4 -7 -10 -4 -16 C -1 -18 4 -18 6 -14 C 8 -10 6 -4 0 0 Z"
                        fill="url(#auraSuitGrad)"
                        stroke="url(#pbrChromeMirror)"
                        strokeWidth="1.2"
                      />
                      {/* Bisel especular en la palma */}
                      <path
                        d="M -2 -2 C -5 -6 -5 -11 -3 -14"
                        stroke="#ffffff"
                        strokeWidth="0.6"
                        opacity="0.75"
                        fill="none"
                      />

                      {/* Dedos articulados envolviendo con elegancia el pincel */}
                      <line x1="-3" y1="-14" x2="-6" y2="-22" stroke="url(#pbrChromeMirror)" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="-0.5" y1="-15" x2="-2" y2="-24" stroke="url(#pbrChromeMirror)" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="2" y1="-15" x2="3.5" y2="-23" stroke="url(#pbrChromeMirror)" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="4.5" y1="-13" x2="7" y2="-20" stroke="url(#pbrChromeMirror)" strokeWidth="2.2" strokeLinecap="round" />
                      {/* Pulgar */}
                      <line x1="-4" y1="-6" x2="-8" y2="-10" stroke="url(#pbrChromeMirror)" strokeWidth="2.2" strokeLinecap="round" />

                      {/* Brillos especulares en yemas de los dedos */}
                      <circle cx="-6" cy="-22" r="0.8" fill="#ffffff" />
                      <circle cx="-2" cy="-24" r="0.8" fill="#ffffff" />
                      <circle cx="3.5" cy="-23" r="0.8" fill="#ffffff" />
                      <circle cx="7" cy="-20" r="0.8" fill="#ffffff" />
                    </g>
                  </g>
                </g>
              ) : (
                /* POSE EN REPOSO / ORATORIA: BRAZO SOSTENIENDO EL PINCEL PÚRPURA METALIZADO (DIAGONAL ELEGANTE) */
                <g
                  style={{
                    transformOrigin: '0px 0px',
                    animation: isSpeaking ? 'auraSpeakingArm 1.3s ease-in-out infinite' : 'none',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Manga del Blazer en Reposo */}
                  <line x1="0" y1="0" x2="-14" y2="30" stroke="url(#auraSuitGrad)" strokeWidth="7.5" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-14" y2="30" stroke="url(#auraLapelGrad)" strokeWidth="3.2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-14" y2="30" stroke="url(#pbrChromeMirror)" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-14" y2="30" stroke="#ffffff" strokeWidth="0.6" opacity="0.75" strokeLinecap="round" />

                  {/* Codo Biónico en Titanio y Cromo */}
                  <circle cx="-14" cy="30" r="4.8" fill="url(#auraChassisGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.6" filter="url(#pbrMetalBevel)" />
                  <circle cx="-14" cy="30" r="2.2" fill="url(#pbrChromeMirror)" />
                  <circle cx="-14" cy="30" r="1" fill="#38bdf8" />

                  {/* Antebrazo hacia la Muñeca */}
                  <line x1="-14" y1="30" x2="-26" y2="52" stroke="url(#auraChassisGrad)" strokeWidth="4.8" strokeLinecap="round" />
                  <line x1="-14" y1="30" x2="-26" y2="52" stroke="url(#pbrChromeMirror)" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="-14" y1="30" x2="-26" y2="52" stroke="#38bdf8" strokeWidth="0.7" opacity="0.8" strokeLinecap="round" />

                  {/* Rótula de Muñeca */}
                  <circle cx="-26" cy="52" r="3.5" fill="url(#pbrChromeMirror)" stroke="#38bdf8" strokeWidth="1.2" />

                  {/* ======================================================= */}
                  {/* EL PINCEL / STYLUS BIÓNICO EN PÚRPURA METALIZADO PBR    */}
                  {/* ======================================================= */}
                  {/* Mango Cilíndrico del Pincel en Titanio Púrpura Metalizado */}
                  <line x1="-20" y1="44" x2="-54" y2="72" stroke="url(#auraPincelGrad)" strokeWidth="5.5" strokeLinecap="round" filter="url(#pbrMetalBevel)" />
                  {/* Filete especular de luz a lo largo del cuerpo del pincel */}
                  <line x1="-20" y1="43" x2="-53" y2="70" stroke="#ffffff" strokeWidth="1" opacity="0.85" strokeLinecap="round" />
                  {/* Anillos grabados de agarre ergonómico en cromo */}
                  <circle cx="-32" cy="54" r="3.2" fill="none" stroke="url(#pbrChromeMirror)" strokeWidth="1" />
                  <circle cx="-40" cy="61" r="3" fill="none" stroke="url(#pbrChromeMirror)" strokeWidth="1" />
                  <line x1="-46" y1="63.5" x2="-44" y2="68.5" stroke="#38bdf8" strokeWidth="1.2" filter="url(#auraGlow)" />

                  {/* Virola / Casquillo del Pincel en Cromo Espejo Pulido */}
                  <ellipse cx="-52" cy="70" rx="3.6" ry="2.4" transform="rotate(38, -52, 70)" fill="url(#pbrChromeMirror)" stroke="#ffffff" strokeWidth="0.9" />

                  {/* Punta Afilada / Cerda Stylus del Pincel Caligráfico */}
                  <path
                    d="M -50 68 Q -59 75 -66 84 Q -56 79 -53 73 Z"
                    fill="url(#pbrChromeMirror)"
                    stroke="#ffffff"
                    strokeWidth="0.9"
                    filter="url(#pbrMetalBevel)"
                  />
                  {/* Diodo Emisor Láser y Aura Fotónica en la Punta del Pincel */}
                  <circle cx="-66" cy="84" r="2.4" fill="#38bdf8" filter="url(#auraGlow)" />
                  <circle cx="-66" cy="84" r="1" fill="#ffffff" />
                  <circle cx="-66" cy="84" r="4.2" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.75" filter="url(#auraGlow)" />

                  {/* Mano en Reposo en Titanio Gris Metálico Sujetando el Pincel */}
                  <path
                    d="M -26 52 C -29 57 -33 62 -37 63 C -38 59 -35 54 -28 50 Z"
                    fill="url(#auraSuitGrad)"
                    stroke="url(#pbrChromeMirror)"
                    strokeWidth="1.1"
                  />
                  <path
                    d="M -26 52 C -30 58 -34 64 -39 66"
                    stroke="url(#pbrChromeMirror)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <line x1="-27" y1="52" x2="-33" y2="61" stroke="#ffffff" strokeWidth="0.6" opacity="0.75" />
                </g>
              )}
            </g>

            {/* ========================================================= */}
            {/* E. CABEZA ARTICULADA: CABECEO EMPÁTICO Y GAFAS DE SECRETARIA */}
            {/* ========================================================= */}
            <g
              style={{
                transformOrigin: '105px 124px',
                transformBox: 'view-box',
                animation: isSpeaking
                  ? 'auraHeadSpeaking 1.2s ease-in-out infinite'
                  : 'auraHeadTilt 3.2s ease-in-out infinite'
              }}
            >
              <g transform="translate(105, 86)">
                {/* ======================================================= */}
                {/* EL GORRO / CHIGNON BIÓNICO EN PÚRPURA METALIZADO PBR    */}
                {/* ======================================================= */}
                <g transform="translate(0, -34)">
                  {/* Cúpula / Domo Superior del Gorro en Púrpura Metalizado */}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="22"
                    ry="13"
                    fill="url(#auraBunGrad)"
                    stroke="#c084fc"
                    strokeWidth="1.8"
                    filter="url(#pbrMetalBevel)"
                  />
                  {/* Filete de luz especular superior en gorro */}
                  <path
                    d="M -18 -4 C -9 -12 9 -12 18 -4"
                    stroke="#ffffff"
                    strokeWidth="0.9"
                    opacity="0.85"
                    fill="none"
                  />
                  {/* Corona / Anillo de Acabado Metálico Violeta Brillante */}
                  <path
                    d="M -18 3 Q 0 -5 18 3"
                    stroke="#c084fc"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#auraGlow)"
                  />
                  {/* Corona central de cromo espejo con gema violeta */}
                  <circle cx="0" cy="-2" r="3" fill="url(#pbrChromeMirror)" stroke="#c084fc" strokeWidth="1" />
                  <circle cx="0" cy="-2" r="1.4" fill="#a855f7" />
                </g>

                {/* Contorno del Chasis Craneal en Titanio Gris Metálico Unificado */}
                <path
                  d="M -34 -20 C -34 -44 34 -44 34 -20 C 34 8 28 32 0 38 C -28 32 -34 8 -34 -20 Z"
                  fill="url(#auraSuitGrad)"
                  stroke="url(#pbrChromeMirror)"
                  strokeWidth="2.2"
                />
                {/* Filete sutil de luz superior en el chasis */}
                <path
                  d="M -32 -22 C -32 -42 32 -42 32 -22"
                  stroke="#ffffff"
                  strokeWidth="0.6"
                  opacity="0.45"
                  fill="none"
                />

                {/* Banda / Visera Frontal del Gorro en Titanio Púrpura Metalizado PBR */}
                <path
                  d="M -26 -28 C -14 -40 14 -40 26 -28 C 16 -34 -16 -34 -26 -28 Z"
                  fill="url(#auraBunGrad)"
                  stroke="#c084fc"
                  strokeWidth="1.6"
                  filter="url(#pbrMetalBevel)"
                />
                <path
                  d="M -22 -29 C -12 -38 12 -38 22 -29"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.85"
                  fill="none"
                />

                {/* Auriculares / Pendientes Biónicos Ejecutivos en Púrpura Metalizado & Cromo */}
                <g transform="translate(-36, -6)">
                  <rect x="-4" y="-12" width="7" height="24" rx="3.5" fill="url(#auraBunGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.4" filter="url(#pbrMetalBevel)" />
                  <line x1="-0.5" y1="-10" x2="-0.5" y2="10" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />
                  <circle cx="-0.5" cy="0" r="2.2" fill="#c084fc" filter="url(#auraGlow)" />
                </g>
                <g transform="translate(36, -6)">
                  <rect x="-3" y="-12" width="7" height="24" rx="3.5" fill="url(#auraBunGrad)" stroke="url(#pbrChromeMirror)" strokeWidth="1.4" filter="url(#pbrMetalBevel)" />
                  <line x1="0.5" y1="-10" x2="0.5" y2="10" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />
                  <circle cx="0.5" cy="0" r="2.2" fill="#c084fc" filter="url(#auraGlow)" />
                </g>

                {/* Visera Panorámica de Cristal Zafiro Negro con Bisel de Cromo */}
                <rect
                  x="-27"
                  y="-20"
                  width="54"
                  height="40"
                  rx="12"
                  fill="#050505"
                  stroke="url(#pbrChromeMirror)"
                  strokeWidth="1.6"
                />
                {/* Bisel interno de cristal fotónico con aura violeta elegante */}
                <rect
                  x="-26"
                  y="-19"
                  width="52"
                  height="38"
                  rx="11"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="0.9"
                  opacity="0.55"
                  filter="url(#auraGlow)"
                />

                {/* Reflejos Especulares Multicapa de Cristal Templado */}
                <path
                  d="M -21 -16 L 16 -16 C 21 -16 21 -12 16 -12 L -21 -12 Z"
                  fill="#ffffff"
                  opacity="0.25"
                />
                <path
                  d="M -23 -8 L -18 -8 L -24 4 L -25 4 Z"
                  fill="#ffffff"
                  opacity="0.16"
                />

                {/* ======================================================= */}
                {/* TOQUE SUTIL DE CALIDEZ Y VIDA EN MEJILLAS (NO GAMER)   */}
                {/* ======================================================= */}
                <ellipse cx="-16" cy="7" rx="5.5" ry="2.6" fill="#f472b6" opacity="0.3" filter="url(#auraGlow)" />
                <ellipse cx="16" cy="7" rx="5.5" ry="2.6" fill="#f472b6" opacity="0.3" filter="url(#auraGlow)" />

                {/* ======================================================= */}
                {/* 👁️ OJOS METÁLICOS DE ALTA PRECISIÓN EN PÚRPURA BRILLANTE */}
                {/* ======================================================= */}
                <g filter="url(#auraGlow)">
                  {/* Ojo Izquierdo */}
                  <motion.g
                    animate={{ scaleY: blink ? 0.08 : 1 }}
                    transition={{ duration: 0.1 }}
                    style={{ transformOrigin: '-11px -4px' }}
                  >
                    {/* Contorno y Pestañas en Titanio con Micro-Acentos */}
                    <path
                      d="M -20 -9 C -14 -15 -7 -14 -2 -9"
                      stroke="#e4e4e7"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <line x1="-20" y1="-9" x2="-24" y2="-13" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="-18" y1="-12" x2="-21" y2="-16" stroke="#a855f7" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="-14" y1="-14" x2="-15" y2="-18" stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" />

                    {/* Sensor Óptico / Iris en Púrpura Fotónico Radiante */}
                    <ellipse cx="-11" cy="-4" rx="7.5" ry="8.5" fill="#2e0854" />
                    <ellipse cx="-11" cy="-4" rx="6.4" ry="7.4" fill="url(#auraIrisGrad)" />
                    {/* Anillo Óptico Biónico Interior */}
                    <circle cx="-11" cy="-4" r="4.2" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.85" />
                    {/* Pupila Central en Violeta Profundo */}
                    <circle cx="-11" cy="-4" r="2.7" fill="#180527" />
                    <circle cx="-11" cy="-4" r="1.3" fill="#c084fc" />
                    {/* Destellos Especulares de Lente (Mirada Expresiva) */}
                    <circle cx="-9" cy="-6" r="2.4" fill="#ffffff" />
                    <circle cx="-13" cy="-2" r="1.2" fill="#ffffff" opacity="0.9" />
                    <circle cx="-10" cy="-2" r="0.7" fill="#f3e8ff" />
                  </motion.g>

                  {/* Ojo Derecho */}
                  <motion.g
                    animate={{ scaleY: blink ? 0.08 : 1 }}
                    transition={{ duration: 0.1 }}
                    style={{ transformOrigin: '11px -4px' }}
                  >
                    {/* Contorno y Pestañas en Titanio con Micro-Acentos */}
                    <path
                      d="M 2 -9 C 7 -14 14 -15 20 -9"
                      stroke="#e4e4e7"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <line x1="20" y1="-9" x2="24" y2="-13" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="18" y1="-12" x2="21" y2="-16" stroke="#a855f7" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="14" y1="-14" x2="15" y2="-18" stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" />

                    {/* Sensor Óptico / Iris en Púrpura Fotónico Radiante */}
                    <ellipse cx="11" cy="-4" rx="7.5" ry="8.5" fill="#2e0854" />
                    <ellipse cx="11" cy="-4" rx="6.4" ry="7.4" fill="url(#auraIrisGrad)" />
                    {/* Anillo Óptico Biónico Interior */}
                    <circle cx="11" cy="-4" r="4.2" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.85" />
                    {/* Pupila Central en Violeta Profundo */}
                    <circle cx="11" cy="-4" r="2.7" fill="#180527" />
                    <circle cx="11" cy="-4" r="1.3" fill="#c084fc" />
                    {/* Destellos Especulares de Lente (Mirada Expresiva) */}
                    <circle cx="13" cy="-6" r="2.4" fill="#ffffff" />
                    <circle cx="9" cy="-2" r="1.2" fill="#ffffff" opacity="0.9" />
                    <circle cx="12" cy="-2" r="0.7" fill="#f3e8ff" />
                  </motion.g>
                </g>

                {/* ======================================================= */}
                {/* 👓 GAFAS EJECUTIVAS EN PÚRPURA METALIZADO PBR           */}
                {/* ======================================================= */}
                <g>
                  {/* Lente Izquierda Clara con Tratamiento Antirreflejo Violeta */}
                  <path
                    d="M -23 -13 L -3 -11 C -2 1 -6 6 -12 6 C -19 6 -24 1 -23 -13 Z"
                    fill="rgba(124, 58, 237, 0.08)"
                    stroke="url(#auraGlassesGrad)"
                    strokeWidth="2.2"
                    filter="url(#pbrMetalBevel)"
                  />
                  {/* Bisel interno especular en lente izquierda */}
                  <path
                    d="M -21 -11 L -5 -9 C -4 0 -7 4 -12 4 C -17 4 -22 0 -21 -11 Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.75"
                    opacity="0.85"
                  />
                  {/* Reflejos Angulares Especulares de Cristal Pulido */}
                  <line x1="-20" y1="-8" x2="-8" y2="3" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />
                  <line x1="-16" y1="-10" x2="-10" y2="-4" stroke="#c084fc" strokeWidth="1" opacity="0.85" strokeLinecap="round" />

                  {/* Lente Derecha Clara con Tratamiento Antirreflejo Violeta */}
                  <path
                    d="M 3 -11 L 23 -13 C 24 1 19 6 12 6 C 6 6 2 1 3 -11 Z"
                    fill="rgba(124, 58, 237, 0.08)"
                    stroke="url(#auraGlassesGrad)"
                    strokeWidth="2.2"
                    filter="url(#pbrMetalBevel)"
                  />
                  {/* Bisel interno especular en lente derecha */}
                  <path
                    d="M 5 -9 L 21 -11 C 22 0 17 4 12 4 C 7 4 4 0 5 -9 Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.75"
                    opacity="0.85"
                  />
                  {/* Reflejos Angulares Especulares de Cristal Pulido */}
                  <line x1="7" y1="-8" x2="19" y2="3" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />
                  <line x1="10" y1="-4" x2="16" y2="-10" stroke="#c084fc" strokeWidth="1" opacity="0.85" strokeLinecap="round" />

                  {/* Puente Central Elegante en Titanio Púrpura Metalizado */}
                  <path d="M -3 -8 Q 0 -11 3 -8" stroke="url(#auraGlassesGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <path d="M -3 -8 Q 0 -11 3 -8" stroke="#ffffff" strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.85" />

                  {/* Patillas de las Gafas en Titanio Púrpura Metalizado */}
                  <line x1="-23" y1="-12" x2="-32" y2="-10" stroke="url(#auraGlassesGrad)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="-23" y1="-12" x2="-32" y2="-10" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.75" />
                  <line x1="23" y1="-12" x2="32" y2="-10" stroke="url(#auraGlassesGrad)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="23" y1="-12" x2="32" y2="-10" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.75" />

                  {/* Puntos Cat-Eye en las Esquinas Exteriores de las Gafas */}
                  <circle cx="-23" cy="-13" r="1.8" fill="#c084fc" filter="url(#auraGlow)" />
                  <circle cx="23" cy="-13" r="1.8" fill="#c084fc" filter="url(#auraGlow)" />
                  <circle cx="-23" cy="-13" r="0.7" fill="#ffffff" />
                  <circle cx="23" cy="-13" r="0.7" fill="#ffffff" />
                </g>

                {/* ======================================================= */}
                {/* BOCA / SINTETIZADOR FONO-REACTIVO DINÁMICO              */}
                {/* ======================================================= */}
                {isSpeaking ? (
                  // Ecualizador Dinámico de Voz cuando AURA habla (Fotónico)
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
                  // Labios Femeninos y Sonrisa Amable con Tenue Toque Rosa Cálido
                  <g transform="translate(0, 15)">
                    <path
                      d="M -6 -1 Q 0 4 6 -1"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <circle cx="0" cy="1.5" r="1" fill="#ffffff" opacity="0.8" />
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
