import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_AGENT_CONFIG } from '../data/defaultAgentConfig';
import { INITIAL_APPOINTMENTS, INITIAL_CONVERSATIONS, INITIAL_METRICS } from '../data/initialAppointments';
import { DEFAULT_SITE_CONTENT } from '../data/defaultSiteContent';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Navigation & View State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'live' | 'admin'
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard'); // 'dashboard' | 'appointments' | 'agent-brain' | 'page-editor'
  
  // 2. Active simulated appointment for WhatsApp confirmation demo
  const [activeSimAppointment, setActiveSimAppointment] = useState(null);

  // 3. Authentication State
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('dynamind_admin_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { isAuthenticated: false, user: null };
      }
    }
    return { isAuthenticated: false, user: null };
  });

  const login = (usernameOrEmail, password) => {
    const validUsers = ['admin', 'admin@dynamind.studios', 'dynamind', 'juanpablo'];
    const validPass = ['admin', 'admin123', 'dynamind2026', '123456'];

    if (validUsers.includes(usernameOrEmail.toLowerCase().trim()) && validPass.includes(password.trim())) {
      const authData = {
        isAuthenticated: true,
        user: {
          name: "Juan Pablo",
          role: "Director de Operaciones & IA",
          email: "admin@dynamind.studios"
        }
      };
      setAuth(authData);
      localStorage.setItem('dynamind_admin_auth', JSON.stringify(authData));
      return { success: true };
    }
    return { success: false, message: "Usuario o contraseña incorrectos" };
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem('dynamind_admin_auth');
    setCurrentView('home');
  };

  // 4. Appointments State
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('dynamind_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Sync to Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const fetchSupabaseData = async () => {
        try {
          const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            setAppointments(data.map(d => ({
              id: d.id,
              clientName: d.client_name,
              businessName: d.business_name,
              phone: d.phone,
              email: d.email,
              niche: d.niche,
              services: d.services || [],
              date: d.date,
              time: d.time,
              duration: d.duration || '45 min',
              status: d.status,
              bottleneck: d.bottleneck,
              meetLink: d.meet_link,
              createdAt: d.created_at,
              agentNotes: d.agent_notes
            })));
          }
        } catch (err) {
          console.log("Using local state for appointments");
        }
      };
      fetchSupabaseData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dynamind_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = async (newAptData) => {
    const id = `apt-${Date.now().toString().slice(-4)}`;
    const randomMeetCode = Math.random().toString(36).substring(2, 5) + "-" + Math.random().toString(36).substring(2, 6);
    
    const newApt = {
      id,
      clientName: newAptData.clientName || "Cliente",
      businessName: newAptData.businessName || "Empresa",
      phone: newAptData.phone || "",
      email: newAptData.email || "",
      niche: newAptData.niche || "General",
      services: newAptData.services || ["Página Web Premium Interactiva"],
      date: newAptData.date,
      time: newAptData.time,
      duration: "45 min",
      status: "pendiente", // Initial status is ALWAYS 'pendiente'
      bottleneck: newAptData.bottleneck || "",
      meetLink: `https://meet.google.com/dyn-${randomMeetCode}`,
      createdAt: new Date().toISOString(),
      agentNotes: "Agendado en web. Mensaje de confirmación enviado por Agente IA a WhatsApp."
    };

    setAppointments(prev => [newApt, ...prev]);

    // Push to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('appointments').insert({
          id: newApt.id,
          client_name: newApt.clientName,
          business_name: newApt.businessName,
          phone: newApt.phone,
          email: newApt.email,
          niche: newApt.niche,
          services: newApt.services,
          date: newApt.date,
          time: newApt.time,
          duration: newApt.duration,
          status: newApt.status,
          bottleneck: newApt.bottleneck,
          meet_link: newApt.meetLink,
          agent_notes: newApt.agentNotes,
          created_at: newApt.createdAt
        });
      } catch (e) {
        console.error("Supabase insert error:", e);
      }
    }

    // Add to conversations list for the AI agent
    const newChat = {
      id: `chat-${id}`,
      clientName: newApt.clientName,
      businessName: newApt.businessName,
      phone: newApt.phone,
      niche: newApt.niche,
      isHumanControlActive: false,
      lastMessageTime: "Ahora",
      unread: true,
      messages: [
        { sender: "system", text: "Nueva solicitud de diagnóstico registrada desde la web.", time: "Ahora" },
        { 
          sender: "bot", 
          text: `¡Hola ${newApt.clientName}! 👋 Te saluda el asistente de Dynamind Studios. Hemos recibido tu solicitud para agendar un diagnóstico el ${newApt.date} a las ${newApt.time}. ¿Deseas confirmar este espacio?`, 
          time: "Ahora" 
        }
      ]
    };

    setConversations(prev => [newChat, ...prev]);
    setActiveSimAppointment(newApt);
    return newApt;
  };

  const updateAppointmentStatus = async (id, newStatus, customNotes = null) => {
    let noteToSave = "";
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        let defaultNote = apt.agentNotes;
        if (newStatus === 'agendado') {
          defaultNote = "Confirmado por el cliente. Sala de Google Meet generada y notificada por correo.";
        } else if (newStatus === 'cancelado') {
          defaultNote = "Cancelado por el cliente / administrador.";
        }
        noteToSave = customNotes || defaultNote;
        return {
          ...apt,
          status: newStatus,
          agentNotes: noteToSave
        };
      }
      return apt;
    }));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('appointments')
          .update({ status: newStatus, agent_notes: noteToSave })
          .eq('id', id);
      } catch (e) {
        console.error("Supabase update error:", e);
      }
    }
  };

  const deleteAppointment = async (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('appointments').delete().eq('id', id);
      } catch (e) {
        console.error("Supabase delete error:", e);
      }
    }
  };

  // 5. Agent Configuration State ("El Cerebro")
  const [agentConfig, setAgentConfig] = useState(() => {
    const saved = localStorage.getItem('dynamind_agent_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_AGENT_CONFIG,
          ...parsed,
          businessHours: Array.isArray(parsed.businessHours)
            ? parsed.businessHours
            : (parsed.businessHours?.schedule || DEFAULT_AGENT_CONFIG.businessHours),
          businessInfo: {
            ...DEFAULT_AGENT_CONFIG.businessInfo,
            ...(parsed.businessInfo || {}),
            knowledgeBase: parsed.businessInfo?.knowledgeBase || DEFAULT_AGENT_CONFIG.businessInfo.knowledgeBase
          },
          systemPrompt: {
            ...DEFAULT_AGENT_CONFIG.systemPrompt,
            ...(parsed.systemPrompt || {}),
            behavioralRules: parsed.systemPrompt?.behavioralRules || DEFAULT_AGENT_CONFIG.systemPrompt.behavioralRules
          },
          services: parsed.services || DEFAULT_AGENT_CONFIG.services,
          messageSettings: {
            ...DEFAULT_AGENT_CONFIG.messageSettings,
            ...(parsed.messageSettings || {})
          }
        };
      } catch (e) {
        return DEFAULT_AGENT_CONFIG;
      }
    }
    return DEFAULT_AGENT_CONFIG;
  });

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const fetchAgentConfig = async () => {
        try {
          const { data, error } = await supabase
            .from('agent_config')
            .select('*')
            .eq('id', 'default')
            .single();

          if (!error && data) {
            setAgentConfig({
              ...DEFAULT_AGENT_CONFIG,
              systemPrompt: data.system_prompt || DEFAULT_AGENT_CONFIG.systemPrompt,
              businessInfo: data.business_info || DEFAULT_AGENT_CONFIG.businessInfo,
              businessHours: Array.isArray(data.business_hours) 
                ? data.business_hours 
                : (data.business_hours?.schedule || DEFAULT_AGENT_CONFIG.businessHours),
              services: data.services || DEFAULT_AGENT_CONFIG.services,
              messageSettings: data.message_settings || DEFAULT_AGENT_CONFIG.messageSettings
            });
          }
        } catch (e) {
          console.log("Using local agent config");
        }
      };
      fetchAgentConfig();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dynamind_agent_config', JSON.stringify(agentConfig));
  }, [agentConfig]);

  const updateAgentConfig = async (updates) => {
    const merged = { ...agentConfig, ...updates };
    setAgentConfig(merged);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('agent_config').upsert({
          id: 'default',
          system_prompt: merged.systemPrompt,
          business_info: merged.businessInfo,
          business_hours: merged.businessHours,
          services: merged.services,
          message_settings: merged.messageSettings,
          updated_at: new Date().toISOString()
        });
      } catch (e) {
        console.error("Supabase agent_config upsert error:", e);
      }
    }
  };

  // 6. Site Dynamic Content State ("Editar Página")
  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('dynamind_site_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.branding && (parsed.branding.logoUrl === '/logo.jpeg' || !parsed.branding.logoUrl)) {
          parsed.branding.logoUrl = '/logo-transparent.png';
        }
        return parsed;
      } catch (e) {
        return DEFAULT_SITE_CONTENT;
      }
    }
    return DEFAULT_SITE_CONTENT;
  });

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const fetchSiteContent = async () => {
        try {
          const { data, error } = await supabase
            .from('site_content')
            .select('*')
            .eq('id', 'default')
            .single();

          if (!error && data && data.content) {
            setSiteContent(data.content);
          }
        } catch (e) {
          console.log("Using local site content");
        }
      };
      fetchSiteContent();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dynamind_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  const updateSiteContent = async (updates) => {
    const merged = { ...siteContent, ...updates };
    setSiteContent(merged);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('site_content').upsert({
          id: 'default',
          content: merged,
          updated_at: new Date().toISOString()
        });
      } catch (e) {
        console.error("Supabase site_content upsert error:", e);
      }
    }
  };

  const resetSiteContent = () => {
    setSiteContent(DEFAULT_SITE_CONTENT);
    localStorage.setItem('dynamind_site_content', JSON.stringify(DEFAULT_SITE_CONTENT));
  };

  // 7. Conversations & Human Control State
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('dynamind_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [humanInterventionsCount, setHumanInterventionsCount] = useState(() => {
    const saved = localStorage.getItem('dynamind_human_interventions');
    return saved ? parseInt(saved) : INITIAL_METRICS.humanInterventionsCount;
  });

  useEffect(() => {
    localStorage.setItem('dynamind_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('dynamind_human_interventions', humanInterventionsCount.toString());
  }, [humanInterventionsCount]);

  const toggleHumanControl = async (chatId) => {
    let nextState = false;
    setConversations(prev => prev.map(chat => {
      if (chat.id === chatId) {
        nextState = !chat.isHumanControlActive;
        if (nextState) {
          setHumanInterventionsCount(c => c + 1);
        }
        return {
          ...chat,
          isHumanControlActive: nextState,
          messages: [
            ...chat.messages,
            {
              sender: "system",
              text: nextState ? "⚠️ Bot pausado. Control humano activado." : "✅ Bot reactivado.",
              time: "Ahora"
            }
          ]
        };
      }
      return chat;
    }));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('conversations')
          .update({ is_human_control_active: nextState })
          .eq('id', chatId);
      } catch (e) {
        console.error("Supabase toggle human control error:", e);
      }
    }
  };

  const sendChatMessage = async (chatId, text, sender = "human") => {
    let updatedMessages = [];
    setConversations(prev => prev.map(chat => {
      if (chat.id === chatId) {
        updatedMessages = [
          ...chat.messages,
          {
            sender,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        return {
          ...chat,
          lastMessageTime: "Ahora",
          messages: updatedMessages
        };
      }
      return chat;
    }));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('conversations')
          .update({ messages: updatedMessages, updated_at: new Date().toISOString() })
          .eq('id', chatId);
      } catch (e) {
        console.error("Supabase message update error:", e);
      }
    }
  };

  // 8. Computed Dynamic Metrics
  const todayStr = new Date().toISOString().split('T')[0];
  
  const curr = new Date();
  const firstDay = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(curr.setDate(firstDay)).toISOString().split('T')[0];
  const endOfWeek = new Date(curr.setDate(firstDay + 6)).toISOString().split('T')[0];

  const todayAppointments = appointments.filter(a => a.date === todayStr);
  const weekAppointments = appointments.filter(a => a.date >= startOfWeek && a.date <= endOfWeek);

  const metrics = {
    conversationsLast30Days: INITIAL_METRICS.conversationsLast30Days + conversations.length,
    todayAppointmentsCount: todayAppointments.length,
    weekAppointmentsCount: weekAppointments.length,
    humanInterventionsCount: humanInterventionsCount,
    pendingCount: appointments.filter(a => a.status === 'pendiente').length,
    confirmedCount: appointments.filter(a => a.status === 'agendado').length,
    canceledCount: appointments.filter(a => a.status === 'cancelado').length,
    isSupabaseConnected: isSupabaseConfigured
  };

  return (
    <AppContext.Provider
      value={{
        // Navigation & Views
        currentView,
        setCurrentView,
        isBookingModalOpen,
        setIsBookingModalOpen,
        activeAdminTab,
        setActiveAdminTab,
        activeSimAppointment,
        setActiveSimAppointment,

        // Auth
        auth,
        login,
        logout,

        // Appointments
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,

        // Agent Config
        agentConfig,
        updateAgentConfig,

        // Site Content Editor (CMS)
        siteContent,
        updateSiteContent,
        resetSiteContent,

        // Conversations & Human Control
        conversations,
        toggleHumanControl,
        sendChatMessage,

        // Metrics & DB Status
        metrics,
        isSupabaseConfigured
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
