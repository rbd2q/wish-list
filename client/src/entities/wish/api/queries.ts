import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { WishListItemType } from '../model/types';
import { WISHLIST_QUERY_KEYS } from './query-keys';

export const useGetMyWishlist = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.currentUser,
    meta: { errorMessage: 'Could not load your wishlist.' },
    queryFn: async ({ signal }) => {
      const { data } = await api.get<WishListItemType[]>(`/api/wish`, { signal });

      return data;
    },
  });
};
