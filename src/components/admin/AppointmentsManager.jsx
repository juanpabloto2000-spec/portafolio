import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, XCircle, 
  Video, Phone, Mail, MessageSquare, Copy, Check, ExternalLink, Filter, 
  ChevronRight, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export default function AppointmentsManager() {
  const { 
    appointments, 
    updateAppointmentStatus, 
    deleteAppointment,
    setActiveSimAppointment 
  } = useApp();

  const [timeFilter, setTimeFilter] = useState('semana'); // 'semana' | 'mes' | 'todos'
  const [statusFilter, setStatusFilter] = useState('todos'); // 'todos' | 'pendiente' | 'agendado' | 'cancelado'
  const [copiedId, setCopiedId] = useState(null);

  // Time calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const curr = new Date();
  const firstDay = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(curr.setDate(firstDay)).toISOString().split('T')[0];
  const endOfWeek = new Date(curr.setDate(firstDay + 6)).toISOString().split('T')[0];

  const currentMonthPrefix = todayStr.substring(0, 7); // e.g. "2026-08"

  const filteredAppointments = appointments.filter(apt => {
    // 1. Time Filter
    if (timeFilter === 'semana') {
      if (apt.date < startOfWeek || apt.date > endOfWeek) return false;
    } else if (timeFilter === 'mes') {
      if (!apt.date.startsWith(currentMonthPrefix)) return false;
    }

    // 2. Status Filter
    if (statusFilter !== 'todos') {
      if (apt.status !== statusFilter) return false;
    }

    return true;
  });

  const handleCopyLink = (id, link) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (id, newStatus) => {
    updateAppointmentStatus(id, newStatus);
    if (newStatus === 'agendado') {
      confetti({ particleCount: 50, spread: 45 });
    }
  };

  const pendingCount = appointments.filter(a => a.status === 'pendiente').length;
  const confirmedCount = appointments.filter(a => a.status === 'agendado').length;
  const canceledCount = appointments.filter(a => a.status === 'cancelado').length;

  return (
    <div className="space-y-6 text-white">
      
      {/* Header & Quick Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <span>📅</span>
            <span>CALENDARIO & SESIONES DE DIAGNÓSTICO</span>
          </div>
          <h2 className="text-2xl font-bold font-heading-luxury text-white">
            Gestión de Agendas
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Revisa solicitudes en tiempo real, actualiza estados y accede a salas de Google Meet.
          </p>
        </div>

        {/* Minimalist State Counters */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-2">
            <span>🟡</span>
            <span><strong>{pendingCount}</strong> Pendientes</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2">
            <span>🟢</span>
            <span><strong>{confirmedCount}</strong> Agendadas</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-center gap-2">
            <span>🔴</span>
            <span><strong>{canceledCount}</strong> Canceladas</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Time & Status) */}
      <div className="p-3 rounded-2xl bg-[#09090c] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Time Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/5 text-xs">
          <button
            onClick={() => setTimeFilter('semana')}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeFilter === 'semana'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🗓️ Esta Semana
          </button>
          <button
            onClick={() => setTimeFilter('mes')}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeFilter === 'mes'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            📆 Mes Completo
          </button>
          <button
            onClick={() => setTimeFilter('todos')}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeFilter === 'todos'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            📂 Todas
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'todos', label: 'Todos', emoji: '⚡' },
            { id: 'pendiente', label: 'Pendientes', emoji: '🟡' },
            { id: 'agendado', label: 'Agendados', emoji: '🟢' },
            { id: 'cancelado', label: 'Cancelados', emoji: '🔴' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                statusFilter === st.id
                  ? 'bg-white/10 border-white text-white font-medium'
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{st.emoji}</span>
              <span>{st.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#09090c] border border-white/10 space-y-3">
            <span className="text-3xl">🗓️</span>
            <h3 className="text-sm font-bold text-white">No hay citas en este periodo o filtro</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto font-light">
              Cuando un cliente agende en la web pública, aparecerá aquí como pendiente para validación por WhatsApp.
            </p>
          </div>
        ) : (
          filteredAppointments.map((apt) => {
            const isPending = apt.status === 'pendiente';
            const isConfirmed = apt.status === 'agendado';
            const isCanceled = apt.status === 'cancelado';

            return (
              <motion.div
                key={apt.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#09090c] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-lg"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                      {isConfirmed ? '🟢' : isCanceled ? '🔴' : '🟡'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">{apt.clientName}</h3>
                        <span className="text-xs text-zinc-400 font-light">• {apt.businessName}</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">
                        {apt.niche}
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Slot Time */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono self-start sm:self-auto">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{apt.date}</span>
                    <span className="text-zinc-500">•</span>
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{apt.time} ({apt.duration})</span>
                  </div>
                </div>

                {/* Body Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  {/* Services Requested */}
                  <div className="space-y-1.5">
                    <span className="text-zinc-400 font-medium block">📦 Servicios Solicitados:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {apt.services.map((svc, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px]">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1.5">
                    <span className="text-zinc-400 font-medium block">👤 Contacto:</span>
                    <div className="space-y-1 text-zinc-300 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-zinc-400" />
                        <span>{apt.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-zinc-400" />
                        <span>{apt.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottleneck / Needs */}
                  <div className="space-y-1.5">
                    <span className="text-zinc-400 font-medium block">🎯 Cuello de Botella:</span>
                    <p className="text-zinc-300 font-light text-[11px] leading-relaxed bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      {apt.bottleneck || "No especificado en el formulario."}
                    </p>
                  </div>

                </div>

                {/* Google Meet & Direct Actions Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
                  
                  {/* Google Meet Link Bar */}
                  <div className="flex items-center gap-2">
                    <a
                      href={apt.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 flex items-center gap-2 font-mono transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{apt.meetLink}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <button
                      onClick={() => handleCopyLink(apt.id, apt.meetLink)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                      title="Copiar enlace"
                    >
                      {copiedId === apt.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Status Switcher & WhatsApp Simulation Trigger */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    
                    {/* Trigger WhatsApp AI Live Simulator */}
                    <button
                      onClick={() => setActiveSimAppointment(apt)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat IA WhatsApp</span>
                    </button>

                    {/* Quick State Toggle Buttons */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
                      <button
                        onClick={() => handleStatusChange(apt.id, 'pendiente')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                          isPending ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Marcar como Pendiente"
                      >
                        Pendiente
                      </button>

                      <button
                        onClick={() => handleStatusChange(apt.id, 'agendado')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                          isConfirmed ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Marcar como Agendado"
                      >
                        Agendado
                      </button>

                      <button
                        onClick={() => handleStatusChange(apt.id, 'cancelado')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                          isCanceled ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Marcar como Cancelado"
                      >
                        Cancelado
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}
