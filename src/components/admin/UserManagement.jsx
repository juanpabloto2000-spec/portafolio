import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldAlert, ShieldCheck, Power, Globe, Key, 
  RefreshCw, Check, AlertCircle, Lock, Unlock, Server, 
  ExternalLink, Plus, Trash2, Sliders, Activity, Clock, Save, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_CLIENT_SITES = [
  {
    id: 'andicas-bioparque',
    name: 'Andicas Bioparque & Cabañas',
    clientCompany: 'Andicas Eco-Resort',
    domain: 'https://andicas.com',
    backendUrl: 'https://tu-backend-andicas.onrender.com',
    masterKey: 'PanelPassword1966@',
    status: 'active', // 'active' | 'unpaid'
    lastCheck: new Date().toISOString(),
    features: {
      bookings: true,
      payments: true,
      whatsappAgent: true,
      clientDashboard: true,
      catalog: true
    }
  },
  {
    id: 'kal-discobar',
    name: 'KAL DISCOBAR & VIP',
    clientCompany: 'KAL Discobar',
    domain: 'https://kal-discobar.vercel.app',
    backendUrl: 'https://kal-discobar-backend.onrender.com',
    masterKey: 'KarolN2026@',
    status: 'active',
    lastCheck: new Date().toISOString(),
    features: {
      metrics: true,
      orders: true,
      menu_editor: true
    }
  }
];

