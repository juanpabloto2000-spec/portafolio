// src/components/systems/GalaxyTopFilterBar.jsx
// Barra de control superior estilizada (fuera y por encima del lienzo 3D):
// - Filtros por categoría con iconos SVG de Lucide.
// - Tira horizontal de los 18 sistemas con iconos y colores representativos.
// - Barra táctica con botón "Toda la Galaxia", visibilidad de órbitas y selector de velocidad.

import React, { useState } from "react";
import {
  Orbit,
  Sun,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Play,
  Pause,
  Eye,
  LayoutDashboard,
  Hotel,
  Calculator,
  UtensilsCrossed,
  CreditCard,
  Package,
  MessageSquare,
  TrendingUp,
  FileSignature,
  Eye as EyeIcon,
  Mic,
  Workflow,
  FileText,
  ShieldAlert,
  Bell,
  Receipt,
  Database,
  SlidersHorizontal,
} from "lucide-react";
import { GALAXY_CATEGORIES, GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playTap } from "../../utils/audioEffects";

// Mapa de iconos SVG de Lucide para cada servicio
const ICON_MAP = {
  Orbit,
  Sun,
  Layers,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  Hotel,
  Calculator,
  UtensilsCrossed,
  CreditCard,
  Package,
  MessageSquare,
  TrendingUp,
  FileSignature,
  Eye: EyeIcon,
  Mic,
  Workflow,
  FileText,
  ShieldAlert,
  Bell,
  Receipt,
  Database,
};

export default function GalaxyTopFilterBar({
  selectedServiceId,
  onSelectService,
  onResetToGalaxy,
  speedMultiplier,
  onChangeSpeed,
  showTrajectories,
  onToggleTrajectories,
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = GALAXY_SERVICES.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  const activeService = GALAXY_SERVICES.find((s) => s.id === selectedServiceId) || GALAXY_SERVICES[0];
  const ActiveIcon = ICON_MAP[activeService.iconName] || Orbit;

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* 1. FILA 1: PESTAÑAS DE CATEGORÍA CON ICONOS SVG & CONTROLES TÁCTICOS */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-neutral-950/70 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Filtros de Categoría */}
        <div className="flex flex-wrap items-center gap-1.5">
          {GALAXY_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Orbit;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  playTap();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-neutral-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Barra de Acciones Galácticas: Botón Toda la Galaxia + Velocidad + Órbitas */}
        <div className="flex items-center gap-2">
          {/* Botón Principal: Retornar al Panorama Completo */}
          <button
            onClick={onResetToGalaxy}
            title="Volver a la vista panorámica completa de la Galaxia Dynamind"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-cyan-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-mono font-bold transition-all shadow-md group"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400 group-hover:-rotate-90 transition-transform" />
            <span>⎌ TODA LA GALAXIA</span>
          </button>

          {/* Toggle de Anillos Orbitales */}
          <button
            onClick={onToggleTrajectories}
            title={showTrajectories ? "Ocultar Anillos Orbitales" : "Mostrar Anillos Orbitales"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
              showTrajectories
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                : "bg-neutral-900 border-white/10 text-neutral-500 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Órbitas</span>
          </button>

          {/* Selector de Velocidad */}
          <div className="flex items-center bg-neutral-900/90 rounded-xl border border-white/10 p-0.5">
            <button
              onClick={() => onChangeSpeed(speedMultiplier === 0 ? 1 : 0)}
              className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                speedMultiplier === 0 ? "text-amber-400 bg-amber-500/20" : "text-neutral-400 hover:text-white"
              }`}
              title={speedMultiplier === 0 ? "Reanudar órbita" : "Pausar órbita"}
            >
              {speedMultiplier === 0 ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              onClick={() => onChangeSpeed(1)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                speedMultiplier === 1 ? "text-cyan-300 font-bold bg-cyan-500/20" : "text-neutral-400"
              }`}
            >
              1x
            </button>
            <button
              onClick={() => onChangeSpeed(2.5)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                speedMultiplier === 2.5 ? "text-cyan-300 font-bold bg-cyan-500/20" : "text-neutral-400"
              }`}
            >
              2.5x
            </button>
          </div>
        </div>
      </div>

      {/* 2. FILA 2: TIRA ESTILIZADA DE SISTEMAS (BOTONES DE SERVICIO DE LA PÁGINA) */}
      <div className="p-2 rounded-2xl bg-neutral-950/50 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 pt-0.5 px-0.5">
          {filteredServices.map((service) => {
            const SrvIcon = ICON_MAP[service.iconName] || Orbit;
            const isSelected = selectedServiceId === service.id;

            return (
              <button
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border whitespace-nowrap text-xs font-mono transition-all shrink-0 ${
                  isSelected
                    ? "bg-white/15 text-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]"
                    : "bg-white/[0.02] border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
                style={{
                  borderColor: isSelected ? service.color : undefined,
                  boxShadow: isSelected ? `0 0 15px ${service.color}40` : undefined,
                }}
              >
                {/* Indicador de Color del Planeta con Resplandor */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{
                    backgroundColor: service.color,
                    boxShadow: `0 0 8px ${service.color}`,
                  }}
                />

                {/* Icono SVG de Lucide */}
                <SrvIcon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: isSelected ? "#ffffff" : service.color }}
                />

                {/* Nombre Oficial del Servicio */}
                <span className="font-medium tracking-tight">{service.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
