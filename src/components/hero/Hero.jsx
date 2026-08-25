import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Globe, ShieldCheck, Play, Utensils, Calendar, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import TypewriterText from '../ui/TypewriterText';
import { useApp } from '../../context/AppContext';

export default function Hero({ onExploreDemos, onExploreLiveProjects, onOpenContact }) {
  const { siteContent } = useApp();
  const heroData = siteContent?.hero || {};
  const branding = siteContent?.branding || {};

  const containerRef = useRef(null);

  // Mouse tilt tracking for the 3D Monogram Logo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden select-none"
    >
      {/* Background Interactive Ambient Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-slate-200 rounded-full blur-[150px] pointer-events-none" 
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* 3D Interactive Monogram Logo (Clean Floating Transparent) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            perspective: 1000,
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          className="mb-8 relative group cursor-pointer flex items-center justify-center"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center relative select-none">
            <img 
              src={branding.logoUrl || "/logo-transparent.png"} 
              alt="Dynamind Studios Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(255,255,255,0.08)] select-none transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </motion.div>

        {/* Studio Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-super-wide text-zinc-400 uppercase">
            {heroData.badgeText || "Estudio de Ingeniería Web & Sistemas de Conversión"}
          </span>
        </motion.div>

        {/* Typewriter Title */}
        <h1 className="font-display-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-4xl min-h-[80px]">
          <TypewriterText 
            key={heroData.title}
            text={heroData.title || "Experiencias web que convierten y resuelven cuellos de botella."}
            highlightWords={[heroData.highlightWord || "convierten"]}
            speed={0.035}
            delay={0.2}
          />
        </h1>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mb-10"
        >
          {heroData.description || "Desarrollamos plataformas a medida y menús interactivos con sistemas autónomos de agendamiento, validación de depósitos para reservas y flujos comerciales sin fricción."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3.5 mb-16"
        >
          <MagneticButton 
            onClick={onExploreDemos}
            variant="primary" 
            size="lg"
            className="w-full sm:w-auto"
            icon={Play}
          >
            {heroData.ctaDemos || "Explorar Demos Interactivas"}
          </MagneticButton>

          <MagneticButton 
            onClick={onExploreLiveProjects}
            variant="secondary" 
            size="lg"
            className="w-full sm:w-auto"
            icon={Globe}
          >
            {heroData.ctaLive || "Ver Proyectos en Vivo"}
          </MagneticButton>

          <MagneticButton 
            onClick={onOpenContact}
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto"
            icon={ArrowUpRight}
          >
            {heroData.ctaContact || "Agendar Diagnóstico"}
          </MagneticButton>
        </motion.div>

        {/* Value Pillars Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/10 max-w-3xl text-left"
        >
          {(heroData.pillars || []).map((pillar, i) => {
            const icons = [Calendar, ShieldCheck, Utensils];
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-slate-300 shrink-0" />
                  <h3 className="text-xs font-semibold text-white">{pillar.title}</h3>
                </div>
                <p className="text-[11px] text-zinc-400 font-light leading-snug">{pillar.description}</p>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Down Arrow */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-1 cursor-pointer"
        onClick={onExploreDemos}
      >
        <span className="text-[9px] tracking-super-wide uppercase text-zinc-500 font-medium">Demos</span>
        <ArrowDown className="w-3 h-3 text-zinc-500" />
      </motion.div>
    </section>
  );
}
