import React, { useState } from 'react';
import { useCMS, DEFAULT_UNIVERSAL_CMS } from '../../context/CMSContext';
import { 
  Palette, Save, Check, RefreshCw, Layers, Eye, 
  Globe, Phone, Sparkles, Image, Megaphone, FileText,
  Share2, Bot, Sliders, ToggleLeft, ToggleRight, Radio
} from 'lucide-react';

export default function UniversalPageCMSView() {
  const { cms, updateCMS } = useCMS();
  const [activeTab, setActiveTab] = useState('pages'); // 'pages' | 'scrolly' | 'social' | 'chatbot'
  const [activePageKey, setActivePageKey] = useState('inicio');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Estados locales para edición fluida
  const [formData, setFormData] = useState(cms);

  // Sincronizar si cambia el contexto externamente
  React.useEffect(() => {
    setFormData(cms);
  }, [cms]);

  const currentPage = formData.pages?.[activePageKey] || DEFAULT_UNIVERSAL_CMS.pages[activePageKey];

  const handlePageFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [activePageKey]: {
          ...prev.pages[activePageKey],
          [field]: value
        }
      }
    }));
  };

  const handleScrollyFieldChange = (phaseKey, field, value) => {
    setFormData(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        inicio: {
          ...prev.pages.inicio,
          scrolly: {
            ...prev.pages.inicio.scrolly,
            [`${phaseKey}_${field}`]: value
          }
        }
      }
    }));
  };

  const handleSocialChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value
      }
    }));
  };

  const handleChatbotChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      chatbot: {
        ...prev.chatbot,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    updateCMS(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('¿Restablecer todas las configuraciones del CMS a los valores predeterminados de fábrica?')) {
      setFormData(DEFAULT_UNIVERSAL_CMS);
      updateCMS(DEFAULT_UNIVERSAL_CMS);
    }
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>CMS UNIVERSAL // GESTOR DE CONTENIDOS EN CALIENTE</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Personalización Total de Páginas, Redes y Chatbot
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Modifica titulares, textos de scrollytelling, enlaces sociales y visibilidad de AURA sin tocar código.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>¡Cambios Publicados en Vivo!</span>
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-xl transition-all cursor-pointer shadow-monolith"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publicar Cambios</span>
          </button>
        </div>
      </div>

      {/* Navegación de Secciones del CMS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'pages'
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
              : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Páginas & Heroes</span>
        </button>

        <button
          onClick={() => setActiveTab('scrolly')}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'scrolly'
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
              : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Scrollytelling (4 Fases)</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'social'
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
              : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Redes & Canales</span>
        </button>

        <button
          onClick={() => setActiveTab('chatbot')}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'chatbot'
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
              : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Chatbot AURA (ON/OFF)</span>
        </button>

        <button
          onClick={handleReset}
          className="ml-auto text-[11px] text-zinc-500 hover:text-zinc-300 underline flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Restablecer todo</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: PÁGINAS & HEROES                                               */}
      {/* ========================================================================= */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          {/* Selector de Páginas */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.entries(DEFAULT_UNIVERSAL_CMS.pages).map(([key, page]) => {
              const isSelected = activePageKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePageKey(key)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 text-cyan-300 border-cyan-400 font-bold shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                      : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">{page.hash}</div>
                  <div className="text-xs font-bold truncate mt-0.5">{page.name.split('(')[0]}</div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Formulario */}
            <div className="lg:col-span-7 p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-white uppercase">
                  Textos Maestros de: {currentPage.name}
                </span>
              </div>

              {/* Badge Superior */}
              <div className="space-y-1.5 text-xs">
                <label className="text-zinc-300 font-bold uppercase block">Badge Superior:</label>
                <input
                  type="text"
                  value={currentPage.heroBadge || ''}
                  onChange={(e) => handlePageFieldChange('heroBadge', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
              </div>

              {/* Titular H1 */}
              <div className="space-y-1.5 text-xs">
                <label className="text-zinc-300 font-bold uppercase block">Titular Principal (H1):</label>
                <input
                  type="text"
                  value={currentPage.heroTitle || ''}
                  onChange={(e) => handlePageFieldChange('heroTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
              </div>

              {/* Subtítulo */}
              <div className="space-y-1.5 text-xs">
                <label className="text-zinc-300 font-bold uppercase block">Subtítulo / Bajada de Valor:</label>
                <textarea
                  rows={3}
                  value={currentPage.heroSubtitle || ''}
                  onChange={(e) => handlePageFieldChange('heroSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-zinc-200 focus:outline-none focus:border-cyan-400 text-xs font-sans leading-relaxed resize-none"
                />
              </div>

              {/* CTA y WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold uppercase block">Texto Botón CTA:</label>
                  <input
                    type="text"
                    value={currentPage.ctaText || ''}
                    onChange={(e) => handlePageFieldChange('ctaText', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold uppercase block">WhatsApp Asignado:</label>
                  <input
                    type="text"
                    value={currentPage.whatsappNumber || ''}
                    onChange={(e) => handlePageFieldChange('whatsappNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Banner de Alerta */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase flex items-center gap-2">
                    <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Banner Superior de Anuncios</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={currentPage.bannerActive}
                      onChange={(e) => handlePageFieldChange('bannerActive', e.target.checked)}
                      className="accent-cyan-400 w-4 h-4 cursor-pointer"
                    />
                    <span className={currentPage.bannerActive ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                      {currentPage.bannerActive ? 'Activo en Web' : 'Desactivado'}
                    </span>
                  </label>
                </div>

                <input
                  type="text"
                  disabled={!currentPage.bannerActive}
                  value={currentPage.announcementBanner || ''}
                  onChange={(e) => handlePageFieldChange('announcementBanner', e.target.value)}
                  placeholder="Texto del banner de anuncio..."
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs disabled:opacity-30"
                />
              </div>

            </div>

            {/* Previsualización en Vivo */}
            <div className="lg:col-span-5 p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Previsualización Táctica</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">{currentPage.hash}</span>
              </div>

              <div className="border border-white/15 rounded-xl bg-black/90 p-5 space-y-4 overflow-hidden relative">
                {currentPage.bannerActive && (
                  <div className="p-2 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/30 rounded-lg text-center text-[10px] text-cyan-300 font-bold uppercase truncate animate-pulse">
                    {currentPage.announcementBanner}
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                    {currentPage.heroBadge || 'DYNAMIND STUDIOS'}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white leading-tight">
                    {currentPage.heroTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                    {currentPage.heroSubtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <div className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded-lg shadow-sm">
                    {currentPage.ctaText}
                  </div>
                  <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg flex items-center gap-1.5 font-mono">
                    <Phone className="w-3 h-3" />
                    <span className="text-[10px]">{currentPage.whatsappNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: SCROLLYTELLING (4 FASES)                                       */}
      {/* ========================================================================= */}
      {activeTab === 'scrolly' && (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-6">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Textos de las 4 Fases Cinemáticas del Scrollytelling (Home)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {[1, 2, 3, 4].map((num) => {
              const phaseKey = `phase${num}`;
              const titleVal = formData.pages.inicio?.scrolly?.[`${phaseKey}_title`] || '';
              const descVal = formData.pages.inicio?.scrolly?.[`${phaseKey}_desc`] || '';

              return (
                <div key={num} className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-cyan-400 font-bold uppercase text-[11px]">
                    <span>Fase {num}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Título de la Fase:</label>
                    <input
                      type="text"
                      value={titleVal}
                      onChange={(e) => handleScrollyFieldChange(phaseKey, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Descripción:</label>
                    <textarea
                      rows={2}
                      value={descVal}
                      onChange={(e) => handleScrollyFieldChange(phaseKey, 'desc', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-200 font-sans text-xs leading-relaxed focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: REDES SOCIALES & CANALES                                       */}
      {/* ========================================================================= */}
      {activeTab === 'social' && (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-6">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>Configuración Global de Redes Sociales y Toggles de Visibilidad</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Instagram */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">📸 Instagram Oficial</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.social?.show_instagram}
                    onChange={(e) => handleSocialChange('show_instagram', e.target.checked)}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  <span className={formData.social?.show_instagram ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                    {formData.social?.show_instagram ? 'Visible' : 'Oculto'}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={formData.social?.instagram_url || ''}
                onChange={(e) => handleSocialChange('instagram_url', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* LinkedIn */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">💼 LinkedIn Company</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.social?.show_linkedin}
                    onChange={(e) => handleSocialChange('show_linkedin', e.target.checked)}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  <span className={formData.social?.show_linkedin ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                    {formData.social?.show_linkedin ? 'Visible' : 'Oculto'}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={formData.social?.linkedin_url || ''}
                onChange={(e) => handleSocialChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* GitHub */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">🐙 GitHub Repository</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.social?.show_github}
                    onChange={(e) => handleSocialChange('show_github', e.target.checked)}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  <span className={formData.social?.show_github ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                    {formData.social?.show_github ? 'Visible' : 'Oculto'}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={formData.social?.github_url || ''}
                onChange={(e) => handleSocialChange('github_url', e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* YouTube */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">▶️ YouTube Canal</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.social?.show_youtube}
                    onChange={(e) => handleSocialChange('show_youtube', e.target.checked)}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  <span className={formData.social?.show_youtube ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                    {formData.social?.show_youtube ? 'Visible' : 'Oculto'}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={formData.social?.youtube_url || ''}
                onChange={(e) => handleSocialChange('youtube_url', e.target.value)}
                placeholder="https://youtube.com/@..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* WhatsApp Global */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">💬 WhatsApp Oficial</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.social?.show_whatsapp}
                    onChange={(e) => handleSocialChange('show_whatsapp', e.target.checked)}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  <span className={formData.social?.show_whatsapp ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                    {formData.social?.show_whatsapp ? 'Visible' : 'Oculto'}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={formData.social?.whatsapp_number || ''}
                onChange={(e) => handleSocialChange('whatsapp_number', e.target.value)}
                placeholder="+57 300 000 0000"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Email de Contacto */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">✉️ Correo Oficial</span>
              </div>
              <input
                type="email"
                value={formData.social?.email || ''}
                onChange={(e) => handleSocialChange('email', e.target.value)}
                placeholder="dynamindstudios@gmail.com"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 4: CHATBOT AURA MASTER SWITCH                                     */}
      {/* ========================================================================= */}
      {activeTab === 'chatbot' && (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Gobernanza del Chatbot AURA en la Web Pública</span>
            </span>
          </div>

          <div className="p-5 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">Activar Chatbot AURA en Web Pública</div>
              <div className="text-xs text-zinc-400 font-sans mt-0.5">
                Si lo desactivas, el orbe cuántico flotante y el modal interactivo de Aura quedarán completamente ocultos para los visitantes.
              </div>
            </div>

            <button
              onClick={() => handleChatbotChange('enabled', !formData.chatbot?.enabled)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                formData.chatbot?.enabled
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{formData.chatbot?.enabled ? '🟢 CHATBOT ACTIVO' : '🔴 CHATBOT DESACTIVADO'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-bold uppercase block">Mensaje de Saludo Predeterminado de AURA:</label>
              <textarea
                rows={3}
                value={formData.chatbot?.welcomeMessage || ''}
                onChange={(e) => handleChatbotChange('welcomeMessage', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-zinc-200 text-xs font-sans leading-relaxed focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Nombre en la Interfaz:</label>
                <input
                  type="text"
                  value={formData.chatbot?.name || ''}
                  onChange={(e) => handleChatbotChange('name', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Voz Neural Oficial:</label>
                <select
                  value={formData.chatbot?.preferredVoice || 'es-CO-SalomeNeural'}
                  onChange={(e) => handleChatbotChange('preferredVoice', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value="es-CO-SalomeNeural">es-CO-SalomeNeural (Voz Oficial Colombiana)</option>
                  <option value="en-US-AvaNeural">en-US-AvaNeural (Inglés Internacional)</option>
                  <option value="fr-FR-VivienneNeural">fr-FR-VivienneNeural (Francés Ejecutivo)</option>
                  <option value="de-DE-SeraphinaNeural">de-DE-SeraphinaNeural (Alemán Precisión)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
