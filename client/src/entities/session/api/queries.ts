import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { UserResource } from '../model';
import { SESSION_QUERY_KEYS } from './query-keys';

export const useCurrentUser = (): UseQueryResult<UserResource> => {
  const api = useApi();

  return useQuery({
    queryKey: SESSION_QUERY_KEYS.currentUser,
    meta: { errorMessage: 'Could not load your profile.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<UserResource>(`/api/users/current`, { signal });

      return data;
    },
  });
};
