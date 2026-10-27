import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles, Flame, Tag } from 'lucide-react';
import { festiveThemeStore } from '../../services/festiveThemeStore';

/**
 * TOP BANNER PROMOCIONAL FIJADO (CANÓNICO CONDICIONAL)
 * Dynamind Studios - High-Conversion Fixed Editorial Ribbon
 * 
 * Se renderiza fijado en la cima absoluta de la página ÚNICAMENTE
 * si está activado desde el DSB. Si está inactivo, retorna null de forma estricta.
 */
export default function TopBanner() {
  const [bannerConfig, setBannerConfig] = useState(() => festiveThemeStore.getPromoBannerConfig());
  const [festiveConfig, setFestiveConfig] = useState(() => festiveThemeStore.getFestiveConfig());
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('dynamind_top_banner_dismissed_v1') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const unsubscribe = festiveThemeStore.subscribe(
      (newFestive) => setFestiveConfig(newFestive),
      (newBanner) => {
        setBannerConfig(newBanner);
        // Si el admin modifica el banner desde el DSB, re-habilitarlo para ver el cambio
        setIsDismissed(false);
        try {
          sessionStorage.removeItem('dynamind_top_banner_dismissed_v1');
        } catch {}
      }
    );
    return unsubscribe;
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('dynamind_top_banner_dismissed_v1', 'true');
    } catch {}
    // Emitir evento para que la Navbar ajuste su offset instantáneamente
    window.dispatchEvent(new CustomEvent('dynamind_banner_visibility_change', { detail: { visible: false } }));
  };

  const isVisible = bannerConfig.active && !isDismissed;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('dynamind_banner_visibility_change', { detail: { visible: isVisible } }));
  }, [isVisible]);

  // Si está inactivo o descartado, CERO píxeles, CERO overhead
  if (!isVisible) return null;

  const isHalloween = festiveConfig.themeId === 'halloween';

  return (
    <aside
      id="dynamind-top-promo-banner"
      aria-label="Aviso Promocional"
      className={`fixed top-0 left-0 right-0 z-[100002] transition-colors duration-300 font-mono select-none ${
        isHalloween
          ? 'bg-[#0e0716]/95 border-b border-orange-500/30 text-zinc-100 shadow-[0_2px_20px_rgba(249,115,22,0.18)]'
          : 'bg-[#05070e]/95 border-b border-indigo-500/30 text-zinc-100 shadow-[0_2px_20px_rgba(99,102,241,0.18)]'
      } backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-9 sm:h-10 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
        
        {/* Contenido Central y Badge */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden truncate mx-auto">
          
          {/* Badge de Descuento en Relieve */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[10px] shrink-0 border shadow-sm ${
              isHalloween
                ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white border-orange-400/50 shadow-[0_0_10px_rgba(249,115,22,0.35)]'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-cyan-400/50 shadow-[0_0_10px_rgba(56,189,248,0.35)]'
            }`}
          >
            {isHalloween ? <Flame className="w-3 h-3 text-amber-300 animate-pulse" /> : <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />}
            <span>{bannerConfig.badgeText || 'OFERTA ESPECIAL'}</span>
          </span>

          {/* Mensaje Editorial */}
          <span className="font-sans font-medium text-zinc-200 truncate">
            {bannerConfig.message}
          </span>

          {/* Botón CTA Directo */}
          {bannerConfig.ctaText && (
            <a
              href={bannerConfig.ctaLink || '#/diagnostico'}
              className={`hidden md:inline-flex items-center gap-1 font-sans font-bold uppercase tracking-wider text-[10px] sm:text-[11px] ml-1 transition-all ${
                isHalloween
                  ? 'text-orange-400 hover:text-orange-300 underline underline-offset-4 decoration-orange-500/50'
                  : 'text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/50'
              }`}
            >
              <span>{bannerConfig.ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Botón de Cierre para el Visitante */}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          title="Cerrar aviso en esta sesión"
          aria-label="Cerrar aviso"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
}
