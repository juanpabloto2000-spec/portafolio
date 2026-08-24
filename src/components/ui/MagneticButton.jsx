import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary", // primary, secondary, outline, ghost
  icon: Icon,
  size = "md"
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.15;
    const y = (clientY - (top + height / 2)) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-7 py-3.5 text-xs sm:text-sm"
  };

  const variantClasses = {
    primary: "bg-white text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:bg-slate-100 border border-white",
    secondary: "bg-zinc-900/90 text-white border border-white/10 hover:border-white/30 hover:bg-zinc-800 backdrop-blur-md",
    outline: "bg-transparent text-white border border-white/20 hover:border-white/60 hover:bg-white/5",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-xl tracking-wide transition-all duration-300 cursor-pointer select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <span>{children}</span>
      {Icon && (
        <span className="w-5 h-5 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <Icon className="w-3 h-3" />
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={href.startsWith('http') ? '_blank' : undefined} 
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block focus:outline-none">
      {content}
    </button>
  );
}
