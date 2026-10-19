import { useRouter } from 'next/navigation';
import { createContext, useEffect, useMemo } from 'react';

import { useAuth } from '@/shared/hooks/use-auth';
import { FCWithChildren } from '@/shared/types';

interface AuthContextType {
  token: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultContext: AuthContextType = {
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthContextProvider: FCWithChildren = ({ children }) => {
  const router = useRouter();
  const { token, login, logout, isReady } = useAuth();
  const isAuthenticated = !!token;

  const value = useMemo(() => ({ token, login, logout, isAuthenticated }), [token, login, logout, isAuthenticated]);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
