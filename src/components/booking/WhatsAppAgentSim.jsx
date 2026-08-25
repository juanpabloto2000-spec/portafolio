import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, CheckCheck, Video, Calendar, ArrowUpRight, 
  MessageSquare, User, Bot, AlertTriangle, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateAgentResponse, isGeminiConfigured } from '../../lib/gemini';
import { sendMeetConfirmationEmail } from '../../lib/notifications';
import confetti from 'canvas-confetti';

export default function WhatsAppAgentSim() {
  const { 
    activeSimAppointment, 
    setActiveSimAppointment, 
    updateAppointmentStatus,
    agentConfig
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState(() => {
    if (!activeSimAppointment) return [];
    return [
      {
        id: 1,
        sender: 'bot',
        text: `¡Hola ${activeSimAppointment.clientName}! 👋 Te saluda el Asistente Ejecutivo de Dynamind Studios.\n\nHemos registrado tu solicitud de diagnóstico para tu negocio "${activeSimAppointment.businessName}".\n\n📅 Fecha tentativa: ${activeSimAppointment.date}\n⏰ Hora: ${activeSimAppointment.time}\n💼 Servicio: ${activeSimAppointment.services.join(', ')}\n\n¿Deseas confirmar este espacio para enviarte el enlace oficial de Google Meet?`,
        time: 'Ahora'
      }
    ];
  });

  const [isTyping, setIsTyping] = useState(false);

  if (!activeSimAppointment) return null;

  const handleConfirm = async () => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: '¡Hola! Sí, confirmo la fecha y la hora para el diagnóstico.',
      time: 'Ahora'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Transition state in app context
    updateAppointmentStatus(activeSimAppointment.id, 'agendado');

    // Send real confirmation email with Google Meet room via Resend
    sendMeetConfirmationEmail({
      clientName: activeSimAppointment.clientName,
      businessName: activeSimAppointment.businessName,
      email: activeSimAppointment.email,
      date: activeSimAppointment.date,
      time: activeSimAppointment.time,
      services: activeSimAppointment.services,
      meetLink: activeSimAppointment.meetLink
    });

    // Try generating response with Gemini if configured
    let botReplyText = null;
    if (isGeminiConfigured) {
      botReplyText = await generateAgentResponse({
        userMessage: userMsg.text,
        conversationHistory: messages,
        agentConfig,
        clientContext: { ...activeSimAppointment, status: 'agendado' }
      });
    }

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText || `¡Excelente, ${activeSimAppointment.clientName}! 🎉\n\nTu cita ha sido CONFIRMADA con éxito.\n\n🔗 Sala de Google Meet: ${activeSimAppointment.meetLink}\n📧 Notificación y calendario enviados a: ${activeSimAppointment.email}\n\nNuestro equipo revisará los detalles de tu proyecto previo a la llamada. ¡Nos vemos pronto!`,
        time: 'Ahora'
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
      confetti({ particleCount: 75, spread: 60 });
    }, 1000);
  };

  const handleCancel = async () => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: 'Hola, se me presentó un imprevisto y deseo cancelar la cita.',
      time: 'Ahora'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Transition state in app context
    updateAppointmentStatus(activeSimAppointment.id, 'cancelado');

    let botReplyText = null;
    if (isGeminiConfigured) {
      botReplyText = await generateAgentResponse({
        userMessage: userMsg.text,
        conversationHistory: messages,
        agentConfig,
        clientContext: { ...activeSimAppointment, status: 'cancelado' }
      });
    }

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText || `Entendido, ${activeSimAppointment.clientName}. Tu cita ha sido marcada como CANCELADA y hemos liberado el horario en nuestro calendario. Cuando desees reprogramar, puedes ingresar nuevamente a nuestra web. ¡Que tengas un excelente día!`,
        time: 'Ahora'
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendCustom = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: 'Ahora'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const lower = userText.toLowerCase();
    if (lower.includes('confirm') || lower.includes('si') || lower.includes('sí') || lower.includes('listo') || lower.includes('ok')) {
      updateAppointmentStatus(activeSimAppointment.id, 'agendado');
    } else if (lower.includes('cancel') || lower.includes('no puedo') || lower.includes('reprogramar')) {
      updateAppointmentStatus(activeSimAppointment.id, 'cancelado');
    }

    // Call Gemini for human-like natural conversation
    let botResponse = null;
    if (isGeminiConfigured) {
      botResponse = await generateAgentResponse({
        userMessage: userText,
        conversationHistory: messages,
        agentConfig,
        clientContext: activeSimAppointment
      });
    }

    setTimeout(() => {
      if (!botResponse) {
        botResponse = "Entiendo tu consulta. Conforme a las directrices de Dynamind Studios, podemos revisar ese requerimiento técnico en la sesión de diagnóstico o comunicarte con un asesor directivo.";
        
        if (lower.includes('confirm') || lower.includes('si') || lower.includes('sí') || lower.includes('listo') || lower.includes('ok')) {
          botResponse = `¡Confirmación recibida! Tu estado se actualizó a AGENDADO. Tu reunión será el ${activeSimAppointment.date} a las ${activeSimAppointment.time}.\n\n🔗 Enlace Meet: ${activeSimAppointment.meetLink}`;
          confetti({ particleCount: 60, spread: 50 });
        } else if (lower.includes('cancel') || lower.includes('no puedo') || lower.includes('reprogramar')) {
          botResponse = "Hemos cancelado tu cita tentativa y liberado el cupo en el sistema. Puedes volver a agendar en cualquier momento desde la web.";
        } else if (lower.includes('humano') || lower.includes('persona') || lower.includes('asesor')) {
          botResponse = agentConfig.messageSettings.handoverMessage;
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: 'Ahora'
      }]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveSimAppointment(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* WhatsApp Mobile Simulator Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-[#0b141a] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto flex flex-col h-[650px] max-h-[92vh]"
        >
          {/* WhatsApp Header Bar */}
          <div className="bg-[#202c33] p-3.5 flex items-center justify-between border-b border-white/10 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black border border-white/20 overflow-hidden flex items-center justify-center">
                  <img src="/logo.jpeg" alt="Dynamind" className="w-full h-full object-cover" />
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#202c33] absolute bottom-0 right-0" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white leading-tight">Dynamind Studios</h4>
                  {isGeminiConfigured && (
                    <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Gemini AI</span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-400 font-mono">En línea • Agente Oficial</p>
              </div>
            </div>

            <button
              onClick={() => setActiveSimAppointment(null)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0b141a] bg-opacity-95 text-xs">
            
            {/* System Info Banner */}
            <div className="p-2.5 rounded-xl bg-[#182229] border border-white/10 text-center text-[11px] text-zinc-300">
              <span className="text-zinc-400 block text-[10px] uppercase font-mono">Estado Actual en Backend:</span>
              <span className={`font-bold capitalize ${
                activeSimAppointment.status === 'agendado' 
                  ? 'text-emerald-400' 
                  : activeSimAppointment.status === 'cancelado' 
                  ? 'text-red-400' 
                  : 'text-amber-400'
              }`}>
                {activeSimAppointment.status}
              </span>
            </div>

            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'bg-[#202c33] text-[#e9edef] rounded-tl-none border border-white/5'
                        : 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                    }`}
                  >
                    {m.text}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-zinc-400">
                      <span>{m.time}</span>
                      <CheckCheck className="w-3 h-3 text-cyan-400" />
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#202c33] text-zinc-400 w-fit text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[10px]">Agente escribiendo...</span>
              </div>
            )}
          </div>

          {/* Quick Action Buttons for the Client */}
          {activeSimAppointment.status === 'pendiente' && (
            <div className="p-2.5 bg-[#111b21] border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors text-center"
              >
                ✅ Confirmar Cita (Agendar)
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs transition-colors"
              >
                ❌ Cancelar
              </button>
            </div>
          )}

          {/* Input Footer */}
          <form onSubmit={handleSendCustom} className="p-2.5 bg-[#202c33] flex items-center gap-2 border-t border-white/10">
            <input
              type="text"
              placeholder="Escribe tu mensaje a la IA..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#2a3942] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#00a884] hover:bg-[#029070] text-black transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
