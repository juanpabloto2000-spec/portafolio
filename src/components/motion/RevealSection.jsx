import React from 'react';
import { motion } from 'framer-motion';

export default function RevealSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.38,
  blur = false,
  ...props
}) {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: 16, x: 0 };
      case 'down':
        return { y: -16, x: 0 };
      case 'left':
        return { x: -20, y: 0 };
      case 'right':
        return { x: 20, y: 0 };
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
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0, margin: "250px 0px 250px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
