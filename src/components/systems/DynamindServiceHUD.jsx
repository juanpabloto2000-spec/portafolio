// src/components/systems/DynamindServiceHUD.jsx
// Panel holográfico ultra-limpio del servicio seleccionado en La Galaxia Dynamind.
// Libre de datos astronómicos: Enfocado 100% en cuellos de botella D0, pipeline, capacidades, conversión y ROI.

import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Sun,
  LayoutDashboard,
  Hotel,
  Calculator,
  UtensilsCrossed,
  CreditCard,
  Package,
  MessageSquare,
  TrendingUp,
  FileSignature,
  Eye,
  Mic,
  Workflow,
  FileText,
  ShieldAlert,
  Bell,
  Receipt,
  Database,
  Orbit,
  DollarSign,
  Play,
  ExternalLink,
  Zap,
  BarChart3,
} from "lucide-react";
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playTap, playSuccess } from "../../utils/audioEffects";

const ICON_MAP = {
  Sun,
  LayoutDashboard,
  Hotel,
  Calculator,
  UtensilsCrossed,
  CreditCard,
  Package,
  MessageSquare,
  TrendingUp,
  FileSignature,
  Eye,
  Mic,
  Workflow,
  FileText,
  ShieldAlert,
  Bell,
  Receipt,
  Database,
  Orbit,
};

// Demos reales y accesos interactivos asignados a sistemas clave
const DEMO_REGISTRY = {
  "srv-core": {
    url: "/#/dsb",
    isExternal: false,
    label: "Probar Core DSB en Vivo",
    badge: "Acceso Inmediato",
    hint: "Usuario: admin | Clave: 12345678",
  },
  "srv-dsb": {
    url: "/#/dsb",
    isExternal: false,
    label: "Probar Core DSB en Vivo",
    badge: "Acceso Inmediato",
    hint: "Usuario: admin | Clave: 12345678",
  },
  "srv-pms": {
    url: "https://andicas.vercel.app/#/",
    isExternal: true,
    label: "Ver Plataforma Hotel & Ecoparque",
    badge: "Obra en Producción",
    hint: "Plataforma real operando con reservas",
  },
  "srv-caja": {
    url: "/#/dsb",
    isExternal: false,
    label: "Probar Módulo de Caja & Arqueo Ciego",
    badge: "Demo Táctico",
    hint: "Simula turnos y calculadora de billetes",
  },
  "srv-kds": {
    url: "https://menupremium.netlify.app/",
    isExternal: true,
    label: "Ver Menú Táctil & KDS en Vivo",
    badge: "Obra en Producción",
    hint: "Experiencia comensal sin apps externas",
  },
  "srv-reservas": {
    url: "https://andicas.vercel.app/#/",
    isExternal: true,
    label: "Ver Pasarela de Reservas Directas",
    badge: "Obra en Producción",
    hint: "Motor de pagos sin comisión del 20%",
  },
  "srv-whatsapp": {
    url: "/#/diagnostico",
    isExternal: false,
    label: "Probar Escáner & Agente en Vivo",
    badge: "Demo Táctico",
    hint: "Atención autónoma inmediata a 8s",
  },
};

