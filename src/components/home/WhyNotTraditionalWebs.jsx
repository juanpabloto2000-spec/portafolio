import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import RevealSection from '../motion/RevealSection';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function WhyNotTraditionalWebs() {
  const { t } = useThemeLanguage();
  const w = t.whyNotTraditional;

  return (
    <section id="filosofia" className="py-24 sm:py-32 relative overflow-hidden bg-transparent">
      
      {/* Halo de Plasma Convectivo de Fondo (Efecto de Color del Hero) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-20 relative z-10">
        
        {/* Cabecera Principal Editorial */}
        <div className="max-w-4xl space-y-4">
          <RevealSection direction="up">
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.1]">
              {w.title}
            </h2>
            <p className="text-base sm:text-lg font-sans text-zinc-300 leading-relaxed pt-3 max-w-3xl">
              {w.desc}
            </p>
          </RevealSection>
        </div>

        {/* Comparativa Radical de Ingeniería: Tumbas Digitales vs Software Soberano */}
        <RevealSection direction="up" delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Lado A: La Web Tradicional de Agencia Común */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0e0709]/95 border border-red-500/30 backdrop-blur-2xl space-y-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-900/40 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {w.col1Title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {w.col1Desc}
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs text-zinc-300">
                  <div className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span><strong>{w.col1Item1Title}</strong> {w.col1Item1Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span><strong>{w.col1Item2Title}</strong> {w.col1Item2Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span><strong>{w.col1Item3Title}</strong> {w.col1Item3Text}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-red-900/40 text-xs font-sans text-red-300">
                {w.col1Result}
              </div>
            </div>

            {/* Lado B: El Enfoque Dynamind de Otra Galaxia */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#061017]/95 border border-cyan-400/40 backdrop-blur-2xl space-y-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(34,211,238,0.12)]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/25 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {w.col2Title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {w.col2Desc}
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs text-zinc-300">
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold shrink-0">✓</span>
                    <span><strong>{w.col2Item1Title}</strong> {w.col2Item1Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold shrink-0">✓</span>
                    <span><strong>{w.col2Item2Title}</strong> {w.col2Item2Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold shrink-0">✓</span>
                    <span><strong>{w.col2Item3Title}</strong> {w.col2Item3Text}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cyan-500/30 flex items-center justify-between">
                <span className="text-xs font-sans text-cyan-300 font-bold">
                  {w.col2Footer}
                </span>
                <a
                  href="#/sistemas"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-white hover:text-cyan-300 active:scale-95 transition-all uppercase tracking-wider cursor-pointer"
                >
                  <span>{w.col2Btn}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </RevealSection>

      </div>

      {/* Transición Atmosférica Difuminada (Resplandor etéreo sin cortes de línea) */}
      <div className="w-full max-w-4xl mx-auto h-20 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent blur-2xl pointer-events-none mt-12 sm:mt-16" />

    </section>
  );
}
