import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_AGENT_CONFIG } from '../data/defaultAgentConfig';
import { INITIAL_APPOINTMENTS, INITIAL_CONVERSATIONS, INITIAL_METRICS } from '../data/initialAppointments';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Navigation & View State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'live' | 'admin'
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('appointments'); // 'appointments' | 'agent-brain' | 'dashboard'
  
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

  useEffect(() => {
    localStorage.setItem('dynamind_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (newAptData) => {
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

    // Also add to conversations list for the AI agent
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

  const updateAppointmentStatus = (id, newStatus, customNotes = null) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        let defaultNote = apt.agentNotes;
        if (newStatus === 'agendado') {
          defaultNote = "Confirmado por el cliente. Sala de Google Meet generada y notificada por correo.";
        } else if (newStatus === 'cancelado') {
          defaultNote = "Cancelado por el cliente / administrador.";
        }
        return {
          ...apt,
          status: newStatus,
          agentNotes: customNotes || defaultNote
        };
      }
      return apt;
    }));
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // 5. Agent Configuration State ("El Cerebro")
  const [agentConfig, setAgentConfig] = useState(() => {
    const saved = localStorage.getItem('dynamind_agent_config');
    return saved ? JSON.parse(saved) : DEFAULT_AGENT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('dynamind_agent_config', JSON.stringify(agentConfig));
  }, [agentConfig]);

  const updateAgentConfig = (updates) => {
    setAgentConfig(prev => ({
      ...prev,
      ...updates
    }));
  };

  // 6. Conversations & Human Control State
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

  const toggleHumanControl = (chatId) => {
    setConversations(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const nextState = !chat.isHumanControlActive;
        if (nextState) {
          // Increment counter when human pauses the bot
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
  };

  const sendChatMessage = (chatId, text, sender = "human") => {
    setConversations(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          lastMessageTime: "Ahora",
          messages: [
            ...chat.messages,
            {
              sender,
              text,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return chat;
    }));
  };

  // 7. Computed Dynamic Metrics
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Calculate start and end of current week
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

        // Conversations & Human Control
        conversations,
        toggleHumanControl,
        sendChatMessage,

        // Metrics
        metrics
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
