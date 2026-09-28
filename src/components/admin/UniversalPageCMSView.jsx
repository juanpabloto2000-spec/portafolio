import React, { useState } from 'react';
import { 
  Palette, Save, Check, RefreshCw, Layers, Eye, 
  Globe, Phone, Sparkles, Image, Megaphone, FileText 
} from 'lucide-react';

const DEFAULT_PAGES_CMS = {
  inicio: {
    name: 'Página de Inicio (Home)',
    hash: '#/',
    heroTitle: 'Estudio de Ingeniería de Software para Negocios Reales',
    heroSubtitle: 'Diseñamos y programamos software propietario, motores de reserva atómicos, KDS para cocina y cajas con arqueo ciego que erradican las comisiones abusivas y el caos operativo.',
    ctaText: 'Iniciar Diagnóstico (45s)',
    whatsappNumber: '+57 300 000 0000',
    announcementBanner: '⚡ NUEVA SUITE 2026: 17 SISTEMAS PROPIETARIOS CON IA DESPLEGADOS',
    bannerActive: true,
    coverImage: '/proyectos/quimbayas.png'
  },
  obras: {
    name: 'Obras y Portafolio Real',
    hash: '#/obras',
    heroTitle: 'Obras de Ingeniería en Producción Real',
    heroSubtitle: 'Casos de éxito reales operando en Colombia. Plataformas vivas que sustituyeron hojas de cálculo, comandas de papel y plataformas que cobraban el 20% de comisión.',
    ctaText: 'Ver Demostraciones en Vivo',
    whatsappNumber: '+57 300 000 0000',
    announcementBanner: 'CASOS AUDITADOS CON COMPROBANTES Y FACTURACIÓN EN TIEMPO REAL',
    bannerActive: true,
    coverImage: '/proyectos/lorena.png'
  },
  sistemas: {
    name: 'Sistemas de Software & Automatizaciones',
    hash: '#/sistemas',
    heroTitle: 'Sistemas de Software & Automatizaciones Reales',
    heroSubtitle: '17 sistemas propietarios gobernados por código nativo y diseñados para erradicar cada cuello de botella operativo, comercial y administrativo de tu negocio.',
    ctaText: 'Solicitar Demo de un Sistema',
    whatsappNumber: '+57 300 000 0000',
    announcementBanner: 'CERO DEPENDENCIAS DE CALENDLY NI WORDPRESS INFLADO',
    bannerActive: true,
    coverImage: '/proyectos/kall.png'
  },
  vision: {
    name: 'Visión & Filosofía Empresarial',
    hash: '#/vision',
    heroTitle: 'Visión, Soberanía Tecnológica & Filosofía',
    heroSubtitle: 'Por qué no somos una agencia de marketing tradicional y cómo construimos activos de software propios que te pertenecen de por vida.',
    ctaText: 'Conocer Nuestra Metodología',
    whatsappNumber: '+57 300 000 0000',
    announcementBanner: 'PACTO DE BENEFICIO MUTUO Y CERO AGREGADORES ABUSIVOS',
    bannerActive: false,
    coverImage: '/proyectos/imperium.png'
  },
  diagnostico: {
    name: 'Diagnóstico & Triaje de 45s',
    hash: '#/diagnostico',
    heroTitle: 'Diagnóstico de Ingeniería & Cuellos de Botella',
    heroSubtitle: 'Evalúa tu fricción operativa en 45 segundos. Si tienes página web, nuestro escáner en tiempo real detectará tus fugas de conversión antes de agendar.',
    ctaText: 'Evaluar Mi Negocio Ahora',
    whatsappNumber: '+57 300 000 0000',
    announcementBanner: 'AGENDA 1 A 1 DIRECTAMENTE CON JUAN PABLO (CERO VENDEDORES)',
    bannerActive: true,
    coverImage: '/logo sin fondo.png'
  }
};

