import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_URL_AFTER_AUTH = '/';

const storageName = 'userData';

export const useAuth = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      }),
    );

    router.replace(DEFAULT_URL_AFTER_AUTH);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
    router.replace('/auth');
  }, []);

  useEffect(() => {
    if (localStorage.getItem(storageName)) {
      const data = JSON.parse(localStorage.getItem(storageName) ?? '');

      if (data && data.token) {
        login(data.token, data.userId);
      }
      setIsReady(true);
    }
  }, [login]);

  return { login, logout, token, userId, isReady };
};
