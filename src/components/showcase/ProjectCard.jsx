import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Play, CheckCircle2, ShieldCheck } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function ProjectCard({ project, onOpenDemo, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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
    if (index === 0) return { opacity: 0, x: -90, y: 0 };
    if (index === 1) return { opacity: 0, x: 90, y: 0 };
    if (index === 2) return { opacity: 0, x: -90, y: 0 };
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration: 0.85, 
        delay: index * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group relative"
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
        <div className="relative z-10 rounded-xl bg-[#0a0a0d] border border-white/5 overflow-hidden flex flex-col lg:flex-row gap-6 p-6 sm:p-8">
          
          {/* Left / Top: Interactive Visual Preview */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div 
              onClick={() => onOpenDemo(project)}
              className="relative aspect-[16/10] w-full rounded-xl overflow-hidden cursor-pointer bg-zinc-950 border border-white/10 group/img"
            >
              {/* Image with subtle hover zoom */}
              <img
                src={project.previewImage}
                alt={project.title}
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
              </div>
            </div>

            {/* Gallery Miniatures */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {project.gallery.map((imgUrl, i) => (
                <div 
                  key={i} 
                  onClick={() => onOpenDemo(project)}
                  className="aspect-[16/9] rounded-lg overflow-hidden border border-white/5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <img src={imgUrl} alt={`${project.title} detalle ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right / Bottom: Editorial Brief & Solutions */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              {/* Title & Concept */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold font-heading-luxury text-white group-hover:text-slate-100 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Concept */}
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {project.concept}
              </p>

              {/* Operational Friction vs Solution */}
              <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <h4 className="text-[11px] font-semibold text-zinc-400">
                    Cuello de Botella Resuelto
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-snug font-light">
                    {project.challenge}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <h4 className="text-[11px] font-semibold text-slate-200">
                    Solución de Conversión
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-snug font-light">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-2 mb-6">
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Demo CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end">
              <MagneticButton
                onClick={() => onOpenDemo(project)}
                variant="primary"
                size="md"
                icon={ArrowUpRight}
              >
                Abrir Demo
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
