import React from 'react';
import { X, ExternalLink, ShieldCheck, Zap, Layers, Activity } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-3xl bg-obsidian border border-white/20 shadow-monolith font-mono text-xs max-h-[90vh] overflow-y-auto">
        
        {/* Cabecera del Modal */}
        <div className="sticky top-0 z-10 bg-zinc-950/95 border-b border-white/10 p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans font-semibold text-cyan-400">
              {project.nicheLabel}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido en Profundidad */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Imagen y Preview */}
          <div className="relative h-60 sm:h-72 border border-white/10 overflow-hidden bg-black">
            <img
              src={project.previewImage}
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-85"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 border border-white/15 text-[10px] text-white">
              DOMINIO ACTIVO: {project.url}
            </div>
          </div>

          {/* Desglose de Arquitectura en 3 Columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 bg-white/[0.02] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Velocidad de Carga</span>
              </div>
              <div className="text-base font-bold text-white">&lt; 0.7 Segundos</div>
              <div className="text-[10px] text-zinc-500">Renderizado a 60 FPS nativo</div>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kill Switch Activo</span>
              </div>
              <div className="text-base font-bold text-white">Monitoreado 24/7</div>
              <div className="text-[10px] text-zinc-500">Supabase Cloud + Render</div>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Core Operativo</span>
              </div>
              <div className="text-base font-bold text-white">Panel /#/dsb Aislado</div>
              <div className="text-[10px] text-zinc-500">Control de caja y pedidos</div>
            </div>

          </div>

          {/* Ficha Técnica Detallada */}
          <div className="space-y-4 text-xs font-sans text-zinc-300 leading-relaxed">
            
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                01 // El Cuello de Botella Operativo Resuelto (D0):
              </div>
              <p className="p-4 bg-white/[0.015] border border-white/5">
                {project.description}
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                02 // Especificaciones de Entrega:
              </div>
              <ul className="p-4 bg-white/[0.015] border border-white/5 space-y-2 font-mono text-[11px] text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Despliegue en red Edge CDN con SSL de 256 bits
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Catálogo / Menú interactivo con carrusel táctil y fotos HD
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Sincronización sin intermediarios hacia WhatsApp comercial
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Código de propiedad 100% exclusiva del cliente
                </li>
              </ul>
            </div>

          </div>

          {/* CTA de Visita */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-zinc-500">
              CLIENTE: {project.client}
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-platinum transition-colors flex items-center justify-center gap-2"
              >
                <span>Visitar Plataforma en Producción</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="px-4 py-3 bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10 font-mono text-xs uppercase"
              >
                Cerrar
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
