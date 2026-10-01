// src/data/solarSystemData.js
// Cartografía completa del Sistema Solar 3D integrado con las soluciones y consultoría de IA soberana de Dynamind

export const CELESTIAL_BODIES = [
  // =========================================================================
  // ☀️ EL SOL // NÚCLEO CENTRAL SOBERANO
  // =========================================================================
  {
    id: "sun",
    displayName: "El Sol",
    englishName: "The Sun",
    type: "star",
    badge: "ESTRELLA MADRE // NÚCLEO SOBERANO",
    caption: "Enana amarilla • Fuente de gravedad y soberanía tecnológica",
    description: "El centro gravitacional de nuestro sistema solar y fuente de energía vital. Representa el Núcleo de Consultoría de IA de Dynamind: donde se originan la arquitectura, el código propietario y la soberanía tecnológica de tu empresa.",
    astronomy: {
      diameter: "1.392.700 km (109x la Tierra)",
      coreTemp: "15.000.000 °C",
      surfaceTemp: "5.500 °C",
      mass: "333.000 masas terrestres",
      rotationPeriod: "27 días terrestres",
      distanceFromCenter: "0 km (Centro del Sistema)",
    },
    orbit: {
      orbitObject: null,
      scaledOrbitalRadius: 0,
      orbitalVelocity: 0,
      rotationVelocity: 1.2,
      orbitalInclination: 0,
      axialTilt: 7.25,
      cameraDistance: 70,
    },
    system: {
      category: "Núcleo Soberano",
      name: "Consultoría de IA Soberana & Arquitectura Empresarial",
      tagline: "NO SOMOS UNA AGENCIA. Diseñamos sistemas con código 100% propio entregado en tu GitHub sin rentas mensuales.",
      bottleneckD0: "Dependencia de SaaS ajenos que suben tarifas cada año y agencias que solo revenden suscripciones sin tocar una sola línea de código real.",
      pipeline: [
        { step: "01", title: "Diagnóstico D0", desc: "Identificación implacable del cuello de botella que frena la rentabilidad." },
        { step: "02", title: "Arquitectura a Medida", desc: "Modelado de base de datos relacional y lógica de negocio desacoplada." },
        { step: "03", title: "Código Propietario", desc: "Entrega completa en el repositorio GitHub de tu empresa con licencia perpetua." },
        { step: "04", title: "Soberanía Total", desc: "Despliegue en tus propios servidores (Cloudflare / VPS) sin comisiones por usuario." }
      ],
      capabilities: [
        "Auditoría rigurosa de 14 dimensiones operativas antes de programar",
        "Propiedad intelectual 100% tuya con acceso total a commits y código fuente",
        "Dualidad: sistemas operativos complejos (PMS/DSB/KDS) + micro-agentes de tareas específicas",
        "Cero suscripciones de intermediarios: tu negocio es dueño de sus datos y algoritmos",
        "Hardening defensivo con RLS en PostgreSQL y validación de esquemas Zod"
      ],
      technologies: ["Node.js / React 18", "PostgreSQL / Supabase", "Three.js WebGL", "Zod", "Docker / VPS", "GitHub Enterprise"],
      metrics: {
        headline: "100% CÓDIGO PROPIO",
        subtext: "0% Renta de software mensual a agencias",
        speed: "Despliegue Soberano",
        impact: "Control Patrimonial Total"
      }
    }
  },

  // =========================================================================
  // ☿️ MERCURIO // EL MÁS VELOZ
  // =========================================================================
  {
    id: "mercury",
    displayName: "Mercurio",
    englishName: "Mercury",
    type: "rocky_planet",
    badge: "PLANETA INTERIOR // AGILIDAD SERVERLESS",
    caption: "Planeta más veloz • Órbita en 88 días",
    description: "Mercurio es el planeta más cercano al Sol y el más rápido del sistema solar. En Dynamind encarna la red de micro-agentes y flujos n8n autónomos: sincronizaciones ultrarrápidas en milisegundos sin latencia ni cuellos de botella.",
    astronomy: {
      diameter: "4.879 km (0,38x la Tierra)",
      distanceFromSun: "57,9 millones km (0,39 UA)",
      surfaceTemp: "-170 °C a 449 °C",
      orbitPeriod: "88 días terrestres",
      dayDuration: "59 días terrestres",
      moons: 0,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 26,
      orbitalVelocity: 47.9,
      rotationVelocity: 0.05,
      orbitalInclination: 7.0,
      axialTilt: 0.03,
      cameraDistance: 12,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Agentes n8n Autónomos & Pipelines Serverless",
      tagline: "Automatizaciones de misión específica que eliminan tareas repetitivas y sincronizan tu negocio en milisegundos.",
      bottleneckD0: "Copia manual de datos entre CRMs, hojas de cálculo y sistemas contables, generando errores humanos y pérdida de horas hombre.",
      pipeline: [
        { step: "01", title: "Trigger Webhook", desc: "Captura de eventos en tiempo real desde formularios, pasarelas o ERPs." },
        { step: "02", title: "Normalización Zod", desc: "Limpieza, validación de tipos y sanitización de datos entrantes." },
        { step: "03", title: "Ejecución Asíncrona", desc: "Enrutamiento paralelo sin bloquear la interfaz de usuario." },
        { step: "04", title: "Log Inmutable", desc: "Registro de telemetría y reintentos automáticos con exponential backoff." }
      ],
      capabilities: [
        "Flujos n8n self-hosted alojados en tus propios servidores sin límites de ejecuciones",
        "Disparadores bidireccionales con webhooks firmados criptográficamente (HMAC SHA-256)",
        "Sincronización multi-plataforma entre WhatsApp, Supabase, Google Sheets y CRM",
        "Manejo estructurado de excepciones y auto-curación de fallos en background",
        "Cero consumo manual de tiempo operativo en conciliación de registros"
      ],
      technologies: ["n8n Enterprise", "Node.js", "Webhooks HMAC", "Redis Queues", "TypeScript"],
      metrics: {
        headline: "<120 ms",
        subtext: "Tiempo promedio de sincronización de eventos",
        speed: "Zero-Latency Workflows",
        impact: "-95% Carga Operativa Manual"
      }
    }
  },

  // =========================================================================
  // ♀️ VENUS // ALTA PRESIÓN Y CONVERSIÓN
  // =========================================================================
  {
    id: "venus",
    displayName: "Venus",
    englishName: "Venus",
    type: "rocky_planet",
    badge: "PLANETA INTERIOR // MÁXIMA CONVERSIÓN",
    caption: "El lucero del alba • Atmósfera densa y presión extrema",
    description: "Venus es el planeta más caliente del sistema solar debido a su densa atmósfera de efecto invernadero. Representa el agente de WhatsApp CRM con IA de alta presión y conversión: atención inmediata las 24 horas del día que califica y cierra leads al instante.",
    astronomy: {
      diameter: "12.104 km (0,95x la Tierra)",
      distanceFromSun: "108,2 millones km (0,72 UA)",
      surfaceTemp: "465 °C constante",
      orbitPeriod: "225 días terrestres",
      dayDuration: "243 días terrestres (retrógrado)",
      moons: 0,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 34,
      orbitalVelocity: 35.0,
      rotationVelocity: -0.04,
      orbitalInclination: 3.4,
      axialTilt: 177.3,
      cameraDistance: 14,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "WhatsApp AI Agent & Lead Scoring Predictivo",
      tagline: "Agente conversacional de alta conversión entrenado con la voz de tu marca que atiende y califica prospectos 24/7.",
      bottleneckD0: "Leads fríos que se enfrían y van con la competencia porque tardan más de 15 minutos en responder en WhatsApp.",
      pipeline: [
        { step: "01", title: "Respuesta Inmediata", desc: "Saludo y empatía contextual en menos de 25 segundos las 24 horas." },
        { step: "02", title: "Calificación Scoring", desc: "Evaluación de presupuesto, urgencia y fit del prospecto en tiempo real." },
        { step: "03", title: "Agendamiento 1-Click", desc: "Integración nativa con Google Calendar y pasarelas de pago para señas." },
        { step: "04", title: "Handoff Humano VIP", desc: "Notificación prioritaria al asesor humano cuando el lead está listo para comprar." }
      ],
      capabilities: [
        "Integración oficial con WhatsApp Cloud API (Meta) con verificación antibloqueos",
        "RAG semántico que consulta el catálogo, precios y políticas oficiales de la empresa",
        "Detección de intenciones y análisis de sentimiento durante la conversación",
        "Cierre directo de ventas o cobro de anticipos mediante enlaces de pago seguros",
        "Inbox Zero automático con resumen de telemetría enviado al dashboard administrativo"
      ],
      technologies: ["WhatsApp Cloud API", "LangChain / OpenAI", "Vector Database", "Supabase Realtime", "Meta Graph API"],
      metrics: {
        headline: "<30 SEG",
        subtext: "Tiempo récord de respuesta a prospectos entrantes",
        speed: "24/7 Ininterrumpido",
        impact: "+42% Tasa de Cierre de Leads"
      }
    }
  },

  // =========================================================================
  // 🌍 LA TIERRA // EL CORAZÓN OPERATIVO
  // =========================================================================
  {
    id: "earth",
    displayName: "La Tierra",
    englishName: "Earth",
    type: "rocky_planet",
    badge: "PLANETA HABITABLE // CORAZÓN OPERATIVO",
    caption: "El planeta azul • Cuna de la vida y operaciones activas",
    description: "La Tierra es el único planeta conocido que alberga vida compleja y agua líquida. En Dynamind encarna el Core DSB Operativo (ubicado exclusivamente en /#/dsb) y el Frontoffice Dinámico Multi-Página: el corazón donde late la operación diaria de tu empresa.",
    astronomy: {
      diameter: "12.742 km (1,0x)",
      distanceFromSun: "149,6 millones km (1,0 UA)",
      surfaceTemp: "-89 °C a 58 °C",
      orbitPeriod: "365,25 días terrestres",
      dayDuration: "23,9 horas",
      moons: 1,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 43,
      orbitalVelocity: 29.8,
      rotationVelocity: 0.46,
      orbitalInclination: 0.0,
      axialTilt: 23.44,
      cameraDistance: 16,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "Core DSB Operativo (/#/dsb) & Front Dinámico Multi-Página",
      tagline: "El corazón de control administrativo oculto en /#/dsb desacoplado de una experiencia comercial de vanguardia.",
      bottleneckD0: "Ceguera operativa por falta de visibilidad en tiempo real y webs tipo landing page estáticas que no tienen herramientas reales.",
      pipeline: [
        { step: "01", title: "Aislamiento Táctico", desc: "Dashboard administrativo protegido en /#/dsb sin botones ni pistas públicas." },
        { step: "02", title: "RBAC Blindado", desc: "Acceso diferenciado: Admin Master con KPIs financieros vs Staff con vista operativa." },
        { step: "03", title: "Front Multi-Página", desc: "Vistas desacopladas con animaciones cinemáticas y tipografía editorial de autor." },
        { step: "04", title: "Persistencia Realtime", desc: "Sincronización instantánea entre compras de clientes y el tablero del operador." }
      ],
      capabilities: [
        "Dogma inviolable: la vista de cliente no tiene botones de admin; acceso exclusivo por URL directa",
        "Panel lateral táctico con 5 secciones canónicas: Operaciones, Caja, Tarifas, CMS y Seguridad",
        "Customizador de paleta y tokens en vivo (LiveThemeCustomizer) con persistencia local",
        "Diseño dinámico de vanguardia con Reveal scroll cinemático y físicas a 60 FPS",
        "Persistencia reactiva con Zustand sincronizada con PostgreSQL en la nube"
      ],
      technologies: ["React 18 / Vite", "Tailwind CSS", "Zustand Reactive Store", "Lucide Icons", "PostgreSQL / Supabase"],
      metrics: {
        headline: "100% OPERATIVO",
        subtext: "Separación total entre cliente y administración",
        speed: "60 FPS Cinemático",
        impact: "Cero Ceguera de Negocio"
      }
    }
  },

  // =========================================================================
  // 🌙 LA LUNA // SATÉLITE DE RESERVAS DIRECTAS
  // =========================================================================
  {
    id: "moon",
    displayName: "La Luna",
    englishName: "The Moon",
    type: "moon",
    badge: "SATÉLITE NATURAL // PASARELA DUAL DIRECTA",
    caption: "Satélite terrestre • Gobierna las mareas y el flujo de caja",
    description: "La Luna acompaña a la Tierra en su viaje cósmico y regula las mareas planetarias. En la arquitectura Dynamind representa el Motor de Reservas y Ventas Directas sin comisiones: el flujo constante de ingresos que entra directo a las cuentas de tu empresa.",
    astronomy: {
      diameter: "3.474 km (0,27x la Tierra)",
      distanceFromParent: "384.400 km",
      surfaceTemp: "-130 °C a 120 °C",
      orbitPeriod: "27,3 días terrestres",
      dayDuration: "27,3 días (acoplamiento de marea)",
      moons: 0,
    },
    orbit: {
      orbitObject: "earth",
      scaledOrbitalRadius: 4.8,
      orbitalVelocity: 1.02,
      rotationVelocity: 0.1,
      orbitalInclination: 5.14,
      axialTilt: 1.54,
      cameraDistance: 6,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "Motor de Reservas Directas & Pasarela Dual",
      tagline: "Venta directa sin comisiones abusivas de intermediarios con liquidación inmediata a tu cuenta bancaria.",
      bottleneckD0: "Fuga del 15% al 25% de los ingresos netos pagando comisiones leoninas a OTAs (Booking, Airbnb) o agregadores externos.",
      pipeline: [
        { step: "01", title: "Selección Dinámica", desc: "Selector atómico de fechas, noches y paquetes con cálculo en tiempo real." },
        { step: "02", title: "Pasarela Dual", desc: "Elección del cliente: pasarela de pago instantánea (Wompi/Stripe/PSE) o seña por WhatsApp." },
        { step: "03", title: "Bloqueo Atómico", desc: "Apartado instantáneo de la unidad en la base de datos para evitar doble venta." },
        { step: "04", title: "Voucher Imprimible", desc: "Generación de confirmación digital con código de reserva oficial y botón de impresión." }
      ],
      capabilities: [
        "Checkout ágil en 2 pasos optimizado para celulares con máxima tasa de finalización",
        "Pasarela dual: pago digital inmediato con tarjeta/PSE o anticipo verificado por chat",
        "Soporte multi-divisa (COP / USD) y multi-idioma (ES / EN) para turismo internacional",
        "Emisión de recibo formal imprimible adaptado para comprobantes contables",
        "Ahorro acumulado de hasta 25% de margen que antes se quedaba el intermediario"
      ],
      technologies: ["Wompi API / Stripe", "PSE Colombia", "Canvas Confetti", "Tailwind Print CSS", "Supabase Auth"],
      metrics: {
        headline: "0% COMISIÓN OTA",
        subtext: "El 100% del pago ingresa directamente a tu cuenta",
        speed: "Checkout en <45 Seg",
        impact: "+22% Margen Operativo Neto"
      }
    }
  },

  // =========================================================================
  // ♂️ MARTE // EL PLANETA ROJO DE LA OCUPACIÓN
  // =========================================================================
  {
    id: "mars",
    displayName: "Marte",
    englishName: "Mars",
    type: "rocky_planet",
    badge: "PLANETA EXTERIOR // GESTIÓN HOTELERA",
    caption: "El planeta rojo • Terreno expedicionario y fronteras operativas",
    description: "Marte es el planeta más explorado y prometedor para la expansión humana. En Dynamind personifica el PMS Hotelero & Channel Manager: control total de unidades, calendarios atómicos de disponibilidad y erradicación del overbooking.",
    astronomy: {
      diameter: "6.779 km (0,53x la Tierra)",
      distanceFromSun: "227,9 millones km (1,52 UA)",
      surfaceTemp: "-125 °C a 20 °C",
      orbitPeriod: "687 días terrestres (1,88 años)",
      dayDuration: "24,6 horas",
      moons: 2,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 53,
      orbitalVelocity: 24.1,
      rotationVelocity: 0.44,
      orbitalInclination: 1.85,
      axialTilt: 25.19,
      cameraDistance: 15,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "PMS Hotelero & Sincronización Channel Manager",
      tagline: "Sistema de gestión de propiedades con calendario atómico y sincronización bidireccional contra overbooking.",
      bottleneckD0: "Doble reserva (overbooking) entre Airbnb, Booking y venta directa por tener calendarios desincronizados manualmente.",
      pipeline: [
        { step: "01", title: "Directorio Unificado", desc: "Listado de cabañas, suites o habitaciones con estatus en vivo (Libre/Ocupada/Mantenimiento)." },
        { step: "02", title: "Calendario Atómico", desc: "Matriz interactiva mes por mes con bloqueo de fechas por clic o rango." },
        { step: "03", title: "Check-In / Out Exprés", desc: "Recepción digital de huéspedes con registro de documento y folios de consumo." },
        { step: "04", title: "Channel Sync iCal", desc: "Emisión y lectura de feeds iCal en tiempo real para bloquear OTAs al instante." }
      ],
      capabilities: [
        "Matriz visual interactiva de habitaciones con semáforo de disponibilidad por día",
        "Módulo de Check-in exprés con captura de datos de huéspedes y registro de consumos adicionales",
        "Conexión con canales externos mediante iCal bidireccional para reflejar reservas de Airbnb",
        "Panel exclusivo para recepción donde el personal no tiene acceso a las finanzas globales",
        "Gestión de estados de limpieza y mantenimiento de unidades en tiempo real"
      ],
      technologies: ["iCal RFC-5545 Sync", "PostgreSQL Range Types", "Zustand Store", "Tailwind Tables", "PDF Export"],
      metrics: {
        headline: "0 OVERBOOKINGS",
        subtext: "Sincronización instantánea de disponibilidad",
        speed: "Check-in en 20 Seg",
        impact: "100% Control de Ocupación"
      }
    }
  },

  // =========================================================================
  // ♃ JÚPITER // EL GIGANTE DEL REVENUE MANAGEMENT
  // =========================================================================
  {
    id: "jupiter",
    displayName: "Júpiter",
    englishName: "Jupiter",
    type: "gas_giant",
    badge: "GIGANTE GASEOSO // REVENUE & PRECIOS DINÁMICOS",
    caption: "El rey de los planetas • Masa colosal y escudo protector",
    description: "Júpiter es el planeta más grande del sistema solar, cuya gravedad masiva desvía cometas y asteroides. Representa el Motor de Precios Dinámicos & Revenue Management con IA: el gigante analítico que maximiza ingresos según ocupación y temporada.",
    astronomy: {
      diameter: "139.820 km (11,0x la Tierra)",
      distanceFromSun: "778,5 millones km (5,20 UA)",
      surfaceTemp: "-110 °C en nubes",
      orbitPeriod: "11,86 años terrestres",
      dayDuration: "9,93 horas (rotación más rápida)",
      moons: 95,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 69,
      orbitalVelocity: 13.1,
      rotationVelocity: 1.0,
      orbitalInclination: 1.3,
      axialTilt: 3.13,
      cameraDistance: 28,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "Motor Algorítmico de Precios Dinámicos & Revenue Management",
      tagline: "Algoritmo de elasticidad de precios que ajusta tarifas automáticamente para exprimir el máximo RevPAR de tu negocio.",
      bottleneckD0: "Cobrar la misma tarifa todo el año: perder dinero en temporadas de alta demanda o quedar vacíos en días entre semana.",
      pipeline: [
        { step: "01", title: "Lectura de Ocupación", desc: "Monitoreo en tiempo real del porcentaje de capacidad reservada." },
        { step: "02", title: "Análisis de Demanda", desc: "Cálculo de estacionalidad, festivos y velocidad de ventas (pickup pace)." },
        { step: "03", title: "Ajuste de Tarifas", desc: "Ajuste escalonado de precios por cabaña, huésped adicional y temporada." },
        { step: "04", title: "Impacto en RevPAR", desc: "Reportes analíticos de ingreso promedio por unidad disponible y ADR." }
      ],
      capabilities: [
        "Configurador dinámico de tarifas en el Dashboard con persistencia inmediata",
        "Reglas de ocupación: aumentos progresivos automáticos al superar el 70% y 90% de ocupación",
        "Tarificación diferenciada por número de ocupantes (1 a 4 personas)",
        "Precios especiales para fines de semana, puentes festivos y temporada vacacional",
        "Métricas clave en el tablero de administración: ADR, RevPAR y Tasa de Conversión"
      ],
      technologies: ["Revenue AI Engine", "PostgreSQL Aggregates", "Chart.js Telemetry", "Zod Validation", "Supabase RPC"],
      metrics: {
        headline: "+28% REVPAR",
        subtext: "Incremento medio de ingresos por unidad disponible",
        speed: "Ajuste en Tiempo Real",
        impact: "Optimización Matemática"
      }
    }
  },

  // =========================================================================
  // 🌔 ÍO // LUNA JOVIANA DE ALERTAS
  // =========================================================================
  {
    id: "io",
    displayName: "Ío",
    englishName: "Io",
    type: "moon",
    badge: "LUNA JOVIANA // ALERTAS INSTANTÁNEAS",
    caption: "Cuerpo con mayor actividad volcánica del sistema solar",
    description: "Ío está cubierta de más de 400 volcanes activos debido a la inmensa fricción gravitacional de Júpiter. Encarna el Agente Centinela de Alertas Críticas por Telegram y WhatsApp: notificaciones instantáneas ante cualquier evento clave en milisegundos.",
    astronomy: {
      diameter: "3.643 km (0,28x la Tierra)",
      distanceFromParent: "421.700 km",
      surfaceTemp: "-143 °C a 1.649 °C (lava)",
      orbitPeriod: "1,77 días terrestres",
      dayDuration: "1,77 días (síncrona)",
      moons: 0,
    },
    orbit: {
      orbitObject: "jupiter",
      scaledOrbitalRadius: 4.2,
      orbitalVelocity: 17.3,
      rotationVelocity: 0.2,
      orbitalInclination: 0.05,
      axialTilt: 0,
      cameraDistance: 6,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Agente Centinela de Alertas Críticas & Push 24/7",
      tagline: "Despacho instantáneo de notificaciones operativas a tu celular ante pagos, reservas o incidencias en <500ms.",
      bottleneckD0: "Enterarse de un fallo en el servidor o de una venta prioritaria horas después porque nadie estaba revisando el correo.",
      pipeline: [
        { step: "01", title: "Detección de Suceso", desc: "Escucha pasiva de cambios críticos en base de datos mediante triggers CDC." },
        { step: "02", title: "Filtrado de Severidad", desc: "Clasificación entre informativo, comercial o alerta crítica de seguridad." },
        { step: "03", title: "Despacho Push", desc: "Envío inmediato vía bot de Telegram cifrado o plantilla de WhatsApp." },
        { step: "04", title: "Confirmación Ack", desc: "Botón interactivo de enterado para auditar la atención del equipo." }
      ],
      capabilities: [
        "Notificaciones directas a Telegram con botones de acción rápida con 1 toque",
        "Alertas ante reservas nuevas, pagos aprobados o comprobantes pendientes de validar",
        "Monitoreo de estado de salud del servidor con pings constantes y aviso de caídas",
        "Registro de acuse de recibo para saber qué operador atendió la alerta",
        "Cero ruido: solo alertas de alto impacto sin saturar las bandejas"
      ],
      technologies: ["Telegram Bot API", "Supabase CDC (pg_notify)", "WebSockets", "Node.js Workers"],
      metrics: {
        headline: "<500 MS",
        subtext: "Velocidad de despacho de alerta al celular del dueño",
        speed: "Push Cero Latencia",
        impact: "Cero Sorpresas Operativas"
      }
    }
  },

  // =========================================================================
  // 🌔 EUROPA // LUNA JOVIANA AUDITORA
  // =========================================================================
  {
    id: "europa",
    displayName: "Europa",
    englishName: "Europa",
    type: "moon",
    badge: "LUNA JOVIANA // AUDITORÍA SILENCIOSA",
    caption: "Corteza de hielo y océano subterráneo salado",
    description: "Bajo su superficie de hielo liso, Europa esconde un océano global con el doble de agua que todos los océanos terrestres combinados. Personifica el Agente de Auditoría 24/7 y Detección de Anomalías: un vigilante que escanea registros en las profundidades de tus datos.",
    astronomy: {
      diameter: "3.122 km (0,24x la Tierra)",
      distanceFromParent: "670.900 km",
      surfaceTemp: "-160 °C a -220 °C",
      orbitPeriod: "3,55 días terrestres",
      dayDuration: "3,55 días (síncrona)",
      moons: 0,
    },
    orbit: {
      orbitObject: "jupiter",
      scaledOrbitalRadius: 5.8,
      orbitalVelocity: 13.7,
      rotationVelocity: 0.15,
      orbitalInclination: 0.47,
      axialTilt: 0.1,
      cameraDistance: 6,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Agente Auditor 24/7 & Detección de Anomalías en BD",
      tagline: "Vigilante autónomo que inspecciona transacciones y saldos para detectar inconsistencias antes de que se conviertan en pérdidas.",
      bottleneckD0: "Descuadres silenciosos, cobros no registrados o manipulaciones malintencionadas que se descubren semanas después en contabilidad.",
      pipeline: [
        { step: "01", title: "Barrido Criptográfico", desc: "Inspección periódica de sumas de folios vs movimientos de caja." },
        { step: "02", title: "Cotejo de Saldo", desc: "Verificación de integridad referencial entre pasarelas de pago y reservas." },
        { step: "03", title: "Alerta de Discrepancia", desc: "Marcado inmediato de cualquier asiento contable que no cuadre exactamente." },
        { step: "04", title: "Dossier de Hallazgo", desc: "Generación de informe forense detallando usuario, hora y desfase." }
      ],
      capabilities: [
        "Inspección programada desatendida mediante cron jobs en la base de datos",
        "Algoritmo de detección de transacciones atípicas o fuera del promedio histórico",
        "Trazabilidad inmutable de cambios en tablas maestras con bitácora forense",
        "Validación de firmas criptográficas para garantizar que ningún dato fue alterado",
        "Reporte ejecutivo dominical con estatus de pulcritud contable"
      ],
      technologies: ["PostgreSQL Triggers", "Supabase pg_cron", "Argon2id", "Crypto Timing Safe", "TypeScript"],
      metrics: {
        headline: "100% TRAZABLE",
        subtext: "Cero transacciones huérfanas sin justificación",
        speed: "Escaneo Continuo",
        impact: "Cero Fraudes Silenciosos"
      }
    }
  },

  // =========================================================================
  // 🌔 GANÍMEDES // LA LUNA MÁS GRANDE DEL SISTEMA
  // =========================================================================
  {
    id: "ganymede",
    displayName: "Ganímedes",
    englishName: "Ganymede",
    type: "moon",
    badge: "LUNA JOVIANA // FIRMA DIGITAL & LEGAL",
    caption: "La luna más grande del Sistema Solar • Campo magnético propio",
    description: "Ganímedes es más grande que el planeta Mercurio y posee su propio campo magnético. En Dynamind simboliza el Agente de Onboarding Contractual & Firma Digital Legal: contratos, acuerdos y términos firmados con validez jurídica sin imprimir una sola hoja.",
    astronomy: {
      diameter: "5.268 km (0,41x la Tierra)",
      distanceFromParent: "1.070.400 km",
      surfaceTemp: "-113 °C a -183 °C",
      orbitPeriod: "7,15 días terrestres",
      dayDuration: "7,15 días",
      moons: 0,
    },
    orbit: {
      orbitObject: "jupiter",
      scaledOrbitalRadius: 7.5,
      orbitalVelocity: 10.9,
      rotationVelocity: 0.1,
      orbitalInclination: 0.2,
      axialTilt: 0,
      cameraDistance: 7,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Agente de Onboarding & Firma Digital Legal",
      tagline: "Generación automática de contratos de servicio, pagarés y términos firmados digitalmente con trazabilidad legal.",
      bottleneckD0: "Papeleo físico demorado, contratos sin firmar antes de prestar el servicio y falta de validez jurídica en disputas comerciales.",
      pipeline: [
        { step: "01", title: "Carga de Variables", desc: "Inyección automática de datos del cliente, valores y condiciones al contrato." },
        { step: "02", title: "Envío por Enlace Único", desc: "Despacho por SMS/WhatsApp de acceso cifrado al documento sin login." },
        { step: "03", title: "Firma Biométrica/Táctil", desc: "Captura de trazo, huella digital de navegador, IP y timestamp oficial." },
        { step: "04", title: "Sellado Criptográfico", desc: "Generación de PDF con hash SHA-256 inmutable almacenado en la nube." }
      ],
      capabilities: [
        "Firma en pantalla táctil desde cualquier teléfono inteligente sin instalar apps",
        "Estampado de metadatos de auditoría: dirección IP, agente de usuario y hora exacta UTC",
        "Integración automática con el registro de reservas o ventas del Core DSB",
        "Descarga inmediata del contrato firmado en formato PDF para ambas partes",
        "Cumplimiento con normativas de comercio electrónico y mensaje de datos"
      ],
      technologies: ["HTML5 Canvas Signature", "PDF-Lib", "SHA-256 Hashing", "Supabase Storage", "Zod"],
      metrics: {
        headline: "<90 SEG",
        subtext: "Tiempo promedio de lectura y firma por el cliente",
        speed: "Cero Papel Físico",
        impact: "100% Respaldo Jurídico"
      }
    }
  },

  // =========================================================================
  // 🌔 CALISTO // LUNA CRATERIZADA DE INFORMES
  // =========================================================================
  {
    id: "callisto",
    displayName: "Calisto",
    englishName: "Callisto",
    type: "moon",
    badge: "LUNA JOVIANA // DOSSIERS E INFORMES",
    caption: "El cuerpo con más cráteres del Sistema Solar • Superficie ancestral",
    description: "Calisto conserva el registro geológico más antiguo del sistema solar intacto en su superficie craterizada. Representa el Generador de Vouchers, Facturas Proforma y Dossiers Imprimibles: documentos pulcros con estilo editorial listos para auditorías.",
    astronomy: {
      diameter: "4.821 km (0,38x la Tierra)",
      distanceFromParent: "1.882.700 km",
      surfaceTemp: "-108 °C a -193 °C",
      orbitPeriod: "16,69 días terrestres",
      dayDuration: "16,69 días",
      moons: 0,
    },
    orbit: {
      orbitObject: "jupiter",
      scaledOrbitalRadius: 9.4,
      orbitalVelocity: 8.2,
      rotationVelocity: 0.08,
      orbitalInclination: 0.28,
      axialTilt: 0,
      cameraDistance: 7,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Generador de Vouchers & Dossiers Imprimibles",
      tagline: "Motor de renderizado de comprobantes de pago, folios de huésped y reportes financieros con formato editorial de lujo.",
      bottleneckD0: "Enviar recibos en capturas de pantalla de WhatsApp informales o generar hojas de cálculo caóticas que proyectan desorden.",
      pipeline: [
        { step: "01", title: "Consolidación de Cargos", desc: "Recopilación de alojamiento, consumos, servicios extra y deducciones." },
        { step: "02", title: "Aplicación de Brandkit", desc: "Inyección de tipografías aprobadas, logotipo maestro y sellos de agua." },
        { step: "03", title: "Motor de Impresión", desc: "Reglas @media print adaptadas a hojas carta y tirillas térmicas POS." },
        { step: "04", title: "Exportación Directa", desc: "1-Click para imprimir físicamente o exportar como documento PDF." }
      ],
      capabilities: [
        "Hojas de estilo CSS @media print meticulosamente calibradas sin desbordes ni cortes feos",
        "Compatibilidad nativa con impresoras térmicas POS de recibos (80mm y 58mm)",
        "Desglose limpio de subtotal, impuestos aplicables, propinas y saldo pendiente",
        "Código QR integrado de verificación de autenticidad del documento",
        "Estética editorial de alta gama que refuerza el posicionamiento premium del negocio"
      ],
      technologies: ["Tailwind Print Engine", "CSS Paged Media", "Lucide React", "Canvas QR Engine"],
      metrics: {
        headline: "PRINT-READY",
        subtext: "1 Clic para imprimir o exportar en PDF perfecto",
        speed: "Render Instantáneo",
        impact: "Imagen Corporativa Impecable"
      }
    }
  },

  // =========================================================================
  // 🪐 SATURNO // LOS ANILLOS DE SEGURIDAD Y CAJA
  // =========================================================================
  {
    id: "saturn",
    displayName: "Saturno",
    englishName: "Saturn",
    type: "gas_giant",
    badge: "GIGANTE ANILLADO // CONTROL DE CAJA Y ARQUEO",
    caption: "La joya del Sistema Solar • Sistema de anillos majestuoso",
    description: "Saturno es mundialmente célebre por sus deslumbrantes anillos de hielo y roca que lo rodean como una armadura perfecta. En Dynamind encarna la Caja en Vivo con Turnos y Calculadora de Arqueo Ciego por Billetes: el blindaje que protege cada peso de tu negocio.",
    astronomy: {
      diameter: "116.460 km (9,1x la Tierra)",
      distanceFromSun: "1.433,5 millones km (9,58 UA)",
      surfaceTemp: "-140 °C en nubes",
      orbitPeriod: "29,45 años terrestres",
      dayDuration: "10,7 horas",
      moons: 146,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 88,
      orbitalVelocity: 9.7,
      rotationVelocity: 0.9,
      orbitalInclination: 2.49,
      axialTilt: 26.73,
      cameraDistance: 32,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "Caja en Vivo con Turnos & Arqueo Ciego por Billetes",
      tagline: "Control blindado de flujos de efectivo donde el operador cuenta billetes sin ver los números del sistema hasta cerrar.",
      bottleneckD0: "Descuadres de caja al cierre de turno, robo hormiga, falta de trazabilidad y deshonestidad en el conteo de efectivo.",
      pipeline: [
        { step: "01", title: "Apertura de Turno", desc: "Registro del operador activo y base en efectivo inicial firmada." },
        { step: "02", title: "Flujo en Vivo", desc: "Asiento de ingresos y egresos clasificados por método de pago." },
        { step: "03", title: "Calculadora Ciega", desc: "El cajero ingresa la cantidad física de billetes de $100k, $50k, $20k, $10k, $5k y $2k." },
        { step: "04", title: "Cierre Inmutable", desc: "El sistema compara contra el saldo teórico y emite el acta de sobrante/faltante auditada." }
      ],
      capabilities: [
        "Calculadora atómica de denominaciones de billetes de curso legal (COP / USD)",
        "Arqueo ciego inquebrantable: el cajero desconoce el monto esperado antes de contar",
        "Historial inmutable de cierres de caja con firma digital del operador en turno",
        "Bloqueo estricto para perfiles de Staff: no pueden ver totales hasta autorizar el cierre",
        "Detección inmediata de faltantes o sobrantes con bitácora de justificación obligatoria"
      ],
      technologies: ["Zustand Blind Count Store", "PostgreSQL Immutability", "Tailwind Forms", "Crypto Verification"],
      metrics: {
        headline: "0% FUGA EFECTIVO",
        subtext: "Arqueo ciego inmutable en cada cambio de turno",
        speed: "Cierre en 3 Minutos",
        impact: "Transparencia Total"
      }
    }
  },

  // =========================================================================
  // 🌔 TITÁN // LUNA SATURNINA DE MERCADO
  // =========================================================================
  {
    id: "titan",
    displayName: "Titán",
    englishName: "Titan",
    type: "moon",
    badge: "LUNA SATURNINA // VIGILANTE DE COMPETENCIA",
    caption: "Atmósfera densa con lagos y ríos de metano líquido",
    description: "Titán es la segunda luna más grande del sistema solar y la única con una atmósfera densa y cuerpos líquidos en su superficie. Representa el Agente Scraper & Vigilante de Competencia: monitoreo ético en tiempo real de tarifas y disponibilidad del mercado.",
    astronomy: {
      diameter: "5.150 km (0,40x la Tierra)",
      distanceFromParent: "1.221.870 km",
      surfaceTemp: "-179 °C constante",
      orbitPeriod: "15,95 días terrestres",
      dayDuration: "15,95 días",
      moons: 0,
    },
    orbit: {
      orbitObject: "saturn",
      scaledOrbitalRadius: 6.8,
      orbitalVelocity: 5.57,
      rotationVelocity: 0.1,
      orbitalInclination: 0.35,
      axialTilt: 0,
      cameraDistance: 6,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Agente Vigilante de Mercado & Scraper de Tarifas",
      tagline: "Monitoreo automatizado de precios y disponibilidad de la competencia directa para nunca quedar desfasado del mercado.",
      bottleneckD0: "Fijar precios a ciegas sin saber a cuánto está vendiendo la competencia local en fines de semana o temporadas festivas.",
      pipeline: [
        { step: "01", title: "Definición de Competencia", desc: "Selección de propiedades o competidores de referencia en el área." },
        { step: "02", title: "Extracción Headless", desc: "Sondeo automatizado de tarifas públicas y calendarios en portales abiertos." },
        { step: "03", title: "Cálculo de Percentil", desc: "Posicionamiento de tu negocio (Premium, Competitivo, Económico)." },
        { step: "04", title: "Sugerencia Inteligente", desc: "Alerta táctica cuando la competencia sube precios o agota disponibilidad." }
      ],
      capabilities: [
        "Monitoreo ético de tarifas públicas sin vulnerar términos de servicio",
        "Comparativa en tiempo real en el Dashboard frente a tus 5 competidores clave",
        "Detección de fechas de alta ocupación generalizada en tu zona geográfica",
        "Sugerencia proactiva de incremento de tarifas para capturar mayor margen",
        "Histórico gráfico de evolución de precios del mercado"
      ],
      technologies: ["Playwright Headless", "Cheerio", "Redis Cache", "Supabase Tables", "Tailwind Visualizer"],
      metrics: {
        headline: "INTELIGENCIA 360°",
        subtext: "Visibilidad permanente de las tarifas de la competencia",
        speed: "Sondeo Diario",
        impact: "Ventaja Competitiva"
      }
    }
  },

  // =========================================================================
  // ♅ URANO // PRECISIÓN CONTABLE Y DIAN
  // =========================================================================
  {
    id: "uranus",
    displayName: "Urano",
    englishName: "Uranus",
    type: "ice_giant",
    badge: "GIGANTE HELADO // CONCILIACIÓN DIAN & OCR",
    caption: "El planeta inclinado • Rota de lado con anillos tenues",
    description: "Urano es un gigante de hielo que rota de lado con una inclinación axial extrema de 98°. En Dynamind simboliza el Auditor Financiero & Conciliación DIAN con OCR de Facturas: precisión matemática helada que procesa comprobantes fiscales sin errores.",
    astronomy: {
      diameter: "50.724 km (4,0x la Tierra)",
      distanceFromSun: "2.871,0 millones km (19,19 UA)",
      surfaceTemp: "-224 °C (atmósfera más fría)",
      orbitPeriod: "84,02 años terrestres",
      dayDuration: "17,2 horas (retrógrado)",
      moons: 28,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 108,
      orbitalVelocity: 6.8,
      rotationVelocity: -0.6,
      orbitalInclination: 0.77,
      axialTilt: 97.77,
      cameraDistance: 24,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "Auditor Financiero & Conciliación DIAN / OCR de Facturas",
      tagline: "Extracción multimodal de facturas con visión artificial y conciliación automática contra tus extractos bancarios.",
      bottleneckD0: "Cientos de horas perdidas digitando facturas en PDF a mano, gastos deducibles olvidados y multas de la entidad tributaria.",
      pipeline: [
        { step: "01", title: "Ingesta Multimodal", desc: "Recepción de facturas en PDF, fotos de tickets o correos de proveedores." },
        { step: "02", title: "OCR con Visión AI", desc: "Extracción de CUFE, NIT, emisor, IVA, retenciones y líneas de detalle." },
        { step: "03", title: "Cotejo Bancario", desc: "Cruce automático contra movimientos en cuentas bancarias o tarjetas." },
        { step: "04", title: "Asiento Contable", desc: "Generación de archivo listo para tu software contable (Siigo, World Office, etc.)." }
      ],
      capabilities: [
        "Lectura de facturas electrónicas XML / PDF con extracción precisa de campos fiscales",
        "Detección de duplicidad de facturas para evitar registrar dos veces el mismo gasto",
        "Categorización automática de egresos según el plan de cuentas de la empresa",
        "Cálculo automático de retenciones en la fuente aplicables según normativa vigente",
        "Exportación en 1 clic a formatos CSV/Excel compatibles con sistemas contables"
      ],
      technologies: ["Claude 3.5 Sonnet Vision", "XML DOM Parser", "DIAN Validation Rules", "PostgreSQL JSONB"],
      metrics: {
        headline: "99.4% PRECISIÓN",
        subtext: "Extracción de campos contables sin digitación manual",
        speed: "<4 Seg por Factura",
        impact: "-80% Tiempo Contable"
      }
    }
  },

  // =========================================================================
  // ♆ NEPTUNO // AGUAS PROFUNDAS DE COCINA Y MERMAS
  // =========================================================================
  {
    id: "neptune",
    displayName: "Neptuno",
    englishName: "Neptune",
    type: "ice_giant",
    badge: "GIGANTE AZUL // KDS DE COCINA Y MERMA CERO",
    caption: "El planeta más lejano • Vientos huracanados supersónicos",
    description: "Neptuno es el mundo más distante de nuestro sistema solar, azotado por los vientos más feroces que superan los 2.000 km/h. En Dynamind encarna el KDS de Cocina en Tiempo Real & Monitor de Merma Cero: sincronización milimétrica bajo máxima presión de despacho.",
    astronomy: {
      diameter: "49.244 km (3,9x la Tierra)",
      distanceFromSun: "4.498,3 millones km (30,07 UA)",
      surfaceTemp: "-218 °C en nubes",
      orbitPeriod: "164,79 años terrestres",
      dayDuration: "16,1 horas",
      moons: 16,
    },
    orbit: {
      orbitObject: "sun",
      scaledOrbitalRadius: 126,
      orbitalVelocity: 5.4,
      rotationVelocity: 0.6,
      orbitalInclination: 1.77,
      axialTilt: 28.32,
      cameraDistance: 24,
    },
    system: {
      category: "Sistemas Operativos Complejos",
      name: "KDS Comandas de Cocina & Monitor de Merma Cero",
      tagline: "Sistema de comandas en pantallas táctiles con semáforo de tiempos y descarga de recetas estándar contra mermas.",
      bottleneckD0: "Comandas de papel que se mojan o pierden, clientes esperando platos a destiempo y fuga invisible de insumos en cocina.",
      pipeline: [
        { step: "01", title: "Disparo de Comanda", desc: "Al confirmar el pedido en mesa o app, la comanda viaja instantáneamente a la pantalla del chef." },
        { step: "02", title: "Semáforo de Cocción", desc: "Temporizador visual: Verde (a tiempo), Amarillo (alerta), Rojo parpadeante (urgente)." },
        { step: "03", title: "Descarga de Insumos", desc: "Deducción automática de gramos y porciones del inventario maestro en tiempo real." },
        { step: "04", title: "Despacho Sincronizado", desc: "Notificación de plato listo al mesero y cambio de estatus en el Core DSB." }
      ],
      capabilities: [
        "Pantalla táctil de cocina resistente a toques rápidos con interfaz dark mode de alto contraste",
        "Sincronización multi-estación: barra de tragos, parrilla y ensaladas en pantallas separadas",
        "Control estricto de recetas estándar: cada plato descuenta sus ingredientes exactos",
        "Alertas de stock mínimo de insumos perecederos antes de que se agoten en servicio",
        "Estadísticas de tiempo medio de preparación por cocinero y por categoría de plato"
      ],
      technologies: ["Supabase Realtime Channels", "Web Audio Beeps", "Tailwind Kitchen UI", "Zustand Multi-Tab"],
      metrics: {
        headline: "<12 MIN",
        subtext: "Tiempo promedio de despacho de comanda a mesa",
        speed: "Sincronía <100ms",
        impact: "-18% Merma de Alimentos"
      }
    }
  },

  // =========================================================================
  // 🌔 TRITÓN // LUNA NEPTUNIANA DE BLINDAJE
  // =========================================================================
  {
    id: "triton",
    displayName: "Tritón",
    englishName: "Triton",
    type: "moon",
    badge: "LUNA NEPTUNIANA // CIBERSEGURIDAD DEFENSIVA",
    caption: "La única gran luna con órbita retrógrada • Géiseres de nitrógeno",
    description: "Tritón orbita a Neptuno en dirección contraria a la rotación de su planeta, lo que demuestra que fue un objeto capturado del cinturón de Kuiper. En Dynamind personifica el Sentinel de Ciberseguridad & Blindaje RLS: protección infranqueable para tus bases de datos.",
    astronomy: {
      diameter: "2.706 km (0,21x la Tierra)",
      distanceFromParent: "354.800 km",
      surfaceTemp: "-235 °C (uno de los cuerpos más fríos)",
      orbitPeriod: "5,88 días terrestres (retrógrado)",
      dayDuration: "5,88 días",
      moons: 0,
    },
    orbit: {
      orbitObject: "neptune",
      scaledOrbitalRadius: 5.2,
      orbitalVelocity: -4.39,
      rotationVelocity: -0.1,
      orbitalInclination: 156.8,
      axialTilt: 0,
      cameraDistance: 6,
    },
    system: {
      category: "Automatizaciones & Agentes Específicos",
      name: "Sentinel de Ciberseguridad Defensiva & Blindaje RLS",
      tagline: "Políticas de Row Level Security (RLS) en base de datos para que ningún usuario acceda a datos que no le corresponden.",
      bottleneckD0: "Filtraciones de bases de datos de clientes, brechas por APIs sin autenticar y accesos indebidos de empleados.",
      pipeline: [
        { step: "01", title: "Políticas RLS Nativas", desc: "Cada consulta SQL se filtra en el motor de PostgreSQL según el rol del usuario." },
        { step: "02", title: "Sanitización Criptográfica", desc: "Validación de esquemas con Zod antes de que cualquier payload toque el servidor." },
        { step: "03", title: "Firma Criptográfica", desc: "Webhooks verificados con HMAC SHA-256 en tiempo constante antibloqueos." },
        { step: "04", title: "Auditoría de Acceso", desc: "Registro estricto de intentos de inicio de sesión con alertas de IP extrañas." }
      ],
      capabilities: [
        "RLS (Row Level Security) obligatorio en el 100% de las tablas de PostgreSQL",
        "Funciones de base de datos con search_path blindado para prevenir inyecciones",
        "Contraseñas con hashing Argon2id / Bcrypt de última generación",
        "Tokens JWT cifrados con expiración corta y rotación automática de sesión",
        "Zero Trust: ni el front ni terceros pueden alterar los precios o reservas directamente"
      ],
      technologies: ["PostgreSQL RLS", "HMAC SHA-256", "TimingSafeEqual", "Argon2id", "Zod Hardening"],
      metrics: {
        headline: "ZERO TRUST",
        subtext: "100% de tablas protegidas con Row Level Security",
        speed: "Blindaje a Nivel Motor",
        impact: "Cero Filtraciones de Datos"
      }
    }
  }
];

// Helper para categorización
export const SYSTEM_CATEGORIES = [
  { id: "all", label: "Todo el Cosmos (16 Estaciones)" },
  { id: "Núcleo Soberano", label: "☀️ Núcleo Soberano (1)" },
  { id: "Sistemas Operativos Complejos", label: "🪐 Sistemas Operativos Mayores (7)" },
  { id: "Automatizaciones & Agentes Específicos", label: "🤖 Agentes de Tarea Específica (8)" },
];
