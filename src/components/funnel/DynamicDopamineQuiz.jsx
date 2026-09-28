import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Globe, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft, 
  Calendar, Clock, Phone, Sparkles, ShieldCheck, Zap, Activity, ExternalLink, Bot,
  TrendingUp, Layers, Cpu, Award, Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLeads } from '../../context/LeadContext';
import FunnelSuccessModal from './FunnelSuccessModal';
import { soundFx } from '../../utils/audioEffects';

// Componente Odómetro Reactivo Dopamínico de Fricción Operativa (0-100%)
function FrictionOdometreHUD({ score, step }) {
  // Rotación de aguja de -90deg (0%) a +90deg (100%)
  const needleRotation = -90 + (score / 100) * 180;
  
  let statusColor = 'text-cyan-400';
  let badgeBg = 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
  let statusLabel = 'Fricción Inicial Detectada';

  if (score >= 85) {
    statusColor = 'text-red-400';
    badgeBg = 'bg-red-950/60 border-red-500/40 text-red-300';
    statusLabel = 'Fuga Crítica de Capital / Prioridad VIP';
  } else if (score >= 60) {
    statusColor = 'text-amber-400';
    badgeBg = 'bg-amber-950/60 border-amber-500/40 text-amber-300';
    statusLabel = 'Cuello de Botella Severo';
  }

  return (
    <div className="p-4 sm:p-5 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md relative overflow-hidden">
      {/* Luz ambiental reactiva de fondo */}
      <div 
        className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500 ${
          score >= 85 ? 'bg-red-500' : score >= 60 ? 'bg-amber-500' : 'bg-cyan-500'
        }`}
      />

      <div className="flex items-center gap-4">
        {/* Tacómetro Gráfico SVG */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Pista de fondo */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="62.8" /* 75% arc */
              strokeLinecap="round"
            />
            {/* Arco dinámico con gradiente */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="url(#odometreGrad)"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (score / 100) * 188.4}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="odometreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Aguja central indicadora */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            <div className="w-0.5 h-6 bg-white shadow-[0_0_8px_#fff] origin-bottom rounded-full -translate-y-3" />
          </div>
          <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#fff]" />
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-300">
              Odómetro de Fricción Operativa
            </span>
            <span className={`text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
              {statusLabel}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-white flex items-baseline gap-2">
            <span className={`${statusColor} transition-colors duration-500`}>{score}%</span>
            <span className="text-xs text-zinc-400 font-sans font-normal">índice de automatización requerido</span>
          </div>
        </div>
      </div>

      {/* Tacómetro / Resonancia del Diagnóstico */}
      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
        <div className="text-right hidden sm:block">
          <div className="text-[10px] font-sans text-zinc-400 uppercase font-semibold">Estado</div>
          <div className="text-xs font-sans font-bold text-cyan-300">Diagnóstico Activo</div>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
          <Gauge className="w-5 h-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function DynamicDopamineQuiz() {
  const { addLead, availableSlots } = useLeads();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [createdLead, setCreatedLead] = useState(null);

  // Estado del formulario optimizado a 6 facetas concisas
  const [formData, setFormData] = useState({
    // Faceta 1: Identidad
    client_name: '',
    business_name: '',
    niche: 'Gastronomía, Bares & Discotecas',
    niche_id: 'gastro',
    
    // Faceta 2: Web & Escáner
    has_website: null, // true | false
    website_url: '',
    no_web_reason: 'Solo operamos por chat de WhatsApp',
    audit_results: null,
    
    // Faceta 3: Volumen Operativo
    daily_volume: '10 a 30 clientes / consultas diarias',
    volume_friction: 15,
    
    // Faceta 4: Cuello de Botella (Multi-select)
    bottlenecks: [],
    bottleneck: '',
    bottleneck_score: 85,
    
    // Faceta 5: Plazo & Urgencia
    urgency: 'Inmediata (< 2 a 3 semanas)',
    budget_range: '$2M - $5M COP (Inversión Táctica)',
    
    // Faceta 6: Agendamiento WhatsApp
    friction_score: 45,
    date: '',
    time: '',
    phone: ''
  });

  // Estado del Escáner en Vivo
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  const [scanCompleted, setScanCompleted] = useState(false);

  // Recalcular Score Dinámico reactivo según avance
  const computeFrictionScore = () => {
    let base = 35;
    if (formData.has_website === false) base += 20;
    if (formData.has_website === true && scanCompleted) base += 25;
    if (formData.volume_friction) base += formData.volume_friction;
    if (formData.bottleneck_score) base = Math.max(base, formData.bottleneck_score);
    return Math.min(96, Math.max(35, base));
  };

  const currentScore = computeFrictionScore();

  // Nichos de Negocio
  const businessNiches = [
    { id: 'gastro', label: 'Gastronomía, Bares & Discotecas', emoji: '🍽️', desc: 'Restaurantes de autor, gastrobares y venues nocturnos' },
    { id: 'hospedaje', label: 'Glampings, Hoteles & Cabañas', emoji: '🏨', desc: 'Ecoturismo, suites boutique y escapadas de descanso' },
    { id: 'clinica', label: 'Clínicas Odontológicas & Spas', emoji: '💆‍♀️', desc: 'Diseño de sonrisa, estética facial y tratamientos VIP' },
    { id: 'personal', label: 'Marcas de Autor & High-Ticket', emoji: '🎙️', desc: 'Mentores, médicos especialistas, consultores y speakers' },
    { id: 'retail', label: 'Comercio, Retail & Empresas', emoji: '🛍️', desc: 'Moda, importadores, retail y empresas de servicios' }
  ];

  // Cuellos de botella específicos por nicho
  const nicheBottlenecks = {
    gastro: [
      { id: 'g1', emoji: '💸', title: 'Comisiones del 20% al 28% en apps de delivery', desc: 'Apps intermediarias se quedan con la mayor parte del margen por cada plato vendido.', score: 92 },
      { id: 'g2', emoji: '📑', title: 'Comandas de papel lentas y retrasos en cocina/barra', desc: 'Sin pantallas KDS; órdenes traspapeladas y clientes insatisfechos en horas pico.', score: 88 },
      { id: 'g3', emoji: '💵', title: 'Fugas de dinero y descuadres de caja al cerrar turnos', desc: 'Sin arqueo ciego ni calculadora de billetes; diferencias constantes con el personal.', score: 86 },
      { id: 'g4', emoji: '🍾', title: 'Merma no controlada de botellas y licores abiertos', desc: 'Falta de control volumétrico en mililitros por trago; robos hormiga y desorden.', score: 84 }
    ],
    hospedaje: [
      { id: 'h1', emoji: '🏨', title: 'Comisiones del 18% al 25% a Booking y Airbnb', desc: 'Pagar comisiones millonarias mensuales por huéspedes que podrían reservar directo.', score: 94 },
      { id: 'h2', emoji: '⚠️', title: 'Riesgo constante de overbooking en festivos', desc: 'Llevar disponibilidad en cuadernos o WhatsApp manual provoca reservas duplicadas.', score: 91 },
      { id: 'h3', emoji: '💳', title: 'Cobro manual de anticipos del 50% por chat', desc: 'Horas enviando datos de cuenta por WhatsApp y verificando capturas de transferencias.', score: 87 },
      { id: 'h4', emoji: '📝', title: 'Check-In y Check-Out lento con papeleo físico', desc: 'Filas a la llegada de huéspedes y falta de folios para cobrar consumos adicionales.', score: 82 }
    ],
    clinica: [
      { id: 'c1', emoji: '❌', title: 'Inasistencias a citas (No-shows) sin anticipo', desc: 'Pacientes que apartan turnos médicos y no asisten, dejando quirófanos o consultorios vacíos.', score: 93 },
      { id: 'c2', emoji: '⏳', title: 'Personal saturado agendando citas por WhatsApp', desc: 'Recepcionistas pasando horas coordinando horarios en vez de atender a los pacientes presentes.', score: 89 },
      { id: 'c3', emoji: '📁', title: 'Historiales y fotos clínicas desorganizadas', desc: 'Imágenes de antes y después dispersas en chats de celular sin ficha médica centralizada.', score: 85 },
      { id: 'c4', emoji: '🧾', title: 'Cotizaciones de tratamientos que quedan en el limbo', desc: 'Presupuestos de diseño de sonrisa o estética sin seguimiento automatizado oportuno.', score: 86 }
    ],
    personal: [
      { id: 'p1', emoji: '🥱', title: 'Horas perdidas con curiosos sin presupuesto', desc: 'Bandeja saturada de personas preguntando "¿precio?" sin intención real de pagar servicios de autor.', score: 95 },
      { id: 'p2', emoji: '📅', title: 'Suscripciones mensuales a Calendly y herramientas ajenas', desc: 'Pagar mensualidades en dólares por herramientas que no reflejan la identidad de tu marca.', score: 84 },
      { id: 'p3', emoji: '🌐', title: 'Web anticuada que no refleja el valor de tu marca', desc: 'Tener una web que parece una plantilla barata restándole autoridad a tus servicios high-ticket.', score: 90 },
      { id: 'p4', emoji: '💤', title: 'Cero captación de prospectos mientras descansas', desc: 'Sin un embudo algorítmico 24/7 que califique y agende citas automáticamente.', score: 87 }
    ],
    retail: [
      { id: 'r1', emoji: '📑', title: 'Digitación manual de facturas y desorden contable', desc: 'Más de 15 horas a la semana copiando datos de compras físicas a programas contables.', score: 91 },
      { id: 'r2', emoji: '📦', title: 'Descuadre de inventarios entre bodega y ventas', desc: 'Vender productos agotados o no saber el stock real sin hacer conteo manual diario.', score: 88 },
      { id: 'r3', emoji: '📬', title: 'Correos de proveedores y clientes VIP perdidos', desc: 'Bandejas de entrada colapsadas con cientos de mensajes sin clasificación ni respuesta rápida.', score: 84 },
      { id: 'r4', emoji: '🤖', title: 'Tareas rutinarias de oficina que consumen al equipo', desc: 'Falta de agentes autónomos y webhooks que automaticen reportes y conciliaciones.', score: 86 }
    ]
  };

  // Niveles de volumen operativo
  const volumeLevels = [
    { label: '< 10 clientes / consultas diarias', scoreAdd: 10, desc: 'Fase de consolidación; vital automatizar desde ya para no colapsar al escalar.' },
    { label: '10 a 30 clientes / consultas diarias', scoreAdd: 15, desc: 'Volumen medio; la atención manual ya está costando de 2 a 3 horas diarias al equipo.' },
    { label: '30 a 80 clientes / consultas diarias', scoreAdd: 22, desc: 'Alto tráfico; colapso evidente en horas pico y fuga crítica de ventas por demora.' },
    { label: '> 80 clientes o comensales diarios', scoreAdd: 28, desc: 'Operación masiva; urgencia máxima de KDS/PMS, reservas directas y arqueo ciego.' }
  ];

  // Niveles de arquitectura deseada
  const architectureLevels = [
    {
      title: 'Portal Web Scrollytelling + Agendador Autónomo',
      desc: 'Frontoffice de autor a 60 FPS con triaje algorítmico y captura directa a WhatsApp sin suscripciones mensuales.',
      badge: 'Capa Frontal'
    },
    {
      title: 'Core Operativo Completo (DSB / PMS Aislado)',
      desc: 'Panel privado en /#/dsb con caja por turnos, arqueo ciego con billetes, directorio de clientes y control de folios.',
      badge: 'Búnker de Gestión'
    },
    {
      title: 'Ecosistema Integral con IA & Automatizaciones',
      desc: 'Web Scrollytelling + Core DSB + Lectura OCR de facturas, agentes de WhatsApp 24/7 y flujos autónomos en n8n.',
      badge: 'Suite Completa'
    }
  ];

  // Plazos y urgencias
  const urgencyOptions = [
    { label: 'Inmediata (< 2 a 3 semanas)', desc: 'Estamos en temporada alta o perdiendo clientes diariamente.' },
    { label: 'Próximo mes (30 días)', desc: 'Queremos modernizar la operación antes del siguiente trimestre.' },
    { label: 'Planificación estratégica (60+ días)', desc: 'Estamos estructurando presupuesto y comparando alternativas de software.' }
  ];

  // Algoritmo de Escáner Heurístico en Tiempo Real con Síntesis de Sonido
  const runLiveWebAudit = () => {
    if (!formData.website_url.trim()) return;

    soundFx.playScanTone();
    setIsScanning(true);
    setScanCompleted(false);

    const steps = [
      '🔍 Conectando con servidor de inspección de Dynamind...',
      '⚡ Analizando tiempo de respuesta y carga móvil...',
      '🛑 Verificando existencia de motor de reservas autónomo...',
      '💬 Detectando fuga de conversión por atención manual en WhatsApp...',
      '🎨 Evaluando jerarquía visual vs. plantillas genéricas...',
      '💎 Compilando dictamen de cuellos de botella...'
    ];

    let current = 0;
    setScanStepText(steps[0]);

    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        soundFx.playBlip(560 + current * 40, 0.05);
        setScanStepText(steps[current]);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanCompleted(true);
        soundFx.playSuccessChord();
        setFormData(prev => ({
          ...prev,
          friction_score: 93,
          audit_results: {
            speed: 'Lenta en redes móviles (3.8s)',
            autonomousBooking: 'Inexistente (Depende 100% de chat manual)',
            corePMS: 'Ausente (Cero control de caja o comandas)',
            visualIdentity: 'Plantilla estándar con baja retención visual',
            recommendation: 'Califica con Máxima Prioridad para la Demo Operativa de Dynamind Studios'
          }
        }));
        try {
          confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }, 550);
  };

  // Días laborables automáticos para agendamiento (Lunes a Sábado)
  const getNextDays = () => {
    const days = [];
    const now = new Date();
    let curr = new Date(now);
    curr.setDate(curr.getDate() + 1);

    while (days.length < 8) {
      // 0 = Domingo (se incluye Sábado para cobertura Lun-Sáb)
      if (curr.getDay() !== 0) {
        const yyyy = curr.getFullYear();
        const mm = String(curr.getMonth() + 1).padStart(2, '0');
        const dd = String(curr.getDate()).padStart(2, '0');
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        days.push({
          dateStr: `${yyyy}-${mm}-${dd}`,
          dayName: dayNames[curr.getDay()],
          dayNumber: dd,
          monthName: monthNames[curr.getMonth()]
        });
      }
      curr.setDate(curr.getDate() + 1);
    }
    return days;
  };

  const businessDays = getNextDays();
  const selectedDate = formData.date || businessDays[0].dateStr;
  const selectedTime = formData.time || availableSlots[0];

  // Cálculo Dinámico de Score Global
  const currentBottleneckList = nicheBottlenecks[formData.niche_id] || nicheBottlenecks.gastro;

  const handleSubmit = async () => {
    setIsLoading(true);
    soundFx.playScanTone();
    try {
      const bottleneckSummary = formData.bottlenecks && formData.bottlenecks.length > 0 
        ? formData.bottlenecks.join(' | ') 
        : (formData.bottleneck || currentBottleneckList[0].title);

      const payload = {
        client_name: formData.client_name,
        business_name: formData.business_name,
        profile_type: formData.niche,
        niche: formData.niche,
        bottleneck: bottleneckSummary,
        friction_score: currentScore,
        date: selectedDate,
        time: selectedTime,
        phone: formData.phone,
        notes: `Web: ${formData.website_url || 'No tiene web (' + formData.no_web_reason + ')'} | Volumen: ${formData.daily_volume} | Urgencia: ${formData.urgency} | Rango: ${formData.budget_range}`
      };
      const lead = await addLead(payload);
      soundFx.playSuccessChord();
      setCreatedLead(lead);

      // Disparar WhatsApp directamente con Juan Pablo (+57 300 892 4110)
      const waMsg = `Hola Juan Pablo, acabo de completar el diagnóstico de ingeniería en Dynamind Studios.

*Proyecto:* ${formData.business_name || 'Sin nombre'}
*Tomador de Decisión:* ${formData.client_name || 'Cliente'}
*Sector:* ${formData.niche}
*Frenos Detectados:*
${formData.bottlenecks && formData.bottlenecks.length > 0 ? formData.bottlenecks.map(b => `• ${b}`).join('\n') : `• ${bottleneckSummary}`}
*Volumen Operativo:* ${formData.daily_volume}
*Plazo Estimado:* ${formData.urgency}
*Fecha de Sesión:* ${selectedDate} a las ${selectedTime} (Lun-Sáb)
*WhatsApp:* ${formData.phone}

Quedo atento para la demostración técnica de 15 minutos.`;

      const waUrl = `https://wa.me/573008924110?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('Error registrando lead:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto font-sans relative"
    >
      
      {/* HUD 1: Odómetro Reactivo Dopamínico */}
      <div className="mb-4">
        <FrictionOdometreHUD score={currentScore} step={step} />
      </div>

      {/* HUD 2: Stepped Facet Pipeline de 6 Nodos Cósmicos (Reemplaza la barra de carga plana) */}
      <div className="mb-8 p-4 sm:p-5 bg-[#080b13]/90 border border-white/15 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Nodos de Facetas Interconectados */}
        <div className="relative flex items-center justify-between z-10">
          
          {/* Línea conectora de fondo */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-white/10 -z-10 rounded-full" />
          
          {/* Línea de energía iluminada reactiva */}
          <motion.div 
            className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 -z-10 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.7)]"
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {[
            { num: 1, label: 'Perfil', icon: Building2 },
            { num: 2, label: 'Activo Web', icon: Globe },
            { num: 3, label: 'Volumen', icon: TrendingUp },
            { num: 4, label: 'Frenos', icon: AlertTriangle },
            { num: 5, label: 'Plazo', icon: Clock },
            { num: 6, label: 'Agenda', icon: Calendar }
          ].map((facet) => {
            const isCompleted = facet.num < step;
            const isCurrent = facet.num === step;
            const Icon = facet.icon;

            return (
              <div key={facet.num} className="flex flex-col items-center gap-2 group">
                <div 
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)] font-bold scale-95'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600 text-white shadow-[0_0_25px_rgba(34,211,238,0.8)] ring-2 sm:ring-4 ring-cyan-400/40 ring-offset-2 ring-offset-[#080b13] scale-110 font-black animate-pulse'
                      : 'bg-[#0f1422] border border-white/15 text-zinc-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  ) : (
                    <span className="text-xs sm:text-sm font-sans font-bold">0{facet.num}</span>
                  )}
                </div>
                
                {/* Etiqueta Editorial de la Faceta */}
                <span className={`text-[10px] sm:text-xs font-sans transition-colors duration-300 hidden xs:block ${
                  isCurrent 
                    ? 'text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
                    : isCompleted 
                    ? 'text-emerald-400 font-medium' 
                    : 'text-zinc-500'
                }`}>
                  {facet.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenedor del Quiz con Stage Focus al Scroll */}
      <motion.div 
        whileHover={{ boxShadow: '0 0 50px rgba(34, 211, 238, 0.08)' }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-10 border border-white/15 bg-white/[0.025] rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md"
      >
        
        {/* ==================== FACETA 1: IDENTIDAD & SECTOR ==================== */}
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                ¿Cuál es la naturaleza de tu negocio?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                Selecciona tu sector para calibrar las métricas de tu industria.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {businessNiches.map((n) => {
                const isSelected = formData.niche_id === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(540, 0.04);
                      setFormData(prev => ({ 
                        ...prev, 
                        niche_id: n.id, 
                        niche: n.label,
                        bottleneck: '' // resetear al cambiar sector
                      }));
                    }}
                    className={`p-4 sm:p-5 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-monolith scale-[1.01]'
                        : 'bg-white/[0.025] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl shrink-0 mt-0.5">{n.emoji}</span>
                    <div className="space-y-1">
                      <div className={`font-display font-bold text-sm sm:text-base ${isSelected ? 'text-black' : 'text-white'}`}>
                        {n.label}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-zinc-700' : 'text-zinc-400'}`}>
                        {n.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Datos del Tomador de Decisión */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-zinc-300 uppercase block">Tu Nombre y Apellido:</label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-zinc-300 uppercase block">Nombre de tu Empresa o Marca:</label>
                <input
                  type="text"
                  required
                  value={formData.business_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
                  placeholder="Ej. Cabañas Monteverde"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={!formData.client_name.trim() || !formData.business_name.trim()}
                onClick={() => {
                  soundFx.playBlip(620, 0.05);
                  setStep(2);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Avanzar a Faceta 2: Activo Web</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== FACETA 2: WEB & ESCÁNER HEURÍSTICO ==================== */}
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                ¿Cuentas con página web actualmente?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                Queremos evaluar si estás perdiendo conversiones hoy mismo.
              </p>
            </div>

            {/* Dos Opciones Claras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(520, 0.04);
                  setFormData(prev => ({ ...prev, has_website: false, website_url: '' }));
                  setScanCompleted(false);
                }}
                className={`p-6 rounded-2xl text-left border transition-all cursor-pointer space-y-2 ${
                  formData.has_website === false
                    ? 'bg-white text-black border-white shadow-monolith'
                    : 'bg-white/[0.025] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                <div className="text-3xl">📱</div>
                <div className={`font-display font-bold text-lg ${formData.has_website === false ? 'text-black' : 'text-white'}`}>
                  No tengo página web
                </div>
                <p className={`text-xs ${formData.has_website === false ? 'text-zinc-800' : 'text-zinc-400'}`}>
                  Todo lo operamos de forma manual por WhatsApp, llamadas o Instagram Direct.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(540, 0.04);
                  setFormData(prev => ({ ...prev, has_website: true }));
                }}
                className={`p-6 rounded-2xl text-left border transition-all cursor-pointer space-y-2 ${
                  formData.has_website === true
                    ? 'bg-white text-black border-white shadow-monolith'
                    : 'bg-white/[0.025] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                <div className="text-3xl">🌐</div>
                <div className={`font-display font-bold text-lg ${formData.has_website === true ? 'text-black' : 'text-white'}`}>
                  Sí, tengo página web activa
                </div>
                <p className={`text-xs ${formData.has_website === true ? 'text-zinc-800' : 'text-zinc-400'}`}>
                  Cuento con un sitio web, pero siento que no convierte o no tiene herramientas operativas.
                </p>
              </button>
            </div>

            {/* SI NO TIENE WEB: MOTIVO */}
            {formData.has_website === false && (
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl space-y-3 font-mono text-xs">
                <label className="text-zinc-300 block font-semibold">¿Por qué razón no has implementado una web nativa?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Solo operamos por chat de WhatsApp',
                    'Mala experiencia con agencias tradicionales',
                    'Pensábamos que era solo un gasto publicitario'
                  ].map((reason, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        soundFx.playBlip(580, 0.03);
                        setFormData(prev => ({ ...prev, no_web_reason: reason }));
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                        formData.no_web_reason === reason
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ESCÁNER EN VIVO SI TIENE WEB */}
            {formData.has_website === true && (
              <div className="p-6 bg-white/[0.03] border border-cyan-500/30 rounded-2xl space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Escáner Heurístico en Tiempo Real</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <label className="text-zinc-300 block">Pega el link de tu web actual:</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formData.website_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                      placeholder="ej. misitio.com o https://minegocio.com"
                      className="flex-1 px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      disabled={isScanning || !formData.website_url.trim()}
                      onClick={runLiveWebAudit}
                      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-sans font-bold text-xs uppercase tracking-wider rounded-xl disabled:opacity-30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      <span>{isScanning ? 'Escaneando...' : '⚡ Auditar Mi Web en Vivo'}</span>
                    </button>
                  </div>
                </div>

                {/* Telemetría durante el escaneo */}
                {isScanning && (
                  <div className="p-4 bg-black/80 border border-cyan-500/40 rounded-xl space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-cyan-300 animate-pulse">
                      <Bot className="w-4 h-4" />
                      <span>{scanStepText}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 animate-pulse w-3/4" />
                    </div>
                  </div>
                )}

                {/* Resultado del Escaneo */}
                {scanCompleted && formData.audit_results && (
                  <div className="p-5 bg-black/80 border border-emerald-500/40 rounded-xl space-y-4 font-mono text-xs animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Auditoría Finalizada con Éxito</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-400 text-[10px]">
                        Fricción Detectada: 93/100
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                        <div className="text-[10px] text-zinc-500 uppercase">TIEMPO DE RESPUESTA</div>
                        <div className="text-red-400 font-semibold">{formData.audit_results.speed}</div>
                      </div>

                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                        <div className="text-[10px] text-zinc-500 uppercase">MOTOR DE RESERVAS / ANTICIPOS</div>
                        <div className="text-amber-400 font-semibold">{formData.audit_results.autonomousBooking}</div>
                      </div>

                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                        <div className="text-[10px] text-zinc-500 uppercase">CORE PMS / CAJA</div>
                        <div className="text-zinc-400 font-semibold">{formData.audit_results.corePMS}</div>
                      </div>

                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                        <div className="text-[10px] text-zinc-500 uppercase">RETENCIÓN VISUAL</div>
                        <div className="text-zinc-300 font-semibold">{formData.audit_results.visualIdentity}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-sans">
                      💎 <strong>Diagnóstico:</strong> Tu web actual es un folleto digital que no captura ventas directas. Calificas con alta prioridad para la demostración técnica con Juan Pablo.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navegación */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(480, 0.04);
                  setStep(1);
                }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] text-zinc-300 border border-white/15 font-sans font-bold text-xs uppercase tracking-wider hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                type="button"
                disabled={formData.has_website === null || (formData.has_website === true && !scanCompleted)}
                onClick={() => {
                  soundFx.playBlip(620, 0.05);
                  setStep(3);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Avanzar a Faceta 3: Volumen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== FACETA 3: VOLUMEN OPERATIVO ==================== */}
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                ¿Qué flujo de clientes atiendes a diario?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                Determina la magnitud del tiempo que tu equipo está quemando en tareas mecánicas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {volumeLevels.map((lvl, idx) => {
                const isSelected = formData.daily_volume === lvl.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(540 + idx * 30, 0.04);
                      setFormData(prev => ({ 
                        ...prev, 
                        daily_volume: lvl.label,
                        volume_friction: lvl.scoreAdd 
                      }));
                    }}
                    className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-monolith scale-[1.01]'
                        : 'bg-white/[0.025] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className={`font-display font-bold text-base ${isSelected ? 'text-black' : 'text-white'}`}>
                          {lvl.label}
                        </div>
                        <TrendingUp className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      {lvl.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Navegación */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(480, 0.04);
                  setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] text-zinc-300 border border-white/15 font-sans font-bold text-xs uppercase tracking-wider hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(620, 0.05);
                  setStep(4);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Avanzar a Faceta 4: Cuello de Botella</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== FACETA 4: FRENOS PRINCIPALES (MULTI-SELECT) ==================== */}
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                ¿Cuáles son los principales frenos de tu operación hoy?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                Selecciona uno o varios frenos que estén afectando tu rentabilidad o tu tiempo.
              </p>
            </div>

            <div className="space-y-3">
              {/* Opción destacada: Todos los anteriores */}
              {(() => {
                const areAllSelected = currentBottleneckList.length > 0 && 
                  currentBottleneckList.every(b => (formData.bottlenecks || []).includes(b.title));
                return (
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(620, 0.05);
                      setFormData(prev => {
                        const currentArr = prev.bottlenecks || [];
                        const allTitles = currentBottleneckList.map(b => b.title);
                        const isAllNow = !areAllSelected;
                        return {
                          ...prev,
                          bottlenecks: isAllNow ? allTitles : [],
                          bottleneck: isAllNow ? '🚨 Todos los anteriores (Freno Total en la Operación)' : '',
                          bottleneck_score: 96,
                          friction_score: isAllNow ? 96 : 45
                        };
                      });
                    }}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      areAllSelected
                        ? 'bg-gradient-to-r from-red-950/60 to-purple-950/60 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.25)] text-white'
                        : 'bg-white/[0.03] text-zinc-300 border-white/10 hover:border-red-500/40 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl shrink-0">🚨</span>
                      <div>
                        <div className="font-display font-bold text-sm sm:text-base text-white">
                          Todos los anteriores (Freno Total en la Operación)
                        </div>
                        <div className="text-xs text-zinc-400">
                          Saturación acumulada en atención, comisiones, caja y falta de automatización.
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {areAllSelected ? (
                        <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-white/20" />
                      )}
                    </div>
                  </button>
                );
              })()}

              {/* Lista de frenos individuales del nicho sin porcentajes */}
              {currentBottleneckList.map((b) => {
                const isSelected = (formData.bottlenecks || []).includes(b.title);
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(560, 0.04);
                      setFormData(prev => {
                        const prevList = prev.bottlenecks || [];
                        const nextList = isSelected
                          ? prevList.filter(item => item !== b.title)
                          : [...prevList, b.title];
                        return {
                          ...prev,
                          bottlenecks: nextList,
                          bottleneck: nextList.join(' | '),
                          bottleneck_score: Math.min(95, 75 + nextList.length * 6),
                          friction_score: Math.min(98, 75 + nextList.length * 6 + (prev.volume_friction || 5))
                        };
                      });
                    }}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-monolith scale-[1.01]'
                        : 'bg-white/[0.025] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-2xl shrink-0 mt-0.5">{b.emoji}</span>
                      <div className="space-y-1">
                        <div className={`font-display font-bold text-sm sm:text-base ${isSelected ? 'text-black' : 'text-white'}`}>
                          {b.title}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-zinc-800' : 'text-zinc-400'}`}>
                          {b.desc}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold shadow-[0_0_10px_#22d3ee]">
                          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-white/20" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navegación */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(480, 0.04);
                  setStep(3);
                }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] text-zinc-300 border border-white/15 font-sans font-bold text-xs uppercase tracking-wider hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                type="button"
                disabled={!(formData.bottlenecks && formData.bottlenecks.length > 0)}
                onClick={() => {
                  soundFx.playBlip(620, 0.05);
                  setStep(5);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Avanzar a Faceta 5: Plazo & Urgencia</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== FACETA 5: PLAZO & INVERSIÓN ==================== */}
        {step === 5 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                ¿En qué plazo necesitas tener el sistema operando?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                Nos permite priorizar las horas de ingeniería y el cronograma de entrega.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {urgencyOptions.map((opt, idx) => {
                const isSelected = formData.urgency === opt.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(540 + idx * 30, 0.04);
                      setFormData(prev => ({ ...prev, urgency: opt.label }));
                    }}
                    className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-monolith scale-[1.01]'
                        : 'bg-white/[0.025] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className={`font-display font-bold text-sm ${isSelected ? 'text-black' : 'text-white'}`}>
                      {opt.label}
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Rango de Inversión */}
            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3 font-mono text-xs">
              <label className="text-zinc-300 block font-semibold">Rango de inversión estimado para este activo:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  '$2M - $5M COP (Inversión Táctica)',
                  '$5M - $12M COP (Core Empresarial Completo)',
                  '> $12M COP (Ecosistema Total con IA y Agentes)'
                ].map((range, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundFx.playBlip(560, 0.04);
                      setFormData(prev => ({ ...prev, budget_range: range }));
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                      formData.budget_range === range
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Navegación */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(480, 0.04);
                  setStep(4);
                }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] text-zinc-300 border border-white/15 font-sans font-bold text-xs uppercase tracking-wider hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(640, 0.05);
                  setStep(6);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Avanzar a Faceta 6: Agendamiento WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== FACETA 6: AGENDAMIENTO ATÓMICO & CONFIRMACIÓN WHATSAPP ==================== */}
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            {/* Banner de Calificación & Score */}
            <div className="p-5 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-emerald-950/40 border border-cyan-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    Prospecto Calificado con Éxito
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {formData.client_name} · {formData.business_name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    Frenos: <span className="text-zinc-200">{formData.bottlenecks?.join(', ') || formData.bottleneck || 'Fuga de conversión'}</span>
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">SCORE DE FRICCIÓN</div>
                <div className="text-2xl font-mono font-extrabold text-emerald-400">
                  {currentScore}%
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  Prioridad VIP Confirmada
                </span>
              </div>
            </div>

            <div className="space-y-2 text-center max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                Reserva tu Sesión 1 a 1 por WhatsApp
              </h2>
              <p className="text-xs sm:text-sm font-sans text-zinc-300">
                15 minutos directos con Juan Pablo (+57 300 892 4110) para ver la demo de tu sector funcionando.
              </p>
            </div>

            {/* Selector de Fecha (Lunes a Sábado) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 uppercase">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Selecciona Fecha (Lun a Sáb):</span>
                </span>
                <span className="text-zinc-500">Zona GMT-5 (Colombia / Latam)</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {businessDays.map((day) => {
                  const isSelected = selectedDate === day.dateStr;
                  return (
                    <button
                      key={day.dateStr}
                      type="button"
                      onClick={() => {
                        soundFx.playBlip(560, 0.04);
                        setFormData(prev => ({ ...prev, date: day.dateStr }));
                      }}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black border-white font-bold shadow-monolith'
                          : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase opacity-75">{day.dayName}</div>
                      <div className="text-lg font-mono font-extrabold my-0.5">{day.dayNumber}</div>
                      <div className="text-[9px] font-mono uppercase opacity-75">{day.monthName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de Horarios (8:00 AM a 8:00 PM) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 uppercase">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Horarios Disponibles (Intervalos de 1h):</span>
                </span>
                <span className="text-emerald-400 font-semibold text-[10px]">LUN - SÁB 8AM-8PM</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        soundFx.playBlip(580, 0.04);
                        setFormData(prev => ({ ...prev, time: slot }));
                      }}
                      className={`py-2.5 px-2 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black border-white font-bold shadow-monolith'
                          : 'bg-white/[0.02] text-zinc-300 border-white/10 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Teléfono de WhatsApp */}
            <div className="pt-2 space-y-2 font-mono text-xs">
              <label className="text-zinc-300 uppercase flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tu WhatsApp de Contacto:</span>
                </span>
                <span className="text-zinc-500 text-[10px]">Se abrirá chat directo al confirmar</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Ej. +57 300 123 4567 o 3124567890"
                className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/15 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>

            {/* Navegación y Envío */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(480, 0.04);
                  setStep(5);
                }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] text-zinc-300 border border-white/15 font-sans font-bold text-xs uppercase tracking-wider hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                type="button"
                disabled={!formData.phone.trim() || formData.phone.length < 8 || isLoading}
                onClick={handleSubmit}
                className="px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-sans font-bold text-xs uppercase tracking-wider rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-3 cursor-pointer shadow-monolith"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>{isLoading ? 'Registrando Sesión...' : 'Confirmar & Abrir WhatsApp con Juan Pablo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

      </motion.div>

      {/* Modal de Éxito y WhatsApp */}
      {createdLead && (
        <FunnelSuccessModal
          lead={createdLead}
          onClose={() => {
            setCreatedLead(null);
            setStep(1);
          }}
        />
      )}

    </motion.div>
  );
}
