'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  kycVerified?: boolean;
  authProvider?: string;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  setAuthUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const emptySubscribe = () => () => {};
const useIsMounted = () => React.useSyncExternalStore(emptySubscribe, () => true, () => false);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_auth_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          queueMicrotask(() => setLocalUser(parsed));
        } catch (err) {
          console.error('Failed to parse saved user:', err);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      const gUser: AuthUser = {
        id: session.backendUser?.id || (session.user.email ? `usr_${session.user.email.replace(/[^a-zA-Z0-9]/g, '_')}` : 'usr_google'),
        name: session.backendUser?.name || session.user.name || 'Google User',
        email: session.backendUser?.email || session.user.email || '',
        role: session.backendUser?.role || 'CLIENT',
        avatar: session.backendUser?.avatar || session.user.image || undefined,
        kycVerified: session.backendUser?.kycVerified ?? true,
        authProvider: 'google'
      };
      setLocalUser(gUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nexus_auth_user', JSON.stringify(gUser));
      }
    }
  }, [session]);

  const isAuthenticated = (status === 'authenticated' || !!localUser) && isMounted;
  const isLoadingSession = status === 'loading' || !isMounted;

  const currentUser: AuthUser | null = session?.backendUser
    ? {
        id: session.backendUser.id,
        name: session.backendUser.name,
        email: session.backendUser.email,
        role: session.backendUser.role,
        avatar: session.backendUser.avatar,
        kycVerified: session.backendUser.kycVerified,
        authProvider: session.backendUser.authProvider
      }
    : (session?.user
        ? {
            id: session.user.email ? `usr_${session.user.email.replace(/[^a-zA-Z0-9]/g, '_')}` : 'usr_google',
            name: session.user.name || 'Google User',
            email: session.user.email || '',
            role: 'CLIENT',
            avatar: session.user.image || undefined,
            kycVerified: true,
            authProvider: 'google'
          }
        : localUser);

  const setAuthUser = (user: AuthUser) => {
    setLocalUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_auth_user', JSON.stringify(user));
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const callbackUrl = typeof window !== 'undefined' ? window.location.origin : '/';
      await signIn('google', { callbackUrl });
    } catch (err) {
      console.error('Google login error:', err);
      toast.error('Google login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setLocalUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nexus_auth_user');
      }
      if (status === 'authenticated') {
        await signOut({ callbackUrl: '/' });
      }
      toast.success('Logged out successfully');
    } catch {
      toast.error('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessToken = (): string | null => {
    return session?.backendAccessToken || null;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoadingSession,
        isLoading,
        loginWithGoogle,
        setAuthUser,
        logout,
        getAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
