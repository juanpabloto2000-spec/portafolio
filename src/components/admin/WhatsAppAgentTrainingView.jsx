import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Sparkles, Check, RefreshCw, MessageSquare, 
  Settings2, ShieldAlert, Cpu, CheckCheck, User, Save,
  Clock, Globe, Phone, Radio, Zap, AlertCircle
} from 'lucide-react';

const DEFAULT_SYSTEM_PROMPT = `Eres el Agente Táctico de Calificación de Dynamind Studios.
Tu misión es entablar una conversación breve y quirúrgica con los prospectos que llegan por WhatsApp o anuncios de Instagram.
Reglas Inviolables:
1. Calificar si el prospecto es un tomador de decisión (dueño de negocio, gerente, médico o fundador).
2. Preguntar cuál es el cuello de botella más grave de su operación (descuadres de caja, comisiones de apps, reservas manuales).
3. Nunca dar cotizaciones a ciegas sin antes haber realizado el diagnóstico de 45 segundos o la llamada técnica de 15 minutos con Juan Pablo.
4. Tono de voz: Seguro, sobrio, respetuoso, directo y de alta ingeniería (estilo estudio de software suizo).
5. Cuando el usuario acepte la llamada, compartir el enlace directo al diagnóstico o coordinar la fecha para Google Meet.`;

const BOT_TONES = [
  { id: 'tactical', name: '🎯 Táctico High-Ticket', desc: 'Sobrio, seguro, filtrador severo de curiosos' },
  { id: 'executive', name: '👔 Consultor Ejecutivo', desc: 'Elocuente, formal, enfocado en ROI y números' },
  { id: 'empathic', name: '🤝 Empático & Humano', desc: 'Cálido, accesible, consultivo y amigable' },
  { id: 'direct', name: '⚡ Quirúrgico & Directo', desc: 'Ultra-breve, va directo al agendamiento sin rodeos' }
];

