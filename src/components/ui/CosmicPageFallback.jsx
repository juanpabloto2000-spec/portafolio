import React from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function CosmicPageFallback({ message = 'INICIALIZANDO SUBSISTEMA...' }) {
  const themeContext = useThemeLanguage?.();
  const isLight = themeContext?.isLight || false;

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 select-none">
      <div className="relative flex flex-col items-center space-y-4">
        
        {/* Halo de plasma en pulso */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${
            isLight ? 'bg-blue-400/30' : 'bg-purple-600/30'
          }`} />
          
          {/* Anillo de escaneo cuántico */}
          <div className={`w-12 h-12 rounded-full border-2 border-t-transparent animate-spin ${
            isLight ? 'border-indigo-600' : 'border-purple-400'
          }`} style={{ animationDuration: '900ms' }} />
          
          {/* Núcleo central brillante */}
          <div className={`w-2.5 h-2.5 rounded-full ${
            isLight ? 'bg-indigo-600' : 'bg-white shadow-[0_0_12px_rgba(168,85,247,0.8)]'
          }`} />
        </div>

        {/* Telemetría de Carga */}
        <div className="flex flex-col items-center space-y-1">
          <span className={`text-[11px] font-mono tracking-widest uppercase font-semibold ${
            isLight ? 'text-slate-600' : 'text-purple-300'
          }`}>
            {message}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span className={`text-[9px] font-mono ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
              DYNAMIND EDGE LOAD
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
