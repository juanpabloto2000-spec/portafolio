import React, { useState } from 'react';
import GrainOverlay from './components/ui/GrainOverlay';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import NicheShowcase from './components/showcase/NicheShowcase';
import SystemsBento from './components/systems/SystemsBento';
import LiveProjectsPage from './components/live/LiveProjectsPage';
import Footer from './components/layout/Footer';
import DemoModal from './components/demos/DemoModal';
import BrandCalendarModal from './components/booking/BrandCalendarModal';
import WhatsAppAgentSim from './components/booking/WhatsAppAgentSim';
import AdminAuthModal from './components/admin/AdminAuthModal';
import AdminLayout from './components/admin/AdminLayout';
import { useApp } from './context/AppContext';

export default function App() {
  const { 
    currentView, 
    setCurrentView,
    isBookingModalOpen, 
    setIsBookingModalOpen,
    auth 
  } = useApp();

  const [activeDemoProject, setActiveDemoProject] = useState(null);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  const handleOpenDemo = (project) => {
    setActiveDemoProject(project);
  };

  const handleCloseDemo = () => {
    setActiveDemoProject(null);
  };

  const handleOpenAdmin = () => {
    if (auth.isAuthenticated) {
      setCurrentView('admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleNavigate = (page, hash) => {
    if (page === 'admin') {
      handleOpenAdmin();
      return;
    }

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

  // If Admin View is active and authenticated, show full Admin Shell
  if (currentView === 'admin' && auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black relative">
        <GrainOverlay />
        <AdminLayout />
        {/* Real-time WhatsApp Agent Simulator */}
        <WhatsAppAgentSim />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Subtle Noise */}
      <GrainOverlay />

      {/* Floating Navigation Island */}
      <Navbar 
        currentPage={currentView === 'live' ? 'live-projects' : 'home'}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsBookingModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content View Switcher */}
      <main className="relative z-10">
        {currentView === 'home' ? (
          <>
            <Hero 
              onExploreDemos={handleScrollToDemos}
              onExploreLiveProjects={() => handleNavigate('live-projects')}
              onOpenContact={() => setIsBookingModalOpen(true)} 
            />
            
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
        onOpenAdmin={handleOpenAdmin}
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

      {/* Admin Credentials Login Modal */}
      <AdminAuthModal 
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
      />

      {/* WhatsApp Agent Live Interaction Simulator */}
      <WhatsAppAgentSim />
    </div>
  );
}
