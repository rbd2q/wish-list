import { createContext } from 'react';

interface AuthContextType {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const defaultContext: AuthContextType = {
  userId: null,
  login: () => {},
  logout: async () => {},
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(defaultContext);
