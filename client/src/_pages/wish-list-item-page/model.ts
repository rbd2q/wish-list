import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useGetMyWishItem = (itemId: string | null): UseQueryResult<WishListItemType> => {
  const api = useApi();

  return useQuery({
    queryKey: ['wish-list-item', itemId],
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
