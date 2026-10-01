// src/components/systems/EphemerisHierarchyPanel.jsx
// Panel jerárquico lateral inspirado en ephemeris-explorer:
// Árbol interactivo del Sistema Solar con botones de enfoque de cámara (⌖),
// conmutador de trayectorias (○) y desglose de sistemas de IA soberana de Dynamind.

import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, Crosshair, Eye, Info, Sparkles, Orbit, Sun } from "lucide-react";
import { CELESTIAL_BODIES } from "../../data/solarSystemData";

export default function EphemerisHierarchyPanel({
  selectedBodyId,
  onSelectBody,
  showTrajectories,
  onToggleTrajectories,
  isOpen,
  onToggleOpen,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedSections, setCollapsedSections] = useState({
    core: false,
    planets: false,
    moons: false,
  });

  const toggleSection = (sec) => {
    setCollapsedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Filtrado reactivo
  const filteredBodies = CELESTIAL_BODIES.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.displayName.toLowerCase().includes(q) ||
      b.system.name.toLowerCase().includes(q) ||
      b.system.category.toLowerCase().includes(q) ||
      b.system.bottleneckD0.toLowerCase().includes(q)
    );
  });

  const coreBodies = filteredBodies.filter((b) => b.type === "star");
  const planetBodies = filteredBodies.filter((b) => b.type === "rocky_planet" || b.type === "gas_giant" || b.type === "ice_giant");
  const moonBodies = filteredBodies.filter((b) => b.type === "moon");

  return (
    <aside
      className={`absolute top-4 left-4 z-30 transition-all duration-300 flex flex-col ${
        isOpen ? "w-80 md:w-96 max-h-[calc(100%-2rem)]" : "w-12 h-12"
      }`}
    >
      {/* Botón flotante para abrir/cerrar cuando está colapsado */}
      {!isOpen ? (
        <button
          onClick={onToggleOpen}
          title="Abrir Explorador Jerárquico de Sistemas (Ephemeris Tree)"
          className="w-12 h-12 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center transition-all group"
        >
          <Orbit className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        </button>
      ) : (
        <div className="flex flex-col h-full bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Cabecera Táctica del Panel */}
          <div className="p-3.5 border-b border-white/10 bg-gradient-to-r from-neutral-900/90 to-neutral-950/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Orbit className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  Ephemeris Tree <span className="text-[10px] text-cyan-400 font-normal">// 16 Nodos</span>
                </h3>
                <p className="text-[10px] text-neutral-400 font-mono">Jerarquía Cósmica de Sistemas</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onToggleTrajectories}
                title={showTrajectories ? "Ocultar Órbitas 3D (○)" : "Mostrar Órbitas 3D (○)"}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors ${
                  showTrajectories
                    ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                    : "bg-neutral-900 border-white/10 text-neutral-500 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onToggleOpen}
                title="Plegar Panel Lateral"
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 text-xs font-mono transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Buscador Rápido de Sistemas / Planetas */}
          <div className="p-3 border-b border-white/5 bg-neutral-950/60">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar planeta, sistema o cuello D0..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/80 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Árbol Jerárquico Desplazable */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 space-y-3">
            {/* SECCIÓN 1: NÚCLEO SOBERANO (SOL) */}
            {coreBodies.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection("core")}
                  className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold px-2 py-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    Núcleo Soberano (Sol)
                  </span>
                  {collapsedSections.core ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {!collapsedSections.core && (
                  <div className="mt-1 space-y-1 pl-1">
                    {coreBodies.map((b) => (
                      <CelestialTreeItem
                        key={b.id}
                        body={b}
                        isSelected={selectedBodyId === b.id}
                        onSelect={() => onSelectBody(b.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECCIÓN 2: PLANETAS MAYORES & OPERATIONAL CORE */}
            {planetBodies.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection("planets")}
                  className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Sistemas Mayores (Planetas)
                  </span>
                  {collapsedSections.planets ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {!collapsedSections.planets && (
                  <div className="mt-1 space-y-1 pl-1">
                    {planetBodies.map((b) => (
                      <CelestialTreeItem
                        key={b.id}
                        body={b}
                        isSelected={selectedBodyId === b.id}
                        onSelect={() => onSelectBody(b.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECCIÓN 3: SATÉLITES Y AGENTES DE TAREA ESPECÍFICA */}
            {moonBodies.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection("moons")}
                  className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold px-2 py-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Orbit className="w-3.5 h-3.5 text-emerald-400" />
                    Micro-Agentes (Lunas / Satélites)
                  </span>
                  {collapsedSections.moons ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {!collapsedSections.moons && (
                  <div className="mt-1 space-y-1 pl-1">
                    {moonBodies.map((b) => (
                      <CelestialTreeItem
                        key={b.id}
                        body={b}
                        isSelected={selectedBodyId === b.id}
                        onSelect={() => onSelectBody(b.id)}
                        isSubLevel
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pie del Panel: Estado Táctico */}
          <div className="p-2.5 border-t border-white/10 bg-neutral-950/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WebGL OrbitControls
            </span>
            <span className="text-cyan-400">Clic en ⌖ para centrar</span>
          </div>
        </div>
      )}
    </aside>
  );
}

function CelestialTreeItem({ body, isSelected, onSelect, isSubLevel = false }) {
  return (
    <div
      onClick={onSelect}
      className={`group w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-cyan-500/15 border-cyan-500/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          : "bg-white/[0.02] border-white/5 text-neutral-300 hover:bg-white/[0.06] hover:border-white/15"
      } ${isSubLevel ? "ml-2.5 w-[calc(100%-0.625rem)] border-dashed" : ""}`}
    >
      <div className="flex items-center gap-2 min-w-0 pr-2">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${
            body.type === "star"
              ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]"
              : body.type === "moon"
              ? "bg-emerald-400 shadow-[0_0_6px_#10b981]"
              : "bg-cyan-400 shadow-[0_0_6px_#06b6d4]"
          }`}
        />
        <div className="truncate">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-semibold text-white tracking-tight">
              {body.displayName}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              ({body.englishName})
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 truncate font-sans">
            {body.system.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          title={`Enfocar cámara 3D en ${body.displayName}`}
          className={`p-1 rounded-md border text-[11px] font-mono transition-colors ${
            isSelected
              ? "bg-cyan-400 text-black border-cyan-300 font-bold"
              : "bg-neutral-900 border-white/10 text-neutral-400 group-hover:text-white group-hover:border-cyan-500/30"
          }`}
        >
          <Crosshair className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
