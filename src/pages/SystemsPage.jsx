// src/pages/SystemsPage.jsx
// Simulación 3D interactiva hipercompleta del Sistema Solar y catálogo de soluciones de software soberano de Dynamind.
// Integra mecánicas de Three.js inspiradas en SolarSystem (honzaap) y ephemeris-explorer (Canleskis).

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import RevealSection from '../components/motion/RevealSection';
import SolarSystem3D from '../components/systems/SolarSystem3D';
import EphemerisHierarchyPanel from '../components/systems/EphemerisHierarchyPanel';
import SolarTimeControlsBar from '../components/systems/SolarTimeControlsBar';
import PlanetTelemetryCard from '../components/systems/PlanetTelemetryCard';
import { CELESTIAL_BODIES, SYSTEM_CATEGORIES } from '../data/solarSystemData';
import { 
  Sun, ShieldCheck, Orbit, Terminal, Search, ChevronRight, 
  ArrowRight, Compass, Radio, Sparkles, Filter, Layers, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { playOrbitWarp, playPlanetSelect, playTap } from '../utils/audioEffects';

export default function SystemsPage() {
  // Modo de visualización: 'solar' (Simulador 3D Three.js) | 'matrix' (Consola Matriz de 16 Sistemas)
  const [viewMode, setViewMode] = useState('solar');

  // Cuerpo Celeste activo seleccionado en el sistema solar
  const [selectedBodyId, setSelectedBodyId] = useState('sun');

  // Estado del panel lateral jerárquico (Ephemeris Tree)
  const [isHierarchyOpen, setIsHierarchyOpen] = useState(true);

  // Visibilidad de las trayectorias orbitales en el espacio 3D
  const [showTrajectories, setShowTrajectories] = useState(true);

  // Velocidad de la simulación: 0 (pausa), 1 (normal), 5, 15
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Modo de cámara: "orbit" (perspectiva 3D) | "topdown" (cenital / mapa de arriba a abajo)
  const [cameraViewMode, setCameraViewMode] = useState('orbit');

  // Auto-Tour cinemático activo
  const [isAutoTourActive, setIsAutoTourActive] = useState(false);

  // Visibilidad de la tarjeta de telemetría flotante
  const [isTelemetryCardOpen, setIsTelemetryCardOpen] = useState(true);

  // Filtros para la Consola Matriz
  const [matrixSearchQuery, setMatrixSearchQuery] = useState('');
  const [matrixSelectedCategory, setMatrixSelectedCategory] = useState('all');

  // Cuerpo celeste actual seleccionado
  const currentBody = useMemo(() => {
    return CELESTIAL_BODIES.find((b) => b.id === selectedBodyId) || CELESTIAL_BODIES[0];
  }, [selectedBodyId]);

  // Manejador para cambiar de cuerpo celeste con sonido y centrado
  const handleSelectBody = useCallback((bodyId) => {
    playPlanetSelect();
    setSelectedBodyId(bodyId);
    setIsTelemetryCardOpen(true);
  }, []);

  // Navegación: Siguiente cuerpo
  const handleNextBody = useCallback(() => {
    playOrbitWarp();
    const cIdx = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBodyId);
    const nextIdx = (cIdx + 1) % CELESTIAL_BODIES.length;
    setSelectedBodyId(CELESTIAL_BODIES[nextIdx].id);
    setIsTelemetryCardOpen(true);
  }, [selectedBodyId]);

  // Navegación: Cuerpo anterior
  const handlePrevBody = useCallback(() => {
    playOrbitWarp();
    const cIdx = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBodyId);
    const prevIdx = (cIdx - 1 + CELESTIAL_BODIES.length) % CELESTIAL_BODIES.length;
    setSelectedBodyId(CELESTIAL_BODIES[prevIdx].id);
    setIsTelemetryCardOpen(true);
  }, [selectedBodyId]);

  // Reset de la cámara al Sol / Núcleo Soberano
  const handleResetToSun = useCallback(() => {
    playOrbitWarp();
    setSelectedBodyId('sun');
    setCameraViewMode('orbit');
    setIsTelemetryCardOpen(true);
  }, []);

  // Bucle de Auto-Tour Cinemático (cada 9 segundos salta al siguiente cuerpo celeste)
  useEffect(() => {
    if (!isAutoTourActive) return;

    const timer = setInterval(() => {
      handleNextBody();
    }, 9000);

    return () => clearInterval(timer);
  }, [isAutoTourActive, handleNextBody]);

  // Navegación por teclado nativo (Flechas [←] y [→])
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        handleNextBody();
      } else if (e.key === 'ArrowLeft') {
        handlePrevBody();
      } else if (e.key === 'Escape') {
        setIsTelemetryCardOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextBody, handlePrevBody]);

  // Redirección al Triage / Diagnóstico al pulsar cotizar
  const handleOpenConsulting = useCallback((body) => {
    window.location.hash = '#/diagnostico';
  }, []);

  // Filtrado reactivo de cuerpos para la Consola Matriz
  const filteredMatrixBodies = useMemo(() => {
    return CELESTIAL_BODIES.filter((b) => {
      const matchesSearch =
        !matrixSearchQuery.trim() ||
        b.displayName.toLowerCase().includes(matrixSearchQuery.toLowerCase()) ||
        b.englishName.toLowerCase().includes(matrixSearchQuery.toLowerCase()) ||
        b.system.name.toLowerCase().includes(matrixSearchQuery.toLowerCase()) ||
        b.system.tagline.toLowerCase().includes(matrixSearchQuery.toLowerCase()) ||
        b.system.bottleneckD0.toLowerCase().includes(matrixSearchQuery.toLowerCase());

      const matchesCat =
        matrixSelectedCategory === 'all' || b.system.category === matrixSelectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [matrixSearchQuery, matrixSelectedCategory]);

  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 space-y-8 sm:space-y-12">
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
                El Sistema Solar <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-300">
                  de Software & Consultoría de IA
                </span>
              </h1>
              <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed max-w-3xl font-light">
                Cada planeta y satélite de esta simulación 3D representa un sistema real de software que construimos en Dynamind. 
                Desde <strong>sistemas operativos de alta complejidad</strong> (Core DSB en /#/dsb, PMS Hotelero, Caja con Arqueo Ciego, KDS Comandas) 
                hasta <strong>automatizaciones y micro-agentes autónomos</strong> (n8n, OCR Facturas DIAN, WhatsApp CRM, Auditor 24/7), 
                todo gobernado por código propietario entregado en tu propio GitHub sin renta de software.
              </p>
            </div>

            {/* Switcher Táctico Dual-Mode (Simulador Solar 3D vs Consola Matriz) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              {/* Botones de Modo de Vista */}
              <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <button
                  onClick={() => {
                    playTap();
                    setViewMode('solar');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'solar'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Orbit className="w-4 h-4 text-cyan-400" />
                  <span>SIMULADOR SOLAR 3D (THREE.JS)</span>
                </button>

                <button
                  onClick={() => {
                    playTap();
                    setViewMode('matrix');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'matrix'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>CONSOLA MATRIZ (16 SISTEMAS)</span>
                </button>
              </div>

              {/* Indicador de Ayuda Rápida */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="hidden sm:inline">Navega con flechas [←] [→] o arrastra el ratón en 360°</span>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>16 Cuerpos Celestes Activos</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ============================================================== */}
        {/* MODO 1: SIMULADOR SOLAR 3D THREE.JS HIPERCOMPLETO             */}
        {/* ============================================================== */}
        {viewMode === 'solar' ? (
          <section className="max-w-[1400px] mx-auto px-2 sm:px-6">
            <div className="relative w-full h-[680px] sm:h-[760px] rounded-3xl border border-white/10 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-neutral-950">
              {/* 1. MOTOR 3D THREE.JS CON MODELOS GLB Y RAYCASTING */}
              <SolarSystem3D
                selectedBodyId={selectedBodyId}
                onSelectBody={handleSelectBody}
                speedMultiplier={speedMultiplier}
                showTrajectories={showTrajectories}
                cameraViewMode={cameraViewMode}
              />

              {/* 2. PANEL JERÁRQUICO LATERAL IZQUIERDO (EPHEMERIS TREE) */}
              <EphemerisHierarchyPanel
                selectedBodyId={selectedBodyId}
                onSelectBody={handleSelectBody}
                showTrajectories={showTrajectories}
                onToggleTrajectories={() => setShowTrajectories((prev) => !prev)}
                isOpen={isHierarchyOpen}
                onToggleOpen={() => setIsHierarchyOpen((prev) => !prev)}
              />

              {/* 3. BARRA SUPERIOR DE CONTROL TEMPORAL & MODOS DE CÁMARA */}
              <SolarTimeControlsBar
                speedMultiplier={speedMultiplier}
                onChangeSpeed={setSpeedMultiplier}
                isAutoTourActive={isAutoTourActive}
                onToggleAutoTour={() => setIsAutoTourActive((prev) => !prev)}
                onResetToSun={handleResetToSun}
                selectedBodyId={selectedBodyId}
                cameraViewMode={cameraViewMode}
                onChangeCameraMode={setCameraViewMode}
                showTrajectories={showTrajectories}
                onToggleTrajectories={() => setShowTrajectories((prev) => !prev)}
              />

              {/* 4. TARJETA DE TELEMETRÍA DEL PLANETA SELECCIONADO */}
              {isTelemetryCardOpen && (
                <PlanetTelemetryCard
                  selectedBodyId={selectedBodyId}
                  onClose={() => setIsTelemetryCardOpen(false)}
                  onOpenConsultingModal={handleOpenConsulting}
                />
              )}

              {/* 5. Mini-Barra Inferior de Navegación Rápida */}
              <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-xs font-mono text-neutral-300">
                <button
                  onClick={handlePrevBody}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-white font-bold transition-colors"
                  title="Anterior cuerpo celeste [←]"
                >
                  ◄ Anterior
                </button>
                <span className="text-neutral-500">|</span>
                <span className="text-amber-400 font-bold">{currentBody.displayName}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-cyan-400 truncate max-w-[200px]">{currentBody.system.name}</span>
                <span className="text-neutral-500">|</span>
                <button
                  onClick={handleNextBody}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-white font-bold transition-colors"
                  title="Siguiente cuerpo celeste [→]"
                >
                  Siguiente ►
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* ============================================================== */
          /* MODO 2: CONSOLA MATRIZ DE SISTEMAS EN RETÍCULA BENTO           */
          /* ============================================================== */
          <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            {/* Barra de Búsqueda y Selector de Categorías */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={matrixSearchQuery}
                  onChange={(e) => setMatrixSearchQuery(e.target.value)}
                  placeholder="Buscar planeta, sistema, tecnología o cuello D0..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Filtros de Categoría */}
              <div className="flex flex-wrap items-center gap-1.5">
                {SYSTEM_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playTap();
                      setMatrixSelectedCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      matrixSelectedCategory === cat.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                        : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Retícula de Cuerpos Celestes y Sistemas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatrixBodies.map((body) => {
                const isSelected = selectedBodyId === body.id;

                return (
                  <div
                    key={body.id}
                    className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-zinc-900/85 border-cyan-500/50 shadow-2xl shadow-cyan-500/10'
                        : 'bg-zinc-950/70 border-white/10 hover:border-white/20 hover:bg-zinc-900/50'
                    }`}
                  >
                    {/* Borde Superior Dinámico */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor:
                          body.type === 'star'
                            ? '#f59e0b'
                            : body.type === 'moon'
                            ? '#10b981'
                            : '#06b6d4',
                      }}
                    />

                    <div className="space-y-4">
                      {/* Cabecera de la Tarjeta con Foto Oficial */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
                            <img
                              src={`/assets/solar/cards/${body.id}.png`}
                              alt={body.displayName}
                              className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                                {body.displayName}
                              </h4>
                              <span className="text-xs font-mono text-neutral-500">
                                ({body.englishName})
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                              {body.system.category}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-neutral-500 uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                          {body.type.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Título de la Solución */}
                      <div className="space-y-1">
                        <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wide">
                          {body.system.name}
                        </h5>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed font-light">
                          {body.system.tagline}
                        </p>
                      </div>

                      {/* Cuello de Botella Operativo (D0) */}
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-[10px] uppercase">
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          Cuello de Botella (D0)
                        </div>
                        <p className="text-amber-200/90 text-[11px] leading-relaxed font-light">
                          {body.system.bottleneckD0}
                        </p>
                      </div>

                      {/* Capacidades Clave */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-neutral-400 uppercase">Capacidades:</p>
                        <ul className="space-y-1">
                          {body.system.capabilities.slice(0, 3).map((cap, i) => (
                            <li key={i} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                              <span className="text-emerald-400 text-xs mt-0.5">•</span>
                              <span className="line-clamp-1">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pie de Tarjeta: Métricas y Vuelo 3D */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-cyan-400 font-bold">{body.system.metrics.headline}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBodyId(body.id);
                          setViewMode('solar');
                          setIsTelemetryCardOpen(true);
                          playOrbitWarp();
                        }}
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline"
                      >
                        <span>Centrar en 3D</span>
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
