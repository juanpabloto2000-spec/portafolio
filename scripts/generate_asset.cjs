#!/usr/bin/env node
/**
 * generate_asset.cjs - v1.0
 * Motor Local de Generación de Imágenes HD y Banners con Imagen 3 (Google Gemini API)
 * Reemplazo real y programático de la metodología manual
 * 
 * Uso:
 *   node scripts/generate_asset.cjs --prompt "cinematic architectural photography of brutalist villa, 8k" --output "public/assets/hero.jpg" --aspect "16:9"
 * 
 * Flags:
 *   --prompt, -p   : Prompt en inglés técnico para Imagen 3 (Obligatorio)
 *   --output, -o   : Ruta de archivo de destino (ej. public/assets/hero.jpg)
 *   --aspect, -a   : Relación de aspecto (16:9, 1:1, 9:16, 4:3, 3:4) [Default: 16:9]
 *   --key, -k      : API Key de Gemini (o lee GEMINI_API_KEY del entorno/.env)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let prompt = '';
let output = 'public/assets/generated_asset.jpg';
let aspect = '16:9';
let apiKey = process.env.GEMINI_API_KEY || '';

// Parsear flags
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--prompt' || arg === '-p') prompt = args[++i];
  else if (arg === '--output' || arg === '-o') output = args[++i];
  else if (arg === '--aspect' || arg === '-a') aspect = args[++i];
  else if (arg === '--key' || arg === '-k') apiKey = args[++i];
}

// Intentar leer de .env si no hay apiKey
if (!apiKey) {
  const envPaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), '.env.local'),
    path.join('c:/proyectos/Dynamind', '.env'),
    path.join('c:/proyectos/cerebro/cerebro proyecto', '.env')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/GEMINI_API_KEY\s*=\s*["']?([^"'\r\n]+)["']?/);
      if (match) {
        apiKey = match[1].trim();
        break;
      }
    }
  }
}

if (!prompt) {
  console.error('\n❌ ERROR: Se requiere el flag --prompt con la descripción de la imagen.');
  console.log('Ejemplo: node scripts/generate_asset.cjs --prompt "luxury villa in forest at night, volumetric light" --output "public/assets/hero.jpg"\n');
  process.exit(1);
}

if (!apiKey) {
  console.error('\n❌ ERROR: No se encontró GEMINI_API_KEY en variables de entorno ni en archivos .env.');
  console.log('Define la variable GEMINI_API_KEY o pasa el flag --key <TU_LLAVE>\n');
  process.exit(1);
}

console.log('\n================================================================');
console.log('🎨 MOTOR LOCAL DE GENERACIÓN DE IMÁGENES (IMAGEN 3)');
console.log(`📝 Prompt: "${prompt}"`);
console.log(`📐 Aspect Ratio: ${aspect}`);
console.log(`💾 Destino: ${output}`);
console.log('================================================================\n');

async function generate() {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
  
  const payload = {
    instances: [
      { prompt: prompt }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: aspect,
      outputMimeType: output.endsWith('.png') ? 'image/png' : 'image/jpeg'
    }
  };

  try {
    const startTime = Date.now();
    process.stdout.write('⏳ Conectando con Google Imagen 3 y renderizando activo...');
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.log(' ❌');
      throw new Error(`HTTP ${response.status} - ${errText}`);
    }

    const data = await response.json();
    if (!data.predictions || !data.predictions[0] || !data.predictions[0].bytesBase64Encoded) {
      console.log(' ❌');
      throw new Error('Respuesta inválida de la API de Imagen 3 (sin predicciones de imagen)');
    }

    const base64Data = data.predictions[0].bytesBase64Encoded;
    const buffer = Buffer.from(base64Data, 'base64');

    // Asegurar directorio de destino
    const targetPath = path.resolve(output);
    const parentDir = path.dirname(targetPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, buffer);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(` ✨ [COMPLETADO en ${elapsed}s]`);
    console.log(`✅ Activo guardado con éxito: ${targetPath}`);
    console.log(`📦 Peso del archivo: ${(buffer.length / 1024).toFixed(1)} KB\n`);
  } catch (err) {
    console.error(`\n🚨 Fallo en la generación: ${err.message}\n`);
    process.exit(1);
  }
}

generate();
