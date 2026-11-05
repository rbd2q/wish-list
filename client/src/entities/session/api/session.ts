import { isAxiosError } from 'axios';

import { api } from '@/shared/api';

import { waitForPendingRefresh } from './session-refresh';

export const getSession = async (): Promise<string | null> => {
  try {
    const { data } = await api.get<{ userId: string }>('/api/auth/session');

    return data.userId;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};

export const endSession = async () => {
  await waitForPendingRefresh();
  await api.post('/api/auth/logout');
};

export const signInSession = async (credentials: { email: string; password: string }) => {
  const { data } = await api.post<{ userId: string }>('/api/auth/login', credentials);

  return data;
};
