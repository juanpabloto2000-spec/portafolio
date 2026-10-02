import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeGalaxyPreloader({ pageKey }) {
  // Se debe mostrar tanto en la página de inicio (home) como en diagnóstico
  const isAllowedPage = pageKey === 'home' || pageKey === 'diagnostico';
  
  const [isVisible, setIsVisible] = useState(isAllowedPage);
  const [showLogo, setShowLogo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isAllowedPage) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setShowLogo(false);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.debug('Autoplay fallback notice:', err);
        });
      }
    }

    // Efecto en los últimos 2 segundos: aparecer el logo con fade-in suave desde 1.4s
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1400);

    // Salida cinematográfica ágil en el frame exacto de entrada al agujero (3.35s)
    const exitTimer = setTimeout(() => {
      if (videoRef.current) {
        try { videoRef.current.pause(); } catch {}
      }
      setIsVisible(false);
    }, 3350);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
    };
  }, [pageKey]);

  if (!isAllowedPage && !isVisible) {
    return null;
  }

  const handleDismiss = () => {
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch {}
    }
    setIsVisible(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime >= 1.4 && !showLogo) {
      setShowLogo(true);
    }

    if (video.currentTime >= 3.35 && isVisible) {
      try { video.pause(); } catch {}
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={`cinematic-preloader-${pageKey}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden flex items-center justify-center select-none cursor-pointer w-full max-w-[100vw] h-full max-h-[100vh]"
        >
          {/* Video a pantalla completa con encuadre adaptable (enfocado en el vórtice cósmico) */}
          <video
            ref={videoRef}
            src="/videos/pcarga.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleDismiss}
            onError={handleDismiss}
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 preloader-video pointer-events-none"
          />

          {/* Viñeta cinematográfica muy sutil para dar profundidad */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Logo transparente apareciendo con opacidad en el centro exacto */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex flex-col items-center justify-center p-6 space-y-3"
              >
                <img
                  src="/logo sin fondo.png"
                  alt="Dynamind Studios Logo"
                  className="w-44 xs:w-56 sm:w-72 md:w-88 h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]"
                />
                {pageKey === 'diagnostico' && (
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 backdrop-blur-md">
                    INICIALIZANDO MOTOR DE TRIAJE OPERATIVO
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón sutil de skip / saltar por accesibilidad en la esquina inferior derecha */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute bottom-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-[11px] font-mono tracking-widest uppercase backdrop-blur-md border border-white/15 transition-all cursor-pointer opacity-60 hover:opacity-100"
          >
            Saltar ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
