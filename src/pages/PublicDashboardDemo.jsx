// src/pages/PublicDashboardDemo.jsx
// Demo Virtual Interactiva del Core DSB de Dynamind para Clientes y Prospectos.
// Misma estética que el DSB real (Telemetría, Glassmorphism, Reloj GMT-5, Tablas tácticas)
// 100% Pública: Sin barrera de login ni contraseñas. Retorno directo a /#/obras.

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, Zap, LayoutDashboard, ArrowLeft, 
  Clock, Sparkles, Bot, DollarSign, ShieldCheck, CheckCircle2,
  TrendingUp, RefreshCw, Smartphone, Eye, Printer, Search,
  ChevronRight, Lock, Sliders, Palette
} from 'lucide-react';
import { playTap, playSuccess } from '../utils/audioEffects';

// Datos de demostración según el nicho seleccionado por el visitante
const DEMO_SECTORS = {
  hotel: {
    label: '🏨 Glamping & Eco-Hoteles',
    kpis: {
      revenue: '$28.450.000 COP',
      ordersCount: '46 Reservas Directas',
      ticketAvg: '$618.500 COP',
      savings: '$5.690.000 COP ahorrados en Booking (20%)',
    },
    orders: [
      { id: 'FOL-1042', customer: 'Valentina Restrepo', item: 'Suite Panorámica con Jacuzzi', dates: '12 Oct - 14 Oct', total: '$1.340.000', status: 'Confirmada', statusColor: 'emerald' },
      { id: 'FOL-1043', customer: 'Mateo Gómez', item: 'Domo Geodésico Familiar', dates: '15 Oct - 17 Oct', total: '$1.860.000', status: 'Anticipo 50%', statusColor: 'amber' },
      { id: 'FOL-1044', customer: 'Camila Ospina', item: 'Cabaña Bosque Andino', dates: '18 Oct - 19 Oct', total: '$720.000', status: 'Check-In', statusColor: 'cyan' },
      { id: 'FOL-1045', customer: 'David Henao', item: 'Suite Luna de Miel + Spa', dates: '22 Oct - 24 Oct', total: '$1.590.000', status: 'Confirmada', statusColor: 'emerald' },
    ],
    agentSimulation: [
      { sender: 'user', text: '¡Hola! ¿Tienen cabaña para dos personas este fin de semana?' },
      { sender: 'bot', text: '¡Hola! 🌲 Sí, para este fin de semana tenemos disponible la Suite Panorámica con jacuzzi privado y desayuno incluido por $670.000/noche. ¿Te aparto la fecha con el 50% de anticipo directo sin intermediarios?' }
    ]
  },
  gastro: {
    label: '🍽️ Gastrobars & Restaurantes',
    kpis: {
      revenue: '$42.180.000 COP',
      ordersCount: '382 Comandas KDS',
      ticketAvg: '$110.400 COP',
      savings: '$8.436.000 COP ahorrados en Rappi (20%)',
    },
    orders: [
      { id: 'CMD-301', customer: 'Mesa 4 (Terraza)', item: 'Tomahawk 800g + 2 Cócteles de Autor', dates: 'Turno Noche (20:15)', total: '$245.000', status: 'En Cocina', statusColor: 'amber' },
      { id: 'CMD-302', customer: 'Mesa 12 (Bar)', item: 'Tacos de Birria x3 + Cerveza Artesanal', dates: 'Turno Noche (20:24)', total: '$89.000', status: 'Servido', statusColor: 'cyan' },
      { id: 'CMD-303', customer: 'Mesa 8 (Principal)', item: 'Risotto de Hongos Silvestres + Vino', dates: 'Turno Noche (20:30)', total: '$165.000', status: 'En Cocina', statusColor: 'amber' },
      { id: 'CMD-304', customer: 'Mesa 2 (VIP)', item: 'Cata de Ginebras + Tabla Madurados', dates: 'Turno Noche (20:05)', total: '$320.000', status: 'Cuenta Pedida', statusColor: 'emerald' },
    ],
    agentSimulation: [
      { sender: 'user', text: 'Buenas noches, ¿podemos reservar mesa para 6 personas a las 8pm?' },
      { sender: 'bot', text: '¡Buenas noches! 🍸 Mesa reservada para 6 personas a las 8:00 PM en el área de Terraza. Les envié el menú interactivo para adelantar pedidos y evitar demoras. ¡Los esperamos!' }
    ]
  },
  clinic: {
    label: '💆‍♀️ Clínicas Estéticas & Spas',
    kpis: {
      revenue: '$36.800.000 COP',
      ordersCount: '64 Procedimientos',
      ticketAvg: '$575.000 COP',
      savings: '38 Horas de WhatsApp ahorradas por Triaje',
    },
    orders: [
      { id: 'TRI-881', customer: 'Carolina Méndez', item: 'Armonización Facial & Ácido Hialurónico', dates: '14 Oct · 10:00 AM', total: '$1.200.000', status: 'Confirmada', statusColor: 'emerald' },
      { id: 'TRI-882', customer: 'Mariana Duarte', item: 'Sesión Láser Diodo Integral', dates: '14 Oct · 11:30 AM', total: '$450.000', status: 'Cita en Sala', statusColor: 'cyan' },
      { id: 'TRI-883', customer: 'Sofía Álvarez', item: 'Limpieza Hidrafacial Profunda', dates: '14 Oct · 02:00 PM', total: '$280.000', status: 'Confirmada', statusColor: 'emerald' },
      { id: 'TRI-884', customer: 'Natalia Castro', item: 'Tratamiento Tensor con Enzimas', dates: '15 Oct · 09:00 AM', total: '$850.000', status: 'Pre-cualificada', statusColor: 'amber' },
    ],
    agentSimulation: [
      { sender: 'user', text: 'Hola, ¿cuánto cuesta el aumento de labios?' },
      { sender: 'bot', text: '¡Hola! 💎 El procedimiento con ácido hialurónico Juvederm oscila entre $950.000 y $1.300.000 según la valoración del médico especialista. Te invito a hacer el triaje de 45 segundos para agendar tu cita directa.' }
    ]
  }
};

