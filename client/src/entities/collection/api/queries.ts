import { useQuery } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import type { Collection } from '../model';
import { COLLECTION_QUERY_KEYS } from './query-keys';

export const useMyCollections = () => {
  const api = useApi();

  return useQuery({
    queryKey: COLLECTION_QUERY_KEYS.all,
    meta: { errorMessage: 'Could not load collections.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Collection[]>('/api/collections', { signal });

      return data;
    },
  });
};

export const useCollection = (id?: string) => {
  const api = useApi();

  return useQuery({
    queryKey: COLLECTION_QUERY_KEYS.detail(id),
    enabled: !!id,
    meta: { errorMessage: 'Could not load the collection.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Collection>(`/api/collections/${encodeURIComponent(id ?? '')}`, { signal });

      return data;
    },
  });
};
