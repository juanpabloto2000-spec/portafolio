import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIVE_PROJECTS } from '../../data/liveProjects';
import { Sparkles, Smartphone, Monitor, Globe } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function LuxuryProjectsSidebarShowcase() {
  const { isLight } = useThemeLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Detección automática inteligente: si el ancho es >= 1024px (PC / Laptop) inicia en 'desktop', de lo contrario en 'mobile'
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'desktop' : 'mobile';
    }
    return 'desktop';
  });

  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
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

  // Cálculo de URL del iframe exclusivamente hacia el Portal Web Comercial (DSB 100% privado y oculto)
  const getIframeUrl = (project) => {
    if (!project.liveUrl || project.liveUrl === '#' || project.isUpcoming) return null;
    const cleanBase = project.liveUrl.replace(/\/+#*(\/.*)?$/, '');
    return project.liveUrl.includes('/#/') ? project.liveUrl : `${cleanBase}/#/`;
  };

  const handleSelect = (idx) => {
    soundFx.playBlip(520 + idx * 30);
    setCurrentIndex(idx);
  };

  const handleViewMode = (mode) => {
    soundFx.playBlip(560);
    setHasManuallyToggled(true);
    setViewMode(mode);
  };

  const activeIframeSrc = getIframeUrl(currentProject);

  return (
    <div className="w-full space-y-4 font-sans select-none">
      
      {/* Cabecera Editorial Limpia del Showcase */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Showcase Interactivo en Vivo
          </h3>
          <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-0.5">
            Plataformas reales de autor en producción operando con comensales, huéspedes y reservas en tiempo real.
          </p>
        </div>

        {/* Selector de Modo de Dispositivo: Móvil vs PC */}
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

      {/* Contenedor Principal: Botones Compactos (3 cols) + Gran Pantalla Panorámica (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ============================================================== */}
        {/* SELECTOR LATERAL: BOTONES MENOS ALARGADOS SIN NÚMEROS (3 cols) */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 flex flex-col space-y-2.5">
          
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none snap-x">
            <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider px-1 pb-0.5 hidden lg:block">
              Sistemas Activos ({LIVE_PROJECTS.length})
            </div>

            {LIVE_PROJECTS.map((proj, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(idx)}
                  className={`py-2 px-2.5 sm:px-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 shrink-0 lg:w-full min-w-[170px] lg:min-w-0 snap-start ${
                    isSelected
                      ? (isLight
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-400 text-black shadow-md ring-1 ring-indigo-400'
                          : 'bg-gradient-to-r from-cyan-950/85 via-[#131b2e] to-purple-950/60 border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/50')
                      : (isLight
                          ? 'bg-slate-100/90 border-slate-200 hover:bg-white hover:border-slate-300 text-black shadow-sm'
                          : 'bg-[#121726]/95 border-white/15 hover:bg-[#182035] hover:border-white/25 text-zinc-300 shadow-md')
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className={`font-display font-bold text-xs truncate ${
                      isSelected 
                        ? (isLight ? 'text-black' : 'text-white')
                        : (isLight ? 'text-black font-semibold' : 'text-zinc-200')
                    }`}>
                      {proj.title}
                    </div>
                    <div className={`text-[10px] truncate ${
                      isLight ? 'text-slate-600' : 'text-zinc-400'
                    }`}>
                      {proj.client}
                    </div>
                  </div>

                  {proj.isUpcoming ? (
                    <span className={`text-[9px] font-mono font-semibold shrink-0 px-1.5 py-0.5 rounded border ${
                      isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-amber-950/50 border-amber-500/25 text-amber-400'
                    }`}>
                      Q4
                    </span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isSelected 
                        ? (isLight ? 'bg-indigo-600 shadow-[0_0_6px_#6366f1]' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]')
                        : (isLight ? 'bg-slate-400' : 'bg-zinc-600')
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Ficha Editorial Compacta del Proyecto Seleccionado */}
          <div className={`p-3.5 rounded-2xl border space-y-1.5 text-xs font-sans transition-colors ${
            isLight
              ? 'bg-slate-100/95 border-slate-200 text-black shadow-md'
              : 'bg-[#121726]/95 border-white/15 text-zinc-300 shadow-xl'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                isLight ? 'text-indigo-600' : 'text-cyan-400'
              }`}>
                {currentProject.client}
              </span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                isLight ? 'bg-white border-slate-200 text-black' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}>
                0{currentIndex + 1} / 0{LIVE_PROJECTS.length}
              </span>
            </div>
            
            <div className={`font-display font-bold text-xs leading-snug ${
              isLight ? 'text-black' : 'text-white'
            }`}>
              {currentProject.tagline}
            </div>
            
            <p className={`text-[11px] leading-relaxed line-clamp-3 ${
              isLight ? 'text-black' : 'text-zinc-400'
            }`}>
              {currentProject.description}
            </p>

            <div className={`pt-1.5 flex items-center gap-1.5 text-[10px] font-mono ${
              isLight ? 'text-black' : 'text-zinc-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Plataforma Soberana de Alta Conversión</span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* GRAN PANTALLA PANORÁMICA HORIZONTAL (9 cols en Desktop)        */}
        {/* ============================================================== */}
        <div className="lg:col-span-9 w-full flex flex-col items-center">
          
          {/* Contenedor Adaptativo: Si es 'mobile' adopta smartphone; si es PC es ultra panorámico */}
          <div className={`w-full transition-all duration-300 ${
            viewMode === 'mobile' 
              ? 'max-w-[400px] sm:max-w-[420px] mx-auto rounded-3xl sm:rounded-[36px] p-2 sm:p-2.5 bg-[#0e1320] border-2 border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)]' 
              : 'rounded-2xl sm:rounded-3xl border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl overflow-hidden shadow-2xl'
          }`}>
            
            {/* Barra de Telemetría Superior (Limpia, sin exposición de DSB) */}
            <div className={`px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b ${
              viewMode === 'mobile' 
                ? 'bg-transparent border-white/10 rounded-t-[28px]' 
                : 'bg-[#0c101c] border-white/10'
            }`}>
              
              {/* Lado Izquierdo: Botones Mac & Título del Proyecto */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                </div>
                
                <span className="font-display font-bold text-xs sm:text-sm text-white truncate max-w-[180px] sm:max-w-xs">
                  {currentProject.title}
                </span>
              </div>

              {/* Insignia de Telemetría de Producción Activa */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/15 rounded-xl backdrop-blur-md shrink-0">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-mono text-zinc-300 font-medium">Plataforma Web Activa</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </div>

            </div>

            {/* Contenedor del Iframe con Altura Milimétrica Sincronizada con el Lateral */}
            <div className={`relative w-full bg-black overflow-hidden ${
              viewMode === 'mobile' 
                ? 'h-[520px] sm:h-[560px] rounded-b-[28px]' 
                : 'h-[390px] sm:h-[420px] lg:h-[448px] xl:h-[450px]'
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
                  {isLive && activeIframeSrc ? (
                    <iframe
                      src={activeIframeSrc}
                      title={`${currentProject.title} - Plataforma Web Oficial`}
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
