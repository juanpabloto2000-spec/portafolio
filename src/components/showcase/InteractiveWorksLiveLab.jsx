import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BedDouble, Utensils, Stethoscope, Check, ArrowRight, ShieldCheck, 
  Sparkles, CreditCard, FileText, KeyRound, RefreshCw, Clock, Users, User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/audioEffects';

export default function InteractiveWorksLiveLab() {
  const [activeDemo, setActiveDemo] = useState('hospedaje'); // 'hospedaje' | 'gastrobar' | 'clinica'

  // ==========================================
  // ESTADO DEMO 1: HOSPEDAJE & CABAÑAS (4 FASES)
  // ==========================================
  const [hospedajeStep, setHospedajeStep] = useState(1);
  const roomsList = [
    {
      id: 'domo-geodesico',
      name: 'Domo Geodésico Panorámico',
      type: 'Glamping de Lujo',
      price: 85,
      capacity: '2 Huéspedes',
      image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80',
      perks: ['Jacuzzi privado hidromasaje', 'Malla catamarán suspendida', 'Desayuno de origen incluido']
    },
    {
      id: 'cabana-familiar',
      name: 'Cabaña Familiar del Bosque',
      type: 'Suite Familiar',
      price: 120,
      capacity: '4 Huéspedes',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
      perks: ['Chimenea a leña nórdica', 'Cocina equipada & terraza BBQ', 'Avistamiento de aves matutino']
    },
    {
      id: 'nordic-room',
      name: 'Habitación Doble Nórdica',
      type: 'Suite Privada',
      price: 65,
      capacity: '2 Huéspedes',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      perks: ['Cama King size ortopédica', 'Escritorio nómada digital', 'Smart TV 4K & Wi-Fi Starlink']
    }
  ];

  const [selectedRoom, setSelectedRoom] = useState(roomsList[0]);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('Carlos Mendoza');
  const [guestEmail, setGuestEmail] = useState('carlos.mendoza@empresa.com');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isValidatingDeposit, setIsValidatingDeposit] = useState(false);

  const totalStay = selectedRoom.price * nights;
  const deposit30 = Math.round(totalStay * 0.3);

  const handleAuthorizeDeposit = () => {
    soundFx.playScanTone();
    setIsValidatingDeposit(true);
    setTimeout(() => {
      setIsValidatingDeposit(false);
      setHospedajeStep(4);
      soundFx.playSuccessChord();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }, 1100);
  };

  // ==========================================
  // ESTADO DEMO 2: GASTROBAR & COMANDAS KDS
  // ==========================================
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Gin Tonic de Frutos Rojos', price: 34000, qty: 1 },
    { id: 2, name: 'Tacos de Birria Madurada 12h (x3)', price: 38000, qty: 1 }
  ]);
  const [orderSent, setOrderSent] = useState(false);
  const totalGastrobar = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSendOrder = () => {
    soundFx.playScanTone();
    setOrderSent(true);
    setTimeout(() => {
      soundFx.playSuccessChord();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }, 300);
  };

  // ==========================================
  // ESTADO DEMO 3: CLÍNICA DENTAL 3D
  // ==========================================
  const dentalProcedures = [
    { id: 'smile-design', title: 'Diseño de Sonrisa & Carillas Cerámicas', duration: '60 min', specialist: 'Dra. Valeria Montes (Especialista en Estética)', desc: 'Simulación digital 3D y evaluación personalizada de proporciones dentofaciales.' },
    { id: 'invisalign', title: 'Ortodoncia Invisible Digital', duration: '45 min', specialist: 'Dr. Santiago Peña (Ortodoncista Certificado)', desc: 'Escaneo intraoral 3D sin moldes incómodos para planificación de alineadores.' },
    { id: 'whitening', title: 'Profilaxis & Blanqueamiento Láser LED', duration: '50 min', specialist: 'Equipo de Higiene Clínica VIP', desc: 'Limpieza ultrasónica sin dolor y aplicación de gel de peróxido acelerado.' }
  ];
  const [selectedProcedure, setSelectedProcedure] = useState(dentalProcedures[0]);
  const [triageDone, setTriageDone] = useState(false);

  return (
    <div className="w-full space-y-6">
      
      {/* Encabezado del Laboratorio de Demos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[11px] font-bold uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Laboratorio de Ingeniería Interactiva en Vivo</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Prueba Nuestras Soluciones Operativas en Tiempo Real
          </h2>
          <p className="text-xs sm:text-sm font-sans text-zinc-300">
            Interactúa directamente con los flujos de reservas, comandas y triajes que erradican las comisiones abusivas.
          </p>
        </div>

        {/* Selector de Pestañas de Demo */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl">
          <button
            onClick={() => { soundFx.playBlip(); setActiveDemo('hospedaje'); }}
            className={`px-3.5 py-2 rounded-lg font-sans text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeDemo === 'hospedaje'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>01. Hospedaje</span>
          </button>

          <button
            onClick={() => { soundFx.playBlip(); setActiveDemo('gastrobar'); }}
            className={`px-3.5 py-2 rounded-lg font-sans text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeDemo === 'gastrobar'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>02. Gastrobar</span>
          </button>

          <button
            onClick={() => { soundFx.playBlip(); setActiveDemo('clinica'); }}
            className={`px-3.5 py-2 rounded-lg font-sans text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeDemo === 'clinica'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>03. Clínica 3D</span>
          </button>
        </div>
      </div>

      {/* Contenedor Principal del Simulador */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-white/[0.025] backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* ========================================================= */}
        {/* DEMO 1: HOSPEDAJE & CABAÑAS (4 FASES ATÓMICAS)            */}
        {/* ========================================================= */}
        {activeDemo === 'hospedaje' && (
          <div className="space-y-6">
            
            {/* Header de Fases */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  Reserva Directa con Validación de Depósito (Andicas Bioparque)
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Simulador de selección de suites y cobro de garantía sin pagar el 20% a Booking ni Airbnb.
                </p>
              </div>

              {/* Steps 1 a 4 */}
              <div className="flex items-center gap-1.5 text-xs font-sans">
                {[
                  { s: 1, label: 'Habitación' },
                  { s: 2, label: 'Huésped' },
                  { s: 3, label: 'Validación' },
                  { s: 4, label: 'Confirmación' }
                ].map(({ s, label }) => (
                  <button
                    key={s}
                    onClick={() => { soundFx.playBlip(); if (s < hospedajeStep) setHospedajeStep(s); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                      hospedajeStep === s
                        ? 'bg-white text-black border-white font-bold shadow-md'
                        : hospedajeStep > s
                        ? 'bg-white/10 text-white border-white/20 cursor-pointer'
                        : 'text-zinc-500 border-white/5 cursor-not-allowed'
                    }`}
                  >
                    <span>0{s}.</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FASE 1: HABITACIÓN */}
            {hospedajeStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roomsList.map((room) => {
                    const isSelected = selectedRoom.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => { soundFx.playBlip(); setSelectedRoom(room); }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-950/30 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.01]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 relative">
                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-zinc-300">
                              {room.capacity}
                            </div>
                          </div>
                          <h4 className="font-display font-bold text-sm text-white">{room.name}</h4>
                          <p className="text-xs text-zinc-400 font-sans mt-0.5">{room.type}</p>
                          
                          <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                            {room.perks.map((perk, pIdx) => (
                              <div key={pIdx} className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-sans">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{perk}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-white">${room.price}</span>
                            <span className="text-xs text-zinc-400 font-sans"> USD / noche</span>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-sans font-semibold ${
                            isSelected ? 'bg-white text-black' : 'bg-white/10 text-white'
                          }`}>
                            {isSelected ? 'Seleccionada' : 'Elegir'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Barra de Ajuste de Noches & Total */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6 text-xs text-zinc-300 font-sans">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Estancia: <strong>{nights} Noches</strong></span>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => { soundFx.playBlip(); setNights(Math.max(1, nights - 1)); }}
                          className="w-6 h-6 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                        >
                          -
                        </button>
                        <button
                          onClick={() => { soundFx.playBlip(); setNights(nights + 1); }}
                          className="w-6 h-6 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>Huéspedes: <strong>{guests}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono block">Total Estancia</span>
                      <div className="text-base font-bold text-white">${totalStay} USD</div>
                    </div>
                    <button
                      onClick={() => { soundFx.playBlip(); setHospedajeStep(2); }}
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-sans font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
                    >
                      <span>Continuar al Paso 2</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FASE 2: DATOS DEL HUÉSPED */}
            {hospedajeStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-base font-bold text-white font-display">Datos del Huésped Principal</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 block font-sans">Nombre Completo:</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 block font-sans">Correo para Voucher Digital:</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Resumen Financiero */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-zinc-300">
                      <span>Alojamiento:</span>
                      <strong className="text-white">{selectedRoom.name}</strong>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Duración:</span>
                      <span>{nights} noches ({guests} huéspedes)</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Tarifa Total:</span>
                      <span>${totalStay} USD</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-white/10 text-sm">
                      <span>Depósito Requerido (30%):</span>
                      <span>${deposit30} USD</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light pt-1">
                      * El 70% restante (${totalStay - deposit30} USD) se liquida presencialmente en el Check-In.
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => { soundFx.playBlip(); setHospedajeStep(1); }}
                      className="text-xs text-zinc-400 hover:text-white font-sans"
                    >
                      ← Volver a habitaciones
                    </button>
                    <button
                      onClick={() => { soundFx.playBlip(); setHospedajeStep(3); }}
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-sans font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
                    >
                      <span>Validar Anticipo de Seguridad</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FASE 3: VALIDACIÓN DEL DEPÓSITO */}
            {hospedajeStep === 3 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">Validación de Anticipo de Seguridad</h4>
                      <p className="text-xs text-zinc-400 font-sans">Bloqueo inmediato de fechas y protección contra inasistencias.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { soundFx.playBlip(); setPaymentMethod('card'); }}
                      className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-sans transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-cyan-950/40 border-cyan-400 text-white font-bold'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Tarjeta (Instantáneo)</span>
                    </button>
                    <button
                      onClick={() => { soundFx.playBlip(); setPaymentMethod('transfer'); }}
                      className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-sans transition-all cursor-pointer ${
                        paymentMethod === 'transfer'
                          ? 'bg-cyan-950/40 border-cyan-400 text-white font-bold'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>Voucher Bancario</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' ? (
                    <div className="space-y-3 p-4 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Número de Tarjeta Simulado:</label>
                        <input type="text" disabled value="•••• •••• •••• 4242" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">Expiración:</label>
                          <input type="text" disabled value="12/28" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300" />
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">CVC:</label>
                          <input type="text" disabled value="•••" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-center space-y-2">
                      <FileText className="w-6 h-6 text-zinc-400 mx-auto" />
                      <p className="text-xs text-zinc-300 font-sans">Comprobante de transferencia bancaria listo para verificación automática.</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => { soundFx.playBlip(); setHospedajeStep(2); }}
                      className="text-xs text-zinc-400 hover:text-white font-sans"
                    >
                      ← Volver
                    </button>
                    <button
                      onClick={handleAuthorizeDeposit}
                      disabled={isValidatingDeposit}
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-sans font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isValidatingDeposit ? 'Validando Depósito...' : `Autorizar Depósito ($${deposit30} USD)`}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FASE 4: CONFIRMACIÓN & SMART KEY */}
            {hospedajeStep === 4 && (
              <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl mx-auto">
                <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl text-center space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold font-display text-white">¡Estancia Confirmada & Fechas Bloqueadas!</h4>
                    <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto font-sans">
                      El anticipo de ${deposit30} USD fue acreditado. Se envió el voucher con código QR a <strong className="text-white">{guestEmail}</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-left space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Huésped Titular:</span>
                      <span className="text-white font-bold">{guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Alojamiento:</span>
                      <span className="text-white">{selectedRoom.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-2">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Código Smart Key:</span>
                      </span>
                      <span className="text-emerald-400 font-bold font-mono text-sm px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40">
                        #4092*
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => { soundFx.playBlip(); setHospedajeStep(1); }}
                    className="px-6 py-2 rounded-xl border border-white/20 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-sans"
                  >
                    Reiniciar Simulación
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* DEMO 2: GASTROBAR & COMANDAS KDS                          */}
        {/* ========================================================= */}
        {activeDemo === 'gastrobar' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">
                Menú Táctil QR & Generador de Comanda en Mesa (Kal Disco Bar)
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Simula la experiencia de un cliente pidiendo directamente en mesa con transmisión inmediata a cocina.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-white/10 bg-black/40 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-white">{item.name}</h5>
                    <p className="text-xs text-zinc-400 font-mono">${item.price.toLocaleString()} COP</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { soundFx.playBlip(); setCartItems(items => items.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i)); }}
                      className="w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-white font-bold text-sm w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => { soundFx.playBlip(); setCartItems(items => items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)); }}
                      className="w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-mono">Total de la Comanda:</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  ${totalGastrobar.toLocaleString()} COP
                </div>
              </div>

              {orderSent ? (
                <div className="text-emerald-400 font-bold text-xs flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/40 px-4 py-2 rounded-xl font-sans">
                  <Check className="w-4 h-4" />
                  <span>¡Comanda Transmitida a Pantalla KDS de Cocina!</span>
                </div>
              ) : (
                <button
                  onClick={handleSendOrder}
                  disabled={totalGastrobar === 0}
                  className="px-6 py-3 rounded-xl bg-white text-black font-sans font-bold text-xs uppercase hover:bg-zinc-200 transition-colors cursor-pointer shadow-md disabled:opacity-40"
                >
                  Emitir Comanda Viva a Cocina
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DEMO 3: CLÍNICA DENTAL 3D                                 */}
        {/* ========================================================= */}
        {activeDemo === 'clinica' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">
                Triaje Dental Guiado por Procedimientos (Lorena Terranova / Lúmina)
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Filtra a pacientes calificados y agenda valoración clínica con depósito de compromiso.
              </p>
            </div>

            <div className="space-y-3">
              {dentalProcedures.map((proc) => {
                const isSelected = selectedProcedure.id === proc.id;
                return (
                  <button
                    key={proc.id}
                    onClick={() => { soundFx.playBlip(); setSelectedProcedure(proc); }}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-white">{proc.title}</div>
                      <p className="text-xs text-zinc-400 font-sans">{proc.desc}</p>
                      <div className="text-[11px] text-cyan-400 font-mono pt-1">
                        Especialista: {proc.specialist}
                      </div>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 shrink-0 bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
                      {proc.duration}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-mono">Protocolo Clínico Seleccionado:</span>
                <div className="text-sm font-bold text-white font-sans">
                  {selectedProcedure.title}
                </div>
              </div>

              {triageDone ? (
                <div className="text-emerald-400 font-bold text-xs flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/40 px-4 py-2 rounded-xl font-sans">
                  <Check className="w-4 h-4" />
                  <span>¡Cita Prioritaria con Escáner 3D Reservada!</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    soundFx.playScanTone();
                    setTriageDone(true);
                    setTimeout(() => {
                      soundFx.playSuccessChord();
                      try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } }); } catch {}
                    }, 300);
                  }}
                  className="px-6 py-3 rounded-xl bg-white text-black font-sans font-bold text-xs uppercase hover:bg-zinc-200 transition-colors cursor-pointer shadow-md"
                >
                  Agendar Valoración Clínica
                </button>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
