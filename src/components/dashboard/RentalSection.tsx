'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Car, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const RentalSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeAsset, setActiveAsset] = useState<any>(null);
  const [rentalDays, setRentalDays] = useState(3);
  const [isBooking, setIsBooking] = useState(false);

  const assets = [
    {
      id: 'ast_1',
      title: 'Tesla Model 3 Performance 2025',
      category: 'VEHICLE',
      rentalRate: 120,
      securityDeposit: 250,
      location: 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      ownerName: 'Sharif Ahmed',
      rating: 4.9
    },
    {
      id: 'ast_2',
      title: 'RED V-Raptor 8K Cinema Camera Kit',
      category: 'TECH_EQUIPMENT',
      rentalRate: 180,
      securityDeposit: 400,
      location: 'Gulshan, Dhaka',
      image: 'https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?w=800',
      ownerName: 'Tanvir Hossain',
      rating: 5.0
    },
    {
      id: 'ast_3',
      title: 'DJI Inspire 3 Pro Drone Combo',
      category: 'TECH_EQUIPMENT',
      rentalRate: 140,
      securityDeposit: 300,
      location: 'Uttara, Dhaka',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
      ownerName: 'Moloy Paul',
      rating: 4.8
    },
    {
      id: 'ast_4',
      title: 'Modern Creative Podcast & Tech Studio',
      category: 'WORKSPACE',
      rentalRate: 90,
      securityDeposit: 150,
      location: 'Banani, Dhaka',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      ownerName: 'Arafat Rahman',
      rating: 4.9
    }
  ];

  const filteredAssets = selectedCategory === 'ALL'
    ? assets
    : assets.filter((a) => a.category === selectedCategory);

  const handleBookAsset = () => {
    if (!activeAsset) return;
    setIsBooking(true);
    const totalCost = activeAsset.rentalRate * rentalDays;
    const totalHold = totalCost + activeAsset.securityDeposit;

    setTimeout(() => {
      setIsBooking(false);
      toast.success(
        `Booking Confirmed! $${totalCost} rental fee + $${activeAsset.securityDeposit} security deposit ($${totalHold} total) locked safely in Escrow.`
      );
      setActiveAsset(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Category Selection Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Car className="w-6 h-6 text-indigo-400" /> Smart Asset & Vehicle Rental Marketplace
          </h2>
          <p className="text-sm text-slate-400">Rent high-value cars, cinema equipment & workspaces with Escrow security</p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {[
            { key: 'ALL', label: 'All Assets' },
            { key: 'VEHICLE', label: 'Vehicles' },
            { key: 'TECH_EQUIPMENT', label: 'Tech & Cameras' },
            { key: 'WORKSPACE', label: 'Workspaces' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} hoverEffect className="flex flex-col justify-between overflow-hidden p-0">
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="primary" className="backdrop-blur-md bg-slate-950/70">
                  ${asset.rentalRate}/day
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="success" icon={<ShieldCheck className="w-3 h-3" />}>
                  ${asset.securityDeposit} Deposit
                </Badge>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base font-bold text-slate-100 line-clamp-1">{asset.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {asset.location}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">By {asset.ownerName}</span>
                <Button variant="outline" size="sm" onClick={() => setActiveAsset(asset)}>
                  Rent Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rental Booking Modal */}
      {activeAsset && (
        <Modal isOpen={!!activeAsset} onClose={() => setActiveAsset(null)} title={`Rent ${activeAsset.title}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <img src={activeAsset.image} alt={activeAsset.title} className="w-20 h-16 object-cover rounded-lg" />
              <div>
                <h4 className="text-sm font-bold text-slate-100">{activeAsset.title}</h4>
                <div className="text-xs text-slate-400 mt-0.5">${activeAsset.rentalRate}/day • ${activeAsset.securityDeposit} Escrow Security Deposit</div>
              </div>
            </div>

            <Input
              label="Rental Duration (Days)"
              type="number"
              min={1}
              value={rentalDays}
              onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
              leftIcon={<Calendar className="w-4 h-4" />}
            />

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Rental Fee ({rentalDays} days):</span>
                <span className="font-semibold text-white">${activeAsset.rentalRate * rentalDays}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Refundable Security Deposit:</span>
                <span className="font-semibold text-amber-400">${activeAsset.securityDeposit}</span>
              </div>
              <div className="border-t border-indigo-500/20 pt-2 flex justify-between text-sm font-bold text-emerald-400">
                <span>Total Escrow Funds Locked:</span>
                <span>${activeAsset.rentalRate * rentalDays + activeAsset.securityDeposit}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Security deposit is automatically refunded to your wallet upon asset return.
            </p>

            <div className="flex gap-2 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setActiveAsset(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" isLoading={isBooking} onClick={handleBookAsset}>
                Lock Escrow & Confirm
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
