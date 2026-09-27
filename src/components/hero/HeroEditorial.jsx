import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import KineticTypewriter from '../motion/KineticTypewriter';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function HeroEditorial() {
  const [titleDone, setTitleDone] = useState(false);
  const heroRef = useRef(null);
  const { t } = useThemeLanguage();

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
      className="relative z-0 w-full min-h-screen h-screen overflow-hidden bg-[#06070a]"
    >
      <motion.section 
        style={{ y: curtainY, scale: curtainScale, opacity: curtainOpacity }}
        className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none will-change-transform"
      >
        {/* 1. Capa de Video Ultra HD de Fondo (Nítido, sin música, sin transparencias pesadas) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-[62%_center] sm:object-center opacity-100 scale-100 transition-opacity duration-700"
          >
            <source src="/videos/video hero.mp4" type="video/mp4" />
          </video>

          {/* Gradiente sutil y elegante en el flanco izquierdo para contraste del titular sin opacar el sistema planetario orbital derecho */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(6,7,10,0.88) 0%, rgba(6,7,10,0.6) 45%, rgba(6,7,10,0.15) 75%, transparent 100%)'
            }}
          />
          {/* Suave difuminado inferior para conexión con la cortina de la siguiente sección */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.15) 20%, transparent 45%)'
            }}
          />
        </div>

        {/* 2. Contenido Central del Hero Elevado Ópticamente con ergonomía móvil */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12 w-full pt-28 sm:pt-24 flex-1 flex flex-col justify-center -translate-y-4 sm:-translate-y-14">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-6">
              
              {/* Titular Principal Limpio Adaptativo */}
              <h1 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-normal leading-[1.15] sm:leading-[1.1] uppercase min-h-[80px] xs:min-h-[95px] sm:min-h-[170px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                <KineticTypewriter 
                  key={t.hero.headline}
                  text={t.hero.headline}
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
                className="max-w-xl sm:max-w-2xl text-xs sm:text-base md:text-lg text-zinc-200/90 font-sans leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
              >
                {t.hero.subtitle}
              </motion.p>

            </div>

            {/* Espacio amplio en la derecha para apreciar sin obstrucciones el sistema planetario orbital del video */}
            <div className="lg:col-span-4 hidden lg:block pointer-events-none" />

          </div>

        </div>

      </motion.section>
    </div>
  );
}
