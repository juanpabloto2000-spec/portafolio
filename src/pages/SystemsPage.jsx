import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import HyperframeHUDContainer from '../components/ui/HyperframeHUDContainer';
import RevealSection from '../components/motion/RevealSection';
import SolarSystemCanvas, { PLANETARY_WORLDS } from '../components/systems/SolarSystemCanvas';
import { 
  Sun, Layers, Calendar, Database, Utensils, DollarSign, Package, 
  BedDouble, Palette, ShieldAlert, LineChart, CheckCircle2, ArrowRight, Sparkles,
  FileSpreadsheet, Video, Workflow, Target, Inbox, Bot, Zap, Cpu, Activity, GitFork, Award,
  Globe, Compass, ShieldCheck, Orbit, Terminal, Check, X, Search, ChevronRight
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export default function SystemsPage() {
  // Modo de visualización: 'orbital' (Maqueta interactiva del Universo) | 'tactical' (Consola Matriz)
  const [viewMode, setViewMode] = useState('orbital');
  
  // Mundo planetario seleccionado ('world-sun', 'world-aethel', 'world-nexus', 'world-syntropy', 'world-chronos')
  const [selectedWorldId, setSelectedWorldId] = useState('world-sun');
  
  // Sistema específico seleccionado dentro de los planetas
  const [selectedSystemId, setSelectedSystemId] = useState('sys-3');

  // Filtro de búsqueda para el modo Consola Táctica
  const [searchQuery, setSearchQuery] = useState('');

  // Suite canónica de los 17 sistemas operativos
  const systemsSuite = [
    {
      id: 'sys-1',
      number: '01',
      worldId: 'world-nexus',
      shortLabel: 'Webs Scrollytelling',
      title: 'Portales Web de Alta Conversión & Scrollytelling',
      icon: Layers,
      category: 'FRONTOFFICE EDITORIAL',
      tagline: 'Desarrollos nativos que cargan en menos de 0.8s y retienen el tráfico impaciente de Reels y Ads.',
      coreProblem: 'El 75% de los visitantes abandona si una web tarda más de 2 segundos o luce como una plantilla genérica de WordPress.',
      pipelineSteps: ['Tráfico Ads/Reels', 'Edge CDN < 0.8s', 'Físicas 60 FPS', 'Captura Directa'],
      keyCapabilities: [
        'Renderizado instantáneo en CDN Edge con React 18 y Vite (0.000 Layout Shift)',
        'Scrollytelling cinematográfico a 60 FPS con animaciones por hardware',
        'Arquitectura multi-página desacoplada sin transiciones secas ni lag',
        'Diseño responsive calibrado para smartphones de gama alta y monitores panorámicos'
      ],
      modules: [
        { name: 'Motor Visual Scrollytelling', desc: 'Narrativa interactiva sincronizada con el scroll a 60 FPS sin parpadeos.' },
        { name: 'Lienzo de Tarjetas 3D Táctiles', desc: 'Físicas reactivas al puntero que elevan la sensación de producto exclusivo.' },
        { name: 'Capa Ambiental Dinámica', desc: 'Partículas sutiles de fondo que dan vida orgánica a la marca sin saturar.' },
        { name: 'Núcleo de Carga Ultrarrápida', desc: 'Cero plugins pesados; código compilado para carga en milisegundos.' }
      ]
    },
    {
      id: 'sys-2',
      number: '02',
      worldId: 'world-nexus',
      shortLabel: 'Agendamiento & Triaje',
      title: 'Motor de Agendamiento Autónomo & Triaje Visual',
      icon: Calendar,
      category: 'FUNNELS DE CONVERSIÓN',
      tagline: 'Embudo de 45 segundos con odómetro de fricción que califica prospectos y reserva citas en tu propio calendario.',
      coreProblem: 'Dueños de negocio y marcas de autor pierden hasta 4 horas al día respondiendo a curiosos en WhatsApp y pagando suscripciones mensuales a Calendly.',
      pipelineSteps: ['Prospecto Entrante', 'Odómetro Fricción', 'Filtro VIP 💎', 'Google Meet Auto'],
      keyCapabilities: [
        'Calculadora algorítmica de Score de Fricción Operativa (0 a 100%)',
        'Filtrado automático de prospectos: Potencial 💎 vs Curioso 👀',
        'Generación automática de salas de Google Meet en 1 milisegundo',
        'Apertura inmediata del chat de WhatsApp con informe de diagnóstico prellenado'
      ],
      modules: [
        { name: 'Quiz Dopamínico Calificador', desc: 'Descubre las necesidades reales del prospecto en menos de 45 segundos.' },
        { name: 'Escáner de Auditoría Web en Vivo', desc: 'Diagnostica cuellos de botella y fallas de velocidad del sitio del cliente.' },
        { name: 'Calendario Atómico de Citas', desc: 'Disponibilidad sincronizada en tiempo real sin suscripciones de terceros.' },
        { name: 'Enrutador Táctico de WhatsApp', desc: 'Envía al prospecto calificado a tu chat con su radiografía completa.' }
      ]
    },
    {
      id: 'sys-3',
      number: '03',
      worldId: 'world-aethel',
      shortLabel: 'Core Dashboard DSB',
      title: 'Core Operativo Central (DSB / PMS Aislado)',
      icon: Database,
      category: 'BÚNKER TÁCTICO & GESTIÓN',
      tagline: 'Panel táctico privado en /#/dsb para el control total de reservas, folios y operaciones sin enlaces visibles.',
      coreProblem: 'Negocios físicos dependen de libretas de papel o hojas de cálculo desfasadas, provocando overbooking y pérdidas de control.',
      pipelineSteps: ['Ruta Oculta /#/dsb', 'Auth Criptográfica', 'Directorio Folios', 'Modo Local-First'],
      keyCapabilities: [
        'Ruta hash aislada en /#/dsb protegida por credenciales encriptadas',
        'Directorio centralizado de huéspedes y clientes con historial de consumos',
        'Registro de folios acumulativos cargados a la habitación, mesa o sesión médica',
        'Modo Local-First: el panel opera fluidamente incluso con intermitencias de internet'
      ],
      modules: [
        { name: 'Búnker de Acceso Blindado', desc: 'Ruta táctica oculta sin rastro visual en el frontoffice público.' },
        { name: 'Directorio Maestro de Clientes', desc: 'Ficha de consumos acumulados, preferencias y estados de cuenta al día.' },
        { name: 'Gestor de Folios en Tiempo Real', desc: 'Carga de consumos adicionales a habitaciones, mesas o tratamientos.' },
        { name: 'Motor Local de Alta Disponibilidad', desc: 'Resiliencia ante caídas de internet con persistencia blindada.' }
      ]
    },
    {
      id: 'sys-4',
      number: '04',
      worldId: 'world-aethel',
      shortLabel: 'Menús QR & Comandas',
      title: 'Menús Táctiles QR, Comandas KDS & Autopedidos',
      icon: Utensils,
      category: 'GASTRONOMÍA & BARES',
      tagline: 'Cartas táctiles fluidas que elevan el ticket promedio y comanderos con semáforo de tiempos para cocina y barra.',
      coreProblem: 'Cartas en PDF ilegibles en celular y aplicaciones de delivery que le arrebatan el 20% de comisión por cada orden en mesa.',
      pipelineSteps: ['Comensal Escanea QR', 'Autopedido en Mesa', 'Pantalla Cocina KDS', 'Semáforo de Tiempo'],
      keyCapabilities: [
        'Catálogo compacto de alta densidad con barra de filtros CategoryFilter',
        'Comandero digital KDS para cocina y barra con alerta por demoras',
        'División de cuentas (split bill) por comensal o por producto consumido',
        'Autopedidos directos a WhatsApp de cocina con fotografía gastronómica HD'
      ],
      modules: [
        { name: 'Pantalla KDS de Cocina y Barra', desc: 'Semáforo de tiempos para órdenes en preparación, listas y despachadas.' },
        { name: 'Catálogo Gastronómico de Alta Densidad', desc: 'Tarjetas pulidas que muestran 8 a 12 platos a la vez sin fatiga de scroll.' },
        { name: 'Calculadora de División de Cuentas', desc: 'Divide pagos equitativamente o por ítem consumido entre amigos.' },
        { name: 'Autopedido Rápido a Cocina', desc: 'Envío de comandas instantáneas sin esperar a que el mesero regrese.' }
      ]
    },
    {
      id: 'sys-5',
      number: '05',
      worldId: 'world-aethel',
      shortLabel: 'Caja & Arqueo Ciego',
      title: 'Caja por Turnos & Arqueo Ciego con Billetes',
      icon: DollarSign,
      category: 'FINANZAS & RECAUDOS',
      tagline: 'Calculadora de denominaciones de billetes y arqueo ciego inmutable para erradicar descuadres de dinero.',
      coreProblem: 'Fugas de efectivo y desconfianza diaria al cuadrar turnos con personal de atención.',
      pipelineSteps: ['Apertura Base', 'Conteo Físico Billetes', 'Cálculo a Ciegas', 'Historial Inmutable'],
      keyCapabilities: [
        'Apertura de turno con base inicial de efectivo registrada',
        'Calculadora de billetes ($100k, $50k, $20k, $10k, $5k, $2k) para arqueo ciego',
        'El cajero cuenta el dinero físico sin ver el saldo del sistema para evitar manipulación',
        'Historial auditado de cierres de caja con reporte inmediato de faltantes o sobrantes'
      ],
      modules: [
        { name: 'Control de Turnos con Base Inicial', desc: 'Registro formal del dinero base entregado a cada cajero al iniciar turno.' },
        { name: 'Calculadora de Conteo Físico', desc: 'Desglose exacto de fajos por denominación de billetes y monedas.' },
        { name: 'Arqueo Ciego Antimanipulación', desc: 'El operador no ve el saldo teórico del sistema hasta terminar el conteo.' },
        { name: 'Auditor Inmutable de Cierres', desc: 'Historial sellado con diferencias de caja y firma de responsabilidad.' }
      ]
    },
    {
      id: 'sys-6',
      number: '06',
      worldId: 'world-aethel',
      shortLabel: 'Control de Mermas',
      title: 'Gestor de Inventarios, Mermas & Stock Dual',
      icon: Package,
      category: 'INVENTARIOS & MERMAS',
      tagline: 'Control volumétrico en mililitros para licores y stock unitario con alertas de reorden automático.',
      coreProblem: 'Robos hormiga de botellas abiertas, tragos no cobrados y productos agotados en medio de la operación.',
      pipelineSteps: ['Descorche Botella', 'Medición Mililitros', 'Libro de Mermas', 'Escandallo en Vivo'],
      keyCapabilities: [
        'Modo volumétrico: Rastreo de mililitros consumidos, botellas cerradas y shots',
        'Modo unitario: Stock por unidades con alerta de nivel crítico de inventario',
        'Registro tipificado de mermas y desperdicios (rotura, vencimiento, degustación)',
        'Cálculo de costo de insumos por plato o cóctel en tiempo real'
      ],
      modules: [
        { name: 'Rastreo Volumétrico en Mililitros', desc: 'Medición de tragos servidos vs botellas abiertas para cero fugas de licor.' },
        { name: 'Monitor de Stock Unitario Crítico', desc: 'Alertas tempranas de reabastecimiento antes de que se agote un producto.' },
        { name: 'Libro Tipificado de Mermas', desc: 'Registro justificado de pérdidas por rotura, descorche o caducidad.' },
        { name: 'Escandallo y Costeo en Vivo', desc: 'Margen de ganancia neto calculado por cada porción o cóctel servido.' }
      ]
    },
    {
      id: 'sys-7',
      number: '07',
      worldId: 'world-aethel',
      shortLabel: 'Reservas de Cabañas',
      title: 'Motor de Reservas Directas & Matriz de Cabañas',
      icon: BedDouble,
      category: 'HOSPEDAJES & GLAMPINGS',
      tagline: 'Calendario atómico de disponibilidad con cobro de anticipo del 50% y Check-In / Check-Out exprés.',
      coreProblem: 'Comisiones de hasta el 25% pagadas a Booking o Airbnb y caos de fechas en festivos.',
      pipelineSteps: ['Matriz de Fechas', 'Cobro Anticipo 50%', 'Bloqueo Atómico', 'Check-In Digital'],
      keyCapabilities: [
        'Matriz visual interactiva de disponibilidad por cabaña o suite',
        'Cobro automático del 50% de anticipo para bloquear fechas al instante',
        'Módulo de Check-In y Check-Out exprés en un toque',
        'Bloqueo táctico de fechas por mantenimiento o temporada privada'
      ],
      modules: [
        { name: 'Matriz Atómica de Disponibilidad', desc: 'Semáforo visual de noches libres, ocupadas y en mantenimiento.' },
        { name: 'Calculador de Anticipo del 50%', desc: 'Cálculo de depósito de confirmación y saldo pendiente al llegar.' },
        { name: 'Check-In y Check-Out Digital', desc: 'Recepción sin papeleo con firma táctil desde el móvil del huésped.' },
        { name: 'Bloqueador Táctico de Temporadas', desc: 'Cierre de fechas para eventos privados o mantenimientos programados.' }
      ]
    },
    {
      id: 'sys-8',
      number: '08',
      worldId: 'world-nexus',
      shortLabel: 'CMS en Caliente',
      title: 'CMS en Caliente, Tarifas Dinámicas & Tokens',
      icon: Palette,
      category: 'PERSONALIZACIÓN EN VIVO',
      tagline: 'Modifica titulares, WhatsApp oficial, precios por temporada y paleta cromática en segundos.',
      coreProblem: 'Depender de una agencia externa y pagar facturas adicionales para cambiar una foto o un precio.',
      pipelineSteps: ['Edición en Caliente', 'Validación Local', 'Nube Supabase', 'Reflejo en Clientes'],
      keyCapabilities: [
        'Ajuste dinámico de tarifas por cabaña u ocupación (1 a 4 pax) sin tocar código',
        'Editor en caliente de titulares Hero, banner de anuncios y WhatsApp oficial',
        'Customizador de paleta y tokens cromáticos en vivo (LiveThemeCustomizer)',
        'Sincronización instantánea con almacenamiento local y Supabase'
      ],
      modules: [
        { name: 'Editor en Vivo de Textos y Banners', desc: 'Actualiza promociones, ofertas de temporada y números en segundos.' },
        { name: 'Gestor Dinámico de Tarifas', desc: 'Precios escalonados según temporada alta, festivos o número de huéspedes.' },
        { name: 'Selector de Paletas en Vivo', desc: 'Cambia la atmósfera visual de la web sin reconstruir ni tocar código.' },
        { name: 'Sincronizador en la Nube', desc: 'Tus cambios se reflejan al instante en todos los dispositivos de los clientes.' }
      ]
    },
    {
      id: 'sys-9',
      number: '09',
      worldId: 'world-aethel',
      shortLabel: 'Seguridad & Roles',
      title: 'Seguridad RBAC, Capado de Staff & Kill Switch',
      icon: ShieldAlert,
      category: 'CIBERSEGURIDAD DEFENSIVA',
      tagline: 'Perfiles con capado estricto para recepción y panel de control remoto de soberanía tecnológica.',
      coreProblem: 'Personal que accede a métricas financieras privadas o agencias que retienen el código como rehenes.',
      pipelineSteps: ['Admin vs Staff', 'Escudo Financiero', 'Kill Switch Remoto', 'Bitácora Sesiones'],
      keyCapabilities: [
        'Roles diferenciados: Admin Master (acceso total) vs Staff (ciego a finanzas)',
        'El personal de recepción no puede ver ingresos, caja ni modificar precios',
        'Panel de Kill Switch de soberanía con interruptores remotos de corte de servicio',
        'Pantalla de acceso táctico con credenciales encriptadas y bitácora de sesiones'
      ],
      modules: [
        { name: 'Escudo de Privacidad para Staff', desc: 'La recepción opera folios y check-in pero queda ciega a ingresos brutos.' },
        { name: 'Consola de Kill Switch Remoto', desc: 'Soberanía tecnológica total sobre tus instancias ante cualquier eventualidad.' },
        { name: 'Cifrado de Credenciales Maestras', desc: 'Autenticación con protección contra fuerza bruta y sesiones auditadas.' },
        { name: 'Bitácora de Eventos de Seguridad', desc: 'Registro de accesos con fecha, hora y dispositivo utilizado.' }
      ]
    },
    {
      id: 'sys-10',
      number: '10',
      worldId: 'world-aethel',
      shortLabel: 'Telemetría y Facturas',
      title: 'Telemetría Financiera & Facturación Térmica',
      icon: LineChart,
      category: 'MÉTRICAS & COMPROBANTES',
      tagline: 'Reportes reactivos de ingresos brutos, comisiones ahorradas e impresión térmica para impresoras POS.',
      coreProblem: 'Tomar decisiones a ciegas sin saber cuál es el plato o la cabaña más rentable.',
      pipelineSteps: ['Ventas en Vivo', 'Cálculo de Margen', 'Impresión POS 58/80', 'Comprobante QR'],
      keyCapabilities: [
        'Tarjetas de KPI en tiempo real: Ingresos brutos, ticket promedio y comisiones evitadas',
        'Gráficas de ocupación y volumen de ventas diarias y mensuales',
        'Hojas de estilo @media print calibradas para impresoras térmicas de 58mm y 80mm',
        'Generación de vouchers y recibos oficiales con código de verificación'
      ],
      modules: [
        { name: 'Tablero Táctico de Ingresos', desc: 'Visualización clara de ventas brutas, márgenes netos y comisiones evitadas.' },
        { name: 'Impresor Térmico POS 58/80mm', desc: 'Tickets y comandas formateados a la perfección para impresoras físicas.' },
        { name: 'Generador de Comprobantes Oficiales', desc: 'Recibos digitales en PDF con código QR de verificación instantánea.' },
        { name: 'Radar de Productos Más Rentables', desc: 'Descubre qué servicios generan mayor utilidad y cuáles tienen baja rotación.' }
      ]
    },
    {
      id: 'sys-11',
      number: '11',
      worldId: 'world-syntropy',
      shortLabel: 'Lectura OCR Facturas',
      title: 'Automatización OCR de Facturas & Conciliación con IA',
      icon: FileSpreadsheet,
      category: 'AUTOMATIZACIÓN ADMINISTRATIVA',
      tagline: 'Extracción algorítmica de ítems, impuestos (IVA/retenciones), NIT y totales desde fotos o PDFs sin digitación manual.',
      coreProblem: 'Administradores y contadores pierden más de 15 horas a la semana digitando facturas físicas a mano, con altos errores de digitación.',
      pipelineSteps: ['Foto de Ticket/PDF', 'Visión Artificial OCR', 'Separación IVA/Ret', 'Export Siigo/Excel'],
      keyCapabilities: [
        'Visión artificial entrenada para procesar fotos de tickets, facturas arrugadas y PDFs electrónicos',
        'Extracción instantánea de NIT, proveedor, fecha, base gravable, retenciones y valor total',
        'Conciliación automática con extractos bancarios y comprobantes de egreso',
        'Exportación estructurada en 1 clic a Excel, Siigo, Alegra o software contable propietario'
      ],
      modules: [
        { name: 'Escáner Visual de Tickets y Facturas', desc: 'Lee fotos tomadas desde celular reconociendo montos e impuestos al instante.' },
        { name: 'Extractor Fiscal Automatizado', desc: 'Separa base gravable, IVA y retenciones en la fuente sin error humano.' },
        { name: 'Conciliador con Extractos de Banco', desc: 'Comprueba pagos reales contra facturas recibidas de forma automática.' },
        { name: 'Exportador a Sistemas Contables', desc: 'Descarga archivos planos listos para importar en Siigo, Alegra o Excel.' }
      ]
    },
    {
      id: 'sys-12',
      number: '12',
      worldId: 'world-chronos',
      shortLabel: 'Guiones Redes Sociales',
      title: 'Motor de Guiones para Redes Sociales & Calendario con IA',
      icon: Video,
      category: 'MARKETING DE RETENCIÓN',
      tagline: 'Generador de hooks virales de alta retención, guiones segundo a segundo para Reels/TikToks y calendario editorial sincronizado.',
      coreProblem: 'Bloqueo creativo del dueño o del equipo, semanas sin publicar en Instagram y fuga constante de clientes ante competidores más activos.',
      pipelineSteps: ['Pilar de Contenido', 'Gancho 0-3 Segundos', 'Estructura Retención', 'Sync a Calendario'],
      keyCapabilities: [
        'Estructura probada segundo a segundo: Gancho visual (0-3s), Fricción/Historia (3-20s) y Llamado a la Acción (CTA)',
        'Calibración algorítmica al tono de voz exacto de la marca (Lujo, Educativo, Cercano, Disruptivo)',
        'Matriz de pilares de contenido: Autoridad, Casos Reales de Clientes, Educación y Venta Directa',
        'Sincronización automática de calendario editorial con Google Calendar, Notion o Trello'
      ],
      modules: [
        { name: 'Generador de Ganchos Virales (Hooks)', desc: 'Titulares y primeros 3 segundos diseñados para detener el scroll en seco.' },
        { name: 'Estructurador de Guion 30 Segundos', desc: 'Parrilla segundo a segundo con lo que se dice y lo que se muestra en pantalla.' },
        { name: 'Matriz de Pilares Estratégicos', desc: 'Equilibrio automático entre contenido educativo, autoridad y venta directa.' },
        { name: 'Sincronizador con Calendarios', desc: 'Envía fechas y conceptos programados a Google Calendar o Notion en 1 clic.' }
      ]
    },
    {
      id: 'sys-13',
      number: '13',
      worldId: 'world-syntropy',
      shortLabel: 'Flujos Autónomos n8n',
      title: 'Workflows Autónomos & Agentes Webhook (n8n / Make / WhatsApp)',
      icon: Workflow,
      category: 'ORQUESTACIÓN DE NEGOCIO',
      tagline: 'Conecta WhatsApp, pasarelas de pago (Wompi/Stripe), CRM y bases de datos para operar en piloto automático.',
      coreProblem: 'Enviar enlaces de pago a mano, copiar datos de clientes en tres programas distintos y olvidar hacer seguimiento a cotizaciones.',
      pipelineSteps: ['Evento Comercial', 'Disparo de Pasarela', 'Alerta Telegram Dueño', 'Recordatorio Auto'],
      keyCapabilities: [
        'Generación y envío instantáneo de enlaces de pago seguros al confirmar una reserva o pedido',
        'Disparo de recordatorios y confirmaciones automáticas por WhatsApp a 24h y 2h del evento',
        'Notificaciones en tiempo real al canal privado de Telegram o Slack del dueño de negocio',
        'Actualización automática de inventario y folios sin necesidad de intervención humana'
      ],
      modules: [
        { name: 'Disparador de Enlaces de Cobro', desc: 'Crea y envía el link de pasarela segura cuando el cliente da el sí en WhatsApp.' },
        { name: 'Recordatorios Automatizados 24h/2h', desc: 'Reduce inasistencias avisando al cliente antes de su cita o check-in.' },
        { name: 'Alerta Inmediata a Telegram/Slack', desc: 'Notifica a los dueños en privado ante cada venta confirmada.' },
        { name: 'Puente Universal de Integraciones', desc: 'Conecta tu software con pasarelas, correos y bases de datos sin fricción.' }
      ]
    },
    {
      id: 'sys-14',
      number: '14',
      worldId: 'world-chronos',
      shortLabel: 'Lead Scoring IA',
      title: 'Sistema de Calificación & Enriquecimiento de Leads con IA',
      icon: Target,
      category: 'VENTAS & PROSPECCIÓN',
      tagline: 'Scoring algorítmico (0-100) en tiempo real con enriquecimiento de datos para hablar solo con decisores con presupuesto.',
      coreProblem: 'Comerciales perdiendo horas en llamadas y chats con curiosos sin presupuesto o que no encajan en el perfil de cliente ideal.',
      pipelineSteps: ['Lead Entrante', 'Scoring Algorítmico', 'Enriquecimiento Web', 'Enrutamiento VIP 💎'],
      keyCapabilities: [
        'Algoritmo de scoring predictivo basado en tamaño de empresa, urgencia y presupuesto estimado',
        'Enriquecimiento automático de datos del prospecto desde su web y redes sociales antes de la llamada',
        'Enrutamiento VIP directo a WhatsApp o llamada inmediata cuando el score supera 85/100',
        'Filtro de descarte cortés y automático para curiosos, ahorrando hasta 20 horas de prospección semanal'
      ],
      modules: [
        { name: 'Calificador Predictivo 0-100', desc: 'Puntúa el valor comercial de cada prospecto antes de que hables con él.' },
        { name: 'Investigador Digital Automático', desc: 'Recopila datos públicos de la empresa y su web para entrar preparado a la llamada.' },
        { name: 'Enrutador VIP de Alta Prioridad', desc: 'Comunica directamente a decisores calificados con el número personal del fundador.' },
        { name: 'Filtro de Descarte Amable', desc: 'Responde educadamente a curiosos sin hacer perder el tiempo de tu equipo.' }
      ]
    },
    {
      id: 'sys-15',
      number: '15',
      worldId: 'world-chronos',
      shortLabel: 'Inbox Zero Inteligente',
      title: 'Organización de Correos & Inbox Zero con IA',
      icon: Inbox,
      category: 'PRODUCTIVIDAD EJECUTIVA',
      tagline: 'Triaje automático de bandejas de entrada, clasificación por urgencia y borradores de respuesta contextual listos en 1 clic.',
      coreProblem: 'Bandejas de entrada con más de 200 correos sin leer, facturas extraviadas y clientes VIP esperando respuesta por días.',
      pipelineSteps: ['Bandeja Saturada', 'Triaje Semántico IA', 'Borrador Contextual', 'Resumen Matutino WA'],
      keyCapabilities: [
        'Clasificación automática por etiquetas: Clientes VIP, Facturación/Pagos, Proveedores y Urgencias Críticas',
        'Generación automática de borradores de respuesta contextual afinados al tono de voz del dueño de negocio',
        'Detección y extracción de solicitudes clave para convertirlas en tareas automáticas',
        'Resumen ejecutivo matutino en WhatsApp de los 3 correos más importantes del día'
      ],
      modules: [
        { name: 'Bandeja Clasificada por Urgencia', desc: 'Separa clientes que quieren pagar de boletines y promociones irrelevantes.' },
        { name: 'Redactor de Borradores Contextuales', desc: 'Respuestas listas respetando tu estilo para que solo tengas que pulsar Enviar.' },
        { name: 'Extractor de Compromisos y Citas', desc: 'Convierte pedidos de clientes dentro del correo en tareas de calendario.' },
        { name: 'Resumen Matutino a WhatsApp', desc: 'Recibe a primera hora los asuntos clave que requieren tu atención hoy.' }
      ]
    },
    {
      id: 'sys-16',
      number: '16',
      worldId: 'world-chronos',
      shortLabel: 'Agentes Tareas 24/7',
      title: 'Agentes Especializados Autónomos para Tareas Cotidianas',
      icon: Bot,
      category: 'OPERACIONES AUTÓNOMAS',
      tagline: 'Agentes multi-tarea 24/7 que auditan cumplimiento de equipo, recopilan métricas y ejecutan tareas repetitivas de oficina.',
      coreProblem: 'El fundador o gerente consumido por micro-gestión diaria de tareas administrativas en lugar de enfocarse en crecer el negocio.',
      pipelineSteps: ['Rutina Programada', 'Auditoría de Equipo', 'Consolidación Cifras', 'Reporte Nocturno'],
      keyCapabilities: [
        'Auditoría automática de tareas diarias pendientes y seguimiento proactivo a miembros del equipo',
        'Consolidación diaria de métricas de ventas, caja y anuncios publicitarios (Meta Ads / Google Ads)',
        'Ejecución autónoma de tareas administrativas programadas (actualización de bases, recordatorios, copias)',
        'Reporte ejecutivo nocturno en WhatsApp con resumen de operaciones y alertas críticas resueltas'
      ],
      modules: [
        { name: 'Auditor Proactivo de Metas de Equipo', desc: 'Supervisa entregables y avisa amablemente a colaboradores antes de los límites.' },
        { name: 'Consolidador Nocturno de Métricas', desc: 'Une ventas, ocupación y gasto publicitario en un informe claro de fin de jornada.' },
        { name: 'Ejecutor Autónomo de Rutinas', desc: 'Hace copias de seguridad, actualiza planillas y envía reportes sin falta.' },
        { name: 'Reporte Ejecutivo a WhatsApp', desc: 'Un informe nocturno en tu móvil con todo lo resuelto y lo que requiere tu visto bueno.' }
      ]
    },
    {
      id: 'sys-17',
      number: '17',
      worldId: 'world-nexus',
      shortLabel: 'Fidelización & Membresías',
      title: 'Creación de Sistemas de Fidelización, Membresías VIP & Puntos',
      icon: Award,
      category: 'RETENCIÓN & RECURRENCIA SOBERANA',
      tagline: 'Plataforma de puntos por consumo, membresías escalonadas y billetera digital en WhatsApp para triplicar la recompra sin regalar descuentos.',
      coreProblem: 'Negocios gastando miles de dólares en captar clientes nuevos que nunca vuelven, mientras regalan descuentos improvisados que destruyen los márgenes de ganancia.',
      pipelineSteps: ['Registro en 1-Tap', 'Acumulación por Consumo', 'Billetera Digital VIP', 'Recompra Recurrente'],
      keyCapabilities: [
        'Acumulación algorítmica de puntos o saldo por cada consumo escaneando el QR de la mesa o folio',
        'Membresías escalonadas (Silver, Gold, Black) con beneficios exclusivos y cortesías de autor',
        'Billetera digital vinculada a WhatsApp sin necesidad de descargar apps pesadas del App Store',
        'Disparadores inteligentes de retención: aviso personalizado al cliente que lleva más de 30 días sin volver'
      ],
      modules: [
        { name: 'Billetera Digital en WhatsApp', desc: 'Consulta de saldo de puntos y recompensas en 1 clic sin fricción de contraseñas.' },
        { name: 'Matriz de Niveles VIP & Exclusividad', desc: 'Reglas de fidelización que incentivan subir el ticket promedio para desbloquear privilegios.' },
        { name: 'Radar de Reactivación de Clientes Inactivos', desc: 'Envíos personalizados y automatizados cuando un cliente habitual deja de frecuentar el negocio.' },
        { name: 'Auditor Antifraude de Puntos', desc: 'Control estricto para evitar que personal de turno acredite puntos ficticios o no autorizados.' }
      ]
    }
  ];

  // Identificar el mundo activo actual
  const activeWorld = PLANETARY_WORLDS.find(w => w.id === selectedWorldId) || PLANETARY_WORLDS[0];
  const isSunActive = activeWorld.id === 'world-sun';

  // Filtrar sistemas pertenecientes al mundo activo
  const worldSystems = useMemo(() => {
    return systemsSuite.filter(s => s.worldId === selectedWorldId);
  }, [selectedWorldId]);

  // Sistema activo actual (si no pertenece al mundo, selecciona el primero de la lista de ese mundo)
  const activeSystem = useMemo(() => {
    const found = systemsSuite.find(s => s.id === selectedSystemId);
    if (found && found.worldId === selectedWorldId) {
      return found;
    }
    return worldSystems[0] || systemsSuite[0];
  }, [selectedSystemId, selectedWorldId, worldSystems]);

  // Manejo de cambio de mundo
  const handleSelectWorld = (worldId) => {
    soundFx.playOrbitWarp();
    setSelectedWorldId(worldId);
    if (worldId !== 'world-sun') {
      const firstSys = systemsSuite.find(s => s.worldId === worldId);
      if (firstSys) setSelectedSystemId(firstSys.id);
    }
  };

  // Manejo de cambio de sistema específico
  const handleSelectSystem = (sysId) => {
    soundFx.playPlanetSelect();
    setSelectedSystemId(sysId);
    const targetSys = systemsSuite.find(s => s.id === sysId);
    if (targetSys && targetSys.worldId !== selectedWorldId) {
      setSelectedWorldId(targetSys.worldId);
    }
  };

  // Filtrado de sistemas en el modo Consola Táctica
  const filteredSystems = useMemo(() => {
    if (!searchQuery.trim()) return systemsSuite;
    const q = searchQuery.toLowerCase();
    return systemsSuite.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.shortLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const IconComponent = activeSystem.icon;

  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 space-y-10 sm:space-y-14">
        
        {/* ============================================================== */}
        {/* HEADER PRINCIPAL: MANIFIESTO CONSULTORÍA SOBERANA (NO AGENCIA) */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-2">
          <RevealSection direction="up" className="space-y-6">
            
            {/* Badge de Posicionamiento Canónico */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>CONSULTORÍA DE IA & INGENIERÍA SOBERANA • NO SOMOS UNA AGENCIA</span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
                El Universo Tecnológico <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-300">
                  de Software & Consultoría de IA
                </span>
              </h1>
              <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed max-w-3xl font-light">
                Las agencias tradicionales venden publicaciones de relleno y revenden plantillas lentas. 
                En <strong className="text-white font-medium">Dynamind</strong> operamos como una <strong>Consultoría de IA e Ingeniería de Sistemas</strong>: 
                auditamos matemáticamente los cuellos de botella de tu negocio y construimos desde <strong>sistemas operativos de alta complejidad</strong> (Core DSB, PMS, KDS, Arqueo Ciego) 
                hasta <strong>automatizaciones y agentes autónomos para misiones ultra-específicas</strong>, todo en tu propio repositorio sin pagar renta de software.
              </p>
            </div>

            {/* Switcher Táctico Dual-Mode */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              
              {/* Botones de Modo de Vista */}
              <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <button
                  onClick={() => {
                    soundFx.playTap();
                    setViewMode('orbital');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'orbital'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Orbit className="w-4 h-4 text-amber-400" />
                  <span>MAQUETA ORBITAL 3D (INTERACTIVA)</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playTap();
                    setViewMode('tactical');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    viewMode === 'tactical'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>CONSOLA MATRIZ (17 SISTEMAS)</span>
                </button>
              </div>

              {/* Métrica de Soberanía */}
              <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% CÓDIGO PROPIETARIO</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>0% COMISIONES A TERCEROS</span>
                </div>
              </div>

            </div>

          </RevealSection>
        </section>

        {/* ============================================================== */}
        {/* MODO 1: UNIVERSO ORBITAL 3D INTERACTIVO                       */}
        {/* ============================================================== */}
        {viewMode === 'orbital' ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            
            {/* 1. LIENZO INTERACTIVO DEL SISTEMA SOLAR A 60 FPS */}
            <RevealSection direction="scale" className="w-full">
              <SolarSystemCanvas
                selectedWorldId={selectedWorldId}
                onSelectWorld={handleSelectWorld}
                onSelectSystem={handleSelectSystem}
              />
            </RevealSection>

            {/* 2. DOCK TÁCTICO DE MUNDOS PLANETARIOS (SELECTORES RÁPIDOS) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {PLANETARY_WORLDS.map((world) => {
                const isSelected = selectedWorldId === world.id;
                return (
                  <button
                    key={world.id}
                    onClick={() => handleSelectWorld(world.id)}
                    className={`shrink-0 snap-start px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-3 text-left ${
                      isSelected
                        ? 'bg-white/10 border-white/30 text-white shadow-xl'
                        : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
                    }`}
                    style={{
                      borderColor: isSelected ? world.color : undefined
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: world.color,
                        boxShadow: isSelected ? `0 0 10px ${world.color}` : 'none'
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold font-sans flex items-center gap-1.5">
                        <span>{world.name}</span>
                        {world.type === 'star' && <span className="text-[10px] text-amber-400 font-mono">★</span>}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate max-w-[140px]">
                        {world.archetype}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 3. PANEL DE TELEMETRÍA HOLOGRÁFICA HUD (DEL MUNDO O SISTEMA ACTIVO) */}
            <HyperframeHUDContainer 
              activeCornerTheme={isSunActive ? 'gold' : 'cyan'} 
              className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                
                {/* VISTA A: SI ESTÁ SELECCIONADO EL SOL CUÁNTICO (MANIFIESTO CONSULTORÍA) */}
                {isSunActive ? (
                  <motion.div
                    key="sun-manifesto"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Header del Manifiesto */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold">
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                          <span>NÚCLEO SOLAR DE ARQUITECTURA // DYNAMIND PRIME</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                          ¿Por qué una Consultoría de IA y NO una Agencia Tradicional?
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed">
                          El mercado está inundado de agencias que cobran tarifas mensuales por publicar fotos genéricas o instalar plugins inflados de WordPress que colapsan tu servidor. 
                          En Dynamind aplicamos rigor de ingeniería de software e inteligencia de negocio.
                        </p>
                      </div>

                      <a
                        href="/#/auditoria"
                        className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-sans font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start lg:self-center"
                      >
                        <span>Diagnosticar Fricción Operativa (D0)</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Matriz Comparativa: Agencia Tradicional vs Consultoría Dynamind */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Pilar 1 */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                        <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">01 // DIAGNÓSTICO MATEMÁTICO</div>
                        <div className="text-sm font-bold text-white font-sans">Auditoría D0 de Cuellos de Botella</div>
                        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                          <p className="text-red-300/80 flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span><strong>Agencia:</strong> Te vende un rediseño superficial sin saber si tu problema es la caja o el no-show.</span>
                          </p>
                          <p className="text-emerald-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Dynamind:</strong> Calculamos el odómetro de fricción y atacamos el cuello de botella que frena tu facturación.</span>
                          </p>
                        </div>
                      </div>

                      {/* Pilar 2 */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                        <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">02 // SOBERANÍA TECNOLÓGICA</div>
                        <div className="text-sm font-bold text-white font-sans">Código Propietario en tu Repositorio</div>
                        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                          <p className="text-red-300/80 flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span><strong>Agencia:</strong> Te ata a plataformas cerradas (Shopify, Wix, Webflow) donde dejas de pagar y pierdes todo.</span>
                          </p>
                          <p className="text-emerald-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Dynamind:</strong> Te entregamos el repositorio privado en GitHub. Eres dueño absoluto del software y tus datos.</span>
                          </p>
                        </div>
                      </div>

                      {/* Pilar 3 */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                        <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">03 // DUALIDAD HOLÍSTICA</div>
                        <div className="text-sm font-bold text-white font-sans">Sistemas Complejos + Agentes Quirúrgicos</div>
                        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                          <p className="text-red-300/80 flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span><strong>Agencia:</strong> Solo sabe conectar un chatbot torpe o hacer publicaciones en Canva.</span>
                          </p>
                          <p className="text-emerald-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Dynamind:</strong> Construimos PMS y cajas con arqueo ciego, y también agentes de scoring o workflows n8n autónomos.</span>
                          </p>
                        </div>
                      </div>

                      {/* Pilar 4 */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 relative group hover:border-amber-500/30 transition-all">
                        <div className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">04 // CERO COMISIONES</div>
                        <div className="text-sm font-bold text-white font-sans">Erradicación de Renta de Intermediarios</div>
                        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
                          <p className="text-red-300/80 flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span><strong>Agencia:</strong> Te hace depender de agregadores que te quitan el 18% al 25% de cada venta en comisiones.</span>
                          </p>
                          <p className="text-emerald-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Dynamind:</strong> Canales de venta y reservas directas a tu propia cuenta bancaria con 0% de comisión externa.</span>
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Guía Interactiva para navegar los Mundos */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                      <div className="text-zinc-300 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-amber-400" />
                        <span>Selecciona cualquier planeta en la maqueta o en las pestañas superiores para ver sus sistemas operativos en detalle.</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                        <span>4 Mundos Planetarios • 17 Sistemas Activos</span>
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  
                  /* VISTA B: SI ESTÁ SELECCIONADO UN MUNDO PLANETARIO */
                  <motion.div
                    key={`world-${activeWorld.id}-${activeSystem.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    
                    {/* Header del Planeta */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold"
                          style={{
                            backgroundColor: `${activeWorld.color}15`,
                            borderColor: `${activeWorld.color}40`,
                            color: activeWorld.color,
                            borderWidth: 1
                          }}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeWorld.color }} />
                          <span>PLANETA {activeWorld.name.toUpperCase()} // {activeWorld.archetype}</span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                          {activeWorld.title}
                        </h2>
                        
                        <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed font-light">
                          {activeWorld.tagline}
                        </p>
                      </div>

                      {/* Contador de Satélites del Planeta */}
                      <div className="shrink-0 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-right space-y-1">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Sistemas Activos</div>
                        <div className="text-xl font-mono font-bold text-white" style={{ color: activeWorld.color }}>
                          {worldSystems.length} en órbita
                        </div>
                      </div>
                    </div>

                    {/* Selector de Satélites / Sistemas de este Planeta */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Orbit className="w-3.5 h-3.5" style={{ color: activeWorld.color }} />
                        <span>Satélites Operativos del Cuadrante (Selecciona para Inspeccionar):</span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                        {worldSystems.map((sys) => {
                          const isSysActive = activeSystem.id === sys.id;
                          const SysIcon = sys.icon;
                          return (
                            <button
                              key={sys.id}
                              onClick={() => handleSelectSystem(sys.id)}
                              className={`shrink-0 snap-start px-4 py-2 rounded-xl text-xs font-sans transition-all flex items-center gap-2.5 border ${
                                isSysActive
                                  ? 'bg-white/15 text-white font-bold shadow-lg'
                                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                              }`}
                              style={{
                                borderColor: isSysActive ? activeWorld.color : undefined
                              }}
                            >
                              <SysIcon className="w-3.5 h-3.5 shrink-0" style={{ color: isSysActive ? activeWorld.color : undefined }} />
                              <span>{sys.shortLabel}</span>
                              <span className="text-[10px] font-mono opacity-60">#{sys.number}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detalle Técnico del Sistema Seleccionado */}
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
                      
                      {/* Cabecera del Sistema */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="text-[11px] font-mono font-bold text-zinc-400 tracking-wider uppercase flex items-center gap-2">
                            <span className="text-white font-mono">SYS-{activeSystem.number}</span>
                            <span>•</span>
                            <span style={{ color: activeWorld.color }}>{activeSystem.category}</span>
                          </div>
                          <h3 className="text-lg sm:text-2xl font-display font-bold text-white">
                            {activeSystem.title}
                          </h3>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 self-start sm:self-center">
                          {activeSystem.tagline}
                        </div>
                      </div>

                      {/* Alerta de Cuello de Botella Crítico (D0) */}
                      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs font-sans text-red-200/90 leading-relaxed space-y-1">
                        <div className="font-mono font-bold text-red-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Fricción Operativa Real que Erradica este Sistema (D0):</span>
                        </div>
                        <p>{activeSystem.coreProblem}</p>
                      </div>

                      {/* Pipeline de Flujo de 4 Pasos */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Pipeline de Ejecución Autónomo:</span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {activeSystem.pipelineSteps.map((step, sIdx) => (
                            <div 
                              key={sIdx} 
                              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-1 relative"
                            >
                              <div className="text-[9px] font-mono text-zinc-500">FASE 0{sIdx + 1}</div>
                              <div className="text-xs font-bold text-white font-sans">{step}</div>
                              {sIdx < activeSystem.pipelineSteps.length - 1 && (
                                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-600 text-xs z-10">
                                  →
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Capacidades & Módulos */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        
                        {/* Capacidades */}
                        <div className="space-y-3 font-sans">
                          <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Capacidades de Alto Impacto:</span>
                          </div>
                          <div className="space-y-2">
                            {activeSystem.keyCapabilities.map((cap, cIdx) => (
                              <div key={cIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                                <span className="text-emerald-400 shrink-0 font-mono">✓</span>
                                <span>{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Módulos */}
                        <div className="space-y-3 font-sans">
                          <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                            <Cpu className="w-4 h-4 text-cyan-400" />
                            <span>Módulos Operativos Activos:</span>
                          </div>
                          <div className="space-y-2">
                            {activeSystem.modules.map((mod, mIdx) => (
                              <div key={mIdx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                                <div className="text-xs font-bold text-white">{mod.name}</div>
                                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{mod.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Footer Informativo del Sistema */}
                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeWorld.color }} />
                          <span>Arquitectura nativa editable y extensible en tu propio repositorio</span>
                        </div>
                        
                        <a
                          href="/#/obras"
                          className="hover:underline font-bold flex items-center gap-1.5"
                          style={{ color: activeWorld.color }}
                        >
                          <span>Ver casos reales de este sistema en Obras</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </HyperframeHUDContainer>

          </section>
        ) : (
          
          /* ============================================================== */
          /* MODO 2: CONSOLA MATRIZ (VISTA COMPLETA DE LOS 17 SISTEMAS)      */
          /* ============================================================== */
          <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            
            {/* Barra de Filtro y Búsqueda Rápida */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrar por nombre, categoría o cuello de botella..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="text-xs font-mono text-zinc-400">
                Mostrando <strong className="text-white">{filteredSystems.length}</strong> de 17 sistemas operativos
              </div>
            </div>

            {/* Grid de Sistemas en Tarjetas Bento Estructuradas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSystems.map((sys) => {
                const SysIcon = sys.icon;
                const world = PLANETARY_WORLDS.find(w => w.id === sys.worldId) || PLANETARY_WORLDS[1];

                return (
                  <div
                    key={sys.id}
                    className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
                  >
                    {/* Borde Superior de Color del Planeta */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: world.color }}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="font-bold text-white">SYS-{sys.number}</span>
                        <span style={{ color: world.color }}>{world.name.toUpperCase()}</span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:scale-105 transition-transform">
                          <SysIcon className="w-5 h-5" style={{ color: world.color }} />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                            {sys.title}
                          </h4>
                          <div className="text-[10px] font-mono text-zinc-400 uppercase">{sys.category}</div>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed font-light">
                        {sys.tagline}
                      </p>

                      <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-[11px] text-red-200/90 leading-relaxed">
                        <strong className="text-red-400 font-mono">D0:</strong> {sys.coreProblem}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">{sys.modules.length} Módulos</span>
                      <button
                        onClick={() => {
                          setSelectedWorldId(sys.worldId);
                          setSelectedSystemId(sys.id);
                          setViewMode('orbital');
                          soundFx.playOrbitWarp();
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 hover:underline"
                      >
                        <span>Explorar en Órbita</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>
        )}

      </main>

      <FooterEditorial />
    </div>
  );
}
