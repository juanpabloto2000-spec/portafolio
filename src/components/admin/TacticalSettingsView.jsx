import React, { useState, useEffect } from 'react';
import { 
  Key, Shield, Check, Terminal, ExternalLink, Server, Globe,
  Sparkles, Ghost, Megaphone, Sliders, ToggleLeft, ToggleRight,
  Flame, Tag, ArrowRight, Eye, RefreshCw
} from 'lucide-react';
import { festiveThemeStore } from '../../services/festiveThemeStore';
import { FESTIVE_THEMES } from '../../data/festiveThemesData';

const AUTH_SECRET_SALT = 'dynamind_sovereign_vault_salt_2026_q8';

async function sha256(message) {
  if (!window.crypto || !window.crypto.subtle) return message;
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function TacticalSettingsView({ onLogout }) {
  const [activeSubTab, setActiveSubTab] = useState('themes'); // 'themes' | 'promo' | 'security' | 'servers'
  
  // 1. Estado de Temáticas Festivas
  const [festiveConfig, setFestiveConfig] = useState(() => festiveThemeStore.getFestiveConfig());
  const [selectedThemeId, setSelectedThemeId] = useState(() => festiveConfig.themeId);
  const [ambientEnabled, setAmbientEnabled] = useState(() => festiveConfig.ambientEffectEnabled);
  const [themeToast, setThemeToast] = useState(null);

  // 2. Estado de Cintillo Promocional
  const [promoConfig, setPromoConfig] = useState(() => festiveThemeStore.getPromoBannerConfig());
  const [promoToast, setPromoToast] = useState(null);

  // 3. Estado de Seguridad & Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const unsubscribe = festiveThemeStore.subscribe(
      (newFestive) => {
        setFestiveConfig(newFestive);
        setSelectedThemeId(newFestive.themeId);
        setAmbientEnabled(newFestive.ambientEffectEnabled);
      },
      (newBanner) => setPromoConfig(newBanner)
    );
    return unsubscribe;
  }, []);

  // Guardar Temática Festiva
  const handleApplyTheme = (themeId, ambient) => {
    const targetId = themeId || selectedThemeId;
    const targetAmbient = ambient !== undefined ? ambient : ambientEnabled;
    const updated = festiveThemeStore.setFestiveTheme(targetId, targetAmbient);
    setFestiveConfig(updated);
    setSelectedThemeId(updated.themeId);
    setAmbientEnabled(updated.ambientEffectEnabled);

    setThemeToast(`¡Temática "${targetId === 'halloween' ? 'Cyber-Gothic Halloween' : 'Modo Cósmico Soberano'}" activada en tiempo real!`);
    setTimeout(() => setThemeToast(null), 3500);
  };

  // Guardar Cintillo Promocional
  const handleSavePromo = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const updated = festiveThemeStore.setPromoBannerConfig(promoConfig);
    setPromoConfig(updated);
    setPromoToast(updated.active ? '¡Aviso promocional fijado publicado en vivo!' : '¡Aviso promocional desactivado de la web!');
    setTimeout(() => setPromoToast(null), 3500);
  };

  // Cambio de Clave Maestra
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const storedHash = localStorage.getItem('dynamind_admin_pass_hash');
    const defaultSalted = await sha256(`PoloNorte121966@:${AUTH_SECRET_SALT}`);
    const activePassHash = storedHash || defaultSalted;
    const currentInputHash = await sha256(`${currentPassword}:${AUTH_SECRET_SALT}`);

    if (currentInputHash !== activePassHash) {
      setFeedback({ 
        success: false, 
        text: 'La contraseña actual ingresada es incorrecta. Permiso denegado por seguridad.' 
      });
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setFeedback({ 
        success: false, 
        text: 'La nueva contraseña debe tener al menos 8 caracteres.' 
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ 
        success: false, 
        text: 'La confirmación de la nueva contraseña no coincide. Verifícala cuidadosamente.' 
      });
      return;
    }

    const newPassHash = await sha256(`${newPassword}:${AUTH_SECRET_SALT}`);

    if (newPassHash === activePassHash) {
      setFeedback({ 
        success: false, 
        text: 'La nueva contraseña no puede ser idéntica a la contraseña actual.' 
      });
      return;
    }

    localStorage.setItem('dynamind_admin_pass_hash', newPassHash);
    localStorage.setItem('dynamind_pass_version', 'v2_custom');
    localStorage.removeItem('dynamind_admin_pass');

    sessionStorage.removeItem('dynamind_auth_ticket');
    sessionStorage.removeItem('dynamind_auth_token');

    setFeedback({ 
      success: true, 
      text: '¡Contraseña actualizada con éxito! Cerrando sesión para validación de seguridad...' 
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      if (onLogout) {
        onLogout();
      } else {
        window.location.reload();
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* Cabecera Principal */}
      <div className="border-b border-white/10 pb-5">
        <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 font-bold">
          <Sliders className="w-3.5 h-3.5" />
          <span>CENTRO DE CONTROL TÁCTICO // CONFIGURACIONES GLOBALES</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Temáticas Festivas, Cintillo Promocional & Seguridad
        </h2>
        <p className="text-xs text-zinc-400 font-sans mt-0.5">
          Gobierna la atmósfera estética del portal, activa ofertas de temporada en vivo y gestiona credenciales maestras.
        </p>
      </div>

      {/* Navegación por Sub-pestañas Tácticas */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubTab('themes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'themes'
              ? 'bg-gradient-to-r from-orange-600/30 to-purple-600/30 text-white border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.25)]'
              : 'bg-white/[0.02] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
          }`}
        >
          <Ghost className="w-3.5 h-3.5 text-orange-400" />
          <span>🎃 Temáticas & Festividades</span>
        </button>

        <button
          onClick={() => setActiveSubTab('promo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'promo'
              ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
              : 'bg-white/[0.02] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>📢 Cintillo Promocional</span>
          {promoConfig.active && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'security'
              ? 'bg-white/10 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              : 'bg-white/[0.02] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-emerald-400" />
          <span>🔐 Seguridad & Claves</span>
        </button>

        <button
          onClick={() => setActiveSubTab('servers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'servers'
              ? 'bg-white/10 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              : 'bg-white/[0.02] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-zinc-300" />
          <span>⚡ Infraestructura & Servidores</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUB-PESTAÑA: TEMÁTICAS FESTIVAS & ÉPOCAS DEL AÑO                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'themes' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <span>Selector de Atmósfera & Festividades de Temporada</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono">
                  ACTIVO: {festiveConfig.themeId.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Cambia la paleta, iluminación y efectos ambientales sin alterar la estructura ni la gracia de la web.
              </p>
            </div>

            {themeToast && (
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{themeToast}</span>
              </span>
            )}
          </div>

          {/* Tarjetas de Selección de Temática */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FESTIVE_THEMES.map((theme) => {
              const isSelected = selectedThemeId === theme.id;
              const isCurrentActive = festiveConfig.themeId === theme.id;
              const isHalloweenCard = theme.id === 'halloween';

              return (
                <div
                  key={theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-5 ${
                    isSelected
                      ? isHalloweenCard
                        ? 'bg-gradient-to-br from-[#12071a] via-[#09060e] to-black border-orange-500/70 shadow-[0_0_30px_rgba(249,115,22,0.25)] scale-[1.01]'
                        : 'bg-gradient-to-br from-[#060b17] via-[#030508] to-black border-cyan-400/70 shadow-[0_0_30px_rgba(56,189,248,0.2)] scale-[1.01]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.035]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                        {theme.season}
                      </span>
                      {isCurrentActive && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          <span>PUBLICADO EN VIVO</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isHalloweenCard 
                          ? 'bg-orange-950/40 border-orange-500/40 text-orange-400' 
                          : 'bg-blue-950/40 border-blue-500/40 text-cyan-400'
                      }`}>
                        {isHalloweenCard ? <Ghost className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {theme.name}
                        </h4>
                        <p className="text-xs text-zinc-400 font-sans">
                          {theme.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Muestras de Color (Swatches) */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] text-zinc-400 uppercase block font-mono">Paleta Cromática PBR:</span>
                      <div className="flex items-center gap-2">
                        {theme.swatches.map((color, idx) => (
                          <div
                            key={idx}
                            style={{ backgroundColor: color }}
                            className="w-7 h-7 rounded-lg border border-white/20 shadow-sm"
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyTheme(theme.id);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCurrentActive
                          ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/40'
                          : isHalloweenCard
                            ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:from-orange-500 hover:to-purple-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isCurrentActive ? 'Re-aplicar Tema' : 'Activar Este Tema'}</span>
                    </button>

                    <span className="text-[10px] text-zinc-400 font-mono">
                      {theme.badgeText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Control Adicional: Interruptor de Efectos Ambientales */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <span>Efectos Ambientales Cinemáticos (Niebla, Fuegos Fatuos & Murciélagos a 60 FPS)</span>
              </span>
              <p className="text-xs text-zinc-400 font-sans">
                Renderiza la capa holográfica de partículas de temporada sobre el fondo estelar. Puedes pausarla en cualquier momento.
              </p>
            </div>

            <button
              onClick={() => {
                const nextVal = !ambientEnabled;
                setAmbientEnabled(nextVal);
                handleApplyTheme(selectedThemeId, nextVal);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                ambientEnabled
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {ambientEnabled ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-zinc-500" />}
              <span>{ambientEnabled ? 'Partículas Activas' : 'Partículas Pausadas'}</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-PESTAÑA: CINTILLO PROMOCIONAL FIJADO (TOP BANNER)                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'promo' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-cyan-400" />
                <span>Gestor de Aviso Promocional Fijado sobre la Navbar</span>
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Fija un cintillo editorial en la cima del index y páginas públicas para anunciar ofertas (10%, 20%, etc.). Si está apagado, retorna null de forma estricta.
              </p>
            </div>

            {promoToast && (
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{promoToast}</span>
              </span>
            )}
          </div>

          {/* Formulario de Configuración del Banner */}
          <form onSubmit={handleSavePromo} className="space-y-6">
            
            {/* Switch Maestro ON/OFF */}
            <div className="p-5 bg-white/[0.025] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <span>Estado de Publicación en la Web Comercial:</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    promoConfig.active 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-700'
                  }`}>
                    {promoConfig.active ? 'ACTIVO (VISIBLE)' : 'INACTIVO (RETORNA NULL)'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Al activarlo, el banner se fijará en la parte superior del viewport y desplazará suavemente la Navbar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPromoConfig(prev => ({ ...prev, active: !prev.active }))}
                className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${
                  promoConfig.active
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {promoConfig.active ? (
                  <>
                    <ToggleRight className="w-6 h-6 text-emerald-400" />
                    <span className="text-xs font-bold uppercase">Encendido</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-6 h-6 text-zinc-500" />
                    <span className="text-xs font-bold uppercase">Apagado</span>
                  </>
                )}
              </button>
            </div>

            {/* Campos de Contenido */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Badge / Porcentaje */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">
                    1. Badge de Oferta (% o Etiqueta):
                  </label>
                  <input
                    type="text"
                    value={promoConfig.badgeText || ''}
                    onChange={(e) => setPromoConfig(prev => ({ ...prev, badgeText: e.target.value }))}
                    placeholder="Ej: 20% OFF, 10% OFF, FLASH"
                    className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
                  />
                </div>

                {/* Texto del Botón CTA */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">
                    2. Texto del Botón CTA:
                  </label>
                  <input
                    type="text"
                    value={promoConfig.ctaText || ''}
                    onChange={(e) => setPromoConfig(prev => ({ ...prev, ctaText: e.target.value }))}
                    placeholder="Ej: Reclamar Diagnóstico"
                    className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
                  />
                </div>

                {/* Enlace Destino */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">
                    3. Enlace Destino:
                  </label>
                  <input
                    type="text"
                    value={promoConfig.ctaLink || ''}
                    onChange={(e) => setPromoConfig(prev => ({ ...prev, ctaLink: e.target.value }))}
                    placeholder="#/diagnostico"
                    className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
                  />
                </div>

              </div>

              {/* Mensaje Editorial Principal */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block">
                  4. Mensaje Principal del Aviso:
                </label>
                <textarea
                  rows={2}
                  value={promoConfig.message || ''}
                  onChange={(e) => setPromoConfig(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Escribe el texto de la promoción..."
                  className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
                />
              </div>

            </div>

            {/* PREVISUALIZACIÓN EN TIEMPO REAL */}
            <div className="space-y-2">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Previsualización en Vivo (Render Exacto sobre la Navbar):</span>
              </div>

              <div className="p-4 bg-black/80 border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  festiveConfig.themeId === 'halloween'
                    ? 'bg-[#12071a] border-orange-500/40 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                    : 'bg-[#060b17] border-cyan-500/40 text-cyan-200 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                }`}>
                  <div className="flex items-center gap-2 truncate mx-auto">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider text-white ${
                      festiveConfig.themeId === 'halloween'
                        ? 'bg-gradient-to-r from-orange-600 to-purple-600'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                    }`}>
                      {promoConfig.badgeText || 'OFERTA'}
                    </span>
                    <span className="font-sans font-medium text-white truncate">
                      {promoConfig.message || 'Sin mensaje configurado'}
                    </span>
                    {promoConfig.ctaText && (
                      <span className={`font-sans font-bold uppercase text-[10px] underline ml-1 cursor-pointer ${
                        festiveConfig.themeId === 'halloween' ? 'text-orange-400' : 'text-cyan-400'
                      }`}>
                        {promoConfig.ctaText} →
                      </span>
                    )}
                  </div>
                  <span className="text-zinc-500 text-xs cursor-pointer">✕</span>
                </div>
              </div>
            </div>

            {/* Botón de Guardar Aviso */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[0_0_25px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Guardar & Publicar Configuración del Aviso</span>
            </button>

          </form>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-PESTAÑA: SEGURIDAD & CLAVES DE ACCESO (HASH SALADO SHA-256)        */}
      {/* ========================================================================= */}
      {activeSubTab === 'security' && (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-6 animate-in fade-in max-w-2xl">
          
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase border-b border-white/10 pb-3">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Actualizar Clave Maestra de Acceso al Búnker</span>
          </div>

          {feedback && (
            <div className={`p-3 text-xs border rounded-xl ${
              feedback.success 
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' 
                : 'bg-red-950/30 border-red-800/50 text-red-300'
            }`}>
              {feedback.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block font-mono">1. Contraseña Actual:</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Ingresa la contraseña actual"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block font-mono">2. Nueva Contraseña (Mínimo 8 caracteres):</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block font-mono">3. Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer rounded-xl"
            >
              Validar y Actualizar Contraseña
            </button>
          </form>

          <p className="text-[10px] text-zinc-400 font-sans">
            Requiere verificación criptográfica previa. Tras actualizar la contraseña, la sesión activa se cerrará automáticamente para exigir re-autenticación.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-PESTAÑA: SERVIDORES & INFRAESTRUCTURA                              */}
      {/* ========================================================================= */}
      {activeSubTab === 'servers' && (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-6 animate-in fade-in max-w-2xl">
          
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase border-b border-white/10 pb-3">
            <Server className="w-4 h-4 text-zinc-400" />
            <span>Infraestructura Conectada & Telemetría</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-black/60 border border-white/10 rounded-xl space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase font-mono">GitHub Repository:</div>
              <div className="text-white font-bold truncate">github.com/juanpabloto2000-spec/portafolio.git</div>
              <div className="text-[10px] text-cyan-400 font-mono">Rama: main (CI/CD Automático)</div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-xl space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase font-mono">Supabase Cloud Central:</div>
              <div className="text-white font-bold truncate">aqwwliwdfnscpzqckywn.supabase.co</div>
              <div className="text-[10px] text-emerald-400 font-mono">Tablas: leads, system_settings, festive_themes</div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-xl space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase font-mono">WhatsApp Operativo:</div>
              <div className="text-white font-bold">+57 300 892 4110</div>
              <div className="text-[10px] text-zinc-400 font-sans">Medellín, Colombia · Cobertura Internacional</div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
