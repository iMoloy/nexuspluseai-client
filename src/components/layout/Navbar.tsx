'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Wallet, Sparkles, Car, Briefcase, User as UserIcon, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
  const { currentUser, isAuthenticated, isLoadingSession, logout, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/85 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-black/80 p-1.5 rounded-2xl border border-indigo-500/20 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-neutral-900/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Explore All
          </button>

          <button
            onClick={() => setActiveTab('rentals')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'rentals'
                ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-neutral-900/80'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Asset Rentals
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'kanban'
                ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-neutral-900/80'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Gig Kanban
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'wallet'
                ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-neutral-900/80'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" /> Escrow Wallet
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">

          {isAuthenticated && currentUser && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenWallet}
              leftIcon={<Wallet className="w-4 h-4 text-emerald-400" />}
            >
              $1,250.00
            </Button>
          )}

          {/* Auth Section */}
          {isLoadingSession ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            </div>
          ) : isAuthenticated && currentUser ? (
            /* Logged-in User Avatar + Logout */
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('profile')}
                title="View Profile Settings"
                leftIcon={
                  currentUser.avatar ? (
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      width={20}
                      height={20}
                      unoptimized
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-500/50"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )
                }
              >
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={logout}
                disabled={isLoading}
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            /* Account Button (Opens Login/Register Modal) */
            <Button variant="primary" size="sm" onClick={onOpenAuth} leftIcon={<UserIcon className="w-3.5 h-3.5" />}>
              Account
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
