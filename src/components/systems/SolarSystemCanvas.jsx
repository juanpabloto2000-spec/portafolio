import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, ShieldCheck, Database, Layers, Workflow, Bot, 
  ArrowRight, Sparkles, CheckCircle2, RotateCw, Play, Pause,
  Compass, ChevronRight, Zap, Target, Inbox, Calendar, DollarSign,
  Utensils, Package, Award, FileSpreadsheet, Video, ShieldAlert, Cpu
} from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

// Definición de Mundos Planetarios y sus Servicios / Sistemas directos
export const PLANETARY_WORLDS = [
  {
    id: 'world-sun',
    type: 'star',
    name: 'Dynamind Prime',
    title: 'Consultoría de IA Soberana',
    subtitle: 'NÚCLEO SOLAR DE ARQUITECTURA',
    tagline: 'No vendemos horas ni plantillas. Auditamos tus cuellos de botella operativos (D0) y construimos software propietario.',
    color: '#F59E0B',
    accentColor: '#38BDF8',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    archetype: 'CONSULTORÍA SOBERANA',
    systemsCount: 'Arquitectura & Auditoría',
    coreD0: 'Dependencia de agencias genéricas, plataformas de terceros que cobran el 20% y falta de código propio.',
    services: [
      { id: 'sun-1', name: 'Auditoría D0 de Cuellos de Botella', desc: 'Diagnóstico matemático de fugas de dinero y tiempo antes de codificar.', icon: Target },
      { id: 'sun-2', name: 'Arquitectura de Software Propietario', desc: 'Entrega en tu propio repositorio GitHub. Eres dueño del 100% de tu código.', icon: Database },
      { id: 'sun-3', name: 'Dualidad: Complejidad + Tareas Específicas', desc: 'Capacidad para crear desde PMS/KDS robustos hasta agentes de IA quirúrgicos.', icon: Cpu },
      { id: 'sun-4', name: 'Erradicación de Renta de SaaS', desc: 'Cero mensualidades a intermediarios y comisiones abusivas en tu operación.', icon: ShieldCheck }
    ]
  },
  {
    id: 'world-aethel',
    type: 'planet',
    name: 'Aethel',
    title: 'Sistemas Operativos Soberanos (Core Business)',
    subtitle: 'CUADRANTE DE GESTIÓN TÁCTICA & CORE OPERATIVO',
    tagline: 'Sistemas de alta complejidad que gobiernan el búnker operativo: caja con arqueo ciego, folios, comandas y reservas.',
    color: '#818CF8',
    secondaryColor: '#C084FC',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    archetype: 'SISTEMAS COMPLEJOS',
    systemsCount: '6 Sistemas Críticos',
    orbitRadiusPct: 28,
    angleOffset: 0,
    coreD0: 'Descuadres de caja, descontrol de reservas, pérdidas en mermas y comisiones del 25% a plataformas externas.',
    services: [
      { id: 'sys-3', number: '03', name: 'Core Dashboard DSB (/#/dsb)', desc: 'Panel táctico privado sin enlaces visibles para control de folios y clientes.', icon: Database, badge: 'Búnker Privado' },
      { id: 'sys-7', number: '07', name: 'PMS Hotelero & Reservas Directas', desc: 'Motor atómico de disponibilidad con cobro de anticipo del 50% y check-in digital.', icon: Calendar, badge: 'Cero Comisiones' },
      { id: 'sys-5', number: '05', name: 'Caja & Arqueo Ciego con Billetes', desc: 'Calculadora de fajos de billetes donde el cajero cuenta sin ver el saldo teórico.', icon: DollarSign, badge: 'Antifraude' },
      { id: 'sys-4', number: '04', name: 'Menús Táctiles & Comandas KDS', desc: 'Pantalla de cocina y barra con semáforo de tiempos y autopedidos en mesa.', icon: Utensils, badge: 'Cocina & Barra' },
      { id: 'sys-6', number: '06', name: 'Control de Mermas & Stock Dual', desc: 'Medición volumétrica en mililitros para licores y stock unitario con alertas.', icon: Package, badge: 'Cero Fugas' },
      { id: 'sys-9', number: '09', name: 'Seguridad RBAC & Capado Staff', desc: 'La recepción opera pero queda 100% ciega a ingresos brutos y números de caja.', icon: ShieldAlert, badge: 'Escudo Privado' }
    ]
  },
  {
    id: 'world-nexus',
    type: 'planet',
    name: 'Nexus',
    title: 'Frontoffice Sensorial & Retención Dopamínica',
    subtitle: 'CUADRANTE DE EXPERIENCIA EDITORIAL & VENTAS',
    tagline: 'Portales ultrarrápidos que enamoran al tráfico móvil de Ads y sistemas de retención sin regalar descuentos.',
    color: '#34D399',
    secondaryColor: '#22D3EE',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    archetype: 'FRONTOFFICE SENSORIAL',
    systemsCount: '4 Portales de Impacto',
    orbitRadiusPct: 52,
    angleOffset: 1.6,
    coreD0: 'Páginas web lentas (>2s) que queman el presupuesto publicitario y clientes que compran una vez y jamás regresan.',
    services: [
      { id: 'sys-1', number: '01', name: 'Webs Scrollytelling <0.8s', desc: 'Renderizado instantáneo en CDN Edge con narrativas interactivas a 60 FPS.', icon: Layers, badge: 'Alta Retención' },
      { id: 'sys-17', number: '17', name: 'Fidelización & Billetera WhatsApp', desc: 'Puntos por consumo y membresías Silver/Gold/Black directamente en WhatsApp.', icon: Award, badge: 'Recurrencia' },
      { id: 'sys-2', number: '02', name: 'Triaje Visual & Agendador 45s', desc: 'Embudo con odómetro de fricción que califica prospectos y reserva citas en Meet.', icon: Calendar, badge: 'Funnel VIP' },
      { id: 'sys-8', number: '08', name: 'CMS en Caliente & Tokens Dinámicos', desc: 'Modifica tarifas por temporada, textos y banners en vivo sin tocar código.', icon: Sparkles, badge: 'Edición en Vivo' }
    ]
  },
  {
    id: 'world-syntropy',
    type: 'planet',
    name: 'Syntropy',
    title: 'Automatizaciones Autónomas de Alto Impacto',
    subtitle: 'CUADRANTE DE ORQUESTACIÓN & OPERACIÓN EN PILOTO AUTOMÁTICO',
    tagline: 'Flujos invisibles que conectan pasarelas, OCR de facturas y bases de datos para erradicar el trabajo manual.',
    color: '#FBBF24',
    secondaryColor: '#F87171',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    archetype: 'AUTOMATIZACIONES DE PRECISIÓN',
    systemsCount: '3 Automatizaciones Clave',
    orbitRadiusPct: 74,
    angleOffset: 3.2,
    coreD0: 'Horas perdidas digitando facturas físicas a mano, olvido de cobros a clientes y sincronización manual de datos.',
    services: [
      { id: 'sys-13', number: '13', name: 'Workflows Autónomos n8n / Webhooks', desc: 'Conecta pasarelas Wompi/Stripe, WhatsApp y CRM para operar en piloto automático.', icon: Workflow, badge: 'Integración Total' },
      { id: 'sys-11', number: '11', name: 'Automatización OCR Facturas con IA', desc: 'Extracción de ítems, NIT, impuestos (IVA/retenciones) desde fotos o PDFs sin digitar.', icon: FileSpreadsheet, badge: 'Cero Digitación' },
      { id: 'sys-10', number: '10', name: 'Telemetría & Facturación Térmica POS', desc: 'Impresión en comandas térmicas de 58/80mm y reportes de márgenes netos.', icon: Zap, badge: 'POS Térmico' }
    ]
  },
  {
    id: 'world-chronos',
    type: 'planet',
    name: 'Chronos',
    title: 'Agentes de IA para Tareas Específicas',
    subtitle: 'CUADRANTE DE AGENTES QUIRÚRGICOS 24/7',
    tagline: 'Agentes entrenados para una misión exacta: filtrar leads, ordenar correos, auditar metas y estructurar guiones.',
    color: '#38BDF8',
    secondaryColor: '#818CF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    archetype: 'AGENTES DE TAREA ESPECÍFICA',
    systemsCount: '4 Agentes Autónomos',
    orbitRadiusPct: 94,
    angleOffset: 4.8,
    coreD0: 'Fundadores perdiendo tiempo con curiosos sin presupuesto, bandejas con 200 correos sin responder y falta de constancia.',
    services: [
      { id: 'sys-14', number: '14', name: 'Lead Scoring IA 0-100 & Enriquecimiento', desc: 'Puntúa el valor comercial de cada prospecto para hablar solo con decisores con dinero.', icon: Target, badge: 'Filtro Decisores' },
      { id: 'sys-15', number: '15', name: 'Inbox Zero & Borradores Contextuales', desc: 'Triaje de correo, detección de pagos urgentes y borradores listos con 1 clic.', icon: Inbox, badge: 'Inbox Zero' },
      { id: 'sys-16', number: '16', name: 'Agente Auditor Proactivo 24/7', desc: 'Supervisa entregas del equipo, consolida caja diaria y envía reporte a WhatsApp.', icon: Bot, badge: 'Auditor 24/7' },
      { id: 'sys-12', number: '12', name: 'Motor de Guiones Virales & Hooks', desc: 'Estructura segundo a segundo ganchos de 0-3s y guiones de alta retención para Reels.', icon: Video, badge: 'Guiones Virales' }
    ]
  }
];

