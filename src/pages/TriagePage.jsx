import React from 'react';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import DynamicDopamineQuiz from '../components/funnel/DynamicDopamineQuiz';
import RevealSection from '../components/motion/RevealSection';

export default function TriagePage() {
  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        
        {/* Cabecera Principal del Diagnóstico (Sin botón de escape a la central) */}
        <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-8 pb-10 text-center space-y-3">
          <RevealSection direction="up">
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Diagnóstico de Ingeniería & Cuellos de Botella
            </h1>
            <p className="text-xs sm:text-sm font-sans text-zinc-300 max-w-xl mx-auto leading-relaxed pt-1">
              Evalúa tu fricción operativa en 45 segundos. Si tienes página web, nuestro escáner en tiempo real detectará tus fugas de conversión antes de agendar la demostración con Juan Pablo.
            </p>
          </RevealSection>
        </section>

        {/* Quiz Dinámico Dopamínico con Escáner Web en Vivo */}
        <section className="max-w-4xl mx-auto px-6 sm:px-12">
          <DynamicDopamineQuiz />
        </section>

        {/* Garantías y Seguridad de Datos */}
        <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono text-xs">
            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1.5 shadow-sm">
              <div className="text-white font-bold text-sm">Auditoría 1 a 1 de Autor</div>
              <div className="text-xs text-zinc-400 font-sans">Sesión técnica directa con Juan Pablo. Cero vendedores.</div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1.5 shadow-sm">
              <div className="text-white font-bold text-sm">Calendario Atómico Propio</div>
              <div className="text-xs text-zinc-400 font-sans">Sincronización en tiempo real sin suscripciones a Calendly.</div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1.5 shadow-sm">
              <div className="text-white font-bold text-sm">15 Minutos de Demostración</div>
              <div className="text-xs text-zinc-400 font-sans">Te mostramos la plataforma de tu sector funcionando en vivo.</div>
            </div>
          </div>
        </section>

      </main>

      <FooterEditorial />
    </div>
  );
}