// Configuración de modelos de ROI por nicho de servicio
function getROIProfile(service) {
  const id = service.id;
  const cat = service.category;

  if (id === "srv-pms" || id === "srv-reservas") {
    return {
      type: "hotel",
      label: "¿Cuántas cabañas o habitaciones gestionas?",
      options: [4, 8, 12, 20, 32],
      unit: "cabañas",
      calculate: (qty) => {
        const monthlySaas = qty * 45000 + 350000; // Cloudbeds/Sirvoy base
        const monthlyOtaLoss = qty * 380000; // ~18% comisiones Booking/Airbnb
        const totalMonthlyLost = monthlySaas + monthlyOtaLoss;
        const annualSaved = totalMonthlyLost * 12;
        return {
          monthlyLost: totalMonthlyLost,
          annualSaved,
          headline: `Ahorras ~$${(annualSaved / 1000000).toFixed(1)}M COP / año`,
          breakdown: `Erradicas $${(monthlySaas / 1000).toLocaleString("es-CO")}k COP/mes de software y proteges $${(monthlyOtaLoss / 1000).toLocaleString("es-CO")}k COP/mes en comisiones directas.`,
        };
      },
    };
  }

  if (id === "srv-kds" || id === "srv-caja") {
    return {
      type: "gastro",
      label: "¿Cuántos pedidos o comandas procesas al mes?",
      options: [400, 1000, 2200, 4500],
      unit: "pedidos/mes",
      calculate: (qty) => {
        const monthlyComm = qty * 1800; // comisiones de plataformas tipo Cluvi/Toast
        const monthlySaas = 280000; // suscripción fija
        const totalMonthlyLost = monthlyComm + monthlySaas;
        const annualSaved = totalMonthlyLost * 12;
        return {
          monthlyLost: totalMonthlyLost,
          annualSaved,
          headline: `Ahorras ~$${(annualSaved / 1000000).toFixed(1)}M COP / año`,
          breakdown: `Eliminas el 2.5% de comisión por ticket y dejas de pagar $${(monthlySaas / 1000).toFixed(0)}k de mensualidad. Amortizado en 3 meses.`,
        };
      },
    };
  }

  if (id === "srv-whatsapp" || id === "srv-lead" || id === "srv-voice") {
    return {
      type: "leads",
      label: "¿Cuántas consultas o leads entran a tu canal al mes?",
      options: [150, 400, 900, 2000],
      unit: "prospectos/mes",
      calculate: (qty) => {
        const lostByDelay = Math.round(qty * 0.28); // 28% abandonan por respuesta >15min
        const recoveredSales = Math.round(lostByDelay * 0.35); // conversión de recuperados
        const monthlyValue = recoveredSales * 85000; // ticket estimado
        const annualSaved = monthlyValue * 12;
        return {
          monthlyLost: monthlyValue,
          annualSaved,
          headline: `Recuperas ~$${(annualSaved / 1000000).toFixed(1)}M COP / año`,
          breakdown: `Respondes en <8s 24/7. Rescatas ~${lostByDelay} prospectos que hoy se van con tu competencia por demora en WhatsApp.`,
        };
      },
    };
  }

  // Perfil por defecto: Horas operativas desperdiciadas
  return {
    type: "operations",
    label: "¿Cuántas horas semanales pierde tu equipo en tareas manuales?",
    options: [6, 14, 25, 40],
    unit: "horas/semana",
    calculate: (qty) => {
      const hoursPerMonth = qty * 4.3;
      const monthlyCost = hoursPerMonth * 32000; // costo hora nómina
      const annualSaved = monthlyCost * 12;
      return {
        monthlyLost: monthlyCost,
        annualSaved,
        headline: `Recuperas ${Math.round(qty * 52)} horas útiles / año`,
        breakdown: `Equivale a ~$${(annualSaved / 1000000).toFixed(1)}M COP de carga laboral redirigida a vender más en vez de cuadrar datos en Excel.`,
      };
    },
  };
}

