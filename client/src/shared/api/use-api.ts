import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'X-Detect-Locale': 'false',
    'X-CSRF-Protection': '1',
  },
});

export const useApi = () => api;
