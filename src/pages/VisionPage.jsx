import React from 'react';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import WinWinPactSection from '../components/philosophy/WinWinPactSection';
import RadicalComparison from '../components/comparison/RadicalComparison';
import RevealSection from '../components/motion/RevealSection';
import { ArrowRight, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

export default function VisionPage() {
  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 space-y-16">
        
        {/* Cabecera Editorial de Visión & Filosofía */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-8">
          <RevealSection direction="up" className="max-w-3xl space-y-4">
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
              Visión de Empresa & Filosofía Soberana
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed">
              En Dynamind Studios operamos bajo un principio inquebrantable: erradicar las malas prácticas del desarrollo web tradicional y construir infraestructura que genere beneficio tangible y duradero.
            </p>
          </RevealSection>
        </section>

        {/* El Pacto de Beneficio Mutuo (Transparencia Total) */}
        <WinWinPactSection />

        {/* Comparativa Radical: Agencias Tradicionales vs Dynamind */}
        <RadicalComparison />

        {/* Cierre y CTA */}
        <section className="max-w-5xl mx-auto px-6 sm:px-12 pt-8">
          <RevealSection direction="up">
            <div className="p-8 sm:p-12 border border-white/15 bg-white/[0.025] rounded-3xl glow-card text-center space-y-6">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                ¿Compartes nuestra visión de excelencia y soberanía?
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                Agenda un diagnóstico estratégico para evaluar cómo podemos estructurar tu plataforma con estas mismas reglas de juego.
              </p>
              <div>
                <a
                  href="/#/diagnostico"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-platinum shadow-monolith cursor-pointer"
                >
                  <span>Iniciar Diagnóstico (45s)</span>
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
