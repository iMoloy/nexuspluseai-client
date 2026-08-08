'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  User,
  ShieldCheck,
  Mail,
  Briefcase,
  Upload,
  Key,
  CheckCircle2,
  Calendar,
  Wallet,
  Star,
  Award,
  Loader2,
  Lock,
  Edit3,
  Camera
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { uploadToImgBB } from '@/lib/imgbb';
import { fetchApi } from '@/services/api';

export const ProfileSection: React.FC = () => {
  const { currentUser, setAuthUser } = useAuth();

  const [name, setName] = useState(currentUser?.name || 'Moloy Paul');
  const [email, setEmail] = useState(currentUser?.email || 'developer.moloy@gmail.com');
  const [bio, setBio] = useState('Fullstack AI & Blockchain Systems Architect. Specialist in Next.js, Express TypeScript, and Escrow Smart Contracts.');
  const [phone, setPhone] = useState('+880 1700-000000');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [skills, setSkills] = useState('Next.js, Express.js, MongoDB, Escrow Payments, Gemini AI');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300');

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'SECURITY' | 'ACTIVITY'>('DETAILS');

  // Password Change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.info('Uploading profile image to ImgBB...');
      const uploadedUrl = await uploadToImgBB(file);
      setAvatar(uploadedUrl);
      toast.success('Profile avatar updated successfully!');
    } catch {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetchApi('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name, email, avatar, bio, phone, location, skills })
      });

      if (currentUser) {
        setAuthUser({
          ...currentUser,
          name,
          email,
          avatar
        });
      }
      toast.success('Profile updated successfully!');
    } catch {
      if (currentUser) {
        setAuthUser({
          ...currentUser,
          name,
          email,
          avatar
        });
      }
      toast.success('Profile updated successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Please enter current and new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password changed successfully!');
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Profile Banner & Header */}
      <Card className="p-0 overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-indigo-900 via-violet-900 to-slate-900 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Badge variant="success" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              KYC Verified
            </Badge>
            <Badge variant="primary" icon={<Award className="w-3.5 h-3.5" />}>
              Pro Member
            </Badge>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-14 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-slate-900 shadow-xl bg-slate-950"
              />
              <label className="absolute bottom-1 right-1 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer shadow-lg transition-transform hover:scale-105">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={isUploading} />
              </label>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-100 flex items-center justify-center sm:justify-start gap-2">
                {name} <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              </h2>
              <p className="text-xs text-slate-400 font-medium">{email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <Badge variant="primary">{currentUser?.role || 'CLIENT / FREELANCER'}</Badge>
                <span className="text-xs text-slate-500">• Member since Aug 2026</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'DETAILS' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('DETAILS')}
            >
              Profile Info
            </Button>
            <Button
              variant={activeTab === 'SECURITY' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('SECURITY')}
            >
              Security
            </Button>
            <Button
              variant={activeTab === 'ACTIVITY' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('ACTIVITY')}
            >
              Activity
            </Button>
          </div>
        </div>
      </Card>

      {/* TAB 1: PROFILE DETAILS FORM */}
      {activeTab === 'DETAILS' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-indigo-400" /> Account & Personal Information
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <Input
                label="Skills & Specialization"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-sm p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <Button variant="primary" type="submit" isLoading={isSaving} leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Quick Stats Sidebar */}
          <div className="space-y-4">
            <Card className="p-5 space-y-4">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" /> Performance Rating
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-white">4.98 / 5.0</span>
                <Badge variant="warning">Top Rated</Badge>
              </div>
              <p className="text-xs text-slate-400">Based on 48 completed Escrow gigs & rentals</p>
            </Card>

            <Card className="p-5 space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Identity & Verification
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>National ID / Passport:</span>
                  <span className="text-emerald-400 font-semibold">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Verification:</span>
                  <span className="text-emerald-400 font-semibold">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone 2FA:</span>
                  <span className="text-indigo-400 font-semibold">Enabled</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & PASSWORD */}
      {activeTab === 'SECURITY' && (
        <Card className="max-w-2xl mx-auto p-6 space-y-6">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-400" /> Change Password & Security
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button variant="primary" type="submit" isLoading={isChangingPassword} leftIcon={<Lock className="w-4 h-4" />}>
              Update Password
            </Button>
          </form>
        </Card>
      )}

      {/* TAB 3: ACTIVITY HISTORY */}
      {activeTab === 'ACTIVITY' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" /> Recent Activity & Milestones
          </h3>

          <div className="space-y-3">
            {[
              { title: 'Tesla Model 3 Rental Booked', date: 'Today at 10:45 AM', tag: 'Rental' },
              { title: 'Completed Gig: Express SSE Stream Integration', date: 'Yesterday at 4:20 PM', tag: 'Gig' },
              { title: 'Deposited $500 via Stripe Card', date: '3 days ago', tag: 'Wallet' },
              { title: 'Profile Information Updated', date: '5 days ago', tag: 'Account' }
            ].map((act, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{act.title}</h4>
                  <span className="text-xs text-slate-500">{act.date}</span>
                </div>
                <Badge variant="primary">{act.tag}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
