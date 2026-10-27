/**
 * FESTIVE THEME & PROMO BANNER REACTIVE STORE
 * Dynamind Studios - Sincronización en tiempo real Zero-Reload
 * 
 * Gestiona la temática activa (Default vs Halloween) y el aviso
 * promocional fijado superior con persistencia Local-First y
 * sincronización entre pestañas y ventanas sin recarga F5.
 */

import { FESTIVE_THEMES, DEFAULT_FESTIVE_CONFIG, DEFAULT_PROMO_BANNER_CONFIG } from '../data/festiveThemesData.js';

const STORAGE_KEYS = {
  FESTIVE_CONFIG: 'dynamind_festive_theme_config_v1',
  PROMO_BANNER: 'dynamind_promo_banner_config_v1'
};

const SYNC_CHANNEL_NAME = 'dynamind_theme_sync_channel';

// Instancia singleton de BroadcastChannel con soporte defensivo
let syncChannel = null;
try {
  if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  }
} catch (err) {
  console.warn('[FestiveThemeStore] BroadcastChannel no disponible:', err);
}

export const festiveThemeStore = {
  /**
   * Obtiene la lista de temáticas disponibles
   */
  getAvailableThemes: () => FESTIVE_THEMES,

  /**
   * Obtiene la configuración de temática festiva activa
   */
  getFestiveConfig: () => {
    try {
      if (typeof window === 'undefined') return DEFAULT_FESTIVE_CONFIG;
      const stored = localStorage.getItem(STORAGE_KEYS.FESTIVE_CONFIG);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_FESTIVE_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('[FestiveThemeStore] Error leyendo festive config:', e);
    }
    return DEFAULT_FESTIVE_CONFIG;
  },

  /**
   * Obtiene el objeto de datos de la temática activa actual
   */
  getActiveThemeData: () => {
    const config = festiveThemeStore.getFestiveConfig();
    const found = FESTIVE_THEMES.find(t => t.id === config.themeId);
    return found || FESTIVE_THEMES[0];
  },

  /**
   * Guarda y activa una nueva temática festiva
   */
  setFestiveTheme: (themeId, ambientEffectEnabled = true) => {
    try {
      const newConfig = {
        themeId: themeId || 'default',
        ambientEffectEnabled: ambientEffectEnabled ?? true,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEYS.FESTIVE_CONFIG, JSON.stringify(newConfig));

      // Aplicar data-attribute al documento para variables CSS
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-festive-theme', newConfig.themeId);
      }

      // 1. Notificar en ventana local
      window.dispatchEvent(new CustomEvent('dynamind_festive_update', { detail: newConfig }));

      // 2. Notificar cross-tab a otras pestañas
      if (syncChannel) {
        syncChannel.postMessage({
          type: 'FESTIVE_THEME_CHANGED',
          payload: newConfig
        });
      }

      return newConfig;
    } catch (e) {
      console.error('[FestiveThemeStore] Error guardando festive theme:', e);
      return DEFAULT_FESTIVE_CONFIG;
    }
  },

  /**
   * Alterna los efectos ambientales de temporada
   */
  toggleAmbientEffect: () => {
    const current = festiveThemeStore.getFestiveConfig();
    return festiveThemeStore.setFestiveTheme(current.themeId, !current.ambientEffectEnabled);
  },

  /**
   * Obtiene la configuración del cintillo promocional fijado
   */
  getPromoBannerConfig: () => {
    try {
      if (typeof window === 'undefined') return DEFAULT_PROMO_BANNER_CONFIG;
      const stored = localStorage.getItem(STORAGE_KEYS.PROMO_BANNER);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PROMO_BANNER_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('[FestiveThemeStore] Error leyendo promo banner config:', e);
    }
    return DEFAULT_PROMO_BANNER_CONFIG;
  },

  /**
   * Guarda y propaga la configuración del cintillo promocional fijado
   */
  setPromoBannerConfig: (configUpdate) => {
    try {
      const prev = festiveThemeStore.getPromoBannerConfig();
      const next = {
        ...prev,
        ...configUpdate,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEYS.PROMO_BANNER, JSON.stringify(next));

      // 1. Notificar en ventana local
      window.dispatchEvent(new CustomEvent('dynamind_promo_banner_update', { detail: next }));

      // 2. Notificar cross-tab a otras pestañas
      if (syncChannel) {
        syncChannel.postMessage({
          type: 'PROMO_BANNER_CHANGED',
          payload: next
        });
      }

      return next;
    } catch (e) {
      console.error('[FestiveThemeStore] Error guardando promo banner:', e);
      return DEFAULT_PROMO_BANNER_CONFIG;
    }
  },

  /**
   * Suscribe a cambios reactivos (tanto en la ventana local como cross-tab)
   */
  subscribe: (onFestiveChange, onBannerChange) => {
    const handleFestiveLocal = (e) => {
      if (onFestiveChange && e?.detail) onFestiveChange(e.detail);
    };

    const handleBannerLocal = (e) => {
      if (onBannerChange && e?.detail) onBannerChange(e.detail);
    };

    const handleCrossTab = (msg) => {
      if (msg?.data?.type === 'FESTIVE_THEME_CHANGED' && onFestiveChange) {
        onFestiveChange(msg.data.payload);
      }
      if (msg?.data?.type === 'PROMO_BANNER_CHANGED' && onBannerChange) {
        onBannerChange(msg.data.payload);
      }
    };

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEYS.FESTIVE_CONFIG && onFestiveChange) {
        onFestiveChange(festiveThemeStore.getFestiveConfig());
      }
      if (e.key === STORAGE_KEYS.PROMO_BANNER && onBannerChange) {
        onBannerChange(festiveThemeStore.getPromoBannerConfig());
      }
    };

    window.addEventListener('dynamind_festive_update', handleFestiveLocal);
    window.addEventListener('dynamind_promo_banner_update', handleBannerLocal);
    window.addEventListener('storage', handleStorage);
    if (syncChannel) {
      syncChannel.addEventListener('message', handleCrossTab);
    }

    return () => {
      window.removeEventListener('dynamind_festive_update', handleFestiveLocal);
      window.removeEventListener('dynamind_promo_banner_update', handleBannerLocal);
      window.removeEventListener('storage', handleStorage);
      if (syncChannel) {
        syncChannel.removeEventListener('message', handleCrossTab);
      }
    };
  }
};
