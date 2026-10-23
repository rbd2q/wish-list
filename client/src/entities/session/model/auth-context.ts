import { createContext } from 'react';

interface AuthContextType {
  token: string | null;
  login: (jwtToken: string) => void;
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
