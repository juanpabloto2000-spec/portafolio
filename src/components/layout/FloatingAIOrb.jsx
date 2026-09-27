import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DynamindAIAssistantModal from '../interactive/DynamindAIAssistantModal';

export default function FloatingAIOrb() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isWarpSpeed, setIsWarpSpeed] = useState(false);

  return (
    <>
      <aside 
        aria-label="Galaxia espiral interactiva Dynamind AI" 
        className="fixed bottom-6 right-6 z-40 select-none no-print"
      >
        <div className="relative flex flex-col items-center">
          
          {/* Lente Gravitacional / Sombra Cósmica en el Vacío */}
          <div className="w-12 h-2.5 rounded-full bg-cyan-950/60 blur-sm transform translate-y-12 scale-90 pointer-events-none" />

          {/* Galaxia Espiral Abierta Compacta y Elegante */}
          <motion.button
            type="button"
            onClick={() => setModalOpen(true)}
            onMouseEnter={() => setIsWarpSpeed(true)}
            onMouseLeave={() => setIsWarpSpeed(false)}
            whileHover={{ 
              scale: 1.15,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            }}
            whileTap={{ scale: 0.9 }}
            className="relative w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer group focus:outline-none"
            aria-label="Abrir asistente de inteligencia artificial cósmica"
          >
            {/* 1. Halo Convectivo de Plasma Exterior (Nebulosa Circundante) */}
            <div 
              className={`absolute -inset-2.5 rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-600/30 to-amber-400/25 blur-xl transition-all duration-500 pointer-events-none ${
                isWarpSpeed 
                  ? 'scale-130 opacity-100 blur-2xl from-cyan-400/50 via-fuchsia-500/50 to-amber-300/40' 
                  : 'opacity-70 scale-100 group-hover:opacity-90'
              }`} 
            />

            {/* 2. Plano Galáctico Inclinado en Perspectiva 3D */}
            <div 
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  transform: 'rotateX(52deg) rotateZ(-20deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 🌌 BRAZO ESPIRAL PRIMARIO (Rotación Continua // Warp Speed al Hover) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: isWarpSpeed ? 1.2 : 16, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                  className="absolute w-16 h-16 flex items-center justify-center"
                >
                  {/* Brazo Espiral Alfa (Cian Brillante a Violeta) */}
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible filter drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
                    <defs>
                      <linearGradient id="spiralGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="35%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#a855f7" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="spiralGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#a855f7" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Brazo Logarítmico 1 */}
                    <path 
                      d="M 50 50 Q 65 40, 75 25 T 85 5" 
                      fill="none" 
                      stroke="url(#spiralGrad1)" 
                      strokeWidth={isWarpSpeed ? 4.5 : 3.4} 
                      strokeLinecap="round"
                    />
                    
                    {/* Brazo Logarítmico 2 (Opuesto a 180°) */}
                    <path 
                      d="M 50 50 Q 35 60, 25 75 T 15 95" 
                      fill="none" 
                      stroke="url(#spiralGrad2)" 
                      strokeWidth={isWarpSpeed ? 4.5 : 3.4} 
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Cúmulos de Polvo Estelar y Gases Nebulares */}
                  <div 
                    className="absolute w-14 h-7 rounded-full blur-[1.5px] opacity-75 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.7) 0%, rgba(168,85,247,0.4) 50%, transparent 80%)',
                      transform: 'rotate(40deg) skewX(25deg)'
                    }}
                  />
                  <div 
                    className="absolute w-14 h-7 rounded-full blur-[1.5px] opacity-75 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.6) 0%, rgba(217,70,239,0.35) 50%, transparent 80%)',
                      transform: 'rotate(220deg) skewX(25deg)'
                    }}
                  />
                </motion.div>

                {/* ✨ POLVO ESTELAR FINO & MICRO-ESTRELLAS ORBITANTES (Contragiro diferencial) */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: isWarpSpeed ? 1.8 : 22, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                  className="absolute w-18 h-18 flex items-center justify-center pointer-events-none"
                >
                  <span className="absolute top-1 left-4 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_#fff]" />
                  <span className="absolute bottom-2 right-4 w-1.2 h-1.2 rounded-full bg-cyan-200 shadow-[0_0_6px_#22d3ee]" />
                  <span className="absolute top-5 right-1 w-1 h-1 rounded-full bg-amber-200 shadow-[0_0_5px_#fbbf24]" />
                  <span className="absolute bottom-4 left-2 w-1 h-1 rounded-full bg-fuchsia-300 shadow-[0_0_6px_#d946ef]" />
                </motion.div>

                {/* ☀️ NÚCLEO GALÁCTICO / QUASAR CENTRAL HIPER-RADIANTE */}
                <div className="relative z-10 flex items-center justify-center">
                  {/* Resplandor de Acreción */}
                  <motion.div 
                    animate={isWarpSpeed ? { scale: [1, 1.35, 1.2], opacity: [0.9, 1, 0.95] } : { scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-5 h-5 rounded-full blur-sm bg-gradient-to-tr from-cyan-400 via-white to-amber-300 shadow-[0_0_18px_rgba(34,211,238,0.9),0_0_28px_rgba(245,158,11,0.5)]" 
                  />
                  {/* Punto Cero Blanco Puro de Singularidad */}
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_#38bdf8]" />
                </div>

              </div>
            </div>

          </motion.button>
        </div>
      </aside>

      {/* Modal Interactivo de Asistencia */}
      <DynamindAIAssistantModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
