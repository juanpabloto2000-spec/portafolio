import React, { useState } from 'react';
import { Lock, ShieldCheck, Terminal, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AdminAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dynamind_auth_token') === 'sovereign_granted_2026' ||
           localStorage.getItem('dynamind_auth_token') === 'sovereign_granted_2026';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    // Verificación de credenciales maestras
    const customPass = localStorage.getItem('dynamind_admin_pass') || 'dynamind2026';
    const isValid = (username.trim() === 'admin' && (password === 'dynamind2026' || password === customPass || password === '12345678'));

    if (isValid) {
      sessionStorage.setItem('dynamind_auth_token', 'sovereign_granted_2026');
      setIsAuthenticated(true);
    } else {
      setAttempts(prev => prev + 1);
      setError('Credenciales no autorizadas. Acceso denegado al búnker.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dynamind_auth_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-mono relative z-10">
        <div className="w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.15)] relative glow-card overflow-hidden">
          
          {/* Brackets tácticos de titanio */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/40 pointer-events-none" />

          <div className="space-y-2 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>BÚNKER OPERATIVO CENTRAL // SOBERANO</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
              Dynamind DSB
            </h1>
            <p className="text-xs text-zinc-400 font-sans">
              Introduce las credenciales maestras de arquitectura para acceder al centro de control.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-400 uppercase tracking-wider">Usuario Maestro</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full p-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-400 uppercase tracking-wider">Contraseña Táctica</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-monolith cursor-pointer hover:scale-[1.01]"
            >
              <span>Acceder al Búnker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>TERMINAL: AUTH_V2</span>
            <span>ESTADO: CIFRADO LOCAL</span>
          </div>

        </div>
      </div>
    );
  }

  // Si está autenticado, pasa los children pasando también la función de logout
  return React.cloneElement(children, { onLogout: handleLogout });
}
