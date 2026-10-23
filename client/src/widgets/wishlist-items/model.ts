import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { WISHLIST_QUERY_KEYS, WishListItemType } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

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
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.detail(wish.id) });

      return queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser });
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not save changes. Try again.'));
    },
  });
};

export const useDeleteItem = () => useWishMutation('delete');
export const useMarkAsCompleted = () => useWishMutation('complete');
