// src/components/systems/PlanetTelemetryCard.jsx
// Tarjeta de telemetría holográfica inspirada en PlanetCard.vue (SolarSystem) y ephemeris-explorer:
// Muestra la imagen oficial del cuerpo celeste, sus métricas astronómicas reales
// y el desglose profundo del sistema de software y consultoría de IA de Dynamind.

import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sun,
  Flame,
  Globe,
  Compass,
} from "lucide-react";
import { CELESTIAL_BODIES } from "../../data/solarSystemData";

export default function PlanetTelemetryCard({ selectedBodyId, onClose, onOpenConsultingModal }) {
  const [activeTab, setActiveTab] = useState("system"); // "system" | "astronomy"

  const body = CELESTIAL_BODIES.find((b) => b.id === selectedBodyId) || CELESTIAL_BODIES[0];

  return (
    <div className="absolute top-4 bottom-4 right-4 z-30 w-[92%] sm:w-[420px] max-h-[calc(100%-2rem)] flex flex-col bg-neutral-950/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden animate-slide-up">
      {/* Cabecera con Foto Oficial del Planeta & Identidad */}
      <div className="relative h-36 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 p-4 border-b border-white/10 flex items-center justify-between overflow-hidden">
        {/* Halo luminoso de fondo */}
        <div
          className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            backgroundColor:
              body.type === "star" ? "#f59e0b" : body.type === "moon" ? "#10b981" : "#06b6d4",
          }}
        />

        {/* Imagen oficial del cuerpo celeste */}
        <div className="flex items-center gap-3.5 z-10">
          <div className="relative w-20 h-20 rounded-2xl bg-black/60 border border-white/15 p-1.5 flex items-center justify-center shadow-inner group">
            <img
              src={`/assets/solar/cards/${body.id}.png`}
              alt={body.displayName}
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                {body.badge}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {body.displayName}
              <span className="text-xs font-mono text-neutral-400 font-normal">
                ({body.englishName})
              </span>
            </h2>
            <p className="text-xs text-neutral-300 line-clamp-1 font-sans">{body.caption}</p>
          </div>
        </div>

        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="z-10 p-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors"
          title="Cerrar Ficha de Telemetría"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Switcher de Pestañas: Sistema Dynamind vs Telemetría Astronómica */}
      <div className="flex border-b border-white/10 bg-neutral-900/60 p-1">
        <button
          onClick={() => setActiveTab("system")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === "system"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          ⚡ Solución Dynamind
        </button>
        <button
          onClick={() => setActiveTab("astronomy")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === "astronomy"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          🔭 Datos Astronómicos
        </button>
      </div>

      {/* Cuerpo Desplazable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {activeTab === "system" ? (
          <>
            {/* Título del Sistema y Tagline */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {body.system.name}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {body.system.tagline}
              </p>
            </div>

            {/* Cuello de Botella Operativo (D0) */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Cuello de Botella Erradicado (D0)
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                {body.system.bottleneckD0}
              </p>
            </div>

            {/* Pipeline de 4 Fases */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Pipeline de Implementación
              </div>
              <div className="grid grid-cols-2 gap-2">
                {body.system.pipeline.map((phase) => (
                  <div
                    key={phase.step}
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-cyan-400">
                        {phase.step}
                      </span>
                      <span className="font-mono text-[11px] text-white font-medium truncate">
                        {phase.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 line-clamp-2 leading-tight">
                      {phase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacidades Garantizadas */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Capacidades Garantizadas
              </div>
              <ul className="space-y-1.5">
                {body.system.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-neutral-300 leading-snug"
                  >
                    <span className="text-emerald-400 text-xs mt-0.5">•</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tecnológico */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Stack de Ingeniería
              </div>
              <div className="flex flex-wrap gap-1.5">
                {body.system.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900 border border-white/10 text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Caja de Métrica Clave */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-neutral-900 to-neutral-900 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase">Impacto Medible</p>
                <p className="text-sm font-bold text-white font-mono">
                  {body.system.metrics.headline}
                </p>
                <p className="text-[10px] text-neutral-400">{body.system.metrics.subtext}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                  {body.system.metrics.speed}
                </span>
              </div>
            </div>
          </>
        ) : (
          /* Pestaña: Datos Astronómicos Reales */
          <div className="space-y-3 font-mono text-xs">
            <p className="text-neutral-300 leading-relaxed font-sans text-xs">
              {body.description}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {Object.entries(body.astronomy).map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    {k.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="text-xs font-bold text-white mt-0.5">{String(v)}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
              <p className="text-[10px] text-cyan-400 uppercase">Parámetros de Simulación 3D</p>
              <div className="text-[11px] text-neutral-300 space-y-0.5">
                <p>• Radio Orbital Escalado: {body.orbit.scaledOrbitalRadius} UA Sim</p>
                <p>• Velocidad Orbital: {body.orbit.orbitalVelocity} km/s</p>
                <p>• Inclinación Axial: {body.orbit.axialTilt}°</p>
                <p>• Inclinación Orbital: {body.orbit.orbitalInclination}°</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pie del Drawer: Botón de Llamada a la Acción (CTA) */}
      <div className="p-3.5 border-t border-white/10 bg-neutral-950/95 flex items-center gap-2">
        <button
          onClick={() => {
            if (onOpenConsultingModal) {
              onOpenConsultingModal(body);
            }
          }}
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all"
        >
          <span>Cotizar / Diseñar este Sistema</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
