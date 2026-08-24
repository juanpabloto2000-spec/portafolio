export const NICHE_CATEGORIES = [
  {
    id: "todos",
    label: "Todos los Nichos",
    description: "Sistemas digitales a medida orientados a conversión y fluidez operativa."
  },
  {
    id: "hostales",
    label: "Hostales & Hospedaje",
    description: "Motor de reserva directa con selección de habitaciones y validación de estancia."
  },
  {
    id: "dentales",
    label: "Clínicas Dentales",
    description: "Triaje visual interactivo, agendamiento por especialidad y confirmación automatizada."
  },
  {
    id: "esteticas",
    label: "Clínicas Estéticas",
    description: "Catálogo editorial de tratamientos, asesoría de servicios y anticipo de cita."
  },
  {
    id: "reposteria",
    label: "Repostería & Dulce",
    description: "Configurador visual de pastelería, selección de pisos/sabores y reserva de fechas."
  },
  {
    id: "variado",
    label: "Restaurantes & Variado",
    description: "Menú interactivo táctil, comanda digital y reserva de mesa con comprobante."
  }
];

export const PROJECTS_DATA = [
  {
    id: "nomad-haven-hostel",
    nicheId: "hostales",
    nicheLabel: "Hospedaje & Hostales",
    title: "Nomad Haven | Boutique Lodge",
    client: "Nomad Haven Group",
    concept: "Plataforma de reserva directa y experiencia del huésped sin comisiones de terceros.",
    challenge: "Altas comisiones en OTAs y pérdida de tiempo respondiendo disponibilidad manual por mensajería.",
    solution: "Motor de selección visual de suites y camas compartidas con cálculo en tiempo real y confirmación con depósito garantizado.",
    keySystem: "Motor de Reserva y Asignación de Cuartos con Validación de Depósito",
    gradient: "from-zinc-900 via-neutral-900 to-black",
    accentColor: "#E2E8F0",
    previewImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Selector interactivo de fecha y tipo de habitación con disponibilidad real",
      "Validación de pago de reserva mediante pasarela o subida de comprobante bancario",
      "Ficha de bienvenida con código de acceso y amenidades del lodge"
    ],
    demoType: "hostel"
  },
  {
    id: "lumina-dental-care",
    nicheId: "dentales",
    nicheLabel: "Clínicas Odontológicas",
    title: "Lúmina Odontología de Precisión",
    client: "Dr. Arismendi & Asociados",
    concept: "Experiencia digital de triaje y agendamiento clínico de alta especialidad.",
    challenge: "Pacientes que cancelaban a última hora o no sabían qué especialista requerían.",
    solution: "Cuestionario de diagnóstico visual guiado por síntomas y selector de horarios con bloqueo de agenda tras verificación.",
    keySystem: "Triaje Visual y Agendador de Citas con Recordatorio de Cita",
    gradient: "from-zinc-900 via-stone-900 to-black",
    accentColor: "#F1F5F9",
    previewImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Guía interactiva de motivos de consulta (estética, ortodoncia, urgencia, limpieza)",
      "Selección de doctor y horario libre sincronizado",
      "Confirmación y envío de recomendaciones previas a la consulta"
    ],
    demoType: "dental"
  },
  {
    id: "aethel-aesthetic-clinic",
    nicheId: "esteticas",
    nicheLabel: "Clínicas Estéticas",
    title: "Aethel Medicina Estética & Spa",
    client: "Aethel Clinic",
    concept: "Presentación editorial de tratamientos dermoestéticos con reserva de valoración privada.",
    challenge: "Falta de claridad en procedimientos que generaba dudas extensas y bajas tasas de cierre.",
    solution: "Catálogo interactivo con desglose de áreas de aplicación, tiempos de recuperación y agendamiento con abono de consulta.",
    keySystem: "Protocolo de Consulta Personalizada y Retención de Citas VIP",
    gradient: "from-zinc-900 via-neutral-900 to-black",
    accentColor: "#E2E8F0",
    previewImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512290900672-1f00b7b8480c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Visualizador de tratamientos faciales y corporales con especificaciones clínicas",
      "Simulador de cita de valoración con especialista asignado",
      "Sistema de depósito de reserva para eliminar citas no atendidas"
    ],
    demoType: "aesthetic"
  },
  {
    id: "maison-sucre-bakery",
    nicheId: "reposteria",
    nicheLabel: "Repostería & Pastelería",
    title: "Maison du Sucre Atelier",
    client: "Chef Pâtissier Laurent",
    concept: "Configurador visual para pedidos de pastelería de autor y eventos exclusivos.",
    challenge: "Cotizaciones complejas y errores en especificaciones de eventos por pedidos vía chat.",
    solution: "Constructor visual de pasteles (pisos, bizcochos, coberturas, porciones) con cálculo inmediato y bloqueo de calendario.",
    keySystem: "Configurador Interactivo de Tartas & Bloqueo de Fechas de Producción",
    gradient: "from-zinc-900 via-stone-900 to-black",
    accentColor: "#F8FAFC",
    previewImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Personalizador de tarta paso a paso (tamaño, sabor, relleno, estética y dedicatoria)",
      "Fechas de entrega disponibles con cupo limitado diario",
      "Generación de orden directa con validación de pago del 50% de anticipo"
    ],
    demoType: "bakery"
  },
  {
    id: "noir-gastronomy-bar",
    nicheId: "variado",
    nicheLabel: "Restaurantes & Bares",
    title: "Noir Bistró & Coctelería de Autor",
    client: "Noir Hospitality Group",
    concept: "Carta digital inmersiva y sistema de reserva de mesa con pre-comanda.",
    challenge: "Menús en PDF lentos y reservas de fines de semana con alta tasa de mesas vacías.",
    solution: "Menú interactivo de alta resolución categorizado con filtros de alérgenos y confirmación de mesa con validación de depósito.",
    keySystem: "Carta Digital Interactiva con Pre-Orden y Gestión de Reservas",
    gradient: "from-zinc-900 via-neutral-900 to-black",
    accentColor: "#FFFFFF",
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Navegación interactiva por secciones (Entradas, Principales, Mixología, Postres)",
      "Detalle fotográfico de cada preparación y maridaje sugerido",
      "Reserva de mesa con selección de zona (Salón principal, Terraza, Barra)"
    ],
    demoType: "restaurant"
  }
];

export const CORE_SYSTEMS = [
  {
    id: "system-booking",
    title: "Agendamiento y Reservas Autónomas",
    description: "Sustitución de cadenas de mensajes manuales por un flujo interactivo que sincroniza disponibilidad real y agenda en segundos.",
    impact: "Cero fricción para el cliente y disponibilidad 24/7 sin sobrecargar a tu equipo."
  },
  {
    id: "system-validation",
    title: "Validación de Anticipos y Depósitos",
    description: "Protección de turnos y mesas mediante pasarela o verificación de comprobante bancario antes de bloquear el horario.",
    impact: "Erradicación de ausencias imprevistas (no-shows) y garantía de ingresos por cupo."
  },
  {
    id: "system-interactive-menu",
    title: "Cartas Digitales y Menús de Alta Retención",
    description: "Experiencia táctil que estimula el apetito y facilita la decisión de compra mediante fotografía curada y navegación fluida.",
    impact: "Elevación del ticket promedio y agilización del tiempo de atención en sala o delivery."
  }
];
