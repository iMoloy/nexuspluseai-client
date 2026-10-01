'use client';

import React, { useState } from 'react';
import { Calculator, MapPin, Zap, CloudRain, Car, Navigation, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-toastify';

export const AiFareCalculator: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState<'BIKE' | 'CAR' | 'PARCEL'>('CAR');
  const [isCalculating, setIsCalculating] = useState(false);
  const [fareResult, setFareResult] = useState<null | {
    baseFare: number;
    distance: string;
    trafficMultiplier: number;
    weatherMultiplier: number;
    surgeMultiplier: number;
    totalFare: number;
  }>(null);

  const calculateFare = () => {
    if (!pickup || !dropoff) {
      toast.error('Please enter both pickup and dropoff locations.');
      return;
    }
    
    setIsCalculating(true);
    setFareResult(null);

    // Simulate AI calculation delay
    setTimeout(() => {
      const baseFare = vehicle === 'BIKE' ? 60 : vehicle === 'CAR' ? 120 : 80;
      const traffic = 1.2; // Heavy Traffic
      const weather = 1.1; // Raining
      const surge = 1.5; // High Demand
      
      const total = Math.round(baseFare * traffic * weather * surge);
      
      setFareResult({
        baseFare,
        distance: '6.4 km',
        trafficMultiplier: traffic,
        weatherMultiplier: weather,
        surgeMultiplier: surge,
        totalFare: total
      });
      setIsCalculating(false);
      toast.success('AI optimized fare generated!');
    }, 1500);
  };

  return (
    <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
          <Calculator className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            AI Dynamic Surge & Fare Calculator
          </h2>
          <p className="text-sm text-slate-400">Real-time pricing based on traffic, weather, and demand.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <input 
                type="text" 
                placeholder="Pickup Location (e.g. Dhanmondi 27)" 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-black border border-neutral-800 text-sm text-white px-10 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
              <input 
                type="text" 
                placeholder="Dropoff Location (e.g. Gulshan 2)" 
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full bg-black border border-neutral-800 text-sm text-white px-10 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-2 p-1 rounded-xl bg-black border border-neutral-800">
            {(['BIKE', 'CAR', 'PARCEL'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVehicle(v)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex justify-center items-center gap-1.5 ${
                  vehicle === v
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {v === 'CAR' && <Car className="w-3.5 h-3.5" />}
                {v}
              </button>
            ))}
          </div>

          <Button 
            variant="primary" 
            className="w-full bg-purple-600 hover:bg-purple-500 text-white" 
            onClick={calculateFare}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> AI is calculating...</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" /> Calculate Dynamic Fare</>
            )}
          </Button>
        </div>

        {/* Results Panel */}
        <div className="p-5 rounded-2xl bg-black border border-neutral-800 relative overflow-hidden">
           {!fareResult ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-50">
               <Calculator className="w-12 h-12" />
               <p className="text-sm text-center">Enter locations to see real-time AI pricing estimates.</p>
             </div>
           ) : (
             <div className="space-y-5 animate-in fade-in duration-500 relative z-10">
               <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
                 <div>
                   <div className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-1">AI Suggested Fare</div>
                   <div className="text-3xl font-black text-white">৳{fareResult.totalFare}</div>
                 </div>
                 <div className="text-right">
                   <div className="text-xs text-slate-400">Est. Distance</div>
                   <div className="text-sm font-bold text-slate-200">{fareResult.distance}</div>
                 </div>
               </div>

               <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400">Base Fare</span>
                   <span className="text-slate-200">৳{fareResult.baseFare}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400 flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-rose-400" /> Traffic (Heavy)</span>
                   <span className="text-rose-400">x{fareResult.trafficMultiplier}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400 flex items-center gap-1.5"><CloudRain className="w-3.5 h-3.5 text-blue-400" /> Weather (Rain)</span>
                   <span className="text-blue-400">x{fareResult.weatherMultiplier}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                   <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> High Demand Surge</span>
                   <span className="text-emerald-400 font-bold">x{fareResult.surgeMultiplier}</span>
                 </div>
               </div>
             </div>
           )}
           
           {/* Background Glow */}
           {fareResult && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
           )}
        </div>
      </div>
    </div>
  );
};
