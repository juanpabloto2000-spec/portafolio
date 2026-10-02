// src/data/translationsDashboardDemo.js
// Diccionario canónico de internacionalización para la Demo Pública del Dashboard (/#/dashboard).
// Soporta los 6 idiomas: es (Español), en (English), fr (Français), de (Deutsch), pt (Português), ja (日本語).

export const DASHBOARD_DEMO_TRANSLATIONS = {
  es: {
    backToWorks: "Volver a Obras",
    operatorBadge: "OPERADOR DEMO",
    guestClient: "Cliente Invitado",
    freeExploreMode: "Modo Exploración Libre",
    timeZoneBadge: "BOG · GMT-5",
    supportDirect: "Soporte Directo",
    requestThisCore: "Solicitar este Core",

    tabs: {
      pipeline: "Pipeline & Métricas",
      demo_factory: "Fábrica de Demos & Cierres",
      calendar: "Calendario Atómico",
      bot_training: "Agente WhatsApp IA",
      universal_cms: "CMS Universal",
      settings: "Seguridad & Claves"
    },

    pipeline: {
      kpiActiveLeads: "Leads Activos",
      kpiActiveDesc: "Pipeline en tiempo real",
      kpiScheduledDemos: "Demos Agendadas",
      kpiScheduledDesc: "50% Tasa de avance",
      kpiOpenProposals: "Propuestas Abiertas",
      kpiOpenDesc: "En negociación",
      kpiSimulatedRevenue: "Facturación Simulada",
      kpiSimulatedDesc: "Valor de cartera",
      kanbanTitle: "Tablero Kanban de Leads",
      addLeadBtn: "+ Añadir Lead de Prueba",
      col1: "1. Cualificación",
      col2: "2. Demostración",
      col3: "3. Propuesta",
      col4: "4. Cerrado",
      emptyCol: "Sin prospectos en esta etapa",
      advanceBtn: "Avanzar →",
      advanceTooltip: "Haz clic para avanzar de etapa"
    },

    demoFactory: {
      title: "Generador de Demos Personalizadas",
      clientNameLabel: "Nombre del Cliente / Marca",
      clientNamePlaceholder: "Ej: Glamping El Refugio",
      sectorLabel: "Sector / Módulo",
      sectorHotel: "Glamping & Hotelería (Motor de Reservas + PMS)",
      sectorGastro: "Gastrobar & Restaurante (Menú QR + KDS)",
      sectorClinic: "Clínica Estética (Triaje Visual + Odómetro)",
      sectorBrand: "Marca Personal / Consultoría (Funnel de Autor)",
      generateBtn: "Generar Enlace Demo",
      readyLabel: "Enlace de Demostración Listo:",
      copyBtn: "Copiar",
      copiedBtn: "¡Copiado!"
    },

    calendar: {
      title: "Matriz Semanal de Citas & Reservas",
      hint: "Haz clic en un bloque para bloquear/liberar",
      scheduleHeader: "Horario",
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayKeys: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      available: "+ Disponible",
      bookedDefault: "Reserva Bloqueada"
    },

    bot: {
      title: "Entrenamiento de Prompt",
      promptLabel: "Instrucción Maestra del Agente",
      saveParamsBtn: "Guardar Parámetros",
      savedAlert: "Instrucción del agente guardada localmente.",
      agentName: "Agente Autónomo de Pruebas",
      agentStatus: "● En línea respondiendo",
      inputPlaceholder: "Escribe un mensaje de prueba...",
      sendBtn: "Enviar",
      defaultPrompt: "Eres el asistente oficial de Dynamind Studios. Tu objetivo es cualificar clientes para desarrollo de software soberano, detectar su cuello de botella operativo (D0) y agendar llamada con Juan Pablo.",
      initialUserMsg: "Hola, me gustaría saber si desarrollan software para reservas de cabañas.",
      initialBotMsg: "¡Hola! 🌲 Sí, construimos el Motor de Reservas Directas y PMS con calendario atómico y anticipo del 50%. ¿Cuántas cabañas tienes en operación actualmente?",
      botReplyPrefix: "Entendido. Para",
      botReplySuffix: "implementamos una arquitectura soberana en React y Supabase con sincronización a tu cuenta bancaria. ¿Deseas agendar un diagnóstico de 45 segundos?"
    },

    cms: {
      title: "Gestión de Textos de la Web",
      heroTitleLabel: "Titular Hero Principal",
      heroSubtitleLabel: "Subtítulo Descriptivo",
      saveBtn: "Guardar Cambios (Local-First)",
      savedToast: "✓ Cambios guardados en tiempo real."
    },

    settings: {
      title: "Ajustes de Credenciales Maestras",
      userLabel: "Usuario Administrador",
      passLabel: "Contraseña Actual Simulada",
      updateBtn: "Actualizar Credenciales",
      updateAlert: "Función de actualización de clave activa en el panel de producción."
    }
  },

  en: {
    backToWorks: "Back to Works",
    operatorBadge: "DEMO OPERATOR",
    guestClient: "Guest Client",
    freeExploreMode: "Free Exploration Mode",
    timeZoneBadge: "BOG · GMT-5",
    supportDirect: "Direct Engineering Support",
    requestThisCore: "Request this Core",

    tabs: {
      pipeline: "Pipeline & Metrics",
      demo_factory: "Demo Factory & Deals",
      calendar: "Atomic Calendar",
      bot_training: "WhatsApp AI Agent",
      universal_cms: "Universal CMS",
      settings: "Security & Credentials"
    },

    pipeline: {
      kpiActiveLeads: "Active Leads",
      kpiActiveDesc: "Real-time pipeline",
      kpiScheduledDemos: "Scheduled Demos",
      kpiScheduledDesc: "50% Conversion pacing",
      kpiOpenProposals: "Open Proposals",
      kpiOpenDesc: "Under negotiation",
      kpiSimulatedRevenue: "Simulated Pipeline Value",
      kpiSimulatedDesc: "Total deal value",
      kanbanTitle: "Leads Kanban Board",
      addLeadBtn: "+ Add Sample Lead",
      col1: "1. Qualification",
      col2: "2. Demonstration",
      col3: "3. Proposal",
      col4: "4. Closed Won",
      emptyCol: "No leads in this stage",
      advanceBtn: "Advance →",
      advanceTooltip: "Click to advance deal stage"
    },

    demoFactory: {
      title: "Custom Demo Link Generator",
      clientNameLabel: "Client Name / Brand",
      clientNamePlaceholder: "e.g. Mountain Haven Glamping",
      sectorLabel: "Industry / Operational Module",
      sectorHotel: "Boutique Hospitality & Glamping (Direct Booking + PMS)",
      sectorGastro: "Gastronomy & Restaurant (QR Menu + KDS)",
      sectorClinic: "Aesthetic Clinic (Visual Triage + Calculator)",
      sectorBrand: "Personal Brand / Consulting (Signature Funnel)",
      generateBtn: "Generate Demo Link",
      readyLabel: "Demo Link Generated:",
      copyBtn: "Copy",
      copiedBtn: "Copied!"
    },

    calendar: {
      title: "Weekly Availability Matrix",
      hint: "Click any block to lock or release",
      scheduleHeader: "Time Slot",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayKeys: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      available: "+ Available",
      bookedDefault: "Slot Booked"
    },

    bot: {
      title: "System Prompt Training",
      promptLabel: "Master Agent System Prompt",
      saveParamsBtn: "Save Prompt Parameters",
      savedAlert: "Agent instructions saved locally.",
      agentName: "Autonomous Test Agent",
      agentStatus: "● Online & responding",
      inputPlaceholder: "Type a test inquiry...",
      sendBtn: "Send",
      defaultPrompt: "You are the official assistant of Dynamind Studios. Your goal is to qualify clients for sovereign software development, detect their operational bottleneck (D0), and schedule a diagnostic call with Juan Pablo.",
      initialUserMsg: "Hello! I would like to know if you build software for boutique cabin bookings.",
      initialBotMsg: "Hello! 🌲 Yes, we build the Direct Booking Engine and PMS with atomic calendar and 50% deposit checkout. How many cabins do you currently operate?",
      botReplyPrefix: "Understood. For",
      botReplySuffix: "we implement sovereign architecture in React and Supabase with direct payouts to your bank account. Would you like to schedule a 45-second diagnostic?"
    },

    cms: {
      title: "Website Content Management",
      heroTitleLabel: "Main Hero Headline",
      heroSubtitleLabel: "Descriptive Subtitle",
      saveBtn: "Save Changes (Local-First)",
      savedToast: "✓ Changes saved in real time."
    },

    settings: {
      title: "Master Credentials & Access",
      userLabel: "Administrator Username",
      passLabel: "Simulated Current Password",
      updateBtn: "Update Credentials",
      updateAlert: "Password update mechanism enabled in live production bunker."
    }
  },

  fr: {
    backToWorks: "Retour aux Réalisations",
    operatorBadge: "OPÉRATEUR DÉMO",
    guestClient: "Client Invité",
    freeExploreMode: "Mode Exploration Libre",
    timeZoneBadge: "BOG · GMT-5",
    supportDirect: "Support Direct",
    requestThisCore: "Demander ce Core",

    tabs: {
      pipeline: "Pipeline & Métriques",
      demo_factory: "Fabrique de Démos",
      calendar: "Calendrier Atomique",
      bot_training: "Agent WhatsApp IA",
      universal_cms: "CMS Universel",
      settings: "Sécurité & Accès"
    },

    pipeline: {
      kpiActiveLeads: "Prospects Actifs",
      kpiActiveDesc: "Pipeline en temps réel",
      kpiScheduledDemos: "Démos Planifiées",
      kpiScheduledDesc: "50% Taux de progression",
      kpiOpenProposals: "Devis en Cours",
      kpiOpenDesc: "En négociation",
      kpiSimulatedRevenue: "Valeur Estimée du Pipeline",
      kpiSimulatedDesc: "Portefeuille d'opportunités",
      kanbanTitle: "Tableau Kanban des Opportunités",
      addLeadBtn: "+ Ajouter un Prospect Test",
      col1: "1. Qualification",
      col2: "2. Démonstration",
      col3: "3. Proposition",
      col4: "4. Gagné",
      emptyCol: "Aucun prospect à cette étape",
      advanceBtn: "Avancer →",
      advanceTooltip: "Cliquez pour avancer d'étape"
    },

    demoFactory: {
      title: "Générateur de Démos Personnalisées",
      clientNameLabel: "Nom du Client / Marque",
      clientNamePlaceholder: "Ex: Domaine Les Chênes",
      sectorLabel: "Secteur / Module Opérationnel",
      sectorHotel: "Hôtellerie & Glamping (Réservations Directes + PMS)",
      sectorGastro: "Gastrobar & Restaurant (Menu QR + KDS)",
      sectorClinic: "Clinique Médicale / Spa (Triage Visuel)",
      sectorBrand: "Marque Personnelle / Conseil (Tunnel d'Auteur)",
      generateBtn: "Générer le Lien Démo",
      readyLabel: "Lien Démo Disponible :",
      copyBtn: "Copier",
      copiedBtn: "Copié !"
    },

    calendar: {
      title: "Matrice Hebdomadaire des Rendez-vous",
      hint: "Cliquez sur un créneau pour bloquer ou libérer",
      scheduleHeader: "Horaires",
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayKeys: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      available: "+ Disponible",
      bookedDefault: "Créneau Réservé"
    },

    bot: {
      title: "Entraînement du Prompt Système",
      promptLabel: "Consigne Maîtresse de l'Agent",
      saveParamsBtn: "Enregistrer les Paramètres",
      savedAlert: "Instructions enregistrées localement.",
      agentName: "Agent Autonome de Test",
      agentStatus: "● En ligne et opérationnel",
      inputPlaceholder: "Écrivez un message de test...",
      sendBtn: "Envoyer",
      defaultPrompt: "Vous êtes l'assistant officiel de Dynamind Studios. Votre objectif est de qualifier les clients pour le développement de logiciels souverains, identifier leur goulot d'étranglement (D0) et planifier un appel avec Juan Pablo.",
      initialUserMsg: "Bonjour, développez-vous des logiciels pour la réservation directe d'hébergements insolites ?",
      initialBotMsg: "Bonjour ! 🌲 Absolument, nous développons le moteur de réservation directe et PMS avec calendrier atomique et acompte sécurisé. Combien de logements gérez-vous ?",
      botReplyPrefix: "Bien reçu. Pour",
      botReplySuffix: "nous déployons une architecture souveraine React et Supabase connectée directement à vos comptes bancaires. Souhaitez-vous planifier un diagnostic de 45 secondes ?"
    },

    cms: {
      title: "Gestion des Contenus du Site",
      heroTitleLabel: "Titre Hero Principal",
      heroSubtitleLabel: "Sous-titre Descriptif",
      saveBtn: "Enregistrer les Modifications",
      savedToast: "✓ Modifications enregistrées en temps réel."
    },

    settings: {
      title: "Paramètres des Identifiants Maîtres",
      userLabel: "Nom d'Utilisateur Admin",
      passLabel: "Mot de Passe Actuel Simulé",
      updateBtn: "Mettre à Jour les Identifiants",
      updateAlert: "Mise à jour sécurisée active sur l'environnement de production."
    }
  },

  de: {
    backToWorks: "Zurück zu Arbeiten",
    operatorBadge: "DEMO-BEDIENER",
    guestClient: "Gast-Kunde",
    freeExploreMode: "Freier Erkundungsmodus",
    timeZoneBadge: "BOG · GMT-5",
    supportDirect: "Direkter Entwickler-Support",
    requestThisCore: "Dieses Core anfordern",

    tabs: {
      pipeline: "Pipeline & Metriken",
      demo_factory: "Demo-Fabrik & Abschlüsse",
      calendar: "Atomarer Kalender",
      bot_training: "WhatsApp KI-Agent",
      universal_cms: "Universal-CMS",
      settings: "Sicherheit & Zugangsdaten"
    },

    pipeline: {
      kpiActiveLeads: "Aktive Leads",
      kpiActiveDesc: "Echtzeit-Pipeline",
      kpiScheduledDemos: "Geplante Demos",
      kpiScheduledDesc: "50% Konversionsrate",
      kpiOpenProposals: "Offene Angebote",
      kpiOpenDesc: "In Verhandlung",
      kpiSimulatedRevenue: "Simulierter Pipeline-Wert",
      kpiSimulatedDesc: "Gesamtwert der Deals",
      kanbanTitle: "Leads Kanban-Board",
      addLeadBtn: "+ Test-Lead hinzufügen",
      col1: "1. Qualifizierung",
      col2: "2. Demonstration",
      col3: "3. Angebot",
      col4: "4. Gewonnen",
      emptyCol: "Keine Leads in dieser Phase",
      advanceBtn: "Vorziehen →",
      advanceTooltip: "Klicken, um Deal-Phase vorzuziehen"
    },

    demoFactory: {
      title: "Individueller Demo-Link-Generator",
      clientNameLabel: "Kundenname / Marke",
      clientNamePlaceholder: "z.B. Natur-Resort Alpenblick",
      sectorLabel: "Branche / Betriebsmodul",
      sectorHotel: "Hotellerie & Glamping (Direktbuchung + PMS)",
      sectorGastro: "Gastrobar & Restaurant (QR-Menü + KDS)",
      sectorClinic: "Ästhetische Klinik (Visuelles Triage)",
      sectorBrand: "Persönliche Marke / Beratung (Signatur-Funnel)",
      generateBtn: "Demo-Link generieren",
      readyLabel: "Demo-Link erstellt:",
      copyBtn: "Kopieren",
      copiedBtn: "Kopiert!"
    },

    calendar: {
      title: "Wöchentliche Verfügbarkeitsmatrix",
      hint: "Klicken Sie auf ein Feld, um es zu sperren/freizugeben",
      scheduleHeader: "Uhrzeit",
      days: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      dayKeys: ["Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      available: "+ Verfügbar",
      bookedDefault: "Gesperrter Termin"
    },

    bot: {
      title: "System-Prompt-Training",
      promptLabel: "Hauptanweisung des Agenten",
      saveParamsBtn: "Parameter speichern",
      savedAlert: "Agenten-Anweisung lokal gespeichert.",
      agentName: "Autonomer Test-Agent",
      agentStatus: "● Online und antwortbereit",
      inputPlaceholder: "Testnachricht eingeben...",
      sendBtn: "Senden",
      defaultPrompt: "Sie sind der offizielle Assistent von Dynamind Studios. Ihr Ziel ist es, Kunden für souveräne Softwareentwicklung zu qualifizieren, deren Engpass (D0) zu identifizieren und ein Gespräch mit Juan Pablo zu vereinbaren.",
      initialUserMsg: "Hallo, entwickeln Sie Software für die Direktbuchung von Ferienhäusern?",
      initialBotMsg: "Hallo! 🌲 Ja, wir entwickeln Direktbuchungs-Engines und PMS mit atomarem Kalender und Anzahlungsfunktion. Wie viele Einheiten betreiben Sie derzeit?",
      botReplyPrefix: "Verstanden. Für",
      botReplySuffix: "implementieren wir eine souveräne Architektur in React und Supabase mit direkter Bankkonto-Auszahlung. Möchten Sie eine 45-Sekunden-Diagnose vereinbaren?"
    },

    cms: {
      title: "Website-Inhaltsverwaltung",
      heroTitleLabel: "Haupt-Hero-Titel",
      heroSubtitleLabel: "Beschreibender Untertitel",
      saveBtn: "Änderungen speichern",
      savedToast: "✓ Änderungen in Echtzeit gespeichert."
    },

    settings: {
      title: "Einstellungen der Hauptzugangsdaten",
      userLabel: "Administrator-Benutzername",
      passLabel: "Simuliertes aktuelles Passwort",
      updateBtn: "Zugangsdaten aktualisieren",
      updateAlert: "Passwortaktualisierung im produktiven Bunkersystem aktiv."
    }
  },

  pt: {
    backToWorks: "Voltar para Obras",
    operatorBadge: "OPERADOR DEMO",
    guestClient: "Cliente Convidado",
    freeExploreMode: "Modo Exploração Livre",
    timeZoneBadge: "BOG · GMT-5",
    supportDirect: "Suporte Direto",
    requestThisCore: "Solicitar este Core",

    tabs: {
      pipeline: "Pipeline & Métricas",
      demo_factory: "Fábrica de Demos",
      calendar: "Calendário Atômico",
      bot_training: "Agente WhatsApp IA",
      universal_cms: "CMS Universal",
      settings: "Segurança & Chaves"
    },

    pipeline: {
      kpiActiveLeads: "Leads Ativos",
      kpiActiveDesc: "Pipeline em tempo real",
      kpiScheduledDemos: "Demos Agendadas",
      kpiScheduledDesc: "50% Taxa de avanço",
      kpiOpenProposals: "Propostas Abertas",
      kpiOpenDesc: "Em negociação",
      kpiSimulatedRevenue: "Faturamento Simulado",
      kpiSimulatedDesc: "Valor de carteira",
      kanbanTitle: "Quadro Kanban de Oportunidades",
      addLeadBtn: "+ Adicionar Lead de Teste",
      col1: "1. Qualificação",
      col2: "2. Demonstração",
      col3: "3. Proposta",
      col4: "4. Fechado",
      emptyCol: "Nenhum lead nesta etapa",
      advanceBtn: "Avançar →",
      advanceTooltip: "Clique para avançar de etapa"
    },

    demoFactory: {
      title: "Gerador de Demos Personalizadas",
      clientNameLabel: "Nome do Cliente / Marca",
      clientNamePlaceholder: "Ex: Pousada Vista da Serra",
      sectorLabel: "Setor / Módulo Operacional",
      sectorHotel: "Hotelaria & Glamping (Motor de Reservas + PMS)",
      sectorGastro: "Gastrobar & Restaurante (Cardápio QR + KDS)",
      sectorClinic: "Clínica Estética (Triagem Visual)",
      sectorBrand: "Marca Pessoal / Consultoria (Funil de Autor)",
      generateBtn: "Gerar Link de Demonstração",
      readyLabel: "Link de Demonstração Pronto:",
      copyBtn: "Copiar",
      copiedBtn: "Copiado!"
    },

    calendar: {
      title: "Matriz Semanal de Agendamentos",
      hint: "Clique em qualquer horário para bloquear ou liberar",
      scheduleHeader: "Horário",
      days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayKeys: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      available: "+ Disponível",
      bookedDefault: "Horário Bloqueado"
    },

    bot: {
      title: "Treinamento do Prompt do Sistema",
      promptLabel: "Instrução Mestra do Agente",
      saveParamsBtn: "Salvar Parâmetros",
      savedAlert: "Instruções do agente salvas localmente.",
      agentName: "Agente Autônomo de Teste",
      agentStatus: "● Online e respondendo",
      inputPlaceholder: "Digite uma mensagem de teste...",
      sendBtn: "Enviar",
      defaultPrompt: "Você é o assistente oficial da Dynamind Studios. Seu objetivo é qualificar clientes para desenvolvimento de software soberano, detectar o gargalo operacional (D0) e agendar conversa com Juan Pablo.",
      initialUserMsg: "Olá! Gostaria de saber se vocês constroem software para reservas de chalés.",
      initialBotMsg: "Olá! 🌲 Sim, construímos o Motor de Reservas Diretas e PMS com calendário atômico e antecipação de 50%. Quantos chalés você opera atualmente?",
      botReplyPrefix: "Entendido. Para",
      botReplySuffix: "implementamos uma arquitetura soberana em React e Supabase com repasse direto para sua conta bancária. Deseja agendar um diagnóstico de 45 segundos?"
    },

    cms: {
      title: "Gestão de Conteúdos do Site",
      heroTitleLabel: "Título Hero Principal",
      heroSubtitleLabel: "Subtítulo Descritivo",
      saveBtn: "Salvar Alterações (Local-First)",
      savedToast: "✓ Alterações salvas em tempo real."
    },

    settings: {
      title: "Configuração de Credenciais Mestras",
      userLabel: "Usuário Administrador",
      passLabel: "Senha Atual Simulada",
      updateBtn: "Atualizar Credenciais",
      updateAlert: "Atualização de senha habilitada no painel de produção."
    }
  },

  ja: {
    backToWorks: "制作事例に戻る",
    operatorBadge: "デモオペレーター",
    guestClient: "ゲストクライアント",
    freeExploreMode: "自由探索モード",
    timeZoneBadge: "BOG · GMT-5",
    supportDirect: "エンジニアリング直通サポート",
    requestThisCore: "このコアを導入する",

    tabs: {
      pipeline: "パイプライン & メトリクス",
      demo_factory: "デモファクトリー",
      calendar: "アトミックカレンダー",
      bot_training: "WhatsApp AIエージェント",
      universal_cms: "ユニバーサルCMS",
      settings: "セキュリティ & 認証情報"
    },

    pipeline: {
      kpiActiveLeads: "進行中のリード",
      kpiActiveDesc: "リアルタイムパイプライン",
      kpiScheduledDemos: "デモ実施予定",
      kpiScheduledDesc: "50% 進行ペース",
      kpiOpenProposals: "提示中のお見積り",
      kpiOpenDesc: "商談進行中",
      kpiSimulatedRevenue: "シミュレーション総額",
      kpiSimulatedDesc: "パイプライン評価額",
      kanbanTitle: "リード管理 カンバンボード",
      addLeadBtn: "+ テストリードを追加",
      col1: "1. 資格判定",
      col2: "2. デモ実施",
      col3: "3. 提案中",
      col4: "4. 成約完了",
      emptyCol: "このステージの案件はありません",
      advanceBtn: "進行 →",
      advanceTooltip: "クリックして次のステージに進める"
    },

    demoFactory: {
      title: "個別デモリンク自動生成",
      clientNameLabel: "クライアント名 / ブランド",
      clientNamePlaceholder: "例: 富士山ビュー グランピング",
      sectorLabel: "業種 / 業務モジュール",
      sectorHotel: "ホテル・グランピング（直接予約エンジン + PMS）",
      sectorGastro: "レストラン・バー（QR注文 + 厨房KDS）",
      sectorClinic: "美容クリニック（視覚トリアージ + 診断）",
      sectorBrand: "個人ブランド・コンサル（独自ファネル）",
      generateBtn: "デモリンクを発行",
      readyLabel: "デモリンクが完成しました:",
      copyBtn: "コピー",
      copiedBtn: "コピー完了!"
    },

    calendar: {
      title: "週間アポイント ＆ 予約状況マトリクス",
      hint: "時間枠をクリックして予約ブロック/解除を切り替え",
      scheduleHeader: "時間帯",
      days: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
      dayKeys: ["月", "火", "水", "木", "金", "土"],
      available: "+ 予約可能",
      bookedDefault: "予約枠ロック"
    },

    bot: {
      title: "システムプロンプトの調整",
      promptLabel: "AIエージェントへの基本指示",
      saveParamsBtn: "設定を保存",
      savedAlert: "指示内容をローカルに保存しました。",
      agentName: "自律型テストエージェント",
      agentStatus: "● オンライン応答中",
      inputPlaceholder: "テストメッセージを入力...",
      sendBtn: "送信",
      defaultPrompt: "あなたはDynamind Studiosの公式アシスタントです。主権型ソフトウェア開発の見込み客を適格判定し、業務ボトルネック（D0）を特定してJuan Pabloとの相談を予約することが目的です。",
      initialUserMsg: "こんにちは。ヴィラの直販予約ソフトウェアを開発していただけますか？",
      initialBotMsg: "こんにちは！🌲 はい、アトミックカレンダーと事前デポジット決済を備えた直接予約エンジンとPMSを開発しています。現在何棟の客室を運営されていますか？",
      botReplyPrefix: "承知いたしました。",
      botReplySuffix: "向けに、手数料ゼロで銀行口座へ直接入金されるReact/Supabase主権アーキテクチャをご提案します。45秒の無料診断をご希望ですか？"
    },

    cms: {
      title: "ウェブサイト文言のリアルタイム管理",
      heroTitleLabel: "メイン見出し (Hero Title)",
      heroSubtitleLabel: "説明用サブタイトル",
      saveBtn: "変更を保存 (Local-First)",
      savedToast: "✓ リアルタイムに変更が反映されました。"
    },

    settings: {
      title: "マスター認証情報の設定",
      userLabel: "管理者ユーザー名",
      passLabel: "シミュレーション現在のパスワード",
      updateBtn: "認証情報を更新",
      updateAlert: "パスワード更新機能は本番環境で有効です。"
    }
  }
};
