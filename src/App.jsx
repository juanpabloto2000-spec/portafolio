import React, { useState, useEffect } from 'react';
import GrainOverlay from './components/ui/GrainOverlay';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import NicheShowcase from './components/showcase/NicheShowcase';
import SystemsBento from './components/systems/SystemsBento';
import LiveProjectsPage from './components/live/LiveProjectsPage';
import Footer from './components/layout/Footer';
import DemoModal from './components/demos/DemoModal';
import ContactModal from './components/ui/ContactModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'live-projects'
  const [activeDemoProject, setActiveDemoProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenDemo = (project) => {
    setActiveDemoProject(project);
  };

  const handleCloseDemo = () => {
    setActiveDemoProject(null);
  };

  const handleNavigate = (page, hash) => {
    setCurrentPage(page);
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
    setCurrentPage('home');
    setTimeout(() => {
      const el = document.getElementById('demos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Subtle Noise */}
      <GrainOverlay />

      {/* Floating Navigation Island */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* Main Content View Switcher */}
      <main className="relative z-10">
        {currentPage === 'home' ? (
          <>
            <Hero 
              onExploreDemos={handleScrollToDemos}
              onExploreLiveProjects={() => handleNavigate('live-projects')}
              onOpenContact={() => setIsContactOpen(true)} 
            />
            
            <NicheShowcase 
              onOpenDemo={handleOpenDemo} 
            />
            
            <SystemsBento 
              onOpenContact={() => setIsContactOpen(true)} 
            />
          </>
        ) : (
          <LiveProjectsPage 
            onBackToHome={() => handleNavigate('home', 'demos')}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* Interactive Fullscreen Demo Simulator */}
      <DemoModal 
        project={activeDemoProject}
        isOpen={Boolean(activeDemoProject)}
        onClose={handleCloseDemo}
      />

      {/* Contact & Consultation Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
