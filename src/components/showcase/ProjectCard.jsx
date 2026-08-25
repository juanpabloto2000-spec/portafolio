import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Play, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const FALLBACK_IMAGES = {
  hostales: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  dentales: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  esteticas: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  reposteria: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
  variado: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
};

export default function ProjectCard({ project, onOpenDemo, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(project.previewImage || FALLBACK_IMAGES[project.nicheId] || FALLBACK_IMAGES.hostales);

  // Spotlight mouse position tracking on card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Custom directional entry animation:
  // Index 0: Left, Index 1: Right, Index 2: Left, Index 3+: Normal Vertical
  const getInitialAnimation = () => {
    if (index === 0) return { opacity: 0, x: -80, y: 0 };
    if (index === 1) return { opacity: 0, x: 80, y: 0 };
    if (index === 2) return { opacity: 0, x: -80, y: 0 };
    return { opacity: 0, x: 0, y: 35 }; // Normal for the rest
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={getInitialAnimation()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.85, 
        delay: (index % 3) * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group relative w-full"
    >
      {/* Outer Shell: Double-Bezel with 16px radius (rounded-2xl) and dynamic cursor spotlight */}
      <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-white/25 overflow-hidden">
        
        {/* Cursor-Following Spotlight Border Glow */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.12), transparent 70%)`
            }}
          />
        )}

        {/* Inner Core: 12px radius (rounded-xl) */}
        <div className="relative z-10 rounded-xl bg-[#0a0a0d] border border-white/5 overflow-hidden flex flex-col lg:flex-row gap-6 p-5 sm:p-7">
          
          {/* Left / Top: Interactive Visual Preview */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div 
              onClick={() => onOpenDemo(project)}
              className="relative aspect-[16/10] w-full rounded-xl overflow-hidden cursor-pointer bg-zinc-950 border border-white/10 group/img"
            >
              {/* Image with fallback and subtle hover zoom */}
              <img
                src={imgSrc}
                alt={project.title}
                onError={() => setImgSrc(FALLBACK_IMAGES[project.nicheId] || FALLBACK_IMAGES.hostales)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover Launch Trigger */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/40">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs shadow-2xl scale-95 group-hover/img:scale-100 transition-transform duration-300">
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Probar Demo Interactiva</span>
                </div>
              </div>

              {/* Key System Indicator (Clean & Minimalist) */}
              <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-light truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="truncate">{project.keySystem}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-white">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Mobile Trigger Button */}
            <button
              onClick={() => onOpenDemo(project)}
              className="mt-3 lg:hidden w-full py-3 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Probar Demo Interactiva</span>
            </button>
          </div>

          {/* Right / Bottom: System Architecture & Narrative */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                  {project.nicheLabel}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {project.client}
                </span>
              </div>

              <h3 className="font-heading-luxury text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {project.concept}
              </p>
            </div>

            {/* Problem & Solution Bento Micro-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-red-300/80 font-semibold block mb-1">
                  Cuello de Botella
                </span>
                <p className="text-[11px] text-zinc-400 font-light leading-snug">
                  {project.challenge}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-300/80 font-semibold block mb-1">
                  Solución Diseñada
                </span>
                <p className="text-[11px] text-zinc-400 font-light leading-snug">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features Bullet List */}
            <div className="space-y-1.5 pt-1 border-t border-white/5">
              {project.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{feat}</span>
                </div>
              ))}
            </div>

            {/* Desktop Action Launch Button */}
            <div className="hidden lg:flex items-center justify-between pt-2">
              <MagneticButton 
                onClick={() => onOpenDemo(project)}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] group/btn"
              >
                <Play className="w-3.5 h-3.5 fill-black transition-transform group-hover/btn:scale-110" />
                <span>Interactuar con Demo de {project.nicheLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