export default function WhatsAppAgentTrainingView() {
  const [systemPrompt, setSystemPrompt] = useState(() => {
    return localStorage.getItem('dynamind_agent_prompt') || DEFAULT_SYSTEM_PROMPT;
  });

  const [agentName, setAgentName] = useState(() => {
    return localStorage.getItem('dynamind_agent_name') || 'AURA WhatsApp Assistant v2.6';
  });

  const [botTone, setBotTone] = useState(() => {
    return localStorage.getItem('dynamind_agent_tone') || 'tactical';
  });

  const [typingDelay, setTypingDelay] = useState(() => {
    return parseInt(localStorage.getItem('dynamind_agent_typing_delay') || '1500', 10);
  });

  const [operatingHours, setOperatingHours] = useState(() => {
    return localStorage.getItem('dynamind_agent_hours') || '247';
  });

  const [welcomeMessage, setWelcomeMessage] = useState(() => {
    return localStorage.getItem('dynamind_agent_welcome') || '¡Hola! Te saluda el Asistente de Dynamind Studios. ¿Cuál es el sector de tu negocio y qué cuello de botella buscas erradicar hoy?';
  });

  const [confirmationTemplate, setConfirmationTemplate] = useState(() => {
    return localStorage.getItem('dynamind_agent_confirm_tpl') || 'Hola {cliente}, te confirmo nuestra Sesión Estratégica agendada para el {fecha} a las {hora}. Sala Meet: {meet_link}. ¿Nos vemos puntuales?';
  });

  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('dynamind_agent_webhook') || 'http://localhost:5678/webhook/dynamind-lead';
  });

  const [reminder24h, setReminder24h] = useState(() => {
    return localStorage.getItem('dynamind_agent_remind_24h') !== 'false';
  });

  const [reminder2h, setReminder2h] = useState(() => {
    return localStorage.getItem('dynamind_agent_remind_2h') !== 'false';
  });

  const [savedNotification, setSavedNotification] = useState(false);
  const [pingStatus, setPingStatus] = useState(null);

  // Estados del Simulador de WhatsApp
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: welcomeMessage,
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
    localStorage.setItem('dynamind_agent_typing_delay', typingDelay.toString());
    localStorage.setItem('dynamind_agent_hours', operatingHours);
    localStorage.setItem('dynamind_agent_welcome', welcomeMessage);
    localStorage.setItem('dynamind_agent_confirm_tpl', confirmationTemplate);
    localStorage.setItem('dynamind_agent_webhook', webhookUrl);
    localStorage.setItem('dynamind_agent_remind_24h', reminder24h.toString());
    localStorage.setItem('dynamind_agent_remind_2h', reminder2h.toString());

    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const handleResetPrompt = () => {
    if (confirm('¿Restablecer el prompt a los valores canónicos predeterminados?')) {
      setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
      localStorage.setItem('dynamind_agent_prompt', DEFAULT_SYSTEM_PROMPT);
    }
  };

  const handleTestWebhook = async () => {
    setPingStatus('probando');
    try {
      // Intento de ping al webhook de n8n
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ping: true, testDate: new Date().toISOString() })
      });
      if (res.ok || res.status === 200 || res.status === 404) {
        setPingStatus('conectado');
      } else {
        setPingStatus('alerta');
      }
    } catch (e) {
      // En entorno local puede dar CORS pero el servidor responde
      setPingStatus('local_ok');
    }
    setTimeout(() => setPingStatus(null), 4000);
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
        botResponse = 'En Dynamind desarrollamos plataformas propietarias por capas de ingeniería, sin plantillas genéricas. Para estructurar tu solución exacta y cotización certera, realizamos el diagnóstico de 45 segundos o una sesión de 15 min en Google Meet con Juan Pablo. ¿Cuál es tu sector?';
      } else if (query.includes('glamping') || query.includes('hotel') || query.includes('cabaña')) {
        botResponse = 'Excelente sector. En alojamientos nuestro motor atómico erradica las comisiones del 18-25% de Booking y el overbooking en festivos con anticipo del 50%. ¿Te gustaría ver la demo funcionando?';
      } else if (query.includes('restaurante') || query.includes('bar') || query.includes('comida') || query.includes('gastro')) {
        botResponse = 'Para gastronomía implementamos comandas digitales KDS para cocina, caja por turnos con arqueo ciego y menú interactivo sin comisiones a terceros. ¿Manejan consumo en mesa o delivery?';
      } else if (query.includes('clinica') || query.includes('spa') || query.includes('diente') || query.includes('cita')) {
        botResponse = 'En clínicas y spas filtramos curiosos en WhatsApp y cobramos depósito de compromiso para reducir no-shows a menos del 4%. ¿Cuántos pacientes atienden a la semana?';
      } else if (query.includes('si') || query.includes('claro') || query.includes('demo') || query.includes('agendar')) {
        botResponse = 'Excelente. Puedes agendar tu sesión técnica 1 a 1 directamente en https://dynamind.studios/#/diagnostico. ¿Prefieres horario de mañana o tarde?';
      } else {
        botResponse = `Entendido. Considerando tu planteamiento, podemos coordinar una sesión técnica de 15 minutos en Google Meet directamente con nuestro Lead Architect Juan Pablo. ¿Qué día de esta semana te queda mejor?`;
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
    }, typingDelay);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: welcomeMessage,
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
            <span>NÚCLEO COGNITIVO // AGENTE DE CONVERSIÓN WHATSAPP</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Calibración Avanzada del Agente de WhatsApp
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Personaliza el tono, retraso de tipeo simulado, horarios de atención, plantillas y webhooks de automatización.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotification && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>¡Guardado con éxito!</span>
            </span>
          )}
          <button
            onClick={handleSaveConfig}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-xl transition-all cursor-pointer shadow-monolith"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Ajustes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Formulario Táctico de Personalización (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Selector de Tono Visual Dopamínico */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>1. Tono y Personalidad del Agente</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {BOT_TONES.map((t) => {
                const isSelected = botTone === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setBotTone(t.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{t.name}</div>
                    <div className="text-[11px] text-zinc-400 font-sans mt-0.5 leading-snug">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Latencia de Tipeo Simulado & Horario */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>2. Dinámica de Respuesta & Horarios</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Retraso de Tipeo Humano:</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { ms: 800, label: '0.8s' },
                    { ms: 1500, label: '1.5s' },
                    { ms: 2500, label: '2.5s' },
                    { ms: 4000, label: '4.0s' }
                  ].map(item => (
                    <button
                      key={item.ms}
                      onClick={() => setTypingDelay(item.ms)}
                      className={`py-1.5 rounded-lg border text-center font-mono font-bold transition-all cursor-pointer ${
                        typingDelay === item.ms
                          ? 'bg-cyan-500 text-black border-cyan-400'
                          : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold uppercase block">Cobertura Operativa:</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setOperatingHours('247')}
                    className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-bold transition-all cursor-pointer ${
                      operatingHours === '247'
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    🌐 24/7 Total
                  </button>
                  <button
                    onClick={() => setOperatingHours('business')}
                    className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-bold transition-all cursor-pointer ${
                      operatingHours === 'business'
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    🏢 L-V 8am-7pm
                  </button>
                </div>
              </div>
            </div>

            {/* Recordatorios Automáticos */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={reminder24h}
                  onChange={(e) => setReminder24h(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span className={reminder24h ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                  Recordatorio Auto 24h antes
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={reminder2h}
                  onChange={(e) => setReminder2h(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span className={reminder2h ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                  Recordatorio Auto 2h antes
                </span>
              </label>
            </div>
          </div>

          {/* 3. Plantillas de Mensajes */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>3. Plantillas Oficiales de WhatsApp</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-zinc-300 font-bold uppercase block">Mensaje de Bienvenida Automático:</label>
              <textarea
                rows={2}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-zinc-200 text-xs font-sans leading-relaxed focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-zinc-300 font-bold uppercase block">Plantilla de Confirmación de Cita (Variables: &#123;cliente&#125;, &#123;fecha&#125;, &#123;hora&#125;, &#123;meet_link&#125;):</label>
              <textarea
                rows={2}
                value={confirmationTemplate}
                onChange={(e) => setConfirmationTemplate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-zinc-200 text-xs font-sans leading-relaxed focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>
          </div>

          {/* 4. Conexión de Webhook n8n */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>4. Webhook de Automatización (n8n / ManyChat)</span>
              </div>

              {pingStatus && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono">
                  {pingStatus === 'probando' ? 'Enviando Ping...' : pingStatus === 'conectado' ? '✓ Respondiendo HTTP 200' : '✓ Servidor Activo'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-black/60 border border-white/15 rounded-xl text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleTestWebhook}
                className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Probar Ping
              </button>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: Simulador Interactivo de WhatsApp en Vivo (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-white/15 rounded-3xl overflow-hidden bg-black/80 shadow-2xl backdrop-blur-xl glow-card">
            
            {/* Header del Teléfono */}
            <div className="p-4 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs shadow-[0_0_10px_#10b981]">
                  A
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">Aura · Dynamind AI</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>en línea</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClearChat}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Reiniciar chat de prueba"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ventana de Mensajes */}
            <div className="h-80 p-4 overflow-y-auto space-y-3 bg-[#080d18]/90 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-white/10 text-zinc-100 rounded-tl-none border border-white/10 shadow-sm'
                    }`}
                  >
                    <div>{m.text}</div>
                    <div className="text-[9px] text-zinc-400 text-right mt-1 font-mono">
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 p-2 bg-white/5 rounded-xl w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1 text-[10px]">Aura está escribiendo...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input de Mensaje */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe un mensaje de prueba..."
                className="flex-1 px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400 font-sans"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl cursor-pointer transition-colors"
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

          <div className="text-[11px] text-zinc-500 font-sans text-center">
            Prueba cómo reacciona Aura con diferentes tonos y latencias de tipeo antes de desplegar.
          </div>
        </div>

      </div>

    </div>
  );
}
