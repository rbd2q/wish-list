import noop from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';

import { useAuth } from '@/shared/hooks/use-auth';
import { FCWithChildren } from '@/shared/types';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export const AuthContextProvider: FCWithChildren = ({ children }) => {
  const router = useRouter();
  const { token, userId, login, logout, isReady } = useAuth();
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, isReady]);

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>{children}</AuthContext.Provider>
  );
};
