import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Collection, COLLECTION_QUERY_KEYS, type CollectionValues } from '@/entities/collection';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast, showSuccessToast } from '@/shared/lib/notifications';

export const useSaveCollection = (id?: string) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CollectionValues) => {
      const { data } = id
        ? await api.patch<Collection>(`/api/collections/${encodeURIComponent(id)}`, values)
        : await api.post<Collection>('/api/collections', values);

      return data;
    },
    onSuccess: (collection) => {
      queryClient.setQueryData(COLLECTION_QUERY_KEYS.detail(collection.id), collection);
      queryClient.setQueryData<Collection[]>(COLLECTION_QUERY_KEYS.all, (collections) =>
        collections
          ? id
            ? collections.map((item) => (item.id === collection.id ? collection : item))
            : [collection, ...collections]
          : undefined,
      );
      queryClient.invalidateQueries({ queryKey: COLLECTION_QUERY_KEYS.all });
      showSuccessToast(id ? 'Collection updated.' : 'Collection created.');
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not save the collection. Try again.'));
    },
  });
};
