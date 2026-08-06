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
        'rounded-2xl p-6 border',
        glass
          ? 'bg-slate-900/60 backdrop-blur-xl border-slate-800/80 shadow-xl shadow-black/20'
          : 'bg-slate-900 border-slate-800',
        hoverEffect && 'hover:border-slate-700/80 hover:shadow-indigo-500/5',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
