import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, AlertCircle, Activity, Sparkles } from 'lucide-react';

export default function StepBottleneckScore({ formData, updateFormData, onPrev, onNext }) {
  const isBusiness = formData.profile_type === 'Dueño de Empresa';

  const businessPainPoints = [
    {
      id: 'pain-b-1',
      title: 'Fuga de ventas por WhatsApp saturado en horas pico',
      detail: 'Los clientes esperan minutos por una respuesta y abandonan para comprarle a la competencia.',
      score: 88
    },
    {
      id: 'pain-b-2',
      title: 'Comisiones abusivas a plataformas intermediarias',
      detail: 'Booking, Airbnb o apps de delivery se quedan con 15% al 25% de cada transacción directa.',
      score: 92
    },
    {
      id: 'pain-b-3',
      title: 'Web actual es un folleto estático muerto',
      detail: 'No captura datos, no procesa anticipos ni cuenta con catálogo táctil interactivo.',
      score: 82
    },
    {
      id: 'pain-b-4',
      title: 'Carencia de control diario de caja y turnos',
      detail: 'El arqueo ciego, los pedidos y los folios de clientes se llevan en cuadernos o Excel frágil.',
      score: 85
    },
    {
      id: 'pain-b-5',
      title: 'Exploración inicial sin urgencia operativa',
      detail: 'Tengo una idea en mente pero no cuento con negocio activo ni presupuesto de inversión.',
      score: 38
    }
  ];

  const personalPainPoints = [
    {
      id: 'pain-p-1',
      title: 'Desperdicio de horas chateando con curiosos en Instagram',
      detail: 'Decenas de mensajes de personas que preguntan precios pero no califican para un servicio high-ticket.',
      score: 94
    },
    {
      id: 'pain-p-2',
      title: 'Falta de un portal que justifique tarifas de $500 – $2,500 USD',
      detail: 'Sin una vitrina cinematográfica de autoridad, los prospectos comparan por precio y no por valor.',
      score: 88
    },
    {
      id: 'pain-p-3',
      title: 'Agendamiento caótico de llamadas estratégicas',
      detail: 'Coordinar fechas y horas por DM genera fricción y cancelaciones a último minuto.',
      score: 81
    },
    {
      id: 'pain-p-4',
      title: 'Dependencia de Linktree o Calendly genérico',
      detail: 'Herramientas gratuitas que proyectan informalidad y no sincronizan con WhatsApp ni CRM propio.',
      score: 76
    },
    {
      id: 'pain-p-5',
      title: 'Solo estoy mirando opciones sin oferta activa',
      detail: 'No tengo un programa validado ni clientes actuales, solo investigo el mercado.',
      score: 42
    }
  ];

  const painPoints = isBusiness ? businessPainPoints : personalPainPoints;

  const handleSelectPain = (pain) => {
    updateFormData({
      bottleneck: pain.title,
      friction_score: pain.score
    });
  };

  const selectedScore = formData.friction_score || 0;
  const isPotential = selectedScore >= 70;
  const isCurious = selectedScore > 0 && selectedScore < 70;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Encabezado */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
          ¿Cuál es el principal freno de conversión de tu proyecto?
        </h3>
        <p className="text-xs font-mono text-zinc-400">
          Identifica el cuello de botella que más tiempo o dinero te cuesta resolver hoy.
        </p>
      </div>

      {/* Lista de Pains */}
      <div className="space-y-3">
        {painPoints.map((pain) => {
          const isSelected = formData.bottleneck === pain.title;
          return (
            <button
              key={pain.id}
              type="button"
              onClick={() => handleSelectPain(pain)}
              className={`w-full p-4 sm:p-5 text-left border rounded-xl transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                isSelected
                  ? 'bg-white text-black border-white shadow-monolith'
                  : 'bg-white/[0.02] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              <div className="space-y-1">
                <div className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-tight ${isSelected ? 'text-black' : 'text-white'}`}>
                  {pain.title}
                </div>
                <div className={`text-xs font-sans ${isSelected ? 'text-zinc-800' : 'text-zinc-400'}`}>
                  {pain.detail}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className={`font-mono text-xs font-bold px-2.5 py-1 border rounded-lg ${
                  isSelected 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white/[0.05] text-zinc-400 border-white/10'
                }`}>
                  {pain.score}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Telemetría del Score de Fricción en Tiempo Real */}
      {selectedScore > 0 && (
        <div className="p-5 border border-white/15 bg-white/[0.02] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className={`w-5 h-5 ${isPotential ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                DIAGNÓSTICO EN CALIENTE // SCORE DE FRICCIÓN
              </div>
              <div className="text-sm font-mono font-bold text-white flex items-center gap-2">
                <span>{selectedScore}/100</span>
                <span className="text-zinc-500">·</span>
                <span className={isPotential ? 'text-emerald-400' : 'text-amber-400'}>
                  {isPotential ? 'FRICCIÓN CRÍTICA (POTENCIAL 💎)' : 'BAJA URGENCIA (CURIOSO 👀)'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 max-w-xs text-center sm:text-right">
            {isPotential
              ? 'Cumples con los criterios para una sesión estratégica de arquitectura directa con Juan Pablo.'
              : 'Sesión informativa preliminar para definir alcance y viabilidad técnica.'}
          </div>
        </div>
      )}

      {/* Navegación */}
      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 bg-white/[0.03] text-zinc-300 border border-white/15 rounded-xl font-mono text-xs uppercase tracking-wider hover:text-white hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <button
          type="button"
          disabled={!formData.bottleneck}
          onClick={onNext}
          className="px-8 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 hover:bg-platinum disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          <span>Siguiente: Agendar en Calendario Propio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
