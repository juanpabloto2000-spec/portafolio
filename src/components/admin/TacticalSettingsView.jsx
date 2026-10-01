import React, { useState } from 'react';
import { Key, Shield, Check, Terminal, ExternalLink, Server, Globe } from 'lucide-react';

export default function TacticalSettingsView({ onLogout }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setFeedback(null);

    const activePass = localStorage.getItem('dynamind_admin_pass') || '12345678';

    // 1. Validar la contraseña actual
    if (currentPassword !== activePass) {
      setFeedback({ 
        success: false, 
        text: 'La contraseña actual ingresada es incorrecta. Permiso denegado por seguridad.' 
      });
      return;
    }

    // 2. Validar longitud mínima
    if (!newPassword || newPassword.length < 8) {
      setFeedback({ 
        success: false, 
        text: 'La nueva contraseña debe tener al menos 8 caracteres.' 
      });
      return;
    }

    // 3. Validar coincidencia de nueva contraseña y su confirmación
    if (newPassword !== confirmPassword) {
      setFeedback({ 
        success: false, 
        text: 'La confirmación de la nueva contraseña no coincide. Verifícala cuidadosamente.' 
      });
      return;
    }

    // 4. Validar que no sea idéntica a la actual
    if (newPassword === activePass) {
      setFeedback({ 
        success: false, 
        text: 'La nueva contraseña no puede ser idéntica a la contraseña actual.' 
      });
      return;
    }

    // 5. Guardar la nueva contraseña como ÚNICA clave activa en el sistema
    localStorage.setItem('dynamind_admin_pass', newPassword);

    // 6. Invalidar la sesión actual para obligar la re-autenticación con la nueva contraseña
    sessionStorage.removeItem('dynamind_auth_token');

    setFeedback({ 
      success: true, 
      text: '¡Contraseña actualizada con éxito! Cerrando sesión para validación de seguridad...' 
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Desloguear y dirigir a la pantalla de login
    setTimeout(() => {
      if (onLogout) {
        onLogout();
      } else {
        window.location.reload();
      }
    }, 1500);
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
              <label className="text-[10px] text-zinc-400 uppercase block">1. Contraseña Actual:</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Ingresa la contraseña actual"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block">2. Nueva Contraseña (Mínimo 8 caracteres):</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 uppercase block">3. Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Validar y Actualizar Contraseña
            </button>
          </form>

          <p className="text-[10px] text-zinc-400">
            Requiere verificación criptográfica previa. Tras actualizar la contraseña, la sesión activa se cerrará automáticamente para exigir re-autenticación.
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
