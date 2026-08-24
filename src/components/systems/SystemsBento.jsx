import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Calendar, ShieldCheck, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import TypewriterText from '../ui/TypewriterText';

function BentoCard({ icon: Icon, title, description, benefits, delay }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-2.5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-xl flex flex-col justify-between group hover:border-white/20 transition-all overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.1), transparent 70%)`
          }}
        />
      )}

      {/* Inner Card */}
      <div className="relative z-10 p-6 sm:p-7 rounded-xl bg-[#09090c] border border-white/5 h-full flex flex-col justify-between">
        <div>
          <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-5 text-white group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
          
          <h3 className="text-xl font-bold font-heading-luxury text-white mb-3">
            {title}
          </h3>
          
          <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            {description}
          </p>

          <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-zinc-300">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="font-light">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SystemsBento() {
  const systems = [
    {
      icon: Calendar,
      title: "Agendamiento Autónomo",
      description: "Elimina las cadenas de mensajes manuales. El cliente consulta disponibilidad en tiempo real y reserva de forma inmediata.",
      benefits: [
        "Sincronización instantánea de agenda y calendario",
        "Recordatorios automáticos para confirmar asistencia",
        "Atención 24/7 sin sobrecargar a tu equipo"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Validación de Anticipos",
      description: "El fin de las cancelaciones a última hora y mesas vacías. Todo agendamiento requiere validación de tarjeta o subida de comprobante bancario.",
      benefits: [
        "Protección total contra ausencias imprevistas",
        "Depósitos abonables a la cuenta final del servicio",
        "Bloqueo inmediato y seguro de la fecha elegida"
      ]
    },
    {
      icon: UtensilsCrossed,
      title: "Menús & Cartas Táctiles",
      description: "Reemplaza los archivos PDF con cartas táctiles de alta velocidad y fotografía editorial, diseñadas para estimular el deseo y aumentar el consumo.",
      benefits: [
        "Navegación fluida por categorías y alérgenos",
        "Sugerencias de maridaje y complementos gourmet",
        "Visualización interactiva de platos y coctelería"
      ]
    }
  ];

  return (
    <section id="sistemas" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          <TypewriterText 
            text="Eliminamos los Cuellos de Botella de tu Negocio"
            highlightWords={["Botella", "Negocio"]}
            speed={0.035}
            delay={0.1}
          />
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
          En Dynamind Studios diseñamos sistemas operativos de venta y atención que trabajan 24/7 para tu marca.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {systems.map((sys, idx) => (
          <BentoCard
            key={idx}
            icon={sys.icon}
            title={sys.title}
            description={sys.description}
            benefits={sys.benefits}
            delay={idx * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
