import React, { useState } from 'react';
import { Clock, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import RevealSection from '../motion/RevealSection';
import Tilt3DCard from '../ui/Tilt3DCard';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function InteractiveROICalculator() {
  const { t, language, isLight } = useThemeLanguage();
  const c = t.calculator;

  const [dailyMessages, setDailyMessages] = useState(50);
  const [hoursSpent, setHoursSpent] = useState(3.5);
  const [avgTicket, setAvgTicket] = useState(language === 'es' ? 120000 : 80);
  const [businessType, setBusinessType] = useState('gastro');

  // Cálculos matemáticos en caliente
  const hoursSavedPerMonth = Math.round(hoursSpent * 0.75 * 30); // 75% automatizado
  const lostSalesAvoided = Math.round((dailyMessages * 30 * 0.08) * avgTicket * 0.4);
  const commissionSaved = Math.round((dailyMessages * 30 * 0.15) * avgTicket * 0.18);
  const totalMonthlyGain = lostSalesAvoided + commissionSaved;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#10b981', '#38bdf8', '#fbbf24']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  };

  const formatCurrency = (val) => {
    if (language === 'es') {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(val);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const businessTypes = [
    { id: 'gastro', label: c.gastro, ticket: language === 'es' ? 85000 : 45 },
    { id: 'hospedaje', label: c.hospedaje, ticket: language === 'es' ? 350000 : 180 },
    { id: 'clinica', label: c.clinica, ticket: language === 'es' ? 180000 : 120 },
    { id: 'personal', label: c.personal, ticket: language === 'es' ? 500000 : 350 }
  ];

  return (
    <section className={`py-24 sm:py-32 border-b bg-transparent relative overflow-hidden transition-colors duration-500 ${
      isLight ? 'border-slate-200' : 'border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-14">
        
        {/* Encabezado Limpio */}
        <RevealSection direction="up" className="max-w-3xl space-y-3">
          <h2 className={`font-display font-bold text-3xl sm:text-5xl tracking-tight ${
            isLight ? 'text-[#090d16]' : 'text-white'
          }`}>
            {c.title}
          </h2>
          <p className={`text-sm sm:text-base font-sans leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-zinc-300'
          }`}>
            {c.desc}
          </p>
        </RevealSection>

        {/* Simulador Interactivo Dopamínico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controles y Sliders Táctiles (7 Cols) */}
          <div className="lg:col-span-7 p-4 sm:p-8 lg:p-10 border border-white/15 bg-[#080b13]/95 backdrop-blur-2xl rounded-3xl space-y-5 sm:space-y-8 shadow-monolith">
            
            {/* Selector de Nicho */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs font-mono uppercase text-zinc-400 block tracking-wider">
                {c.activityLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {businessTypes.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setBusinessType(b.id);
                      setAvgTicket(b.ticket);
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl font-mono text-xs text-center transition-all cursor-pointer ${
                      businessType === b.id
                        ? (isLight ? 'bg-slate-900 text-white font-bold shadow-md' : 'bg-white text-black font-bold shadow-monolith')
                        : (isLight ? 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200' : 'bg-white/[0.03] text-zinc-400 border border-white/10 hover:text-white hover:border-white/20')
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Mensajes por Día */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">{c.messagesLabel}</span>
                <span className="text-white font-bold text-sm px-2.5 py-1 bg-white/[0.05] rounded-lg border border-white/10">
                  {dailyMessages} / día
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={dailyMessages}
                onChange={(e) => setDailyMessages(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>10 / día</span>
                <span>100 / día</span>
                <span>200+ / día</span>
              </div>
            </div>

            {/* Slider 2: Horas en Pantalla */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">{c.hoursLabel}</span>
                <span className="text-emerald-400 font-bold text-sm px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  {hoursSpent} {c.hoursPerMonth.split('/')[0]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={hoursSpent}
                onChange={(e) => setHoursSpent(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>1h</span>
                <span>4h</span>
                <span>8h</span>
              </div>
            </div>

            {/* Slider 3: Ticket Promedio */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">{c.ticketLabel}</span>
                <span className="text-white font-bold text-sm px-2.5 py-1 bg-white/[0.05] rounded-lg border border-white/10">
                  {formatCurrency(avgTicket)}
                </span>
              </div>
              <input
                type="range"
                min={language === 'es' ? 30000 : 20}
                max={language === 'es' ? 800000 : 500}
                step={language === 'es' ? 10000 : 10}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

          </div>

          {/* Tablero de Resultados Dopamínico (5 Cols) */}
          <div className="lg:col-span-5">
            <Tilt3DCard className="p-4 sm:p-8 lg:p-10 border border-white/20 bg-[#080b13]/95 backdrop-blur-2xl rounded-3xl h-full flex flex-col justify-between space-y-5 sm:space-y-8 glow-card shadow-2xl relative overflow-hidden">
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{c.resultTitle}</span>
                  </div>
                  <button
                    onClick={triggerCelebration}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Celebrar"
                  >
                    🎉
                  </button>
                </div>

                {/* Métricas lado a lado (Side by Side) para ergonomía móvil limpia */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {/* Métrica 1: Horas de Vida Libres */}
                  <div className="p-3 sm:p-5 bg-[#0f1422]/95 border border-white/10 rounded-2xl flex flex-col justify-between space-y-1 sm:space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-zinc-400 uppercase truncate">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{c.recoveredTimeTitle}</span>
                    </div>
                    <div className="font-display font-extrabold text-xl sm:text-3xl text-white">
                      +{hoursSavedPerMonth} <span className="text-xs sm:text-sm font-mono text-emerald-400 font-normal">{c.hoursPerMonth}</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-sans text-zinc-300 line-clamp-2">
                      {c.recoveredTimeDesc}
                    </p>
                  </div>

                  {/* Métrica 2: Dinero Adicional en el Bolsillo */}
                  <div className="p-3 sm:p-5 bg-[#071912]/95 border border-emerald-500/30 rounded-2xl flex flex-col justify-between space-y-1 sm:space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-400 uppercase truncate">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{c.financialImpactTitle}</span>
                    </div>
                    <div className="font-display font-extrabold text-sm sm:text-2xl text-emerald-300 truncate">
                      +{formatCurrency(totalMonthlyGain)} <span className="text-[10px] sm:text-xs font-mono text-zinc-300 font-normal">/ mes</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-sans text-emerald-400/80 line-clamp-2">
                      {c.financialImpactDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón de Cierre Dopamínico */}
              <div className="pt-2 sm:pt-4 space-y-3">
                <a
                  href="/#/diagnostico"
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-platinum transition-all shadow-monolith cursor-pointer"
                >
                  <span>{c.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </Tilt3DCard>
          </div>

        </div>

      </div>
    </section>
  );
}
