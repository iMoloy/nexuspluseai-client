import React from 'react';
import Link from 'next/link';
import { Cpu } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
          <Cpu className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
        </div>
      </div>

      {showText && (
        <span className="font-extrabold text-xl tracking-tight text-slate-100">
          Nexus<span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">Pulse</span>
        </span>
      )}
    </Link>
  );
};
