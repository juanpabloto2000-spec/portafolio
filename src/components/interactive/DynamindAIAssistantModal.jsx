import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import AndroidVoiceAvatar from './AndroidVoiceAvatar';

// --------------------------------------------------------------------------
// DICCIONARIO MULTILINGÜE DE AUTOR PARA AURA
// --------------------------------------------------------------------------
const AURA_I18N = {
  es: {
    locale: 'es-ES',
    title: 'AURA',
    badgeSpeaking: 'HABLANDO...',
    subtitle: 'Inteligencia de Arquitectura & Diagnóstico',
    welcome: '¡Hola! Soy Aura, tu asistente de ingeniería y arquitectura en Dynamind Studios. 🔮\n\nEstoy entrenada para diagnosticar los cuellos de botella de tu negocio (Gastrobar, Glamping, Clínica o Marca Personal) y recomendarte la plataforma exacta que necesitas. ¿En qué te puedo asesorar hoy?',
    promptsLabel: 'Consultas frecuentes para Aura:',
    prompts: [
      { label: '🍽️ ¿Qué solución hay para un Gastrobar?', query: '¿Qué solución tienen para un restaurante o gastrobar con demoras en mesa?' },
      { label: '🏨 ¿Cómo eliminar comisiones de Booking?', query: 'Tengo un glamping o cabañas, ¿cómo puedo cobrar anticipos y reservas directas sin intermediarios?' },
      { label: '💎 ¿Cómo retener y fidelizar clientes?', query: '¿Cómo funciona su sistema de fidelización, puntos y membresías VIP?' },
      { label: '💆‍♀️ ¿Cómo filtrar curiosos en clínicas?', query: 'Tengo una clínica o marca personal, ¿cómo filtro curiosos de WhatsApp?' },
      { label: '⚡ ¿Cuánto tarda la entrega?', query: '¿Cuál es el tiempo de desarrollo e implementación de una plataforma completa?' }
    ],
    placeholder: 'Pregúntale a Aura sobre cuellos de botella de tu negocio...',
    listenBtn: 'Escuchar respuesta',
    preferHuman: '¿Prefieres atención con Juan Pablo?',
    ctaDiagnostic: 'Ir al Diagnóstico (45s)',
    answers: {
      gastro: 'Para gastronomía y bares implementamos nuestro Menú Táctil QR en Mesa junto con Comandas KDS y Caja en Vivo. El comensal pide desde su celular, la orden entra a cocina con semáforo de tiempos y el pago se procesa sin comisiones del 20% a apps externas. Esto eleva el ticket promedio hasta un 25%.',
      hotel: 'Para hospedajes eliminamos intermediarios con el Motor de Reservas Directas, Calendario Atómico y Anticipo del 50%. El cliente reserva su fecha en vivo, se bloquean las suites automáticamente y el dinero entra directo a tu cuenta de banco, ahorrándote miles de dólares en comisiones a Booking o Airbnb.',
      loyalty: 'Para retención y fidelización desplegamos nuestro sistema de puntos por consumo, membresías VIP escalonadas y billetera digital en WhatsApp. El cliente acumula saldo en cada visita sin descargar aplicaciones y el sistema reactiva automáticamente a clientes inactivos tras 30 días, triplicando la recompra sin regalar descuentos.',
      clinic: 'Para clínicas y marcas personales desplegamos el Triaje Visual de 45 segundos con odómetro de fricción. En lugar de pasar horas chateando con personas que solo preguntan precios, el sistema califica el interés y solo agenda llamadas con clientes verdaderamente cualificados.',
      time: 'Construimos e implementamos plataformas completas en un promedio de 10 a 18 días hábiles, con código nativo en React 18, Vite y Tailwind, incluyendo el Core Administrativo privado y capacitación personalizada para todo tu equipo.',
      general: 'En Dynamind Studios construimos software soberano a la medida que elimina cuellos de botella reales: overbooking, saturación en WhatsApp, descuadres de caja o folletos mudos. Te sugiero iniciar el Diagnóstico de 45 segundos para estructurar tu solución directamente con Juan Pablo.'
    }
  },
  en: {
    locale: 'en-US',
    title: 'AURA',
    badgeSpeaking: 'SPEAKING...',
    subtitle: 'Architecture & Diagnostic Intelligence',
    welcome: 'Hello! I am Aura, your engineering and architecture assistant at Dynamind Studios. 🔮\n\nI am trained to diagnose real operational bottlenecks in your business (Gastrobar, Glamping, Clinic, or Personal Brand) and recommend the exact software platform you need. How can I guide you today?',
    promptsLabel: 'Frequent questions for Aura:',
    prompts: [
      { label: '🍽️ Solution for Gastrobars?', query: 'What solution do you offer for a restaurant or bar with ordering delays?' },
      { label: '🏨 Eliminate Booking fees?', query: 'I run a glamping or resort, how can I accept direct bookings without commission fees?' },
      { label: '💎 Loyalty & VIP Retention?', query: 'How does your loyalty, point accumulation and VIP membership system work?' },
      { label: '💆‍♀️ Filter unqualified leads?', query: 'I have a clinic or brand, how do I stop wasting hours on WhatsApp price shoppers?' },
      { label: '⚡ Delivery timeframe?', query: 'How long does development and deployment take?' }
    ],
    placeholder: 'Ask Aura about your business bottlenecks...',
    listenBtn: 'Listen to answer',
    preferHuman: 'Prefer a 1-on-1 strategy session with Juan Pablo?',
    ctaDiagnostic: 'Start Diagnostic (45s)',
    answers: {
      gastro: 'For gastronomy and bars, we deploy our Tabletop QR Interactive Menu paired with Kitchen KDS and Live Cash Register. Guests order instantly from their smartphones, kitchen tickets display real-time prep timers, and payments process directly without 20% aggregator fees. This increases average order value by up to 25%.',
      hotel: 'For hospitality, we eliminate third-party commissions using our Direct Booking Engine, Atomic Availability Calendar, and 50% automated deposit checkout. Rooms lock in real time, funds transfer straight to your bank account, saving you thousands on Booking and Airbnb fees.',
      loyalty: 'For customer retention, we deploy sovereign point accumulation, tiered VIP memberships, and 1-tap WhatsApp digital wallets. Clients earn rewards on every visit without installing heavy apps, while smart triggers reactivate inactive buyers after 30 days.',
      clinic: 'For specialized clinics and personal brands, we build a 45-second Visual Triage Funnel. Instead of losing hours chatting with casual price shoppers on WhatsApp, the system pre-qualifies intent and books appointments only with high-value clients.',
      time: 'We design, code, and deploy complete living platforms within 10 to 18 business days using native React 18, Vite, and Tailwind, including a private operational core dashboard and full team training.',
      general: 'At Dynamind Studios we engineer custom sovereign software solving actual bottlenecks: overbooking, endless manual WhatsApp inquiries, cash register discrepancies, or lifeless brochure websites. I recommend taking the 45-second Diagnostic to structure your project directly with Juan Pablo.'
    }
  },
  fr: {
    locale: 'fr-FR',
    title: 'AURA',
    badgeSpeaking: 'PARLE...',
    subtitle: 'Intelligence d\'Architecture & Diagnostic',
    welcome: 'Bonjour ! Je suis Aura, votre assistante en ingénierie logicielle chez Dynamind Studios. 🔮\n\nJe suis entraînée pour diagnostiquer les goulots d\'étranglement de votre activité (Gastrobar, Glamping, Clinique ou Marque d\'Auteur) et vous conseiller la plateforme logicielle idéale. En quoi puis-je vous éclairer aujourd\'hui ?',
    promptsLabel: 'Questions fréquentes pour Aura :',
    prompts: [
      { label: '🍽️ Solution pour Restaurant / Bar ?', query: 'Quelle solution pour un restaurant ou bar avec des retards de service ?' },
      { label: '🏨 Supprimer commissions Booking ?', query: 'J\'ai un glamping, comment encaisser des réservations directes sans commissions ?' },
      { label: '💎 Fidélisation & Membres VIP ?', query: 'Comment fonctionne votre système de fidélisation, points et adhésions VIP ?' },
      { label: '💆‍♀️ Filtrer les curieux sur WhatsApp ?', query: 'J\'ai une clinique ou marque, comment filtrer les demandes stériles ?' },
      { label: '⚡ Délai de livraison ?', query: 'Quel est le temps de développement et de mise en production ?' }
    ],
    placeholder: 'Posez une question à Aura sur vos processus...',
    listenBtn: 'Écouter la réponse',
    preferHuman: 'Préférez-vous un échange direct avec Juan Pablo ?',
    ctaDiagnostic: 'Démarrer le Diagnostic (45s)',
    answers: {
      gastro: 'Pour la gastronomie et les bars, nous intégrons notre Menu QR Tactile à table couplé aux commandes KDS en cuisine et à la caisse en direct. Le client commande depuis son mobile, la cuisine gère les priorités en temps réel et le paiement s\'effectue sans commissions de 20% reversées aux plateformes tierces.',
      hotel: 'Pour l\'hôtellerie, nous supprimons les intermédiaires grâce à notre Moteur de Réservation Directe avec calendrier atomique et acompte de 50%. Les disponibilités se bloquent instantanément et les fonds arrivent directement sur votre compte bancaire.',
      loyalty: 'Pour la rétention et la fidélisation, nous déployons un système de points par consommation, des abonnements VIP et un portefeuille numérique sur WhatsApp sans application à télécharger.',
      clinic: 'Pour les cliniques esthétiques et marques d\'auteur, nous déployons un Triage Visuel de 45 secondes. Au lieu d\'échanger des heures sur WhatsApp avec de simples curieux, le système qualifie l\'intérêt et ne planifie des appels qu\'avec des prospects sérieux.',
      time: 'Nous concevons et déployons des plateformes complètes en 10 à 18 jours ouvrés en code React natif, avec tableau de bord opérationnel privé et formation complète de vos équipes.',
      general: 'Chez Dynamind Studios, nous bâtissons des logiciels souverains qui éliminent les frictions opérationnelles réelles. Je vous invite à lancer le Diagnostic de 45 secondes pour définir votre architecture avec Juan Pablo.'
    }
  },
  de: {
    locale: 'de-DE',
    title: 'AURA',
    badgeSpeaking: 'SPRICHT...',
    subtitle: 'Architektur- & Diagnose-Intelligenz',
    welcome: 'Hallo! Ich bin Aura, Ihre Architektur- und Software-Assistentin bei Dynamind Studios. 🔮\n\nIch bin darauf spezialisiert, operative Engpässe in Ihrem Unternehmen (Gastronomie, Glamping, Klinik oder Autorenmarke) zu analysieren und die exakte Systemlösung zu empfehlen. Wie kann ich Sie heute beraten?',
    promptsLabel: 'Häufige Fragen an Aura:',
    prompts: [
      { label: '🍽️ Lösung für Gastronomie / Bar?', query: 'Welche Lösung bieten Sie für ein Restaurant mit Bestellverzögerungen?' },
      { label: '🏨 Booking-Gebühren vermeiden?', query: 'Ich betreibe ein Glamping, wie kann ich Direktbuchungen ohne Provisionen annehmen?' },
      { label: '💎 Treuesystem & VIP-Punkte?', query: 'Wie funktioniert Ihr System für Kundenbindung, Punkte und VIP-Mitgliedschaften?' },
      { label: '💆‍♀️ Zeitfresser in WhatsApp stoppen?', query: 'Wie filtere ich unqualifizierte Preisanfragen bei einer Klinik oder Marke?' },
      { label: '⚡ Lieferzeit?', query: 'Wie lange dauert die vollständige Entwicklung und Implementierung?' }
    ],
    placeholder: 'Fragen Sie Aura nach Lösungen für Ihr Unternehmen...',
    listenBtn: 'Antwort anhören',
    preferHuman: 'Möchten Sie eine persönliche Strategiesitzung mit Juan Pablo?',
    ctaDiagnostic: 'Diagnose starten (45s)',
    answers: {
      gastro: 'Für Gastronomie und Bars implementieren wir unsere interaktive QR-Tischkarte in Verbindung mit Küchen-KDS und Schichtkassenbuch. Gäste bestellen direkt über ihr Smartphone, Küchenbestellungen erhalten automatisierte Zeiterfassung und Zahlungen erfolgen ohne 20% Plattformgebühren.',
      hotel: 'Für Hotellerie und Glamping beseitigen wir Zwischenhändler durch eine Direktbuchungs-Engine mit atomarem Verfügbarkeitskalender und 50% Anzahlungs-Checkout. Zimmer blockieren in Echtzeit und Einnahmen landen direkt auf Ihrem Bankkonto.',
      loyalty: 'Für Kundenbindung bieten wir ein punktebasiertes Treuesystem, VIP-Mitgliedschaften und eine WhatsApp-Wallet ohne zusätzliche App-Downloads.',
      clinic: 'Für Kliniken und persönliche Marken erstellen wir ein 45-Sekunden-Qualifizierungs-Funnel. Anstatt Stunden mit reinen Preisanfragen auf WhatsApp zu vergeuden, filtert das System automatisch und vergibt Termine nur an qualifizierte Interessenten.',
      time: 'Wir entwickeln und implementieren vollständige Systeme innerhalb von 10 bis 18 Werktagen in nativem React 18, Vite und Tailwind, inklusive privatem Admin-Bunker und Team-Schulung.',
      general: 'Bei Dynamind Studios entwickeln wir maßgeschneiderte souveräne Software, die reale operative Hürden beseitigt: Überbuchungen, Chat-Fluten oder Kassenfehler. Starten Sie jetzt die 45-Sekunden-Diagnose mit Juan Pablo.'
    }
  },
  pt: {
    locale: 'pt-BR',
    title: 'AURA',
    badgeSpeaking: 'FALANDO...',
    subtitle: 'Inteligência de Arquitetura & Diagnóstico',
    welcome: 'Olá! Eu sou Aura, sua assistente de arquitetura e engenharia na Dynamind Studios. 🔮\n\nFui treinada para diagnosticar os gargalos do seu negócio (Gastrobar, Glamping, Clínica ou Marca Pessoal) e recomendar a plataforma exata de que você precisa. Como posso te orientar hoje?',
    promptsLabel: 'Consultas frequentes para Aura:',
    prompts: [
      { label: '🍽️ Solução para Gastronomia / Bar?', query: 'Qual a solução para restaurante ou bar com lentidão no atendimento?' },
      { label: '🏨 Eliminar taxas do Booking?', query: 'Tenho um glamping, como posso receber reservas diretas sem pagar comissões?' },
      { label: '💎 Retenção & Fidelização VIP?', query: 'Como funciona o sistema de fidelização, pontos e membros VIP?' },
      { label: '💆‍♀️ Filtrar curiosos no WhatsApp?', query: 'Tenho uma clínica ou marca, como parar de perder tempo respondendo curiosos?' },
      { label: '⚡ Prazo de entrega?', query: 'Qual o tempo de desenvolvimento e implementação completa?' }
    ],
    placeholder: 'Pergunte à Aura sobre gargalos do seu negócio...',
    listenBtn: 'Ouvir resposta',
    preferHuman: 'Prefere um bate-papo estratégico com Juan Pablo?',
    ctaDiagnostic: 'Iniciar Diagnóstico (45s)',
    answers: {
      gastro: 'Para gastronomia e bares, implementamos nosso Cardápio QR Interativo na Mesa com KDS de cozinha e Caixa em Tempo Real. O cliente pede pelo celular, os pedidos entram com semáforo de tempo e os pagamentos são processados sem 20% de taxas para aplicativos externos.',
      hotel: 'Para hotelaria e glampings, eliminamos intermediários com Motor de Reservas Diretas, Calendário Atômico e adiantamento de 50%. A acomodação é bloqueada em tempo real e o valor cai direto na sua conta bancária sem comissões do Booking ou Airbnb.',
      loyalty: 'Para retenção e fidelização, oferecemos carteira digital no WhatsApp, acúmulo de pontos por consumo e planos VIP sem necessidade de baixar aplicativos.',
      clinic: 'Para clínicas e marcas de autor, criamos um Triagem Visual de 45 segundos. Em vez de passar o dia respondendo curiosos no WhatsApp, o sistema pré-qualifica o cliente e agenda chamadas apenas com quem realmente tem interesse e orçamento.',
      time: 'Desenvolvemos e entregamos plataformas completas em média de 10 a 18 dias úteis em React 18 nativo, com búnker operacional privativo e treinamento individual para sua equipe.',
      general: 'Na Dynamind Studios construímos software soberano sob medida que elimina gargalos operacionais reais. Recomendo iniciar o Diagnóstico de 45 segundos para desenhar sua solução diretamente com Juan Pablo.'
    }
  },
  ja: {
    locale: 'ja-JP',
    title: 'AURA',
    badgeSpeaking: '音声出力中...',
    subtitle: 'アーキテクチャ＆診断インテリジェンス',
    welcome: 'こんにちは！Dynamind Studiosのエンジニアリング・アーキテクチャ担当AIアシスタント、オーラです。🔮\n\n飲食・ホテル・クリニック・著者ブランドの現場ボトルネックを診断し、最適な生きたソフトウェアをご案内します。本日はどのようなご相談でしょうか？',
    promptsLabel: 'よくあるご相談：',
    prompts: [
      { label: '🍽️ 飲食・ガストロバーの解決策は？', query: '飲食店の注文遅延やオペレーション改善のソリューションは？' },
      { label: '🏨 予約サイトの手数料をなくすには？', query: '宿泊施設でOTA手数料をゼロにして直販予約を受けるには？' },
      { label: '💎 リピート＆VIP会員制度？', query: 'ポイント還元やVIP会員制度、リピート促進システムの仕組みは？' },
      { label: '💆‍♀️ 冷やかし問い合わせを減らすには？', query: 'クリニックや著者ブランドで冷やかしを排除して予約を自動化するには？' },
      { label: '⚡ 開発期間と納期は？', query: '完全なプラットフォームの開発と導入にはどれくらいかかりますか？' }
    ],
    placeholder: 'オーラにビジネスの課題について質問する...',
    listenBtn: '音声を再生',
    preferHuman: '代表のJuan Pabloとの直接相談をご希望ですか？',
    ctaDiagnostic: '診断を開始する (45秒)',
    answers: {
      gastro: '飲食・ガストロバー向けには、テーブルQRモバイルオーダー、厨房KDS、リアルタイム売上レジを統合導入します。お客様がスマホから直接注文し、厨房タイマーと連動。デリバリー等の20%手数料を削減し、客単価を最大25%向上させます。',
      hotel: '宿泊・グランピングでは、自社直販予約エンジン、空室同期カレンダー、事前決済システムを導入。Booking.comなどの巨額手数料を排除し、売上を直接自社口座に確保します。',
      loyalty: '顧客維持とリピート促進のため、利用額に応じたポイント還元、VIP会員制度、アプリ不要のWhatsAppデジタルウォレットを導入します。',
      clinic: 'クリニックや著者ブランド向けには、45秒ビジュアルトリアージを構築。価格だけを聞く冷やかしを自動スクリーニングし、真剣度の高いお客様のみを予約へと导きます。',
      time: 'React 18・Vite・Tailwindネイティブコードにより、プライベート管理ダッシュボードとチーム研修を含め、通常10〜18営業日で本番導入まで完了します。',
      general: 'Dynamind Studiosでは、ダブルブッキングやチャット対応のパンクなど、現場の深刻なボトルネックを解消する主権型ソフトウェアを構築します。まずは45秒診断をお試しください。'
    }
  }
};

