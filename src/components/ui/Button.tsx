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
  const baseStyles = [
    'inline-flex items-center justify-center font-bold rounded-xl',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-95 select-none',
    'relative overflow-hidden', // for shimmer
  ].join(' ');

  const variants = {
    primary: [
      'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500',
      'text-white border border-indigo-400/40',
      'shadow-lg shadow-indigo-600/25',
      'hover:shadow-xl hover:shadow-indigo-500/40',
      'hover:brightness-110 hover:scale-[1.03]',
      'hover:border-indigo-300/60',
    ].join(' '),

    secondary: [
      '[background-color:var(--color-bg-elevated)]',
      '[color:var(--color-text-primary)]',
      '[border-color:var(--color-border)]',
      'border shadow-md backdrop-blur-xl',
      'hover:[background-color:var(--color-bg-surface)]',
      'hover:border-indigo-500/50',
      'hover:shadow-lg hover:shadow-indigo-500/10',
      'hover:scale-[1.02]',
    ].join(' '),

    outline: [
      'border border-indigo-500/40',
      'text-indigo-400 backdrop-blur-xl',
      'shadow-sm',
      'hover:bg-indigo-500/10',
      'hover:text-indigo-300',
      'hover:border-indigo-400',
      'hover:shadow-md hover:shadow-indigo-500/20',
      'hover:scale-[1.02]',
    ].join(' '),

    ghost: [
      '[color:var(--color-text-secondary)]',
      'hover:[color:var(--color-text-primary)]',
      'hover:[background-color:var(--color-bg-elevated)]',
      'hover:scale-[1.02]',
      'hover:shadow-sm',
      'backdrop-blur-md',
    ].join(' '),

    danger: [
      'bg-gradient-to-r from-rose-600 to-pink-600',
      'text-white border border-rose-400/30',
      'shadow-lg shadow-rose-600/20',
      'hover:shadow-xl hover:shadow-rose-500/40',
      'hover:brightness-110 hover:scale-[1.03]',
      'hover:border-rose-300/60',
    ].join(' '),
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer overlay on hover for primary/danger */}
      {(variant === 'primary' || variant === 'danger') && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] pointer-events-none"
        />
      )}

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
