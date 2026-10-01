import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const LeadContext = createContext();

export const PIPELINE_STATUSES = [
  { id: 'agendada', label: '📅 Agendada', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60' },
  { id: 'confirmada', label: '✅ Confirmada', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' },
  { id: 'finalizada', label: '🤝 Finalizada (Reunión Hecha)', color: 'text-purple-400 bg-purple-950/40 border-purple-800/60' },
  { id: 'descartada', label: '❌ Descartada', color: 'text-red-400 bg-red-950/40 border-red-800/60' },
  { id: 'cerrada', label: '🏆 Cerrada (Venta)', color: 'text-amber-400 bg-amber-950/40 border-amber-800/60' },
];

export const INITIAL_OBJECTIONS = [
  {
    id: 'obj-101',
    lead_id: 'lead-prev-1',
    client_name: 'David Arango',
    business_name: 'Parrilla & Fuego Gourmet',
    niche: 'Gastronomía & Bares',
    date: '2026-09-28',
    category: 'PRECIO', // PRECIO | TIEMPO | TERCERO | COMPLEJIDAD | OTRO
    detail: 'Considera que la inversión inicial de desarrollo supera su presupuesto del trimestre; prefiere esperar apertura de nueva sede.',
    actionable_learning: 'Ofrecer opción de pago fraccionado 50/25/25 o lanzar primera fase solo con comanda KDS.'
  },
  {
    id: 'obj-102',
    lead_id: 'lead-prev-2',
    client_name: 'Camila Morales',
    business_name: 'Studio Pilates Core',
    niche: 'Fitness & Bienestar',
    date: '2026-09-27',
    category: 'TERCERO',
    detail: 'Su socio financiero no estuvo en la reunión y prefiere no autorizar compras de software sin demo grabada en video.',
    actionable_learning: 'Enviar siempre Loom explicativo de 2 minutos dirigido al socio que aprueba el presupuesto.'
  }
];

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
    date: '2026-09-30',
    time: '04:00 PM',
    meet_link: 'https://meet.google.com/dyn-tzg-360',
    status: 'finalizada', // agendada | confirmada | finalizada | descartada | cerrada
    last_confirmation_date: new Date().toISOString().split('T')[0],
    last_confirmation_time: '10:15 AM',
    demo_status: 'en_construccion', // no_iniciada | en_construccion | demo_finalizada | cliente_cerrado | no_vendido | cancelada
    demo_progress: 75,
    demo_phase: 'Frontoffice Dinámico Multi-Página',
    demo_images: ['/proyectos/quimbayas.png'],
    demo_notes: 'Implementando catálogo multi-toma con barra de filtros y arqueo ciego en caja.',
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
    date: '2026-09-30',
    time: '11:30 AM',
    meet_link: 'https://meet.google.com/dyn-cor-val',
    status: 'finalizada',
    last_confirmation_date: null,
    last_confirmation_time: null,
    demo_status: 'demo_finalizada',
    demo_progress: 100,
    demo_phase: 'Depuración de Mano Derecha',
    demo_images: ['/proyectos/lorena.png'],
    demo_notes: 'Demo aprobada con 0 fallas. Lista para llamada de propuesta económica.',
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
    date: '2026-09-29',
    time: '02:30 PM',
    meet_link: 'https://meet.google.com/dyn-hpm-mat',
    status: 'cerrada',
    last_confirmation_date: '2026-09-29',
    last_confirmation_time: '09:00 AM',
    demo_status: 'cliente_cerrado',
    demo_progress: 100,
    demo_phase: 'Entrega Llave en Mano',
    deal_amount: '$1,200 USD',
    close_date: '2026-09-29',
    demo_images: ['/proyectos/imperium.png'],
    demo_notes: 'Contrato firmado con anticipo del 50%.',
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
    status: 'agendada',
    last_confirmation_date: null,
    last_confirmation_time: null,
    demo_status: 'no_iniciada',
    demo_progress: 0,
    demo_phase: 'Pendiente de Triaje',
    demo_images: [],
    demo_notes: 'Perfil dudoso. Evaluar si es curioso antes de empezar demo.',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'lead-1719005',
    client_name: 'Andrés Gil',
    business_name: 'Hacienda San Jerónimo Cabañas',
    profile_type: 'Dueño de Empresa',
    niche: 'Hotelería & Glampings',
    bottleneck: 'Overbooking recurrente entre Airbnb y reservas telefónicas; clientes llegan sin cabaña disponible',
    friction_score: 89,
    category: 'POTENCIAL',
    phone: '+57 310 999 8877',
    date: '2026-10-01',
    time: '03:00 PM',
    meet_link: 'https://meet.google.com/dyn-hsj-cab',
    status: 'confirmada',
    last_confirmation_date: new Date().toISOString().split('T')[0],
    last_confirmation_time: '08:30 AM',
    demo_status: 'no_iniciada',
    demo_progress: 0,
    demo_phase: 'Pendiente de Reunión',
    demo_images: [],
    demo_notes: 'Cita confirmada para hoy en la tarde.',
    created_at: new Date(Date.now() - 3600000 * 10).toISOString()
  }
];

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    try {
      const stored = localStorage.getItem('dynamind_leads_vault');
      const parsed = stored ? JSON.parse(stored) : INITIAL_DEMO_LEADS;
      return parsed.map(lead => {
        let st = lead.status;
        if (st === 'agendado') st = 'agendada';
        else if (st === 'demo_realizada' || st === 'realizada') st = 'finalizada';
        else if (st === 'cerrado') st = 'cerrada';
        else if (st === 'descartado') st = 'descartada';
        else if (!['agendada', 'confirmada', 'finalizada', 'descartada', 'cerrada'].includes(st)) {
          st = 'agendada';
        }
        let dStatus = lead.demo_status;
        if (dStatus === 'cancelada') {
          dStatus = 'pendiente_decision';
        }
        return { ...lead, status: st, demo_status: dStatus };
      });
    } catch {
      return INITIAL_DEMO_LEADS;
    }
  });

  const [objections, setObjections] = useState(() => {
    try {
      const stored = localStorage.getItem('dynamind_objections_history');
      return stored ? JSON.parse(stored) : INITIAL_OBJECTIONS;
    } catch {
      return INITIAL_OBJECTIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dynamind_objections_history', JSON.stringify(objections));
    } catch (e) {
      console.warn('Storage save objections failed:', e);
    }
  }, [objections]);

  const [availableSlots] = useState([
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM'
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
      status: 'agendada',
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

  const updateLead = (id, partialData) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, ...partialData } : lead));
    try {
      supabase.from('leads').update(partialData).eq('id', id).catch(() => {});
    } catch {}
  };

  const cancelDemoProduction = (id, reason = 'Cancelada por el administrador') => {
    updateLead(id, {
      demo_status: 'pendiente_decision', // 🚀 Vuelve al estado del principio con naranja
      demo_progress: 0,
      demo_phase: 'Pendiente de Decisión',
      demo_cancel_reason: reason,
      demo_notes: `Producción de demo cancelada: ${reason}. Retornado al estado de decisión inicial.`
    });
  };

  const recordDemoSold = (id, { dealAmount, notes }) => {
    updateLead(id, {
      demo_status: 'cliente_cerrado',
      status: 'cerrada',
      deal_amount: dealAmount || '$4,500,000 COP',
      close_date: new Date().toISOString().split('T')[0],
      demo_notes: notes || 'Venta cerrada con éxito.'
    });
  };

  const recordDemoRejected = (id, { category, detail, learning }) => {
    const lead = leads.find(l => l.id === id);
    const objection = {
      id: `obj-${Date.now()}`,
      lead_id: id,
      client_name: lead?.client_name || 'Cliente',
      business_name: lead?.business_name || '',
      niche: lead?.niche || '',
      date: new Date().toISOString().split('T')[0],
      category: category || 'PRECIO',
      detail: detail || 'No especificó detalles.',
      actionable_learning: learning || ''
    };

    setObjections(prev => [objection, ...prev]);

    updateLead(id, {
      demo_status: 'no_vendido',
      status: 'descartada',
      rejection_objection: objection,
      demo_notes: `No se vendió: [${category}] ${detail}`
    });
  };

  const deleteObjection = (objId) => {
    setObjections(prev => prev.filter(o => o.id !== objId));
  };

  const markConfirmationSent = (id) => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updateLead(id, {
      status: 'confirmada', // ⚡ El estado cambia automáticamente por sí solo a confirmada
      last_confirmation_date: todayStr,
      last_confirmation_time: timeStr
    });
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
  const scheduledCalls = leads.filter(l => l.status === 'agendada' || l.status === 'confirmada').length;
  const closedDeals = leads.filter(l => l.status === 'cerrada').length;
  const conversionRate = totalLeads > 0 ? Math.round((potentialLeads / totalLeads) * 100) : 0;

  return (
    <LeadContext.Provider value={{
      leads,
      objections,
      availableSlots,
      addLead,
      updateLeadStatus,
      updateLead,
      cancelDemoProduction,
      recordDemoSold,
      recordDemoRejected,
      deleteObjection,
      markConfirmationSent,
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
