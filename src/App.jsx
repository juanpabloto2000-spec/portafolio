import React, { useState, useEffect, useRef, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext';
import GalaxyAmbientBackground from './components/ui/GalaxyAmbientBackground';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import FloatingSocialsDock from './components/layout/FloatingSocialsDock';
import FloatingAIOrb from './components/layout/FloatingAIOrb';
import WelcomeGalaxyPreloader from './components/ui/WelcomeGalaxyPreloader';
import CosmicPageFallback from './components/ui/CosmicPageFallback';

// ⚡ Code-Splitting Dinámico: Rutas pesadas cargadas bajo demanda con edge caching
const WorksPage = React.lazy(() => import('./pages/WorksPage'));
import SystemsPage from './pages/SystemsPage';
const TriagePage = React.lazy(() => import('./pages/TriagePage'));
const VisionPage = React.lazy(() => import('./pages/VisionPage'));
const PrivacyTermsPage = React.lazy(() => import('./pages/PrivacyTermsPage'));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));
const AdminAuthGuard = React.lazy(() => import('./components/admin/AdminAuthGuard'));
const PublicDashboardDemo = React.lazy(() => import('./pages/PublicDashboardDemo'));

const getPageIndex = (hash) => {
  if (hash.startsWith('#/dashboard')) return 6;
  if (hash.startsWith('#/privacidad') || hash.startsWith('#/terminos') || hash.startsWith('#/cookies')) return 5;
  if (hash.startsWith('#/diagnostico')) return 4;
  if (hash.startsWith('#/sistemas')) return 3;
  if (hash.startsWith('#/obras')) return 2;
  if (hash.startsWith('#/vision')) return 1;
  return 0; // Home y anclas internas
};

const getPageKey = (hash) => {
  if (hash.startsWith('#/dashboard')) return 'dashboard';
  if (hash.startsWith('#/privacidad') || hash.startsWith('#/terminos') || hash.startsWith('#/cookies')) return 'privacidad';
  if (hash.startsWith('#/diagnostico')) return 'diagnostico';
  if (hash.startsWith('#/sistemas')) return 'sistemas';
  if (hash.startsWith('#/obras')) return 'obras';
  if (hash.startsWith('#/vision')) return 'vision';
  return 'home';
};

export default function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#/');
  const prevIndexRef = useRef(getPageIndex(window.location.hash || '#/'));
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      const newIndex = getPageIndex(newHash);
      const prevIndex = prevIndexRef.current;

      if (newIndex !== prevIndex) {
        setDirection(newIndex > prevIndex ? 1 : -1);
        prevIndexRef.current = newIndex;
      }

      setCurrentHash(newHash);
      
      // Desplazamiento limpio al inicio de la página salvo anclas internas (instantáneo para cero lag en eventos)
      if (!newHash.includes('#comparativa') && !newHash.includes('#filosofia')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 1. Ruta Administrativa Aislada (DSB) con Atmósfera Galáctica Cósmica
  if (currentHash.startsWith('#/dsb') || currentHash.startsWith('#/admin')) {
    return (
      <ThemeLanguageProvider>
        <div className="min-h-screen bg-transparent text-slate-100 overflow-x-hidden relative selection:bg-white/20">
          <GalaxyAmbientBackground />
          <div className="relative z-10">
            <Suspense fallback={<CosmicPageFallback message="INICIALIZANDO BÚNKER ADMINISTRATIVO..." />}>
              <AdminAuthGuard>
                <AdminDashboard />
              </AdminAuthGuard>
            </Suspense>
          </div>
        </div>
      </ThemeLanguageProvider>
    );
  }

  // 2. Ruta de Demostración Pública del Dashboard (Sin login, interactiva, retorno a /#/obras)
  if (currentHash.startsWith('#/dashboard')) {
    return (
      <ThemeLanguageProvider>
        <div className="min-h-screen bg-transparent text-slate-100 overflow-x-hidden relative selection:bg-white/20">
          <GalaxyAmbientBackground />
          <div className="relative z-10">
            <Suspense fallback={<CosmicPageFallback message="INICIALIZANDO DEMO DEL CORE DSB..." />}>
              <PublicDashboardDemo />
            </Suspense>
          </div>
        </div>
      </ThemeLanguageProvider>
    );
  }

  const pageKey = getPageKey(currentHash);

  return (
    <ThemeLanguageProvider>
      <div className="min-h-screen bg-transparent text-slate-100 relative transition-colors duration-500">
        {/* 🌌 Capa Ambiental Cósmica Galaxia a 60 FPS */}
        <GalaxyAmbientBackground />

        {/* 🚀 Preloader Cósmico Interactivo (Index y Diagnóstico) */}
        <WelcomeGalaxyPreloader key={pageKey} pageKey={pageKey} />

        {/* 🧭 Navbar Global Fijo a Nivel de Viewport (Inamovible durante el scroll) */}
        <Navbar currentHash={currentHash} />

        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pageKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="w-full"
            >
              <Suspense fallback={<CosmicPageFallback />}>
                {pageKey === 'privacidad' && <PrivacyTermsPage />}
                {pageKey === 'diagnostico' && <TriagePage />}
                {pageKey === 'sistemas' && <SystemsPage />}
                {pageKey === 'obras' && <WorksPage />}
                {pageKey === 'vision' && <VisionPage />}
                {pageKey === 'home' && <HomePage />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botones Flotantes Permanentes del Sistema */}
        <FloatingSocialsDock />
        <FloatingAIOrb />
      </div>
    </ThemeLanguageProvider>
  );
}
