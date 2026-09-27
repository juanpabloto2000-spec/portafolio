import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCw, Inbox, CheckCircle2 } from 'lucide-react';
import { DESIGN_TOKENS } from '../../styles/designTokens';

/**
 * STATE QUINTET WRAPPER - INVARIANTE SAAS NÚMERO 3 (DOC 24)
 * Maneja obligatoriamente los 5 estados universales del ciclo de datos:
 * - 'idle': Estado en espera normal
 * - 'loading': Skeleton Shimmer adaptado al tema cósmico oscuro
 * - 'empty': Vista de autor cuando no hay registros con botón de acción
 * - 'error': Captura elegante de fallos con mensaje y botón de reintento
 * - 'success': Estado completado o render de hijos
 */
export default function StateQuintetWrapper({
  status = 'idle', // 'idle' | 'loading' | 'empty' | 'error' | 'success'
  loadingMessage = 'Sincronizando información cósmica...',
  emptyTitle = 'Sin registros disponibles',
  emptyDescription = 'Aún no se ha registrado actividad en este módulo.',
  emptyActionLabel = null,
  onEmptyAction = null,
  errorMessage = 'Ocurrió un error inesperado al procesar la solicitud.',
  onRetry = null,
  skeletonHeight = 'h-48',
  children,
}) {
  return (
    <AnimatePresence mode="wait">
      {/* 1. ESTADO LOADING: SKELETON SHIMMER CÓSMICO */}
      {status === 'loading' && (
        <motion.div
          key="state-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={DESIGN_TOKENS.motion.transition.fast}
          className={`w-full ${skeletonHeight} ${DESIGN_TOKENS.radii.card} bg-slate-900/40 border border-white/10 p-6 flex flex-col justify-center items-center relative overflow-hidden`}
        >
          {/* Shimmer Sweep Animation */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
            <p className="text-sm font-mono text-cyan-300/80 tracking-wide animate-pulse">
              {loadingMessage}
            </p>
          </div>
        </motion.div>
      )}

      {/* 2. ESTADO ERROR: ERROR BOUNDARY CON REINTENTO */}
      {status === 'error' && (
        <motion.div
          key="state-error"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={DESIGN_TOKENS.motion.transition.fast}
          className={`w-full p-6 ${DESIGN_TOKENS.radii.card} bg-rose-950/20 border border-rose-500/30 flex flex-col items-center text-center gap-3 backdrop-blur-md`}
        >
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-medium text-base mb-1">Interrupción Operativa</h4>
            <p className="text-slate-400 text-xs max-w-md">{errorMessage}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-2 ${DESIGN_TOKENS.radii.control} px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 transition-colors`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reintentar Operación
            </button>
          )}
        </motion.div>
      )}

      {/* 3. ESTADO EMPTY: VISTA DE AUTOR SIN DATOS */}
      {status === 'empty' && (
        <motion.div
          key="state-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={DESIGN_TOKENS.motion.transition.fast}
          className={`w-full p-8 ${DESIGN_TOKENS.radii.card} bg-slate-900/30 border border-white/5 flex flex-col items-center text-center gap-3`}
        >
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
            <Inbox className="w-6 h-6" />
          </div>
          <h4 className="text-slate-200 font-medium text-sm">{emptyTitle}</h4>
          <p className="text-slate-500 text-xs max-w-sm">{emptyDescription}</p>
          {emptyActionLabel && onEmptyAction && (
            <button
              onClick={onEmptyAction}
              className={`mt-2 ${DESIGN_TOKENS.surfaces.buttonSecondary} px-4 py-2 text-xs font-medium`}
            >
              {emptyActionLabel}
            </button>
          )}
        </motion.div>
      )}

      {/* 4. ESTADO IDLE / SUCCESS: RENDER NORMAL DE HIJOS */}
      {(status === 'idle' || status === 'success') && (
        <motion.div
          key="state-ready"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={DESIGN_TOKENS.motion.transition.fast}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
