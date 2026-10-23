import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import { WishListItemType } from '../model/types';
import { WISHLIST_QUERY_KEYS } from './query-keys';

export const useGetMyWishlist = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.currentUser,
    queryFn: async () => {
      try {
        const { data } = await api.get('/api/wish');

        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data?.message || 'Could not load your wishlist.');
        }
        throw error;
      }
    },
  });
};
