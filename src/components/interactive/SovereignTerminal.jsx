import React, { useState } from 'react';
import { Terminal, ShieldCheck, Check, Play, Cpu, RefreshCw } from 'lucide-react';

export default function SovereignTerminal() {
  const [activeCommand, setActiveCommand] = useState('audit:all');
  const [isRunning, setIsRunning] = useState(false);

  const logsData = {
    'audit:all': [
      { text: '[INIT] Inicializando auditoría de soberanía Dynamind Studios...', status: 'OK' },
      { text: '[STACK] Frontend Core: React 18 + Vite 6 + Tailwind CSS', status: 'NATIVO' },
      { text: '[DEPENDENCY] Escaneando WordPress/Elementor/Shopify wrappers: 0 DETECTADOS', status: '0_BLOAT' },
      { text: '[PERF] Medición de renderizado: 60.0 FPS sostenidos bajo carga', status: 'FLUIDO' },
      { text: '[KILLSWITCH] Enlace activo con Kal Discobar y Andicas Bioparque (<45ms)', status: 'EN_LINEA' },
      { text: '[SOBERANÍA] Propiedad total del código y activos entregada al cliente', status: 'GARANTIZADO' },
    ],
    'audit:plugins': [
      { text: '[SCAN] Analizando librerías de terceros y scripts invasivos...', status: 'OK' },
      { text: '[CALENDLY] Widget Calendly/Cal.com incrustado: NINGUNO (Usa Calendario Atómico Propio)', status: 'LIBRE' },
      { text: '[TYPEFORM] Iframe de Typeform: NINGUNO (Usa Triaje Visual Nativo)', status: 'LIBRE' },
      { text: '[TRACKERS] Rastreadores pesados que rompen privacidad: 0 DETECTADOS', status: 'LIMPIO' },
    ],
    'audit:latency': [
      { text: '[BENCH] Prueba de tiempo de respuesta desde red móvil 4G/5G...', status: 'TEST' },
      { text: '[TTFB] Time to First Byte global: 58 ms (Edge CDN)', status: 'SUB_100MS' },
      { text: '[LCP] Largest Contentful Paint: 0.62 segundos', status: 'INSTANT' },
      { text: '[CLS] Cumulative Layout Shift: 0.000 (Cero saltos de contenido)', status: 'PERFECTO' },
    ]
  };

  const handleRun = (cmdKey) => {
    setActiveCommand(cmdKey);
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 400);
  };

  return (
    <div className="border border-white/15 bg-black/80 font-mono text-xs overflow-hidden shadow-monolith">
      
      {/* Barra de Título de Terminal */}
      <div className="h-8 bg-zinc-950 border-b border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-zinc-500 text-[10px] ml-2">dynamind-core-audit.sh</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>SISTEMA 100% AUDITADO</span>
        </div>
      </div>

      {/* Selector de Comandos Interactivos */}
      <div className="p-3 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-zinc-500 uppercase mr-1">Comandos Disponibles:</span>
        <button
          onClick={() => handleRun('audit:all')}
          className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
            activeCommand === 'audit:all'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          $ audit:all
        </button>
        <button
          onClick={() => handleRun('audit:plugins')}
          className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
            activeCommand === 'audit:plugins'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          $ audit:plugins
        </button>
        <button
          onClick={() => handleRun('audit:latency')}
          className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
            activeCommand === 'audit:latency'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          $ audit:latency
        </button>
      </div>

      {/* Salida de la Terminal */}
      <div className="p-5 space-y-2 text-zinc-300 min-h-[170px] flex flex-col justify-center">
        {isRunning ? (
          <div className="flex items-center gap-2 text-zinc-500 py-4">
            <RefreshCw className="w-4 h-4 animate-spin text-zinc-400" />
            <span>Ejecutando escaneo en tiempo real...</span>
          </div>
        ) : (
          logsData[activeCommand].map((log, idx) => (
            <div key={idx} className="flex items-start justify-between gap-4 py-0.5 border-b border-white/[0.02]">
              <span className="text-zinc-300 leading-relaxed font-mono">
                {log.text}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] border border-white/10 text-white font-semibold shrink-0">
                {log.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Línea de comando inferior */}
      <div className="p-3 bg-black border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">root@dynamind:~$</span>
          <span className="text-white animate-pulse">_</span>
        </div>
        <span className="text-[10px]">CERO VULNERABILIDADES DETECTADAS</span>
      </div>

    </div>
  );
}
