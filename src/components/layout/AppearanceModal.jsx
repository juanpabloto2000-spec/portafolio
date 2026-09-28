import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, Square, Sparkles, Sun, Moon } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { getFlagComponent } from '../common/FlagIcons';

export default function AppearanceModal({ isOpen, onClose }) {
  const { theme, setTheme, borderStyle, setBorderStyle, language, setLanguage, t, isLight } = useThemeLanguage();

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
      previewRadius: 'rounded-none'
    },
    {
      id: 'medium',
      name: t.appearance.medium,
      description: t.appearance.mediumDesc,
      previewRadius: 'rounded-xl'
    },
    {
      id: 'rounded',
      name: t.appearance.rounded,
      description: t.appearance.roundedDesc,
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
          className={`relative w-full max-w-xl overflow-hidden rounded-2xl border p-6 sm:p-8 backdrop-blur-2xl transition-colors duration-300 ${
            isLight 
              ? 'bg-white/95 text-slate-900 border-slate-200 shadow-2xl shadow-indigo-500/10' 
              : 'bg-[#080d1a]/95 text-white border-white/10 shadow-2xl shadow-cyan-500/10'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between pb-6 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${
                isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
              }`}>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {t.appearance.title}
                </h3>
                <p className={`text-xs ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Personaliza la morfología geométrica de bordes y el idioma del portal
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isLight ? 'text-slate-500 hover:text-black hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Sección 0: Tema Visual (Oscuro Cósmico vs Claro Apple) */}
            <div>
              <div className={`flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide uppercase ${
                isLight ? 'text-indigo-600' : 'text-cyan-400'
              }`}>
                <Sun className="w-4 h-4" />
                <span>Tema & Iluminación</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme('obsidian')}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    theme !== 'alabaster'
                      ? (isLight ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-500' : 'border-cyan-400 bg-cyan-950/40 shadow-lg ring-1 ring-cyan-400')
                      : (isLight ? 'border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#030508] border border-white/20 flex items-center justify-center text-cyan-400 shadow-inner">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>Modo Oscuro Cósmico</div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Obsidian profundo con nebulosas y estrellas</div>
                    </div>
                  </div>
                  {theme !== 'alabaster' && (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isLight ? 'bg-indigo-600 text-white' : 'bg-cyan-400 text-black'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('alabaster')}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    theme === 'alabaster'
                      ? (isLight ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-500' : 'border-cyan-400 bg-cyan-950/40 shadow-lg ring-1 ring-cyan-400')
                      : (isLight ? 'border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-amber-500 shadow-sm">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>Modo Claro Apple</div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Blanco Alabastro suizo y hardware pro</div>
                    </div>
                  </div>
                  {theme === 'alabaster' && (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isLight ? 'bg-indigo-600 text-white' : 'bg-cyan-400 text-black'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Sección Morfología de Bordes */}
            <div>
              <div className={`flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide uppercase ${
                isLight ? 'text-indigo-600' : 'text-cyan-400'
              }`}>
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
                          ? (isLight ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-500' : 'border-cyan-400 bg-cyan-950/30 shadow-lg ring-1 ring-cyan-400')
                          : (isLight ? 'border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20')
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 min-h-[24px]">
                        <span className={`font-semibold text-sm ${
                          isLight ? 'text-black' : 'text-white'
                        }`}>
                          {item.name}
                        </span>
                        {isSelected && (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isLight ? 'bg-indigo-600 text-white' : 'bg-cyan-400 text-black'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className={`text-[11px] line-clamp-2 leading-relaxed mb-3 ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {item.description}
                      </p>
                      {/* Miniatura visual de demostración de esquina */}
                      <div className={`mt-auto pt-2 border-t flex items-center justify-center ${
                        isLight ? 'border-slate-200' : 'border-white/5'
                      }`}>
                        <div className={`w-full py-2 px-3 text-center text-[10px] font-mono border ${
                          isLight ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300'
                        } ${item.previewRadius}`}>
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
              <div className={`flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide uppercase ${
                isLight ? 'text-indigo-600' : 'text-cyan-400'
              }`}>
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
                          ? (isLight ? 'border-indigo-600 bg-indigo-50 text-slate-900 shadow-md ring-1 ring-indigo-500' : 'border-cyan-400 bg-cyan-950/30 text-white shadow-md ring-1 ring-cyan-400')
                          : (isLight ? 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300' : 'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:border-white/20')
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          {getFlagComponent(lang.code, 24)}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold leading-tight ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}>{lang.label}</p>
                          <p className={`text-[10px] font-mono ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}>{lang.region}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className={`w-4 h-4 stroke-[3] ${
                          isLight ? 'text-indigo-600' : 'text-cyan-400'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`pt-4 border-t flex items-center justify-between ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <span className={`text-xs font-mono ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Persistencia atómica en LocalStorage
            </span>
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-white font-medium text-sm hover:brightness-110 shadow-lg transition-all ${
                isLight 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/25' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/25'
              }`}
            >
              {t.appearance.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
