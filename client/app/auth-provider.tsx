'use client';

import { LoaderCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { AuthContext, useAuth } from '@/entities/session';
import { navigationConfig } from '@/shared/config/navigation';
import { FCWithChildren } from '@/shared/lib/react';

export const AuthContextProvider: FCWithChildren = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, login, logout, isReady } = useAuth();

  const isAuthenticated = !!token;

  const value = useMemo(() => ({ token, login, logout, isAuthenticated }), [token, login, logout, isAuthenticated]);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace(navigationConfig.auth);
    }
  }, [isAuthenticated, isReady, router]);

  const canRenderPage = isReady && (isAuthenticated || pathname === navigationConfig.auth);

  return (
    <AuthContext.Provider value={value}>
      {canRenderPage ? (
        children
      ) : (
        <div role="status" className="flex min-h-dvh items-center justify-center bg-background">
          <LoaderCircle aria-hidden="true" className="size-10 animate-spin text-primary motion-reduce:animate-none" />
          <span className="sr-only">Loading session…</span>
        </div>
      )}
    </AuthContext.Provider>
  );
};
