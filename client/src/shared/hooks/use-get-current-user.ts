import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@/shared/hooks/useApi';
import { UserResource } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useCurrentUser = (): UseQueryResult<UserResource> => {
  const api = useApi();

  return useQuery(['current-user'], async () => {
    try {
      const { data } = await api.get('/api/users/current');
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};
