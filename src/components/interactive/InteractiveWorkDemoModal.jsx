import React, { useState, useEffect } from 'react';
import { X, Check, Utensils, BedDouble, Stethoscope, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveWorkDemoModal({ isOpen = false, initialTab = 'gastrobar', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'gastrobar' | 'hospedaje' | 'clinica'

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Estado Demo 1: Gastrobar
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Gin Tonic de Frutos Rojos', price: 34000, qty: 1 },
    { id: 2, name: 'Tacos de Birria Madurada 12h (x3)', price: 38000, qty: 1 },
  ]);
  const [orderSent, setOrderSent] = useState(false);

  // Estado Demo 2: Hospedaje
  const [selectedCabin, setSelectedCabin] = useState({ name: 'Suite Jacuzzi Panorámica', ratePerNight: 380000 });
  const [nights, setNights] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Estado Demo 3: Clínica
  const [selectedSymptom, setSelectedSymptom] = useState('diseño_sonrisa');
  const [triageDone, setTriageDone] = useState(false);

  const totalGastrobar = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalHospedaje = selectedCabin.ratePerNight * nights;
  const deposit50 = Math.round(totalHospedaje * 0.5);

  const handleSendOrder = () => {
    setOrderSent(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-obsidian border border-white/20 rounded-2xl shadow-monolith font-mono text-xs overflow-hidden"
      >
        
        {/* Cabecera del Modal con Tabs de Demos */}
        <div className="bg-zinc-950 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white text-xs uppercase">
              Simulador de Demos Funcionales en Vivo
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white border border-white/10 rounded-lg hover:border-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selector de Demo Funcional */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.015]">
          <button
            onClick={() => setActiveTab('gastrobar')}
            className={`py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'gastrobar'
                ? 'border-white text-white font-bold bg-white/[0.04]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span className="truncate">Comanda Gastrobar</span>
          </button>

          <button
            onClick={() => setActiveTab('hospedaje')}
            className={`py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'hospedaje'
                ? 'border-white text-white font-bold bg-white/[0.04]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BedDouble className="w-3.5 h-3.5" />
            <span className="truncate">Anticipo Cabañas</span>
          </button>

          <button
            onClick={() => setActiveTab('clinica')}
            className={`py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'clinica'
                ? 'border-white text-white font-bold bg-white/[0.04]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span className="truncate">Triaje Dental</span>
          </button>
        </div>

        {/* Contenido Dinámico de los Demos */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* DEMO 1: COMANDA GASTROBAR (Kal / Bella Vista) */}
          {activeTab === 'gastrobar' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">
                  Menú Táctil & Generador de Comanda en Mesa
                </div>
                <div className="text-[11px] text-zinc-400 font-sans">
                  Simula la experiencia de un comensal pidiendo directamente sin intermediarios ni demoras.
                </div>
              </div>

              {/* Lista de Items */}
              <div className="space-y-2 border border-white/10 rounded-xl p-3 bg-black/40">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                    <div>
                      <div className="text-white font-semibold text-xs">{item.name}</div>
                      <div className="text-zinc-400 text-[10px]">${item.price.toLocaleString()} COP</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCartItems(items => items.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i))}
                        className="w-6 h-6 rounded bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-white font-bold text-xs w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => setCartItems(items => items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                        className="w-6 h-6 rounded bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total y Acción */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">Total de Comanda:</div>
                  <div className="text-base font-bold text-emerald-400">
                    ${totalGastrobar.toLocaleString()} COP
                  </div>
                </div>

                {orderSent ? (
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>¡Comanda Transmitida a Cocina!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSendOrder}
                    disabled={totalGastrobar === 0}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold uppercase hover:bg-platinum transition-colors disabled:opacity-30"
                  >
                    Emitir Comanda Viva
                  </button>
                )}
              </div>
            </div>
          )}

          {/* DEMO 2: RESERVAS & ANTICIPO (Andicas Bioparque) */}
          {activeTab === 'hospedaje' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">
                  Motor de Reservas Directas con Anticipo Garantizado
                </div>
                <div className="text-[11px] text-zinc-400 font-sans">
                  Elimina el 18% de comisión de Booking/Airbnb capturando el 50% de anticipo directo al WhatsApp del hotel.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedCabin({ name: 'Suite Jacuzzi Panorámica', ratePerNight: 380000 })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCabin.name.includes('Jacuzzi')
                      ? 'border-white bg-white/[0.06] text-white font-bold'
                      : 'border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs">Suite Jacuzzi</div>
                  <div className="text-[10px] text-zinc-400">$380,000 / noche</div>
                </button>

                <button
                  onClick={() => setSelectedCabin({ name: 'Cabaña Familiar Bosque', ratePerNight: 490000 })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCabin.name.includes('Familiar')
                      ? 'border-white bg-white/[0.06] text-white font-bold'
                      : 'border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs">Cabaña Familiar</div>
                  <div className="text-[10px] text-zinc-400">$490,000 / noche</div>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-black/40">
                <span className="text-zinc-300">Número de Noches:</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      onClick={() => setNights(n)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        nights === n ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">Anticipo Requerido (50%):</div>
                  <div className="text-base font-bold text-emerald-400">
                    ${deposit50.toLocaleString()} COP <span className="text-[10px] text-zinc-400 font-normal">/ Total: ${totalHospedaje.toLocaleString()}</span>
                  </div>
                </div>

                {bookingConfirmed ? (
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>¡Fechas Bloqueadas con Éxito!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleConfirmBooking}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold uppercase hover:bg-platinum transition-colors"
                  >
                    Bloquear Fechas
                  </button>
                )}
              </div>
            </div>
          )}

          {/* DEMO 3: TRIAJE CLÍNICO (Luminous / Lorena Terranova) */}
          {activeTab === 'clinica' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">
                  Triaje de Valoración Clínica Guiado por Síntomas
                </div>
                <div className="text-[11px] text-zinc-400 font-sans">
                  Filtra a pacientes calificados antes de que lleguen a la recepción de la clínica.
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'diseño_sonrisa', label: 'Diseño de Sonrisa & Carillas Cerámicas', est: '$1,200 – $2,500 USD' },
                  { id: 'implantes', label: 'Implantología Digital & Cirugía Guiada', est: '$800 – $1,800 USD' },
                  { id: 'limpieza_blanqueamiento', label: 'Limpieza Profunda & Blanqueamiento Láser', est: '$120 – $250 USD' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSymptom(s.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedSymptom === s.id
                        ? 'border-white bg-white/[0.06] text-white font-bold'
                        : 'border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] text-zinc-500 font-normal">{s.est}</span>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">Protocolo Clínico:</div>
                  <div className="text-xs font-bold text-white">
                    Valoración Presencial + Escaneo Intraoral 3D
                  </div>
                </div>

                {triageDone ? (
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>¡Cita Prioritaria Lista!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setTriageDone(true);
                      try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } }); } catch {}
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold uppercase hover:bg-platinum transition-colors"
                  >
                    Agendar Valoración
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
