import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function RoiCalculator() {
  const [sector, setSector] = useState('hospedaje'); // 'hospedaje' | 'gastronomia' | 'mentoria'
  const [monthlyVolume, setMonthlyVolume] = useState(6000); // USD facturación o valor mensual

  const sectorConfigs = {
    hospedaje: {
      label: 'Hospedaje, Glampings & Cabañas',
      metricLabel: 'Facturación Mensual en Reservas (USD):',
      min: 2000,
      max: 30000,
      step: 1000,
      commissionRate: 0.18, // 18% comisiones Booking/Airbnb
      timeSavedHours: 45, // horas al mes en gestión manual
      explanation: 'Al desviar solo el 40% de tus reservas a tu motor propio con anticipo garantizado:',
    },
    gastronomia: {
      label: 'Restaurantes, Bares & Gastrobares',
      metricLabel: 'Ventas Mensuales de Salón / Domicilios (USD):',
      min: 3000,
      max: 40000,
      step: 1000,
      commissionRate: 0.15, // 15% intermediarios / desperdicio
      timeSavedHours: 60,
      explanation: 'Con menú táctil en mesa y comanda directa sin intermediarios:',
    },
    mentoria: {
      label: 'Marcas Personales, Mentores & Clínicas',
      metricLabel: 'Facturación Mensual en Servicios (USD):',
      min: 1500,
      max: 25000,
      step: 500,
      commissionRate: 0.12, // pérdida por curiosos y falta de triaje
      timeSavedHours: 70, // horas perdidas chateando en DM
      explanation: 'Filtrando curiosos con triaje de 45s y cerrando llamadas calificadas de alto ticket:',
    }
  };

  const currentConfig = sectorConfigs[sector];

  // Cálculos matemáticos de retorno
  const directShare = 0.45; // 45% migrado a directo
  const monthlyCommissionSavings = Math.round(monthlyVolume * directShare * currentConfig.commissionRate);
  const annualSavings = monthlyCommissionSavings * 12;
  const annualHoursSaved = currentConfig.timeSavedHours * 12;

  return (
    <div className="p-6 sm:p-10 border border-white/15 bg-white/[0.02] font-mono text-xs space-y-8 shadow-monolith">
      
      {/* Cabecera de la Calculadora */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 uppercase tracking-widest mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>MODELO DE IMPACTO FINANCIERO // SOBERANÍA DYNAMIND</span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Calculadora de Retorno de Inversión (ROI)
          </h3>
        </div>

        {/* Selector de Sector */}
        <div className="flex items-center gap-1.5 bg-black/60 p-1 border border-white/10">
          <button
            onClick={() => { setSector('hospedaje'); setMonthlyVolume(8000); }}
            className={`px-3 py-1.5 transition-colors ${sector === 'hospedaje' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Hospedaje
          </button>
          <button
            onClick={() => { setSector('gastronomia'); setMonthlyVolume(10000); }}
            className={`px-3 py-1.5 transition-colors ${sector === 'gastronomia' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Gastronomía
          </button>
          <button
            onClick={() => { setSector('mentoria'); setMonthlyVolume(5000); }}
            className={`px-3 py-1.5 transition-colors ${sector === 'mentoria' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Mentoría/Clínicas
          </button>
        </div>
      </div>

      {/* Control Deslizante (Slider Interactivo) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-zinc-300 font-semibold">
            {currentConfig.metricLabel}
          </label>
          <span className="text-lg font-bold text-white bg-black px-3 py-1 border border-white/15">
            ${monthlyVolume.toLocaleString()} USD / mes
          </span>
        </div>

        <input
          type="range"
          min={currentConfig.min}
          max={currentConfig.max}
          step={currentConfig.step}
          value={monthlyVolume}
          onChange={(e) => setMonthlyVolume(Number(e.target.value))}
          className="w-full accent-white bg-white/10 h-2 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>${currentConfig.min.toLocaleString()} USD</span>
          <span>${(currentConfig.max / 2).toLocaleString()} USD</span>
          <span>${currentConfig.max.toLocaleString()} USD</span>
        </div>
      </div>

      {/* Tarjetas de Proyección de Ahorro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        
        <div className="p-5 bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Ahorro Anual Proyectado</div>
          <div className="text-2xl font-bold text-emerald-400">
            ${annualSavings.toLocaleString()} USD
          </div>
          <div className="text-[10px] text-zinc-500">Comisiones de terceros rescatadas</div>
        </div>

        <div className="p-5 bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Tiempo Liberado al Año</div>
          <div className="text-2xl font-bold text-white">
            {annualHoursSaved} Horas
          </div>
          <div className="text-[10px] text-zinc-500">Automatización de pedidos y triaje</div>
        </div>

        <div className="p-5 bg-black/60 border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Retorno Estimado (ROI)</div>
          <div className="text-2xl font-bold text-white">
            &gt; 420%
          </div>
          <div className="text-[10px] text-emerald-400">Inversión amortizada en &lt; 90 días</div>
        </div>

      </div>

      <div className="p-4 bg-white/[0.015] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
        <p className="font-sans leading-relaxed">
          {currentConfig.explanation} <strong className="text-white">el software se paga solo y se convierte en un activo de por vida</strong>.
        </p>

        <a
          href="/#/diagnostico"
          className="shrink-0 px-5 py-2.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-platinum transition-colors flex items-center gap-2"
        >
          <span>Calibrar Mi Caso</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
