import React from 'react';
import { 
  Bot, ShieldCheck, Headphones, Award, CheckCircle2, 
  ArrowRight, Sparkles, Cpu, Zap, Lock, RefreshCw, FileCheck 
} from 'lucide-react';
import RevealSection from '../motion/RevealSection';
import HyperframeHUDContainer from '../ui/HyperframeHUDContainer';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function SovereignEngineeringStandards() {
  const { t } = useThemeLanguage();
  const st = t.standards;

  return (
    <section className="py-24 sm:py-32 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Cabecera de la Sección */}
        <RevealSection direction="up" className="max-w-3xl space-y-4">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.1]">
            {st.title}
          </h2>
          <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed">
            {st.desc}
          </p>
        </RevealSection>

        {/* ============================================================== */}
        {/* 1. PILAR AEO (ANSWER ENGINE OPTIMIZATION) VS SEO DE HACE 15 AÑOS */}
        {/* ============================================================== */}
        <RevealSection direction="up">
          <HyperframeHUDContainer className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {st.aeoTitle}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  {st.aeoDesc1}
                </p>
                <p className="text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
                  {st.aeoDesc2}
                </p>
              </div>

              {/* Comparativa Visual AEO vs SEO */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                
                {/* SEO Viejo */}
                <div className="p-5 rounded-2xl bg-[#130708]/95 border border-red-500/35 space-y-3 shadow-lg">
                  <div className="font-mono text-[11px] font-bold text-red-400 uppercase flex items-center gap-1.5">
                    <span>{st.seoOldTitle}</span>
                  </div>
                  <ul className="space-y-2 text-zinc-300 leading-relaxed text-[11px]">
                    <li>• Palabras clave forzadas que ahuyentan clientes.</li>
                    <li>• Cero optimización para motores neuronales de IA.</li>
                    <li>• Si Google cambia de algoritmo, tu web desaparece.</li>
                    <li>• Metadatos planos sin jerarquía relacional.</li>
                  </ul>
                </div>

                {/* AEO Dynamind */}
                <div className="p-5 rounded-2xl bg-[#061219]/95 border border-cyan-400/50 space-y-3 shadow-lg shadow-cyan-500/10">
                  <div className="font-mono text-[11px] font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                    <span>{st.aeoNewTitle}</span>
                  </div>
                  <ul className="space-y-2 text-zinc-200 leading-relaxed text-[11px]">
                    <li>• <strong>Grafos de Conocimiento JSON-LD</strong> nativos.</li>
                    <li>• Respuestas directas citadas en ChatGPT y Perplexity.</li>
                    <li>• Máxima autoridad semántica reconocida por LLMs.</li>
                    <li>• Conversión instantánea desde motores de respuesta.</li>
                  </ul>
                </div>

              </div>

            </div>
          </HyperframeHUDContainer>
        </RevealSection>

        {/* ============================================================== */}
        {/* 2. CIBERDEFENSA, PRIVACIDAD BANCARIA & SOPORTE CONTINUO 24/7   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Ciberseguridad Bancaria */}
          <RevealSection direction="up" delay={0.1}>
            <HyperframeHUDContainer className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">
                  {st.cyberTitle}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  {st.cyberDesc}
                </p>
                <div className="space-y-2 pt-2 text-xs font-sans text-zinc-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Row Level Security (RLS):</strong> Ni siquiera un atacante con credenciales públicas puede leer folios ajenos.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Mitigación Anti-Bots & DDoS:</strong> Rate limiting en Edge para frenar tráfico malicioso.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Habeas Data & GDPR:</strong> Cumplimiento de la Ley 1581 para protección de datos personales.</span>
                  </div>
                </div>
              </div>
            </HyperframeHUDContainer>
          </RevealSection>

          {/* Soporte Soberano 24/7 */}
          <RevealSection direction="up" delay={0.15}>
            <HyperframeHUDContainer className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">
                  {st.guaranteesTitle}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  {st.guaranteesDesc}
                </p>
                <div className="space-y-2 pt-2 text-xs font-sans text-zinc-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Respuesta Humana en &lt; 15 min:</strong> Comunicación directa con los arquitectos, sin tickets burocráticos.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Monitorización 24/7 en Tiempo Real:</strong> Sondas activas cada 60 segundos sobre CDN y bases de datos.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Copias de Seguridad Criptográficas:</strong> Respaldos inmutables para cero pérdida de historial.</span>
                  </div>
                </div>
              </div>
            </HyperframeHUDContainer>
          </RevealSection>

        </div>

        {/* ============================================================== */}
        {/* 3. TRÍADA DE GARANTÍAS DYNAMIND (CAPACITACIÓN + 1M SOPORTE + 6M) */}
        {/* ============================================================== */}
        <RevealSection direction="up">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl shadow-2xl space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                Compromiso Incondicional de Éxito
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-4xl text-white pt-1">
                La Tríada de Garantías Dynamind
              </h3>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                Entregar un software y desaparecer es el modelo tóxico de las agencias. Nosotros sellamos el contrato con tres garantías obligatorias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Garantía 1 */}
              <div className="p-6 rounded-2xl bg-[#0e121e]/95 border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/25 transition-all shadow-lg">
                <div className="space-y-2">
                  <div className="text-3xl">🎓</div>
                  <h4 className="font-display font-bold text-lg text-white">
                    Capacitación 1 a 1 para Todo el Equipo
                  </h4>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Sesiones guiadas con recepcionistas, cajeros, administradores y personal de cocina. Entrega de manuales en video de autor para asegurar <strong>100% de adopción</strong> desde el primer día.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-cyan-400 font-semibold">
                  ✓ Cero Curva de Frustración
                </div>
              </div>

              {/* Garantía 2 */}
              <div className="p-6 rounded-2xl bg-[#0e121e]/95 border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/25 transition-all shadow-lg">
                <div className="space-y-2">
                  <div className="text-3xl">🛡️</div>
                  <h4 className="font-display font-bold text-lg text-white">
                    1 Mes de Soporte Total Gratuito
                  </h4>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Acompañamiento prioritario en vivo durante las primeras 4 semanas de lanzamiento. Ajustamos cualquier detalle de flujo, tarifa o comanda en tiempo real sin cobrar ni un solo centavo extra.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400 font-semibold">
                  ✓ Cobertura Operativa 100%
                </div>
              </div>

              {/* Garantía 3 */}
              <div className="p-6 rounded-2xl bg-[#0e121e]/95 border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/25 transition-all shadow-lg">
                <div className="space-y-2">
                  <div className="text-3xl">🏆</div>
                  <h4 className="font-display font-bold text-lg text-white">
                    6 Meses de Garantía Incondicional
                  </h4>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Garantía formal de que el sistema funcionará a la perfección. Si algún flujo de reservas, cálculo de caja o base de datos presenta fallas lógicas, lo resolvemos inmediatamente por escrito.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-amber-400 font-semibold">
                  ✓ Garantía de Paz Mental
                </div>
              </div>

            </div>

            {/* CTA Final */}
            <div className="pt-4 text-center">
              <a
                href="/#/diagnostico"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-sans font-bold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-monolith cursor-pointer"
              >
                <span>Evaluar Mi Proyecto con Estas Garantías (45s)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </RevealSection>

      </div>
    </section>
  );
}
