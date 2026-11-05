import { useCallback, useEffect, useState } from 'react';

import { getApiErrorMessage } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import { endSession, getSession } from '../api/session';
import { installSessionRefresh } from '../api/session-refresh';

export const useAuth = () => {
  const [session, setSession] = useState<{ userId: string | null; isReady: boolean; error: boolean }>({
    userId: null,
    isReady: false,
    error: false,
  });

  const login = useCallback((userId: string | null) => {
    setSession({ userId, isReady: true, error: false });
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const userId = await getSession();

      setSession({ userId, isReady: true, error: false });
    } catch {
      setSession((current) => ({ ...current, error: true, isReady: false }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await endSession();
      login(null);
    } catch (error) {
      showErrorToast(getApiErrorMessage(error, 'Unable to sign out. Please try again.'));
    }
  }, [login]);

  useEffect(() => {
    const initializeSession = async () => {
      await refreshSession();
    };

    const uninstallRefresh = installSessionRefresh(() => login(null));
    window.addEventListener('focus', refreshSession);
    initializeSession();

    return () => {
      uninstallRefresh();
      window.removeEventListener('focus', refreshSession);
    };
  }, [login, refreshSession]);

  return { ...session, login, logout, refreshSession };
};
