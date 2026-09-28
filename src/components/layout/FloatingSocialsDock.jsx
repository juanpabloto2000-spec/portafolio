import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';

// Iconos vectoriales de autor oficiales
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function FloatingSocialsDock() {
  const [isOpen, setIsOpen] = useState(false);

  const socialItems = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Oficial',
      url: 'https://wa.me/573122952165?text=Hola%20Juan%20Pablo%2C%20vengo%20de%20la%20web%20de%20Dynamind%20Studios%20y%20quiero%20conocer%20m%C3%A1s%20sobre%20sus%20sistemas.',
      icon: WhatsAppIcon,
      hoverClass: 'hover:bg-[#25D366] hover:text-black hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.6)]'
    },
    {
      id: 'instagram',
      name: 'Instagram Oficial',
      url: 'https://www.instagram.com/dynamind.studios/',
      icon: InstagramIcon,
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(221,42,123,0.6)]'
    },
    {
      id: 'tiktok',
      name: 'TikTok Oficial',
      url: 'https://www.tiktok.com/@dynamind.studios',
      icon: TikTokIcon,
      hoverClass: 'hover:bg-black hover:text-[#00F2FE] hover:border-[#00F2FE] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)]'
    }
  ];

  return (
    <div 
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none no-print"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Burbujas Flotantes Desplegables con Física Spring */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col-reverse items-center gap-2.5 mb-3 pl-1">
            {socialItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.6 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 450, 
                    damping: 24, 
                    delay: index * 0.04 
                  }}
                  className="relative group flex items-center justify-center"
                >
                  {/* Tooltip lateral */}
                  <span className="absolute left-14 px-3 py-1 rounded-xl bg-black/95 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/20 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.name}
                  </span>

                  {/* Botón Circular: Reposo Negro Obsidiana -> Color de Marca al Hover */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer bg-[#090b14] text-zinc-300 border border-white/15 shadow-xl ${item.hoverClass}`}
                  >
                    <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Botón Gatillo Principal: Negro Obsidiana con Transición Sutil */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#090b14] border border-white/20 text-zinc-300 hover:text-white hover:border-cyan-400/60 hover:shadow-[0_0_22px_rgba(34,211,238,0.35)] backdrop-blur-xl flex items-center justify-center shadow-2xl cursor-pointer group focus:outline-none transition-all duration-300"
        aria-label="Abrir canales sociales"
      >
        <Share2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:text-cyan-400" />
      </motion.button>
    </div>
  );
}
