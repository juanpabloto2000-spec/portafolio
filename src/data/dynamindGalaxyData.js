// src/data/dynamindGalaxyData.js
// Catálogo integral de los 18 Planetas de Servicio de La Galaxia Tecnológica Dynamind.
// Libre de datos astronómicos y etiquetas de la NASA: 100% enfocado en software, arquitectura y valor comercial.

export const GALAXY_CATEGORIES = [
  { id: "all", label: "Toda la Galaxia", icon: "Orbit" },
  { id: "core", label: "Núcleo Soberano", icon: "Sun" },
  { id: "sistemas", label: "Sistemas Operativos Mayores", icon: "Layers" },
  { id: "agentes", label: "Agentes de Alta Conversión", icon: "Sparkles" },
  { id: "blindaje", label: "Blindaje & Automatizaciones", icon: "ShieldCheck" },
];

export const GALAXY_SERVICES = [
  // =========================================================================
  // ☀️ NÚCLEO CENTRAL SOBERANO
  // =========================================================================
  {
    id: "srv-core",
    name: "Consultoría de IA Soberana",
    subtitle: "Núcleo Central // No Somos una Agencia",
    category: "core",
    categoryLabel: "Núcleo Soberano",
    iconName: "Sun",
    color: "#f59e0b", // Dorado Solar
    emissive: "#d97706",
    size: 3.5,
    orbitRadius: 0,
    speed: 0,
    modelGlb: "sun.glb",
    summary: "Arquitectura de software a la medida con código 100% propio entregado en tu GitHub sin rentas mensuales.",
    bottleneckD0: "Dependencia de SaaS ajenos que suben tarifas cada año y agencias que revenden suscripciones sin tocar código real.",
    pipeline: [
      { step: "01", title: "Auditoría D0", desc: "Detección implacable de cuellos de botella." },
      { step: "02", title: "Modelado a Medida", desc: "Bases de datos desacopladas y contratos limpios." },
      { step: "03", title: "Código Propietario", desc: "Entrega completa en tu repositorio GitHub." },
      { step: "04", title: "Soberanía Total", desc: "Despliegue en tus servidores sin comisiones por usuario." }
    ],
    capabilities: [
      "Auditoría rigurosa de 14 dimensiones operativas antes de programar",
      "Propiedad intelectual 100% tuya con licencias perpetuas",
      "Dualidad: sistemas operativos complejos + micro-agentes específicos",
      "Cero intermediarios ni comisiones sobre tus ventas"
    ],
    technologies: ["Node.js / React 18", "PostgreSQL / Supabase", "Zod", "Docker / VPS"],
    metric: { headline: "100% CÓDIGO PROPIO", label: "0% Renta de software mensual" }
  },

  // =========================================================================
  // 🪐 SISTEMAS OPERATIVOS MAYORES
  // =========================================================================
  {
    id: "srv-dsb",
    name: "Core DSB Operativo // Búnker Administrativo",
    subtitle: "Dashboard Administrativo Aislado",
    category: "sistemas",
    categoryLabel: "Sistemas Mayores",
    iconName: "LayoutDashboard",
    color: "#06b6d4", // Cyan Eléctrico
    emissive: "#0891b2",
    size: 2.1,
    orbitRadius: 26,
    speed: 0.9,
    modelGlb: "earth.glb",
    summary: "Centro de comando táctico aislado con RBAC estricto desacoplado de la vista pública comercial.",
    bottleneckD0: "Ceguera operativa por falta de visibilidad en tiempo real y sitios web estáticos que no tienen herramientas reales.",
    pipeline: [
      { step: "01", title: "Aislamiento Táctico", desc: "Dashboard protegido en ruta táctica sin botones públicos." },
      { step: "02", title: "RBAC Blindado", desc: "Admin Master con KPIs vs Staff con vista operativa ciega a finanzas." },
      { step: "03", title: "Front Multi-Página", desc: "Vistas dinámicas con animaciones cinemáticas a 60 FPS." },
      { step: "04", title: "Persistencia Realtime", desc: "Sincronización instantánea entre compras y panel de control." }
    ],
    capabilities: [
      "Separación estricta entre la vista de cliente y el panel de administración",
      "Barra lateral táctica con 5 secciones canónicas y control de turnos",
      "Customizador de paleta y tokens en vivo con persistencia local",
      "Persistencia reactiva con Zustand sincronizada con PostgreSQL"
    ],
    technologies: ["React 18", "Tailwind CSS", "Zustand Store", "Lucide Icons"],
    metric: { headline: "100% OPERATIVO", label: "Aislamiento total cliente / admin" }
  },
  {
    id: "srv-pms",
    name: "PMS Hotelero & Channel Manager",
    subtitle: "Gestión de Alojamientos y Reservas",
    category: "sistemas",
    categoryLabel: "Sistemas Mayores",
    iconName: "Hotel",
    color: "#f43f5e", // Coral Carmesí
    emissive: "#e11d48",
    size: 2.0,
    orbitRadius: 34,
    speed: 0.78,
    modelGlb: "mars.glb",
    summary: "Gestión de propiedades con calendario atómico visual y sincronización bidireccional contra overbooking.",
    bottleneckD0: "Doble reserva entre Airbnb, Booking y venta directa por tener calendarios desincronizados manualmente.",
    pipeline: [
      { step: "01", title: "Directorio Unificado", desc: "Listado de suites con estatus en vivo (Libre/Ocupada/Limpieza)." },
      { step: "02", title: "Calendario Atómico", desc: "Matriz interactiva mes por mes con bloqueo de fechas en 1 clic." },
      { step: "03", title: "Check-In Exprés", desc: "Recepción digital de huéspedes con registro de consumos a folios." },
      { step: "04", title: "Channel Sync iCal", desc: "Lectura y emisión de feeds iCal para bloquear OTAs al instante." }
    ],
    capabilities: [
      "Matriz visual interactiva de habitaciones con semáforo por día",
      "Módulo de Check-in exprés con registro de folios y consumos",
      "Conexión con canales externos mediante iCal bidireccional",
      "Panel para recepción con restricción de acceso a números contables"
    ],
    technologies: ["iCal Sync RFC-5545", "PostgreSQL Range Types", "Zustand Store", "Tailwind Print"],
    metric: { headline: "0 OVERBOOKINGS", label: "Sincronía atómica de calendarios" }
  },
  {
    id: "srv-caja",
    name: "Caja en Vivo con Arqueo Ciego",
    subtitle: "Control de Turnos y Billetes",
    category: "sistemas",
    categoryLabel: "Sistemas Mayores",
    iconName: "Calculator",
    color: "#fbbf24", // Ámbar Oro
    emissive: "#d97706",
    size: 2.15,
    orbitRadius: 43,
    speed: 0.68,
    modelGlb: "saturn.glb",
    summary: "Control blindado de efectivo donde el operador cuenta billetes sin ver los números del sistema hasta cerrar.",
    bottleneckD0: "Descuadres de caja al cierre de turno, robo hormiga y falta de trazabilidad en el conteo de billetes.",
    pipeline: [
      { step: "01", title: "Apertura de Turno", desc: "Registro del operador activo y base en efectivo firmada." },
      { step: "02", title: "Flujo en Vivo", desc: "Asiento de ingresos y egresos por método de pago." },
      { step: "03", title: "Calculadora Ciega", desc: "Conteo físico por denominaciones de billetes sin pistas." },
      { step: "04", title: "Cierre Inmutable", desc: "Comparación contra saldo teórico y acta de arqueo auditada." }
    ],
    capabilities: [
      "Calculadora atómica de denominaciones de billetes de curso legal",
      "Arqueo ciego inquebrantable: el cajero desconoce el monto esperado",
      "Historial inmutable de cierres de caja con firma del operador",
      "Detección inmediata de faltantes o sobrantes con justificación"
    ],
    technologies: ["Zustand Blind Count", "PostgreSQL Immutability", "Tailwind Forms"],
    metric: { headline: "0% FUGA EFECTIVO", label: "Arqueo ciego inmutable por turno" }
  },
  {
    id: "srv-kds",
    name: "KDS Comandas & Merma Cero",
    subtitle: "Cocina y Despacho en Vivo",
    category: "sistemas",
    categoryLabel: "Sistemas Mayores",
    iconName: "UtensilsCrossed",
    color: "#f97316", // Naranja Fuego
    emissive: "#ea580c",
    size: 2.05,
    orbitRadius: 51,
    speed: 0.60,
    modelGlb: "neptune.glb",
    summary: "Pantallas de cocina en tiempo real con semáforo de tiempos y descarga de recetas estándar contra mermas.",
    bottleneckD0: "Comandas de papel que se mojan o pierden, clientes esperando platos a destiempo y fuga de insumos.",
    pipeline: [
      { step: "01", title: "Disparo de Comanda", desc: "Envío instantáneo desde la mesa o app a la pantalla del chef." },
      { step: "02", title: "Semáforo de Tiempos", desc: "Temporizador: Verde (a tiempo), Amarillo, Rojo urgente." },
      { step: "03", title: "Descarga de Insumos", desc: "Deducción de porciones del inventario maestro en tiempo real." },
      { step: "04", title: "Despacho Sincronizado", desc: "Aviso de plato listo al mesero y actualización del estatus." }
    ],
    capabilities: [
      "Pantalla táctil de cocina de alto contraste resistente a toques rápidos",
      "Sincronización multi-estación: barra de tragos, parrilla y postres",
      "Descarga automática de ingredientes según receta estándar",
      "Estadísticas de tiempo medio de preparación por cocinero y plato"
    ],
    technologies: ["Supabase Realtime", "Web Audio API Beeps", "Tailwind Kitchen UI"],
    metric: { headline: "<12 MIN", label: "Tiempo promedio de despacho" }
  },
  {
    id: "srv-reservas",
    name: "Motor de Reservas Directas",
    subtitle: "Pasarela Dual Sin Comisiones",
    category: "sistemas",
    categoryLabel: "Sistemas Mayores",
    iconName: "CreditCard",
    color: "#3b82f6", // Azul Cobalto
    emissive: "#2563eb",
    size: 1.95,
    orbitRadius: 60,
    speed: 0.54,
    modelGlb: "uranus.glb",
    summary: "Venta directa sin comisiones abusivas de intermediarios con liquidación inmediata a tu cuenta bancaria.",
    bottleneckD0: "Fuga del 15% al 25% de los ingresos netos pagando comisiones leoninas a OTAs o plataformas agregadoras.",
    pipeline: [
      { step: "01", title: "Selección Dinámica", desc: "Selector atómico de fechas, paquetes y ocupantes en vivo." },
      { step: "02", title: "Pasarela Dual", desc: "Pago digital instantáneo (Wompi/Stripe/PSE) o anticipo verificado." },
      { step: "03", title: "Bloqueo Atómico", desc: "Apartado instantáneo de la unidad en base de datos." },
      { step: "04", title: "Voucher Imprimible", desc: "Confirmación con código QR oficial y botón de impresión." }
    ],
    capabilities: [
      "Checkout ágil en 2 pasos optimizado para celulares",
      "Pasarela dual: pago digital inmediato o confirmación por chat",
      "Soporte multi-divisa (COP / USD) y multi-idioma (ES / EN)",
      "Emisión de recibo formal imprimible para comprobante contable"
    ],
    technologies: ["Wompi API / Stripe", "PSE Colombia", "Tailwind Print CSS"],
    metric: { headline: "0% COMISIÓN OTA", label: "100% del pago directo a tu cuenta" }
  },
  {
    id: "srv-inventario",
    name: "Control de Stock e Insumos",
    subtitle: "Inventario Realtime y Alertas",
    category: "sistemas",
    categoryLabel: "Sistemas Mayores",
    iconName: "Package",
    color: "#ec4899", // Rosa Neón
    emissive: "#db2777",
    size: 1.95,
    orbitRadius: 68,
    speed: 0.49,
    modelGlb: "ganymede.glb",
    summary: "Monitoreo continuo de existencias críticas con alertas de reposición antes de que se agoten en servicio.",
    bottleneckD0: "Quedarse sin insumos clave a mitad de un turno o tener compras descontroladas sin justificación de consumo.",
    pipeline: [
      { step: "01", title: "Kardex Digital", desc: "Entradas por compras con proveedor y salidas por venta o merma." },
      { step: "02", title: "Umbrales Mínimos", desc: "Definición de stock de seguridad para cada ingrediente." },
      { step: "03", title: "Alerta Temprana", desc: "Aviso push al administrador cuando un ítem toca el umbral rojo." },
      { step: "04", title: "Orden de Compra", desc: "Generación automática de lista de pedidos para proveedores." }
    ],
    capabilities: [
      "Kardex digital multi-almacén con valorización de existencias",
      "Detección de mermas y desfases entre consumo teórico y físico",
      "Alertas automáticas al alcanzar niveles críticos de inventario",
      "Histórico de precios de compra para detectar aumentos de costos"
    ],
    technologies: ["PostgreSQL Triggers", "Zod Validation", "Supabase RPC"],
    metric: { headline: "CERO QUIEBRES", label: "Abastecimiento predictivo continuo" }
  },

  // =========================================================================
  // ⚡ AGENTES DE ALTA CONVERSIÓN
  // =========================================================================
  {
    id: "srv-whatsapp",
    name: "WhatsApp AI Agent & CRM",
    subtitle: "Atención y Cierre 24/7",
    category: "agentes",
    categoryLabel: "Agentes de Conversión",
    iconName: "MessageSquare",
    color: "#10b981", // Verde Esmeralda
    emissive: "#059669",
    size: 2.1,
    orbitRadius: 77,
    speed: 0.45,
    modelGlb: "venus.glb",
    summary: "Agente conversacional entrenado con la voz de tu marca que califica prospectos y cierra ventas las 24 horas.",
    bottleneckD0: "Leads que se enfrían y van con la competencia porque tardan más de 15 minutos en responder en WhatsApp.",
    pipeline: [
      { step: "01", title: "Respuesta Inmediata", desc: "Saludo y empatía contextual en menos de 25 segundos." },
      { step: "02", title: "Calificación Scoring", desc: "Evaluación de presupuesto, urgencia y fit en tiempo real." },
      { step: "03", title: "Agendamiento 1-Click", desc: "Sincronización con calendario y enlaces de pago para señas." },
      { step: "04", title: "Handoff Humano VIP", desc: "Aviso prioritario al asesor cuando el lead está listo para comprar." }
    ],
    capabilities: [
      "Integración oficial con WhatsApp Cloud API (Meta) con antibloqueos",
      "RAG semántico que consulta catálogo, precios y políticas de la empresa",
      "Detección de intenciones y cierre de anticipos mediante enlaces de pago",
      "Inbox Zero automático con resumen enviado al dashboard del operador"
    ],
    technologies: ["WhatsApp Cloud API", "LangChain / OpenAI", "Supabase Realtime"],
    metric: { headline: "<30 SEG", label: "Tiempo récord de respuesta 24/7" }
  },
  {
    id: "srv-pricing",
    name: "Motor de Precios Dinámicos",
    subtitle: "Revenue Management con IA",
    category: "agentes",
    categoryLabel: "Agentes de Conversión",
    iconName: "TrendingUp",
    color: "#a855f7", // Púrpura Neón
    emissive: "#9333ea",
    size: 2.2,
    orbitRadius: 85,
    speed: 0.41,
    modelGlb: "jupiter.glb",
    summary: "Algoritmo de elasticidad de precios que ajusta tarifas automáticamente según ocupación y temporada.",
    bottleneckD0: "Cobrar la misma tarifa todo el año: perder dinero en alta demanda o quedar vacíos en días entre semana.",
    pipeline: [
      { step: "01", title: "Lectura de Ocupación", desc: "Monitoreo en vivo del porcentaje de capacidad reservada." },
      { step: "02", title: "Análisis de Demanda", desc: "Cálculo de estacionalidad, festivos y velocidad de ventas." },
      { step: "03", title: "Ajuste Escalonado", desc: "Modificación de tarifas por cabaña, huésped adicional y fecha." },
      { step: "04", title: "Impacto en RevPAR", desc: "Métricas de ADR y RevPAR reflejadas en el dashboard." }
    ],
    capabilities: [
      "Configurador dinámico de tarifas en el Dashboard con persistencia inmediata",
      "Reglas de ocupación: aumentos progresivos al superar el 70% y 90%",
      "Tarificación diferenciada por número de ocupantes (1 a 4 personas)",
      "Métricas clave: ADR, RevPAR y Tasa de Conversión en tiempo real"
    ],
    technologies: ["Revenue AI Engine", "PostgreSQL Aggregates", "Chart.js"],
    metric: { headline: "+28% REVPAR", label: "Optimización matemática de ingresos" }
  },
  {
    id: "srv-firma",
    name: "Firma Digital & Onboarding",
    subtitle: "Contratos Legales Sin Papel",
    category: "agentes",
    categoryLabel: "Agentes de Conversión",
    iconName: "FileSignature",
    color: "#14b8a6", // Turquesa
    emissive: "#0d9488",
    size: 1.9,
    orbitRadius: 94,
    speed: 0.37,
    modelGlb: "callisto.glb",
    summary: "Generación automática de contratos de servicio y pagarés firmados digitalmente con validez jurídica.",
    bottleneckD0: "Papeleo físico demorado, contratos sin firmar antes de prestar el servicio y disputas legales sin respaldo.",
    pipeline: [
      { step: "01", title: "Carga de Variables", desc: "Inyección automática de datos del cliente y valores acordados." },
      { step: "02", title: "Enlace Único Cifrado", desc: "Envío por SMS o WhatsApp sin necesidad de instalar apps." },
      { step: "03", title: "Firma en Pantalla", desc: "Captura de trazo biométrico, dirección IP y timestamp oficial." },
      { step: "04", title: "Sellado SHA-256", desc: "PDF con hash criptográfico inmutable almacenado en la nube." }
    ],
    capabilities: [
      "Firma táctil desde celulares sin descargas adicionales",
      "Estampado de metadatos forenses: IP, navegador y hora UTC",
      "Integración directa con el registro de reservas del Core DSB",
      "Descarga inmediata del contrato firmado en formato PDF"
    ],
    technologies: ["HTML5 Signature Canvas", "PDF-Lib", "SHA-256 Hashing"],
    metric: { headline: "<90 SEG", label: "Firma legal inmediata sin papel" }
  },
  {
    id: "srv-scraper",
    name: "Vigilante de Mercado",
    subtitle: "Scraping Ético de Tarifas",
    category: "agentes",
    categoryLabel: "Agentes de Conversión",
    iconName: "Eye",
    color: "#84cc16", // Lima Neón
    emissive: "#65a30d",
    size: 1.9,
    orbitRadius: 102,
    speed: 0.34,
    modelGlb: "titan.glb",
    summary: "Monitoreo automatizado de precios y disponibilidad de la competencia directa para no quedar fuera de mercado.",
    bottleneckD0: "Fijar precios a ciegas sin saber a cuánto está vendiendo la competencia local en fines de semana.",
    pipeline: [
      { step: "01", title: "Definición de Target", desc: "Selección de competidores clave en la misma zona geográfica." },
      { step: "02", title: "Extracción Headless", desc: "Sondeo automatizado de tarifas públicas y calendarios." },
      { step: "03", title: "Comparativa de Margen", desc: "Posicionamiento competitivo de tu negocio frente al mercado." },
      { step: "04", title: "Sugerencia Táctica", desc: "Alerta cuando la competencia sube precios o agota plazas." }
    ],
    capabilities: [
      "Monitoreo ético de tarifas públicas sin vulnerar términos de servicio",
      "Comparativa en vivo en el Dashboard frente a tus 5 competidores clave",
      "Detección de fechas de alta ocupación generalizada en tu zona",
      "Sugerencia proactiva de incremento de tarifas para capturar margen"
    ],
    technologies: ["Playwright Headless", "Redis Cache", "Supabase Tables"],
    metric: { headline: "INTELIGENCIA 360°", label: "Visibilidad total del mercado" }
  },
  {
    id: "srv-voz",
    name: "Agentes de Voz Neuronal",
    subtitle: "Llamadas Entrantes Humanizadas",
    category: "agentes",
    categoryLabel: "Agentes de Conversión",
    iconName: "Mic",
    color: "#8b5cf6", // Violeta Profundo
    emissive: "#7c3aed",
    size: 2.05,
    orbitRadius: 111,
    speed: 0.31,
    modelGlb: "europa.glb",
    summary: "Llamadas telefónicas atendidas con voz humana realista de baja latencia para reservas y consultas complejas.",
    bottleneckD0: "Llamadas telefónicas perdidas en horas pico o contestadores de voz robóticos que provocan cuelgues.",
    pipeline: [
      { step: "01", title: "Recepción de Llamada", desc: "Atención telefónica sin esperas ni conmutadores molestos." },
      { step: "02", title: "Voz Neuronal Humana", desc: "Sintetización realista con acento natural en <800ms." },
      { step: "03", title: "Consulta de Disponibilidad", desc: "El agente consulta la base de datos en tiempo real." },
      { step: "04", title: "Confirmación por SMS", desc: "Despacho inmediato de enlace de pago o reserva al llamante." }
    ],
    capabilities: [
      "Voz neuronal hiperrealista con entonación natural sin robots",
      "Comprensión del lenguaje natural e interrupciones fluidas",
      "Conexión directa con el inventario de habitaciones o mesas",
      "Transferencia limpia a asesores humanos ante casos especiales"
    ],
    technologies: ["Azure Neural Voice / WebRTC", "Whisper STT", "FastAPI"],
    metric: { headline: "<800 MS", label: "Latencia de conversación fluida" }
  },

  // =========================================================================
  // 🛡️ BLINDAJE & AUTOMATIZACIÓN
  // =========================================================================
  {
    id: "srv-n8n",
    name: "Pipelines n8n Autónomos",
    subtitle: "Automatización Sin Servidor",
    category: "blindaje",
    categoryLabel: "Blindaje & Automatizaciones",
    iconName: "Workflow",
    color: "#22d3ee", // Cyan Brillante
    emissive: "#06b6d4",
    size: 2.0,
    orbitRadius: 119,
    speed: 0.28,
    modelGlb: "mercury.glb",
    summary: "Flujos de integración entre CRMs, hojas de cálculo y bases de datos que operan en segundo plano sin fallos.",
    bottleneckD0: "Copia manual de datos entre plataformas, generando errores humanos y pérdida de decenas de horas hombre.",
    pipeline: [
      { step: "01", title: "Trigger Webhook", desc: "Captura de eventos desde formularios, pasarelas o ERPs." },
      { step: "02", title: "Validación Zod", desc: "Sanitización y tipado estricto de la información entrante." },
      { step: "03", title: "Ejecución Asíncrona", desc: "Enrutamiento paralelo sin bloquear la experiencia del usuario." },
      { step: "04", title: "Log Inmutable", desc: "Reintentos automáticos con exponential backoff." }
    ],
    capabilities: [
      "Flujos n8n self-hosted alojados en tu propio servidor sin límites",
      "Webhooks seguros firmados con HMAC SHA-256",
      "Sincronización multi-plataforma entre WhatsApp, Supabase y CRM",
      "Manejo estructurado de excepciones con auto-curación"
    ],
    technologies: ["n8n Enterprise", "Webhooks HMAC", "Redis Queues"],
    metric: { headline: "<120 MS", label: "Tiempo de sincronización de eventos" }
  },
  {
    id: "srv-dian",
    name: "Conciliación DIAN & OCR",
    subtitle: "Extracción Contable Inteligente",
    category: "blindaje",
    categoryLabel: "Blindaje & Automatizaciones",
    iconName: "FileText",
    color: "#34d399", // Menta Hielo
    emissive: "#10b981",
    size: 2.1,
    orbitRadius: 128,
    speed: 0.26,
    modelGlb: "io.glb",
    summary: "Extracción multimodal de facturas con visión artificial y conciliación automática contra tus extractos bancarios.",
    bottleneckD0: "Cientos de horas perdidas digitando facturas en PDF a mano, gastos deducibles olvidados y multas fiscales.",
    pipeline: [
      { step: "01", title: "Ingesta Multimodal", desc: "Recepción de facturas en PDF, tickets o fotos de proveedores." },
      { step: "02", title: "OCR con Visión AI", desc: "Extracción de CUFE, NIT, emisor, IVA, retenciones y líneas." },
      { step: "03", title: "Cotejo Bancario", desc: "Cruce automático contra movimientos en cuentas bancarias." },
      { step: "04", title: "Asiento Contable", desc: "Exportación lista para Siigo, World Office o Excel." }
    ],
    capabilities: [
      "Lectura de facturas electrónicas XML/PDF con extracción precisa",
      "Detección de duplicidad de facturas para evitar dobles pagos",
      "Cálculo automático de retenciones en la fuente aplicables",
      "Exportación en 1 clic a formatos CSV/Excel contables"
    ],
    technologies: ["Claude 3.5 Sonnet Vision", "XML DOM Parser", "DIAN Engine"],
    metric: { headline: "99.4% PRECISIÓN", label: "Extracción contable sin digitación" }
  },
  {
    id: "srv-security",
    name: "Sentinel Ciberseguridad Defensiva",
    subtitle: "Hardening RLS & Criptografía",
    category: "blindaje",
    categoryLabel: "Blindaje & Automatizaciones",
    iconName: "ShieldAlert",
    color: "#6366f1", // Índigo Oscuro
    emissive: "#4f46e5",
    size: 2.0,
    orbitRadius: 136,
    speed: 0.24,
    modelGlb: "triton.glb",
    summary: "Políticas de Row Level Security (RLS) en base de datos para que ningún usuario acceda a datos ajenos.",
    bottleneckD0: "Filtraciones de bases de datos de clientes, brechas por APIs sin autenticar y accesos indebidos de empleados.",
    pipeline: [
      { step: "01", title: "Políticas RLS Nativas", desc: "Cada consulta se filtra en el motor de PostgreSQL según el rol." },
      { step: "02", title: "Sanitización Criptográfica", desc: "Validación de esquemas Zod antes de tocar el servidor." },
      { step: "03", title: "Firmas HMAC", desc: "Webhooks verificados con tiempo constante antibloqueos." },
      { step: "04", title: "Auditoría de Acceso", desc: "Registro estricto de inicios de sesión con alertas de anomalías." }
    ],
    capabilities: [
      "RLS (Row Level Security) obligatorio en el 100% de tablas",
      "Funciones de base de datos con search_path blindado",
      "Contraseñas con hashing Argon2id / Bcrypt de última generación",
      "Tokens JWT cifrados con expiración corta y rotación automática"
    ],
    technologies: ["PostgreSQL RLS", "HMAC SHA-256", "Argon2id", "Zod"],
    metric: { headline: "ZERO TRUST", label: "100% tablas protegidas con RLS" }
  },
  {
    id: "srv-alertas",
    name: "Alertas Push Críticas (<500ms)",
    subtitle: "Monitoreo Push a Telegram",
    category: "blindaje",
    categoryLabel: "Blindaje & Automatizaciones",
    iconName: "Bell",
    color: "#ef4444", // Rojo Alerta
    emissive: "#dc2626",
    size: 1.85,
    orbitRadius: 145,
    speed: 0.22,
    modelGlb: "moon.glb",
    summary: "Despacho instantáneo de notificaciones operativas a tu celular ante pagos, reservas o incidencias en <500ms.",
    bottleneckD0: "Enterarse de un fallo en el servidor o de una venta prioritaria horas después porque nadie revisaba el correo.",
    pipeline: [
      { step: "01", title: "Detección de Suceso", desc: "Escucha pasiva de cambios críticos en base de datos (CDC)." },
      { step: "02", title: "Filtrado de Severidad", desc: "Clasificación entre informativo o alerta crítica de negocio." },
      { step: "03", title: "Despacho Push", desc: "Envío inmediato vía bot de Telegram o WhatsApp." },
      { step: "04", title: "Confirmación Ack", desc: "Botón interactivo de enterado para auditar al equipo." }
    ],
    capabilities: [
      "Notificaciones directas a Telegram con botones de acción rápida",
      "Alertas ante reservas nuevas, pagos o comprobantes pendientes",
      "Monitoreo de estado de salud del servidor con aviso de caídas",
      "Cero ruido: solo alertas de alto impacto sin saturar bandejas"
    ],
    technologies: ["Telegram Bot API", "Supabase CDC (pg_notify)", "WebSockets"],
    metric: { headline: "<500 MS", label: "Despacho de alerta al celular" }
  },
  {
    id: "srv-vouchers",
    name: "Generador de Vouchers Imprimibles",
    subtitle: "Folios Editoriales POS & PDF",
    category: "blindaje",
    categoryLabel: "Blindaje & Automatizaciones",
    iconName: "Receipt",
    color: "#cbd5e1", // Platino
    emissive: "#94a3b8",
    size: 1.9,
    orbitRadius: 153,
    speed: 0.20,
    modelGlb: "earth.glb",
    summary: "Motor de comprobantes de pago, folios de huésped y reportes financieros con formato editorial de lujo.",
    bottleneckD0: "Enviar recibos en capturas de pantalla informales o generar hojas caóticas que proyectan desorden comercial.",
    pipeline: [
      { step: "01", title: "Consolidación de Cargos", desc: "Recopilación de alojamiento, consumos y deducciones." },
      { step: "02", title: "Inyección de Marca", desc: "Aplicación de logotipo, tipografías y sellos de agua." },
      { step: "03", title: "Motor de Impresión", desc: "Reglas @media print adaptadas a hojas carta y tirillas térmicas." },
      { step: "04", title: "Exportación Directa", desc: "1 Clic para imprimir físicamente o exportar en PDF perfecto." }
    ],
    capabilities: [
      "Hojas de estilo CSS @media print calibradas sin cortes feos",
      "Compatibilidad con impresoras térmicas POS de recibos (80mm)",
      "Desglose limpio de subtotal, impuestos aplicables y saldo",
      "Código QR integrado de verificación de autenticidad"
    ],
    technologies: ["Tailwind Print Engine", "CSS Paged Media", "QR Engine"],
    metric: { headline: "PRINT-READY", label: "Recibos y folios editoriales" }
  },
  {
    id: "srv-audit",
    name: "Auditor 24/7 de Bases de Datos",
    subtitle: "Detección de Anomalías Contables",
    category: "blindaje",
    categoryLabel: "Blindaje & Automatizaciones",
    iconName: "Database",
    color: "#d97706", // Oro Antiguo
    emissive: "#b45309",
    size: 2.0,
    orbitRadius: 162,
    speed: 0.18,
    modelGlb: "mars.glb",
    summary: "Vigilante autónomo que inspecciona transacciones y saldos para detectar inconsistencias antes de que se vuelvan pérdidas.",
    bottleneckD0: "Descuadres silenciosos, cobros no registrados o manipulaciones malintencionadas descubiertas tarde.",
    pipeline: [
      { step: "01", title: "Barrido Forense", desc: "Inspección periódica de sumas de folios vs movimientos de caja." },
      { step: "02", title: "Cotejo de Integridad", desc: "Verificación de coincidencia entre pasarelas y reservas." },
      { step: "03", title: "Alerta de Discrepancia", desc: "Marcado inmediato de cualquier asiento contable desfasado." },
      { step: "04", title: "Dossier Forense", desc: "Informe detallando usuario, hora y desfase para auditoría." }
    ],
    capabilities: [
      "Inspección programada desatendida mediante cron jobs en la base de datos",
      "Algoritmo de detección de transacciones atípicas o fuera de promedio",
      "Trazabilidad inmutable de cambios en tablas maestras con bitácora",
      "Validación de firmas criptográficas para garantizar que ningún dato fue alterado"
    ],
    technologies: ["PostgreSQL Triggers", "Supabase pg_cron", "Argon2id"],
    metric: { headline: "100% TRAZABLE", label: "Cero descuadres silenciosos" }
  }
];
