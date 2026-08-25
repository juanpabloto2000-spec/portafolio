export const DEFAULT_AGENT_CONFIG = {
  // 1. System Prompt (Configuración de Rol)
  systemPrompt: {
    roleAndTone: "Eres el Asistente Ejecutivo de Diagnóstico de Dynamind Studios. Tu tono es profesional, sobrio, analítico y altamente resolutivo. Tu objetivo es entender el modelo de negocio del cliente, calificar sus requerimientos de conversión digital (páginas web premium, agendamiento por WhatsApp, validación de anticipos o menús táctiles) y guiarlo de forma fluida hacia la confirmación de su sesión de diagnóstico estratégico.",
    behavioralRules: [
      "No inventar cotizaciones cerradas ni plazos de entrega sin evaluación previa del proyecto.",
      "Seguir estrictamente el protocolo de agendamiento y confirmación de citas en 3 pasos.",
      "Validar siempre el correo electrónico para el envío del enlace oficial de Google Meet.",
      "Si el cliente presenta dudas técnicas complejas sobre integraciones personalizadas, ofrecer transferencia a un ingeniero del equipo.",
      "Mantener la identidad de marca de Dynamind Studios: sobria, estética, minimalista y orientada a resultados."
    ],
    userLogic: {
      type: "adaptive", // adaptive, strict_new, strict_recurring
      askClientType: true,
      newClientProtocol: "Solicitar nombre comercial, sector de negocio y principal cuello de botella actual antes de coordinar el horario.",
      recurringClientProtocol: "Reconocer historial previo, consultar sobre el estado de su plataforma o nuevas integraciones y agilizar el espacio de soporte/estrategia."
    }
  },

  // 2. Información de Negocio
  businessInfo: {
    businessName: "Dynamind Studios",
    legalName: "Dynamind Studios S.A.S.",
    physicalAddress: "Torre Empresarial Platinum, Cra. 43A #1-50, Medellín, Colombia",
    phone: "+57 300 892 4110",
    email: "contacto@dynamindstudios.com",
    website: "https://dynamindstudios.com",
    knowledgeBase: [
      {
        id: "faq-1",
        question: "¿En qué consiste la sesión de diagnóstico estratégico?",
        answer: "Es una sesión de 30 a 45 minutos vía Google Meet donde analizamos el flujo actual de tu negocio, identificamos fugas de clientes o cuellos de botella operativos y estructuramos una propuesta de arquitectura web con sistemas de conversión y agendamiento a medida.",
        category: "Diagnóstico"
      },
      {
        id: "faq-2",
        question: "¿Cómo funciona el sistema de validación de depósitos para reservas?",
        answer: "Integramos pasarelas de pago y validadores automatizados que bloquean el cupo o cita solo cuando el cliente efectúa el anticipo, reduciendo el ausentismo (no-shows) a prácticamente cero.",
        category: "Sistemas"
      },
      {
        id: "faq-3",
        question: "¿Cuánto tarda el desarrollo de una web interactiva o menú táctil?",
        answer: "Los tiempos de entrega promedio varían entre 7 y 21 días hábiles según la complejidad de las integraciones (pasarelas, sincronización de agenda y panel de control).",
        category: "Tiempos"
      },
      {
        id: "faq-4",
        question: "¿Qué pasa si necesito reprogramar una cita ya agendada?",
        answer: "El cliente puede reprogramar notificando al asistente por WhatsApp con al menos 4 horas de anticipación mediante su enlace único de gestión.",
        category: "Políticas"
      }
    ],
    policies: [
      "Política de confirmación: Toda cita en estado pendiente debe confirmarse vía WhatsApp 2 horas antes de la llamada o el cupo será liberado.",
      "Tiempos de respuesta: Atención automatizada 24/7 y asistencia por asesores humanos de lunes a viernes de 8:00 AM a 7:00 PM."
    ]
  },

  // 3. Horarios Comerciales
  businessHours: [
    { day: "Lunes", active: true, openTime: "08:00", closeTime: "18:30", slotDuration: 45 },
    { day: "Martes", active: true, openTime: "08:00", closeTime: "18:30", slotDuration: 45 },
    { day: "Miércoles", active: true, openTime: "08:00", closeTime: "18:30", slotDuration: 45 },
    { day: "Jueves", active: true, openTime: "08:00", closeTime: "18:30", slotDuration: 45 },
    { day: "Viernes", active: true, openTime: "08:00", closeTime: "18:00", slotDuration: 45 },
    { day: "Sábado", active: true, openTime: "09:00", closeTime: "14:00", slotDuration: 45 },
    { day: "Domingo", active: false, openTime: "10:00", closeTime: "14:00", slotDuration: 45 }
  ],

  // 4. Gestión de Servicios
  services: [
    {
      id: "srv-web",
      name: "Página Web Premium Interactiva",
      description: "Diseño y desarrollo web a medida con identidad visual de lujo, animaciones cinéticas y arquitectura de conversión.",
      durationMinutes: 45,
      priceEstimate: "Desde $450 USD"
    },
    {
      id: "srv-booking-wa",
      name: "Solución de Agendamientos por WhatsApp",
      description: "Agente IA autónomo y sincronización de calendario en tiempo real sin cadenas de mensajes manuales.",
      durationMinutes: 30,
      priceEstimate: "Desde $280 USD"
    },
    {
      id: "srv-payments",
      name: "Conexión y Verificación de Pagos para Reservas",
      description: "Sistemas de depósito y bloqueo de cupos para eliminar cancelaciones y ausencias de última hora.",
      durationMinutes: 30,
      priceEstimate: "Desde $320 USD"
    },
    {
      id: "srv-bottlenecks",
      name: "Solución a Cuellos de Botella Operativos",
      description: "Auditoría de embudo digital, menús táctiles para restaurantes y automatización de flujos de pedidos.",
      durationMinutes: 45,
      priceEstimate: "Desde $350 USD"
    }
  ],

  // 5. Configuración de Mensajes
  messageSettings: {
    initialGreeting: "¡Hola! Gracias por comunicarte con Dynamind Studios. Soy el asistente inteligente de agendamiento y diagnóstico. ¿Es la primera vez que nos contactas o ya tienes un proyecto en marcha con nosotros?",
    handoverMessage: "Entiendo perfectamente tu consulta. He pausado la atención automática y estoy transfiriendo esta conversación a un asesor humano de nuestro equipo directivo. En breve se comunicarán contigo por este mismo chat.",
    confirmationPrompt: "Hemos registrado tu solicitud de diagnóstico para el {fecha} a las {hora} ({servicio}). ¿Deseas confirmar este espacio para enviarte el enlace de Google Meet?",
    confirmedGreeting: "¡Perfecto! Tu cita ha sido confirmada con éxito. Hemos generado tu sala de Google Meet: {meetLink} y te hemos enviado el recordatorio a {email}. ¡Nos vemos pronto!"
  }
};
