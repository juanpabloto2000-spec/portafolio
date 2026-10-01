import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, ShieldCheck, Database, Layers, Workflow, Bot, 
  ArrowRight, Sparkles, CheckCircle2, RotateCw, Play, Pause,
  Compass, ChevronRight, ChevronLeft, Zap, Target, Inbox, Calendar, DollarSign,
  Utensils, Package, Award, FileSpreadsheet, Video, ShieldAlert, Cpu, Eye, Radio
} from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

// Catálogo canónico de las 18 Estaciones del Universo Dynamind (Núcleo + 17 Galaxias de Servicios)
export const GALAXY_STATIONS = [
  {
    id: 'station-core',
    stationNumber: '00',
    type: 'core',
    name: 'Dynamind Prime',
    title: 'Consultoría de IA Soberana & Arquitectura',
    subtitle: 'NÚCLEO CENTRAL // CONSULTORÍA SOBERANA',
    tagline: 'No somos una agencia. Somos ingenieros de software e inteligencia de negocio que auditamos cuellos de botella (D0) y creamos código propietario sin renta de software.',
    archetype: 'CONSULTORÍA DE IA [NO AGENCIA]',
    color: '#F59E0B',
    accentColor: '#38BDF8',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    icon: Sun,
    category: 'CONSULTORÍA ESTRATÉGICA',
    ringRadius: 0,
    orbitSpeed: 0,
    orbitAngle: 0,
    galaxyType: 'Singularity Cuántica',
    coreD0: 'Pagar mensualidades eternas a agencias que hacen publicaciones en Canva y revenden plantillas de WordPress lentas que no mueven la facturación.',
    deliverables: [
      'Auditoría matemática de cuellos de botella operativos (D0 a D14)',
      'Diseño de arquitectura de software local-first y nube híbrida',
      'Código entregado en el repositorio privado de GitHub del cliente',
      'Erradicación total de comisiones del 18-25% y renta de SaaS'
    ]
  },
  {
    id: 'sys-3',
    stationNumber: '01',
    type: 'system',
    name: 'Galaxia Core DSB',
    title: 'Core Operativo Central (DSB / PMS Oculto en /#/dsb)',
    subtitle: 'SECTOR G-01 // BÚNKER TÁCTICO & GESTIÓN',
    tagline: 'Panel táctico privado en /#/dsb para el control total de reservas, folios y operaciones sin enlaces visibles.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#6366F1',
    accentColor: '#A855F7',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    icon: Database,
    category: 'GESTIÓN PRIVADA',
    ringRadius: 130,
    orbitSpeed: 0.006,
    orbitAngle: 0.2,
    galaxyType: 'Espiral Índigo',
    coreD0: 'Negocios físicos dependiendo de libretas de papel o hojas de cálculo desfasadas, provocando overbooking y pérdidas de control.',
    pipelineSteps: ['Ruta Oculta /#/dsb', 'Auth Criptográfica', 'Directorio Folios', 'Modo Local-First'],
    keyCapabilities: [
      'Ruta hash aislada en /#/dsb protegida por credenciales maestras',
      'Directorio centralizado de huéspedes y clientes con historial de consumos',
      'Registro de folios acumulativos cargados a la habitación o mesa',
      'Modo Local-First: opera fluidamente incluso con cortes de internet'
    ],
    modules: [
      { name: 'Búnker de Acceso Blindado', desc: 'Ruta táctica oculta sin rastro visual en el frontoffice público.' },
      { name: 'Directorio Maestro de Clientes', desc: 'Ficha de consumos acumulados, preferencias y estados de cuenta.' },
      { name: 'Gestor de Folios en Vivo', desc: 'Carga de consumos adicionales a habitaciones, mesas o sesiones.' },
      { name: 'Motor Local de Alta Disponibilidad', desc: 'Resiliencia ante caídas de internet con persistencia blindada.' }
    ]
  },
  {
    id: 'sys-7',
    stationNumber: '02',
    type: 'system',
    name: 'Galaxia PMS Hotelero',
    title: 'PMS Hotelero, Cabañas & Motor de Reservas Directas',
    subtitle: 'SECTOR G-02 // HOSPEDAJE & REVENUE SOBERANO',
    tagline: 'Calendario atómico de disponibilidad con cobro de anticipo del 50% y Check-In / Check-Out exprés sin comisiones.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#3B82F6',
    accentColor: '#60A5FA',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    icon: Calendar,
    category: 'HOSPEDAJES & GLAMPINGS',
    ringRadius: 165,
    orbitSpeed: 0.0055,
    orbitAngle: 0.7,
    galaxyType: 'Cúmulo Zafiro',
    coreD0: 'Comisiones de hasta el 25% pagadas a Booking o Airbnb y caos de disponibilidad en puentes festivos.',
    pipelineSteps: ['Matriz de Fechas', 'Cobro Anticipo 50%', 'Bloqueo Atómico', 'Check-In Digital'],
    keyCapabilities: [
      'Matriz visual interactiva de disponibilidad por cabaña o suite',
      'Cobro automático del 50% de anticipo para bloquear fechas al instante',
      'Módulo de Check-In y Check-Out exprés con firma táctil desde el móvil',
      'Bloqueo táctico de fechas por mantenimiento o temporada privada'
    ],
    modules: [
      { name: 'Matriz Atómica de Disponibilidad', desc: 'Semáforo visual de noches libres, ocupadas y en mantenimiento.' },
      { name: 'Calculador de Anticipo del 50%', desc: 'Cálculo de depósito de confirmación y saldo pendiente al llegar.' },
      { name: 'Check-In Digital sin Papel', desc: 'Recepción ágil con firma táctil desde el smartphone del huésped.' },
      { name: 'Bloqueador Táctico de Fechas', desc: 'Cierre de fechas para eventos privados o remodelaciones.' }
    ]
  },
  {
    id: 'sys-5',
    stationNumber: '03',
    type: 'system',
    name: 'Galaxia Caja & Arqueo Ciego',
    title: 'Caja por Turnos & Arqueo Ciego con Billetes',
    subtitle: 'SECTOR G-03 // FINANZAS & CONTROL FISCAL',
    tagline: 'Calculadora de denominaciones de billetes y arqueo ciego inmutable para erradicar descuadres de dinero.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#F59E0B',
    accentColor: '#FDE047',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    icon: DollarSign,
    category: 'FINANZAS & CAJA',
    ringRadius: 195,
    orbitSpeed: 0.005,
    orbitAngle: 1.3,
    galaxyType: 'Lenticular Ámbar',
    coreD0: 'Fugas de efectivo, desconfianza diaria al cuadrar turnos y manipulación de saldos por el personal de atención.',
    pipelineSteps: ['Apertura Base', 'Conteo Físico Billetes', 'Cálculo a Ciegas', 'Historial Inmutable'],
    keyCapabilities: [
      'Apertura de turno con base inicial de efectivo registrada',
      'Calculadora de billetes ($100k, $50k, $20k, $10k, $5k, $2k) para arqueo ciego',
      'El cajero cuenta el dinero físico sin ver el saldo del sistema para evitar manipulación',
      'Historial auditado de cierres de caja con reporte inmediato de faltantes o sobrantes'
    ],
    modules: [
      { name: 'Control de Turnos con Base Inicial', desc: 'Registro formal del dinero base entregado al iniciar el turno.' },
      { name: 'Calculadora de Conteo Físico', desc: 'Desglose exacto de fajos por denominación de billetes y monedas.' },
      { name: 'Arqueo Ciego Antimanipulación', desc: 'El operador no ve el saldo teórico hasta terminar el conteo.' },
      { name: 'Auditor Inmutable de Cierres', desc: 'Historial sellado con diferencias de caja y firma de responsabilidad.' }
    ]
  },
  {
    id: 'sys-4',
    stationNumber: '04',
    type: 'system',
    name: 'Galaxia Menús QR & KDS',
    title: 'Menús Táctiles QR, Comandas KDS & Autopedidos',
    subtitle: 'SECTOR G-04 // GASTRONOMÍA & MIXOLOGÍA',
    tagline: 'Cartas táctiles fluidas que elevan el ticket promedio y comanderos con semáforo de tiempos para cocina y barra.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#EF4444',
    accentColor: '#F87171',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    icon: Utensils,
    category: 'GASTRONOMÍA & BARES',
    ringRadius: 225,
    orbitSpeed: 0.0046,
    orbitAngle: 1.8,
    galaxyType: 'Anular Fuego',
    coreD0: 'Cartas en PDF ilegibles en celular y aplicaciones de delivery que le arrebatan el 20% de comisión por cada orden en mesa.',
    pipelineSteps: ['Comensal Escanea QR', 'Autopedido en Mesa', 'Pantalla Cocina KDS', 'Semáforo de Tiempo'],
    keyCapabilities: [
      'Catálogo compacto de alta densidad con barra de filtros CategoryFilter',
      'Comandero digital KDS para cocina y barra con alerta por demoras',
      'División de cuentas (split bill) por comensal o por producto consumido',
      'Autopedidos directos a WhatsApp de cocina con fotografía gastronómica HD'
    ],
    modules: [
      { name: 'Pantalla KDS de Cocina y Barra', desc: 'Semáforo de tiempos para órdenes en preparación, listas y despachadas.' },
      { name: 'Catálogo Gastronómico de Alta Densidad', desc: 'Tarjetas pulidas que muestran 8 a 12 platos a la vez sin fatiga.' },
      { name: 'Calculadora de División de Cuentas', desc: 'Divide pagos equitativamente o por ítem consumido entre amigos.' },
      { name: 'Autopedido Rápido a Cocina', desc: 'Envío de comandas instantáneas sin esperar a que el mesero regrese.' }
    ]
  },
  {
    id: 'sys-6',
    stationNumber: '05',
    type: 'system',
    name: 'Galaxia Control de Mermas',
    title: 'Gestor de Inventarios, Mermas & Stock Dual',
    subtitle: 'SECTOR G-05 // INVENTARIOS & MERMAS',
    tagline: 'Control volumétrico en mililitros para licores y stock unitario con alertas de reorden automático.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#DC2626',
    accentColor: '#FB7185',
    glowColor: 'rgba(220, 38, 38, 0.5)',
    icon: Package,
    category: 'INVENTARIOS & MERMAS',
    ringRadius: 250,
    orbitSpeed: 0.0042,
    orbitAngle: 2.3,
    galaxyType: 'Nebulosa Rubí',
    coreD0: 'Robos hormiga de botellas abiertas, tragos no cobrados y productos agotados en medio del turno.',
    pipelineSteps: ['Descorche Botella', 'Medición Mililitros', 'Libro de Mermas', 'Escandallo en Vivo'],
    keyCapabilities: [
      'Modo volumétrico: Rastreo de mililitros consumidos, botellas cerradas y shots',
      'Modo unitario: Stock por unidades con alerta de nivel crítico de inventario',
      'Registro tipificado de mermas y desperdicios (rotura, vencimiento, degustación)',
      'Cálculo de costo de insumos por plato o cóctel en tiempo real'
    ],
    modules: [
      { name: 'Rastreo Volumétrico en Mililitros', desc: 'Medición de tragos servidos vs botellas abiertas para cero fugas.' },
      { name: 'Monitor de Stock Unitario Crítico', desc: 'Alertas tempranas de reabastecimiento antes de que se agote un insumo.' },
      { name: 'Libro Tipificado de Mermas', desc: 'Registro justificado de pérdidas por rotura, descorche o caducidad.' },
      { name: 'Escandallo y Costeo en Vivo', desc: 'Margen de ganancia neto calculado por cada porción o cóctel servido.' }
    ]
  },
  {
    id: 'sys-9',
    stationNumber: '06',
    type: 'system',
    name: 'Galaxia Seguridad RBAC',
    title: 'Seguridad RBAC, Capado de Staff & Kill Switch',
    subtitle: 'SECTOR G-06 // CIBERSEGURIDAD DEFENSIVA',
    tagline: 'Perfiles con capado estricto para recepción y panel de control remoto de soberanía tecnológica.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#94A3B8',
    accentColor: '#E2E8F0',
    glowColor: 'rgba(148, 163, 184, 0.5)',
    icon: ShieldAlert,
    category: 'CIBERSEGURIDAD',
    ringRadius: 275,
    orbitSpeed: 0.0039,
    orbitAngle: 2.8,
    galaxyType: 'Búnker Platino',
    coreD0: 'Personal que accede a métricas financieras privadas o agencias que retienen el código como rehenes.',
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
    stationNumber: '07',
    type: 'system',
    name: 'Galaxia Telemetría & POS',
    title: 'Telemetría Financiera & Facturación Térmica POS',
    subtitle: 'SECTOR G-07 // MÉTRICAS & COMPROBANTES',
    tagline: 'Reportes reactivos de ingresos brutos, comisiones ahorradas e impresión térmica para impresoras POS.',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    color: '#10B981',
    accentColor: '#34D399',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    icon: Zap,
    category: 'MÉTRICAS & COMPROBANTES',
    ringRadius: 300,
    orbitSpeed: 0.0036,
    orbitAngle: 3.3,
    galaxyType: 'Púlsar Esmeralda',
    coreD0: 'Tomar decisiones comerciales a ciegas sin saber cuál es el plato o la cabaña más rentable.',
    pipelineSteps: ['Ventas en Vivo', 'Cálculo de Margen', 'Impresión POS 58/80', 'Comprobante QR'],
    keyCapabilities: [
      'Tarjetas de KPI en tiempo real: Ingresos brutos, ticket promedio y comisiones evitadas',
      'Gráficas de ocupación y volumen de ventas diarias y mensuales',
      'Hojas de estilo @media print calibradas para impresoras térmicas de 58mm y 80mm',
      'Generación de vouchers y recibos oficiales con código de verificación QR'
    ],
    modules: [
      { name: 'Tablero Táctico de Ingresos', desc: 'Visualización clara de ventas brutas, márgenes netos y comisiones evitadas.' },
      { name: 'Impresor Térmico POS 58/80mm', desc: 'Tickets y comandas formateados a la perfección para impresoras físicas.' },
      { name: 'Generador de Comprobantes Oficiales', desc: 'Recibos digitales en PDF con código QR de verificación instantánea.' },
      { name: 'Radar de Productos Más Rentables', desc: 'Descubre qué servicios generan mayor utilidad y cuáles tienen baja rotación.' }
    ]
  },
  {
    id: 'sys-1',
    stationNumber: '08',
    type: 'system',
    name: 'Galaxia Webs Scrollytelling',
    title: 'Portales Web de Alta Conversión & Scrollytelling (<0.8s)',
    subtitle: 'SECTOR G-08 // FRONTOFFICE SENSORIAL',
    tagline: 'Desarrollos nativos que cargan en menos de 0.8s y retienen el tráfico impaciente de Reels y Ads.',
    archetype: 'FRONTOFFICE SENSORIAL',
    color: '#06B6D4',
    accentColor: '#22D3EE',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    icon: Layers,
    category: 'FRONTOFFICE EDITORIAL',
    ringRadius: 325,
    orbitSpeed: 0.0033,
    orbitAngle: 3.8,
    galaxyType: 'Espiral Barrada Cyan',
    coreD0: 'El 75% de los visitantes abandona si una web tarda más de 2 segundos o luce como una plantilla genérica de WordPress.',
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
    id: 'sys-17',
    stationNumber: '09',
    type: 'system',
    name: 'Galaxia Fidelización WhatsApp',
    title: 'Sistemas de Fidelización, Membresías VIP & Billetera WhatsApp',
    subtitle: 'SECTOR G-09 // RETENCIÓN SOBERANA',
    tagline: 'Plataforma de puntos por consumo, membresías escalonadas y billetera digital en WhatsApp para triplicar la recompra sin regalar descuentos.',
    archetype: 'FRONTOFFICE SENSORIAL',
    color: '#14B8A6',
    accentColor: '#2DD4BF',
    glowColor: 'rgba(20, 184, 166, 0.5)',
    icon: Award,
    category: 'RETENCIÓN & RECURRENCIA',
    ringRadius: 350,
    orbitSpeed: 0.003,
    orbitAngle: 4.3,
    galaxyType: 'Elíptica Turquesa',
    coreD0: 'Negocios gastando miles de dólares en captar clientes nuevos que nunca vuelven, mientras regalan descuentos que destruyen el margen.',
    pipelineSteps: ['Registro en 1-Tap', 'Acumulación por Consumo', 'Billetera Digital VIP', 'Recompra Recurrente'],
    keyCapabilities: [
      'Acumulación algorítmica de puntos o saldo por cada consumo escaneando el QR de la mesa o folio',
      'Membresías escalonadas (Silver, Gold, Black) con beneficios exclusivos y cortesías de autor',
      'Billetera digital vinculada a WhatsApp sin necesidad de descargar apps pesadas',
      'Disparadores inteligentes de retención: aviso personalizado al cliente que lleva más de 30 días sin volver'
    ],
    modules: [
      { name: 'Billetera Digital en WhatsApp', desc: 'Consulta de saldo de puntos y recompensas en 1 clic sin fricción de contraseñas.' },
      { name: 'Matriz de Niveles VIP & Exclusividad', desc: 'Reglas de fidelización que incentivan subir el ticket promedio para desbloquear privilegios.' },
      { name: 'Radar de Reactivación de Inactivos', desc: 'Envíos automatizados cuando un cliente habitual deja de frecuentar el negocio.' },
      { name: 'Auditor Antifraude de Puntos', desc: 'Control estricto para evitar que personal de turno acredite puntos ficticios.' }
    ]
  },
  {
    id: 'sys-2',
    stationNumber: '10',
    type: 'system',
    name: 'Galaxia Triaje & Agendador 45s',
    title: 'Motor de Agendamiento Autónomo & Triaje Visual 45s',
    subtitle: 'SECTOR G-10 // FUNNELS DE CONVERSIÓN',
    tagline: 'Embudo de 45 segundos con odómetro de fricción que califica prospectos y reserva citas en tu propio calendario.',
    archetype: 'FRONTOFFICE SENSORIAL',
    color: '#0284C7',
    accentColor: '#38BDF8',
    glowColor: 'rgba(2, 132, 199, 0.5)',
    icon: Target,
    category: 'FUNNELS DE CONVERSIÓN',
    ringRadius: 375,
    orbitSpeed: 0.0028,
    orbitAngle: 4.8,
    galaxyType: 'Quásar Diamante',
    coreD0: 'Dueños de negocio perdiendo hasta 4 horas al día respondiendo a curiosos en WhatsApp y pagando suscripciones mensuales a Calendly.',
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
    id: 'sys-8',
    stationNumber: '11',
    type: 'system',
    name: 'Galaxia CMS en Caliente',
    title: 'CMS en Caliente, Tarifas Dinámicas & Tokens Cromáticos',
    subtitle: 'SECTOR G-11 // PERSONALIZACIÓN EN VIVO',
    tagline: 'Modifica titulares, WhatsApp oficial, precios por temporada y paleta cromática en segundos.',
    archetype: 'FRONTOFFICE SENSORIAL',
    color: '#8B5CF6',
    accentColor: '#A78BFA',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    icon: Sparkles,
    category: 'PERSONALIZACIÓN EN VIVO',
    ringRadius: 400,
    orbitSpeed: 0.0026,
    orbitAngle: 5.3,
    galaxyType: 'Prisma Arcoíris',
    coreD0: 'Depender de una agencia externa y pagar facturas adicionales para cambiar una foto o un precio.',
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
    id: 'sys-13',
    stationNumber: '12',
    type: 'system',
    name: 'Galaxia Flujos n8n',
    title: 'Workflows Autónomos & Agentes Webhook (n8n / Make / WhatsApp)',
    subtitle: 'SECTOR G-12 // ORQUESTACIÓN EN PILOTO AUTOMÁTICO',
    tagline: 'Conecta WhatsApp, pasarelas de pago (Wompi/Stripe), CRM y bases de datos para operar en piloto automático.',
    archetype: 'AUTOMATIZACIONES DE PRECISIÓN',
    color: '#F59E0B',
    accentColor: '#FBBF24',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    icon: Workflow,
    category: 'ORQUESTACIÓN DE NEGOCIO',
    ringRadius: 425,
    orbitSpeed: 0.0024,
    orbitAngle: 5.8,
    galaxyType: 'Circuitos Ámbar',
    coreD0: 'Enviar enlaces de pago a mano, copiar datos de clientes en tres programas distintos y olvidar hacer seguimiento a cotizaciones.',
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
    id: 'sys-11',
    stationNumber: '13',
    type: 'system',
    name: 'Galaxia OCR Facturas',
    title: 'Automatización OCR de Facturas & Conciliación con IA',
    subtitle: 'SECTOR G-13 // AUTOMATIZACIÓN ADMINISTRATIVA',
    tagline: 'Extracción algorítmica de ítems, impuestos (IVA/retenciones), NIT y totales desde fotos o PDFs sin digitación manual.',
    archetype: 'AUTOMATIZACIONES DE PRECISIÓN',
    color: '#D946EF',
    accentColor: '#E879F9',
    glowColor: 'rgba(217, 70, 239, 0.5)',
    icon: FileSpreadsheet,
    category: 'AUTOMATIZACIÓN ADMINISTRATIVA',
    ringRadius: 450,
    orbitSpeed: 0.0022,
    orbitAngle: 6.3,
    galaxyType: 'Datos Amatista',
    coreD0: 'Administradores y contadores pierden más de 15 horas a la semana digitando facturas físicas a mano, con altos errores de digitación.',
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
    id: 'sys-14',
    stationNumber: '14',
    type: 'system',
    name: 'Galaxia Lead Scoring IA',
    title: 'Sistema de Calificación & Lead Scoring IA (0-100)',
    subtitle: 'SECTOR G-14 // VENTAS & PROSPECCIÓN QUIRÚRGICA',
    tagline: 'Scoring algorítmico (0-100) en tiempo real con enriquecimiento de datos para hablar solo con decisores con presupuesto.',
    archetype: 'AGENTES DE TAREA ESPECÍFICA',
    color: '#EC4899',
    accentColor: '#F472B6',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    icon: Target,
    category: 'VENTAS & PROSPECCIÓN',
    ringRadius: 475,
    orbitSpeed: 0.002,
    orbitAngle: 6.8,
    galaxyType: 'Radar Escarlata',
    coreD0: 'Comerciales perdiendo horas en llamadas y chats con curiosos sin presupuesto o que no encajan en el perfil de cliente ideal.',
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
    stationNumber: '15',
    type: 'system',
    name: 'Galaxia Inbox Zero IA',
    title: 'Organización de Correos & Inbox Zero con IA',
    subtitle: 'SECTOR G-15 // PRODUCTIVIDAD EJECUTIVA',
    tagline: 'Triaje automático de bandejas de entrada, clasificación por urgencia y borradores de respuesta contextual listos en 1 clic.',
    archetype: 'AGENTES DE TAREA ESPECÍFICA',
    color: '#06B6D4',
    accentColor: '#67E8F9',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    icon: Inbox,
    category: 'PRODUCTIVIDAD EJECUTIVA',
    ringRadius: 500,
    orbitSpeed: 0.0018,
    orbitAngle: 7.3,
    galaxyType: 'Aurora Esmeralda',
    coreD0: 'Bandejas de entrada con más de 200 correos sin leer, facturas extraviadas y clientes VIP esperando respuesta por días.',
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
    stationNumber: '16',
    type: 'system',
    name: 'Galaxia Auditor 24/7',
    title: 'Agente Especializado Autónomo para Tareas Cotidianas (Auditor 24/7)',
    subtitle: 'SECTOR G-16 // OPERACIONES AUTÓNOMAS',
    tagline: 'Agentes multi-tarea 24/7 que auditan cumplimiento de equipo, recopilan métricas y ejecutan tareas repetitivas de oficina.',
    archetype: 'AGENTES DE TAREA ESPECÍFICA',
    color: '#2563EB',
    accentColor: '#3B82F6',
    glowColor: 'rgba(37, 99, 235, 0.5)',
    icon: Bot,
    category: 'OPERACIONES AUTÓNOMAS',
    ringRadius: 525,
    orbitSpeed: 0.0016,
    orbitAngle: 7.8,
    galaxyType: 'Centinela Cobalto',
    coreD0: 'El fundador o gerente consumido por micro-gestión diaria de tareas administrativas en lugar de enfocarse en crecer el negocio.',
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
    id: 'sys-12',
    stationNumber: '17',
    type: 'system',
    name: 'Galaxia Guiones Virales',
    title: 'Motor de Guiones para Redes Sociales & Calendario con IA',
    subtitle: 'SECTOR G-17 // MARKETING DE RETENCIÓN',
    tagline: 'Generador de hooks virales de alta retención, guiones segundo a segundo para Reels/TikToks y calendario editorial sincronizado.',
    archetype: 'AGENTES DE TAREA ESPECÍFICA',
    color: '#A855F7',
    accentColor: '#C084FC',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    icon: Video,
    category: 'MARKETING DE RETENCIÓN',
    ringRadius: 550,
    orbitSpeed: 0.0014,
    orbitAngle: 8.3,
    galaxyType: 'Cinemática Magenta',
    coreD0: 'Bloqueo creativo del dueño o del equipo, semanas sin publicar en Instagram y fuga constante de clientes ante competidores más activos.',
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
  }
];

