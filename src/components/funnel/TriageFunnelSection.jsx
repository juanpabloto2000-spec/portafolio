import React, { useState } from 'react';
import StepProfileNiche from './StepProfileNiche';
import StepBottleneckScore from './StepBottleneckScore';
import StepAtomicCalendar from './StepAtomicCalendar';
import FunnelSuccessModal from './FunnelSuccessModal';
import { useLeads } from '../../context/LeadContext';
import { Activity, ShieldCheck } from 'lucide-react';

export default function TriageFunnelSection() {
  const { addLead } = useLeads();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [createdLead, setCreatedLead] = useState(null);

  const [formData, setFormData] = useState({
    profile_type: 'Dueño de Empresa',
    niche: 'Gastronomía, Restaurantes & Bares',
    client_name: '',
    business_name: '',
    bottleneck: '',
    friction_score: 85,
    date: '',
    time: '',
    phone: ''
  });

  const updateFormData = (patch) => {
    setFormData(prev => ({ ...prev, ...patch }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const lead = await addLead(formData);
      if (lead?.category !== 'BOT') {
        setCreatedLead(lead);
      }
    } catch (err) {
      console.warn('Triage submission warning:', err.message);
      setSubmitError(err.message || 'Hubo un inconveniente al procesar la reserva. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setCreatedLead(null);
    setCurrentStep(1);
    setFormData({
      profile_type: 'Dueño de Empresa',
      niche: 'Gastronomía, Restaurantes & Bares',
      client_name: '',
      business_name: '',
      bottleneck: '',
      friction_score: 85,
      date: '',
      time: '',
      phone: ''
    });
  };

  return (
    <section id="diagnostico" className="py-28 sm:py-36 bg-obsidian relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-12">
        
        {/* Cabecera del Funnel */}
        <div className="text-center space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Diagnóstico de Ingeniería & <br />
            <span className="text-zinc-400 font-serif italic lowercase font-normal">reserva estratégica directa</span>.
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed">
            Identifica tu cuello de botella operativo, calcula tu Score de Fricción y agenda 1 a 1 en el calendario nativo de Dynamind Studios.
          </p>
        </div>

        {/* Barra de Progreso Monolítica */}
        <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-6 text-[10px] font-mono uppercase tracking-wider">
          <div className={`p-2.5 border rounded-xl text-center transition-colors ${
            currentStep === 1 
              ? 'bg-white text-black border-white font-bold' 
              : currentStep > 1 
                ? 'bg-white/[0.08] text-white border-white/20' 
                : 'bg-white/[0.02] text-zinc-500 border-white/5'
          }`}>
            <span>01. Perfil & Nicho</span>
          </div>

          <div className={`p-2.5 border rounded-xl text-center transition-colors ${
            currentStep === 2 
              ? 'bg-white text-black border-white font-bold' 
              : currentStep > 2 
                ? 'bg-white/[0.08] text-white border-white/20' 
                : 'bg-white/[0.02] text-zinc-500 border-white/5'
          }`}>
            <span>02. Cuello de Botella</span>
          </div>

          <div className={`p-2.5 border rounded-xl text-center transition-colors ${
            currentStep === 3 
              ? 'bg-white text-black border-white font-bold' 
              : 'bg-white/[0.02] text-zinc-500 border-white/5'
          }`}>
            <span>03. Calendario & WA</span>
          </div>
        </div>

        {/* Caja de Pasos */}
        <div className="p-6 sm:p-10 border border-white/15 bg-white/[0.015] rounded-2xl shadow-monolith relative">
          {currentStep === 1 && (
            <StepProfileNiche 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
            />
          )}

          {currentStep === 2 && (
            <StepBottleneckScore 
              formData={formData} 
              updateFormData={updateFormData} 
              onPrev={handlePrev} 
              onNext={handleNext} 
            />
          )}

          {currentStep === 3 && (
            <StepAtomicCalendar 
              formData={formData} 
              updateFormData={updateFormData} 
              onPrev={handlePrev} 
              onSubmit={handleSubmit}
              isLoading={isLoading} 
              submitError={submitError}
            />
          )}
        </div>

      </div>

      {/* Transición Atmosférica Difuminada (Resplandor etéreo sin cortes de línea) */}
      <div className="w-full max-w-4xl mx-auto h-20 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent blur-2xl pointer-events-none mt-12 sm:mt-16" />

      {/* Modal de Confirmación */}
      {createdLead && (
        <FunnelSuccessModal 
          lead={createdLead} 
          onClose={handleCloseModal} 
        />
      )}
    </section>
  );
}
