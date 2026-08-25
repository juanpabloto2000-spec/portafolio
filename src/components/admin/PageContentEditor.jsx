import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Type, Image as ImageIcon, Sparkles, Save, RotateCcw, 
  Check, ArrowRight, Layers, Globe, Plus, Trash2, ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export default function PageContentEditor() {
  const { siteContent, updateSiteContent, resetSiteContent } = useApp();

  const [form, setForm] = useState(siteContent);
  const [activeTab, setActiveTab] = useState('texts'); // 'texts' | 'media' | 'styles' | 'projects'
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    updateSiteContent(form);
    setSavedFeedback(true);
    confetti({ particleCount: 50, spread: 45 });
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("¿Deseas restaurar todos los textos y estilos de la web a los valores predeterminados?")) {
      resetSiteContent();
      setForm(siteContent);
      confetti({ particleCount: 30, spread: 35 });
    }
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header with Save & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <span>🎨</span>
            <span>EDITOR VISUAL & CMS DE CONTENIDO</span>
          </div>
          <h2 className="text-2xl font-bold font-heading-luxury text-white">
            Personalización de la Página Web
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Modifica textos, titulares, fotos, colores de fondo y proyectos del portafolio en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md transition-all"
          >
            {savedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>¡Cambios Publicados!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Guardar y Publicar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'texts', label: '📝 Textos & Titulares', emoji: '📝' },
          { id: 'media', label: '🖼️ Logotipos & Fotos', emoji: '🖼️' },
          { id: 'styles', label: '🎨 Estética & Colores', emoji: '🎨' },
          { id: 'projects', label: '🚀 Demos & Proyectos', emoji: '🚀' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TEXTS & HEADERS */}
      {activeTab === 'texts' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Hero Texts */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>⚡</span>
              <span>Sección Principal (Hero)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Subtítulo Superior (Etiqueta de estudio)</label>
                <input
                  type="text"
                  value={form.hero.badgeText}
                  onChange={(e) => setForm({
                    ...form,
                    hero: { ...form.hero, badgeText: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Titular Principal H1</label>
                <textarea
                  rows="2"
                  value={form.hero.title}
                  onChange={(e) => setForm({
                    ...form,
                    hero: { ...form.hero, title: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Palabra Clave con Resplandor Platino</label>
                <input
                  type="text"
                  value={form.hero.highlightWord}
                  onChange={(e) => setForm({
                    ...form,
                    hero: { ...form.hero, highlightWord: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Descripción de Propuesta de Valor</label>
                <textarea
                  rows="3"
                  value={form.hero.description}
                  onChange={(e) => setForm({
                    ...form,
                    hero: { ...form.hero, description: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Demos & Systems Section Texts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Demos Header */}
            <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
                <span>🎯</span>
                <span>Sección de Demos</span>
              </h3>

              <div>
                <label className="text-zinc-400 block mb-1">Título de Sección</label>
                <input
                  type="text"
                  value={form.demosSection.title}
                  onChange={(e) => setForm({
                    ...form,
                    demosSection: { ...form.demosSection, title: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Descripción</label>
                <textarea
                  rows="2"
                  value={form.demosSection.description}
                  onChange={(e) => setForm({
                    ...form,
                    demosSection: { ...form.demosSection, description: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white resize-none"
                />
              </div>
            </div>

            {/* Systems Header */}
            <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
                <span>⚙️</span>
                <span>Sección de Sistemas Bento</span>
              </h3>

              <div>
                <label className="text-zinc-400 block mb-1">Título de Sección</label>
                <input
                  type="text"
                  value={form.systemsSection.title}
                  onChange={(e) => setForm({
                    ...form,
                    systemsSection: { ...form.systemsSection, title: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Descripción</label>
                <textarea
                  rows="2"
                  value={form.systemsSection.description}
                  onChange={(e) => setForm({
                    ...form,
                    systemsSection: { ...form.systemsSection, description: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white resize-none"
                />
              </div>
            </div>

          </div>

          {/* Footer Texts */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>💎</span>
              <span>Banner de Conversión Final & Footer</span>
            </h3>

            <div>
              <label className="text-zinc-400 block mb-1">Titular de Cierre</label>
              <input
                type="text"
                value={form.footer.headline}
                onChange={(e) => setForm({
                  ...form,
                  footer: { ...form.footer, headline: e.target.value }
                })}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Descripción de Cierre</label>
              <textarea
                rows="2"
                value={form.footer.description}
                onChange={(e) => setForm({
                  ...form,
                  footer: { ...form.footer, description: e.target.value }
                })}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white resize-none"
              />
            </div>
          </div>

        </motion.div>
      )}

      {/* TAB 2: LOGOS & PHOTOS */}
      {activeTab === 'media' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Logo */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>👑</span>
              <span>Logotipo Principal del Estudio</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-black border border-white/20 overflow-hidden flex items-center justify-center p-1 shadow-lg shrink-0">
                <img src={form.branding.logoUrl} alt="Logo Preview" className="w-full h-full object-cover rounded-xl" />
              </div>

              <div className="flex-1 space-y-2 text-xs w-full">
                <label className="text-zinc-400 block">Ruta o URL de Imagen del Logotipo</label>
                <input
                  type="text"
                  value={form.branding.logoUrl}
                  onChange={(e) => setForm({
                    ...form,
                    branding: { ...form.branding, logoUrl: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono"
                />
                <p className="text-[11px] text-zinc-500 font-light">Puedes usar rutas locales (ej. <code>/logo.jpeg</code>) o enlaces HTTPS directos.</p>
              </div>
            </div>
          </div>

          {/* Demo Project Images */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>🖼️</span>
              <span>Imágenes de Portada para Demos Interactivas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.customProjects.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.previewImage} alt={p.title} className="w-14 h-10 object-cover rounded-lg border border-white/10" />
                    <div>
                      <h4 className="font-bold text-white">{p.title}</h4>
                      <span className="text-[10px] text-zinc-500">{p.niche}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 text-[10px] block mb-1">URL de Imagen</label>
                    <input
                      type="text"
                      value={p.previewImage}
                      onChange={(e) => {
                        const newProjects = [...form.customProjects];
                        newProjects[idx] = { ...newProjects[idx], previewImage: e.target.value };
                        setForm({ ...form, customProjects: newProjects });
                      }}
                      className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-white font-mono text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}

      {/* TAB 3: STYLES & ACCENTS */}
      {activeTab === 'styles' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Background Tone */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>🌑</span>
              <span>Tono de Fondo de la Web</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'pure-dark', label: 'Obsidiana Pura', desc: 'Negro absoluto (#050505) de máximo contraste', color: '#050505' },
                { id: 'obsidian', label: 'Noche Profunda', desc: 'Negro azulado (#08080c) de ultra lujo', color: '#08080c' },
                { id: 'graphite', label: 'Grafito Sutil', desc: 'Gris oscuro mate (#0d0d12) minimalista', color: '#0d0d12' }
              ].map((theme) => {
                const isSelected = form.styles.bgTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setForm({
                      ...form,
                      styles: { ...form.styles, bgTheme: theme.id }
                    })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white/10 border-white shadow-metal-glow'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: theme.color }} />
                      <span className="font-bold text-white text-xs">{theme.label}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">{theme.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Glow */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>✨</span>
              <span>Acento Metálico & Resplandor</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'platinum', label: 'Platino Puro', color: 'from-slate-200 to-zinc-400' },
                { id: 'silver', label: 'Cromo Plateado', color: 'from-zinc-100 to-slate-500' },
                { id: 'emerald', label: 'Esmeralda', color: 'from-emerald-300 to-teal-600' },
                { id: 'gold', label: 'Champagne', color: 'from-amber-200 to-yellow-600' }
              ].map((acc) => {
                const isSelected = form.styles.accentColor === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => setForm({
                      ...form,
                      styles: { ...form.styles, accentColor: acc.id }
                    })}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-white/10 border-white shadow-metal-glow'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`h-2 rounded-full bg-gradient-to-r ${acc.color} mb-2`} />
                    <span className="font-medium text-xs text-white">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Radius */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>📐</span>
              <span>Radio Geométrico de Esquinas</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'rounded-xl', label: '12px (Compacto)', radius: '12px' },
                { id: 'rounded-2xl', label: '16px (Estándar de Lujo)', radius: '16px' },
                { id: 'rounded-3xl', label: '24px (Suave)', radius: '24px' }
              ].map((rad) => {
                const isSelected = form.styles.cornerRadius === rad.id;
                return (
                  <button
                    key={rad.id}
                    onClick={() => setForm({
                      ...form,
                      styles: { ...form.styles, cornerRadius: rad.id }
                    })}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-white text-black font-semibold border-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{rad.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>
      )}

      {/* TAB 4: PROJECTS & LIVE WEBSITES */}
      {activeTab === 'projects' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>🌐</span>
              <span>Gestión de Proyectos en Vivo</span>
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Edita los títulos, enlaces reales y descripciones de tus clientes en producción.
            </p>

            <div className="space-y-4">
              {form.customLiveProjects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Nombre del Proyecto</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const newLive = [...form.customLiveProjects];
                          newLive[idx] = { ...newLive[idx], title: e.target.value };
                          setForm({ ...form, customLiveProjects: newLive });
                        }}
                        className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">URL en Vivo</label>
                      <input
                        type="text"
                        value={proj.liveUrl}
                        onChange={(e) => {
                          const newLive = [...form.customLiveProjects];
                          newLive[idx] = { ...newLive[idx], liveUrl: e.target.value };
                          setForm({ ...form, customLiveProjects: newLive });
                        }}
                        className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Subtítulo / Tagline</label>
                    <input
                      type="text"
                      value={proj.tagline}
                      onChange={(e) => {
                        const newLive = [...form.customLiveProjects];
                        newLive[idx] = { ...newLive[idx], tagline: e.target.value };
                        setForm({ ...form, customLiveProjects: newLive });
                      }}
                      className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Descripción</label>
                    <textarea
                      rows="2"
                      value={proj.description}
                      onChange={(e) => {
                        const newLive = [...form.customLiveProjects];
                        newLive[idx] = { ...newLive[idx], description: e.target.value };
                        setForm({ ...form, customLiveProjects: newLive });
                      }}
                      className="w-full bg-black/60 border border-white/15 rounded-lg p-2.5 text-white resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}
