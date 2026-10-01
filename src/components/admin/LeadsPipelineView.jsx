import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLeads } from '../../context/LeadContext';
import { 
  Users, Calendar, Activity, Sparkles, Search, Filter, 
  Phone, Video, Trash2, ExternalLink, CheckCircle2, AlertCircle,
  TrendingUp, BarChart3, Award, ArrowUpRight, Check, Send, Clock,
  DollarSign, ShieldAlert, ArrowRight, Layers
} from 'lucide-react';

export default function LeadsPipelineView() {
  const { leads, updateLeadStatus, markConfirmationSent, deleteLead, kpis } = useLeads();
  
  // Subnavbar activa: 'METRICS' (Métricas cubren todo el espacio) o 'PIPELINE' (Gestión de Estados)
  const [activeSection, setActiveSection] = useState('METRICS');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 'ALL' | 'POTENCIAL' | 'CURIOSO' | 'CONFIRMADO_HOY' | 'PENDIENTE_HOY'

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.niche?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);

    const isConfirmedToday = lead.last_confirmation_date === todayStr;

    let matchesCategory = true;
    if (categoryFilter === 'POTENCIAL') matchesCategory = lead.category === 'POTENCIAL';
    else if (categoryFilter === 'CURIOSO') matchesCategory = lead.category === 'CURIOSO';
    else if (categoryFilter === 'CONFIRMADO_HOY') matchesCategory = (lead.status === 'confirmada');
    else if (categoryFilter === 'PENDIENTE_HOY') matchesCategory = (lead.status === 'agendada');

    return matchesSearch && matchesCategory;
  });

  // Cálculo de distribución por nicho
  const nicheCounts = leads.reduce((acc, lead) => {
    const n = lead.niche || 'Otros';
    acc[n] = (acc[n] || 0) + 1;
    return acc;
  }, {});

  const totalNicheLeads = leads.length || 1;
  const nicheDistribution = Object.entries(nicheCounts).map(([niche, count]) => ({
    niche,
    count,
    percent: Math.round((count / totalNicheLeads) * 100)
  }));

  // Fricción media
  const avgFriction = leads.length 
    ? Math.round(leads.reduce((acc, l) => acc + (l.friction_score || 85), 0) / leads.length) 
    : 88;

  const handleSendConfirmation = (lead) => {
    markConfirmationSent(lead.id);
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const message = `Hola ${lead.client_name}, te saluda Juan Pablo de Dynamind Studios.

Te escribo para confirmar nuestra Sesión Estratégica agendada para el ${lead.date} a las ${lead.time}.

Revisé el cuello de botella de tu proyecto (${lead.business_name}):
"${lead.bottleneck}".

Nos conectaremos en esta sala de Google Meet: ${lead.meet_link}

¿Todo en orden para nuestra cita?`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const confirmedTodayCount = leads.filter(l => l.status === 'confirmada').length;
  const pendingTodayCount = leads.filter(l => l.status === 'agendada').length;

  return (
    <div className="space-y-6 font-mono">
      
      {/* ========================================================================= */}
      {/* SUBNAVBAR SUPERIOR TÁCTICA PARA CAMBIAR ENTRE MÉTRICAS Y PIPELINE         */}
      {/* ========================================================================= */}
      <div className="p-4 bg-black/60 border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl glow-card">
        
        {/* Pestañas de la Subnavbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('METRICS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === 'METRICS'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📈 Métricas & Telemetría Full</span>
          </button>

          <button
            onClick={() => setActiveSection('PIPELINE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === 'PIPELINE'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>📋 Gestión de Pipeline & Estados</span>
            <span className="px-2 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
              {leads.length}
            </span>
          </button>
        </div>

        {/* Acceso Rápido / Información */}
        <div className="flex items-center gap-3 text-xs">
          {activeSection === 'METRICS' ? (
            <button
              onClick={() => setActiveSection('PIPELINE')}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Ir a Cambiar Estados</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveSection('METRICS')}
              className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Ver Métricas Full</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA A: MÉTRICAS Y TELEMETRÍA CUBRIENDO TODO EL ESPACIO                   */}
      {/* ========================================================================= */}
      {activeSection === 'METRICS' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Tarjeta de Encabezado de Métricas */}
          <div className="p-6 bg-gradient-to-r from-blue-950/20 via-black to-purple-950/20 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-md glow-card space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-purple-500/40 rounded-xl text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>EMBUDO DE CONVERSIÓN & TELEMETRÍA PREDICTIVA</span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Tablero Integral de Métricas Operativas & Comerciales
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400">Dolor Promedio:</span>
                <span className="px-3 py-1 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-bold font-mono">
                  {avgFriction}% Fricción Crítica
                </span>
              </div>
            </div>

            {/* 5 KPIs Principales a Todo lo Ancho */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1 hover:border-white/20 transition-colors">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Users className="w-3 h-3 text-zinc-400" />
                  <span>Total Leads</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{kpis.totalLeads}</div>
                <div className="text-[10px] text-zinc-500">Captados en Embudo</div>
              </div>

              <div className="p-4 bg-black/50 border border-emerald-500/20 rounded-xl space-y-1 hover:border-emerald-500/40 transition-colors">
                <div className="text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Citas Agendadas</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400 tracking-tight">{kpis.scheduledCalls}</div>
                <div className="text-[10px] text-zinc-500">En Agenda Dinámica</div>
              </div>

              <div className="p-4 bg-black/50 border border-cyan-500/20 rounded-xl space-y-1 hover:border-cyan-400/40 transition-colors">
                <div className="text-[10px] text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Potenciales 💎</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{kpis.potentialLeads}</div>
                <div className="text-[10px] text-cyan-400 font-semibold">Prioridad de Cierre</div>
              </div>

              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1 hover:border-white/20 transition-colors">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Curiosos 👀</div>
                <div className="text-2xl font-bold text-zinc-400 tracking-tight">{kpis.curiousLeads}</div>
                <div className="text-[10px] text-zinc-500">Filtro de Descarte</div>
              </div>

              <div className="p-4 bg-black/50 border border-purple-500/20 rounded-xl space-y-1 hover:border-purple-500/40 transition-colors">
                <div className="text-[10px] text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Calificación</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{kpis.conversionRate}%</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Tasa de Potenciales</div>
              </div>
            </div>

            {/* Grid de 2 Columnas de Análisis Profundo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Gráfica de Barras Animadas de Distribución por Industria */}
              <div className="p-5 bg-black/50 border border-white/10 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Demanda por Industria & Nicho</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Tiempo Real</span>
                </div>

                <div className="space-y-3">
                  {nicheDistribution.map(({ niche, count, percent }) => (
                    <div key={niche} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-300 font-sans">{niche}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-cyan-400 font-bold">{count} citas</span>
                          <span className="text-zinc-500 text-[10px]">({percent}%)</span>
                        </div>
                      </div>
                      
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proyección y Dolor de Operación */}
              <div className="p-5 bg-black/50 border border-white/10 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Proyección Económica del Embudo</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Activo</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-400">Valor Estimado del Pipeline:</span>
                    <span className="text-white font-mono font-bold text-sm">$18,000,000 COP</span>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-400">Confirmaciones Hoy Realizadas:</span>
                    <span className="text-emerald-400 font-mono font-bold">{confirmedTodayCount} de {leads.length}</span>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-400">Pendientes de Confirmar Hoy:</span>
                    <span className="text-amber-400 font-mono font-bold">{pendingTodayCount} citas</span>
                  </div>

                  <button
                    onClick={() => setActiveSection('PIPELINE')}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Gestionar Citas y Cambiar Estados</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA B: GESTIÓN DE PIPELINE & CAMBIO DE ESTADOS A PANTALLA COMPLETA       */}
      {/* ========================================================================= */}
      {activeSection === 'PIPELINE' && (
        <div className="p-6 bg-gradient-to-r from-white/[0.02] via-black to-white/[0.01] border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-md glow-card space-y-6 animate-in fade-in duration-300">
          
          {/* Cabecera del Bloque Inferior con Buscador y Filtros */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>DIRECTORIO ACTIVO // GESTIÓN DE ESTADOS</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Pipeline de Citas & Prospectos
              </h3>
            </div>

            {/* Buscador Rápido */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar prospecto, negocio o tel..."
                className="w-full pl-9 pr-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>
          </div>

          {/* Filtros de Categoría y Seguimiento */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter('ALL')}
              className={`px-3 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                categoryFilter === 'ALL'
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              Todos ({leads.length})
            </button>

            <button
              onClick={() => setCategoryFilter('POTENCIAL')}
              className={`px-3 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                categoryFilter === 'POTENCIAL'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/5 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              💎 Potenciales ({kpis.potentialLeads})
            </button>

            <button
              onClick={() => setCategoryFilter('CURIOSO')}
              className={`px-3 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                categoryFilter === 'CURIOSO'
                  ? 'bg-zinc-300 text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-zinc-300'
              }`}
            >
              👀 Curiosos ({kpis.curiousLeads})
            </button>

            <button
              onClick={() => setCategoryFilter('CONFIRMADO_HOY')}
              className={`px-3 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                categoryFilter === 'CONFIRMADO_HOY'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-white/5 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              ✓ Confirmados Hoy ({confirmedTodayCount})
            </button>

            <button
              onClick={() => setCategoryFilter('PENDIENTE_HOY')}
              className={`px-3 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                categoryFilter === 'PENDIENTE_HOY'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-white/5 text-amber-400 hover:text-amber-300'
              }`}
            >
              ⚡ Pendientes Hoy ({pendingTodayCount})
            </button>
          </div>

          {/* Tabla Interactiva de Prospectos */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                    <th className="p-3.5">Cita / Horario</th>
                    <th className="p-3.5">Cliente & Empresa</th>
                    <th className="p-3.5">Nicho / Perfil</th>
                    <th className="p-3.5 max-w-xs">Cuello de Botella</th>
                    <th className="p-3.5">Score / Categoría</th>
                    <th className="p-3.5">Seguimiento Hoy</th>
                    <th className="p-3.5">Estado Lead</th>
                    <th className="p-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-zinc-500">
                        No se encontraron prospectos con los filtros actuales.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const isPot = lead.category === 'POTENCIAL';
                      const isConfirmedToday = lead.last_confirmation_date === todayStr;

                      return (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                          
                          {/* Cita */}
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="font-bold text-white font-mono">{lead.date}</div>
                            <div className="text-[11px] text-cyan-400 font-mono">{lead.time}</div>
                          </td>

                          {/* Cliente & Empresa */}
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="font-bold text-white">{lead.client_name}</div>
                            <div className="text-[11px] text-zinc-400">{lead.business_name}</div>
                          </td>

                          {/* Nicho */}
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="text-zinc-200">{lead.niche}</div>
                            <div className="text-[10px] text-zinc-500">{lead.profile_type}</div>
                          </td>

                          {/* Cuello de botella */}
                          <td className="p-3.5 max-w-xs">
                            <div className="text-[11px] text-zinc-300 font-sans line-clamp-2 leading-relaxed">
                              "{lead.bottleneck}"
                            </div>
                          </td>

                          {/* Score / Categoría */}
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                                isPot 
                                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' 
                                  : 'bg-zinc-800/40 text-zinc-400 border-zinc-700/60'
                              }`}>
                                {isPot ? '💎 POTENCIAL' : '👀 CURIOSO'}
                              </span>
                              <span className="text-[11px] text-zinc-400 font-mono">{lead.friction_score}%</span>
                            </div>
                          </td>

                          {/* Seguimiento de Confirmación del Día: Si está confirmada se quita el botón */}
                          <td className="p-3.5 whitespace-nowrap">
                            {lead.status === 'confirmada' ? (
                              <div className="flex items-center gap-1.5">
                                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold flex items-center gap-1.5 w-fit shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Confirmada {lead.last_confirmation_time ? `(${lead.last_confirmation_time})` : ''}</span>
                                </span>
                              </div>
                            ) : ['finalizada', 'cerrada', 'descartada'].includes(lead.status) ? (
                              <span className="text-[10px] px-2 py-0.5 rounded text-zinc-500 font-mono">
                                {lead.status === 'finalizada' ? '🤝 Reunión Hecha' : lead.status === 'cerrada' ? '🏆 Venta Cerrada' : '—'}
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSendConfirmation(lead)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group hover:scale-[1.02]"
                                title="Enviar mensaje de confirmación por WhatsApp y pasar automáticamente a Confirmada"
                              >
                                <Send className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                                <span>⚡ Confirmar Hoy</span>
                              </button>
                            )}
                          </td>

                          {/* Estado del Lead: ÚNICAMENTE 4 OPCIONES (Descartada se maneja en Fábrica) y Bloqueo si Demo en Proceso */}
                          <td className="p-3.5 whitespace-nowrap">
                            {lead.demo_status === 'en_construccion' ? (
                              <div className="space-y-1">
                                <span 
                                  className="px-2.5 py-1 rounded-xl bg-purple-950/60 border border-purple-500/50 text-purple-300 text-[10px] font-bold flex items-center gap-1.5 w-fit shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                                  title="No se puede cambiar el estado mientras la demo esté en producción en la Fábrica"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                  <span>🔒 Demo en Proceso</span>
                                </span>
                                <span className="text-[9px] text-zinc-500 font-mono block">
                                  Bloqueado por Fábrica
                                </span>
                              </div>
                            ) : (
                              <select
                                value={lead.status || 'agendada'}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                className="bg-black/90 border border-white/20 hover:border-cyan-400/50 rounded-xl text-[11px] px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400 font-mono shadow-sm cursor-pointer transition-all"
                              >
                                <option value="agendada">📅 Agendada</option>
                                <option value="confirmada">✅ Confirmada</option>
                                <option value="finalizada">🤝 Finalizada (Reunión Hecha)</option>
                                <option value="cerrada">🏆 Cerrada (Venta)</option>
                              </select>
                            )}
                          </td>

                          {/* Acciones Directas */}
                          <td className="p-3.5 whitespace-nowrap text-right space-x-1.5">
                            {lead.meet_link && (
                              <a
                                href={lead.meet_link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 bg-white/[0.04] border border-white/15 hover:border-white/40 text-zinc-300 hover:text-white text-[11px] rounded-lg transition-colors"
                                title="Abrir sala de Meet"
                              >
                                <Video className="w-3 h-3 text-cyan-400" />
                                <span className="hidden sm:inline">Meet</span>
                              </a>
                            )}

                            {lead.phone && (
                              <a
                                href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 text-[11px] rounded-lg transition-colors"
                                title="Abrir chat de WhatsApp"
                              >
                                <Phone className="w-3 h-3 text-emerald-400" />
                                <span className="hidden sm:inline">Chat</span>
                              </a>
                            )}

                            <button
                              onClick={() => {
                                if (confirm(`¿Estás seguro de eliminar el registro de ${lead.client_name}?`)) {
                                  deleteLead(lead.id);
                                }
                              }}
                              className="inline-flex items-center p-1 text-zinc-500 hover:text-red-400 transition-colors"
                              title="Eliminar prospecto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
