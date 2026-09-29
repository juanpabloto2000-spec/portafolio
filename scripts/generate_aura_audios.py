import asyncio
import os
import sys
import edge_tts

if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Voces Neuronales Humanas Oficiales de Microsoft Azure
VOICE_MAP = {
    'es': 'es-CO-SalomeNeural',      # Colombiana natural, cálida, ejecutiva
    'en': 'en-US-AvaNeural',         # Americana natural de alta fidelidad
    'fr': 'fr-FR-VivienneNeural',    # Francesa elegante y articulada
    'de': 'de-DE-SeraphinaNeural',   # Alemana fluida y profesional
    'pt': 'pt-BR-FranciscaNeural',   # Brasileña cálida y natural
    'ja': 'ja-JP-NanamiNeural'       # Japonesa articulada y suave
}

# Textos canónicos para cada respuesta en cada idioma
AUDIOS = {
    'es': {
        'welcome': '¡Hola! Soy Aura, tu asistente de ingeniería y arquitectura en Dynamind Studios. Estoy entrenada para diagnosticar los cuellos de botella de tu negocio y recomendarte la plataforma exacta que necesitas. ¿En qué te puedo asesorar hoy?',
        'gastro': 'Para gastronomía y bares implementamos nuestro Menú Táctil QR en Mesa junto con Comandas KDS y Caja en Vivo. El comensal pide desde su celular, la orden entra a cocina con semáforo de tiempos y el pago se procesa sin comisiones del 20% a apps externas. Esto eleva el ticket promedio hasta un 25%.',
        'hotel': 'Para hospedajes eliminamos intermediarios con el Motor de Reservas Directas, Calendario Atómico y Anticipo del 50%. El cliente reserva su fecha en vivo, se bloquean las suites automáticamente y el dinero entra directo a tu cuenta de banco, ahorrándote miles de dólares en comisiones a Booking o Airbnb.',
        'clinic': 'Para clínicas y marcas personales desplegamos el Triaje Visual de 45 segundos con odómetro de fricción. En lugar de pasar horas chateando con personas que solo preguntan precios, el sistema califica el interés y solo agenda llamadas con clientes verdaderamente cualificados.',
        'loyalty': 'Para retención y fidelización desplegamos nuestro sistema de puntos por consumo, membresías VIP escalonadas y billetera digital en WhatsApp. El cliente acumula saldo en cada visita sin descargar aplicaciones y el sistema reactiva automáticamente a clientes inactivos tras 30 días, triplicando la recompra sin regalar descuentos.',
        'time': 'Construimos e implementamos plataformas completas en un promedio de 10 a 18 días hábiles, con código nativo en React 18, Vite y Tailwind, incluyendo el Core Administrativo privado y capacitación personalizada para todo tu equipo.',
        'general': 'En Dynamind Studios construimos software soberano a la medida que elimina cuellos de botella reales: overbooking, saturación en WhatsApp, descuadres de caja o folletos mudos. Te sugiero iniciar el Diagnóstico de 45 segundos para estructurar tu solución directamente con Juan Pablo.'
    },
    'en': {
        'welcome': 'Hello! I am Aura, your engineering and architecture assistant at Dynamind Studios. I am trained to diagnose real operational bottlenecks in your business and recommend the exact software platform you need. How can I guide you today?',
        'gastro': 'For gastronomy and bars, we deploy our Tabletop QR Interactive Menu paired with Kitchen KDS and Live Cash Register. Guests order instantly from their smartphones, kitchen tickets display real-time prep timers, and payments process directly without 20% aggregator fees. This increases average order value by up to 25%.',
        'hotel': 'For hospitality, we eliminate third-party commissions using our Direct Booking Engine, Atomic Availability Calendar, and 50% automated deposit checkout. Rooms lock in real time, funds transfer straight to your bank account, saving you thousands on Booking and Airbnb fees.',
        'clinic': 'For specialized clinics and personal brands, we build a 45-second Visual Triage Funnel. Instead of losing hours chatting with casual price shoppers on WhatsApp, the system pre-qualifies intent and books appointments only with high-value clients.',
        'loyalty': 'For customer retention, we deploy sovereign point accumulation, tiered VIP memberships, and 1-tap WhatsApp digital wallets. Clients earn rewards on every visit without installing heavy apps, while smart triggers reactivate inactive buyers after 30 days.',
        'time': 'We design, code, and deploy complete living platforms within 10 to 18 business days using native React 18, Vite, and Tailwind, including a private operational core dashboard and full team training.',
        'general': 'At Dynamind Studios we engineer custom sovereign software solving actual bottlenecks: overbooking, endless manual WhatsApp inquiries, cash register discrepancies, or lifeless brochure websites. I recommend taking the 45-second Diagnostic to structure your project directly with Juan Pablo.'
    },
    'fr': {
        'welcome': 'Bonjour ! Je suis Aura, votre assistante en ingénierie logicielle chez Dynamind Studios. Je suis entraînée pour diagnostiquer les goulots d\'étranglement de votre activité et vous conseiller la plateforme logicielle idéale. En quoi puis-je vous éclairer aujourd\'hui ?',
        'gastro': 'Pour la gastronomie et les bars, nous intégrons notre Menu QR Tactile à table couplé aux commandes KDS en cuisine et à la caisse en direct. Le client commande depuis son mobile, la cuisine gère les priorités en temps réel et le paiement s\'effectue sans commissions de 20% reversées aux plateformes tierces.',
        'hotel': 'Pour l\'hôtellerie, nous supprimons les intermédiaires grâce à notre Moteur de Réservation Directe avec calendrier atomique et acompte de 50%. Les disponibilités se bloquent instantanément et les fonds arrivent directement sur votre compte bancaire.',
        'clinic': 'Pour les cliniques esthétiques et marques d\'auteur, nous déployons un Triage Visuel de 45 secondes. Au lieu d\'échanger des heures sur WhatsApp avec de simples curieux, le système qualifie l\'intérêt et ne planifie des appels qu\'avec des prospects sérieux.',
        'loyalty': 'Pour la rétention et la fidélisation, nous déployons un système de points par consommation, des abonnements VIP et un portefeuille numérique sur WhatsApp sans application à télécharger.',
        'time': 'Nous concevons et déployons des plateformes complètes en 10 à 18 jours ouvrés en code React natif, avec tableau de bord opérationnel privé et formation complète de vos équipes.',
        'general': 'Chez Dynamind Studios, nous bâtissons des logiciels souverains qui éliminent les frictions opérationnelles réelles. Je vous invite à lancer le Diagnostic de 45 secondes pour définir votre architecture avec Juan Pablo.'
    },
    'de': {
        'welcome': 'Hallo! Ich bin Aura, Ihre Architektur- und Software-Assistentin bei Dynamind Studios. Ich bin darauf spezialisiert, operative Engpässe in Ihrem Unternehmen zu analysieren und die exakte Systemlösung zu empfehlen. Wie kann ich Sie heute beraten?',
        'gastro': 'Für Gastronomie und Bars implementieren wir unsere interaktive QR-Tischkarte in Verbindung mit Küchen-KDS und Schichtkassenbuch. Gäste bestellen direkt über ihr Smartphone und Zahlungen erfolgen ohne 20% Plattformgebühren.',
        'hotel': 'Für Hotellerie und Glamping beseitigen wir Zwischenhändler durch eine Direktbuchungs-Engine mit atomarem Verfügbarkeitskalender und 50% Anzahlungs-Checkout. Zimmer blockieren in Echtzeit und Einnahmen landen direkt auf Ihrem Bankkonto.',
        'clinic': 'Für Kliniken und persönliche Marken erstellen wir ein 45-Sekunden-Qualifizierungs-Funnel. Anstatt Stunden mit reinen Preisanfragen auf WhatsApp zu vergeuden, filtert das System automatisch.',
        'loyalty': 'Für Kundenbindung bieten wir ein punktebasiertes Treuesystem, VIP-Mitgliedschaften und eine WhatsApp-Wallet ohne zusätzliche App-Downloads.',
        'time': 'Wir entwickeln und implementieren vollständige Systeme innerhalb von 10 bis 18 Werktagen in nativem React 18, Vite und Tailwind, inklusive privatem Admin-Bunker und Team-Schulung.',
        'general': 'Bei Dynamind Studios entwickeln wir maßgeschneiderte souveräne Software, die reale operative Hürden beseitigt. Starten Sie jetzt die 45-Sekunden-Diagnose mit Juan Pablo.'
    },
    'pt': {
        'welcome': 'Olá! Eu sou Aura, sua assistente de arquitetura e engenharia na Dynamind Studios. Fui treinada para diagnosticar os gargalos do seu negócio e recomendar a plataforma exata de que você precisa. Como posso te orientar hoje?',
        'gastro': 'Para gastronomia e bares, implementamos nosso Cardápio QR Interativo na Mesa com KDS de cozinha e Caixa em Tempo Real. O cliente pede pelo celular e os pagamentos são processados sem 20% de taxas para aplicativos externos.',
        'hotel': 'Para hotelaria e glampings, eliminamos intermediários com Motor de Reservas Diretas, Calendário Atômico e adiantamento de 50%. A acomodação é bloqueada em tempo real e o valor cai direto na sua conta bancária.',
        'clinic': 'Para clínicas e marcas de autor, criamos um Triagem Visual de 45 segundos. Em vez de passar o dia respondendo curiosos no WhatsApp, o sistema pré-qualifica o cliente.',
        'loyalty': 'Para retenção e fidelização, oferecemos carteira digital no WhatsApp, acúmulo de pontos por consumo e planos VIP sem necessidade de baixar aplicativos.',
        'time': 'Desenvolvemos e entregamos plataformas completas em média de 10 a 18 dias úteis em React 18 nativo, com búnker operacional privativo e treinamento para sua equipe.',
        'general': 'Na Dynamind Studios construímos software soberano sob medida que elimina gargalos operacionais reais. Recomendo iniciar o Diagnóstico de 45 segundos para desenhar sua solução diretamente com Juan Pablo.'
    },
    'ja': {
        'welcome': 'こんにちは！Dynamind Studiosのエンジニアリング・アーキテクチャ担当AIアシスタント、オーラです。飲食・ホテル・クリニック・著者ブランドの現場ボトルネックを診断し、最適な生きたソフトウェアをご案内します。本日はどのようなご相談でしょうか？',
        'gastro': '飲食・ガストロバー向けには、テーブルQRモバイルオーダー、厨房KDS、リアルタイム売上レジを統合導入します。デリバリー等の20%手数料を削減し、客単価を最大25%向上させます。',
        'hotel': '宿泊・グランピングでは、自社直販予約エンジン、空室同期カレンダー、事前決済システムを導入。Booking.comなどの巨額手数料を排除し、売上を直接自社口座に確保します。',
        'clinic': 'クリニックや著者ブランド向けには、45秒ビジュアルトリアージを構築。価格だけを聞く冷やかしを自動スクリーニングし、真剣度の高いお客様のみを予約へと導きます。',
        'loyalty': '顧客維持とリピート促進のため、利用額に応じたポイント還元、VIP会員制度、アプリ不要のWhatsAppデジタルウォレットを導入します。',
        'time': 'React 18・Vite・Tailwindネイティブコードにより、プライベート管理ダッシュボードとチーム研修を含め、通常10〜18営業日で本番導入まで完了します。',
        'general': 'Dynamind Studiosでは、ダブルブッキングやチャット対応のパンクなど、現場の深刻なボトルネックを解消する主権型ソフトウェアを構築します。まずは45秒診断をお試しください。'
    }
}

async def generateAll():
    output_dir = os.path.join(os.getcwd(), 'public', 'audio', 'aura')
    os.makedirs(output_dir, exist_ok=True)
    
    total = sum(len(items) for items in AUDIOS.values())
    current = 0

    print(f"🚀 Iniciando generación de {total} audios neuronales de estudio para Aura...")

    for lang, items in AUDIOS.items():
        voice = VOICE_MAP.get(lang, 'es-CO-SalomeNeural')
        print(f"\n🎙️ Generando audios para idioma [{lang.upper()}] con voz {voice}...")

        for key, text in items.items():
            filename = f"aura_{lang}_{key}.mp3"
            filepath = os.path.join(output_dir, filename)

            current += 1
            print(f"  [{current}/{total}] Generando {filename}...")

            communicate = edge_tts.Communicate(text, voice, rate="-2%")
            await communicate.save(filepath)

    print("\n✅ ¡Todos los audios neuronales fueron generados con éxito en public/audio/aura/!")

if __name__ == '__main__':
    asyncio.run(generateAll())

