import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { WISHLIST_QUERY_KEYS } from '@/shared/config/query-keys';
import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

const useWishMutation = (action: 'delete' | 'complete'): UseMutationResult<WishListItemType, unknown, string> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { data } =
        action === 'delete'
          ? await api.delete<WishListItemType>(`/api/wish/${itemId}`)
          : await api.patch<WishListItemType>(`/api/wish/${itemId}`);
      return data;
    },
    onSuccess: (wish) => {
      queryClient.setQueryData<WishListItemType[]>(WISHLIST_QUERY_KEYS.currentUser, (items) =>
        items?.flatMap((item) => (item.id === wish.id ? (action === 'delete' ? [] : [wish]) : [item])),
      );
      queryClient.invalidateQueries({ queryKey: ['wish-list-item', wish.id] });
      return queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof AxiosError
          ? error.response?.data?.message || 'Could not save changes. Try again.'
          : 'Could not save changes. Try again.',
      );
    },
  });
};

export const useDeleteItem = () => useWishMutation('delete');
export const useMarkAsCompleted = () => useWishMutation('complete');
