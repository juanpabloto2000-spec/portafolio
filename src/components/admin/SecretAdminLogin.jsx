import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Key, ArrowRight, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SecretAdminLogin() {
  const { login } = useApp();
  const [username, setUsername] = useState('admin@dynamind.studios');
  const [password, setPassword] = useState('dynamind2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 500);
  };

  const handleReturnHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-4 relative select-none">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Return to public site */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={handleReturnHome}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al sitio público</span>
        </button>
      </div>

      {/* Secret Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#09090c] border border-white/15 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.04)]"
      >
        {/* Monogram Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-black border border-white/20 overflow-hidden flex items-center justify-center p-0.5 shadow-2xl mb-4">
            <img src="/logo.jpeg" alt="Dynamind" className="w-full h-full object-cover rounded-xl" />
          </div>
          <h2 className="text-xl font-bold font-heading-luxury text-white">
            Dynamind Control Hub
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Acceso restringido • Ruta /#/dsb
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-300 block mb-1 font-medium font-mono">USUARIO O CORREO</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@dynamind.studios"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 font-mono"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-300 block mb-1 font-medium font-mono">CONTRASEÑA</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 font-mono"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Credentials helper hint for the owner */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-zinc-400 font-mono space-y-1">
            <div className="text-zinc-500 text-[10px] uppercase font-semibold">Tus Credenciales de Acceso:</div>
            <div>Usuario: <strong className="text-white">admin@dynamind.studios</strong></div>
            <div>Contraseña: <strong className="text-white">dynamind2026</strong></div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50"
            >
              {isLoading ? (
                <span>Validando acceso...</span>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5" />
                  <span>Entrar al Panel de Control</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

    </div>
  );
}
