// src/components/systems/SolarTimeControlsBar.jsx
// Barra superior de control temporal y modos de cámara inspirada en SolarSystem y ephemeris-explorer:
// Control de velocidad orbital, auto-tour cinemático y modos de vista.

import React from "react";
import { Play, Pause, FastForward, RotateCcw, Compass, Sun, Orbit, Eye } from "lucide-react";
import { CELESTIAL_BODIES } from "../../data/solarSystemData";

export default function SolarTimeControlsBar({
  speedMultiplier,
  onChangeSpeed,
  isAutoTourActive,
  onToggleAutoTour,
  onResetToSun,
  selectedBodyId,
  cameraViewMode,
  onChangeCameraMode,
  showTrajectories,
  onToggleTrajectories,
}) {
  const currentBody = CELESTIAL_BODIES.find((b) => b.id === selectedBodyId) || CELESTIAL_BODIES[0];
  const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBodyId) + 1;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-wrap items-center justify-center gap-2 max-w-[calc(100%-2rem)]">
      {/* 1. Selector de Cámara (Órbita vs Cenital) */}
      <div className="flex items-center bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-lg">
        <button
          onClick={() => onChangeCameraMode(cameraViewMode === "topdown" ? "orbit" : "topdown")}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            cameraViewMode === "topdown"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              : "text-neutral-400 hover:text-white"
          }`}
          title="Alternar entre Vista Eclíptica 3D y Vista Cenital Orbital (Top-Down)"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {cameraViewMode === "topdown" ? "Vista Cenital" : "Vista Eclíptica"}
          </span>
        </button>

        <button
          onClick={onToggleTrajectories}
          className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
            showTrajectories
              ? "text-cyan-400 hover:text-cyan-300"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
          title={showTrajectories ? "Ocultar Órbitas 3D" : "Mostrar Órbitas 3D"}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Control de Velocidad Orbital */}
      <div className="flex items-center bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-lg">
        <button
          onClick={() => onChangeSpeed(speedMultiplier === 0 ? 1 : 0)}
          className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
            speedMultiplier === 0
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "text-neutral-400 hover:text-white"
          }`}
          title={speedMultiplier === 0 ? "Reanudar Simulación" : "Pausar Simulación"}
        >
          {speedMultiplier === 0 ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <div className="h-4 w-px bg-white/10 mx-1" />

        {[
          { label: "1x", speed: 1 },
          { label: "5x", speed: 5 },
          { label: "15x", speed: 15 },
        ].map((item) => (
          <button
            key={item.speed}
            onClick={() => onChangeSpeed(item.speed)}
            className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
              speedMultiplier === item.speed
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 3. Botón de Auto-Tour Cinemático */}
      <button
        onClick={onToggleAutoTour}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-lg border ${
          isAutoTourActive
            ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse"
            : "bg-neutral-950/90 backdrop-blur-md text-amber-400 border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400"
        }`}
        title="Activar recorrido cinemático automatizado por los 16 sistemas"
      >
        <FastForward className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">
          {isAutoTourActive ? "DETENER TOUR" : "AUTO-TOUR 3D"}
        </span>
      </button>

      {/* 4. Botón de Reset al Sol / Núcleo Soberano */}
      <button
        onClick={onResetToSun}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-white/10 hover:border-amber-400/50 text-white hover:text-amber-300 text-xs font-mono font-medium shadow-lg transition-all"
        title="Centrar la cámara en el Núcleo Soberano (El Sol)"
      >
        <Sun className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden md:inline">NÚCLEO SOBERANO</span>
      </button>

      {/* 5. Badge del Cuerpo Actual */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-cyan-500/30 shadow-lg font-mono text-xs">
        <span className="text-neutral-500">[{String(currentIndex).padStart(2, "0")}/16]</span>
        <span className="text-white font-bold">{currentBody.displayName}</span>
        <span className="text-cyan-400 text-[10px] uppercase px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
          {currentBody.system.category}
        </span>
      </div>
    </div>
  );
}
