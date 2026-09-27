/**
 * DESIGN TOKEN CONTRACT (DTC) - DYNAMIND & FRAMEWORK MAESTRO (DOC 24)
 * Contrato canónico e inmutable de tokens de diseño para erradicar el "Síndrome Frankenstein"
 * y garantizar coherencia morfológica, cromática y de movimiento en todo el producto.
 */

export const DESIGN_TOKENS = {
  // 1. Morfología de Esquinas (Radii Contract)
  radii: {
    container: 'rounded-2xl', // 16px - Secciones mayores, modales, drawers
    card: 'rounded-2xl',      // 16px - Tarjetas de catálogo, cajas de contenido
    control: 'rounded-xl',    // 12px - Botones, inputs, selects, switches
    badge: 'rounded-full',    // Píldoras de autor (siempre con px-3 py-1 text-xs)
  },

  // 2. Curvas de Movimiento Cinemático (Kinetic Contract)
  motion: {
    curve: [0.16, 1, 0.3, 1], // Curva Bézier oficial Apple/Editorial
    transition: {
      fast: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      normal: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      slow: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },

  // 3. Paleta Cromática y Superficies Semánticas
  surfaces: {
    card: 'bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300',
    cardElevated: 'bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/50',
    input: 'bg-black/40 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white rounded-xl placeholder:text-slate-500 transition-all duration-200 outline-none',
    buttonPrimary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all duration-200 rounded-xl',
    buttonSecondary: 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 active:scale-[0.98] transition-all duration-200 rounded-xl',
    badge: 'px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-white/10 bg-white/5 text-slate-300 inline-flex items-center gap-1.5',
  },

  // 4. Jerarquía Tipográfica Editorial
  typography: {
    hero: 'font-sans font-extrabold tracking-tight text-white leading-tight',
    sectionTitle: 'font-sans font-bold tracking-tight text-white',
    body: 'font-sans text-slate-300 antialiased leading-relaxed',
    mono: 'font-mono text-cyan-400 tracking-wider text-xs uppercase',
  },
};

export default DESIGN_TOKENS;
