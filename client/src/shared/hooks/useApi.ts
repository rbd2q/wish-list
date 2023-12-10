import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'X-Detect-Locale': 'false',
  },
};

// TODO refactor working with api
export const useApi = () => {
  const actualConfig = { ...config, headers: { ...config.headers } };

  return axios.create(actualConfig);
};
