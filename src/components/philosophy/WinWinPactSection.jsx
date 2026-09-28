import React from 'react';
import { Handshake, HeartHandshake, ShieldCheck, Star, Clock, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import Tilt3DCard from '../ui/Tilt3DCard';
import RevealSection from '../motion/RevealSection';

export default function WinWinPactSection() {
  const clientBenefits = [
    {
      icon: Clock,
      title: 'Ahorro Real de Horas de Vida',
      desc: 'Dejas de pasar 3 a 5 horas diarias respondiendo a curiosos en WhatsApp. El sistema responde, califica y agenda solo a personas con intención real de compra.'
    },
    {
      icon: DollarSign,
      title: 'El Dinero se Queda en tu Bolsillo',
      desc: 'Erradicamos las comisiones del 15% al 25% de plataformas intermediarias. Cada reserva, comanda o anticipo ingresa 100% directo a tus cuentas bancarias.'
    },
    {
      icon: ShieldCheck,
      title: 'Soberanía Operativa Total',
      desc: 'Cero mensualidades forzosas de soporte. Cuentas con un panel privado para cambiar precios, horarios, platos o cabañas en segundos sin pedirle permiso a nadie.'
    },
    {
      icon: Sparkles,
      title: 'Retorno Medible de Inversión',
      desc: 'Al tener una vitrina con presencia de autor y checkout fluido, dejas de perder ventas nocturnas y fines de semana cuando tu equipo no está en línea.'
    }
  ];

  const dynamindBenefits = [
    {
      icon: Star,
      title: 'Reseñas de 5 Estrellas & Casos de Éxito',
      desc: 'No gastamos en pauta invasiva ni vendedores pesados. Tu negocio facturando y funcionando solo es la prueba viva más potente de lo que construimos.'
    },
    {
      icon: HeartHandshake,
      title: 'Recomendaciones Boca a Boca',
      desc: 'Los dueños de negocio y marcas personales satisfechos nos recomiendan naturalmente con otros empresarios de su círculo de confianza.'
    },
    {
      icon: Handshake,
      title: 'Relación como Socios Estratégicos',
      desc: 'Crecemos junto a ti. Preferimos proyectos prósperos de largo plazo antes que cobrar por maquetas genéricas y desaparecer.'
    },
    {
      icon: CheckCircle2,
      title: 'Orgullo de Ingeniería de Autor',
      desc: 'Cada entrega eleva el estándar del mercado. Diseñamos plataformas que despiertan respeto en tus clientes y en tu competencia.'
    }
  ];

  return (
    <section id="pacto-win-win" className="py-24 sm:py-32 bg-volumetric relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Cabecera Limpia */}
        <RevealSection direction="up" className="max-w-3xl space-y-3">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            El Pacto de Beneficio Mutuo
          </h2>
          <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed">
            Trabajamos con transparencia absoluta: solo iniciamos proyectos donde ambas partes ganan de verdad.
            Sin letras chicas, sin tecnicismos confusos y sin costos ocultos.
          </p>
        </RevealSection>

        {/* Las 2 Columnas de Beneficio Mutuo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Columna 1: Lo que Gana Tu Negocio */}
          <RevealSection direction="left" delay={0.1}>
            <div className="p-8 sm:p-10 border border-white/15 bg-white/[0.025] rounded-2xl flex flex-col justify-between h-full space-y-8 shadow-monolith">
              <div className="space-y-6">
                
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-display font-bold text-2xl text-white">
                    Lo que tú ganas en el día a día
                  </h3>
                </div>

                <div className="space-y-6">
                  {clientBenefits.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-base text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-xs font-mono text-emerald-300">
                Resultado tangible: Menos estrés operativo, más tiempo libre y retención neta de tus ingresos.
              </div>
            </div>
          </RevealSection>

          {/* Columna 2: Lo que Gana Dynamind Studios */}
          <RevealSection direction="right" delay={0.15}>
            <Tilt3DCard className="p-8 sm:p-10 border border-white/20 bg-white/[0.04] rounded-2xl flex flex-col justify-between h-full space-y-8 glow-card shadow-monolith">
              <div className="space-y-6">
                
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-display font-bold text-2xl text-white">
                    Lo que nosotros ganamos al servirte
                  </h3>
                </div>

                <div className="space-y-6">
                  {dynamindBenefits.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-zinc-200" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-base text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              <div className="p-4 bg-white/[0.04] border border-white/15 rounded-xl text-xs font-mono text-zinc-300">
                Crecimiento orgánico: No vendemos humo. Tu éxito y tu reseña positiva es nuestra mejor carta de presentación.
              </div>
            </Tilt3DCard>
          </RevealSection>

        </div>

      </div>

      {/* Transición Atmosférica Difuminada (Resplandor etéreo sin cortes de línea) */}
      <div className="w-full max-w-4xl mx-auto h-20 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent blur-2xl pointer-events-none mt-12 sm:mt-16" />
    </section>
  );
}
