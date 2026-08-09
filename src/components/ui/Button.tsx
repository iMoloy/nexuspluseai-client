'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const baseStyles = [
    'inline-flex items-center justify-center font-bold rounded-xl',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-95 select-none',
    'relative overflow-hidden',
  ].join(' ');

  // ── PRIMARY gradient ──────────────────────────────────────────────────────
  // Day:   crisp indigo→violet with a clean white text, strong shadow lift
  // Night: deep jewel-tone indigo→violet→emerald with glow
  const primaryLight = [
    'bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600',
    'text-white font-semibold',
    'border border-indigo-400/30',
    'shadow-md shadow-indigo-500/30',
    'hover:shadow-xl hover:shadow-indigo-500/50',
    'hover:from-indigo-400 hover:via-violet-400 hover:to-indigo-500',
    'hover:border-indigo-300/60',
    'hover:scale-[1.03]',
  ].join(' ');

  const primaryDark = [
    'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500',
    'text-white font-semibold',
    'border border-indigo-400/30',
    'shadow-lg shadow-indigo-600/30',
    'hover:shadow-2xl hover:shadow-indigo-500/50',
    'hover:from-indigo-500 hover:via-violet-500 hover:to-emerald-400',
    'hover:border-indigo-300/50',
    'hover:scale-[1.03]',
  ].join(' ');

  // ── DANGER gradient ───────────────────────────────────────────────────────
  // Day:   bright rose→pink, clean and punchy
  // Night: deep rose→fuchsia with red glow
  const dangerLight = [
    'bg-gradient-to-r from-rose-500 to-pink-500',
    'text-white font-semibold',
    'border border-rose-300/30',
    'shadow-md shadow-rose-400/25',
    'hover:shadow-xl hover:shadow-rose-400/45',
    'hover:from-rose-400 hover:to-pink-400',
    'hover:scale-[1.03]',
  ].join(' ');

  const dangerDark = [
    'bg-gradient-to-r from-rose-600 to-pink-600',
    'text-white font-semibold',
    'border border-rose-400/30',
    'shadow-lg shadow-rose-600/25',
    'hover:shadow-2xl hover:shadow-rose-500/50',
    'hover:from-rose-500 hover:to-fuchsia-500',
    'hover:scale-[1.03]',
  ].join(' ');

  // ── SECONDARY ─────────────────────────────────────────────────────────────
  // Day:   white card style with subtle indigo hover
  // Night: dark glassy card
  const secondaryLight = [
    'bg-white text-slate-700',
    'border border-slate-200',
    'shadow-sm',
    'hover:bg-indigo-50 hover:text-indigo-700',
    'hover:border-indigo-300',
    'hover:shadow-md hover:shadow-indigo-100',
    'hover:scale-[1.02]',
  ].join(' ');

  const secondaryDark = [
    '[background-color:var(--color-bg-elevated)]',
    '[color:var(--color-text-primary)]',
    '[border-color:var(--color-border)]',
    'border shadow-md backdrop-blur-xl',
    'hover:[background-color:var(--color-bg-surface)]',
    'hover:border-indigo-500/50',
    'hover:shadow-lg hover:shadow-indigo-500/10',
    'hover:scale-[1.02]',
  ].join(' ');

  // ── OUTLINE ───────────────────────────────────────────────────────────────
  // Day:   indigo border, white bg, fills on hover
  // Night: indigo border, transparent bg, purple tint on hover
  const outlineLight = [
    'border-2 border-indigo-400',
    'text-indigo-600 bg-transparent',
    'shadow-sm',
    'hover:bg-indigo-500 hover:text-white',
    'hover:border-indigo-500',
    'hover:shadow-md hover:shadow-indigo-400/30',
    'hover:scale-[1.02]',
  ].join(' ');

  const outlineDark = [
    'border border-indigo-500/50',
    'text-indigo-400 backdrop-blur-xl',
    'shadow-sm',
    'hover:bg-indigo-500/15',
    'hover:text-indigo-200',
    'hover:border-indigo-400',
    'hover:shadow-md hover:shadow-indigo-500/25',
    'hover:scale-[1.02]',
  ].join(' ');

  // ── GHOST ─────────────────────────────────────────────────────────────────
  const ghostLight = [
    'text-slate-600',
    'hover:text-indigo-700',
    'hover:bg-indigo-50',
    'hover:scale-[1.02]',
  ].join(' ');

  const ghostDark = [
    '[color:var(--color-text-secondary)]',
    'hover:[color:var(--color-text-primary)]',
    'hover:[background-color:var(--color-bg-elevated)]',
    'hover:scale-[1.02]',
    'backdrop-blur-md',
  ].join(' ');

  const variants = {
    primary:   isLight ? primaryLight   : primaryDark,
    secondary: isLight ? secondaryLight : secondaryDark,
    outline:   isLight ? outlineLight   : outlineDark,
    ghost:     isLight ? ghostLight     : ghostDark,
    danger:    isLight ? dangerLight    : dangerDark,
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
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer sweep — visible on primary & danger */}
      {(variant === 'primary' || variant === 'danger') && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
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
