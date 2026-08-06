'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Wallet, ShieldCheck, ArrowDownLeft, ArrowUpRight, Lock, RefreshCw, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export const WalletSection: React.FC = () => {
  const [balance, setBalance] = useState(1250);
  const [escrowHold, setEscrowHold] = useState(500);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: 'tx_101', type: 'ESCROW_LOCK', amount: 300, title: 'Tesla Model 3 Rental Escrow Lock', date: 'Just now', status: 'COMPLETED', isLock: true },
    { id: 'tx_102', type: 'DEPOSIT', amount: 500, title: 'Stripe Wallet Deposit', date: '2 hours ago', status: 'COMPLETED', isLock: false },
    { id: 'tx_103', type: 'ESCROW_RELEASE', amount: 450, title: 'Gig Payment Released from Escrow', date: 'Yesterday', status: 'COMPLETED', isLock: false },
    { id: 'tx_104', type: 'ESCROW_REFUND', amount: 200, title: 'Security Deposit Refund Returned', date: '3 days ago', status: 'COMPLETED', isLock: false }
  ]);

  const handleDeposit = () => {
    const val = parseFloat(depositAmount);
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid deposit amount');
      return;
    }

    setIsDepositing(true);
    setTimeout(() => {
      setBalance((prev) => prev + val);
      setTransactions((prev) => [
        {
          id: `tx_${Date.now()}`,
          type: 'DEPOSIT',
          amount: val,
          title: 'Stripe Gateway In-App Deposit',
          date: 'Just now',
          status: 'COMPLETED',
          isLock: false
        },
        ...prev
      ]);
      setIsDepositing(false);
      setDepositAmount('');
      toast.success(`Successfully deposited $${val.toFixed(2)} into your Wallet!`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Available Balance</span>
            <Wallet className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">${balance.toFixed(2)}</div>
          <p className="text-xs text-slate-400 mt-2">Ready for Instant Withdrawals & Payments</p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-950/60 to-slate-900 border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Escrow Hold Balance</span>
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">${escrowHold.toFixed(2)}</div>
          <p className="text-xs text-slate-400 mt-2">Protected Funds for Active Bookings & Gigs</p>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Instant Deposit</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              placeholder="Amount ($)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full bg-slate-950/80 text-white text-sm px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
            />
            <Button variant="primary" size="sm" onClick={handleDeposit} isLoading={isDepositing} leftIcon={<Plus className="w-4 h-4" />}>
              Deposit
            </Button>
          </div>
        </Card>
      </div>

      {/* Transaction History Ledger */}
      <Card>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-400" /> Financial Escrow Ledger
            </h3>
            <p className="text-xs text-slate-400">Real-time ledger of deposit, escrow holds, releases & refunds</p>
          </div>
          <Badge variant="success">Stripe Verified</Badge>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.isLock ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {tx.isLock ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{tx.title}</h4>
                  <span className="text-xs text-slate-500">{tx.date}</span>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-sm font-bold ${tx.isLock ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {tx.isLock ? '-' : '+'}${tx.amount.toFixed(2)}
                </div>
                <Badge variant={tx.isLock ? 'warning' : 'success'} className="mt-1">
                  {tx.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
