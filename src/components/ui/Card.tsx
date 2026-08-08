'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  glass?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = true,
  hoverEffect = false,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-2xl p-6 border transition-all duration-300 relative',
        glass
          ? 'bg-gradient-to-b from-indigo-950/30 via-slate-950/80 to-black/90 backdrop-blur-2xl border-indigo-500/20 shadow-2xl shadow-indigo-950/20 hover:border-indigo-500/50'
          : 'bg-gradient-to-b from-slate-950 to-black border-neutral-800',
        hoverEffect && 'hover:border-indigo-500/60 hover:shadow-indigo-500/15 hover:-translate-y-1 hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
