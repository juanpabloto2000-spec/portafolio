import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import KineticTypewriter from '../motion/KineticTypewriter';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useCMS } from '../../context/CMSContext';

export default function HeroEditorial() {
  const [titleDone, setTitleDone] = useState(false);
  const heroRef = useRef(null);
  const { t, isLight } = useThemeLanguage();
  const { cms } = useCMS();

  const heroContent = cms?.pages?.inicio || {};
  const headline = heroContent.heroTitle || t.hero.headline;
  const subtitle = heroContent.heroSubtitle || t.hero.subtitle;
  const ctaText = heroContent.ctaText || t.hero.ctaDiagnostico;

  // Parallax Curtain Lift Effect: As the user scrolls down, the Hero glides upward like an architectural curtain
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const curtainY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%']);
  const curtainScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.85, 0]);

  return (
    <div 
      ref={heroRef} 
      id="top" 
      className={`relative z-0 w-full min-h-screen h-screen overflow-hidden transition-colors duration-500 ${
        isLight ? 'bg-[#f8fafc]' : 'bg-[#06070a]'
      }`}
    >
      <motion.section 
        style={{ y: curtainY, scale: curtainScale, opacity: curtainOpacity }}
        className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none will-change-transform"
      >
        {/* 1. Capa de Video Ultra HD de Fondo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover object-[72%_center] sm:object-center transition-all duration-700 ${
              isLight ? 'brightness-110 contrast-105 saturate-125' : 'opacity-100 scale-100'
            }`}
          >
            <source src="/videos/video hero.mp4" type="video/mp4" />
          </video>

          {/* Capa Holográfica Luminous AI en Modo Claro */}
          {isLight && (
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-65 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse at 65% 50%, rgba(99,102,241,0.22) 0%, rgba(168,85,247,0.16) 35%, rgba(6,182,212,0.10) 65%, transparent 80%)'
              }}
            />
          )}

          {/* Gradiente de contraste cinematográfico adaptable a tema */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              background: isLight 
                ? 'linear-gradient(to right, rgba(248,250,252,0.97) 0%, rgba(248,250,252,0.85) 44%, rgba(248,250,252,0.2) 75%, transparent 100%)'
                : 'linear-gradient(to right, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.72) 40%, rgba(6,7,10,0.25) 75%, transparent 100%)'
            }}
          />
          {/* Suave difuminado inferior para conexión continua */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              background: isLight
                ? 'linear-gradient(to top, rgba(248,250,252,1) 0%, rgba(248,250,252,0.5) 25%, transparent 55%)'
                : 'linear-gradient(to top, rgba(6,7,10,0.95) 0%, rgba(6,7,10,0.3) 25%, transparent 55%)'
            }}
          />
        </div>

        {/* 2. Contenido Central del Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12 w-full pt-20 sm:pt-24 flex-1 flex flex-col justify-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              
              {/* Titular Principal Limpio Adaptativo */}
              <h1 className={`font-display font-bold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal leading-[1.18] sm:leading-[1.1] uppercase min-h-[60px] xs:min-h-[75px] sm:min-h-[160px] ${
                isLight ? 'text-[#090d16]' : 'text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]'
              }`}>
                <KineticTypewriter 
                  key={`${headline}-${isLight ? 'light' : 'dark'}`}
                  text={headline}
                  speed={24}
                  delay={100}
                  onComplete={() => setTitleDone(true)}
                />
              </h1>

              {/* Subtítulo Editorial con Proporciones Móviles Óptimas */}
              <motion.p 
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                animate={titleDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`max-w-xl sm:max-w-2xl text-xs sm:text-base md:text-lg font-sans leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-zinc-200/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]'
                }`}
              >
                {subtitle}
              </motion.p>

              {/* Botones de Conversión del Hero */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={titleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md sm:max-w-none"
              >
                <a
                  href="/#/diagnostico"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <span className="text-sm">→</span>
                </a>

                <a
                  href="/#filosofia"
                  className={`px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isLight 
                      ? 'bg-slate-200/80 hover:bg-slate-300 border border-slate-300 text-slate-900 shadow-sm'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{t.hero.ctaFilosofia}</span>
                </a>
              </motion.div>

            </div>

            {/* Espacio amplio en la derecha para apreciar sin obstrucciones el sistema planetario orbital del video */}
            <div className="lg:col-span-4 hidden lg:block pointer-events-none" />

          </div>

        </div>

      </motion.section>
    </div>
  );
}
