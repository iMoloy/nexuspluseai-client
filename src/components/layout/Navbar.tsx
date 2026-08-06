'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Wallet, Sparkles, Car, Briefcase, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenWallet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenWallet
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Explore All
          </button>

          <button
            onClick={() => setActiveTab('rentals')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'rentals'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Asset Rentals
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'kanban'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Gig Kanban
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'wallet'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" /> Wallet & Escrow
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Badge variant="success" icon={<ShieldCheck className="w-3.5 h-3.5" />} className="hidden sm:inline-flex py-1 px-3">
            Escrow Protected
          </Badge>

          <button
            onClick={onOpenWallet}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>$1,250.00</span>
          </button>

          <Button variant="primary" size="sm" onClick={onOpenAuth} leftIcon={<UserIcon className="w-3.5 h-3.5" />}>
            Account
          </Button>
        </div>
      </div>
    </header>
  );
};
