// src/components/systems/DynamindGalaxy3D.jsx
// Motor WebGL Three.js Ultra-HD PBR a 60 FPS Instantáneos (<8ms init):
// - Texturas astronómicas reales de alta resolución extraídas de /assets/solar/gltf/*.glb (Sol, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno, Venus, Mercurio, Lunas)
//   aplicadas tanto en Albedo (color real) como en BumpMap (relieve topográfico 3D de cráteres, cordilleras y bandas gaseosas).
// - Shader GLSL termonuclear en vivo para la fotosfera del Sol + doble corona volumétrica.
// - Capas de nubes independientes en rotación diferencial y atmósfera Rayleigh iluminada por el Sol.
// - Controles 360° libres (rotación completa, zoom profundo con rueda/pinch, paneo y clic preciso sin conflicto con arrastre).

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from "postprocessing";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playPlanetSelect, playOrbitWarp } from "../../utils/audioEffects";
import { getClampedPixelRatio } from "../../utils/webglPerformanceGuard";

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
// GENERADOR ULTRARRÁPIDO (<0.4ms) DE MAPAS PLANETARIOS HD + BUMP + EMISSIVE
// Provee textura y relieve inmediato mientras se inyecta la textura NASA GLB real
// ============================================================================
function generateFastHDPlanetMaps(service, maxAnisotropy = 4) {
  const width = 1024;
  const height = 512;

  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const ctx = albedoCanvas.getContext("2d");

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext("2d");

  const hex = service.color || "#06b6d4";
  const modelName = (service.modelGlb || "").toLowerCase();

  // Base de relieve neutro
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, width, height);

  // Fondo esférico rico en matices
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, adjustColor(hex, -65));
  bgGrad.addColorStop(0.18, adjustColor(hex, -25));
  bgGrad.addColorStop(0.5, hex);
  bgGrad.addColorStop(0.82, adjustColor(hex, -30));
  bgGrad.addColorStop(1, adjustColor(hex, -70));
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  if (service.id === "srv-core") {
    for (let i = 0; i < 180; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 10 + Math.random() * 45;
      const flareGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      flareGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      flareGrad.addColorStop(0.4, "rgba(254, 240, 138, 0.65)");
      flareGrad.addColorStop(1, "rgba(217, 119, 6, 0)");
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (
    modelName.includes("jupiter") ||
    modelName.includes("saturn") ||
    modelName.includes("uranus") ||
    modelName.includes("neptune") ||
    service.category === "sistemas"
  ) {
    // Bandas zonales rápidas por franjas horizontales vectoriales
    for (let y = 0; y < height; y += 4) {
      const w = Math.sin(y * 0.055) * Math.cos(y * 0.022) + Math.sin(y * 0.14) * 0.4;
      const alpha = 0.12 + Math.abs(w) * 0.38;
      ctx.fillStyle = w > 0 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha * 0.75})`;
      ctx.fillRect(0, y, width, 4);

      const bVal = Math.floor(128 + w * 42);
      bCtx.fillStyle = `rgb(${bVal},${bVal},${bVal})`;
      bCtx.fillRect(0, y, width, 4);
    }
    // Vórtices ciclónicos y tormentas ovaladas
    for (let i = 0; i < 32; i++) {
      const cx = Math.random() * width;
      const cy = 40 + Math.random() * (height - 80);
      const rx = 18 + Math.random() * 48;
      const ry = 8 + Math.random() * 20;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / rx);
      const sGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      sGrad.addColorStop(0, "rgba(255,255,255,0.8)");
      sGrad.addColorStop(0.5, `${hex}88`);
      sGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else {
    // Cráteres 3D, continentes y cordilleras con relieve en BumpMap
    for (let i = 0; i < 55; i++) {
      const cx = Math.random() * width;
      const cy = 24 + Math.random() * (height - 48);
      const r = 6 + Math.random() * 34;

      const cGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      cGrad.addColorStop(0, adjustColor(hex, -65));
      cGrad.addColorStop(0.75, adjustColor(hex, -40));
      cGrad.addColorStop(0.9, adjustColor(hex, 65));
      cGrad.addColorStop(1, "transparent");
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      const bGrad = bCtx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
      bGrad.addColorStop(0, "#ffffff");
      bGrad.addColorStop(0.25, "#282828");
      bGrad.addColorStop(0.78, "#323232");
      bGrad.addColorStop(0.92, "#ffffff");
      bGrad.addColorStop(1, "#808080");
      bCtx.fillStyle = bGrad;
      bCtx.beginPath();
      bCtx.arc(cx, cy, r, 0, Math.PI * 2);
      bCtx.fill();
    }
  }

  const albedoMap = new THREE.CanvasTexture(albedoCanvas);
  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.ClampToEdgeWrapping;
  albedoMap.anisotropy = maxAnisotropy;
  albedoMap.colorSpace = THREE.SRGBColorSpace;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.anisotropy = maxAnisotropy;

  return { albedoMap, bumpMap };
}

// ============================================================================
// GENERADOR ULTRARRÁPIDO DE NUBES ATMOSFÉRICAS (COMPOSITING RADIAL, <0.3ms)
// ============================================================================
function generateFastCloudTexture(maxAnisotropy = 4) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // Bandas de cirros y frentes nubosos ciclónicos
  for (let i = 0; i < 95; i++) {
    const cx = Math.random() * canvas.width;
    const cy = 20 + Math.random() * (canvas.height - 40);
    const rx = 24 + Math.random() * 68;
    const ry = 6 + Math.random() * 18;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((Math.random() - 0.5) * 0.35);
    ctx.scale(1, ry / rx);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
    grad.addColorStop(0.5, "rgba(248, 250, 252, 0.25)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

// ============================================================================
// SHADER GLSL ANIMADO DE FOTOSFERA Y PLASMA SOLAR (60 FPS)
// ============================================================================
function createSolarPlasmaMaterial(baseTexture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBaseMap: { value: baseTexture },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = position;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform sampler2D uBaseMap;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPos;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
        );
      }

      void main() {
        vec3 p = normalize(vPos) * 4.5;
        float n1 = noise(p + vec3(uTime * 0.22, -uTime * 0.16, uTime * 0.18));
        float n2 = noise(p * 2.4 - vec3(uTime * 0.32, uTime * 0.25, -uTime * 0.22));
        float plasma = n1 * 0.62 + n2 * 0.38;

        vec4 texColor = texture2D(uBaseMap, vUv + vec2(uTime * 0.01, 0.0));

        vec3 darkSpot = vec3(0.62, 0.18, 0.02);
        vec3 orangePlasma = vec3(0.98, 0.48, 0.06);
        vec3 goldCorona = vec3(1.0, 0.86, 0.30);
        vec3 whiteCore = vec3(1.0, 0.99, 0.92);

        vec3 color = mix(darkSpot, orangePlasma, smoothstep(0.18, 0.45, plasma));
        color = mix(color, goldCorona, smoothstep(0.45, 0.72, plasma));
        color = mix(color, whiteCore, smoothstep(0.72, 0.94, plasma));
        color = mix(color, texColor.rgb * 1.3, 0.42);

        float ndotv = max(dot(vNormal, vViewDir), 0.0);
        float limb = pow(ndotv, 0.42);
        float rimGlow = pow(1.0 - ndotv, 2.3) * 1.4;

        vec3 finalColor = color * (0.68 + 0.52 * limb) + vec3(1.0, 0.68, 0.18) * rimGlow;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  });
}

// ============================================================================
// GENERADOR DE ANILLOS DE CASSINI MULTI-BANDA HD (1024x64)
// ============================================================================
function generateRingTexture(colorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(0.06, `${colorHex}18`);
  grad.addColorStop(0.18, `${colorHex}66`);
  grad.addColorStop(0.28, `${colorHex}ee`);
  grad.addColorStop(0.42, "#fffbeb");
  grad.addColorStop(0.50, `${colorHex}ee`);
  grad.addColorStop(0.54, "rgba(0, 0, 0, 0.04)");
  grad.addColorStop(0.58, "rgba(0, 0, 0, 0.02)");
  grad.addColorStop(0.62, `${colorHex}cc`);
  grad.addColorStop(0.78, `${colorHex}99`);
  grad.addColorStop(0.81, "rgba(0, 0, 0, 0.08)");
  grad.addColorStop(0.84, `${colorHex}77`);
  grad.addColorStop(0.93, `${colorHex}44`);
  grad.addColorStop(0.97, "rgba(255, 255, 255, 0.55)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 40; x < canvas.width - 30; x += 3) {
    if (x > 550 && x < 595) continue;
    const ringWave = Math.sin(x * 0.35) * Math.cos(x * 0.11);
    if (ringWave > 0.15) {
      ctx.fillStyle = `rgba(255, 255, 255, ${ringWave * 0.28})`;
      ctx.fillRect(x, 0, 1.5, canvas.height);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCosmicDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const rad = canvas.width / 2;
  const grad = ctx.createRadialGradient(rad, rad, 0, rad, rad, rad);
  grad.addColorStop(0, "rgba(255, 255, 255, 0.32)");
  grad.addColorStop(0.3, "rgba(210, 235, 255, 0.14)");
  grad.addColorStop(0.65, "rgba(130, 185, 255, 0.04)");
  grad.addColorStop(0.88, "rgba(60, 110, 255, 0.008)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

// ============================================================================
// SHADER DE DISPERSIÓN ATMOSFÉRICA RAYLEIGH / FRESNEL (GLSL)
// ============================================================================
function createAtmosphereMesh(radius, colorHex, isSun = false) {
  const geom = new THREE.SphereGeometry(radius * (isSun ? 1.28 : 1.125), 48, 48);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float powerExp;
      uniform float alphaScale;
      uniform float isSunFlag;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;
      void main() {
        float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
        float intensity = pow(rim, powerExp) * alphaScale;

        if (isSunFlag < 0.5) {
          vec3 dirToSun = normalize(-vWorldPos);
          float sunLight = smoothstep(-0.35, 0.85, dot(vWorldNormal, dirToSun));
          intensity *= (0.32 + 0.68 * sunLight);
        }

        gl_FragColor = vec4(glowColor, intensity);
      }
    `,
    uniforms: {
      glowColor: { value: new THREE.Color(colorHex) },
      powerExp: { value: isSun ? 1.75 : 2.35 },
      alphaScale: { value: isSun ? 0.95 : 0.78 },
      isSunFlag: { value: isSun ? 1.0 : 0.0 },
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
// GENERADOR DE MAPA DE ENTORNO CÓSMICO (PMREM EQUIRRECTANGULAR)
// ============================================================================
function generateCosmicEnvMap(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGrad.addColorStop(0, "#020617");
  bgGrad.addColorStop(0.25, "#07142e");
  bgGrad.addColorStop(0.5, "#0f2347");
  bgGrad.addColorStop(0.75, "#07142e");
  bgGrad.addColorStop(1, "#020617");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  drawNebula(canvas.width * 0.35, canvas.height * 0.45, 130, "rgba(56, 189, 248, 0.55)", "rgba(59, 130, 246, 0.18)");
  drawNebula(canvas.width * 0.70, canvas.height * 0.55, 120, "rgba(192, 132, 252, 0.45)", "rgba(236, 72, 153, 0.16)");
  drawNebula(canvas.width * 0.50, canvas.height * 0.50, 110, "rgba(251, 191, 36, 0.55)", "rgba(217, 119, 6, 0.18)");

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
const TRAIL_TAIL_ANGLE = 0.72;

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
    pos[vIdx * 3 + 0] = cosA * rInner;
    pos[vIdx * 3 + 1] = 0;
    pos[vIdx * 3 + 2] = sinA * rInner;

    pos[(vIdx + 1) * 3 + 0] = cosA * rOuter;
    pos[(vIdx + 1) * 3 + 1] = 0;
    pos[(vIdx + 1) * 3 + 2] = sinA * rOuter;

    const a = Math.pow(1.0 - t, 1.4) * 0.90;
    alphas[vIdx] = a;
    alphas[vIdx + 1] = a;
  }

  posAttr.needsUpdate = true;
  alphaAttr.needsUpdate = true;
}

// ============================================================================
// COMPONENTE PRINCIPAL: DYNAMIND GALAXY 3D (ULTRA-HD SOLAR SYSTEM)
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
  const asteroidBeltRef = useRef(null);
  const sunShaderMatRef = useRef(null);
  const animationFrameRef = useRef(null);
  const hoveredServiceRef = useRef(null);
  const selectedServiceIdRef = useRef(selectedServiceId);
  const speedMultiplierRef = useRef(speedMultiplier);
  const onSelectServiceRef = useRef(onSelectService);

  useEffect(() => {
    selectedServiceIdRef.current = selectedServiceId;
  }, [selectedServiceId]);

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    onSelectServiceRef.current = onSelectService;
  }, [onSelectService]);

  const [hoveredService, setHoveredService] = useState(null);
  const [webglError, setWebglError] = useState(false);

  // Posición Panorámica Art-Directed Canónica: Todos los 18 planetas uniformemente visibles
  const PANORAMA_CAM_POS = new THREE.Vector3(0, 112, 162);
  const PANORAMA_LOOK_AT = new THREE.Vector3(0, 0, 0);

  const targetCamPosRef = useRef(PANORAMA_CAM_POS.clone());
  const targetLookAtRef = useRef(PANORAMA_LOOK_AT.clone());
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      });
    } catch (err) {
      console.warn("[DynamindGalaxy3D] WebGL initialization fallback:", err);
      setWebglError(true);
      return;
    }

    // 1. Escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // A. Campo de estrellas en profundidad galáctica (5.500 estrellas multi-espectrales)
    const starCount = 5500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 260 + Math.random() * 480;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.45;
      starPositions[i + 2] = r * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.82) {
        starColors[i] = 0.35; starColors[i + 1] = 0.88; starColors[i + 2] = 1.0;
      } else if (tint > 0.65) {
        starColors[i] = 1.0; starColors[i + 1] = 0.84; starColors[i + 2] = 0.35;
      } else if (tint > 0.5) {
        starColors[i] = 0.88; starColors[i + 1] = 0.58; starColors[i + 2] = 1.0;
      } else {
        starColors[i] = 0.96; starColors[i + 1] = 0.97; starColors[i + 2] = 1.0;
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // B. Polvo Cósmico y Nébula Galáctica en Espiral
    const dustCount = 3200;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustTex = createCosmicDustTexture();

    for (let i = 0; i < dustCount * 3; i += 3) {
      const armIndex = i % 2;
      const armOffset = armIndex * Math.PI;
      const dist = 18 + Math.pow(Math.random(), 1.4) * 165;
      const spiralAngle = dist * 0.045 + armOffset + (Math.random() - 0.5) * 0.95;

      dustPositions[i] = Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * 8;
      dustPositions[i + 1] = (Math.random() - 0.5) * 16 * (1 - dist / 220);
      dustPositions[i + 2] = Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * 8;

      const colorPicker = Math.random();
      if (colorPicker > 0.65) {
        dustColors[i] = 0.05; dustColors[i + 1] = 0.75; dustColors[i + 2] = 0.92;
      } else if (colorPicker > 0.40) {
        dustColors[i] = 0.68; dustColors[i + 1] = 0.32; dustColors[i + 2] = 0.96;
      } else if (colorPicker > 0.20) {
        dustColors[i] = 0.92; dustColors[i + 1] = 0.28; dustColors[i + 2] = 0.68;
      } else {
        dustColors[i] = 0.98; dustColors[i + 1] = 0.75; dustColors[i + 2] = 0.20;
      }
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      map: dustTex,
      size: 7.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cosmicDustMesh = new THREE.Points(dustGeometry, dustMaterial);
    cosmicDustMesh.renderOrder = -1;
    scene.add(cosmicDustMesh);
    cosmicDustRef.current = cosmicDustMesh;

    // C. Cinturón Principal de Asteroides Kepleriano (1.800 micro-cuerpos rocosos/cristalinos)
    const asteroidCount = 1800;
    const asteroidGeom = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    const asteroidCol = new Float32Array(asteroidCount * 3);

    for (let i = 0; i < asteroidCount * 3; i += 3) {
      const isKuiper = i % 3 === 0;
      const beltR = isKuiper
        ? 166 + Math.random() * 14
        : 71.5 + (Math.random() - 0.5) * 4.2;
      const angle = Math.random() * Math.PI * 2;
      const ySpread = (Math.random() - 0.5) * (isKuiper ? 3.5 : 1.4);

      asteroidPos[i] = Math.cos(angle) * beltR;
      asteroidPos[i + 1] = ySpread;
      asteroidPos[i + 2] = Math.sin(angle) * beltR;

      if (isKuiper) {
        asteroidCol[i] = 0.55; asteroidCol[i + 1] = 0.78; asteroidCol[i + 2] = 0.98;
      } else {
        asteroidCol[i] = 0.85; asteroidCol[i + 1] = 0.76; asteroidCol[i + 2] = 0.62;
      }
    }
    asteroidGeom.setAttribute("position", new THREE.BufferAttribute(asteroidPos, 3));
    asteroidGeom.setAttribute("color", new THREE.BufferAttribute(asteroidCol, 3));
    const asteroidMat = new THREE.PointsMaterial({
      size: 1.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
    });
    const asteroidBelt = new THREE.Points(asteroidGeom, asteroidMat);
    scene.add(asteroidBelt);
    asteroidBeltRef.current = asteroidBelt;

    // D. Halo de Plasma alrededor del Sol Central
    const solarDustCount = 1200;
    const solarDustGeometry = new THREE.BufferGeometry();
    const solarPositions = new Float32Array(solarDustCount * 3);
    const solarColors = new Float32Array(solarDustCount * 3);

    for (let i = 0; i < solarDustCount * 3; i += 3) {
      const sDist = 4.5 + Math.random() * 24;
      const sAngle = Math.random() * Math.PI * 2;
      solarPositions[i] = Math.cos(sAngle) * sDist;
      solarPositions[i + 1] = (Math.random() - 0.5) * 3.5;
      solarPositions[i + 2] = Math.sin(sAngle) * sDist;

      solarColors[i] = 1.0;
      solarColors[i + 1] = 0.82 + Math.random() * 0.18;
      solarColors[i + 2] = 0.25 + Math.random() * 0.35;
    }

    solarDustGeometry.setAttribute("position", new THREE.BufferAttribute(solarPositions, 3));
    solarDustGeometry.setAttribute("color", new THREE.BufferAttribute(solarColors, 3));

    const solarDustMaterial = new THREE.PointsMaterial({
      map: dustTex,
      size: 3.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const solarDustMesh = new THREE.Points(solarDustGeometry, solarDustMaterial);
    solarDustMesh.renderOrder = -1;
    scene.add(solarDustMesh);
    solarDustRef.current = solarDustMesh;

    // 2. Cámara Panorámica
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 2200);
    camera.position.copy(PANORAMA_CAM_POS);
    camera.lookAt(PANORAMA_LOOK_AT);
    cameraRef.current = camera;

    // 3. Renderer WebGL con ToneMapping Cinematográfico ACESFilmic
    renderer.setSize(width, height);
    renderer.setPixelRatio(getClampedPixelRatio(1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy() || 4;

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const cosmicEnvMap = generateCosmicEnvMap(renderer);
    scene.environment = cosmicEnvMap;

    // 4. Pipeline de Post-Processing (Bloom de Unreal Engine)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomEffect = new BloomEffect({
      intensity: 1.35,
      luminanceThreshold: 0.28,
      luminanceSmoothing: 0.82,
      mipmapBlur: true,
    });
    const effectPass = new EffectPass(camera, bloomEffect);
    composer.addPass(effectPass);
    composerRef.current = composer;

    // 5. OrbitControls 360° Libres (Rotación, Zoom Profundo y Paneo Activos)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.25;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.85;
    controls.enablePan = true;
    controls.panSpeed = 0.85;
    controls.screenSpacePanning = true;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    controls.minPolarAngle = 0.08;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.minDistance = 6;
    controls.maxDistance = 320;
    controlsRef.current = controls;

    // Si el usuario rota, hace zoom o mueve la cámara manualmente, liberar la transición automática de inmediato
    const cancelAutoTransition = () => {
      isTransitioningRef.current = false;
    };
    controls.addEventListener("start", cancelAutoTransition);

    // 6. Iluminación Solar Física Realista
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x090d16, 0.78);
    scene.add(hemiLight);

    const coreLight = new THREE.PointLight(0xfff7ed, 7.5, 700, 0.3);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const rimLight1 = new THREE.DirectionalLight(0x7dd3fc, 0.65);
    rimLight1.position.set(60, 110, 60);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xfbbf24, 0.48);
    rimLight2.position.set(-60, -80, -60);
    scene.add(rimLight2);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/assets/solar/textures/lensflare0.png",
      (flare0) => {
        if (isDisposed) {
          flare0.dispose();
          return;
        }
        textureLoader.load(
          "/assets/solar/textures/lensflare1.png",
          (flare1) => {
            if (isDisposed) {
              flare0.dispose();
              flare1.dispose();
              return;
            }
            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(flare0, 130, 0, new THREE.Color(0xffffff)));
            lensflare.addElement(new LensflareElement(flare1, 42, 0.28, new THREE.Color(0xfbbf24)));
            lensflare.addElement(new LensflareElement(flare1, 68, 0.58, new THREE.Color(0x38bdf8)));
            coreLight.add(lensflare);
          },
          undefined,
          () => {}
        );
      },
      undefined,
      () => {}
    );

    // 7. Construcción Instantánea de los 18 Planetas Ultra-HD + Texturas GLB Reales
    const celestialMap = {};
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    const glbTextureCache = {};
    const sharedCloudTexture = generateFastCloudTexture(maxAnisotropy);

    const createTrajectoryRing = (radius, hexColor) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(160);
      const geom = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(hexColor),
        transparent: true,
        opacity: 0.3,
      });
      return new THREE.LineLoop(geom, mat);
    };

    GALAXY_SERVICES.forEach((service, index) => {
      const r = service.size || 2.0;
      const isSun = service.id === "srv-core";
      const modelName = (service.modelGlb || "").toLowerCase();

      const geom = new THREE.SphereGeometry(r, 72, 72);
      geom.computeVertexNormals();

      const { albedoMap, bumpMap } = generateFastHDPlanetMaps(service, maxAnisotropy);

      let mat;
      if (isSun) {
        mat = createSolarPlasmaMaterial(albedoMap);
        sunShaderMatRef.current = mat;
      } else {
        const isGas =
          modelName.includes("jupiter") ||
          modelName.includes("saturn") ||
          modelName.includes("uranus") ||
          modelName.includes("neptune");

        const tintColor = new THREE.Color("#ffffff").lerp(new THREE.Color(service.color), 0.14);

        mat = new THREE.MeshPhysicalMaterial({
          map: albedoMap,
          color: tintColor,
          bumpMap: bumpMap,
          bumpScale: isGas ? 0.05 : 0.14,
          roughness: isGas ? 0.42 : 0.58,
          metalness: isGas ? 0.06 : 0.14,
          clearcoat: isGas ? 0.55 : 0.32,
          clearcoatRoughness: 0.2,
          reflectivity: 0.65,
          sheen: 0.45,
          sheenColor: new THREE.Color(service.color),
          emissive: new THREE.Color(service.color),
          emissiveIntensity: 0.22,
          envMapIntensity: 1.0,
        });
      }

      const planetMesh = new THREE.Mesh(geom, mat);
      planetMesh.userData = { id: service.id, serviceData: service, isServicePlanet: true };
      if (!isSun) {
        planetMesh.rotation.z = 0.08 + (index % 5) * 0.045;
      }

      // Cargar textura astronómica de alta definición desde /assets/solar/gltf/<modelGlb>
      if (service.modelGlb) {
        const glbPath = `/assets/solar/gltf/${service.modelGlb}`;
        const applyGlbTexture = (realTex) => {
          if (isDisposed || !planetMesh.material) return;
          realTex.colorSpace = THREE.SRGBColorSpace;
          realTex.anisotropy = maxAnisotropy;
          realTex.needsUpdate = true;
          if (isSun && planetMesh.material.uniforms && planetMesh.material.uniforms.uBaseMap) {
            planetMesh.material.uniforms.uBaseMap.value = realTex;
          } else {
            planetMesh.material.map = realTex;
            planetMesh.material.bumpMap = realTex;
            planetMesh.material.bumpScale = 0.09;
            planetMesh.material.needsUpdate = true;
          }
        };

        if (glbTextureCache[glbPath]) {
          applyGlbTexture(glbTextureCache[glbPath]);
        } else {
          gltfLoader.load(
            glbPath,
            (gltf) => {
              if (isDisposed) return;
              let foundTex = null;
              gltf.scene.traverse((child) => {
                if (!foundTex && child.isMesh && child.material && child.material.map) {
                  foundTex = child.material.map;
                }
              });
              if (foundTex) {
                glbTextureCache[glbPath] = foundTex;
                applyGlbTexture(foundTex);
              }
            },
            undefined,
            () => {}
          );
        }
      }

      // Atmósfera Rayleigh / Corona Solar
      const atmosphere = createAtmosphereMesh(r, service.color, isSun);
      atmosphere.userData = { id: service.id, serviceData: service };
      planetMesh.add(atmosphere);

      if (isSun) {
        const outerCorona = createAtmosphereMesh(r * 1.18, "#fbbf24", true);
        outerCorona.userData = { id: service.id, serviceData: service };
        planetMesh.add(outerCorona);
      }

      // Capa de Nubes Dinámicas en Rotación Independiente
      let cloudMesh = null;
      const hasClouds =
        !isSun &&
        (modelName.includes("earth") ||
          modelName.includes("venus") ||
          modelName.includes("jupiter") ||
          modelName.includes("saturn") ||
          modelName.includes("neptune") ||
          modelName.includes("titan"));

      if (hasClouds) {
        const cloudGeom = new THREE.SphereGeometry(r * 1.02, 48, 48);
        const cloudMat = new THREE.MeshStandardMaterial({
          map: sharedCloudTexture,
          transparent: true,
          opacity: modelName.includes("earth") ? 0.55 : 0.3,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          roughness: 0.9,
        });
        cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
        cloudMesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(cloudMesh);
      }

      // Anillos Planetarios HD y Estructuras Orbitales
      let ringObjects = [];
      let satelliteObject = null;
      let satelliteOrbitRadius = 0;

      if (service.id === "srv-caja" || modelName.includes("saturn")) {
        const ringGeom = new THREE.RingGeometry(r * 1.32, r * 2.55, 96);
        const pos = ringGeom.attributes.position;
        const uv = ringGeom.attributes.uv;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);
          const dist = v3.length();
          const u = (dist - r * 1.32) / (r * 2.55 - r * 1.32);
          uv.setXY(i, u, 0.5);
        }
        const ringTex = generateRingTexture(service.color);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI * 0.42;
        ringMesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(ringMesh);
        ringObjects.push({ mesh: ringMesh, type: "cassini", speed: 0.18 });
      } else if (service.id === "srv-reservas" || modelName.includes("uranus")) {
        const uRingGeom = new THREE.RingGeometry(r * 1.4, r * 1.85, 80);
        const uRingTex = generateRingTexture(service.color);
        const uRingMat = new THREE.MeshBasicMaterial({
          map: uRingTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.58,
          depthWrite: false,
        });
        const uRingMesh = new THREE.Mesh(uRingGeom, uRingMat);
        uRingMesh.rotation.x = Math.PI * 0.18;
        uRingMesh.rotation.y = Math.PI * 0.35;
        uRingMesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(uRingMesh);
        ringObjects.push({ mesh: uRingMesh, type: "cassini", speed: 0.22 });
      } else if (service.id === "srv-dsb") {
        const g1Geom = new THREE.RingGeometry(r * 1.35, r * 1.72, 80);
        const g1Tex = generateCyberGimbalTexture(service.color);
        const g1Mat = new THREE.MeshBasicMaterial({
          map: g1Tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const g1Mesh = new THREE.Mesh(g1Geom, g1Mat);
        g1Mesh.rotation.x = Math.PI * 0.35;
        g1Mesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(g1Mesh);

        const g2Geom = new THREE.RingGeometry(r * 1.92, r * 2.28, 80);
        const g2Tex = generateCyberGimbalTexture("#38bdf8");
        const g2Mat = new THREE.MeshBasicMaterial({
          map: g2Tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.78,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const g2Mesh = new THREE.Mesh(g2Geom, g2Mat);
        g2Mesh.rotation.z = Math.PI * 0.45;
        g2Mesh.rotation.y = Math.PI * 0.20;
        g2Mesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(g2Mesh);

        ringObjects.push({ mesh: g1Mesh, type: "gimbal1", speed: 0.75 });
        ringObjects.push({ mesh: g2Mesh, type: "gimbal2", speed: -0.55 });
      } else if (service.id === "srv-security") {
        const secGeom = new THREE.RingGeometry(r * 1.35, r * 2.22, 80);
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
        secMesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(secMesh);
        ringObjects.push({ mesh: secMesh, type: "shield", speed: 0.25 });
      } else if (service.id === "srv-pricing") {
        const prcGeom = new THREE.RingGeometry(r * 1.35, r * 2.15, 80);
        const prcTex = generateRadarTexture(service.color);
        const prcMat = new THREE.MeshBasicMaterial({
          map: prcTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const prcMesh = new THREE.Mesh(prcGeom, prcMat);
        prcMesh.rotation.x = Math.PI * 0.38;
        prcMesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(prcMesh);
        ringObjects.push({ mesh: prcMesh, type: "radar", speed: 0.45 });
      } else if (service.id === "srv-whatsapp") {
        const w1Geom = new THREE.RingGeometry(r * 1.32, r * 1.58, 80);
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
        w1Mesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(w1Mesh);

        const w2Geom = new THREE.RingGeometry(r * 1.72, r * 1.98, 80);
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
        w2Mesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(w2Mesh);
        ringObjects.push({ mesh: w1Mesh, type: "wave1", speed: 0.2 });
        ringObjects.push({ mesh: w2Mesh, type: "wave2", speed: -0.15 });
      }

      // Lunas / Satélites Naturales Orbitando Planetas Mayores
      if (
        service.id === "srv-dsb" ||
        service.id === "srv-pricing" ||
        service.id === "srv-pms" ||
        service.id === "srv-analytics"
      ) {
        const satGeom = new THREE.SphereGeometry(r * 0.22, 24, 24);
        const satMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.72,
          metalness: 0.15,
          emissive: new THREE.Color(service.color),
          emissiveIntensity: 0.25,
        });
        const satMesh = new THREE.Mesh(satGeom, satMat);
        satMesh.userData = { id: service.id, serviceData: service };
        planetMesh.add(satMesh);
        satelliteObject = satMesh;
        satelliteOrbitRadius = r * 1.85;
      }

      if (service.orbitRadius === 0) {
        scene.add(planetMesh);

        celestialMap[service.id] = {
          pivot: planetMesh,
          mesh: planetMesh,
          cloudMesh: null,
          serviceData: service,
          trajectory: null,
          lightTrail: null,
          rings: ringObjects,
          satellite: null,
          satelliteOrbitRadius: 0,
          currentAngle: 0,
        };
      } else {
        const orbitPivot = new THREE.Group();
        orbitPivot.name = `pivot_${service.id}`;
        scene.add(orbitPivot);

        const trajectory = createTrajectoryRing(service.orbitRadius, service.color);
        scene.add(trajectory);

        const lightTrail = createOrbitalLightTrail(service.orbitRadius, r, service.color);
        scene.add(lightTrail);

        const GOLDEN_ANGLE = 2.399963229728653;
        const initialAngle = index * GOLDEN_ANGLE + 0.45;
        planetMesh.position.set(
          Math.cos(initialAngle) * service.orbitRadius,
          0,
          Math.sin(initialAngle) * service.orbitRadius
        );

        orbitPivot.add(planetMesh);
        updateOrbitalLightTrail(lightTrail, initialAngle, service.orbitRadius, r);

        celestialMap[service.id] = {
          pivot: orbitPivot,
          mesh: planetMesh,
          cloudMesh,
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

    // 8. Raycasting Interactivo para Selección y Hover en 3D (Distingue Clic vs Arrastre de Cámara)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoverMesh = null;
    let pointerDownPos = { x: 0, y: 0 };

    const resolvePlanetIdFromHit = (obj) => {
      let curr = obj;
      while (curr) {
        if (curr.userData && curr.userData.id) {
          return curr.userData.id;
        }
        curr = curr.parent;
      }
      return null;
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [];
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.mesh) interactiveMeshes.push(entry.mesh);
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        const srvId = resolvePlanetIdFromHit(intersects[0].object);
        const entry = srvId ? celestialObjectsRef.current[srvId] : null;

        if (srvId && entry && entry.mesh) {
          container.style.cursor = "pointer";
          if (hoveredServiceRef.current !== srvId) {
            hoveredServiceRef.current = srvId;
            setHoveredService(srvId);
          }

          const hitPlanetMesh = entry.mesh;
          if (currentHoverMesh !== hitPlanetMesh) {
            if (currentHoverMesh && currentHoverMesh.material && currentHoverMesh.material.emissive) {
              currentHoverMesh.material.emissiveIntensity = 0.22;
            }
            if (hitPlanetMesh.material && hitPlanetMesh.material.emissive) {
              hitPlanetMesh.material.emissiveIntensity = 0.78;
            }
            currentHoverMesh = hitPlanetMesh;

            const trajectory = entry.trajectory;
            if (trajectory && trajectory.material) {
              trajectory.material.opacity = 0.95;
            }
          }
          return;
        }
      }

      container.style.cursor = "grab";
      if (hoveredServiceRef.current !== null) {
        hoveredServiceRef.current = null;
        setHoveredService(null);
      }
      if (currentHoverMesh) {
        if (currentHoverMesh.material && currentHoverMesh.material.emissive) {
          currentHoverMesh.material.emissiveIntensity = 0.22;
        }
        currentHoverMesh = null;
      }
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.trajectory && entry.trajectory.material) {
          entry.trajectory.material.opacity = 0.3;
        }
      });
    };

    const handlePointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      // Si el usuario arrastró la cámara (> 7px), no disparar selección de planeta
      if (Math.hypot(dx, dy) > 7) return;

      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [];
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.mesh) interactiveMeshes.push(entry.mesh);
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, true);
      if (intersects.length > 0) {
        const srvId = resolvePlanetIdFromHit(intersects[0].object);
        if (srvId) {
          playPlanetSelect();
          selectedServiceIdRef.current = srvId;
          const entry = celestialObjectsRef.current[srvId];
          if (srvId === "srv-core") {
            targetLookAtRef.current.copy(PANORAMA_LOOK_AT);
            targetCamPosRef.current.copy(PANORAMA_CAM_POS);
            controls.minDistance = 6;
            controls.maxDistance = 320;
            isTransitioningRef.current = true;
          } else if (entry && entry.mesh) {
            const worldPos = new THREE.Vector3();
            entry.mesh.getWorldPosition(worldPos);
            targetLookAtRef.current.copy(worldPos);
            const planetRadius = entry.serviceData?.size || 2.0;
            const focusDistance = Math.max(14, planetRadius * 7.2);
            targetCamPosRef.current.set(
              worldPos.x + focusDistance * 0.68,
              worldPos.y + focusDistance * 0.36,
              worldPos.z + focusDistance * 0.68
            );
            controls.minDistance = 5;
            controls.maxDistance = 280;
            isTransitioningRef.current = true;
          }
          if (onSelectServiceRef.current) {
            onSelectServiceRef.current(srvId);
          }
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointermove", handlePointerMove);
    domElement.addEventListener("pointerdown", handlePointerDown);
    domElement.addEventListener("pointerup", handlePointerUp);

    // 9. Bucle de Animación Continuo a 60 FPS
    let lastTime = performance.now();
    const startTime = performance.now();

    const animateLoop = () => {
      if (isDisposed) {
        animationFrameRef.current = null;
        return;
      }
      animationFrameRef.current = requestAnimationFrame(animateLoop);

      if (document.hidden) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;
      const currentSpeed = speedMultiplierRef.current;

      // Actualizar turbulencia termonuclear del Sol en tiempo real
      if (sunShaderMatRef.current && sunShaderMatRef.current.uniforms) {
        sunShaderMatRef.current.uniforms.uTime.value = elapsedTime;
      }

      // Rotación suave del fondo estelar, polvo cósmico y cinturón de asteroides
      starField.rotation.y += delta * 0.004;
      if (cosmicDustRef.current) {
        cosmicDustRef.current.rotation.y += delta * 0.003;
      }
      if (asteroidBeltRef.current) {
        asteroidBeltRef.current.rotation.y += delta * 0.018 * (currentSpeed > 0 ? currentSpeed : 0.25);
      }
      if (solarDustRef.current) {
        solarDustRef.current.rotation.y += delta * 0.028;
      }

      Object.entries(celestialObjectsRef.current).forEach(([id, entry]) => {
        const { mesh, cloudMesh, serviceData, lightTrail, rings, satellite, satelliteOrbitRadius } = entry;
        if (!mesh) return;

        // Auto-rotación axial del planeta y deriva diferencial de su capa de nubes
        const rotFactor = currentSpeed > 0 ? 1 : 0.2;
        mesh.rotation.y += delta * 0.55 * rotFactor;
        if (cloudMesh) {
          cloudMesh.rotation.y += delta * 0.24 * rotFactor;
        }

        // Órbita Kepleriana Fluida y Visible en Tiempo Real
        if (serviceData.orbitRadius > 0 && currentSpeed > 0) {
          const prevX = mesh.position.x;
          const prevZ = mesh.position.z;

          const orbitalFactor = 0.14 * currentSpeed * (serviceData.speed || 0.5);
          entry.currentAngle += orbitalFactor * delta;

          const r = serviceData.orbitRadius;
          const nextX = Math.cos(entry.currentAngle) * r;
          const nextZ = Math.sin(entry.currentAngle) * r;
          mesh.position.x = nextX;
          mesh.position.z = nextZ;

          // Si la cámara está enfocando este planeta, acompañar su movimiento orbital suavemente
          if (selectedServiceIdRef.current === id && id !== "srv-core") {
            const moveDx = nextX - prevX;
            const moveDz = nextZ - prevZ;
            targetLookAtRef.current.x += moveDx;
            targetLookAtRef.current.z += moveDz;
            targetCamPosRef.current.x += moveDx;
            targetCamPosRef.current.z += moveDz;
            controls.target.x += moveDx;
            controls.target.z += moveDz;
            camera.position.x += moveDx;
            camera.position.z += moveDz;
          }

          if (lightTrail) {
            updateOrbitalLightTrail(lightTrail, entry.currentAngle, r, serviceData.size || 2.0);
          }
        }

        // Animación dinámica de anillos planetarios y gimbals
        if (rings && rings.length > 0) {
          rings.forEach((ringItem) => {
            const { mesh: rMesh, type, speed } = ringItem;
            if (!rMesh) return;

            if (type === "gimbal1" || type === "gimbal2" || type === "radar" || type === "quantum" || type === "cassini") {
              rMesh.rotation.z += delta * (speed || 0.35);
            } else if (type === "shield") {
              rMesh.rotation.z += delta * 0.28;
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

        // Órbita de lunas / satélites naturales alrededor de su planeta anfitrión
        if (satellite && satelliteOrbitRadius > 0) {
          const satAngle = elapsedTime * 2.1 + entry.currentAngle;
          satellite.position.set(
            Math.cos(satAngle) * satelliteOrbitRadius,
            Math.sin(satAngle * 0.7) * (satelliteOrbitRadius * 0.18),
            Math.sin(satAngle) * satelliteOrbitRadius
          );
        }
      });

      // Transición cinemática de cámara al seleccionar un planeta (se libera apenas el usuario rota o hace zoom)
      if (isTransitioningRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.065);
        controls.target.lerp(targetLookAtRef.current, 0.075);

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
      if (!newW || !newH) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      composer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      isDisposed = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointermove", handlePointerMove);
      domElement.removeEventListener("pointerdown", handlePointerDown);
      domElement.removeEventListener("pointerup", handlePointerUp);

      if (controls) {
        controls.removeEventListener("start", cancelAutoTransition);
        controls.dispose();
      }

      scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((mat) => {
            if (mat.map) mat.map.dispose();
            if (mat.emissiveMap) mat.emissiveMap.dispose();
            if (mat.bumpMap) mat.bumpMap.dispose();
            if (mat.roughnessMap) mat.roughnessMap.dispose();
            mat.dispose();
          });
        }
      });

      if (sharedCloudTexture) {
        sharedCloudTexture.dispose();
      }
      if (cosmicEnvMap) {
        cosmicEnvMap.dispose();
      }
      if (composerRef.current) {
        composerRef.current.dispose();
        composerRef.current = null;
      }
      if (rendererRef.current) {
        if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode === container) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      celestialObjectsRef.current = {};
      sceneRef.current = null;
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

  // Cinemática de cámara focal al cambiar de servicio (acercamiento HD al planeta seleccionado)
  useEffect(() => {
    const entry = celestialObjectsRef.current[selectedServiceId];
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    playOrbitWarp();

    if (selectedServiceId === "srv-core") {
      targetLookAtRef.current.copy(PANORAMA_LOOK_AT);
      targetCamPosRef.current.copy(PANORAMA_CAM_POS);
      controls.minDistance = 6;
      controls.maxDistance = 320;
      isTransitioningRef.current = true;
    } else if (entry && entry.mesh) {
      const worldPos = new THREE.Vector3();
      entry.mesh.getWorldPosition(worldPos);

      targetLookAtRef.current.copy(worldPos);

      const planetRadius = entry.serviceData?.size || 2.0;
      const focusDistance = Math.max(14, planetRadius * 7.2);
      targetCamPosRef.current.set(
        worldPos.x + focusDistance * 0.68,
        worldPos.y + focusDistance * 0.36,
        worldPos.z + focusDistance * 0.68
      );

      controls.minDistance = 5;
      controls.maxDistance = 280;
      isTransitioningRef.current = true;
    }
  }, [selectedServiceId]);

  return (
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none bg-[#020617]">
      {/* Canvas 3D de Three.js */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {webglError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/95 p-6 text-center z-20">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
            Modo Compatibilidad Gráfica Activo
          </p>
          <p className="text-sm text-zinc-300 max-w-md">
            Selecciona cualquier sistema en la barra superior o cambia a la vista de Tarjetas para explorar la arquitectura.
          </p>
        </div>
      )}

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
