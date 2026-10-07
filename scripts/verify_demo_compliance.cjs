#!/usr/bin/env node
/**
 * verify_demo_compliance.cjs
 * Motor de Auditoría Automática de Compliance de Demos & Proyectos
 * Estándar Canónico de Juan Pablo Orozco & Super Orquestador
 * 
 * Reglas auditadas:
 * 1. Aislamiento absoluto del DSB: Cero botones/enlaces al DSB en la vista del cliente.
 * 2. Arqueo ciego con denominaciones de billetes ($100k, $50k, $20k, $10k, $5k, $2k COP o USD).
 * 3. Arquitectura multi-página desacoplada (prohibidos los monolitos planos de 1 sola página).
 * 4. Anti-Pildoritis y erradicación de eyebrows en secciones principales.
 * 5. Verificación de contratos físicos en disco (opcional con --strict).
 * 
 * Uso:
 *   node scripts/verify_demo_compliance.cjs [ruta_al_proyecto] [--strict]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] && !process.argv[2].startsWith('--') 
  ? path.resolve(process.argv[2]) 
  : process.cwd();

const isStrict = process.argv.includes('--strict');

console.log('\n================================================================');
console.log('🛡️  AUDITORÍA DE COMPLIANCE DE DEMO - DEPURACIÓN DE MANO DERECHA');
console.log(`📂 Inspeccionando: ${targetDir}`);
console.log(`⚙️  Modo Estricto: ${isStrict ? 'ACTIVADO' : 'ESTÁNDAR'}`);
console.log('================================================================\n');

let errors = [];
let warnings = [];
let passes = [];

function checkFileExists(relPath) {
  return fs.existsSync(path.join(targetDir, relPath));
}

function readFileSafe(relPath) {
  const fullPath = path.join(targetDir, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build', '.obsidian'].includes(file)) {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (['.jsx', '.tsx', '.js', '.ts', '.html', '.vue'].some(ext => file.endsWith(ext))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// ================================================================
// REGLA 1: AISLAMIENTO ABSOLUTO DEL DSB EN LA VISTA DEL CLIENTE
// ================================================================
console.log('🔍 [1/4] Auditando Aislamiento del DSB (Cero fugas hacia /#/dsb)...');
const allCodeFiles = getAllFiles(path.join(targetDir, 'src'));

const clientFiles = allCodeFiles.filter(f => {
  const rel = path.relative(targetDir, f).replace(/\\/g, '/');
  // Excluir archivos que pertenecen legítimamente al Dashboard o Auth
  return !rel.includes('dashboard') && 
         !rel.includes('Admin') && 
         !rel.includes('admin') && 
         !rel.includes('auth') &&
         !rel.includes('dsb');
});

let dsbLeaks = [];
const dsbRegexes = [
  /(?:href|to)\s*=\s*["'](?:\/admin|#\/admin|\/dsb|#\/dsb)["']/i,
  /<(?:Link|a|button)[^>]*>(?:\s*Panel\s*de\s*Control|\s*Admin\s*Dashboard|\s*Administraci[oó]n|\s*Acceso\s*Staff\s*)<\/(?:Link|a|button)>/i
];

clientFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  dsbRegexes.forEach(regex => {
    if (regex.test(content)) {
      dsbLeaks.push(path.relative(targetDir, filePath));
    }
  });
});

if (dsbLeaks.length > 0) {
  errors.push(`🚨 FUGA DETECTADA: Se encontraron enlaces o botones al DSB en la vista pública del cliente en:\n   - ${[...new Set(dsbLeaks)].join('\n   - ')}\n   El Dashboard debe ser 100% invisible para el cliente y residir exclusivamente en /#/dsb.`);
} else {
  passes.push('✅ Aislamiento del DSB inmaculado: No existen botones ni links públicos hacia /#/dsb en la vista del cliente.');
}

// ================================================================
// REGLA 2: ARQUEO CIEGO CON DENOMINACIONES DE BILLETES
// ================================================================
console.log('🔍 [2/4] Auditando Arqueo Ciego & Calculadora de Denominaciones...');
let foundCashDrawerLogic = false;
let foundDenominations = false;

allCodeFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  // Comprobar si hay lógica de caja o arqueo
  if (content.includes('shiftId') || content.includes('cashDrawer') || content.includes('arqueo') || content.includes('blindReconciliation') || content.includes('saldoInicial')) {
    foundCashDrawerLogic = true;
  }
  // Comprobar denominaciones de billetes
  if (content.includes('100000') || content.includes('50000') || content.includes('20000') || content.includes('10000') || content.includes('denominations') || content.includes('denominaciones')) {
    foundDenominations = true;
  }
});

if (!foundCashDrawerLogic) {
  errors.push('🚨 ARQUEO AUSENTE: No se encontró lógica de control de turnos ni caja en vivo (shiftId, cashDrawer, saldoInicial).');
} else if (!foundDenominations) {
  errors.push('🚨 CALCULADORA INCOMPLETA: La caja no incluye calculadora ergonómica por denominaciones de billetes ($100k, $50k, $20k, $10k, etc.).');
} else {
  passes.push('✅ Arqueo Ciego verificado: El sistema cuenta con control de turnos y desglose matemático por denominaciones de billetes.');
}

// ================================================================
// REGLA 3: ARQUITECTURA MULTI-PÁGINA / MULTI-VISTA
// ================================================================
console.log('🔍 [3/4] Auditando Arquitectura Multi-Página / Multi-Vista...');
const appContent = readFileSafe('src/App.jsx') || readFileSafe('src/App.tsx') || readFileSafe('src/main.jsx');

let isMultiPage = false;
if (appContent) {
  if (appContent.includes('react-router') || 
      appContent.includes('Routes') || 
      appContent.includes('Route') || 
      appContent.includes('activeTab') || 
      appContent.includes('activePage') || 
      appContent.includes('currentView') ||
      appContent.includes('hash') ||
      appContent.includes('window.location.hash')) {
    isMultiPage = true;
  }
}

const pagesDir = path.join(targetDir, 'src/pages');
const viewsDir = path.join(targetDir, 'src/views');
const hasPageFiles = (fs.existsSync(pagesDir) && fs.readdirSync(pagesDir).length >= 2) ||
                     (fs.existsSync(viewsDir) && fs.readdirSync(viewsDir).length >= 2);

if (!isMultiPage && !hasPageFiles) {
  errors.push('🚨 MONOLITO DETECTADO: El proyecto parece ser una sola página estática plana. Se exige una arquitectura multi-página o multi-vista desacoplada (Home, Catálogo, Experiencias, Checkout, DSB).');
} else {
  passes.push('✅ Arquitectura desacoplada: El proyecto cuenta con enrutamiento y múltiples vistas independientes.');
}

// ================================================================
// REGLA 4: ANTI-PILDORITIS Y ERRORES DE TEXTOS CHIQUITOS
// ================================================================
console.log('🔍 [4/4] Auditando Anti-Pildoritis y Eyebrows sobre títulos...');
let pillWarnings = [];
const pillRegex = /<h[12][^>]*>[\s\S]*?(?:inline-flex|rounded-full|text-\[9px\]|text-xs uppercase)[\s\S]*?<\/h[12]>/i;

clientFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (pillRegex.test(content)) {
    pillWarnings.push(path.relative(targetDir, filePath));
  }
});

if (pillWarnings.length > 0) {
  warnings.push(`⚠️  Posible pildoritis o eyebrow dentro de títulos en:\n   - ${[...new Set(pillWarnings)].join('\n   - ')}\n   Verificar que los títulos comuniquen con autoridad propia sin cápsulas redundantes.`);
} else {
  passes.push('✅ Anti-Pildoritis validado: Títulos limpios sin muletillas de texto diminuto.');
}

// ================================================================
// REGLA 5 (ESTRICTA): CONTRATOS FÍSICOS EN DISCO
// ================================================================
if (isStrict) {
  console.log('🔍 [MODO ESTRICTO] Auditando Contratos Físicos en Disco...');
  const contractFiles = [
    { name: 'Branding Dossier', check: () => {
      const extractedDir = path.join(targetDir, 'public/extracted');
      if (!fs.existsSync(extractedDir)) return false;
      return fs.readdirSync(extractedDir).some(dir => fs.existsSync(path.join(extractedDir, dir, 'branding_dossier.json')));
    }},
    { name: 'Brand Tokens', check: () => checkFileExists('src/theme/brand_tokens.json') || checkFileExists('src/tokens.json') },
    { name: 'Canonical Plan / Docs', check: () => checkFileExists('docs/CANONICAL_PLAN.md') || checkFileExists('PLAN_DE_IMPLEMENTACION.md') },
    { name: 'UI Polisher Report', check: () => checkFileExists('docs/UI_POLISHER_REPORT.md') }
  ];

  contractFiles.forEach(contract => {
    if (!contract.check()) {
      warnings.push(`⚠️  Contrato en disco no encontrado: ${contract.name}`);
    } else {
      passes.push(`✅ Contrato físico verificado: ${contract.name}`);
    }
  });
}

// ================================================================
// VEREDICTO FINAL
// ================================================================
console.log('\n================================================================');
console.log('📊 RESUMEN DE LA AUDITORÍA DE COMPLIANCE');
console.log('================================================================');

passes.forEach(p => console.log(p));
warnings.forEach(w => console.log(w));

if (errors.length > 0) {
  console.log('\n❌ VEREDICTO: RECHAZADO (Se encontraron infracciones críticas):');
  errors.forEach(e => console.log(e));
  console.log('\n🚨 Directiva: Corregir las fallas antes de someter al Hardcore Auditor.\n');
  process.exit(1);
} else {
  console.log('\n🏆 VEREDICTO: 100% APROBADO (COMPLIANCE CERTIFICADO)');
  console.log('✨ La demo cumple rigurosamente con los estándares canónicos de Juan.\n');
  process.exit(0);
}
