import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeGalaxyPreloader({ pageKey }) {
  // Solo se debe mostrar en la página de inicio (home), nunca en sistemas, obras o rutas internas
  if (pageKey && pageKey !== 'home') {
    return null;
  }

  const [isVisible, setIsVisible] = useState(() => {
    // Si ya se mostró en esta sesión, no volver a bloquear
    if (typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown_v2')) {
      return false;
    }
    return true;
  });
  const [showLogo, setShowLogo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    try {
      sessionStorage.setItem('preloader_shown_v2', 'true');
    } catch {}
    const video = videoRef.current;
    if (video) {
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

    // Efecto en los últimos 2 segundos: aparecer el logo con fade-in suave desde 1.6s
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1600);

    // Salida cinematográfica en el frame exacto de entrada al agujero (3.65s)
    const exitTimer = setTimeout(() => {
      if (videoRef.current) {
        try { videoRef.current.pause(); } catch {}
      }
      setIsVisible(false);
    }, 3650);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleVideoEnded = () => {
    setIsVisible(false);
  };

  const handleVideoError = () => {
    // Si hay error al cargar el video, proceder de inmediato al index
    setIsVisible(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Mostrar logo con opacidad suave en los últimos 2 segundos de vuelo
    if (video.currentTime >= 1.6 && !showLogo) {
      setShowLogo(true);
    }

    // 2. Terminar en el frame exacto cuando la nave entra en el agujero cósmico (3.60s)
    if (video.currentTime >= 3.60 && isVisible) {
      try { video.pause(); } catch {}
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden flex items-center justify-center select-none cursor-pointer w-full max-w-[100vw] h-full max-h-[100vh]"
        >
          {/* Video a pantalla completa con encuadre adaptable (enfocado en el vórtice cósmico en móvil y centrado en desktop) */}
          <video
            ref={videoRef}
            src="/videos/pcarga.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 preloader-video pointer-events-none"
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
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex items-center justify-center p-6"
              >
                <img
                  src="/logo sin fondo.png"
                  alt="Dynamind Studios Logo"
                  className="w-44 xs:w-56 sm:w-72 md:w-88 h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]"
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
