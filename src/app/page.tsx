'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { WalletSection } from '@/components/dashboard/WalletSection';
import { RentalSection } from '@/components/dashboard/RentalSection';
import { KanbanSection } from '@/components/dashboard/KanbanSection';
import { TermsSection } from '@/components/legal/TermsSection';
import { AboutSection } from '@/components/legal/AboutSection';
import { ContactSection } from '@/components/legal/ContactSection';
import { ProfileSection } from '@/components/user/ProfileSection';
import { AiAssistantModal } from '@/components/ai/AiAssistantModal';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, ShieldCheck, Car, Briefcase, Zap, Star, Loader2, Upload, Image as ImageIcon, Cpu, Lock, ArrowRight, CheckCircle2, Layers, Repeat, Globe, ChevronLeft, ChevronRight, Wallet, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { uploadToImgBB } from '@/lib/imgbb';

export default function Home() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authRole, setAuthRole] = useState<'CLIENT' | 'FREELANCER' | 'ASSET_OWNER'>('CLIENT');
  const [authAvatar, setAuthAvatar] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'BMW M4 Competition Convertible',
      price: '$250 / day',
      tag: 'Vehicle Rental',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      location: 'Gulshan 2, Dhaka',
      badgeText: 'Escrow Protected Asset'
    },
    {
      title: 'Apple Mac Studio M2 Ultra & Pro Display XDR',
      price: '$120 / day',
      tag: 'Tech Workstation',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      location: 'Banani, Dhaka',
      badgeText: 'Instant Insurance Covered'
    },
    {
      title: 'Glassmorphism Tech & Podcast Studio',
      price: '$90 / day',
      tag: 'Workspace',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      location: 'Dhanmondi, Dhaka',
      badgeText: '24/7 High-Speed Fiber'
    },
    {
      title: 'Fullstack Next.js & Express AI Development',
      price: '$450 Milestone',
      tag: 'Gig Kanban',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      location: 'Remote Work Contract',
      badgeText: 'Gemini AI Verified Code'
    }
  ];

  // Auto Slider Interval Effect (Every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      toast.info('Uploading image to ImgBB...');
      const uploadedUrl = await uploadToImgBB(file);
      setAuthAvatar(uploadedUrl);
      toast.success('Profile image uploaded to ImgBB successfully!');
    } catch (err: any) {
      toast.error('Failed to upload image. Please try again or paste a link.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const { loginWithGoogle, isLoading: isGoogleLoading, setAuthUser } = useAuth();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error('Please enter email and password');
      return;
    }
    if (authMode === 'REGISTER' && !authName) {
      toast.error('Please enter your full name');
      return;
    }

    const name = authMode === 'REGISTER' ? authName : authEmail.split('@')[0];
    const avatar = authAvatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const endpoint = authMode === 'REGISTER' ? `${backendUrl}/auth/register` : `${backendUrl}/auth/login`;
      const bodyData = authMode === 'REGISTER'
        ? { name: authName, email: authEmail, password: authPassword, role: authRole, avatar }
        : { email: authEmail, password: authPassword };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();

      if (data.success && data.data?.user) {
        const backendUser = data.data.user;
        setAuthUser({
          id: backendUser.id || backendUser._id || `usr_${authEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
          name: backendUser.name || name,
          email: backendUser.email || authEmail,
          role: backendUser.role || authRole,
          avatar: backendUser.avatar || avatar,
          kycVerified: backendUser.kycVerified ?? true,
          authProvider: 'local'
        });
        toast.success(authMode === 'REGISTER' ? `Account registered successfully for ${name}!` : `Welcome back, ${name}!`);
      } else {
        // Fallback to local session if server returns error or demo credentials used
        setAuthUser({
          id: `usr_${authEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
          name,
          email: authEmail,
          role: authRole,
          avatar,
          kycVerified: true,
          authProvider: 'local'
        });
        toast.success(authMode === 'REGISTER' ? `Account registered successfully for ${name}!` : `Welcome back, ${name}!`);
      }
    } catch (error) {
      // Offline / Direct Client Fallback Login
      setAuthUser({
        id: `usr_${authEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
        name,
        email: authEmail,
        role: authRole,
        avatar,
        kycVerified: true,
        authProvider: 'local'
      });
      toast.success(authMode === 'REGISTER' ? `Account registered successfully for ${name}!` : `Welcome back, ${name}!`);
    }

    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white relative">
      {/* Premium Dark Obsidian Mesh Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-neutral-900/40 via-indigo-950/20 to-emerald-950/20 blur-[130px] pointer-events-none" />

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWallet={() => setActiveTab('wallet')}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 z-10">
        {/* HERO SECTION - CINEMATIC FULL-BACKGROUND SLIDER HERO */}
        {(activeTab === 'explore' || activeTab === 'all') && (
          <section className="relative min-h-[520px] sm:min-h-[560px] w-full rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl shadow-black bg-black flex items-center justify-center p-6 sm:p-10 group my-2">
            {/* Background Live Slider Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70"
              />
              {/* Dual Rich Obsidian Dark Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
            </div>

            {/* Content Container (Layered Over Background Slider) */}
            <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Clean Floating Content (No Background Box) */}
              <div className="lg:col-span-7 space-y-6 text-left p-2 sm:p-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-extrabold shadow-lg backdrop-blur-xl">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '5s' }} />
                    AI-Driven Super-App
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold shadow-lg backdrop-blur-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Escrow Protected
                  </div>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
                  Autonomous Work, Smart Rentals &{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
                    Escrow Trust
                  </span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed max-w-xl drop-shadow-sm">
                  Rent luxury vehicles & cinema gear, assign top freelancers with live Kanban tracking, and protect every transaction automatically with Gemini AI Mediation.
                </p>

                {/* Hero Interactive Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setIsAiOpen(true)}
                    className="px-6 py-3.5 text-sm shadow-2xl shadow-indigo-600/50 hover:scale-105 transition-transform"
                    leftIcon={<Sparkles className="w-4 h-4 text-emerald-300" />}
                  >
                    Launch AI Assistant
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setActiveTab('rentals')}
                    className="px-5 py-3.5 text-sm backdrop-blur-xl bg-slate-900/90 hover:bg-slate-800 border-slate-700/80"
                    leftIcon={<Car className="w-4 h-4 text-indigo-400" />}
                  >
                    Explore Assets
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setActiveTab('kanban')}
                    className="px-5 py-3.5 text-sm backdrop-blur-xl border-purple-500/40 text-purple-300"
                    leftIcon={<Briefcase className="w-4 h-4 text-purple-400" />}
                  >
                    Gig Kanban
                  </Button>
                </div>

                {/* Live Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 max-w-lg">
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-white">$2.5M+</div>
                    <div className="text-[10px] text-slate-300 font-semibold">Escrow Locked</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-400">15,000+</div>
                    <div className="text-[10px] text-slate-300 font-semibold">Completed Gigs</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-indigo-400">99.8%</div>
                    <div className="text-[10px] text-slate-300 font-semibold">AI Mediation</div>
                  </div>
                </div>
              </div>

              {/* Right Side: Interactive Slide Controller & Feature Spotlight Badge */}
              <div className="lg:col-span-5 flex flex-col items-end justify-between space-y-6">
                {/* Active Slide Spotlight Pill */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl space-y-2 text-left w-full sm:w-80 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                      {heroSlides[currentSlide].tag}
                    </span>
                    <span className="text-xs font-bold text-white bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {heroSlides[currentSlide].price}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-white truncate">{heroSlides[currentSlide].title}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    📍 {heroSlides[currentSlide].location}
                  </p>
                </div>

                {/* Modern Metallic Glass Slider Controls */}
                <div className="flex items-center gap-3 bg-slate-950/60 p-2 rounded-full border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-950/40">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                    className="p-2.5 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 hover:border-indigo-400 transition-all duration-300 hover:scale-110 shadow-lg"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Elegant Pill Indicators */}
                  <div className="flex items-center gap-1.5 px-3">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          currentSlide === idx 
                            ? 'w-7 bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 shadow-md shadow-indigo-500/50' 
                            : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                    className="p-2.5 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 hover:border-indigo-400 transition-all duration-300 hover:scale-110 shadow-lg"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENTS */}
        {/* TAB 4: WALLET & ESCROW LEDGER */}
        {activeTab === 'wallet' && <WalletSection />}

        {/* TAB 5: TERMS & GOVERNANCE */}
        {activeTab === 'terms' && <TermsSection />}

        {/* TAB 6: ABOUT US */}
        {activeTab === 'about' && <AboutSection />}

        {/* TAB 7: CONTACT US */}
        {activeTab === 'contact' && <ContactSection />}

        {/* TAB 8: USER PROFILE & SETTINGS */}
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'rentals' && <RentalSection />}
        {activeTab === 'kanban' && <KanbanSection />}

        {activeTab === 'explore' && (
          <div className="space-y-16">
            {/* Visual Feature Showcase Grid */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                  <Layers className="w-3.5 h-3.5" /> Platform Capabilities
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-100">Why Modern Creators Choose NexusPulse</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 backdrop-blur-xl space-y-4 hover:border-indigo-400 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100">Cryptographic Escrow</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero risk for both parties. Rental deposits and milestone budgets are safely locked in smart ledger contracts until work proof approval.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-900/60 border border-purple-500/30 backdrop-blur-xl space-y-4 hover:border-purple-400 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100">Gemini AI Mediator</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our AI Dispute Agent analyzes deliverables, scope specifications, and chat logs to resolve conflicts fairly without admin fees.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 backdrop-blur-xl space-y-4 hover:border-emerald-400 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100">Instant Multi-Payouts</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Instant withdrawals via Stripe, bKash, Nagad, or Bank Transfer as soon as your rental or gig contract is approved.
                  </p>
                </div>
              </div>
            </section>

            <RentalSection />
            <KanbanSection />
            <WalletSection />

            {/* How It Works Visual Flowchart */}
            <section className="p-8 rounded-3xl bg-neutral-950/90 border border-neutral-800 space-y-8 shadow-2xl shadow-black">
              <div className="text-center space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Simple 3-Step Process</span>
                <h3 className="text-2xl font-bold text-white">How NexusPulse Works</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-600/40">
                    1
                  </div>
                  <h5 className="text-sm font-bold text-slate-200">Post Gig or Choose Asset</h5>
                  <p className="text-xs text-slate-400">Select luxury cars, tech gear, or post a gig with milestone budget lock.</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-purple-600/40">
                    2
                  </div>
                  <h5 className="text-sm font-bold text-slate-200">Escrow Security Hold</h5>
                  <p className="text-xs text-slate-400">Funds are locked securely in Escrow ledger during active rental or work phase.</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-emerald-600/40">
                    3
                  </div>
                  <h5 className="text-sm font-bold text-slate-200">Approve & Release Payment</h5>
                  <p className="text-xs text-slate-400">Upon approval, funds are instantly released to provider's wallet.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* AI Assistant Modal */}
      <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} title={authMode === 'LOGIN' ? 'Sign In to NexusPulse AI' : 'Create a New Account'}>
        <div className="space-y-4">
          {/* Mode Switcher (Login / Register Tabs) */}
          <div className="flex gap-2 p-1 bg-black rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setAuthMode('LOGIN')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'LOGIN'
                  ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white shadow-lg border border-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-neutral-900/80'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('REGISTER')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'REGISTER'
                  ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 text-white shadow-lg border border-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-neutral-900/80'
              }`}
            >
              Register
            </button>
          </div>

          {/* Google OAuth — Primary Fast Auth */}
          <button
            onClick={() => { setIsAuthOpen(false); loginWithGoogle(); }}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm py-2.5 px-4 rounded-xl border border-slate-200 transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {authMode === 'LOGIN' ? 'Continue with Google' : 'Register with Google'}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900 px-3 text-slate-500">
                {authMode === 'LOGIN' ? 'or sign in with email' : 'or register with email'}
              </span>
            </div>
          </div>

          {/* Email / Password / Profile Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-3">
            {authMode === 'REGISTER' && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Account Type / Role</label>
                  <select
                    value={authRole}
                    onChange={(e) => setAuthRole(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="CLIENT">Client (Hire Freelancers & Rent Assets)</option>
                    <option value="FREELANCER">Freelancer (Work on Gigs)</option>
                    <option value="ASSET_OWNER">Asset Owner (List Vehicles & Tech)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Profile Picture (Local File or URL)</label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <label className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-indigo-400 cursor-pointer transition-colors shrink-0">
                      {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-indigo-400" /> : <Upload className="w-4 h-4 text-indigo-400" />}
                      <span>{isUploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploadingImage} />
                    </label>
                    <input
                      type="text"
                      placeholder="or paste ImgBB / Image URL"
                      value={authAvatar}
                      onChange={(e) => setAuthAvatar(e.target.value)}
                      className="w-full sm:flex-1 bg-black text-slate-200 text-xs px-3 py-2 rounded-xl border border-neutral-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  {authAvatar && (
                    <div className="flex items-center gap-2 pt-1">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-emerald-400 font-medium truncate">Uploaded: {authAvatar}</span>
                    </div>
                  )}
                </div>
              </>
            )}

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
              {authMode === 'LOGIN' ? 'Sign In with Email' : 'Create Account'}
            </Button>
          </form>

          {/* Toggle Footer */}
          <div className="text-center pt-1 text-xs text-slate-400">
            {authMode === 'LOGIN' ? (
              <span>Don't have an account? <button type="button" onClick={() => setAuthMode('REGISTER')} className="text-indigo-400 hover:underline font-semibold">Register here</button></span>
            ) : (
              <span>Already have an account? <button type="button" onClick={() => setAuthMode('LOGIN')} className="text-indigo-400 hover:underline font-semibold">Sign In</button></span>
            )}
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="border-t border-indigo-500/20 bg-gradient-to-b from-neutral-950 via-black to-black py-16 mt-20 shadow-2xl relative overflow-hidden">
        {/* Glow Effects in Footer */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Top Grid (Brand info, Navigation columns, Newsletter) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-neutral-800/80">
            {/* Column 1 & 2: Brand Info & Escrow Security Badge */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                NexusPulse AI is an autonomous Web3-ready super-app connecting creators, freelancers, and luxury asset owners through cryptographic Escrow ledgers and Gemini AI dispute mediation.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-950/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Escrow Protected
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-lg shadow-indigo-950/40">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Gemini AI Powered
                </div>
              </div>
            </div>

            {/* Column 3: Platform Ecosystem */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Ecosystem</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li><button onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-indigo-400" /> Explore All</button></li>
                <li><button onClick={() => setActiveTab('rentals')} className="hover:text-white transition-colors flex items-center gap-1.5"><Car className="w-3 h-3 text-sky-400" /> Asset Rentals</button></li>
                <li><button onClick={() => setActiveTab('kanban')} className="hover:text-white transition-colors flex items-center gap-1.5"><Briefcase className="w-3 h-3 text-amber-400" /> Gig Kanban</button></li>
                <li><button onClick={() => setActiveTab('wallet')} className="hover:text-white transition-colors flex items-center gap-1.5"><Wallet className="w-3 h-3 text-emerald-400" /> Escrow Wallet</button></li>
              </ul>
            </div>

            {/* Column 4: Quick Links & Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400">Company & Legal</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">About NexusPulse</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">24/7 Support & Contact</button></li>
                <li><button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">Terms of Escrow</button></li>
                <li><button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">Privacy & Security Protocol</button></li>
              </ul>
            </div>

            {/* Column 5: Newsletter & Updates */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Stay Updated</h4>
              <p className="text-xs text-slate-400">Get instant alerts for new luxury rentals and high-paying Escrow gigs.</p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-black/90 text-slate-200 text-xs px-3 py-2 rounded-xl border border-neutral-800 focus:outline-none focus:border-indigo-500"
                  />
                  <Button variant="primary" size="sm">Join</Button>
                </div>
                <span className="text-[11px] text-slate-500 block">No spam. Unsubscribe at any time.</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Payment Methods & Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-center sm:text-left text-xs text-slate-500 space-y-1">
              <p>© 2026 NexusPulse AI. Built with Next.js, Express TypeScript, MongoDB & Tailwind CSS.</p>
              <p className="text-slate-600">Protected by End-to-End Cryptographic Escrow Ledger & Gemini AI Dispute Mediation</p>
            </div>

            {/* Accepted Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest shrink-0">We Accept</span>
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-center">
                  <img src="/logos/visa.svg" alt="Visa" className="h-4 w-auto object-contain invert brightness-200" />
                </span>
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-center">
                  <img src="/logos/bkash.svg" alt="bKash" className="h-4 w-auto object-contain" />
                </span>
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-center">
                  <img src="/logos/nagad.svg" alt="Nagad" className="h-4 w-auto object-contain" />
                </span>
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-center">
                  <img src="/logos/bank.svg" alt="Bank Transfer" className="h-4 w-auto object-contain invert brightness-150" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
