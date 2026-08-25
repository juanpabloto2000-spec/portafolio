import React from 'react';
import { motion } from 'framer-motion';

export default function KineticMarquee() {
  const items = [
    "INGENIERÍA WEB DE ULTRA LUJO",
    "SISTEMAS DE ALTA CONVERSIÓN",
    "AGENDAMIENTO AUTÓNOMO",
    "VALIDACIÓN DE DEPÓSITOS",
    "MENÚS & CARTAS TÁCTILES",
    "AGENTES INTELIGENTES",
    "ARQUITECTURA DIGITAL SIN FRICCIÓN"
  ];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm select-none">
      
      {/* Left/Right Vignette Gradient */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050507] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050507] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="flex items-center gap-8 whitespace-nowrap w-max text-xs sm:text-sm font-semibold tracking-wider font-heading-luxury text-zinc-400"
      >
        {/* Repeat list twice for seamless loop */}
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 group">
            <span className="hover:text-white transition-colors duration-300">
              {text}
            </span>
            <span className="text-zinc-600 font-normal select-none">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
