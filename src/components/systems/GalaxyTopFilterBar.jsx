// src/components/systems/GalaxyTopFilterBar.jsx
// Panel de servicios superior: Todos los 18 sistemas visibles a la vez, con sus iconos SVG y colores,
// sin contenedores pesados ni barras de desplazamiento horizontal que oculten opciones.

import React from "react";
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
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playTap } from "../../utils/audioEffects";

// Mapa completo de iconos SVG de Lucide para los 18 servicios
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
  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* 1. BARRA DE TELEMETRÍA Y CONTROLES GLOBALES */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-white font-bold tracking-wider uppercase text-[11px] sm:text-xs">
            18 Sistemas Operativos & Agentes
          </span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-400 text-[11px] hidden sm:inline">
            Haz clic en cualquier servicio para enfocarlo en la Galaxia 3D
          </span>
        </div>

        {/* Acciones de Navegación 3D */}
        <div className="flex items-center gap-2">
          {/* Botón Reset a Vista Panorámica */}
          <button
            onClick={onResetToGalaxy}
            title="Volver al panorama completo de la Galaxia Dynamind"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-500/40 hover:border-amber-300 text-amber-300 hover:text-white text-xs font-mono font-bold transition-all shadow-sm group"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400 group-hover:-rotate-90 transition-transform" />
            <span>⎌ TODA LA GALAXIA</span>
          </button>

          {/* Toggle de Anillos Orbitales */}
          <button
            onClick={onToggleTrajectories}
            title={showTrajectories ? "Ocultar Anillos Orbitales" : "Mostrar Anillos Orbitales"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              showTrajectories
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                : "bg-white/[0.02] border-white/10 text-neutral-500 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Órbitas</span>
          </button>

          {/* Control de Velocidad */}
          <div className="flex items-center bg-white/[0.03] rounded-xl border border-white/10 p-0.5">
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

      {/* 2. RETÍCULA UNIFORME DE LOS 18 SERVICIOS (TODOS VISIBLES A LA VEZ SIN SCROLL) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {GALAXY_SERVICES.map((service) => {
          const SrvIcon = ICON_MAP[service.iconName] || Orbit;
          const isSelected = selectedServiceId === service.id;

          return (
            <button
              key={service.id}
              onClick={() => {
                playTap();
                onSelectService(service.id);
              }}
              className={`group flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-white/10 text-white font-bold shadow-lg scale-[1.02]"
                  : "bg-white/[0.02] border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20"
              }`}
              style={{
                borderColor: isSelected ? service.color : undefined,
                boxShadow: isSelected ? `0 0 16px ${service.color}45` : undefined,
              }}
            >
              {/* Barra de acento superior si está activo */}
              {isSelected && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: service.color }}
                />
              )}

              {/* Punto de color con resplandor */}
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: service.color,
                  boxShadow: `0 0 6px ${service.color}`,
                }}
              />

              {/* Icono SVG Lucide */}
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${service.color}15`,
                  borderColor: `${service.color}35`,
                  color: isSelected ? "#ffffff" : service.color,
                }}
              >
                <SrvIcon className="w-3.5 h-3.5" />
              </div>

              {/* Nombre del Servicio */}
              <span className="text-[11px] font-mono leading-tight line-clamp-1 group-hover:text-white">
                {service.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
