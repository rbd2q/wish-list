import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_URL_AFTER_AUTH = '/';

export const storageName = 'user-token';

export const useAuth = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const login = useCallback(
    (jwtToken: string) => {
      setToken(jwtToken);
      localStorage.setItem(storageName, jwtToken);
      router.replace(DEFAULT_URL_AFTER_AUTH);
    },
    [router],
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(storageName);
    router.replace('/auth');
  }, [router]);

  useEffect(() => {
    const stored = localStorage.getItem(storageName);
    if (stored) setToken(stored);
    setIsReady(true);
  }, []);

  return { login, logout, token, isReady };
};