export default function UniversalPageCMSView() {
  const [activePageKey, setActivePageKey] = useState('inicio');
  const [cmsData, setCmsData] = useState(() => {
    const saved = localStorage.getItem('dynamind_universal_cms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PAGES_CMS;
      }
    }
    return DEFAULT_PAGES_CMS;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentPage = cmsData[activePageKey] || DEFAULT_PAGES_CMS[activePageKey];

  const handleFieldChange = (field, value) => {
    setCmsData(prev => ({
      ...prev,
      [activePageKey]: {
        ...prev[activePageKey],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('dynamind_universal_cms', JSON.stringify(cmsData));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetCurrent = () => {
    if (confirm(`¿Restablecer los contenidos de "${currentPage.name}" a los valores predeterminados?`)) {
      setCmsData(prev => ({
        ...prev,
        [activePageKey]: DEFAULT_PAGES_CMS[activePageKey]
      }));
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
            Personalización Universal de Páginas y Banners
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Modifica titulares, WhatsApp oficial, banners de anuncio y subtítulos de cada página sin alterar código fuente.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              <Check className="w-3.5 h-3.5" />
              <span>¡Cambios Guardados en LocalStorage!</span>
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-lg transition-colors cursor-pointer shadow-monolith"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar en Caliente</span>
          </button>
        </div>
      </div>

      {/* Selector de las 5 Páginas */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {Object.entries(DEFAULT_PAGES_CMS).map(([key, page]) => {
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

      {/* Editor y Vista Previa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulario de Edición (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Textos Maestros de: {currentPage.name}</span>
              </span>
              <button
                onClick={handleResetCurrent}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Valores por defecto</span>
              </button>
            </div>

            {/* Titular Hero H1 */}
            <div className="space-y-1.5 text-xs">
              <label className="text-zinc-300 font-bold uppercase block">Titular Principal (H1):</label>
              <input
                type="text"
                value={currentPage.heroTitle}
                onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
              />
            </div>

            {/* Subtítulo Hero */}
            <div className="space-y-1.5 text-xs">
              <label className="text-zinc-300 font-bold uppercase block">Bajada de Valor / Subtítulo:</label>
              <textarea
                rows={3}
                value={currentPage.heroSubtitle}
                onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-zinc-200 focus:outline-none focus:border-cyan-400 text-xs font-sans leading-relaxed resize-none"
              />
            </div>

            {/* CTA y WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Texto del Botón CTA:</label>
                <input
                  type="text"
                  value={currentPage.ctaText}
                  onChange={(e) => handleFieldChange('ctaText', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp de la Página:</span>
                </label>
                <input
                  type="text"
                  value={currentPage.whatsappNumber}
                  onChange={(e) => handleFieldChange('whatsappNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>
            </div>

            {/* Banner de Anuncio Superior */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Banner de Alerta Superior</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={currentPage.bannerActive}
                    onChange={(e) => handleFieldChange('bannerActive', e.target.checked)}
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
                value={currentPage.announcementBanner}
                onChange={(e) => handleFieldChange('announcementBanner', e.target.value)}
                placeholder="Texto del banner de anuncio..."
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs disabled:opacity-30"
              />
            </div>

          </div>
        </div>

        {/* Vista Previa en Vivo (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Previsualización Táctica</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">{currentPage.hash}</span>
            </div>

            {/* Renderizado de Preview */}
            <div className="border border-white/15 rounded-xl bg-black/90 p-5 space-y-4 overflow-hidden relative">
              
              {/* Banner si está activo */}
              {currentPage.bannerActive && (
                <div className="p-2 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/30 rounded-lg text-center text-[10px] text-cyan-300 font-bold uppercase truncate animate-pulse">
                  {currentPage.announcementBanner}
                </div>
              )}

              {/* Titular */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  ESTUDIO DE INGENIERÍA
                </span>
                <h3 className="font-display font-bold text-lg text-white leading-tight">
                  {currentPage.heroTitle}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {currentPage.heroSubtitle}
                </p>
              </div>

              {/* Botón CTA y WhatsApp */}
              <div className="pt-2 flex items-center gap-2">
                <div className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded-lg shadow-sm">
                  {currentPage.ctaText}
                </div>
                <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg flex items-center gap-1.5 font-mono">
                  <Phone className="w-3 h-3" />
                  <span className="text-[10px]">{currentPage.whatsappNumber}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                <span>Viewport: Responsive 100%</span>
                <span className="text-emerald-400">● 60 FPS Activo</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
