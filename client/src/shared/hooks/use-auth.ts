import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_URL_AFTER_AUTH = '/';

export const storageName = 'user-token';

export const useAuth = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const login = useCallback((jwtToken: string) => {
    setToken(jwtToken);
    localStorage.setItem(storageName, jwtToken);
    router.replace(DEFAULT_URL_AFTER_AUTH);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(storageName);
    router.replace('/auth');
  }, []);

  useEffect(() => {
    if (localStorage.getItem(storageName)) {
      const token = localStorage.getItem(storageName);
      if (token) {
        login(token);
      }
      setIsReady(true);
    }
  }, [login]);

  return { login, logout, token, isReady };
};
