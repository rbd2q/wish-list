'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { AuthContext, useAuth } from '@/entities/session';
import { navigationConfig } from '@/shared/config/navigation';
import { FCWithChildren } from '@/shared/lib/react';

export const AuthContextProvider: FCWithChildren = ({ children }) => {
  const router = useRouter();
  const { token, login, logout, isReady } = useAuth();

  const isAuthenticated = !!token;

  const value = useMemo(() => ({ token, login, logout, isAuthenticated }), [token, login, logout, isAuthenticated]);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace(navigationConfig.auth);
    }
  }, [isAuthenticated, isReady, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
