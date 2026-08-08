'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, FileText, Lock, Scale } from 'lucide-react';

export const TermsSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          <Scale className="w-4 h-4" /> Legal & Platform Governance
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100">Terms of Service & Escrow Rules</h2>
        <p className="text-sm text-slate-400">
          Last updated: August 2026. Please read these terms carefully before participating in Asset Rentals or Gig Escrow Contracts.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" /> 1. Smart Escrow Financial Protection
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            All gig milestone payments and asset security deposits are locked within the NexusPulse Escrow Ledger before work or rental period commences. Funds remain safely held until the hiring Client approves work proof or asset is returned undamaged.
          </p>
        </Card>

        <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-400" /> 2. AI Dispute Mediation Protocol
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In the event of a dispute regarding deliverable quality or asset damage, either party may invoke the NexusPulse AI Mediator. The AI agent analyzes contract specifications, chat logs, and proof submissions to issue a binding, equitable settlement recommendation.
          </p>
        </Card>

        <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> 3. Asset Rental Policies & Liability
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Renters must verify identity (KYC) prior to booking vehicles or cinema equipment. Security deposits are automatically released back to the renter's wallet within 24 hours of successful owner inspection.
          </p>
        </Card>

        <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" /> 4. Platform Fees & Payouts
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            NexusPulse charges a flat 5% service fee on completed gig payouts and asset rental transactions. Instant withdrawals via Stripe, bKash, Nagad, or Bank Transfer are processed within minutes.
          </p>
        </Card>
      </div>
    </div>
  );
};
