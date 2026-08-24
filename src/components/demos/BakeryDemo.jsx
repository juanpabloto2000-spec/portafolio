import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const TIERS = [
  { id: '1-tier', name: '1 Piso Editorial', portions: '12 - 16 Porciones', basePrice: 65, desc: 'Ideal para aniversarios y cenas íntimas.' },
  { id: '2-tier', name: '2 Pisos Escultóricos', portions: '30 - 38 Porciones', basePrice: 130, desc: 'Estructura estilizada para eventos y bodas boutique.' },
  { id: '3-tier', name: '3 Pisos de Gala', portions: '65 - 80 Porciones', basePrice: 240, desc: 'Gran impacto visual con soporte interno reforzado.' }
];

const FLAVORS = [
  { id: 'pistachio', name: 'Pistacho Bronte & Frambuesa Silvestre', premium: 15 },
  { id: 'truffle', name: 'Ganache Chocolate 70% & Praliné de Avellanas', premium: 12 },
  { id: 'vanilla-berry', name: 'Vainilla Bourbon & Curd de Maracuyá', premium: 10 },
  { id: 'red-velvet', name: 'Red Velvet de Terciopelo con Mascarpone', premium: 8 }
];

export default function BakeryDemo() {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [inscription, setInscription] = useState('Happy Birthday Sofia');
  const [eventDate, setEventDate] = useState('2026-09-05');
  const [isOrdering, setIsOrdering] = useState(false);

  const totalPrice = selectedTier.basePrice + selectedFlavor.premium;
  const deposit50 = Math.round(totalPrice * 0.5);

  const handleConfirmOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setStep(3);
      confetti({ particleCount: 85, spread: 70 });
    }, 1100);
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading-luxury">Personalizador de Pastelería & Bloqueo de Cupo</h2>
          <p className="text-xs text-zinc-400 mt-0.5 font-light">Configuración visual de tartas artesanales y cálculo de anticipo</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono">
          {['1. Configuración', '2. Anticipo 50%', '3. Confirmación'].map((lbl, idx) => (
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

      {/* STEP 1: CONFIGURATION */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Tiers */}
          <div>
            <label className="text-xs text-zinc-400 block mb-2 font-medium">
              1. Selecciona el Formato / Pisos
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-white/10 border-white shadow-metal-glow' 
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-white">{tier.name}</h4>
                      <span className="text-xs font-mono font-semibold text-slate-300">${tier.basePrice}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">{tier.portions}</p>
                    <p className="text-[11px] text-zinc-400 mt-2 font-light">{tier.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flavors */}
          <div>
            <label className="text-xs text-zinc-400 block mb-2 font-medium">
              2. Sabor & Relleno
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FLAVORS.map((fl) => {
                const isSelected = selectedFlavor.id === fl.id;
                return (
                  <div
                    key={fl.id}
                    onClick={() => setSelectedFlavor(fl)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-white/10 border-white shadow-metal-glow' 
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <h4 className="font-medium text-xs text-white">{fl.name}</h4>
                    <span className="text-xs font-mono text-zinc-400">+${fl.premium}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inscription & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Dedicatoria</label>
              <input
                type="text"
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Fecha de Entrega</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase">Presupuesto Estimado</span>
              <div className="text-base font-bold text-white">${totalPrice} USD <span className="text-xs font-normal text-zinc-400">({selectedTier.portions})</span></div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200"
            >
              <span>Continuar con Anticipo del 50%</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: 50% DEPOSIT */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Bloqueo de Fecha en Producción</h3>
                <p className="text-xs text-zinc-400 font-light">Se requiere el 50% para asegurar los insumos y la fecha en el atelier.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2">
              <div className="flex justify-between text-zinc-300">
                <span>Diseño:</span>
                <strong className="text-white">{selectedTier.name}</strong>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Sabor:</span>
                <span>{selectedFlavor.name}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Fecha:</span>
                <span>{eventDate}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                <span>Anticipo Requerido (50%):</span>
                <span>${deposit50} USD</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white">
                ← Modificar
              </button>
              <button
                onClick={handleConfirmOrder}
                disabled={isOrdering}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md disabled:opacity-50"
              >
                {isOrdering ? 'Validando...' : `Pagar Anticipo ($${deposit50} USD) y Confirmar`}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: CONFIRMED */}
      {step === 3 && (
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Cake className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl font-bold font-heading-luxury text-white">¡Fecha Asegurada!</h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                El anticipo de ${deposit50} USD fue procesado. Preparación agendada para el {eventDate}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Saldo pendiente al recibir:</span>
                <span className="text-emerald-400 font-bold">${totalPrice - deposit50} USD</span>
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
