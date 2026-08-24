import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Monitor, RotateCcw, ShieldCheck } from 'lucide-react';
import HostelDemo from './HostelDemo';
import DentalDemo from './DentalDemo';
import AestheticDemo from './AestheticDemo';
import BakeryDemo from './BakeryDemo';
import RestaurantDemo from './RestaurantDemo';

export default function DemoModal({ project, isOpen, onClose }) {
  const [deviceView, setDeviceView] = useState('desktop');
  const [demoKey, setDemoKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const renderDemoContent = () => {
    switch (project.demoType) {
      case 'hostel':
        return <HostelDemo key={demoKey} />;
      case 'dental':
        return <DentalDemo key={demoKey} />;
      case 'aesthetic':
        return <AestheticDemo key={demoKey} />;
      case 'bakery':
        return <BakeryDemo key={demoKey} />;
      case 'restaurant':
        return <RestaurantDemo key={demoKey} />;
      default:
        return <HostelDemo key={demoKey} />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window: Hardware Browser Frame with 16px radius (rounded-2xl) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full rounded-2xl bg-[#0d0d10] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col my-auto transition-all duration-300 ${
            deviceView === 'mobile' ? 'max-w-md' : 'max-w-6xl'
          }`}
          style={{ maxHeight: '92vh' }}
        >
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#070709] select-none">
            
            {/* macOS-style Dots */}
            <div className="flex items-center gap-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                title="Cerrar Demo"
              />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* URL simulation bar */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-zinc-400 max-w-sm w-full mx-4 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-zinc-500">https://</span>
              <span className="text-white font-medium">{project.id}.dynamind.app</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDemoKey(k => k + 1)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Reiniciar Demo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-1 rounded ${deviceView === 'desktop' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                  title="Vista Escritorio"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-1 rounded ${deviceView === 'mobile' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                  title="Vista Móvil"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Demo Content Viewport */}
          <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(92vh-55px)] bg-gradient-to-b from-[#0a0a0d] to-[#050505]">
            {renderDemoContent()}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
