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
    <section id="demos" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-display-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          <TypewriterText 
            key={demosHeader.title}
            text={demosHeader.title || "Demos Interactivas por Nicho"}
            highlightWords={[demosHeader.highlightWord || "Interactivas"]}
            speed={0.04}
            delay={0.1}
          />
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
          {demosHeader.description || "Prueba en tiempo real cómo funcionan nuestros sistemas de reserva, agendamiento con depósitos y cartas táctiles antes de implementarlos en tu marca."}
        </p>

        {/* Niche Tabs */}
        <div className="mt-8">
          <NicheSelector 
            activeNiche={activeNiche} 
            onSelectNiche={setActiveNiche} 
          />
        </div>
      </div>

      {/* Projects List with Animated Transitions */}
      <div className="space-y-8">
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
      </div>
    </section>
  );
}
