'use client';

import React, { useState } from 'react';
import { Car, Package, MapPin, Navigation, Clock, ShieldCheck, Zap, Camera, Scan, CheckCircle2, Loader2, Upload, Map, AlertTriangle, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-toastify';

export const DriverDashboard: React.FC = () => {
  const [mode, setMode] = useState<'RIDE' | 'GIG'>('RIDE');
  const [isOnline, setIsOnline] = useState(false);
  const [isOnRide, setIsOnRide] = useState(false);
  const [geofenceAlert, setGeofenceAlert] = useState(false);
  const [acceptedGig, setAcceptedGig] = useState<number | null>(null);

  const simulateGeofenceDeviation = () => {
    setGeofenceAlert(true);
    toast.error('GEOFENCE ALERT: You have deviated from the optimized route! Please return to the suggested path.', {
      theme: "dark"
    });
    setTimeout(() => {
      setGeofenceAlert(false);
      toast.info('Route recalculated. Back on track.');
    }, 5000);
  };
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyDelivery = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success('Gemini AI Vision confirmed delivery! Funds released to your wallet.');
    }, 2500);
  };

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
            {!isOnRide ? (
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
                <Button onClick={() => setIsOnRide(true)} variant="outline" className="mt-4 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">Simulate Passenger Request</Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                {/* Active Ride Card */}
                <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-500/30 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                      </span>
                      <h3 className="text-lg font-bold text-white">Active Passenger Ride</h3>
                    </div>
                    <span className="text-lg font-black text-indigo-400">৳350</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-300 mb-6 bg-black/40 p-4 rounded-xl border border-indigo-500/20">
                    <div className="flex items-center gap-2 flex-1">
                      <MapPin className="w-4 h-4 text-rose-400" /> 
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Pickup</div>
                        <div>Dhanmondi 27</div>
                      </div>
                    </div>
                    <div className="w-8 border-t-2 border-dashed border-indigo-500/30"></div>
                    <div className="flex items-center gap-2 flex-1">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Dropoff</div>
                        <div>Gulshan 2</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Real-time GPS Tracking & Geofencing View */}
                  <div className={`relative w-full h-48 rounded-xl overflow-hidden mb-6 border ${geofenceAlert ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-indigo-500/20'} transition-all duration-300 bg-neutral-900 flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
                    
                    {/* Simulated Path */}
                    <div className="absolute top-1/2 left-10 right-10 h-1 bg-indigo-500/30 rounded-full"></div>
                    <div className={`absolute top-1/2 h-1 bg-indigo-500 rounded-full transition-all duration-1000 ${geofenceAlert ? 'w-1/2 left-10 bg-red-500' : 'w-3/4 left-10'}`}></div>
                    
                    {/* Map Elements */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-500 border-2 border-black z-10"></div>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black z-10"></div>
                    
                    {/* Vehicle Tracker */}
                    <div className={`absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-1000 ${geofenceAlert ? 'left-1/2 -translate-y-8' : 'left-[70%]'}`}>
                      <div className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-md mb-1 shadow-lg whitespace-nowrap">
                        {geofenceAlert ? 'Deviated Route' : '5 mins away'}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${geofenceAlert ? 'bg-red-500 animate-pulse' : 'bg-indigo-600'}`}>
                        <Navigation2 className="w-4 h-4 text-white fill-white transform rotate-45" />
                      </div>
                    </div>
                    
                    {/* Geofencing Overlay */}
                    {geofenceAlert && (
                      <div className="absolute inset-0 bg-red-500/10 flex flex-col items-center justify-center backdrop-blur-[1px]">
                        <AlertTriangle className="w-8 h-8 text-red-500 mb-2 animate-bounce" />
                        <span className="text-xs font-bold text-red-400 bg-black/60 px-3 py-1 rounded-full">GEOFENCE BREACH DETECTED</span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-2 left-2 flex gap-2">
                       <span className="px-2 py-1 bg-black/60 rounded-md text-[10px] text-slate-300 font-medium flex items-center gap-1 backdrop-blur-md">
                         <Map className="w-3 h-3" /> Live GPS Active
                       </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={simulateGeofenceDeviation} variant="outline" className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10">
                      Simulate Deviation
                    </Button>
                    <Button onClick={() => setIsOnRide(false)} variant="primary" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white">
                      Complete Ride
                    </Button>
                  </div>
                </div>

                {/* AI Route-Optimized Task Matcher */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 to-teal-950/20 border border-emerald-500/30 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-32 h-32 text-emerald-400" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                         <Zap className="w-3 h-3" /> AI Route Match
                      </span>
                      <span className="text-xs text-emerald-100/60 font-medium">Earn more while you drive</span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-1">Perfect Add-on Delivery</h4>
                    <p className="text-sm text-slate-400 max-w-md mb-5">
                      We found a small parcel delivery that perfectly aligns with your current ride route to Gulshan 2. No detours needed!
                    </p>
                    
                    <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Package className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-200">Documents to Gulshan 1</h5>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" /> Pickup is on the way (2 min)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-black text-emerald-400">+৳120</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shadow-lg shadow-emerald-900/20" onClick={() => toast.success('Add-on task accepted! Route updated.')}>
                          Accept & Add to Route
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
             {!acceptedGig ? (
               <>
                 <h3 className="text-xl font-bold text-white mb-6">Available Local Errands</h3>
                 
                 {/* Task Card 1 */}
                 <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-colors shadow-lg mb-6">
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
                      <Button onClick={() => setAcceptedGig(1)} variant="outline" className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">Accept Task</Button>
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
                      <Button onClick={() => setAcceptedGig(2)} variant="outline" className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">Accept Task</Button>
                    </div>
                 </div>
               </>
             ) : (
               <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                 <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold text-white flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                     </span>
                     Active Delivery
                   </h3>
                   <Button size="sm" variant="outline" onClick={() => { setAcceptedGig(null); setIsVerified(false); }}>Cancel</Button>
                 </div>

                 <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-6 relative overflow-hidden">
                   {isVerifying && (
                     <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
                       <Scan className="w-12 h-12 text-indigo-400 animate-pulse" />
                       <div className="text-indigo-400 font-bold text-lg flex items-center gap-2">
                         <Loader2 className="w-5 h-5 animate-spin" /> Gemini AI Verifying...
                       </div>
                       <p className="text-xs text-indigo-300">Scanning package and location data...</p>
                     </div>
                   )}

                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="text-xl font-bold text-slate-200">Deliver documents to Banani</h4>
                       <p className="text-sm text-slate-400 mt-1">Please drop the package at the reception.</p>
                     </div>
                     <div className="text-xl font-black text-emerald-400">৳250</div>
                   </div>

                   <div className="flex items-center gap-4 text-sm text-slate-300 bg-black/40 p-4 rounded-xl border border-neutral-800">
                     <div className="flex items-center gap-2 flex-1">
                       <MapPin className="w-4 h-4 text-emerald-400" /> Dropoff: Banani
                     </div>
                   </div>

                   {/* AI Proof of Delivery Section */}
                   <div className={`p-5 rounded-2xl border ${isVerified ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-indigo-500/10 border-indigo-500/30'} transition-colors`}>
                     <h5 className={`font-bold flex items-center gap-2 mb-3 ${isVerified ? 'text-emerald-400' : 'text-indigo-400'}`}>
                       {isVerified ? <CheckCircle2 className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                       {isVerified ? 'Delivery Verified & Funds Released' : 'AI Proof-of-Delivery'}
                     </h5>
                     
                     {!isVerified ? (
                       <div className="space-y-4">
                         <p className="text-sm text-indigo-300/80">
                           Take a clear photo of the delivered package. Google Gemini Vision will analyze the image to confirm delivery.
                         </p>
                         <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-500/30 border-dashed rounded-xl cursor-pointer bg-indigo-950/20 hover:bg-indigo-950/40 transition-colors">
                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
                             <Upload className="w-8 h-8 mb-2 text-indigo-400" />
                             <p className="text-sm text-indigo-400 font-bold">Click to Upload Photo</p>
                             <p className="text-xs text-indigo-400/70">(JPEG, PNG)</p>
                           </div>
                           <input type="file" className="hidden" accept="image/*" onChange={handleVerifyDelivery} />
                         </label>
                       </div>
                     ) : (
                       <div className="text-sm text-emerald-300/80 space-y-4">
                         <p>The AI has successfully verified the package location and condition.</p>
                         <div className="p-3 bg-black/40 rounded-xl border border-emerald-500/20">
                           <div className="flex justify-between items-center text-emerald-400 font-bold">
                             <span>Funds Credited:</span>
                             <span>+ ৳250</span>
                           </div>
                         </div>
                         <Button onClick={() => { setAcceptedGig(null); setIsVerified(false); }} variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">Find Next Task</Button>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}
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
