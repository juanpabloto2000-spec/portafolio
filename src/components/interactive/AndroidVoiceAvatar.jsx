import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AndroidVoiceAvatar - Rostro holográfico de la Androide AURA
 * Totalmente libre (SIN círculos ni marcos de encierro).
 * Escala visible prominente, ojos biocibernéticos con parpadeo y boca articulada en tiempo real.
 */
export default function AndroidVoiceAvatar({ size = 'md', isSpeaking = false, className = '' }) {
  // Dimensiones prominentes y visibles
  const dimensions = {
    sm: { box: 'w-14 h-14 sm:w-16 sm:h-16', scale: 1.05 },         // Para mensajes de chat más visibles y prominentes (56px - 64px)
    md: { box: 'w-20 h-20 sm:w-24 sm:h-24', scale: 1.15 }, // Para cabecera del modal (80px - 96px)
    lg: { box: 'w-28 h-28', scale: 1.3 }        // Para vistas de gran formato
  }[size] || { box: 'w-20 h-20 sm:w-24 sm:h-24', scale: 1.15 };

  // Parpadeo ocular bio-sintético
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timeout;
    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 130);
      timeout = setTimeout(triggerBlink, 2800 + Math.random() * 3200);
    };
    timeout = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none overflow-visible ${dimensions.box} ${className}`}>
      
      {/* 1. Ondas Holográficas Concéntricas al Hablar (Sin caja) */}
      {isSpeaking && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{
            scale: [0.9, 1.4, 1.6],
            opacity: [0.7, 0.35, 0]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          className="absolute inset-0 rounded-full border border-cyan-400/50 pointer-events-none"
        />
      )}

      {/* 2. Halo de Plasma Libre Circundante (Bioluminiscencia orgánica) */}
      <motion.div
        animate={
          isSpeaking
            ? {
                scale: [1, 1.28, 1.12, 1.25, 1],
                opacity: [0.65, 0.95, 0.75, 0.9, 0.65]
              }
            : {
                scale: [0.95, 1.05, 0.95],
                opacity: [0.3, 0.45, 0.3]
              }
        }
        transition={{
          duration: isSpeaking ? 1.3 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-500/35 via-purple-600/30 to-blue-500/25 blur-xl pointer-events-none"
      />

      {/* 3. Rostro Flotante de la Androide AURA (Completamente desanclado, sin fondo ni recuadro) */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
      >
        <defs>
          {/* Cerámica de titanio bio-sintético */}
          <linearGradient id="auraFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Ojos biocibernéticos hiper-radiantes */}
          <linearGradient id="auraEyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          {/* Luz orofacial al articular voz */}
          <linearGradient id="auraMouthAperture" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
          </linearGradient>

          {/* Resplandor de telemetría */}
          <filter id="auraGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Cuello biocibernético con núcleos de fibra óptica */}
        <path d="M 43 75 L 43 93 L 57 93 L 57 75 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
        <line x1="50" y1="76" x2="50" y2="92" stroke="#22d3ee" strokeWidth="1.8" strokeOpacity="0.85" filter="url(#auraGlow)" />
        <line x1="46" y1="79" x2="46" y2="89" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="54" y1="79" x2="54" y2="89" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.5" />

        {/* Silueta Mandibular y Pómulos Androide de Cerámica Perla */}
        <path 
          d="M 27 30 C 27 12, 73 12, 73 30 C 73 50, 69 71, 50 80 C 31 71, 27 50, 27 30 Z" 
          fill="url(#auraFaceGrad)"
          stroke="#94a3b8"
          strokeWidth="1.4"
        />

        {/* Biseles anatómicos laterales (Placas de nano-arquitectura) */}
        <path d="M 28 35 Q 36 48 38 62" fill="none" stroke="#64748b" strokeWidth="0.9" strokeDasharray="2,1.5" opacity="0.8" />
        <path d="M 72 35 Q 64 48 62 62" fill="none" stroke="#64748b" strokeWidth="0.9" strokeDasharray="2,1.5" opacity="0.8" />

        {/* Diadema frontal neural con gema cuántica */}
        <path d="M 36 20 Q 50 23 64 20" fill="none" stroke="#0284c7" strokeWidth="1.2" opacity="0.9" />
        <circle cx="50" cy="21.5" r="2.8" fill="#38bdf8" filter="url(#auraGlow)" />
        <circle cx="50" cy="21.5" r="1.2" fill="#ffffff" />

        {/* Cejas estilizadas bio-mecánicas */}
        <path d="M 34 32 Q 41 29 46 32" fill="none" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 54 32 Q 59 29 66 32" fill="none" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" />

        {/* Ojos Biocibernéticos con Parpadeo Autónomo y Mirada Viva */}
        <g transform={`scale(1, ${blink ? 0.06 : 1})`} style={{ transformOrigin: '50% 39px', transition: 'transform 0.08s ease' }}>
          {/* Ojo Izquierdo */}
          <ellipse cx="40" cy="39" rx="6.2" ry="3.8" fill="#090d16" stroke="#334155" strokeWidth="0.9" />
          <ellipse cx="40" cy="39" rx="3.8" ry="3.8" fill="url(#auraEyeGlow)" filter="drop-shadow(0 0 2px #22d3ee)" />
          <circle cx="41.2" cy="37.8" r="1.3" fill="#ffffff" />
          <circle cx="39" cy="40.5" r="0.6" fill="#a5f3fc" />

          {/* Ojo Derecho */}
          <ellipse cx="60" cy="39" rx="6.2" ry="3.8" fill="#090d16" stroke="#334155" strokeWidth="0.9" />
          <ellipse cx="60" cy="39" rx="3.8" ry="3.8" fill="url(#auraEyeGlow)" filter="drop-shadow(0 0 2px #22d3ee)" />
          <circle cx="61.2" cy="37.8" r="1.3" fill="#ffffff" />
          <circle cx="59" cy="40.5" r="0.6" fill="#a5f3fc" />
        </g>

        {/* Nariz minimalista de precisión */}
        <path d="M 50 40 L 50 49 L 52.5 51.5" fill="none" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />

        {/* Resonadores Acústicos en Pómulos (Ecualizadores de voz vibrando al hablar) */}
        <g opacity={isSpeaking ? 1 : 0.4}>
          {/* Lado izquierdo */}
          <motion.line 
            x1="31" y1="48" x2="31" y2="55" 
            stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"
            animate={isSpeaking ? { y1: [47, 43, 49, 45, 47], y2: [56, 60, 54, 58, 56] } : {}}
            transition={{ duration: 0.28, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line 
            x1="33.5" y1="46" x2="33.5" y2="57" 
            stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"
            animate={isSpeaking ? { y1: [45, 41, 47, 43, 45], y2: [58, 62, 56, 60, 58] } : {}}
            transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut', delay: 0.04 }}
          />

          {/* Lado derecho */}
          <motion.line 
            x1="69" y1="48" x2="69" y2="55" 
            stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"
            animate={isSpeaking ? { y1: [47, 43, 49, 45, 47], y2: [56, 60, 54, 58, 56] } : {}}
            transition={{ duration: 0.28, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line 
            x1="66.5" y1="46" x2="66.5" y2="57" 
            stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"
            animate={isSpeaking ? { y1: [45, 41, 47, 43, 45], y2: [58, 62, 56, 60, 58] } : {}}
            transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut', delay: 0.04 }}
          />
        </g>

        {/* 👄 BOCA DE LA ANDROIDE: Articulación fonética viva en tiempo real */}
        {isSpeaking ? (
          <g>
            {/* Cámara acústica orofacial iluminada */}
            <motion.ellipse 
              cx="50" 
              cy="63" 
              rx="8.5" 
              ry="5" 
              fill="url(#auraMouthAperture)"
              filter="url(#auraGlow)"
              animate={{
                ry: [2.5, 6.5, 3, 7.5, 2.5],
                rx: [6.5, 9.5, 7.5, 10, 6.5],
                opacity: [0.75, 1, 0.85, 1, 0.75]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            {/* Labio superior articulando */}
            <motion.path 
              d="M 42 61 Q 50 58 58 61" 
              fill="none" 
              stroke="#0f172a" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              animate={{
                d: [
                  "M 42 61 Q 50 58 58 61",
                  "M 41 59.5 Q 50 57 59 59.5",
                  "M 42 61 Q 50 58 58 61"
                ]
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            {/* Labio inferior articulando con cadencia de habla */}
            <motion.path 
              d="M 43 65 Q 50 67 57 65" 
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="1.6" 
              strokeLinecap="round"
              animate={{
                d: [
                  "M 43 65 Q 50 67 57 65",
                  "M 42 68 Q 50 73 58 68",
                  "M 43 65 Q 50 67 57 65"
                ]
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          </g>
        ) : (
          <g>
            {/* Boca cerrada serena en reposo */}
            <path 
              d="M 43 62.5 Q 50 64.5 57 62.5" 
              fill="none" 
              stroke="#334155" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M 45 63.5 Q 50 64.2 55 63.5" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="1" 
              opacity="0.7"
            />
          </g>
        )}

        {/* Micro-sensor de telemetría en el mentón */}
        <circle cx="50" cy="72" r="1.3" fill="#38bdf8" opacity={isSpeaking ? 1 : 0.5} filter="url(#auraGlow)" />
      </svg>

      {/* 4. Telemetría de estado flotante orgánicamente anclada al hombro cibernético */}
      <span 
        className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ${
          isSpeaking 
            ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-ping' 
            : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
        }`} 
      />
      <span 
        className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ${
          isSpeaking ? 'bg-cyan-300' : 'bg-emerald-400'
        }`} 
      />
    </div>
  );
}
