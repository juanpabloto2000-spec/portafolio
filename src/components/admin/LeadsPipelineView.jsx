import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  Users, Calendar, Activity, Sparkles, Search, Filter, 
  Phone, Video, Trash2, ExternalLink, CheckCircle2, AlertCircle,
  TrendingUp, BarChart3, PieChart, ShieldAlert, Award, ArrowUpRight
} from 'lucide-react';

export default function LeadsPipelineView() {
  const { leads, updateLeadStatus, deleteLead, kpis } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 'ALL' | 'POTENCIAL' | 'CURIOSO'
  const [activeChartTab, setActiveChartTab] = useState('niche'); // 'niche' | 'conversion'

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.niche?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);

    const matchesCategory = 
      categoryFilter === 'ALL' || lead.category === categoryFilter;

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

  const getWhatsAppLink = (lead) => {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const message = `Hola ${lead.client_name}, te saluda Juan Pablo de Dynamind Studios.

Te escribo para confirmar nuestra Sesión Estratégica de Arquitectura agendada para el ${lead.date} a las ${lead.time}.

Revisé el cuello de botella de tu proyecto (${lead.business_name}):
"${lead.bottleneck}".

Nos conectaremos en esta sala de Google Meet: ${lead.meet_link}

¿Todo en orden para nuestra cita?`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* HUD Superior de Telemetría Táctica con Hyperframes Visuales */}
      <div className="p-6 bg-gradient-to-r from-white/[0.03] via-cyan-950/20 to-white/[0.02] border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                TELEMETRÍA DE CAPTACIÓN // EMBUDO ATÓMICO 2026
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Pipeline de Decisores & Análisis Predictivo
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400">Fricción Promedio de Prospectos:</span>
            <span className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-bold">
              {avgFriction}% (Dolor Operativo Alto)
            </span>
          </div>
        </div>

        {/* 5 KPIs Principales */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Total Prospectos</div>
            <div className="text-2xl font-bold text-white tracking-tight">{kpis.totalLeads}</div>
            <div className="text-[10px] text-zinc-400">Captados vía ManyChat/Web</div>
          </div>

          <div className="p-4 bg-black/40 border border-emerald-500/20 rounded-xl space-y-1">
            <div className="text-[10px] text-emerald-400 uppercase tracking-wider">Citas Agendadas</div>
            <div className="text-2xl font-bold text-emerald-400 tracking-tight">{kpis.scheduledCalls}</div>
            <div className="text-[10px] text-zinc-400">Sesiones en Calendario</div>
          </div>

          <div className="p-4 bg-black/40 border border-cyan-500/20 rounded-xl space-y-1">
            <div className="text-[10px] text-cyan-400 uppercase tracking-wider">Potenciales 💎</div>
            <div className="text-2xl font-bold text-white tracking-tight">{kpis.potentialLeads}</div>
            <div className="text-[10px] text-cyan-400 font-semibold">Prioridad de Cierre</div>
          </div>

          <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Curiosos 👀</div>
            <div className="text-2xl font-bold text-zinc-400 tracking-tight">{kpis.curiousLeads}</div>
            <div className="text-[10px] text-zinc-400">Descarte o Nurturing</div>
          </div>

          <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Tasa Calificación</div>
            <div className="text-2xl font-bold text-white tracking-tight">{kpis.conversionRate}%</div>
            <div className="text-[10px] text-emerald-400">Leads Calificados / Total</div>
          </div>
        </div>
      </div>

      {/* Gráfica Interactiva de Distribución por Nicho & Rendimiento */}
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Distribución de Demanda por Industria</span>
          </div>
          <span className="text-[10px] text-zinc-500">Métricas Actualizadas en Vivo</span>
        </div>

        {/* Barras de Progreso por Nicho */}
        <div className="space-y-3 pt-2">
          {nicheDistribution.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-semibold">{item.niche}</span>
                <span className="text-zinc-400 font-mono text-[11px]">{item.count} leads ({item.percent}%)</span>
              </div>
              <div className="w-full h-2.5 bg-black/60 border border-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de Búsqueda y Filtro */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, empresa, nicho o teléfono..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {/* Filtros de Categoría */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 uppercase mr-1">Filtrar:</span>
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              categoryFilter === 'ALL'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            Todos ({leads.length})
          </button>
          <button
            onClick={() => setCategoryFilter('POTENCIAL')}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              categoryFilter === 'POTENCIAL'
                ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-emerald-400'
            }`}
          >
            Potenciales 💎 ({kpis.potentialLeads})
          </button>
          <button
            onClick={() => setCategoryFilter('CURIOSO')}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              categoryFilter === 'CURIOSO'
                ? 'bg-zinc-300 text-black border-zinc-300 font-bold'
                : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            Curiosos 👀 ({kpis.curiousLeads})
          </button>
        </div>

      </div>

      {/* Tabla de Leads */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] text-zinc-400 uppercase tracking-wider">
                <th className="p-3.5">Fecha / Cita</th>
                <th className="p-3.5">Cliente & Empresa</th>
                <th className="p-3.5">Nicho / Perfil</th>
                <th className="p-3.5 max-w-xs">Cuello de Botella</th>
                <th className="p-3.5">Score / Cat</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 text-right">Acciones Directas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-zinc-500">
                    No se encontraron prospectos con los filtros actuales.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isPot = lead.category === 'POTENCIAL';
                  return (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      
                      {/* Cita */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-white">{lead.date}</div>
                        <div className="text-[11px] text-zinc-400">{lead.time}</div>
                      </td>

                      {/* Cliente */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-white">{lead.client_name}</div>
                        <div className="text-[11px] text-zinc-400">{lead.business_name}</div>
                      </td>

                      {/* Nicho */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-zinc-200">{lead.niche}</div>
                        <div className="text-[10px] text-zinc-400">{lead.profile_type}</div>
                      </td>

                      {/* Cuello de botella */}
                      <td className="p-3.5 max-w-xs">
                        <div className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                          {lead.bottleneck}
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

                      {/* Estado Selector */}
                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="bg-black/80 border border-white/20 rounded-xl text-[11px] px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400 font-mono shadow-sm cursor-pointer transition-all hover:border-white/30"
                        >
                          <option value="agendado">Agendado</option>
                          <option value="demo_realizada">Demo Realizada</option>
                          <option value="cerrada">Cerrada (Venta)</option>
                          <option value="descartada">Descartada</option>
                        </select>
                      </td>

                      {/* Acciones */}
                      <td className="p-3.5 whitespace-nowrap text-right space-x-2">
                        {/* WhatsApp 1-Clic */}
                        <a
                          href={getWhatsAppLink(lead)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[11px] uppercase rounded-lg transition-colors"
                          title="Abrir chat de WhatsApp con mensaje listo"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Chat WA</span>
                        </a>

                        {/* Google Meet Link */}
                        {lead.meet_link && (
                          <a
                            href={lead.meet_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 bg-white/[0.04] border border-white/15 text-zinc-300 hover:text-white text-[11px] uppercase rounded-lg transition-colors"
                            title="Abrir sala de Meet"
                          >
                            <Video className="w-3 h-3 text-zinc-400" />
                            <span>Meet</span>
                          </a>
                        )}

                        {/* Eliminar */}
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar prospecto de ${lead.client_name}?`)) {
                              deleteLead(lead.id);
                            }
                          }}
                          className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                          title="Eliminar registro"
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
  );
}
