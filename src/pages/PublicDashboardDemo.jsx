// src/pages/PublicDashboardDemo.jsx
// Demo Virtual Interactiva del Core DSB de Dynamind para Clientes y Prospectos.
// Exactamente la MISMA ESTÉTICA que el DSB real (Estrellas de fondo, Glassmorphism, Reloj BOG GMT-5, Sidebar idéntico).
// Las 7 mismas secciones canónicas en modo plantilla limpia (sin textos redundantes).
// Retorno directo a /#/obras. Cero login.

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, Settings, ArrowLeft, 
  Layers, Clock, Bot, Globe, Search, Filter, 
  Plus, CheckCircle2, ChevronRight, Send, Smartphone,
  ShieldCheck, Lock, RefreshCw, Eye, Trash2, Key, Sliders, Languages
} from 'lucide-react';
import { playTap, playSuccess } from '../utils/audioEffects';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { DASHBOARD_DEMO_TRANSLATIONS } from '../data/translationsDashboardDemo';

export default function PublicDashboardDemo() {
  const { t, language, setLanguage } = useThemeLanguage();
  const dsbT = t?.dashboardDemo || DASHBOARD_DEMO_TRANSLATIONS[language] || DASHBOARD_DEMO_TRANSLATIONS.es;

  const [activeTab, setActiveTab] = useState('pipeline');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Reloj Cronométrico BOG GMT-5 con localización dinámica de fecha
  useEffect(() => {
    const localeMap = {
      es: 'es-ES',
      en: 'en-US',
      fr: 'fr-FR',
      de: 'de-DE',
      pt: 'pt-BR',
      ja: 'ja-JP',
    };
    const currentLocale = localeMap[language] || 'es-ES';

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      const dateFormatted = now.toLocaleDateString(currentLocale, { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
      setCurrentDate(dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // Secciones Canónicas de la Demo Localizadas
  const navItems = [
    { id: 'pipeline', label: dsbT.tabs?.pipeline || 'Pipeline & Métricas', icon: Users },
    { id: 'demo_factory', label: dsbT.tabs?.demo_factory || 'Fábrica de Demos & Cierres', icon: Layers },
    { id: 'calendar', label: dsbT.tabs?.calendar || 'Calendario Atómico', icon: Calendar },
    { id: 'bot_training', label: dsbT.tabs?.bot_training || 'Agente WhatsApp IA', icon: Bot },
    { id: 'universal_cms', label: dsbT.tabs?.universal_cms || 'CMS Universal', icon: Globe },
    { id: 'settings', label: dsbT.tabs?.settings || 'Seguridad & Claves', icon: Settings },
  ];

  // --------------------------------------------------------------------------
  // ESTADOS DE LA PLANTILLA LIMPIA (DATOS DE PRUEBA INTERACTIVOS)
  // --------------------------------------------------------------------------

  // 1. Pipeline de Leads de Prueba
  const [leadsList, setLeadsList] = useState([
    { id: 'LD-101', name: 'Hotel Hacienda Los Álamos', contact: 'Carlos Restrepo', phone: '+57 312 450 8890', stage: 'demo', value: '$18.500.000 COP' },
    { id: 'LD-102', name: 'Restaurante Cava de Autor', contact: 'Juliana Vélez', phone: '+57 300 890 1122', stage: 'propuesta', value: '$12.000.000 COP' },
    { id: 'LD-103', name: 'Clínica Dermatológica Dermis', contact: 'Dra. Sofía Mora', phone: '+57 315 220 7744', stage: 'cualificacion', value: '$15.000.000 COP' },
    { id: 'LD-104', name: 'Marca Personal Fitness Pro', contact: 'Andrés Henao', phone: '+57 320 660 3311', stage: 'cerrado', value: '$9.500.000 COP' },
  ]);

  const handleAddSampleLead = () => {
    playSuccess();
    const newId = `LD-${Math.floor(100 + Math.random() * 900)}`;
    setLeadsList(prev => [
      { id: newId, name: 'Nuevo Cliente Demo', contact: 'Operador Test', phone: '+57 300 000 0000', stage: 'cualificacion', value: '$14.000.000 COP' },
      ...prev
    ]);
  };

  const handleAdvanceStage = (leadId) => {
    playTap();
    setLeadsList(prev => prev.map(l => {
      if (l.id !== leadId) return l;
      const nextStage = l.stage === 'cualificacion' ? 'demo' : l.stage === 'demo' ? 'propuesta' : l.stage === 'propuesta' ? 'cerrado' : 'cualificacion';
      return { ...l, stage: nextStage };
    }));
  };

  // 2. Fábrica de Demos
  const [demoClientName, setDemoClientName] = useState('');
  const [demoSector, setDemoSector] = useState('hotel');
  const [demoGeneratedUrl, setDemoGeneratedUrl] = useState('');
  const [copiedDemo, setCopiedDemo] = useState(false);

  const handleGenerateDemo = (e) => {
    e.preventDefault();
    playSuccess();
    setCopiedDemo(false);
    const slug = (demoClientName.trim() || 'cliente').toLowerCase().replace(/[^a-z0-9]/g, '-');
    setDemoGeneratedUrl(`https://dynamind.studio/#/demo/${slug}`);
  };

  // 3. Calendario Atómico de Disponibilidad
  const [bookedSlots, setBookedSlots] = useState({
    'Lun-10:00': 'Cita: Carlos Restrepo',
    'Mie-15:00': 'Demo: Cava de Autor',
    'Vie-11:00': 'Onboarding: Fitness Pro'
  });

  const toggleCalendarSlot = (slotKey) => {
    playTap();
    setBookedSlots(prev => {
      const copy = { ...prev };
      if (copy[slotKey]) {
        delete copy[slotKey];
      } else {
        copy[slotKey] = dsbT.calendar?.bookedDefault || 'Reserva Bloqueada';
      }
      return copy;
    });
  };

  // 4. Agente WhatsApp IA con localización dinámica
  const [botPrompt, setBotPrompt] = useState(
    () => dsbT.bot?.defaultPrompt || 'Eres el asistente oficial de Dynamind Studios. Tu objetivo es cualificar clientes para desarrollo de software soberano, detectar su cuello de botella operativo (D0) y agendar llamada con Juan Pablo.'
  );

  const [chatMessages, setChatMessages] = useState([
    { sender: 'user', text: dsbT.bot?.initialUserMsg || 'Hola, me gustaría saber si desarrollan software para reservas de cabañas.' },
    { sender: 'bot', text: dsbT.bot?.initialBotMsg || '¡Hola! 🌲 Sí, construimos el Motor de Reservas Directas y PMS con calendario atómico y anticipo del 50%. ¿Cuántas cabañas tienes en operación actualmente?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Sincronizar mensajes iniciales y prompt al cambiar de idioma
  useEffect(() => {
    if (dsbT.bot?.defaultPrompt) {
      setBotPrompt(dsbT.bot.defaultPrompt);
    }
    if (dsbT.bot?.initialUserMsg && dsbT.bot?.initialBotMsg) {
      setChatMessages([
        { sender: 'user', text: dsbT.bot.initialUserMsg },
        { sender: 'bot', text: dsbT.bot.initialBotMsg }
      ]);
    }
  }, [language]);

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    playTap();
    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      playSuccess();
      const prefix = dsbT.bot?.botReplyPrefix || 'Entendido. Para';
      const suffix = dsbT.bot?.botReplySuffix || 'implementamos una arquitectura soberana en React y Supabase con sincronización a tu cuenta bancaria. ¿Deseas agendar un diagnóstico de 45 segundos?';
      setChatMessages(prev => [
        ...prev, 
        { sender: 'bot', text: `${prefix} "${userText.toLowerCase()}", ${suffix}` }
      ]);
    }, 900);
  };

  // 5. CMS Universal
  const [cmsHeroTitle, setCmsHeroTitle] = useState('Software Soberano de Producción');
  const [cmsHeroSubtitle, setCmsHeroSubtitle] = useState('Plataformas completas y agentes de IA autónomos con código 100% de tu propiedad.');
  const [cmsSavedToast, setCmsSavedToast] = useState(false);

  const handleSaveCMS = () => {
    playSuccess();
    setCmsSavedToast(true);
    setTimeout(() => setCmsSavedToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-transparent text-platinum flex flex-col font-mono selection:bg-white/20 relative z-10">
      
      {/* ============================================================== */}
      {/* BARRA DE TELEMETRÍA SUPERIOR GLASSMORPHISM (IDÉNTICA AL REAL)  */}
      {/* ============================================================== */}
      <header className="h-16 border-b border-white/10 bg-black/45 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-30 shadow-2xl sticky top-0">
        
        {/* Identidad del Panel */}
        <div className="flex items-center gap-3 shrink-0">
          <img 
            src="/logo sin fondo.png" 
            alt="Dynamind Logo" 
            style={{ height: '32px', width: 'auto' }}
            className="h-8 max-h-8 w-auto object-contain shrink-0 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.45)]"
          />
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-display font-extrabold text-sm uppercase tracking-wider whitespace-nowrap bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              Dynamind Studios
            </span>
          </div>
        </div>

        {/* ⏱️ RELOJ CRONOMÉTRICO CENTRAL DE ALTA PRECISIÓN */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-white/[0.04] via-cyan-950/20 to-white/[0.02] border border-white/10 shadow-[0_0_20px_rgba(56,189,248,0.08)] flex items-center gap-3 backdrop-blur-md group hover:border-cyan-400/40 transition-colors">
            
            {/* Indicador de pulso activo */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span className="text-[10px] text-zinc-400 font-sans tracking-wide">
                {currentDate}
              </span>
            </div>

            <span className="text-zinc-600">|</span>

            {/* Hora precisa a segundo real */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-white font-mono font-bold text-xs tracking-widest tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                {currentTime}
              </span>
            </div>

            <span className="text-zinc-600">|</span>

            {/* Badge de sincronización */}
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300 font-bold uppercase tracking-wider">
              {dsbT.timeZoneBadge || "BOG · GMT-5"}
            </span>
          </div>
        </div>

        {/* 🌐 SELECTOR RÁPIDO DE IDIOMA & 🔙 RETORNO DEDICADO A OBRAS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Selector de idioma interactivo del demo */}
          <div className="flex items-center gap-0.5 sm:gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {[
              { code: 'es', label: 'ES' },
              { code: 'en', label: 'EN' },
              { code: 'fr', label: 'FR' },
              { code: 'de', label: 'DE' },
              { code: 'pt', label: 'PT' },
              { code: 'ja', label: 'JA' },
            ].map((langItem) => (
              <button
                key={langItem.code}
                onClick={() => {
                  playTap();
                  setLanguage(langItem.code);
                }}
                className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  language === langItem.code
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                title={`Cambiar idioma a ${langItem.label}`}
              >
                {langItem.label}
              </button>
            ))}
          </div>

          <a
            href="/#/obras"
            onClick={playTap}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-white/[0.08] to-white/[0.04] border border-cyan-400/40 hover:border-cyan-300 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">{dsbT.backToWorks || 'Volver a Obras'}</span>
          </a>
        </div>

      </header>

      {/* ============================================================== */}
      {/* CONTENEDOR PRINCIPAL: SIDEBAR EXACTO + CONTENIDO MODULAR       */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Idéntico al Original */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/35 backdrop-blur-2xl p-4 space-y-6 shrink-0">
          
          {/* Tarjeta del Operador */}
          <div className="p-3.5 bg-white/[0.025] border border-white/10 rounded-2xl space-y-1 relative overflow-hidden glow-card">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                {dsbT.operatorBadge || 'OPERADOR DEMO'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white uppercase truncate">
              {dsbT.guestClient || 'Cliente Invitado'}
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              {dsbT.freeExploreMode || 'Modo Exploración Libre'}
            </div>
          </div>

          {/* Navegación de Pestañas Idéntica */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playTap();
                    setActiveTab(item.id);
                  }}
                  className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'bg-white/10 text-white border-cyan-400/40 font-bold shadow-[0_0_20px_rgba(56,189,248,0.15)] scale-[1.01] backdrop-blur-md'
                      : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:bg-white/[0.05] hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                    <span className="text-xs tracking-wide">{item.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Banner de Contacto Técnico */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">
              {dsbT.supportDirect || 'Soporte Directo'}
            </span>
            <a
              href="/#/diagnostico"
              onClick={playTap}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all"
            >
              <span>{dsbT.requestThisCore || 'Solicitar este Core'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

        </aside>

        {/* Área de Trabajo de la Sección Activa (Plantilla Limpia) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* ========================================================== */}
            {/* 1. SECCIÓN: PIPELINE & MÉTRICAS                            */}
            {/* ========================================================== */}
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* 4 KPIs Limpios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white/[0.025] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      {dsbT.pipeline?.kpiActiveLeads || 'Leads Activos'}
                    </span>
                    <div className="text-2xl font-bold text-cyan-400 font-mono">{leadsList.length}</div>
                    <span className="text-[10px] text-zinc-500">
                      {dsbT.pipeline?.kpiActiveDesc || 'Pipeline en tiempo real'}
                    </span>
                  </div>

                  <div className="p-5 bg-white/[0.025] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      {dsbT.pipeline?.kpiScheduledDemos || 'Demos Agendadas'}
                    </span>
                    <div className="text-2xl font-bold text-white font-mono">
                      {leadsList.filter(l => l.stage === 'demo').length}
                    </div>
                    <span className="text-[10px] text-emerald-400">
                      {dsbT.pipeline?.kpiScheduledDesc || '50% Tasa de avance'}
                    </span>
                  </div>

                  <div className="p-5 bg-white/[0.025] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      {dsbT.pipeline?.kpiOpenProposals || 'Propuestas Abiertas'}
                    </span>
                    <div className="text-2xl font-bold text-white font-mono">
                      {leadsList.filter(l => l.stage === 'propuesta').length}
                    </div>
                    <span className="text-[10px] text-amber-400">
                      {dsbT.pipeline?.kpiOpenDesc || 'En negociación'}
                    </span>
                  </div>

                  <div className="p-5 bg-white/[0.025] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      {dsbT.pipeline?.kpiSimulatedRevenue || 'Facturación Simulada'}
                    </span>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">
                      {language === 'es' ? '$55.000.000 COP' : '$14,500 USD'}
                    </div>
                    <span className="text-[10px] text-zinc-500">
                      {dsbT.pipeline?.kpiSimulatedDesc || 'Valor de cartera'}
                    </span>
                  </div>
                </div>

                {/* Barra de Acciones y Filtro */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {dsbT.pipeline?.kanbanTitle || 'Tablero Kanban de Leads'}
                    </span>
                  </div>

                  <button
                    onClick={handleAddSampleLead}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{dsbT.pipeline?.addLeadBtn || '+ Añadir Lead de Prueba'}</span>
                  </button>
                </div>

                {/* Columnas Kanban Limpias */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { key: 'cualificacion', label: dsbT.pipeline?.col1 || '1. Cualificación', color: 'border-blue-500/40 text-blue-400' },
                    { key: 'demo', label: dsbT.pipeline?.col2 || '2. Demostración', color: 'border-cyan-500/40 text-cyan-400' },
                    { key: 'propuesta', label: dsbT.pipeline?.col3 || '3. Propuesta', color: 'border-amber-500/40 text-amber-400' },
                    { key: 'cerrado', label: dsbT.pipeline?.col4 || '4. Cerrado', color: 'border-emerald-500/40 text-emerald-400' },
                  ].map((col) => {
                    const colLeads = leadsList.filter(l => l.stage === col.key);
                    return (
                      <div key={col.key} className="p-3.5 rounded-2xl bg-white/[0.015] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>{col.label}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono">{colLeads.length}</span>
                        </div>

                        <div className="space-y-2.5">
                          {colLeads.length === 0 ? (
                            <div className="p-4 border border-dashed border-white/10 rounded-xl text-center text-[10px] text-zinc-500 font-sans">
                              {dsbT.pipeline?.emptyCol || 'Sin prospectos en esta etapa'}
                            </div>
                          ) : (
                            colLeads.map(l => (
                              <div
                                key={l.id}
                                onClick={() => handleAdvanceStage(l.id)}
                                title={dsbT.pipeline?.advanceTooltip || "Haz clic para avanzar de etapa"}
                                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer space-y-1.5 group"
                              >
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-cyan-400 font-bold font-mono">{l.id}</span>
                                  <span className="text-zinc-500 font-mono">{l.value}</span>
                                </div>
                                <div className="text-xs text-white font-bold truncate">{l.name}</div>
                                <div className="text-[11px] text-zinc-400 font-sans">{l.contact}</div>
                                <div className="text-[10px] text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
                                  <span>{l.phone}</span>
                                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {dsbT.pipeline?.advanceBtn || 'Avanzar →'}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* 2. SECCIÓN: FÁBRICA DE DEMOS & CIERRES                     */}
            {/* ========================================================== */}
            {activeTab === 'demo_factory' && (
              <motion.div
                key="demo_factory"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl space-y-6"
              >
                <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {dsbT.demoFactory?.title || 'Generador de Demos Personalizadas'}
                    </h3>
                  </div>

                  <form onSubmit={handleGenerateDemo} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                          {dsbT.demoFactory?.clientNameLabel || 'Nombre del Cliente / Marca'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={dsbT.demoFactory?.clientNamePlaceholder || 'Ej: Glamping El Refugio'}
                          value={demoClientName}
                          onChange={(e) => setDemoClientName(e.target.value)}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                          {dsbT.demoFactory?.sectorLabel || 'Sector / Módulo'}
                        </label>
                        <select
                          value={demoSector}
                          onChange={(e) => setDemoSector(e.target.value)}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="hotel">{dsbT.demoFactory?.sectorHotel || 'Glamping & Hotelería (Motor de Reservas + PMS)'}</option>
                          <option value="gastro">{dsbT.demoFactory?.sectorGastro || 'Gastrobar & Restaurante (Menú QR + KDS)'}</option>
                          <option value="clinic">{dsbT.demoFactory?.sectorClinic || 'Clínica Estética (Triaje Visual + Odómetro)'}</option>
                          <option value="brand">{dsbT.demoFactory?.sectorBrand || 'Marca Personal / Consultoría (Funnel de Autor)'}</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {dsbT.demoFactory?.generateBtn || 'Generar Enlace Demo'}
                    </button>
                  </form>

                  {demoGeneratedUrl && (
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                      <span className="text-[10px] text-cyan-300 font-bold uppercase block">
                        {dsbT.demoFactory?.readyLabel || 'Enlace de Demostración Listo:'}
                      </span>
                      <div className="flex items-center justify-between gap-2 p-2 bg-black/40 rounded-lg border border-white/10 text-xs font-mono text-white">
                        <span className="truncate">{demoGeneratedUrl}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(demoGeneratedUrl);
                            playSuccess();
                            setCopiedDemo(true);
                            setTimeout(() => setCopiedDemo(false), 2000);
                          }}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] text-zinc-300 transition-colors cursor-pointer"
                        >
                          {copiedDemo ? (dsbT.demoFactory?.copiedBtn || '¡Copiado!') : (dsbT.demoFactory?.copyBtn || 'Copiar')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* 3. SECCIÓN: CALENDARIO ATÓMICO                             */}
            {/* ========================================================== */}
            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {dsbT.calendar?.title || 'Matriz Semanal de Citas & Reservas'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-sans">
                    {dsbT.calendar?.hint || 'Haz clic en un bloque para bloquear/liberar'}
                  </span>
                </div>

                <div className="overflow-x-auto border border-white/10 rounded-2xl bg-white/[0.015]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-white/[0.04] border-b border-white/10 text-zinc-400 text-[10px] uppercase">
                      <tr>
                        <th className="p-3">{dsbT.calendar?.scheduleHeader || 'Horario'}</th>
                        {[
                          { key: 'Lun', label: (dsbT.calendar?.days && dsbT.calendar.days[0]) || 'Lunes' },
                          { key: 'Mar', label: (dsbT.calendar?.days && dsbT.calendar.days[1]) || 'Martes' },
                          { key: 'Mie', label: (dsbT.calendar?.days && dsbT.calendar.days[2]) || 'Miércoles' },
                          { key: 'Jue', label: (dsbT.calendar?.days && dsbT.calendar.days[3]) || 'Jueves' },
                          { key: 'Vie', label: (dsbT.calendar?.days && dsbT.calendar.days[4]) || 'Viernes' },
                          { key: 'Sab', label: (dsbT.calendar?.days && dsbT.calendar.days[5]) || 'Sábado' },
                        ].map(d => (
                          <th key={d.key} className="p-3">{d.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(hour => (
                        <tr key={hour} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-bold text-zinc-400">{hour}</td>
                          {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(day => {
                            const slotKey = `${day}-${hour}`;
                            const isBooked = Boolean(bookedSlots[slotKey]);
                            const displaySlotText = isBooked
                              ? (bookedSlots[slotKey] === 'Reserva Bloqueada'
                                  ? (dsbT.calendar?.bookedDefault || 'Reserva Bloqueada')
                                  : bookedSlots[slotKey])
                              : (dsbT.calendar?.available || '+ Disponible');

                            return (
                              <td key={slotKey} className="p-2">
                                <button
                                  onClick={() => toggleCalendarSlot(slotKey)}
                                  className={`w-full p-2 rounded-lg text-[10px] font-sans font-medium transition-all text-left cursor-pointer ${
                                    isBooked
                                      ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                                      : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {displaySlotText}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* 4. SECCIÓN: AGENTE WHATSAPP IA                             */}
            {/* ========================================================== */}
            {activeTab === 'bot_training' && (
              <motion.div
                key="bot_training"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                {/* Configuración del Prompt */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {dsbT.bot?.title || 'Entrenamiento de Prompt'}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                      {dsbT.bot?.promptLabel || 'Instrucción Maestra del Agente'}
                    </label>
                    <textarea
                      rows={6}
                      value={botPrompt}
                      onChange={(e) => setBotPrompt(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-zinc-200 font-sans focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    onClick={() => {
                      playSuccess();
                      alert(dsbT.bot?.savedAlert || 'Instrucción del agente guardada localmente.');
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-bold transition-all cursor-pointer"
                  >
                    {dsbT.bot?.saveParamsBtn || 'Guardar Parámetros'}
                  </button>
                </div>

                {/* Simulador de Chat WhatsApp */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0b141a] border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
                      IA
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {dsbT.bot?.agentName || 'Agente Autónomo de Pruebas'}
                      </div>
                      <span className="text-[10px] text-emerald-400">
                        {dsbT.bot?.agentStatus || '● En línea respondiendo'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {chatMessages.map((m, idx) => (
                      <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-xl text-xs font-sans ${
                          m.sender === 'user' ? 'bg-[#005c4b] text-white' : 'bg-[#202c33] text-zinc-200 border border-white/5'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendChatMessage} className="pt-2 border-t border-white/10 flex gap-2">
                    <input
                      type="text"
                      placeholder={dsbT.bot?.inputPlaceholder || 'Escribe un mensaje de prueba...'}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-[#2a3942] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                    >
                      {dsbT.bot?.sendBtn || 'Enviar'}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* 5. SECCIÓN: CMS UNIVERSAL                                  */}
            {/* ========================================================== */}
            {activeTab === 'universal_cms' && (
              <motion.div
                key="universal_cms"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl space-y-6"
              >
                <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {dsbT.cms?.title || 'Gestión de Textos de la Web'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                        {dsbT.cms?.heroTitleLabel || 'Titular Hero Principal'}
                      </label>
                      <input
                        type="text"
                        value={cmsHeroTitle}
                        onChange={(e) => setCmsHeroTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                        {dsbT.cms?.heroSubtitleLabel || 'Subtítulo Descriptivo'}
                      </label>
                      <textarea
                        rows={3}
                        value={cmsHeroSubtitle}
                        onChange={(e) => setCmsHeroSubtitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <button
                      onClick={handleSaveCMS}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {dsbT.cms?.saveBtn || 'Guardar Cambios (Local-First)'}
                    </button>

                    {cmsSavedToast && (
                      <span className="text-xs text-emerald-400 block font-mono">
                        {dsbT.cms?.savedToast || '✓ Cambios guardados en tiempo real.'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* 6. SECCIÓN: SEGURIDAD & CLAVES                             */}
            {/* ========================================================== */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl space-y-6"
              >
                <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {dsbT.settings?.title || 'Ajustes de Credenciales Maestras'}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                        {dsbT.settings?.userLabel || 'Usuario Administrador'}
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="admin"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400 cursor-not-allowed font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                        {dsbT.settings?.passLabel || 'Contraseña Actual Simulada'}
                      </label>
                      <input
                        type="password"
                        readOnly
                        value="••••••••"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400 cursor-not-allowed font-mono"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          playSuccess();
                          alert(dsbT.settings?.updateAlert || 'Función de actualización de clave activa en el panel de producción.');
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-bold transition-all cursor-pointer"
                      >
                        {dsbT.settings?.updateBtn || 'Actualizar Credenciales'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

      </div>

    </div>
  );
}
