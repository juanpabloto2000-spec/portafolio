import React, { useEffect, useRef } from 'react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function GalaxyAmbientBackground() {
  const canvasRef = useRef(null);
  const { theme } = useThemeLanguage();

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

    // 140 estrellas estelares con diferentes tonalidades cósmicas
    const starCount = Math.min(Math.floor((width * height) / 9000), 150);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: (Math.random() - 0.5) * 0.18,
      baseAlpha: Math.random() * 0.65 + 0.35,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#ffffff' : Math.random() > 0.5 ? '#38bdf8' : '#fbbf24'
    }));

    let frame = 0;

    const render = () => {
      frame++;

      // Base oscura cósmica según el tema
      if (theme === 'mocha') {
        ctx.fillStyle = '#140d0a';
      } else if (theme === 'alabaster') {
        ctx.fillStyle = '#f8fafc';
      } else {
        ctx.fillStyle = '#030508'; // Obsidian profundo
      }
      ctx.fillRect(0, 0, width, height);

      // Nebulosas Cósmicas que respiran con oscilación lenta
      let nebula1Color = 'rgba(14, 165, 233, 0.07)'; // cian vivo
      let nebula2Color = 'rgba(168, 85, 247, 0.05)'; // violeta estelar
      let nebula3Color = 'rgba(245, 158, 11, 0.04)';  // ámbar cósmico

      if (theme === 'mocha') {
        nebula1Color = 'rgba(217, 119, 6, 0.08)';
        nebula2Color = 'rgba(180, 83, 9, 0.06)';
        nebula3Color = 'rgba(120, 53, 15, 0.05)';
      } else if (theme === 'alabaster') {
        nebula1Color = 'rgba(79, 70, 229, 0.085)'; // Índigo eléctrico IA
        nebula2Color = 'rgba(124, 58, 237, 0.075)'; // Violeta IA intenso
        nebula3Color = 'rgba(6, 182, 212, 0.055)';  // Cian IA luminoso
      }

      // Nebulosa 1
      const cx1 = width * 0.3 + Math.sin(frame * 0.002) * (width * 0.08);
      const cy1 = height * 0.4 + Math.cos(frame * 0.002) * (height * 0.08);
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.55);
      grad1.addColorStop(0, nebula1Color);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Nebulosa 2
      const cx2 = width * 0.75 + Math.cos(frame * 0.0015) * (width * 0.1);
      const cy2 = height * 0.65 + Math.sin(frame * 0.0015) * (height * 0.1);
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.6);
      grad2.addColorStop(0, nebula2Color);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Nebulosa 3
      const cx3 = width * 0.5 + Math.sin(frame * 0.001) * (width * 0.06);
      const cy3 = height * 0.85 + Math.cos(frame * 0.001) * (height * 0.06);
      const grad3 = ctx.createRadialGradient(cx3, cy3, 10, cx3, cy3, width * 0.45);
      grad3.addColorStop(0, nebula3Color);
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Renderizar y desplazar estrellas vivas
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha = star.baseAlpha + Math.sin(frame * star.pulseSpeed + star.phase) * 0.35;
        const clampedAlpha = Math.max(0.15, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        if (theme === 'alabaster') {
          // Micro-estrellas irisadas azul y púrpura IA sobre lienzo claro
          const starTone = i % 2 === 0 ? '99, 102, 241' : '168, 85, 247';
          ctx.fillStyle = `rgba(${starTone}, ${clampedAlpha * 0.6})`;
        } else {
          ctx.fillStyle = star.color;
          ctx.globalAlpha = clampedAlpha;
        }

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
