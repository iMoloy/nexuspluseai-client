'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      style={{
        backgroundColor: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)',
        color: isLight ? '#1e293b' : '#f1f5f9',
        borderColor: isLight ? 'rgba(203,213,225,0.9)' : 'rgba(71,85,105,0.8)',
        boxShadow: isLight
          ? '0 8px 32px rgba(99,102,241,0.15), 0 2px 8px rgba(0,0,0,0.08)'
          : '0 8px 32px rgba(99,102,241,0.3), 0 2px 8px rgba(0,0,0,0.4)',
      }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 p-3.5 rounded-full border-2 backdrop-blur-xl hover:scale-110 active:scale-95 transition-all duration-300 hover:ring-2 hover:ring-indigo-400/60 shadow-2xl"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun icon — visible in Light mode */}
        <Sun
          className={`w-5 h-5 text-amber-500 absolute transition-all duration-500 transform ${
            isLight
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon icon — visible in Dark mode */}
        <Moon
          className={`w-5 h-5 text-indigo-400 absolute transition-all duration-500 transform ${
            !isLight
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      <span
        className="hidden sm:inline text-xs font-bold tracking-wide pr-0.5"
        style={{ color: isLight ? '#334155' : '#cbd5e1' }}
      >
        {isLight ? 'Day' : 'Night'}
      </span>
    </button>
  );
};
