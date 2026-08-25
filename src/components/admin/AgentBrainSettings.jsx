import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, Sparkles, Building, Clock, Briefcase, MessageSquare, 
  Plus, Trash2, Save, Check, RotateCcw, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_AGENT_CONFIG } from '../../data/defaultAgentConfig';
import confetti from 'canvas-confetti';

export default function AgentBrainSettings() {
  const { agentConfig, updateAgentConfig } = useApp();
  const [form, setForm] = useState(() => ({
    ...DEFAULT_AGENT_CONFIG,
    ...agentConfig,
    businessHours: Array.isArray(agentConfig?.businessHours)
      ? agentConfig.businessHours
      : (agentConfig?.businessHours?.schedule || DEFAULT_AGENT_CONFIG.businessHours),
    businessInfo: {
      ...DEFAULT_AGENT_CONFIG.businessInfo,
      ...(agentConfig?.businessInfo || {}),
      knowledgeBase: agentConfig?.businessInfo?.knowledgeBase || DEFAULT_AGENT_CONFIG.businessInfo.knowledgeBase
    },
    systemPrompt: {
      ...DEFAULT_AGENT_CONFIG.systemPrompt,
      ...(agentConfig?.systemPrompt || {}),
      behavioralRules: agentConfig?.systemPrompt?.behavioralRules || DEFAULT_AGENT_CONFIG.systemPrompt.behavioralRules
    },
    services: agentConfig?.services || DEFAULT_AGENT_CONFIG.services,
    messageSettings: {
      ...DEFAULT_AGENT_CONFIG.messageSettings,
      ...(agentConfig?.messageSettings || {})
    }
  }));

  const [activeSubTab, setActiveSubTab] = useState('prompt'); // 'prompt' | 'business' | 'hours' | 'services' | 'messages'
  const [newRule, setNewRule] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const scheduleList = Array.isArray(form?.businessHours)
    ? form.businessHours
    : (form?.businessHours?.schedule || DEFAULT_AGENT_CONFIG.businessHours);

  const handleSave = () => {
    updateAgentConfig(form);
    setSavedFeedback(true);
    confetti({ particleCount: 50, spread: 45 });
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setForm(prev => ({
        ...prev,
        systemPrompt: {
          ...prev.systemPrompt,
          behavioralRules: [...(prev.systemPrompt?.behavioralRules || []), newRule.trim()]
        }
      }));
      setNewRule('');
    }
  };

  const handleRemoveRule = (index) => {
    setForm(prev => ({
      ...prev,
      systemPrompt: {
        ...prev.systemPrompt,
        behavioralRules: (prev.systemPrompt?.behavioralRules || []).filter((_, i) => i !== index)
      }
    }));
  };

  const handleScheduleChange = (idx, field, value) => {
    const updated = [...scheduleList];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm(prev => ({
      ...prev,
      businessHours: updated
    }));
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <span>🧠</span>
            <span>INTELIGENCIA ARTIFICIAL & REGLAS</span>
          </div>
          <h2 className="text-2xl font-bold font-heading-luxury text-white">
            Personalización del Agente IA
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Configura el rol, restricciones, base de conocimiento y protocolo de agendamiento para WhatsApp.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md transition-all self-start sm:self-auto"
        >
          {savedFeedback ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>¡Cerebro Actualizado!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Configuración</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'prompt', label: '🤖 System Prompt & Reglas', emoji: '🤖' },
          { id: 'business', label: '🏢 Negocio & Base de Conocimiento', emoji: '🏢' },
          { id: 'hours', label: '⏰ Horarios Comerciales', emoji: '⏰' },
          { id: 'services', label: '📦 Catálogo de Servicios', emoji: '📦' },
          { id: 'messages', label: '💬 Mensajes & Handover', emoji: '💬' }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. SYSTEM PROMPT & BEHAVIORAL RULES */}
      {activeSubTab === 'prompt' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Role & Tone */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>🎭</span>
              <span>Definición de Rol & Tono</span>
            </h3>
            <textarea
              rows="3"
              value={form.systemPrompt?.roleAndTone || ""}
              onChange={(e) => setForm({
                ...form,
                systemPrompt: { ...form.systemPrompt, roleAndTone: e.target.value }
              })}
              className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Behavioral Rules */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>🛡️</span>
              <span>Reglas de Comportamiento Estrictas</span>
            </h3>

            <div className="space-y-2">
              {(form.systemPrompt?.behavioralRules || []).map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <span className="text-zinc-500 font-mono text-[11px]">{idx + 1}.</span>
                    <span>{rule}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveRule(idx)}
                    className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add rule */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Añadir nueva regla de conducta (ej: Nunca ofrecer descuentos no autorizados)..."
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
                className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
              />
              <button
                onClick={handleAddRule}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </button>
            </div>
          </div>

        </motion.div>
      )}

      {/* 2. BUSINESS INFO & KNOWLEDGE BASE */}
      {activeSubTab === 'business' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* General Business Data */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>🏢</span>
              <span>Datos Oficiales de la Empresa</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  value={form.businessInfo?.businessName || ""}
                  onChange={(e) => setForm({
                    ...form,
                    businessInfo: { ...form.businessInfo, businessName: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Teléfono de Soporte</label>
                <input
                  type="text"
                  value={form.businessInfo?.phone || ""}
                  onChange={(e) => setForm({
                    ...form,
                    businessInfo: { ...form.businessInfo, phone: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Dirección Física</label>
                <input
                  type="text"
                  value={form.businessInfo?.physicalAddress || ""}
                  onChange={(e) => setForm({
                    ...form,
                    businessInfo: { ...form.businessInfo, physicalAddress: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Knowledge Base (FAQs & Policies) */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>📚</span>
              <span>Base de Conocimiento (FAQs & Políticas)</span>
            </h3>

            <div className="space-y-3">
              {(form.businessInfo?.knowledgeBase || []).map((faq, idx) => (
                <div key={faq.id || idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const newKb = [...(form.businessInfo?.knowledgeBase || [])];
                        newKb[idx] = { ...newKb[idx], question: e.target.value };
                        setForm({
                          ...form,
                          businessInfo: { ...form.businessInfo, knowledgeBase: newKb }
                        });
                      }}
                      className="flex-1 bg-transparent font-bold text-white focus:outline-none border-b border-transparent focus:border-white/20 pb-0.5"
                    />
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-400 font-mono">
                      {faq.category}
                    </span>
                  </div>

                  <textarea
                    rows="2"
                    value={faq.answer}
                    onChange={(e) => {
                      const newKb = [...(form.businessInfo?.knowledgeBase || [])];
                      newKb[idx] = { ...newKb[idx], answer: e.target.value };
                      setForm({
                        ...form,
                        businessInfo: { ...form.businessInfo, knowledgeBase: newKb }
                      });
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-zinc-300 text-[11px] leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}

      {/* 3. BUSINESS HOURS (100% Null Safe) */}
      {activeSubTab === 'hours' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>⏰</span>
              <span>Jornada Comercial & Horarios de Agendamiento</span>
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Define los días hábiles y las horas de apertura para evitar que el bot o el calendario permitan citas fuera de horario.
            </p>

            <div className="space-y-2 text-xs">
              {scheduleList.map((item, idx) => (
                <div 
                  key={item.day || idx}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                    item.active 
                      ? 'bg-white/[0.02] border-white/10 text-white' 
                      : 'bg-black/40 border-white/5 text-zinc-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={Boolean(item.active)}
                      onChange={(e) => handleScheduleChange(idx, 'active', e.target.checked)}
                      className="w-4 h-4 rounded bg-black border-white/20 accent-white"
                    />
                    <span className="font-semibold text-xs w-24">{item.day}</span>
                  </div>

                  {item.active ? (
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <input
                        type="time"
                        value={item.openTime || item.open || "08:00"}
                        onChange={(e) => {
                          handleScheduleChange(idx, 'openTime', e.target.value);
                          handleScheduleChange(idx, 'open', e.target.value);
                        }}
                        className="bg-black/60 border border-white/15 rounded-lg px-2 py-1 text-white"
                      />
                      <span className="text-zinc-500">hasta</span>
                      <input
                        type="time"
                        value={item.closeTime || item.close || "18:00"}
                        onChange={(e) => {
                          handleScheduleChange(idx, 'closeTime', e.target.value);
                          handleScheduleChange(idx, 'close', e.target.value);
                        }}
                        className="bg-black/60 border border-white/15 rounded-lg px-2 py-1 text-white"
                      />
                    </div>
                  ) : (
                    <span className="text-zinc-500 font-mono text-[11px]">Cerrado</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}

      {/* 4. SERVICES CATALOG */}
      {activeSubTab === 'services' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>📦</span>
              <span>Catálogo de Servicios & Duración</span>
            </h3>

            <div className="space-y-3">
              {(form.services || []).map((svc, idx) => (
                <div key={svc.id || idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={svc.name}
                      onChange={(e) => {
                        const newSvcs = [...(form.services || [])];
                        newSvcs[idx] = { ...newSvcs[idx], name: e.target.value };
                        setForm({ ...form, services: newSvcs });
                      }}
                      className="font-bold text-white bg-transparent flex-1 focus:outline-none"
                    />
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-zinc-400">{svc.durationMinutes} min</span>
                      <span className="text-emerald-400 font-bold">{svc.priceEstimate}</span>
                    </div>
                  </div>

                  <textarea
                    rows="2"
                    value={svc.description}
                    onChange={(e) => {
                      const newSvcs = [...(form.services || [])];
                      newSvcs[idx] = { ...newSvcs[idx], description: e.target.value };
                      setForm({ ...form, services: newSvcs });
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-zinc-300 text-[11px] leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}

      {/* 5. MESSAGES & HANDOVER */}
      {activeSubTab === 'messages' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/10 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading-luxury">
              <span>💬</span>
              <span>Mensajes Predefinidos & Handover Humano</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-zinc-400 font-medium block mb-1.5">👋 Saludo Inicial Automático</label>
                <textarea
                  rows="3"
                  value={form.messageSettings?.initialGreeting || ""}
                  onChange={(e) => setForm({
                    ...form,
                    messageSettings: { ...form.messageSettings, initialGreeting: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-medium block mb-1.5">🤝 Mensaje de Handover (Transferencia a Asesor Real)</label>
                <textarea
                  rows="3"
                  value={form.messageSettings?.handoverMessage || ""}
                  onChange={(e) => setForm({
                    ...form,
                    messageSettings: { ...form.messageSettings, handoverMessage: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white leading-relaxed"
                />
              </div>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}
