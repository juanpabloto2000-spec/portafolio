import React from 'react';
import { Building2, UserCheck, ArrowRight } from 'lucide-react';

export default function StepProfileNiche({ formData, updateFormData, onNext }) {
  const profileTypes = [
    {
      id: 'Dueño de Empresa',
      title: 'Dueño de Negocio o Empresa',
      subtitle: 'Gastronomía, Hospedajes, Clínicas, Comercio o Servicios Locales',
      icon: Building2,
      niches: [
        'Gastronomía, Restaurantes & Bares',
        'Hospedaje, Cabañas & Glampings',
        'Clínicas Odontológicas & Estéticas',
        'Retail, Comercio & Marcas Físicas',
        'Ecoturismo & Experiencias'
      ]
    },
    {
      id: 'Marca Personal',
      title: 'Marca Personal de Alto Valor',
      subtitle: 'Mentores, Consultores, Médicos Especialistas, Coaches & Speakers',
      icon: UserCheck,
      niches: [
        'Mentoría, Formación & Coaching High-Ticket',
        'Consultoría Estratégica & Asesoría B2B',
        'Médicos Especialistas & Cirujanos',
        'Creadores de Contenido de Autor & Speakers'
      ]
    }
  ];

  const currentProfile = profileTypes.find(p => p.id === formData.profile_type) || profileTypes[0];

  const handleSelectProfile = (profileId) => {
    const prof = profileTypes.find(p => p.id === profileId);
    updateFormData({
      profile_type: profileId,
      niche: prof?.niches[0] || ''
    });
  };

  const isValid = formData.client_name?.trim() && formData.business_name?.trim();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Paso 1 Cabecera */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
          ¿Cuál es la naturaleza de tu proyecto?
        </h3>
        <p className="text-xs font-mono text-zinc-400">
          Selecciona tu arquetipo para calibrar el diagnóstico y las métricas de tu sector.
        </p>
      </div>

      {/* Selector de Perfil (2 Opciones de Alto Impacto) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profileTypes.map((prof) => {
          const isSelected = formData.profile_type === prof.id;
          const Icon = prof.icon;
          return (
            <button
              key={prof.id}
              type="button"
              onClick={() => handleSelectProfile(prof.id)}
              className={`p-6 text-left border rounded-xl transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white text-black border-white shadow-monolith'
                  : 'bg-white/[0.02] text-zinc-300 border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-black font-bold' : 'text-zinc-400'}`}>
                  {isSelected ? 'SELECCIONADO' : 'ELEGIR'}
                </span>
              </div>
              <div className={`font-display font-bold text-lg mb-1 ${isSelected ? 'text-black' : 'text-white'}`}>
                {prof.title}
              </div>
              <div className={`text-xs font-sans ${isSelected ? 'text-zinc-800' : 'text-zinc-400'}`}>
                {prof.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selector de Nicho Específico */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 block">
          Nicho o Industria de Operación:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentProfile.niches.map((niche) => {
            const isSelected = formData.niche === niche;
            return (
              <button
                key={niche}
                type="button"
                onClick={() => updateFormData({ niche })}
                className={`p-3 text-left border rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.12] border-white text-white font-semibold'
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-zinc-500 mr-2">▸</span> {niche}
              </button>
            );
          })}
        </div>
      </div>

      {/* Datos Iniciales: Nombre y Negocio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 block">
            Tu Nombre y Apellido:
          </label>
          <input
            type="text"
            required
            value={formData.client_name || ''}
            onChange={(e) => updateFormData({ client_name: e.target.value })}
            placeholder="Ej. Santiago Morales"
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 block">
            Nombre de tu Empresa o Marca:
          </label>
          <input
            type="text"
            required
            value={formData.business_name || ''}
            onChange={(e) => updateFormData({ business_name: e.target.value })}
            placeholder="Ej. Terraza Gastrobar 360"
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      </div>

      {/* Botón Siguiente */}
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="px-8 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 hover:bg-platinum disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          <span>Siguiente: Diagnóstico del Dolor (Paso 2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
