// src/components/systems/SolarSystem3D.jsx
// Motor 3D WebGL con Three.js: Simulación interactiva del Sistema Solar con modelos GLB,
// iluminación solar con Lensflare, mecánicas orbitales reales, seguimiento cinemático de cámara
// y selección de sistemas de software soberano de Dynamind.

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
import { CELESTIAL_BODIES } from "../../data/solarSystemData";
import { playPlanetSelect, playOrbitWarp } from "../../utils/audioEffects";

export default function SolarSystem3D({
  selectedBodyId = "sun",
  onSelectBody,
  speedMultiplier = 1,
  showTrajectories = true,
  cameraViewMode = "orbit", // "orbit" | "topdown" | "focus"
  onLoaded,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const celestialObjectsRef = useRef({}); // id -> { pivot, mesh, bodyData, trajectory }
  const animationFrameRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [hoveredBody, setHoveredBody] = useState(null);

  // Referencias para animaciones dinámicas de cámara
  const targetCamPosRef = useRef(new THREE.Vector3(120, 95, 140));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioningCameraRef = useRef(false);

  // --------------------------------------------------------------------------
  // INICIALIZACIÓN THREE.JS & CARGA DE ACTIVOS GLTF
  // --------------------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Escena & Fondo Estelar
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Campo de estrellas procedural de alta profundidad
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 400 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);

      // Tonos cósmicos: blanco azulado, dorado y cyan
      const tint = Math.random();
      if (tint > 0.8) {
        starColors[i] = 0.5; starColors[i + 1] = 0.8; starColors[i + 2] = 1.0; // Cyan
      } else if (tint > 0.6) {
        starColors[i] = 1.0; starColors[i + 1] = 0.85; starColors[i + 2] = 0.4; // Dorado
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0; // Blanco estelar
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. Cámara
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(120, 95, 140);
    cameraRef.current = camera;

    // 3. Renderer WebGL
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 6;
    controls.maxDistance = 650;
    controls.maxPolarAngle = Math.PI - 0.05;
    controlsRef.current = controls;

    // 5. Iluminación y Sol con Lensflare
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfff3d6, 3.5, 900, 0.6);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Luces de relleno para dar tridimensionalidad a los planetas
    const fillLight1 = new THREE.DirectionalLight(0x7dd3fc, 0.4);
    fillLight1.position.set(50, 100, 50);
    scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xf59e0b, 0.3);
    fillLight2.position.set(-50, -80, -50);
    scene.add(fillLight2);

    // Lensflare en el Sol
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/assets/solar/textures/lensflare0.png",
      (textureFlare0) => {
        textureLoader.load(
          "/assets/solar/textures/lensflare1.png",
          (textureFlare1) => {
            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(textureFlare0, 120, 0, new THREE.Color(0xffffff)));
            lensflare.addElement(new LensflareElement(textureFlare1, 45, 0.3, new THREE.Color(0xfde047)));
            lensflare.addElement(new LensflareElement(textureFlare1, 65, 0.6, new THREE.Color(0x38bdf8)));
            sunLight.add(lensflare);
          },
          undefined,
          () => {} // Ignorar fallback si la textura secundaria tarda
        );
      },
      undefined,
      () => {}
    );

    // 6. Carga de los 16 Modelos GLTF
    const gltfLoader = new GLTFLoader();
    const celestialMap = {};
    let loadedCount = 0;
    const totalBodies = CELESTIAL_BODIES.length;

    // Helper para crear anillos de trayectoria orbital
    const createTrajectoryRing = (radius, inclination = 0) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const geom = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const mat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18,
      });
      const line = new THREE.LineLoop(geom, mat);
      line.rotation.x = THREE.MathUtils.degToRad(inclination);
      return line;
    };

    // Función asíncrona de carga en paralelo ultra-rápida
    const loadAllBodies = async () => {
      const primaryBodies = CELESTIAL_BODIES.filter((b) => !b.orbit.orbitObject || b.orbit.orbitObject === "sun");
      const moonBodies = CELESTIAL_BODIES.filter((b) => b.orbit.orbitObject && b.orbit.orbitObject !== "sun");

      // 1° Cargar planetas primarios en paralelo
      await Promise.all(
        primaryBodies.map(async (body) => {
          try {
            const gltf = await gltfLoader.loadAsync(`/assets/solar/gltf/${body.id}.glb`);
            const model = gltf.scene;

            model.userData = { id: body.id, bodyData: body, isCelestialBody: true };
            model.traverse((child) => {
              if (child.isMesh) {
                child.userData = { id: body.id, bodyData: body, isCelestialBody: true };
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            if (body.id === "sun") {
              model.scale.set(1.15, 1.15, 1.15);
              scene.add(model);

              celestialMap[body.id] = {
                pivot: model,
                mesh: model,
                bodyData: body,
                trajectory: null,
                currentAngle: 0,
              };
            } else {
              const orbitPivot = new THREE.Group();
              orbitPivot.name = `pivot_${body.id}`;
              orbitPivot.rotation.x = THREE.MathUtils.degToRad(body.orbit.orbitalInclination);
              scene.add(orbitPivot);

              const trajectory = createTrajectoryRing(body.orbit.scaledOrbitalRadius, body.orbit.orbitalInclination);
              scene.add(trajectory);

              model.position.set(body.orbit.scaledOrbitalRadius, 0, 0);
              model.rotation.z = THREE.MathUtils.degToRad(body.orbit.axialTilt);

              if (body.id === "jupiter") model.scale.set(1.3, 1.3, 1.3);
              if (body.id === "saturn") model.scale.set(1.2, 1.2, 1.2);

              orbitPivot.add(model);

              celestialMap[body.id] = {
                pivot: orbitPivot,
                mesh: model,
                bodyData: body,
                trajectory,
                currentAngle: Math.random() * Math.PI * 2,
              };
            }

            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalBodies) * 100));
          } catch (err) {
            console.warn(`[SolarSystem3D] Error cargando modelo ${body.id}:`, err);
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalBodies) * 100));
          }
        })
      );

      // 2° Cargar lunas y satélites acoplados en paralelo
      await Promise.all(
        moonBodies.map(async (moon) => {
          try {
            const gltf = await gltfLoader.loadAsync(`/assets/solar/gltf/${moon.id}.glb`);
            const model = gltf.scene;

            model.userData = { id: moon.id, bodyData: moon, isCelestialBody: true };
            model.traverse((child) => {
              if (child.isMesh) {
                child.userData = { id: moon.id, bodyData: moon, isCelestialBody: true };
              }
            });

            const parentEntry = celestialMap[moon.orbit.orbitObject];
            if (parentEntry && parentEntry.mesh) {
              const moonPivot = new THREE.Group();
              moonPivot.name = `pivot_${moon.id}`;
              parentEntry.mesh.add(moonPivot);

              const trajectory = createTrajectoryRing(moon.orbit.scaledOrbitalRadius, moon.orbit.orbitalInclination);
              moonPivot.add(trajectory);

              model.position.set(moon.orbit.scaledOrbitalRadius, 0, 0);
              moonPivot.add(model);

              celestialMap[moon.id] = {
                pivot: moonPivot,
                mesh: model,
                bodyData: moon,
                trajectory,
                currentAngle: Math.random() * Math.PI * 2,
              };
            }

            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalBodies) * 100));
          } catch (err) {
            console.warn(`[SolarSystem3D] Error cargando satélite ${moon.id}:`, err);
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalBodies) * 100));
          }
        })
      );

      console.log(`[SolarSystem3D] Completed all ${loadedCount}/${totalBodies} models!`);
      celestialObjectsRef.current = celestialMap;
      setIsAssetsLoaded(true);
      if (onLoaded) onLoaded();
    };

    console.log('[SolarSystem3D] Invoking loadAllBodies...');
    loadAllBodies().catch(err => {
      console.error('[SolarSystem3D] loadAllBodies fatal error:', err);
    });

    // 7. Raycaster para Interacción del Ratón
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoverMesh = null;

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      // Obtener lista de mallas de planetas
      const interactiveMeshes = [];
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.mesh) {
          entry.mesh.traverse((c) => {
            if (c.isMesh) interactiveMeshes.push(c);
          });
        }
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const bodyId = hit.userData?.id;
        if (bodyId && celestialObjectsRef.current[bodyId]) {
          container.style.cursor = "pointer";
          setHoveredBody(bodyId);

          if (currentHoverMesh !== hit) {
            // Restaurar previo
            if (currentHoverMesh && currentHoverMesh.material?.emissive) {
              currentHoverMesh.material.emissive.setHex(0x000000);
            }
            // Resaltar actual
            if (hit.material?.emissive) {
              hit.material.emissive.setHex(0x38bdf8);
              hit.material.emissiveIntensity = 0.45;
            }
            currentHoverMesh = hit;

            // Brillo en la trayectoria
            const trajectory = celestialObjectsRef.current[bodyId].trajectory;
            if (trajectory && trajectory.material) {
              trajectory.material.opacity = 0.85;
              trajectory.material.color.setHex(0xfde047);
            }
          }
          return;
        }
      }

      // Si no hay intersección
      container.style.cursor = "default";
      setHoveredBody(null);
      if (currentHoverMesh) {
        if (currentHoverMesh.material?.emissive) {
          currentHoverMesh.material.emissive.setHex(0x000000);
        }
        currentHoverMesh = null;
      }
      // Restaurar opacidades de órbitas
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.trajectory && entry.trajectory.material) {
          entry.trajectory.material.opacity = 0.18;
          entry.trajectory.material.color.setHex(0x38bdf8);
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
        if (entry.mesh) {
          entry.mesh.traverse((c) => {
            if (c.isMesh) interactiveMeshes.push(c);
          });
        }
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const bodyId = hit.userData?.id;
        if (bodyId && onSelectBody) {
          playPlanetSelect();
          onSelectBody(bodyId);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointermove", handlePointerMove);
    domElement.addEventListener("pointerdown", handlePointerDown);

    // 8. Bucle Principal de Animación (60 FPS)
    const clock = new THREE.Clock();

    const animateLoop = () => {
      animationFrameRef.current = requestAnimationFrame(animateLoop);

      const delta = clock.getDelta();
      const currentSpeed = speedMultiplier;

      // Rotación suave del campo estelar
      starField.rotation.y += delta * 0.008;

      // Mecánicas orbitales y rotación axial de cada cuerpo
      Object.entries(celestialObjectsRef.current).forEach(([id, entry]) => {
        const { pivot, mesh, bodyData } = entry;
        if (!mesh) return;

        // Auto-rotación del cuerpo sobre su propio eje
        const rotSpeed = (bodyData.orbit.rotationVelocity || 0.2) * delta * (currentSpeed > 0 ? 1 : 0);
        mesh.rotation.y += rotSpeed;

        // Traslación orbital (si no es el Sol y tiene velocidad)
        if (bodyData.orbit.orbitalVelocity && currentSpeed > 0) {
          // Escala calibrada: velocidad orbital visible e intuitiva
          const speedFactor = 0.04 * currentSpeed;
          entry.currentAngle += (bodyData.orbit.orbitalVelocity / (bodyData.orbit.scaledOrbitalRadius || 1)) * delta * speedFactor;

          if (bodyData.orbit.orbitObject === "sun") {
            // El planeta se desplaza en órbita alrededor del Sol
            const r = bodyData.orbit.scaledOrbitalRadius;
            mesh.position.x = Math.cos(entry.currentAngle) * r;
            mesh.position.z = Math.sin(entry.currentAngle) * r;
          } else {
            // Luna orbitando a su planeta
            const r = bodyData.orbit.scaledOrbitalRadius;
            mesh.position.x = Math.cos(entry.currentAngle) * r;
            mesh.position.z = Math.sin(entry.currentAngle) * r;
          }
        }
      });

      // Suavizado cinemático de cámara hacia el objetivo (lerp interpolation)
      if (isTransitioningCameraRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.045);
        controls.target.lerp(targetLookAtRef.current, 0.055);

        if (camera.position.distanceTo(targetCamPosRef.current) < 0.8 &&
            controls.target.distanceTo(targetLookAtRef.current) < 0.4) {
          isTransitioningCameraRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animateLoop();

    // 9. Resize Handling Responsivo
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza al desmontar
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointermove", handlePointerMove);
      domElement.removeEventListener("pointerdown", handlePointerDown);

      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // ACTUALIZACIÓN DE VISIBILIDAD DE TRAYECTORIAS ORBITALES
  // --------------------------------------------------------------------------
  useEffect(() => {
    Object.values(celestialObjectsRef.current).forEach((entry) => {
      if (entry.trajectory) {
        entry.trajectory.visible = showTrajectories;
      }
    });
  }, [showTrajectories]);

  // --------------------------------------------------------------------------
  // CINEMÁTICA DE CÁMARA CUANDO CAMBIA EL CUERPO SELECCIONADO
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!isAssetsLoaded) return;

    const targetBody = CELESTIAL_BODIES.find((b) => b.id === selectedBodyId);
    if (!targetBody) return;

    const entry = celestialObjectsRef.current[selectedBodyId];
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    playOrbitWarp();

    if (selectedBodyId === "sun") {
      // Vista general del sistema solar centrada en el Sol
      targetLookAtRef.current.set(0, 0, 0);
      if (cameraViewMode === "topdown") {
        targetCamPosRef.current.set(0, 240, 0.001);
      } else {
        targetCamPosRef.current.set(110, 85, 130);
      }
      controls.minDistance = 25;
      controls.maxDistance = 500;
      isTransitioningCameraRef.current = true;
    } else if (entry && entry.mesh) {
      // Obtener posición en el espacio mundial del cuerpo celeste
      const worldPos = new THREE.Vector3();
      entry.mesh.getWorldPosition(worldPos);

      targetLookAtRef.current.copy(worldPos);

      const camOffsetDist = targetBody.orbit.cameraDistance || 15;
      targetCamPosRef.current.set(
        worldPos.x + camOffsetDist * 0.8,
        worldPos.y + camOffsetDist * 0.45,
        worldPos.z + camOffsetDist * 0.8
      );

      controls.minDistance = camOffsetDist * 0.35;
      controls.maxDistance = camOffsetDist * 4;
      isTransitioningCameraRef.current = true;
    }
  }, [selectedBodyId, isAssetsLoaded, cameraViewMode]);

  return (
    <div className="relative w-full h-full min-h-[550px] overflow-hidden select-none bg-[#030712]">
      {/* Canvas 3D de Three.js */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Pantalla de carga cinematográfica inicial mientras cargan los 16 modelos GLB */}
      {!isAssetsLoaded && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-t-amber-400 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-black text-amber-300">
              {loadingProgress}%
            </div>
          </div>
          <div className="text-center space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              Cargando Modelos 3D del Sistema Solar
            </p>
            <p className="text-xs text-neutral-400 font-sans">
              Inicializando texturas orbitales, iluminación solar y parámetros gravitacionales...
            </p>
          </div>
          <div className="w-64 h-1.5 bg-neutral-900 rounded-full mt-5 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Tooltip flotante en Hover */}
      {hoveredBody && isAssetsLoaded && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-neutral-950/85 backdrop-blur-md border border-cyan-500/40 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center gap-3 animate-fade-in">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-wider">
              {CELESTIAL_BODIES.find((b) => b.id === hoveredBody)?.displayName}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-cyan-300 font-medium">
              {CELESTIAL_BODIES.find((b) => b.id === hoveredBody)?.system.name}
            </span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono uppercase bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
            Click para Telemetría
          </span>
        </div>
      )}
    </div>
  );
}
