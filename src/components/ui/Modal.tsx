'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)'
            }}
            className={cn(
              'relative w-full max-w-lg max-h-[90vh] border rounded-2xl shadow-2xl p-4 sm:p-6 z-10 overflow-y-auto flex flex-col backdrop-blur-2xl',
              className
            )}
          >
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
              {title && <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>}
              <button
                onClick={onClose}
                className="p-1 rounded-lg transition-colors ml-auto"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = 'var(--color-bg-elevated)'; (e.target as HTMLElement).style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = 'var(--color-text-muted)'; }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
