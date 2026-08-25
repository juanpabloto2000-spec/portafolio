import React, { useState, useEffect } from 'react';
import GrainOverlay from './components/ui/GrainOverlay';
import Preloader from './components/ui/Preloader';
import KineticMarquee from './components/ui/KineticMarquee';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import NicheShowcase from './components/showcase/NicheShowcase';
import SystemsBento from './components/systems/SystemsBento';
import LiveProjectsPage from './components/live/LiveProjectsPage';
import Footer from './components/layout/Footer';
import DemoModal from './components/demos/DemoModal';
import BrandCalendarModal from './components/booking/BrandCalendarModal';
import WhatsAppAgentSim from './components/booking/WhatsAppAgentSim';
import AdminLayout from './components/admin/AdminLayout';
import SecretAdminLogin from './components/admin/SecretAdminLogin';
import { useApp } from './context/AppContext';

export default function App() {
  const { 
    currentView, 
    setCurrentView,
    isBookingModalOpen, 
    setIsBookingModalOpen,
    siteContent,
    auth 
  } = useApp();

  const [activeDemoProject, setActiveDemoProject] = useState(null);
  const [isDsbRoute, setIsDsbRoute] = useState(() => {
    return window.location.hash.startsWith('#/dsb');
  });

  // Listen to hash changes for hidden /#/dsb route
  useEffect(() => {
    const handleHashChange = () => {
      const isDsb = window.location.hash.startsWith('#/dsb');
      setIsDsbRoute(isDsb);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDemo = (project) => {
    setActiveDemoProject(project);
  };

  const handleCloseDemo = () => {
    setActiveDemoProject(null);
  };

  const handleNavigate = (page, hash) => {
    setCurrentView(page === 'live-projects' ? 'live' : 'home');

    if (page === 'home' && hash) {
      setTimeout(() => {
        if (hash === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToDemos = () => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('demos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Dynamic Theme Class Resolver (Negro, Blanco, Gris, Obsidiana Morado Oscuro)
  const currentTheme = siteContent?.styles?.bgTheme || 'pure-black';
  const themeClasses = {
    'pure-black': 'bg-[#000000] text-white selection:bg-white selection:text-black',
    'pure-white': 'bg-[#fafafa] text-zinc-900 selection:bg-black selection:text-white',
    'graphite-gray': 'bg-[#18181b] text-white selection:bg-white selection:text-black',
    'obsidian-purple': 'bg-[#0c0617] text-white selection:bg-purple-400 selection:text-black'
  }[currentTheme] || 'bg-[#000000] text-white selection:bg-white selection:text-black';

  // 1. HIDDEN /#/dsb ROUTE
  if (isDsbRoute) {
    if (!auth.isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#050507] text-white relative">
          <GrainOverlay />
          <SecretAdminLogin />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#050507] text-white selection:bg-white selection:text-black relative">
        <GrainOverlay />
        <AdminLayout />
        {/* Real-time WhatsApp Agent Simulator */}
        <WhatsAppAgentSim />
      </div>
    );
  }

  // 2. PUBLIC PORTFOLIO WEBSITE (Zero admin buttons, 100% clean)
  return (
    <div className={`min-h-screen ${themeClasses} relative overflow-x-clip transition-colors duration-500`}>
      {/* Luxury Cinematic Preloader */}
      <Preloader />

      {/* Background Subtle Noise */}
      <GrainOverlay />

      {/* Floating Navigation Island */}
      <Navbar 
        currentPage={currentView === 'live' ? 'live-projects' : 'home'}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsBookingModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="relative z-10">
        {currentView === 'home' ? (
          <>
            <Hero 
              onOpenContact={() => setIsBookingModalOpen(true)} 
            />

            {/* Kinetic Typography Infinite Ribbon */}
            <KineticMarquee />
            
            <NicheShowcase 
              onOpenDemo={handleOpenDemo} 
            />
            
            <SystemsBento 
              onOpenContact={() => setIsBookingModalOpen(true)} 
            />
          </>
        ) : (
          <LiveProjectsPage 
            onBackToHome={() => handleNavigate('home', 'demos')}
            onOpenContact={() => setIsBookingModalOpen(true)}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenContact={() => setIsBookingModalOpen(true)}
      />

      {/* Interactive Fullscreen Demo Simulator */}
      <DemoModal 
        project={activeDemoProject}
        isOpen={Boolean(activeDemoProject)}
        onClose={handleCloseDemo}
      />

      {/* Branded Custom Calendar Booking Modal */}
      <BrandCalendarModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* WhatsApp Agent Live Interaction Simulator */}
      <WhatsAppAgentSim />
    </div>
  );
}
