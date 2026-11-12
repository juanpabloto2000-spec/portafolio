import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function RevealSection({
  children,
  className = '',
  direction = 'up',
  variant = null,
  delay = 0,
  duration = 0.42,
  blur = false,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const mode = variant || direction;

  const getInitialState = () => {
    if (prefersReducedMotion) {
      return { opacity: 0, x: 0, y: 0, scale: 1, rotateX: 0 };
    }
    switch (mode) {
      case 'up':
        return { opacity: 0, y: 16, x: 0, scale: 1, rotateX: 0, filter: blur ? 'blur(6px)' : 'blur(0px)' };
      case 'down':
        return { opacity: 0, y: -16, x: 0, scale: 1, rotateX: 0, filter: blur ? 'blur(6px)' : 'blur(0px)' };
      case 'left':
        return { opacity: 0, x: -22, y: 0, scale: 1, rotateX: 0, filter: blur ? 'blur(6px)' : 'blur(0px)' };
      case 'right':
        return { opacity: 0, x: 22, y: 0, scale: 1, rotateX: 0, filter: blur ? 'blur(6px)' : 'blur(0px)' };
      case 'scale':
        return { opacity: 0, x: 0, y: 8, scale: 0.96, rotateX: 0, filter: blur ? 'blur(6px)' : 'blur(0px)' };
      case 'bounce':
        return { opacity: 0, x: 0, y: 18, scale: 0.95, rotateX: 0 };
      case 'flip':
        return { opacity: 0, x: 0, y: 12, scale: 0.98, rotateX: -10 };
      case 'blur':
        return { opacity: 0, x: 0, y: 10, scale: 0.99, rotateX: 0, filter: 'blur(8px)' };
      case 'spring':
        return { opacity: 0, x: 0, y: 16, scale: 0.97, rotateX: 0 };
      case 'none':
      default:
        return { opacity: 0, x: 0, y: 0, scale: 1, rotateX: 0 };
    }
  };

  const getTransition = () => {
    if (prefersReducedMotion) {
      return { duration: 0.15, delay: 0 };
    }
    if (mode === 'bounce') {
      return { type: 'spring', stiffness: 360, damping: 22, delay };
    }
    if (mode === 'spring') {
      return { type: 'spring', stiffness: 280, damping: 26, mass: 0.8, delay };
    }
    return {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    };
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0, margin: '220px 0px 220px 0px' }}
      transition={getTransition()}
      style={mode === 'flip' ? { transformPerspective: 1000 } : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
