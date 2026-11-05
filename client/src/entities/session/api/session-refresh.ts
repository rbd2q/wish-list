import { type InternalAxiosRequestConfig, isAxiosError } from 'axios';

import { api } from '@/shared/api';

interface SessionRequestConfig extends InternalAxiosRequestConfig {
  sessionRetried?: boolean;
}

const EXCLUDED_PATHS = ['/api/auth/login', '/api/auth/register', '/api/auth/logout', '/api/auth/refresh'];
let refreshPromise: Promise<unknown> | null = null;

export const waitForPendingRefresh = async () => {
  try {
    await refreshPromise;
  } catch {
    // Logout must still clear cookies when refresh fails.
  }
};

const refreshAccess = () => {
  if (!refreshPromise) {
    refreshPromise = api.post('/api/auth/refresh').finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const installSessionRefresh = (onExpired: () => void) => {
  const responseInterceptor = api.interceptors.response.use(undefined, async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401 || !error.config) {
      throw error;
    }

    const config = error.config as SessionRequestConfig;

    if (EXCLUDED_PATHS.includes(config.url ?? '')) {
      throw error;
    }

    if (config.sessionRetried) {
      onExpired();
      throw error;
    }

    try {
      await refreshAccess();
    } catch (refreshError) {
      if (isAxiosError(refreshError) && refreshError.response?.status === 401) {
        onExpired();
      }

      throw refreshError;
    }

    config.sessionRetried = true;

    return api.request(config);
  });

  return () => {
    api.interceptors.response.eject(responseInterceptor);
  };
};
