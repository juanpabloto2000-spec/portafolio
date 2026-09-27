import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIVE_PROJECTS } from '../../data/liveProjects';
import { Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function LuxuryProjectsSidebarShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = LIVE_PROJECTS[currentIndex];
  const isLive = currentProject.liveUrl && currentProject.liveUrl !== '#' && !currentProject.isUpcoming;

  const handleSelect = (idx) => {
    soundFx.playBlip(520 + idx * 30);
    setCurrentIndex(idx);
  };

  return (
    <div className="w-full space-y-4 font-sans select-none">
      
      {/* Cabecera Editorial Limpia del Showcase */}
      <div className="border-b border-white/10 pb-4">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
          Showcase Interactivo en Vivo
        </h3>
        <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-1">
          Navega y opera directamente las plataformas reales de autor construidas para clientes en Colombia.
        </p>
      </div>

      {/* Contenedor Principal: Selector Lateral Compacto (3 cols) + Visor Panorámico Horizontal Amplio (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* ============================================================== */}
        {/* SELECTOR LATERAL COMPACTO (Menos largo para maximizar horizontalidad) */}
        {/* En móvil: barra horizontal superior deslizable por toque         */}
        {/* En desktop: columna esbelta de 3 columnas                        */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-2">
          
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none snap-x">
            <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider px-1 pb-1 hidden lg:block">
              Plataformas ({LIVE_PROJECTS.length})
            </div>

            {LIVE_PROJECTS.map((proj, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(idx)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 shrink-0 lg:w-full min-w-[200px] lg:min-w-0 snap-start ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/70 to-purple-950/40 border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400/50'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`text-[11px] font-mono font-bold shrink-0 ${
                      isSelected ? 'text-cyan-400' : 'text-zinc-500'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className={`font-display font-bold text-xs truncate ${
                        isSelected ? 'text-white' : 'text-zinc-300'
                      }`}>
                        {proj.title}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">
                        {proj.client}
                      </div>
                    </div>
                  </div>

                  {proj.isUpcoming ? (
                    <span className="text-[9px] font-mono text-amber-400 font-semibold shrink-0 px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/20">
                      Q4
                    </span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isSelected ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-zinc-600'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Breve Ficha Informativa Esbelta del Proyecto en Desktop */}
          <div className="p-3.5 rounded-xl bg-[#080b13]/90 border border-white/10 space-y-1.5 hidden lg:block text-xs font-sans">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
              {currentProject.client}
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-3">
              {currentProject.description}
            </p>
          </div>

        </div>

        {/* ============================================================== */}
        {/* VISOR INTERACTIVO PANORÁMICO AMPLIO (9 columnas en Desktop)     */}
        {/* Maximiza ancho horizontal en desktop y altura táctil en móvil  */}
        {/* ============================================================== */}
        <div className="lg:col-span-9 w-full flex flex-col">
          <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col flex-1">
            
            {/* Barra de Telemetría Superior del Navegador */}
            <div className="px-3.5 sm:px-4 py-2.5 bg-[#0c101c] border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5">
              
              {/* Controles de Navegador & URL */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                
                <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[11px] sm:text-xs font-mono text-cyan-300 truncate max-w-[180px] sm:max-w-xs md:max-w-md flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{currentProject.url}</span>
                </div>
              </div>

              {/* Botón Maestro Único: Visitar Web Real */}
              <div>
                {isLive ? (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
                  >
                    <span>Visitar Web Real</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                  </a>
                ) : (
                  <a
                    href="/#/diagnostico"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <span>Solicitar Demostración</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </a>
                )}
              </div>

            </div>

            {/* Contenedor del Iframe con Amplitud Horizontal Óptima (16:10 / 16:9) */}
            <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] bg-black overflow-hidden flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  {isLive ? (
                    <iframe
                      src={currentProject.liveUrl}
                      title={currentProject.title}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      className="w-full h-full border-0 bg-white"
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${currentProject.previewImage})` }}
                    >
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
                      <div className="relative z-10 max-w-md space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                          <Sparkles className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="font-display font-bold text-2xl text-white">
                          {currentProject.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                          {currentProject.description}
                        </p>
                        <div className="pt-2">
                          <span className="inline-block px-3.5 py-1.5 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                            Próximo Despliegue // Q4 2026
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barra Inferior del Visor */}
            <div className="px-4 py-2 bg-[#0c101c] border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-[11px] text-zinc-300 font-medium">
                {currentProject.client} — {currentProject.tagline}
              </span>
              <span className="text-[11px] text-cyan-400 font-bold shrink-0 ml-2">
                0{currentIndex + 1} / 0{LIVE_PROJECTS.length}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
