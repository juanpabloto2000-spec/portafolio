// src/components/systems/DynamindServiceHUD.jsx
// Panel holográfico ultra-limpio del servicio seleccionado en La Galaxia Dynamind.
// Libre de datos astronómicos: Enfocado 100% en cuellos de botella D0, pipeline, capacidades y conversión.

import React from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
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
} from "lucide-react";
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";

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

export default function DynamindServiceHUD({
  selectedServiceId,
  onClose,
  onResetToGalaxy,
  onOpenConsultingModal,
}) {
  const service =
    GALAXY_SERVICES.find((s) => s.id === selectedServiceId) || GALAXY_SERVICES[0];

  const SrvIcon = ICON_MAP[service.iconName] || Orbit;

  return (
    <div className="absolute bottom-4 right-4 z-30 w-[94%] sm:w-[420px] max-h-[calc(100%-6.5rem)] flex flex-col bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-slide-up">
      {/* Cabecera Limpia del Servicio */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-neutral-900/90 to-neutral-950 flex items-start justify-between relative overflow-hidden">
        {/* Halo de color del servicio */}
        <div
          className="absolute -top-10 -left-10 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: service.color }}
        />

        <div className="flex items-start gap-3 z-10">
          <div
            className="w-12 h-12 rounded-2xl border p-2 flex items-center justify-center shrink-0 shadow-inner group"
            style={{
              backgroundColor: `${service.color}15`,
              borderColor: `${service.color}40`,
              color: service.color,
            }}
          >
            <SrvIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white tracking-tight leading-tight">
              {service.name}
            </h3>
            <p className="text-xs text-neutral-400 font-sans">{service.subtitle}</p>
          </div>
        </div>

        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="z-10 p-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors"
          title="Minimizar panel para ver la galaxia"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Cuerpo Desplazable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3.5 text-xs">
        {/* Resumen Comercial */}
        <p className="text-neutral-300 font-sans leading-relaxed font-light">
          {service.summary}
        </p>

        {/* Cuello de Botella Operativo Erradicado (D0) */}
        <div className="p-3 rounded-2xl bg-amber-950/25 border border-amber-500/30 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Cuello de Botella Erradicado (D0)
          </div>
          <p className="text-[11px] text-amber-200/90 leading-relaxed font-sans font-light">
            {service.bottleneckD0}
          </p>
        </div>

        {/* Pipeline de Implementación en 4 Pasos */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-cyan-400" />
            Pipeline de Implementación
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {service.pipeline.map((p) => (
              <div
                key={p.step}
                className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5"
              >
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <span className="text-cyan-400 font-bold">{p.step}</span>
                  <span className="text-white font-medium truncate">{p.title}</span>
                </div>
                <p className="text-[10px] text-neutral-400 line-clamp-2 leading-snug">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Capacidades Garantizadas */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Capacidades Garantizadas
          </div>
          <ul className="space-y-1">
            {service.capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-1.5 text-neutral-300 text-[11px] leading-snug">
                <span className="text-emerald-400 text-xs mt-0.5">•</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Métrica Clave */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white font-mono">{service.metric.headline}</p>
            <p className="text-[10px] text-neutral-400 font-sans">{service.metric.label}</p>
          </div>
          <span
            className="text-[10px] font-mono px-2 py-1 rounded-lg border font-bold"
            style={{
              backgroundColor: `${service.color}15`,
              borderColor: `${service.color}35`,
              color: service.color,
            }}
          >
            Soberano
          </span>
        </div>
      </div>

      {/* Pie del Panel: Botones de Acción */}
      <div className="p-3 border-t border-white/10 bg-neutral-950 flex items-center gap-2">
        <button
          onClick={onResetToGalaxy}
          className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-colors flex items-center justify-center shrink-0"
          title="Ver Toda la Galaxia Dynamind"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
        </button>

        <button
          onClick={() => {
            if (onOpenConsultingModal) {
              onOpenConsultingModal(service);
            }
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
        >
          <span>Cotizar este Sistema</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
