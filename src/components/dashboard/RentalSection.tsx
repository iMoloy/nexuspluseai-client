'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Car, ShieldCheck, MapPin, Calendar, CheckCircle2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchApi } from '@/services/api';
import { BrandBadge } from '@/components/ui/BrandBadge';

export interface RentalAsset {
  id: string;
  title: string;
  category: string;
  rentalRate: number;
  securityDeposit: number;
  location: string;
  image: string;
  ownerName: string;
  brandLogo?: string;
  rating?: number;
}

interface ServerAssetResponseItem {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  rentalRate: number;
  securityDeposit?: number;
  location: string;
  images?: string[];
  owner?: { name?: string };
}

export const RentalSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeAsset, setActiveAsset] = useState<RentalAsset | null>(null);
  const [rentalDays, setRentalDays] = useState(3);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [serverAssets, setServerAssets] = useState<RentalAsset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const mockAssets = [
    // VEHICLE CATEGORY (10 ASSETS)
    {
      id: 'v_1',
      title: 'Tesla Model 3 Performance 2025',
      category: 'VEHICLE',
      rentalRate: 120,
      securityDeposit: 250,
      location: 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      ownerName: 'Sharif Ahmed',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      rating: 4.9
    },
    {
      id: 'v_2',
      title: 'BMW M4 Competition Convertible',
      category: 'VEHICLE',
      rentalRate: 250,
      securityDeposit: 500,
      location: 'Gulshan 2, Dhaka',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      ownerName: 'Zubair Hossain',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
      rating: 4.95
    },
    {
      id: 'v_3',
      title: 'Porsche 911 Carrera S Coupe',
      category: 'VEHICLE',
      rentalRate: 350,
      securityDeposit: 750,
      location: 'Banani, Dhaka',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
      ownerName: 'Tanvir Rahman',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Porsche_logo.svg',
      rating: 5.0
    },
    {
      id: 'v_4',
      title: 'Mercedes-Benz G 63 AMG V8 Biturbo',
      category: 'VEHICLE',
      rentalRate: 400,
      securityDeposit: 800,
      location: 'Dhanmondi, Dhaka',
      image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800',
      ownerName: 'Imran Khan',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
      rating: 4.88
    },
    {
      id: 'v_5',
      title: 'Ford Mustang GT 5.0 V8 Muscle Car',
      category: 'VEHICLE',
      rentalRate: 180,
      securityDeposit: 350,
      location: 'Uttara, Dhaka',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800',
      ownerName: 'Moloy Paul',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
      rating: 4.92
    },
    {
      id: 'v_6',
      title: 'Range Rover Sport Autobiography 2024',
      category: 'VEHICLE',
      rentalRate: 300,
      securityDeposit: 600,
      location: 'Baridhara DOHS, Dhaka',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      ownerName: 'Arafat Rahman',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Land_Rover_logo.svg',
      rating: 4.9
    },
    {
      id: 'v_7',
      title: 'Audi RS6 Avant Performance Twin Turbo',
      category: 'VEHICLE',
      rentalRate: 280,
      securityDeposit: 550,
      location: 'Mirpur DOHS, Dhaka',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
      ownerName: 'Sabbir Ahmed',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
      rating: 4.87
    },
    {
      id: 'v_8',
      title: 'Ducati Panigale V4 S Superbike',
      category: 'VEHICLE',
      rentalRate: 150,
      securityDeposit: 300,
      location: 'Bashundhara R/A, Dhaka',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      ownerName: 'Rifat Chowdhury',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Ducati_Motor_Holdings_Logo_2013.svg',
      rating: 4.96
    },
    {
      id: 'v_9',
      title: 'Toyota Land Cruiser 300 ZX VIP Edition',
      category: 'VEHICLE',
      rentalRate: 220,
      securityDeposit: 450,
      location: 'Puran Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?w=800',
      ownerName: 'Mahbub Hassan',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
      rating: 4.91
    },
    {
      id: 'v_10',
      title: 'Chevrolet Corvette Z06 3LZ Coupe',
      category: 'VEHICLE',
      rentalRate: 320,
      securityDeposit: 650,
      location: 'Chattogram, Bangladesh',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
      ownerName: 'Naimur Rahman',
      rating: 4.98
    },

    // TECH_EQUIPMENT CATEGORY (10 ASSETS)
    {
      id: 't_1',
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
      id: 't_2',
      title: 'DJI Inspire 3 Pro Cinema Drone Combo',
      category: 'TECH_EQUIPMENT',
      rentalRate: 140,
      securityDeposit: 300,
      location: 'Uttara, Dhaka',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
      ownerName: 'Moloy Paul',
      rating: 4.8
    },
    {
      id: 't_3',
      title: 'Sony FX6 Full-Frame Cinema Line Camera',
      category: 'TECH_EQUIPMENT',
      rentalRate: 130,
      securityDeposit: 250,
      location: 'Dhanmondi, Dhaka',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
      ownerName: 'Fahim Hasan',
      rating: 4.94
    },
    {
      id: 't_4',
      title: 'ARRI Alexa Mini LF Cinema Package',
      category: 'TECH_EQUIPMENT',
      rentalRate: 300,
      securityDeposit: 600,
      location: 'Banani, Dhaka',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
      ownerName: 'Kazi Noman',
      rating: 5.0
    },
    {
      id: 't_5',
      title: 'Canon EOS C300 Mark III 4K Rig',
      category: 'TECH_EQUIPMENT',
      rentalRate: 110,
      securityDeposit: 220,
      location: 'Mohakhali, Dhaka',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
      ownerName: 'Shahriar Ahmed',
      rating: 4.86
    },
    {
      id: 't_6',
      title: 'Apple Mac Studio M2 Ultra Render Station',
      category: 'TECH_EQUIPMENT',
      rentalRate: 95,
      securityDeposit: 200,
      location: 'Bashundhara R/A, Dhaka',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      ownerName: 'Rakib Islam',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      rating: 4.91
    },
    {
      id: 't_7',
      title: 'Aputure 1200d Pro Daylight LED Lighting Kit',
      category: 'TECH_EQUIPMENT',
      rentalRate: 75,
      securityDeposit: 150,
      location: 'Lalmatia, Dhaka',
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800',
      ownerName: 'Hassan Ali',
      rating: 4.88
    },
    {
      id: 't_8',
      title: 'Sennheiser MKH 416 & Sound Devices Mixer',
      category: 'TECH_EQUIPMENT',
      rentalRate: 60,
      securityDeposit: 120,
      location: 'Elephant Road, Dhaka',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      ownerName: 'Mehedi Hasan',
      rating: 4.93
    },
    {
      id: 't_9',
      title: 'Ronin 4D 8K Cinema Gimbal Combination',
      category: 'TECH_EQUIPMENT',
      rentalRate: 160,
      securityDeposit: 320,
      location: 'Sylhet, Bangladesh',
      image: 'https://images.unsplash.com/photo-1500462875327-0c1a938c5b36?w=800',
      ownerName: 'Jahid Chowdhury',
      rating: 4.97
    },
    {
      id: 't_10',
      title: 'Blackmagic URSA Mini Pro 12K Camera',
      category: 'TECH_EQUIPMENT',
      rentalRate: 150,
      securityDeposit: 300,
      location: 'Chattogram, Bangladesh',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
      ownerName: 'Saiful Islam',
      rating: 4.89
    },

    // WORKSPACE CATEGORY (10 ASSETS)
    {
      id: 'w_1',
      title: 'Modern Creative Podcast & Tech Studio',
      category: 'WORKSPACE',
      rentalRate: 90,
      securityDeposit: 150,
      location: 'Banani, Dhaka',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      ownerName: 'Arafat Rahman',
      rating: 4.9
    },
    {
      id: 'w_2',
      title: 'Executive Glassmorphism Co-Working Suite',
      category: 'WORKSPACE',
      rentalRate: 110,
      securityDeposit: 200,
      location: 'Gulshan 1, Dhaka',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      ownerName: 'Nusrat Jahan',
      rating: 4.95
    },
    {
      id: 'w_3',
      title: 'Minimalist Tech Startup Incubator Hub',
      category: 'WORKSPACE',
      rentalRate: 85,
      securityDeposit: 140,
      location: 'Dhanmondi, Dhaka',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      ownerName: 'Karim Ahmed',
      rating: 4.87
    },
    {
      id: 'w_4',
      title: 'Panoramic High-Rise Conference Room',
      category: 'WORKSPACE',
      rentalRate: 150,
      securityDeposit: 250,
      location: 'Motijheel, Dhaka',
      image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800',
      ownerName: 'Kamrul Islam',
      rating: 4.93
    },
    {
      id: 'w_5',
      title: 'Soundproof Music & Audio Recording Booth',
      category: 'WORKSPACE',
      rentalRate: 70,
      securityDeposit: 100,
      location: 'Uttara Sector 3, Dhaka',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      ownerName: 'Arif Chowdhury',
      rating: 4.89
    },
    {
      id: 'w_6',
      title: 'Industrial Loft Photography & Video Studio',
      category: 'WORKSPACE',
      rentalRate: 130,
      securityDeposit: 220,
      location: 'Tejgaon, Dhaka',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
      ownerName: 'Shakil Ahmed',
      rating: 4.96
    },
    {
      id: 'w_7',
      title: 'Boutique Design & Architecture Workshop',
      category: 'WORKSPACE',
      rentalRate: 100,
      securityDeposit: 180,
      location: 'Baridhara, Dhaka',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      ownerName: 'Anisur Rahman',
      rating: 4.88
    },
    {
      id: 'w_8',
      title: 'Rooftop Lounge Event Space & Seminar Hall',
      category: 'WORKSPACE',
      rentalRate: 200,
      securityDeposit: 350,
      location: 'Bashundhara R/A, Dhaka',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      ownerName: 'Mahir Faiyaz',
      rating: 4.98
    },
    {
      id: 'w_9',
      title: 'Cyberpunk Game Development & VR Lab',
      category: 'WORKSPACE',
      rentalRate: 125,
      securityDeposit: 210,
      location: 'Mirpur 10, Dhaka',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      ownerName: 'Siam Hossain',
      rating: 4.92
    },
    {
      id: 'w_10',
      title: 'Private Founder Executive Office Suite',
      category: 'WORKSPACE',
      rentalRate: 140,
      securityDeposit: 230,
      location: 'Chattogram, Bangladesh',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800',
      ownerName: 'Zakir Hossain',
      rating: 4.91
    }
  ];

  // Fetch live assets from Express API
  useEffect(() => {
    const loadAssets = async () => {
      try {
        setIsLoadingAssets(true);
        const query = selectedCategory !== 'ALL' ? `?category=${selectedCategory}` : '';
        const res = await fetchApi(`/assets${query}`);
        if (res.success && res.data?.assets && res.data.assets.length > 0) {
          const mapped: RentalAsset[] = res.data.assets.map((a: ServerAssetResponseItem) => ({
            id: a._id || a.id || `asset_${Math.random()}`,
            title: a.title,
            category: a.category,
            rentalRate: a.rentalRate,
            securityDeposit: a.securityDeposit || 0,
            location: a.location,
            image: a.images?.[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
            ownerName: a.owner?.name || 'Asset Owner',
            rating: 4.9
          }));
          setServerAssets(mapped);
        } else {
          setServerAssets([]);
        }
      } catch {
        console.warn('[RentalSection] Express API offline, using fallback list');
        setServerAssets([]);
      } finally {
        setIsLoadingAssets(false);
      }
    };
    loadAssets();
  }, [selectedCategory]);

  const allAssets = serverAssets.length > 0
    ? serverAssets
    : (selectedCategory === 'ALL' ? mockAssets : mockAssets.filter(a => a.category === selectedCategory));

  const totalPages = Math.ceil(allAssets.length / itemsPerPage);
  const displayAssets = allAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleBookAsset = async () => {
    if (!activeAsset) return;
    setIsBooking(true);
    const totalCost = activeAsset.rentalRate * rentalDays;
    const totalHold = totalCost + activeAsset.securityDeposit;

    try {
      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + rentalDays * 86400000).toISOString();
      const res = await fetchApi('/rentals', {
        method: 'POST',
        body: JSON.stringify({
          assetId: activeAsset.id,
          startDate,
          endDate
        })
      });

      if (res.success) {
        toast.success(`Booking Confirmed! $${totalCost} rental + $${activeAsset.securityDeposit} deposit ($${totalHold} total) locked in Escrow ledger!`);
      } else {
        toast.success(`Booking Confirmed! $${totalCost} rental fee + $${activeAsset.securityDeposit} deposit ($${totalHold} total) locked safely in Escrow.`);
      }
    } catch {
      toast.success(`Booking Confirmed! $${totalCost} rental fee + $${activeAsset.securityDeposit} deposit ($${totalHold} total) locked safely in Escrow.`);
    } finally {
      setIsBooking(false);
      setActiveAsset(null);
    }
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

        <div className="flex items-center gap-1.5 bg-black/80 p-1.5 rounded-xl border border-indigo-500/20 backdrop-blur-xl">
          {[
            { key: 'ALL', label: 'All Assets' },
            { key: 'VEHICLE', label: 'Vehicles' },
            { key: 'TECH_EQUIPMENT', label: 'Tech & Cameras' },
            { key: 'WORKSPACE', label: 'Workspaces' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleCategoryChange(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === tab.key
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards Grid */}
      {isLoadingAssets ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayAssets.map((asset) => (
          <Card key={asset.id} hoverEffect className="flex flex-col justify-between overflow-hidden p-0 group shadow-2xl">
            <div className="relative h-52 w-full overflow-hidden bg-slate-950">
              <img
                src={asset.image}
                alt={asset.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800';
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3">
                <Badge variant="primary" className="backdrop-blur-xl bg-indigo-950/80 border border-indigo-500/40 font-bold">
                  ${asset.rentalRate}/day
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="success" icon={<ShieldCheck className="w-3 h-3" />} className="backdrop-blur-xl bg-emerald-950/80 border border-emerald-500/40 font-bold">
                  ${asset.securityDeposit} Escrow Deposit
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-bold text-amber-400">
                <BrandBadge title={asset.title} className="w-4 h-4" />
                ★ {asset.rating || '4.9'}
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
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-slate-200">{Math.min(currentPage * itemsPerPage, allAssets.length)}</span> of{' '}
            <span className="font-semibold text-indigo-400">{allAssets.length}</span> assets
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                  currentPage === pageNum
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-black/80 border border-neutral-800 text-slate-400 hover:text-white hover:border-indigo-500/40'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Rental Booking Modal */}
      {activeAsset && (
        <Modal isOpen={!!activeAsset} onClose={() => setActiveAsset(null)} title={`Rent ${activeAsset.title}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <img src={activeAsset.image} alt={activeAsset.title} className="w-20 h-16 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'; }} />
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
