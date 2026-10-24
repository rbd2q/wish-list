import { useQuery } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { COLLECTION_QUERY_KEYS } from './query-keys';

interface CollectionSummary {
  id: string;
  name: string;
}

export const useMyCollections = () => {
  const api = useApi();

  return useQuery({
    queryKey: COLLECTION_QUERY_KEYS.all,
    meta: { errorMessage: 'Could not load collections.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<CollectionSummary[]>('/api/collections', { signal });

      return data;
    },
  });
};
