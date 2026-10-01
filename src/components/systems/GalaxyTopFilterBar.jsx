// src/components/systems/GalaxyTopFilterBar.jsx
// Barra superior horizontal integrada: Filtros por categoría con iconos SVG,
// tira rápida de servicios planetarios, botón de retorno al panorama galáctico y controles de velocidad.

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

  return (
    <div className="absolute top-3 left-3 right-3 z-30 flex flex-col gap-2.5 pointer-events-auto">
      {/* 1. Fila Superior: Filtros de Categoría con Iconos SVG + Controles de Retorno */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Pestañas de Categoría */}
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-neutral-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Acciones Rápidas: Botón Ver Toda la Galaxia + Velocidad + Toggle Órbitas */}
        <div className="flex items-center gap-2">
          {/* Botón Prominente: Ver Toda la Galaxia Dynamind */}
          <button
            onClick={onResetToGalaxy}
            title="Volver a la vista panorámica completa de la Galaxia Dynamind"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-mono font-bold transition-all shadow-md group"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400 group-hover:-rotate-90 transition-transform" />
            <span>⎌ TODA LA GALAXIA</span>
          </button>

          {/* Toggle de Órbitas */}
          <button
            onClick={onToggleTrajectories}
            title={showTrajectories ? "Ocultar Anillos Orbitales" : "Mostrar Anillos Orbitales"}
            className={`p-1.5 rounded-xl border text-xs font-mono transition-colors ${
              showTrajectories
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                : "bg-neutral-900 border-white/10 text-neutral-500 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Control de Velocidad Orbital */}
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
              3x
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tira Horizontal de Botones de Servicio: Cada planeta con su Icono SVG y Color */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 px-1">
        {filteredServices.map((service) => {
          const SrvIcon = ICON_MAP[service.iconName] || Orbit;
          const isSelected = selectedServiceId === service.id;

          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border whitespace-nowrap text-xs font-mono transition-all shrink-0 ${
                isSelected
                  ? "bg-white/15 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] font-bold scale-[1.02]"
                  : "bg-neutral-950/80 backdrop-blur-md border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-900 hover:border-white/25"
              }`}
            >
              {/* Punto de color con pulso */}
              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: service.color }}
              />

              {/* Icono SVG */}
              <SrvIcon
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: isSelected ? "#ffffff" : service.color }}
              />

              {/* Nombre del Servicio */}
              <span className="truncate">{service.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
