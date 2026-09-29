import React, { useState } from 'react';
import FooterEditorial from '../components/layout/FooterEditorial';
import AmbientSpotlightGlow from '../components/ui/AmbientSpotlightGlow';
import RevealSection from '../components/motion/RevealSection';
import { ShieldCheck, FileText, Lock, Scale, AlertCircle, ArrowLeft, CheckCircle2, Mail, Phone, ExternalLink } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function PrivacyTermsPage() {
  const { isLight } = useThemeLanguage();
  const [activeTab, setActiveTab] = useState('privacidad'); // 'privacidad' | 'terminos' | 'cookies'

  return (
    <div className={`min-h-screen antialiased flex flex-col relative overflow-x-hidden selection:bg-white/20 transition-colors duration-500 ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-transparent text-platinum'
    }`}>
      <AmbientSpotlightGlow />

      <main className="flex-1 pt-28 sm:pt-32 pb-24 max-w-5xl mx-auto px-6 sm:px-12 w-full space-y-12 relative z-10">
        
        {/* Cabecera Editorial */}
        <div className="space-y-4">
          <a
            href="/#/"
            className={`inline-flex items-center gap-2 text-xs font-mono transition-colors group ${
              isLight ? 'text-slate-500 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Inicio</span>
          </a>

          <div className="flex items-center gap-3">
            <span className={`p-2 rounded-xl border flex items-center justify-center ${
              isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-white/[0.04] border-white/15 text-cyan-400'
            }`}>
              <Scale className="w-5 h-5" />
            </span>
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
              Marco Legal, Transparencia & Cumplimiento Normativo
            </div>
          </div>

          <h1 className={`font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase ${
            isLight ? 'text-slate-950' : 'text-white'
          }`}>
            Políticas de Privacidad & Términos
          </h1>

          <p className={`text-sm sm:text-base font-sans max-w-3xl leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-zinc-300'
          }`}>
            DYNAMIND STUDIOS S.A.S. opera bajo los estándares más rigurosos de protección de datos personales, soberanía tecnológica y seguridad de la información. Este documento garantiza la transparencia absoluta en el tratamiento de su información conforme a la legislación colombiana e internacional.
          </p>
        </div>

        {/* Selector de Pestañas Legales */}
        <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border backdrop-blur-xl ${
          isLight ? 'bg-slate-200/60 border-slate-300' : 'bg-white/[0.03] border-white/10'
        }`}>
          <button
            onClick={() => setActiveTab('privacidad')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'privacidad'
                ? (isLight ? 'bg-white text-slate-900 shadow-sm font-bold' : 'bg-white text-black font-bold shadow-monolith')
                : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1. Tratamiento de Datos (Habeas Data / GDPR)</span>
          </button>

          <button
            onClick={() => setActiveTab('terminos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'terminos'
                ? (isLight ? 'bg-white text-slate-900 shadow-sm font-bold' : 'bg-white text-black font-bold shadow-monolith')
                : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Términos y Condiciones</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'cookies'
                ? (isLight ? 'bg-white text-slate-900 shadow-sm font-bold' : 'bg-white text-black font-bold shadow-monolith')
                : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>3. Cookies & Telemetría</span>
          </button>
        </div>

        {/* Contenedor Principal de Texto Legal */}
        <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl leading-relaxed text-sm space-y-8 font-sans ${
          isLight ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' : 'bg-white/[0.025] border-white/15 text-zinc-300 backdrop-blur-2xl'
        }`}>

          {/* TAB 1: POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES */}
          {activeTab === 'privacidad' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/10 pb-6 space-y-2">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Marco Legal: Ley 1581 de 2012 · Decreto 1377 de 2013 (Colombia) · GDPR (UE 2016/679)
                </div>
                <h2 className={`font-display font-bold text-2xl uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Política de Privacidad y Tratamiento de Datos Personales
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Última actualización y certificación de seguridad: Septiembre de 2026.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  1. Identidad y Domicilio del Responsable del Tratamiento
                </h3>
                <p>
                  El responsable del tratamiento de los datos personales recolectados a través de este portal y sus canales digitales es <strong>DYNAMIND STUDIOS S.A.S.</strong>, sociedad de ingeniería de software e inteligencia artificial constituida en la República de Colombia, con domicilio principal en el departamento del Quindío (Eje Cafetero), representada legalmente por su Director General y Arquitecto Principal, <strong>Juan Pablo Toro</strong>.
                </p>
                <div className={`p-4 rounded-xl border font-mono text-xs space-y-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                }`}>
                  <div><strong>Razón Social:</strong> DYNAMIND STUDIOS S.A.S.</div>
                  <div><strong>Correo de Notificaciones Judiciales y Habeas Data:</strong> contacto@dynamindstudios.com</div>
                  <div><strong>Línea de Enlace Oficial:</strong> +57 312 295 2165 (wa.link/dynamind)</div>
                  <div><strong>Sede Operativa:</strong> Armenia, Quindío, Colombia (Atención global).</div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  2. Datos Recolectados y Naturaleza del Tratamiento
                </h3>
                <p>
                  Dynamind Studios recolecta exclusivamente la información estrictamente necesaria para evaluar la viabilidad técnica y operativa de soluciones de software para empresas. Esto incluye:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Datos de Contacto Comercial:</strong> Nombre completo, correo electrónico corporativo, número de teléfono móvil o WhatsApp.</li>
                  <li><strong>Información Corporativa:</strong> Nombre del establecimiento, sector o nicho comercial (gastronomía, hotelería, salud estética, servicios), volumen aproximado de operaciones y diagnóstico de cuellos de botella operativos (D0).</li>
                  <li><strong>Metadatos Técnicos y de Navegación:</strong> Dirección IP anonimizada, tipo de navegador, sistema operativo y registros de telemetría emitidos por el navegador con el único fin de prevenir ciberataques y garantizar la disponibilidad del servicio.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  3. Finalidades Específicas del Tratamiento
                </h3>
                <p>
                  Los datos personales suministrados voluntariamente por el usuario serán utilizados para los siguientes fines legítimos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className={`p-4 rounded-xl border space-y-1 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}>
                    <div className="font-bold text-xs font-mono text-cyan-400">FINALIDAD 01</div>
                    <div className="text-xs">Elaboración y entrega del reporte técnico del Diagnóstico de Cuellos de Botella (D0) y cálculo de ROI de software.</div>
                  </div>
                  <div className={`p-4 rounded-xl border space-y-1 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}>
                    <div className="font-bold text-xs font-mono text-emerald-400">FINALIDAD 02</div>
                    <div className="text-xs">Contacto personalizado vía WhatsApp o correo electrónico para agendar demostraciones privadas de sistemas soberanos.</div>
                  </div>
                  <div className={`p-4 rounded-xl border space-y-1 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}>
                    <div className="font-bold text-xs font-mono text-amber-400">FINALIDAD 03</div>
                    <div className="text-xs">Gestión precontractual y contractual, cotización de arquitectura a medida y emisión de facturación legal.</div>
                  </div>
                  <div className={`p-4 rounded-xl border space-y-1 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}>
                    <div className="font-bold text-xs font-mono text-purple-400">FINALIDAD 04</div>
                    <div className="text-xs">Blindaje defensivo contra ataques de denegación de servicio (DDoS), inyección de bots y scraping no autorizado.</div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  4. Declaración Solemne de No Comercialización ni Cesión a Terceros
                </h3>
                <p>
                  <strong>DYNAMIND STUDIOS S.A.S. NO VENDE, NO ARRIENDA, NO INTERCAMBIA NI MONETIZA BASES DE DATOS</strong> de sus usuarios ni clientes. Su información nunca será transferida a agregadores publicitarios, intermediarios de spam ni corredores de datos. La información solo podrá ser revelada ante autoridades judiciales competentes en cumplimiento estricto de una orden legal vinculante.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  5. Derechos del Titular de la Información (Derechos ARCO)
                </h3>
                <p>
                  De conformidad con el artículo 8 de la Ley 1581 de 2012 y el GDPR, usted cuenta con los siguientes derechos inalienables:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a Dynamind Studios.</li>
                  <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento.</li>
                  <li><strong>Ser informado</strong> previa solicitud respecto del uso que se le ha dado a sus datos.</li>
                  <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) de Colombia o la autoridad de protección de datos de su jurisdicción.</li>
                  <li><strong>Revocar la autorización y/o solicitar la supresión</strong> de sus datos cuando considere que no se han respetado los principios legales aplicables.</li>
                </ul>
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                }`}>
                  <div className="font-bold text-cyan-400 font-mono">PROCEDIMIENTO PARA EJERCER SUS DERECHOS:</div>
                  <p>
                    Para ejercer sus derechos de consulta o reclamo, remita una comunicación formal al correo <strong>contacto@dynamindstudios.com</strong> con el asunto <em>"SOLICITUD HABEAS DATA - [Su Nombre]"</em>, especificando su pretensión y un número de contacto. Su solicitud será tramitada y resuelta en un plazo máximo de diez (10) días hábiles.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  6. Medidas de Seguridad de la Información
                </h3>
                <p>
                  Implementamos controles técnicos y organizacionales de vanguardia: cifrado TLS 1.3 en todas las comunicaciones, encabezados de seguridad HTTP (HSTS, CSP, X-Frame-Options), arquitectura desacoplada en Cloudflare Workers, y políticas estrictas de control de acceso basadas en roles (RBAC) con almacenamiento seguro en Supabase.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: TÉRMINOS Y CONDICIONES DE SERVICIO */}
          {activeTab === 'terminos' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/10 pb-6 space-y-2">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Acuerdo de Uso de Plataforma & Prestación de Servicios de Ingeniería
                </div>
                <h2 className={`font-display font-bold text-2xl uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Términos y Condiciones Generales de Servicio
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Documento vinculante para visitantes, usuarios y contratantes de Dynamind Studios.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  1. Aceptación de los Términos
                </h3>
                <p>
                  Al navegar por este sitio web, utilizar el simulador de ROI, responder al embudo de diagnóstico o comunicarse a través de los canales de Dynamind Studios, usted declara haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones. Si no está de acuerdo, le solicitamos abstenerse de utilizar el servicio.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  2. Naturaleza de los Servicios: El "Pacto de Beneficio Mutuo"
                </h3>
                <p>
                  Dynamind Studios no es una agencia de publicidad ni comercializadora de plantillas prefabricadas. Somos una consultoría boutique de ingeniería de software e inteligencia artificial. Nuestra filosofía radica en la entrega de <strong>Sistemas Soberanos</strong>: plataformas operativas (Core PMS, KDS, calendarios atómicos, arqueo ciego y agentes de IA) donde el cliente final mantiene el control total de sus datos, precios y credenciales, erradicando cobros de cautiverio mensuales por ediciones básicas.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  3. Alcance del Diagnóstico Operativo y Simulador de ROI
                </h3>
                <p>
                  Las calculadoras interactivas, puntajes de cuello de botella y estimaciones de retorno de inversión desplegadas en esta web tienen fines informativos y de proyección analítica con base en promedios del mercado. La contratación formal de cualquier desarrollo o integración de agentes de IA se formaliza mediante una propuesta técnica y contrato de servicios específicos suscrito entre las partes.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  4. Propiedad Intelectual y Derechos Reservados
                </h3>
                <p>
                  Todos los diseños, marcas, logotipos, código fuente maestro, micro-interacciones, animaciones cinemáticas y metodologías de ingeniería expuestos en este portal son propiedad intelectual exclusiva de <strong>DYNAMIND STUDIOS S.A.S.</strong> y Juan Pablo Toro, amparados por las leyes de propiedad intelectual de Colombia (Ley 23 de 1982) y convenios internacionales.
                </p>
                <p className="text-xs text-zinc-400">
                  Queda prohibida la reproducción, duplicación, ingeniería inversa o clonación de los componentes de software de esta plataforma sin la debida autorización expresa y por escrito.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  5. Exención y Límite de Responsabilidad
                </h3>
                <p>
                  Dynamind Studios diseña sistemas de alta disponibilidad y tolerancia a fallos. Sin embargo, no asume responsabilidad civil por:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Interrupciones masivas, suspensiones o cambios de políticas en infraestructuras de terceros indispensables para la operación (incluyendo, de forma no taxativa: WhatsApp Business / Meta Platforms, Cloudflare, Supabase, OpenAI o proveedores de conectividad de telecomunicaciones).</li>
                  <li>Uso indebido de contraseñas o pérdida de credenciales por parte del personal o colaboradores del cliente.</li>
                  <li>Fuerza mayor, caso fortuito o eventos cibernéticos imprevisibles más allá del estándar razonable de seguridad de la industria.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  6. Ley Aplicable y Jurisdicción
                </h3>
                <p>
                  Los presentes términos se rigen e interpretan conforme a las leyes de la República de Colombia. Cualquier diferendo o controversia que surja entre las partes se procurará resolver de manera directa y amistosa. De subsistir el desacuerdo, las partes se someten a la jurisdicción ordinaria de los jueces de la República de Colombia, con sede en la ciudad de Armenia, Quindío.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: POLÍTICA DE COOKIES & TELEMETRÍA */}
          {activeTab === 'cookies' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/10 pb-6 space-y-2">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Transparencia Digital & Gestión de Almacenamiento Local
                </div>
                <h2 className={`font-display font-bold text-2xl uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Política de Cookies y Almacenamiento Local
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Compromiso de privacidad: Cero rastreo intrusivo de terceros.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  1. ¿Qué son y qué utilizamos en Dynamind Studios?
                </h3>
                <p>
                  A diferencia de sitios tradicionales que saturan su navegador con rastreadores publicitarios y cookies invasivas de terceros, Dynamind Studios adopta un enfoque de **Privacidad por Diseño (Privacy by Design)**:
                </p>
                <div className="space-y-3 pt-2">
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Almacenamiento Local Técnico (localStorage & sessionStorage)</span>
                    </div>
                    <p className="text-xs">
                      Utilizamos almacenamiento del navegador exclusivamente para recordar su preferencia de tema visual (modo oscuro/claro), preferencia de idioma (ES/EN) y el estado temporal de su sesión segura si es administrador del búnker táctico.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Telemetría de Rendimiento en el Edge</span>
                    </div>
                    <p className="text-xs">
                      Cloudflare gestiona cabeceras técnicas para optimizar la velocidad de carga de fuentes y activos estáticos, y mitigar ataques cibernéticos distribuidos (DDoS).
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  2. Ausencia de Cookies de Rastreo Publicitario de Terceros
                </h3>
                <p>
                  Este sitio <strong>NO contiene píxeles espía de Facebook/Meta, ni scripts de remarketing agresivo, ni rastreadores cross-site</strong> que vendan su historial de navegación a redes publicitarias.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`font-display font-bold text-base uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  3. Cómo Administrar o Desactivar Cookies
                </h3>
                <p>
                  Usted puede configurar su navegador en cualquier momento para bloquear o eliminar el almacenamiento local o las cookies:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
                  <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio.</li>
                  <li><strong>Apple Safari:</strong> Preferencias → Privacidad → Administrar datos de sitios web.</li>
                </ul>
              </section>
            </div>
          )}

          {/* Cuadro de Contacto y Asistencia Legal */}
          <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs ${
            isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-white/[0.04] border-white/10 text-zinc-300'
          }`}>
            <div className="space-y-1">
              <div className="font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Canal Directo de Asesoría Legal & Habeas Data</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                contacto@dynamindstudios.com · WhatsApp Corporativo: +57 312 295 2165
              </p>
            </div>
            <a
              href="https://wa.me/573122952165?text=Hola%20Dynamind%20Studios%2C%20tengo%20una%20consulta%20sobre%20las%20pol%C3%ADticas%20y%20tratamiento%20de%20datos"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

        </div>

      </main>

      <FooterEditorial />
    </div>
  );
}
