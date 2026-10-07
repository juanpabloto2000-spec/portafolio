// src/components/ui/LiquidChromaticBorder.jsx
// Shader de Refracción Líquida & Aberración Cromática (Dynamind Studios):
// - Proyecta un halo de cáustica líquida y dispersión cromática (estilo Apple Vision Pro) alrededor del contenedor.
// - POLÍTICA ZERO-LAG: Sólo activa el requestAnimationFrame cuando el puntero del usuario entra al contenedor (:hover).
// - Al salir el cursor, se desvanece suavemente y apaga el bucle (0.00% de GPU en reposo).

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getClampedPixelRatio, addContextLossHandlers } from '../../utils/webglPerformanceGuard';

const BORDER_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const BORDER_FRAGMENT_SHADER = `
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uHoverProgress; // 0.0 a 1.0
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    // Normalizar aspecto
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    
    // Distancia euclidiana normalizada al puntero
    vec2 mouseNorm = uMouse / uResolution.xy;
    float distToMouse = length((st - mouseNorm) * aspect);

    // Detección de distancia al borde del rectángulo (perímetro)
    vec2 d = min(st, 1.0 - st);
    float borderDist = min(d.x, d.y); // distancia al filo más cercano
    
    // Ancho del marco perimetral reactivo (~24px)
    float borderWidth = 0.035;
    float edgeFactor = 1.0 - smoothstep(0.0, borderWidth, borderDist);

    if (edgeFactor < 0.01 || uHoverProgress < 0.01) {
      discard; // Ahorro total de fragment fill rate en píxeles interiores
    }

    // Ondulación líquida y dispersión espectral
    float wave = sin(distToMouse * 22.0 - uTime * 3.5) * 0.5 + 0.5;
    float proximityGlow = exp(-distToMouse * 2.8);

    // Canales RGB separados para aberración cromática física (Prisma)
    vec3 colSapphire = vec3(0.23, 0.51, 0.96); // #3b82f6
    vec3 colViolet = vec3(0.66, 0.33, 0.97);   // #a855f7
    vec3 colWhite = vec3(1.0, 1.0, 1.0);

    vec3 baseColor = mix(colSapphire, colViolet, wave + proximityGlow * 0.4);
    baseColor += colWhite * pow(proximityGlow, 2.5) * 0.85;

    float alpha = edgeFactor * (0.15 + proximityGlow * 0.75) * uHoverProgress;

    gl_FragColor = vec4(baseColor, alpha);
  }
`;

export default function LiquidChromaticBorder({ children, className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    isHovered: false,
    hoverProgress: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer = null;
    let scene = null;
    let camera = null;
    let material = null;
    let geometry = null;
    let mesh = null;
    let animationFrameId = null;
    let isRunning = false;
    let clock = new THREE.Clock();

    const initThree = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 100);
      const height = Math.max(rect.height, 100);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        premultipliedAlpha: false
      });

      renderer.setSize(width, height, false);
      renderer.setPixelRatio(getClampedPixelRatio(1.2)); // ultraliviano

      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader: BORDER_VERTEX_SHADER,
        fragmentShader: BORDER_FRAGMENT_SHADER,
        uniforms: {
          uResolution: { value: new THREE.Vector2(width, height) },
          uMouse: { value: new THREE.Vector2(width * 0.5, height * 0.5) },
          uHoverProgress: { value: 0 },
          uTime: { value: 0 }
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    };

    initThree();

    const renderLoop = () => {
      if (!renderer || !material) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Interpolar progreso de hover
      const targetProgress = stateRef.current.isHovered ? 1.0 : 0.0;
      stateRef.current.hoverProgress += (targetProgress - stateRef.current.hoverProgress) * 0.12;

      // Interpolar puntero
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.1;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.1;

      material.uniforms.uHoverProgress.value = stateRef.current.hoverProgress;
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.set(stateRef.current.mouseX, stateRef.current.mouseY);

      renderer.render(scene, camera);

      // Si el cursor salió y el progreso ya se extinguió a casi 0, APAGAR el bucle por completo
      if (!stateRef.current.isHovered && stateRef.current.hoverProgress < 0.005) {
        renderer.clear();
        isRunning = false;
        animationFrameId = null;
        return; // SE DETIENE EL RAF: 0% GPU en reposo
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        clock.start();
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const handlePointerEnter = (e) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.isHovered = true;
      stateRef.current.targetMouseX = e.clientX - rect.left;
      stateRef.current.targetMouseY = rect.height - (e.clientY - rect.top);
      startLoop();
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.targetMouseX = e.clientX - rect.left;
      stateRef.current.targetMouseY = rect.height - (e.clientY - rect.top);
      if (!isRunning) startLoop();
    };

    const handlePointerLeave = () => {
      stateRef.current.isHovered = false;
    };

    const handleResize = () => {
      if (!renderer || !material || !container) return;
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      material.uniforms.uResolution.value.set(rect.width, rect.height);
    };

    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    const removeContextLoss = addContextLossHandlers(canvas, () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      removeContextLoss();

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative group ${className}`}>
      {/* Canvas de Shader de Refracción Líquida (Posicionado en la capa perimetral) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-10"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Contenido de la Tarjeta */}
      <div className="relative z-0 w-full h-full">
        {children}
      </div>
    </div>
  );
}
