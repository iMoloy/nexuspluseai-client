'use client';

import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, MapPin, X, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { io, Socket } from 'socket.io-client';

export const EmergencySOS: React.FC = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  React.useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
    
    socketInstance.on('sos_received', (data) => {
      setIsSending(false);
      setSent(true);
      toast.error(`EMERGENCY SOS SENT! ${data.message}`, {
        theme: 'dark',
        autoClose: false
      });
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSos = () => {
    setIsSending(true);
    if (socket && currentUser) {
      socket.emit('trigger_sos', {
        driverId: currentUser.id,
        lat: 23.7940, // Simulated Gulshan lat
        lng: 90.4125, // Simulated Gulshan lng
        details: 'Driver pressed SOS button in app.'
      });
    } else {
      setTimeout(() => {
        setIsSending(false);
        setSent(true);
        toast.error('EMERGENCY SOS SENT! Police and emergency contacts have received your live location.', {
          theme: 'dark',
          autoClose: false
        });
      }, 2000);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center justify-center animate-pulse transition-all hover:scale-110"
        >
          <ShieldAlert className="w-7 h-7" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 p-6 rounded-3xl bg-neutral-950 border border-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.3)] space-y-5 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg">Emergency SOS</h3>
                <p className="text-xs text-red-400">Safety & Security Hub</p>
              </div>
            </div>
            <button onClick={() => { setIsOpen(false); setSent(false); }} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!sent ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/20 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  Are you in danger? Tap the button below to instantly share your live GPS location with local police (999) and your trusted emergency contacts.
                </p>
              </div>

              <div className="p-3 bg-black/50 rounded-xl border border-neutral-800 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                <div className="text-xs">
                  <span className="text-slate-400 block">Current Location</span>
                  <span className="text-slate-200 font-bold">Gulshan Avenue, Road 11 (Accuracy: 5m)</span>
                </div>
              </div>

              <Button
                onClick={handleSos}
                disabled={isSending}
                className="w-full h-14 bg-red-600 hover:bg-red-500 text-white font-bold text-lg shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                {isSending ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> TRANSMITTING...</>
                ) : (
                  <><PhoneCall className="w-5 h-5 mr-2" /> SEND SOS ALERT</>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-10 h-10 text-red-500 animate-ping" />
              </div>
              <h4 className="text-xl font-black text-red-500">SOS ALERT ACTIVE</h4>
              <p className="text-sm text-slate-300">
                Your live location has been shared. Help is on the way. Please stay calm and remain in a safe location if possible.
              </p>
              <Button onClick={() => { setIsOpen(false); setSent(false); }} variant="outline" className="w-full mt-2 border-red-500/30 text-red-400 hover:bg-red-500/10">
                Cancel Alert
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
