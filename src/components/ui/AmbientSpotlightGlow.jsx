import React, { useEffect, useRef } from 'react';

export default function AmbientSpotlightGlow() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container) return;

    let rafId = null;

    const handlePointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!glow || !container) return;
        container.style.opacity = '1';
        glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    };

    const handlePointerLeave = () => {
      if (container) {
        container.style.opacity = '0';
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.body.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.body.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: 0,
          top: 0,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 35%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
