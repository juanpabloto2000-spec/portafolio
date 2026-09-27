import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Sparkles, Check, RefreshCw, MessageSquare, 
  Settings2, ShieldAlert, Cpu, CheckCheck, User, Save 
} from 'lucide-react';

const DEFAULT_SYSTEM_PROMPT = `Eres el Agente Táctico de Calificación de Dynamind Studios.
Tu misión es entablar una conversación breve y quirúrgica con los prospectos que llegan por WhatsApp o anuncios de Instagram.
Reglas Inviolables:
1. Calificar si el prospecto es un tomador de decisión (dueño de negocio, gerente, médico o fundador).
2. Preguntar cuál es el cuello de botella más grave de su operación (descuadres de caja, comisiones de apps, reservas manuales).
3. Nunca dar cotizaciones a ciegas sin antes haber realizado el diagnóstico de 45 segundos o la llamada técnica de 15 minutos con Juan Pablo.
4. Tono de voz: Seguro, sobrio, respetuoso, directo y de alta ingeniería (estilo estudio de software suizo).
5. Cuando el usuario acepte la llamada, compartir el enlace directo al diagnóstico o coordinar la fecha para Google Meet.`;

export default function WhatsAppAgentTrainingView() {
  const [systemPrompt, setSystemPrompt] = useState(() => {
    return localStorage.getItem('dynamind_agent_prompt') || DEFAULT_SYSTEM_PROMPT;
  });

  const [agentName, setAgentName] = useState(() => {
    return localStorage.getItem('dynamind_agent_name') || 'Dynamind Neural Assistant v2.4';
  });

  const [botTone, setBotTone] = useState(() => {
    return localStorage.getItem('dynamind_agent_tone') || 'Táctico High-Ticket';
  });

  const [savedNotification, setSavedNotification] = useState(false);

  // Estados del Simulador de WhatsApp
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Te saluda el Asistente Táctico de Dynamind Studios. ¿Cuál es el sector de tu negocio y qué cuello de botella buscas erradicar?',
      time: '12:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSaveConfig = () => {
    localStorage.setItem('dynamind_agent_prompt', systemPrompt);
    localStorage.setItem('dynamind_agent_name', agentName);
    localStorage.setItem('dynamind_agent_tone', botTone);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const handleResetPrompt = () => {
    if (confirm('¿Restablecer el prompt a los valores canónicos predeterminados?')) {
      setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
      localStorage.setItem('dynamind_agent_prompt', DEFAULT_SYSTEM_PROMPT);
    }
  };

  // Motor de respuesta reactivo del simulador
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText.trim().toLowerCase();
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';

      if (query.includes('precio') || query.includes('cuanto') || query.includes('costo') || query.includes('vale')) {
        botResponse = 'En Dynamind desarrollamos software propietario por capas artesanales, no plantillas genéricas de $20 USD. Para darte una propuesta exacta sin sorpresas, realizamos un diagnóstico de 45s o una demo técnica de 15 min en Google Meet con Juan Pablo. ¿Qué sector operas actualmente?';
      } else if (query.includes('glamping') || query.includes('hotel') || query.includes('cabaña')) {
        botResponse = 'Excelente sector. En glampings nuestro cuello de botella D0 erradica las comisiones abusivas del 18-25% de Booking y el overbooking en festivos mediante nuestro Motor de Reservas Atómico y cobro del 50% de anticipo. ¿Te gustaría ver la demo funcionando?';
      } else if (query.includes('restaurante') || query.includes('bar') || query.includes('comida') || query.includes('gastro')) {
        botResponse = 'Para gastronomía y mixología implementamos comandas digitales KDS con semáforo para cocina, caja por turnos con arqueo ciego en billetes y menú QR de alta densidad sin comisiones por mesa. ¿Manejan actualmente delivery o consumo en salón?';
      } else if (query.includes('clinica') || query.includes('spa') || query.includes('diente') || query.includes('cita')) {
        botResponse = 'En clínicas y spas el mayor dolor son las inasistencias (no-shows) y las horas que el personal pasa respondiendo chats. Con nuestro sistema agendamos automáticamente con depósito de compromiso. ¿Cuántos pacientes atienden a la semana?';
      } else if (query.includes('si') || query.includes('claro') || query.includes('demo') || query.includes('agendar')) {
        botResponse = 'Perfecto. Puedes ingresar a nuestro Triaje en https://dynamind.studios/#/diagnostico para seleccionar tu horario disponible en Google Meet de lunes a viernes. ¿Prefieres horario de mañana o de tarde?';
      } else {
        botResponse = `Entendido. Considerando tu requerimiento y las directivas de nuestro estudio, te propongo ver la demo técnica en vivo para tu nicho. ¿Tienes 15 minutos esta semana para una sesión 1 a 1 por Google Meet con Juan Pablo?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'Simulador reiniciado. ¿En qué puedo asistirte hoy sobre el software de Dynamind?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>NÚCLEO COGNITIVO // ENTRENAMIENTO DE AGENTE</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Entrenamiento & Calibración del Agente de WhatsApp
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Calibra el prompt de sistema y prueba el comportamiento del bot en tiempo real antes del despliegue en producción.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotification && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              <Check className="w-3.5 h-3.5" />
              <span>¡Guardado en LocalStorage!</span>
            </span>
          )}
          <button
            onClick={handleSaveConfig}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-lg transition-colors cursor-pointer shadow-monolith"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </div>

      {/* Grid: Editor de Prompt (Izquierda) + Simulador WhatsApp (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Panel de Configuración (5 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Identidad del Bot */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-cyan-400" />
                <span>Parámetros de Identidad</span>
              </span>
              <span className="text-[10px] text-zinc-500 uppercase">WhatsApp Cloud API</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 text-[11px] uppercase">Nombre del Agente:</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 text-[11px] uppercase">Tono de Voz:</label>
                <select
                  value={botTone}
                  onChange={(e) => setBotTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono text-xs shadow-sm cursor-pointer transition-all hover:border-white/30"
                >
                  <option value="Táctico High-Ticket">Táctico High-Ticket (Autor)</option>
                  <option value="Cálido y Hospitalario">Cálido y Hospitalario (Glampings/Hoteles)</option>
                  <option value="Médico y Sobrio">Médico y Sobrio (Clínicas/Spas)</option>
                  <option value="Dinámico y Festivo">Dinámico y Festivo (Gastrobares)</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Prompt Maestro */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Prompt del Sistema (Instrucciones Directas)</span>
              </label>
              <button
                onClick={handleResetPrompt}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </div>

            <textarea
              rows={14}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-3.5 bg-black/80 border border-white/15 rounded-xl text-zinc-300 text-xs leading-relaxed focus:outline-none focus:border-cyan-400 font-mono resize-none"
              placeholder="Escribe las directivas de comportamiento del bot..."
            />

            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
              <span>Variables inyectadas: {"{CLIENT_NAME}"}, {"{MEET_LINK}"}, {"{NICHE}"}</span>
              <span>{systemPrompt.length} caracteres</span>
            </div>
          </div>

        </div>

        {/* Simulador Interactivo de WhatsApp (6 cols) */}
        <div className="lg:col-span-6 flex flex-col h-[650px] border border-white/15 rounded-2xl overflow-hidden bg-[#0b141a] shadow-2xl relative">
          
          {/* Header de WhatsApp */}
          <div className="h-16 bg-[#202c33] px-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold border border-cyan-400/40">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#202c33] absolute bottom-0 right-0" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{agentName}</div>
                <div className="text-[10px] text-emerald-400 font-sans">
                  {isTyping ? 'escribiendo...' : 'en línea · simulador táctico'}
                </div>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"
              title="Limpiar conversación de prueba"
            >
              Reiniciar Chat
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0b141a]/95 font-sans">
            <div className="text-center my-2">
              <span className="px-3 py-1 rounded-md bg-[#182229] text-[10px] text-zinc-400 border border-white/5 uppercase font-mono">
                Simulación de Conversación en Caliente
              </span>
            </div>

            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-xl text-xs leading-relaxed space-y-1 ${
                      isBot
                        ? 'bg-[#202c33] text-zinc-200 border border-white/5 rounded-tl-none'
                        : 'bg-[#005c4b] text-white rounded-tr-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-zinc-400 font-mono pt-0.5">
                      <span>{msg.time}</span>
                      {!isBot && <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl bg-[#202c33] border border-white/5 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Input de Mensaje de WhatsApp */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#202c33] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe un mensaje de prueba (ej: ¿cuánto vale una web?)..."
              className="flex-1 px-4 py-2.5 bg-[#2a3942] border border-white/10 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#00a884] hover:bg-[#06cf9c] text-black rounded-xl disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 fill-black" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
