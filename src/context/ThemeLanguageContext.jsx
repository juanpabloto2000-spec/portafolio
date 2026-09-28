import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeLanguageContext = createContext();

export const TRANSLATIONS = {
  es: {
    nav: {
      inicio: 'Inicio',
      obras: 'Obras',
      sistemas: 'Sistemas',
      vision: 'Visión',
      diagnostico: 'Diagnóstico',
      configuracion: 'Apariencia & Idioma'
    },
    appearance: {
      title: 'Configuraciones de Página',
      borders: 'Morfología de Bordes',
      languages: 'Idioma del Portal',
      sharp: 'Con Bordes Rectos (90°)',
      sharpDesc: 'Estilo ortogonal, técnico y monolítico sin curvas.',
      medium: 'Equilibrado / Medio',
      mediumDesc: 'Curvatura armónica estándar con esquinas refinadas.',
      rounded: 'Completamente Redondeado',
      roundedDesc: 'Estilo orgánico y suave con contornos fluidos.',
      close: 'Aplicar y Cerrar'
    },
    hero: {
      headline: 'En Dynamind no diseñamos sitios estéticos, muertos y sin función.',
      subtitle: 'Construimos herramientas de software vivas con dashboards operativos aislados (Core PMS), código nativo a 60 FPS, agendadores atómicos y pasarelas directas que liberan al dueño de negocio y al mentor de cientos de horas de fricción manual.',
      ctaDiagnostico: 'Diagnosticar Mi Proyecto (45s)',
      ctaFilosofia: 'Por Qué No Webs Tradicionales',
      scrollPrompt: 'Desliza para explorar'
    },
    whyNotTraditional: {
      manifestoTag: 'Manifiesto de Ingeniería Soberana // Protocolo 2026',
      title: 'Por Qué No Construimos Páginas Web Tradicionales',
      desc: 'Las agencias comunes te venden plantillas infladas de WordPress, dependen de plugins vulnerables y te entregan un folleto muerto que nadie visita. En Dynamind Studios construimos activos de software vivos que atacan directamente los cuellos de botella de tu negocio.',
      reactorTitle: 'Soberanía Tecnológica',
      reactorSubtitle: 'Cero Dependencias · Cero Plugins Frágiles · 60 FPS',
      col1Tag: 'El Modelo Tradicional Obsoleto',
      col1Title: 'La Tumba Digital de WordPress / Wix',
      col1Desc: 'Páginas lentas que tardan más de 4 segundos en cargar, construidas sobre temas genéricos parchados con decenas de plugins que caducan, se rompen y son hackeados periódicamente.',
      col1Item1Title: 'Dependencia de intermediarios:',
      col1Item1Text: 'Comisiones del 18% al 28% a plataformas que no te pertenecen.',
      col1Item2Title: 'Fuga constante de clientes:',
      col1Item2Text: 'Formularios estáticos que caen en spam o colapsan tu WhatsApp manual.',
      col1Item3Title: 'Cero herramientas de control:',
      col1Item3Text: 'Sin caja por turnos, sin arqueo ciego, sin comandas ni folios.',
      col1Result: 'Resultado: Un gasto publicitario estéril que no aporta soluciones operativas reales.',
      col2Tag: 'Ingeniería de Otra Galaxia',
      col2Title: 'Sistemas Soberanos Vivos a 60 FPS',
      col2Desc: 'Infraestructura reactiva de micro-latencia construida en React nativo y Tailwind puro. Carga instantánea en menos de 0.8 segundos con micro-físicas cinemáticas y búnker operativo privado.',
      col2Item1Title: 'AEO (Answer Engine Optimization):',
      col2Item1Text: 'Grafos semánticos JSON-LD citados por ChatGPT, Perplexity y Gemini.',
      col2Item2Title: 'Búnker Operativo DSB:',
      col2Item2Text: 'Caja por turnos, arqueo ciego inmutable, calendario propio y folios de clientes.',
      col2Item3Title: 'Tríada de Garantías Soberanas:',
      col2Item3Text: 'Capacitación 1 a 1 de todo tu equipo + 1 mes de soporte + 6 meses de garantía.',
      col2Footer: 'Soberanía total sin rentas a terceros',
      col2Btn: 'Conocer los 17 Sistemas'
    },
    scrolly: {
      p1Title: 'Ingeniería Más Allá de lo Terrenal',
      p1Desc: 'Erradicamos plantillas muertas, plugins vulnerables y webs decorativas. Construimos ecosistemas digitales vivos gobernados por software de alto rendimiento.',
      p2Title: 'Control Operativo en Tiempo Real',
      p2Desc: 'Dashboards de administración aislados (/#/dsb), agendamiento atómico, arqueo ciego y pasarelas directas. Cero fricción manual, 100% soberanía sobre tu facturación.',
      p3Title: 'Resolución Autónoma en Milisegundos',
      p3Desc: 'Entras al hiperespacio del rendimiento. Tus cuellos de botella se evaporan a 60 FPS con tiempos de carga bajo 0.8s y retención semántica AEO para motores de IA.',
      p4Title: 'Escalabilidad Infinita Sin Dependencias',
      p4Desc: 'Infraestructura blindada con ciberseguridad defensiva, 1 mes de soporte proactivo y 6 meses de garantía incondicional de funcionamiento perfecto.',
      p4Cta: 'Diagnosticar Mi Proyecto (45s)'
    },
    standards: {
      tag: 'Protocolo de Ingeniería Soberana // 2026',
      title: 'Estándares de Ingeniería & Tríada de Garantías',
      desc: 'Nuestros desarrollos no se limitan a la interfaz visual: están gobernados por cuatro pilares innegociables de ingeniería diseñados para blindar la operación, captar clientes por IA y garantizar estabilidad perpetua.',
      hudVisibility: 'ARQUITECTURA DE VISIBILIDAD // AEO COGNITIVO',
      hudTelemetry: 'AI ENGINE READY // JSON-LD SCHEMA',
      aeoEvolution: 'Evolución Algorítmica Obligatoria',
      aeoTitle: 'AEO (Answer Engine Optimization) en vez del SEO Tradicional',
      aeoDesc1: 'El SEO de palabras clave de hace 15 años está muerto. Hoy tus clientes más rentables no navegan 10 páginas de Google: le preguntan directamente a ChatGPT Search, Perplexity AI, Claude y Google Gemini.',
      aeoDesc2: 'Nuestras plataformas cuentan con grafos de conocimiento semánticos JSON-LD profundos. Cuando un usuario consulta en IA por el mejor hospedaje, clínica o restaurante de tu zona, los modelos citan y recomiendan tu negocio como la opción fidedigna #1 con enlaces directos.',
      seoOldTitle: '❌ SEO TRADICIONAL (OBSOLETO)',
      aeoNewTitle: '💎 AEO DYNAMIND (2026)',
      hudCyber: 'CIBERSEGURIDAD DEFENSIVA',
      hudCyberTelemetry: 'RLS + TLS 1.3 ACTIVE',
      cyberTitle: 'Privacidad de Grado Bancario & Blindaje Defensivo',
      cyberDesc: 'Las agencias tradicionales usan bases de datos compartidas donde cualquier hacker puede extraer teléfonos de clientes. En Dynamind aplicamos Row Level Security (RLS) y validación de esquemas Zod con cifrado constante.',
      hudGuarantees: 'TRÍADA DE GARANTÍAS DE HONOR',
      hudGuaranteesTelemetry: 'ACUERDO CONTRACTUAL // SLA 99.9%',
      guaranteesTitle: 'Acompañamiento & Garantía Incondicional',
      guaranteesDesc: 'No entregamos un código y desaparecemos: nos comprometemos contractualmente con tu éxito operativo mediante 1 mes de soporte proactivo y 6 meses de garantía incondicional.'
    },
    calculator: {
      title: 'Calculadora de Horas & Dinero Recuperado',
      desc: 'Mueve los controles con los números aproximados de tu operación y descubre cuánto tiempo y dinero estás perdiendo por no contar con un sistema automatizado.',
      activityLabel: 'Selecciona tu tipo de actividad:',
      gastro: 'Gastronomía / Bar',
      hospedaje: 'Glamping / Hotel',
      clinica: 'Clínica / Spa',
      personal: 'Marca de Autor',
      hoursLabel: 'Horas al día invertidas en gestión y mensajes:',
      messagesLabel: 'Mensajes o solicitudes recibidas por día:',
      ticketLabel: 'Ticket promedio por venta o servicio:',
      resultTitle: 'Tu Retorno Mensual Estimado',
      recoveredTimeTitle: 'Tiempo de Vida Recuperado',
      hoursPerMonth: 'horas / mes',
      recoveredTimeDesc: 'Equivalente a jornadas laborales completas que ya no pasas pegado al celular atendiendo chats repetitivos.',
      financialImpactTitle: 'Impacto Financiero Retenido',
      financialImpactDesc: 'Suma de ventas rescatadas que se perdían por demora + comisiones no pagadas a agregadores.',
      cta: 'Automatizar Mi Negocio Ahora'
    },
    conversionBanner: {
      title: '¿Listo para erradicar el cuello de botella de tu negocio?',
      desc: 'Evalúa tu fricción operativa, califica tu proyecto y agenda directamente una sesión estratégica de arquitectura con Juan Pablo.',
      cta: 'Iniciar Diagnóstico (45s)'
    },
    footer: {
      brandDesc: 'Estudio de ingeniería de software, arquitectura web reactiva a 60 FPS y desarrollo de sistemas de conversión con dashboards operativos aislados (Core PMS).',
      navTitle: 'Navegación',
      engTitle: 'Ingeniería',
      legalTitle: 'Garantías & Legal',
      g1: 'Garantía de 6 meses',
      g2: '1 mes soporte proactivo',
      g3: 'Soberanía de datos 100%',
      rights: 'Todos los derechos reservados. Desarrollado con precisión artesanal por Dynamind Studios.'
    }
  },

  en: {
    nav: {
      inicio: 'Home',
      obras: 'Works',
      sistemas: 'Systems',
      vision: 'Vision',
      diagnostico: 'Diagnostic',
      configuracion: 'Appearance & Language'
    },
    appearance: {
      title: 'Page Settings',
      borders: 'Border Morphology',
      languages: 'Portal Language',
      sharp: 'Sharp Orthogonal (90°)',
      sharpDesc: 'Technical, monolithic style with crisp 90-degree edges.',
      medium: 'Balanced / Medium',
      mediumDesc: 'Standard harmonious curvature with refined corners.',
      rounded: 'Fully Rounded',
      roundedDesc: 'Organic, soft curves with fluid contours.',
      close: 'Apply & Close'
    },
    hero: {
      headline: 'At Dynamind we do not design aesthetic, dead and functionless websites.',
      subtitle: 'We build living software tools with isolated operational dashboards (Core PMS), native 60 FPS code, atomic schedulers, and direct checkout gateways that liberate the business owner from hundreds of hours of manual friction.',
      ctaDiagnostico: 'Start Diagnostic (45s)',
      ctaFilosofia: 'Why Not Traditional Websites',
      scrollPrompt: 'Scroll to explore'
    },
    whyNotTraditional: {
      manifestoTag: 'Sovereign Engineering Manifesto // 2026 Protocol',
      title: 'Why We Do Not Build Traditional Websites',
      desc: 'Ordinary agencies sell you bloated WordPress templates, rely on fragile plugins, and deliver a dead brochure that nobody visits. At Dynamind Studios, we build living software assets that directly eradicate your operational bottlenecks.',
      reactorTitle: 'Technological Sovereignty',
      reactorSubtitle: 'Zero Dependencies · Zero Fragile Plugins · 60 FPS',
      col1Tag: 'The Obsolete Traditional Model',
      col1Title: 'The Digital Graveyard of WordPress / Wix',
      col1Desc: 'Sluggish sites taking over 4 seconds to load, built on generic patched themes with dozens of plugins that expire, break, and get hacked periodically.',
      col1Item1Title: 'Intermediary dependency:',
      col1Item1Text: '18% to 28% commission fees paid to platforms you do not own.',
      col1Item2Title: 'Constant client leakage:',
      col1Item2Text: 'Static contact forms that land in spam or collapse your manual WhatsApp inbox.',
      col1Item3Title: 'Zero operational control:',
      col1Item3Text: 'No shift cash register, no blind audits, no order tickets or client folios.',
      col1Result: 'Result: Sterile ad spend that provides zero real operational solutions.',
      col2Tag: 'Next-Galaxy Engineering',
      col2Title: 'Living Sovereign Systems at 60 FPS',
      col2Desc: 'Micro-latency reactive infrastructure crafted in native React and pure Tailwind. Instant load in under 0.8 seconds with cinematic physics and private operational búnker.',
      col2Item1Title: 'AEO (Answer Engine Optimization):',
      col2Item1Text: 'Deep semantic JSON-LD knowledge graphs cited by ChatGPT, Perplexity, and Gemini.',
      col2Item2Title: 'Operational DSB Búnker:',
      col2Item2Text: 'Shift cash register, immutable blind audit, proprietary calendar, and client folios.',
      col2Item3Title: 'Sovereign Guarantee Triad:',
      col2Item3Text: '1-on-1 team training + 1 month proactive support + 6 months unconditional guarantee.',
      col2Footer: 'Complete sovereignty without third-party rent',
      col2Btn: 'Explore the 17 Systems'
    },
    scrolly: {
      p1Title: 'Engineering Beyond the Terrestrial',
      p1Desc: 'We eradicate dead templates, vulnerable plugins, and decorative websites. We build living digital ecosystems governed by high-performance software.',
      p2Title: 'Real-Time Operational Control',
      p2Desc: 'Isolated admin dashboards (/#/dsb), atomic scheduling, blind audits, and direct payment gateways. Zero manual friction, 100% billing sovereignty.',
      p3Title: 'Autonomous Resolution in Milliseconds',
      p3Desc: 'Enter the hyperspace of performance. Your bottlenecks evaporate at 60 FPS with load times under 0.8s and semantic AEO retention for AI engines.',
      p4Title: 'Infinite Scalability Without Dependencies',
      p4Desc: 'Hardened infrastructure with defensive cybersecurity, 1 month proactive support, and 6 months unconditional guarantee of flawless operation.',
      p4Cta: 'Diagnose My Project (45s)'
    },
    standards: {
      tag: 'Sovereign Engineering Protocol // 2026',
      title: 'Engineering Standards & Guarantee Triad',
      desc: 'Our developments are not limited to visual interfaces: they are governed by four non-negotiable engineering pillars engineered to shield operations, capture AI clients, and ensure perpetual stability.',
      hudVisibility: 'VISIBILITY ARCHITECTURE // COGNITIVE AEO',
      hudTelemetry: 'AI ENGINE READY // JSON-LD SCHEMA',
      aeoEvolution: 'Mandatory Algorithmic Evolution',
      aeoTitle: 'AEO (Answer Engine Optimization) Over Outdated SEO',
      aeoDesc1: '15-year-old keyword SEO is dead. Today your highest-value clients do not browse 10 pages of Google: they ask ChatGPT Search, Perplexity AI, Claude, and Google Gemini directly.',
      aeoDesc2: 'Our platforms feature deep semantic JSON-LD knowledge graphs. When a user asks an AI engine for the top hospitality, clinic, or gastro venue in your region, AI models recommend your brand as the #1 verified authority with direct booking links.',
      seoOldTitle: '❌ TRADITIONAL SEO (OBSOLETE)',
      aeoNewTitle: '💎 DYNAMIND AEO (2026)',
      hudCyber: 'DEFENSIVE CYBERSECURITY',
      hudCyberTelemetry: 'RLS + TLS 1.3 ACTIVE',
      cyberTitle: 'Banking-Grade Privacy & Defensive Shielding',
      cyberDesc: 'Traditional agencies use shared databases where any attacker can breach client contact records. At Dynamind we enforce Row Level Security (RLS) and constant-time validated schemas.',
      hudGuarantees: 'HONOR GUARANTEE TRIAD',
      hudGuaranteesTelemetry: 'CONTRACTUAL SLA 99.9%',
      guaranteesTitle: 'Proactive Guidance & Unconditional Guarantee',
      guaranteesDesc: 'We never dump code and disappear: we contractually commit to your operational success with 1 month proactive support and 6 months unconditional warranty.'
    },
    calculator: {
      title: 'Hours & Capital Recovery Calculator',
      desc: 'Adjust the sliders with your operation approximate metrics and discover how much time and money you waste every month without an automated system.',
      activityLabel: 'Select your business activity:',
      gastro: 'Gastronomy / Bar',
      hospedaje: 'Glamping / Boutique Hotel',
      clinica: 'Clinic / Medical Spa',
      personal: 'Author Brand / Studio',
      hoursLabel: 'Hours per day spent managing messages and bookings:',
      messagesLabel: 'Customer inquiries received per day:',
      ticketLabel: 'Average transaction / service ticket (USD):',
      resultTitle: 'Your Estimated Monthly Return',
      recoveredTimeTitle: 'Life Hours Reclaimed',
      hoursPerMonth: 'hours / month',
      recoveredTimeDesc: 'Equivalent to full working days returned to your life rather than stuck answering repetitive chats.',
      financialImpactTitle: 'Retained Financial Impact',
      financialImpactDesc: 'Rescued sales lost to delayed replies + commissions saved from third-party delivery platforms.',
      cta: 'Automate My Business Now'
    },
    conversionBanner: {
      title: 'Ready to eradicate your business bottleneck?',
      desc: 'Assess your operational friction, qualify your project, and schedule an architectural strategy session directly with Juan Pablo.',
      cta: 'Start Diagnostic (45s)'
    },
    footer: {
      brandDesc: 'Software engineering studio, 60 FPS reactive web architecture, and conversion systems development with isolated operational dashboards (Core PMS).',
      navTitle: 'Navigation',
      engTitle: 'Engineering',
      legalTitle: 'Guarantees & Legal',
      g1: '6-Month Warranty',
      g2: '1-Month Proactive Support',
      g3: '100% Data Sovereignty',
      rights: 'All rights reserved. Crafted with artisanal engineering precision by Dynamind Studios.'
    }
  },

  fr: {
    nav: {
      inicio: 'Accueil',
      obras: 'Réalisations',
      sistemas: 'Systèmes',
      vision: 'Vision',
      diagnostico: 'Diagnostic',
      configuracion: 'Apparence & Langue'
    },
    appearance: {
      title: 'Paramètres de la Page',
      borders: 'Morphologie des Bordures',
      languages: 'Langue du Portail',
      sharp: 'Bords Droits (90°)',
      sharpDesc: 'Style orthogonal, technique et monolithique sans courbes.',
      medium: 'Équilibré / Moyen',
      mediumDesc: 'Courbure harmonieuse standard avec angles raffinés.',
      rounded: 'Entièrement Arrondi',
      roundedDesc: 'Style organique et doux avec contours fluides.',
      close: 'Appliquer et Fermer'
    },
    hero: {
      headline: 'Chez Dynamind, nous ne créons pas de sites esthétiques, morts et sans fonction.',
      subtitle: 'Nous construisons des outils logiciels vivants avec tableaux de bord opérationnels isolés (Core PMS), code natif à 60 FPS, planificateurs atomiques et passerelles directes libérant le dirigeant de centaines d\'heures de friction.',
      ctaDiagnostico: 'Démarrer le Diagnostic (45s)',
      ctaFilosofia: 'Pourquoi Pas de Web Traditionnel',
      scrollPrompt: 'Faites défiler pour explorer'
    },
    whyNotTraditional: {
      manifestoTag: 'Manifeste d\'Ingénierie Souveraine // Protocole 2026',
      title: 'Pourquoi Nous Ne Construisons Pas de Sites Web Traditionnels',
      desc: 'Les agences courantes vendent des thèmes WordPress gonflés, dépendent de plugins vulnérables et livrent une brochure morte que personne ne visite. Chez Dynamind Studios, nous créons des actifs logiciels vivants.',
      reactorTitle: 'Souveraineté Technologique',
      reactorSubtitle: 'Zéro Dépendance · Zéro Plugin Fragile · 60 FPS',
      col1Tag: 'Le Modèle Traditionnel Obsolète',
      col1Title: 'Le Cimetière Numérique de WordPress / Wix',
      col1Desc: 'Des pages lentes mettant plus de 4 secondes à charger, bâties sur des thèmes génériques bricolés avec des plugins expirant et piratés périodiquement.',
      col1Item1Title: 'Dépendance aux intermédiaires :',
      col1Item1Text: '18% à 28% de commissions versées à des tiers.',
      col1Item2Title: 'Perte continue de prospects :',
      col1Item2Text: 'Formulaires statiques finissant en spam ou surchargeant vos messages WhatsApp.',
      col1Item3Title: 'Zéro contrôle opérationnel :',
      col1Item3Text: 'Pas de caisse par rotation, pas d\'audit aveugle ni de gestion de commandes.',
      col1Result: 'Résultat : Une dépense publicitaire stérile sans aucune solution opérationnelle réelle.',
      col2Tag: 'Ingénierie d\'une Autre Galaxie',
      col2Title: 'Systèmes Souverains Vivants à 60 FPS',
      col2Desc: 'Infrastructure réactive à micro-latence en React natif et Tailwind pur. Chargement instantané en moins de 0.8s avec physique cinématique et búnker opérationnel.',
      col2Item1Title: 'AEO (Answer Engine Optimization) :',
      col2Item1Text: 'Graphes sémantiques JSON-LD cités directement par ChatGPT, Perplexity et Gemini.',
      col2Item2Title: 'Búnker Opérationnel DSB :',
      col2Item2Text: 'Caisse par rotation, audit aveugle immuable, calendrier propre et folios clients.',
      col2Item3Title: 'Triade de Garanties Souveraines :',
      col2Item3Text: 'Formation 1 à 1 de votre équipe + 1 mois de support + 6 mois de garantie totale.',
      col2Footer: 'Souveraineté totale sans rentes à des tiers',
      col2Btn: 'Découvrir les 17 Systèmes'
    },
    scrolly: {
      p1Title: 'Une Ingénierie au-delà du Terrestre',
      p1Desc: 'Nous éradiquons les templates morts et les plugins vulnérables. Nous bâtissons des écosystèmes numériques vivants régis par un logiciel de haute performance.',
      p2Title: 'Contrôle Opérationnel en Temps Réel',
      p2Desc: 'Dashboards d\'administration isolés (/#/dsb), prise de rendez-vous atomique, caisse aveugle et passerelles directes. Zéro friction, 100% de souveraineté.',
      p3Title: 'Résolution Autonome en Millisecondes',
      p3Desc: 'Pénétrez dans l\'hyperespace de la performance. Vos goulots d\'étranglement s\'évaporent à 60 FPS avec des temps de chargement sous 0.8s et rétention AEO pour IA.',
      p4Title: 'Évolutivité Infinie Sans Dépendances',
      p4Desc: 'Infrastructure blindée avec cybersécurité défensive, 1 mois de support proactif et 6 mois de garantie inconditionnelle de fonctionnement parfait.',
      p4Cta: 'Diagnostiquer Mon Projet (45s)'
    },
    standards: {
      tag: 'Protocole d\'Ingénierie Souveraine // 2026',
      title: 'Normes d\'Ingénierie & Triade de Garanties',
      desc: 'Nos développements ne s\'arrêtent pas à l\'interface visuelle : ils sont gouvernés par quatre piliers non négociables garantissant stabilité et conversion IA.',
      hudVisibility: 'ARCHITECTURE DE VISIBILITÉ // AEO COGNITIF',
      hudTelemetry: 'AI ENGINE READY // JSON-LD SCHEMA',
      aeoEvolution: 'Évolution Algorithmique Obligatoire',
      aeoTitle: 'AEO (Answer Engine Optimization) au lieu du SEO Dépassé',
      aeoDesc1: 'Le SEO par mots-clés est mort. Aujourd\'hui vos clients les plus rentables interrogent directement ChatGPT Search, Perplexity AI et Google Gemini.',
      aeoDesc2: 'Nos plateformes intègrent des graphes JSON-LD profonds. Les IA recommandent votre établissement comme le choix vérifié n°1 avec liens directs.',
      seoOldTitle: '❌ SEO TRADITIONNEL (OBSOLÈTE)',
      aeoNewTitle: '💎 AEO DYNAMIND (2026)',
      hudCyber: 'CYBERSÉCURITÉ DÉFENSIVE',
      hudCyberTelemetry: 'RLS + TLS 1.3 ACTIVE',
      cyberTitle: 'Confidentialité Bancaire & Blindage Défensif',
      cyberDesc: 'Les agences partagent des bases vulnérables. Chez Dynamind, nous appliquons Row Level Security (RLS) et schémas Zod ultra-stricts.',
      hudGuarantees: 'TRIADE DE GARANTIES D\'HONNEUR',
      hudGuaranteesTelemetry: 'ACCORD CONTRACTUEL // SLA 99.9%',
      guaranteesTitle: 'Accompagnement & Garantie Inconditionnelle',
      guaranteesDesc: 'Nous ne livrons pas du code pour disparaître : engagement contractuel avec 1 mois de support proactif et 6 mois de garantie complète.'
    },
    calculator: {
      title: 'Calculateur d\'Heures & Capitaux Récupérés',
      desc: 'Ajustez les curseurs avec vos chiffres opérationnels et découvrez le temps et l\'argent perdus faute de système automatisé.',
      activityLabel: 'Sélectionnez votre secteur :',
      gastro: 'Gastronomie / Bar',
      hospedaje: 'Hôtellerie / Glamping',
      clinica: 'Clinique / Spa Médical',
      personal: 'Marque d\'Auteur',
      hoursLabel: 'Heures quotidiennes passées en gestion et messages :',
      messagesLabel: 'Demandes clients reçues par jour :',
      ticketLabel: 'Panier moyen par vente ou service (USD) :',
      resultTitle: 'Votre Retour Mensuel Estimé',
      recoveredTimeTitle: 'Temps de Vie Récupéré',
      hoursPerMonth: 'heures / mois',
      recoveredTimeDesc: 'Équivalent à des journées complètes de travail restituées pour votre vie et votre stratégie.',
      financialImpactTitle: 'Impact Financier Retenu',
      financialImpactDesc: 'Ventes sauvées des délais de réponse + économies de commissions d\'intermédiaires.',
      cta: 'Automatiser Mon Activité'
    },
    conversionBanner: {
      title: 'Prêt à éradiquer les goulots d\'étranglement de votre entreprise ?',
      desc: 'Évaluez vos frictions, qualifiez votre projet et réservez directement une session d\'architecture stratégique avec Juan Pablo.',
      cta: 'Démarrer le Diagnostic (45s)'
    },
    footer: {
      brandDesc: 'Studio d\'ingénierie logicielle, architecture web réactive à 60 FPS et développement de systèmes de conversion avec Core PMS isolé.',
      navTitle: 'Navigation',
      engTitle: 'Ingénierie',
      legalTitle: 'Garanties & Légal',
      g1: 'Garantie 6 mois',
      g2: '1 mois de support proactif',
      g3: '100% de souveraineté des données',
      rights: 'Tous droits réservés. Développé avec rigueur artisanale par Dynamind Studios.'
    }
  },

  de: {
    nav: {
      inicio: 'Startseite',
      obras: 'Werke',
      sistemas: 'Systeme',
      vision: 'Vision',
      diagnostico: 'Diagnose',
      configuracion: 'Erscheinungsbild & Sprache'
    },
    appearance: {
      title: 'Seiteneinstellungen',
      borders: 'Kanten-Morphologie',
      languages: 'Portalsprache',
      sharp: 'Geradlinig / Eckig (90°)',
      sharpDesc: 'Technischer, monolithischer Stil ohne Rundungen.',
      medium: 'Ausgewogen / Mittel',
      mediumDesc: 'Standardmäßige harmonische Kurvenführung.',
      rounded: 'Vollständig Abgerundet',
      roundedDesc: 'Organischer, weicher Stil mit fließenden Konturen.',
      close: 'Anwenden & Schließen'
    },
    hero: {
      headline: 'Bei Dynamind gestalten wir keine ästhetischen, toten und funktionslosen Websites.',
      subtitle: 'Wir entwickeln lebendige Software-Werkzeuge mit isolierten operativen Dashboards (Core PMS), nativem 60-FPS-Code, atomaren Terminplanern und Direkt-Checkouts.',
      ctaDiagnostico: 'Diagnose starten (45s)',
      ctaFilosofia: 'Warum keine Standard-Websites',
      scrollPrompt: 'Scrollen zum Erkunden'
    },
    whyNotTraditional: {
      manifestoTag: 'Souveränes Engineering-Manifest // Protokoll 2026',
      title: 'Warum wir keine traditionellen Websites bauen',
      desc: 'Herkömmliche Agenturen verkaufen aufgeblähte WordPress-Vorlagen, hängen von unsicheren Plugins ab und liefern eine tote Broschüre ab. Bei Dynamind Studios bauen wir lebendige Software-Assets.',
      reactorTitle: 'Technologische Souveränität',
      reactorSubtitle: 'Null Abhängigkeiten · Null fragile Plugins · 60 FPS',
      col1Tag: 'Das veraltete traditionelle Modell',
      col1Title: 'Das digitale Grab von WordPress / Wix',
      col1Desc: 'Träge Ladezeiten über 4 Sekunden, generische Themes mit Dutzenden ablaufenden und anfälligen Plugins.',
      col1Item1Title: 'Abhängigkeit von Dritten:',
      col1Item1Text: '18% bis 28% Provisionen an Plattformen, die Ihnen nicht gehören.',
      col1Item2Title: 'Kundenverlust:',
      col1Item2Text: 'Statische Formulare landen im Spam oder überfluten manuelle WhatsApp-Chats.',
      col1Item3Title: 'Keine operative Kontrolle:',
      col1Item3Text: 'Kein Schichtkassenbuch, keine Blindprüfung, keine Bestellverwaltung.',
      col1Result: 'Ergebnis: Sterile Werbeausgaben ohne jede echte operative Lösung.',
      col2Tag: 'Engineering aus einer anderen Galaxie',
      col2Title: 'Lebendige souveräne Systeme mit 60 FPS',
      col2Desc: 'Reaktive Mikro-Latenz-Infrastruktur in nativem React und purem Tailwind. Sofortige Ladezeit unter 0.8s mit kinetischer Physik und privatem Admin-Bunker.',
      col2Item1Title: 'AEO (Answer Engine Optimization):',
      col2Item1Text: 'Tiefe semantische JSON-LD-Wissensgraphen, zitiert von ChatGPT, Perplexity und Gemini.',
      col2Item2Title: 'Operativer DSB-Bunker:',
      col2Item2Text: 'Schichtkasse, unveränderlicher Kassensturz, eigener Kalender und Kundenakten.',
      col2Item3Title: 'Souveräne Garantie-Triade:',
      col2Item3Text: '1:1 Team-Schulung + 1 Monat proaktiver Support + 6 Monate bedingungslose Garantie.',
      col2Footer: 'Vollständige Souveränität ohne Mieten an Dritte',
      col2Btn: 'Die 17 Systeme entdecken'
    },
    scrolly: {
      p1Title: 'Engineering jenseits des Irdischen',
      p1Desc: 'Wir beseitigen tote Vorlagen und verwundbare Plugins. Wir erschaffen lebendige digitale Ökosysteme auf Basis von Hochleistungs-Software.',
      p2Title: 'Operative Kontrolle in Echtzeit',
      p2Desc: 'Isolierte Administrations-Dashboards (/#/dsb), atomare Terminbuchung, Kassenprüfung und direkte Zahlungswege. Null manuelle Reibung.',
      p3Title: 'Autonome Auflösung in Millisekunden',
      p3Desc: 'Treten Sie ein in den Hyperraum der Performance. Ihre Engpässe lösen sich bei 60 FPS auf – Ladezeiten unter 0.8s und semantisches AEO für KI.',
      p4Title: 'Unendliche Skalierbarkeit ohne Abhängigkeiten',
      p4Desc: 'Gehärtete Infrastruktur mit defensiver Cybersicherheit, 1 Monat proaktiver Support und 6 Monate bedingungslose Funktionsgarantie.',
      p4Cta: 'Mein Projekt diagnostizieren (45s)'
    },
    standards: {
      tag: 'Souveränes Engineering-Protokoll // 2026',
      title: 'Engineering-Standards & Garantie-Triade',
      desc: 'Unsere Entwicklungen beschränken sich nicht auf Design: Vier unverhandelbare Pfeiler sichern Ihren Betrieb, gewinnen KI-Kunden und garantieren Stabilität.',
      hudVisibility: 'SICHTBARKEITS-ARCHITEKTUR // KOGNITIVES AEO',
      hudTelemetry: 'AI ENGINE READY // JSON-LD SCHEMA',
      aeoEvolution: 'Verpflichtende algorithmische Evolution',
      aeoTitle: 'AEO (Answer Engine Optimization) statt altem SEO',
      aeoDesc1: 'Klassisches Keyword-SEO ist tot. Zahlungskräftige Kunden fragen heute ChatGPT Search, Perplexity AI, Claude und Google Gemini direkt.',
      aeoDesc2: 'Unsere Systeme verfügen über JSON-LD-Wissensgraphen. KI-Modelle empfehlen Ihr Unternehmen als verifizierte Referenz #1 mit Direktlinks.',
      seoOldTitle: '❌ TRADITIONELLES SEO (VERALTET)',
      aeoNewTitle: '💎 DYNAMIND AEO (2026)',
      hudCyber: 'DEFENSIVE CYBERSICHERHEIT',
      hudCyberTelemetry: 'RLS + TLS 1.3 ACTIVE',
      cyberTitle: 'Sicherheit auf Bankenniveau & Härtung',
      cyberDesc: 'Traditionelle Agenturen nutzen unsichere Datenbanken. Bei Dynamind setzen wir auf Row Level Security (RLS) und strikte Zod-Validierung.',
      hudGuarantees: 'EHRENWORT-GARANTIE-TRIADE',
      hudGuaranteesTelemetry: 'VERTRAGLICHE SLA 99.9%',
      guaranteesTitle: 'Begleitung & Bedingungslose Garantie',
      guaranteesDesc: 'Wir übergeben keinen Code und tauchen ab: Vertragliche Absicherung mit 1 Monat proaktivem Support und 6 Monaten Garantie.'
    },
    calculator: {
      title: 'Rechner für Zeit- & Kapitalrückgewinnung',
      desc: 'Bewegen Sie die Regler entsprechend Ihres Betriebs und sehen Sie, wie viel Zeit und Geld Ihnen ohne Automatisierung verloren gehen.',
      activityLabel: 'Wählen Sie Ihre Branche:',
      gastro: 'Gastronomie / Bar',
      hospedaje: 'Hotellerie / Glamping',
      clinica: 'Klinik / Medizinisches Spa',
      personal: 'Autorenmarke / Studio',
      hoursLabel: 'Tägliche Stunden für Chat- & Buchungsverwaltung:',
      messagesLabel: 'Täglich eingehende Kundenanfragen:',
      ticketLabel: 'Durchschnittlicher Umsatz pro Kunde (USD):',
      resultTitle: 'Ihre geschätzte monatliche Rendite',
      recoveredTimeTitle: 'Zurückgewonnene Lebenszeit',
      hoursPerMonth: 'Stunden / Monat',
      recoveredTimeDesc: 'Entspricht vollen Arbeitstagen, die Sie nicht mehr am Smartphone mit repetitiven Chats verbringen.',
      financialImpactTitle: 'Einbehaltene Wertschöpfung',
      financialImpactDesc: 'Gerettete Verkäufe aus verzögerten Antworten + gesparte Plattform-Provisionen.',
      cta: 'Mein Unternehmen jetzt automatisieren'
    },
    conversionBanner: {
      title: 'Bereit, den Engpass Ihres Unternehmens zu beseitigen?',
      desc: 'Analysieren Sie Ihre operativen Reibungsverluste und buchen Sie direkt eine Architektur-Strategiesitzung mit Juan Pablo.',
      cta: 'Diagnose starten (45s)'
    },
    footer: {
      brandDesc: 'Software-Engineering-Studio, reaktive 60-FPS-Webarchitektur und Entwicklung von Konversionssystemen mit isoliertem Core PMS.',
      navTitle: 'Navigation',
      engTitle: 'Engineering',
      legalTitle: 'Garantien & Rechtliches',
      g1: '6 Monate Garantie',
      g2: '1 Monat proaktiver Support',
      g3: '100% Datensouveränität',
      rights: 'Alle Rechte vorbehalten. Handwerklich präzise entwickelt von Dynamind Studios.'
    }
  },

  pt: {
    nav: {
      inicio: 'Início',
      obras: 'Obras',
      sistemas: 'Sistemas',
      vision: 'Visão',
      diagnostico: 'Diagnóstico',
      configuracion: 'Aparência & Idioma'
    },
    appearance: {
      title: 'Configurações da Página',
      borders: 'Morfologia de Bordas',
      languages: 'Idioma do Portal',
      sharp: 'Com Bordas Retas (90°)',
      sharpDesc: 'Estilo ortogonal, técnico e monolítico sem curvas.',
      medium: 'Equilibrado / Médio',
      mediumDesc: 'Curvatura harmônica padrão com cantos refinados.',
      rounded: 'Completamente Arredondado',
      roundedDesc: 'Estilo orgânico e suave com contornos fluidos.',
      close: 'Aplicar e Fechar'
    },
    hero: {
      headline: 'Na Dynamind não desenhamos sites estéticos, mortos e sem função.',
      subtitle: 'Construímos ferramentas de software vivas com painéis operacionais isolados (Core PMS), código nativo a 60 FPS, agendadores atômicos e checkout direto que libertam o dono do negócio de centenas de horas de fricção manual.',
      ctaDiagnostico: 'Iniciar Diagnóstico (45s)',
      ctaFilosofia: 'Por Que Não Sites Tradicionais',
      scrollPrompt: 'Deslize para explorar'
    },
    whyNotTraditional: {
      manifestoTag: 'Manifesto de Engenharia Soberana // Protocolo 2026',
      title: 'Por Que Não Construímos Sites Tradicionais',
      desc: 'Agências comuns vendem temas pesados de WordPress, dependem de plugins vulneráveis e entregam um folheto morto que ninguém visita. Na Dynamind Studios construímos ativos de software vivos.',
      reactorTitle: 'Soberania Tecnológica',
      reactorSubtitle: 'Zero Dependências · Zero Plugins Frágeis · 60 FPS',
      col1Tag: 'O Modelo Tradicional Obsoleto',
      col1Title: 'O Cemitério Digital do WordPress / Wix',
      col1Desc: 'Páginas lentas que demoram mais de 4 segundos para carregar, criadas em temas genéricos com dezenas de plugins que expiram e são hackeados periodicamente.',
      col1Item1Title: 'Dependência de intermediários:',
      col1Item1Text: '18% a 28% de comissões pagas a plataformas de terceiros.',
      col1Item2Title: 'Fuga contínua de clientes:',
      col1Item2Text: 'Formulários estáticos que caem em spam ou sobrecarregam seu WhatsApp manual.',
      col1Item3Title: 'Zero ferramentas de controle:',
      col1Item3Text: 'Sem controle de turnos de caixa, sem conferência cega e sem comandas.',
      col1Result: 'Resultado: Gasto com anúncios estéril que não resolve os problemas da operação.',
      col2Tag: 'Engenharia de Outra Galáxia',
      col2Title: 'Sistemas Soberanos Vivos a 60 FPS',
      col2Desc: 'Infraestrutura reativa de micro-latência em React nativo e Tailwind puro. Carregamento em menos de 0.8s com física cinemática e búnker operacional privado.',
      col2Item1Title: 'AEO (Answer Engine Optimization):',
      col2Item1Text: 'Grafos semânticos JSON-LD citados diretamente por ChatGPT, Perplexity e Gemini.',
      col2Item2Title: 'Búnker Operacional DSB:',
      col2Item2Text: 'Caixa por turnos, conferência cega imutável, calendário próprio e histórico de clientes.',
      col2Item3Title: 'Tríade de Garantias Soberanas:',
      col2Item3Text: 'Treinamento 1 a 1 da sua equipe + 1 mês de suporte ativo + 6 meses de garantia total.',
      col2Footer: 'Soberania total sem pagar aluguel a terceiros',
      col2Btn: 'Conhecer os 17 Sistemas'
    },
    scrolly: {
      p1Title: 'Engenharia Além do Terreno',
      p1Desc: 'Erradicamos temas mortos e plugins vulneráveis. Construímos ecossistemas digitais vivos governados por software de alta performance.',
      p2Title: 'Controle Operacional em Tempo Real',
      p2Desc: 'Dashboards de administração isolados (/#/dsb), agendamento atômico, conferência cega e checkout direto. Zero atrito manual, 100% de soberania.',
      p3Title: 'Resolução Autônoma em Milissegundos',
      p3Desc: 'Entre no hiperespaço do desempenho. Seus gargalos evaporam a 60 FPS com carregamento abaixo de 0.8s e retenção AEO para inteligências artificiais.',
      p4Title: 'Escalabilidade Infinita Sem Dependências',
      p4Desc: 'Infraestrutura blindada com cibersegurança defensiva, 1 mês de suporte ativo e 6 meses de garantia incondicional de funcionamento perfeito.',
      p4Cta: 'Diagnosticar Meu Projeto (45s)'
    },
    standards: {
      tag: 'Protocolo de Engenharia Soberana // 2026',
      title: 'Padrões de Engenharia & Tríade de Garantias',
      desc: 'Nossos projetos vão além da interface visual: quatro pilares inegociáveis blindam a operação, capturam clientes via IA e garantem estabilidade perpétua.',
      hudVisibility: 'ARQUITETURA DE VISIBILIDADE // AEO COGNITIVO',
      hudTelemetry: 'AI ENGINE READY // JSON-LD SCHEMA',
      aeoEvolution: 'Evolução Algorítmica Obrigatória',
      aeoTitle: 'AEO (Answer Engine Optimization) no lugar do SEO Antigo',
      aeoDesc1: 'O SEO tradicional de palavras-chave morreu. Hoje seus clientes mais rentáveis perguntam diretamente ao ChatGPT Search, Perplexity AI e Gemini.',
      aeoDesc2: 'Nossas plataformas contam com grafos semânticos JSON-LD. As IAs recomendam seu negócio como a opção verificada #1 com links diretos de reserva.',
      seoOldTitle: '❌ SEO TRADICIONAL (OBSOLETO)',
      aeoNewTitle: '💎 AEO DYNAMIND (2026)',
      hudCyber: 'CIBERSEGURANÇA DEFENSIVA',
      hudCyberTelemetry: 'RLS + TLS 1.3 ACTIVE',
      cyberTitle: 'Privacidade de Nível Bancário & Blindagem',
      cyberDesc: 'Agências tradicionais usam bancos de dados compartilhados vulneráveis. Na Dynamind aplicamos Row Level Security (RLS) e validação estrita com Zod.',
      hudGuarantees: 'TRÍADE DE GARANTIAS DE HONRA',
      hudGuaranteesTelemetry: 'ACORDO CONTRATUAL // SLA 99.9%',
      guaranteesTitle: 'Acompanhamento & Garantia Incondicional',
      guaranteesDesc: 'Não entregamos código para depois sumir: assumimos compromisso contratual com 1 mês de suporte ativo e 6 meses de garantia total.'
    },
    calculator: {
      title: 'Calculadora de Horas & Dinheiro Recuperado',
      desc: 'Ajuste os controles com os números da sua operação e descubra quanto tempo e dinheiro você perde por não ter um sistema automatizado.',
      activityLabel: 'Selecione seu segmento:',
      gastro: 'Gastronomia / Bar',
      hospedaje: 'Glamping / Hotelaria',
      clinica: 'Clínica / Spa',
      personal: 'Marca de Autor',
      hoursLabel: 'Horas por dia gastas em atendimento e mensagens:',
      messagesLabel: 'Mensagens ou solicitações recebidas por dia:',
      ticketLabel: 'Ticket médio por venda ou serviço (USD):',
      resultTitle: 'Seu Retorno Mensal Estimado',
      recoveredTimeTitle: 'Tempo de Vida Recuperado',
      hoursPerMonth: 'horas / mês',
      recoveredTimeDesc: 'Equivalente a jornadas inteiras de trabalho devolvidas para você focar no crescimento do negócio.',
      financialImpactTitle: 'Impacto Financeiro Retido',
      financialImpactDesc: 'Vendas salvas de demoras no atendimento + comissões economizadas de plataformas de terceiros.',
      cta: 'Automatizar Meu Negócio Agora'
    },
    conversionBanner: {
      title: 'Pronto para erradicar o gargalo do seu negócio?',
      desc: 'Avalie seus atritos operacionais, qualifique seu projeto e agende diretamente uma sessão estratégica de arquitetura com Juan Pablo.',
      cta: 'Iniciar Diagnóstico (45s)'
    },
    footer: {
      brandDesc: 'Estúdio de engenharia de software, arquitetura web reativa a 60 FPS e desenvolvimento de sistemas de conversão com Core PMS isolado.',
      navTitle: 'Navegação',
      engTitle: 'Engenharia',
      legalTitle: 'Garantias & Legal',
      g1: 'Garantia de 6 meses',
      g2: '1 mês de suporte proativo',
      g3: 'Soberania de dados 100%',
      rights: 'Todos os direitos reservados. Desenvolvido com precisão artesanal pela Dynamind Studios.'
    }
  },

  ja: {
    nav: {
      inicio: 'ホーム',
      obras: '実績',
      sistemas: 'システム',
      vision: 'ビジョン',
      diagnostico: '診断',
      configuracion: '外観と環境設定'
    },
    appearance: {
      title: 'ページ設定',
      borders: 'エッジ・ボーダー形状',
      languages: 'ポータル言語',
      sharp: '直角・スクエア (90°)',
      sharpDesc: '曲線のない直角でソリッドなモノリスデザイン。',
      medium: 'バランス / 標準',
      mediumDesc: '適度な曲率を持つ洗練されたエッジ。',
      rounded: 'フルラウンド / 曲線',
      roundedDesc: '有機的で柔らかな丸みを帯びたデザイン。',
      close: '適用して閉じる'
    },
    hero: {
      headline: 'Dynamindでは、単に美しいだけで機能しない死んだWebサイトは作りません。',
      subtitle: '独立した運用ダッシュボード（Core PMS）、60FPSネイティブコード、アトミックスケジューラ、および直接決済ゲートウェイを備えた生きたソフトウェアツールを構築し、ビジネスオーナーを手動の負担から解放します。',
      ctaDiagnostico: '診断を開始する (45秒)',
      ctaFilosofia: '従来のWebサイトを作らない理由',
      scrollPrompt: 'スクロールして探索'
    },
    whyNotTraditional: {
      manifestoTag: '主権工学マニフェスト // 2026プロトコル',
      title: '私たちが従来のWebサイトを構築しない理由',
      desc: '一般的な制作会社は肥大化したWordPressテンプレートを販売し、誰も見ないパンフレットを納品します。Dynamind Studiosでは、ビジネスのボトルネックを直接解消する生きたソフトウェア資産を構築します。',
      reactorTitle: '技術的主権',
      reactorSubtitle: '外部依存ゼロ · 脆弱プラグインゼロ · 60 FPS',
      col1Tag: '時代遅れの従来モデル',
      col1Title: 'WordPress / Wixのデジタル墓場',
      col1Desc: '読み込みに4秒以上かかる遅いページ、期限切れやハッキングのリスクを抱えるプラグインの継ぎ接ぎ。',
      col1Item1Title: '仲介プラットフォームへの依存:',
      col1Item1Text: '所有していないプラットフォームへの18%〜28%の手数料支払い。',
      col1Item2Title: '絶え間ない見込み客の流出:',
      col1Item2Text: 'スパムに埋もれる静的フォームや手動チャットのパンク。',
      col1Item3Title: '運用ツールの欠如:',
      col1Item3Text: 'シフト管理、厳格な売上照合、注文伝票管理の欠落。',
      col1Result: '結果: 実際の運用改善に繋がらない無駄な広告費の浪費。',
      col2Tag: '別次元のソフトウェア工学',
      col2Title: '60 FPSで駆動する主権型システム',
      col2Desc: 'ReactとTailwindによる極低遅延インフラ。0.8秒未満の高速読み込み、シネマティック物理挙動、プライベート運用バンカー。',
      col2Item1Title: 'AEO（回答エンジン最適化）:',
      col2Item1Text: 'ChatGPT、Perplexity、Geminiに引用されるJSON-LD知識グラフ。',
      col2Item2Title: '運用DSBバンカー:',
      col2Item2Text: 'シフト別売上管理、不変のブラインド照合、独自カレンダーと顧客カルテ。',
      col2Item3Title: '主権保証トライアード:',
      col2Item3Text: '1対1のチームトレーニング + 1ヶ月の能動的サポート + 6ヶ月の無条件保証。',
      col2Footer: '第三者への家賃ゼロの完全な主権',
      col2Btn: '17のシステムを見る'
    },
    scrolly: {
      p1Title: '地上を超越するエンジニアリング',
      p1Desc: 'テンプレートや脆弱なプラグインを排除し、高性能ソフトウェアによって統治される生きたデジタルエコシステムを構築します。',
      p2Title: 'リアルタイムの運用制御',
      p2Desc: '独立した管理ダッシュボード（/#/dsb）、自動スケジュール管理、売上照合、直接決済。手作業の摩擦をゼロにし、収益の完全な主権を確立します。',
      p3Title: 'ミリ秒単位の自律的解決',
      p3Desc: '圧倒的なパフォーマンスのハイパースペースへ。ボトルネックは60FPSで解消され、0.8秒未満の超高速表示とAIエンジン用AEOを実現します。',
      p4Title: '外部依存のない無限のスケーラビリティ',
      p4Desc: '強固なサイバーセキュリティ、1ヶ月の能動的サポート、6ヶ月間の完璧な動作保証を備えたインフラを提供します。',
      p4Cta: 'プロジェクトを診断する (45秒)'
    },
    standards: {
      tag: '主権工学プロトコル // 2026',
      title: 'エンジニアリング標準 & 保証トライアード',
      desc: '私たちの開発は視覚的デザインにとどまりません。事業を防御し、AI検索から顧客を獲得し、永続的な安定性を保証する4つの柱に基づいています。',
      hudVisibility: '認知アーキテクチャ // コグニティブAEO',
      hudTelemetry: 'AI ENGINE READY // JSON-LD SCHEMA',
      aeoEvolution: '必須のアルゴリズム進化',
      aeoTitle: '旧来のSEOに代わるAEO（回答エンジン最適化）',
      aeoDesc1: '15年前のキーワードSEOは終焉を迎えました。現在、高単価な顧客はChatGPT Search、Perplexity AI、Google Geminiに直接質問します。',
      aeoDesc2: '当社のプラットフォームはJSON-LDセマンティック知識グラフを標準装備。AIモデルが御社を地域No.1の信頼できる選択肢として直接リンク付きで推薦します。',
      seoOldTitle: '❌ 従来のSEO（時代遅れ）',
      aeoNewTitle: '💎 DYNAMIND AEO (2026)',
      hudCyber: '防御的サイバーセキュリティ',
      hudCyberTelemetry: 'RLS + TLS 1.3 ACTIVE',
      cyberTitle: '銀行グレードのプライバシー保護',
      cyberDesc: '一般の制作会社は危険な共有DBを使用しますが、DynamindではRow Level Security（RLS）と厳格なZodスキーマ検証を採用しています。',
      hudGuarantees: '名誉の保証トライアード',
      hudGuaranteesTelemetry: '契約上のSLA 99.9%',
      guaranteesTitle: '継続的伴走 & 無条件保証',
      guaranteesDesc: 'コードを納品して終わりではありません。1ヶ月の能動的支援と6ヶ月の無条件保証により、運用の成功に契約上コミットします。'
    },
    calculator: {
      title: '時間と資本の回収シミュレーター',
      desc: '貴社の運用数値をスライダーで調整し、自動化システムがないことで毎月失われている時間とコストを確認してください。',
      activityLabel: '業種を選択してください：',
      gastro: '飲食 / バー',
      hospedaje: 'グランピング / ホテル',
      clinica: 'クリニック / サロン',
      personal: '専門家 / 著者ブランド',
      hoursLabel: 'チャットや予約管理に費やす1日の時間：',
      messagesLabel: '1日に受け取る問い合わせ件数：',
      ticketLabel: '平均客単価（USD換算）：',
      resultTitle: '毎月の推定回収リターン',
      recoveredTimeTitle: '取り戻せる人生の時間',
      hoursPerMonth: '時間 / 月',
      recoveredTimeDesc: '反復的なチャット対応から解放され、戦略や私生活に充てられる丸ごとの勤務日数に相当します。',
      financialImpactTitle: '手元に残る財務インパクト',
      financialImpactDesc: '返信遅れによる失注の防止分と、予約仲介手数料の削減分の合計。',
      cta: 'ビジネスを今すぐ自動化する'
    },
    conversionBanner: {
      title: 'ビジネスのボトルネックを解消する準備はできましたか？',
      desc: '運用の摩擦を測定し、プロジェクトの適合性を評価して、Juan Pabloとの戦略アーキテクチャセッションをご予約ください。',
      cta: '診断を開始する (45秒)'
    },
    footer: {
      brandDesc: 'ソフトウェアエンジニアリングスタジオ。60FPSのリアクティブWebアーキテクチャと独立Core PMSを備えたコンバージョンシステムの構築。',
      navTitle: 'ナビゲーション',
      engTitle: 'エンジニアリング',
      legalTitle: '保証 & 法的情報',
      g1: '6ヶ月間動作保証',
      g2: '1ヶ月間プロアクティブ支援',
      g3: 'データ主権100%保証',
      rights: '無断転載を禁じます。Dynamind Studiosによる精密なエンジニアリング。'
    }
  }
};

