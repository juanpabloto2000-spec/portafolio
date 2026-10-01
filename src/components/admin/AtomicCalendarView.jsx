import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  Calendar as CalendarIcon, Clock, Video, Phone, User, Building, 
  ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, CheckCircle2,
  AlertCircle, Check, Send
} from 'lucide-react';

export default function AtomicCalendarView() {
  const { leads, markConfirmationSent } = useLeads();
  const [selectedDateFilter, setSelectedDateFilter] = useState('ALL');
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Filtrar solo los que tienen cita agendada, confirmada o finalizada
  const scheduledLeads = leads
    .filter(l => l.date && l.time && ['agendada', 'confirmada', 'finalizada', 'agendado', 'demo_realizada'].includes(l.status))
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

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSendReminderAndMark = (lead) => {
    markConfirmationSent(lead.id);
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const message = `Hola ${lead.client_name}, te saluda Juan Pablo de Dynamind Studios.
    
Te escribo para confirmar nuestra Sesión Estratégica agendada para el ${lead.date} a las ${lead.time}.
Sala de Google Meet: ${lead.meet_link}

¿Todo en orden para conectarnos puntuales?`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Cabecera Dopamínica */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CRONOGRAMA NATIVO // GESTIÓN DE CITAS</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Calendario Atómico de Sesiones & Demostraciones
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {selectedDateFilter !== 'ALL' && (
            <button
              onClick={() => setSelectedDateFilter('ALL')}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all hover:bg-cyan-900/50 cursor-pointer"
            >
              Ver Todas ({scheduledLeads.length})
            </button>
          )}
        </div>
      </div>

      {/* Layout Split en Dos Columnas: Mini Calendario a la Izquierda + Feed de Citas a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA: Mini Calendario Atómico Compacto (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4 glow-card backdrop-blur-md">
          
          {/* Header de Mes */}
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-cyan-400" />
              <span>{monthNames[month]} {year}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
                title="Mes Anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
                title="Mes Siguiente"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Días de la semana compactos */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-500 uppercase font-bold border-b border-white/10 pb-2">
            <span>Lu</span>
            <span>Ma</span>
            <span>Mi</span>
            <span>Ju</span>
            <span>Vi</span>
            <span>Sá</span>
            <span>Do</span>
          </div>

          {/* Cuadrícula Mini Compacta */}
          <div className="grid grid-cols-7 gap-1">
            {/* Espacios vacíos antes del primer día */}
            {Array.from({ length: adjustedFirstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8 sm:h-9 rounded-lg border border-transparent opacity-10" />
            ))}

            {/* Días del mes */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const formattedMonth = String(month + 1).padStart(2, '0');
              const formattedDay = String(dayNum).padStart(2, '0');
              const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
              const apptCount = appointmentsByDate[dateStr] || 0;
              const isSelected = selectedDateFilter === dateStr;
              const isToday = todayStr === dateStr;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDateFilter(isSelected ? 'ALL' : dateStr)}
                  className={`h-8 sm:h-9 w-full rounded-lg border text-center transition-all cursor-pointer relative flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105 z-10'
                      : apptCount > 0
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200 hover:border-cyan-400 font-semibold'
                      : isToday
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-white/[0.015] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                  title={`${dayNum} ${monthNames[month]}: ${apptCount} ${apptCount === 1 ? 'cita' : 'citas'}`}
                >
                  <span className="text-[11px] font-mono leading-none">{dayNum}</span>

                  {/* Micro-punto indicador bioluminiscente si hay citas */}
                  {apptCount > 0 && (
                    <span 
                      className={`w-1 h-1 rounded-full mt-1 ${
                        isSelected 
                          ? 'bg-black' 
                          : 'bg-emerald-400 animate-pulse shadow-[0_0_4px_#34d399]'
                      }`} 
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
              <span>Día con Sesión Agendada</span>
            </span>
            <span>Total: {scheduledLeads.length} citas</span>
          </div>

        </div>

        {/* COLUMNA DERECHA: Feed de Citas del Día / Agenda (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <div className="text-xs uppercase text-zinc-400 font-bold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {selectedDateFilter === 'ALL' 
                  ? 'Todas las Sesiones en Agenda' 
                  : `Sesiones del ${selectedDateFilter}`}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/10 text-white font-mono">
                {displayLeads.length}
              </span>
            </div>
          </div>

          {displayLeads.length === 0 ? (
            <div className="p-8 text-center border border-white/10 rounded-2xl bg-white/[0.01] space-y-3">
              <CalendarIcon className="w-6 h-6 text-zinc-600 mx-auto" />
              <div className="text-xs font-bold text-zinc-400">No hay sesiones para esta fecha.</div>
              <p className="text-[11px] text-zinc-500 font-sans">
                Haz clic en otro día del calendario o pulsa "Ver Todas".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayLeads.map((lead) => {
                const isPot = lead.category === 'POTENCIAL';
                const isConfirmedToday = lead.last_confirmation_date === todayStr;

                return (
                  <div
                    key={lead.id}
                    className="p-4 border border-white/10 hover:border-cyan-400/40 rounded-2xl bg-white/[0.02] transition-all space-y-3 backdrop-blur-sm group glow-card"
                  >
                    {/* Fila Superior: Horario, Nicho y Score */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>{lead.date} · {lead.time}</span>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                          isPot 
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' 
                            : 'bg-zinc-800/40 text-zinc-400 border-zinc-700/60'
                        }`}>
                          {isPot ? '💎 POTENCIAL' : '👀 CURIOSO'}
                        </span>
                      </div>

                      {/* Badge de Confirmación del Día */}
                      <div>
                        {lead.status === 'confirmada' ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-bold flex items-center gap-1 shadow-sm">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Confirmada {lead.last_confirmation_time ? `(${lead.last_confirmation_time})` : ''}</span>
                          </span>
                        ) : ['finalizada', 'cerrada'].includes(lead.status) ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 text-purple-400" />
                            <span>Reunión Concluida</span>
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-400" />
                            <span>Pendiente de Confirmar Hoy</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cliente y Empresa */}
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{lead.client_name}</span>
                        <span className="text-xs text-zinc-400 font-normal">· {lead.business_name}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-sans line-clamp-2">
                        <strong className="text-zinc-300">Cuello de Botella:</strong> "{lead.bottleneck}"
                      </div>
                    </div>

                    {/* Acciones de Conexión & Recordatorio */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {lead.meet_link && (
                          <a
                            href={lead.meet_link}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Entrar a Meet</span>
                          </a>
                        )}

                        {/* Solo si la cita está en 'agendada' se muestra el botón de confirmar. Si ya está confirmada, se quita */}
                        {lead.status === 'agendada' && (
                          <button
                            onClick={() => handleSendReminderAndMark(lead)}
                            className="px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer bg-emerald-500 text-black hover:bg-emerald-400 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                            title="Enviar confirmación y pasar automáticamente a Confirmada"
                          >
                            <Send className="w-3 h-3" />
                            <span>⚡ Enviar Confirmación Hoy</span>
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] text-zinc-500 font-mono">
                        {lead.phone}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
