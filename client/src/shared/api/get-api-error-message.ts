import { isAxiosError } from 'axios';

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  const data: unknown = isAxiosError(error) ? error.response?.data : undefined;

  if (typeof data === 'object' && data !== null && 'message' in data) {
    const { message } = data;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
};
