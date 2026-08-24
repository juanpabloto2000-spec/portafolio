import React from 'react';
import { motion } from 'framer-motion';
import { NICHE_CATEGORIES } from '../../data/projects';

export default function NicheSelector({ activeNiche, onSelectNiche }) {
  return (
    <div className="w-full flex items-center justify-center py-2">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0d0d10] border border-white/10 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar shadow-inner-bezel">
        {NICHE_CATEGORIES.map((category) => {
          const isActive = activeNiche === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectNiche(category.id)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-300 select-none ${
                isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNichePill"
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
