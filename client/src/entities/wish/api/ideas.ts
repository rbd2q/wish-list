import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { WishListItemType } from '../model/types';
import { WISHLIST_QUERY_KEYS } from './query-keys';

export const useGetAllItems = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.ideas,
    meta: { errorMessage: 'Could not load ideas.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<WishListItemType[]>(`/api/wish/ideas`, { signal });

      return data;
    },
  });
};
