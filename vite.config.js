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

  return {
    name: 'aura-edge-tts-server',
    configureServer(server) {
      server.middlewares.use('/api/aura-tts', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end('Method Not Allowed');
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            let text = (data.text || '').trim();
            const lang = data.lang || 'es';
            const voice = VOICE_MAP[lang] || VOICE_MAP.es;

            // Limpieza fonética para lectura humana fluida
            text = text
              .replace(/[*_#`~]/g, '')
              .replace(/[🔮🍽️🏨💆‍♀️⚡💎👀✓✕●•→👋🚀👓😉✦]/g, '')
              .replace(/\n+/g, '. ')
              .replace(/\s+/g, ' ')
              .trim();

            if (!text) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Text required' }));
            }

            // Si es extenso, acotar suavemente para mantener agilidad conversacional
            if (text.length > 550) {
              text = text.substring(0, 547) + '...';
            }

            const tempDir = os.tmpdir();
            const tempFile = path.join(tempDir, `aura_${Date.now()}_${Math.random().toString(36).substring(7)}.mp3`);

            const edgeProcess = spawn('edge-tts', [
              '--text', text,
              '--voice', voice,
              '--write-media', tempFile
            ]);

            edgeProcess.on('close', (code) => {
              if (code !== 0 || !fs.existsSync(tempFile)) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: 'TTS generation failed' }));
              }

              try {
                const stat = fs.statSync(tempFile);
                res.writeHead(200, {
                  'Content-Type': 'audio/mpeg',
                  'Content-Length': stat.size,
                  'Cache-Control': 'no-cache'
                });

                const stream = fs.createReadStream(tempFile);
                stream.pipe(res);
                stream.on('end', () => {
                  try { fs.unlinkSync(tempFile); } catch (e) {}
                });
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });

            edgeProcess.on('error', (err) => {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            });
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
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
          'vendor-three': ['three']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});