export default function PublicDashboardDemo() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedSector, setSelectedSector] = useState('hotel');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Estados del Simulador de Arqueo Ciego
  const [billCounts, setBillCounts] = useState({
    b100k: 12, // $1.200.000
    b50k: 18,  // $900.000
    b20k: 25,  // $500.000
    b10k: 30,  // $300.000
    b5k: 20,   // $100.000
    b2k: 0     // $0
  });
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  // Paleta de tokens en vivo para demostrar customización
  const [accentColor, setAccentColor] = useState('cyan'); // 'cyan' | 'emerald' | 'amber' | 'purple'

  const accentStyles = useMemo(() => {
    switch (accentColor) {
      case 'emerald':
        return {
          primary: 'text-emerald-400',
          bgGlow: 'from-emerald-500/20 to-teal-600/20',
          border: 'border-emerald-400/50',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
          activeTab: 'bg-emerald-500/20 text-white border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
        };
      case 'amber':
        return {
          primary: 'text-amber-400',
          bgGlow: 'from-amber-500/20 to-orange-600/20',
          border: 'border-amber-400/50',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
          activeTab: 'bg-amber-500/20 text-white border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
        };
      case 'purple':
        return {
          primary: 'text-purple-400',
          bgGlow: 'from-purple-500/20 to-indigo-600/20',
          border: 'border-purple-400/50',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
          activeTab: 'bg-purple-500/20 text-white border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.25)]',
        };
      case 'cyan':
      default:
        return {
          primary: 'text-cyan-400',
          bgGlow: 'from-cyan-500/20 to-blue-600/20',
          border: 'border-cyan-400/50',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
          activeTab: 'bg-cyan-500/20 text-white border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
        };
    }
  }, [accentColor]);

  // Reloj BOG GMT-5 exacto idéntico al DSB real
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      const dateFormatted = now.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
      setCurrentDate(dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sectorData = DEMO_SECTORS[selectedSector] || DEMO_SECTORS.hotel;

  // Cálculo del Arqueo Ciego
  const totalCounted = useMemo(() => {
    return (
      (billCounts.b100k || 0) * 100000 +
      (billCounts.b50k || 0) * 50000 +
      (billCounts.b20k || 0) * 20000 +
      (billCounts.b10k || 0) * 10000 +
      (billCounts.b5k || 0) * 5000 +
      (billCounts.b2k || 0) * 2000
    );
  }, [billCounts]);

  // Saldo esperado simulado en el sistema (Caja ciega: el cajero no debe saberlo hasta cerrar)
  const EXPECTED_SYSTEM_BALANCE = 3000000; // $3.000.000 COP
  const auditDiff = totalCounted - EXPECTED_SYSTEM_BALANCE;

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return sectorData.orders;
    const q = searchQuery.toLowerCase();
    return sectorData.orders.filter(
      (o) =>
        o.customer.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.item.toLowerCase().includes(q)
    );
  }, [sectorData.orders, searchQuery]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-mono selection:bg-white/20 relative z-10">
      
      {/* ============================================================== */}
      {/* 1. HEADER DE TELEMETRÍA TÁCTICA (IDÉNTICO AL DSB REAL)          */}
      {/* ============================================================== */}
      <header className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-30 shadow-2xl sticky top-0">
        
        {/* Identidad del Panel & Retorno a Obras */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/#/obras"
            onClick={playTap}
            title="Volver a la galería de Obras"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-zinc-300 hover:text-white text-xs font-mono transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-bold">VOLVER A OBRAS</span>
          </a>

          <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <img 
              src="/logo sin fondo.png" 
              alt="Dynamind Logo" 
              className="h-7 w-auto object-contain shrink-0 filter drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            />
            <span className="hidden md:inline font-display font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Core DSB // Demo Pública
            </span>
          </div>
        </div>

        {/* ⏱️ RELOJ CRONOMÉTRICO CENTRAL BOG GMT-5 */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span className="text-[11px] text-zinc-400 font-sans tracking-wide">
                {currentDate}
              </span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-white font-mono font-bold text-xs tracking-widest tabular-nums">
                {currentTime}
              </span>
            </div>
            <span className="text-zinc-600">|</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold uppercase">
              BOG · GMT-5
            </span>
          </div>
        </div>

        {/* Badge Táctico de Modo Simulado & CTA */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden sm:inline font-bold">ENTORNO EN VIVO // SIN LOGIN</span>
            <span className="sm:hidden font-bold">DEMO VIVA</span>
          </div>

          <a
            href="/#/diagnostico"
            onClick={playTap}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold font-sans uppercase transition-all shadow-sm"
          >
            <span>Cotizar mi DSB</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. BARRA DE HERRAMIENTAS & SELECTOR DE SECTOR INTERACTIVO       */}
      {/* ============================================================== */}
      <div className="border-b border-white/10 bg-black/40 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Selector de Nicho de Negocio */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-sans hidden sm:inline">
            Simular Sector:
          </span>
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {Object.entries(DEMO_SECTORS).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  playTap();
                  setSelectedSector(key);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-sans font-medium transition-all ${
                  selectedSector === key
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {data.label}
              </button>
            ))}
          </div>
        </div>

        {/* Customizador de Color en Vivo (Tokens) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400 font-sans hidden md:inline">
            Acento de Marca:
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'cyan', label: 'Cian', bg: 'bg-cyan-400' },
              { id: 'emerald', label: 'Esmeralda', bg: 'bg-emerald-400' },
              { id: 'amber', label: 'Ámbar', bg: 'bg-amber-400' },
              { id: 'purple', label: 'Púrpura', bg: 'bg-purple-400' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  playTap();
                  setAccentColor(c.id);
                }}
                title={`Cambiar a tono ${c.label}`}
                className={`w-5 h-5 rounded-full ${c.bg} transition-transform ${
                  accentColor === c.id ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. NAVEGACIÓN MODULAR POR PESTAÑAS TÁCTICAS                    */}
      {/* ============================================================== */}
      <div className="border-b border-white/10 bg-black/20 px-4 sm:px-6 flex overflow-x-auto scrollbar-none gap-2">
        {[
          { id: 'pipeline', label: 'Pipeline & Métricas', icon: Users },
          { id: 'caja', label: 'Caja & Arqueo Ciego', icon: DollarSign },
          { id: 'calendario', label: 'Directorio de Folios', icon: Calendar },
          { id: 'bot', label: 'Agente WhatsApp IA', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playTap();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                isActive
                  ? `border-white text-white ${accentStyles.activeTab}`
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? accentStyles.primary : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 4. CONTENIDO PRINCIPAL SEGÚN PESTAÑA ACTIVA                    */}
      {/* ============================================================== */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* PESTAÑA 1: PIPELINE & MÉTRICAS */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            {/* Grid de KPIs Reactivos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-2">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
                  Facturación Mes (Simulado)
                </span>
                <div className={`text-2xl font-bold font-mono ${accentStyles.primary}`}>
                  {sectorData.kpis.revenue}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+24.6% vs mes anterior</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-2">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
                  Volumen Operativo
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {sectorData.kpis.ordersCount}
                </div>
                <div className="text-[11px] text-zinc-400">
                  Directo sin intermediarios
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-2">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
                  Ticket Promedio
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {sectorData.kpis.ticketAvg}
                </div>
                <div className="text-[11px] text-cyan-400">
                  Optimizado con Menú / Upsell
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-black/40 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-bold">
                  Ahorro Anti-SaaS
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {sectorData.kpis.savings.split(' ')[0]}
                </div>
                <div className="text-[10px] text-emerald-200/80 leading-tight">
                  {sectorData.kpis.savings}
                </div>
              </div>
            </div>

            {/* Embudo Táctico de Conversión */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-white">
                  Embudo de Tráfico Directo a Caja (Tiempo Real)
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  Cero comisiones a plataformas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { step: '1. Visitas Web', count: '1.420', conv: '100%', desc: 'Tráfico orgánico & Instagram' },
                  { step: '2. Cotización en Vivo', count: '412', conv: '29.0%', desc: 'Selector de suites / platos' },
                  { step: '3. Pasarela Directa', count: '118', conv: '8.3%', desc: 'Wompi / PSE / Nequi' },
                  { step: '4. Folio Cerrado', count: '46', conv: '3.2%', desc: 'Dinero en tu cuenta bancaria' },
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] text-zinc-400 uppercase">{s.step}</span>
                    <div className="text-xl font-bold font-mono text-white">{s.count}</div>
                    <div className="text-xs text-cyan-400 font-bold">{s.conv} de conversión</div>
                    <p className="text-[10px] text-zinc-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: CAJA & ARQUEO CIEGO */}
        {activeTab === 'caja' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Panel de Conteo de Billetes */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-bold text-lg text-white">
                    Calculadora de Arqueo Ciego en Efectivo
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  En un arqueo ciego, el cajero digita los billetes físicos sin ver el saldo esperado del sistema, erradicando hurtos hormiga o cuadres ficticios.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'b100k', label: '$100.000 COP', denom: 100000 },
                  { key: 'b50k', label: '$50.000 COP', denom: 50000 },
                  { key: 'b20k', label: '$20.000 COP', denom: 20000 },
                  { key: 'b10k', label: '$10.000 COP', denom: 10000 },
                  { key: 'b5k', label: '$5.000 COP', denom: 5000 },
                  { key: 'b2k', label: '$2.000 COP', denom: 2000 },
                ].map((b) => (
                  <div key={b.key} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase tracking-wide block">
                      {b.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={billCounts[b.key]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          setBillCounts((prev) => ({ ...prev, [b.key]: val }));
                          setAuditSubmitted(false);
                        }}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white text-center focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-cyan-400 block text-right font-mono">
                      = ${((billCounts[b.key] || 0) * b.denom).toLocaleString('es-CO')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-400 block uppercase">Total Físico Contado:</span>
                  <span className="text-2xl font-bold font-mono text-white">
                    ${totalCounted.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <button
                  onClick={() => {
                    playSuccess();
                    setAuditSubmitted(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  Ejecutar Cierre & Arqueo Ciego
                </button>
              </div>
            </div>

            {/* Resultado del Cierre Táctico */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                  Auditoría del Búnker
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                  TURNO NOCHE #42
                </span>
              </div>

              {!auditSubmitted ? (
                <div className="p-8 text-center space-y-3 border border-dashed border-white/15 rounded-xl">
                  <Lock className="w-8 h-8 text-zinc-500 mx-auto" />
                  <p className="text-xs text-zinc-400 font-sans">
                    Ingresa las cantidades de billetes en la calculadora y presiona <strong>"Ejecutar Cierre"</strong> para comparar con la caja del sistema.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Total Físico Ingresado:</span>
                      <span className="font-bold text-white">${totalCounted.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Saldo Esperado por Sistema:</span>
                      <span className="font-bold text-zinc-300">${EXPECTED_SYSTEM_BALANCE.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm">
                      <span className="font-bold text-zinc-300">Diferencia de Caja:</span>
                      <span className={`font-bold font-mono ${auditDiff === 0 ? 'text-emerald-400' : auditDiff > 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                        {auditDiff === 0 ? '$0 COP (CUADRE INMACULADO)' : `$${auditDiff.toLocaleString('es-CO')} COP (${auditDiff > 0 ? 'Sobrante' : 'Faltante'})`}
                      </span>
                    </div>
                  </div>

                  {auditDiff === 0 ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>¡Cierre aprobado! Cero diferencias entre ventas y efectivo. Voucher criptográfico generado.</span>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                      <span className="font-bold block">⚠️ Alerta de Auditoría:</span>
                      <span>Se notificó automáticamente al administrador por WhatsApp con la justificación del cajero.</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir Voucher de Cierre</span>
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[11px] text-zinc-400 space-y-1 font-sans">
                <span className="text-white font-bold block">💡 Blindaje Dynamind:</span>
                <span>Los cierres quedan sellados con timestamp y no pueden ser alterados por el personal de turno.</span>
              </div>
            </div>

          </div>
        )}

        {/* PESTAÑA 3: DIRECTORIO DE FOLIOS */}
        {activeTab === 'calendario' && (
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-white">
                  Directorio de Folios & Reservas en Producción
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Monitoreo de comandas o reservas con semáforo de tiempos y asignación de habitación o mesa.
                </p>
              </div>

              {/* Buscador reactivo */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cliente o folio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            {/* Tabla Táctica */}
            <div className="overflow-x-auto border border-white/10 rounded-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.04] border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Folio ID</th>
                    <th className="p-3">Cliente / Mesa</th>
                    <th className="p-3">Detalle del Consumo</th>
                    <th className="p-3">Horario / Fechas</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3 font-bold text-cyan-400">{ord.id}</td>
                      <td className="p-3 text-white font-sans font-medium">{ord.customer}</td>
                      <td className="p-3 text-zinc-300 font-sans">{ord.item}</td>
                      <td className="p-3 text-zinc-400">{ord.dates}</td>
                      <td className="p-3 font-bold text-white">{ord.total}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.statusColor === 'emerald'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : ord.statusColor === 'cyan'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PESTAÑA 4: AGENTE WHATSAPP IA */}
        {activeTab === 'bot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-display font-bold text-base text-white">
                    Simulador de WhatsApp CRM IA
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Respuestas inmediatas entrenadas con el catálogo de tu negocio, horarios y pasarela de pago.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase">Tiempo de Respuesta Promedio:</span>
                  <span className="text-lg font-bold text-emerald-400 block font-mono">1.2 segundos (24/7)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase">Tasa de Conversión a Anticipo:</span>
                  <span className="text-lg font-bold text-white block font-mono">31.4% de prospectos</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase">Integración Directa:</span>
                  <span className="text-xs text-zinc-300 block font-sans">Conexión con Meta Cloud API / n8n sin pagar suscripciones mensuales de agregadores.</span>
                </div>
              </div>
            </div>

            {/* Chat Simulado de WhatsApp */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0b141a] border border-white/10 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
                  IA
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-sans">Asistente Autónomo del Negocio</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">● En línea respondiendo 24/7</span>
                </div>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {sectorData.agentSimulation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs font-sans leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#005c4b] text-white rounded-tr-none'
                          : 'bg-[#202c33] text-zinc-200 rounded-tl-none border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="¿Cuál es el horario de atención para hoy?"
                  className="flex-1 bg-[#2a3942] border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400 font-sans cursor-not-allowed"
                />
                <button
                  onClick={playTap}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold font-sans uppercase hover:bg-emerald-500 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* 5. BANNER INFERIOR DE LLAMADO A LA ACCIÓN (CONVERSIÓN)         */}
      {/* ============================================================== */}
      <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display font-bold text-base text-white">
              ¿Listo para construir el Core Operativo soberano de tu marca?
            </h4>
            <p className="text-xs text-zinc-400 font-sans">
              Código entregado en tu propio repositorio GitHub. Cero rentas mensuales y 100% de propiedad.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/#/obras"
              onClick={playTap}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs uppercase font-bold transition-all"
            >
              ← Volver a Obras
            </a>

            <a
              href="/#/diagnostico"
              onClick={playTap}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-sans text-xs uppercase font-bold tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95 flex items-center gap-2"
            >
              <span>Agendar Diagnóstico (45s)</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
