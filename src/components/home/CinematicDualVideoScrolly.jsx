import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

// 120 fotogramas de alta fidelidad: equilibrio óptimo entre fluidez absoluta a 60 FPS,
// consumo controlado de memoria VRAM (<400 MB) y cero pausas de Garbage Collector.
const TOTAL_FRAMES = 120;

export default function CinematicDualVideoScrolly() {
  const { t } = useThemeLanguage();
  const s = t.scrolly;

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const currentTargetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  // Framer Motion useScroll anclado al contenedor del scrolly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Físicas de resorte cinemáticas Apple-style con amortiguación perfeccionada para cero oscilaciones parásitas
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001
  });

  // Dibujado óptico en canvas con cálculo de 'cover' proporcional sin clearRect parásito
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Si ya está pintado exactamente este frame, abortamos para ahorrar GPU
    if (frameIdx === lastDrawnFrameRef.current) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];

    // Búsqueda radial ultra-rápida hacia afuera en O(1) si el frame objetivo aún estuviera en tránsito
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let delta = 1; delta <= 15; delta++) {
        const prev = imagesRef.current[frameIdx - delta];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIdx + delta];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const hRatio = w / imgW;
    const vRatio = h / imgH;
    
    // En pantallas móviles verticales (aspect ratio estrecho), aplicar un ratio balanceado
    // para que la escena y el monitor no se recorten agresivamente en los laterales
    const isPortraitMobile = (w / h) < 0.75;
    const ratio = isPortraitMobile 
      ? Math.max(hRatio * 1.25, vRatio * 0.82) 
      : Math.max(hRatio, vRatio);

    const drawW = imgW * ratio;
    const drawH = imgH * ratio;
    const drawX = (w - drawW) / 2;
    const drawY = (h - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fondo cósmico para evitar cualquier artefacto en bordes verticales
    if (isPortraitMobile) {
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, w, h);
    }

    // Direct draw in cover mode: cero parpadeo y cero overhead de composición alfa
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrameRef.current = frameIdx;
  }, []);

  // Sincronización de dimensiones del canvas con Device Pixel Ratio (DPR)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round((rect.width || window.innerWidth) * dpr);
    const targetH = Math.round((rect.height || window.innerHeight) * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Forzar redibujo tras redimensionar
    lastDrawnFrameRef.current = -1;
    drawFrame(currentTargetFrameRef.current);
  }, [drawFrame]);

  // Motor de Pre-carga en Doble Zancada con Decodificación Off-Thread
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);

    const loadImage = (idx) => {
      if (imagesRef.current[idx]) return imagesRef.current[idx];
      const img = new Image();
      const numStr = String(idx + 1).padStart(4, '0');
      img.src = `/scrolly_frames/frame_${numStr}.webp`;
      imagesRef.current[idx] = img;

      // Decodificación asíncrona fuera del hilo principal (Chrome/Safari/Firefox) para eliminar jank
      if ('decode' in img) {
        img.decode().then(() => {
          const target = currentTargetFrameRef.current;
          const lastDrawn = lastDrawnFrameRef.current;
          if (lastDrawn === -1 || Math.abs(idx - target) < Math.abs(lastDrawn - target)) {
            drawFrame(target);
          }
        }).catch(() => {
          // Fallback silencioso en caso de aborto de navegación
        });
      } else {
        img.onload = () => {
          const target = currentTargetFrameRef.current;
          const lastDrawn = lastDrawnFrameRef.current;
          if (lastDrawn === -1 || Math.abs(idx - target) < Math.abs(lastDrawn - target)) {
            drawFrame(target);
          }
        };
      }

      return img;
    };

    // Zancada 1: Carga ultra-inmediata de cada 2do frame (0, 2, 4...) -> reactividad instantánea
    for (let i = 0; i < TOTAL_FRAMES; i += 2) {
      loadImage(i);
    }
    loadImage(TOTAL_FRAMES - 1); // Asegurar el frame final de salida

    // Zancada 2: Relleno suave en segundo plano de los frames pares restantes
    const timer = setTimeout(() => {
      for (let i = 1; i < TOTAL_FRAMES; i += 2) {
        loadImage(i);
      }
    }, 40);

    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [drawFrame, updateCanvasDimensions]);

  // Sincronización en tiempo real del scrub con RAF y Zero-Lag Guard
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(clamped * (TOTAL_FRAMES - 1))));

    // Guard de optimización: si el índice de frame no ha cambiado, no despertar el RAF
    if (targetFrame === lastDrawnFrameRef.current) return;

    currentTargetFrameRef.current = targetFrame;

    // Throttle con requestAnimationFrame para sincronizarse con la tasa de refresco del monitor (60/120Hz)
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(currentTargetFrameRef.current);
        rafIdRef.current = null;
      });
    }
  });

  // 4 Fases Narrativas Cinemáticas Calibradas a través de los fotogramas
  // Video 1 (Monitor & Command Center): 0% a 50%
  // Video 2 (Túnel Hiperespacial & Velocidad Luz): 50% a 100%
  const p1Opacity = useTransform(smoothProgress, [0.00, 0.08, 0.18, 0.23], [1, 1, 1, 0]);
  const p1Y = useTransform(smoothProgress, [0.00, 0.18, 0.23], [0, 0, -35]);

  const p2Opacity = useTransform(smoothProgress, [0.22, 0.28, 0.42, 0.48], [0, 1, 1, 0]);
  const p2Y = useTransform(smoothProgress, [0.22, 0.28, 0.42, 0.48], [35, 0, 0, -35]);

  const p3Opacity = useTransform(smoothProgress, [0.47, 0.53, 0.68, 0.74], [0, 1, 1, 0]);
  const p3Y = useTransform(smoothProgress, [0.47, 0.53, 0.68, 0.74], [35, 0, 0, -35]);

  const p4Opacity = useTransform(smoothProgress, [0.73, 0.80, 0.95, 1.00], [0, 1, 1, 1]);
  const p4Y = useTransform(smoothProgress, [0.73, 0.80, 1.00], [35, 0, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[480vh] bg-[#06070a] select-none"
    >
      {/* Marco Sticky de pantalla completa sin overflow obstaculizador */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#06070a]">
        
        {/* Layer 1: Motor Canvas de 120 Fotogramas WebP de Alta Resolución a 60 FPS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />

        {/* Layer 2: Viñeta Cinemática Crystalline (Sin capas negras pesadas, preserva colores y estrellas) */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(6,7,10,0.65) 0%, rgba(6,7,10,0.02) 25%, rgba(6,7,10,0.02) 75%, rgba(6,7,10,0.75) 100%)'
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(6,7,10,0.55) 100%)'
          }}
        />

        {/* Escenario Central: Fases Narrativas Sincronizadas (Completamente limpias, sin etiquetas ni badges) */}
        <div className="relative z-30 w-full max-w-4xl mx-auto px-5 sm:px-6 text-center pointer-events-none min-h-[220px] sm:h-72 flex items-center justify-center">
          
          {/* FASE 1: 0% a 23% (Monitor Pro Display en el cosmos) */}
          <motion.div
            style={{ opacity: p1Opacity, y: p1Y }}
            className="space-y-2.5 sm:space-y-4 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-4 sm:px-6"
          >
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-snug sm:leading-tight tracking-normal uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {s.p1Title}
            </h2>
            <p className="text-zinc-200 text-xs sm:text-base max-w-xl mx-auto font-sans leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {s.p1Desc}
            </p>
          </motion.div>

          {/* FASE 2: 22% a 48% (Centro de Mando & Autonomía) */}
          <motion.div
            style={{ opacity: p2Opacity, y: p2Y }}
            className="space-y-2.5 sm:space-y-4 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-4 sm:px-6"
          >
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-snug sm:leading-tight tracking-normal uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {s.p2Title}
            </h2>
            <p className="text-zinc-200 text-xs sm:text-base max-w-xl mx-auto font-sans leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {s.p2Desc}
            </p>
          </motion.div>

          {/* FASE 3: 47% a 74% (Salto Hiperespacial - Túnel Cósmico) */}
          <motion.div
            style={{ opacity: p3Opacity, y: p3Y }}
            className="space-y-2.5 sm:space-y-4 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-4 sm:px-6"
          >
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-snug sm:leading-tight tracking-normal uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {s.p3Title}
            </h2>
            <p className="text-zinc-200 text-xs sm:text-base max-w-xl mx-auto font-sans leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {s.p3Desc}
            </p>
          </motion.div>

          {/* FASE 4: 73% a 100% (Destino Soberano & Conversión) */}
          <motion.div
            style={{ opacity: p4Opacity, y: p4Y }}
            className="space-y-4 sm:space-y-6 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-4 sm:px-6 pointer-events-auto"
          >
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-snug sm:leading-tight tracking-normal uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {s.p4Title}
            </h2>
            <p className="text-zinc-200 text-xs sm:text-base max-w-xl mx-auto font-sans leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {s.p4Desc}
            </p>
            <div className="pt-2">
              <a
                href="/#/diagnostico"
                className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-9 py-3 sm:py-4 bg-white text-black hover:bg-zinc-200 transition-all duration-300 font-sans text-xs tracking-wider font-bold rounded-xl shadow-[0_0_35px_rgba(255,255,255,0.35)] hover:scale-105 transform cursor-pointer uppercase"
              >
                <span>{s.p4Cta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
