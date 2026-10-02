// src/components/systems/DynamindGalaxy3D.jsx
// Motor WebGL Three.js con Post-Processing (Bloom de Unreal Engine) para La Galaxia Tecnológica Dynamind:
// - Ultra-HD PBR: Esferas de alta geometría (96x96) con shaders Fresnel de atmósfera, corona solar incandescente y anillos de Cassini.
// - Post-procesado cinemático con EffectComposer y BloomEffect para resplandor de neón y plasma real.
// - Cámara panorámica art-directed bloqueada (sin descalibraciones ni pérdidas de vista).
// - Navegación continua: todos los 18 sistemas uniformemente espaciados y visibles en panorama.

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from "postprocessing";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playPlanetSelect, playOrbitWarp } from "../../utils/audioEffects";

// ============================================================================
// GENERADOR DE TEXTURAS PROCEDURALES HD (2048x1024)
// Crea superficies hiperdetalladas con capas orgánicas, micro-cráteres y circuitos
// ============================================================================
function generateHDPlanetTexture(service) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const hex = service.color || "#06b6d4";
  const cat = service.category;

  // Fondo base con gradiente esférico atmosférico
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGrad.addColorStop(0, adjustColor(hex, -55));
  bgGrad.addColorStop(0.2, adjustColor(hex, -20));
  bgGrad.addColorStop(0.5, hex);
  bgGrad.addColorStop(0.8, adjustColor(hex, -30));
  bgGrad.addColorStop(1, adjustColor(hex, -65));
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (service.id === "srv-core") {
    // ☀️ NÚCLEO SOLAR INCANDESCENTE DE PLASMA
    // Capa de granulación celular
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 8 + Math.random() * 50;
      const flareGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      flareGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      flareGrad.addColorStop(0.35, "rgba(254, 240, 138, 0.65)");
      flareGrad.addColorStop(0.7, "rgba(245, 158, 11, 0.3)");
      flareGrad.addColorStop(1, "rgba(217, 119, 6, 0)");
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Filamentos solares oscuros y erupciones
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = "rgba(180, 83, 9, 0.35)";
      ctx.lineWidth = 3 + Math.random() * 5;
      ctx.beginPath();
      const sx = Math.random() * canvas.width;
      const sy = Math.random() * canvas.height;
      ctx.arc(sx, sy, 30 + Math.random() * 40, 0, Math.PI * 0.8);
      ctx.stroke();
    }
  } else if (cat === "sistemas") {
    // 🪐 SISTEMAS MAYORES: BANDAS GASEOSAS TURBULENTAS & REMOLINOS
    for (let y = 0; y < canvas.height; y += 3) {
      const wave1 = Math.sin(y * 0.05) * Math.cos(y * 0.02);
      const wave2 = Math.sin(y * 0.12) * 0.5;
      const combined = wave1 + wave2;
      const alpha = 0.15 + Math.abs(combined) * 0.45;

      ctx.fillStyle = combined > 0
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(0, 0, 0, ${alpha * 0.8})`;
      ctx.fillRect(0, y, canvas.width, 3);
    }
    // Vórtices y tormentas ciclónicas
    for (let i = 0; i < 35; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rx = 25 + Math.random() * 45;
      const ry = 12 + Math.random() * 22;
      const stormGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
      stormGrad.addColorStop(0, "rgba(255, 255, 255, 0.65)");
      stormGrad.addColorStop(0.5, `${hex}77`);
      stormGrad.addColorStop(1, "transparent");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / rx);
      ctx.fillStyle = stormGrad;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else if (cat === "agentes") {
    // ⚡ AGENTES DE CONVERSIÓN: REDES CUÁNTICAS & CRISTAL DIGITAL
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1.2;
    // Malla de interconexión neuronal
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = x1 + (Math.random() - 0.5) * 140;
      const y2 = y1 + (Math.random() - 0.5) * 140;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    // Nodos luminosos
    for (let i = 0; i < 180; i++) {
      const nx = Math.random() * canvas.width;
      const ny = Math.random() * canvas.height;
      const nr = 1.5 + Math.random() * 2.5;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(nx, ny, nr, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // 🛡️ BLINDAJE & AUTOMATIZACIONES: PLACAS HEXAGONALES Y OBSIDIANA
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.5;
    const hexRadius = 24;
    for (let y = 0; y < canvas.height + hexRadius; y += hexRadius * 1.5) {
      for (let x = 0; x < canvas.width + hexRadius * 2; x += hexRadius * Math.sqrt(3)) {
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (a * Math.PI) / 3;
          const px = x + hexRadius * Math.cos(angle);
          const py = y + hexRadius * Math.sin(angle);
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    // Destellos defensivos
    for (let i = 0; i < 40; i++) {
      const gx = Math.random() * canvas.width;
      const gy = Math.random() * canvas.height;
      const gr = 10 + Math.random() * 30;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      glow.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      glow.addColorStop(0.5, `${hex}44`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// ============================================================================
// GENERADOR DE ANILLOS DE CASSINI TRANSLÚCIDOS (SATURNO)
// ============================================================================
function generateRingTexture(colorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.08, `${colorHex}15`);
  grad.addColorStop(0.22, `${colorHex}bb`);
  grad.addColorStop(0.42, `${colorHex}ff`);
  // División de Cassini (ranura oscura y nítida)
  grad.addColorStop(0.48, "rgba(0, 0, 0, 0.05)");
  grad.addColorStop(0.53, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.57, "rgba(0, 0, 0, 0.08)");
  // Anillo exterior
  grad.addColorStop(0.68, `${colorHex}dd`);
  grad.addColorStop(0.85, `${colorHex}88`);
  grad.addColorStop(0.96, `${colorHex}22`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro-bandas concéntricas para realismo
  for (let x = 0; x < canvas.width; x += 3) {
    if (Math.random() > 0.45) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
      ctx.fillRect(x, 0, 1.5, canvas.height);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Helper para modificar tonalidades hexadecimales
function adjustColor(col, amt) {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return (usePound ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ============================================================================
// GENERADOR DE TEXTURA PARA POLVO CÓSMICO Y NÉBULAS (SPRITE RADIAL SUAVE)
// ============================================================================
function createCosmicDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const rad = canvas.width / 2;
  const grad = ctx.createRadialGradient(rad, rad, 0, rad, rad, rad);
  grad.addColorStop(0, "rgba(255, 255, 255, 0.28)");
  grad.addColorStop(0.3, "rgba(210, 235, 255, 0.12)");
  grad.addColorStop(0.65, "rgba(130, 185, 255, 0.03)");
  grad.addColorStop(0.88, "rgba(60, 110, 255, 0.005)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ============================================================================
// SHADER DE ATMÓSFERA FRESNEL (GLSL)
// ============================================================================
function createAtmosphereMesh(radius, colorHex, isSun = false) {
  const geom = new THREE.SphereGeometry(radius * (isSun ? 1.25 : 1.14), 64, 64);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float powerExp;
      uniform float alphaScale;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
        float intensity = pow(rim, powerExp) * alphaScale;
        gl_FragColor = vec4(glowColor, intensity);
      }
    `,
    uniforms: {
      glowColor: { value: new THREE.Color(colorHex) },
      powerExp: { value: isSun ? 1.8 : 2.6 },
      alphaScale: { value: isSun ? 0.95 : 0.7 },
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });

  return new THREE.Mesh(geom, mat);
}

