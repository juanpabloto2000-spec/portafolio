// src/components/systems/DynamindGalaxy3D.jsx
// Motor WebGL Three.js Ultra-HD PBR con Shaders GLSL de Plasma Solar, Dispersión Atmosférica Rayleigh,
// Mapas de Relieve Topográfico (Bump/Normal), Capas de Nubes en Rotación, Texturas Astronómicas GLB Reales,
// Cinturón de Asteroides y Post-Processing (Bloom de Unreal Engine) a 60 FPS.

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from "postprocessing";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playPlanetSelect, playOrbitWarp } from "../../utils/audioEffects";
import { getClampedPixelRatio, createVisibilityObserver } from "../../utils/webglPerformanceGuard";

// ============================================================================
// UTILIDADES MATEMÁTICAS DE RUIDO FRACTAL DETERMINISTA (FBM) PARA TEXTURAS 2K
// ============================================================================
function hash2D(x, y, seed = 1) {
  const h = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return h - Math.floor(h);
}

function smoothNoise(x, y, seed = 1) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);

  const a = hash2D(ix, iy, seed);
  const b = hash2D(ix + 1, iy, seed);
  const c = hash2D(ix, iy + 1, seed);
  const d = hash2D(ix + 1, iy + 1, seed);

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbmNoise(x, y, octaves = 4, seed = 1) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1.0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * smoothNoise(x * frequency, y * frequency, seed + i * 17);
    frequency *= 2.05;
    amplitude *= 0.5;
  }
  return value;
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
// GENERADOR DE TEXTURAS PLANETARIAS ULTRA-HD (ALBEDO + BUMP + EMISSIVE NIGHT)
// Crea superficies ricas con relieve topográfico, tormentas, cráteres y luces nocturnas
// ============================================================================
function generateHDPlanetMaps(service, maxAnisotropy = 4) {
  const width = 1024;
  const height = 512;

  // 1. Canvas Albedo (Color superficial de alta definición)
  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const ctx = albedoCanvas.getContext("2d");

  // 2. Canvas Bump (Mapa de alturas topográficas para sombras de cráteres y cordilleras)
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext("2d");

  // 3. Canvas Emissive (Luces de ciudades / filamentos de energía en el lado nocturno)
  const emissiveCanvas = document.createElement("canvas");
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const eCtx = emissiveCanvas.getContext("2d");

  const hex = service.color || "#06b6d4";
  const modelName = (service.modelGlb || "").toLowerCase();
  const seed = service.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  // Fondo base de alturas (gris neutro 50%)
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, width, height);

  // Fondo base emisivo negro (sin emisión salvo en grietas/ciudades)
  eCtx.fillStyle = "#000000";
  eCtx.fillRect(0, 0, width, height);

  const isGasGiant =
    modelName.includes("jupiter") ||
    modelName.includes("saturn") ||
    modelName.includes("uranus") ||
    modelName.includes("neptune");

  const isTerrestrialOcean =
    modelName.includes("earth") || service.id === "srv-dsb" || service.id === "srv-vouchers";

  const isVolcanicOrMars =
    modelName.includes("mars") || modelName.includes("io") || modelName.includes("venus");

  if (service.id === "srv-core") {
    // ☀️ TEXTURA BASE SOLAR DE ALTA DEFINICIÓN
    const sunGrad = ctx.createLinearGradient(0, 0, 0, height);
    sunGrad.addColorStop(0, "#b45309");
    sunGrad.addColorStop(0.25, "#f59e0b");
    sunGrad.addColorStop(0.5, "#fef08a");
    sunGrad.addColorStop(0.75, "#f59e0b");
    sunGrad.addColorStop(1, "#b45309");
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 900; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 4 + Math.random() * 42;
      const flareGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      flareGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      flareGrad.addColorStop(0.35, "rgba(254, 240, 138, 0.7)");
      flareGrad.addColorStop(0.7, "rgba(245, 158, 11, 0.35)");
      flareGrad.addColorStop(1, "rgba(180, 83, 9, 0)");
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (isGasGiant) {
    // 🪐 GIGANTES GASEOSOS Y DE HIELO: BANDAS ZONALES MULTICAPA, CORRIENTES EN CHORRO Y CICLONES
    const baseDark = adjustColor(hex, -75);
    const baseMid = adjustColor(hex, -20);
    const baseLight = adjustColor(hex, 45);
    const cream = adjustColor(hex, 85);

    for (let y = 0; y < height; y++) {
      const lat = y / height;
      const band1 = Math.sin(lat * Math.PI * 18 + Math.sin(lat * Math.PI * 7) * 1.4);
      const band2 = Math.cos(lat * Math.PI * 34) * 0.45;
      const band3 = fbmNoise(lat * 12, seed * 0.1, 3, seed) * 0.8 - 0.4;
      const mix = band1 * 0.55 + band2 * 0.25 + band3 * 0.2;

      // Color de banda atmosférica
      let rowColor;
      if (mix > 0.35) rowColor = cream;
      else if (mix > 0.05) rowColor = baseLight;
      else if (mix > -0.25) rowColor = hex;
      else if (mix > -0.55) rowColor = baseMid;
      else rowColor = baseDark;

      ctx.fillStyle = rowColor;
      ctx.fillRect(0, y, width, 1);

      // Relieve sutil de bandas nubosas en el bumpMap
      const bumpVal = Math.floor(128 + mix * 38);
      bCtx.fillStyle = `rgb(${bumpVal},${bumpVal},${bumpVal})`;
      bCtx.fillRect(0, y, width, 1);
    }

    // Turbulencia de Kelvin-Helmholtz y vórtices anticiclónicos (tipo Gran Mancha Roja / Oval BA)
    for (let i = 0; i < 65; i++) {
      const cx = Math.random() * width;
      const cy = 40 + Math.random() * (height - 80);
      const rx = 14 + Math.random() * 58;
      const ry = 6 + Math.random() * 24;
      const isMajorStorm = i < 4;
      const stormR = isMajorStorm ? rx * 1.65 : rx;
      const stormY = isMajorStorm ? ry * 1.5 : ry;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((Math.random() - 0.5) * 0.25);
      ctx.scale(1, stormY / stormR);

      const stormGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, stormR);
      stormGrad.addColorStop(0, isMajorStorm ? "#ffffff" : "rgba(255, 255, 255, 0.75)");
      stormGrad.addColorStop(0.35, isMajorStorm ? adjustColor(hex, 60) : `${hex}cc`);
      stormGrad.addColorStop(0.7, `${baseDark}99`);
      stormGrad.addColorStop(1, "transparent");
      ctx.fillStyle = stormGrad;
      ctx.beginPath();
      ctx.arc(0, 0, stormR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Relieve de la tormenta en el bumpMap
      bCtx.save();
      bCtx.translate(cx, cy);
      bCtx.scale(1, stormY / stormR);
      const bGrad = bCtx.createRadialGradient(0, 0, 0, 0, 0, stormR);
      bGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
      bGrad.addColorStop(0.6, "rgba(180, 180, 180, 0.4)");
      bGrad.addColorStop(1, "transparent");
      bCtx.fillStyle = bGrad;
      bCtx.beginPath();
      bCtx.arc(0, 0, stormR, 0, Math.PI * 2);
      bCtx.fill();
      bCtx.restore();
    }

    // Filamentos de tormentas eléctricas aurorales en el lado nocturno
    eCtx.strokeStyle = hex;
    eCtx.lineWidth = 1.2;
    for (let i = 0; i < 28; i++) {
      const y = 60 + Math.random() * (height - 120);
      const x = Math.random() * width;
      const eGrad = eCtx.createRadialGradient(x, y, 0, x, y, 22);
      eGrad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
      eGrad.addColorStop(0.4, `${hex}66`);
      eGrad.addColorStop(1, "transparent");
      eCtx.fillStyle = eGrad;
      eCtx.beginPath();
      eCtx.arc(x, y, 22, 0, Math.PI * 2);
      eCtx.fill();
    }
  } else if (isTerrestrialOcean) {
    // 🌍 MUNDOS OCEÁNICOS Y CONTINENTALES: OCÉANOS PROFUNDOS, PLATAFORMAS CONTINENTALES, CORDILLERAS Y LUCES NOCTURNAS
    const oceanDeep = adjustColor(hex, -85);
    const oceanShallow = adjustColor(hex, -25);
    const landLow = adjustColor(hex, 28);
    const landMountain = adjustColor(hex, 75);

    const step = 4;
    for (let y = 0; y < height; y += step) {
      const lat = Math.abs(y / height - 0.5) * 2; // 0 en ecuador, 1 en polos
      for (let x = 0; x < width; x += step) {
        const n = fbmNoise(x * 0.008, y * 0.008, 5, seed);
        if (lat > 0.86 + (n - 0.5) * 0.12) {
          // Casquetes polares de hielo brillante
          ctx.fillStyle = "#f8fafc";
          bCtx.fillStyle = "#d4d4d8";
        } else if (n > 0.51) {
          // Continente y cordilleras
          const elev = (n - 0.51) / 0.49;
          ctx.fillStyle = elev > 0.45 ? landMountain : landLow;
          const bVal = Math.min(255, Math.floor(145 + elev * 110));
          bCtx.fillStyle = `rgb(${bVal},${bVal},${bVal})`;

          // Luces de ciudades y nodos neuronales en los continentes (lado nocturno)
          if (elev > 0.08 && elev < 0.42 && Math.random() > 0.72) {
            eCtx.fillStyle = Math.random() > 0.4 ? "#fde047" : hex;
            eCtx.fillRect(x, y, 2.5, 2.5);
          }
        } else {
          // Océano profundo vs plataforma continental
          ctx.fillStyle = n > 0.45 ? oceanShallow : oceanDeep;
          bCtx.fillStyle = "#686868";
        }
        ctx.fillRect(x, y, step, step);
        bCtx.fillRect(x, y, step, step);
      }
    }
  } else {
    // 🌑 MUNDOS ROCOSOS, VOLCÁNICOS Y LUNAS HELADAS: CRÁTERES DE IMPACTO 3D, CAÑONES TECTÓNICOS Y VENAS DE ENERGÍA
    const rockDark = adjustColor(hex, -70);
    const rockMid = adjustColor(hex, -15);
    const rockHigh = adjustColor(hex, 45);

    const step = 4;
    for (let y = 0; y < height; y += step) {
      const lat = Math.abs(y / height - 0.5) * 2;
      for (let x = 0; x < width; x += step) {
        const n = fbmNoise(x * 0.01, y * 0.01, 4, seed);
        if (lat > 0.9 && !isVolcanicOrMars) {
          ctx.fillStyle = "#e2e8f0";
          bCtx.fillStyle = "#cccccc";
        } else if (n > 0.62) {
          ctx.fillStyle = rockHigh;
          bCtx.fillStyle = "#d8d8d8";
        } else if (n > 0.38) {
          ctx.fillStyle = rockMid;
          bCtx.fillStyle = "#909090";
        } else {
          ctx.fillStyle = rockDark;
          bCtx.fillStyle = "#525252";
        }
        ctx.fillRect(x, y, step, step);
        bCtx.fillRect(x, y, step, step);
      }
    }

    // Cráteres de impacto realistas con anillo elevado (rim) y pico central
    for (let i = 0; i < 85; i++) {
      const cx = Math.random() * width;
      const cy = 25 + Math.random() * (height - 50);
      const r = 4 + Math.random() * 26;

      // Albedo del cráter
      const cGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      cGrad.addColorStop(0, rockDark);
      cGrad.addColorStop(0.72, adjustColor(hex, -85));
      cGrad.addColorStop(0.88, adjustColor(hex, 55)); // Borde iluminado del cráter
      cGrad.addColorStop(1, "transparent");
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Bump (Mapa de relieve: depresión interna oscura + borde blanco elevado)
      const bGrad = bCtx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
      bGrad.addColorStop(0, "#ffffff"); // Pico central
      bGrad.addColorStop(0.2, "#262626"); // Fondo profundo del cráter
      bGrad.addColorStop(0.75, "#303030");
      bGrad.addColorStop(0.9, "#ffffff"); // Anillo de impacto elevado
      bGrad.addColorStop(1, "#808080");
      bCtx.fillStyle = bGrad;
      bCtx.beginPath();
      bCtx.arc(cx, cy, r, 0, Math.PI * 2);
      bCtx.fill();
    }

    // Fracturas tectónicas / cañones cuánticos luminosos en el mapa emisivo
    eCtx.strokeStyle = hex;
    eCtx.lineWidth = 1.4;
    for (let i = 0; i < 36; i++) {
      eCtx.beginPath();
      let px = Math.random() * width;
      let py = 40 + Math.random() * (height - 80);
      eCtx.moveTo(px, py);
      for (let seg = 0; seg < 5; seg++) {
        px += (Math.random() - 0.5) * 45;
        py += (Math.random() - 0.5) * 35;
        eCtx.lineTo(px, py);
      }
      eCtx.stroke();
    }
  }

  const configureTex = (canvas, isColor = true) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.anisotropy = maxAnisotropy;
    if (isColor) {
      tex.colorSpace = THREE.SRGBColorSpace;
    }
    tex.needsUpdate = true;
    return tex;
  };

  return {
    albedoMap: configureTex(albedoCanvas, true),
    bumpMap: configureTex(bumpCanvas, false),
    emissiveMap: configureTex(emissiveCanvas, true),
  };
}

