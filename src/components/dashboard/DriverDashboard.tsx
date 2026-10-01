'use client';

import React, { useState } from 'react';
import { Car, Package, MapPin, Navigation, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-toastify';

export const DriverDashboard: React.FC = () => {
  const [mode, setMode] = useState<'RIDE' | 'GIG'>('RIDE');
  const [isOnline, setIsOnline] = useState(false);

  const toggleMode = (newMode: 'RIDE' | 'GIG') => {
    setMode(newMode);
    toast.success(`Switched to ${newMode === 'RIDE' ? 'Passenger Rides' : 'Local Errands/Delivery Tasks'} Mode!`);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast.info(`You are now ${!isOnline ? 'Online and visible to users' : 'Offline'}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Driver & Tasker Hub
            {isOnline ? (
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[10px] font-bold border border-slate-500/20 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Offline
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-400">Manage your rides and micro-tasks seamlessly.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Mode Switcher Toggle */}
          <div className="flex p-1 rounded-2xl bg-black border border-neutral-800 shadow-inner w-full md:w-auto">
            <button
              onClick={() => toggleMode('RIDE')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                mode === 'RIDE'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Car className="w-4 h-4" />
              Passenger Rides
            </button>
            <button
              onClick={() => toggleMode('GIG')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                mode === 'GIG'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Package className="w-4 h-4" />
              Delivery / Gig
            </button>
          </div>

          <Button
            variant={isOnline ? "danger" : "primary"}
            className={isOnline ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20" : "bg-emerald-600 hover:bg-emerald-500 text-white"}
            onClick={toggleOnlineStatus}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>
      </div>

      {/* Dynamic Content Based on Mode */}
      {mode === 'RIDE' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <Navigation className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Searching for Passengers...</h3>
                <p className="text-sm text-slate-400 max-w-sm mt-2">
                  Stay online to receive ride requests nearby. The AI will match you with passengers heading in your direction.
                </p>
              </div>
              <div className="flex gap-2">
                 <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                 <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                 <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4">
              <h4 className="font-bold text-white flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Current Surge</h4>
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex justify-between items-center">
                <span className="text-sm text-indigo-300">Gulshan Area</span>
                <span className="font-bold text-indigo-400">1.5x</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
                <span className="text-sm text-emerald-300">Banani Area</span>
                <span className="font-bold text-emerald-400">1.2x</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <h3 className="text-xl font-bold text-white">Available Local Errands</h3>
             
             {/* Task Card */}
             <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-colors shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase">Package Drop</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> 15 mins away</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-200">Deliver documents to Banani</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-400">৳250</div>
                    <div className="text-xs text-slate-500">Escrow Locked</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 bg-black p-3 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" /> Pickup: Gulshan 2
                  </div>
                  <div className="w-8 border-t border-dashed border-neutral-700"></div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" /> Dropoff: Banani
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" /> Photo verification required
                  </div>
                  <Button variant="outline" className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">Accept Task</Button>
                </div>
             </div>
             
             {/* Task Card 2 */}
             <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-colors shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">Grocery</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> 5 mins away</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-200">Pick up groceries from Unimart</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-400">৳150</div>
                    <div className="text-xs text-slate-500">Escrow Locked</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 bg-black p-3 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" /> Pickup: Gulshan Unimart
                  </div>
                  <div className="w-8 border-t border-dashed border-neutral-700"></div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" /> Dropoff: Gulshan 1
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" /> Photo verification required
                  </div>
                  <Button variant="outline" className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">Accept Task</Button>
                </div>
             </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4">
              <h4 className="font-bold text-white flex items-center gap-2">AI Optimization</h4>
              <p className="text-sm text-slate-400">
                You can switch between Ride mode and Gig mode to maximize your earnings. AI will suggest tasks on your ride routes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
