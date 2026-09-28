import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, Square, Sparkles, Sun, Moon } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { getFlagComponent } from '../common/FlagIcons';

export default function AppearanceModal({ isOpen, onClose }) {
  const { theme, setTheme, borderStyle, setBorderStyle, language, setLanguage, t } = useThemeLanguage();

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bordersList = [
    {
      id: 'sharp',
      name: t.appearance.sharp,
      description: t.appearance.sharpDesc,
      badge: 'Bordes Rectos 90°',
      previewRadius: 'rounded-none'
    },
    {
      id: 'medium',
      name: t.appearance.medium,
      description: t.appearance.mediumDesc,
      badge: 'Equilibrado (Actual)',
      previewRadius: 'rounded-xl'
    },
    {
      id: 'rounded',
      name: t.appearance.rounded,
      description: t.appearance.roundedDesc,
      badge: 'Redondeado Suave',
      previewRadius: 'rounded-2xl'
    }
  ];

  const languagesList = [
    { code: 'es', label: 'Español', flag: '🇨🇴', region: 'Colombia / Latam' },
    { code: 'en', label: 'English', flag: '🇺🇸', region: 'Global / US' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', region: 'Europe FR' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', region: 'DACH DE' },
    { code: 'pt', label: 'Português', flag: '🇧🇷', region: 'Brasil / PT' },
    { code: 'ja', label: '日本語', flag: '🇯🇵', region: 'Japan JA' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#080d1a]/95 p-6 sm:p-8 text-white shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  {t.appearance.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Personaliza la morfología geométrica de bordes y el idioma del portal
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Sección 0: Tema Visual (Oscuro Cósmico vs Claro Apple) */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide text-cyan-400 uppercase">
                <Sun className="w-4 h-4" />
                <span>Tema & Iluminación</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme('obsidian')}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    theme !== 'alabaster'
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#030508] border border-white/20 flex items-center justify-center text-cyan-400 shadow-inner">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Modo Oscuro Cósmico</div>
                      <div className="text-[11px] text-zinc-400">Obsidian profundo con nebulosas y estrellas</div>
                    </div>
                  </div>
                  {theme !== 'alabaster' && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('alabaster')}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    theme === 'alabaster'
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-amber-500 shadow-sm">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Modo Claro Apple</div>
                      <div className="text-[11px] text-zinc-400">Blanco Alabastro suizo y hardware pro</div>
                    </div>
                  </div>
                  {theme === 'alabaster' && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Sección Morfología de Bordes */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide text-cyan-400 uppercase">
                <Square className="w-4 h-4" />
                <span>{t.appearance.borders}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {bordersList.map((item) => {
                  const isSelected = borderStyle === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setBorderStyle(item.id)}
                      className={`relative flex flex-col p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {item.badge}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-sm text-white mb-1">
                        {item.name}
                      </span>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>
                      {/* Miniatura visual de demostración de esquina */}
                      <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-center">
                        <div className={`w-full py-2 px-3 text-center text-[10px] font-mono border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 ${item.previewRadius}`}>
                          DEMO UI
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sección Idioma */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide text-cyan-400 uppercase">
                <Globe className="w-4 h-4" />
                <span>{t.appearance.languages}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {languagesList.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                          : 'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          {getFlagComponent(lang.code, 24)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold leading-tight">{lang.label}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{lang.region}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-cyan-400 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Persistencia atómica en LocalStorage
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all"
            >
              {t.appearance.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
