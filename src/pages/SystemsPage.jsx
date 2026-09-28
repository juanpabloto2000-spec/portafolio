import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import HyperframeHUDContainer from '../components/ui/HyperframeHUDContainer';
import RevealSection from '../components/motion/RevealSection';
import { 
  Layers, Calendar, Database, Utensils, DollarSign, Package, 
  BedDouble, Palette, ShieldAlert, LineChart, CheckCircle2, ArrowRight, Sparkles,
  FileSpreadsheet, Video, Workflow, Target, Inbox, Bot, Zap, Cpu, Activity, GitFork, Award
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export default function SystemsPage() {
  const [selectedSystemId, setSelectedSystemId] = useState('sys-1');

  const systemsSuite = [
    {
      id: 'sys-1',
      number: '01',
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

  const activeSystem = systemsSuite.find(s => s.id === selectedSystemId) || systemsSuite[0];
  const IconComponent = activeSystem.icon;

  return (
    <div className="bg-transparent min-h-screen text-platinum antialiased selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden grain-overlay">
      
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 space-y-12">
        
        {/* Cabecera Principal */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-4">
          <RevealSection direction="up" className="max-w-3xl space-y-4">
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
              Sistemas de Software & Automatizaciones Reales
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed">
              En Dynamind no vendemos plantillas de WordPress ni agregadores con comisiones. 
              Diseñamos una suite de 17 sistemas nativos gobernados por código propietario para erradicar cada cuello de botella de tu negocio.
            </p>
          </RevealSection>
        </section>

        {/* ============================================================== */}
        {/* CONSOLA DE SISTEMAS EN SPLIT-VIEW TÁCTICO                     */}
        {/* ============================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* SELECTOR DE LOS 16 SISTEMAS: Horizontal scroll en móvil, rail lateral en desktop */}
            <div className="lg:col-span-4 w-full">
              {/* Contenedor adaptativo: flex horizontal scroll en móvil, stack vertical en desktop */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 scrollbar-none snap-x lg:max-h-[750px] lg:pr-1">
                {systemsSuite.map((sys) => {
                  const isSelected = selectedSystemId === sys.id;
                  const Icon = sys.icon;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => {
                        soundFx.playBlip(540);
                        setSelectedSystemId(sys.id);
                      }}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 shrink-0 min-w-[170px] sm:min-w-[200px] lg:w-full snap-start ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/70 to-blue-950/60 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50 scale-[1.01]'
                          : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 truncate">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-cyan-500 text-black' : 'bg-white/10 text-cyan-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-sans font-bold leading-tight truncate block">
                            {sys.shortLabel}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isSelected ? (
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        ) : (
                          <span className="text-xs font-mono text-zinc-600 hidden sm:inline">→</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VISUALIZADOR CENTRAL DE ARQUITECTURA (8 cols) */}
            <div className="lg:col-span-8">
              <HyperframeHUDContainer className="p-6 sm:p-10 space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSystem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-8"
                  >
                    {/* Encabezado */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
                      <div className="space-y-2">
                        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                          {activeSystem.title}
                        </h2>
                        <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed max-w-xl">
                          {activeSystem.tagline}
                        </p>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Diagrama de Flujo del Sistema */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="flex items-center gap-1.5 text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
                          <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Flujo de Operación del Sistema</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {activeSystem.pipelineSteps.map((step, sIdx) => (
                          <div 
                            key={sIdx}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center space-y-1 relative"
                          >
                            <span className="text-[9px] font-mono text-zinc-500 block uppercase">Fase 0{sIdx + 1}</span>
                            <span className="text-xs font-sans font-bold text-white block leading-tight">{step}</span>
                            {sIdx < activeSystem.pipelineSteps.length - 1 && (
                              <span className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-400 text-xs font-mono z-20">
                                ➔
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fricción Crítica Erradicada */}
                    <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-1 font-sans">
                      <div className="text-[11px] font-mono uppercase text-red-400 font-bold">
                        Cuello de Botella Operativo Erradicado:
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {activeSystem.coreProblem}
                      </p>
                    </div>

                    {/* Capacidades Operativas & Módulos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Capacidades */}
                      <div className="space-y-3 font-sans">
                        <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Capacidades de Alto Impacto:</span>
                        </div>
                        <div className="space-y-2.5">
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

                    {/* Footer Informativo de Arquitectura (Sin botón "Ver Demo") */}
                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Arquitectura nativa editable y extensible en tu propio repositorio</span>
                      </div>
                      
                      <a
                        href="/#/obras"
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 underline underline-offset-4"
                      >
                        <span>Ver casos reales de este sistema en Obras</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </HyperframeHUDContainer>
            </div>

          </div>
        </section>

      </main>

      <FooterEditorial />
    </div>
  );
}
