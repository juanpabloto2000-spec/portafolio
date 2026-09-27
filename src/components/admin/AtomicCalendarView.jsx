import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  Calendar as CalendarIcon, Clock, Video, Phone, User, Building, 
  ArrowUpRight, ChevronLeft, ChevronRight, Filter, Sparkles 
} from 'lucide-react';

export default function AtomicCalendarView() {
  const { leads } = useLeads();
  const [selectedDateFilter, setSelectedDateFilter] = useState('ALL');
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Filtrar solo los que tienen cita agendada o demo realizada
  const scheduledLeads = leads
    .filter(l => l.date && l.time && (l.status === 'agendado' || l.status === 'demo_realizada'))
    .sort((a, b) => new Date(`${a.date}T12:00:00`) - new Date(`${b.date}T12:00:00`));

  // Mapa de citas por fecha
  const appointmentsByDate = scheduledLeads.reduce((acc, lead) => {
    acc[lead.date] = (acc[lead.date] || 0) + 1;
    return acc;
  }, {});

  // Navegación de mes
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // 0 is Mon
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const displayLeads = selectedDateFilter === 'ALL'
    ? scheduledLeads
    : scheduledLeads.filter(l => l.date === selectedDateFilter);

  const getWhatsAppReminderLink = (lead) => {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const message = `Hola ${lead.client_name}, te recuerdo que tenemos agendada nuestra sesión estratégica en Dynamind Studios para hoy a las ${lead.time}.

Sala de Google Meet: ${lead.meet_link}

¡Quedo atento para iniciar puntuales!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* Cabecera del Calendario Atómico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRONOGRAMA NATIVO // CERO CALENDLY</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Calendario Atómico Mensual & Sesiones de Arquitectura
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Selecciona cualquier día en la cuadrícula para filtrar las sesiones agendadas en tiempo real.
          </p>
        </div>

        {/* Filtro Rápido */}
        <div className="flex items-center gap-2">
          {selectedDateFilter !== 'ALL' && (
            <button
              onClick={() => setSelectedDateFilter('ALL')}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all hover:bg-cyan-900/50"
            >
              Ver Todas ({scheduledLeads.length})
            </button>
          )}
        </div>
      </div>

      {/* Cuadrícula de Calendario Mensual */}
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
        
        {/* Controles de Mes */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-cyan-400" />
            <span>{monthNames[month]} {year}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300"
              title="Mes Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300"
              title="Mes Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Encabezado Días de la Semana */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-zinc-400 uppercase font-bold border-b border-white/10 pb-2">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mié</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sáb</span>
          <span>Dom</span>
        </div>

        {/* Días del Mes */}
        <div className="grid grid-cols-7 gap-1.5">
          {/* Espacios vacíos antes del primer día */}
          {Array.from({ length: adjustedFirstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2 sm:p-3 rounded-xl border border-transparent opacity-20" />
          ))}

          {/* Días reales */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const formattedMonth = String(month + 1).padStart(2, '0');
            const formattedDay = String(dayNum).padStart(2, '0');
            const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
            const apptCount = appointmentsByDate[dateStr] || 0;
            const isSelected = selectedDateFilter === dateStr;

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDateFilter(isSelected ? 'ALL' : dateStr)}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-between min-h-[56px] sm:min-h-[64px] ${
                  isSelected
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-lg shadow-cyan-500/30'
                    : apptCount > 0
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-white hover:border-cyan-400'
                    : 'bg-white/[0.015] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="text-xs sm:text-sm font-bold">{dayNum}</span>

                {apptCount > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-emerald-400 animate-pulse'}`} />
                    <span className={`text-[9px] font-bold ${isSelected ? 'text-black' : 'text-emerald-400'}`}>
                      {apptCount} {apptCount === 1 ? 'cita' : 'citas'}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtítulo de Citas Filtradas */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs uppercase text-zinc-400">
          Mostrando: <span className="text-white font-bold">{selectedDateFilter === 'ALL' ? 'Todas las Sesiones Activas' : `Sesiones del ${selectedDateFilter}`}</span> ({displayLeads.length})
        </div>
      </div>

      {/* Grid de Citas en Agenda */}
      {displayLeads.length === 0 ? (
        <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/[0.01] space-y-3">
          <CalendarIcon className="w-8 h-8 text-zinc-600 mx-auto" />
          <div className="text-sm font-bold text-zinc-400">No hay sesiones agendadas para esta fecha.</div>
          <div className="text-xs text-zinc-500 font-sans">
            Selecciona otra fecha en el calendario o verifica los prospectos en el Pipeline.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayLeads.map((lead) => {
            const isPot = lead.category === 'POTENCIAL';
            return (
              <div
                key={lead.id}
                className="p-5 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-white/20 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Fila Fecha y Hora */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lead.date} · {lead.time}</span>
                    </div>

                    <span className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase ${
                      isPot 
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' 
                        : 'bg-zinc-800/40 text-zinc-400 border-zinc-700/60'
                    }`}>
                      {isPot ? '💎 POTENCIAL' : '👀 CURIOSO'}
                    </span>
                  </div>

                  {/* Datos del Prospecto */}
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{lead.client_name}</span>
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{lead.business_name} ({lead.niche})</span>
                    </div>
                  </div>

                  {/* Cuello de botella */}
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">
                      Cuello de Botella Detectado:
                    </span>
                    <p className="text-[11px] text-zinc-300 font-sans line-clamp-3 leading-relaxed">
                      "{lead.bottleneck}"
                    </p>
                  </div>

                </div>

                {/* Enlaces de Acción: Meet y WhatsApp */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                  {lead.meet_link && (
                    <a
                      href={lead.meet_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 bg-white text-black text-center text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 rounded-lg"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Entrar a Meet</span>
                    </a>
                  )}

                  <a
                    href={getWhatsAppReminderLink(lead)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                    title="Enviar recordatorio por WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
