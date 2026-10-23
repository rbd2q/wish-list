import { useCallback, useSyncExternalStore } from 'react';

import { storageName } from '@/shared/api/token-storage';

const TOKEN_CHANGE_EVENT = 'auth-token-change';

const subscribeToToken = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener(TOKEN_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(TOKEN_CHANGE_EVENT, onChange);
  };
};

const getStoredToken = () => localStorage.getItem(storageName);
const getServerToken = () => null;
const getClientReady = () => true;
const getServerReady = () => false;

export const useAuth = () => {
  const token = useSyncExternalStore(subscribeToToken, getStoredToken, getServerToken);
  const isReady = useSyncExternalStore(subscribeToToken, getClientReady, getServerReady);

  const login = useCallback((jwtToken: string) => {
    localStorage.setItem(storageName, jwtToken);
    // The native storage event only notifies other tabs.
    window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
  }, []);

  return { login, logout, token, isReady };
};
