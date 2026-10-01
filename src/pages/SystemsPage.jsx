import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import RevealSection from '../components/motion/RevealSection';
import GalaxyTourSimulation, { GALAXY_STATIONS } from '../components/systems/GalaxyTourSimulation';
import GalaxyTelemetryHUD from '../components/systems/GalaxyTelemetryHUD';
import { 
  Sun, ShieldCheck, Orbit, Terminal, Search, ChevronRight, 
  ArrowRight, Compass, Radio, Sparkles, Filter
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export default function SystemsPage() {
  // Modo de visualización: 'tour' (Simulador del Universo / Tour Galáctico) | 'matrix' (Consola Matriz Técnica)
  const [viewMode, setViewMode] = useState('tour');

  // Estación Galáctica activa en el tour
  const [activeStationId, setActiveStationId] = useState('station-core');

  // Filtro de búsqueda para la Consola Matriz
  const [searchQuery, setSearchQuery] = useState('');

  // Estación actual calculada
  const currentStation = useMemo(() => {
    return GALAXY_STATIONS.find(s => s.id === activeStationId) || GALAXY_STATIONS[0];
  }, [activeStationId]);

  // Manejador para avanzar a la siguiente estación
  const handleNextStation = useCallback(() => {
    soundFx.playOrbitWarp();
    const cIdx = GALAXY_STATIONS.findIndex(s => s.id === activeStationId);
    const nextIdx = (cIdx + 1) % GALAXY_STATIONS.length;
    setActiveStationId(GALAXY_STATIONS[nextIdx].id);
  }, [activeStationId]);

  // Manejador para retroceder
  const handlePrevStation = useCallback(() => {
    soundFx.playOrbitWarp();
    const cIdx = GALAXY_STATIONS.findIndex(s => s.id === activeStationId);
    const prevIdx = (cIdx - 1 + GALAXY_STATIONS.length) % GALAXY_STATIONS.length;
    setActiveStationId(GALAXY_STATIONS[prevIdx].id);
  }, [activeStationId]);

  // Navegación por teclado (Flechas Izquierda / Derecha)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignorar si el usuario está escribiendo en el input de búsqueda
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        handleNextStation();
      } else if (e.key === 'ArrowLeft') {
        handlePrevStation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextStation, handlePrevStation]);

  // Filtrado de galaxias para el modo Consola Matriz
  const filteredStations = useMemo(() => {
    if (!searchQuery.trim()) return GALAXY_STATIONS;
    const q = searchQuery.toLowerCase();
    return GALAXY_STATIONS.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.coreD0.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 space-y-10 sm:space-y-14">
        
        {/* ============================================================== */}
        {/* HEADER PRINCIPAL: MANIFIESTO CONSULTORÍA SOBERANA (NO AGENCIA) */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-2">
          <RevealSection direction="up" className="space-y-6">
            
            {/* Badge de Posicionamiento Canónico */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>CONSULTORÍA DE IA & INGENIERÍA SOBERANA • NO SOMOS UNA AGENCIA</span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
                El Universo Tecnológico <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-300">
                  de Software & Consultoría de IA
                </span>
              </h1>
              <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed max-w-3xl font-light">
                Cada galaxia de este universo representa un ítem real de software soberano que construimos en Dynamind. 
                Desde <strong>sistemas operativos de alta complejidad</strong> (Core DSB en /#/dsb, PMS Hotelero, Caja con Arqueo Ciego, KDS Comandas) 
                hasta <strong>automatizaciones y agentes de IA para misiones ultra-específicas</strong> (n8n, OCR Facturas, Lead Scoring, Inbox Zero), 
                todo gobernado por código propietario entregado en tu propio repositorio sin renta de software.
              </p>
            </div>

            {/* Switcher Táctico Dual-Mode (Tour Galáctico vs Consola Matriz) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              
              {/* Botones de Modo de Vista */}
              <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <button
                  onClick={() => {
                    soundFx.playTap();
                    setViewMode('tour');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'tour'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Orbit className="w-4 h-4 text-cyan-400" />
                  <span>SIMULADOR / TOUR GALÁCTICO 3D</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playTap();
                    setViewMode('matrix');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'matrix'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>CONSOLA MATRIZ (18 SISTEMAS)</span>
                </button>
              </div>

              {/* Indicador de Ayuda Rápida */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="hidden sm:inline">Usa las flechas [◄] [►] del teclado para navegar el tour</span>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>18 Estaciones Activas</span>
                </div>
              </div>

            </div>

          </RevealSection>
        </section>

        {/* ============================================================== */}
        {/* MODO 1: SIMULADOR DEL UNIVERSO / TOUR GALÁCTICO 3D             */}
        {/* ============================================================== */}
        {viewMode === 'tour' ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            
            {/* 1. SIMULADOR DEL UNIVERSO GALÁCTICO A 60 FPS */}
            <RevealSection direction="scale" className="w-full">
              <GalaxyTourSimulation
                activeStationId={activeStationId}
                onSelectStation={(stId) => {
                  if (typeof stId === 'function') {
                    setActiveStationId(stId);
                  } else {
                    soundFx.playPlanetSelect();
                    setActiveStationId(stId);
                  }
                }}
              />
            </RevealSection>

            {/* 2. PANEL DE TELEMETRÍA HOLOGRÁFICA HUD DE LA GALAXIA ACTIVA */}
            <GalaxyTelemetryHUD
              currentStation={currentStation}
              onNextStation={handleNextStation}
            />

          </section>
        ) : (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            
            {/* Barra de Búsqueda y Filtro */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar galaxia por nombre, categoría o cuello de botella D0..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="text-xs font-mono text-zinc-400">
                Mostrando <strong className="text-white">{filteredStations.length}</strong> de 18 estaciones tecnológicas
              </div>
            </div>

            {/* Retícula de Galaxias en Tarjetas Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStations.map((station) => {
                const StIcon = station.icon;
                const isStationCurrent = activeStationId === station.id;

                return (
                  <div
                    key={station.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                      isStationCurrent
                        ? 'bg-zinc-900/80 border-white/30 shadow-2xl'
                        : 'bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-zinc-900/40'
                    }`}
                  >
                    {/* Borde Superior con el Color de la Galaxia */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: station.color }}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="font-bold text-white">ESTACIÓN {station.stationNumber}</span>
                        <span style={{ color: station.color }}>{station.galaxyType.toUpperCase()}</span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div 
                          className="p-2.5 rounded-xl border text-white shrink-0 group-hover:scale-105 transition-transform"
                          style={{
                            backgroundColor: `${station.color}15`,
                            borderColor: `${station.color}40`,
                            color: station.color
                          }}
                        >
                          <StIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                            {station.title}
                          </h4>
                          <div className="text-[10px] font-mono text-zinc-400 uppercase">{station.category}</div>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed font-light">
                        {station.tagline}
                      </p>

                      <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-[11px] text-red-200/90 leading-relaxed font-light">
                        <strong className="text-red-400 font-mono font-bold">D0:</strong> {station.coreD0}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">{station.archetype}</span>
                      <button
                        onClick={() => {
                          setActiveStationId(station.id);
                          setViewMode('tour');
                          soundFx.playOrbitWarp();
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 hover:underline"
                      >
                        <span>Volar en el Tour</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>
        )}

      </main>

      <FooterEditorial />
    </div>
  );
}
