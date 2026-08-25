import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Instagram, Globe, Play, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logoImg from '/logo-transparent.png';

export default function Navbar({ currentPage, onNavigate, onOpenContact }) {
  const { siteContent } = useApp();
  const branding = siteContent?.branding || {};

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page, hash) => {
    setMobileMenuOpen(false);
    onNavigate(page, hash);
  };

  const navItems = [
    {
      id: 'demos',
      label: 'Demos Interactivas',
      icon: Play,
      action: () => handleLinkClick('home', 'demos'),
      isActive: currentPage === 'home',
    },
    {
      id: 'sistemas',
      label: 'Sistemas de Conversión',
      icon: Layers,
      action: () => handleLinkClick('home', 'sistemas'),
      isActive: false,
    },
    {
      id: 'live-projects',
      label: 'Proyectos en Vivo',
      icon: Globe,
      action: () => handleLinkClick('live-projects'),
      isActive: currentPage === 'live-projects',
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <motion.nav 
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl rounded-2xl transition-all duration-500 border flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
            scrolled 
              ? 'bg-[#0a0a0c]/90 border-white/15 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.03)]' 
              : 'bg-[#0d0d10]/70 border-white/10 backdrop-blur-xl shadow-lg'
          }`}
        >
          {/* Logo & Brand Identity (Clean Transparent Logo) */}
          <button 
            onClick={() => handleLinkClick('home', 'top')} 
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={branding.logoUrl || logoImg} 
                alt="Dynamind Studios Logo" 
                className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading-luxury font-bold text-xs tracking-wider text-white group-hover:text-slate-200 transition-colors">
                {branding.studioName || "DYNAMIND"}
              </span>
              <span className="text-[8px] uppercase tracking-super-wide text-zinc-400 font-medium -mt-0.5">
                {branding.studioSubtitle || "STUDIOS"}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-2 select-none ${
                    item.isActive 
                      ? 'text-white bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] font-semibold' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Instagram */}
            <a
              href={branding.instagramUrl || "https://www.instagram.com/dynamind.studios?igsi=emhhenE5bjA4ZzNw"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-colors"
              title="Instagram @dynamind.studios"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            {/* Main CTA */}
            <button
              onClick={onOpenContact}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <span>Agendar Diagnóstico</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden bg-[#0a0a0c]/95 border border-white/15 rounded-2xl p-6 backdrop-blur-3xl shadow-2xl flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`text-sm font-medium text-left py-3 px-3 rounded-xl border transition-colors flex items-center justify-between ${
                      item.isActive 
                        ? 'bg-white/[0.08] border-white/20 text-white font-semibold backdrop-blur-md' 
                        : 'border-white/5 text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <Icon className="w-4 h-4 text-slate-300" />
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2.5 pt-3 border-t border-white/10">
              <a
                href={branding.instagramUrl || "https://www.instagram.com/dynamind.studios?igsi=emhhenE5bjA4ZzNw"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-xs text-zinc-300 hover:text-white"
              >
                <Instagram className="w-4 h-4" />
                <span>@dynamind.studios en Instagram</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 rounded-xl bg-white text-black text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Agendar Diagnóstico</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
