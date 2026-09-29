import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HyperRealisticAndroidAvatar (AURA - Advanced Ultra-Realistic Android)
 * Motor CGI Fotorrealista Desencapsulado (Sin Círculo / Busto Libre) a 60 FPS:
 * - Silueta de busto completa sin marco ni círculo (cabeza, cuello biónico y hombros con exoesqueleto).
 * - Desvanecimiento etéreo perimetral e inferior (mask-image continua que funde los hombros en el espacio cósmico).
 * - Gestos vivos y dinámicos:
 *   * Gestos en reposo (idle): micro head-tilts reflexivos periódicos, respiración orgánica de torso y hombros.
 *   * Gestos al hablar (speaking): micro-asentimiento oratorio con la cabeza y hombros, inclinación expresiva.
 * - 3D Head Parallax Tilt reactivo al cursor vía Lerp elástico (0.085).
 * - Motor ocular biocibernético con eye-tracking, iris bioluminiscente cuántico y reflejos especulares de córnea.
 * - Parpadeo orgánico fotomórfico (cierre 85ms, apertura elástica 130ms, intervalos biológicos con micro-doble parpadeo).
 * - Articulación fonética viva en tiempo real con resonancia orofacial y ondas de choque sónicas concéntricas.
 */
export default function AndroidVoiceAvatar({ size = 'md', isSpeaking = false, showBadge = false, className = '' }) {
  // Dimensiones configurables y responsive de busto libre
  const dimensions = useMemo(() => {
    switch (size) {
      case 'hero':
      case 'xl':
        return {
          container: 'w-56 h-76 sm:w-64 sm:h-84 md:w-72 md:h-96',
          pupilRange: 4.8,
          tiltFactor: 8,
          haloSize: '-inset-6'
        };
      case 'sm':
        return {
          container: 'w-12 h-16 sm:w-14 sm:h-18',
          pupilRange: 2.0,
          tiltFactor: 4,
          haloSize: '-inset-2'
        };
      case 'lg':
        return {
          container: 'w-36 h-50 sm:w-44 sm:h-60',
          pupilRange: 4.2,
          tiltFactor: 7,
          haloSize: '-inset-5'
        };
      case 'md':
      default:
        return {
          container: 'w-24 h-34 sm:w-28 sm:h-40',
          pupilRange: 3.2,
          tiltFactor: 6,
          haloSize: '-inset-4'
        };
    }
  }, [size]);

  // Coordenadas normalizadas del puntero (-1 a +1)
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 1. Detección y seguimiento suave del cursor (Mouse Tracking con Lerp)
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

  // 2. Parpadeo Orgánico Fotomórfico (Blinking Motor)
  const [blinkState, setBlinkState] = useState(false);

  useEffect(() => {
    let blinkTimeout;
    let isMounted = true;

    const scheduleBlink = () => {
      if (!isMounted) return;

      const nextDelay = 2600 + Math.random() * 2400;

      blinkTimeout = setTimeout(() => {
        if (!isMounted) return;
        setBlinkState(true);

        setTimeout(() => {
          if (!isMounted) return;
          setBlinkState(false);

          // 18% probabilidad de micro-doble parpadeo
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

  // 3. Gestos Autónomos en Reposo (Idle Gesture Engine)
  // Inclinación reflexiva periódica de cabeza (head-tilt)
  const [idleTiltZ, setIdleTiltZ] = useState(0);

  useEffect(() => {
    if (isSpeaking) return;

    let gestureTimer;
    const triggerIdleGesture = () => {
      // Inclinación sutil entre -1.8deg y +1.8deg
      const targetTilt = (Math.random() - 0.5) * 3.6;
      setIdleTiltZ(targetTilt);

      // Regresar al centro tras 2 segundos
      setTimeout(() => setIdleTiltZ(0), 2200);

      gestureTimer = setTimeout(triggerIdleGesture, 5500 + Math.random() * 4500);
    };

    gestureTimer = setTimeout(triggerIdleGesture, 3000);
    return () => clearTimeout(gestureTimer);
  }, [isSpeaking]);

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
      {/* 1. ONDAS HOLOGRÁFICAS Y RESPLANDOR CUÁNTICO LIBRE (SIN CÍRCULO)           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isSpeaking && (
          <>
            <motion.div
              initial={{ scale: 0.85, opacity: 0.8 }}
              animate={{
                scale: [0.9, 1.25, 1.45],
                opacity: [0.55, 0.25, 0]
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute -inset-2 rounded-[45%] bg-gradient-to-t from-cyan-400/25 via-blue-500/15 to-transparent blur-lg pointer-events-none z-0"
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0.6 }}
              animate={{
                scale: [0.88, 1.18, 1.35],
                opacity: [0.45, 0.15, 0]
              }}
              transition={{
                duration: 1.6,
                delay: 0.5,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute -inset-1 rounded-[45%] bg-gradient-to-t from-indigo-500/20 via-cyan-400/10 to-transparent blur-md pointer-events-none z-0"
            />
          </>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. HALO ESTELAR DE PLASMA CUÁNTICO                                        */}
      {/* ========================================================================= */}
      <motion.div
        animate={
          isSpeaking
            ? {
                scale: [1, 1.15, 1.08, 1.12, 1],
                opacity: [0.4, 0.7, 0.5, 0.65, 0.4]
              }
            : {
                scale: [0.98, 1.04, 0.98],
                opacity: [0.2, 0.35, 0.2]
              }
        }
        transition={{
          duration: isSpeaking ? 1.2 : 3.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute ${dimensions.haloSize} rounded-[50%] bg-gradient-to-tr from-cyan-500/25 via-blue-600/15 to-purple-600/20 blur-2xl pointer-events-none z-0`}
      />

      {/* ========================================================================= */}
      {/* 3. BUSTO DESENCAPSULADO CON GESTOS, 3D PARALLAX Y RESPIRACIÓN VIVA        */}
      {/* ========================================================================= */}
      <motion.div
        className="relative w-full h-full z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${tiltX}deg) rotateX(${tiltY}deg) rotateZ(${idleTiltZ}deg)`
        }}
        animate={
          isSpeaking
            ? {
                // Gestos oratorios al hablar: micro-asentimiento, hombros y énfasis
                y: [0, -3, 1, -2, 0],
                rotateX: [0, 3.5, -1.5, 2.5, 0],
                rotateZ: [-0.8, 1.2, -0.6, 1, 0]
              }
            : {
                // Micro-respiración orgánica de torso en reposo
                y: [0, -2, 0],
                rotateX: [0, 0.8, 0]
              }
        }
        transition={{
          duration: isSpeaking ? 0.75 : 3.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Contenedor Flotante Desencapsulado 100% Libre (CERO CÍRCULOS, CERO MÁSCARAS OVALADAS) */}
        <div className="relative w-full h-full overflow-visible">
          {/* Retrato Fotorrealista de Busto Completo */}
          <img
            src="/aura_unboxed_bust.webp"
            alt="AURA AI Autonomous Android"
            className="w-full h-full object-contain select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />

          {/* Brillo especular estelar reactivo al puntero */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-25"
            style={{
              background: `radial-gradient(circle at ${50 + pointer.x * 25}% ${35 + pointer.y * 25}%, rgba(34,211,238,0.55) 0%, rgba(99,102,241,0.2) 40%, transparent 68%)`
            }}
          />

          {/* =================================================================== */}
          {/* 4. MOTOR OCULAR BIOCIBERNÉTICO (EYE-TRACKING + IRIS LUMINISCENTE)   */}
          {/* =================================================================== */}

          {/* OJO IZQUIERDO (Coord: x: 29.7%, y: 34.9%) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '29.7%',
              top: '34.9%',
              width: '15%',
              height: '5.5%',
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
                background:
                  'radial-gradient(circle at 45% 45%, #ffffff 0%, #38bdf8 30%, #0284c7 70%, #032147 100%)',
                boxShadow:
                  '0 0 8px rgba(56, 189, 248, 0.95), inset 0 0 4px rgba(255, 255, 255, 0.85)'
              }}
            >
              {/* Núcleo cuántico */}
              <div className="absolute inset-[30%] bg-black rounded-full" />
              {/* Reflejo corneal */}
              <div className="absolute top-[18%] left-[22%] w-[28%] h-[28%] bg-white rounded-full shadow-[0_0_3px_#ffffff]" />
            </div>
          </div>

          {/* OJO DERECHO (Coord: x: 70.3%, y: 34.9%) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '70.3%',
              top: '34.9%',
              width: '15%',
              height: '5.5%',
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
                background:
                  'radial-gradient(circle at 45% 45%, #ffffff 0%, #38bdf8 30%, #0284c7 70%, #032147 100%)',
                boxShadow:
                  '0 0 8px rgba(56, 189, 248, 0.95), inset 0 0 4px rgba(255, 255, 255, 0.85)'
              }}
            >
              {/* Núcleo cuántico */}
              <div className="absolute inset-[30%] bg-black rounded-full" />
              {/* Reflejo corneal */}
              <div className="absolute top-[18%] left-[22%] w-[28%] h-[28%] bg-white rounded-full shadow-[0_0_3px_#ffffff]" />
            </div>
          </div>

          {/* =================================================================== */}
          {/* 5. PÁRPADOS FOTOMÓRFICOS BIO-SINTÉTICOS (PARPADEO NATURAL 90MS)     */}
          {/* =================================================================== */}

          {/* Párpado Ojo Izquierdo */}
          <div
            className="absolute pointer-events-none transition-all duration-75 ease-in-out"
            style={{
              left: '22.0%',
              top: '31.5%',
              width: '15.5%',
              height: '6.8%',
              overflow: 'hidden',
              transform: blinkState ? 'scaleY(1)' : 'scaleY(0.04)',
              transformOrigin: '50% 50%',
              background: 'linear-gradient(to bottom, #dcd7d2 0%, #c4bcb5 100%)',
              borderRadius: '50% / 55%',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 25
            }}
          >
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-900/85" />
          </div>

          {/* Párpado Ojo Derecho */}
          <div
            className="absolute pointer-events-none transition-all duration-75 ease-in-out"
            style={{
              left: '62.5%',
              top: '31.5%',
              width: '15.5%',
              height: '6.8%',
              overflow: 'hidden',
              transform: blinkState ? 'scaleY(1)' : 'scaleY(0.04)',
              transformOrigin: '50% 50%',
              background: 'linear-gradient(to bottom, #dcd7d2 0%, #c4bcb5 100%)',
              borderRadius: '50% / 55%',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 25
            }}
          >
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-900/85" />
          </div>

          {/* =================================================================== */}
          {/* 6. ARTICULACIÓN VOCAL VIVA & RESONANCIA OROFACIAL (LIPSYNC & GLOW)  */}
          {/* =================================================================== */}
          {isSpeaking && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '65.8%',
                width: '26%',
                height: '5.5%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20
              }}
            >
              {/* Resonancia de cavidad orofacial de plasma */}
              <motion.div
                animate={{
                  scaleY: [0.6, 1.5, 0.75, 1.65, 0.6],
                  scaleX: [0.92, 1.12, 0.95, 1.18, 0.92],
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

              {/* Micro-apertura labial */}
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

          {/* =================================================================== */}
          {/* 7. REDES NEURONALES LATERALES Y FIBRA ÓPTICA DEL CUELLO AL HABLAR  */}
          {/* =================================================================== */}
          {isSpeaking && (
            <div className="absolute inset-0 pointer-events-none z-15 mix-blend-screen opacity-70">
              {/* Redes mejilla izquierda */}
              <motion.div
                animate={{ opacity: [0.35, 0.85, 0.4, 0.95, 0.35] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute left-[14%] top-[48%] w-5 h-5 rounded-full bg-cyan-400/35 blur-sm"
              />
              {/* Redes mejilla derecha */}
              <motion.div
                animate={{ opacity: [0.4, 0.95, 0.35, 0.85, 0.4] }}
                transition={{ duration: 0.34, repeat: Infinity, delay: 0.04 }}
                className="absolute right-[14%] top-[48%] w-5 h-5 rounded-full bg-indigo-400/35 blur-sm"
              />
              {/* Fibra óptica en cuello */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.4, 0.9, 0.3] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="absolute left-[38%] top-[72%] w-16 h-8 rounded-full bg-cyan-400/25 blur-md"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 8. BADGE TÁCTICO DE ESTADO TELEMÉTRICO FLOTANTE (OPCIONAL)               */}
      {/* ========================================================================= */}
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
