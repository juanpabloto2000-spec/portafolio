import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HyperRealisticAndroidAvatar (AURA - Advanced Ultra-Realistic Android)
 * Motor CGI Fotorrealista Multicapa a 60 FPS:
 * - Retrato fotorrealista de alta definición con piel sintética de porcelana traslúcida y microcircuitos biocibernéticos.
 * - 3D Head Parallax Tilt reactivo a la posición del cursor/pointer en tiempo real.
 * - Iris biocibernético dinámico con eye-tracking reactivo y reflejos especulares de córnea.
 * - Parpadeo orgánico fotomórfico (cierre 75ms, apertura elástica 130ms, intervalos biológicos pseudo-aleatorios con micro-doble parpadeo).
 * - Articulación fonética viva en tiempo real con resonancia orofacial y ondas de choque acústicas al emitir voz (`isSpeaking`).
 * - Micro-respiración bio-sintética idle a 60 FPS acelerada por GPU.
 */
export default function AndroidVoiceAvatar({ size = 'md', isSpeaking = false, className = '' }) {
  // Dimensiones configurables y responsive
  const dimensions = useMemo(() => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-14 h-14 sm:w-16 sm:h-16',
          pupilRange: 2.4,
          tiltFactor: 5,
          glowSize: '-inset-1'
        };
      case 'lg':
        return {
          container: 'w-28 h-28 sm:w-36 sm:h-36',
          pupilRange: 4.8,
          tiltFactor: 9,
          glowSize: '-inset-3'
        };
      case 'md':
      default:
        return {
          container: 'w-20 h-20 sm:w-24 sm:h-24',
          pupilRange: 3.4,
          tiltFactor: 7,
          glowSize: '-inset-2'
        };
    }
  }, [size]);

  // Coordenadas normalizadas del puntero (-1 a +1)
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 1. Detección y seguimiento suave del cursor (Mouse & Pointer Tracking con Lerp)
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
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

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

  // 2. Parpadeo Orgánico Multicapa (Blinking Motor)
  const [blinkState, setBlinkState] = useState(false);

  useEffect(() => {
    let blinkTimeout;
    let isMounted = true;

    const scheduleBlink = () => {
      if (!isMounted) return;

      // Tiempo pseudo-aleatorio entre parpadeos (2.6s a 5.0s)
      const nextDelay = 2600 + Math.random() * 2400;

      blinkTimeout = setTimeout(() => {
        if (!isMounted) return;
        setBlinkState(true);

        // Duración biológica de cierre y apertura (90ms)
        setTimeout(() => {
          if (!isMounted) return;
          setBlinkState(false);

          // 18% de probabilidad de micro-doble parpadeo
          if (Math.random() < 0.18) {
            setTimeout(() => {
              if (!isMounted) return;
              setBlinkState(true);
              setTimeout(() => {
                if (isMounted) setBlinkState(false);
              }, 75);
            }, 130);
          }

          scheduleBlink();
        }, 90);
      }, nextDelay);
    };

    scheduleBlink();

    return () => {
      isMounted = false;
      clearTimeout(blinkTimeout);
    };
  }, []);

  // Inclinación 3D de cabeza calculada (Head Parallax)
  const tiltX = pointer.x * dimensions.tiltFactor;
  const tiltY = -pointer.y * dimensions.tiltFactor;

  // Desplazamiento reactivo de iris / pupilas (Eye-Tracking)
  const pupilOffsetX = pointer.x * dimensions.pupilRange;
  const pupilOffsetY = pointer.y * (dimensions.pupilRange * 0.75);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center shrink-0 select-none overflow-visible ${dimensions.container} ${className}`}
      style={{ perspective: '850px' }}
    >
      {/* ========================================================================= */}
      {/* 1. ONDAS ACÚSTICAS HOLOGRÁFICAS AL HABLAR                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isSpeaking && (
          <>
            <motion.div
              initial={{ scale: 0.85, opacity: 0.85 }}
              animate={{
                scale: [0.95, 1.48, 1.75],
                opacity: [0.75, 0.35, 0]
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute inset-0 rounded-full border border-cyan-400/60 pointer-events-none z-0"
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0.65 }}
              animate={{
                scale: [0.9, 1.35, 1.6],
                opacity: [0.65, 0.25, 0]
              }}
              transition={{
                duration: 1.4,
                delay: 0.45,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute inset-0 rounded-full border border-indigo-400/50 pointer-events-none z-0"
            />
          </>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. HALO CUÁNTICO Y BIOLUMINISCENCIA SUAVE                                  */}
      {/* ========================================================================= */}
      <motion.div
        animate={
          isSpeaking
            ? {
                scale: [1, 1.25, 1.12, 1.24, 1],
                opacity: [0.6, 0.95, 0.72, 0.9, 0.6]
              }
            : {
                scale: [0.96, 1.05, 0.96],
                opacity: [0.32, 0.48, 0.32]
              }
        }
        transition={{
          duration: isSpeaking ? 1.2 : 3.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute ${dimensions.glowSize} rounded-full bg-gradient-to-tr from-cyan-500/40 via-blue-600/30 to-purple-600/35 blur-xl pointer-events-none z-0`}
      />

      {/* ========================================================================= */}
      {/* 3. ROSTRO TRIDIMENSIONAL FOTORREALISTA CON HEAD PARALLAX 3D TILT          */}
      {/* ========================================================================= */}
      <div
        className="relative w-full h-full p-[1.5px] rounded-full bg-gradient-to-b from-cyan-400/50 via-blue-500/25 to-purple-500/35 shadow-[0_8px_32px_rgba(0,0,0,0.85)] z-10"
        style={{
          transform: `rotateY(${tiltX}deg) rotateX(${tiltY}deg) scale(${isSpeaking ? 1.03 : 1})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
          
          {/* Retrato Fotorrealista Maestro de AURA con Primer Plano Close-Up */}
          <motion.img
            src="/aura_face_portrait.webp"
            alt="AURA AI Neural Android"
            animate={{
              scale: isSpeaking ? [1.25, 1.27, 1.25] : [1.24, 1.255, 1.24]
            }}
            transition={{
              duration: isSpeaking ? 0.35 : 3.6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-full h-full object-cover object-[50%_48%] select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />

          {/* Viñeta Cinematográfica Perimetral de Fusión Orgánica */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 56%, rgba(8,12,22,0.4) 80%, rgba(5,7,14,0.92) 100%)'
            }}
          />

          {/* Brillo especular de luz ambiental móvil interactiva */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30 rounded-full"
            style={{
              background: `radial-gradient(circle at ${50 + pointer.x * 25}% ${40 + pointer.y * 25}%, rgba(34,211,238,0.55) 0%, rgba(99,102,241,0.2) 42%, transparent 70%)`
            }}
          />

          {/* ===================================================================== */}
          {/* 4. MOTOR OCULAR: EYE-TRACKING + IRIS LUMINISCENTE + REFLEJOS          */}
          {/* ===================================================================== */}

          {/* OJO IZQUIERDO (Coord calibrada para scale 1.25: x: 26.5%, y: 41.5%) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '26.8%',
              top: '41.8%',
              width: '18%',
              height: '9%',
              transform: 'translate(-50%, -50%)',
              overflow: 'hidden',
              borderRadius: '50% / 60%'
            }}
          >
            {/* Pupila & Iris Biocibernético Dinámico */}
            <div
              className="absolute rounded-full transition-transform duration-75 ease-out"
              style={{
                left: '50%',
                top: '50%',
                width: '44%',
                height: '82%',
                transform: `translate(calc(-50% + ${pupilOffsetX}px), calc(-50% + ${pupilOffsetY}px))`,
                background: 'radial-gradient(circle at 45% 45%, #ffffff 0%, #38bdf8 30%, #0284c7 70%, #032147 100%)',
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.95), inset 0 0 4px rgba(255, 255, 255, 0.85)'
              }}
            >
              {/* Núcleo de Pupila Cuántica */}
              <div className="absolute inset-[30%] bg-black rounded-full" />
              {/* Destello Especular de Córnea */}
              <div className="absolute top-[18%] left-[22%] w-[28%] h-[28%] bg-white rounded-full shadow-[0_0_3px_#ffffff]" />
            </div>
          </div>

          {/* OJO DERECHO (Coord calibrada para scale 1.25: x: 73.2%, y: 41.5%) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '73.2%',
              top: '41.8%',
              width: '18%',
              height: '9%',
              transform: 'translate(-50%, -50%)',
              overflow: 'hidden',
              borderRadius: '50% / 60%'
            }}
          >
            {/* Pupila & Iris Biocibernético Dinámico */}
            <div
              className="absolute rounded-full transition-transform duration-75 ease-out"
              style={{
                left: '50%',
                top: '50%',
                width: '44%',
                height: '82%',
                transform: `translate(calc(-50% + ${pupilOffsetX}px), calc(-50% + ${pupilOffsetY}px))`,
                background: 'radial-gradient(circle at 45% 45%, #ffffff 0%, #38bdf8 30%, #0284c7 70%, #032147 100%)',
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.95), inset 0 0 4px rgba(255, 255, 255, 0.85)'
              }}
            >
              {/* Núcleo de Pupila Cuántica */}
              <div className="absolute inset-[30%] bg-black rounded-full" />
              {/* Destello Especular de Córnea */}
              <div className="absolute top-[18%] left-[22%] w-[28%] h-[28%] bg-white rounded-full shadow-[0_0_3px_#ffffff]" />
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 5. PÁRPADOS FOTOMÓRFICOS BIO-SINTÉTICOS (PARPADEO NATURAL 60 FPS)      */}
          {/* ===================================================================== */}

          {/* Párpado Ojo Izquierdo */}
          <div
            className="absolute pointer-events-none transition-all duration-75 ease-in-out"
            style={{
              left: '17.8%',
              top: '36.8%',
              width: '18%',
              height: '10%',
              overflow: 'hidden',
              transform: blinkState ? 'scaleY(1)' : 'scaleY(0.04)',
              transformOrigin: '50% 50%',
              background: 'linear-gradient(to bottom, #dcd7d2 0%, #c4bcb5 100%)',
              borderRadius: '50% / 55%',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 25
            }}
          >
            {/* Sombra de Pestañas Finas */}
            <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900/85" />
          </div>

          {/* Párpado Ojo Derecho */}
          <div
            className="absolute pointer-events-none transition-all duration-75 ease-in-out"
            style={{
              left: '64.2%',
              top: '36.8%',
              width: '18%',
              height: '10%',
              overflow: 'hidden',
              transform: blinkState ? 'scaleY(1)' : 'scaleY(0.04)',
              transformOrigin: '50% 50%',
              background: 'linear-gradient(to bottom, #dcd7d2 0%, #c4bcb5 100%)',
              borderRadius: '50% / 55%',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 25
            }}
          >
            {/* Sombra de Pestañas Finas */}
            <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900/85" />
          </div>

          {/* ===================================================================== */}
          {/* 6. ARTICULACIÓN VOCAL VIVA & RESONANCIA OROFACIAL (LIPSYNC & GLOW)    */}
          {/* ===================================================================== */}
          {isSpeaking && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '90.5%',
                width: '32%',
                height: '8%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20
              }}
            >
              {/* Apertura Fonética y Brillo de Resonancia Cuántica */}
              <motion.div
                animate={{
                  scaleY: [0.6, 1.45, 0.75, 1.65, 0.6],
                  scaleX: [0.9, 1.12, 0.95, 1.18, 0.9],
                  opacity: [0.75, 1, 0.85, 1, 0.75]
                }}
                transition={{
                  duration: 0.36,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-full h-full rounded-[50%] bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 mix-blend-screen"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.95))'
                }}
              />

              {/* Micro-destello de apertura labial sintética */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.95, 0.5, 0.92, 0.4]
                }}
                transition={{
                  duration: 0.26,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-x-1 top-[42%] h-[1.5px] bg-white rounded-full shadow-[0_0_4px_#38bdf8]"
              />
            </div>
          )}

          {/* ===================================================================== */}
          {/* 7. ECUALIZADORES Y REDES NEURONALES LATERALES AL HABLAR               */}
          {/* ===================================================================== */}
          {isSpeaking && (
            <div className="absolute inset-0 pointer-events-none z-15 mix-blend-screen opacity-75">
              {/* Redes neuronales izquierda (mejilla) */}
              <motion.div
                animate={{ opacity: [0.35, 0.85, 0.4, 0.95, 0.35] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute left-[10%] top-[62%] w-6 h-6 rounded-full bg-cyan-400/35 blur-sm"
              />
              {/* Redes neuronales derecha (mejilla) */}
              <motion.div
                animate={{ opacity: [0.4, 0.95, 0.35, 0.85, 0.4] }}
                transition={{ duration: 0.34, repeat: Infinity, delay: 0.04 }}
                className="absolute right-[10%] top-[62%] w-6 h-6 rounded-full bg-indigo-400/35 blur-sm"
              />
            </div>
          )}

          {/* Micro-filtro CRT / Holográfico ultra sutil para textura de androide */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)'
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. BADGE TÁCTICO DE ESTADO TELEMÉTRICO                                     */}
      {/* ========================================================================= */}
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950 z-30 transition-colors ${
          isSpeaking
            ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse'
            : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
        }`}
      />
    </div>
  );
}
