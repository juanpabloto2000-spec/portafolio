import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeGalaxyPreloader({ pageKey }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const videoRef = useRef(null);

  // Iniciar la reproducción y temporizar la aparición del logo en los últimos 2 segundos
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Fallback si el navegador bloquea autoplay
      });
    }

    // Efecto en los últimos 2 segundos: aparecer el logo con fade-in suave
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    // Salida suave a los 4.2 segundos (duración completa del clip)
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleVideoEnded = () => {
    // Si el video termina antes de los 4.2s, cerrar con suavidad
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    // Si la duración es conocida y faltan <= 2 segundos, activar el logo
    if (video.duration && (video.duration - video.currentTime <= 2.1) && !showLogo) {
      setShowLogo(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden flex items-center justify-center select-none"
        >
          {/* Video a pantalla completa sin etiquetas */}
          <video
            ref={videoRef}
            src="/videos/pcarga.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Viñeta cinematográfica muy sutil para dar profundidad */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Logo transparente apareciendo con opacidad en los últimos 2 segundos en el centro exacto */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex items-center justify-center p-6"
              >
                <img
                  src="/logo sin fondo.png"
                  alt="Dynamind Studios Logo"
                  className="w-52 xs:w-64 sm:w-80 md:w-96 h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón sutil de skip / saltar por accesibilidad en la esquina inferior derecha */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="absolute bottom-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-[11px] font-mono tracking-widest uppercase backdrop-blur-md border border-white/10 transition-all cursor-pointer opacity-40 hover:opacity-100"
          >
            Saltar
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