export default function DynamindServiceHUD({
  selectedServiceId,
  onClose,
  onResetToGalaxy,
  onOpenConsultingModal,
}) {
  const service =
    GALAXY_SERVICES.find((s) => s.id === selectedServiceId) || GALAXY_SERVICES[0];

  const SrvIcon = ICON_MAP[service.iconName] || Orbit;
  const demo = DEMO_REGISTRY[service.id];

  // Pestaña activa: 'spec' (Ficha de Ingeniería) | 'roi' (Calculadora Anti-SaaS)
  const [activeTab, setActiveTab] = useState("spec");

  // Modelo de ROI y selector
  const roiProfile = getROIProfile(service);
  const [selectedOption, setSelectedOption] = useState(roiProfile.options[1] || roiProfile.options[0]);
  const roiCalculation = roiProfile.calculate(selectedOption);

  // Manejador de navegación hacia diagnóstico pre-cargado
  const handleProceedToConsulting = () => {
    playSuccess();
    try {
      sessionStorage.setItem("dynamind_preselected_service", service.id);
      sessionStorage.setItem("dynamind_preselected_service_name", service.name);
      sessionStorage.setItem("dynamind_calculated_savings", roiCalculation.headline);
    } catch (e) {
      // Ignorar en sandbox
    }

    if (onOpenConsultingModal) {
      onOpenConsultingModal(service);
    } else {
      window.location.hash = "#/diagnostico";
    }
  };

  return (
    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 w-[96%] sm:w-[440px] max-h-[calc(100%-5rem)] flex flex-col bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden animate-slide-up">
      {/* Cabecera Limpia del Servicio */}
      <div className="p-3.5 sm:p-4 border-b border-white/10 bg-gradient-to-r from-neutral-900/90 to-neutral-950 flex items-start justify-between relative overflow-hidden">
        {/* Halo de color del servicio */}
        <div
          className="absolute -top-10 -left-10 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: service.color }}
        />

        <div className="flex items-start gap-3 z-10">
          <div
            className="w-11 h-11 rounded-2xl border p-2 flex items-center justify-center shrink-0 shadow-inner group"
            style={{
              backgroundColor: `${service.color}15`,
              borderColor: `${service.color}40`,
              color: service.color,
            }}
          >
            <SrvIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
              {service.name}
            </h3>
            <p className="text-xs text-neutral-400 font-sans line-clamp-1">{service.subtitle}</p>
          </div>
        </div>

        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="z-10 p-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          title="Minimizar panel para ver la galaxia"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Selector de Pestañas: Ficha Técnica vs Calculadora ROI */}
      <div className="grid grid-cols-2 p-1.5 bg-neutral-900/90 border-b border-white/10 text-xs font-mono">
        <button
          type="button"
          onClick={() => {
            playTap();
            setActiveTab("spec");
          }}
          className={`py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "spec"
              ? "bg-white/10 text-white font-bold border border-white/15 shadow-sm"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ficha Técnica</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playTap();
            setActiveTab("roi");
          }}
          className={`py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "roi"
              ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm"
              : "text-neutral-400 hover:text-amber-300"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          <span>Calculadora ROI</span>
        </button>
      </div>

      {/* Cuerpo Desplazable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 space-y-3.5 text-xs">
        {activeTab === "spec" ? (
          <>
            {/* Resumen Comercial */}
            <p className="text-neutral-300 font-sans leading-relaxed font-light">
              {service.summary}
            </p>

            {/* Banner de Demo en Vivo si existe */}
            {demo && (
              <div className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 flex items-center justify-between gap-2">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold truncate">
                      {demo.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-300 font-sans truncate">{demo.hint}</p>
                </div>

                <a
                  href={demo.url}
                  target={demo.isExternal ? "_blank" : "_self"}
                  rel={demo.isExternal ? "noopener noreferrer" : undefined}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 hover:text-white font-mono text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-all shadow-sm"
                >
                  <Play className="w-3 h-3 text-cyan-400" />
                  <span>Probar</span>
                  {demo.isExternal && <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />}
                </a>
              </div>
            )}

            {/* Cuello de Botella Operativo Erradicado (D0) */}
            <div className="p-3 rounded-2xl bg-amber-950/25 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Cuello de Botella Erradicado (D0)
              </div>
              <p className="text-[11px] text-amber-200/90 leading-relaxed font-sans font-light">
                {service.bottleneckD0}
              </p>
            </div>

            {/* Pipeline de Implementación en 4 Pasos */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400" />
                Pipeline de Implementación
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {service.pipeline.map((p) => (
                  <div
                    key={p.step}
                    className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5"
                  >
                    <div className="flex items-center gap-1 font-mono text-[10px]">
                      <span className="text-cyan-400 font-bold">{p.step}</span>
                      <span className="text-white font-medium truncate">{p.title}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 line-clamp-2 leading-snug">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Capacidades Garantizadas */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Capacidades Garantizadas
              </div>
              <ul className="space-y-1">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-neutral-300 text-[11px] leading-snug">
                    <span className="text-emerald-400 text-xs mt-0.5">•</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Métrica Clave */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white font-mono">{service.metric.headline}</p>
                <p className="text-[10px] text-neutral-400 font-sans">{service.metric.label}</p>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-1 rounded-lg border font-bold"
                style={{
                  backgroundColor: `${service.color}15`,
                  borderColor: `${service.color}35`,
                  color: service.color,
                }}
              >
                Soberano
              </span>
            </div>
          </>
        ) : (
          /* ============================================================== */
          /* PESTAÑA 2: SIMULADOR DE ROI & AHORRO ANTI-SAAS                 */
          /* ============================================================== */
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Simulador de Ahorro Anti-SaaS</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-sans">
                Calcula cuánto dinero recuperas al erradicar suscripciones mensuales y comisiones de plataformas intermediarias.
              </p>
            </div>

            {/* Selector de Escala */}
            <div className="space-y-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <label className="text-[11px] font-mono text-neutral-200 block font-semibold">
                {roiProfile.label}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {roiProfile.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      playTap();
                      setSelectedOption(opt);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-center font-mono text-xs font-bold transition-all cursor-pointer ${
                      selectedOption === opt
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/25 scale-[1.03]"
                        : "bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono text-neutral-500 block text-right">
                Volumen: {selectedOption} {roiProfile.unit}
              </span>
            </div>

            {/* Tarjeta de Impacto Económico */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-neutral-900 to-black border border-amber-500/40 space-y-2.5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                  Retorno de Inversión Proyectado
                </span>
                <p className="text-lg sm:text-xl font-bold font-mono text-white tracking-tight">
                  {roiCalculation.headline}
                </p>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {roiCalculation.breakdown}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Rentas Mensuales Dynamind:</span>
                <span className="text-emerald-400 font-bold">$0 COP / mes</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pie del Panel: Botones de Acción */}
      <div className="p-3 border-t border-white/10 bg-neutral-950 flex items-center gap-2">
        <button
          onClick={onResetToGalaxy}
          className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          title="Ver Toda la Galaxia Dynamind"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
        </button>

        <button
          onClick={handleProceedToConsulting}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
        >
          <span>{activeTab === "roi" ? "Proteger este Ahorro (45s)" : "Cotizar este Sistema"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

