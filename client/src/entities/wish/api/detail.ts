import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import { WishListItemType } from '../model/types';
import { WISHLIST_QUERY_KEYS } from './query-keys';

export const useGetMyWishItem = (itemId: string | null): UseQueryResult<WishListItemType> => {
  const api = useApi();

  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.detail(itemId),
    queryFn: async () => {
      if (!itemId) return;

      try {
        const { data } = await api.get(`/api/wish/${itemId}`);

        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.message);
        }
      }
    },
  });
};
