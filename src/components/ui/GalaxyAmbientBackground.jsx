import React, { useEffect, useRef, useState } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { festiveThemeStore } from '../../services/festiveThemeStore';

export default function GalaxyAmbientBackground() {
  const canvasRef = useRef(null);
  const { theme } = useThemeLanguage();
  const [festiveTheme, setFestiveTheme] = useState(() => festiveThemeStore.getFestiveConfig().themeId);

  useEffect(() => {
    const unsubscribe = festiveThemeStore.subscribe(
      (newConfig) => setFestiveTheme(newConfig.themeId),
      null
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 140 estrellas estelares ricas y detalladas (Identidad Galáctica Dynamind)
    const starCount = Math.min(Math.floor((width * height) / 8500), 150);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      baseAlpha: Math.random() * 0.65 + 0.35,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#ffffff' : Math.random() > 0.45 ? '#60a5fa' : Math.random() > 0.4 ? '#c084fc' : '#fbbf24'
    }));

    let frame = 0;

    const render = () => {
      frame++;

      // Base oscura cósmica según el tema o festividad
      if (theme === 'mocha') {
        ctx.fillStyle = '#140d0a';
      } else if (theme === 'alabaster') {
        ctx.fillStyle = '#f8fafc';
      } else if (festiveTheme === 'halloween') {
        ctx.fillStyle = '#09060e'; // Obsidian violeta Halloween
      } else {
        ctx.fillStyle = '#030508'; // Obsidian profundo
      }
      ctx.fillRect(0, 0, width, height);

      // En modo Alabaster (Swiss), renderizamos una superficie arquitectónica serena con micro-estrellas irisadas
      if (theme === 'alabaster') {
        const archGrad = ctx.createLinearGradient(0, 0, 0, height);
        archGrad.addColorStop(0, '#f8fafc');
        archGrad.addColorStop(0.5, '#f1f5f9');
        archGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = archGrad;
        ctx.fillRect(0, 0, width, height);

        // Suave halo ambiental monolítico apenas perceptible
        const lightGrad = ctx.createRadialGradient(width * 0.5, height * 0.1, 10, width * 0.5, height * 0.1, width * 0.7);
        lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        lightGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = lightGrad;
        ctx.fillRect(0, 0, width, height);

        // En modo alabaster mostramos suaves microestrellas sutiles azul y morado
        for (let i = 0; i < Math.floor(stars.length * 0.35); i++) {
          const star = stars[i];
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(168, 85, 247, 0.22)';
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Nebulosas Cósmicas Vivas: Azul Zafiro & Morado Estelar (o Halloween Calabaza & Violeta)
      let nebula1Color = 'rgba(37, 99, 235, 0.075)'; // azul zafiro galáctico
      let nebula2Color = 'rgba(168, 85, 247, 0.07)';  // violeta / morado cósmico
      let nebula3Color = 'rgba(99, 102, 241, 0.05)';  // índigo de profundidad

      if (festiveTheme === 'halloween') {
        nebula1Color = 'rgba(249, 115, 22, 0.085)'; // calabaza brûlée
        nebula2Color = 'rgba(168, 85, 247, 0.08)';  // violeta espectral
        nebula3Color = 'rgba(234, 88, 12, 0.055)'; // fuego fatuo ámbar
      } else if (theme === 'mocha') {
        nebula1Color = 'rgba(217, 119, 6, 0.08)';
        nebula2Color = 'rgba(180, 83, 9, 0.06)';
        nebula3Color = 'rgba(120, 53, 15, 0.05)';
      }

      // Nebulosa 1 (Azul Zafiro)
      const cx1 = width * 0.3 + Math.sin(frame * 0.002) * (width * 0.08);
      const cy1 = height * 0.4 + Math.cos(frame * 0.002) * (height * 0.08);
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.6);
      grad1.addColorStop(0, nebula1Color);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Nebulosa 2 (Morado Cósmico)
      const cx2 = width * 0.75 + Math.cos(frame * 0.0015) * (width * 0.1);
      const cy2 = height * 0.65 + Math.sin(frame * 0.0015) * (height * 0.1);
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.65);
      grad2.addColorStop(0, nebula2Color);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Nebulosa 3 (Índigo Profundo)
      const cx3 = width * 0.5 + Math.sin(frame * 0.001) * (width * 0.06);
      const cy3 = height * 0.85 + Math.cos(frame * 0.001) * (height * 0.06);
      const grad3 = ctx.createRadialGradient(cx3, cy3, 10, cx3, cy3, width * 0.5);
      grad3.addColorStop(0, nebula3Color);
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Renderizar y desplazar estrellas detalladas con brillo oscilante
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha = star.baseAlpha + Math.sin(frame * star.pulseSpeed + star.phase) * 0.35;
        const clampedAlpha = Math.max(0.18, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
