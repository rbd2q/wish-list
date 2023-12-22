import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useGetMyWishItem = (itemId: string | null): UseQueryResult<WishListItemType> => {
  const api = useApi();

  return useQuery(['wish-list-item', itemId], async () => {
    if (!itemId) {
      return;
    }

    try {
      const { data } = await api.get(`/api/wish/${itemId}`);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};

export const useAddToMyWishlist = (): UseMutationResult<WishListItemType, unknown, WishListItemType> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation(async (item: WishListItemType) => {
    try {
      const { data } = await api.post('/api/wish/create', item);
      if (data) {
        // TODO Replace with constant
        await queryClient.refetchQueries(['current-user-wish-list']);
      }
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};
