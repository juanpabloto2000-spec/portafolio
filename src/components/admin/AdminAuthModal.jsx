import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, ArrowRight, AlertCircle, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminAuthModal({ isOpen, onClose }) {
  const { login, setCurrentView } = useApp();
  const [username, setUsername] = useState('admin@dynamind.studios');
  const [password, setPassword] = useState('dynamind2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        onClose();
        setCurrentView('admin');
      } else {
        setError(res.message);
      }
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-[#0a0a0d] border border-white/20 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.06)] overflow-hidden my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mx-auto mb-3 text-white shadow-inner">
              <Lock className="w-5 h-5 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold font-heading-luxury text-white">
              Panel Administrativo
            </h3>
            <p className="text-xs text-zinc-400 font-light mt-1">
              Ingresa con tus credenciales de Dynamind Studios para gestionar agendas, el cerebro de la IA y el dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Usuario / Correo</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-zinc-400 font-mono space-y-1">
              <div>Credenciales de demostración pre-cargadas:</div>
              <div className="text-white">Usuario: <strong>admin@dynamind.studios</strong></div>
              <div className="text-white">Contraseña: <strong>dynamind2026</strong></div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Autenticando...</span>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5" />
                    <span>Iniciar Sesión en el Backend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
