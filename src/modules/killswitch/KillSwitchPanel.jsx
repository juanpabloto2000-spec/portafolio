import React, { useState, useEffect, useCallback } from 'react';
import { 
  KAL_SB, ANDICAS_SB, ANDICAS_KEY, DEFAULT_CLIENT_SITES, saveAndicasToSupabase,
  updateRemoteClientPassword, fetchRemoteClientPassword 
} from './clientController';
import { 
  Key, Lock, ShieldCheck, Eye, EyeOff, RefreshCw, CheckCircle2, 
  AlertTriangle, Shield, Check, Terminal, ExternalLink 
} from 'lucide-react';

export default function KillSwitchPanel() {
  const [clientSites, setClientSites] = useState(() => {
    const saved = localStorage.getItem('dynamind_client_sites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CLIENT_SITES;
      }
    }
    return DEFAULT_CLIENT_SITES;
  });

  const [selectedSiteId, setSelectedSiteId] = useState('andicas-bioparque');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Estados para Gestión de Contraseña Maestra Remota
  const [currentCloudPass, setCurrentCloudPass] = useState('');
  const [isFetchingPass, setIsFetchingPass] = useState(false);
  const [newRemotePass, setNewRemotePass] = useState('');
  const [confirmRemotePass, setConfirmRemotePass] = useState('');
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passFeedback, setPassFeedback] = useState(null);

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('dynamind_remote_logs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dynamind_client_sites', JSON.stringify(clientSites));
  }, [clientSites]);

  useEffect(() => {
    localStorage.setItem('dynamind_remote_logs', JSON.stringify(logs));
  }, [logs]);

  const activeSite = clientSites.find(s => s.id === selectedSiteId) || clientSites[0];

  const addLog = (siteName, action, status, detail) => {
    const newLog = {
      id: Date.now(),
      siteName,
      action,
      status,
      detail,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const handleSetStatus = async (newStatus) => {
    if (!activeSite) return;
    setIsLoading(true);
    setFeedback(null);

    const isAndicas = activeSite.id === 'andicas-bioparque' || activeSite.id?.includes('andicas');

    // 1. Sincronización KAL DISCOBAR
    if (activeSite.id === 'kal-discobar') {
      try {
        await KAL_SB
          .from('system_settings')
          .upsert({ id: 'global', subscription_status: newStatus, updated_at: new Date().toISOString() });
      } catch (err) {
        console.warn('Sync KAL Supabase:', err);
      }
    }

    // 2. Sincronización ANDICAS
    if (isAndicas) {
      await saveAndicasToSupabase(newStatus, activeSite.features || {});
    }

    // 3. Actualizar estado local
    const updated = clientSites.map(s => s.id === activeSite.id ? { ...s, status: newStatus, lastCheck: new Date().toISOString() } : s);
    setClientSites(updated);

    // 4. Notificar a Render backend
    try {
      if (activeSite.backendUrl) {
        fetch(`${activeSite.backendUrl}/api/bookings/admin/set-subscription-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': activeSite.masterKey || 'PanelPassword1966@'
          },
          body: JSON.stringify({
            status: newStatus,
            key: activeSite.masterKey || 'PanelPassword1966@'
          })
        }).catch(() => {});
      }
    } catch {}

    const text = newStatus === 'unpaid' 
      ? `SITIO BLOQUEADO: ${activeSite.name} suspendido por falta de pago.`
      : `SITIO REACTIVADO: ${activeSite.name} activo y en servicio.`;

    setFeedback({ success: true, text });
    addLog(activeSite.name, newStatus === 'unpaid' ? 'SUSPENSIÓN DE PAGO' : 'REACTIVACIÓN', 'OK', text);
    setIsLoading(false);
  };

  const handleToggleFeature = async (featureKey) => {
    if (!activeSite) return;
    const currentVal = activeSite.features?.[featureKey] !== false;
    const newVal = !currentVal;

    const newFeatures = {
      ...(activeSite.features || {}),
      [featureKey]: newVal
    };

    const updated = clientSites.map(s => s.id === activeSite.id ? { ...s, features: newFeatures } : s);
    setClientSites(updated);

    if (activeSite.id === 'andicas-bioparque') {
      await saveAndicasToSupabase(activeSite.status, newFeatures);
    }

    addLog(activeSite.name, `MODULO ${featureKey.toUpperCase()}`, newVal ? 'HABILITADO' : 'DESHABILITADO', '');
  };

  // Consultar contraseña activa del sitio remoto
  const loadRemotePassword = useCallback(async (site) => {
    if (!site) return;
    setIsFetchingPass(true);
    try {
      const pass = await fetchRemoteClientPassword(site);
      setCurrentCloudPass(pass || site.masterKey || 'PanelPassword1966@');
    } catch (e) {
      console.warn('Error leyendo contraseña remota:', e);
      setCurrentCloudPass(site.masterKey || 'PanelPassword1966@');
    } finally {
      setIsFetchingPass(false);
    }
  }, []);

  useEffect(() => {
    if (activeSite) {
      loadRemotePassword(activeSite);
      setNewRemotePass('');
      setConfirmRemotePass('');
      setPassFeedback(null);
    }
  }, [selectedSiteId, loadRemotePassword]);

  // Actualizar contraseña remota sin requerir la clave anterior
  const handleUpdateRemotePassword = async (e) => {
    e.preventDefault();
    if (!activeSite) return;
    setPassFeedback(null);

    const cleanPass = newRemotePass.trim();
    if (!cleanPass || cleanPass.length < 4) {
      setPassFeedback({ error: true, text: 'La contraseña debe tener al menos 4 caracteres.' });
      return;
    }

    if (cleanPass !== confirmRemotePass.trim()) {
      setPassFeedback({ error: true, text: 'Las nuevas contraseñas no coinciden.' });
      return;
    }

    setIsUpdatingPass(true);
    try {
      await updateRemoteClientPassword(activeSite, cleanPass);

      // Guardar en el estado de sitios locales
      const updated = clientSites.map(s => s.id === activeSite.id ? { 
        ...s, 
        currentRemotePassword: cleanPass,
        lastPasswordUpdate: new Date().toISOString() 
      } : s);
      setClientSites(updated);
      setCurrentCloudPass(cleanPass);
      setNewRemotePass('');
      setConfirmRemotePass('');

      const msg = `Contraseña de ${activeSite.name} actualizada con éxito en la nube a: ${cleanPass}`;
      setPassFeedback({ success: true, text: msg });
      addLog(activeSite.name, 'CAMBIO CLAVE MAESTRA REMOTA', 'OK', `Clave cambiada a "${cleanPass}" sin requerir clave anterior`);
    } catch (err) {
      setPassFeedback({ error: true, text: err.message || 'Error al conectar con la nube del cliente.' });
      addLog(activeSite.name, 'ERROR CAMBIO CLAVE', 'FALLO', err.message);
    } finally {
      setIsUpdatingPass(false);
    }
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* Encabezado Táctico */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-widest mb-1">
            CONTROL CENTRAL DE INFRAESTRUCTURA
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Kill Switch & Gestión Remota de Clientes
          </h2>
        </div>

        {/* Selector de Cliente */}
        <div className="flex items-center gap-2">
          {clientSites.map((site) => {
            const isSelected = site.id === selectedSiteId;
            const isUnpaid = site.status === 'unpaid';

            return (
              <button
                key={site.id}
                onClick={() => setSelectedSiteId(site.id)}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{site.name}</span>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ml-2 ${isUnpaid ? 'bg-red-500' : 'bg-emerald-400'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-lg bg-white/[0.03] border border-white/15 text-xs text-white flex items-center justify-between">
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} className="text-zinc-500 hover:text-white">✕</button>
        </div>
      )}

      {/* Panel del Sitio Seleccionado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Comando de Suspensión */}
        <div className="lg:col-span-1 p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Estado de Suscripción</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${activeSite.status === 'unpaid' ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="uppercase">{activeSite.status === 'unpaid' ? 'SUSPENDIDO (MORA)' : 'ACTIVO (EN SERVICIO)'}</span>
            </div>
            <div className="text-[11px] text-zinc-400 pt-1">
              Dominio: <a href={activeSite.domain} target="_blank" rel="noreferrer" className="underline text-zinc-300">{activeSite.domain}</a>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-[10px] text-zinc-500 uppercase">Comando Remoto Maestro:</div>
            
            {activeSite.status === 'active' ? (
              <button
                disabled={isLoading}
                onClick={() => handleSetStatus('unpaid')}
                className="w-full py-3.5 px-4 rounded-lg bg-red-950/40 text-red-400 border border-red-800/60 hover:bg-red-900/50 hover:text-red-200 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Suspender Sitio (Corte por Falta de Pago)
              </button>
            ) : (
              <button
                disabled={isLoading}
                onClick={() => handleSetStatus('active')}
                className="w-full py-3.5 px-4 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/50 hover:text-emerald-200 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Reactivar Sitio (Servicio Restaurado)
              </button>
            )}
            
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              La orden se propaga en &lt;50ms a Supabase y despliega en tiempo real la pantalla de suspensión del sistema.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Control de Módulos */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Interruptores de Módulos en Tiempo Real
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(activeSite.features || {}).map(([key, isEnabled]) => (
              <div 
                key={key}
                className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white uppercase">{key.replace('_', ' ')}</div>
                  <div className="text-[10px] text-zinc-500">{isEnabled ? 'Habilitado' : 'Bloqueado'}</div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleFeature(key)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    isEnabled ? 'bg-white' : 'bg-zinc-800'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    isEnabled ? 'right-1 bg-black' : 'left-1 bg-zinc-400'
                  }`} />
                </button>
              </div>
            ))}
          </div>

          {/* Bitácora de Acciones Monospace */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-[10px] text-zinc-500 uppercase">Bitácora de Comandos Auditados</div>
            <div className="p-3 rounded-lg bg-black/60 border border-white/5 max-h-36 overflow-y-auto space-y-1.5 text-[10px] text-zinc-400">
              {logs.length === 0 ? (
                <div>No hay registros recientes.</div>
              ) : (
                logs.slice(0, 10).map((log) => (
                  <div key={log.id} className="flex items-center justify-between text-zinc-400">
                    <span>[{log.timestamp}] {log.siteName}: <strong className="text-white">{log.action}</strong></span>
                    <span className="text-zinc-600">{log.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 🔐 GESTIÓN DE CONTRASEÑA MAESTRA REMOTA (SIN CLAVE PREVIA) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/20 via-black/40 to-cyan-950/20 border border-white/10 space-y-6 relative overflow-hidden backdrop-blur-md glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ACCESO MAESTRO SOBERANO // CREDENCIALES REMOTAS</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Cambio de Contraseña en la Nube ({activeSite.name})
              </h3>
            </div>
          </div>

          {/* Estado de Contraseña Activa en Supabase */}
          <div className="flex items-center gap-3 bg-black/60 border border-white/10 px-3.5 py-2 rounded-xl text-xs">
            <span className="text-[10px] text-zinc-400 uppercase">Clave Activa en Nube:</span>
            {isFetchingPass ? (
              <span className="text-zinc-500 animate-pulse text-[11px]">Consultando...</span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-300 font-bold tracking-wider">
                  {showCurrentPass ? (currentCloudPass || 'No configurada') : '••••••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="text-zinc-400 hover:text-white transition-colors p-1"
                  title={showCurrentPass ? 'Ocultar' : 'Ver clave actual'}
                >
                  {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => loadRemotePassword(activeSite)}
                  className="text-zinc-400 hover:text-cyan-400 transition-colors p-1"
                  title="Sincronizar y recargar desde la nube"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
          Como administrador de Dynamind, tienes autoridad soberana para redefinir la contraseña del panel de este proyecto en tiempo real. La nueva contraseña se inyecta directamente en la base de datos Supabase y backend del cliente <strong>sin requerir su contraseña anterior</strong>.
        </p>

        {passFeedback && (
          <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
            passFeedback.success 
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
              : 'bg-red-950/40 border-red-800/60 text-red-300'
          }`}>
            <div className="flex items-center gap-2">
              {passFeedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />}
              <span>{passFeedback.text}</span>
            </div>
            <button onClick={() => setPassFeedback(null)} className="text-zinc-400 hover:text-white ml-2">✕</button>
          </div>
        )}

        {/* Formulario de Nueva Contraseña */}
        <form onSubmit={handleUpdateRemotePassword} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              Nueva Contraseña para {activeSite.name}
            </label>
            <div className="relative">
              <input 
                type={showNewPass ? "text" : "password"}
                value={newRemotePass}
                onChange={(e) => setNewRemotePass(e.target.value)}
                placeholder="Ingresa la nueva clave..."
                disabled={isUpdatingPass}
                className="w-full p-2.5 pr-9 bg-white/[0.04] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              Confirmar Nueva Contraseña
            </label>
            <input 
              type={showNewPass ? "text" : "password"}
              value={confirmRemotePass}
              onChange={(e) => setConfirmRemotePass(e.target.value)}
              placeholder="Repite la nueva clave..."
              disabled={isUpdatingPass}
              className="w-full p-2.5 bg-white/[0.04] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <button
              type="submit"
              disabled={isUpdatingPass || !newRemotePass}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isUpdatingPass ? 'Inyectando en Nube...' : 'Forzar y Actualizar Clave'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
