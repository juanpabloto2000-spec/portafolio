import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIVE_PROJECTS } from '../../data/liveProjects';
import { Globe, ArrowUpRight, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function LuxuryProjectsSidebarShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Detección automática inteligente: si el ancho es >= 1024px (PC / Laptop) inicia en 'desktop', de lo contrario en 'mobile' (vertical celular)
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'desktop' : 'mobile';
    }
    return 'desktop';
  });

  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Auto-adaptar fluidamente si el usuario no ha forzado un modo manualmente con los botones
      if (!hasManuallyToggled && typeof window !== 'undefined') {
        const isDesktop = window.innerWidth >= 1024;
        setViewMode(isDesktop ? 'desktop' : 'mobile');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasManuallyToggled]);

  const currentProject = LIVE_PROJECTS[currentIndex];
  const isLive = currentProject.liveUrl && currentProject.liveUrl !== '#' && !currentProject.isUpcoming;

  const handleSelect = (idx) => {
    soundFx.playBlip(520 + idx * 30);
    setCurrentIndex(idx);
  };

  const handleViewMode = (mode) => {
    soundFx.playBlip(560);
    setHasManuallyToggled(true);
    setViewMode(mode);
  };

  return (
    <div className="w-full space-y-5 font-sans select-none">
      
      {/* Cabecera Editorial Limpia del Showcase */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Showcase Interactivo en Vivo
          </h3>
          <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-1">
            Plataformas reales de autor en producción. Se adapta automáticamente a tu pantalla (Panorámica en PC / Vertical en Móvil).
          </p>
        </div>

        {/* Selector de Modo de Vista: Vertical (Móvil) vs Panorámica (PC) */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 border border-white/15 rounded-xl self-start sm:self-auto shrink-0 backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleViewMode('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Vista vertical en smartphone (9:19)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Vertical Móvil</span>
          </button>
          <button
            type="button"
            onClick={() => handleViewMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'desktop'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Vista panorámica de escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Panorámica PC</span>
          </button>
        </div>
      </div>

      {/* Contenedor Principal: Selector Lateral (4 cols) + Visor Vertical / Panorámico (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ============================================================== */}
        {/* SELECTOR LATERAL CON FICHA EDITORIAL (4 cols en Desktop)        */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none snap-x">
            <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider px-1 pb-1 hidden lg:block">
              Plataformas en Producción ({LIVE_PROJECTS.length})
            </div>

            {LIVE_PROJECTS.map((proj, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(idx)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 shrink-0 lg:w-full min-w-[190px] lg:min-w-0 snap-start ${
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

          {/* Ficha Editorial Detallada del Proyecto */}
          <div className="p-4 rounded-2xl bg-[#080b13]/90 border border-white/10 space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                {currentProject.client}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                0{currentIndex + 1} / 0{LIVE_PROJECTS.length}
              </span>
            </div>
            <div className="font-display font-bold text-sm text-white">
              {currentProject.tagline}
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              {currentProject.description}
            </p>
            <div className="pt-2">
              {isLive ? (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-indigo-500/25 border border-indigo-400/40 flex items-center justify-center gap-2"
                >
                  <span>Abrir Web en Pestaña Completa</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </a>
              ) : (
                <a
                  href="/#/diagnostico"
                  className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Solicitar Demostración</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* VISOR VERTICAL NATIVO / PANORÁMICO (8 cols en Desktop)          */}
        {/* ============================================================== */}
        <div className="lg:col-span-8 w-full flex flex-col items-center">
          
          {/* Contenedor Adaptativo: Si es 'mobile' adopta marco vertical de Smartphone de Autor */}
          <div className={`w-full transition-all duration-300 ${
            viewMode === 'mobile' 
              ? 'max-w-[400px] sm:max-w-[420px] mx-auto rounded-3xl sm:rounded-[36px] p-2 sm:p-2.5 bg-[#0e1320] border-2 border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)]' 
              : 'rounded-2xl sm:rounded-3xl border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl overflow-hidden shadow-2xl'
          }`}>
            
            {/* Barra de Telemetría Superior */}
            <div className={`px-3.5 py-2 flex items-center justify-between gap-2 border-b ${
              viewMode === 'mobile' 
                ? 'bg-transparent border-white/10 rounded-t-[28px]' 
                : 'bg-[#0c101c] border-white/10'
            }`}>
              
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                
                <div className="px-2.5 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] sm:text-[11px] font-mono text-cyan-300 truncate max-w-[170px] sm:max-w-xs flex items-center gap-1.5">
                  <Globe className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{currentProject.url}</span>
                </div>
              </div>

              {/* Botón Compacto en Barra */}
              <div>
                {isLive && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] uppercase transition-colors"
                  >
                    <span>Visitar</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>

            {/* Contenedor del Iframe con Altura Panorámica Horizontal en PC */}
            <div className={`relative w-full bg-black overflow-hidden ${
              viewMode === 'mobile' 
                ? 'h-[580px] sm:h-[640px] rounded-b-[28px]' 
                : 'h-[400px] sm:h-[460px] lg:h-[490px]'
            }`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentProject.id}-${viewMode}`}
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
                      <div className="relative z-10 max-w-xs space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                          <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                        <h4 className="font-display font-bold text-xl text-white">
                          {currentProject.title}
                        </h4>
                        <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                          {currentProject.description}
                        </p>
                        <div className="pt-2">
                          <span className="inline-block px-3 py-1 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold">
                            Próximo Despliegue // Q4 2026
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barra Inferior en modo Desktop */}
            {viewMode === 'desktop' && (
              <div className="px-4 py-2 bg-[#0c101c] border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-[11px] text-zinc-300 font-medium">
                  {currentProject.client} — {currentProject.tagline}
                </span>
                <span className="text-[11px] text-cyan-400 font-bold shrink-0 ml-2">
                  0{currentIndex + 1} / 0{LIVE_PROJECTS.length}
                </span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