export function ThemeLanguageProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('dynamind_theme') || 'obsidian');
  const [borderStyle, setBorderStyle] = useState(() => localStorage.getItem('dynamind_border_style') || 'medium');
  const [language, setLanguage] = useState(() => localStorage.getItem('dynamind_language') || 'es');

  useEffect(() => {
    localStorage.setItem('dynamind_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Ajuste de clases de fondo en el elemento raíz para los 3 temas
    if (theme === 'mocha') {
      document.documentElement.classList.remove('theme-alabaster');
      document.documentElement.classList.add('theme-mocha');
    } else if (theme === 'alabaster') {
      document.documentElement.classList.remove('theme-mocha');
      document.documentElement.classList.add('theme-alabaster');
    } else {
      document.documentElement.classList.remove('theme-mocha', 'theme-alabaster');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dynamind_border_style', borderStyle);
    document.documentElement.setAttribute('data-radius', borderStyle);
    document.documentElement.classList.remove('radius-sharp', 'radius-medium', 'radius-rounded');
    document.documentElement.classList.add(`radius-${borderStyle}`);
  }, [borderStyle]);

  useEffect(() => {
    localStorage.setItem('dynamind_language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'alabaster' ? 'obsidian' : 'alabaster'));
  };

  const isLight = theme === 'alabaster';
  const t = TRANSLATIONS[language] || TRANSLATIONS.es;

  return (
    <ThemeLanguageContext.Provider value={{ theme, setTheme, toggleTheme, isLight, borderStyle, setBorderStyle, language, setLanguage, t }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
}
