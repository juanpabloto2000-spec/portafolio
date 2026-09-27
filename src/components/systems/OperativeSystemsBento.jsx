import React from 'react';
import { Layers, Calendar, Database, Utensils, FileSpreadsheet, Video, ArrowUpRight, ArrowRight } from 'lucide-react';
import Tilt3DCard from '../ui/Tilt3DCard';
import RevealSection from '../motion/RevealSection';

export default function OperativeSystemsBento() {
  const systems = [
    {
      id: 'sistema-1',
      title: 'Portales de Alta Conversión & Experiencia Editorial',
      category: 'Arquitectura Web & Retención',
      icon: Layers,
      description: 'Plataformas diseñadas con macro-whitespace, tipografías de alto contraste y código nativo que carga en menos de 1 segundo.',
      features: [
        'Renderizado a 60 FPS sin plantillas infladas',
        'Scrollytelling cinematográfico de alta retención',
        'Optimizado para tráfico móvil de Reels y Ads',
        'Despliegue global en CDN de ultra-baja latencia'
      ],
      investment: '$450 – $1,200 USD',
      target: 'Empresas consolidadas y marcas que necesitan justificar tarifas de alta gama.'
    },
    {
      id: 'sistema-2',
      title: 'Motor de Agendamiento Autónomo & Triaje Visual',
      category: 'Funnels & Calificación',
      icon: Calendar,
      description: 'Embudo de 45 segundos con odómetro de fricción que filtra a curiosos y reserva citas en tu propio calendario.',
      features: [
        'Cero dependencia ni costos mensuales de Calendly',
        'Triaje interactivo guiado por cuello de botella',
        'Confirmación directa a WhatsApp y Google Meet',
        'Clasificación automática: Potencial 💎 vs Curioso 👀'
      ],
      investment: '$280 – $500 USD',
      target: 'Mentores, especialistas, clínicas y coaches con WhatsApp saturado.'
    },
    {
      id: 'sistema-3',
      title: 'Core Operativo Central (DSB / PMS / KDS Aislado)',
      category: 'Control & Gestión Privada',
      icon: Database,
      description: 'Centro de control administrativo oculto en /#/dsb para gobernar las operaciones diarias de tu negocio.',
      features: [
        'Caja en vivo con turnos y arqueo ciego inmutable',
        'Calendario atómico de disponibilidad y folios',
        'Personalizador de tarifas y CMS en tiempo real',
        'Vouchers e informes financieros imprimibles'
      ],
      investment: '$500 – $1,500 USD',
      target: 'Hospedajes, glampings, clínicas y empresas con caja diaria.'
    },
    {
      id: 'sistema-4',
      title: 'Menús Táctiles & Autopedidos de Alta Retención',
      category: 'Gastronomía & Mixología',
      icon: Utensils,
      description: 'Cartas digitales fluidas de alta retención que aumentan el ticket promedio y aceleran el despacho de pedidos.',
      features: [
        'Filtros segmentados y carrusel multitoma HD',
        'Comanda digital directa a cocina o WhatsApp',
        'Eliminación de comisiones abusivas de intermediarios',
        'Modo noche y alta velocidad en ambientes ruidosos'
      ],
      investment: '$350 – $800 USD',
      target: 'Gastrobares, restaurantes y discotecas con alto flujo de mesa.'
    },
    {
      id: 'sistema-5',
      title: 'Automatización OCR de Facturas & Conciliación Contable con IA',
      category: 'Automatización Administrativa & OCR',
      icon: FileSpreadsheet,
      description: 'Extracción instantánea de ítems, impuestos, NIT y valores desde fotos de tickets o facturas en PDF sin digitación manual.',
      features: [
        'Visión artificial para tickets y facturas arrugadas',
        'Detección automática de IVA, retenciones y totales',
        'Conciliación con extractos bancarios en minutos',
        'Exportación estructurada en 1 clic a Excel o software contable'
      ],
      investment: '$300 – $650 USD',
      target: 'Restaurantes, hoteles, clínicas y empresas con más de 20 compras semanales.'
    },
    {
      id: 'sistema-6',
      title: 'Creación de Guiones para Redes & Calendario con IA',
      category: 'Automatización de Contenido & Retención',
      icon: Video,
      description: 'Generador de hooks virales, guiones estructurados segundo a segundo para Reels/TikToks y calendario editorial sincronizado.',
      features: [
        'Estructura probada segundo a segundo (0-3s gancho, retención, CTA)',
        'Afinado al tono de voz exclusivo de tu marca',
        'Pilares de contenido: Autoridad, Casos Reales y Venta',
        'Sincronización automática con Google Calendar y Notion'
      ],
      investment: '$250 – $550 USD',
      target: 'Marcas personales, fundadores, clínicas estéticas y restaurantes.'
    }
  ];

  return (
    <section id="sistemas" className="py-24 sm:py-32 border-b border-white/10 bg-volumetric relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Cabecera Limpia (Solo Título y Subtítulo) */}
        <RevealSection direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-normal">
              Sistemas Operativos & Automatizaciones con IA
            </h2>
            <p className="text-sm font-sans text-zinc-300 max-w-xl leading-relaxed">
              Desde portales web nativos de ultra-alta conversión y Core PMS hasta motores de inteligencia artificial para lectura de facturas y creación de guiones para redes.
            </p>
          </div>

          <a
            href="/#/sistemas"
            className="text-xs font-mono text-white underline underline-offset-4 hover:text-platinum flex items-center gap-1.5"
          >
            <span>Ver Especificaciones Técnicas y Calculadora de ROI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </RevealSection>

        {/* Bento Grid con Tarjetas rounded-2xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((sys, idx) => {
            const IconComponent = sys.icon;
            return (
              <RevealSection key={sys.id} direction="up" delay={idx * 0.1}>
                <Tilt3DCard
                  className="p-8 sm:p-10 border border-white/10 bg-white/[0.025] rounded-2xl glow-card space-y-8 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-6">
                    
                    {/* Fila Superior */}
                    <div className="flex items-center gap-2.5 text-zinc-400 font-mono text-xs uppercase border-b border-white/10 pb-4">
                      <IconComponent className="w-4 h-4 text-white" />
                      <span>{sys.category}</span>
                    </div>

                    {/* Título & Descripción */}
                    <div className="space-y-3">
                      <h3 className="font-display font-bold text-2xl text-white group-hover:text-platinum transition-colors">
                        {sys.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                        {sys.description}
                      </p>
                    </div>

                    {/* Lista de Capacidades */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase mb-2">
                        Capacidades Clave:
                      </div>
                      {sys.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                          <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0 rounded-full" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Ideal Para */}
                    <div className="pt-2 text-[11px] font-mono text-zinc-400 leading-relaxed">
                      <span className="text-white font-semibold">Diseñado para:</span> {sys.target}
                    </div>

                  </div>

                  {/* Pie de Tarjeta */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Inversión Estimada:</div>
                      <div className="text-sm font-mono font-bold text-white tracking-tight">{sys.investment}</div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href="/#/sistemas"
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/15 font-mono text-xs uppercase transition-all text-center"
                      >
                        Especificaciones
                      </a>

                      <a
                        href="/#/diagnostico"
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase hover:bg-platinum transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Diagnosticar</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </Tilt3DCard>
              </RevealSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
