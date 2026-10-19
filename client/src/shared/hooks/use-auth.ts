import { useRouter } from 'next/navigation';
import { useCallback, useSyncExternalStore } from 'react';

const DEFAULT_URL_AFTER_AUTH = '/';
const TOKEN_CHANGE_EVENT = 'auth-token-change';

export const storageName = 'user-token';

function subscribeToToken(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(TOKEN_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(TOKEN_CHANGE_EVENT, onChange);
  };
}

function getStoredToken() {
  return localStorage.getItem(storageName);
}

function getServerToken() {
  return null;
}

function getClientReady() {
  return true;
}

function getServerReady() {
  return false;
}

export const useAuth = () => {
  const router = useRouter();
  const token = useSyncExternalStore(subscribeToToken, getStoredToken, getServerToken);
  const isReady = useSyncExternalStore(subscribeToToken, getClientReady, getServerReady);

  const login = useCallback(
    (jwtToken: string) => {
      localStorage.setItem(storageName, jwtToken);
      // The native storage event only notifies other tabs.
      window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
      router.replace(DEFAULT_URL_AFTER_AUTH);
    },
    [router],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
    router.replace('/auth');
  }, [router]);

  return { login, logout, token, isReady };
};
