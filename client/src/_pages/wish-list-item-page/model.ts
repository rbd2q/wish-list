import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useAddToMyWishlist = (): UseMutationResult<WishListItemType, unknown, WishListItemType> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: WishListItemType) => {
      try {
        const { data } = await api.post('/api/wish/create', item);
        if (data) {
          await queryClient.refetchQueries({ queryKey: ['current-user-wish-list'] });
        }
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.message);
        }
      }
    },
  });
};
