import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLLECTION_QUERY_KEYS } from '@/entities/collection';
import { WISHLIST_QUERY_KEYS, type WishListItemType } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import { MembershipAction } from '../model';

export const useChangeMembership = (collectionId: string) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ wishId, action }: { wishId: string; action: MembershipAction }) => {
      const { data: wish } = await api.get<WishListItemType>(`/api/wish/${wishId}`);
      const currentIds = wish.collectionIds ?? [];
      const collectionIds =
        action === MembershipAction.ADD
          ? [...new Set([...currentIds, collectionId])]
          : currentIds.filter((id) => id !== collectionId);
      const { data } = await api.patch<WishListItemType>(`/api/wish/${wishId}`, { collectionIds });

      return data;
    },
    onSuccess: async (wish) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEYS.detail(wish.id), wish);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser }),
        queryClient.invalidateQueries({ queryKey: COLLECTION_QUERY_KEYS.all }),
      ]);
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not update the collection. Try again.'));
    },
  });
};
