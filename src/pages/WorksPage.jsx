import React from 'react';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import RevealSection from '../components/motion/RevealSection';
import LuxuryProjectsSidebarShowcase from '../components/showcase/LuxuryProjectsSidebarShowcase';
import { ArrowRight } from 'lucide-react';

export default function WorksPage() {
  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-20 sm:pt-24 pb-16 space-y-8 sm:space-y-10">
        
        {/* Cabecera Editorial Principal Limpia */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-2 sm:pt-4">
          <RevealSection direction="up" className="max-w-3xl space-y-4">
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
              Obras Reales en Producción
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed">
              Plataformas vivas desarrolladas a la medida operando con clientes, comensales y reservas reales.
              Cero maquetas teóricas ni plantillas infladas: software de autor gobernado por código nativo y Core PMS integrado.
            </p>
          </RevealSection>
        </section>

        {/* ============================================================== */}
        {/* SHOWCASE CENTRAL INTERACTIVO CON SELECTOR COMPACTO EN VIVO     */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <RevealSection direction="up">
            <LuxuryProjectsSidebarShowcase />
          </RevealSection>
        </section>

        {/* Invitación Editorial Final */}
        <section className="max-w-5xl mx-auto px-6 sm:px-12 pt-4">
          <RevealSection direction="up">
            <div className="p-8 sm:p-12 border border-white/15 bg-white/[0.025] rounded-3xl glow-card text-center space-y-6">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
                ¿Listo para construir la plataforma soberana de tu negocio?
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                Agenda un diagnóstico de 15 minutos directamente con Juan Pablo para auditar tus cuellos de botella y ver cómo luciría tu plataforma en operación real.
              </p>
              <div>
                <a
                  href="/#/diagnostico"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase transition-all duration-300 hover:bg-zinc-200 shadow-monolith cursor-pointer"
                >
                  <span>Iniciar Diagnóstico & Agendar Demo (45s)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </RevealSection>
        </section>

      </main>

      <FooterEditorial />

    </div>
  );
}
