'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:brightness-110 border border-indigo-400/40',
    secondary: 'text-slate-200 border shadow-lg backdrop-blur-xl [background-color:var(--color-bg-elevated)] [border-color:var(--color-border)] hover:border-indigo-500/40 [color:var(--color-text-primary)]',
    outline: 'border border-indigo-500/40 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/20 backdrop-blur-xl hover:border-indigo-400 shadow-md',
    ghost: '[color:var(--color-text-secondary)] hover:[color:var(--color-text-primary)] hover:[background-color:var(--color-bg-elevated)] backdrop-blur-md',
    danger: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:brightness-110 shadow-xl shadow-rose-600/25 border border-rose-400/30'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  );
};
