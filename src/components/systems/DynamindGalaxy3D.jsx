// src/components/systems/DynamindGalaxy3D.jsx
// Motor 3D WebGL con Three.js para La Galaxia Tecnológica Dynamind:
// Vista panorámica art-directed (sin rotaciones descalibradoras), constelación de 18 planetas de servicio,
// transiciones focales suaves con planetas vecinos visibles y clickeables en todo momento,
// y retorno al panorama galáctico total.

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
import { GALAXY_SERVICES } from "../../data/dynamindGalaxyData";
import { playPlanetSelect, playOrbitWarp } from "../../utils/audioEffects";

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
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const celestialObjectsRef = useRef({}); // id -> { pivot, mesh, serviceData, trajectory, currentAngle }
  const animationFrameRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  // Posiciones panorámicas canónicas (Art-Directed para que nunca se descalibre la vista)
  const PANORAMA_CAM_POS = new THREE.Vector3(0, 160, 240);
  const PANORAMA_LOOK_AT = new THREE.Vector3(0, 0, 0);

  const targetCamPosRef = useRef(PANORAMA_CAM_POS.clone());
  const targetLookAtRef = useRef(PANORAMA_LOOK_AT.clone());
  const isTransitioningRef = useRef(false);

  // Paralaje sutil con el ratón
  const mouseNormRef = useRef({ x: 0, y: 0 });

  // --------------------------------------------------------------------------
  // INICIALIZACIÓN THREE.JS & CARGA EN PARALELO DE LOS 18 PLANETAS
  // --------------------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Campo de estrellas en profundidad galáctica
    const starCount = 3800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 380 + Math.random() * 520;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Disco aplanado galáctico
      starPositions[i + 2] = r * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.8) {
        starColors[i] = 0.2; starColors[i + 1] = 0.85; starColors[i + 2] = 1.0; // Cyan neón
      } else if (tint > 0.6) {
        starColors[i] = 1.0; starColors[i + 1] = 0.75; starColors[i + 2] = 0.2; // Ámbar
      } else if (tint > 0.45) {
        starColors[i] = 0.8; starColors[i + 1] = 0.4; starColors[i + 2] = 1.0; // Violeta
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0; // Blanco
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. Cámara (Vista Panorámica Art-Directed a ~35°)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 2000);
    camera.position.copy(PANORAMA_CAM_POS);
    camera.lookAt(PANORAMA_LOOK_AT);
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

    // 4. OrbitControls con Restricciones Severas para evitar pérdida de vista
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false; // Sin paneo para no perder el centro galáctico
    controls.enableRotate = true;
    // Límites de rotación estrictos: vista panorámica siempre controlada
    controls.minPolarAngle = Math.PI * 0.18; // Máxima elevación cenital suave
    controls.maxPolarAngle = Math.PI * 0.42; // Ángulo rasante sin perder el horizonte
    controls.minAzimuthAngle = -Math.PI * 0.28; // Leve paneo horizontal
    controls.maxAzimuthAngle = Math.PI * 0.28;
    controls.minDistance = 25;
    controls.maxDistance = 340;
    controlsRef.current = controls;

    // 5. Iluminación Galáctica Central & Destellos Lensflare
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xfff1cc, 3.8, 850, 0.6);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Luces de relleno para volumen en los planetas exteriores
    const fillLight1 = new THREE.DirectionalLight(0x38bdf8, 0.45);
    fillLight1.position.set(60, 120, 60);
    scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xf59e0b, 0.35);
    fillLight2.position.set(-60, -90, -60);
    scene.add(fillLight2);

    // Lensflare en el Núcleo Soberano
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/assets/solar/textures/lensflare0.png",
      (textureFlare0) => {
        textureLoader.load(
          "/assets/solar/textures/lensflare1.png",
          (textureFlare1) => {
            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(textureFlare0, 110, 0, new THREE.Color(0xffffff)));
            lensflare.addElement(new LensflareElement(textureFlare1, 40, 0.3, new THREE.Color(0xfbbf24)));
            lensflare.addElement(new LensflareElement(textureFlare1, 60, 0.6, new THREE.Color(0x38bdf8)));
            coreLight.add(lensflare);
          },
          undefined,
          () => {}
        );
      },
      undefined,
      () => {}
    );

    // 6. Helper para Anillos Orbitales en el Espacio
    const createTrajectoryRing = (radius, hexColor) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const geom = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(hexColor),
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.LineLoop(geom, mat);
      return line;
    };

    // 7. Carga de los 18 Planetas en Paralelo
    const gltfLoader = new GLTFLoader();
    const celestialMap = {};
    let loadedCount = 0;
    const totalBodies = GALAXY_SERVICES.length;

    const loadAllGalaxyBodies = async () => {
      await Promise.all(
        GALAXY_SERVICES.map(async (service, index) => {
          try {
            const gltf = await gltfLoader.loadAsync(`/assets/solar/gltf/${service.modelGlb}`);
            const model = gltf.scene;

            // Escala personalizada
            const s = service.size || 1.8;
            model.scale.set(s, s, s);

            // Tinte y emisión de color del planeta
            model.traverse((child) => {
              if (child.isMesh) {
                child.userData = { id: service.id, serviceData: service, isServicePlanet: true };
                child.castShadow = true;
                child.receiveShadow = true;

                // Tinte suave con el color del servicio si el material lo permite
                if (child.material) {
                  child.material = child.material.clone();
                  if (service.id !== "srv-core") {
                    child.material.emissive = new THREE.Color(service.emissive);
                    child.material.emissiveIntensity = 0.18;
                  }
                }
              }
            });

            if (service.orbitRadius === 0) {
              // Núcleo Central Dynamind (Sol Soberano)
              scene.add(model);

              celestialMap[service.id] = {
                pivot: model,
                mesh: model,
                serviceData: service,
                trajectory: null,
                currentAngle: 0,
              };
            } else {
              // Planeta de Servicio orbitando la Galaxia
              const orbitPivot = new THREE.Group();
              orbitPivot.name = `pivot_${service.id}`;
              scene.add(orbitPivot);

              // Trayectoria orbital circular con el color del servicio
              const trajectory = createTrajectoryRing(service.orbitRadius, service.color);
              scene.add(trajectory);

              // Ángulo inicial distribuido armónicamente en abanico
              const initialAngle = (index / totalBodies) * Math.PI * 2;
              model.position.set(
                Math.cos(initialAngle) * service.orbitRadius,
                0,
                Math.sin(initialAngle) * service.orbitRadius
              );

              orbitPivot.add(model);

              celestialMap[service.id] = {
                pivot: orbitPivot,
                mesh: model,
                serviceData: service,
                trajectory,
                currentAngle: initialAngle,
              };
            }

            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalBodies) * 100));
          } catch (err) {
            console.warn(`[DynamindGalaxy3D] Error cargando modelo de ${service.name}:`, err);
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalBodies) * 100));
          }
        })
      );

      celestialObjectsRef.current = celestialMap;
      setIsAssetsLoaded(true);
      if (onLoaded) onLoaded();
    };

    loadAllGalaxyBodies();

    // 8. Raycasting Interactivo para Hover y Selección Directa
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoverMesh = null;

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Paralaje sutil con el movimiento del ratón
      mouseNormRef.current = { x: mouse.x * 0.08, y: mouse.y * 0.05 };

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
        const srvId = hit.userData?.id;

        if (srvId && celestialObjectsRef.current[srvId]) {
          container.style.cursor = "pointer";
          setHoveredService(srvId);

          if (currentHoverMesh !== hit) {
            // Restaurar previo
            if (currentHoverMesh && currentHoverMesh.material?.emissive) {
              const prevSrv = currentHoverMesh.userData?.serviceData;
              currentHoverMesh.material.emissive.set(prevSrv?.emissive || 0x000000);
              currentHoverMesh.material.emissiveIntensity = 0.18;
            }
            // Resaltar actual
            if (hit.material?.emissive) {
              hit.material.emissive.set(0xffffff);
              hit.material.emissiveIntensity = 0.6;
            }
            currentHoverMesh = hit;

            // Iluminar trayectoria
            const trajectory = celestialObjectsRef.current[srvId].trajectory;
            if (trajectory && trajectory.material) {
              trajectory.material.opacity = 0.9;
            }
          }
          return;
        }
      }

      // Sin intersección
      container.style.cursor = "default";
      setHoveredService(null);
      if (currentHoverMesh) {
        if (currentHoverMesh.material?.emissive) {
          const prevSrv = currentHoverMesh.userData?.serviceData;
          currentHoverMesh.material.emissive.set(prevSrv?.emissive || 0x000000);
          currentHoverMesh.material.emissiveIntensity = 0.18;
        }
        currentHoverMesh = null;
      }
      // Restaurar opacidades orbitales
      Object.values(celestialObjectsRef.current).forEach((entry) => {
        if (entry.trajectory && entry.trajectory.material) {
          entry.trajectory.material.opacity = 0.22;
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

    // 9. Bucle de Animación Cinemática a 60 FPS
    const clock = new THREE.Clock();

    const animateLoop = () => {
      animationFrameRef.current = requestAnimationFrame(animateLoop);

      const delta = clock.getDelta();
      const currentSpeed = speedMultiplier;

      // Rotación suave del fondo estelar
      starField.rotation.y += delta * 0.005;

      // Traslación orbital armónica de los planetas de servicio
      Object.entries(celestialObjectsRef.current).forEach(([id, entry]) => {
        const { mesh, serviceData } = entry;
        if (!mesh) return;

        // Auto-rotación del planeta sobre su propio eje
        mesh.rotation.y += delta * 0.35 * (currentSpeed > 0 ? 1 : 0);

        // Órbita circular suave
        if (serviceData.orbitRadius > 0 && currentSpeed > 0) {
          const orbitalFactor = 0.025 * currentSpeed * (serviceData.speed || 0.5);
          entry.currentAngle += orbitalFactor * delta;

          const r = serviceData.orbitRadius;
          mesh.position.x = Math.cos(entry.currentAngle) * r;
          mesh.position.z = Math.sin(entry.currentAngle) * r;
        }
      });

      // Suavizado cinemático de cámara hacia el objetivo (lerp)
      if (isTransitioningRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetLookAtRef.current, 0.06);

        if (
          camera.position.distanceTo(targetCamPosRef.current) < 0.6 &&
          controls.target.distanceTo(targetLookAtRef.current) < 0.3
        ) {
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animateLoop();

    // 10. Resize responsivo
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

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
  // CINEMÁTICA DE CÁMARA CUANDO SE SELECCIONA UN PLANETA DE SERVICIO
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!isAssetsLoaded) return;

    const entry = celestialObjectsRef.current[selectedServiceId];
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    playOrbitWarp();

    if (selectedServiceId === "srv-core") {
      // Retorno a la Vista Panorámica Maestra de Toda la Galaxia
      targetLookAtRef.current.copy(PANORAMA_LOOK_AT);
      targetCamPosRef.current.copy(PANORAMA_CAM_POS);
      controls.minDistance = 35;
      controls.maxDistance = 340;
      isTransitioningRef.current = true;
    } else if (entry && entry.mesh) {
      // Enfoque Focal Panorámico: El planeta queda centrado en plano medio,
      // pero el resto de los planetas vecinos siguen en el campo de visión.
      const worldPos = new THREE.Vector3();
      entry.mesh.getWorldPosition(worldPos);

      targetLookAtRef.current.copy(worldPos);

      // Distancia de enfoque calibrada (cerca para apreciar detalles, pero abierto para ver vecinos)
      const focusDistance = 32;
      targetCamPosRef.current.set(
        worldPos.x + focusDistance * 0.7,
        worldPos.y + focusDistance * 0.45,
        worldPos.z + focusDistance * 0.7
      );

      controls.minDistance = 12;
      controls.maxDistance = 180;
      isTransitioningRef.current = true;
    }
  }, [selectedServiceId, isAssetsLoaded]);

  return (
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none bg-[#030712]">
      {/* Canvas 3D de Three.js */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Pantalla de carga mientras cargan los 18 modelos en paralelo */}
      {!isAssetsLoaded && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative w-20 h-20 mb-5">
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-t-amber-400 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-amber-300">
              {loadingProgress}%
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Inicializando Galaxia Tecnológica Dynamind
            </p>
            <p className="text-xs text-neutral-400 font-sans">
              Renderizando los 18 planetas de servicio en órbita panorámica...
            </p>
          </div>
        </div>
      )}

      {/* Tooltip flotante al pasar el mouse por cualquier planeta visible */}
      {hoveredService && isAssetsLoaded && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-neutral-950/90 backdrop-blur-md border border-cyan-500/40 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.35)] flex items-center gap-3 animate-fade-in">
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
            <span className="text-neutral-500">•</span>
            <span className="text-cyan-300 font-medium">
              {GALAXY_SERVICES.find((s) => s.id === hoveredService)?.categoryLabel}
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
