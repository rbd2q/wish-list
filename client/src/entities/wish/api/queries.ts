import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '@/shared/api';

import { WishListItemType } from '../model';
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