/**
 * Selector de Voz Humana Natural de Alta Definición
 * Prioriza voces Neural, Natural, Online y Google del sistema operativo con formantes humanos.
 */
function pickNaturalHumanVoice(langCode) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  const langPrefix = langCode.split('-')[0].toLowerCase();
  const matching = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
  if (!matching.length) return voices[0] || null;

  // Nivel 1: Voces "Natural" / "Neural" / "Online" de Microsoft Edge, Windows 11 o Chrome OS
  const naturalFemale = matching.find(v => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('neural') || name.includes('online');
    const isFemale = name.includes('female') || name.includes('sabina') || name.includes('dalia') || 
                     name.includes('jenny') || name.includes('aria') || name.includes('denise') || 
                     name.includes('katja') || name.includes('francisca') || name.includes('nanami') ||
                     name.includes('elena') || name.includes('monica') || name.includes('paulina') ||
                     name.includes('victoria') || name.includes('samantha') || name.includes('kyoko');
    return isNatural && isFemale;
  });
  if (naturalFemale) return naturalFemale;

  // Nivel 2: Cualquier voz natural/neural para ese idioma
  const anyNatural = matching.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('natural') || name.includes('neural') || name.includes('online');
  });
  if (anyNatural) return anyNatural;

  // Nivel 3: Voces Google de alta fidelidad
  const googleVoice = matching.find(v => v.name.toLowerCase().includes('google'));
  if (googleVoice) return googleVoice;

  // Nivel 4: Voces femeninas tradicionales del sistema
  const femaleVoice = matching.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('female') || name.includes('sabina') || name.includes('monica') || 
           name.includes('elena') || name.includes('lucia') || name.includes('paulina') ||
           name.includes('samantha') || name.includes('victoria') || name.includes('hortense') ||
           name.includes('julie') || name.includes('hedda') || name.includes('maria') || name.includes('kyoko');
  });
  if (femaleVoice) return femaleVoice;

  // Fallback: primera voz coincidente para el idioma
  return matching[0];
}

