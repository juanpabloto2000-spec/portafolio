import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NicheSelector from './NicheSelector';
import ProjectCard from './ProjectCard';
import TypewriterText from '../ui/TypewriterText';
import { useApp } from '../../context/AppContext';

export default function NicheShowcase({ onOpenDemo }) {
  const { siteContent } = useApp();
  const demosHeader = siteContent?.demosSection || {};
  const projectsList = siteContent?.customProjects || [];

  const [activeNiche, setActiveNiche] = useState('todos');

  const filteredProjects = activeNiche === 'todos' 
    ? projectsList 
    : projectsList.filter(p => p.nicheId === activeNiche);

  return (
    <section id="demos" className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="font-display-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          <TypewriterText 
            key={demosHeader.title}
            text={demosHeader.title || "Demos Interactivas por Nicho"}
            highlightWords={[demosHeader.highlightWord || "Interactivas"]}
            speed={35}
            delay={200}
          />
        </h2>
        <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
          {demosHeader.description || "Prueba en tiempo real cómo funcionan nuestros sistemas de reserva, agendamiento con depósitos y cartas táctiles antes de implementarlos en tu marca."}
        </p>
      </div>

      {/* Mobile Sticky Horizontal Bar (< lg) */}
      <div className="lg:hidden sticky top-20 z-30 mb-8 py-2 -mx-4 px-4 bg-[#050507]/80 backdrop-blur-xl border-y border-white/5">
        <NicheSelector 
          activeNiche={activeNiche} 
          onSelectNiche={setActiveNiche}
          layout="horizontal"
        />
      </div>

      {/* Main 2-Column Showcase Layout (Desktop: Left Sticky Dock + Right Demos Stream) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 relative">
        
        {/* Left Sticky Vertical Dock (Desktop >= lg) */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-28 self-start z-20">
          <NicheSelector 
            activeNiche={activeNiche} 
            onSelectNiche={setActiveNiche}
            layout="vertical"
          />

          {/* Helper Micro Note */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400 font-light leading-relaxed">
            <span className="text-white font-medium block mb-1">🎯 Demos 100% Funcionales</span>
            Interactúa con la interfaz completa, prueba flujos de reserva y valida sistemas en vivo.
          </div>
        </aside>

        {/* Right Stream: Demo Cards */}
        <main className="flex-1 min-w-0 w-full space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                onOpenDemo={onOpenDemo}
                index={index}
              />
            ))}
          </AnimatePresence>
        </main>

      </div>

    </section>
  );
}
