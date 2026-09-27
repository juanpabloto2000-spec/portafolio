import express from 'express';
import cors from 'cors';
import pino from 'pino';
import QRCode from 'qrcode';
import qrcodeTerminal from 'qrcode-terminal';
import { 
  makeWASocket, 
  useMultiFileAuthState, 
  DisconnectReason, 
  fetchLatestBaileysVersion 
} from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let sock = null;
let currentQR = null;
let connectionStatus = 'initializing'; // initializing, qr_ready, connected, disconnected
let connectedUser = null;

async function startWhatsApp() {
  const authDir = path.join(process.cwd(), 'auth_info');
  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`[Dynamind WA] Usando Baileys v${version.join('.')}, isLatest: ${isLatest}`);

  sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ['Dynamind Studios', 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQR = qr;
      connectionStatus = 'qr_ready';
      console.log('\n======================================================');
      console.log('⚡ DYNAMIND STUDIOS - CÓDIGO QR LISTO PARA ESCANEAR');
      console.log('Abre WhatsApp > Dispositivos Vinculados > Escanea este QR:');
      console.log(`O abre en tu navegador: http://localhost:${PORT}/qr`);
      console.log('======================================================\n');
      qrcodeTerminal.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('[Dynamind WA] Conexión cerrada. Reconectando:', shouldReconnect);
      connectionStatus = 'disconnected';
      if (shouldReconnect) {
        setTimeout(startWhatsApp, 3000);
      } else {
        console.log('[Dynamind WA] Sesión cerrada. Reiniciando para nuevo QR...');
        if (fs.existsSync(authDir)) {
          fs.rmSync(authDir, { recursive: true, force: true });
        }
        setTimeout(startWhatsApp, 2000);
      }
    } else if (connection === 'open') {
      connectionStatus = 'connected';
      currentQR = null;
      connectedUser = sock.user;
      console.log('\n======================================================');
      console.log('🎉 ¡WHATSAPP VINCULADO CON ÉXITO A DYNAMIND STUDIOS!');
      console.log('Usuario:', sock.user?.name || sock.user?.id);
      console.log('El Gateway está listo para enviar y recibir mensajes en:');
      console.log(`http://localhost:${PORT}/message/sendText/dynamind`);
      console.log('======================================================\n');
    }
  });

  // Escuchar mensajes entrantes
  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.key.fromMe && m.type === 'notify') {
      const from = msg.key.remoteJid;
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
      console.log(`[Mensaje Recibido de ${from}]: ${text}`);
    }
  });
}

// Endpoint visual para escanear QR cómodamente en el navegador
app.get('/qr', async (req, res) => {
  if (connectionStatus === 'connected') {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dynamind WhatsApp Gateway - Conectado</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { background: #06070a; color: #fff; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 40px; max-width: 450px; }
            .badge { background: #10b981; color: #000; font-weight: bold; padding: 6px 14px; border-radius: 12px; font-size: 12px; display: inline-block; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">CONECTADO // ONLINE</div>
            <h2 style="margin: 0 0 10px 0; text-transform: uppercase;">Dynamind WA Gateway</h2>
            <p style="color: #a1a1aa; font-size: 13px;">WhatsApp ya está vinculado y activo para enviar recordatorios y mensajes.</p>
            <p style="color: #38bdf8; font-size: 12px;">ID: ${connectedUser?.id || 'Sesión Activa'}</p>
          </div>
        </body>
      </html>
    `);
  }

  if (!currentQR) {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dynamind WhatsApp Gateway</title>
          <meta http-equiv="refresh" content="2">
          <style>
            body { background: #06070a; color: #fff; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          </style>
        </head>
        <body>
          <p>Generando código QR... (se actualizará solo en un momento)</p>
        </body>
      </html>
    `);
  }

  try {
    const qrDataUrl = await QRCode.toDataURL(currentQR, { width: 320, margin: 2 });
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dynamind WhatsApp QR</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="refresh" content="20">
          <style>
            body { background: #06070a; color: #fff; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
            .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 35px; max-width: 420px; box-shadow: 0 25px 60px rgba(0,0,0,0.8); }
            img { border-radius: 16px; background: white; padding: 12px; margin: 20px 0; max-width: 100%; }
            h2 { margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; }
            p { color: #a1a1aa; font-size: 12px; line-height: 1.5; margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Escanear con WhatsApp</h2>
            <p>1. Abre WhatsApp en tu celular<br>2. Ve a <b>Ajustes > Dispositivos vinculados</b><br>3. Toca <b>Vincular un dispositivo</b> y apunta aquí:</p>
            <img src="${qrDataUrl}" alt="WhatsApp QR Code" />
            <p style="color: #71717a; font-size: 10px;">Este código se actualiza automáticamente cada 20 segundos.</p>
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error generando QR');
  }
});

// Endpoint de estado
app.get('/status', (req, res) => {
  res.json({
    status: connectionStatus,
    connected: connectionStatus === 'connected',
    user: connectedUser
  });
});

// Endpoint compatible 100% con Evolution API
// POST /message/sendText/:instance
app.post(['/message/sendText/:instance', '/message/sendText'], async (req, res) => {
  if (connectionStatus !== 'connected' || !sock) {
    return res.status(503).json({
      error: 'WhatsApp no está conectado todavía. Escanea el código QR primero en http://localhost:' + PORT + '/qr'
    });
  }

  const { number, text } = req.body;
  if (!number || !text) {
    return res.status(400).json({ error: 'Faltan parámetros: "number" y "text" son obligatorios.' });
  }

  try {
    let cleanNumber = String(number).replace(/[^0-9]/g, '');
    if (cleanNumber.startsWith('3') && cleanNumber.length === 10) {
      cleanNumber = '57' + cleanNumber;
    }
    const jid = `${cleanNumber}@s.whatsapp.net`;

    console.log(`[Dynamind WA] Enviando mensaje a ${jid}...`);
    const sent = await sock.sendMessage(jid, { text });
    console.log(`[Dynamind WA] ¡Mensaje enviado con éxito a ${jid}! ID: ${sent.key.id}`);

    res.json({
      success: true,
      messageId: sent.key.id,
      to: jid,
      text: text
    });
  } catch (error) {
    console.error('[Dynamind WA] Error enviando mensaje:', error);
    res.status(500).json({ error: error.message || 'Error al enviar mensaje' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 [Dynamind WA Gateway] Servidor local corriendo en http://localhost:${PORT}`);
  console.log(`👉 Abre en tu navegador para escanear el QR: http://localhost:${PORT}/qr\n`);
  startWhatsApp();
});
