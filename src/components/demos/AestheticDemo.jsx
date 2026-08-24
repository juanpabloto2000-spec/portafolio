import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const TREATMENTS = [
  {
    id: 'facial-harmonization',
    name: 'Armonización Facial & Lifting Líquido',
    area: 'Rostro Completo',
    recovery: 'Inmediata (Sin reposo)',
    sessions: '1 Sesión + Retoque',
    deposit: 50,
    desc: 'Reposición volumétrica con ácido hialurónico reticulado de alta gama y bioestimuladores de colágeno.'
  },
  {
    id: 'lip-contour',
    name: 'Russian Lips & Perfilado Labial',
    area: 'Labios',
    recovery: '24 - 48 hrs',
    sessions: '1 Sesión anual',
    deposit: 40,
    desc: 'Microinyecciones verticales para volumen natural, definición del arco de cupido y corrección de asimetrías.'
  },
  {
    id: 'laser-rejuvenation',
    name: 'Láser Fraccionado CO2',
    area: 'Textura & Manchas',
    recovery: '4 - 5 días',
    sessions: '2 a 3 Sesiones',
    deposit: 60,
    desc: 'Renovación epidérmica para cicatrices de acné, poros dilatados y líneas de expresión.'
  },
  {
    id: 'jawline-sculpt',
    name: 'Perfilado & Definición Mandibular',
    area: 'Tercio Inferior',
    recovery: 'Inmediata',
    sessions: '1 Sesión cada 18 meses',
    deposit: 50,
    desc: 'Estructuración del ángulo mandibular para proyección elegante y definición del contorno facial.'
  }
];

export default function AestheticDemo() {
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENTS[0]);
  const [date, setDate] = useState('2026-08-29');
  const [time, setTime] = useState('03:00 PM');
  const [clientName, setClientName] = useState('Elena Valenzuela');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmVIP = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      confetti({ particleCount: 75, spread: 60 });
    }, 1000);
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading-luxury">Catálogo Editorial & Reserva de Valoración</h2>
          <p className="text-xs text-zinc-400 mt-0.5 font-light">Procedimientos dermoestéticos con reserva de consulta médica</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {['1. Procedimiento', '2. Anticipo', '3. Confirmación'].map((lbl, idx) => (
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

      {/* STEP 1: TREATMENT SELECTION */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TREATMENTS.map((tr) => {
              const isSelected = selectedTreatment.id === tr.id;
              return (
                <div
                  key={tr.id}
                  onClick={() => setSelectedTreatment(tr)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white/[0.08] border-white shadow-metal-glow scale-[1.01]' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-300 font-medium">{tr.area}</span>
                      <span className="text-xs text-zinc-400 font-mono">
                        Abono de Valoración: ${tr.deposit} USD
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{tr.name}</h3>
                    <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">{tr.desc}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-300">
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Recuperación:</span>
                        <span>{tr.recovery}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Sesiones:</span>
                        <span>{tr.sessions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-light">* 100% abonable al tratamiento</span>
                    <button className={`px-3 py-1 rounded-lg text-xs font-semibold ${isSelected ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                      {isSelected ? 'Seleccionado' : 'Elegir'}
                    </button>
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
              <span>Continuar a Reserva de Cita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: APPOINTMENT DEPOSIT */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Validación de Consulta Privada</h3>
                <p className="text-xs text-zinc-400 font-light">El depósito de ${selectedTreatment.deposit} USD se descuenta del costo total del tratamiento.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nombre Completo del Paciente</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Hora Deseada</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2">
              <div className="flex justify-between text-zinc-300">
                <span>Procedimiento:</span>
                <strong className="text-white">{selectedTreatment.name}</strong>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Depósito de Bloqueo:</span>
                <span className="text-white font-bold">${selectedTreatment.deposit} USD</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white">
                ← Volver
              </button>
              <button
                onClick={handleConfirmVIP}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md disabled:opacity-50"
              >
                {isProcessing ? 'Validando...' : `Validar Depósito ($${selectedTreatment.deposit} USD) & Agendar`}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: CONFIRMATION */}
      {step === 3 && (
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl font-bold font-heading-luxury text-white">Cita Confirmada</h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                El depósito fue validado. Espacio reservado para {clientName} el {date} a las {time}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Tratamiento:</span>
                <span className="text-white">{selectedTreatment.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Monto Abonado:</span>
                <span className="text-emerald-400 font-bold">${selectedTreatment.deposit} USD</span>
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
