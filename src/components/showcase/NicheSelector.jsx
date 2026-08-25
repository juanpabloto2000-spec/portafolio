import React from 'react';
import { motion } from 'framer-motion';
import { NICHE_CATEGORIES } from '../../data/projects';

export default function NicheSelector({ activeNiche, onSelectNiche, layout = 'vertical' }) {
  const isVertical = layout === 'vertical';

  // Desktop Vertical Navigation Dock
  if (isVertical) {
    return (
      <div className="w-full space-y-1.5 p-2 rounded-2xl bg-[#0a0a0d]/90 border border-white/10 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <div className="px-3 py-2 text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold border-b border-white/5 mb-1 flex items-center justify-between">
          <span>Explorar Nichos</span>
          <span className="text-zinc-400">⚡</span>
        </div>

        {NICHE_CATEGORIES.map((category) => {
          const isActive = activeNiche === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectNiche(category.id)}
              className={`relative w-full px-3.5 py-3 rounded-xl text-xs font-medium text-left transition-all flex items-center justify-between group select-none ${
                isActive 
                  ? 'text-black font-semibold' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeVerticalNichePill"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
              <span className={`relative z-10 text-[10px] transition-transform group-hover:translate-x-0.5 ${
                isActive ? 'text-black font-bold' : 'text-zinc-600 group-hover:text-zinc-300'
              }`}>
                →
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Mobile Horizontal Swipeable Bar
  return (
    <div className="w-full flex items-center justify-start sm:justify-center py-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0a0a0d]/90 border border-white/10 backdrop-blur-2xl shadow-lg whitespace-nowrap">
        {NICHE_CATEGORIES.map((category) => {
          const isActive = activeNiche === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectNiche(category.id)}
              className={`relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors select-none ${
                isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeHorizontalNichePill"
                  className="absolute inset-0 bg-white rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
