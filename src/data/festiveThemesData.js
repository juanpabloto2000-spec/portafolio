/**
 * FESTIVE THEMES DATA & CANONICAL PALETTES
 * Dynamind Studios - Sistema de Temáticas Festivas y Temporadas
 * 
 * Permite conmutar la atmósfera visual del portal entre la estética
 * soberana predeterminada y festividades especiales (Halloween, etc.)
 * preservando la elegancia, pulcritud técnica y legibilidad a 60 FPS.
 */

export const FESTIVE_THEMES = [
  {
    id: 'default',
    name: 'Modo Cósmico Soberano 🌌',
    tagline: 'Deep Space, Azul Zafiro & Morado Cósmico',
    season: 'Predeterminado / Todo el año',
    iconName: 'Sparkles',
    badgeText: 'INGENIERÍA SOBERANA 2026',
    greeting: '¡Bienvenido a Dynamind Studios!',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    surfaceBg: '#030508',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    textAccent: '#93c5fd',
    ambientEffect: 'none',
    swatches: ['#3b82f6', '#8b5cf6', '#6366f1', '#030508']
  },
  {
    id: 'halloween',
    name: 'Cyber-Gothic Halloween 🎃',
    tagline: 'Calabaza Brûlée, Fuego Fatuo & Violeta Espectral',
    season: 'Temporada de Octubre / Noche de Brujas',
    iconName: 'Ghost',
    badgeText: 'EDICIÓN ESPECIAL HALLOWEEN 🎃',
    greeting: '¡Noche de Brujas & Automatizaciones Soberanas!',
    primaryColor: '#f97316',
    secondaryColor: '#a855f7',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    surfaceBg: '#09060e',
    cardBorder: 'rgba(249, 115, 22, 0.25)',
    textAccent: '#fb923c',
    ambientEffect: 'halloween-fog-bats',
    swatches: ['#f97316', '#a855f7', '#10b981', '#09060e']
  }
];

export const DEFAULT_FESTIVE_CONFIG = {
  themeId: 'default',
  ambientEffectEnabled: true,
  lastUpdated: new Date().toISOString()
};

export const DEFAULT_PROMO_BANNER_CONFIG = {
  active: false,
  badgeText: '20% OFF',
  message: 'Temporada de Automatizaciones: 20% de descuento en el despliegue de Agentes de IA para Cuellos de Botella',
  ctaText: 'Reclamar Diagnóstico',
  ctaLink: '#/diagnostico',
  lastUpdated: new Date().toISOString()
};
