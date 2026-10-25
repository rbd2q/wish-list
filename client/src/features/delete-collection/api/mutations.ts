import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Collection, COLLECTION_QUERY_KEYS } from '@/entities/collection';
import { WISHLIST_QUERY_KEYS } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast, showSuccessToast } from '@/shared/lib/notifications';

export const useDeleteCollection = (id: string) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/api/collections/${encodeURIComponent(id)}`);
    },
    onSuccess: () => {
      queryClient.setQueryData<Collection[]>(COLLECTION_QUERY_KEYS.all, (collections) =>
        collections?.filter((collection) => collection.id !== id),
      );
      queryClient.removeQueries({ queryKey: COLLECTION_QUERY_KEYS.detail(id), exact: true });
      Promise.all([
        queryClient.invalidateQueries({ queryKey: COLLECTION_QUERY_KEYS.all }),
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser }),
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.details }),
      ]);
      showSuccessToast('Collection deleted. Your wishes were kept.');
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not delete the collection. Try again.'));
    },
  });
};