// ============================================================================
// GENERADOR DE CAPA DE NUBES ATMOSFÉRICAS EN MOVIMIENTO (1024x512)
// ============================================================================
function generateCloudLayerTexture(seed = 1, maxAnisotropy = 4) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const step = 3;
  for (let y = 0; y < canvas.height; y += step) {
    const latFactor = Math.sin((y / canvas.height) * Math.PI);
    for (let x = 0; x < canvas.width; x += step) {
      const n = fbmNoise(x * 0.022 + Math.sin(y * 0.05) * 0.8, y * 0.032, 4, seed + 99);
      const alpha = Math.max(0, (n - 0.48) * 1.95) * latFactor;
      if (alpha > 0.04) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.78, alpha)})`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

// ============================================================================
// SHADER GLSL ANIMADO DE FOTOSFERA Y PLASMA SOLAR (60 FPS)
// Simula convección magnética, granulación hirviente y oscurecimiento de limbo
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

      // Ruido pseudo-perlin 3D rápido en GPU para turbulencia de plasma solar
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
        float n1 = noise(p + vec3(uTime * 0.18, -uTime * 0.12, uTime * 0.15));
        float n2 = noise(p * 2.4 - vec3(uTime * 0.28, uTime * 0.22, -uTime * 0.19));
        float plasma = n1 * 0.62 + n2 * 0.38;

        vec4 texColor = texture2D(uBaseMap, vUv + vec2(uTime * 0.008, 0.0));

        // Paleta termonuclear: filamentos oscuros -> naranja -> oro -> blanco incandescente
        vec3 darkSpot = vec3(0.58, 0.16, 0.02);
        vec3 orangePlasma = vec3(0.98, 0.45, 0.05);
        vec3 goldCorona = vec3(1.0, 0.85, 0.28);
        vec3 whiteCore = vec3(1.0, 0.99, 0.92);

        vec3 color = mix(darkSpot, orangePlasma, smoothstep(0.18, 0.45, plasma));
        color = mix(color, goldCorona, smoothstep(0.45, 0.72, plasma));
        color = mix(color, whiteCore, smoothstep(0.72, 0.94, plasma));
        color = mix(color, texColor.rgb * 1.25, 0.35);

        // Oscurecimiento y llamarada de limbo (Limb Darkening + Rim Eruption)
        float ndotv = max(dot(vNormal, vViewDir), 0.0);
        float limb = pow(ndotv, 0.42);
        float rimGlow = pow(1.0 - ndotv, 2.4) * 1.35;

        vec3 finalColor = color * (0.65 + 0.55 * limb) + vec3(1.0, 0.65, 0.15) * rimGlow;
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
  // Anillo D (tenue interior)
  grad.addColorStop(0.06, `${colorHex}18`);
  // Anillo C (translúcido)
  grad.addColorStop(0.18, `${colorHex}66`);
  // Anillo B (el más brillante y denso)
  grad.addColorStop(0.28, `${colorHex}ee`);
  grad.addColorStop(0.42, "#fffbeb");
  grad.addColorStop(0.50, `${colorHex}ee`);
  // División de Cassini (brecha oscura real)
  grad.addColorStop(0.54, "rgba(0, 0, 0, 0.04)");
  grad.addColorStop(0.58, "rgba(0, 0, 0, 0.02)");
  // Anillo A exterior
  grad.addColorStop(0.62, `${colorHex}cc`);
  grad.addColorStop(0.78, `${colorHex}99`);
  // División de Encke
  grad.addColorStop(0.81, "rgba(0, 0, 0, 0.08)");
  grad.addColorStop(0.84, `${colorHex}77`);
  // Anillo F (fino borde exterior)
  grad.addColorStop(0.93, `${colorHex}44`);
  grad.addColorStop(0.97, "rgba(255, 255, 255, 0.55)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro-anillos concéntricos de cristales de hielo (estructura fina de alta resolución)
  for (let x = 40; x < canvas.width - 30; x += 2) {
    if (x > 550 && x < 595) continue; // Respetar División de Cassini
    const ringWave = Math.sin(x * 0.35) * Math.cos(x * 0.11);
    if (ringWave > 0.15) {
      ctx.fillStyle = `rgba(255, 255, 255, ${ringWave * 0.28})`;
      ctx.fillRect(x, 0, 1, canvas.height);
    } else if (ringWave < -0.35) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(x, 0, 1, canvas.height);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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
// Reacciona a la dirección del Sol Central (0,0,0) para crear terminador realista
// ============================================================================
function createAtmosphereMesh(radius, colorHex, isSun = false) {
  const geom = new THREE.SphereGeometry(radius * (isSun ? 1.28 : 1.125), 64, 64);
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
          // Dispersión Rayleigh iluminada por el Sol en (0,0,0)
          vec3 dirToSun = normalize(-vWorldPos);
          float sunLight = smoothstep(-0.35, 0.85, dot(vWorldNormal, dirToSun));
          intensity *= (0.28 + 0.72 * sunLight);
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
  canvas.width = 1024;
  canvas.height = 512;
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

  drawNebula(canvas.width * 0.35, canvas.height * 0.45, 260, "rgba(56, 189, 248, 0.55)", "rgba(59, 130, 246, 0.18)");
  drawNebula(canvas.width * 0.70, canvas.height * 0.55, 240, "rgba(192, 132, 252, 0.45)", "rgba(236, 72, 153, 0.16)");
  drawNebula(canvas.width * 0.50, canvas.height * 0.50, 220, "rgba(251, 191, 36, 0.55)", "rgba(217, 119, 6, 0.18)");

  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 0.8 + Math.random() * 2.2;
    ctx.fillStyle = Math.random() > 0.35 ? "#ffffff" : "#bae6fd";
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
  const speedMultiplierRef = useRef(speedMultiplier);
  const onSelectServiceRef = useRef(onSelectService);

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    onSelectServiceRef.current = onSelectService;
  }, [onSelectService]);

  const [hoveredService, setHoveredService] = useState(null);
  const [webglError, setWebglError] = useState(false);

  // Posición Panorámica Art-Directed Canónica: Todos los 18 planetas uniformemente visibles
  const PANORAMA_CAM_POS = new THREE.Vector3(0, 118, 168);
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
        starColors[i] = 0.35; starColors[i + 1] = 0.88; starColors[i + 2] = 1.0; // Gigante azul O/B
      } else if (tint > 0.65) {
        starColors[i] = 1.0; starColors[i + 1] = 0.84; starColors[i + 2] = 0.35; // G/K Dorada
      } else if (tint > 0.5) {
        starColors[i] = 0.88; starColors[i + 1] = 0.58; starColors[i + 2] = 1.0; // Nebulosa violeta
      } else {
        starColors[i] = 0.96; starColors[i + 1] = 0.97; starColors[i + 2] = 1.0; // Blanco diamante
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

    // B. Polvo Cósmico y Nébula Galáctica en Espiral (3.800 partículas difusas)
    const dustCount = 3800;
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

    // C. Cinturón Principal de Asteroides Kepleriano (1.800 micro-cuerpos rocosos/cristalinos entre órbitas medias)
    const asteroidCount = 1800;
    const asteroidGeom = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    const asteroidCol = new Float32Array(asteroidCount * 3);

    for (let i = 0; i < asteroidCount * 3; i += 3) {
      // Dos anillos de asteroides: cinturón interior (r: 71..75) y cinturón de Kuiper exterior (r: 166..178)
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
      size: 0.95,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
    });
    const asteroidBelt = new THREE.Points(asteroidGeom, asteroidMat);
    scene.add(asteroidBelt);
    asteroidBeltRef.current = asteroidBelt;

    // D. Halo de Plasma alrededor del Sol Central (1.400 partículas doradas)
    const solarDustCount = 1400;
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

    // 2. Cámara Panorámica Fija (Art-Directed)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 2200);
    camera.position.copy(PANORAMA_CAM_POS);
    camera.lookAt(PANORAMA_LOOK_AT);
    cameraRef.current = camera;

    // 3. Renderer WebGL con ToneMapping Cinematográfico ACESFilmic
    renderer.setSize(width, height);
    renderer.setPixelRatio(getClampedPixelRatio(1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy() || 4;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Generar Mapa de Entorno Cósmico (PMREM) para iluminación global PBR
    const cosmicEnvMap = generateCosmicEnvMap(renderer);
    scene.environment = cosmicEnvMap;

    // 4. Pipeline de Post-Processing (Bloom de Unreal Engine calibrado para detalle de superficie)
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

    // 5. OrbitControls Art-Directed & Ergonomía Táctil Móvil
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    controls.minPolarAngle = Math.PI * 0.16;
    controls.maxPolarAngle = Math.PI * 0.45;
    controls.minAzimuthAngle = -Math.PI * 0.35;
    controls.maxAzimuthAngle = Math.PI * 0.35;
    controls.minDistance = 12;
    controls.maxDistance = 290;
    controlsRef.current = controls;

    // 6. Iluminación Solar Física Realista (Terminador Día/Noche Definido + Luz de Relleno Cósmica)
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x090d16, 0.65);
    scene.add(hemiLight);

    // Luz omnidireccional del Sol Central en (0, 0, 0) que ilumina el hemisferio diurno de cada planeta
    const coreLight = new THREE.PointLight(0xfff7ed, 7.2, 650, 0.32);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const rimLight1 = new THREE.DirectionalLight(0x7dd3fc, 0.55);
    rimLight1.position.set(60, 110, 60);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xfbbf24, 0.42);
    rimLight2.position.set(-60, -80, -60);
    scene.add(rimLight2);

    // Lensflare óptico en el Núcleo Solar + Esfera de Fondo Universo Real
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

    // 7. Construcción de los 18 Planetas Ultra-HD con Relieve Topográfico, Nubes y Texturas GLB Reales
    const celestialMap = {};
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    const glbTextureCache = {};

    const createTrajectoryRing = (radius, hexColor) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(180);
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
      const modelName = (service.modelGlb || "").toLowerCase();

      // Geometría esférica de 96x96 segmentos para curvatura perfecta en primer plano
      const geom = new THREE.SphereGeometry(r, 96, 96);
      geom.computeVertexNormals();

      // Mapas procedurales 2K (Albedo + Bump Topográfico + Emissive Nocturno)
      const { albedoMap, bumpMap, emissiveMap } = generateHDPlanetMaps(service, maxAnisotropy);

      let mat;
      if (isSun) {
        // ☀️ Shader GLSL de Plasma Solar en Tiempo Real (60 FPS)
        mat = createSolarPlasmaMaterial(albedoMap);
        sunShaderMatRef.current = mat;
      } else {
        // 🪐 Material PBR Planetario Realista:
        // Color base blanco (#ffffff) con tinte muy sutil para preservar el 100% de la riqueza cromática de la textura,
        // relieve topográfico (bumpMap), luces nocturnas (emissiveMap) y brillo especular atmosférico (clearcoat).
        const isGas =
          modelName.includes("jupiter") ||
          modelName.includes("saturn") ||
          modelName.includes("uranus") ||
          modelName.includes("neptune");

        const tintColor = new THREE.Color("#ffffff").lerp(new THREE.Color(service.color), 0.18);

        mat = new THREE.MeshPhysicalMaterial({
          map: albedoMap,
          color: tintColor,
          bumpMap: bumpMap,
          bumpScale: isGas ? 0.04 : 0.16,
          roughness: isGas ? 0.42 : 0.62,
          metalness: isGas ? 0.08 : 0.16,
          clearcoat: isGas ? 0.55 : 0.32,
          clearcoatRoughness: 0.22,
          reflectivity: 0.65,
          sheen: 0.45,
          sheenColor: new THREE.Color(service.color),
          emissive: new THREE.Color(service.color),
          emissiveMap: emissiveMap,
          emissiveIntensity: 0.42,
          envMapIntensity: 0.95,
        });
      }

      const planetMesh = new THREE.Mesh(geom, mat);
      planetMesh.userData = { id: service.id, serviceData: service, isServicePlanet: true };
      // Inclinación axial planetaria realista (oblicuidad de la eclíptica)
      if (!isSun) {
        planetMesh.rotation.z = 0.08 + (index % 5) * 0.045;
      }

      // Cargar asíncronamente la textura astronómica real desde /assets/solar/gltf/<modelGlb>
      if (service.modelGlb) {
        const glbPath = `/assets/solar/gltf/${service.modelGlb}`;
        const applyGlbTexture = (realTex) => {
          if (isDisposed || !planetMesh.material) return;
          realTex.colorSpace = THREE.SRGBColorSpace;
          realTex.anisotropy = maxAnisotropy;
          realTex.wrapS = THREE.RepeatWrapping;
          realTex.needsUpdate = true;
          if (isSun && planetMesh.material.uniforms && planetMesh.material.uniforms.uBaseMap) {
            planetMesh.material.uniforms.uBaseMap.value = realTex;
          } else {
            planetMesh.material.map = realTex;
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
      planetMesh.add(atmosphere);

      // Corona Solar Exterior Secundaria para el Sol Central
      if (isSun) {
        const outerCorona = createAtmosphereMesh(r * 1.18, "#fbbf24", true);
        planetMesh.add(outerCorona);
      }

      // Capa de Nubes Dinámicas en Rotación Independiente para planetas con atmósfera densa
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
        const cloudGeom = new THREE.SphereGeometry(r * 1.018, 64, 64);
        const cloudTex = generateCloudLayerTexture(index + 1, maxAnisotropy);
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTex,
          transparent: true,
          opacity: modelName.includes("earth") ? 0.52 : 0.28,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          roughness: 0.9,
        });
        cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
        planetMesh.add(cloudMesh);
      }

      // Anillos Planetarios HD y Estructuras Orbitales
      let ringObjects = [];
      let satelliteObject = null;
      let satelliteOrbitRadius = 0;

      if (service.id === "srv-caja" || modelName.includes("saturn")) {
        // 🪐 Sistema de Anillos de Cassini Multi-Banda HD (Saturno)
        const ringGeom = new THREE.RingGeometry(r * 1.32, r * 2.55, 128);
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
        planetMesh.add(ringMesh);
        ringObjects.push({ mesh: ringMesh, type: "cassini", speed: 0.12 });
      } else if (service.id === "srv-reservas" || modelName.includes("uranus")) {
        // 💍 Anillo Polar Vertical Tenue (Urano)
        const uRingGeom = new THREE.RingGeometry(r * 1.4, r * 1.85, 96);
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
        planetMesh.add(uRingMesh);
        ringObjects.push({ mesh: uRingMesh, type: "cassini", speed: 0.16 });
      } else if (service.id === "srv-dsb") {
        // 🛰️ Gimbal Giroscópico Holográfico Doble + Luna Natural
        const g1Geom = new THREE.RingGeometry(r * 1.35, r * 1.72, 96);
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
        planetMesh.add(g1Mesh);

        const g2Geom = new THREE.RingGeometry(r * 1.92, r * 2.28, 96);
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
        planetMesh.add(g2Mesh);

        ringObjects.push({ mesh: g1Mesh, type: "gimbal1", speed: 0.75 });
        ringObjects.push({ mesh: g2Mesh, type: "gimbal2", speed: -0.55 });
      } else if (service.id === "srv-security") {
        const secGeom = new THREE.RingGeometry(r * 1.35, r * 2.22, 96);
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
        const prcGeom = new THREE.RingGeometry(r * 1.35, r * 2.15, 96);
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
        planetMesh.add(prcMesh);
        ringObjects.push({ mesh: prcMesh, type: "radar", speed: 0.45 });
      } else if (service.id === "srv-whatsapp") {
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
          roughness: 0.75,
          metalness: 0.15,
          emissive: new THREE.Color(service.color),
          emissiveIntensity: 0.25,
        });
        const satMesh = new THREE.Mesh(satGeom, satMat);
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
          if (hoveredServiceRef.current !== srvId) {
            hoveredServiceRef.current = srvId;
            setHoveredService(srvId);
          }

          if (currentHoverMesh !== hit) {
            if (currentHoverMesh && currentHoverMesh.material && currentHoverMesh.material.emissive) {
              currentHoverMesh.material.emissiveIntensity = 0.42;
            }
            if (hit.material && hit.material.emissive) {
              hit.material.emissiveIntensity = 0.95;
            }
            currentHoverMesh = hit;

            const trajectory = celestialObjectsRef.current[srvId].trajectory;
            if (trajectory && trajectory.material) {
              trajectory.material.opacity = 0.95;
            }
          }
          return;
        }
      }

      container.style.cursor = "default";
      if (hoveredServiceRef.current !== null) {
        hoveredServiceRef.current = null;
        setHoveredService(null);
      }
      if (currentHoverMesh) {
        if (currentHoverMesh.material && currentHoverMesh.material.emissive) {
          currentHoverMesh.material.emissiveIntensity = 0.42;
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
        if (srvId && onSelectServiceRef.current) {
          playPlanetSelect();
          onSelectServiceRef.current(srvId);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointermove", handlePointerMove);
    domElement.addEventListener("pointerdown", handlePointerDown);

    // 9. Bucle de Animación a 60 FPS con Postprocessing y Guardián de Visibilidad GPU
    let lastTime = performance.now();
    const startTime = performance.now();
    let isSceneVisible = true;

    const animateLoop = () => {
      if (!isSceneVisible || isDisposed) {
        animationFrameRef.current = null;
        return;
      }
      animationFrameRef.current = requestAnimationFrame(animateLoop);

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
      starField.rotation.y += delta * 0.0022;
      if (cosmicDustRef.current) {
        cosmicDustRef.current.rotation.y += delta * 0.0015;
      }
      if (asteroidBeltRef.current) {
        asteroidBeltRef.current.rotation.y += delta * 0.006 * (currentSpeed > 0 ? currentSpeed : 0.2);
      }
      if (solarDustRef.current) {
        solarDustRef.current.rotation.y += delta * 0.014;
      }

      Object.entries(celestialObjectsRef.current).forEach(([id, entry]) => {
        const { mesh, cloudMesh, serviceData, lightTrail, rings, satellite, satelliteOrbitRadius } = entry;
        if (!mesh) return;

        // Auto-rotación axial del planeta y deriva diferencial de su capa de nubes
        const rotFactor = currentSpeed > 0 ? 1 : 0.15;
        mesh.rotation.y += delta * 0.32 * rotFactor;
        if (cloudMesh) {
          cloudMesh.rotation.y += delta * 0.14 * rotFactor;
        }

        // Órbita Kepleriana y Estela de Luz Dinámica
        if (serviceData.orbitRadius > 0 && currentSpeed > 0) {
          const orbitalFactor = 0.022 * currentSpeed * (serviceData.speed || 0.5);
          entry.currentAngle += orbitalFactor * delta;

          const r = serviceData.orbitRadius;
          mesh.position.x = Math.cos(entry.currentAngle) * r;
          mesh.position.z = Math.sin(entry.currentAngle) * r;

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

        // Órbita de lunas / satélites naturales alrededor de su planeta anfitrión
        if (satellite && satelliteOrbitRadius > 0) {
          const satAngle = elapsedTime * 1.85 + entry.currentAngle;
          satellite.position.set(
            Math.cos(satAngle) * satelliteOrbitRadius,
            Math.sin(satAngle * 0.7) * (satelliteOrbitRadius * 0.18),
            Math.sin(satAngle) * satelliteOrbitRadius
          );
        }
      });

      // Seguimiento suave de cámara hacia el planeta enfocado
      if (isTransitioningRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.055);
        controls.target.lerp(targetLookAtRef.current, 0.065);

        if (
          camera.position.distanceTo(targetCamPosRef.current) < 0.35 &&
          controls.target.distanceTo(targetLookAtRef.current) < 0.18
        ) {
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      composer.render(delta);
    };

    animateLoop();

    const visibilityGuard = createVisibilityObserver(
      container,
      () => {
        isSceneVisible = true;
        if (!animationFrameRef.current) {
          lastTime = performance.now();
          animateLoop();
        }
      },
      () => {
        isSceneVisible = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    );

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
      isSceneVisible = false;
      if (visibilityGuard && typeof visibilityGuard.disconnect === "function") {
        visibilityGuard.disconnect();
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointermove", handlePointerMove);
      domElement.removeEventListener("pointerdown", handlePointerDown);

      if (controls) {
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
      controls.minDistance = 20;
      controls.maxDistance = 320;
      isTransitioningRef.current = true;
    } else if (entry && entry.mesh) {
      const worldPos = new THREE.Vector3();
      entry.mesh.getWorldPosition(worldPos);

      targetLookAtRef.current.copy(worldPos);

      const planetRadius = entry.serviceData?.size || 2.0;
      const focusDistance = Math.max(15, planetRadius * 7.5);
      targetCamPosRef.current.set(
        worldPos.x + focusDistance * 0.68,
        worldPos.y + focusDistance * 0.36,
        worldPos.z + focusDistance * 0.68
      );

      controls.minDistance = 8;
      controls.maxDistance = 180;
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
