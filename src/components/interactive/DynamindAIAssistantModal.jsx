import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ArrowRight, Volume2, VolumeX, BrainCircuit, Radio } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import AndroidVoiceAvatar from './AndroidVoiceAvatar';
import { reasonAuraQuery } from '../../utils/auraReasoningEngine';

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
      { label: '🍽️ ¿Qué solución hay para un Gastrobar?', query: '¿Qué solución tienen para un restaurante o gastrobar con demoras en mesa?', replyKey: 'gastro' },
      { label: '🏨 ¿Cómo eliminar comisiones de Booking?', query: 'Tengo un glamping o cabañas, ¿cómo puedo cobrar anticipos y reservas directas sin intermediarios?', replyKey: 'hotel' },
      { label: '💎 ¿Cómo retener y fidelizar clientes?', query: '¿Cómo funciona su sistema de fidelización, puntos y membresías VIP?', replyKey: 'loyalty' },
      { label: '💆‍♀️ ¿Cómo filtrar curiosos en clínicas?', query: 'Tengo una clínica o marca personal, ¿cómo filtro curiosos de WhatsApp?', replyKey: 'clinic' },
      { label: '⚡ ¿Cuánto tarda la entrega?', query: '¿Cuál es el tiempo de desarrollo e implementación de una plataforma completa?', replyKey: 'time' }
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
      { label: '🍽️ Solution for Gastrobars?', query: 'What solution do you offer for a restaurant or bar with ordering delays?', replyKey: 'gastro' },
      { label: '🏨 Eliminate Booking fees?', query: 'I run a glamping or resort, how can I accept direct bookings without commission fees?', replyKey: 'hotel' },
      { label: '💎 Loyalty & VIP Retention?', query: 'How does your loyalty, point accumulation and VIP membership system work?', replyKey: 'loyalty' },
      { label: '💆‍♀️ Filter unqualified leads?', query: 'I have a clinic or brand, how do I stop wasting hours on WhatsApp price shoppers?', replyKey: 'clinic' },
      { label: '⚡ Delivery timeframe?', query: 'How long does development and deployment take?', replyKey: 'time' }
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
      { label: '🍽️ Solution pour Restaurant / Bar ?', query: 'Quelle solution pour un restaurant ou bar avec des retards de service ?', replyKey: 'gastro' },
      { label: '🏨 Supprimer commissions Booking ?', query: 'J\'ai un glamping, comment encaisser des réservations directes sans commissions ?', replyKey: 'hotel' },
      { label: '💎 Fidélisation & Membres VIP ?', query: 'Comment fonctionne votre système de fidélisation, points et adhésions VIP ?', replyKey: 'loyalty' },
      { label: '💆‍♀️ Filtrer les curieux sur WhatsApp ?', query: 'J\'ai une clinique ou marque, comment filtrer les demandes stériles ?', replyKey: 'clinic' },
      { label: '⚡ Délai de livraison ?', query: 'Quel est le temps de développement et de mise en production ?', replyKey: 'time' }
    ],
    placeholder: 'Posez une question à Aura sur vos processus...',
    listenBtn: 'Écouter la réponse',
    preferHuman: 'Préférez-vous un échange direct avec Juan Pablo ?',
    ctaDiagnostic: 'Démarrer le Diagnostic (45s)',
    answers: {
      gastro: 'Pour la gastronomie et les bars, nous intégrons notre Menu QR Tactile à table couplé aux commandes KDS en cuisine et à la caisse en direct. Le client commande depuis son mobile, la cuisine gère les priorités en temps réel et le paiement s\'effectue sans commissions de 20% reversées aux plateformes tierces.',
      hotel: 'Pour l\'hôtellerie, nous supprimons les intermédiaires grâce à notre Moteur de Réservation Directe avec calendrier atomique et acompte de 50%. Les disponibilités se bloquent instantanément et les fonds arrivent directamente sur votre compte bancaire.',
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
      { label: '🍽️ Lösung für Gastronomie / Bar?', query: 'Welche Lösung bieten Sie für ein Restaurant mit Bestellverzögerungen?', replyKey: 'gastro' },
      { label: '🏨 Booking-Gebühren vermeiden?', query: 'Ich betreibe ein Glamping, wie kann ich Direktbuchungen ohne Provisionen annehmen?', replyKey: 'hotel' },
      { label: '💎 Treuesystem & VIP-Punkte?', query: 'Wie funktioniert Ihr System für Kundenbindung, Punkte und VIP-Mitgliedschaften?', replyKey: 'loyalty' },
      { label: '💆‍♀️ Zeitfresser in WhatsApp stoppen?', query: 'Wie filtere ich unqualifizierte Preisanfragen bei einer Klinik oder Marke?', replyKey: 'clinic' },
      { label: '⚡ Lieferzeit?', query: 'Wie lange dauert die vollständige Entwicklung und Implementierung?', replyKey: 'time' }
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
      { label: '🍽️ Solução para Gastronomia / Bar?', query: 'Qual a solução para restaurante ou bar com lentidão no atendimento?', replyKey: 'gastro' },
      { label: '🏨 Eliminar taxas do Booking?', query: 'Tenho um glamping, como posso receber reservas diretas sem pagar comissões?', replyKey: 'hotel' },
      { label: '💎 Retenção & Fidelização VIP?', query: 'Como funciona o sistema de fidelização, pontos e membros VIP?', replyKey: 'loyalty' },
      { label: '💆‍♀️ Filtrar curiosos no WhatsApp?', query: 'Tenho uma clínica ou marca, como parar de perder tempo respondendo curiosos?', replyKey: 'clinic' },
      { label: '⚡ Prazo de entrega?', query: 'Qual o tempo de desenvolvimento e implementação completa?', replyKey: 'time' }
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
      { label: '🍽️ 飲食・ガストロバーの解決策は？', query: '飲食店の注文遅延やオペレーション改善のソリューションは？', replyKey: 'gastro' },
      { label: '🏨 予約サイトの手数料をなくすには？', query: '宿泊施設でOTA手数料をゼロにして直販予約を受けるには？', replyKey: 'hotel' },
      { label: '💎 リピート＆VIP会員制度？', query: 'ポイント還元やVIP会員制度、リピート促進システムの仕組みは？', replyKey: 'loyalty' },
      { label: '💆‍♀️ 冷やかし問い合わせを減らすには？', query: 'クリニックや著者ブランドで冷やかしを排除して予約を自動化するには？', replyKey: 'clinic' },
      { label: '⚡ 開発期間と納期は？', query: '完全なプラットフォームの開発と導入にはどれくらいかかりますか？', replyKey: 'time' }
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
 */
function pickNaturalHumanVoice(langCode) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  const langPrefix = langCode.split('-')[0].toLowerCase();
  const matching = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
  if (!matching.length) return voices[0] || null;

  // 1. Voces neuronales y naturales femeninas prioritarias por idioma
  const naturalFemale = matching.find(v => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('neural') || name.includes('online');
    const isFemale = name.includes('female') || name.includes('sabina') || name.includes('dalia') || 
                     name.includes('jenny') || name.includes('aria') || name.includes('denise') || 
                     name.includes('katja') || name.includes('francisca') || name.includes('nanami') ||
                     name.includes('elena') || name.includes('monica') || name.includes('paulina') ||
                     name.includes('victoria') || name.includes('samantha') || name.includes('kyoko') ||
                     name.includes('hortense') || name.includes('julie') || name.includes('marlene') ||
                     name.includes('leticia') || name.includes('raquel') || name.includes('ayumi');
    return isNatural && isFemale;
  });
  if (naturalFemale) return naturalFemale;

  // 2. Cualquier voz natural/neuronal disponible en el idioma
  const anyNatural = matching.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('natural') || name.includes('neural') || name.includes('online');
  });
  if (anyNatural) return anyNatural;

  // 3. Voces de Google de alta síntesis para el idioma
  const googleVoice = matching.find(v => v.name.toLowerCase().includes('google'));
  if (googleVoice) return googleVoice;

  // 4. Voces femeninas estándar del sistema
  const femaleVoice = matching.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('female') || name.includes('sabina') || name.includes('monica') || 
           name.includes('elena') || name.includes('lucia') || name.includes('paulina') ||
           name.includes('samantha') || name.includes('victoria') || name.includes('hortense') ||
           name.includes('julie') || name.includes('hedda') || name.includes('maria') || 
           name.includes('katja') || name.includes('francisca') || name.includes('kyoko') || 
           name.includes('nanami');
  });
  if (femaleVoice) return femaleVoice;

  return matching[0];
}

