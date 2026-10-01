import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Terminal, AlertTriangle, ArrowRight, ShieldAlert, Timer } from 'lucide-react';

// Criptografía Web Crypto API para Hashing SHA-256 en cliente
async function sha256(message) {
  if (!window.crypto || !window.crypto.subtle) {
    // Fallback defensivo si Web Crypto no está disponible
    return message;
  }
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 60 * 1000; // 60 segundos de enfriamiento

export default function AdminAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dynamind_auth_token') === 'sovereign_granted_2026';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(() => {
    return parseInt(localStorage.getItem('dynamind_login_fails') || '0', 10);
  });
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Verificación y cuenta regresiva de lockout por fuerza bruta
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntil = parseInt(localStorage.getItem('dynamind_lockout_until') || '0', 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutRemaining(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  // Inicialización garantizada a '12345678' para la prueba solicitada por el usuario
  useEffect(() => {
    if (localStorage.getItem('dynamind_pass_v12345678_reset') !== 'true') {
      localStorage.setItem('dynamind_admin_pass', '12345678');
      localStorage.setItem('dynamind_pass_v12345678_reset', 'true');
      localStorage.removeItem('dynamind_login_fails');
      localStorage.removeItem('dynamind_lockout_until');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (lockoutRemaining > 0 || isProcessing) return;

    setError(null);
    setIsProcessing(true);

    try {
      const inputHash = await sha256(password);
      
      // La ÚNICA contraseña autorizada es la que esté activa en el sistema.
      // Por defecto de fábrica para la prueba: '12345678'
      const activePassword = localStorage.getItem('dynamind_admin_pass') || '12345678';
      const activePasswordHash = await sha256(activePassword);
      // Blindaje de seguridad estricto: ÚNICAMENTE 'AdminMaster' con mayúsculas exactas
      const isUserValid = (username.trim() === 'AdminMaster');
      const isPassValid = (inputHash === activePasswordHash) || (password.trim() === activePassword.trim());

      if (isUserValid && isPassValid) {
        // Éxito: Limpiar contadores de error
        localStorage.removeItem('dynamind_login_fails');
        localStorage.removeItem('dynamind_lockout_until');
        sessionStorage.setItem('dynamind_auth_token', 'sovereign_granted_2026');
        setIsAuthenticated(true);
      } else {
        const nextFails = failedAttempts + 1;
        setFailedAttempts(nextFails);
        localStorage.setItem('dynamind_login_fails', nextFails.toString());

        if (nextFails >= MAX_FAILED_ATTEMPTS) {
          const lockoutUntil = Date.now() + LOCKOUT_TIME_MS;
          localStorage.setItem('dynamind_lockout_until', lockoutUntil.toString());
          setLockoutRemaining(60);
          setError(`Seguridad perimetral activada: demasiados intentos fallidos (${nextFails}). Búnker bloqueado por 60 segundos.`);
        } else {
          setError(`Credenciales no autorizadas. Intento ${nextFails} de ${MAX_FAILED_ATTEMPTS}.`);
        }
      }
    } catch (err) {
      setError('Error al procesar la verificación criptográfica.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dynamind_auth_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-mono relative z-10">
        <div className="w-full max-w-md bg-black/70 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.12)] relative glow-card overflow-hidden">
          
          {/* Cabecera Limpia con Logo sin fondo */}
          <div className="space-y-3 border-b border-white/10 pb-5 text-center flex flex-col items-center">
            <img 
              src="/logo sin fondo.png" 
              alt="Dynamind Logo" 
              style={{ height: '48px', width: 'auto' }}
              className="h-12 max-h-12 w-auto object-contain shrink-0 filter drop-shadow-[0_0_18px_rgba(56,189,248,0.4)] mb-1"
            />
            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
                Dynamind DSB
              </h1>
              <p className="text-xs text-zinc-400 font-sans max-w-xs mx-auto">
                Panel Administrativo y Centro de Control de Operaciones
              </p>
            </div>
          </div>

          {lockoutRemaining > 0 && (
            <div className="p-4 bg-red-950/60 border border-red-700/80 rounded-xl text-red-300 text-xs space-y-1 animate-pulse">
              <div className="flex items-center gap-2 font-bold text-red-200 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>ACCESO TEMPORALMENTE BLOQUEADO</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-[11px]">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                <span>Tiempo restante de espera: {lockoutRemaining} segundos</span>
              </div>
            </div>
          )}

          {error && lockoutRemaining === 0 && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-400 uppercase tracking-wider">Usuario</label>
              <input 
                type="text" 
                value={username}
                disabled={lockoutRemaining > 0 || isProcessing}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full p-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-zinc-400 uppercase tracking-wider">Contraseña</label>
              <input 
                type="password" 
                value={password}
                disabled={lockoutRemaining > 0 || isProcessing}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 bg-white/[0.03] border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={lockoutRemaining > 0 || isProcessing}
              className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-monolith cursor-pointer hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span>{isProcessing ? 'Verificando...' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Si está autenticado, pasa los children pasando también la función de logout
  return React.cloneElement(children, { onLogout: handleLogout });
}