// ============================================================================
// GENERADORES DE TEXTURAS PARA ANILLOS DE FANTASÍA & CYBER (512x32)
// ============================================================================
function generateCyberGimbalTexture(colorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.12, `${colorHex}22`);
  grad.addColorStop(0.38, `${colorHex}ff`);
  grad.addColorStop(0.62, `${colorHex}ff`);
  grad.addColorStop(0.88, `${colorHex}22`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro-segmentos punteados de telemetría y circuitos de datos
  for (let x = 0; x < canvas.width; x += 16) {
    if (x % 32 === 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillRect(x, 8, 8, 16);
    } else {
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(x, 12, 4, 8);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function generateHexShieldTexture(colorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.18, `${colorHex}33`);
  grad.addColorStop(0.50, `${colorHex}ee`);
  grad.addColorStop(0.82, `${colorHex}33`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rejilla de blindaje defensivo
  ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
  ctx.lineWidth = 1.4;
  for (let x = 0; x < canvas.width; x += 18) {
    ctx.strokeRect(x, 5, 11, 22);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function generateRadarTexture(colorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.25, `${colorHex}55`);
  grad.addColorStop(0.50, `${colorHex}ff`);
  grad.addColorStop(0.75, `${colorHex}55`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Marcadores de escala financiera y ticks de radar
  for (let x = 0; x < canvas.width; x += 8) {
    const isMajor = x % 32 === 0;
    ctx.fillStyle = isMajor ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.35)";
    ctx.fillRect(x, isMajor ? 3 : 10, 2, isMajor ? 26 : 12);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function generateSonicWaveTexture(colorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.20, `${colorHex}44`);
  grad.addColorStop(0.50, `${colorHex}ff`);
  grad.addColorStop(0.80, `${colorHex}44`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ondas sinusoidales de comunicación sónica
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x < canvas.width; x++) {
    const y = 16 + Math.sin(x * 0.12) * 9;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// ============================================================================
// GENERADOR DE MAPA DE ENTORNO CÓSMICO (PMREM EQUIRRECTANGULAR) PARA CROMO
// ============================================================================
function generateCosmicEnvMap(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Fondo espacial profundo con gradiente cósmico
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGrad.addColorStop(0, "#01040a");
  bgGrad.addColorStop(0.25, "#040e24");
  bgGrad.addColorStop(0.5, "#091736");
  bgGrad.addColorStop(0.75, "#050f26");
  bgGrad.addColorStop(1, "#01040a");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Nébula brillante central para reflejos en el cromo
  const drawNebula = (cx, cy, r, color1, color2) => {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, color1);
    grad.addColorStop(0.5, color2);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  };

  drawNebula(canvas.width * 0.35, canvas.height * 0.45, 240, "rgba(6, 182, 212, 0.50)", "rgba(59, 130, 246, 0.15)");
  drawNebula(canvas.width * 0.70, canvas.height * 0.55, 220, "rgba(168, 85, 247, 0.40)", "rgba(236, 72, 153, 0.15)");
  drawNebula(canvas.width * 0.90, canvas.height * 0.40, 180, "rgba(245, 158, 11, 0.45)", "rgba(217, 119, 6, 0.12)");

  // Estrellas hiperbrillantes para destellos especulares puntuales en la carrocería acromada
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 0.8 + Math.random() * 2.2;
    ctx.fillStyle = Math.random() > 0.4 ? "#ffffff" : "#bae6fd";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  texture.dispose();
  return envMap;
}

// ============================================================================
// MOTOR DE ESTELAS DE LUZ ORBITALES (DYNAMIC LIGHT TRAILS / COMET RIBBONS)
// ============================================================================
const TRAIL_SEGMENTS = 36;
const TRAIL_TAIL_ANGLE = 0.72; // ~41.25 grados de cola luminosa detrás del planeta

function createOrbitalLightTrail(orbitRadius, planetRadius, colorHex) {
  const geom = new THREE.BufferGeometry();
  const vertexCount = (TRAIL_SEGMENTS + 1) * 2;
  const positions = new Float32Array(vertexCount * 3);
  const alphas = new Float32Array(vertexCount);
  const indices = new Uint16Array(TRAIL_SEGMENTS * 6);

  let idx = 0;
  for (let i = 0; i < TRAIL_SEGMENTS; i++) {
    const v0 = i * 2;
    const v1 = i * 2 + 1;
    const v2 = (i + 1) * 2;
    const v3 = (i + 1) * 2 + 1;

    indices[idx++] = v0;
    indices[idx++] = v1;
    indices[idx++] = v2;

    indices[idx++] = v1;
    indices[idx++] = v3;
    indices[idx++] = v2;
  }

  geom.setIndex(new THREE.BufferAttribute(indices, 1));
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 trailColor;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(trailColor, vAlpha);
      }
    `,
    uniforms: {
      trailColor: { value: new THREE.Color(colorHex) },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geom, mat);
  mesh.frustumCulled = false;
  return mesh;
}

function updateOrbitalLightTrail(trailMesh, currentAngle, orbitRadius, planetRadius) {
  if (!trailMesh || !trailMesh.geometry) return;
  const geom = trailMesh.geometry;
  const posAttr = geom.attributes.position;
  const alphaAttr = geom.attributes.alpha;
  if (!posAttr || !alphaAttr) return;

  const pos = posAttr.array;
  const alphas = alphaAttr.array;

  for (let i = 0; i <= TRAIL_SEGMENTS; i++) {
    const t = i / TRAIL_SEGMENTS;
    const angle = currentAngle - t * TRAIL_TAIL_ANGLE;
    const width = planetRadius * 0.55 * Math.pow(1.0 - t, 0.75);

    const rInner = orbitRadius - width * 0.5;
    const rOuter = orbitRadius + width * 0.5;

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const vIdx = i * 2;
    // Vértice interior
    pos[vIdx * 3 + 0] = cosA * rInner;
    pos[vIdx * 3 + 1] = 0;
    pos[vIdx * 3 + 2] = sinA * rInner;

    // Vértice exterior
    pos[(vIdx + 1) * 3 + 0] = cosA * rOuter;
    pos[(vIdx + 1) * 3 + 1] = 0;
    pos[(vIdx + 1) * 3 + 2] = sinA * rOuter;

    // Desvanecimiento suave de opacidad
    const a = Math.pow(1.0 - t, 1.4) * 0.90;
    alphas[vIdx] = a;
    alphas[vIdx + 1] = a;
  }

  posAttr.needsUpdate = true;
  alphaAttr.needsUpdate = true;
}

// ============================================================================
// COMPONENTE PRINCIPAL: DYNAMIND GALAXY 3D
// ============================================================================
export default function DynamindGalaxy3D({
  selectedServiceId = "srv-core",
  onSelectService,
  speedMultiplier = 1,
  showTrajectories = true,
  onLoaded,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const celestialObjectsRef = useRef({});
  const cosmicDustRef = useRef(null);
  const solarDustRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [hoveredService, setHoveredService] = useState(null);

  // Posición Panorámica Art-Directed Canónica: Todos los 18 planetas uniformemente visibles
  const PANORAMA_CAM_POS = new THREE.Vector3(0, 118, 168);
  const PANORAMA_LOOK_AT = new THREE.Vector3(0, 0, 0);

  const targetCamPosRef = useRef(PANORAMA_CAM_POS.clone());
  const targetLookAtRef = useRef(PANORAMA_LOOK_AT.clone());
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // A. Campo de estrellas en profundidad galáctica (4.000 estrellas)
    const starCount = 4000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 280 + Math.random() * 420;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.45; // Disco elíptico
      starPositions[i + 2] = r * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.8) {
        starColors[i] = 0.2; starColors[i + 1] = 0.85; starColors[i + 2] = 1.0; // Cyan neón
      } else if (tint > 0.65) {
        starColors[i] = 1.0; starColors[i + 1] = 0.8; starColors[i + 2] = 0.2; // Ámbar solar
      } else if (tint > 0.5) {
        starColors[i] = 0.85; starColors[i + 1] = 0.45; starColors[i + 2] = 1.0; // Púrpura
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0; // Diamante
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // B. Polvo Cósmico y Nébula Galáctica Suave (3.800 partículas difusas con Sprite)
    // Opacidad calibrada (0.18): añade atmósfera espacial sin restar visibilidad a los planetas
    const dustCount = 3800;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustTex = createCosmicDustTexture();

    for (let i = 0; i < dustCount * 3; i += 3) {
      // Distribución en espiral galáctica con 2 brazos principales
      const armIndex = i % 2;
      const armOffset = armIndex * Math.PI;
      const dist = 18 + Math.pow(Math.random(), 1.4) * 165;
      const spiralAngle = dist * 0.045 + armOffset + (Math.random() - 0.5) * 0.95;

      dustPositions[i] = Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * 8;
      dustPositions[i + 1] = (Math.random() - 0.5) * 16 * (1 - dist / 220); // Más denso en el plano central
      dustPositions[i + 2] = Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * 8;

      // Colores de nébula con saturación armónica
      const colorPicker = Math.random();
      if (colorPicker > 0.65) {
        dustColors[i] = 0.02; dustColors[i + 1] = 0.72; dustColors[i + 2] = 0.85; // Cyan
      } else if (colorPicker > 0.40) {
        dustColors[i] = 0.65; dustColors[i + 1] = 0.28; dustColors[i + 2] = 0.95; // Violeta
      } else if (colorPicker > 0.20) {
        dustColors[i] = 0.92; dustColors[i + 1] = 0.25; dustColors[i + 2] = 0.65; // Magenta
      } else {
        dustColors[i] = 0.96; dustColors[i + 1] = 0.72; dustColors[i + 2] = 0.15; // Ámbar
      }
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      map: dustTex,
      size: 7.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.05, // Apenas perceptible: un halo etéreo casi invisible en el fondo
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cosmicDustMesh = new THREE.Points(dustGeometry, dustMaterial);
    cosmicDustMesh.renderOrder = -1;
    scene.add(cosmicDustMesh);
    cosmicDustRef.current = cosmicDustMesh;

    // C. Halo de Plasma alrededor del Sol Central (1.200 partículas doradas)
    const solarDustCount = 1200;
    const solarDustGeometry = new THREE.BufferGeometry();
    const solarPositions = new Float32Array(solarDustCount * 3);
    const solarColors = new Float32Array(solarDustCount * 3);

    for (let i = 0; i < solarDustCount * 3; i += 3) {
      const sDist = 6 + Math.random() * 26;
      const sAngle = Math.random() * Math.PI * 2;
      solarPositions[i] = Math.cos(sAngle) * sDist;
      solarPositions[i + 1] = (Math.random() - 0.5) * 4;
      solarPositions[i + 2] = Math.sin(sAngle) * sDist;

      solarColors[i] = 1.0;
      solarColors[i + 1] = 0.8 + Math.random() * 0.2;
      solarColors[i + 2] = 0.2 + Math.random() * 0.3;
    }

    solarDustGeometry.setAttribute("position", new THREE.BufferAttribute(solarPositions, 3));
    solarDustGeometry.setAttribute("color", new THREE.BufferAttribute(solarColors, 3));

    const solarDustMaterial = new THREE.PointsMaterial({
      map: dustTex,
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.12, // Suspiro sutil de plasma solar
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const solarDustMesh = new THREE.Points(solarDustGeometry, solarDustMaterial);
    solarDustMesh.renderOrder = -1;
    scene.add(solarDustMesh);
    solarDustRef.current = solarDustMesh;

    // 2. Cámara Panorámica Fija (Art-Directed)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 2000);
    camera.position.copy(PANORAMA_CAM_POS);
    camera.lookAt(PANORAMA_LOOK_AT);
    cameraRef.current = camera;

    // 3. Renderer WebGL
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Generar Mapa de Entorno Cósmico (PMREM) para los reflejos acromados
    const cosmicEnvMap = generateCosmicEnvMap(renderer);
    scene.environment = cosmicEnvMap;

    // 4. Pipeline de Post-Processing (Bloom de Unreal Engine)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomEffect = new BloomEffect({
      intensity: 1.6,
      luminanceThreshold: 0.16,
      luminanceSmoothing: 0.85,
      mipmapBlur: true,
    });
    const effectPass = new EffectPass(camera, bloomEffect);
    composer.addPass(effectPass);
    composerRef.current = composer;

    // 5. OrbitControls Art-Directed & Ergonomía Táctil Móvil
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    // Límites de ángulo: perspectiva controlada que nunca descalibra la galaxia
    controls.minPolarAngle = Math.PI * 0.20;
    controls.maxPolarAngle = Math.PI * 0.42;
    controls.minAzimuthAngle = -Math.PI * 0.28;
    controls.maxAzimuthAngle = Math.PI * 0.28;
    controls.minDistance = 25;
    controls.maxDistance = 280;
    controlsRef.current = controls;

    // 6. Iluminación Central & Luces Ambientales Suaves
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.8);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xfff5db, 5.5, 600, 0.4);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const rimLight1 = new THREE.DirectionalLight(0x38bdf8, 0.55);
    rimLight1.position.set(50, 90, 50);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xf59e0b, 0.45);
    rimLight2.position.set(-50, -70, -50);
    scene.add(rimLight2);

    // Lensflare sutil en el Núcleo Solar
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/assets/solar/textures/lensflare0.png",
      (flare0) => {
        textureLoader.load(
          "/assets/solar/textures/lensflare1.png",
          (flare1) => {
            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(flare0, 110, 0, new THREE.Color(0xffffff)));
            lensflare.addElement(new LensflareElement(flare1, 38, 0.3, new THREE.Color(0xfbbf24)));
            lensflare.addElement(new LensflareElement(flare1, 60, 0.6, new THREE.Color(0x38bdf8)));
            coreLight.add(lensflare);
          },
          undefined,
          () => {}
        );
      },
      undefined,
      () => {}
    );

    // 7. Construcción de los 18 Planetas con 96x96 Segmentos (Cero Cartón)
    const celestialMap = {};
    const totalBodies = GALAXY_SERVICES.length;

    // Helper para anillos orbitales circulares limpios
    const createTrajectoryRing = (radius, hexColor) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(144);
      const geom = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(hexColor),
        transparent: true,
        opacity: 0.28,
      });
      return new THREE.LineLoop(geom, mat);
    };

    GALAXY_SERVICES.forEach((service, index) => {
      const r = service.size || 2.0;
      const isSun = service.id === "srv-core";

      // Geometría esférica de 96x96 segmentos: curvas matemáticamente sedosas sin polígonos visibles
      const geom = new THREE.SphereGeometry(r, 96, 96);
      geom.computeVertexNormals();

      // Textura procedural HD
      const hdTexture = generateHDPlanetTexture(service);

      // Material PBR estándar o solar
      let mat;
      if (isSun) {
        // El Sol emite luz omnidireccional: textura brillante con emisión total (sin sombras absurdas)
        mat = new THREE.MeshBasicMaterial({
          map: hdTexture,
          color: new THREE.Color(0xfffbeb),
        });
      } else {
        // Acromado PBR de Ultra-Alta Definición: carrocería metálica espejo, barniz cristal y reflejos cósmicos 360°
        mat = new THREE.MeshPhysicalMaterial({
          map: hdTexture,
          color: new THREE.Color(service.color),
          metalness: 0.94,
          roughness: 0.12,
          clearcoat: 1.0,
          clearcoatRoughness: 0.06,
          reflectivity: 0.95,
          ior: 1.52,
          sheen: 0.85,
          sheenColor: new THREE.Color(service.color),
          emissive: new THREE.Color(service.color),
          emissiveIntensity: 0.35,
          envMapIntensity: 1.6,
        });
      }

      const planetMesh = new THREE.Mesh(geom, mat);
      planetMesh.userData = { id: service.id, serviceData: service, isServicePlanet: true };
      planetMesh.castShadow = !isSun;
      planetMesh.receiveShadow = !isSun;

      // Atmósfera perimetral con Shader Fresnel
      const atmosphere = createAtmosphereMesh(r, service.color, isSun);
      planetMesh.add(atmosphere);

      // Anillos y Estructuras de Fantasía Sci-Fi
      let ringObjects = [];
      let satelliteObject = null;
      let satelliteOrbitRadius = 0;

      if (service.id === "srv-caja") {
        // 🪐 Anillos de Cassini Clásicos para Saturno (Caja con Arqueo Ciego)
        const ringGeom = new THREE.RingGeometry(r * 1.35, r * 2.35, 96);
        const ringTex = generateRingTexture(service.color);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88,
          depthWrite: false,
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI * 0.42;
        planetMesh.add(ringMesh);
        ringObjects.push({ mesh: ringMesh, type: "cassini", speed: 0.1 });
      } else if (service.id === "srv-dsb") {
        // 🛰️ Gimbal Giroscópico Holográfico Doble (Core DSB Operativo)
        const g1Geom = new THREE.RingGeometry(r * 1.35, r * 1.75, 96);
        const g1Tex = generateCyberGimbalTexture(service.color);
        const g1Mat = new THREE.MeshBasicMaterial({
          map: g1Tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const g1Mesh = new THREE.Mesh(g1Geom, g1Mat);
        g1Mesh.rotation.x = Math.PI * 0.35;
        planetMesh.add(g1Mesh);

        const g2Geom = new THREE.RingGeometry(r * 1.95, r * 2.35, 96);
        const g2Tex = generateCyberGimbalTexture("#38bdf8");
        const g2Mat = new THREE.MeshBasicMaterial({
          map: g2Tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const g2Mesh = new THREE.Mesh(g2Geom, g2Mat);
        g2Mesh.rotation.z = Math.PI * 0.45;
        g2Mesh.rotation.y = Math.PI * 0.20;
        planetMesh.add(g2Mesh);

        ringObjects.push({ mesh: g1Mesh, type: "gimbal1", speed: 0.75 });
        ringObjects.push({ mesh: g2Mesh, type: "gimbal2", speed: -0.55 });
      } else if (service.id === "srv-security") {
        // 🛡️ Campo de Fuerza Hexagonal (Blindaje Defensivo RLS & HMAC)
        const secGeom = new THREE.RingGeometry(r * 1.35, r * 2.25, 96);
        const secTex = generateHexShieldTexture(service.color);
        const secMat = new THREE.MeshBasicMaterial({
          map: secTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const secMesh = new THREE.Mesh(secGeom, secMat);
        secMesh.rotation.x = Math.PI * 0.28;
        secMesh.rotation.y = Math.PI * 0.15;
        planetMesh.add(secMesh);
        ringObjects.push({ mesh: secMesh, type: "shield", speed: 0.25 });
      } else if (service.id === "srv-pricing") {
        // 📈 Radar Polar Financiero (Tarifas Dinámicas PMS)
        const prcGeom = new THREE.RingGeometry(r * 1.35, r * 2.15, 96);
        const prcTex = generateRadarTexture(service.color);
        const prcMat = new THREE.MeshBasicMaterial({
          map: prcTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const prcMesh = new THREE.Mesh(prcGeom, prcMat);
        prcMesh.rotation.x = Math.PI * 0.38;
        planetMesh.add(prcMesh);
        ringObjects.push({ mesh: prcMesh, type: "radar", speed: 0.45 });
      } else if (service.id === "srv-whatsapp") {
        // 💬 Ondas de Comunicación Sónica (Agente WhatsApp AI)
        const w1Geom = new THREE.RingGeometry(r * 1.32, r * 1.58, 96);
        const w1Tex = generateSonicWaveTexture(service.color);
        const w1Mat = new THREE.MeshBasicMaterial({
          map: w1Tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.82,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const w1Mesh = new THREE.Mesh(w1Geom, w1Mat);
        w1Mesh.rotation.x = Math.PI * 0.40;
        planetMesh.add(w1Mesh);

        const w2Geom = new THREE.RingGeometry(r * 1.72, r * 1.98, 96);
        const w2Mat = new THREE.MeshBasicMaterial({
          map: w1Tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const w2Mesh = new THREE.Mesh(w2Geom, w2Mat);
        w2Mesh.rotation.x = Math.PI * 0.40;
        planetMesh.add(w2Mesh);
        ringObjects.push({ mesh: w1Mesh, type: "wave1", speed: 0.2 });
        ringObjects.push({ mesh: w2Mesh, type: "wave2", speed: -0.15 });
      } else if (service.id === "srv-analytics") {
        // 📊 Órbita Atómica Cuántica con Micro-Nodo de Datos (Data Lake & Business BI)
        const anGeom = new THREE.RingGeometry(r * 1.45, r * 1.85, 96);
        const anTex = generateCyberGimbalTexture(service.color);
        const anMat = new THREE.MeshBasicMaterial({
          map: anTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const anMesh = new THREE.Mesh(anGeom, anMat);
        anMesh.rotation.x = Math.PI * 0.60;
        anMesh.rotation.z = Math.PI * 0.20;
        planetMesh.add(anMesh);
        ringObjects.push({ mesh: anMesh, type: "quantum", speed: 0.35 });

        // Micro-satélite cuántico
        const satGeom = new THREE.SphereGeometry(r * 0.18, 16, 16);
        const satMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const satMesh = new THREE.Mesh(satGeom, satMat);
        anMesh.add(satMesh);
        satelliteObject = satMesh;
        satelliteOrbitRadius = r * 1.65;
      }

      if (service.orbitRadius === 0) {
        // Núcleo Central Dynamind (Sol Soberano)
        scene.add(planetMesh);

        celestialMap[service.id] = {
          pivot: planetMesh,
          mesh: planetMesh,
          serviceData: service,
          trajectory: null,
          lightTrail: null,
          rings: ringObjects,
          satellite: null,
          satelliteOrbitRadius: 0,
          currentAngle: 0,
        };
      } else {
        // Planetas de servicio en órbita
        const orbitPivot = new THREE.Group();
        orbitPivot.name = `pivot_${service.id}`;
        scene.add(orbitPivot);

        const trajectory = createTrajectoryRing(service.orbitRadius, service.color);
        scene.add(trajectory);

        // Estela de Luz Orbital Luminiscente (Comet Trail)
        const lightTrail = createOrbitalLightTrail(service.orbitRadius, r, service.color);
        scene.add(lightTrail);

        // Distribución armónica con Proporción Áurea (Golden Angle ~137.5077°):
        // Garantiza que cada planeta quede en un cuadrante distinto y disperso, erradicando cualquier aspecto de fila india
        const GOLDEN_ANGLE = 2.399963229728653;
        const initialAngle = (index * GOLDEN_ANGLE) + 0.45;
        planetMesh.position.set(
          Math.cos(initialAngle) * service.orbitRadius,
          0,
          Math.sin(initialAngle) * service.orbitRadius
        );

        orbitPivot.add(planetMesh);

        // Inicializar coordenadas de la estela de luz en el ángulo inicial
        updateOrbitalLightTrail(lightTrail, initialAngle, service.orbitRadius, r);

        celestialMap[service.id] = {
          pivot: orbitPivot,
          mesh: planetMesh,
          serviceData: service,
          trajectory,
          lightTrail,
          rings: ringObjects,
          satellite: satelliteObject,
          satelliteOrbitRadius,
          currentAngle: initialAngle,
        };
      }
    });

    celestialObjectsRef.current = celestialMap;
    if (onLoaded) onLoaded();

    // 8. Raycasting Interactivo para Selección y Hover en 3D
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoverMesh = null;

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [];
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.mesh) interactiveMeshes.push(entry.mesh);
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const srvId = hit.userData?.id;

        if (srvId && celestialObjectsRef.current[srvId]) {
          container.style.cursor = "pointer";
          setHoveredService(srvId);

          if (currentHoverMesh !== hit) {
            // Restaurar previo
            if (currentHoverMesh && currentHoverMesh.material && currentHoverMesh.material.emissive) {
              const prevSrv = currentHoverMesh.userData?.serviceData;
              currentHoverMesh.material.emissiveIntensity = prevSrv?.id === "srv-core" ? 1.0 : 0.35;
            }
            // Resaltar actual con brillo intenso
            if (hit.material && hit.material.emissive) {
              hit.material.emissiveIntensity = 1.05;
            }
            currentHoverMesh = hit;

            // Iluminar anillo orbital
            const trajectory = celestialObjectsRef.current[srvId].trajectory;
            if (trajectory && trajectory.material) {
              trajectory.material.opacity = 0.95;
            }
          }
          return;
        }
      }

      // Sin intersección
      container.style.cursor = "default";
      setHoveredService(null);
      if (currentHoverMesh) {
        if (currentHoverMesh.material && currentHoverMesh.material.emissive) {
          const prevSrv = currentHoverMesh.userData?.serviceData;
          currentHoverMesh.material.emissiveIntensity = prevSrv?.id === "srv-core" ? 1.0 : 0.35;
        }
        currentHoverMesh = null;
      }
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.trajectory && entry.trajectory.material) {
          entry.trajectory.material.opacity = 0.28;
        }
      });
    };

    const handlePointerDown = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [];
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.mesh) interactiveMeshes.push(entry.mesh);
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const srvId = hit.userData?.id;
        if (srvId && onSelectService) {
          playPlanetSelect();
          onSelectService(srvId);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointermove", handlePointerMove);
    domElement.addEventListener("pointerdown", handlePointerDown);

    // 9. Bucle de Animación a 60 FPS con Postprocessing
    const clock = new THREE.Clock();

    const animateLoop = () => {
      animationFrameRef.current = requestAnimationFrame(animateLoop);

      const delta = clock.getDelta();
      const currentSpeed = speedMultiplier;

      // Rotación suave del fondo estelar y polvo cósmico
      starField.rotation.y += delta * 0.0025;
      if (cosmicDustRef.current) {
        cosmicDustRef.current.rotation.y += delta * 0.0016;
      }
      if (solarDustRef.current) {
        solarDustRef.current.rotation.y += delta * 0.012;
      }

      // Traslación orbital continua y actualización de efectos cinemáticos a 60 FPS
      const elapsedTime = clock.getElapsedTime();

      Object.entries(celestialObjectsRef.current).forEach(([id, entry]) => {
        const { mesh, serviceData, lightTrail, rings, satellite, satelliteOrbitRadius } = entry;
        if (!mesh) return;

        // Auto-rotación del planeta sobre su propio eje
        mesh.rotation.y += delta * 0.35 * (currentSpeed > 0 ? 1 : 0);

        // Órbita y Estela de Luz Dinámica
        if (serviceData.orbitRadius > 0 && currentSpeed > 0) {
          const orbitalFactor = 0.022 * currentSpeed * (serviceData.speed || 0.5);
          entry.currentAngle += orbitalFactor * delta;

          const r = serviceData.orbitRadius;
          mesh.position.x = Math.cos(entry.currentAngle) * r;
          mesh.position.z = Math.sin(entry.currentAngle) * r;

          // Actualizar la cinta de plasma de la estela orbital
          if (lightTrail) {
            updateOrbitalLightTrail(lightTrail, entry.currentAngle, r, serviceData.size || 2.0);
          }
        }

        // Animación dinámica de anillos de fantasía
        if (rings && rings.length > 0) {
          rings.forEach((ringItem) => {
            const { mesh: rMesh, type, speed } = ringItem;
            if (!rMesh) return;

            if (type === "gimbal1" || type === "gimbal2" || type === "radar" || type === "quantum" || type === "cassini") {
              rMesh.rotation.z += delta * (speed || 0.3);
            } else if (type === "shield") {
              rMesh.rotation.z += delta * 0.22;
              const scale = 1.0 + Math.sin(elapsedTime * 3.2) * 0.04;
              rMesh.scale.set(scale, scale, scale);
            } else if (type === "wave1" || type === "wave2") {
              if (rMesh.material) {
                const wavePhase = type === "wave1" ? 0 : Math.PI * 0.5;
                rMesh.material.opacity = 0.5 + Math.sin(elapsedTime * 3.0 + wavePhase) * 0.32;
              }
            }
          });
        }

        // Animación de micro-satélite de datos (Data Lake)
        if (satellite && satelliteOrbitRadius > 0) {
          const satAngle = elapsedTime * 3.2;
          satellite.position.set(
            Math.cos(satAngle) * satelliteOrbitRadius,
            Math.sin(satAngle) * satelliteOrbitRadius,
            0
          );
        }
      });

      // Suavizado cinemático de cámara hacia el objetivo (lerp)
      if (isTransitioningRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.055);
        controls.target.lerp(targetLookAtRef.current, 0.065);

        if (
          camera.position.distanceTo(targetCamPosRef.current) < 0.4 &&
          controls.target.distanceTo(targetLookAtRef.current) < 0.2
        ) {
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      composer.render(delta);
    };

    animateLoop();

    // 10. Resize
    const handleResize = () => {
      if (!container || !renderer || !camera || !composer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      composer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointermove", handlePointerMove);
      domElement.removeEventListener("pointerdown", handlePointerDown);

      if (cosmicEnvMap) {
        cosmicEnvMap.dispose();
      }
      if (composerRef.current) {
        composerRef.current.dispose();
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Actualización de visibilidad de órbitas y estelas de luz
  useEffect(() => {
    Object.values(celestialObjectsRef.current).forEach((entry) => {
      if (entry.trajectory) {
        entry.trajectory.visible = showTrajectories;
      }
      if (entry.lightTrail) {
        entry.lightTrail.visible = showTrajectories;
      }
    });
  }, [showTrajectories]);

  // Cinemática de cámara focal panorámica al cambiar de servicio
  useEffect(() => {
    const entry = celestialObjectsRef.current[selectedServiceId];
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    playOrbitWarp();

    if (selectedServiceId === "srv-core") {
      // Retorno a la Vista Panorámica Maestra de Toda la Galaxia
      targetLookAtRef.current.copy(PANORAMA_LOOK_AT);
      targetCamPosRef.current.copy(PANORAMA_CAM_POS);
      controls.minDistance = 25;
      controls.maxDistance = 320;
      isTransitioningRef.current = true;
    } else if (entry && entry.mesh) {
      // Enfoque Focal Panorámico: El planeta queda centrado en plano medio,
      // con detalles visibles en alta definición, y los vecinos en derredor.
      const worldPos = new THREE.Vector3();
      entry.mesh.getWorldPosition(worldPos);

      targetLookAtRef.current.copy(worldPos);

      const focusDistance = 24;
      targetCamPosRef.current.set(
        worldPos.x + focusDistance * 0.72,
        worldPos.y + focusDistance * 0.42,
        worldPos.z + focusDistance * 0.72
      );

      controls.minDistance = 12;
      controls.maxDistance = 180;
      isTransitioningRef.current = true;
    }
  }, [selectedServiceId]);

  return (
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none bg-[#020617]">
      {/* Canvas 3D de Three.js */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Tooltip flotante al pasar el mouse por cualquier planeta visible */}
      {hoveredService && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-neutral-950/90 backdrop-blur-md border border-cyan-500/40 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.35)] flex items-center gap-3 animate-fade-in">
          <div
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{
              backgroundColor:
                GALAXY_SERVICES.find((s) => s.id === hoveredService)?.color || "#38bdf8",
            }}
          />
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-wider">
              {GALAXY_SERVICES.find((s) => s.id === hoveredService)?.name}
            </span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono uppercase bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
            Click para Enfocar
          </span>
        </div>
      )}
    </div>
  );
}
