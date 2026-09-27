import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadsPipelineView from './LeadsPipelineView';
import AtomicCalendarView from './AtomicCalendarView';
import WhatsAppAgentTrainingView from './WhatsAppAgentTrainingView';
import UniversalPageCMSView from './UniversalPageCMSView';
import TacticalSettingsView from './TacticalSettingsView';
import KillSwitchPanel from '../../modules/killswitch/KillSwitchPanel';
import { 
  Users, Calendar, Zap, Settings, LogOut, ArrowLeft, 
  Terminal, ShieldCheck, Clock, Radio, Activity, Bot, Globe, Sparkles 
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Navegación limpia de autor: sin etiquetas ni badges superfluos
  const navItems = [
    { id: 'pipeline', label: 'Pipeline & Métricas', icon: Users },
    { id: 'calendar', label: 'Calendario Atómico', icon: Calendar },
    { id: 'bot_training', label: 'Agente WhatsApp IA', icon: Bot },
    { id: 'universal_cms', label: 'CMS Universal', icon: Globe },
    { id: 'killswitch', label: 'Kill Switch Maestro', icon: Zap },
    { id: 'settings', label: 'Seguridad & Claves', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-transparent text-platinum flex flex-col font-mono selection:bg-white/20 relative z-10">
      
      {/* Barra de Telemetría Superior Glassmorphism */}
      <header className="h-16 border-b border-white/10 bg-black/45 backdrop-blur-xl px-6 flex items-center justify-between z-30 shadow-2xl">
        
        {/* Identidad del Panel */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <img 
              src="/logo sin fondo.png" 
              alt="Dynamind Logo" 
              className="w-5 h-5 object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
              Dynamind Studios
            </span>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest hidden sm:inline font-bold">
              // BÚNKER TÁCTICO DSB
            </span>
          </div>
        </div>

        {/* Telemetría Central / Reloj */}
        <div className="hidden md:flex items-center gap-6 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-white font-bold">{currentTime} COL (GMT-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold tracking-wider">CORE OPERATIVO ACTIVO</span>
          </div>
        </div>

        {/* Acciones de Salida */}
        <div className="flex items-center gap-3">
          <a
            href="/#/"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white text-xs uppercase tracking-wider rounded-xl transition-all duration-200 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ver Web Comercial</span>
          </a>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-950/40 border border-red-800/60 hover:bg-red-900/50 text-red-300 text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer backdrop-blur-md"
            title="Cerrar Sesión Segura"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>

      </header>

      {/* Contenedor Principal: Sidebar Glassmorphism + Contenido Dinámico */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Táctico */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/35 backdrop-blur-2xl p-4 space-y-6 shrink-0">
          
          {/* Tarjeta del Operador con Hyperframes */}
          <div className="p-3.5 bg-white/[0.025] border border-white/10 rounded-2xl space-y-1 relative overflow-hidden glow-card">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">OPERADOR AUTORIZADO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white uppercase truncate">Juan Pablo</div>
            <div className="text-[10px] text-cyan-400 font-mono">Lead Systems Architect</div>
          </div>

          {/* Navegación de Pestañas Limpia */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'bg-white/10 text-white border-cyan-400/40 font-bold shadow-[0_0_20px_rgba(56,189,248,0.15)] scale-[1.01] backdrop-blur-md'
                      : 'bg-white/[0.015] text-zinc-400 border-white/5 hover:text-white hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  {isSelected && (
                    <motion.span 
                      layoutId="activeTabIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/10 text-[10px] text-zinc-500 space-y-1 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SISTEMA: Dynamind Cloud</span>
            </div>
            <div>VERSIÓN: 2.3.0 Soberana</div>
          </div>

        </aside>

        {/* Zona de Trabajo Dinámica con Transiciones Fluidas */}
        <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {activeTab === 'pipeline' && <LeadsPipelineView />}
              {activeTab === 'calendar' && <AtomicCalendarView />}
              {activeTab === 'bot_training' && <WhatsAppAgentTrainingView />}
              {activeTab === 'universal_cms' && <UniversalPageCMSView />}
              {activeTab === 'killswitch' && <KillSwitchPanel />}
              {activeTab === 'settings' && <TacticalSettingsView />}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

    </div>
  );
}
