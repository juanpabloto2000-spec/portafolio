// src/pages/SystemsPage.jsx
// La Galaxia Tecnológica Dynamind: Simulación 3D interactiva panorámica de servicios y consultoría de IA soberana.
// Filtro superior integrado con iconos SVG, navegación focal 3D entre planetas vecinos y retorno galáctico instantáneo.

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import RevealSection from '../components/motion/RevealSection';
import DynamindGalaxy3D from '../components/systems/DynamindGalaxy3D';
import GalaxyTopFilterBar from '../components/systems/GalaxyTopFilterBar';
import DynamindServiceHUD from '../components/systems/DynamindServiceHUD';
import { useCMS } from '../context/CMSContext';
import { GALAXY_SERVICES } from '../data/dynamindGalaxyData';
import {
  Sun,
  ShieldCheck,
  Orbit,
  Terminal,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  LayoutDashboard,
  Hotel,
  Calculator,
  UtensilsCrossed,
  CreditCard,
  Package,
  MessageSquare,
  TrendingUp,
  FileSignature,
  Eye,
  Mic,
  Workflow,
  FileText,
  ShieldAlert,
  Bell,
  Receipt,
  Database,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { 
  playOrbitWarp, 
  playPlanetSelect, 
  playTap, 
  startCelestialGalaxyDrone, 
  stopCelestialGalaxyDrone, 
  toggleCelestialMute, 
  celestialDrone 
} from '../utils/audioEffects';

const ICON_MAP = {
  Sun,
  LayoutDashboard,
  Hotel,
  Calculator,
  UtensilsCrossed,
  CreditCard,
  Package,
  MessageSquare,
  TrendingUp,
  FileSignature,
  Eye,
  Mic,
  Workflow,
  FileText,
  ShieldAlert,
  Bell,
  Receipt,
  Database,
  Orbit,
};

export default function SystemsPage() {
  const { cms } = useCMS();
  const sistemasCMS = cms?.pages?.sistemas;

  // Modo de vista: 'galaxy' (Simulación 3D Panorámica) | 'matrix' (Consola Matriz en Cuadrícula 2D)
  const [viewMode, setViewMode] = useState('galaxy');

  // Servicio activo seleccionado
  const [selectedServiceId, setSelectedServiceId] = useState('srv-core');

  // Visibilidad de los anillos orbitales en 3D
  const [showTrajectories, setShowTrajectories] = useState(true);

  // Velocidad orbital (0 = pausa, 1 = normal, 2.5 = acelerada)
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Visibilidad del panel de información del servicio
  const [isHUDOpen, setIsHUDOpen] = useState(true);

  // Manejador de selección de servicio
  const handleSelectService = useCallback((serviceId) => {
    playPlanetSelect();
    setSelectedServiceId(serviceId);
    setIsHUDOpen(true);
  }, []);

  // Retorno al Panorama Completo de la Galaxia Dynamind
  const handleResetToGalaxy = useCallback(() => {
    playOrbitWarp();
    setSelectedServiceId('srv-core');
    setIsHUDOpen(true);
  }, []);

  // Navegación secuencial por teclado (Flechas [←] y [→])
  const handleNextService = useCallback(() => {
    playOrbitWarp();
    const cIdx = GALAXY_SERVICES.findIndex((s) => s.id === selectedServiceId);
    const nextIdx = (cIdx + 1) % GALAXY_SERVICES.length;
    setSelectedServiceId(GALAXY_SERVICES[nextIdx].id);
    setIsHUDOpen(true);
  }, [selectedServiceId]);

  const handlePrevService = useCallback(() => {
    playOrbitWarp();
    const cIdx = GALAXY_SERVICES.findIndex((s) => s.id === selectedServiceId);
    const prevIdx = (cIdx - 1 + GALAXY_SERVICES.length) % GALAXY_SERVICES.length;
    setSelectedServiceId(GALAXY_SERVICES[prevIdx].id);
    setIsHUDOpen(true);
  }, [selectedServiceId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        handleNextService();
      } else if (e.key === 'ArrowLeft') {
        handlePrevService();
      } else if (e.key === 'Escape') {
        handleResetToGalaxy();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextService, handlePrevService, handleResetToGalaxy]);

  // Estado reactivo del mute del sonido celestial en la galaxia
  const [isCelestialMuted, setIsCelestialMuted] = useState(() => celestialDrone.isMuted);

  // Sincronizar estado con el singleton de audio
  useEffect(() => {
    const unsubscribe = celestialDrone.subscribe((muted) => {
      setIsCelestialMuted(muted);
    });
    return unsubscribe;
  }, []);

  // Sonido angelical y cósmico: SOLO suena mientras se esté en La Galaxia Dynamind
  useEffect(() => {
    const handleFirstInteraction = () => {
      startCelestialGalaxyDrone();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('mousemove', handleFirstInteraction);
    };

    startCelestialGalaxyDrone();

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('mousemove', handleFirstInteraction, { once: true });

    // 🛑 CUANDO EL USUARIO SALE DE LA SECCIÓN DE LA GALAXIA: APAGAR AUDIO INMEDIATAMENTE
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('mousemove', handleFirstInteraction);
      stopCelestialGalaxyDrone();
    };
  }, []);

  // Manejo del botón de altavoz (Mute / Unmute)
  const handleToggleCelestialMute = () => {
    playTap();
    const nextMuted = toggleCelestialMute();
    setIsCelestialMuted(nextMuted);
  };

  // Redirección al Triage / Diagnóstico con persistencia de contexto
  const handleOpenConsulting = useCallback((service) => {
    if (service) {
      try {
        sessionStorage.setItem('dynamind_preselected_service', service.id);
        sessionStorage.setItem('dynamind_preselected_service_name', service.name);
      } catch (e) {}
    }
    window.location.hash = '#/diagnostico';
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 space-y-8 sm:space-y-10">
        {/* ============================================================== */}
        {/* HEADER PRINCIPAL: MANIFIESTO CONSULTORÍA SOBERANA (NO AGENCIA) */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-2">
          <RevealSection direction="up" className="space-y-5">
            <div className="space-y-3 max-w-4xl">
              <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
                {sistemasCMS?.heroTitle || (
                  <>
                    La Galaxia Tecnológica <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-300">
                      de Software & Consultoría de IA
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed max-w-3xl font-light">
                {sistemasCMS?.heroSubtitle || (
                  <>
                    Cada planeta de este universo representa un servicio de ingeniería que construimos en Dynamind. 
                    Desde <strong>sistemas operativos mayores</strong> (Core DSB Operativo, PMS Hotelero, Caja con Arqueo Ciego, KDS Comandas) 
                    hasta <strong>agentes autónomos de alta conversión y blindaje</strong> (WhatsApp CRM, OCR Facturas DIAN, n8n, Auditor 24/7). 
                    Todo con código propietario entregado en tu propio GitHub sin rentas mensuales.
                  </>
                )}
              </p>
            </div>

            {/* Switcher de Vista (Galaxia vs Tarjetas) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
              <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <button
                  onClick={() => {
                    playTap();
                    setViewMode('galaxy');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'galaxy'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Orbit className="w-4 h-4 text-cyan-400" />
                  <span>Galaxia</span>
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
                  <span>Tarjetas</span>
                </button>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ============================================================== */}
        {/* MODO 1: GALAXIA 3D PANORÁMICA LIMPIA (SIN PANELES LATERALES)    */}
        {/* ============================================================== */}
        {viewMode === 'galaxy' ? (
          <section className="max-w-[1440px] mx-auto px-3 sm:px-6 space-y-4">
            {/* 1. BARRA SUPERIOR DE FILTROS & SISTEMAS (FUERA Y POR ENCIMA DEL LIENZO 3D) */}
            <GalaxyTopFilterBar
              selectedServiceId={selectedServiceId}
              onSelectService={handleSelectService}
              onResetToGalaxy={handleResetToGalaxy}
              speedMultiplier={speedMultiplier}
              onChangeSpeed={setSpeedMultiplier}
              showTrajectories={showTrajectories}
              onToggleTrajectories={() => setShowTrajectories((prev) => !prev)}
            />

            {/* 2. CONTENEDOR 100% LIMPIO DE LA GALAXIA 3D PANORÁMICA */}
            <div className="relative w-full h-[640px] sm:h-[760px] rounded-3xl border border-white/10 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-neutral-950">
              {/* MOTOR 3D THREE.JS: VISTA PANORÁMICA ART-DIRECTED */}
              <DynamindGalaxy3D
                selectedServiceId={selectedServiceId}
                onSelectService={handleSelectService}
                speedMultiplier={speedMultiplier}
                showTrajectories={showTrajectories}
              />

              {/* PANEL HOLOGRÁFICO ULTRA-LIMPIO DEL SERVICIO SELECCIONADO */}
              {isHUDOpen && (
                <DynamindServiceHUD
                  selectedServiceId={selectedServiceId}
                  onClose={() => setIsHUDOpen(false)}
                  onResetToGalaxy={handleResetToGalaxy}
                  onOpenConsultingModal={handleOpenConsulting}
                />
              )}

              {/* Botón Flotante para reabrir el HUD si fue cerrado */}
              {!isHUDOpen && (
                <button
                  onClick={() => setIsHUDOpen(true)}
                  className="absolute bottom-5 right-5 z-30 px-4 py-2.5 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-2xl hover:bg-neutral-800 transition-all flex items-center gap-2"
                >
                  <Orbit className="w-4 h-4 text-cyan-400" />
                  <span>Ver Ficha del Servicio</span>
                </button>
              )}
            </div>
          </section>
        ) : (
          /* ============================================================== */
          /* MODO 2: CONSOLA MATRIZ EN RETÍCULA BENTO 2D                    */
          /* ============================================================== */
          <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
            {/* Cuadrícula de 18 Tarjetas de Servicio */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GALAXY_SERVICES.map((service) => {
                const SrvIcon = ICON_MAP[service.iconName] || Orbit;
                const isSelected = selectedServiceId === service.id;

                return (
                  <div
                    key={service.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-zinc-900/85 border-cyan-500/50 shadow-2xl shadow-cyan-500/10'
                        : 'bg-zinc-950/70 border-white/10 hover:border-white/20 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: service.color }}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-end">
                        <span className="text-xs font-mono font-bold text-white">
                          {service.metric.headline}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl border p-2 flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${service.color}15`,
                            borderColor: `${service.color}40`,
                            color: service.color,
                          }}
                        >
                          <SrvIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                            {service.name}
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans">{service.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed font-light">
                        {service.summary}
                      </p>

                      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-[10px] uppercase">
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          Cuello de Botella (D0)
                        </div>
                        <p className="text-amber-200/90 text-[11px] leading-relaxed font-light">
                          {service.bottleneckD0}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      {/* Enlace directo a demo interactiva si existe */}
                      {service.id === 'srv-dsb' || service.id === 'srv-caja' || service.id === 'srv-core' ? (
                        <a
                          href="/#/dashboard"
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          title="Ver demo interactiva del Dashboard Operativo"
                        >
                          <LayoutDashboard className="w-3 h-3 text-cyan-400" />
                          <span>Ver demo de dashboard</span>
                        </a>
                      ) : service.id === 'srv-pms' || service.id === 'srv-reservas' ? (
                        <a
                          href="https://andicas.vercel.app/#/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 hover:text-white font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          title="Ver plataforma real en producción"
                        >
                          <span>Ver Demo</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-neutral-500 uppercase font-mono">
                          {service.category}
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setSelectedServiceId(service.id);
                          setViewMode('galaxy');
                          setIsHUDOpen(true);
                          playOrbitWarp();
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Enfocar en 3D</span>
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

      {/* ============================================================== */}
      {/* 🔊 CONTROL FLOTANTE DE ALTAVOZ CELESTIAL (ABAJO A LA IZQUIERDA) */}
      {/* ============================================================== */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          type="button"
          onClick={handleToggleCelestialMute}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border backdrop-blur-xl transition-all shadow-xl cursor-pointer group active:scale-95 ${
            isCelestialMuted
              ? 'bg-black/80 border-white/15 text-zinc-400 hover:text-white hover:border-white/30 shadow-black/50'
              : 'bg-black/85 border-cyan-400/50 text-cyan-300 hover:text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:border-cyan-300'
          }`}
          title={isCelestialMuted ? 'Activar atmósfera celestial (clic para escuchar)' : 'Silenciar atmósfera celestial'}
          aria-label={isCelestialMuted ? 'Activar sonido de la galaxia' : 'Silenciar sonido de la galaxia'}
        >
          {isCelestialMuted ? (
            <VolumeX className="w-4 h-4 text-zinc-400 group-hover:scale-110 transition-transform" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>
          )}
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase hidden sm:inline">
            {isCelestialMuted ? 'MUTE' : 'ATMÓSFERA CELESTIAL'}
          </span>
        </button>
      </div>

      <FooterEditorial />
    </div>
  );
}
