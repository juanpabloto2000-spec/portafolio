import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Wine, ShieldCheck, ArrowRight, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

const MENU_ITEMS = {
  entradas: [
    {
      id: 'tartar-atun',
      name: 'Tartar de Atún Rojo & Trufa',
      price: 24,
      desc: 'Atún de aleta azul, emulsión de trufa negra, yema curada y láminas de sésamo tostado.',
    },
    {
      id: 'carpaccio-wagyu',
      name: 'Carpaccio de Wagyu A5 Ahumado',
      price: 28,
      desc: 'Finas láminas de wagyu japonés, virutas de Parmigiano Reggiano 36 meses y aceite de oliva virgen extra.',
    }
  ],
  principales: [
    {
      id: 'ribeye-dry-aged',
      name: 'Ribeye Dry Aged 45 Días',
      price: 48,
      desc: 'Corte madurado al carbón de encina con mantequilla noisette y puré de papas trufado.',
    },
    {
      id: 'risotto-setas',
      name: 'Risotto de Setas Silvestres & Foie',
      price: 34,
      desc: 'Arroz carnaroli con boletus edulis frescos, reducción de oporto y medallón de foie gras sellado.',
    }
  ],
  cocteleria: [
    {
      id: 'smoky-mezcalita',
      name: 'Smoky Obsidian Mezcalita',
      price: 18,
      desc: 'Mezcal artesanal espadín, infusión de carbón activado, licor de damiana y sal de gusano ahumada.',
    },
    {
      id: 'aged-negroni',
      name: 'Negroni Añejado en Barrica de Roble',
      price: 19,
      desc: 'Gin botánico, Campari macerado con piel de naranja sanguina y Vermouth Rosso añejo.',
    }
  ]
};

const ZONES = [
  { id: 'salon', name: 'Salón Principal', desc: 'Ambiente íntimo con iluminación cenital' },
  { id: 'terraza', name: 'Terraza Panorámica', desc: 'Vista a la ciudad con calefactores' },
  { id: 'cava', name: 'Cava Privada VIP', desc: 'Mesa rodeada de nuestra colección de vinos' }
];

export default function RestaurantDemo() {
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('entradas');
  const [cart, setCart] = useState([]);
  const [selectedZone, setSelectedZone] = useState(ZONES[0]);
  const [guests, setGuests] = useState(2);
  const [resDate, setResDate] = useState('2026-08-29');
  const [resTime, setResTime] = useState('08:30 PM');
  const [clientName, setClientName] = useState('Mauricio Gaviria');
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tableDeposit = 25 * guests;

  const handleConfirmReservation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('confirmacion');
      confetti({ particleCount: 80, spread: 60 });
    }, 1100);
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading-luxury">Menú Táctil & Pre-Comanda con Reserva de Mesa</h2>
          <p className="text-xs text-zinc-400 mt-0.5 font-light">Exploración de carta interactiva y reserva con depósito garantizado</p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeTab === 'menu' ? 'bg-white text-black font-semibold border-white' : 'bg-white/5 text-zinc-300 border-white/10'
            }`}
          >
            1. Explorar Carta
          </button>
          <button
            onClick={() => setActiveTab('reserva')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeTab === 'reserva' ? 'bg-white text-black font-semibold border-white' : 'bg-white/5 text-zinc-300 border-white/10'
            }`}
          >
            2. Reservar Mesa ({cart.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE MENU */}
      {activeTab === 'menu' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'entradas', label: 'Entradas de Autor' },
              { id: 'principales', label: 'Platos Fuertes' },
              { id: 'cocteleria', label: 'Mixología & Vinos' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.id ? 'bg-white/15 text-white border border-white/30' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MENU_ITEMS[activeCategory].map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-white">{item.name}</h3>
                    <span className="font-mono text-sm font-bold text-white shrink-0">${item.price} USD</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir a Pre-Comanda</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar with Cart Summary */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <Utensils className="w-4 h-4 text-slate-300" />
              <span>Pre-Comanda: <strong>{cart.reduce((a, b) => a + b.qty, 0)} platos</strong></span>
              {cartSubtotal > 0 && <span className="font-mono text-white font-bold">(${cartSubtotal} USD)</span>}
            </div>

            <button
              onClick={() => setActiveTab('reserva')}
              className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200"
            >
              <span>Continuar a Reserva de Mesa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* VIEW 2: TABLE BOOKING & DEPOSIT */}
      {activeTab === 'reserva' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Reserva de Mesa con Validación</h3>
                <p className="text-xs text-zinc-400 font-light">El depósito de ${tableDeposit} USD se descuenta al 100% de la cuenta final de tu cena.</p>
              </div>
            </div>

            {/* Zone Selection */}
            <div>
              <label className="text-xs text-zinc-400 block mb-2 font-medium">Selecciona el Ambiente</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                      selectedZone.id === z.id ? 'bg-white/10 border-white text-white font-semibold' : 'bg-white/[0.02] border-white/10 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-white">{z.name}</div>
                    <div className="text-[10px] text-zinc-400 mt-1 font-light">{z.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date, Time & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Fecha</label>
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Hora</label>
                <select
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="08:30 PM">08:30 PM</option>
                  <option value="09:45 PM">09:45 PM</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Comensales</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Pre-order summary */}
            {cart.length > 0 && (
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5 text-xs">
                <span className="text-[10px] uppercase font-mono text-zinc-400">Platos Pre-Seleccionados:</span>
                {cart.map((c) => (
                  <div key={c.id} className="flex justify-between text-zinc-300">
                    <span>{c.qty}x {c.name}</span>
                    <span className="font-mono text-white">${c.price * c.qty}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setActiveTab('menu')} className="text-xs text-zinc-400 hover:text-white">
                ← Volver a carta
              </button>
              <button
                onClick={handleConfirmReservation}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md disabled:opacity-50"
              >
                {isProcessing ? 'Garantizando...' : `Garantizar Reserva ($${tableDeposit} USD de Depósito)`}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 3: CONFIRMATION */}
      {activeTab === 'confirmacion' && (
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Wine className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl font-bold font-heading-luxury text-white">¡Reserva Asegurada!</h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Depósito de ${tableDeposit} USD validado. Mesa reservada en {selectedZone.name} para el {resDate} a las {resTime}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Zona:</span>
                <span className="text-white">{selectedZone.name} ({guests} personas)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Abono aplicable a la cuenta:</span>
                <span className="text-emerald-400 font-bold">${tableDeposit} USD</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCart([]);
                setActiveTab('menu');
              }}
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
