import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { COLLECTION_QUERY_KEYS } from '@/entities/collection';
import { WISHLIST_QUERY_KEYS, WishListItemType } from '@/entities/wish';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';

import type { AddItemFormResource } from '../model';
import { resolvePhotoUrls } from './resolve-photo-urls';
import type { ParsedWishListItem, SaveWishPayload } from './types';

export const useSaveWish = (id?: string): UseMutationResult<WishListItemType, unknown, AddItemFormResource> => {
  const api = useApi();
  const queryClient = useQueryClient();
  const uploadedImages = useRef(new WeakMap<File, string>());

  return useMutation({
    mutationFn: async (formData: AddItemFormResource) => {
      const { photos, ...values } = formData;
      const imageUrls = await resolvePhotoUrls(photos, api, uploadedImages.current);
      const payload: SaveWishPayload = { ...values, imageUrls };

      const { data } = id
        ? await api.patch<WishListItemType>(`/api/wish/${id}`, payload)
        : await api.post<WishListItemType>('/api/wish/create', payload);

      return data;
    },
    onSuccess: (wish) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEYS.detail(wish.id), wish);

      void Promise.all([
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser }),
        queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.ideas }),
        queryClient.invalidateQueries({ queryKey: COLLECTION_QUERY_KEYS.all }),
      ]);
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Could not save the wish. Try again.'));
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
