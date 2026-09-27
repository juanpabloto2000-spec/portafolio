import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const LeadContext = createContext();

const INITIAL_DEMO_LEADS = [
  {
    id: 'lead-1719001',
    client_name: 'Santiago Morales',
    business_name: 'Terraza Gastrobar 360',
    profile_type: 'Dueño de Empresa',
    niche: 'Gastronomía & Bares',
    bottleneck: 'Pérdida del 35% de pedidos en horas pico por WhatsApp saturado y falta de comanda digital directa',
    friction_score: 88,
    category: 'POTENCIAL', // POTENCIAL 💎 | CURIOSO 👀
    phone: '+57 312 456 7890',
    date: '2026-09-28',
    time: '04:00 PM',
    meet_link: 'https://meet.google.com/dyn-tzg-360',
    status: 'agendado', // agendado | demo_realizada | cerrada | descartada
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'lead-1719002',
    client_name: 'Dra. Valeria Restrepo',
    business_name: 'Clínica Odontológica Restrepo',
    profile_type: 'Dueño de Empresa',
    niche: 'Salud & Odontología',
    bottleneck: 'Sitio web antiguo no califica pacientes; secretarias reciben 40 mensajes diarios de personas sin capacidad de pago',
    friction_score: 82,
    category: 'POTENCIAL',
    phone: '+57 320 987 6543',
    date: '2026-09-29',
    time: '11:30 AM',
    meet_link: 'https://meet.google.com/dyn-cor-val',
    status: 'agendado',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'lead-1719003',
    client_name: 'Mateo Cárdenas',
    business_name: 'High Performance Mentorship',
    profile_type: 'Marca Personal',
    niche: 'Mentoría & Consultoría',
    bottleneck: 'Paso 3 horas diarias en Instagram chateando con curiosos sin oferta validada en vez de atender llamadas de $1,000 USD',
    friction_score: 91,
    category: 'POTENCIAL',
    phone: '+57 301 234 5678',
    date: '2026-09-30',
    time: '02:30 PM',
    meet_link: 'https://meet.google.com/dyn-hpm-mat',
    status: 'demo_realizada',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString()
  },
  {
    id: 'lead-1719004',
    client_name: 'Carlos Ruiz',
    business_name: 'Proyecto Ropa Sin Nombre',
    profile_type: 'Dueño de Empresa',
    niche: 'Retail & Comercio',
    bottleneck: 'Quiero ver cómo funciona una web pero todavía no tengo productos ni presupuesto definido',
    friction_score: 42,
    category: 'CURIOSO',
    phone: '+57 315 111 2233',
    date: '2026-10-02',
    time: '10:00 AM',
    meet_link: 'https://meet.google.com/dyn-crz-ret',
    status: 'agendado',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    try {
      const stored = localStorage.getItem('dynamind_leads_vault');
      return stored ? JSON.parse(stored) : INITIAL_DEMO_LEADS;
    } catch {
      return INITIAL_DEMO_LEADS;
    }
  });

  const [availableSlots] = useState([
    '10:00 AM',
    '11:30 AM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM'
  ]);

  useEffect(() => {
    try {
      localStorage.setItem('dynamind_leads_vault', JSON.stringify(leads));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [leads]);

  // Sincronización pasiva desde Supabase si hay conexión disponible
  useEffect(() => {
    async function fetchRemoteLeads() {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Unir evitando duplicados
          setLeads(prev => {
            const remoteIds = new Set(data.map(d => d.id));
            const localOnly = prev.filter(p => !remoteIds.has(p.id));
            return [...data, ...localOnly];
          });
        }
      } catch (err) {
        console.info('Supabase leads offline/unreachable, using local vault.');
      }
    }
    fetchRemoteLeads();
  }, []);

  // Función de sanitización anti-XSS estricta
  const sanitize = (str, maxLen = 250) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/[<>]/g, '') // Erradica tags HTML
      .replace(/javascript:/gi, '')
      .substring(0, maxLen)
      .trim();
  };

  const addLead = async (leadData) => {
    // 1. Detección de Bot Trampa (Honeypot Trap)
    if (leadData.website_trap && leadData.website_trap.trim().length > 0) {
      console.warn('Ciberseguridad: Bot detectado mediante honeypot. Descartado.');
      return { id: 'bot-blocked', category: 'BOT', status: 'descartada' };
    }

    // 2. Control de Rate Limiting / Prevención de Click-Spamming (15s cooldown)
    const lastSubTs = localStorage.getItem('dynamind_last_sub_ts');
    const now = Date.now();
    if (lastSubTs && (now - Number(lastSubTs)) < 15000) {
      throw new Error('Por seguridad, espera unos segundos antes de enviar otra reserva.');
    }
    localStorage.setItem('dynamind_last_sub_ts', String(now));

    const id = `dyn-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const meetHash = Math.random().toString(36).substring(2, 6);
    const meet_link = `https://meet.google.com/dyn-${meetHash}-${id.substring(4, 7)}`;
    
    // 3. Sanitización de Datos del Lead
    const client_name = sanitize(leadData.client_name, 80);
    const business_name = sanitize(leadData.business_name, 100);
    const bottleneck = sanitize(leadData.bottleneck, 300);
    const phone = sanitize(leadData.phone, 30);
    const profile_type = sanitize(leadData.profile_type, 60);
    const niche = sanitize(leadData.niche, 80);

    // 4. Perfilamiento Algorítmico de Fricción & Cualificación
    const friction = Number(leadData.friction_score) || 75;
    const isCurious = bottleneck.toLowerCase().includes('curios') || 
                      business_name.toLowerCase().includes('idea') ||
                      friction < 60;
    const category = isCurious ? 'CURIOSO' : 'POTENCIAL';

    const newLead = {
      id,
      client_name,
      business_name,
      profile_type,
      niche,
      bottleneck,
      phone,
      date: leadData.date || '',
      time: leadData.time || '',
      meet_link,
      category,
      status: 'agendado',
      created_at: new Date().toISOString(),
      friction_score: friction
    };

    setLeads(prev => [newLead, ...prev]);

    // 5. Persistencia Segura en Supabase (si está configurado)
    try {
      await supabase.from('leads').insert([newLead]);
    } catch (err) {
      console.warn('Supabase remote insert fallback to local-first:', err);
    }

    // 6. Disparo Asíncrono al Webhook de n8n (Orquestador de Backoffice)
    const n8nWebhook = import.meta.env.VITE_N8N_WEBHOOK_URL;
    if (n8nWebhook) {
      try {
        fetch(n8nWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        }).catch(() => {});
      } catch {}
    }

    return newLead;
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    try {
      supabase.from('leads').update({ status: newStatus }).eq('id', id).catch(() => {});
    } catch {}
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    try {
      supabase.from('leads').delete().eq('id', id).catch(() => {});
    } catch {}
  };

  // KPIs en tiempo real
  const totalLeads = leads.length;
  const potentialLeads = leads.filter(l => l.category === 'POTENCIAL').length;
  const curiousLeads = leads.filter(l => l.category === 'CURIOSO').length;
  const scheduledCalls = leads.filter(l => l.status === 'agendado').length;
  const closedDeals = leads.filter(l => l.status === 'cerrada').length;
  const conversionRate = totalLeads > 0 ? Math.round((potentialLeads / totalLeads) * 100) : 0;

  return (
    <LeadContext.Provider value={{
      leads,
      availableSlots,
      addLead,
      updateLeadStatus,
      deleteLead,
      kpis: {
        totalLeads,
        potentialLeads,
        curiousLeads,
        scheduledCalls,
        closedDeals,
        conversionRate
      }
    }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads debe usarse dentro de un LeadProvider');
  }
  return context;
}
