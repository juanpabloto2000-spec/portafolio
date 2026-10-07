// src/components/interactive/TerminalPhosphorShader.jsx
// Shader de Fósforo Cuántico & Scanlines Tácticas (Dynamind Studios):
// - Simula un monitor de telemetría militar de alta seguridad (CRT phosphor & grid scanlines).
// - Ultra-eficiente: corre en un canvas GPU liviano que se despierta durante la ejecución de comandos.

import React, { useEffect, useRef } from 'react';

export default function TerminalPhosphorShader({ isRunning = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 260);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      drawStaticScanlines();
    };

    window.addEventListener('resize', handleResize);

    // Dibuja las scanlines y la cuadrícula táctica
    const drawStaticScanlines = (offset = 0) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Tinte sutil de fósforo azul/cian de seguridad
      ctx.fillStyle = 'rgba(6, 182, 212, 0.015)';
      ctx.fillRect(0, 0, width, height);

      // 2. Scanlines horizontales tácticas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1);
      }

      // 3. Haz de barrido dinámico de telemetría (Beam sweep)
      if (offset > 0) {
        const beamY = offset % (height + 40) - 20;
        const beamGrad = ctx.createLinearGradient(0, beamY - 15, 0, beamY + 15);
        beamGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        beamGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.08)');
        beamGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(0, beamY - 15, width, 30);
      }

      // 4. Viñeta perimetral de pantalla táctica
      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, width * 0.3,
        width * 0.5, height * 0.5, width * 0.65
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    drawStaticScanlines();

    // Si isRunning está activo, corre una animación de barrido de 400ms a 60 FPS y luego se detiene
    if (isRunning) {
      let startTime = performance.now();
      const runLoop = (now) => {
        const elapsed = now - startTime;
        drawStaticScanlines(elapsed * 0.85);

        if (elapsed < 600) {
          animationFrameId = requestAnimationFrame(runLoop);
        } else {
          drawStaticScanlines(0); // Detener y quedar estático (0% CPU)
        }
      };
      animationFrameId = requestAnimationFrame(runLoop);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
