import React from 'react';

// Banderas Vectoriales SVG de Alta Fidelidad (Estilo Menú Interactivo de Autor)

export function ColombiaFlag({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rounded-[3px] shadow-sm border border-white/20 shrink-0 ${className}`}>
      <rect width="36" height="13" fill="#FCD116" />
      <rect y="13" width="36" height="6.5" fill="#003893" />
      <rect y="19.5" width="36" height="6.5" fill="#CE1126" />
    </svg>
  );
}

export function USAFlag({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rounded-[3px] shadow-sm border border-white/20 shrink-0 ${className}`}>
      <rect width="36" height="26" fill="#B22234" />
      <path d="M0 4H36M0 8H36M0 12H36M0 16H36M0 20H36M0 24H36" stroke="#FFFFFF" strokeWidth="2" />
      <rect width="16" height="14" fill="#3C3B6E" />
      <circle cx="4" cy="4" r="0.9" fill="#FFFFFF" />
      <circle cx="12" cy="4" r="0.9" fill="#FFFFFF" />
      <circle cx="8" cy="7" r="0.9" fill="#FFFFFF" />
      <circle cx="4" cy="10" r="0.9" fill="#FFFFFF" />
      <circle cx="12" cy="10" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

export function FranceFlag({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rounded-[3px] shadow-sm border border-white/20 shrink-0 ${className}`}>
      <rect width="12" height="26" fill="#002395" />
      <rect x="12" width="12" height="26" fill="#FFFFFF" />
      <rect x="24" width="12" height="26" fill="#ED2939" />
    </svg>
  );
}

export function GermanyFlag({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rounded-[3px] shadow-sm border border-white/20 shrink-0 ${className}`}>
      <rect width="36" height="8.66" fill="#000000" />
      <rect y="8.66" width="36" height="8.66" fill="#DD0000" />
      <rect y="17.33" width="36" height="8.67" fill="#FFCC00" />
    </svg>
  );
}

export function PortugalFlag({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rounded-[3px] shadow-sm border border-white/20 shrink-0 ${className}`}>
      <rect width="14" height="26" fill="#046A38" />
      <rect x="14" width="22" height="26" fill="#DA291C" />
      <circle cx="14" cy="13" r="4.5" fill="#FFC72C" />
      <rect x="12" y="11" width="4" height="4" fill="#DA291C" rx="1" />
    </svg>
  );
}

export function JapanFlag({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rounded-[3px] shadow-sm border border-white/20 shrink-0 ${className}`}>
      <rect width="36" height="26" fill="#FFFFFF" />
      <circle cx="18" cy="13" r="7" fill="#BC002D" />
    </svg>
  );
}

export function getFlagComponent(code, size = 20, className = "") {
  switch (code) {
    case 'es':
      return <ColombiaFlag size={size} className={className} />;
    case 'en':
      return <USAFlag size={size} className={className} />;
    case 'fr':
      return <FranceFlag size={size} className={className} />;
    case 'de':
      return <GermanyFlag size={size} className={className} />;
    case 'pt':
      return <PortugalFlag size={size} className={className} />;
    case 'ja':
      return <JapanFlag size={size} className={className} />;
    default:
      return <ColombiaFlag size={size} className={className} />;
  }
}
