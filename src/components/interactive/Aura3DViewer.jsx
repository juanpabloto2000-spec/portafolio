import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

/**
 * Aura3DViewer - Motor Tridimensional Hiperrealista PBR en Three.js a 60 FPS
 * Mejorado:
 * - Orientación 100% frontal hacia la cámara.
 * - Iluminación ultra-clara y nítida de estudio (Key Light frontal potente, Fill Light y HemisphereLight).
 * - Titanio y cromo pulidos, claros y luminosos (sin manchas oscuras).
 * - Motor de gestos cinemáticos procedurales:
 *   1. 'jump': Anticipación, salto cuántico y squash & stretch.
 *   2. 'wave': Balanceo y cabeceo expresivo de saludo amigable.
 *   3. 'glasses': Enfoque analítico en primer plano con destello en visera.
 *   4. 'speaking': Cabeceo empático de conversación con pulsación de plasma.
 */
export default function Aura3DViewer({
  isSpeaking = false,
  forcedAction = null,
  onActionComplete = null,
  className = '',
  size = 'modal'
}) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [progress, setProgress] = useState(0);

  // Referencias para animación
  const modelRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isSpeakingRef = useRef(isSpeaking);
  const voiceLightRef = useRef(null);
  const frontLightRef = useRef(null);

  // Estado del motor de gestos cinemáticos
  const gestureRef = useRef({
    type: null,
    startTime: 0,
    duration: 0,
    active: false
  });

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  // Disparar gestos desde props
  const triggerGesture = (type) => {
    let duration = 1.4;
    if (type === 'jump') duration = 1.1;
    if (type === 'wave') duration = 1.8;
    if (type === 'glasses') duration = 1.5;

    gestureRef.current = {
      type,
      startTime: performance.now() / 1000,
      duration,
      active: true
    };

    if (onActionComplete) {
      setTimeout(onActionComplete, duration * 1000);
    }
  };

  useEffect(() => {
    if (forcedAction) {
      triggerGesture(forcedAction);
    }
  }, [forcedAction]);

  const handleAvatarClick = () => {
    const gestures = ['jump', 'wave', 'glasses'];
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    triggerGesture(randomGesture);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animationFrameId;

    // 1. ESCENA, CÁMARA Y RENDERIZADOR
    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.08, 4.1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.1; // Exposición alta para claridad pura
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. ILUMINACIÓN ULTRA-CLARA Y CRISTALINA DE ESTUDIO FOTOGRÁFICO
    // Luz hemisférica para eliminar sombras negras
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x4f46e5, 3.2);
    scene.add(hemiLight);

    // Luz frontal directa principal (Key Light)
    const frontLight = new THREE.DirectionalLight(0xffffff, 4.8);
    frontLight.position.set(0, 1.2, 4.5);
    scene.add(frontLight);
    frontLightRef.current = frontLight;

    // Luz lateral izquierda superior (blanco cálido)
    const keyLeft = new THREE.DirectionalLight(0xf8fafc, 3.5);
    keyLeft.position.set(3.0, 2.5, 3.0);
    scene.add(keyLeft);

    // Luz lateral derecha de relleno (violeta suave cosmética)
    const fillRight = new THREE.DirectionalLight(0xc084fc, 3.0);
    fillRight.position.set(-3.0, 2.0, 2.5);
    scene.add(fillRight);

    // Luz de contra-borde (Rim Light cian fotónico)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    rimLight.position.set(0, 3.0, -3.0);
    scene.add(rimLight);

    // Foco de tobera inferior
    const voiceLight = new THREE.PointLight(0x60a5fa, 3.0, 8);
    voiceLight.position.set(0, -1.4, 1.2);
    scene.add(voiceLight);
    voiceLightRef.current = voiceLight;

    // 3. CARGA Y ROTACIÓN FRONTAL DEL MODELO
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const modelPath = '/models/aura_pbr.glb';

    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;

        const model = gltf.scene;

        // Centrado de la geometría
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const sizeBox = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y - 0.08;
        model.position.z = -center.z;

        // Escala armónica
        const maxDim = Math.max(sizeBox.x, sizeBox.y, sizeBox.z);
        const targetScale = 2.45 / (maxDim || 1);
        model.scale.setScalar(targetScale);

        // Optimizar materiales para titanio claro y reflectante
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            const mat = child.material;
            if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
              // Aclarar el albedo base para evitar que se vea oscuro o sucio
              if (mat.color) {
                mat.color.setRGB(1.45, 1.45, 1.55);
              }
              mat.roughness = Math.min(mat.roughness, 0.38);
              mat.metalness = Math.max(mat.metalness, 0.55);
              mat.envMapIntensity = 2.4;
              mat.needsUpdate = true;
            }
          }
        });

        // Contenedor raíz con ORIENTACIÓN 100% FRONTAL HACIA LA CÁMARA
        const rootGroup = new THREE.Group();
        rootGroup.add(model);
        
        // Rotación base en Y para que mire exactamente al frente (+Z)
        // El modelo venía mirando hacia +X (a la derecha). Rotar -90° (-PI/2) lo alinea al frente.
        rootGroup.rotation.y = -Math.PI / 2;

        scene.add(rootGroup);
        modelRef.current = rootGroup;

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error al cargar modelo 3D de Aura:', error);
        if (isMounted) {
          setLoadError(true);
          setLoading(false);
        }
      }
    );

    // 4. SEGUIMIENTO DEL MOUSE PARA PARALLAX
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = Math.max(-1, Math.min(1, x));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 5. BUCLE DE ANIMACIÓN A 60 FPS CON GESTOS Y FÍSICAS
    let clock = new THREE.Clock();
    const BASE_ROT_Y = -Math.PI / 2; // Alineación frontal fija

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const currentTime = performance.now() / 1000;
      const elapsedTime = clock.getElapsedTime();

      // Suavizado Lerp del ratón
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      if (modelRef.current) {
        // Variables de transformación base
        let posY = Math.sin(elapsedTime * 2.2) * 0.04; // Levitación base
        let posZ = 0;
        let rotY = BASE_ROT_Y + mouseRef.current.x * 0.35;
        let rotX = -mouseRef.current.y * 0.18;
        let rotZ = -mouseRef.current.x * 0.07;
        let scaleX = 1;
        let scaleY = 1;
        let scaleZ = 1;

        // CÁLCULO DE GESTOS ACTIVOS
        const gesture = gestureRef.current;
        if (gesture.active) {
          const elapsedGesture = currentTime - gesture.startTime;
          const progress = Math.min(1, elapsedGesture / gesture.duration);

          if (progress >= 1) {
            gesture.active = false;
          } else {
            if (gesture.type === 'jump') {
              // SALTO CUÁNTICO: Anticipación -> Disparo -> Aterrizaje
              if (progress < 0.2) {
                // Anticipación (se agacha)
                const p = progress / 0.2;
                posY -= 0.12 * Math.sin(p * Math.PI);
                scaleY = 0.88;
                scaleX = 1.08;
                scaleZ = 1.08;
              } else if (progress < 0.7) {
                // Salto ascendente y pico
                const p = (progress - 0.2) / 0.5;
                posY += 0.52 * Math.sin(p * Math.PI);
                scaleY = 1.15;
                scaleX = 0.92;
                scaleZ = 0.92;
              } else {
                // Aterrizaje suave amortiguado
                const p = (progress - 0.7) / 0.3;
                posY += 0.08 * Math.cos(p * Math.PI);
                scaleY = 0.94 + 0.06 * p;
              }
            } else if (gesture.type === 'wave') {
              // SALUDO ALEGRE: Balanceo de lado a lado y cabeceo amistoso
              const waveCycles = Math.sin(progress * Math.PI * 4);
              rotZ += waveCycles * 0.16;
              rotY += waveCycles * 0.14;
              posY += Math.abs(Math.sin(progress * Math.PI * 2)) * 0.06;
            } else if (gesture.type === 'glasses') {
              // GESTO GAFAS: Inclinación analítica en primer plano
              const p = Math.sin(progress * Math.PI);
              posZ += p * 0.38; // Se acerca hacia la cámara
              rotX += p * 0.18; // Inclina la cabeza hacia adelante
              rotZ += Math.sin(progress * Math.PI * 2) * 0.08;
            }
          }
        }

        // REACCIÓN AL HABLA (VOZ DE AURA)
        if (isSpeakingRef.current) {
          // Cabeceo conversacional empático continuo
          const speakNod = Math.sin(elapsedTime * 9) * 0.045;
          const speakSway = Math.cos(elapsedTime * 4.5) * 0.035;
          rotX += speakNod;
          rotY += speakSway;

          if (voiceLightRef.current) {
            voiceLightRef.current.intensity = 4.8 + Math.sin(elapsedTime * 18) * 2.2;
          }
          if (frontLightRef.current) {
            frontLightRef.current.intensity = 5.2 + Math.sin(elapsedTime * 12) * 1.0;
          }
        } else {
          if (voiceLightRef.current) voiceLightRef.current.intensity = 3.0;
          if (frontLightRef.current) frontLightRef.current.intensity = 4.8;
        }

        // APLICACIÓN DE FÍSICAS AL MODELO CON LERP
        modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, posY, 0.12);
        modelRef.current.position.z = THREE.MathUtils.lerp(modelRef.current.position.z, posZ, 0.12);
        modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, rotY, 0.1);
        modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, rotX, 0.1);
        modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, rotZ, 0.1);

        modelRef.current.scale.x = THREE.MathUtils.lerp(modelRef.current.scale.x, scaleX, 0.15);
        modelRef.current.scale.y = THREE.MathUtils.lerp(modelRef.current.scale.y, scaleY, 0.15);
        modelRef.current.scale.z = THREE.MathUtils.lerp(modelRef.current.scale.z, scaleZ, 0.15);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. REDIMENSIONAMIENTO RESPONSIVE
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 320;
      const newHeight = container.clientHeight || 420;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleAvatarClick}
      className={`relative w-full h-[380px] sm:h-[440px] flex items-center justify-center cursor-pointer select-none overflow-visible ${className}`}
      style={{ touchAction: 'none' }}
      title="Aura 3D - Haz clic para ver sus gestos"
    >
      {/* Indicador de Carga Espacial */}
      {loading && !loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping" />
            <div className="w-12 h-12 rounded-full border-2 border-t-purple-400 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin" />
            <span className="absolute text-[10px] font-mono font-bold text-cyan-300">
              {progress}%
            </span>
          </div>
          <span className="text-[11px] font-mono text-purple-300/80 mt-3 tracking-wider uppercase">
            Materializando Aura 3D...
          </span>
        </div>
      )}

      {/* Halo Fotónico de Fondo para Contraste Luminoso */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div
          className={`w-64 h-64 rounded-full blur-[64px] transition-all duration-700 ${
            isSpeaking
              ? 'bg-purple-600/40 scale-110'
              : 'bg-purple-600/25 scale-100'
          }`}
        />
        <div
          className={`w-48 h-48 rounded-full blur-[40px] transition-all duration-500 ${
            isSpeaking
              ? 'bg-cyan-500/35'
              : 'bg-blue-600/20'
          }`}
        />
      </div>

      {/* Sombra de Levitación en el Suelo */}
      <div
        className="absolute bottom-4 w-36 h-4 rounded-full bg-black/40 blur-md pointer-events-none -z-10 transition-transform duration-300"
        style={{
          transform: isSpeaking ? 'scale(1.15)' : 'scale(1)'
        }}
      />
    </div>
  );
}
