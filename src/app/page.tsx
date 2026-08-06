'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { WalletSection } from '@/components/dashboard/WalletSection';
import { RentalSection } from '@/components/dashboard/RentalSection';
import { KanbanSection } from '@/components/dashboard/KanbanSection';
import { AiAssistantModal } from '@/components/ai/AiAssistantModal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Sparkles, ShieldCheck, Car, Briefcase, Lock, ArrowRight, Zap, CheckCircle2, Star } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Home() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error('Please enter email and password');
      return;
    }
    toast.success(`Welcome back, ${authEmail.split('@')[0]}! Logged in with JWT Session.`);
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative">
      {/* Background Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWallet={() => setActiveTab('wallet')}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 z-10">
        {/* HERO SECTION */}
        {(activeTab === 'explore' || activeTab === 'all') && (
          <section className="text-center space-y-6 pt-4 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              The AI-Powered Freelance Gigs, Asset Rentals & Escrow Super-App
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
              Autonomous Work, Smart Asset Rentals &{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Escrow Protected Payments
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Rent high-value vehicles & gear, hire top freelancers with live Kanban tracking, and secure every transaction automatically in Escrow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsAiOpen(true)}
                leftIcon={<Sparkles className="w-5 h-5 text-emerald-300" />}
              >
                Launch AI Assistant
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('rentals')}
                leftIcon={<Car className="w-5 h-5 text-indigo-400" />}
              >
                Explore Vehicles & Assets
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setActiveTab('kanban')}
                leftIcon={<Briefcase className="w-5 h-5 text-purple-400" />}
              >
                Gig Kanban Board
              </Button>
            </div>

            {/* Live Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> $1.2M+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Secured in Escrow</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
                  <Star className="w-5 h-5 text-amber-400" /> 4,500+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Assets & Gigs Completed</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
                  <Zap className="w-5 h-5 text-indigo-400" /> 99.8%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">AI Dispute Accuracy</div>
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENTS */}
        {activeTab === 'wallet' && <WalletSection />}
        {activeTab === 'rentals' && <RentalSection />}
        {activeTab === 'kanban' && <KanbanSection />}

        {activeTab === 'explore' && (
          <div className="space-y-12">
            <RentalSection />
            <KanbanSection />
            <WalletSection />
          </div>
        )}
      </main>

      {/* AI Assistant Modal */}
      <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* Auth Modal */}
      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} title="Account Login & Registration">
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
          />
          <Button variant="primary" type="submit" className="w-full">
            Sign In with Better Auth / JWT Session
          </Button>
        </form>
      </Modal>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
          <p>© 2026 NexusPulse AI. Built with Next.js, Express TypeScript, MongoDB & Tailwind CSS.</p>
          <p className="text-slate-600">Escrow Payments & Asset Rental System protected by End-to-End Cryptographic Ledger</p>
        </div>
      </footer>
    </div>
  );
}
