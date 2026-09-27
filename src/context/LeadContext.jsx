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

  const addLead = async (leadData) => {
    const id = `dyn-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const meetHash = Math.random().toString(36).substring(2, 6);
    const meet_link = `https://meet.google.com/dyn-${meetHash}-${id.substring(4, 7)}`;
    
    // Clasificación algorítmica de categoría
    const friction = Number(leadData.friction_score) || 75;
    const isCurious = leadData.bottleneck?.toLowerCase().includes('curios') || 
                      leadData.business_name?.toLowerCase().includes('idea') ||
                      friction < 60;
    const category = isCurious ? 'CURIOSO' : 'POTENCIAL';

    const newLead = {
      id,
      meet_link,
      category,
      status: 'agendado',
      created_at: new Date().toISOString(),
      ...leadData,
      friction_score: friction
    };

    setLeads(prev => [newLead, ...prev]);

    // Persistencia asíncrona no-bloqueante en Supabase
    try {
      await supabase.from('leads').insert([newLead]);
    } catch (err) {
      console.warn('Supabase remote insert fallback to local-first:', err);
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
