import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLeads } from '../../context/LeadContext';
import { 
  Layers, Sparkles, CheckCircle2, Clock, Calendar, ArrowRight, 
  ExternalLink, Phone, Video, Plus, Trash2, Image, Award, AlertTriangle, 
  FileText, ShieldCheck, DollarSign, X, Check, Eye, XCircle, MessageSquare,
  Ban, HelpCircle, BarChart2, Filter, Search, ChevronRight
} from 'lucide-react';

const DEMO_PHASES = [
  '1. Extracción de Marca & Auditoría Web',
  '2. Dirección de Arte & Brandkit',
  '3. Capa 1 Core PMS & Caja Arqueo Ciego',
  '4. Frontoffice Dinámico Multi-Página',
  '5. Cinemática 60 FPS & Motion',
  '6. Depuración de Mano Derecha (0 Fallas)'
];

const OBJECTION_CATEGORIES = [
  { id: 'PRECIO', label: '💰 Precio / Presupuesto Alto', color: 'bg-red-950/60 border-red-500/50 text-red-300' },
  { id: 'TIEMPO', label: '⏳ No es el Momento / Posponer', color: 'bg-amber-950/60 border-amber-500/50 text-amber-300' },
  { id: 'TERCERO', label: '👥 Socio / Gerencia no Aprobó', color: 'bg-purple-950/60 border-purple-500/50 text-purple-300' },
  { id: 'COMPETENCIA', label: '🤝 Prefiere Seguir con Agregadores/Actual', color: 'bg-blue-950/60 border-blue-500/50 text-blue-300' },
  { id: 'COMPLEJIDAD', label: '🧩 Percibió el Software Complejo', color: 'bg-orange-950/60 border-orange-500/50 text-orange-300' },
  { id: 'OTRO', label: '📝 Otra Objeción', color: 'bg-zinc-800/60 border-zinc-600/50 text-zinc-300' },
];

