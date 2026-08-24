import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ArrowRight, Stethoscope } from 'lucide-react';
import confetti from 'canvas-confetti';

const PROCEDURES = [
  {
    id: 'smile-design',
    title: 'Diseño de Sonrisa & Carillas',
    category: 'Estética Dental',
    duration: '60 min',
    specialist: 'Dra. Valeria Montes (Especialista en Estética)',
    desc: 'Simulación digital 3D y evaluación personalizada de proporciones dentofaciales.'
  },
  {
    id: 'invisalign',
    title: 'Ortodoncia Invisible',
    category: 'Ortodoncia',
    duration: '45 min',
    specialist: 'Dr. Santiago Peña (Ortodoncista Certificado)',
    desc: 'Escaneo intraoral sin moldes incómodos para planificación de alineadores.'
  },
  {
    id: 'whitening',
    title: 'Profilaxis & Blanqueamiento LED',
    category: 'Salud & Brillo',
    duration: '50 min',
    specialist: 'Equipo de Higiene Clínica',
    desc: 'Limpieza ultrasónica con ultrasonido y aclaramiento dental de alta potencia.'
  },
  {
    id: 'urgency',
    title: 'Atención Prioritaria / Dolor',
    category: 'Urgencia',
    duration: '30 min',
    specialist: 'Cirujano de Guardia',
    desc: 'Diagnóstico radiográfico inmediato y alivio de molestias agudas.'
  }
];

const TIME_SLOTS = [
  '09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM', '05:30 PM'
];

export default function DentalDemo() {
  const [step, setStep] = useState(1);
  const [selectedProc, setSelectedProc] = useState(PROCEDURES[0]);
  const [selectedDate, setSelectedDate] = useState('2026-08-28');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('Camila Restrepo');
  const [patientPhone, setPatientPhone] = useState('+57 312 849 2011');
  const [isBooking, setIsBooking] = useState(false);

  const handleCompleteBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setStep(4);
      confetti({ particleCount: 70, spread: 50 });
    }, 1000);
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading-luxury">Triaje Guiado & Agendamiento de Precisión</h2>
          <p className="text-xs text-zinc-400 mt-0.5 font-light">Selección visual de tratamientos y sincronización de horarios</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {['1. Motivo', '2. Horario', '3. Paciente', '4. Ficha'].map((lbl, idx) => (
            <div 
              key={idx} 
              className={`px-3 py-1 rounded-lg border ${
                step === idx + 1 
                  ? 'bg-white text-black font-semibold border-white' 
                  : step > idx + 1 
                  ? 'bg-white/10 text-white border-white/20 cursor-pointer' 
                  : 'text-zinc-400 border-white/5'
              }`}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: PROCEDURE SELECTOR */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROCEDURES.map((proc) => {
              const isSelected = selectedProc.id === proc.id;
              return (
                <div
                  key={proc.id}
                  onClick={() => setSelectedProc(proc)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white/[0.08] border-white shadow-metal-glow scale-[1.01]' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-300 font-medium">{proc.category}</span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> {proc.duration}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{proc.title}</h3>
                    <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">{proc.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-zinc-400 truncate max-w-[200px]">{proc.specialist}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${isSelected ? 'bg-white text-black' : 'bg-white/5 text-white'}`}>
                      {isSelected ? 'Elegido' : 'Seleccionar'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md"
            >
              <span>Continuar a Selección de Horario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: DATE & TIME */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Disponibilidad en Tiempo Real</h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-light">Agenda de {selectedProc.specialist}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Fecha de Consulta
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Turnos Disponibles
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono border transition-colors ${
                        selectedTime === time 
                          ? 'bg-white text-black font-semibold border-white' 
                          : 'bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white">
                ← Volver
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200"
              >
                <span>Confirmar Paciente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: PATIENT FORM */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-5">
            <h3 className="text-base font-bold text-white">Información para Expediente Clínico</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nombre Completo del Paciente</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">WhatsApp para Recordatorios</label>
                <input
                  type="text"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-2">
              <div className="flex justify-between text-zinc-300">
                <span>Tratamiento:</span>
                <strong className="text-white">{selectedProc.title}</strong>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Fecha y Hora:</span>
                <span>{selectedDate} a las {selectedTime}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setStep(2)} className="text-xs text-zinc-400 hover:text-white">
                ← Volver
              </button>
              <button
                onClick={handleCompleteBooking}
                disabled={isBooking}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md disabled:opacity-50"
              >
                {isBooking ? 'Agendando...' : 'Confirmar y Bloquear Cita'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 4: CONFIRMATION */}
      {step === 4 && (
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Stethoscope className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl font-bold font-heading-luxury text-white">Cita Confirmada</h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Se envió confirmación al WhatsApp <span className="text-white">{patientPhone}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Paciente:</span>
                <span className="text-white">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Cita:</span>
                <span className="text-white">{selectedDate} - {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tratamiento:</span>
                <span className="text-white">{selectedProc.title}</span>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 rounded-xl border border-white/20 text-xs text-zinc-300 hover:text-white hover:bg-white/5"
            >
              Reiniciar Simulación
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
