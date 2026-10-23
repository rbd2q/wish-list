import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import { UserResource } from '../model';

export const useCurrentUser = (): UseQueryResult<UserResource> => {
  const api = useApi();

  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/api/users/current');

        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.message);
        }
      }
    },
  });
};
