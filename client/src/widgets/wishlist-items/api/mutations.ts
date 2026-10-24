import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLLECTION_QUERY_KEYS } from '@/entities/collection';
import { WISHLIST_QUERY_KEYS, WishListItemType } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

enum WishAction {
  DELETE = 'delete',
  COMPLETE = 'complete',
  RESTORE = 'restore',
}

const useWishMutation = (action: WishAction): UseMutationResult<WishListItemType, unknown, string> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { data } =
        action === WishAction.DELETE
          ? await api.delete<WishListItemType>(`/api/wish/${itemId}`)
          : await api.patch<WishListItemType>(`/api/wish/${itemId}`, { isCompleted: action === WishAction.COMPLETE });

      return data;
    },
    onSuccess: (wish) => {
      queryClient.setQueryData<WishListItemType[]>(WISHLIST_QUERY_KEYS.currentUser, (items) =>
        items?.flatMap((item) => (item.id === wish.id ? (action === WishAction.DELETE ? [] : [wish]) : [item])),
      );
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.detail(wish.id) });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.ideas });
      queryClient.invalidateQueries({ queryKey: COLLECTION_QUERY_KEYS.all });

      return queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser });
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not save changes. Try again.'));
    },
  });
};

export const useDeleteItem = () => useWishMutation(WishAction.DELETE);
export const useMarkAsCompleted = () => useWishMutation(WishAction.COMPLETE);
export const useRestoreWish = () => useWishMutation(WishAction.RESTORE);