/**
 * Formateador ligero de texto markdown para respuestas de IA (negritas, cursivas, código inline y viñetas)
 */
function formatMessageContent(text, isLight = false) {
  if (!text) return '';
  const paragraphs = text.split('\n\n');
  return paragraphs.map((paragraph, pIdx) => {
    const lines = paragraph.split('\n');
    return (
      <span key={pIdx} className={pIdx > 0 ? 'block mt-2' : 'block'}>
        {lines.map((line, lIdx) => {
          const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ') || line.trim().startsWith('• ');
          const cleanLine = isBullet ? line.trim().replace(/^[*•-]\s+/, '') : line;
          const parts = cleanLine.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

          const formattedLine = parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={partIdx} className={`italic ${isLight ? 'text-indigo-700' : 'text-purple-300'}`}>
                  {part.slice(1, -1)}
                </em>
              );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={partIdx} className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${
                  isLight 
                    ? 'bg-slate-200 text-indigo-800' 
                    : 'bg-purple-950/70 border border-purple-500/30 text-purple-200'
                }`}>
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          });

          return (
            <span key={lIdx} className={isBullet ? 'flex items-start gap-1.5 my-1 ml-1' : 'block'}>
              {isBullet && <span className="text-purple-400 select-none font-bold shrink-0">•</span>}
              <span>{formattedLine}</span>
            </span>
          );
        })}
      </span>
    );
  });
}

/**
 * 🌌 Canvas de Estrellas Cósmicas Vivas del Chatbot (Inspirado en el Index)
 * 120 estrellas titilantes a 60 FPS con nebulosas en violeta, índigo y azul cian.
 */
function ModalCosmicStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const starCount = 140;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.16,
      speedY: (Math.random() - 0.5) * 0.16,
      baseAlpha: Math.random() * 0.6 + 0.35,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.45 ? '#ffffff' : Math.random() > 0.5 ? '#38bdf8' : Math.random() > 0.3 ? '#c084fc' : '#fbbf24'
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Nebulosa Cósmica 1 (Violeta / Púrpura Imperial)
      const cx1 = width * 0.25 + Math.sin(frame * 0.0018) * (width * 0.06);
      const cy1 = height * 0.35 + Math.cos(frame * 0.0018) * (height * 0.06);
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.45);
      grad1.addColorStop(0, 'rgba(124, 58, 237, 0.14)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Nebulosa Cósmica 2 (Azul Cian Cósmico)
      const cx2 = width * 0.82 + Math.cos(frame * 0.0015) * (width * 0.08);
      const cy2 = height * 0.65 + Math.sin(frame * 0.0015) * (height * 0.08);
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.5);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.10)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Estrellas en movimiento y centelleo
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha = star.baseAlpha + Math.sin(frame * star.pulseSpeed + star.phase) * 0.35;
        const clampedAlpha = Math.max(0.15, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
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
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState('Analizando tu caso...');
  const [avatarAction, setAvatarAction] = useState(null);

  const speechRef = useRef(null);
  const audioRef = useRef(null);
  const heartbeatRef = useRef(null);
  const chatBottomRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isOpenRef = useRef(isOpen);

  const handleCloseModal = () => {
    isOpenRef.current = false;
    handleStopAllAudio();
    if (onClose) onClose();
  };

  // Sincronizar isOpenRef y cortar audio inmediatamente al cerrar
  useEffect(() => {
    isOpenRef.current = isOpen;
    if (!isOpen) {
      handleStopAllAudio();
    }
  }, [isOpen]);

  // Manejo de tecla Escape para cerrar modal cortando audio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cleanup absoluto al desmontar el componente
  useEffect(() => {
    isOpenRef.current = true;
    return () => {
      isOpenRef.current = false;
      handleStopAllAudio();
    };
  }, []);


  // Detección reactiva de resolución móvil para adaptar el tamaño del avatar
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll fluido al último mensaje o estado de razonamiento
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, thinkingPhase]);

  const triggerAction = (act) => {
    setAvatarAction(act);
    setTimeout(() => setAvatarAction(null), 2500);
  };

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

  // Función Central de Apagado Absoluto e Inmediato de Audio (HTML5 + Red + Cancelación)
  const handleStopAllAudio = () => {
    // 1. Abortar cualquier petición HTTP de síntesis en curso
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {}
      abortControllerRef.current = null;
    }

    // 2. Limpiar heartbeat
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }

    // 3. Pausar, silenciar y resetear Audio HTML5 inmediatamente
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
        audioRef.current.onplay = null;
        audioRef.current.onpause = null;
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
      } catch (e) {}
      audioRef.current = null;
    }

    // 4. Cancelar cualquier síntesis de voz residual del navegador
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    // 5. Apagar animación de Aura de inmediato
    setIsSpeaking(false);
  };

  // Caché en memoria para evitar volver a sintetizar textos ya generados
  const audioBlobCacheRef = useRef(new Map());

  // Reproductor de Audio Neuronal de Estudio Oficial (Microsoft Azure Neural)
  const playAuraAudio = (audioKey, fallbackText) => {
    if (!isOpenRef.current || !isVoiceActive) {
      handleStopAllAudio();
      return;
    }

    handleStopAllAudio();

    const audioUrl = `/audio/aura/aura_${currentLang}_${audioKey}.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    // Sincronización exacta: La animación se enciende estrictamente en onplay
    audio.onplay = () => {
      if (isOpenRef.current && isVoiceActive) {
        setIsSpeaking(true);
      } else {
        audio.pause();
        setIsSpeaking(false);
      }
    };

    audio.onpause = () => {
      setIsSpeaking(false);
    };

    audio.onended = () => {
      setIsSpeaking(false);
      audioRef.current = null;
    };

    audio.onerror = () => {
      audioRef.current = null;
      setIsSpeaking(false);
      if (fallbackText && isOpenRef.current && isVoiceActive) {
        playDynamicAuraAudio(fallbackText);
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        audioRef.current = null;
        setIsSpeaking(false);
        if (fallbackText && isOpenRef.current && isVoiceActive) {
          playDynamicAuraAudio(fallbackText);
        }
      });
    }
  };

  // Reproductor de Voz Humana Neuronal en Vivo para Respuestas Dinámicas (Azure SalomeNeural)
  const playDynamicAuraAudio = async (textToSpeak) => {
    if (!isOpenRef.current || !isVoiceActive) {
      handleStopAllAudio();
      return;
    }

    handleStopAllAudio();

    const cleanText = (textToSpeak || '')
      .replace(/[*_#`~]/g, '')
      .replace(/[🔮🍽️🏨💆‍♀️⚡💎👀✓✕●•→👋🚀👓😉✦]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const cacheKey = `${currentLang}_${cleanText}`;

    // 1. Si ya está en memoria, reproducir al instante
    if (audioBlobCacheRef.current.has(cacheKey)) {
      if (!isOpenRef.current || !isVoiceActive) return;

      const cachedUrl = audioBlobCacheRef.current.get(cacheKey);
      const audio = new Audio(cachedUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        if (isOpenRef.current && isVoiceActive) {
          setIsSpeaking(true);
        } else {
          audio.pause();
          setIsSpeaking(false);
        }
      };
      audio.onpause = () => setIsSpeaking(false);
      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsSpeaking(false);
          audioRef.current = null;
        });
      }
      return;
    }

    // 2. Generar con Microsoft Azure Neural en vivo via endpoint local /api/aura-tts
    try {
      // DOGMA: NO activar setIsSpeaking(true) aquí. 
      // La animación de los labios de Aura solo inicia cuando el audio empiece a sonar (audio.onplay).
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch('/api/aura-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, lang: currentLang }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      abortControllerRef.current = null;

      if (!res.ok) {
        throw new Error('TTS endpoint returned status ' + res.status);
      }

      // Si el usuario cerró el modal o apagó la voz mientras se generaba, abortar
      if (!isOpenRef.current || !isVoiceActive) {
        setIsSpeaking(false);
        return;
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      audioBlobCacheRef.current.set(cacheKey, audioUrl);

      // Verificación defensiva antes de instanciar Audio
      if (!isOpenRef.current || !isVoiceActive) {
        setIsSpeaking(false);
        return;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Sincronización exacta milimétrica: La animación se enciende SOLO cuando el audio empieza a reproducirse
      audio.onplay = () => {
        if (isOpenRef.current && isVoiceActive) {
          setIsSpeaking(true);
        } else {
          audio.pause();
          setIsSpeaking(false);
        }
      };

      audio.onpause = () => {
        setIsSpeaking(false);
      };

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsSpeaking(false);
          audioRef.current = null;
        });
      }
    } catch (err) {
      // NUNCA hacer fallback a voz robótica. Si hay error o cancelación, simplemente asegurar silencio.
      if (err.name !== 'AbortError') {
        console.warn('[Aura Neural Voice] Síntesis finalizada o cancelada:', err.message);
      }
      setIsSpeaking(false);
      abortControllerRef.current = null;
    }
  };

  // Reproductor inteligente de mensajes: Audio de estudio oficial vs Voz Neuronal Dinámica
  const handlePlayMessage = (msg) => {
    if (!msg || !isOpenRef.current) return;
    if (msg.replyKey && msg.replyKey !== 'dynamic') {
      playAuraAudio(msg.replyKey, msg.text);
    } else {
      playDynamicAuraAudio(msg.text);
    }
  };

  // Reproducir saludo con voz de estudio al abrir el modal o cambiar idioma
  useEffect(() => {
    let timer;
    if (isOpen && isVoiceActive) {
      timer = setTimeout(() => {
        if (isOpenRef.current && isVoiceActive) {
          playAuraAudio('welcome', strings.welcome);
        }
      }, 500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, currentLang]);


  // Detector semántico de pilares de negocio para reproducir audio humano oficial
  const detectPresetKey = (query) => {
    if (!query) return null;
    const q = query.toLowerCase();
    if (
      q.includes('gastro') || q.includes('restauran') || q.includes('bar') || 
      q.includes('demoras en mesa') || q.includes('kds') || q.includes('comanda') || 
      q.includes('comida') || q.includes('essen') || q.includes('飲食')
    ) return 'gastro';
    if (
      q.includes('glamping') || q.includes('booking') || q.includes('hotel') || 
      q.includes('cabaña') || q.includes('cabin') || q.includes('airbnb') ||
      q.includes('hospedaje') || q.includes('anticipos') || q.includes('reservas directas') ||
      q.includes('zimmer') || q.includes('chambre') || q.includes('宿泊')
    ) return 'hotel';
    if (
      q.includes('fideliz') || q.includes('loyalt') || q.includes('punto') || 
      q.includes('puntos') || q.includes('vip') || q.includes('retenc') || 
      q.includes('wallet') || q.includes('billetera') || q.includes('recompra') || 
      q.includes('kundenbindung') || q.includes('リピート')
    ) return 'loyalty';
    if (
      q.includes('clínic') || q.includes('clinic') || q.includes('curios') || 
      q.includes('filtrar curiosos') || q.includes('whatsapp') || q.includes('cita') || 
      q.includes('lead') || q.includes('termin') || q.includes('rendez-vous') || q.includes('クリニック')
    ) return 'clinic';
    if (
      q.includes('tiempo') || q.includes('tarda') || q.includes('plazo') || 
      q.includes('cuanto demora') || q.includes('delivery') || q.includes('délai') || 
      q.includes('dauer') || q.includes('prazo') || q.includes('納期')
    ) return 'time';
    return null;
  };

  // Manejador de Consultas: Soporta tanto presets de estudio como inferencia cognitiva Gemini
  const handleSendQuery = async (query, explicitReplyKey = null) => {
    if (!query || !query.trim() || isThinking) return;

    handleStopAllAudio();

    const trimmedQuery = query.trim();
    const userMsg = { sender: 'user', text: trimmedQuery };
    
    // Inmediatamente mostrar mensaje del usuario y limpiar input
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    const targetKey = explicitReplyKey || detectPresetKey(trimmedQuery);

    // 🎙️ CASO 1: Si es un pilar canónico oficial (Gastro, Hotel, Loyalty, Clinic, Time)
    // Se responde con la voz humana de estudio de Azure Neural Voice oficial
    if (targetKey && strings.answers[targetKey]) {
      setIsThinking(true);
      setThinkingPhase('Consultando arquitectura Dynamind...');

      setTimeout(() => {
        setIsThinking(false);
        const replyText = strings.answers[targetKey];
        const aiMsg = { 
          sender: 'ai', 
          text: replyText, 
          replyKey: targetKey 
        };
        setMessages(prev => [...prev, aiMsg]);
        // Una vez que el orbe se esconde y Aura vuelve a salir, ahí sí habla
        if (isVoiceActive) {
          setTimeout(() => {
            if (isOpenRef.current && isVoiceActive) {
              playAuraAudio(targetKey, replyText);
            }
          }, 350);
        }
      }, 950);
      return;
    }

    // 🧠 CASO 2: Inferencia cognitiva abierta / personalizada con Gemini AI
    setIsThinking(true);
    setThinkingPhase('Identificando sector y variables operativas...');

    const phaseTimer1 = setTimeout(() => {
      setThinkingPhase('Consultando arquitectura y base de conocimiento Dynamind...');
    }, 700);

    const phaseTimer2 = setTimeout(() => {
      setThinkingPhase('Formulando diagnóstico técnico y solución de ingeniería...');
    }, 1400);

    try {
      const result = await reasonAuraQuery(trimmedQuery, currentLang, messages);

      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);

      const aiMsg = { 
        sender: 'ai', 
        text: result.reply, 
        replyKey: 'dynamic',
        thought: result.thoughtProcess 
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);

      // Una vez que el orbe se esconde y Aura vuelve a salir, ahí sí habla
      if (isVoiceActive) {
        setTimeout(() => {
          if (isOpenRef.current && isVoiceActive) {
            playDynamicAuraAudio(result.reply);
          }
        }, 350);
      }
    } catch (err) {
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      setIsThinking(false);

      const fallbackMsg = { sender: 'ai', text: strings.answers.general, replyKey: 'general' };
      setMessages(prev => [...prev, fallbackMsg]);
      if (isVoiceActive) {
        setTimeout(() => {
          if (isOpenRef.current && isVoiceActive) {
            playAuraAudio('general', strings.answers.general);
          }
        }, 350);
      }
    }
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      handleStopAllAudio();
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
      if (lastAiMessage) {
        handlePlayMessage(lastAiMessage);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans cursor-pointer"
      onClick={handleCloseModal}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row h-[94dvh] sm:h-[90vh] max-h-[760px] backdrop-blur-2xl transition-colors duration-300 cursor-default ${
          isLight 
            ? 'bg-white/95 border-slate-200 text-slate-900 shadow-indigo-500/10' 
            : 'bg-[#060913]/98 border-purple-500/30 text-white shadow-[0_0_80px_rgba(124,58,237,0.18)]'
        }`}
      >
        
        {/* 🌌 FONDO ESTELAR CÓSMICO RICO Y DINÁMICO (Idéntico a la atmósfera estelar del Index) */}
        {!isLight && <ModalCosmicStarfield />}

        {/* Botón Cerrar Absoluto (Desktop & Tablet) */}
        <button
          onClick={handleCloseModal}
          className={`absolute top-4 right-4 z-30 p-2 rounded-xl transition-all cursor-pointer ${
            isLight 
              ? 'text-slate-500 hover:text-black hover:bg-slate-100' 
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-purple-400/40 border border-transparent'
          }`}
          aria-label="Cerrar asistente"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* COLUMNA IZQUIERDA: BUSTO HOLOGRÁFICO LIBRE DE AURA (CERO CÍRCULOS/CAJAS)  */}
        {/* ========================================================================= */}
        <div className={`relative z-10 w-full sm:w-[310px] md:w-[350px] shrink-0 flex flex-col items-center justify-between p-3.5 sm:p-6 border-b sm:border-b-0 sm:border-r transition-colors ${
          isLight 
            ? 'border-slate-200 bg-slate-50/70' 
            : 'border-purple-500/20 bg-gradient-to-b from-purple-950/25 via-[#060913]/40 to-indigo-950/25'
        }`}>
          
          {/* Nombre Limpio Solicitado Arriba de Ella: Asistente AURA */}
          <div className="w-full flex items-center justify-between pt-0.5 sm:pt-1">
            <h3 className={`font-display font-bold text-base sm:text-lg tracking-tight flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isSpeaking ? 'bg-purple-400' : 'bg-indigo-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isSpeaking ? 'bg-purple-500' : 'bg-indigo-500'
                }`} />
              </span>
              <span>Asistente <span className="text-purple-400 font-extrabold">AURA</span></span>
            </h3>

            {/* Botón cerrar visible en móvil en este bloque */}
            <button
              onClick={handleCloseModal}
              className={`sm:hidden p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-black' : 'text-zinc-400 hover:text-white'
              }`}
              aria-label="Cerrar asistente"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Busto de AURA que es Absorbido en el Vórtice hacia el Orbe Cósmico al Pensar */}
          <div className="relative flex-1 flex items-center justify-center py-1 sm:py-2 w-full overflow-visible min-h-[190px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              {isThinking ? (
                <motion.div
                  key="aura-thinking-cosmic-orb"
                  initial={{ opacity: 0, scale: 0, rotate: 360, filter: 'blur(16px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{
                    scale: [1, 0.7, 0],
                    rotate: [0, 60, 720],
                    filter: ['blur(0px)', 'blur(6px)', 'blur(20px) brightness(2)'],
                    opacity: [1, 0.8, 0]
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center relative w-full h-full py-2 select-none"
                >
                  {/* Orbe Cósmico Multidimensional de Pensamiento */}
                  <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44">
                    {/* Anillo Exterior 3 (Azul Cian Neón con Pulsación Cuántica) */}
                    <motion.div
                      animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0.1, 0.45] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-cyan-400/50 blur-[1px]"
                    />
                    {/* Anillo Giroscópico Púrpura en 3D (Giro Acelerado de Procesamiento) */}
                    <motion.div
                      animate={{ rotate: 360, scale: [0.95, 1.08, 0.95] }}
                      transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      className="absolute w-28 h-28 sm:w-34 sm:h-34 rounded-full border-2 border-dashed border-purple-400/70"
                      style={{ transform: 'rotateX(55deg)' }}
                    />
                    {/* Anillo Giroscópico Azul Cian en 3D Contrarrotación */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-28 h-28 sm:w-34 sm:h-34 rounded-full border border-cyan-400/60"
                      style={{ transform: 'rotateY(60deg)' }}
                    />
                    {/* Resplandor Halo Cósmico */}
                    <motion.div
                      animate={{ scale: [1, 1.28, 1], opacity: [0.65, 0.95, 0.65] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full blur-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400"
                    />
                    {/* Núcleo del Orbe Púrpura & Azul */}
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.9),inset_0_0_20px_rgba(56,189,248,0.9)] relative z-10 flex flex-col items-center justify-center group"
                      style={{
                        background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #a855f7 38%, #2563eb 72%, #090d1a 100%)'
                      }}
                    >
                      <BrainCircuit className="w-8 h-8 sm:w-9 sm:h-9 text-white animate-spin" style={{ animationDuration: '4s' }} />
                    </motion.div>
                  </div>

                  {/* Ecualizador de Barras de Pensamiento Cognitivo */}
                  <div className="flex items-center gap-1 mt-2.5">
                    {[14, 28, 40, 22, 34, 18, 30].map((height, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ['4px', `${height}px`, '4px'] }}
                        transition={{
                          duration: 0.65 + (i * 0.08),
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.07
                        }}
                        className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full"
                      />
                    ))}
                  </div>

                  {/* Telemetría de Pensamiento */}
                  <div className="mt-2 text-center px-2">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>AURA RAZONANDO...</span>
                    </p>
                    <p className="text-[10px] text-purple-300 font-sans mt-0.5 max-w-[210px] truncate mx-auto">
                      {thinkingPhase || 'Procesando arquitectura...'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="aura-android-buste"
                  initial={{ opacity: 0, scale: 0.1, rotate: -180, filter: 'blur(16px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{
                    scale: [1, 0.7, 0],
                    rotate: [0, -60, -720],
                    filter: ['blur(0px)', 'blur(6px)', 'blur(20px) brightness(2)'],
                    opacity: [1, 0.8, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.7, 0, 0.84, 0] // Succión cuántica gravitacional hacia el agujero negro
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <AndroidVoiceAvatar 
                    size={isMobile ? 'compact-modal' : 'modal'} 
                    isSpeaking={isSpeaking} 
                    forcedAction={avatarAction}
                    onActionComplete={() => setAvatarAction(null)}
                    className="drop-shadow-[0_12px_36px_rgba(124,58,237,0.22)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Micro-Dock de Acciones Vivas (Salto, Saludo, Gafas) & Control de Audio */}
          <div className="w-full space-y-2 pt-1">
            {isThinking ? (
              /* Indicador de Cómputo mientras Aura es el Orbe */
              <div className="flex items-center justify-center py-1">
                <div className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-[11px] font-mono text-purple-300 flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Pensamiento Cuántico Activo</span>
                </div>
              </div>
            ) : (
              /* Botones de Gestos Expresivos para Demostrar que está Viva */
              <div className="flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerAction('jump')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    avatarAction === 'jump'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : isLight
                      ? 'bg-slate-100 hover:bg-indigo-50 border-slate-200 text-slate-700 hover:text-indigo-600'
                      : 'bg-white/[0.04] hover:bg-purple-950/40 border-white/10 text-zinc-300 hover:text-white hover:border-purple-400/50'
                  }`}
                  title="Hacer que Aura realice un salto cuántico antigravedad con squash & stretch"
                >
                  <span>🚀 Saltar</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerAction('wave')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    avatarAction === 'wave'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : isLight
                      ? 'bg-slate-100 hover:bg-indigo-50 border-slate-200 text-slate-700 hover:text-indigo-600'
                      : 'bg-white/[0.04] hover:bg-purple-950/40 border-white/10 text-zinc-300 hover:text-white hover:border-purple-400/50'
                  }`}
                  title="Hacer que Aura salude alegremente con la mano"
                >
                  <span>👋 Saludar</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerAction('glasses')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    avatarAction === 'glasses'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : isLight
                      ? 'bg-slate-100 hover:bg-indigo-50 border-slate-200 text-slate-700 hover:text-indigo-600'
                      : 'bg-white/[0.04] hover:bg-purple-950/40 border-white/10 text-zinc-300 hover:text-white hover:border-purple-400/50'
                  }`}
                  title="Hacer que Aura se acomode las gafas inteligentes con elegancia de secretaria"
                >
                  <span>👓 Gafas</span>
                </button>
              </div>
            )}

            {/* Control de Audio de AURA */}
            <div className="flex justify-center">
              <button
                onClick={toggleVoice}
                className={`px-4 py-1.5 rounded-xl border text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isVoiceActive
                    ? (isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-sm' : 'bg-purple-950/70 border-purple-400/60 text-purple-200 shadow-[0_0_16px_rgba(168,85,247,0.25)]')
                    : (isLight ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-black' : 'bg-white/[0.03] border-white/10 text-zinc-500 hover:text-white')
                }`}
                title={isVoiceActive ? 'Silenciar voz natural' : 'Activar voz natural'}
                aria-label="Alternar voz de AURA"
              >
                {isVoiceActive ? (
                  <>
                    <Volume2 className={`w-4 h-4 ${isLight ? 'text-indigo-600' : 'text-purple-300'}`} />
                    <span>VOZ NATURAL ACTIVA</span>
                    {isSpeaking && (
                      <span className="flex items-center gap-0.5 h-2.5 ml-1">
                        <span className={`w-0.5 h-2 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-purple-400'}`} style={{ animationDelay: '0ms' }} />
                        <span className={`w-0.5 h-3.5 rounded-full animate-bounce ${isLight ? 'bg-indigo-400' : 'bg-purple-300'}`} style={{ animationDelay: '150ms' }} />
                        <span className={`w-0.5 h-2 rounded-full animate-bounce ${isLight ? 'bg-indigo-600' : 'bg-purple-400'}`} style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <VolumeX className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                    <span>VOZ SILENCIADA</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COLUMNA DERECHA: ÚNICAMENTE EL CHAT (CON TIPOGRAFÍA EDITORIAL DE SUBTÍTULOS) */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
          


          {/* Zona de Mensajes del Chat con Scroll Suave */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 pt-6 sm:pt-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl max-w-[88%] sm:max-w-[85%] font-sans text-xs sm:text-sm leading-relaxed tracking-normal break-words relative group ${
                    m.sender === 'user'
                      ? (isLight ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md')
                      : (isLight ? 'bg-slate-100/90 border border-slate-200 text-slate-800' : 'bg-[#0b1021]/80 border border-purple-500/25 text-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md')
                  }`}
                >
                  {/* Encabezado elegante de mensaje AI */}
                  {m.sender === 'ai' && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5 font-sans text-[11px] font-semibold text-purple-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        <span>✦ AURA</span>
                        <span className="text-[10px] text-zinc-400 font-normal">· DYNAMIND AI</span>
                      </div>

                      {/* Botón táctil para volver a escuchar la respuesta con voz de estudio o TTS */}
                      <button
                        type="button"
                        onClick={() => handlePlayMessage(m)}
                        className={`flex items-center gap-1 text-[11px] font-sans transition-colors cursor-pointer ${
                          isLight ? 'text-indigo-600 hover:text-indigo-700' : 'text-purple-300 hover:text-purple-200'
                        }`}
                        title="Escuchar a Aura"
                        aria-label="Escuchar mensaje de Aura"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{strings.listenBtn}</span>
                      </button>
                    </div>
                  )}

                  {/* Contenido del Mensaje con Tipografía y Markdown Formateado */}
                  <div className="font-sans leading-relaxed break-words text-xs sm:text-[13px]">{formatMessageContent(m.text, isLight)}</div>
                </div>
              </div>
            ))}

            {/* 🧠 Indicador de Pensamiento y Razonamiento Cognitivo de AURA */}
            {isThinking && (
              <div className="flex items-start">
                <div className="p-3 sm:p-4 rounded-2xl bg-purple-950/40 border border-purple-500/35 text-purple-200 text-xs font-sans space-y-1.5 shadow-[0_0_24px_rgba(168,85,247,0.18)] backdrop-blur-md animate-in fade-in duration-200 max-w-[88%]">
                  <div className="flex items-center gap-2 font-bold text-purple-300 text-[11px] font-mono">
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>✦ AURA · PROCESANDO Y RAZONANDO...</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block shrink-0" />
                    <span>{thinkingPhase}</span>
                  </p>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} className="h-1" />
          </div>

          {/* Prompts Rápidos Sugeridos Dinámicos con Scroll Táctil Horizontal en Móvil */}
          <div className={`space-y-1 sm:space-y-1.5 pt-2 sm:pt-2.5 border-t mt-1.5 sm:mt-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
            <div className={`text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              {strings.promptsLabel}
            </div>
            <div className="flex flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 touch-pan-x no-scrollbar">
              {strings.prompts.map((qp, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => handleSendQuery(qp.query, qp.replyKey)}
                  className={`shrink-0 sm:shrink px-2.5 sm:px-3 py-1.5 rounded-lg border font-sans text-xs leading-snug transition-all cursor-pointer text-left whitespace-nowrap sm:whitespace-normal ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-black' 
                      : 'bg-white/[0.04] hover:bg-purple-950/40 border-white/10 text-zinc-200 hover:text-white hover:border-purple-400/50'
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
                placeholder={isThinking ? 'Aura está procesando tu respuesta...' : strings.placeholder}
                disabled={isThinking}
                className={`flex-1 px-4 py-2.5 border rounded-xl font-sans text-xs sm:text-sm leading-normal focus:outline-none transition-colors ${
                  isLight 
                    ? 'bg-slate-100/90 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500' 
                    : 'bg-white/[0.04] border-white/15 text-white placeholder:text-zinc-500 focus:border-purple-400/70 focus:bg-white/[0.06]'
                } ${isThinking ? 'opacity-60 cursor-not-allowed' : ''}`}
              />

              {/* Botón de Enviar */}
              <button
                type="submit"
                disabled={isThinking || !inputText.trim()}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isLight 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)] disabled:opacity-40 disabled:cursor-not-allowed'
                } ${isThinking ? 'opacity-60 cursor-not-allowed' : ''}`}
                aria-label="Enviar pregunta a Aura"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className={`flex items-center justify-between font-sans text-xs ${
              isLight ? 'text-slate-500' : 'text-zinc-400'
            }`}>
              <span>{strings.preferHuman}</span>
              <a
                href="/#/diagnostico"
                onClick={handleCloseModal}
                className={`flex items-center gap-1 font-bold font-sans underline ${
                  isLight ? 'text-indigo-600 hover:text-indigo-700' : 'text-purple-400 hover:text-purple-300'
                }`}
              >
                <span>{strings.ctaDiagnostic}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
