import { PROJECTS_DATA } from './projects';
import { LIVE_PROJECTS } from './liveProjects';

export const DEFAULT_SITE_CONTENT = {
  branding: {
    logoUrl: '/logo-transparent.png',
    studioName: 'DYNAMIND',
    studioSubtitle: 'STUDIOS',
    instagramUrl: 'https://www.instagram.com/dynamind.studios?igsi=emhhenE5bjA4ZzNw'
  },
  hero: {
    badgeText: 'Estudio de Ingeniería Web & Sistemas de Conversión',
    title: 'Experiencias web que convierten y resuelven cuellos de botella.',
    highlightWord: 'convierten',
    description: 'Desarrollamos plataformas a medida y menús interactivos con sistemas autónomos de agendamiento, validación de depósitos para reservas y flujos comerciales sin fricción.',
    ctaDemos: 'Explorar Demos Interactivas',
    ctaLive: 'Ver Proyectos en Vivo',
    ctaContact: 'Agendar Diagnóstico',
    pillars: [
      {
        title: 'Agendamiento Autónomo',
        description: 'Disponibilidad en tiempo real sin cadenas de chat manuales.'
      },
      {
        title: 'Validación de Depósitos',
        description: 'Elimina ausencias imprevistas y asegura turnos con anticipo.'
      },
      {
        title: 'Menús Táctiles',
        description: 'Mayor retención visual y aumento del ticket promedio.'
      }
    ]
  },
  demosSection: {
    title: 'Demos Interactivas por Nicho',
    highlightWord: 'Interactivas',
    description: 'Prueba en tiempo real cómo funcionan nuestros sistemas de reserva, agendamiento con depósitos y cartas táctiles antes de implementarlos en tu marca.'
  },
  systemsSection: {
    title: 'Eliminamos los Cuellos de Botella de tu Negocio',
    highlightWord: 'Negocio',
    description: 'En Dynamind Studios diseñamos sistemas operativos de venta y atención que trabajan 24/7 para tu marca.'
  },
  footer: {
    headline: '¿Listo para digitalizar tu negocio con arquitectura de alta conversión?',
    description: 'Diseñamos experiencias digitales sin fricciones operativas. Agendamientos automáticos, validación de pagos y cartas interactivas.'
  },
  styles: {
    bgTheme: 'pure-black', // 'pure-black' (#000000) | 'pure-white' (#ffffff) | 'graphite-gray' (#1a1a1f) | 'obsidian-purple' (#0c0617)
    accentColor: 'platinum', // 'platinum' | 'silver' | 'emerald' | 'gold' | 'purple'
    cornerRadius: 'rounded-2xl' // 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl'
  },
  customProjects: PROJECTS_DATA,
  customLiveProjects: LIVE_PROJECTS
};