export default function SolarSystemCanvas({ 
  selectedWorldId, 
  onSelectWorld, 
  onSelectSystem 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'manifesto'

  const activeWorld = PLANETARY_WORLDS.find(w => w.id === selectedWorldId) || PLANETARY_WORLDS[0];
  const isSun = activeWorld.id === 'world-sun';

  // Animación continua y suave de rotación orbital
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#04060d] shadow-2xl flex flex-col">
      
      {/* ============================================================== */}
      {/* 1. LIENZO ESPACIAL SUPERIOR: LA MAQUETA ORBITAL INTERACTIVA     */}
      {/* ============================================================== */}
      <div className="relative w-full min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#060a17] via-[#04060e] to-[#020306]">
        
        {/* Fondo Cósmico Dinámico con Estrellas y Nebulosas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Nebulosa Oro Solar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-amber-500/10 blur-[90px] animate-pulse" />
          
          {/* Nebulosa Índigo */}
          <div className="absolute top-10 left-10 w-[260px] h-[260px] rounded-full bg-indigo-600/10 blur-[80px]" />
          
          {/* Nebulosa Esmeralda / Cian */}
          <div className="absolute bottom-10 right-10 w-[280px] h-[280px] rounded-full bg-emerald-500/10 blur-[80px]" />

          {/* Campo de estrellas fijas con titileo */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Header Superior del Canvas: Telemetría y Badge Canónico */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
                SISTEMA SOLAR DYNAMIND // MAQUETA ORBITAL ACTIVA
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-sans font-light">
              Toca el Sol o cualquier Planeta para explorar la oferta de sistemas y servicios.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md flex items-center gap-2 text-[11px] font-mono font-bold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>CONSULTORÍA DE IA // NO AGENCIA</span>
            </div>

            <button
              onClick={() => {
                soundFx.playTap();
                setIsPlaying(!isPlaying);
              }}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EL SISTEMA SOLAR VISUAL: SOL CENTRAL + 4 PLANETAS INTERACTIVOS */}
        {/* ============================================================== */}
        <div className="relative z-10 my-auto py-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          
          {/* EL SOL CUÁNTICO CENTRAL: DYNAMIND PRIME */}
          <div className="relative flex flex-col items-center">
            
            {/* Corona Pulsante Externa */}
            <div 
              className={`absolute -inset-6 rounded-full transition-all duration-700 ${
                isSun ? 'bg-amber-400/25 blur-2xl scale-110' : 'bg-amber-500/10 blur-xl scale-100'
              }`} 
            />

            {/* Núcleo Solar */}
            <button
              onClick={() => {
                soundFx.playPlanetSelect();
                onSelectWorld('world-sun');
              }}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-all duration-500 flex flex-col items-center justify-center text-center p-2 group ${
                isSun 
                  ? 'ring-4 ring-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.6)] scale-105' 
                  : 'hover:scale-105 hover:ring-2 hover:ring-amber-400/50'
              }`}
              style={{
                background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FDE047 30%, #F59E0B 70%, #92400E 100%)'
              }}
            >
              <Sun className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-950 animate-[spin_12s_linear_infinite]" />
              <span className="font-display font-black text-[11px] sm:text-xs text-zinc-950 tracking-tight leading-none mt-1">
                DYNAMIND
              </span>
              <span className="font-mono text-[8px] font-bold text-zinc-950/80 uppercase">
                PRIME
              </span>
            </button>

            {/* Rótulo Central */}
            <div className="mt-3 text-center space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center justify-center gap-1">
                <span>NÚCLEO SOBERANO</span>
                {isSun && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
              </div>
              <div className="text-[10px] font-mono text-amber-300 font-bold">
                CONSULTORÍA DE IA
              </div>
            </div>

          </div>

          {/* LOS 4 GRANDES MUNDOS PLANETARIOS ORBITANDO */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
            {PLANETARY_WORLDS.filter(w => w.type === 'planet').map((world) => {
              const isSelected = selectedWorldId === world.id;

              return (
                <button
                  key={world.id}
                  onClick={() => {
                    soundFx.playOrbitWarp();
                    onSelectWorld(world.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white/10 border-white/40 shadow-2xl scale-[1.02]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 25px ${world.glowColor}` : 'none'
                  }}
                >
                  {/* Borde de Color Superior */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transition-all"
                    style={{ backgroundColor: world.color }}
                  />

                  {/* Esfera Planetaria con Sombras 3D */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className={`w-9 h-9 rounded-full transition-transform duration-500 relative flex items-center justify-center ${
                        isSelected ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      style={{
                        background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${world.color} 55%, #05070e 100%)`,
                        boxShadow: `0 0 15px ${world.glowColor}`
                      }}
                    >
                      {/* Anillo si tiene (Aethel y Chronos) */}
                      {(world.id === 'world-aethel' || world.id === 'world-chronos') && (
                        <div 
                          className="absolute inset-0 border border-white/60 rounded-full scale-150 rotate-45 pointer-events-none" 
                        />
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-zinc-400">
                      {world.systemsCount}
                    </span>
                  </div>

                  {/* Textos del Planeta */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: world.color }} />
                      <span style={{ color: world.color }}>{world.name}</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {world.title}
                    </h4>

                    <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 font-light leading-relaxed">
                      {world.tagline}
                    </p>
                  </div>

                  {/* Indicador de Activo */}
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-500">{world.archetype}</span>
                    <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                      <span>Ver</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                </button>
              );
            })}
          </div>

        </div>

        {/* Footer Táctico del Canvas: Navegación Rápida */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-300">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Mundo activo: <strong className="text-white uppercase">{activeWorld.name}</strong> ({activeWorld.archetype})</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-400">✓ 17 Sistemas & Automatizaciones Mapeados</span>
            <span className="text-amber-400">★ Consultoría Soberana</span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. VITRINA INFERIOR: SERVICIOS Y SISTEMAS DEL MUNDO ACTIVO     */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 bg-zinc-950/90 border-t border-white/10 space-y-6">
        
        {/* Cabecera del Mundo Activo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeWorld.color }} />
              <span style={{ color: activeWorld.color }}>{activeWorld.subtitle}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{activeWorld.archetype}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              {activeWorld.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed font-light">
              {activeWorld.tagline}
            </p>
          </div>

          {/* Cuello de Botella que Erradica */}
          <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs text-red-200/90 max-w-sm shrink-0 space-y-1">
            <div className="text-[10px] font-mono font-bold text-red-400 uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Cuello de Botella Crítico (D0):</span>
            </div>
            <p className="leading-relaxed font-light">{activeWorld.coreD0}</p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* GRILLA DE SERVICIOS Y SISTEMAS OFRECIDOS EN ESTE MUNDO         */}
        {/* ============================================================== */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Servicios & Soluciones Disponibles en este Cuadrante ({activeWorld.services.length}):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeWorld.services.map((srv) => {
              const SrvIcon = srv.icon;

              return (
                <div
                  key={srv.id}
                  onClick={() => {
                    if (onSelectSystem && srv.id.startsWith('sys-')) {
                      soundFx.playPlanetSelect();
                      onSelectSystem(srv.id);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 group ${
                    srv.id.startsWith('sys-') 
                      ? 'cursor-pointer bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                      : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:scale-105 transition-transform">
                        <SrvIcon className="w-4 h-4" style={{ color: activeWorld.color }} />
                      </div>

                      {srv.badge && (
                        <span 
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                          style={{
                            backgroundColor: `${activeWorld.color}15`,
                            borderColor: `${activeWorld.color}35`,
                            color: activeWorld.color
                          }}
                        >
                          {srv.badge}
                        </span>
                      )}

                      {srv.number && (
                        <span className="text-[10px] font-mono text-zinc-500 font-bold">
                          SYS-{srv.number}
                        </span>
                      )}
                    </div>

                    <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                      {srv.name}
                    </h4>

                    <p className="text-xs text-zinc-400 font-sans leading-relaxed font-light">
                      {srv.desc}
                    </p>
                  </div>

                  {srv.id.startsWith('sys-') ? (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                      <span>Ver ficha técnica</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Metodología Soberana</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
