// Helper to generate dates around today
const today = new Date();
const formatDate = (offsetDays) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt-101",
    clientName: "Valentina Restrepo",
    businessName: "Hostal Selva & Niebla",
    phone: "+57 314 789 2011",
    email: "valentina@selvayniebla.com",
    niche: "Hostal / Hospedaje",
    services: ["Página Web Premium Interactiva", "Conexión y Verificación de Pagos para Reservas"],
    date: formatDate(0), // Today
    time: "10:30 AM",
    duration: "45 min",
    status: "agendado", // 'pendiente' | 'agendado' | 'cancelado'
    bottleneck: "Pagamos 18% en comisiones a OTAs y tenemos un 25% de ausentismo en reservas por WhatsApp sin depósito.",
    meetLink: "https://meet.google.com/dyn-hostal-val",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    agentNotes: "Confirmado automáticamente por WhatsApp tras responder 'CONFIRMAR'."
  },
  {
    id: "apt-102",
    clientName: "Dr. Camilo Echeverry",
    businessName: "Echeverry Odontología & Láser",
    phone: "+57 320 554 9981",
    email: "contacto@echeverrydental.com",
    niche: "Clínica Dental",
    services: ["Solución de Agendamientos por WhatsApp", "Página Web Premium Interactiva"],
    date: formatDate(1), // Tomorrow
    time: "03:00 PM",
    duration: "45 min",
    status: "pendiente",
    bottleneck: "La secretaria pasa 5 horas al día respondiendo mensajes en WhatsApp para agendar citas.",
    meetLink: "https://meet.google.com/dyn-dent-eche",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    agentNotes: "Mensaje de WhatsApp enviado. Esperando confirmación del cliente."
  },
  {
    id: "apt-103",
    clientName: "Mariana Alarcón",
    businessName: "L'Atelier de Pâtisserie",
    phone: "+57 301 223 8844",
    email: "mariana@latelierpatisserie.co",
    niche: "Repostería / Pastelería",
    services: ["Página Web Premium Interactiva", "Solución a Cuellos de Botella"],
    date: formatDate(2), // In 2 days
    time: "11:00 AM",
    duration: "45 min",
    status: "agendado",
    bottleneck: "Requerimos cotizador de tartas de boda personalizado con pago de anticipo del 50%.",
    meetLink: "https://meet.google.com/dyn-pasty-mari",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    agentNotes: "Confirmado vía WhatsApp. Correo de notificación enviado."
  },
  {
    id: "apt-104",
    clientName: "Santiago Bermúdez",
    businessName: "Bistro La Cava & Terraza",
    phone: "+57 311 900 1234",
    email: "santiago@lacavabistro.com",
    niche: "Restaurante / Bar",
    services: ["Página Web Premium Interactiva", "Conexión y Verificación de Pagos para Reservas"],
    date: formatDate(-1), // Yesterday
    time: "04:30 PM",
    duration: "30 min",
    status: "cancelado",
    bottleneck: "Mesas reservadas que no llegan viernes por la noche.",
    meetLink: "https://meet.google.com/dyn-bistro-santi",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    agentNotes: "Cliente canceló por WhatsApp: 'Viaje imprevisto fuera de la ciudad'."
  },
  {
    id: "apt-105",
    clientName: "Dra. Natalia Osorio",
    businessName: "Aura Medicina Estética",
    phone: "+57 315 440 7712",
    email: "natalia@auradermoestetica.com",
    niche: "Clínica Estética",
    services: ["Solución de Agendamientos por WhatsApp", "Conexión y Verificación de Pagos para Reservas"],
    date: formatDate(4), // This week
    time: "02:00 PM",
    duration: "45 min",
    status: "agendado",
    bottleneck: "Pacientes que agendan valoración médica pero no asisten.",
    meetLink: "https://meet.google.com/dyn-aest-nat",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    agentNotes: "Confirmación exitosa con depósito validado."
  },
  {
    id: "apt-106",
    clientName: "Mateo Giraldo",
    businessName: "Giraldo Logistics & Retail",
    phone: "+57 318 661 0099",
    email: "mateo@giraldogroup.co",
    niche: "Otro Proyecto",
    services: ["Solución a Cuellos de Botella"],
    date: formatDate(8), // Next week
    time: "09:30 AM",
    duration: "30 min",
    status: "pendiente",
    bottleneck: "Digitalización de catálogo comercial B2B con pedidos automáticos.",
    meetLink: "https://meet.google.com/dyn-b2b-mat",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    agentNotes: "Agente envió WhatsApp hace 1 hora."
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: "chat-1",
    clientName: "Valentina Restrepo",
    businessName: "Hostal Selva & Niebla",
    phone: "+57 314 789 2011",
    niche: "Hostal / Hospedaje",
    isHumanControlActive: false, // false = Bot active, true = Bot paused (human in control)
    lastMessageTime: "Hace 15 min",
    unread: false,
    messages: [
      { sender: "system", text: "Nueva solicitud de diagnóstico registrada desde la web.", time: "10:15 AM" },
      { sender: "bot", text: "¡Hola Valentina! 👋 Te escribe el asistente de Dynamind Studios. Hemos registrado tu solicitud de diagnóstico para tu negocio Hostal Selva & Niebla.", time: "10:16 AM" },
      { sender: "bot", text: "Tu espacio tentativo es para hoy a las 10:30 AM. ¿Deseas confirmar la sesión para enviarte el enlace de Google Meet?", time: "10:16 AM" },
      { sender: "client", text: "¡Hola! Sí, por favor, confirmo la hora.", time: "10:20 AM" },
      { sender: "bot", text: "¡Excelente! He cambiado el estado a Agendado. Tu sala de Google Meet es: https://meet.google.com/dyn-hostal-val. Te enviamos el recordatorio a valentina@selvayniebla.com.", time: "10:21 AM" }
    ]
  },
  {
    id: "chat-2",
    clientName: "Dr. Camilo Echeverry",
    businessName: "Echeverry Odontología",
    phone: "+57 320 554 9981",
    niche: "Clínica Dental",
    isHumanControlActive: false,
    lastMessageTime: "Hace 45 min",
    unread: true,
    messages: [
      { sender: "system", text: "Nueva solicitud de diagnóstico registrada desde la web.", time: "09:30 AM" },
      { sender: "bot", text: "Hola Dr. Camilo, un gusto saludarte. Registramos tu solicitud para mañana a las 03:00 PM sobre agendamiento por WhatsApp para tu clínica.", time: "09:31 AM" },
      { sender: "bot", text: "¿Te queda bien este horario para confirmar tu reunión con nuestro director de tecnología?", time: "09:31 AM" },
      { sender: "client", text: "¿Tienen experiencia integrando con historias clínicas de odontología antes de confirmar?", time: "09:50 AM" }
    ]
  },
  {
    id: "chat-3",
    clientName: "Andrés Delgado",
    businessName: "Club Nocturno Obsidiana",
    phone: "+57 300 455 1122",
    niche: "Restaurante / Bar",
    isHumanControlActive: true, // Paused by human
    lastMessageTime: "Ayer",
    unread: false,
    messages: [
      { sender: "bot", text: "Hola Andrés, gracias por contactar a Dynamind Studios. ¿En qué podemos ayudarte hoy?", time: "Ayer 04:00 PM" },
      { sender: "client", text: "Hola, necesito hablar con un asesor directo urgente por un evento este fin de semana.", time: "Ayer 04:02 PM" },
      { sender: "bot", text: "Entiendo perfectamente tu consulta. He pausado la atención automática y estoy transfiriendo esta conversación a un asesor humano del equipo directivo.", time: "Ayer 04:03 PM" },
      { sender: "human", text: "Hola Andrés, habla Juan Pablo de Dynamind Studios. Cuéntame qué necesitas para el evento de este finde.", time: "Ayer 04:05 PM" }
    ]
  }
];

export const INITIAL_METRICS = {
  conversationsLast30Days: 148,
  humanInterventionsCount: 14
};
