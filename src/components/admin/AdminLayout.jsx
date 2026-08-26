import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Bot, LayoutDashboard, Palette, LogOut, Globe, 
  ArrowLeft, ShieldCheck, Sparkles, ChevronRight, Users 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AppointmentsManager from './AppointmentsManager';
import AgentBrainSettings from './AgentBrainSettings';
import AgentDashboard from './AgentDashboard';
import PageContentEditor from './PageContentEditor';
import UserManagement from './UserManagement';
import logoImg from '/logo-transparent.png';

export default function AdminLayout() {
  const { 
    activeAdminTab, 
    setActiveAdminTab, 
    setCurrentView, 
    logout,
    auth
  } = useApp();

  const [imgError, setImgError] = useState(false);

  // 5 Main Backend Navigation Items
  const navItems = [
    {
      id: 'dashboard',
      emoji: '📊',
      label: 'Dashboard & Monitoreo',
      sublabel: 'Métricas 30D y control humano'
    },
    {
      id: 'appointments',
      emoji: '📅',
      label: 'Agendas & Calendario',
      sublabel: 'Semana, mes y estados'
    },
    {
      id: 'agent-brain',
      emoji: '🧠',
      label: 'Cerebro del Agente IA',
      sublabel: 'Prompts, FAQs y horarios'
    },
    {
      id: 'page-editor',
      emoji: '🎨',
      label: 'Editar Página',
      sublabel: 'Textos, fotos y estética'
    },
    {
      id: 'user-management',
      emoji: '👥',
      label: 'Administrar Usuarios',
      sublabel: 'Control remoto de sitios y pagos'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col lg:flex-row">
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 bg-[#09090c] border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex flex-col justify-between shrink-0 select-none">
        
        <div>
          {/* Studio Brand Header with Blood-Red OWNER Tag */}
          <div className="flex items-center gap-3 mb-8 p-2 rounded-2xl">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              {!imgError ? (
                <img 
                  src={logoImg} 
                  alt="Dynamind Studios Logo" 
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain filter drop-shadow-md" 
                />
              ) : (
                <span className="font-bold font-heading-luxury text-base text-white">D</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold font-heading-luxury text-white leading-tight">
                  Dynamind
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black tracking-wider bg-red-950/90 text-red-500 border border-red-700/60 shadow-[0_0_10px_rgba(220,38,38,0.4)] uppercase">
                  OWNER
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">Control Central</p>
            </div>
          </div>

          {/* Minimalist Navigation Buttons */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeAdminTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                    isActive
                      ? 'bg-white text-black font-semibold border-white shadow-metal-glow scale-[1.01]'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="text-lg shrink-0">{item.emoji}</span>
                  <div>
                    <div className="text-xs font-bold leading-tight">{item.label}</div>
                    <div className={`text-[10px] font-light mt-0.5 ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                      {item.sublabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom User & Exit Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
          
          <div className="px-2 py-1.5 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Operador:</span>
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
        <motion.div
          key={activeAdminTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeAdminTab === 'dashboard' && <AgentDashboard />}
          {activeAdminTab === 'appointments' && <AppointmentsManager />}
          {activeAdminTab === 'agent-brain' && <AgentBrainSettings />}
          {activeAdminTab === 'page-editor' && <PageContentEditor />}
          {activeAdminTab === 'user-management' && <UserManagement />}
        </motion.div>
      </main>

    </div>
  );
}
