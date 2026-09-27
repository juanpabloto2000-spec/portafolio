import React, { useState } from 'react';
import { Key, Shield, Check, Terminal, ExternalLink, Server, Globe } from 'lucide-react';

export default function TacticalSettingsView() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setFeedback({ success: false, text: 'La clave debe tener al menos 6 caracteres.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ success: false, text: 'Las claves maestras no coinciden.' });
      return;
    }

    localStorage.setItem('dynamind_admin_pass', newPassword);
    setFeedback({ success: true, text: 'Clave maestra actualizada exitosamente en el búnker.' });
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* Cabecera */}
      <div className="border-b border-white/10 pb-5">
        <div className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
          CONFIGURACIÓN & INFRAESTRUCTURA TÁCTICA
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Seguridad del Búnker & Telemetría de Servidores
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Bloque 1: Cambio de Clave Maestra */}
        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase border-b border-white/10 pb-3">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Actualizar Clave de Acceso al Búnker</span>
          </div>

          {feedback && (
            <div className={`p-3 text-xs border ${
              feedback.success 
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' 
                : 'bg-red-950/30 border-red-800/50 text-red-300'
            }`}>
              {feedback.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block">Nueva Clave Maestra:</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block">Confirmar Nueva Clave:</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-platinum transition-colors"
            >
              Guardar Nueva Clave
            </button>
          </form>

          <p className="text-[10px] text-zinc-400">
            La clave maestra por defecto es <code className="text-white">dynamind2026</code>.
          </p>
        </div>

        {/* Bloque 2: Telemetría de Servidores & Despliegue */}
        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase border-b border-white/10 pb-3">
            <Server className="w-4 h-4 text-zinc-400" />
            <span>Infraestructura Conectada</span>
          </div>

          <div className="space-y-3 text-xs">
            
            <div className="p-3 bg-black/60 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase">GitHub Repository:</div>
              <div className="text-white font-bold truncate">github.com/juanpabloto2000-spec/portafolio.git</div>
              <div className="text-[10px] text-zinc-400">Rama: main (CI/CD Automático)</div>
            </div>

            <div className="p-3 bg-black/60 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase">Supabase Cloud Central:</div>
              <div className="text-white font-bold truncate">aqwwliwdfnscpzqckywn.supabase.co</div>
              <div className="text-[10px] text-emerald-400">Tablas: leads, system_settings</div>
            </div>

            <div className="p-3 bg-black/60 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase">WhatsApp Operativo:</div>
              <div className="text-white font-bold">+57 300 892 4110</div>
              <div className="text-[10px] text-zinc-400">Medellín, Colombia · Cobertura Internacional</div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
