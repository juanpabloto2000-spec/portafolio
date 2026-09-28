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
      clinic: 'クリニックや著者ブランド向けには、45秒ビジュアルトリアージを構築。価格だけを聞く冷やかしを自動スクリーニングし、真剣度の高いお客様のみを予約へと導きます。',
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

  // Inicializar o resetear conversación cuando cambia el idioma
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: strings.welcome
      }
    ]);
  }, [currentLang]);

  // Precargar las voces del sintetizador
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

  // Función de Síntesis de Voz Humana, Natural y Multilingüe
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

    // CALIBRACIÓN ACÚSTICA HUMANA Y NATURAL (Anti-Robótica):
    // Pitch 1.0 (tono natural de la actriz de voz, CERO efecto ardilla/metálico)
    // Rate 0.96 (cadencia tranquila, reflexiva y articulada)
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

  // Detener voz si se cierra el modal
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
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

    if (
      q.includes('gastro') || q.includes('restauran') || q.includes('bar') || 
      q.includes('mesa') || q.includes('table') || q.includes('food') || 
      q.includes('comida') || q.includes('essen') || q.includes('飲食')
    ) {
      reply = strings.answers.gastro;
    } else if (
      q.includes('glamping') || q.includes('booking') || q.includes('hotel') || 
      q.includes('cabaña') || q.includes('cabin') || q.includes('reserva') || 
      q.includes('hospedaje') || q.includes('zimmer') || q.includes('chambre') || q.includes('宿泊')
    ) {
      reply = strings.answers.hotel;
    } else if (
      q.includes('clínic') || q.includes('clinic') || q.includes('curios') || 
      q.includes('whatsapp') || q.includes('cita') || q.includes('lead') || 
      q.includes('termin') || q.includes('rendez-vous') || q.includes('クリニック')
    ) {
      reply = strings.answers.clinic;
    } else if (
      q.includes('tiempo') || q.includes('tarda') || q.includes('plazo') || 
      q.includes('time') || q.includes('delivery') || q.includes('délai') || 
      q.includes('dauer') || q.includes('prazo') || q.includes('納期')
    ) {
      reply = strings.answers.time;
    }

    setMessages(prev => [...prev, userMsg, { sender: 'ai', text: reply }]);
    setInputText('');

    // Reproducir con voz natural en el idioma de la página
    speakText(reply);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
      if (lastAiMessage) {
        speakText(lastAiMessage.text);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className={`relative w-full max-w-xl border rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] backdrop-blur-2xl transition-colors duration-300 ${
        isLight 
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-indigo-500/10' 
          : 'bg-[#080b13]/98 border-white/15 text-white glow-card'
      }`}>
        
        {/* Cabecera Limpia del Asistente AURA */}
        <div className={`flex items-center justify-between border-b pb-4 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          <div className="flex items-center gap-3">
            
            {/* Cara de la Androide AURA hablando en vivo (Desencapsulada, sin círculo) */}
            <AndroidVoiceAvatar size="md" isSpeaking={isSpeaking} />

            <div>
              <div className={`font-display font-bold text-lg tracking-wider flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>{strings.title}</span>
                {isSpeaking && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 animate-pulse">
                    {strings.badgeSpeaking}
                  </span>
                )}
              </div>
              <p className={`text-[11px] font-mono ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}>{strings.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón de Control de Voz Femenina Natural (Mute / Unmute) */}
            <button
              onClick={toggleVoice}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                isVoiceActive
                  ? (isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-sm' : 'bg-cyan-950/60 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]')
                  : (isLight ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-black' : 'bg-white/[0.03] border-white/10 text-zinc-500 hover:text-white')
              }`}
              title={isVoiceActive ? 'Silenciar voz natural' : 'Activar voz natural'}
              aria-label="Alternar voz de AURA"
            >
              {isVoiceActive ? (
                <>
                  <Volume2 className={`w-4 h-4 ${isLight ? 'text-indigo-600' : 'text-cyan-400'}`} />
                  {isSpeaking && (
                    <span className="flex items-center gap-0.5 h-3">
                      <span className={`w-0.5 h-2.5 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} style={{ animationDelay: '0ms' }} />
                      <span className={`w-0.5 h-3 rounded-full animate-bounce ${isLight ? 'bg-indigo-400' : 'bg-cyan-300'}`} style={{ animationDelay: '150ms' }} />
                      <span className={`w-0.5 h-2 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-cyan-400'}`} style={{ animationDelay: '300ms' }} />
                    </span>
                  )}
                </>
              ) : (
                <VolumeX className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
              )}
            </button>

            {/* Botón Cerrar */}
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
        </div>

        {/* Zona de Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <AndroidVoiceAvatar 
                  size="sm" 
                  isSpeaking={isSpeaking && idx === messages.length - 1} 
                  className="mt-0.5" 
                />
              )}
              <div
                className={`p-4 rounded-2xl max-w-[85%] leading-relaxed relative group ${
                  m.sender === 'user'
                    ? (isLight ? 'bg-indigo-600 text-white font-medium' : 'bg-white text-black font-medium')
                    : (isLight ? 'bg-slate-100/90 border border-slate-200 text-slate-800 whitespace-pre-line' : 'bg-white/[0.04] border border-white/10 text-zinc-200 whitespace-pre-line')
                }`}
              >
                {/* Texto del Mensaje */}
                <div>{m.text}</div>

                {/* Botón táctil para volver a escuchar el mensaje de Aura */}
                {m.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => speakText(m.text)}
                    className={`mt-2.5 pt-1.5 border-t flex items-center gap-1.5 text-[11px] font-sans transition-colors cursor-pointer ${
                      isLight ? 'border-slate-200 text-indigo-600 hover:text-indigo-700' : 'border-white/10 text-cyan-400/90 hover:text-cyan-300'
                    }`}
                    title="Escuchar a Aura"
                    aria-label="Escuchar mensaje de Aura"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{strings.listenBtn}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prompts Rápidos Sugeridos Dinámicos en el Idioma de la Página */}
        <div className={`space-y-1.5 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div className={`text-[10px] font-mono uppercase ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{strings.promptsLabel}</div>
          <div className="flex flex-wrap gap-1.5">
            {strings.prompts.map((qp, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSendQuery(qp.query)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer text-left ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-black' 
                    : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de Entrada y Enlace a Diagnóstico */}
        <div className="space-y-3 pt-1">
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
              className={`flex-1 px-4 py-3 border rounded-xl text-xs font-mono focus:outline-none transition-colors ${
                isLight 
                  ? 'bg-slate-100/90 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500' 
                  : 'bg-white/[0.03] border-white/15 text-white placeholder:text-zinc-500 focus:border-cyan-400/60'
              }`}
            />
            <button
              type="submit"
              className={`p-3 rounded-xl transition-colors cursor-pointer ${
                isLight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-black hover:bg-zinc-200'
              }`}
              aria-label="Enviar pregunta a Aura"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className={`flex items-center justify-between text-[11px] font-mono pt-1 ${
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
  );
}
