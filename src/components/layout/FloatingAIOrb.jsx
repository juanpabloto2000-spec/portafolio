import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../context/CMSContext';

// 🔮 Carga bajo demanda de AURA para aligerar el bundle inicial de entrada
const DynamindAIAssistantModal = React.lazy(() => import('../interactive/DynamindAIAssistantModal'));

// Prefetch en segundo plano al aproximar el puntero
const prefetchAssistantModal = () => {
  try {
    import('../interactive/DynamindAIAssistantModal');
  } catch (e) {
    // Silencioso
  }
};

// Componente Escudo Defensivo (Error Boundary) para el Modal de Aura
class ModalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Aura Modal Caught Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[100050] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
          <div className="bg-[#0b0f19] border border-purple-500/30 rounded-2xl p-6 max-w-sm text-center text-white space-y-4 shadow-2xl">
            <p className="text-sm font-sans text-purple-200">Aura está reiniciando sus circuitos cuánticos...</p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false });
                this.props.onClose?.();
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Cerrar y Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function FloatingAIOrb() {
  const { cms } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [isWarpSpeed, setIsWarpSpeed] = useState(false);

  if (cms?.chatbot?.enabled === false) {
    return null;
  }

  return (
    <>
      <aside 
        aria-label="Galaxia espiral interactiva Dynamind AI" 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none no-print"
      >
        <div className="relative flex flex-col items-center">
          
          {/* Lente Gravitacional / Sombra Cósmica en el Vacío */}
          <div className="w-10 sm:w-12 h-2.5 rounded-full bg-cyan-950/60 blur-sm transform translate-y-10 sm:translate-y-12 scale-90 pointer-events-none" />

          {/* Galaxia Espiral Abierta Compacta y Elegante */}
          <motion.button
            type="button"
            onClick={() => setModalOpen(true)}
            onMouseEnter={() => {
              setIsWarpSpeed(true);
              prefetchAssistantModal();
            }}
            onFocus={() => prefetchAssistantModal()}
            onMouseLeave={() => setIsWarpSpeed(false)}
            whileHover={{ 
              scale: 1.15,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            }}
            whileTap={{ scale: 0.9 }}
            className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer group focus:outline-none"
            aria-label="Abrir asistente de inteligencia artificial cósmica"
          >
            {/* 1. Halo Convectivo de Plasma Exterior (Nebulosa Azul & Morado Estelar) */}
            <div 
              className={`absolute -inset-2.5 rounded-full bg-gradient-to-tr from-blue-600/30 via-purple-600/35 to-indigo-500/25 blur-xl transition-all duration-500 pointer-events-none ${
                isWarpSpeed 
                  ? 'scale-130 opacity-100 blur-2xl from-blue-500/45 via-purple-500/50 to-indigo-400/35' 
                  : 'opacity-70 scale-100 group-hover:opacity-90'
              }`} 
            />

            {/* 🌟 ARO DE LUZ FOTÓNICA & CORONA LUMÍNICA (Luz Viva / Fotones en Órbita Concéntrica) */}
            <div className="absolute -inset-1 sm:-inset-1.5 rounded-full pointer-events-none flex items-center justify-center">
              {/* Resplandor ambiental suave del aro de luz */}
              <motion.div 
                animate={{ 
                  scale: isWarpSpeed ? [1.06, 1.14, 1.06] : [0.98, 1.04, 0.98],
                  opacity: isWarpSpeed ? [0.85, 1, 0.85] : [0.5, 0.75, 0.5]
                }}
                transition={{ duration: isWarpSpeed ? 1.4 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full blur-[5px] bg-gradient-to-tr from-blue-500/40 via-purple-500/35 to-cyan-400/30"
              />

              {/* Anillo de Luz Orbital 1 (Rotación de haz azul zafiro a violeta con punto de luz blanca) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: isWarpSpeed ? 2.2 : 9, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
                className="relative w-full h-full rounded-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="photonRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.85" />
                      <stop offset="60%" stopColor="#a855f7" stopOpacity="0.6" />
                      <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="photonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Trazo del aro de luz de alta precisión */}
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="url(#photonRingGrad)"
                    strokeWidth={isWarpSpeed ? 2.2 : 1.4}
                    filter="url(#photonGlow)"
                  />
                  {/* Fotón viajero de alta intensidad lumínica */}
                  <circle
                    cx="50"
                    cy="3"
                    r={isWarpSpeed ? 2.4 : 1.6}
                    fill="#ffffff"
                    className="filter drop-shadow-[0_0_6px_#ffffff] drop-shadow-[0_0_10px_#60a5fa]"
                  />
                </svg>
              </motion.div>

              {/* Anillo de Contraluz Etéreo Inverso (Contrarotación suave segmentada) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: isWarpSpeed ? 3.5 : 15, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
                className="absolute inset-0 rounded-full pointer-events-none opacity-60"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="counterPhotonGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#c084fc" stopOpacity="0.75" />
                      <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="url(#counterPhotonGrad)"
                    strokeWidth="0.9"
                    strokeDasharray="45 15 25 15"
                  />
                  {/* Micro-chispa secundaria violeta */}
                  <circle
                    cx="50"
                    cy="97"
                    r="1.2"
                    fill="#c084fc"
                    className="filter drop-shadow-[0_0_5px_#c084fc]"
                  />
                </svg>
              </motion.div>
            </div>

            {/* 2. Plano Galáctico Inclinado en Perspectiva 3D */}
            <div 
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  transform: 'rotateX(52deg) rotateZ(-20deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 🌌 BRAZO ESPIRAL PRIMARIO (Rotación Continua // Warp Speed al Hover) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: isWarpSpeed ? 1.2 : 16, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                  className="absolute w-16 h-16 flex items-center justify-center"
                >
                  {/* Brazo Espiral Alfa (Azul Zafiro a Morado Cósmico) */}
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible filter drop-shadow-[0_0_6px_rgba(168,85,247,0.55)]">
                    <defs>
                      <linearGradient id="spiralGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#a855f7" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="spiralGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#c084fc" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#6366f1" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Brazo Logarítmico 1 */}
                    <path 
                      d="M 50 50 Q 65 40, 75 25 T 85 5" 
                      fill="none" 
                      stroke="url(#spiralGrad1)" 
                      strokeWidth={isWarpSpeed ? 4.5 : 3.4} 
                      strokeLinecap="round"
                    />
                    
                    {/* Brazo Logarítmico 2 (Opuesto a 180°) */}
                    <path 
                      d="M 50 50 Q 35 60, 25 75 T 15 95" 
                      fill="none" 
                      stroke="url(#spiralGrad2)" 
                      strokeWidth={isWarpSpeed ? 4.5 : 3.4} 
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Cúmulos de Gases Nebulares Etéreos */}
                  <div 
                    className="absolute w-14 h-7 rounded-full blur-[2px] opacity-60 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.6) 0%, rgba(168,85,247,0.4) 50%, transparent 80%)',
                      transform: 'rotate(40deg) skewX(25deg)'
                    }}
                  />
                  <div 
                    className="absolute w-14 h-7 rounded-full blur-[2px] opacity-60 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.55) 0%, rgba(99,102,241,0.35) 50%, transparent 80%)',
                      transform: 'rotate(220deg) skewX(25deg)'
                    }}
                  />
                </motion.div>

                {/* ✨ POLVO ESTELAR FINO & MICRO-PARTÍCULAS AZUL Y VIOLETA */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: isWarpSpeed ? 1.8 : 22, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                  className="absolute w-18 h-18 flex items-center justify-center pointer-events-none"
                >
                  <span className="absolute top-1 left-4 w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                  <span className="absolute bottom-2 right-4 w-1.2 h-1.2 rounded-full bg-blue-300 shadow-[0_0_5px_#93c5fd]" />
                  <span className="absolute top-5 right-1 w-1 h-1 rounded-full bg-purple-300 shadow-[0_0_4px_#d8b4fe]" />
                  <span className="absolute bottom-4 left-2 w-1 h-1 rounded-full bg-indigo-300 shadow-[0_0_5px_#c7d2fe]" />
                </motion.div>

                {/* ☀️ NÚCLEO CUÁNTICO CENTRAL AZUL & MORADO */}
                <div className="relative z-10 flex items-center justify-center">
                  {/* Resplandor de Acreción */}
                  <motion.div 
                    animate={isWarpSpeed ? { scale: [1, 1.3, 1.2], opacity: [0.9, 1, 0.95] } : { scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-5 h-5 rounded-full blur-sm bg-gradient-to-tr from-blue-500 via-white to-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.8),0_0_26px_rgba(59,130,246,0.6)]" 
                  />
                  {/* Punto Cero Blanco Puro de Singularidad */}
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_rgba(168,85,247,0.8)]" />
                </div>

              </div>
            </div>

          </motion.button>
        </div>
      </aside>

      {/* Modal Interactivo de Asistencia cargado bajo demanda con Error Boundary */}
      {modalOpen && (
        <ModalErrorBoundary onClose={() => setModalOpen(false)}>
          <Suspense fallback={null}>
            <DynamindAIAssistantModal 
              isOpen={modalOpen}
              onClose={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  try { window.speechSynthesis.cancel(); } catch (e) {}
                }
                setModalOpen(false);
              }}
            />
          </Suspense>
        </ModalErrorBoundary>
      )}
    </>
  );
}
