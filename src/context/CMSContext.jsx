import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_UNIVERSAL_CMS = {
  // Configuración de Páginas
  pages: {
    inicio: {
      name: 'Página de Inicio (Home)',
      hash: '#/',
      heroBadge: 'ESTUDIO DE INGENIERÍA DE SOFTWARE SOBERANO',
      heroTitle: 'Estudio de Ingeniería de Software para Negocios Reales',
      heroSubtitle: 'Diseñamos y programamos software propietario, motores de reserva atómicos, KDS para cocina y cajas con arqueo ciego que erradican las comisiones abusivas y el caos operativo.',
      ctaText: 'Iniciar Diagnóstico (45s)',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: '⚡ NUEVA SUITE 2026: 17 SISTEMAS PROPIETARIOS CON IA DESPLEGADOS',
      bannerActive: true,
      scrolly: {
        phase1_title: '01. Diagnóstico Clínico en 45 Segundos',
        phase1_desc: 'Identificamos el cuello de botella D0 que está drenando el margen de tu operación.',
        phase2_title: '02. Arquitectura Soberana por Capas',
        phase2_desc: 'Cero WordPress inflado ni plantillas alquiladas. Código nativo de alta ingeniería.',
        phase3_title: '03. Core Operativo & Dashboard Aislado',
        phase3_desc: 'KDS, arqueo ciego, comandas y motores de reserva blindados para control total.',
        phase4_title: '04. Cinemática 60 FPS & Despliegue',
        phase4_desc: 'Experiencias ultra-fluidas que convierten visitantes en reservas y pedidos directos.'
      }
    },
    obras: {
      name: 'Obras y Portafolio Real',
      hash: '#/obras',
      heroBadge: 'CASOS DE ESTUDIO EN PRODUCCIÓN REAL',
      heroTitle: 'Obras de Ingeniería en Producción Real',
      heroSubtitle: 'Casos de éxito reales operando en Colombia. Plataformas vivas que sustituyeron hojas de cálculo, comandas de papel y plataformas que cobraban el 20% de comisión.',
      ctaText: 'Ver Demostraciones en Vivo',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: 'CASOS AUDITADOS CON COMPROBANTES Y FACTURACIÓN EN TIEMPO REAL',
      bannerActive: true
    },
    sistemas: {
      name: 'Sistemas & Automatizaciones',
      hash: '#/sistemas',
      heroBadge: '17 SISTEMAS NATIVOS DISPONIBLES',
      heroTitle: 'Sistemas de Software & Automatizaciones Reales',
      heroSubtitle: '17 sistemas propietarios gobernados por código nativo y diseñados para erradicar cada cuello de botella operativo, comercial y administrativo de tu negocio.',
      ctaText: 'Solicitar Demo de un Sistema',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: 'CERO DEPENDENCIAS DE CALENDLY NI WORDPRESS INFLADO',
      bannerActive: true
    },
    vision: {
      name: 'Visión & Filosofía',
      hash: '#/vision',
      heroBadge: 'FILOSOFÍA EMPRESARIAL Y SOBERANÍA',
      heroTitle: 'Visión, Soberanía Tecnológica & Filosofía',
      heroSubtitle: 'Por qué no somos una agencia de marketing tradicional y cómo construimos activos de software propios que te pertenecen de por vida.',
      ctaText: 'Conocer Nuestra Metodología',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: 'PACTO DE BENEFICIO MUTUO Y CERO AGREGADORES ABUSIVOS',
      bannerActive: false
    },
    diagnostico: {
      name: 'Diagnóstico & Triaje de 45s',
      hash: '#/diagnostico',
      heroBadge: 'TRIAJE AUTOMATIZADO DE PRE-CALIFICACIÓN',
      heroTitle: 'Diagnóstico de Ingeniería & Cuellos de Botella',
      heroSubtitle: 'Evalúa tu fricción operativa en 45 segundos. Si tienes página web, nuestro escáner en tiempo real detectará tus fugas de conversión antes de agendar.',
      ctaText: 'Evaluar Mi Negocio Ahora',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: 'AGENDA 1 A 1 DIRECTAMENTE CON JUAN PABLO (CERO VENDEDORES)',
      bannerActive: true
    }
  },

  // Redes Sociales y Canales de Contacto
  social: {
    instagram_url: 'https://instagram.com/dynamind.studios',
    show_instagram: true,
    linkedin_url: 'https://linkedin.com/company/dynamind-studios',
    show_linkedin: true,
    github_url: 'https://github.com/juanpabloto2000-spec',
    show_github: true,
    youtube_url: 'https://youtube.com/@dynamindstudios',
    show_youtube: false,
    whatsapp_number: '+57 300 000 0000',
    show_whatsapp: true,
    email: 'dynamindstudios@gmail.com'
  },

  // Control Maestro del Chatbot AURA
  chatbot: {
    enabled: true,
    name: 'AURA AI Assistant',
    welcomeMessage: '¡Hola! Soy AURA, tu consultora de ingeniería de software en Dynamind Studios. ¿Cuál es el sector de tu negocio y qué cuello de botella buscas erradicar?',
    preferredVoice: 'es-CO-SalomeNeural',
    allowVoice: true
  }
};

const CMSContext = createContext();

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(() => {
    try {
      const stored = localStorage.getItem('dynamind_universal_cms_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_UNIVERSAL_CMS,
          ...parsed,
          pages: { ...DEFAULT_UNIVERSAL_CMS.pages, ...(parsed.pages || {}) },
          social: { ...DEFAULT_UNIVERSAL_CMS.social, ...(parsed.social || {}) },
          chatbot: { ...DEFAULT_UNIVERSAL_CMS.chatbot, ...(parsed.chatbot || {}) }
        };
      }
    } catch (e) {
      console.warn('Error reading CMS from storage:', e);
    }
    return DEFAULT_UNIVERSAL_CMS;
  });

  // Guardar y disparar evento de sincronización reactiva en tiempo real
  const updateCMS = (updater) => {
    setCms((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem('dynamind_universal_cms_v2', JSON.stringify(next));
        window.dispatchEvent(new CustomEvent('dynamind_cms_synced', { detail: next }));
      } catch (e) {
        console.warn('Error saving CMS:', e);
      }
      return next;
    });
  };

  // Escuchar eventos de sincronización entre pestañas o componentes
  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail) {
        setCms(e.detail);
      }
    };
    window.addEventListener('dynamind_cms_synced', handleSync);
    return () => window.removeEventListener('dynamind_cms_synced', handleSync);
  }, []);

  return (
    <CMSContext.Provider value={{ cms, updateCMS, defaultCMS: DEFAULT_UNIVERSAL_CMS }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    // Fallback defensivo si no está envuelto en el Provider
    return {
      cms: DEFAULT_UNIVERSAL_CMS,
      updateCMS: () => {},
      defaultCMS: DEFAULT_UNIVERSAL_CMS
    };
  }
  return context;
}
