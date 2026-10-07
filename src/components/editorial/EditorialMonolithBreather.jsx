import React from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import RevealSection from '../motion/RevealSection';

/**
 * EditorialMonolithBreather - Bloque de Respiro Monolítico
 * Aplica la regla de pacing editorial: intercala un espacio de silencio visual
 * de alta pureza tipográfica entre bloques intensamente interactivos.
 */
export default function EditorialMonolithBreather({
  tag = 'PAUTA ESTRATÉGICA // REFLEXIÓN EJECUTIVA',
  quote = 'El software no debe ser una renta perpetua que drene tu flujo de caja. Debe ser el activo patrimonial más sólido y soberano de tu empresa.',
  author = 'Juan Pablo Orozco',
  role = 'Chief Architect · Dynamind Studios'
}) {
  const { isLight } = useThemeLanguage();

  return (
    <section className={`w-full py-24 sm:py-32 relative select-none transition-colors duration-500 ${
      isLight ? 'bg-[#f1f5f9]' : 'bg-[#030508]'
    }`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6">
        <RevealSection direction="up">
          <div className="space-y-5">
            {/* Frase Editorial Monolítica de Gran Escala */}
            <blockquote className={`font-display font-light text-2xl sm:text-4xl md:text-[2.6rem] leading-[1.25] tracking-tight ${
              isLight ? 'text-black font-normal' : 'text-zinc-100 font-light'
            }`}>
              “{quote}”
            </blockquote>

            {/* Crédito de Autoría Editorial */}
            <div className="pt-2 flex flex-col items-center justify-center space-y-0.5">
              <span className={`font-sans text-xs sm:text-sm font-semibold tracking-wide ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {author}
              </span>
              <span className={`font-mono text-[11px] ${
                isLight ? 'text-slate-500' : 'text-zinc-500'
              }`}>
                {role}
              </span>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
