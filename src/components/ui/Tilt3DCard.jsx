import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';

export default function Tilt3DCard({ children, className = '', intensity = 10, ...props }) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // MotionValues directos en GPU (Cero re-renders de React a 60/120 FPS)
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 26, mass: 0.5 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const smoothGlareOpacity = useSpring(glareOpacity, { stiffness: 260, damping: 30 });

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.24) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawRotateX.set(((y - centerY) / centerY) * -intensity);
    rawRotateY.set(((x - centerX) / centerX) * intensity);
    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
    glareOpacity.set(0.12);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}

      {/* Sutil resplandor especular dinámico acelerado por compositor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: smoothGlareOpacity,
          background: glareBackground,
        }}
      />
    </motion.div>
  );
}
