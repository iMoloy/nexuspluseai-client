'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Sparkles, ShieldCheck, Globe, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-4">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" /> Pioneering Autonomous Web3 & AI Micro-Economy
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Empowering Autonomous Work & Smart Asset Sharing
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          NexusPulse AI is the next-generation super-app unifying micro-tasking gig marketplace, high-value asset rentals, and cryptographic Escrow protection into one seamless ecosystem.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 text-center">
          <div className="text-3xl font-extrabold text-indigo-400 mb-1">$2.5M+</div>
          <div className="text-xs text-slate-400">Escrow Protected</div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">99.8%</div>
          <div className="text-xs text-slate-400">Dispute-Free Settlements</div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-extrabold text-purple-400 mb-1">15,000+</div>
          <div className="text-xs text-slate-400">Active Freelancers</div>
        </Card>
        <Card className="p-5 text-center">
          <div className="text-3xl font-extrabold text-amber-400 mb-1">4,800+</div>
          <div className="text-xs text-slate-400">Listed Rental Assets</div>
        </Card>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">AI Dispute Agent</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our Gemini-powered AI Mediator evaluates work proof and communication logs to resolve conflicts fairly without manual administrative delays.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Guaranteed Escrow</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero financial risk. Client funds and security deposits are locked in cryptographic ledgers until milestone completion or asset return.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Global Peer Marketplace</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rent luxury vehicles, cinema equipment, or workspaces directly from verified owners with full insurance coverage.
          </p>
        </Card>
      </div>
    </div>
  );
};
