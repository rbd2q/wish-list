import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SESSION_QUERY_KEYS } from '@/entities/session';
import { WISHLIST_QUERY_KEYS, WishListItemType } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

export const useAddToMyWishlist = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { data } = await api.post<WishListItemType>(`/api/wish/${itemId}/copy`);

      return data;
    },
    onSuccess: (wish) => {
      queryClient.setQueryData<WishListItemType[]>(WISHLIST_QUERY_KEYS.currentUser, (items) => {
        return [...(items || []), wish];
      });

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser }),
        queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.stats }),
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.recent }),
      ]);
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not add the wish. Try again.'));
    },
  });
};
