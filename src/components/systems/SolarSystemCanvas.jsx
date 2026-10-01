import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Compass, RotateCw, ZoomIn, ZoomOut, Play, Pause, FastForward, 
  Sparkles, ShieldCheck, ArrowRight, Layers, Database, Workflow, Bot, CheckCircle2 
} from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

// Definición canónica de los 4 Mundos Planetarios + Núcleo Solar
export const PLANETARY_WORLDS = [
  {
    id: 'world-sun',
    type: 'star',
    name: 'Dynamind Prime',
    subtitle: 'NÚCLEO SOLAR // CONSULTORÍA DE IA SOBERANA',
    tagline: 'No somos una agencia. Somos ingenieros y consultores de IA que auditan tus cuellos de botella y construyen software propietario sin ataduras.',
    color: '#F59E0B',
    accentColor: '#38BDF8',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    orbitRadius: 0,
    speed: 0,
    baseSize: 34,
    systemsCount: 'Arquitectura Maestra',
    archetype: 'CONSULTORÍA SOBERANA',
    systems: [
      { id: 'sun-1', name: 'Auditoría Profunda de Cuellos de Botella (D0)', desc: 'Identificación matemática de fugas de dinero, tiempo y comisiones antes de tirar una sola línea de código.' },
      { id: 'sun-2', name: 'Arquitectura Local-First & Código Propietario', desc: 'Desarrollos entregados en tu propio repositorio GitHub. Eres dueño del 100% de tu software y de tus datos.' },
      { id: 'sun-3', name: 'Ingeniería Dual: Complejidad + Especialización', desc: 'Capacidad para levantar tanto PMS/KDS complejos como automatizaciones y agentes quirúrgicos de alta precisión.' },
      { id: 'sun-4', name: 'Eliminación Radical de Renta de SaaS', desc: 'Erradicamos suscripciones mensuales innecesarias (Calendly, agregadores de 20%, CRMs hinchados).' }
    ]
  },
  {
    id: 'world-aethel',
    type: 'planet',
    name: 'Aethel',
    title: 'Sistemas Operativos Soberanos (High Complexity)',
    subtitle: 'MUNDO DE GESTIÓN TÁCTICA & CORE OPERATIVO',
    tagline: 'El búnker que gobierna las operaciones críticas del negocio: caja, folios, comandas y reservas sin intermediarios.',
    color: '#818CF8',
    secondaryColor: '#C084FC',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    orbitRadius: 155,
    speed: 0.007,
    baseSize: 18,
    hasRings: true,
    ringColor: 'rgba(165, 180, 252, 0.5)',
    systemsCount: '6 Sistemas Complejos',
    archetype: 'CORE DE ALTA COMPLEJIDAD',
    satellites: [
      { id: 'sys-3', name: 'Core Dashboard DSB (/#/dsb)', type: 'Búnker Privado' },
      { id: 'sys-7', name: 'PMS Hotelero & Reservas Directas', type: 'Motor Reservas' },
      { id: 'sys-5', name: 'Caja & Arqueo Ciego con Billetes', type: 'Control Fiscal' },
      { id: 'sys-4', name: 'Menús Táctiles & Comandas KDS', type: 'Cocina & Barra' },
      { id: 'sys-6', name: 'Control de Mermas & Recetas', type: 'Costeo Gramo a Gramo' },
      { id: 'sys-8', name: 'Calendario Atómico de Citas', type: 'Disponibilidad' }
    ]
  },
  {
    id: 'world-nexus',
    type: 'planet',
    name: 'Nexus',
    title: 'Frontoffice Sensorial & Retención Dopamínica',
    subtitle: 'MUNDO DE EXPERIENCIA EDITORIAL & CONVERSIÓN',
    tagline: 'Portales de ultra-velocidad que enamoran al tráfico móvil de Ads y fidelizan clientes sin regalar márgenes.',
    color: '#34D399',
    secondaryColor: '#22D3EE',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    orbitRadius: 235,
    speed: 0.005,
    baseSize: 15,
    hasRings: false,
    systemsCount: '4 Portales de Retención',
    archetype: 'FRONTOFFICE SENSORIAL',
    satellites: [
      { id: 'sys-1', name: 'Webs Scrollytelling Apple-Style <0.8s', type: 'Retención Tráfico' },
      { id: 'sys-17', name: 'Fidelización & Billetera WhatsApp', type: 'Membresías VIP' },
      { id: 'sys-2', name: 'Triaje Visual & Agendador 45s', type: 'Funnel Calificador' },
      { id: 'sys-10', name: 'Showroom & Galerías 360°', type: 'Vitrina Inmersiva' }
    ]
  },
  {
    id: 'world-syntropy',
    type: 'planet',
    name: 'Syntropy',
    title: 'Automatizaciones Autónomas de Alto Impacto',
    subtitle: 'MUNDO DE ORQUESTACIÓN & FLUJOS SIN FRICCIÓN',
    tagline: 'Pipelines invisibles que conectan pasarelas, facturación bancaria y bases de datos para operar en piloto automático.',
    color: '#FBBF24',
    secondaryColor: '#F87171',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    orbitRadius: 315,
    speed: 0.0035,
    baseSize: 16,
    hasRings: false,
    systemsCount: '4 Automatizaciones Clave',
    archetype: 'AUTOMATIZACIONES DE PRECISIÓN',
    satellites: [
      { id: 'sys-13', name: 'Workflows Autónomos n8n / Webhooks', type: 'Orquestador' },
      { id: 'sys-11', name: 'Conciliación Automática OCR Facturas', type: 'Extracción IA' },
      { id: 'sys-12', name: 'Generación Inmediata Enlaces de Pago', type: 'Cobro Seguro' },
      { id: 'sys-9', name: 'Recordatorios Automatizados 24h/2h', type: 'Anti No-Show' }
    ]
  },
  {
    id: 'world-chronos',
    type: 'planet',
    name: 'Chronos',
    title: 'Agentes de IA para Tareas Específicas',
    subtitle: 'MUNDO DE AGENTES AUTÓNOMOS 24/7',
    tagline: 'Agentes quirúrgicos entrenados para una misión exacta: filtrar leads, ordenar correos, auditar números y guionar contenido.',
    color: '#38BDF8',
    secondaryColor: '#818CF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    orbitRadius: 395,
    speed: 0.0022,
    baseSize: 14,
    hasRings: true,
    ringColor: 'rgba(56, 189, 248, 0.4)',
    systemsCount: '4 Agentes Quirúrgicos',
    archetype: 'AGENTES DE TAREA ESPECÍFICA',
    satellites: [
      { id: 'sys-14', name: 'Lead Scoring IA 0-100 & Enriquecimiento', type: 'Filtro Prospectos' },
      { id: 'sys-15', name: 'Inbox Zero & Borradores Contextuales', type: 'Productividad' },
      { id: 'sys-16', name: 'Auditor Proactivo 24/7 de Metas y Caja', type: 'Micro-Auditor' },
      { id: 'sys-18', name: 'Generador de Hooks & Guiones Virales', type: 'Contenido 30s' }
    ]
  }
];

