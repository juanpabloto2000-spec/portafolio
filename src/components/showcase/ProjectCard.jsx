import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Play } from 'lucide-react';
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
    if (index === 0) return { opacity: 0, x: -70, y: 0 };
    if (index === 1) return { opacity: 0, x: 70, y: 0 };
    if (index === 2) return { opacity: 0, x: -70, y: 0 };
    return { opacity: 0, x: 0, y: 35 };
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
      <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-white/25 overflow-hidden">
        
        {/* Cursor-Following Spotlight Glow */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.12), transparent 70%)`
            }}
          />
        )}

        {/* Inner Core: Two Column Layout */}
        <div className="relative z-10 rounded-xl bg-[#09090c] border border-white/5 overflow-hidden p-5 sm:p-7 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          
          {/* Left: Interactive Visual Preview */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div 
              onClick={() => onOpenDemo(project)}
              className="relative aspect-[16/10] w-full rounded-xl overflow-hidden cursor-pointer bg-zinc-950 border border-white/10 group/img shadow-md"
            >
              <img
                src={imgSrc}
                alt={project.title}
                onError={() => setImgSrc(FALLBACK_IMAGES[project.nicheId] || FALLBACK_IMAGES.hostales)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75 group-hover/img:opacity-40 transition-opacity duration-300" />

              {/* Hover Launch Trigger */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/40">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs shadow-2xl scale-95 group-hover/img:scale-100 transition-transform duration-300">
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Ver Demo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Clean Bullet Features */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4 text-left">
            <div>
              <h3 className="font-heading-luxury text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {project.concept}
              </p>
            </div>

            {/* Clean Feature List (Sin tarjetas ni cajas internas) */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-2 py-2 border-y border-white/5 text-xs text-zinc-300 font-light">
                {project.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <span className="text-zinc-500 font-mono text-[10px] mt-0.5 select-none shrink-0">✦</span>
                    <span className="leading-snug text-zinc-300">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Clean "Ver Demo" Button */}
            <div className="pt-2">
              <MagneticButton 
                onClick={() => onOpenDemo(project)}
                className="w-full sm:w-auto py-3 px-7 rounded-xl bg-white text-black font-semibold text-xs inline-flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 group/btn"
              >
                <Play className="w-3.5 h-3.5 fill-black transition-transform group-hover/btn:scale-110" />
                <span>Ver Demo</span>
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
