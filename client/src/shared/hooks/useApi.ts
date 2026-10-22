import axios, { AxiosRequestConfig } from 'axios';

import { storageName } from '@/shared/hooks/use-auth';

const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'X-Detect-Locale': 'false',
  },
};

export const useApi = () => {
  let impersonationToken = '';

  if (typeof window !== 'undefined' && localStorage.getItem(storageName)) {
    impersonationToken = localStorage.getItem(storageName) ?? '';
  }

  const actualConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${impersonationToken || process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
    },
  };

  return axios.create(actualConfig);
};
