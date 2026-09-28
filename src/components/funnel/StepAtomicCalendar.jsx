import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

export default function StepAtomicCalendar({ formData, updateFormData, onPrev, onSubmit, isLoading, submitError }) {
  const { availableSlots } = useLeads();

  // Generación atómica de los próximos 10 días laborables
  const getNextBusinessDays = () => {
    const days = [];
    const now = new Date();
    let current = new Date(now);
    // Empezar mañana o lunes si hoy es fin de semana
    current.setDate(current.getDate() + 1);

    while (days.length < 8) {
      const dayOfWeek = current.getDay();
      // 0 = Domingo (se incluye Sábado para Lun-Sáb)
      if (dayOfWeek !== 0) {
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        days.push({
          dateStr,
          dayName: dayNames[dayOfWeek],
          dayNumber: dd,
          monthName: monthNames[current.getMonth()]
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const businessDays = getNextBusinessDays();
  const selectedDate = formData.date || businessDays[0].dateStr;
  const selectedTime = formData.time || availableSlots[0];

  const handleSelectDate = (dateStr) => {
    updateFormData({ date: dateStr });
  };

  const handleSelectTime = (timeStr) => {
    updateFormData({ time: timeStr });
  };

  const isValid = formData.phone?.trim() && formData.phone?.length >= 8;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Encabezado */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
          Reserva tu Sesión Estratégica de 15 Minutos
        </h3>
        <p className="text-xs font-mono text-zinc-400">
          Sesión técnica 1 a 1 por Google Meet directamente con Juan Pablo (Lead Systems Architect).
        </p>
      </div>

      {/* Selector de Día (10 Días Hábiles) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-300">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
            <span>Selecciona Fecha de Atención:</span>
          </span>
          <span className="text-zinc-500">Zona GMT-5 (Colombia / Latam)</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {businessDays.map((day) => {
            const isSelected = selectedDate === day.dateStr;
            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => handleSelectDate(day.dateStr)}
                className={`p-3 text-center border rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white font-bold shadow-monolith'
                    : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.04]'
                }`}
              >
                <div className="text-[10px] font-mono uppercase opacity-75">{day.dayName}</div>
                <div className="text-lg font-mono font-extrabold my-0.5">{day.dayNumber}</div>
                <div className="text-[9px] font-mono uppercase opacity-75">{day.monthName}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector de Horario (Slots Atómicos) */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Horarios Disponibles para esta Fecha:</span>
          </span>
          <span className="text-emerald-400 font-semibold text-[10px]">DISPONIBLE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {availableSlots.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => handleSelectTime(slot)}
                className={`py-3 px-4 border rounded-xl text-center font-mono text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white font-bold shadow-monolith'
                    : 'bg-white/[0.02] text-zinc-300 border-white/10 hover:text-white hover:border-white/25'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Teléfono de WhatsApp para Confirmación y Recordatorio */}
      <div className="pt-2 space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp de Contacto Directo:</span>
          </span>
          <span className="text-zinc-500 text-[10px]">Se enviará el enlace de Meet al confirmar</span>
        </label>
        
        <div className="relative">
          <input
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="Ej. +57 300 123 4567 o 3124567890"
            className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
        <p className="text-[10px] font-mono text-zinc-500">
          Privacidad absoluta: Tus datos solo se usan para la sesión de diagnóstico y la apertura del chat.
        </p>
      </div>

      {/* Honeypot Anti-Bot Trap (Invisible para humanos, los bots automatizados lo rellenan) */}
      <div className="hidden" aria-hidden="true">
        <input 
          type="text" 
          name="website_trap" 
          tabIndex="-1" 
          autoComplete="off" 
          value={formData.website_trap || ''} 
          onChange={(e) => updateFormData({ website_trap: e.target.value })} 
        />
      </div>

      {submitError && (
        <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 font-mono text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Navegación y Envío */}
      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 bg-white/[0.03] text-zinc-300 border border-white/15 rounded-xl font-mono text-xs uppercase tracking-wider hover:text-white hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <button
          type="button"
          disabled={!isValid || isLoading}
          onClick={onSubmit}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>{isLoading ? 'Registrando Sesión...' : 'Confirmar Diagnóstico & Reservar'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
