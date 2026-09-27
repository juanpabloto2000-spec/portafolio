import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIVE_PROJECTS } from '../../data/liveProjects';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Sparkles, Globe, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function LuxuryProjectsCoverflowCarousel({ onSelectProjectDemo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'live'

  const total = LIVE_PROJECTS.length;
  const currentProject = LIVE_PROJECTS[currentIndex];

  const handleNext = () => {
    soundFx.playBlip(620);
    setCurrentIndex((prev) => (prev + 1) % total);
    setViewMode('preview'); // resetear a captura al pasar a otro proyecto
  };

  const handlePrev = () => {
    soundFx.playBlip(480);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setViewMode('preview');
  };

  const isLiveAvailable = currentProject.liveUrl && currentProject.liveUrl !== '#' && !currentProject.isUpcoming;

  return (
    <div className="w-full space-y-8 select-none font-sans">
      
      {/* Encabezado del Carrusel 3D */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[11px] font-bold uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Panorámico 3D // {total} Proyectos Reales & En Despliegue</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Galería Panorámica de Sistemas Vivos
          </h3>
          <p className="text-xs sm:text-sm font-sans text-zinc-300">
            Desliza para explorar la arquitectura, previsualización en vivo y plataformas operando en Colombia.
          </p>
        </div>

        {/* Controles de Navegación */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white hover:bg-white/10 hover:border-cyan-400 transition-all cursor-pointer shadow-md"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xs font-mono text-zinc-400">
            <strong className="text-white">0{currentIndex + 1}</strong> / 0{total}
          </div>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white/[0.04] border border-white/15 text-white hover:bg-white/10 hover:border-cyan-400 transition-all cursor-pointer shadow-md"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tarjeta Panorámica 3D Destacada */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.025] backdrop-blur-xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 0.98, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden"
          >
            {/* Visual Panorámico con Modo Dual: Captura HD vs Previsualización en Vivo (7 cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-black/90 overflow-hidden group">
              
              {/* VISTA 1: CAPTURA HD */}
              {viewMode === 'preview' && (
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={currentProject.previewImage}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                </div>
              )}

              {/* VISTA 2: PREVISUALIZACIÓN EN VIVO (IFRAME INTERACTIVO) */}
              {viewMode === 'live' && isLiveAvailable && (
                <div className="w-full h-full relative bg-black flex flex-col">
                  {/* Barra de Telemetría del Navegador Embebido */}
                  <div className="px-4 py-2 bg-zinc-900 border-b border-white/15 flex items-center justify-between text-xs font-mono text-zinc-400 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] text-zinc-300 ml-2 font-bold truncate max-w-[200px] sm:max-w-xs">
                        {currentProject.url}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase hidden sm:inline">
                      Simulador Interactivo en Vivo
                    </span>
                  </div>
                  
                  {/* Iframe Real de la Web */}
                  <iframe
                    src={currentProject.liveUrl}
                    title={currentProject.title}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    className="w-full flex-1 border-0 bg-white"
                  />
                </div>
              )}

              {/* Badges Flotantes de Estado */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono uppercase text-zinc-200">
                  {currentProject.nicheLabel}
                </span>

                {currentProject.isUpcoming ? (
                  <span className="px-3 py-1 rounded-xl bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-xs font-mono text-amber-300 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>En Despliegue // Q4 2026</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>En Operación Real</span>
                  </span>
                )}
              </div>

              {/* Selector Toggle: Captura HD vs Web en Vivo */}
              {isLiveAvailable && (
                <div className="absolute top-4 right-4 flex items-center p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 shadow-xl z-20">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(540);
                      setViewMode('preview');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'preview' 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Captura HD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(640);
                      setViewMode('live');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'live' 
                        ? 'bg-cyan-400 text-black shadow-sm' 
                        : 'text-zinc-400 hover:text-cyan-300'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Explorar en Vivo</span>
                  </button>
                </div>
              )}

              {/* Barra Inferior del Visual */}
              {viewMode === 'preview' && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white font-bold">
                    {currentProject.client}
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-cyan-400">
                    {currentProject.url}
                  </div>
                </div>
              )}

            </div>

            {/* Ficha Editorial & Métricas (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                    OBRA MAESTRA 0{currentIndex + 1}
                  </span>
                  <h4 className="font-display font-bold text-2xl text-white leading-tight">
                    {currentProject.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* Transformación Antes / Ahora */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 font-sans text-xs">
                  <div className="flex items-start gap-2 text-red-400">
                    <strong className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-red-950/50 border border-red-500/30 shrink-0">
                      ANTES
                    </strong>
                    <span className="text-zinc-400 leading-relaxed">
                      Atención manual por chat, cartas maltratadas o pago de comisiones del 20% a intermediarios.
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-emerald-400 pt-1 border-t border-white/5">
                    <strong className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 shrink-0">
                      AHORA
                    </strong>
                    <span className="text-zinc-200 leading-relaxed font-semibold">
                      {currentProject.tagline}.
                    </span>
                  </div>
                </div>

                {/* Métricas de Impacto */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">TIEMPO DE RESPUESTA</div>
                    <div className="text-sm font-bold text-cyan-400 font-mono">&lt; 0.8s en Edge CDN</div>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">COMISIONES A TERCEROS</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">0% (100% Directo)</div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                {currentProject.isUpcoming ? (
                  <a
                    href="/#/diagnostico"
                    className="flex-1 py-3 px-4 bg-white/10 border border-white/20 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Demostración</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Visitar Web Real</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {onSelectProjectDemo && (
                  <button
                    onClick={() => {
                      soundFx.playBlip();
                      onSelectProjectDemo(currentProject);
                    }}
                    className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Demo</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tira Inferior de Miniaturas Sincronizadas (7 Proyectos) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {LIVE_PROJECTS.map((proj, idx) => {
          const isSelected = currentIndex === idx;
          return (
            <button
              key={proj.id}
              onClick={() => {
                soundFx.playBlip(500 + idx * 40);
                setCurrentIndex(idx);
                setViewMode('preview');
              }}
              className={`p-2 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400 scale-[1.02]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
              }`}
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/60 relative">
                <img 
                  src={proj.previewImage} 
                  alt={proj.title} 
                  className="w-full h-full object-cover object-top" 
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-cyan-500/20 border border-cyan-400 rounded-xl" />
                )}
                {proj.isUpcoming && (
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold">
                    Q4
                  </div>
                )}
              </div>
              <span className={`text-[11px] font-sans font-bold truncate leading-tight ${
                isSelected ? 'text-cyan-300' : 'text-zinc-400'
              }`}>
                0{idx + 1}. {proj.client.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
