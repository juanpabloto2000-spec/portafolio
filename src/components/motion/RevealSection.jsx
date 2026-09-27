import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RevealSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.45,
  blur = false,
  ...props
}) {
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    // Fallback garantizado: si IntersectionObserver tarda o no se dispara en el primer render, asegura visibilidad absoluta
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: 20, x: 0 };
      case 'down':
        return { y: -20, x: 0 };
      case 'left':
        return { x: -25, y: 0 };
      case 'right':
        return { x: 25, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffsets = getInitialOffsets();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialOffsets.x,
        y: initialOffsets.y,
      }}
      animate={forceVisible ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "150px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
