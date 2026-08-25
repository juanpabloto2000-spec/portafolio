import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

export default function ShaderHeroBackground({ theme = 'pure-black' }) {
  // Color palette tailored for Dark Luxury brand
  const themeGradients = {
    'pure-black': {
      colors: ["#000000", "#0c0c0e", "#18181c", "#2c2c34"],
      wireColors: ["#000000", "#cbd5e1", "#1e1e24"],
      bg: "#000000"
    },
    'pure-white': {
      colors: ["#ffffff", "#f1f5f9", "#e2e8f0", "#cbd5e1"],
      wireColors: ["#ffffff", "#94a3b8", "#e2e8f0"],
      bg: "#ffffff"
    },
    'graphite-gray': {
      colors: ["#121215", "#18181b", "#27272a", "#3f3f46"],
      wireColors: ["#18181b", "#e2e8f0", "#27272a"],
      bg: "#18181b"
    },
    'obsidian-purple': {
      colors: ["#08040f", "#120724", "#1e0b3b", "#3b176f"],
      wireColors: ["#0c0617", "#c084fc", "#1e0b3b"],
      bg: "#08040f"
    }
  };

  const current = themeGradients[theme] || themeGradients['pure-black'];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* SVG Liquid Glass Refraction Filter */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.004" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.25" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Primary Smooth Liquid Mesh Gradient */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <MeshGradient
          className="w-full h-full"
          colors={current.colors}
          speed={0.2}
          backgroundColor={current.bg}
        />
      </div>

      {/* Secondary Wireframe Mesh for Subtle Cyber/Luxury Dimension */}
      <div className="absolute inset-0 w-full h-full opacity-20">
        <MeshGradient
          className="w-full h-full"
          colors={current.wireColors}
          speed={0.12}
          wireframe={true}
          backgroundColor="transparent"
        />
      </div>

      {/* Radial Vignette & Depth Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_90%)] pointer-events-none" />
    </div>
  );
}