export default function DemoFactoryView() {
  const { 
    leads, 
    objections, 
    updateLead, 
    updateLeadStatus, 
    cancelDemoProduction, 
    recordDemoSold, 
    recordDemoRejected,
    deleteObjection 
  } = useLeads();

  // Vista principal: 'FACTORY' (Fábrica de Demos) o 'OBJECTIONS' (Historial de Objeciones)
  const [activeMainTab, setActiveMainTab] = useState('FACTORY');

  // Filtros en la Fábrica
  const [factoryFilter, setFactoryFilter] = useState('ALL'); // 'ALL' | 'pendiente_decision' | 'en_construccion' | 'demo_finalizada' | 'cliente_cerrado' | 'no_vendido'

  // Estados de Modales
  const [previewImage, setPreviewImage] = useState(null);
  const [closingLeadId, setClosingLeadId] = useState(null);
  const [rejectingLeadId, setRejectingLeadId] = useState(null);
  const [cancelingLeadId, setCancelingLeadId] = useState(null);
  const [cancelReasonInput, setCancelReasonInput] = useState('');

  // Autorización con Clave Admin para Iniciar Demo
  const [authorizingStartLead, setAuthorizingStartLead] = useState(null);
  const [adminKeyForStart, setAdminKeyForStart] = useState('');
  const [startError, setStartError] = useState('');

  // Autorización con Clave Admin para Descartar Cliente
  const [authorizingDiscardLead, setAuthorizingDiscardLead] = useState(null);
  const [adminKeyForDiscard, setAdminKeyForDiscard] = useState('');
  const [discardReason, setDiscardReason] = useState('');
  const [discardError, setDiscardError] = useState('');

  // Formulario Cierre Exitoso
  const [dealAmountInput, setDealAmountInput] = useState('$4,500,000 COP');
  const [dealNotesInput, setDealNotesInput] = useState('Contrato de desarrollo de software cerrado con anticipo 50%.');

  // Formulario Registro de Objeción (No se Vendió)
  const [objectionCategory, setObjectionCategory] = useState('PRECIO');
  const [objectionDetail, setObjectionDetail] = useState('');
  const [objectionLearning, setObjectionLearning] = useState('');

  // Filtros del Historial de Objeciones
  const [objectionSearch, setObjectionSearch] = useState('');
  const [objectionCategoryFilter, setObjectionCategoryFilter] = useState('ALL');

  // Galería de imágenes en demo
  const [newImageUrl, setNewImageUrl] = useState('');
  const [activeImageLeadId, setActiveImageLeadId] = useState(null);

  // ---------------------------------------------------------------------------
  // 1. REGLA ESTRICTA DE ADMISIÓN A LA FÁBRICA DE DEMOS:
  // Solo entran prospectos cuya reunión ya fue realizada (status === 'finalizada' o histórico 'demo_realizada')
  // O que ya cuenten con ciclo de demo activo ('en_construccion', 'demo_finalizada', 'cliente_cerrado', 'no_vendido', 'cancelada').
  // ¡Los leads agendados o confirmados aún no entran a la fábrica!
  // ---------------------------------------------------------------------------
  const factoryQualifiedLeads = leads.filter(l => {
    const isMeetingDone = l.status === 'finalizada' || l.status === 'demo_realizada';
    const hasActiveDemo = ['en_construccion', 'demo_finalizada', 'cliente_cerrado', 'no_vendido', 'cancelada'].includes(l.demo_status);
    return isMeetingDone || hasActiveDemo;
  });

  const filteredDemoLeads = factoryQualifiedLeads.filter(l => {
    const dStatus = l.demo_status || 'pendiente_decision';
    if (factoryFilter === 'ALL') return true;
    if (factoryFilter === 'pendiente_decision') {
      return !l.demo_status || l.demo_status === 'no_iniciada' || l.demo_status === 'pendiente_decision' || l.demo_status === 'cancelada';
    }
    return dStatus === factoryFilter;
  });

  // Acciones de Fábrica
  const handleStartDemo = (lead) => {
    updateLead(lead.id, {
      status: 'finalizada',
      demo_status: 'en_construccion',
      demo_progress: 25,
      demo_phase: DEMO_PHASES[0],
      demo_images: lead.demo_images?.length ? lead.demo_images : ['/proyectos/quimbayas.png'],
      demo_notes: lead.demo_notes || 'Reunión realizada. Iniciando construcción artesanal de demo con base en el cuello de botella detectado.'
    });
  };

  const handleConfirmStartWithKey = (e) => {
    e.preventDefault();
    setStartError('');
    const activePass = localStorage.getItem('dynamind_admin_pass') || '12345678';
    if (adminKeyForStart.trim() !== activePass.trim()) {
      setStartError('Contraseña de administrador incorrecta. No se autoriza el inicio de la demo.');
      return;
    }
    handleStartDemo(authorizingStartLead);
    setAuthorizingStartLead(null);
    setAdminKeyForStart('');
  };

  const handleConfirmDiscardWithKey = (e) => {
    e.preventDefault();
    setDiscardError('');
    const activePass = localStorage.getItem('dynamind_admin_pass') || '12345678';
    if (adminKeyForDiscard.trim() !== activePass.trim()) {
      setDiscardError('Contraseña de administrador incorrecta. Descarte no autorizado.');
      return;
    }
    if (!discardReason.trim()) {
      setDiscardError('Por favor ingresa un motivo de descarte.');
      return;
    }
    updateLead(authorizingDiscardLead.id, {
      status: 'descartada',
      demo_status: 'descartada',
      demo_notes: `Descartado tras reunión: ${discardReason.trim()}`
    });
    setAuthorizingDiscardLead(null);
    setAdminKeyForDiscard('');
    setDiscardReason('');
  };

  const handleUpdateProgress = (leadId, progress) => {
    const isCompleted = progress >= 100;
    updateLead(leadId, {
      demo_progress: progress,
      demo_status: isCompleted ? 'demo_finalizada' : 'en_construccion',
      demo_phase: isCompleted ? DEMO_PHASES[5] : (progress >= 75 ? DEMO_PHASES[3] : progress >= 50 ? DEMO_PHASES[2] : DEMO_PHASES[1])
    });

    if (isCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleCancelDemoSubmit = (e) => {
    e.preventDefault();
    if (!cancelingLeadId) return;
    cancelDemoProduction(cancelingLeadId, cancelReasonInput || 'Cancelada por el administrador');
    setCancelingLeadId(null);
    setCancelReasonInput('');
  };

  const handleCloseDealSubmit = (e) => {
    e.preventDefault();
    if (!closingLeadId) return;

    recordDemoSold(closingLeadId, {
      dealAmount: dealAmountInput,
      notes: dealNotesInput
    });

    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 }
    });

    setClosingLeadId(null);
  };

  const handleRejectDemoSubmit = (e) => {
    e.preventDefault();
    if (!rejectingLeadId) return;

    recordDemoRejected(rejectingLeadId, {
      category: objectionCategory,
      detail: objectionDetail,
      learning: objectionLearning
    });

    setRejectingLeadId(null);
    setObjectionDetail('');
    setObjectionLearning('');
  };

  const handleAddImage = (leadId) => {
    if (!newImageUrl.trim()) return;
    const currentLead = leads.find(l => l.id === leadId);
    const existing = currentLead?.demo_images || [];
    updateLead(leadId, {
      demo_images: [...existing, newImageUrl.trim()]
    });
    setNewImageUrl('');
    setActiveImageLeadId(null);
  };

  const handleRemoveImage = (leadId, imgIndex) => {
    const currentLead = leads.find(l => l.id === leadId);
    const existing = currentLead?.demo_images || [];
    updateLead(leadId, {
      demo_images: existing.filter((_, idx) => idx !== imgIndex)
    });
  };

  // Contadores para insignias
  const pendingDecisionCount = factoryQualifiedLeads.filter(l => !l.demo_status || l.demo_status === 'no_iniciada' || l.demo_status === 'pendiente_decision' || l.demo_status === 'cancelada').length;
  const inConstructionCount = factoryQualifiedLeads.filter(l => l.demo_status === 'en_construccion').length;
  const finalizedCount = factoryQualifiedLeads.filter(l => l.demo_status === 'demo_finalizada').length;
  const closedCount = factoryQualifiedLeads.filter(l => l.demo_status === 'cliente_cerrado' || l.status === 'cerrada').length;
  const notSoldCount = factoryQualifiedLeads.filter(l => l.demo_status === 'no_vendido').length;

  // Filtrado de Objeciones
  const filteredObjections = (objections || []).filter(obj => {
    const matchesSearch = 
      obj.client_name?.toLowerCase().includes(objectionSearch.toLowerCase()) ||
      obj.business_name?.toLowerCase().includes(objectionSearch.toLowerCase()) ||
      obj.detail?.toLowerCase().includes(objectionSearch.toLowerCase()) ||
      obj.actionable_learning?.toLowerCase().includes(objectionSearch.toLowerCase());
    
    const matchesCategory = objectionCategoryFilter === 'ALL' || obj.category === objectionCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 font-mono">
      
      {/* ========================================================================= */}
      {/* CABECERA & NAVEGACIÓN DUAL: FÁBRICA DE DEMOS vs HISTORIAL DE OBJECIONES   */}
      {/* ========================================================================= */}
      <div className="p-6 bg-gradient-to-r from-purple-950/20 via-black/40 to-cyan-950/20 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-md glow-card space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-purple-500/40 rounded-xl text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Layers className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CICLO DE PRODUCCIÓN & CIERRE // DEMO FACTORY</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Fábrica de Demos & Ciclo de Cierre Comercial
              </h2>
            </div>
          </div>

          {/* Selector de Pestañas Maestras */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveMainTab('FACTORY')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeMainTab === 'FACTORY'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>🏭 Fábrica de Demos</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {factoryQualifiedLeads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('OBJECTIONS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeMainTab === 'OBJECTIONS'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>📋 Historial de Objeciones</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {objections?.length || 0}
              </span>
            </button>
          </div>
        </div>

        {/* Barra de Filtros de la Fábrica (Solo visible en pestaña FACTORY) */}
        {activeMainTab === 'FACTORY' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFactoryFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  factoryFilter === 'ALL'
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                Todos ({factoryQualifiedLeads.length})
              </button>

              <button
                onClick={() => setFactoryFilter('pendiente_decision')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  factoryFilter === 'pendiente_decision'
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-white/[0.03] text-amber-400 border-white/10 hover:border-amber-400/40'
                }`}
              >
                <span>⚡ Por Decidir Demo ({pendingDecisionCount})</span>
              </button>

              <button
                onClick={() => setFactoryFilter('en_construccion')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  factoryFilter === 'en_construccion'
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-white/[0.03] text-cyan-400 border-white/10 hover:border-cyan-400/40'
                }`}
              >
                <span>🛠️ En Construcción ({inConstructionCount})</span>
              </button>

              <button
                onClick={() => setFactoryFilter('demo_finalizada')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  factoryFilter === 'demo_finalizada'
                    ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-white/[0.03] text-purple-400 border-white/10 hover:border-purple-400/40'
                }`}
              >
                <span>✨ Demos Listas ({finalizedCount})</span>
              </button>

              <button
                onClick={() => setFactoryFilter('cliente_cerrado')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  factoryFilter === 'cliente_cerrado'
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-white/[0.03] text-emerald-400 border-white/10 hover:border-emerald-400/40'
                }`}
              >
                <span>🏆 Vendidas ({closedCount})</span>
              </button>

              <button
                onClick={() => setFactoryFilter('no_vendido')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  factoryFilter === 'no_vendido'
                    ? 'bg-red-500 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'bg-white/[0.03] text-red-400 border-white/10 hover:border-red-400/40'
                }`}
              >
                <span>❌ No Vendidas ({notSoldCount})</span>
              </button>
            </div>

            <div className="text-[11px] text-zinc-400 font-mono">
              Filtro activo: <span className="text-white font-bold">{factoryFilter}</span>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: FÁBRICA DE DEMOS & CICLO DE CIERRE                              */}
      {/* ========================================================================= */}
      {activeMainTab === 'FACTORY' && (
        <div className="space-y-6">
          {filteredDemoLeads.length === 0 ? (
            <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/[0.01] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No hay proyectos en esta fase de la Fábrica</h3>
              <p className="text-xs text-zinc-400 font-sans max-w-md mx-auto">
                Los prospectos aparecen aquí automáticamente cuando su reunión es marcada como <strong>"Finalizada (Reunión Hecha)"</strong> en el Pipeline.
              </p>
            </div>
          ) : (
            filteredDemoLeads.map((lead) => {
              const status = lead.demo_status || 'pendiente_decision';
              const progress = lead.demo_progress || 0;
              const phase = lead.demo_phase || DEMO_PHASES[0];
              const images = lead.demo_images || [];

              return (
                <div 
                  key={lead.id} 
                  className={`p-6 rounded-2xl border transition-all space-y-6 relative overflow-hidden backdrop-blur-md ${
                    status === 'cliente_cerrado'
                      ? 'bg-emerald-950/15 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                      : status === 'no_vendido'
                      ? 'bg-red-950/15 border-red-500/30'
                      : (status === 'cancelada' || status === 'pendiente_decision' || status === 'no_iniciada')
                      ? 'bg-amber-950/15 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                      : status === 'demo_finalizada'
                      ? 'bg-purple-950/20 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.15)]'
                      : status === 'en_construccion'
                      ? 'bg-cyan-950/15 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                      : 'bg-amber-950/15 border-amber-500/30'
                  }`}
                >
                  {/* Encabezado del Prospecto */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{lead.client_name}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-cyan-300 font-bold text-sm">{lead.business_name}</span>
                        <span className="text-zinc-600 text-[10px]">({lead.niche})</span>
                      </div>
                      <div className="text-xs text-zinc-300 font-sans line-clamp-1 italic">
                        "{lead.bottleneck}"
                      </div>
                    </div>

                    {/* Insignia de Estado de la Demo */}
                    <div className="flex items-center gap-2 shrink-0">
                      {status === 'cliente_cerrado' && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                          <Check className="w-3.5 h-3.5" />
                          <span>VENTA CERRADA ({lead.deal_amount || '$4.5M'})</span>
                        </span>
                      )}

                      {status === 'no_vendido' && (
                        <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-500 text-red-300 text-xs font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" />
                          <span>NO SE VENDIÓ</span>
                        </span>
                      )}

                      {status === 'demo_finalizada' && (
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300 text-xs font-bold flex items-center gap-1 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>DEMO LISTA (100%)</span>
                        </span>
                      )}

                      {status === 'en_construccion' && (
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-1 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span>EN CONSTRUCCIÓN ({progress}%)</span>
                        </span>
                      )}

                      {(status === 'pendiente_decision' || status === 'no_iniciada' || status === 'cancelada') && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{lead.demo_cancel_reason ? 'DEMO CANCELADA · POR DECIDIR' : 'REUNIÓN HECHA · POR DECIDIR DEMO'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ------------------------------------------------------------------- */}
                  {/* FASE A: REUNIÓN REALIZADA -> DECIDIR SI HACER O NO LA DEMO         */}
                  {/* ------------------------------------------------------------------- */}
                  {(status === 'pendiente_decision' || status === 'no_iniciada' || status === 'cancelada') && (
                    <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-4">
                      {lead.demo_cancel_reason && (
                        <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                            <span>Demo cancelada anteriormente: <strong className="text-white">"{lead.demo_cancel_reason}"</strong></span>
                          </div>
                          <span className="text-[10px] text-amber-400/80 font-mono">Puedes iniciarla de nuevo o descartar al cliente</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-amber-200 uppercase flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-400" />
                            <span>{lead.demo_cancel_reason ? 'Demo cancelada previamente. ¿Reiniciar o Descartar?' : 'La reunión ya fue realizada con este cliente. ¿Avanzar a Demo?'}</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-sans">
                            Al iniciar la demo, el prospecto se bloquea en el Pipeline para proteger la integridad del desarrollo.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setAuthorizingStartLead(lead);
                              setAdminKeyForStart('');
                              setStartError('');
                            }}
                            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>🚀 Iniciar Demo (Requiere Clave Admin)</span>
                          </button>

                          <button
                            onClick={() => {
                              setAuthorizingDiscardLead(lead);
                              setAdminKeyForDiscard('');
                              setDiscardReason('No cuenta con presupuesto para desarrollo de software en este momento.');
                              setDiscardError('');
                            }}
                            className="px-3.5 py-2.5 bg-white/5 hover:bg-red-950/40 text-zinc-400 hover:text-red-300 border border-white/10 hover:border-red-500/40 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
                          >
                            <span>Descartar Cliente</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------------- */}
                  {/* FASE B: DEMO EN CONSTRUCCIÓN (Progreso, Fases, Fotos y Cancelar)    */}
                  {/* ------------------------------------------------------------------- */}
                  {(status === 'en_construccion' || status === 'demo_finalizada') && (
                    <div className="space-y-5">
                      
                      {/* Barra de Progreso & Cancelación de Demo */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400 font-bold uppercase flex items-center gap-2">
                            <span>Avance de la Demo:</span>
                            <span className="text-cyan-400 font-mono text-sm">{progress}%</span>
                            <span className="text-zinc-500 font-normal">({phase})</span>
                          </span>

                          {/* Botón para CANCELAR PRODUCCIÓN DE DEMO */}
                          {status === 'en_construccion' && (
                            <button
                              onClick={() => {
                                setCancelingLeadId(lead.id);
                                setCancelReasonInput('');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 text-red-300 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                              title="Detener la construcción y liberar el bloqueo del lead"
                            >
                              <Ban className="w-3 h-3 text-red-400" />
                              <span>🛑 Cancelar Producción de Demo</span>
                            </button>
                          )}
                        </div>

                        {/* Barra animada */}
                        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              progress >= 100 
                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_15px_#10b981]' 
                                : 'bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_10px_#06b6d4]'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        {/* Selectores de Progreso Rápido */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {[25, 50, 75, 90, 100].map((step) => (
                            <button
                              key={step}
                              onClick={() => handleUpdateProgress(lead.id, step)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                progress === step
                                  ? 'bg-cyan-500 text-black shadow-md'
                                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {step}%
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Selector de Fases */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {DEMO_PHASES.map((pName, pIdx) => {
                          const isCurrent = phase === pName;
                          return (
                            <button
                              key={pIdx}
                              onClick={() => updateLead(lead.id, { demo_phase: pName })}
                              className={`p-2.5 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-cyan-950/40 border-cyan-400/60 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                                  : 'bg-white/[0.015] border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                              }`}
                            >
                              <span className="line-clamp-1">{pName}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Galería de Capturas / Imágenes de la Demo */}
                      <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                            <Image className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Capturas & Renders de la Demo ({images.length})</span>
                          </div>
                          <button
                            onClick={() => setActiveImageLeadId(activeImageLeadId === lead.id ? null : lead.id)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400 text-cyan-300 font-bold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Agregar Imagen</span>
                          </button>
                        </div>

                        {activeImageLeadId === lead.id && (
                          <div className="flex items-center gap-2 pt-1 animate-in fade-in duration-200">
                            <input
                              type="text"
                              value={newImageUrl}
                              onChange={(e) => setNewImageUrl(e.target.value)}
                              placeholder="URL o ruta de la imagen (/proyectos/... o https://...)"
                              className="flex-1 px-3 py-1.5 bg-black border border-white/20 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                            />
                            <button
                              onClick={() => handleAddImage(lead.id)}
                              className="px-3 py-1.5 bg-cyan-500 text-black font-bold text-xs rounded-lg cursor-pointer"
                            >
                              Guardar
                            </button>
                          </div>
                        )}

                        {images.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
                            {images.map((imgSrc, imgIdx) => (
                              <div key={imgIdx} className="relative group rounded-lg overflow-hidden border border-white/15 aspect-video bg-black/60">
                                <img 
                                  src={imgSrc} 
                                  alt={`Captura ${imgIdx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform cursor-pointer"
                                  onClick={() => setPreviewImage(imgSrc)}
                                />
                                <button
                                  onClick={() => handleRemoveImage(lead.id, imgIdx)}
                                  className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Eliminar captura"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[11px] text-zinc-500 italic">
                            No hay capturas adjuntas aún. Añade capturas de pantalla para mostrar el avance del proyecto.
                          </div>
                        )}
                      </div>

                      {/* Notas Técnicas */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 uppercase font-bold block">Notas Técnicas del Proyecto:</label>
                        <textarea
                          rows={2}
                          value={lead.demo_notes || ''}
                          onChange={(e) => updateLead(lead.id, { demo_notes: e.target.value })}
                          placeholder="Anotaciones sobre módulos, tarifas, credenciales o cuellos de botella acordados..."
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 font-sans leading-relaxed resize-none"
                        />
                      </div>

                    </div>
                  )}

                  {/* ------------------------------------------------------------------- */}
                  {/* FASE C: DEMO TERMINADA -> DECISIÓN FINAL: ¿SE VENDIÓ O NO SE VENDIÓ?*/}
                  {/* ------------------------------------------------------------------- */}
                  {(status === 'demo_finalizada' || progress >= 100) && status !== 'cliente_cerrado' && status !== 'no_vendido' && (
                    <div className="p-5 bg-gradient-to-r from-purple-950/40 via-black/60 to-cyan-950/40 border border-purple-500/40 rounded-xl space-y-4 animate-in fade-in duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Demostración Concluida · Decisión Final de Venta</span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-sans">
                          Presenta la demo al cliente y registra el desenlace comercial
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Opción 1: SE VENDIÓ */}
                        <button
                          onClick={() => {
                            setClosingLeadId(lead.id);
                            setDealAmountInput('$4,500,000 COP');
                            setDealNotesInput(`Venta de software cerrado para ${lead.business_name}. Anticipo pactado.`);
                          }}
                          className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer hover:scale-[1.01]"
                        >
                          <Check className="w-4 h-4" />
                          <span>🎉 Se Vendió (Cierre de Contrato)</span>
                        </button>

                        {/* Opción 2: NO SE VENDIÓ (Registrar Objeciones) */}
                        <button
                          onClick={() => {
                            setRejectingLeadId(lead.id);
                            setObjectionCategory('PRECIO');
                            setObjectionDetail('');
                            setObjectionLearning('');
                          }}
                          className="p-4 bg-gradient-to-r from-red-950/60 to-zinc-900 border border-red-800/80 hover:border-red-500 text-red-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-[1.01]"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span>❌ No se Vendió (Registrar Objeciones)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------------------------- */}
                  {/* FASE D: SI NO SE VENDIÓ -> MOSTRAR OBJECIÓN REGISTRADA             */}
                  {/* ------------------------------------------------------------------- */}
                  {status === 'no_vendido' && lead.rejection_objection && (
                    <div className="p-4 bg-red-950/30 border border-red-800/50 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between text-red-300 font-bold uppercase">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span>Objeción del Cliente Registrada:</span>
                        </div>
                        <span className="px-2 py-0.5 bg-red-900/60 rounded text-[10px] text-red-200">
                          {lead.rejection_objection.category}
                        </span>
                      </div>
                      <p className="text-zinc-200 font-sans italic pl-6">
                        "{lead.rejection_objection.detail}"
                      </p>
                      {lead.rejection_objection.actionable_learning && (
                        <div className="pl-6 pt-1 text-[11px] text-zinc-400">
                          <strong className="text-cyan-300">Aprendizaje para la próxima demo:</strong> {lead.rejection_objection.actionable_learning}
                        </div>
                      )}
                    </div>
                  )}



                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: HISTORIAL & CONTROL DE OBJECIONES DE CLIENTES                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'OBJECTIONS' && (
        <div className="space-y-6">
          
          {/* Métricas y Filtros del Historial */}
          <div className="p-6 bg-black/40 border border-white/10 rounded-2xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  <span>Bitácora de Objeciones & Aprendizaje Continuo</span>
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Monitorea las causas por las que un cliente no cerró y afina los discursos y arquitectura de las próximas demos.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400">Total Casos Registrados:</span>
                <span className="px-3 py-1 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-bold font-mono">
                  {objections?.length || 0}
                </span>
              </div>
            </div>

            {/* Buscador & Categorías */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={objectionSearch}
                  onChange={(e) => setObjectionSearch(e.target.value)}
                  placeholder="Buscar por cliente, empresa u objeción..."
                  className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Filtro por Categoría de Objeción */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setObjectionCategoryFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    objectionCategoryFilter === 'ALL'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                {OBJECTION_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setObjectionCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      objectionCategoryFilter === cat.id
                        ? `${cat.color} border`
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Listado de Tarjetas de Objeción */}
          {filteredObjections.length === 0 ? (
            <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/[0.01] space-y-2">
              <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No hay objeciones con este filtro</h4>
              <p className="text-xs text-zinc-500 font-sans">
                Cuando una demo finalice sin venta, registra la objeción para que aparezca aquí.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredObjections.map((obj) => {
                const catObj = OBJECTION_CATEGORIES.find(c => c.id === obj.category) || OBJECTION_CATEGORIES[5];

                return (
                  <div 
                    key={obj.id} 
                    className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 relative overflow-hidden backdrop-blur-md hover:border-white/20 transition-all glow-card"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="text-sm font-bold text-white">{obj.client_name}</div>
                        <div className="text-xs text-zinc-400">{obj.business_name} · <span className="text-zinc-500">{obj.niche}</span></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${catObj.color}`}>
                          {catObj.id}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm('¿Eliminar este registro de objeción?')) {
                              deleteObjection(obj.id);
                            }
                          }}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          title="Eliminar registro"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Objeción Manifestada:</div>
                      <p className="text-xs text-zinc-200 font-sans leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        "{obj.detail}"
                      </p>
                    </div>

                    {obj.actionable_learning && (
                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Lección / Ajuste para Próximas Demos:</div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/20">
                          {obj.actionable_learning}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-white/5">
                      <span>Registrada el: {obj.date}</span>
                      <span>Dynamind Objections Engine</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: REGISTRAR CIERRE EXITOSO (SE VENDIÓ)                              */}
      {/* ========================================================================= */}
      {closingLeadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#070b14] border border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-[0_0_50px_rgba(16,185,129,0.25)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Registrar Cierre Exitoso de Contrato</span>
              </div>
              <button 
                onClick={() => setClosingLeadId(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCloseDealSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Valor del Contrato Pactado:</label>
                <input
                  type="text"
                  required
                  value={dealAmountInput}
                  onChange={(e) => setDealAmountInput(e.target.value)}
                  placeholder="ej. $4,500,000 COP o $1,200 USD"
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Términos o Notas de Cierre:</label>
                <textarea
                  rows={3}
                  value={dealNotesInput}
                  onChange={(e) => setDealNotesInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-zinc-200 focus:outline-none focus:border-emerald-400 font-sans leading-relaxed resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setClosingLeadId(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Award className="w-4 h-4" />
                  <span>Celebrar y Guardar Venta 🎉</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REGISTRAR OBJECIONES (NO SE VENDIÓ)                              */}
      {/* ========================================================================= */}
      {rejectingLeadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0c080d] border border-red-500/40 rounded-2xl p-6 space-y-5 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                <XCircle className="w-4 h-4 text-red-400" />
                <span>Registrar Objeciones del Cliente (No Vendido)</span>
              </div>
              <button 
                onClick={() => setRejectingLeadId(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRejectDemoSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Categoría Principal de la Objeción:</label>
                <select
                  value={objectionCategory}
                  onChange={(e) => setObjectionCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-red-400"
                >
                  {OBJECTION_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">
                  ¿Cuáles fueron las objeciones exactas que dijo el cliente? <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={objectionDetail}
                  onChange={(e) => setObjectionDetail(e.target.value)}
                  placeholder="ej. Dijo que actualmente sus ventas bajaron y prefiere esperar al siguiente trimestre; además su socio prefiere seguir con WhatsApp..."
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-zinc-200 focus:outline-none focus:border-red-400 font-sans leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">
                  Lección Aprendida / Ajuste Táctico para Próximas Demos:
                </label>
                <textarea
                  rows={2}
                  value={objectionLearning}
                  onChange={(e) => setObjectionLearning(e.target.value)}
                  placeholder="ej. En próximas ocasiones, solicitar que el socio esté presente en la llamada de demo o preparar opción de pago diferido..."
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-zinc-200 focus:outline-none focus:border-red-400 font-sans leading-relaxed resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingLeadId(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Guardar en Historial de Objeciones</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CONFIRMAR CANCELACIÓN DE DEMO                                     */}
      {/* ========================================================================= */}
      {cancelingLeadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0e0708] border border-red-700/60 rounded-2xl p-6 space-y-5 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-red-300 uppercase">
                <Ban className="w-4 h-4 text-red-400" />
                <span>Cancelar Producción de Demo</span>
              </div>
              <button 
                onClick={() => setCancelingLeadId(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCancelDemoSubmit} className="space-y-4 text-xs">
              <p className="text-zinc-300 font-sans">
                ¿Estás seguro de cancelar la construcción de esta demo? Se detendrá el avance y se liberará el bloqueo del prospecto en el Pipeline.
              </p>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Motivo de la Cancelación:</label>
                <input
                  type="text"
                  required
                  value={cancelReasonInput}
                  onChange={(e) => setCancelReasonInput(e.target.value)}
                  placeholder="ej. El cliente solicitó pausar el requerimiento..."
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelingLeadId(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 rounded-xl font-bold cursor-pointer"
                >
                  Volver Atrás
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Ban className="w-4 h-4" />
                  <span>Confirmar Cancelación</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: VISTA PREVIA DE CAPTURAS EN HD                                   */}
      {/* ========================================================================= */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img 
              src={previewImage} 
              alt="Vista previa HD"
              className="w-full h-auto max-h-[85vh] object-contain" 
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-white text-white hover:text-black rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CONFIRMACIÓN CON CLAVE ADMIN PARA INICIAR DEMO                   */}
      {/* ========================================================================= */}
      {authorizingStartLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#070b14] border border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Autorizar Inicio de Demo</span>
              </div>
              <button 
                onClick={() => setAuthorizingStartLead(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmStartWithKey} className="space-y-4 text-xs">
              <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl space-y-1">
                <div className="font-bold text-cyan-300">{authorizingStartLead.client_name} · {authorizingStartLead.business_name}</div>
                <div className="text-[11px] text-zinc-400 font-sans">
                  Esta acción bloqueará el estado en el Pipeline y destinará capacidad de desarrollo para construir la demo.
                </div>
              </div>

              {startError && (
                <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{startError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contraseña de Administrador Requerida:</span>
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminKeyForStart}
                  onChange={(e) => setAdminKeyForStart(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthorizingStartLead(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Validar e Iniciar Demo 🚀</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: CONFIRMACIÓN CON CLAVE ADMIN PARA DESCARTAR CLIENTE              */}
      {/* ========================================================================= */}
      {authorizingDiscardLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0e0708] border border-red-700/60 rounded-2xl p-6 space-y-5 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-red-300 uppercase">
                <Ban className="w-4 h-4 text-red-400" />
                <span>Autorizar Descarte de Cliente</span>
              </div>
              <button 
                onClick={() => setAuthorizingDiscardLead(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmDiscardWithKey} className="space-y-4 text-xs">
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl space-y-1">
                <div className="font-bold text-red-200">{authorizingDiscardLead.client_name} · {authorizingDiscardLead.business_name}</div>
                <div className="text-[11px] text-zinc-400 font-sans">
                  El cliente será marcado como descartado y no se desarrollará demostración.
                </div>
              </div>

              {discardError && (
                <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{discardError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">
                  Motivo de Descarte:
                </label>
                <input
                  type="text"
                  required
                  value={discardReason}
                  onChange={(e) => setDiscardReason(e.target.value)}
                  placeholder="ej. No tiene presupuesto para software en este momento..."
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Contraseña de Administrador Requerida:</span>
                </label>
                <input
                  type="password"
                  required
                  value={adminKeyForDiscard}
                  onChange={(e) => setAdminKeyForDiscard(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-black border border-white/20 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthorizingDiscardLead(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Ban className="w-4 h-4" />
                  <span>Confirmar Descarte</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