export default function SolarSystemCanvas({ 
  selectedWorldId, 
  onSelectWorld, 
  onSelectSystem 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Estados de control del motor orbital
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragRotation, setDragRotation] = useState(0);
  const [hoveredEntity, setHoveredEntity] = useState(null);

  // Referencias para animación continua sin re-renders innecesarios
  const animStateRef = useRef({
    time: 0,
    isDragging: false,
    startX: 0,
    currentDrag: 0,
    stars: []
  });

  // Generación inicial de estrellas fijas con efecto twinkle
  useEffect(() => {
    const starCount = 140;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        size: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
    animStateRef.current.stars = stars;
  }, []);

  // Lógica de Renderizado del Canvas a 60 FPS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      // Limpiar lienzo
      ctx.clearRect(0, 0, width, height);

      // 1. Nebulosa de Fondo (Espacio Profundo)
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#0a0d18');
      bgGrad.addColorStop(0.5, '#05070f');
      bgGrad.addColorStop(1, '#020306');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Nubes de plasma galáctico sutiles
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // Nebulosa Índigo
      const neb1 = ctx.createRadialGradient(centerX - 180, centerY - 100, 10, centerX - 180, centerY - 100, 260);
      neb1.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Nebulosa Oro
      const neb2 = ctx.createRadialGradient(centerX + 160, centerY + 120, 10, centerX + 160, centerY + 120, 240);
      neb2.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 2. Estrellas con Titileo (Twinkle)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoomLevel, zoomLevel);
      ctx.rotate(dragRotation);

      const stars = animStateRef.current.stars;
      const curTime = animStateRef.current.time;
      stars.forEach((star) => {
        const twinkle = Math.sin(curTime * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(0.1, star.alpha + twinkle * 0.25);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Órbitas Concéntricas Elípticas (Perspectiva 2.5D)
      const ellipseFlatten = 0.44; // Efecto de inclinación orbital
      PLANETARY_WORLDS.forEach((world) => {
        if (world.type === 'star') return;

        const isWorldActive = selectedWorldId === world.id;
        const isWorldHovered = hoveredEntity?.id === world.id;

        ctx.beginPath();
        ctx.ellipse(0, 0, world.orbitRadius, world.orbitRadius * ellipseFlatten, 0, 0, Math.PI * 2);
        
        if (isWorldActive || isWorldHovered) {
          ctx.strokeStyle = world.glowColor;
          ctx.lineWidth = 1.6;
          ctx.shadowColor = world.color;
          ctx.shadowBlur = 12;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
          ctx.lineWidth = 0.9;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Cometa o paquete cuántico recorriendo la órbita
        const packetAngle = curTime * world.speed * 2.2;
        const packetX = Math.cos(packetAngle) * world.orbitRadius;
        const packetY = Math.sin(packetAngle) * (world.orbitRadius * ellipseFlatten);
        ctx.fillStyle = world.color;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Renderizado de Planetas y Sus Lunas/Satélites
      PLANETARY_WORLDS.forEach((world) => {
        if (world.type === 'star') return;

        const isSelected = selectedWorldId === world.id;
        const isHovered = hoveredEntity?.id === world.id;

        // Posición actual en órbita
        const angle = curTime * world.speed;
        const px = Math.cos(angle) * world.orbitRadius;
        const py = Math.sin(angle) * (world.orbitRadius * ellipseFlatten);

        // Guardamos las coordenadas calculadas en memoria para detección de click
        world._currentX = px;
        world._currentY = py;

        // Anillos si tiene (ej. Aethel y Chronos)
        if (world.hasRings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(0.35); // Inclinación axial de los anillos
          ctx.beginPath();
          ctx.ellipse(0, 0, world.baseSize * 1.85, world.baseSize * 0.55, 0, 0, Math.PI * 2);
          ctx.strokeStyle = world.ringColor;
          ctx.lineWidth = 2.2;
          ctx.stroke();
          ctx.restore();
        }

        // Resplandor exterior (Atmósfera del Planeta)
        const glowRad = (world.baseSize + (isSelected ? 10 : 4)) * 1.8;
        const atmoGrad = ctx.createRadialGradient(px, py, world.baseSize * 0.4, px, py, glowRad);
        atmoGrad.addColorStop(0, world.color);
        atmoGrad.addColorStop(0.6, world.glowColor);
        atmoGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = atmoGrad;
        ctx.beginPath();
        ctx.arc(px, py, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Cuerpo esférico del planeta con sombra 3D proyectada desde el Sol
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, world.baseSize, 0, Math.PI * 2);
        ctx.clip();

        // Base de color del planeta
        ctx.fillStyle = world.color;
        ctx.fillRect(px - world.baseSize, py - world.baseSize, world.baseSize * 2, world.baseSize * 2);

        // Sombra esférica hacia el lado opuesto al origen (0,0)
        const angleToSun = Math.atan2(py, px);
        const shadowOffsetX = Math.cos(angleToSun) * (world.baseSize * 0.45);
        const shadowOffsetY = Math.sin(angleToSun) * (world.baseSize * 0.45);

        const sphereGrad = ctx.createRadialGradient(
          px - shadowOffsetX, py - shadowOffsetY, world.baseSize * 0.1,
          px + shadowOffsetX, py + shadowOffsetY, world.baseSize * 1.1
        );
        sphereGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)'); // Punto de luz incidente
        sphereGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
        sphereGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.65)'); // Penumbra
        sphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');   // Sombra total
        ctx.fillStyle = sphereGrad;
        ctx.fillRect(px - world.baseSize, py - world.baseSize, world.baseSize * 2, world.baseSize * 2);
        ctx.restore();

        // Indicador de selección / foco
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(px, py, world.baseSize + 6, 0, Math.PI * 2);
          ctx.strokeStyle = world.color;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Lunas / Satélites orbitando alrededor del planeta
        if (world.satellites && world.satellites.length > 0) {
          const satCount = world.satellites.length;
          world.satellites.forEach((sat, sIdx) => {
            const satOrbitR = world.baseSize + 14 + (sIdx % 2) * 8;
            const satSpeed = 0.02 + sIdx * 0.006;
            const satAngle = curTime * satSpeed + (sIdx * (Math.PI * 2 / satCount));
            const sx = px + Math.cos(satAngle) * satOrbitR;
            const sy = py + Math.sin(satAngle) * (satOrbitR * 0.55);

            sat._currentX = sx;
            sat._currentY = sy;

            // Dibujar satélite
            ctx.fillStyle = isSelected ? world.color : 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(sx, sy, isSelected ? 2.5 : 1.8, 0, Math.PI * 2);
            ctx.fill();

            // Pista sutil del satélite si el planeta está seleccionado
            if (isSelected) {
              ctx.beginPath();
              ctx.ellipse(px, py, satOrbitR, satOrbitR * 0.55, 0, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          });
        }

        // Etiqueta del Planeta (Nombre y Arquetipo)
        ctx.font = '600 11px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(world.name.toUpperCase(), px, py + world.baseSize + 16);

        ctx.font = '500 8.5px ui-monospace, monospace';
        ctx.fillStyle = world.color;
        ctx.fillText(world.archetype, px, py + world.baseSize + 27);
      });

      // 5. El Sol Cuántico Central: DYNAMIND PRIME (Consultoría de IA Soberana)
      const sunWorld = PLANETARY_WORLDS[0];
      const isSunSelected = selectedWorldId === sunWorld.id;
      const isSunHovered = hoveredEntity?.id === sunWorld.id;
      sunWorld._currentX = 0;
      sunWorld._currentY = 0;

      // Resplandor de Corona Solar
      const sunPulse = Math.sin(curTime * 0.04) * 4;
      const sunRadius = sunWorld.baseSize + sunPulse;

      const coronaGrad = ctx.createRadialGradient(0, 0, sunRadius * 0.3, 0, 0, sunRadius * 2.8);
      coronaGrad.addColorStop(0, '#FFFFFF');
      coronaGrad.addColorStop(0.2, '#FDE047');
      coronaGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.6)');
      coronaGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.2)');
      coronaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Filamentos cuánticos giratorios
      ctx.save();
      ctx.rotate(curTime * 0.015);
      for (let r = 0; r < 6; r++) {
        ctx.rotate((Math.PI * 2) / 6);
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sunRadius * 1.7, 0);
        ctx.stroke();
      }
      ctx.restore();

      // Esfera solar pura
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sunRadius);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.5, '#FBBF24');
      coreGrad.addColorStop(0.9, '#D97706');
      coreGrad.addColorStop(1, '#92400E');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Anillo de selección si el Sol está activo
      if (isSunSelected || isSunHovered) {
        ctx.beginPath();
        ctx.arc(0, 0, sunRadius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Rótulo del Sol
      ctx.font = '700 11px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText('DYNAMIND PRIME', 0, sunRadius + 22);

      ctx.font = '700 8.5px ui-monospace, monospace';
      ctx.fillStyle = '#38BDF8';
      ctx.fillText('CONSULTORÍA DE IA [NO AGENCIA]', 0, sunRadius + 34);

      ctx.restore();

      // Avanzar tiempo si está reproduciendo
      if (isPlaying) {
        animStateRef.current.time += 1 * speedMultiplier;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, speedMultiplier, zoomLevel, dragRotation, selectedWorldId, hoveredEntity]);

  // Transformar coordenadas del click considerando zoom, rotación y pan
  const getCanvasCoords = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left - rect.width / 2;
    const rawY = e.clientY - rect.top - rect.height / 2;

    // Invertir rotación y zoom
    const unscaledX = rawX / zoomLevel;
    const unscaledY = rawY / zoomLevel;

    const cosR = Math.cos(-dragRotation);
    const sinR = Math.sin(-dragRotation);

    const x = unscaledX * cosR - unscaledY * sinR;
    const y = unscaledX * sinR + unscaledY * cosR;

    return { x, y };
  }, [zoomLevel, dragRotation]);

  // Manejador de click en entidades (Sol, Planetas o Lunas)
  const handleClick = (e) => {
    if (animStateRef.current.isDragging) return;
    const { x, y } = getCanvasCoords(e);

    // Verificar colisión con el Sol
    const sun = PLANETARY_WORLDS[0];
    const distToSun = Math.hypot(x, y);
    if (distToSun <= sun.baseSize + 12) {
      soundFx.playPlanetSelect();
      onSelectWorld(sun.id);
      return;
    }

    // Verificar colisión con los planetas y sus lunas
    for (const world of PLANETARY_WORLDS) {
      if (world.type === 'star') continue;
      const wx = world._currentX || 0;
      const wy = world._currentY || 0;
      const distToPlanet = Math.hypot(x - wx, y - wy);

      if (distToPlanet <= world.baseSize + 14) {
        soundFx.playOrbitWarp();
        onSelectWorld(world.id);
        return;
      }

      // Colisión con satélites
      if (world.satellites) {
        for (const sat of world.satellites) {
          const sx = sat._currentX || 0;
          const sy = sat._currentY || 0;
          const distToSat = Math.hypot(x - sx, y - sy);
          if (distToSat <= 10) {
            soundFx.playBlip(780);
            onSelectWorld(world.id);
            if (onSelectSystem) onSelectSystem(sat.id);
            return;
          }
        }
      }
    }
  };

  // Manejador de hover
  const handleMouseMove = (e) => {
    const state = animStateRef.current;
    if (state.isDragging) {
      const deltaX = e.clientX - state.startX;
      setDragRotation(state.currentDrag + deltaX * 0.005);
      return;
    }

    const { x, y } = getCanvasCoords(e);
    let found = null;

    const sun = PLANETARY_WORLDS[0];
    if (Math.hypot(x, y) <= sun.baseSize + 12) {
      found = sun;
    } else {
      for (const world of PLANETARY_WORLDS) {
        if (world.type === 'star') continue;
        const dist = Math.hypot(x - (world._currentX || 0), y - (world._currentY || 0));
        if (dist <= world.baseSize + 14) {
          found = world;
          break;
        }
      }
    }

    setHoveredEntity(found);
  };

  const handleMouseDown = (e) => {
    animStateRef.current.isDragging = false;
    animStateRef.current.startX = e.clientX;
    animStateRef.current.currentDrag = dragRotation;

    const onMove = (moveEv) => {
      if (Math.abs(moveEv.clientX - animStateRef.current.startX) > 4) {
        animStateRef.current.isDragging = true;
      }
      const deltaX = moveEv.clientX - animStateRef.current.startX;
      setDragRotation(animStateRef.current.currentDrag + deltaX * 0.005);
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // Touch handlers para smartphones
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      animStateRef.current.startX = e.touches[0].clientX;
      animStateRef.current.currentDrag = dragRotation;
      animStateRef.current.isDragging = false;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - animStateRef.current.startX;
      if (Math.abs(deltaX) > 5) {
        animStateRef.current.isDragging = true;
      }
      setDragRotation(animStateRef.current.currentDrag + deltaX * 0.007);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/10 bg-[#030509] shadow-2xl group select-none"
    >
      {/* Canvas Principal */}
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Rótulo Holográfico Superior: Telemetría de la Misión */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none z-10 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
            SISTEMA SOLAR DYNAMIND // CARTOGRAFÍA ACTIVA
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-sm font-light">
          Haz clic en cualquier planeta o en el Sol central para consultar su arquitectura operativa.
        </p>
      </div>

      {/* Badge Flotante "CONSULTORÍA DE IA (NO AGENCIA)" */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md flex items-center gap-2 text-[11px] font-mono font-bold text-amber-300">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>CONSULTORÍA DE IA // CERO RENTA DE AGENCIA</span>
        </div>
      </div>

      {/* Controles Flotantes Inferiores (HUD Táctico) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl">
        
        {/* Play/Pause Órbita */}
        <button
          onClick={() => {
            soundFx.playTap();
            setIsPlaying(!isPlaying);
          }}
          className="p-2 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
          title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Velocidad */}
        <button
          onClick={() => {
            soundFx.playTap();
            setSpeedMultiplier(prev => prev === 1 ? 2.5 : prev === 2.5 ? 4 : 1);
          }}
          className="px-2.5 py-1 rounded-xl hover:bg-white/10 text-[11px] font-mono text-zinc-300 hover:text-amber-400 transition-all flex items-center gap-1"
          title="Multiplicador de velocidad orbital"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>{speedMultiplier}x</span>
        </button>

        <div className="w-px h-4 bg-white/15" />

        {/* Zoom In */}
        <button
          onClick={() => {
            soundFx.playTap();
            setZoomLevel(prev => Math.min(prev + 0.15, 1.6));
          }}
          className="p-2 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
          title="Acercar vista"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => {
            soundFx.playTap();
            setZoomLevel(prev => Math.max(prev - 0.15, 0.7));
          }}
          className="p-2 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
          title="Alejar vista"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset Posición */}
        <button
          onClick={() => {
            soundFx.playScanTone();
            setZoomLevel(1);
            setDragRotation(0);
          }}
          className="p-2 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-cyan-400 transition-all"
          title="Restablecer vista centrada"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Tooltip Dinámico de Entidad Hover */}
      <AnimatePresence>
        {hoveredEntity && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-3 text-left"
          >
            <div 
              className="w-3.5 h-3.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: hoveredEntity.color, boxShadow: `0 0 12px ${hoveredEntity.color}` }}
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{hoveredEntity.name}</span>
                <span className="text-[10px] font-mono text-zinc-400 font-normal">({hoveredEntity.archetype})</span>
              </div>
              <div className="text-[11px] text-zinc-300 font-light">
                {hoveredEntity.systemsCount} • Clic para explorar telemetría
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
