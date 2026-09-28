import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, Sun, Moon } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { soundFx } from '../../utils/audioEffects';
import AppearanceModal from './AppearanceModal';

export default function Navbar({ currentHash = '#/' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const { t, theme, toggleTheme, isLight } = useThemeLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentHash === '#/' || currentHash === '' || currentHash === '#';
  const isWorks = currentHash.startsWith('#/obras');
  const isSystems = currentHash.startsWith('#/sistemas');
  const isVision = currentHash.startsWith('#/vision');
  const isTriage = currentHash.startsWith('#/diagnostico');

  const activeClasses = 'bg-gradient-to-r from-cyan-500/25 via-purple-600/30 to-blue-500/25 text-white border border-cyan-400/40 shadow-[0_0_20px_rgba(168,85,247,0.35)] backdrop-blur-md font-semibold';
  const inactiveClasses = 'text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#030508]/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-monolith' 
            : 'bg-transparent py-2.5 sm:py-3 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* Logo Maestro Sin Fondo en Escala Prominente */}
          <a 
            href="/#/" 
            className="flex items-center group cursor-pointer py-0.5"
          >
            <img 
              src="/logo sin fondo.png" 
              alt="Dynamind Studios Logo" 
              className="h-10 sm:h-12 w-auto object-contain filter contrast-125 transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Botones de Navegación a la Derecha con Feedback Activo Morado/Azul (Sin Estrellas) */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2 ml-auto text-xs font-sans font-medium tracking-wide">
            <nav className="flex items-center gap-1.5 sm:gap-2">
              <a 
                href="/#/" 
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all duration-200 flex items-center gap-1.5 ${
                  isHome ? activeClasses : inactiveClasses
                }`}
              >
                <span>{t.nav.inicio}</span>
              </a>
              <a 
                href="/#/obras" 
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all duration-200 flex items-center gap-1.5 ${
                  isWorks ? activeClasses : inactiveClasses
                }`}
              >
                <span>{t.nav.obras}</span>
              </a>
              <a 
                href="/#/sistemas" 
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all duration-200 flex items-center gap-1.5 ${
                  isSystems ? activeClasses : inactiveClasses
                }`}
              >
                <span>{t.nav.sistemas}</span>
              </a>
              <a 
                href="/#/vision" 
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all duration-200 flex items-center gap-1.5 ${
                  isVision ? activeClasses : inactiveClasses
                }`}
              >
                <span>{t.nav.vision}</span>
              </a>
              <a 
                href="/#/diagnostico" 
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all duration-200 flex items-center gap-1.5 ${
                  isTriage ? activeClasses : inactiveClasses
                }`}
              >
                <span>{t.nav.diagnostico}</span>
              </a>
            </nav>

            {/* Botón Rápido de Toggle Sol / Luna (Modo Oscuro vs Modo Claro Apple) */}
            <button
              onClick={() => {
                soundFx.playBlip(isLight ? 520 : 640);
                toggleTheme();
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-amber-400 hover:bg-white/10 border border-transparent hover:border-amber-500/30 transition-all duration-300 group cursor-pointer"
              title={isLight ? 'Cambiar a Modo Oscuro Cósmico' : 'Cambiar a Modo Claro Editorial (Apple)'}
              aria-label="Alternar tema visual"
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
              )}
            </button>

            {/* Botón Tuerca Táctica de Apariencia e Idioma */}
            <button
              onClick={() => setAppearanceOpen(true)}
              className="p-2 rounded-xl text-zinc-400 hover:text-cyan-400 hover:bg-white/10 border border-transparent hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
              title={t.nav.configuracion}
              aria-label={t.nav.configuracion}
            >
              <Settings className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90" />
            </button>
          </div>

          {/* Botones Mobile Menu */}
          <div className="md:hidden flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => {
                soundFx.playBlip(isLight ? 520 : 640);
                toggleTheme();
              }}
              className="p-2 text-zinc-400 hover:text-amber-400 border border-white/10 rounded-xl bg-white/[0.02]"
              aria-label="Alternar tema visual"
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => setAppearanceOpen(true)}
              className="p-2 text-zinc-400 hover:text-cyan-400 border border-white/10 rounded-xl bg-white/[0.02]"
              aria-label={t.nav.configuracion}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white border border-white/10 rounded-xl bg-white/[0.02]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Menú Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#030508]/98 border-b border-white/15 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 font-mono">
            <nav className="flex flex-col gap-2 text-sm">
              <a 
                href="/#/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl uppercase transition-all flex items-center justify-between ${
                  isHome ? activeClasses : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>01. {t.nav.inicio}</span>
              </a>
              <a 
                href="/#/obras" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl uppercase transition-all flex items-center justify-between ${
                  isWorks ? activeClasses : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>02. {t.nav.obras}</span>
              </a>
              <a 
                href="/#/sistemas" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl uppercase transition-all flex items-center justify-between ${
                  isSystems ? activeClasses : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>03. {t.nav.sistemas}</span>
              </a>
              <a 
                href="/#/vision" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl uppercase transition-all flex items-center justify-between ${
                  isVision ? activeClasses : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>04. {t.nav.vision}</span>
              </a>
              <a 
                href="/#/diagnostico" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl uppercase transition-all flex items-center justify-between ${
                  isTriage ? activeClasses : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>05. {t.nav.diagnostico}</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Modal de Configuración y Temas */}
      <AppearanceModal isOpen={appearanceOpen} onClose={() => setAppearanceOpen(false)} />
    </>
  );
}