export default function UserManagement() {
  const [clientSites, setClientSites] = useState(() => {
    const saved = localStorage.getItem('dynamind_client_sites');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const updated = parsed.map(site => {
          if (site.id === 'kal-discobar' || site.name?.toLowerCase().includes('kal')) {
            return {
              ...site,
              backendUrl: site.backendUrl || 'https://kal-discobar-backend.onrender.com',
              features: {
                metrics: site.features?.metrics !== false,
                orders: site.features?.orders !== false,
                menu_editor: site.features?.menu_editor !== false
              }
            };
          }
          return site;
        });

        const hasKal = updated.some(s => s.id === 'kal-discobar' || s.name?.toLowerCase().includes('kal'));
        if (!hasKal) {
          const kalDefault = DEFAULT_CLIENT_SITES.find(d => d.id === 'kal-discobar');
          if (kalDefault) {
            const merged = [...updated, kalDefault];
            localStorage.setItem('dynamind_client_sites', JSON.stringify(merged));
            return merged;
          }
        }
        localStorage.setItem('dynamind_client_sites', JSON.stringify(updated));
        return updated;
      } catch (e) {
        return DEFAULT_CLIENT_SITES;
      }
    }
    return DEFAULT_CLIENT_SITES;
  });

  const [selectedSiteId, setSelectedSiteId] = useState(clientSites[0]?.id || 'andicas-bioparque');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('dynamind_remote_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteBackend, setNewSiteBackend] = useState('');
  const [newSiteKey, setNewSiteKey] = useState('PanelPassword1966@');
  const [newSiteDomain, setNewSiteDomain] = useState('');

  // Persist sites and logs
  useEffect(() => {
    localStorage.setItem('dynamind_client_sites', JSON.stringify(clientSites));
  }, [clientSites]);

  useEffect(() => {
    localStorage.setItem('dynamind_remote_logs', JSON.stringify(logs));
  }, [logs]);

  const activeSite = clientSites.find(s => s.id === selectedSiteId) || clientSites[0];

  // Helper to add audit log
  const addLog = (siteName, action, resultStatus, message) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      siteName,
      action,
      resultStatus,
      message
    };
    setLogs(prev => [newLog, ...prev.slice(0, 20)]);
  };

  // Helper para limpiar y normalizar la URL del backend
  const getCleanBaseUrl = (rawUrl) => {
    if (!rawUrl) return 'https://kal-discobar-backend.onrender.com';
    return rawUrl
      .trim()
      .replace(/\/api\/bookings\/admin\/?.*$/, '')
      .replace(/\/api\/admin\/?.*$/, '')
      .replace(/\/api\/?.*$/, '')
      .replace(/\/+$/, '');
  };

  // 1. Remote Killswitch Command (active / unpaid)
  const handleSetRemoteStatus = async (newStatus) => {
    if (!activeSite) return;
    setIsLoading(true);
    setFeedbackMessage(null);

    const baseUrl = getCleanBaseUrl(activeSite.backendUrl);

    // Sincronización ultrarrápida paralela directa a Supabase Cloud
    if (activeSite.id === 'kal-discobar' || activeSite.name?.toLowerCase().includes('kal')) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const kalSb = createClient(
          'https://iqddvpckxbdsiujdrjnz.supabase.co',
          'sb_publishable_Ku7k4z_DdnjNpfpc5GnU5g_3ARWOE7Y'
        );
        await kalSb
          .from('system_settings')
          .update({ subscription_status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', 'global');
        console.log('⚡ [Dynamind Panel] Sincronizado directo con Supabase Cloud:', newStatus);
      } catch (sbErr) {
        console.warn('Nota sync Supabase directo:', sbErr);
      }
    }

    try {
      const endpoint = `${baseUrl}/api/bookings/admin/set-subscription-status`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': activeSite.masterKey || 'PanelPassword1966@',
        },
        body: JSON.stringify({
          status: newStatus,
          action: newStatus === 'unpaid' ? 'disable' : 'enable',
          key: activeSite.masterKey || 'PanelPassword1966@',
        }),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        // Update local state
        setClientSites(prev => prev.map(s => s.id === activeSite.id ? { ...s, status: newStatus, lastCheck: new Date().toISOString() } : s));
        
        const msg = newStatus === 'unpaid' 
          ? `🚫 Sitio "${activeSite.name}" BLOQUEADO por Falta de Pago.` 
          : `✅ Sitio "${activeSite.name}" REACTIVADO con Éxito.`;
        
        setFeedbackMessage({ type: 'success', text: msg });
        addLog(activeSite.name, newStatus === 'unpaid' ? 'Bloqueo por Pago' : 'Reactivación', 'OK', msg);
        
        if (newStatus === 'active') {
          confetti({ particleCount: 40, spread: 45 });
        }
      } else {
        const errMsg = data.error || data.message || 'No se pudo cambiar el estado en el servidor remoto.';
        setFeedbackMessage({ type: 'error', text: errMsg });
        addLog(activeSite.name, 'Cambio de Estado', 'ERROR', errMsg);
      }
    } catch (err) {
      console.error('Error de red al conectar con backend:', err);
      const errMsg = `❌ Error de conexión con el backend (${baseUrl}): ${err.message}. Verifica que la URL esté bien escrita y activa.`;
      setFeedbackMessage({ type: 'error', text: errMsg });
      addLog(activeSite.name, newStatus === 'unpaid' ? 'Bloqueo' : 'Reactivación', 'ERROR', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Query Remote Status (GET Ping)
  const handleQueryRemoteStatus = async () => {
    if (!activeSite) return;
    setIsLoading(true);
    setFeedbackMessage(null);

    const baseUrl = getCleanBaseUrl(activeSite.backendUrl);

    try {
      const endpoint = `${baseUrl}/api/bookings/admin/subscription-status`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'x-admin-key': activeSite.masterKey || 'PanelPassword1966@',
        }
      });
      const data = await response.json();

      if (data && data.status) {
        setClientSites(prev => prev.map(s => s.id === activeSite.id ? { ...s, status: data.status, lastCheck: new Date().toISOString() } : s));
        setFeedbackMessage({ type: 'success', text: `Estado remoto verificado con éxito: ${data.status === 'active' ? '🟢 Activo' : '🔴 Bloqueado'}` });
        addLog(activeSite.name, 'Verificación Ping', 'OK', `Respuesta: ${data.status}`);
      } else {
        setFeedbackMessage({ type: 'info', text: `Servidor respondió pero no devolvió estado. Verifica las rutas.` });
      }
    } catch (err) {
      console.error('Error de ping con backend:', err);
      const errMsg = `❌ No se pudo conectar a ${baseUrl}: ${err.message}. Revisa la URL y que Render esté corriendo.`;
      setFeedbackMessage({ type: 'error', text: errMsg });
      addLog(activeSite.name, 'Ping', 'ERROR', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Save Connection Config Explicitly (URL & Key)
  const handleSaveConnectionConfig = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('dynamind_client_sites', JSON.stringify(clientSites));
    setIsSavedRecently(true);
    setFeedbackMessage({ 
      type: 'success', 
      text: `✅ Configuración de conexión para "${activeSite.name}" guardada con éxito.` 
    });
    addLog(activeSite.name, 'Guardado Config', 'OK', `URL y Key actualizadas: ${activeSite.backendUrl}`);
    confetti({ particleCount: 30, spread: 35 });
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  // 4. Toggle Individual Features (Sincronización Real con Backend)
  const handleToggleFeature = async (featureKey) => {
    if (!activeSite) return;
    const currentVal = activeSite.features?.[featureKey] !== false;
    const newVal = !currentVal;

    const updatedFeatures = {
      ...activeSite.features,
      [featureKey]: newVal
    };

    setClientSites(prev => prev.map(s => s.id === activeSite.id ? {
      ...s,
      features: updatedFeatures
    } : s));

    const baseUrl = getCleanBaseUrl(activeSite.backendUrl);

    try {
      const endpoint = `${baseUrl}/api/bookings/admin/set-module-status`;
      
      const payload = {
        module: featureKey,
        enabled: newVal,
        active: newVal,
        status: newVal ? 'active' : 'inactive',
        modules: {
          metrics: featureKey === 'metrics' ? newVal : activeSite.features?.metrics !== false,
          orders: featureKey === 'orders' ? newVal : activeSite.features?.orders !== false,
          menu_editor: featureKey === 'menu_editor' ? newVal : activeSite.features?.menu_editor !== false,
          reservations: featureKey === 'bookings' ? newVal : activeSite.features?.bookings !== false,
          booking: featureKey === 'bookings' ? newVal : activeSite.features?.bookings !== false,
          payments: featureKey === 'payments' ? newVal : activeSite.features?.payments !== false,
          checkout: featureKey === 'payments' ? newVal : activeSite.features?.payments !== false,
          whatsapp_agent: featureKey === 'whatsappAgent' ? newVal : activeSite.features?.whatsappAgent !== false,
          whatsapp: featureKey === 'whatsappAgent' ? newVal : activeSite.features?.whatsappAgent !== false,
          dashboard: featureKey === 'clientDashboard' ? newVal : activeSite.features?.clientDashboard !== false,
          admin: featureKey === 'clientDashboard' ? newVal : activeSite.features?.clientDashboard !== false,
          menu: featureKey === 'catalog' ? newVal : activeSite.features?.catalog !== false,
          catalog: featureKey === 'catalog' ? newVal : activeSite.features?.catalog !== false,
        },
        key: activeSite.masterKey
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': activeSite.masterKey
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        addLog(activeSite.name, `Módulo: ${featureKey}`, 'OK', `Servidor actualizado a: ${newVal ? 'Habilitado' : 'Deshabilitado'}`);
        setFeedbackMessage({ 
          type: 'success', 
          text: `Módulo "${featureKey}" ${newVal ? 'HABILITADO' : 'DESHABILITADO'} con éxito en el servidor.` 
        });
      }
    } catch (err) {
      console.warn('Error enviando toggle al backend:', err);
      addLog(activeSite.name, `Módulo: ${featureKey}`, 'ERROR', `Fallo al sincronizar con ${activeSite.backendUrl}`);
    }
  };

  // 5. Update Site Config Fields
  const handleUpdateSiteField = (field, val) => {
    setClientSites(prev => prev.map(s => s.id === activeSite.id ? { ...s, [field]: val } : s));
  };

  // 6. Add New Site
  const handleAddNewSite = (e) => {
    e.preventDefault();
    if (!newSiteName.trim()) return;

    const newEntry = {
      id: 'site-' + Date.now(),
      name: newSiteName.trim(),
      clientCompany: newSiteName.trim(),
      domain: newSiteDomain.trim() || 'https://sitio-cliente.com',
      backendUrl: newSiteBackend.trim() || 'https://tu-backend.onrender.com',
      masterKey: newSiteKey.trim() || 'PanelPassword1966@',
      status: 'active',
      lastCheck: new Date().toISOString(),
      features: {
        bookings: true,
        payments: true,
        whatsappAgent: true,
        clientDashboard: true,
        catalog: true
      }
    };

    setClientSites(prev => [...prev, newEntry]);
    setSelectedSiteId(newEntry.id);
    setIsAddingNew(false);
    setNewSiteName('');
    setNewSiteBackend('');
    setNewSiteDomain('');
    confetti({ particleCount: 35, spread: 40 });
  };

  // 7. Delete Site
  const handleDeleteSite = (siteId) => {
    if (clientSites.length <= 1) {
      alert("Debes mantener al menos un sitio registrado.");
      return;
    }
    if (window.confirm("¿Seguro que deseas eliminar este sitio de tu panel de control maestro?")) {
      const filtered = clientSites.filter(s => s.id !== siteId);
      setClientSites(filtered);
      setSelectedSiteId(filtered[0]?.id || '');
    }
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <span>👥</span>
            <span>CONTROL REMOTO DE CLIENTES & SUSCRIPCIONES</span>
          </div>
          <h2 className="text-2xl font-bold font-heading-luxury text-white flex items-center gap-3">
            <span>Administrar Usuarios & Sitios Web</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/80 text-red-400 border border-red-800/60 shadow-[0_0_12px_rgba(220,38,38,0.35)]">
              KILLSWITCH MASTER
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Controla remotamente el acceso, estado de pagos y habilitación de módulos en los sitios web de tus clientes desplegados en Render / Vercel.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAddingNew ? 'Cancelar' : 'Vincular Nuevo Sitio'}</span>
        </button>
      </div>

      {/* Add New Site Modal/Drawer */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddNewSite}
            className="p-6 rounded-2xl bg-[#0e0e13] border border-white/15 space-y-4 overflow-hidden"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>➕</span>
              <span>Registrar Nueva Página Web de Cliente</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Nombre del Negocio / Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lúmina Odontología"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Dominio Público</label>
                <input
                  type="text"
                  placeholder="https://lumina.com"
                  value={newSiteDomain}
                  onChange={(e) => setNewSiteDomain(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">URL Backend (Render / Servidor)</label>
                <input
                  type="text"
                  required
                  placeholder="https://lumina-backend.onrender.com"
                  value={newSiteBackend}
                  onChange={(e) => setNewSiteBackend(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Clave Maestra (x-admin-key)</label>
                <input
                  type="text"
                  required
                  placeholder="PanelPassword1966@"
                  value={newSiteKey}
                  onChange={(e) => setNewSiteKey(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs"
              >
                Guardar y Vincular
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Client Sites Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {clientSites.map((site) => {
          const isSelected = selectedSiteId === site.id;
          const isUnpaid = site.status === 'unpaid';

          return (
            <button
              key={site.id}
              onClick={() => setSelectedSiteId(site.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 whitespace-nowrap border ${
                isSelected 
                  ? 'bg-white text-black font-semibold border-white shadow-md' 
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isUnpaid ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`} />
              <span>{site.name}</span>
            </button>
          );
        })}
      </div>

      {activeSite && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS: REMOTE COMMAND CENTER */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Remote Status Card */}
            <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-6 relative overflow-hidden">
              
              {/* Background Indicator Glow */}
              <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none ${
                activeSite.status === 'unpaid' ? 'bg-red-600/10' : 'bg-emerald-500/10'
              }`} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Sitio Seleccionado</span>
                  <h3 className="text-xl font-bold font-heading-luxury text-white">
                    {activeSite.name}
                  </h3>
                  <a 
                    href={activeSite.domain} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 font-mono hover:text-white flex items-center gap-1.5 mt-0.5"
                  >
                    <span>{activeSite.domain}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>

                {/* Big Live Status Badge */}
                <div className="flex items-center gap-2">
                  <div className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
                    activeSite.status === 'unpaid'
                      ? 'bg-red-950/50 border-red-800 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                      : 'bg-emerald-950/50 border-emerald-800 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  }`}>
                    {activeSite.status === 'unpaid' ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-red-400" />
                        <span>BLOQUEADO (Falta de Pago)</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ACTIVO (Servicio Normal)</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleQueryRemoteStatus}
                    disabled={isLoading}
                    title="Consultar estado en vivo del backend"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Master Actions Buttons (Killswitch) */}
              <div>
                <label className="text-xs text-zinc-400 font-mono block mb-3 font-semibold">
                  INTERRUPTOR REMOTO MAESTRO (KILLSWITCH):
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Reactivate Button */}
                  <button
                    onClick={() => handleSetRemoteStatus('active')}
                    disabled={isLoading || activeSite.status === 'active'}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      activeSite.status === 'active'
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 opacity-60 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-98'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-mono">REACTIVAR SITIO</div>
                        <div className="text-[11px] opacity-80 font-light">Pago recibido • Quitar bloqueo</div>
                      </div>
                    </div>
                  </button>

                  {/* Lock Button */}
                  <button
                    onClick={() => handleSetRemoteStatus('unpaid')}
                    disabled={isLoading || activeSite.status === 'unpaid'}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      activeSite.status === 'unpaid'
                        ? 'bg-red-950/20 border-red-500/40 text-red-300 opacity-60 cursor-default'
                        : 'bg-red-600 hover:bg-red-500 text-white border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-98'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-mono">BLOQUEAR SITIO</div>
                        <div className="text-[11px] opacity-80 font-light">Falta de pago • Bloquear acceso</div>
                      </div>
                    </div>
                  </button>

                </div>
              </div>

              {/* Feedback Alert */}
              {feedbackMessage && (
                <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                  feedbackMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : feedbackMessage.type === 'error'
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage.text}</span>
                </div>
              )}

              {/* Technical Endpoint Config with Explicit Save Button */}
              <div className="p-5 rounded-xl bg-black/50 border border-white/10 space-y-4 text-xs">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono border-b border-white/5 pb-2.5">
                  <span className="flex items-center gap-1.5 text-white font-semibold">
                    <Server className="w-4 h-4 text-zinc-400" />
                    <span>Configuración de Vinculación & Credenciales de API</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">Rutas Render / Express</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1 font-mono font-medium">
                      URL DEL BACKEND (RENDER):
                    </label>
                    <input
                      type="text"
                      placeholder="https://tu-backend.onrender.com"
                      value={activeSite.backendUrl}
                      onChange={(e) => handleUpdateSiteField('backendUrl', e.target.value)}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono text-[11px] focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1 font-mono font-medium">
                      CLAVE MAESTRA (X-ADMIN-KEY):
                    </label>
                    <input
                      type="password"
                      placeholder="PanelPassword1966@"
                      value={activeSite.masterKey}
                      onChange={(e) => handleUpdateSiteField('masterKey', e.target.value)}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono text-[11px] focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                {/* Save & Test Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Guarda la URL y la Key para que persistan en tu navegador y base de datos.
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleQueryRemoteStatus}
                      disabled={isLoading}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>Probar Conexión (Ping)</span>
                    </button>

                    <button
                      onClick={handleSaveConnectionConfig}
                      className={`px-5 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                        isSavedRecently
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white text-black hover:bg-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                      }`}
                    >
                      {isSavedRecently ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Guardado con Éxito!</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Guardar URL y Clave</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Individual Features Control */}
            <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
                <Sliders className="w-4 h-4 text-zinc-400" />
                <span>Control Remoto de Módulos & Funciones</span>
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Habilita o deshabilita funciones específicas en la plataforma del cliente:
              </p>

              <div className="space-y-2 text-xs">
                {(activeSite.id === 'kal-discobar' || activeSite.name?.toLowerCase().includes('kal') ? [
                  { key: 'metrics', label: '📊 Métricas & Caja (Finanzas)', desc: 'Habilita o bloquea el balance, ingresos, gráficos y arqueo de caja diario' },
                  { key: 'orders', label: '🛎️ Gestión de Pedidos & Mesas', desc: 'Habilita o bloquea comandas en vivo, estados de pedidos y mesas 1-15' },
                  { key: 'menu_editor', label: '📋 Configuración de Menú & Platos', desc: 'Habilita o bloquea la edición de platos, precios, fotos y categorías' }
                ] : [
                  { key: 'bookings', label: '📅 Motor de Reservas & Calendario', desc: 'Permite agendar turnos y habitaciones' },
                  { key: 'payments', label: '💳 Pasarela de Pagos & Depósitos', desc: 'Cobro de anticipos y validación bancaria' },
                  { key: 'whatsappAgent', label: '🤖 Agente IA de WhatsApp', desc: 'Confirmaciones automáticas por mensajería' },
                  { key: 'clientDashboard', label: '📊 Dashboard del Cliente (/dsb)', desc: 'Acceso a métricas y panel de administración' },
                  { key: 'catalog', label: '🍽️ Catálogo & Menú Digital', desc: 'Visualización de cartas y servicios interactivos' }
                ]).map((feat) => {
                  const isEnabled = activeSite.features?.[feat.key] !== false;

                  return (
                    <div 
                      key={feat.key}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white">{feat.label}</div>
                        <div className="text-[11px] text-zinc-500 font-light">{feat.desc}</div>
                      </div>

                      <button
                        onClick={() => handleToggleFeature(feat.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          isEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                        }`}
                      >
                        {isEnabled ? 'HABILITADO' : 'DESHABILITADO'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: AUDIT LOGS & ACTIONS */}
          <div className="space-y-6">
            
            {/* Site Info Summary */}
            <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
                <Activity className="w-4 h-4 text-zinc-400" />
                <span>Detalles de Suscripción</span>
              </h3>

              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Negocio:</span>
                  <span className="text-white">{activeSite.clientCompany}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Plan:</span>
                  <span className="text-emerald-400 font-bold">Mensual Enterprise</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Última Sincronización:</span>
                  <span className="text-zinc-400">{new Date(activeSite.lastCheck).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleDeleteSite(activeSite.id)}
                  className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Desvincular este Sitio</span>
                </button>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>Historial de Comandos</span>
                </h3>
                {logs.length > 0 && (
                  <button 
                    onClick={() => setLogs([])}
                    className="text-[10px] text-zinc-500 hover:text-white font-mono"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {logs.length === 0 ? (
                  <p className="text-zinc-600 font-light text-center py-6">
                    Sin órdenes remotas registradas aún.
                  </p>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-white font-bold">{log.siteName}</span>
                        <span className="text-zinc-500">{log.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-zinc-400">{log.action}</span>
                        <span className={`font-mono text-[10px] ${log.resultStatus === 'OK' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {log.resultStatus}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
