import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

export default function ShaderHeroBackground({ theme = 'pure-black' }) {
  // Luminous high-contrast palette tailored for Dark Luxury brand
  const themeGradients = {
    'pure-black': {
      colors: ["#000000", "#12131a", "#222533", "#45485e", "#d8dce8"],
      wireColors: ["#000000", "#e2e8f0", "#333544"],
      bg: "#000000"
    },
    'pure-white': {
      colors: ["#ffffff", "#e2e8f0", "#cbd5e1", "#94a3b8"],
      wireColors: ["#ffffff", "#64748b", "#cbd5e1"],
      bg: "#ffffff"
    },
    'graphite-gray': {
      colors: ["#101014", "#18181f", "#2c2d3a", "#525468", "#cbd5e1"],
      wireColors: ["#18181f", "#ffffff", "#383a4c"],
      bg: "#101014"
    },
    'obsidian-purple': {
      colors: ["#080410", "#15082b", "#2a0f52", "#5b1d9e", "#d8b4fe"],
      wireColors: ["#0c0617", "#e9d5ff", "#3b176f"],
      bg: "#080410"
    }
  };

  const current = themeGradients[theme] || themeGradients['pure-black'];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* SVG Liquid Glass Refraction Filter */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.003" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.95 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Primary Smooth Liquid Mesh Gradient - High Visibility */}
      <div className="absolute inset-0 w-full h-full opacity-85">
        <MeshGradient
          className="w-full h-full"
          colors={current.colors}
          speed={0.32}
          backgroundColor={current.bg}
        />
      </div>

      {/* Secondary Wireframe Mesh for Cyber/Luxury Dimension */}
      <div className="absolute inset-0 w-full h-full opacity-35">
        <MeshGradient
          className="w-full h-full"
          colors={current.wireColors}
          speed={0.18}
          wireframe={true}
          backgroundColor="transparent"
        />
      </div>

      {/* Gentle Bottom Blend Mask */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050507_95%)] pointer-events-none opacity-70" />
    </div>
  );
}
