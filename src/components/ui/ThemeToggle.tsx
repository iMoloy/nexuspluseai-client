'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 p-3.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 text-slate-100 dark:text-slate-100 light:text-slate-800 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-2xl backdrop-blur-xl hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-indigo-500/30 hover:ring-indigo-400"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun
          className={`w-6 h-6 text-amber-400 absolute transition-all duration-500 transform ${
            theme === 'light'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon
          className={`w-6 h-6 text-indigo-400 absolute transition-all duration-500 transform ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
        {theme === 'dark' ? 'Night' : 'Day'}
      </span>
    </button>
  );
};
