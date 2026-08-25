import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Calendar, PauseCircle, PlayCircle, UserCheck, 
  Send, Bot, User, CheckCircle2, Clock, AlertTriangle, ShieldCheck, 
  TrendingUp, Phone, ChevronRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AgentDashboard() {
  const { 
    metrics, 
    conversations, 
    toggleHumanControl, 
    sendChatMessage 
  } = useApp();

  const [selectedChatId, setSelectedChatId] = useState(conversations[0]?.id || null);
  const [replyText, setReplyText] = useState('');

  const activeChat = conversations.find(c => c.id === selectedChatId) || conversations[0];

  const handleSendManualReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChat) return;

    sendChatMessage(activeChat.id, replyText.trim(), 'human');
    setReplyText('');
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-2xl font-bold font-heading-luxury text-white">
          Dashboard de Control & Monitoreo
        </h2>
        <p className="text-xs text-zinc-400 font-light mt-1">
          Métricas de impacto de los últimos 30 días, historial de conversaciones y centro de intervención humana.
        </p>
      </div>

      {/* 1. IMPACT METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Conversations 30 days */}
        <div className="p-5 rounded-2xl bg-[#0a0a0d] border border-white/10 flex flex-col justify-between space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Conversaciones (30D)</span>
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-mono">{metrics.conversationsLast30Days}</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18% vs mes anterior</span>
            </p>
          </div>
        </div>

        {/* Metric 2: Today's Appointments */}
        <div className="p-5 rounded-2xl bg-[#0a0a0d] border border-white/10 flex flex-col justify-between space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Citas de Hoy</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-mono">{metrics.todayAppointmentsCount}</div>
            <p className="text-[11px] text-zinc-400 mt-1 font-light">
              Sesiones programadas para hoy
            </p>
          </div>
        </div>

        {/* Metric 3: Weekly Appointments */}
        <div className="p-5 rounded-2xl bg-[#0a0a0d] border border-white/10 flex flex-col justify-between space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Citas de la Semana</span>
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-mono">{metrics.weekAppointmentsCount}</div>
            <p className="text-[11px] text-zinc-400 mt-1 font-light">
              Total en semana corriente
            </p>
          </div>
        </div>

        {/* Metric 4: Human Interventions Count */}
        <div className="p-5 rounded-2xl bg-[#0a0a0d] border border-white/10 flex flex-col justify-between space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Intervención Humana</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-300 font-mono">{metrics.humanInterventionsCount}</div>
            <p className="text-[11px] text-zinc-400 mt-1 font-light">
              Veces pausado para control manual
            </p>
          </div>
        </div>

      </div>

      {/* 2. CONVERSATION CENTER & HUMAN CONTROL TOGGLE */}
      <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold font-heading-luxury text-white">
              Centro de Conversaciones en Vivo
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Supervisa las interacciones en tiempo real o pausa el bot con el interruptor para responder directamente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[480px]">
          
          {/* Left: Chats List */}
          <div className="lg:col-span-5 space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {conversations.map((chat) => {
              const isSelected = activeChat && activeChat.id === chat.id;
              const lastMsg = chat.messages[chat.messages.length - 1];

              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/10 border-white shadow-metal-glow'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="font-bold text-white text-xs">{chat.clientName}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono">{chat.businessName}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono uppercase ${
                      chat.isHumanControlActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {chat.isHumanControlActive ? 'Pausado (Humano)' : 'Bot Activo'}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-light truncate leading-relaxed">
                    {lastMsg ? lastMsg.text : 'Sin mensajes'}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-zinc-500 font-mono">
                    <span>{chat.phone}</span>
                    <span>{chat.lastMessageTime}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Chat Viewer & Human Control */}
          {activeChat ? (
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-black/60 border border-white/10 overflow-hidden">
              
              {/* Chat Header & Human Control Switch */}
              <div className="p-4 bg-[#0e0e12] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold font-mono">
                    {activeChat.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{activeChat.clientName}</h4>
                    <p className="text-[10px] text-zinc-400 font-mono">{activeChat.businessName} • {activeChat.phone}</p>
                  </div>
                </div>

                {/* HUMAN CONTROL SWITCH */}
                <div className="flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-300">
                    {activeChat.isHumanControlActive ? 'Bot Pausado' : 'Bot Activo'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleHumanControl(activeChat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                      activeChat.isHumanControlActive
                        ? 'bg-amber-400 text-black hover:bg-amber-300'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {activeChat.isHumanControlActive ? (
                      <>
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Reactivar Bot</span>
                      </>
                    ) : (
                      <>
                        <PauseCircle className="w-3.5 h-3.5" />
                        <span>Pausar (Tomar Control)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[320px] text-xs">
                {activeChat.messages.map((m, idx) => {
                  const isBot = m.sender === 'bot';
                  const isHuman = m.sender === 'human';
                  const isSystem = m.sender === 'system';

                  if (isSystem) {
                    return (
                      <div key={idx} className="text-center my-2">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-zinc-400">
                          {m.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col ${isBot || isHuman ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                          isBot
                            ? 'bg-[#18181f] text-zinc-200 border border-white/10 rounded-tl-none'
                            : isHuman
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded-tl-none'
                            : 'bg-white text-black font-medium rounded-tr-none'
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[9px] font-mono opacity-70 mb-0.5">
                          {isBot && <span>🤖 Agente IA</span>}
                          {isHuman && <span>👤 Operador Humano (Tú)</span>}
                          {!isBot && !isHuman && <span>Cliente</span>}
                        </div>
                        {m.text}
                        <div className="text-right text-[8px] opacity-50 mt-1">
                          {m.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendManualReply} className="p-3 bg-[#0e0e12] border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    activeChat.isHumanControlActive 
                      ? "Escribe como operador humano (el bot está pausado)..." 
                      : "Pausa el bot arriba para responder manualmente..."
                  }
                  value={replyText}
                  disabled={!activeChat.isHumanControlActive}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={!activeChat.isHumanControlActive || !replyText.trim()}
                  className="p-2 rounded-xl bg-white text-black hover:bg-slate-200 disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="lg:col-span-7 flex items-center justify-center p-8 text-zinc-500 text-xs">
              Selecciona una conversación para ver el historial
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
