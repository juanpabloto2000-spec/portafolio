import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';

/**
 * Plugin de Vite: Servidor de Audio Neuronal Humano en Vivo para Aura
 * Genera locución humana real con Microsoft Azure Neural (es-CO-SalomeNeural, AvaNeural, etc.)
 * en menos de 1.5s sin API keys de pago ni sintetizadores robóticos del navegador.
 */
function auraEdgeTtsPlugin() {
  const VOICE_MAP = {
    es: 'es-CO-SalomeNeural',
    en: 'en-US-AvaNeural',
    fr: 'fr-FR-VivienneNeural',
    de: 'de-DE-SeraphinaNeural',
    pt: 'pt-BR-FranciscaNeural',
    ja: 'ja-JP-NanamiNeural'
  };

  const ttsRateLimit = new Map();
  const MAX_BODY_BYTES = 4096;
  const MAX_TTS_REQ_PER_MIN = 25;

  return {
    name: 'aura-edge-tts-server',
    configureServer(server) {
      server.middlewares.use('/api/aura-tts', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }

        const clientIp = req.socket?.remoteAddress || 'local';
        const now = Date.now();
        const rateEntry = ttsRateLimit.get(clientIp) || { count: 0, resetAt: now + 60000 };
        if (now > rateEntry.resetAt) {
          rateEntry.count = 1;
          rateEntry.resetAt = now + 60000;
        } else {
          rateEntry.count += 1;
        }
        ttsRateLimit.set(clientIp, rateEntry);
        if (rateEntry.count > MAX_TTS_REQ_PER_MIN) {
          res.statusCode = 429;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Too many TTS requests' }));
        }

        let body = '';
        let byteLength = 0;
        let aborted = false;

        req.on('data', chunk => {
          byteLength += chunk.length;
          if (byteLength > MAX_BODY_BYTES) {
            aborted = true;
            res.statusCode = 413;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Payload Too Large' }));
            req.destroy();
            return;
          }
          body += chunk.toString('utf8');
        });

        req.on('end', () => {
          if (aborted) return;
          try {
            const data = JSON.parse(body || '{}');
            let text = typeof data.text === 'string' ? data.text.trim() : '';
            const rawLang = typeof data.lang === 'string' ? data.lang.trim().toLowerCase() : 'es';
            const voice = Object.prototype.hasOwnProperty.call(VOICE_MAP, rawLang)
              ? VOICE_MAP[rawLang]
              : VOICE_MAP.es;

            // Limpieza fonética y sanitización de caracteres de control / flags CLI
            text = text
              .replace(/[\x00-\x1F\x7F]/g, ' ')
              .replace(/[*_#`~]/g, '')
              .replace(/[🔮🍽️🏨💆‍♀️⚡💎👀✓✕●•→👋🚀👓😉✦]/g, '')
              .replace(/\n+/g, '. ')
              .replace(/\s+/g, ' ')
              .replace(/^-+/, '')
              .trim();

            if (!text) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Text required' }));
            }

            // Si es extenso, acotar suavemente para mantener agilidad conversacional
            if (text.length > 550) {
              text = text.substring(0, 547) + '...';
            }

            const tempDir = os.tmpdir();
            const safeId = `${Date.now()}_${Math.random().toString(36).replace(/[^a-z0-9]/g, '').substring(0, 8)}`;
            const tempFile = path.join(tempDir, `aura_${safeId}.mp3`);

            const cleanupTempFile = () => {
              try {
                if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
              } catch (e) {}
            };

            const edgeProcess = spawn('edge-tts', [
              '--text', text,
              '--voice', voice,
              '--write-media', tempFile
            ], { windowsHide: true });

            edgeProcess.on('close', (code) => {
              if (code !== 0 || !fs.existsSync(tempFile)) {
                cleanupTempFile();
                if (!res.writableEnded) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'TTS generation failed' }));
                }
                return;
              }

              try {
                const stat = fs.statSync(tempFile);
                res.writeHead(200, {
                  'Content-Type': 'audio/mpeg',
                  'Content-Length': stat.size,
                  'Cache-Control': 'no-cache',
                  'X-Content-Type-Options': 'nosniff'
                });

                const stream = fs.createReadStream(tempFile);
                stream.pipe(res);
                stream.on('close', cleanupTempFile);
                stream.on('error', () => {
                  cleanupTempFile();
                  if (!res.writableEnded) res.end();
                });
              } catch (err) {
                cleanupTempFile();
                if (!res.writableEnded) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Audio stream error' }));
                }
              }
            });

            edgeProcess.on('error', () => {
              cleanupTempFile();
              if (!res.writableEnded) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'TTS process error' }));
              }
            });
          } catch (err) {
            if (!res.writableEnded) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid request payload' }));
            }
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), auraEdgeTtsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/scratch/**', '**/dist/**']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-confetti': ['canvas-confetti'],
          'vendor-three': ['three', 'postprocessing']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});