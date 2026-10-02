import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HyperframeHUDContainer from '../ui/HyperframeHUDContainer';
import { 
  Sun, ShieldAlert, CheckCircle2, Cpu, ArrowRight, 
  Activity, Check, X, ShieldCheck, Compass, Sparkles, Radio, Orbit
} from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function GalaxyTelemetryHUD({ 
  currentStation, 
  onNextStation 
}) {
  const isCore = currentStation.type === 'core';

  return (
    <HyperframeHUDContainer 
      activeCornerTheme={isCore ? 'gold' : 'cyan'}
      className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        
        {/* ============================================================== */}
        {/* CASO A: SI ESTÁ SELECCIONADO EL NÚCLEO (DYNAMIND PRIME)        */}
        {/* ============================================================== */}
        {isCore ? (
          <motion.div
            key="core-telemetry"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header del Manifiesto de Consultoría */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>NÚCLEO CENTRAL SOBERANO // CONSULTORÍA DE IA (NO SOMOS UNA AGENCIA)</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight">
                  ¿Por qué una Consultoría de IA y NO una Agencia Tradicional?
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed font-light">
                  Las agencias tradicionales venden publicaciones en redes, revenden plantillas lentas de WordPress y amarran al cliente a tarifas mensuales. 
                  En <strong className="text-white font-medium">Dynamind</strong> operamos como ingenieros de sistemas e inteligencia de negocio: 
                  auditamos los cuellos de botella reales (D0), diseñamos arquitectura a medida y entregamos código propietario en tu repositorio de GitHub sin renta de software.
                </p>
              </div>

              <a
                href="#/diagnostico"
                className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-sans font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start lg:self-center"
              >
                <span>Diagnosticar Fricción Operativa (D0)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Cuadrícula Comparativa: Agencia vs Consultoría Dynamind */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Pilar 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">01 // DIAGNÓSTICO MATEMÁTICO</div>
                <div className="text-sm font-bold text-white font-sans">Auditoría D0 de Cuellos de Botella</div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                  <p className="text-red-300/80 flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Agencia:</strong> Te vende un rediseño superficial sin saber si tu problema es la caja o el no-show.</span>
                  </p>
                  <p className="text-emerald-300 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dynamind:</strong> Calculamos el odómetro de fricción y atacamos la fuga que frena tu facturación.</span>
                  </p>
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">02 // SOBERANÍA TECNOLÓGICA</div>
                <div className="text-sm font-bold text-white font-sans">Código Propietario en tu Repositorio</div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                  <p className="text-red-300/80 flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Agencia:</strong> Te ata a plataformas cerradas (Shopify, Wix) donde dejas de pagar y pierdes todo.</span>
                  </p>
                  <p className="text-emerald-300 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dynamind:</strong> Te entregamos el repositorio privado en GitHub. Eres dueño absoluto de tu software.</span>
                  </p>
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">03 // DUALIDAD HOLÍSTICA</div>
                <div className="text-sm font-bold text-white font-sans">Sistemas Complejos + Agentes Quirúrgicos</div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                  <p className="text-red-300/80 flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Agencia:</strong> Solo sabe conectar un chatbot torpe o hacer publicaciones en Canva.</span>
                  </p>
                  <p className="text-emerald-300 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dynamind:</strong> Creamos PMS y cajas con arqueo ciego, y también agentes de scoring o flujos n8n autónomos.</span>
                  </p>
                </div>
              </div>

              {/* Pilar 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">04 // CERO COMISIONES</div>
                <div className="text-sm font-bold text-white font-sans">Erradicación de Renta de Intermediarios</div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                  <p className="text-red-300/80 flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Agencia:</strong> Te hace depender de agregadores que te quitan el 18% al 25% de cada venta en comisiones.</span>
                  </p>
                  <p className="text-emerald-300 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dynamind:</strong> Canales de venta y reservas directas a tu propia cuenta bancaria con 0% de comisión externa.</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Barra Guía para Continuar el Tour */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="text-zinc-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explora cada una de las 17 Galaxias en el visor superior para ver los sistemas específicos en detalle.</span>
              </div>
              <button
                onClick={onNextStation}
                className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-all font-bold flex items-center gap-2"
              >
                <span>Iniciar Vuelo a la Galaxia 01</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key={`galaxy-telemetry-${currentStation.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header de la Galaxia */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentStation.color }} />
                  <span style={{ color: currentStation.color }}>{currentStation.subtitle}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{currentStation.archetype}</span>
                </div>
                
                <h3 className="text-xl sm:text-3xl font-display font-bold text-white">
                  {currentStation.title}
                </h3>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 self-start sm:self-center">
                Estación {currentStation.stationNumber} de 17
              </div>
            </div>

            {/* Alerta de Cuello de Botella Crítico (D0) */}
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs font-sans text-red-200/90 leading-relaxed space-y-1">
              <div className="font-mono font-bold text-red-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Cuello de Botella Operativo Real que Erradica este Sistema (D0):</span>
              </div>
              <p className="font-light">{currentStation.coreD0}</p>
            </div>

            {/* Pipeline de Flujo de 4 Fases */}
            {currentStation.pipelineSteps && (
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pipeline de Ejecución Autónomo:</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentStation.pipelineSteps.map((step, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-1 relative"
                    >
                      <div className="text-[9px] font-mono text-zinc-500">FASE 0{sIdx + 1}</div>
                      <div className="text-xs font-bold text-white font-sans">{step}</div>
                      {sIdx < currentStation.pipelineSteps.length - 1 && (
                        <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-600 text-xs z-10">
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capacidades & Módulos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Capacidades de Alto Impacto */}
              {currentStation.keyCapabilities && (
                <div className="space-y-3 font-sans">
                  <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Capacidades de Alto Impacto Garantizadas:</span>
                  </div>
                  <div className="space-y-2">
                    {currentStation.keyCapabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed font-light">
                        <span className="text-emerald-400 shrink-0 font-mono font-bold">✓</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Módulos Operativos Activos */}
              {currentStation.modules && (
                <div className="space-y-3 font-sans">
                  <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>Módulos Operativos del Sistema:</span>
                  </div>
                  <div className="space-y-2">
                    {currentStation.modules.map((mod, mIdx) => (
                      <div key={mIdx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                        <div className="text-xs font-bold text-white">{mod.name}</div>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer de Navegación del Sistema */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentStation.color }} />
                <span>Arquitectura soberana: código propio alojado en tu propio repositorio</span>
              </div>
              
              <div className="flex items-center gap-4">
                <a
                  href="#/obras"
                  className="hover:underline font-bold flex items-center gap-1.5 active:scale-95"
                  style={{ color: currentStation.color }}
                >
                  <span>Ver casos reales de este sistema en Obras</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onNextStation}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Siguiente Galaxia</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </HyperframeHUDContainer>
  );
}