export default function GalaxyTourSimulation({ 
  activeStationId, 
  onSelectStation 
}) {
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [viewAngle, setViewAngle] = useState(0); // Arrastre manual
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  // Encontrar la estación activa actual
  const currentIndex = useMemo(() => {
    const idx = GALAXY_STATIONS.findIndex(s => s.id === activeStationId);
    return idx >= 0 ? idx : 0;
  }, [activeStationId]);

  const currentStation = GALAXY_STATIONS[currentIndex] || GALAXY_STATIONS[0];
  const isCore = currentStation.type === 'core';

  // Tour Automático: Avanza a la siguiente galaxia cada 7.5 segundos si está activado
  useEffect(() => {
    if (!isPlayingTour) return;
    const timer = setInterval(() => {
      onSelectStation((prevId) => {
        const cIdx = GALAXY_STATIONS.findIndex(s => s.id === prevId);
        const nextIdx = (cIdx + 1) % GALAXY_STATIONS.length;
        soundFx.playOrbitWarp();
        return GALAXY_STATIONS[nextIdx].id;
      });
    }, 7500);
    return () => clearInterval(timer);
  }, [isPlayingTour, onSelectStation]);

  // Rotación suave del cosmos a 60 FPS
  useEffect(() => {
    const rotTimer = setInterval(() => {
      setOrbitRotation(prev => (prev + 0.15) % 360);
    }, 50);
    return () => clearInterval(rotTimer);
  }, []);

  // Navegación Manual del Tour
  const goToNextStation = () => {
    soundFx.playOrbitWarp();
    const nextIdx = (currentIndex + 1) % GALAXY_STATIONS.length;
    onSelectStation(GALAXY_STATIONS[nextIdx].id);
  };

  const goToPrevStation = () => {
    soundFx.playOrbitWarp();
    const prevIdx = (currentIndex - 1 + GALAXY_STATIONS.length) % GALAXY_STATIONS.length;
    onSelectStation(GALAXY_STATIONS[prevIdx].id);
  };

  // Arrastre manual para rotar el cosmos
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    setViewAngle(prev => prev + delta * 0.004);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#020307] shadow-2xl flex flex-col select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      
      {/* ============================================================== */}
      {/* 1. HUD SUPERIOR: CABECERA DEL TOUR & CONTROLES TELEMÉTRICOS     */}
      {/* ============================================================== */}
      <div className="relative z-20 px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Título de Misión & Telemetría */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
              TOUR CÓSMICO DYNAMIND // SIMULADOR DE GALAXIAS
            </span>
          </div>
          <p className="text-xs text-zinc-300 font-sans font-light">
            Cada galaxia representa un sistema real. Explora en órbita o déjate guiar por el tour.
          </p>
        </div>

        {/* Controles de Navegación del Tour (Next, Prev, Autoplay) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          
          {/* Botón Galaxia Anterior */}
          <button
            onClick={goToPrevStation}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            title="Galaxia anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Autoplay / Pausa */}
          <button
            onClick={() => {
              soundFx.playTap();
              setIsPlayingTour(!isPlayingTour);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              isPlayingTour 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white'
            }`}
          >
            {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlayingTour ? 'TOUR EN VUELO' : 'AUTO-TOUR'}</span>
          </button>

          {/* Botón Galaxia Siguiente */}
          <button
            onClick={goToNextStation}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            title="Siguiente galaxia"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Ir al Núcleo Central */}
          <button
            onClick={() => {
              soundFx.playPlanetSelect();
              onSelectStation('station-core');
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-500/30 text-amber-300 hover:brightness-125 text-xs font-mono font-bold transition-all flex items-center gap-1"
            title="Centrar en Dynamind Prime"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">NÚCLEO SOBERANO</span>
          </button>

        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. EL LIENZO CÓSMICO: SIMULACIÓN DEL UNIVERSO INTERACTIVO 3D   */}
      {/* ============================================================== */}
      <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#030611] via-[#020308] to-[#010204]">
        
        {/* Fondo con Nebulosas y Polvo Estelar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Vórtice Central Cuántico */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-cyan-500/10 blur-[100px] animate-pulse" />
          
          {/* Estrellas de Fondo */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Órbitas Concéntricas Elípticas Estilizadas */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[160, 240, 320, 400, 480].map((radius, rIdx) => (
            <div 
              key={rIdx}
              className="absolute rounded-full border border-white/[0.04]"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 1.05}px`,
                transform: 'rotateX(55deg)'
              }}
            />
          ))}
        </div>

        {/* ============================================================== */}
        {/* ESCENA PRINCIPAL EN PRIMER PLANO: LA GALAXIA SELECCIONADA      */}
        {/* ============================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center p-6 max-w-xl cursor-default"
          >
            {/* Vórtice / Espiral de la Galaxia Activa */}
            <div className="relative mb-6 flex items-center justify-center">
              
              {/* Resplandor Halo Exterior */}
              <div 
                className="absolute -inset-8 rounded-full blur-3xl opacity-70 animate-pulse"
                style={{ backgroundColor: currentStation.glowColor }}
              />

              {/* Brazos Espirales Dinámicos */}
              <div 
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full relative flex items-center justify-center p-2"
                style={{
                  background: isCore
                    ? 'radial-gradient(circle at 40% 40%, #FFFFFF 0%, #FDE047 25%, #F59E0B 60%, #78350F 100%)'
                    : `radial-gradient(circle at 35% 35%, #ffffff 0%, ${currentStation.color} 45%, #020308 95%)`,
                  boxShadow: `0 0 60px ${currentStation.glowColor}`
                }}
              >
                {/* Anillo de brazos galácticos girando a 60 FPS */}
                <div 
                  className="absolute inset-0 rounded-full border-2 border-dashed opacity-50 animate-[spin_18s_linear_infinite]"
                  style={{ borderColor: currentStation.accentColor }}
                />

                {/* Núcleo de la Galaxia */}
                <div className="relative z-10 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex flex-col items-center">
                  {React.createElement(currentStation.icon, {
                    className: "w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse"
                  })}
                </div>

                {/* Satélite / Luna de telemetría orbitando */}
                <div 
                  className="absolute w-full h-full rounded-full animate-[spin_8s_linear_infinite] pointer-events-none"
                >
                  <div 
                    className="w-3 h-3 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg"
                    style={{ backgroundColor: currentStation.accentColor, boxShadow: `0 0 10px ${currentStation.accentColor}` }}
                  />
                </div>
              </div>

            </div>

            {/* Badge de Estación / Sector */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider mb-2 border"
              style={{
                backgroundColor: `${currentStation.color}15`,
                borderColor: `${currentStation.color}40`,
                color: currentStation.color
              }}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>ESTACIÓN {currentStation.stationNumber} // {currentStation.galaxyType.toUpperCase()}</span>
            </div>

            {/* Título Monumental de la Galaxia / Sistema */}
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight">
              {currentStation.title}
            </h2>

            {/* Tagline / Resumen de Impacto */}
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-sans max-w-lg leading-relaxed font-light">
              {currentStation.tagline}
            </p>

            {/* Arquetipo & Categoría */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                {currentStation.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold" style={{ color: currentStation.color }}>
                {currentStation.archetype}
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* ============================================================== */}
        {/* MINI-RADAR ESTELAR TÁCTICO (STAR MAP HUD)                     */}
        {/* ============================================================== */}
        <div className="absolute bottom-4 left-4 z-20 hidden sm:flex flex-col items-start gap-1 p-2.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
          <div className="text-[9px] font-mono text-zinc-400 font-bold tracking-widest flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>RADAR ESTELAR ({currentIndex + 1}/18)</span>
          </div>
          
          {/* Cuadrante de Radar Circular */}
          <div className="relative w-28 h-28 rounded-full border border-cyan-500/20 bg-cyan-950/20 overflow-hidden flex items-center justify-center">
            {/* Retícula de Radar */}
            <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-75" />
            <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-50" />
            <div className="absolute w-full h-px bg-cyan-500/20" />
            <div className="absolute h-full w-px bg-cyan-500/20" />
            
            {/* Línea de Barrido Radar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent rounded-full animate-[spin_4s_linear_infinite]" />

            {/* Núcleo Central en el Radar */}
            <button
              onClick={() => {
                soundFx.playPlanetSelect();
                onSelectStation('station-core');
              }}
              className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] z-10"
              title="Núcleo Central"
            />

            {/* Puntos de las Galaxias en el Radar */}
            {GALAXY_STATIONS.filter(s => s.type === 'system').map((st, idx) => {
              const angle = (idx / 17) * (Math.PI * 2);
              const dist = 18 + (idx % 3) * 12;
              const x = Math.cos(angle) * dist;
              const y = Math.sin(angle) * dist;
              const isTargetActive = activeStationId === st.id;

              return (
                <button
                  key={st.id}
                  onClick={() => {
                    soundFx.playPlanetSelect();
                    onSelectStation(st.id);
                  }}
                  className={`absolute w-1.5 h-1.5 rounded-full transition-transform ${
                    isTargetActive 
                      ? 'scale-150 ring-2 ring-white animate-ping' 
                      : 'hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: st.color,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`
                  }}
                  title={st.name}
                />
              );
            })}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. BARRA DE PROGRESO CÓSMICA DEL TOUR (18 ESTACIONES TÁCTILES)  */}
      {/* ============================================================== */}
      <div className="px-4 py-3 bg-black/50 border-t border-white/10 backdrop-blur-xl flex items-center justify-between gap-2 overflow-x-auto scrollbar-none snap-x">
        {GALAXY_STATIONS.map((station, sIdx) => {
          const isCurrent = activeStationId === station.id;
          const StIcon = station.icon;

          return (
            <button
              key={station.id}
              onClick={() => {
                soundFx.playPlanetSelect();
                onSelectStation(station.id);
              }}
              className={`shrink-0 snap-start px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                isCurrent
                  ? 'bg-white/15 text-white font-bold shadow-lg'
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              style={{
                borderColor: isCurrent ? station.color : undefined
              }}
            >
              <div 
                className="w-2 h-2 rounded-full shrink-0"
                style={{ 
                  backgroundColor: station.color,
                  boxShadow: isCurrent ? `0 0 8px ${station.color}` : 'none'
                }}
              />
              <span className="truncate max-w-[120px]">{station.stationNumber}. {station.name}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
