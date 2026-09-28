import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Video, Calendar, Phone, ArrowUpRight, Copy, Check } from 'lucide-react';

export default function FunnelSuccessModal({ lead, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Disparo cinemático de confeti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#10b981', '#94a3b8', '#e2e8f0']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  if (!lead) return null;

  const juanPhone = '573122952165';
  const waMessage = `Hola Juan Pablo, acabo de completar el diagnóstico de ingeniería en Dynamind Studios.

*Proyecto:* ${lead.business_name || 'Sin nombre'}
*Tomador de Decisión:* ${lead.client_name || 'Cliente'}
*Perfil:* ${lead.profile_type} // ${lead.niche}
*Cuello de Botella:* ${lead.bottleneck}
*Score de Fricción:* ${lead.friction_score}% (${lead.category === 'POTENCIAL' ? 'Lead Potencial 💎' : 'Lead Curioso 👀'})
*Cita Agendada:* ${lead.date} a las ${lead.time}
*Sala Google Meet:* ${lead.meet_link}
*WhatsApp:* ${lead.phone}

Quedo atento para la sesión estratégica de 15 minutos.`;

  const waUrl = `https://wa.me/${juanPhone}?text=${encodeURIComponent(waMessage)}`;

  const handleCopyMeet = () => {
    if (lead.meet_link) {
      navigator.clipboard.writeText(lead.meet_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-lg bg-obsidian border border-white/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-monolith">
        
        {/* Encabezado con Icono Táctico */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">
              Diagnóstico Confirmado
            </h3>
            <p className="text-xs font-mono text-zinc-400">Sesión registrada con éxito en el calendario</p>
          </div>
        </div>

        {/* Resumen del Lead */}
        <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-3 font-mono text-xs">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-zinc-500">PROYECTO:</span>
            <span className="text-white font-bold">{lead.business_name}</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-zinc-500">FECHA Y HORA:</span>
            <span className="text-white font-bold">{lead.date} · {lead.time}</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-zinc-500">CALIFICACIÓN:</span>
            <span className={`font-bold ${lead.category === 'POTENCIAL' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {lead.category === 'POTENCIAL' ? 'POTENCIAL 💎' : 'CURIOSO 👀'} ({lead.friction_score}%)
            </span>
          </div>

          <div className="pt-1 space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase block">Sala de Google Meet Autogenerada:</span>
            <div className="flex items-center justify-between p-2.5 bg-black/60 border border-white/10 rounded-lg text-[11px]">
              <span className="text-zinc-300 truncate max-w-[240px] sm:max-w-xs">{lead.meet_link}</span>
              <button 
                onClick={handleCopyMeet} 
                className="text-zinc-400 hover:text-white flex items-center gap-1 text-[10px] uppercase cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Notificación & Disparo a WhatsApp */}
        <div className="space-y-3">
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Tu diagnóstico ya fue registrado en el Centro de Control de Dynamind. Haz clic a continuación para abrir WhatsApp y sincronizar la sesión con Juan Pablo de inmediato.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-tactical cursor-pointer"
          >
            <Phone className="w-4 h-4 text-black" />
            <span>Abrir WhatsApp con Juan Pablo (+57 300 892 4110)</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white/[0.03] text-zinc-400 border border-white/10 hover:text-white hover:border-white/20 font-mono text-[11px] uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>

      </div>

    </div>
  );
}
