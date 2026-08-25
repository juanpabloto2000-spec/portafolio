import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ArrowRight, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logoImg from '/logo-transparent.png';

export default function SecretAdminLogin() {
  const { login } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Por favor ingresa la contraseña.");
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Authenticate with admin account
      const res = login('admin@dynamind.studios', password.trim());
      setIsLoading(false);
      if (!res.success) {
        setError(res.message || "Contraseña incorrecta. Inténtalo de nuevo.");
      }
    }, 400);
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
        className="relative z-10 w-full max-w-sm rounded-2xl bg-[#09090c] border border-white/15 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.04)]"
      >
        {/* Monogram Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mb-3">
            {!imgError ? (
              <img 
                src={logoImg} 
                alt="Dynamind" 
                onError={() => setImgError(true)}
                className="w-full h-full object-contain filter drop-shadow-md" 
              />
            ) : (
              <span className="font-bold font-heading-luxury text-xl text-white">D</span>
            )}
          </div>
          <h2 className="text-lg font-bold font-heading-luxury text-white">
            Dynamind Control Hub
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Acceso Administrativo
          </p>
        </div>

        {/* Clean Password Only Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="text-xs text-zinc-300 block mb-1.5 font-medium font-mono">
              CONTRASEÑA DE ACCESO
            </label>
            <input
              type="password"
              autoFocus
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña..."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 font-mono tracking-widest"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 active:scale-95"
            >
              {isLoading ? (
                <span>Validando...</span>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5" />
                  <span>Acceder como Admin</span>
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
