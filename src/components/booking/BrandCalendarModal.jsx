import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, 
  ArrowRight, ShieldCheck, Check, Sparkles, AlertCircle, MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

const NICHES = [
  'Hostal / Hospedaje',
  'Clínica Dental',
  'Clínica Estética',
  'Repostería / Pastelería',
  'Restaurante / Bar',
  'Otro Proyecto'
];

export default function BrandCalendarModal({ isOpen, onClose }) {
  const { addAppointment, agentConfig, setActiveSimAppointment } = useApp();

  const [step, setStep] = useState(1); // 1: Calendar & Time, 2: Client Info & Services, 3: Success & AI Dispatch
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // default to tomorrow
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  
  // Client Info
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [niche, setNiche] = useState(NICHES[0]);
  const [selectedServices, setSelectedServices] = useState([agentConfig.services[0].name]);
  const [bottleneck, setBottleneck] = useState('');
  const [createdApt, setCreatedApt] = useState(null);

  if (!isOpen) return null;

  // Calendar Helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Adjust so Monday is first (0: Mon, 6: Sun)
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const isDateInPast = (dayNum) => {
    const checkDate = new Date(year, month, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const toggleService = (srvName) => {
    if (selectedServices.includes(srvName)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srvName));
      }
    } else {
      setSelectedServices([...selectedServices, srvName]);
    }
  };

  const availableTimeSlots = [
    '08:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const apt = addAppointment({
      clientName,
      businessName: businessName || clientName,
      phone,
      email,
      niche,
      services: selectedServices,
      date: selectedDate,
      time: selectedTime,
      bottleneck
    });

    setCreatedApt(apt);
    setStep(3);
    confetti({ particleCount: 80, spread: 60 });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#09090c] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.06)] overflow-hidden my-auto max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>DYNAMIND STUDIOS • RESERVA DE DIAGNÓSTICO</span>
            </div>
            <h2 className="text-2xl font-bold font-heading-luxury text-white">
              Agendar Sesión Estratégica
            </h2>
            <p className="text-xs text-zinc-400 font-light mt-1">
              Selecciona tu fecha en nuestro calendario interactivo. Tu espacio quedará en estado <strong>Pendiente</strong> hasta la confirmación de nuestro Agente IA por WhatsApp.
            </p>

            {/* Stepper */}
            <div className="flex items-center gap-2 mt-4 text-xs font-mono">
              {[
                { num: 1, label: '1. Calendario & Horario' },
                { num: 2, label: '2. Nicho & Servicios' },
                { num: 3, label: '3. Confirmación IA' }
              ].map((st) => (
                <div
                  key={st.num}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    step === st.num 
                      ? 'bg-white text-black font-semibold border-white shadow-sm' 
                      : step > st.num
                      ? 'bg-white/10 text-white border-white/20'
                      : 'text-zinc-500 border-white/5 bg-transparent'
                  }`}
                >
                  {st.label}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: CUSTOM BRAND CALENDAR & TIME */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left: Custom Calendar Grid */}
                <div className="md:col-span-7 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  
                  {/* Month Switcher */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      {monthNames[month]} {year}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-mono text-zinc-500">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                      <div key={i} className="py-1 font-semibold">{d}</div>
                    ))}
                  </div>

                  {/* Days Matrix */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Empty leading cells */}
                    {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-2" />
                    ))}

                    {/* Day numbers */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                      const isSelected = selectedDate === dateStr;
                      const isPast = isDateInPast(dayNum);

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-2 rounded-lg text-xs font-mono transition-all select-none ${
                            isSelected
                              ? 'bg-white text-black font-bold shadow-metal-glow scale-105'
                              : isPast
                              ? 'text-zinc-600 opacity-40 cursor-not-allowed'
                              : 'text-zinc-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/15'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white" />
                      <span>Seleccionado: <strong>{selectedDate}</strong></span>
                    </span>
                    <span className="text-zinc-500 font-light">Horario de oficina activo</span>
                  </div>

                </div>

                {/* Right: Time Slots */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div>
                    <label className="text-xs text-zinc-300 block mb-2 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                      <span>Horas Disponibles</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2.5 rounded-xl text-xs font-mono border transition-all text-center ${
                              isSelected
                                ? 'bg-white text-black font-bold border-white shadow-sm scale-[1.02]'
                                : 'bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs space-y-1">
                    <div className="text-zinc-400 font-mono text-[10px] uppercase">Resumen de Turno:</div>
                    <div className="text-white font-semibold">{selectedDate} a las {selectedTime}</div>
                    <div className="text-[11px] text-zinc-400">Duración: 45 min vía Google Meet</div>
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md transition-all"
                >
                  <span>Continuar a Datos de Negocio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          )}

          {/* STEP 2: NICHE, SERVICES & CONTACT DETAILS */}
          {step === 2 && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              onSubmit={handleSubmitBooking}
              className="space-y-5"
            >
              {/* 1. Niche */}
              <div>
                <label className="text-xs text-zinc-300 block mb-2 font-medium">
                  1. Industria o Nicho del Negocio
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {NICHES.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setNiche(n)}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition-colors ${
                        niche === n
                          ? 'bg-white text-black font-semibold border-white shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Services Multi-Select */}
              <div>
                <label className="text-xs text-zinc-300 block mb-2 font-medium">
                  2. Servicios o Soluciones de Interés
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {agentConfig.services.map((srv) => {
                    const isSelected = selectedServices.includes(srv.name);
                    return (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => toggleService(srv.name)}
                        className={`p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-white/10 border-white text-white font-medium shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span className="leading-snug truncate">{srv.name}</span>
                        <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white border-white text-black' : 'border-white/20'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Name, Business, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Mendoza"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Nombre de la Empresa o Marca</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Aura Dermoestética"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">WhatsApp / Teléfono (Para confirmación IA)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 300 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Correo Electrónico (Para Google Meet)</label>
                  <input
                    type="email"
                    required
                    placeholder="sofia@auradermo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              {/* 4. Bottleneck description */}
              <div>
                <label className="text-xs text-zinc-300 block mb-1">
                  Describe brevemente tu cuello de botella actual
                </label>
                <textarea
                  rows="2"
                  placeholder="Ej. Perdemos horas respondiendo mensajes y tenemos cancelaciones sin anticipo previo..."
                  value={bottleneck}
                  onChange={(e) => setBottleneck(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  ← Cambiar fecha
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Registrar Cita en Estado Pendiente</span>
                </button>
              </div>

            </motion.form>
          )}

          {/* STEP 3: SUCCESS & AI AGENT DISPATCH */}
          {step === 3 && createdApt && (
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-4 space-y-6">
              
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-6 h-6" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono mb-2">
                  <span>ESTADO: PENDIENTE DE CONFIRMACIÓN</span>
                </div>
                <h3 className="text-2xl font-bold font-heading-luxury text-white">
                  ¡Cita Registrada Exitosamente!
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto font-light mt-1">
                  Tu espacio tentativo para el <strong>{createdApt.date} a las {createdApt.time}</strong> fue guardado en el sistema.
                </p>
              </div>

              {/* AI Agent Notification Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left space-y-3 font-mono text-xs max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-slate-300 font-semibold border-b border-white/10 pb-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Siguiente Paso: Validación por WhatsApp</span>
                </div>
                <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                  El <strong>Agente IA de Dynamind Studios</strong> ha enviado un mensaje de confirmación al número <strong>{createdApt.phone}</strong>. 
                  Una vez confirmes la cita, el estado cambiará a <strong>Agendado</strong> y se generará tu enlace oficial de Google Meet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveSimAppointment(createdApt);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ver Chat del Agente IA en Tiempo Real</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-xs text-zinc-300 hover:text-white"
                >
                  Cerrar
                </button>
              </div>

            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
