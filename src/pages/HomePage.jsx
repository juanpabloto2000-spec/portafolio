import React from 'react';
import HeroEditorial from '../components/hero/HeroEditorial';
import WhyNotTraditionalWebs from '../components/home/WhyNotTraditionalWebs';
import CinematicDualVideoScrolly from '../components/home/CinematicDualVideoScrolly';
import SovereignEngineeringStandards from '../components/home/SovereignEngineeringStandards';
import InteractiveROICalculator from '../components/interactive/InteractiveROICalculator';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import RevealSection from '../components/motion/RevealSection';
import { ArrowRight } from 'lucide-react';

import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function HomePage() {
  const { t, isLight } = useThemeLanguage();
  const b = t.conversionBanner;

  return (
    <div className={`min-h-screen antialiased flex flex-col relative grain-overlay transition-colors duration-500 ${
      isLight ? 'bg-[#f8fafc] text-slate-800 selection:bg-blue-500/20 selection:text-blue-900' : 'bg-transparent text-platinum selection:bg-white/20 selection:text-white'
    }`}>
      
      {/* Halo de luz que sigue al cursor a 60 FPS */}
      <AmbientSpotlightGlow />

      {/* 1. Hero Cinemático con Efecto Cortina (Curtain Lift) al scrollear */}
      <HeroEditorial />

      {/* 2. Sábana Principal de Contenido que Sube en Efecto Cortina sobre el Hero */}
      <div className={`relative z-20 bg-transparent rounded-t-[36px] border-t curtain-sheet transition-all duration-500 ${
        isLight 
          ? 'border-slate-200/90 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]' 
          : 'border-white/15 shadow-[0_-30px_90px_rgba(0,0,0,0.98)]'
      }`}>
        
        {/* Nueva Sección Editorial: Por Qué No Construimos Webs Tradicionales */}
        <WhyNotTraditionalWebs />

        {/* Sección de Scroll Cinemático Dual con Motor Canvas de 240 WebP Frames */}
        <CinematicDualVideoScrolly />

        {/* Estándares de Ingeniería: AEO vs SEO, Ciberseguridad & Tríada de Garantías */}
        <SovereignEngineeringStandards />

        {/* Calculadora Dopamínica Interactiva de Retorno & Horas Libres */}
        <InteractiveROICalculator />

        {/* Banner Táctico de Conversión Directa al Diagnóstico con Tipografía font-sans */}
        <section className="py-20 sm:py-28 relative">
          <div className="max-w-5xl mx-auto px-6 sm:px-12">
            <RevealSection direction="up">
              <div className="p-8 sm:p-14 border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl rounded-3xl glow-card flex flex-col md:flex-row items-center justify-between gap-8 relative shadow-2xl">
                
                <div className="space-y-3 max-w-xl text-center md:text-left">
                  <h3 className={`font-display font-bold text-2xl sm:text-3xl uppercase tracking-normal ${
                    isLight ? 'text-[#090d16]' : 'text-white'
                  }`}>
                    {b.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-sans leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-zinc-300'
                  }`}>
                    {b.desc}
                  </p>
                </div>

                <a
                  href="#/diagnostico"
                  className={`shrink-0 px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-monolith cursor-pointer hover:scale-105 active:scale-95 transform ${
                    isLight 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  <span>{b.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>
            </RevealSection>
          </div>
        </section>

        <FooterEditorial />
      </div>

    </div>
  );
}
