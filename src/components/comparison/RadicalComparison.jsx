import React from 'react';
import { X, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import Tilt3DCard from '../ui/Tilt3DCard';
import RevealSection from '../motion/RevealSection';

export default function RadicalComparison() {
  const comparisonItems = [
    {
      feature: 'Tecnología & Arquitectura',
      traditional: 'Plantillas infladas de WordPress o Elementor con 40+ plugins frágiles propensos a romperse.',
      dynamind: 'Código nativo puro en React 18, Vite y Tailwind. Cero plugins pesados, 60 FPS ininterrumpidos.',
    },
    {
      feature: 'Sistema de Agendamiento',
      traditional: 'Iframe incrustado de Calendly o Cal.com pagando $15-$30 USD mensuales por un widget ajeno.',
      dynamind: 'Calendario Atómico Propio integrado. Cero comisiones a terceros, sincronizado con Meet y WhatsApp.',
    },
    {
      feature: 'Calificación de Prospectos',
      traditional: 'Formularios estáticos o enlaces a WhatsApp donde el dueño pierde horas respondiendo a curiosos.',
      dynamind: 'Triaje Visual de 45s con odómetro de fricción que filtra y clasifica: Potenciales 💎 vs Curiosos 👀.',
    },
    {
      feature: 'Velocidad de Carga & Retención',
      traditional: 'Cargas lentas de 4 a 8 segundos que queman el presupuesto de pauta y destruyen la conversión.',
      dynamind: 'Latencia sub-segundo (< 0.8s) optimizada para el tráfico impaciente proveniente de Reels y Ads.',
    },
    {
      feature: 'Gestión Operativa del Negocio',
      traditional: 'Folletos digitales mudos. Cero herramientas para el control diario de reservas, caja o pedidos.',
      dynamind: 'Búnker táctico aislado en /#/dsb con caja por turnos, calendario atómico, folios o comandas directas.',
    },
    {
      feature: 'Soberanía & Propiedad',
      traditional: 'Soporte cautivo y cuotas forzosas para cambios simples en el texto o precios de la carta.',
      dynamind: 'Soberanía tecnológica total con panel autónomo para cambiar precios, horarios y titulares en vivo.',
    },
  ];

  return (
    <section id="comparativa" className="py-24 sm:py-32 border-b border-white/10 bg-volumetric relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Cabecera Limpia (Solo Título y Subtítulo, sin especificaciones ni tags flotantes) */}
        <RevealSection direction="up" className="max-w-3xl space-y-2">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-normal">
            Agencias Tradicionales vs. Dynamind Studios
          </h2>
          <p className="text-sm font-sans text-zinc-300 leading-relaxed">
            La diferencia entre un gasto cosmético y una inversión de infraestructura operativa que genera retorno medible.
          </p>
        </RevealSection>

        {/* Comparativa con Bloques Redondeados rounded-2xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Bloque 1: Agencias Tradicionales */}
          <RevealSection direction="left" delay={0.1}>
            <div className="p-8 sm:p-10 border border-white/10 bg-white/[0.015] rounded-2xl space-y-8 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase border-b border-white/10 pb-4">
                  <AlertTriangle className="w-4 h-4 text-zinc-400" />
                  <span>El Modelo Estándar de Agencia</span>
                </div>

                <h3 className="font-display font-bold text-2xl text-zinc-300">
                  Folletos Digitales Frágiles
                </h3>

                <div className="space-y-6">
                  {comparisonItems.map((item, idx) => (
                    <div key={idx} className="space-y-1.5 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="text-[11px] font-mono uppercase text-zinc-400">
                        {item.feature}
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans leading-relaxed">
                        <X className="w-4 h-4 text-red-500/80 shrink-0 mt-0.5" />
                        <span>{item.traditional}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-[11px] font-mono text-zinc-400 mt-6">
                Resultado: Desperdicio de pauta, horas de atención a curiosos y dependencia perpetua.
              </div>
            </div>
          </RevealSection>

          {/* Bloque 2: Dynamind Studios */}
          <RevealSection direction="right" delay={0.15}>
            <Tilt3DCard className="p-8 sm:p-10 border border-white/20 bg-white/[0.035] rounded-2xl space-y-8 flex flex-col justify-between glow-card h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-semibold border-b border-white/15 pb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Ingeniería Dynamind Studios</span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white">
                  Sistemas Vivos de Conversión
                </h3>

                <div className="space-y-6">
                  {comparisonItems.map((item, idx) => (
                    <div key={idx} className="space-y-1.5 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <div className="text-[11px] font-mono uppercase text-zinc-300">
                        {item.feature}
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-zinc-200 font-sans leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{item.dynamind}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-[11px] font-mono text-emerald-300 mt-6">
                Resultado: Filtrado automático de prospectos, agendamiento autónomo y soberanía operativa.
              </div>
            </Tilt3DCard>
          </RevealSection>

        </div>

      </div>
    </section>
  );
}
