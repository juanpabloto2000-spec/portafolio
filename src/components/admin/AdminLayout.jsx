import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Bot, LayoutDashboard, LogOut, Globe, ArrowLeft, 
  ShieldCheck, Sparkles, ChevronRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AppointmentsManager from './AppointmentsManager';
import AgentBrainSettings from './AgentBrainSettings';
import AgentDashboard from './AgentDashboard';

export default function AdminLayout() {
  const { 
    activeAdminTab, 
    setActiveAdminTab, 
    setCurrentView, 
    logout,
    auth,
    metrics
  } = useApp();

  const navItems = [
    {
      id: 'appointments',
      label: 'Agendas & Calendario',
      sublabel: 'Semana, mes y estados',
      icon: Calendar,
      badge: metrics.pendingCount > 0 ? `${metrics.pendingCount} pendientes` : null
    },
    {
      id: 'agent-brain',
      label: 'Cerebro del Agente IA',
      sublabel: 'Prompts, FAQs y horarios',
      icon: Bot,
      badge: null
    },
    {
      id: 'dashboard',
      label: 'Dashboard & Monitoreo',
      sublabel: 'Métricas 30D y control humano',
      icon: LayoutDashboard,
      badge: `${metrics.conversationsLast30Days} chats`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col lg:flex-row">
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 bg-[#09090c] border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex flex-col justify-between shrink-0">
        
        <div>
          {/* Studio Brand Header */}
          <div className="flex items-center gap-3 mb-8 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/15 overflow-hidden flex items-center justify-center shadow-inner">
              <img src="/logo.jpeg" alt="Dynamind" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-heading-luxury text-white">Dynamind Studios</h1>
              <p className="text-[10px] text-zinc-400 font-mono">Panel Administrativo</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-zinc-500 uppercase px-2 mb-1">
              Módulos del Sistema
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-white text-black font-semibold border-white shadow-metal-glow scale-[1.01]'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-black text-white' : 'bg-white/5 text-zinc-400 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{item.label}</div>
                      <div className={`text-[10px] font-light mt-0.5 ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                      isActive ? 'bg-black/10 text-black' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom User & Exit Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
          
          <div className="px-2 py-1.5 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Usuario activo:</span>
            <span className="font-mono text-white font-medium">{auth.user?.name || 'Administrador'}</span>
          </div>

          <button
            onClick={() => {
              window.location.hash = '';
              setCurrentView('home');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Volver a la Web Pública</span>
          </button>

          <button
            onClick={() => {
              logout();
              window.location.hash = '';
            }}
            className="w-full py-2 px-3 rounded-xl text-xs text-red-400 hover:bg-red-500/10 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>

        </div>

      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto overflow-y-auto">
        {activeAdminTab === 'appointments' && <AppointmentsManager />}
        {activeAdminTab === 'agent-brain' && <AgentBrainSettings />}
        {activeAdminTab === 'dashboard' && <AgentDashboard />}
      </main>

    </div>
  );
}
