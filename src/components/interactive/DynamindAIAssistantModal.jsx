import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ArrowRight, Bot, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function DynamindAIAssistantModal({ isOpen, onClose }) {
  const { isLight } = useThemeLanguage();
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const speechRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '¡Hola! Soy Aura, tu asistente de arquitectura e ingeniería en Dynamind Studios. 🔮\n\nEstoy entrenada para diagnosticar los cuellos de botella de tu negocio (Gastrobar, Glamping, Clínica o Marca Personal) y recomendarte la plataforma exacta que necesitas. ¿En qué te puedo asesorar hoy?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    { label: '🍽️ ¿Qué solución hay para un Gastrobar?', query: '¿Qué solución tienen para un restaurante o gastrobar con demoras en mesa?' },
    { label: '🏨 ¿Cómo eliminar comisiones de Booking?', query: 'Tengo un glamping o cabañas, ¿cómo puedo cobrar anticipos y reservas directas sin intermediarios?' },
    { label: '💆‍♀️ ¿Cómo filtrar curiosos en clínicas?', query: 'Tengo una clínica o marca personal, ¿cómo filtro curiosos de WhatsApp?' },
    { label: '⚡ ¿Cuánto tarda la entrega?', query: '¿Cuál es el tiempo de desarrollo e implementación de una plataforma completa?' }
  ];

  // Precargar las voces del sintetizador (Fix asíncrono para Chrome/Safari móvil)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoicesLoaded(true);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Función de Síntesis de Voz Femenina de Autor con Despertador Anti-Pausa de Chromium
  const speakText = (textToSpeak) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Despertar sintetizador (Fix obligatorio para bug Chromium en móviles donde se queda paused)
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    if (!isVoiceActive) {
      setIsSpeaking(false);
      return;
    }

    // Limpiar markdown, asteriscos y emojis para una pronunciación fluida
    const cleanText = textToSpeak
      .replace(/[*_#`~]/g, '')
      .replace(/[🔮🍽️🏨💆‍♀️⚡💎👀✓✕●•→]/g, '')
      .replace(/\n+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';

    // Buscar una voz femenina en español en los sintetizadores del sistema
    const voices = window.speechSynthesis.getVoices() || [];
    const femaleVoice = voices.find(v => 
      (v.lang.startsWith('es') || v.lang.includes('es')) && 
      (v.name.toLowerCase().includes('paulina') || 
       v.name.toLowerCase().includes('monica') || 
       v.name.toLowerCase().includes('sofia') || 
       v.name.toLowerCase().includes('elena') || 
       v.name.toLowerCase().includes('lucia') || 
       v.name.toLowerCase().includes('sabina') || 
       v.name.toLowerCase().includes('victoria') || 
       v.name.toLowerCase().includes('zira') || 
       v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('mujer'))
    ) || voices.find(v => v.lang.startsWith('es') || v.lang.includes('es'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
      utterance.lang = femaleVoice.lang;
    }

    // Ajustes acústicos: tono femenino (pitch 1.15) y cadencia ágil (rate 1.0)
    utterance.pitch = 1.15;
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    
    // Doble llamada de seguridad de reactivación para iOS y Android
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  };

  // Detener voz si se cierra el modal
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const handleSendQuery = (query) => {
    if (!query.trim()) return;

    // Desbloquear audio síncronamente con el evento de click/tap del usuario
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }

    const userMsg = { sender: 'user', text: query };
    let reply = '';

    const q = query.toLowerCase();
    if (q.includes('gastrobar') || q.includes('restaurante') || q.includes('bar') || q.includes('mesa') || q.includes('comida')) {
      reply = 'Para gastronomía y bares implementamos nuestro Menú Táctil QR en Mesa + Comandas KDS + Caja en Vivo. El comensal pide desde su celular, la orden entra a cocina con semáforo de tiempos y el pago se procesa sin comisiones del 20% a apps externas. Eleva el ticket promedio hasta un 25%.';
    } else if (q.includes('glamping') || q.includes('booking') || q.includes('cabaña') || q.includes('hotel') || q.includes('hospedaje')) {
      reply = 'Para hospedajes eliminamos intermediarios con el Motor de Reservas Directas + Calendario Atómico + Anticipo del 50%. El cliente reserva su fecha en vivo, se bloquean las suites automáticamente y el dinero entra directo a tu cuenta de banco, ahorrándote miles de dólares en comisiones a Booking o Airbnb.';
    } else if (q.includes('clínica') || q.includes('curiosos') || q.includes('estética') || q.includes('marca') || q.includes('cita')) {
      reply = 'Para clínicas y marcas personales desplegamos el Triaje Visual de 45 segundos con odómetro de fricción. En lugar de pasar horas chateando con personas que solo preguntan precios, el sistema califica el interés y solo agenda llamadas con clientes cualificados.';
    } else if (q.includes('tiempo') || q.includes('tarda') || q.includes('plazo') || q.includes('demora')) {
      reply = 'Construimos e implementamos plataformas completas en un promedio de 10 a 18 días hábiles, con código nativo en React 18, Vite y Tailwind, incluyendo el Core Administrativo privado en /#/dsb y capacitación para todo tu equipo.';
    } else {
      reply = 'En Dynamind Studios construimos software soberano a la medida que elimina cuellos de botella reales: overbooking, saturación en WhatsApp, descuadres de caja o folletos mudos. Te sugiero iniciar el Diagnóstico de 45 segundos para estructurar tu solución directamente con Juan Pablo.';
    }

    setMessages(prev => [...prev, userMsg, { sender: 'ai', text: reply }]);
    setInputText('');

    // Hablar la respuesta con voz femenina
    speakText(reply);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
      if (lastAiMessage) {
        speakText(lastAiMessage.text);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className={`relative w-full max-w-xl border rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] backdrop-blur-2xl transition-colors duration-300 ${
        isLight 
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-indigo-500/10' 
          : 'bg-[#080b13]/98 border-white/15 text-white glow-card'
      }`}>
        
        {/* Cabecera Limpia del Asistente AURA */}
        <div className={`flex items-center justify-between border-b pb-4 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          <div className="flex items-center gap-3">
            
            {/* Avatar Galáctico de AURA */}
            <div className={`relative w-10 h-10 rounded-2xl border flex items-center justify-center transition-colors ${
              isLight 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                : 'bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-amber-500/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
            }`}>
              <Sparkles className={`w-5 h-5 animate-pulse ${isLight ? 'text-indigo-600' : 'text-cyan-400'}`} />
              <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                isLight ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
              }`} />
            </div>

            <div>
              <div className={`font-display font-bold text-lg tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                AURA
              </div>
              <p className={`text-[11px] font-mono ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}>Inteligencia de Arquitectura & Diagnóstico</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón de Control de Voz Femenina (Mute / Unmute) */}
            <button
              onClick={toggleVoice}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                isVoiceActive
                  ? (isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-sm' : 'bg-cyan-950/60 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]')
                  : (isLight ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-black' : 'bg-white/[0.03] border-white/10 text-zinc-500 hover:text-white')
              }`}
              title={isVoiceActive ? 'Silenciar voz de AURA' : 'Activar voz de AURA'}
              aria-label="Alternar voz de AURA"
            >
              {isVoiceActive ? (
                <>
                  <Volume2 className={`w-4 h-4 ${isLight ? 'text-indigo-600' : 'text-cyan-400'}`} />
                  {isSpeaking && (
                    <span className="flex items-center gap-0.5 h-3">
                      <span className={`w-0.5 h-2.5 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} style={{ animationDelay: '0ms' }} />
                      <span className={`w-0.5 h-3 rounded-full animate-bounce ${isLight ? 'bg-indigo-400' : 'bg-cyan-300'}`} style={{ animationDelay: '150ms' }} />
                      <span className={`w-0.5 h-2 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} style={{ animationDelay: '300ms' }} />
                    </span>
                  )}
                </>
              ) : (
                <VolumeX className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
              )}
            </button>

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-black hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              aria-label="Cerrar asistente"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Zona de Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                  isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl max-w-[85%] leading-relaxed relative group ${
                  m.sender === 'user'
                    ? (isLight ? 'bg-indigo-600 text-white font-medium' : 'bg-white text-black font-medium')
                    : (isLight ? 'bg-slate-100/90 border border-slate-200 text-slate-800 whitespace-pre-line' : 'bg-white/[0.04] border border-white/10 text-zinc-200 whitespace-pre-line')
                }`}
              >
                {/* Botón táctil para volver a escuchar el mensaje de Aura */}
                {m.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => speakText(m.text)}
                    className={`mt-2.5 pt-1.5 border-t flex items-center gap-1.5 text-[11px] font-sans transition-colors cursor-pointer ${
                      isLight ? 'border-slate-200 text-indigo-600 hover:text-indigo-700' : 'border-white/10 text-cyan-400/90 hover:text-cyan-300'
                    }`}
                    title="Escuchar a Aura"
                    aria-label="Escuchar mensaje de Aura"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar respuesta</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prompts Rápidos Sugeridos */}
        <div className={`space-y-1.5 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div className={`text-[10px] font-mono uppercase ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Consultas frecuentes para Aura:</div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSendQuery(qp.query)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer text-left ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-black' 
                    : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de Entrada y Enlace a Diagnóstico */}
        <div className="space-y-3 pt-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregúntale a Aura sobre cuellos de botella de tu negocio..."
              className={`flex-1 px-4 py-3 border rounded-xl text-xs font-mono focus:outline-none transition-colors ${
                isLight 
                  ? 'bg-slate-100/90 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500' 
                  : 'bg-white/[0.03] border-white/15 text-white placeholder:text-zinc-500 focus:border-cyan-400/60'
              }`}
            />
            <button
              type="submit"
              className={`p-3 rounded-xl transition-colors cursor-pointer ${
                isLight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-black hover:bg-zinc-200'
              }`}
              aria-label="Enviar pregunta a Aura"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className={`flex items-center justify-between text-[11px] font-mono pt-1 ${
            isLight ? 'text-slate-500' : 'text-zinc-400'
          }`}>
            <span>¿Prefieres atención con Juan Pablo?</span>
            <a
              href="/#/diagnostico"
              onClick={onClose}
              className={`flex items-center gap-1 font-bold underline ${
                isLight ? 'text-indigo-600 hover:text-indigo-700' : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              <span>Ir al Diagnóstico (45s)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