export default function DynamindAIAssistantModal({ isOpen, onClose }) {
  const { isLight, language } = useThemeLanguage();
  const currentLang = language || 'es';
  const strings = AURA_I18N[currentLang] || AURA_I18N.es;

  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const speechRef = useRef(null);
  const audioRef = useRef(null);

  // Inicializar o resetear conversación cuando cambia el idioma
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: strings.welcome,
        replyKey: 'welcome'
      }
    ]);
  }, [currentLang]);

  // Precargar las voces del sintetizador como fallback
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoicesLoaded(true);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Función de Síntesis de Voz Fallback (Web Speech API)
  const speakText = (textToSpeak) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    if (!isVoiceActive) {
      setIsSpeaking(false);
      return;
    }

    // Limpieza de caracteres y signos fonéticamente disruptivos
    const cleanText = textToSpeak
      .replace(/[*_#`~]/g, '')
      .replace(/[🔮🍽️🏨💆‍♀️⚡💎👀✓✕●•→]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = strings.locale;

    // Seleccionar la mejor voz natural para el idioma actual
    const bestVoice = pickNaturalHumanVoice(strings.locale);
    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang;
    }

    // Calibración acústica humana natural
    utterance.pitch = 1.0;
    utterance.rate = 0.96;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  };

  // Reproductor de Audio Neuronal de Estudio Oficial (Microsoft Azure Neural)
  const playAuraAudio = (audioKey, fallbackText) => {
    // Si la voz está desactivada, silenciar todo y no reproducir
    if (!isVoiceActive) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    // Detener cualquier audio o síntesis previa
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const audioUrl = `/audio/aura/aura_${currentLang}_${audioKey}.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => {
      setIsSpeaking(true);
    };

    audio.onended = () => {
      setIsSpeaking(false);
      audioRef.current = null;
    };

    audio.onerror = () => {
      // Fallback transparente a SpeechSynthesis si el archivo no existe o falla la red
      audioRef.current = null;
      speakText(fallbackText);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        // Bloqueo de autoplay u otro impedimento
        audioRef.current = null;
        speakText(fallbackText);
      });
    }
  };

  // Detener voz si se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const handleSendQuery = (query) => {
    if (!query.trim()) return;

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }

    const userMsg = { sender: 'user', text: query };
    const q = query.toLowerCase();
    let reply = strings.answers.general;
    let replyKey = 'general';

    if (
      q.includes('gastro') || q.includes('restauran') || q.includes('bar') || 
      q.includes('mesa') || q.includes('table') || q.includes('food') || 
      q.includes('comida') || q.includes('essen') || q.includes('飲食')
    ) {
      reply = strings.answers.gastro;
      replyKey = 'gastro';
    } else if (
      q.includes('glamping') || q.includes('booking') || q.includes('hotel') || 
      q.includes('cabaña') || q.includes('cabin') || q.includes('reserva') || 
      q.includes('hospedaje') || q.includes('zimmer') || q.includes('chambre') || q.includes('宿泊')
    ) {
      reply = strings.answers.hotel;
      replyKey = 'hotel';
    } else if (
      q.includes('fideliz') || q.includes('loyalt') || q.includes('punto') || 
      q.includes('puntos') || q.includes('vip') || q.includes('retenc') || 
      q.includes('wallet') || q.includes('billetera') || q.includes('recompra') || 
      q.includes('kundenbindung') || q.includes('リピート')
    ) {
      reply = strings.answers.loyalty;
      replyKey = 'loyalty';
    } else if (
      q.includes('clínic') || q.includes('clinic') || q.includes('curios') || 
      q.includes('whatsapp') || q.includes('cita') || q.includes('lead') || 
      q.includes('termin') || q.includes('rendez-vous') || q.includes('クリニック')
    ) {
      reply = strings.answers.clinic;
      replyKey = 'clinic';
    } else if (
      q.includes('tiempo') || q.includes('tarda') || q.includes('plazo') || 
      q.includes('time') || q.includes('delivery') || q.includes('délai') || 
      q.includes('dauer') || q.includes('prazo') || q.includes('納期')
    ) {
      reply = strings.answers.time;
      replyKey = 'time';
    }

    setMessages(prev => [...prev, userMsg, { sender: 'ai', text: reply, replyKey }]);
    setInputText('');

    // Reproducir con audio neuronal de estudio en el idioma seleccionado
    playAuraAudio(replyKey, reply);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
      if (lastAiMessage) {
        playAuraAudio(lastAiMessage.replyKey || 'general', lastAiMessage.text);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div 
        className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row h-[90vh] max-h-[740px] backdrop-blur-2xl transition-colors duration-300 ${
          isLight 
            ? 'bg-white/95 border-slate-200 text-slate-900 shadow-indigo-500/10' 
            : 'bg-[#060913]/98 border-cyan-500/25 text-white shadow-[0_0_70px_rgba(6,182,212,0.14)]'
        }`}
      >
        
        {/* Fondo Estelar Sutil del Chatbot (Polvo Cósmico & Nebulosa Tenue sin saturar) */}
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Velo de nebulosa etérea */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/[0.05] blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/[0.05] blur-3xl" />
            
            {/* Constelación y micro-estrellas centelleantes estelares tenues */}
            <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Estrellas microscópicas fijas y titilantes */}
              <circle cx="8%" cy="14%" r="1" fill="#ffffff" opacity="0.6" />
              <circle cx="85%" cy="10%" r="1.5" fill="url(#starGlow)" className="animate-pulse" style={{ animationDuration: '4s' }} />
              <circle cx="42%" cy="6%" r="0.8" fill="#a5f3fc" opacity="0.5" />
              <circle cx="94%" cy="40%" r="1" fill="#ffffff" opacity="0.4" />
              <circle cx="5%" cy="70%" r="1.2" fill="url(#starGlow)" className="animate-pulse" style={{ animationDuration: '5.5s' }} />
              <circle cx="78%" cy="80%" r="0.8" fill="#cbd5e1" opacity="0.5" />
              <circle cx="24%" cy="90%" r="1" fill="#38bdf8" opacity="0.6" />
              <circle cx="60%" cy="26%" r="0.8" fill="#ffffff" opacity="0.4" />
              <circle cx="16%" cy="38%" r="1.2" fill="#a5f3fc" opacity="0.5" />
              {/* Líneas tenues de constelación cuántica */}
              <line x1="85%" y1="10%" x2="94%" y2="40%" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.12" />
              <line x1="8%" y1="14%" x2="16%" y2="38%" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.1" />
            </svg>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COLUMNA IZQUIERDA: ESCENARIO HOLOGRÁFICO LIBRE DE AURA (CERO CÍRCULOS/CAJAS) */}
        {/* ========================================================================= */}
        <div className={`relative z-10 w-full sm:w-[310px] md:w-[350px] shrink-0 flex flex-col items-center justify-between p-5 sm:p-6 border-b sm:border-b-0 sm:border-r transition-colors ${
          isLight 
            ? 'border-slate-200 bg-slate-50/70' 
            : 'border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 via-[#060913]/40 to-indigo-950/20'
        }`}>
          {/* Header Superior del Holograma */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isSpeaking ? 'bg-cyan-400' : 'bg-emerald-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isSpeaking ? 'bg-cyan-500' : 'bg-emerald-500'
                }`} />
              </span>
              <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${
                isLight ? 'text-indigo-600' : 'text-cyan-300'
              }`}>
                ✦ AURA · NEURAL CORE
              </span>
            </div>

            {/* Botón cerrar visible en móvil en este bloque */}
            <button
              onClick={onClose}
              className={`sm:hidden p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-black' : 'text-zinc-400 hover:text-white'
              }`}
              aria-label="Cerrar asistente"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Busto Desencapsulado de Medio Cuerpo de AURA (Flotando Libremente en el Espacio) */}
          <div className="relative flex-1 flex items-center justify-center py-2 sm:py-0 w-full overflow-visible">
            <AndroidVoiceAvatar 
              size="hero" 
              isSpeaking={isSpeaking} 
              className="drop-shadow-[0_12px_32px_rgba(6,182,212,0.18)]"
            />
          </div>

          {/* Telemetría y Controles de Audio de AURA */}
          <div className="w-full space-y-3 text-center">
            {/* Pill de Estado Dinámico */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono border transition-all ${
              isSpeaking 
                ? (isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-700 animate-pulse' : 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 animate-pulse')
                : (isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/[0.04] border-white/10 text-zinc-400')
            }`}>
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{isSpeaking ? strings.badgeSpeaking : 'STANDBY · LISTA PARA DIAGNÓSTICO'}</span>
            </div>

            {/* Control de Voz Natural de Estudio con Ecualizador */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={toggleVoice}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-all cursor-pointer flex items-center gap-2 ${
                  isVoiceActive
                    ? (isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-sm' : 'bg-cyan-950/70 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]')
                    : (isLight ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-black' : 'bg-white/[0.03] border-white/10 text-zinc-500 hover:text-white')
                }`}
                title={isVoiceActive ? 'Silenciar voz natural' : 'Activar voz natural'}
                aria-label="Alternar voz de AURA"
              >
                {isVoiceActive ? (
                  <>
                    <Volume2 className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-600' : 'text-cyan-400'}`} />
                    <span>VOZ NATURAL ACTIVA</span>
                    {isSpeaking && (
                      <span className="flex items-center gap-0.5 h-2.5">
                        <span className={`w-0.5 h-2 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} style={{ animationDelay: '0ms' }} />
                        <span className={`w-0.5 h-3 rounded-full animate-bounce ${isLight ? 'bg-indigo-400' : 'bg-cyan-300'}`} style={{ animationDelay: '150ms' }} />
                        <span className={`w-0.5 h-1.5 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <VolumeX className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                    <span>VOZ SILENCIADA</span>
                  </>
                )}
              </button>
            </div>

            <p className={`text-[10px] font-mono hidden sm:block ${
              isLight ? 'text-slate-400' : 'text-zinc-500'
            }`}>
              {strings.subtitle}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMNA DERECHA: CONVERSACIÓN INTERACTIVA & TRIAGE DE ARQUITECTURA         */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex-1 flex flex-col p-5 sm:p-6 overflow-hidden">
          
          {/* Fondo Estelar Dedicado del Chat (Cielo Cósmico con Estrellas Titilantes) */}
          {!isLight && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              <svg className="w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="chatStarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="goldStarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Estrellas Titilantes Distribuidas por el Chat */}
                <circle cx="12%" cy="10%" r="1.2" fill="#ffffff" className="animate-pulse" style={{ animationDuration: '3.2s' }} />
                <circle cx="82%" cy="8%" r="1.8" fill="url(#chatStarGlow)" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
                <circle cx="94%" cy="26%" r="1" fill="#a5f3fc" opacity="0.8" />
                <circle cx="28%" cy="30%" r="1.4" fill="url(#goldStarGlow)" className="animate-pulse" style={{ animationDuration: '5.2s' }} />
                <circle cx="75%" cy="42%" r="2" fill="url(#chatStarGlow)" className="animate-pulse" style={{ animationDuration: '2.8s' }} />
                <circle cx="16%" cy="58%" r="1.1" fill="#ffffff" opacity="0.75" />
                <circle cx="88%" cy="68%" r="1.6" fill="#38bdf8" className="animate-pulse" style={{ animationDuration: '3.8s' }} />
                <circle cx="32%" cy="78%" r="1.2" fill="#cbd5e1" opacity="0.8" />
                <circle cx="68%" cy="86%" r="1.8" fill="url(#chatStarGlow)" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
                <circle cx="8%" cy="88%" r="1" fill="#a5f3fc" opacity="0.7" />

                {/* Estrellas de 4 Puntas Grandes (Sparkles Cuánticos ✦) */}
                <path d="M 50 45 Q 50 55 40 55 Q 50 55 50 65 Q 50 55 60 55 Q 50 55 50 45 Z" fill="#ffffff" opacity="0.75" className="animate-pulse" style={{ animationDuration: '3.8s' }} />
                <path d="M 390 170 Q 390 179 381 179 Q 390 179 390 188 Q 390 179 399 179 Q 390 179 390 170 Z" fill="#38bdf8" opacity="0.7" className="animate-pulse" style={{ animationDuration: '3.2s' }} />
                <path d="M 210 360 Q 210 368 202 368 Q 210 368 210 376 Q 210 368 218 368 Q 210 368 210 360 Z" fill="#a5f3fc" opacity="0.65" className="animate-pulse" style={{ animationDuration: '4.8s' }} />
                <path d="M 110 240 Q 110 246 104 246 Q 110 246 110 252 Q 110 246 116 246 Q 110 246 110 240 Z" fill="#ffffff" opacity="0.6" className="animate-pulse" style={{ animationDuration: '4.2s' }} />

                {/* Constelación Tenue Conectando Estrellas */}
                <line x1="82%" y1="8%" x2="94%" y2="26%" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.25" />
                <line x1="12%" y1="10%" x2="28%" y2="30%" stroke="#818cf8" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.2" />
                <line x1="75%" y1="42%" x2="88%" y2="68%" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.22" />

                {/* Micro-polvo cósmico */}
                <circle cx="48%" cy="16%" r="0.8" fill="#ffffff" opacity="0.45" />
                <circle cx="58%" cy="54%" r="0.7" fill="#38bdf8" opacity="0.5" />
                <circle cx="42%" cy="72%" r="0.8" fill="#ffffff" opacity="0.45" />
                <circle cx="85%" cy="85%" r="0.6" fill="#a5f3fc" opacity="0.4" />
                <circle cx="20%" cy="40%" r="0.7" fill="#ffffff" opacity="0.45" />
              </svg>
            </div>
          )}
          
          {/* Header de la conversación (Desktop) */}
          <div className="relative z-10 hidden sm:flex items-center justify-between pb-3 mb-2 border-b border-white/10">
            <div>
              <h3 className={`font-display font-bold text-base sm:text-lg tracking-wide ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {strings.title} <span className="text-cyan-400 text-sm font-normal">· Asistente Soberano</span>
              </h3>
              <p className={`text-[11px] font-mono ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}>
                {strings.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-black hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              aria-label="Cerrar asistente"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Zona de Mensajes con Scroll Suave */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 text-xs sm:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-[90%] leading-relaxed relative group ${
                    m.sender === 'user'
                      ? (isLight ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'bg-white text-black font-medium shadow-md')
                      : (isLight ? 'bg-slate-100/90 border border-slate-200 text-slate-800' : 'bg-slate-900/60 border border-cyan-500/20 text-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md')
                  }`}
                >
                  {/* Encabezado elegante de mensaje AI */}
                  {m.sender === 'ai' && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-cyan-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>✦ AURA</span>
                        <span className="text-[9px] text-zinc-500">· DYNAMIND AI</span>
                      </div>

                      {/* Botón táctil para volver a escuchar la respuesta */}
                      <button
                        type="button"
                        onClick={() => playAuraAudio(m.replyKey || 'general', m.text)}
                        className={`flex items-center gap-1 text-[10px] font-sans transition-colors cursor-pointer ${
                          isLight ? 'text-indigo-600 hover:text-indigo-700' : 'text-cyan-400/90 hover:text-cyan-300'
                        }`}
                        title="Escuchar a Aura"
                        aria-label="Escuchar mensaje de Aura"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{strings.listenBtn}</span>
                      </button>
                    </div>
                  )}

                  {/* Contenido del Mensaje */}
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Prompts Rápidos Sugeridos Dinámicos */}
          <div className={`space-y-1.5 pt-3 border-t mt-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
            <div className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              {strings.promptsLabel}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {strings.prompts.map((qp, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => handleSendQuery(qp.query)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer text-left ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-black' 
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white hover:border-cyan-400/40'
                  }`}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Formulario de Entrada y Enlace a Diagnóstico */}
          <div className="space-y-2.5 pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={strings.placeholder}
                className={`flex-1 px-4 py-2.5 border rounded-xl text-xs font-mono focus:outline-none transition-colors ${
                  isLight 
                    ? 'bg-slate-100/90 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500' 
                    : 'bg-white/[0.03] border-white/15 text-white placeholder:text-zinc-500 focus:border-cyan-400/60'
                }`}
              />
              <button
                type="submit"
                className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                  isLight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-black hover:bg-zinc-200'
                }`}
                aria-label="Enviar pregunta a Aura"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className={`flex items-center justify-between text-[11px] font-mono ${
              isLight ? 'text-slate-500' : 'text-zinc-400'
            }`}>
              <span>{strings.preferHuman}</span>
              <a
                href="/#/diagnostico"
                onClick={onClose}
                className={`flex items-center gap-1 font-bold underline ${
                  isLight ? 'text-indigo-600 hover:text-indigo-700' : 'text-cyan-400 hover:text-cyan-300'
                }`}
              >
                <span>{strings.ctaDiagnostic}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
