import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { WISHLIST_QUERY_KEYS, WishListItemType } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import { AddItemFormResource, ParsedWishListItem } from './types';

export const useAddWish = (): UseMutationResult<WishListItemType, unknown, AddItemFormResource> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: AddItemFormResource) => {
      const { data } = await api.post<WishListItemType>('/api/wish/create', formData);

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser }),
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not create the wish. Try again.'));
    },
  });
};

export const useParseLink = (): UseMutationResult<ParsedWishListItem, unknown, string> => {
  const api = useApi();

  return useMutation({
    mutationFn: async (url: string) => {
      const { data } = await api.post<ParsedWishListItem>('/api/wish/parse', { url });

      return data;
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not parse the product link. Try again.'));
    },
  });
};
