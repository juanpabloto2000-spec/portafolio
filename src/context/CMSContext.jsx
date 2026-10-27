import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_UNIVERSAL_CMS = {
  // Configuración de Páginas
  pages: {
    inicio: {
      name: 'Página de Inicio (Home)',
      hash: '#/',
      heroBadge: 'AUTOMATIZACIONES & AGENTES DE IA SOBERANOS',
      heroTitle: 'Erradicamos Cuellos de Botella con Automatizaciones y Agentes de IA Soberanos.',
      heroSubtitle: 'En Dynamind construimos flujos de automatización de alta velocidad y agentes de IA autónomos 24/7 que resuelven los cuellos de botella de tu negocio — liberando cientos de horas de gestión manual, agilizando tus ventas y asegurando tu facturación con dashboards operativos aislados (Core PMS).',
      ctaText: 'Iniciar Diagnóstico (45s)',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: '⚡ SUITE DE AUTOMATIZACIONES & AGENTES DE IA 24/7 DESPLEGADOS',
      bannerActive: true,
      scrolly: {
        phase1_title: '01. Detección Quirúrgica de Cuellos de Botella',
        phase1_desc: 'El verdadero servicio de Dynamind es erradicar el cuello de botella que frena tu facturación: saturación de mensajes, fugas en agendamientos, fricción en cobros y caos operativo manual.',
        phase2_title: '02. Automatizaciones de Negocio de Alta Velocidad',
        phase2_desc: 'Conectamos tus canales de venta, WhatsApp, CRM y pasarelas de pago con pipelines automatizados que eliminan la intervención humana repetitiva y operan en milisegundos.',
        phase3_title: '03. Agentes de IA Autónomos Entrenados 24/7',
        phase3_desc: 'Desplegamos agentes inteligentes conversacionales y operativos que filtran prospectos, responden objeciones, agendan citas y ejecutan cobros de forma autónoma sin descanso.',
        phase4_title: '04. Soberanía Operativa & Crecimiento Escalable',
        phase4_desc: 'Tu empresa convertida en una maquinaria de alto rendimiento a 60 FPS con dashboards privados (/#/dsb). Cero rentas a plataformas abusivas, 100% control de tus activos de software.'
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
      name: 'La Galaxia de Sistemas (3D)',
      hash: '#/sistemas',
      heroBadge: '',
      heroTitle: 'La Galaxia Tecnológica de Software & Consultoría de IA',
      heroSubtitle: 'Cada planeta de este universo representa un servicio de ingeniería que construimos en Dynamind. Desde sistemas operativos mayores (Core DSB Operativo, PMS Hotelero, Caja con Arqueo Ciego, KDS Comandas) hasta agentes autónomos de alta conversión y blindaje (WhatsApp CRM, OCR Facturas DIAN, n8n, Auditor 24/7). Todo con código propietario entregado en tu propio GitHub sin rentas mensuales.',
      ctaText: 'Iniciar Diagnóstico (45s)',
      whatsappNumber: '+57 300 000 0000',
      announcementBanner: '18 SISTEMAS DE SOFTWARE PROPIETARIO DESPLEGADOS',
      bannerActive: false
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
