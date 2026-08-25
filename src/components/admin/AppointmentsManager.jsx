import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, XCircle, 
  Video, Phone, Mail, MessageSquare, Copy, Check, ExternalLink, Filter, 
  ChevronRight, Building, Sparkles 
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
          <h2 className="text-2xl font-bold font-heading-luxury text-white">
            Gestión de Agendas & Calendario
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Supervisión de citas recibidas desde la web, control de estados (Pendiente, Agendado, Cancelado) y salas de Google Meet.
          </p>
        </div>

        {/* State Metric Counters */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Pendientes: <strong>{pendingCount}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Agendadas: <strong>{confirmedCount}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span>Canceladas: <strong>{canceledCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Time & Status) */}
      <div className="p-4 rounded-xl bg-[#09090c] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Time Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 text-xs">
          <button
            onClick={() => setTimeFilter('semana')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeFilter === 'semana' ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Semana Actual
          </button>
          <button
            onClick={() => setTimeFilter('mes')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeFilter === 'mes' ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Mes Completo
          </button>
          <button
            onClick={() => setTimeFilter('todos')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeFilter === 'todos' ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todas las Citas
          </button>
        </div>

        {/* Status Pills Filter */}
        <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto no-scrollbar">
          {[
            { id: 'todos', label: 'Todos los Estados' },
            { id: 'pendiente', label: '🟡 Pendientes' },
            { id: 'agendado', label: '🟢 Agendados' },
            { id: 'cancelado', label: '🔴 Cancelados' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg border text-xs whitespace-nowrap transition-colors ${
                statusFilter === st.id 
                  ? 'bg-white/15 border-white text-white font-semibold' 
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#09090c] border border-white/10 text-center space-y-3">
          <CalendarIcon className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No hay citas en este período</h3>
          <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
            Prueba cambiando el filtro de tiempo o el estado para visualizar las agendas registradas.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredAppointments.map((apt) => {
              const isPending = apt.status === 'pendiente';
              const isConfirmed = apt.status === 'agendado';
              const isCanceled = apt.status === 'cancelado';

              return (
                <motion.div
                  key={apt.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 hover:border-white/20 transition-all shadow-lg space-y-4"
                >
                  {/* Top Bar: Client Name, Business, Date/Time & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold font-heading-luxury text-white">
                          {apt.clientName}
                        </h3>
                        <span className="text-xs font-mono text-zinc-400 font-normal">
                          ({apt.businessName})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400 font-mono">
                        <span className="flex items-center gap-1 text-slate-300">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>{apt.date}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{apt.time} ({apt.duration})</span>
                        </span>
                        <span className="text-zinc-500">• {apt.niche}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
                        isPending 
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' 
                          : isConfirmed 
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-red-500/15 text-red-300 border border-red-500/30'
                      }`}>
                        {isPending && <AlertCircle className="w-3.5 h-3.5" />}
                        {isConfirmed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isCanceled && <XCircle className="w-3.5 h-3.5" />}
                        <span className="uppercase">{apt.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Grid: Contact, Services, Bottleneck */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    
                    {/* Contact details */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Datos de Contacto:</span>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="font-mono">{apt.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{apt.email}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Servicios Requeridos:</span>
                      <div className="flex flex-wrap gap-1">
                        {apt.services.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] text-zinc-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottleneck / Notes */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Cuello de Botella:</span>
                      <p className="text-zinc-300 text-[11px] font-light leading-relaxed">
                        {apt.bottleneck || 'Sin detalle adicional proporcionado.'}
                      </p>
                    </div>

                  </div>

                  {/* Bottom Actions: Status Switcher & Google Meet */}
                  <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    
                    {/* Status Changer Buttons */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-zinc-500 mr-1 uppercase">Cambiar Estado:</span>
                      <button
                        onClick={() => handleStatusChange(apt.id, 'pendiente')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                          isPending ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Pendiente
                      </button>
                      <button
                        onClick={() => handleStatusChange(apt.id, 'agendado')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                          isConfirmed ? 'bg-emerald-400 text-black font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Agendado
                      </button>
                      <button
                        onClick={() => handleStatusChange(apt.id, 'cancelado')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                          isCanceled ? 'bg-red-400 text-black font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Cancelado
                      </button>
                    </div>

                    {/* Action Links: Google Meet & Simulator */}
                    <div className="flex items-center gap-2">
                      {/* Meet Link Button */}
                      <button
                        onClick={() => handleCopyLink(apt.id, apt.meetLink)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5 text-slate-300" />
                        <span>{copiedId === apt.id ? '¡Enlace Copiado!' : 'Copiar Meet'}</span>
                        {copiedId === apt.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                      </button>

                      {/* Launch WhatsApp Simulator for this appointment */}
                      <button
                        onClick={() => setActiveSimAppointment(apt)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Ver Chat IA</span>
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}
