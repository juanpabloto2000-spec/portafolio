import React from 'react';

export default function HyperframeHUDContainer({ 
  children, 
  className = '', 
  title = null, 
  telemetry = null,
  showLaser = true 
}) {
  return (
    <div className={`relative border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl rounded-2xl overflow-hidden glow-card ${className}`}>
      
      {/* 4 Brackets de Esquina Tácticos de Titanio */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

      {/* Línea Láser de Escaneo Luminiscente */}
      {showLaser && <div className="hyperframe-laser" />}

      {/* Barra Superior Solo Cuando Sea Estrictamente Necesario */}
      {(title || telemetry) && (
        <div className="px-5 py-2.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between font-mono text-[10px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider">{title}</span>
          </div>
          {telemetry && <span className="text-cyan-400 font-mono">{telemetry}</span>}
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}
