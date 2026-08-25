import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, Save, Plus, Trash2, Check, Clock, Building, MessageSquare, 
  BookOpen, ShieldCheck, Sparkles, AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export default function AgentBrainSettings() {
  const { agentConfig, updateAgentConfig } = useApp();

  const [form, setForm] = useState(agentConfig);
  const [activeSection, setActiveSection] = useState('prompt'); // 'prompt' | 'business' | 'hours' | 'services' | 'messages'
  const [savedFeedback, setSavedFeedback] = useState(false);

  // New item draft states
  const [newRule, setNewRule] = useState('');
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('Servicios');

  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState(30);

  const handleSaveAll = () => {
    updateAgentConfig(form);
    setSavedFeedback(true);
    confetti({ particleCount: 50, spread: 45 });
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  // Rule Handlers
  const handleAddRule = () => {
    if (!newRule.trim()) return;
    setForm(prev => ({
      ...prev,
      systemPrompt: {
        ...prev.systemPrompt,
        behavioralRules: [...prev.systemPrompt.behavioralRules, newRule.trim()]
      }
    }));
    setNewRule('');
  };

  const handleRemoveRule = (index) => {
    setForm(prev => ({
      ...prev,
      systemPrompt: {
        ...prev.systemPrompt,
        behavioralRules: prev.systemPrompt.behavioralRules.filter((_, i) => i !== index)
      }
    }));
  };

  // FAQ Handlers
  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: newFaqCategory
    };
    setForm(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        knowledgeBase: [...prev.businessInfo.knowledgeBase, newFaq]
      }
    }));
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  const handleRemoveFaq = (id) => {
    setForm(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        knowledgeBase: prev.businessInfo.knowledgeBase.filter(f => f.id !== id)
      }
    }));
  };

  // Service Handlers
  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    const newSrv = {
      id: `srv-${Date.now()}`,
      name: newServiceName.trim(),
      description: newServiceDesc.trim() || 'Servicio especializado de alta conversión.',
      durationMinutes: parseInt(newServiceDuration) || 30,
      priceEstimate: 'A convenir'
    };
    setForm(prev => ({
      ...prev,
      services: [...prev.services, newSrv]
    }));
    setNewServiceName('');
    setNewServiceDesc('');
    setNewServiceDuration(30);
  };

  const handleRemoveService = (id) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>EL CEREBRO DEL AGENTE IA</span>
          </div>
          <h2 className="text-2xl font-bold font-heading-luxury text-white">
            Personalización & Entrenamiento
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Ajusta los prompts de sistema, base de conocimiento, horarios de atención y mensajes de transferencia.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 shadow-md transition-all self-start sm:self-auto"
        >
          {savedFeedback ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>¡Parámetros Guardados!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Configuración IA</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'prompt', label: '1. System Prompt & Reglas', icon: Bot },
          { id: 'business', label: '2. Info de Negocio & FAQs', icon: Building },
          { id: 'hours', label: '3. Horarios Comerciales', icon: Clock },
          { id: 'services', label: '4. Catálogo de Servicios', icon: ShieldCheck },
          { id: 'messages', label: '5. Saludos & Handover', icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                isActive 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. SYSTEM PROMPT & BEHAVIOR */}
      {activeSection === 'prompt' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Role and Tone */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-3">
            <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
              Rol & Tono del Asistente
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Define la personalidad, nivel de formalidad y directriz principal del bot en WhatsApp.
            </p>
            <textarea
              rows="4"
              value={form.systemPrompt.roleAndTone}
              onChange={(e) => setForm({
                ...form,
                systemPrompt: { ...form.systemPrompt, roleAndTone: e.target.value }
              })}
              className="w-full bg-black/60 border border-white/15 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 leading-relaxed"
            />
          </div>

          {/* Behavioral Rules */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
                  Reglas de Comportamiento Estrictas
                </h3>
                <p className="text-xs text-zinc-400 font-light">
                  Límites y protocolos obligatorios que el bot nunca debe romper.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {form.systemPrompt.behavioralRules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <span className="text-zinc-300 font-light leading-snug">• {rule}</span>
                  <button
                    onClick={() => handleRemoveRule(idx)}
                    className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new rule */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Escribe una nueva regla estricta..."
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
                className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Regla</span>
              </button>
            </div>
          </div>

          {/* User Logic (New vs Recurring) */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
              Lógica de Usuario (Nuevos vs. Recurrentes)
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Determina cómo interactúa el bot según el historial del cliente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-zinc-300 font-medium block">Protocolo Cliente Nuevo</label>
                <textarea
                  rows="3"
                  value={form.systemPrompt.userLogic.newClientProtocol}
                  onChange={(e) => setForm({
                    ...form,
                    systemPrompt: {
                      ...form.systemPrompt,
                      userLogic: { ...form.systemPrompt.userLogic, newClientProtocol: e.target.value }
                    }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white/50 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-zinc-300 font-medium block">Protocolo Cliente Recurrente</label>
                <textarea
                  rows="3"
                  value={form.systemPrompt.userLogic.recurringClientProtocol}
                  onChange={(e) => setForm({
                    ...form,
                    systemPrompt: {
                      ...form.systemPrompt,
                      userLogic: { ...form.systemPrompt.userLogic, recurringClientProtocol: e.target.value }
                    }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white/50 resize-none"
                />
              </div>
            </div>
          </div>

        </motion.div>
      )}

      {/* 2. BUSINESS INFO & KNOWLEDGE BASE */}
      {activeSection === 'business' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Static Info */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
              Datos Estáticos del Negocio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  value={form.businessInfo.businessName}
                  onChange={(e) => setForm({
                    ...form,
                    businessInfo: { ...form.businessInfo, businessName: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Teléfono / WhatsApp Oficial</label>
                <input
                  type="text"
                  value={form.businessInfo.phone}
                  onChange={(e) => setForm({
                    ...form,
                    businessInfo: { ...form.businessInfo, phone: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-zinc-400 block mb-1">Dirección Física / Ubicación</label>
                <input
                  type="text"
                  value={form.businessInfo.physicalAddress}
                  onChange={(e) => setForm({
                    ...form,
                    businessInfo: { ...form.businessInfo, physicalAddress: e.target.value }
                  })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Knowledge Base (FAQs) */}
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
              Base de Conocimiento (FAQs & Políticas)
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Respuestas oficiales para que el bot responda dudas frecuentes con precisión.
            </p>

            <div className="space-y-3">
              {form.businessInfo.knowledgeBase.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-zinc-300">
                      {faq.category}
                    </span>
                    <button
                      onClick={() => handleRemoveFaq(faq.id)}
                      className="text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-white">{faq.question}</h4>
                  <p className="text-zinc-300 font-light leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Add new FAQ */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 text-xs">
              <span className="font-semibold text-white block">Agregar Nueva Pregunta a la Base:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Categoría (ej. Pagos, Tiempos)"
                  value={newFaqCategory}
                  onChange={(e) => setNewFaqCategory(e.target.value)}
                  className="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Pregunta frecuente..."
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                  className="sm:col-span-2 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <textarea
                rows="2"
                placeholder="Respuesta oficial..."
                value={newFaqAnswer}
                onChange={(e) => setNewFaqAnswer(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white resize-none"
              />
              <button
                type="button"
                onClick={handleAddFaq}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Guardar FAQ</span>
              </button>
            </div>
          </div>

        </motion.div>
      )}

      {/* 3. BUSINESS HOURS */}
      {activeSection === 'hours' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <div>
              <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
                Horarios Comerciales de Apertura & Cierre
              </h3>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                Configura los días activos para evitar que el bot o la web agenden fuera de jornada.
              </p>
            </div>

            <div className="space-y-2">
              {form.businessHours.map((bh, idx) => (
                <div 
                  key={bh.day}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    bh.active ? 'bg-white/[0.02] border-white/10' : 'bg-black/40 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 w-32">
                    <input
                      type="checkbox"
                      checked={bh.active}
                      onChange={(e) => {
                        const newHours = [...form.businessHours];
                        newHours[idx].active = e.target.checked;
                        setForm({ ...form, businessHours: newHours });
                      }}
                      className="rounded accent-white cursor-pointer"
                    />
                    <span className={`font-semibold ${bh.active ? 'text-white' : 'text-zinc-500'}`}>
                      {bh.day}
                    </span>
                  </div>

                  {bh.active ? (
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span>De:</span>
                      <input
                        type="time"
                        value={bh.openTime}
                        onChange={(e) => {
                          const newHours = [...form.businessHours];
                          newHours[idx].openTime = e.target.value;
                          setForm({ ...form, businessHours: newHours });
                        }}
                        className="bg-black/60 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                      />
                      <span>A:</span>
                      <input
                        type="time"
                        value={bh.closeTime}
                        onChange={(e) => {
                          const newHours = [...form.businessHours];
                          newHours[idx].closeTime = e.target.value;
                          setForm({ ...form, businessHours: newHours });
                        }}
                        className="bg-black/60 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                      />
                      <span className="text-zinc-500">({bh.slotDuration} min/slot)</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500 font-mono italic">Cerrado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. SERVICES CATALOG */}
      {activeSection === 'services' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-4">
            <div>
              <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
                Catálogo de Servicios & Duraciones
              </h3>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                Servicios disponibles para que el agente reserve los bloques de tiempo adecuados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.services.map((srv) => (
                <div key={srv.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-3 text-xs">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-white text-sm">{srv.name}</h4>
                      <button
                        onClick={() => handleRemoveService(srv.id)}
                        className="text-zinc-500 hover:text-red-400 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-zinc-400 font-light mt-1.5 leading-relaxed">{srv.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                    <span>Duración: <strong className="text-white">{srv.durationMinutes} minutos</strong></span>
                    <span className="text-slate-300">{srv.priceEstimate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add service */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 text-xs">
              <span className="font-semibold text-white block">Agregar Nuevo Servicio al Catálogo:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nombre del servicio"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="sm:col-span-2 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="number"
                  placeholder="Duración (min)"
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(e.target.value)}
                  className="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <textarea
                rows="2"
                placeholder="Descripción del servicio..."
                value={newServiceDesc}
                onChange={(e) => setNewServiceDesc(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white resize-none"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Servicio</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5. MESSAGES & HANDOVER */}
      {activeSection === 'messages' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#0a0a0d] border border-white/10 space-y-5">
            <div>
              <h3 className="text-sm font-bold font-mono uppercase text-slate-200">
                Configuración de Mensajes Automáticos
              </h3>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                Plantillas de bienvenida y protocolo de transferencia (Handover) a un operador humano.
              </p>
            </div>

            {/* Initial Greeting */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-medium block">
                1. Saludo Inicial (Bienvenida Automática)
              </label>
              <textarea
                rows="3"
                value={form.messageSettings.initialGreeting}
                onChange={(e) => setForm({
                  ...form,
                  messageSettings: { ...form.messageSettings, initialGreeting: e.target.value }
                })}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white leading-relaxed"
              />
            </div>

            {/* Handover Message */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-medium block">
                2. Handover (Transferencia a Asesor Humano)
              </label>
              <textarea
                rows="3"
                value={form.messageSettings.handoverMessage}
                onChange={(e) => setForm({
                  ...form,
                  messageSettings: { ...form.messageSettings, handoverMessage: e.target.value }
                })}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white leading-relaxed"
              />
            </div>

            {/* Confirmation prompt */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-medium block">
                3. Pregunta de Confirmación de Cita
              </label>
              <textarea
                rows="2"
                value={form.messageSettings.confirmationPrompt}
                onChange={(e) => setForm({
                  ...form,
                  messageSettings: { ...form.messageSettings, confirmationPrompt: e.target.value }
                })}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white leading-relaxed"
              />
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
