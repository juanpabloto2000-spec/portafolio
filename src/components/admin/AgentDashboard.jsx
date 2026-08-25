import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Users, Calendar, AlertTriangle, Send, 
  UserCheck, Shield, Bot, Sparkles, Check, Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AgentDashboard() {
  const { 
    metrics, 
    conversations, 
    toggleHumanControl, 
    sendChatMessage 
  } = useApp();

  const [selectedChatId, setSelectedChatId] = useState(() => {
    return conversations.length > 0 ? conversations[0].id : null;
  });

  const [replyText, setReplyText] = useState('');

  const activeChat = conversations.find(c => c.id === selectedChatId) || conversations[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChat) return;

    sendChatMessage(activeChat.id, replyText.trim(), "human");
    setReplyText('');
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
          <span>📊</span>
          <span>PANEL DE CONTROL & MONITOREO EN VIVO</span>
        </div>
        <h2 className="text-2xl font-bold font-heading-luxury text-white">
          Métricas de Impacto & Centro de Chats
        </h2>
        <p className="text-xs text-zinc-400 font-light mt-1">
          Supervisa el volumen de atención del agente y toma el control manual de cualquier conversación en tiempo real.
        </p>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>💬 Conversaciones 30D</span>
            <span className="text-emerald-400">En línea</span>
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {metrics.conversationsLast30Days}
          </div>
          <p className="text-[11px] text-zinc-500 font-light">Total de clientes atendidos</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>📅 Citas de Hoy</span>
            <span className="text-blue-400">Agenda</span>
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {metrics.todayAppointmentsCount}
          </div>
          <p className="text-[11px] text-zinc-500 font-light">Diagnósticos programados hoy</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>🗓️ Citas de la Semana</span>
            <span className="text-purple-400">Semanal</span>
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {metrics.weekAppointmentsCount}
          </div>
          <p className="text-[11px] text-zinc-500 font-light">Total agendados esta semana</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>⏸️ Pausas Humanas</span>
            <span className="text-amber-400">Excepciones</span>
          </div>
          <div className="text-3xl font-bold font-mono text-amber-300">
            {metrics.humanInterventionsCount}
          </div>
          <p className="text-[11px] text-zinc-500 font-light">Intervenciones manuales</p>
        </div>

      </div>

      {/* Live Conversation Center */}
      <div className="rounded-2xl bg-[#09090c] border border-white/10 overflow-hidden flex flex-col md:flex-row h-[550px] shadow-2xl">
        
        {/* Left Chat Contacts List */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-black/40">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>👥</span>
              <span>Clientes & Prospectos</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">{conversations.length} activos</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {conversations.map((chat) => {
              const isSelected = chat.id === selectedChatId;
              const lastMsg = chat.messages[chat.messages.length - 1];

              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`w-full p-4 text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white/10 border-l-2 border-white'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-zinc-300 shrink-0">
                    {chat.clientName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{chat.clientName}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{chat.businessName}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      {chat.isHumanControlActive ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                          ⏸️ Control Humano
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                          🤖 Bot Activo
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-[#060608]">
            
            {/* Chat Top Header with Human Control Switch */}
            <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#09090c]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                  {activeChat.clientName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeChat.clientName}</h3>
                  <p className="text-xs text-zinc-400 font-mono">{activeChat.businessName} • {activeChat.phone}</p>
                </div>
              </div>

              {/* HUMAN CONTROL TOGGLE SWITCH */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => toggleHumanControl(activeChat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                    activeChat.isHumanControlActive
                      ? 'bg-amber-500 text-black shadow-amber-500/20'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {activeChat.isHumanControlActive ? (
                    <>
                      <span>⏸️</span>
                      <span>Bot Pausado (Control Humano Activo)</span>
                    </>
                  ) : (
                    <>
                      <span>🤖</span>
                      <span>Bot Activo (Pausar para Tomar Control)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3.5 text-xs">
              {activeChat.messages.map((msg, i) => {
                const isSystem = msg.sender === 'system';
                const isUser = msg.sender === 'user' || msg.sender === 'client';
                const isHuman = msg.sender === 'human';
                const isBot = msg.sender === 'bot';

                if (isSystem) {
                  return (
                    <div key={i} className="text-center my-2">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-mono">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1 mb-0.5 text-[10px] text-zinc-500 font-mono">
                      {isBot && <span>🤖 Agente IA</span>}
                      {isHuman && <span>👤 Operador Humano</span>}
                      {isUser && <span>👤 Cliente</span>}
                      <span>• {msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#182229] text-white rounded-tl-none border border-white/10'
                          : isHuman
                          ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                          : 'bg-[#005c4b] text-white rounded-tr-none shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Reply Form */}
            <form onSubmit={handleSendReply} className="p-3 bg-[#09090c] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={
                  activeChat.isHumanControlActive
                    ? "Escribe como operador humano (el bot está pausado)..."
                    : "Escribe una respuesta manual o pausa el bot arriba..."
                }
                className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-200 transition-all shadow-md shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-zinc-500 text-xs">
            Selecciona una conversación a la izquierda.
          </div>
        )}

      </div>

    </div>
  );
}
