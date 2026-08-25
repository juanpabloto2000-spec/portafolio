import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '/logo-transparent.png';

export default function Preloader({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 750);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050507] pointer-events-none select-none"
        >
          {/* Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-white/[0.04] rounded-full blur-[100px]" />

          {/* Pulsing Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src={logoImg} 
                alt="Dynamind Studios" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" 
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading-luxury text-xs font-bold tracking-widest text-white">
                DYNAMIND STUDIOS
              </span>
              <span className="text-[8px] uppercase tracking-super-wide text-zinc-500 font-mono mt-0.5">
                DARK LUXURY ARCHITECTURE
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
