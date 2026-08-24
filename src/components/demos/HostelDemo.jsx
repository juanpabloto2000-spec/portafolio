import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

const ROOMS = [
  {
    id: 'suite-loft',
    name: 'Master Suite Loft',
    type: 'Habitación Privada',
    price: 85,
    capacity: '1 - 2 Huéspedes',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    perks: ['Baño privado de lujo', 'Cama King Size', 'Vista panorámica', 'WiFi 500 Mbps']
  },
  {
    id: 'deluxe-pod',
    name: 'Bunk Pod Signature',
    type: 'Cápsula Premium',
    price: 32,
    capacity: '1 Huésped',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    perks: ['Cortina blackout acústica', 'Locker digital integrado', 'Luz de lectura & USB-C', 'Desayuno incluido']
  },
  {
    id: 'nordic-room',
    name: 'Habitación Doble Nórdica',
    type: 'Habitación Privada',
    price: 65,
    capacity: '2 Huéspedes',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    perks: ['Cama Queen', 'Escritorio para nómadas', 'Smart TV 4K', 'Acceso a terraza coworking']
  }
];

export default function HostelDemo() {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('Alejandro Silva');
  const [guestEmail, setGuestEmail] = useState('alejandro.silva@example.com');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalNightsPrice = selectedRoom.price * nights;
  const depositRequired = Math.round(totalNightsPrice * 0.3);

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1100);
  };

  return (
    <div className="w-full text-white">
      {/* Demo Header */}
      <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading-luxury">Reserva Directa con Validación de Depósito</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Simulador de selección de habitaciones y cobro de garantía</p>
        </div>

        {/* Step Indicators (rounded-xl) */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {[
            { s: 1, label: 'Habitación' },
            { s: 2, label: 'Huésped' },
            { s: 3, label: 'Validación' },
            { s: 4, label: 'Confirmación' },
          ].map(({ s, label }) => (
            <div 
              key={s}
              onClick={() => s < step && setStep(s)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
                step === s 
                  ? 'bg-white text-black border-white font-semibold' 
                  : step > s 
                  ? 'bg-white/10 text-white border-white/20 cursor-pointer' 
                  : 'text-zinc-400 border-white/5'
              }`}
            >
              <span>{s}.</span>
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: ROOM SELECTION */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ROOMS.map((room) => {
              const isSelected = selectedRoom.id === room.id;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white/[0.08] border-white shadow-metal-glow scale-[1.01]' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 relative">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-sm text-white">{room.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{room.capacity}</p>
                    
                    <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                      {room.perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-light">
                          <CheckCircle2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white">${room.price} <span className="text-xs font-normal text-zinc-400">/ noche</span></div>
                    </div>
                    <button
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isSelected ? 'bg-white text-black' : 'bg-white/10 text-white'
                      }`}
                    >
                      {isSelected ? 'Seleccionada' : 'Elegir'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Date Control */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>Estancia: <strong>{nights} Noches</strong></span>
                <div className="flex items-center gap-1 ml-2">
                  <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20">-</button>
                  <button onClick={() => setNights(nights + 1)} className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20">+</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-300" />
                <span>Huéspedes: <strong>{guests}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase">Total Estancia</span>
                <div className="text-base font-bold text-white">${totalNightsPrice} USD</div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 transition-all shadow-md"
              >
                <span>Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: GUEST DETAILS */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Datos del Huésped Principal</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/50"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Correo Electrónico (para voucher)</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/50"
                />
              </div>
            </div>

            {/* Stay Summary Card */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Habitación seleccionada:</span>
                <strong className="text-white">{selectedRoom.name}</strong>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Duración:</span>
                <span>{nights} noches ({guests} personas)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Tarifa total:</span>
                <span>${totalNightsPrice} USD</span>
              </div>
              <div className="flex justify-between text-slate-200 font-semibold pt-2 border-t border-white/10">
                <span>Depósito de Reserva (30%):</span>
                <span className="text-sm">${depositRequired} USD</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light">
                * El 70% restante (${totalNightsPrice - depositRequired} USD) se liquida de forma presencial en el check-in.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                ← Volver a habitaciones
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200"
              >
                <span>Proceder a Validación de Depósito</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: DEPOSIT VALIDATION */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Validación de Anticipo de Seguridad</h3>
                <p className="text-xs text-zinc-400 font-light">Protección contra ausencias y bloqueo inmediato de fechas.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs transition-colors ${
                  paymentMethod === 'card' 
                    ? 'bg-white/10 border-white text-white font-semibold' 
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Tarjeta (Instantáneo)</span>
              </button>
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs transition-colors ${
                  paymentMethod === 'transfer' 
                    ? 'bg-white/10 border-white text-white font-semibold' 
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Voucher Bancario</span>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Número de Tarjeta Simulado</label>
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242"
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Expiración</label>
                    <input type="text" disabled value="12/28" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300 font-mono" />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">CVC</label>
                    <input type="text" disabled value="•••" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300 font-mono" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-2">
                <Upload className="w-6 h-6 text-zinc-400 mx-auto" />
                <p className="text-xs text-zinc-300">Comprobante de transferencia listo para verificación</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setStep(2)} className="text-xs text-zinc-400 hover:text-white">
                ← Volver
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 transition-all shadow-md disabled:opacity-50"
              >
                {isProcessing ? 'Validando...' : `Autorizar Depósito ($${depositRequired} USD)`}
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
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl font-bold font-heading-luxury text-white">¡Estancia Confirmada!</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto font-light">
                El depósito de ${depositRequired} USD fue validado. Se envió el voucher a <span className="text-white">{guestEmail}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Huésped:</span>
                <span className="text-white">{guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Alojamiento:</span>
                <span className="text-white">{selectedRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Código Smart Key:</span>
                <span className="text-emerald-400 font-bold">#4092*</span>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 rounded-xl border border-white/20 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Reiniciar Simulación
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
