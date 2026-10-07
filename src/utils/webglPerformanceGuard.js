// src/utils/webglPerformanceGuard.js
// Guardián de Rendimiento WebGL a 60 FPS para Dynamind Studios:
// - Límite de resolución DPR a 1.5 para erradicar el sobrecalentamiento de GPU en pantallas Retina / 4K.
// - Detección de visibilidad con IntersectionObserver y Page Visibility API para apagar RAFs fuera de pantalla.
// - Manejo de context loss y recuperación defensiva.

/**
 * Retorna el pixel ratio optimizado para GPUs móviles y de escritorio.
 * Clampea entre 1 y 1.5 para ahorrar hasta un 65% de fragment fill rate sin pérdida perceptible de nitidez.
 */
export function getClampedPixelRatio(maxRatio = 1.5) {
  if (typeof window === 'undefined') return 1;
  const dpr = window.devicePixelRatio || 1;
  return Math.min(Math.max(dpr, 1), maxRatio);
}

/**
 * Conecta un IntersectionObserver a un elemento contenedor para pausar el render loop
 * automáticamente cuando el componente no está en el viewport visible del usuario.
 */
export function createVisibilityObserver(element, onVisible, onHidden, threshold = 0.05) {
  if (typeof window === 'undefined' || !element || !window.IntersectionObserver) {
    return { disconnect: () => {} };
  }

  let isCurrentlyVisible = true;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting && !isCurrentlyVisible) {
        isCurrentlyVisible = true;
        onVisible?.();
      } else if (!entry.isIntersecting && isCurrentlyVisible) {
        isCurrentlyVisible = false;
        onHidden?.();
      }
    },
    { threshold }
  );

  observer.observe(element);

  // También escuchar cambios de pestaña activa para ahorrar 100% de batería
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isCurrentlyVisible) {
        isCurrentlyVisible = false;
        onHidden?.();
      }
    } else {
      // Re-evaluar visibilidad real
      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView && !isCurrentlyVisible) {
        isCurrentlyVisible = true;
        onVisible?.();
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return {
    disconnect: () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    },
    isVisible: () => isCurrentlyVisible
  };
}

/**
 * Conecta manejadores de pérdida de contexto WebGL defensivos.
 */
export function addContextLossHandlers(canvas, onLost, onRestored) {
  if (!canvas) return () => {};

  const handleLost = (e) => {
    e.preventDefault();
    console.warn('[WebGLGuard] WebGL context lost. Suspending render loop.');
    onLost?.();
  };

  const handleRestored = () => {
    console.info('[WebGLGuard] WebGL context restored. Rebuilding scene.');
    onRestored?.();
  };

  canvas.addEventListener('webglcontextlost', handleLost, false);
  canvas.addEventListener('webglcontextrestored', handleRestored, false);

  return () => {
    canvas.removeEventListener('webglcontextlost', handleLost);
    canvas.removeEventListener('webglcontextrestored', handleRestored);
  };
}
