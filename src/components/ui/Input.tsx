import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none" style={{ color: 'var(--color-text-muted)' }}>
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            style={{
              backgroundColor: 'var(--color-bg-input)',
              color: 'var(--color-text-primary)',
              borderColor: error ? undefined : 'var(--color-border)',
            }}
            className={cn(
              'w-full rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-[--color-text-muted]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5" style={{ color: 'var(--color-text-muted)' }}>
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-rose-400 font-medium pl-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
