import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AndroidVoiceAvatar - Cara de androide femenina hiper-estética y viva
 * Modula boca, sensores acústicos y mirada cuando habla (isSpeaking === true)
 * Incorpora parpadeo ocular autónomo y respiración neural a 60 FPS
 */
export default function AndroidVoiceAvatar({ size = 'md', isSpeaking = false, className = '' }) {
  // Dimensiones configurables
  const dimensions = {
    sm: { box: 'w-8 h-8', px: 32 },
    md: { box: 'w-12 h-12', px: 48 },
    lg: { box: 'w-16 h-16', px: 64 }
  }[size] || { box: 'w-12 h-12', px: 48 };

  // Parpadeo ocular aleatorio
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timeout;
    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      timeout = setTimeout(triggerBlink, 3000 + Math.random() * 3500);
    };
    timeout = setTimeout(triggerBlink, 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${dimensions.box} ${className}`}>
      {/* 1. Halo Convectivo de Plasma Exterior (Se amplifica cuando Aura habla) */}
      <motion.div
        animate={
          isSpeaking
            ? {
                scale: [1, 1.25, 1.08, 1.22, 1],
                opacity: [0.6, 0.95, 0.7, 0.9, 0.6]
              }
            : {
                scale: [0.98, 1.04, 0.98],
                opacity: [0.35, 0.5, 0.35]
              }
        }
        transition={{
          duration: isSpeaking ? 1.4 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/40 via-purple-600/35 to-amber-400/25 blur-md pointer-events-none"
      />

      {/* 2. Marco Contenedor Estilizado */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e1424] to-[#060810] border border-cyan-400/40 shadow-inner flex items-center justify-center">
        {/* Rejilla HUD sutil de fondo */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }} 
        />

        {/* 3. Rostro Vectorial de la Androide AURA */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-[92%] h-[92%] overflow-visible filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          <defs>
            {/* Gradiente de piel biocibernética de titanio perla */}
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="45%" stopColor="#cbd5e1" />
              <stop offset="85%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Gradiente de ojos biocibernéticos */}
            <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            {/* Gradiente de luz fonética en la boca */}
            <linearGradient id="mouthGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Cuello estilizado */}
          <path d="M 44 76 L 44 92 L 56 92 L 56 76 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <line x1="50" y1="78" x2="50" y2="90" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* Silueta de Cabeza / Mandíbula de la Androide */}
          <path 
            d="M 28 32 C 28 16, 72 16, 72 32 C 72 50, 68 70, 50 78 C 32 70, 28 50, 28 32 Z" 
            fill="url(#faceGrad)"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />

          {/* Placas craneales laterales (Partición bio-sintética) */}
          <path d="M 29 36 Q 36 48 38 60" fill="none" stroke="#475569" strokeWidth="0.9" strokeDasharray="1.5,1.5" />
          <path d="M 71 36 Q 64 48 62 60" fill="none" stroke="#475569" strokeWidth="0.9" strokeDasharray="1.5,1.5" />

          {/* Diadema frontal neural / Núcleo de cuarzo */}
          <path d="M 38 22 Q 50 25 62 22" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.8" />
          <circle cx="50" cy="23.5" r="2.2" fill="#22d3ee" className="animate-pulse" filter="drop-shadow(0 0 3px #38bdf8)" />

          {/* Cejas sutiles refinadas */}
          <path d="M 35 34 Q 41 32 46 35" fill="none" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 54 35 Q 59 32 65 34" fill="none" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />

          {/* Ojos Biocibernéticos con Parpadeo Autónomo */}
          <g transform={`scale(1, ${blink ? 0.08 : 1})`} style={{ transformOrigin: '50% 41px', transition: 'transform 0.08s ease' }}>
            {/* Ojo Izquierdo */}
            <ellipse cx="40.5" cy="41" rx="5.5" ry="3.2" fill="#090d16" stroke="#334155" strokeWidth="0.8" />
            <ellipse cx="40.5" cy="41" rx="3.2" ry="3.2" fill="url(#eyeGlow)" />
            <circle cx="41.5" cy="39.8" r="1" fill="#ffffff" />

            {/* Ojo Derecho */}
            <ellipse cx="59.5" cy="41" rx="5.5" ry="3.2" fill="#090d16" stroke="#334155" strokeWidth="0.8" />
            <ellipse cx="59.5" cy="41" rx="3.2" ry="3.2" fill="url(#eyeGlow)" />
            <circle cx="60.5" cy="39.8" r="1" fill="#ffffff" />
          </g>

          {/* Nariz estilizada minimalista */}
          <path d="M 50 43 L 50 51 L 52 53" fill="none" stroke="#64748b" strokeWidth="1" strokeLinecap="round" />

          {/* Resonadores Acústicos en Pómulos (Ecualizadores vivos al hablar) */}
          <g opacity={isSpeaking ? 0.95 : 0.35}>
            {/* Lado izquierdo */}
            <motion.line 
              x1="32" y1="50" x2="32" y2="56" 
              stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round"
              animate={isSpeaking ? { y1: [49, 46, 51, 48, 49], y2: [57, 60, 55, 58, 57] } : {}}
              transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.line 
              x1="34.5" y1="48" x2="34.5" y2="58" 
              stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round"
              animate={isSpeaking ? { y1: [47, 44, 49, 46, 47], y2: [59, 62, 57, 60, 59] } : {}}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
            />

            {/* Lado derecho */}
            <motion.line 
              x1="68" y1="50" x2="68" y2="56" 
              stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round"
              animate={isSpeaking ? { y1: [49, 46, 51, 48, 49], y2: [57, 60, 55, 58, 57] } : {}}
              transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.line 
              x1="65.5" y1="48" x2="65.5" y2="58" 
              stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round"
              animate={isSpeaking ? { y1: [47, 44, 49, 46, 47], y2: [59, 62, 57, 60, 59] } : {}}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
            />
          </g>

          {/* 👄 BOCA DE LA ANDROIDE: Articulación de habla dinámica en tiempo real */}
          {isSpeaking ? (
            <g>
              {/* Resplandor fonético interior */}
              <motion.ellipse 
                cx="50" 
                cy="63.5" 
                rx="7" 
                ry="4" 
                fill="url(#mouthGlow)"
                animate={{
                  ry: [2, 5, 2.5, 6, 2],
                  rx: [5, 7.5, 6, 8, 5],
                  opacity: [0.7, 1, 0.8, 1, 0.7]
                }}
                transition={{
                  duration: 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              {/* Labio superior gesticulando */}
              <motion.path 
                d="M 43 62 Q 50 60 57 62" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="1.2" 
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 43 62 Q 50 60 57 62",
                    "M 42 61 Q 50 59 58 61",
                    "M 43 62 Q 50 60 57 62"
                  ]
                }}
                transition={{ duration: 0.45, repeat: Infinity }}
              />
              {/* Labio inferior gesticulando en cadencia de voz */}
              <motion.path 
                d="M 44 65 Q 50 67 56 65" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="1.4" 
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 44 65 Q 50 66 56 65",
                    "M 43 67 Q 50 71 57 67",
                    "M 44 65 Q 50 66 56 65"
                  ]
                }}
                transition={{ duration: 0.45, repeat: Infinity }}
              />
            </g>
          ) : (
            <g>
              {/* Boca cerrada en reposo, elegante y pulcra */}
              <path 
                d="M 44 63.5 Q 50 65 56 63.5" 
                fill="none" 
                stroke="#475569" 
                strokeWidth="1.3" 
                strokeLinecap="round" 
              />
              <path 
                d="M 46 64.2 Q 50 64.8 54 64.2" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="0.8" 
                opacity="0.6"
              />
            </g>
          )}

          {/* Micro-luz de telemetría en el mentón */}
          <circle cx="50" cy="72" r="1" fill="#38bdf8" opacity={isSpeaking ? 0.9 : 0.4} />
        </svg>

        {/* 4. Indicador de estado en esquina superior (Pulsante cuando Aura habla) */}
        <span 
          className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
            isSpeaking 
              ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping' 
              : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
          }`} 
        />
        <span 
          className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
            isSpeaking ? 'bg-cyan-300' : 'bg-emerald-400'
          }`} 
        />
      </div>
    </div>
  );
}
