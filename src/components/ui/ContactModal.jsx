import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowUpRight, CheckCircle2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const NICHES = [
  'Hostal / Hospedaje',
  'Clínica Dental',
  'Clínica Estética',
  'Repostería / Pastelería',
  'Restaurante / Bar',
  'Otro Proyecto'
];

const SERVICES = [
  'Página Web Premium Interactiva',
  'Solución de Agendamientos por WhatsApp',
  'Conexión y Verificación de Pagos para Reservas',
  'Solución a Cuellos de Botella'
];

export default function ContactModal({ isOpen, onClose }) {
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);
  const [selectedServices, setSelectedServices] = useState([SERVICES[0]]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const servicesList = selectedServices.join(', ');
    const msg = encodeURIComponent(
      `Hola Dynamind Studios, mi nombre es ${name || 'un cliente'}.\n\n` +
      `• Mi negocio pertenece al nicho de: "${selectedNiche}"\n` +
      `• Servicios de interés: ${servicesList}\n` +
      `• Desafío / Detalle: ${bottleneck || 'Agendamiento y optimización de conversión'}\n\n` +
      `Me gustaría agendar una sesión de diagnóstico estratégico.`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 50 });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl rounded-2xl bg-[#0d0d10] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-heading-luxury text-white">
                  Agendar Sesión de Diagnóstico
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 font-light leading-relaxed">
                  Personaliza tu solicitud seleccionando tu industria y los servicios que necesita tu negocio.
                </p>
              </div>

              <form onSubmit={handleWhatsAppRedirect} className="space-y-5">
                {/* 1. Niche Selector */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-2 font-medium">
                    1. Industria o Nicho
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {NICHES.map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setSelectedNiche(n)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-colors ${
                          selectedNiche === n
                            ? 'bg-white text-black font-semibold border-white shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Service Selector */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-2 font-medium">
                    2. Servicios o Soluciones Requeridas
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICES.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`p-3 rounded-xl text-xs text-left border transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-white/10 border-white text-white font-medium shadow-sm'
                              : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span className="leading-snug">{service}</span>
                          <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white border-white text-black' : 'border-white/20 bg-transparent'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">Nombre o Marca</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Hostal Bellavista"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">WhatsApp / Teléfono</label>
                    <input
                      type="text"
                      required
                      placeholder="+57 300 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                    />
                  </div>
                </div>

                {/* 4. Friction / Goal */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Describe tu cuello de botella o requerimiento específico
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Ej. Requerimos digitalizar las reservas directas para no pagar comisiones y agendar pacientes por WhatsApp..."
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Conectar por WhatsApp para Diagnóstico</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading-luxury">Mensaje Preparado</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto font-light">
                Te hemos redirigido a WhatsApp con los servicios seleccionados para coordinar tu diagnóstico.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-white/20 text-xs text-zinc-300 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
