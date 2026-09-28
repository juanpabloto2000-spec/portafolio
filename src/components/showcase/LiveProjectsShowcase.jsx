import React, { useState } from 'react';
import { LIVE_PROJECTS } from '../../data/liveProjects';
import LuxuryProjectsCoverflowCarousel from './LuxuryProjectsCoverflowCarousel';
import InteractiveWorkDemoModal from '../interactive/InteractiveWorkDemoModal';
import RevealSection from '../motion/RevealSection';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default function LiveProjectsShowcase() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoTab, setDemoTab] = useState('gastrobar');

  const openDemoForProject = (proj) => {
    if (proj.id.includes('andicas')) {
      setDemoTab('hospedaje');
    } else if (proj.id.includes('kal') || proj.id.includes('bellavista')) {
      setDemoTab('gastrobar');
    } else {
      setDemoTab('clinica');
    }
    setDemoModalOpen(true);
  };

  return (
    <section id="obras" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
        
        {/* Carrusel 3D Panorámico Coverflow */}
        <RevealSection direction="up">
          <LuxuryProjectsCoverflowCarousel onSelectProjectDemo={openDemoForProject} />
        </RevealSection>

        {/* Enlace al Catálogo Completo y Demos en Vivo */}
        <RevealSection direction="up" className="pt-2 text-center">
          <a
            href="/#/obras"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-monolith cursor-pointer"
          >
            <span>Probar Demos Interactivas y Ver Expedientes Completos</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </a>
        </RevealSection>

      </div>

      {/* Transición Atmosférica Difuminada (Sin líneas duras que corten el fondo) */}
      <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none mt-20 sm:mt-28 opacity-40" />

      {/* Modal de Demo Funcional */}
      <InteractiveWorkDemoModal
        isOpen={demoModalOpen}
        initialTab={demoTab}
        onClose={() => setDemoModalOpen(false)}
      />
    </section>
  );
}
