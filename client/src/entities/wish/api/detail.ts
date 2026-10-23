import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { WishListItemType } from '../model/types';
import { WISHLIST_QUERY_KEYS } from './query-keys';

export const useGetMyWishItem = (itemId: string): UseQueryResult<WishListItemType> => {
  const api = useApi();

  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.detail(itemId),
    enabled: !!itemId,
    meta: { errorMessage: 'Could not load the wish.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<WishListItemType>(`/api/wish/${itemId}`, { signal });

      return data;
    },
  });
};
