import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { UserResource } from '../model';

export const useCurrentUser = (): UseQueryResult<UserResource> => {
  const api = useApi();

  return useQuery({
    queryKey: ['current-user'],
    meta: { errorMessage: 'Could not load your profile.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<UserResource>(`/api/users/current`, { signal });

      return data;
    },
  });
};
