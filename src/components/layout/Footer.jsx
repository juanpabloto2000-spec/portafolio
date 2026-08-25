import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight, MessageCircle, Globe, Play, Layers } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function Footer({ onNavigate, onOpenContact }) {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505] pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Call to Action Banner (rounded-2xl) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 shadow-2xl mb-16 text-center flex flex-col items-center">
          <h2 className="font-display-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-white max-w-3xl mb-4">
            ¿Listo para digitalizar tu negocio con arquitectura de <span className="text-metallic">alta conversión</span>?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl font-light leading-relaxed mb-8">
            Diseñamos experiencias digitales sin fricciones operativas. Agendamientos automáticos, validación de pagos y cartas interactivas.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <MagneticButton
              onClick={onOpenContact}
              variant="primary"
              size="lg"
              icon={ArrowUpRight}
            >
              Agendar Diagnóstico
            </MagneticButton>

            <a
              href="https://www.instagram.com/dynamind.studios?igsi=emhhenE5bjA4ZzNw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/50 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram @dynamind.studios</span>
            </a>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/20 bg-black">
                <img src="/logo.jpeg" alt="Dynamind Studios Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading-luxury font-bold text-sm tracking-wider text-white">
                  DYNAMIND
                </span>
                <span className="text-[8px] uppercase tracking-super-wide text-zinc-400 font-medium">
                  STUDIOS
                </span>
              </div>
            </div>
            <p className="text-zinc-400 font-light max-w-sm leading-relaxed">
              Estudio de desarrollo web de ultra lujo y sistemas interactivos para gastronomía, hospedajes boutique y salud clínica.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold tracking-wide text-white">Navegación</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('home', 'demos')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3 h-3 text-slate-400" />
                  <span>Demos Interactivas</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('home', 'sistemas')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3 h-3 text-slate-400" />
                  <span>Sistemas de Conversión</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('live-projects')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>Proyectos en Vivo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact} 
                  className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                >
                  <MessageCircle className="w-3 h-3 text-slate-400" />
                  <span>Agendar Diagnóstico</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Industry Solutions */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold tracking-wide text-white">Especialidades</h4>
            <ul className="space-y-1.5 text-zinc-400 font-light">
              <li>• Hostales & Hospedaje Boutique</li>
              <li>• Clínicas Dentales & Odontológicas</li>
              <li>• Clínicas de Medicina Estética</li>
              <li>• Pastelería Fina & Repostería</li>
              <li>• Restaurantes, Bares & Menús Táctiles</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} Dynamind Studios. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Ingeniería Digital & Alta Conversión</span>
            <span>•</span>
            <span>Dark Luxury Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
