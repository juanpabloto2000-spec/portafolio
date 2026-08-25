import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, UtensilsCrossed } from 'lucide-react';
import { LIVE_PROJECTS } from '../../data/liveProjects';
import { NICHE_CATEGORIES } from '../../data/projects';
import MagneticButton from '../ui/MagneticButton';
import TypewriterText from '../ui/TypewriterText';
import { useApp } from '../../context/AppContext';

function LiveWebsiteFrame({ url, title, isFeatured }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className={`relative w-full rounded-xl overflow-hidden bg-[#070709] border border-white/10 group/preview ${
      isFeatured ? 'aspect-[16/9]' : 'aspect-[16/10]'
    }`}>
      {/* Top Browser Bar */}
      <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-white/10 bg-[#0a0a0d] z-20 relative select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[10px] font-mono text-zinc-500 truncate max-w-[240px]">{url}</span>
      </div>

      {/* Live Iframe Preview Container */}
      <div className="relative w-full h-[calc(100%-30px)] overflow-hidden bg-black">
        <iframe
          src={url}
          title={title}
          onLoad={() => setIframeLoaded(true)}
          loading="lazy"
          className={`w-[142.85%] h-[142.85%] origin-top-left scale-[0.7] border-0 pointer-events-none transition-opacity duration-700 select-none ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Loading placeholder */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span className="text-[11px] font-mono">Cargando previsualización...</span>
            </div>
          </div>
        )}

        {/* Interactive Clickable Overlay */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-all duration-300 backdrop-blur-[0px] hover:backdrop-blur-[2px] opacity-0 hover:opacity-100 cursor-pointer"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs shadow-2xl scale-95 hover:scale-100 transition-transform">
            <span>Visitar Sitio Web</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </div>
  );
}

function LiveProjectCard({ project, index, isFeatured = false }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: isFeatured ? 0 : (isEven ? -60 : 60), y: isFeatured ? 35 : 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      className={`group relative h-full transition-transform duration-300 ${
        isFeatured ? 'col-span-1 md:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Outer Shell (rounded-2xl) */}
      <div className={`relative p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-xl transition-all duration-500 group-hover:border-white/25 flex flex-col justify-between h-full overflow-hidden ${
        isFeatured ? 'shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.05)]' : ''
      }`}>
        
        {/* Cursor-Following Spotlight Glow */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.12), transparent 70%)`
            }}
          />
        )}

        {/* Inner Card (rounded-xl) */}
        <div className={`relative z-10 rounded-xl bg-[#0a0a0d] border border-white/5 p-6 sm:p-7 flex flex-col justify-between h-full ${
          isFeatured ? 'lg:flex-row gap-8 items-center' : ''
        }`}>
          
          {/* Left / Top: Live Iframe Preview */}
          <div className={isFeatured ? 'w-full lg:w-3/5' : 'w-full mb-6'}>
            <LiveWebsiteFrame 
              url={project.liveUrl}
              title={project.title}
              isFeatured={isFeatured}
            />
          </div>

          {/* Right / Bottom: Editorial Project Details */}
          <div className={`flex flex-col justify-between ${isFeatured ? 'w-full lg:w-2/5' : 'w-full'}`}>
            <div>
              {/* Niche & Type badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {project.niche}
                </span>
                {project.isFlagship && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    ★ Destacado
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="font-heading-luxury text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-slate-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-4">
                {project.tagline}
              </p>

              {/* Narrative Story Description */}
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Solved Bottleneck Pill */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                <div className="text-[10px] uppercase font-mono text-zinc-400 mb-1">
                  Cuello de Botella Resuelto
                </div>
                <div className="text-xs text-white font-medium">
                  {project.bottleneckSolved}
                </div>
              </div>
            </div>

            {/* Direct Link Action */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-emerald-300 transition-colors group/link"
              >
                <span>Explorar Sitio en Producción</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>

              <span className="text-[10px] font-mono text-zinc-400">En Vivo</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function LiveProjectsPage({ onBackToHome, onOpenContact }) {
  const { siteContent } = useApp();
  const liveProjectsList = siteContent?.customLiveProjects || LIVE_PROJECTS;

  const [activeNiche, setActiveNiche] = useState('todos');

  const filteredProjects = activeNiche === 'todos' 
    ? liveProjectsList 
    : liveProjectsList.filter(p => p.nicheId === activeNiche);

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Back to Home Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a Demos Interactivas</span>
        </button>
      </motion.div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="font-display-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          <TypewriterText 
            text="Proyectos Web en Vivo"
            highlightWords={["Vivo"]}
            speed={35}
            delay={200}
          />
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
        >
          Explora los sitios web reales creados para nuestros clientes en cada nicho. Diseñados con arquitectura de alta conversión y navegación fluida.
        </motion.p>

        {/* Niche Tabs (rounded-xl) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 flex items-center justify-center"
        >
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0d0d10] border border-white/10 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar shadow-inner-bezel">
            {NICHE_CATEGORIES.map((category) => {
              const isActive = activeNiche === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveNiche(category.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-300 select-none ${
                    isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeLiveNichePill"
                      className="absolute inset-0 bg-white rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.isFlagship && activeNiche === 'todos';
            return (
              <LiveProjectCard
                key={project.id}
                project={project}
                index={index}
                isFeatured={isFeatured}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Conversion Prompt */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 text-center flex flex-col items-center"
      >
        <h2 className="font-display-luxury text-2xl sm:text-4xl font-bold text-white mb-4">
          Creamos tu sitio web con arquitectura de conversión a medida
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mb-6 font-light leading-relaxed">
          Diseño exclusivo, agendamiento sincronizado, validación de pagos y cartas táctiles.
        </p>
        <MagneticButton onClick={onOpenContact} variant="primary" size="lg" icon={ArrowUpRight}>
          Agendar Diagnóstico
        </MagneticButton>
      </motion.div>

    </div>
  );
}
