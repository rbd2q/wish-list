import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { WISHLIST_QUERY_KEYS } from '@/shared/config/query-keys';
import { useApi } from '@/shared/hooks/useApi';
import { AddItemFormResource, ParsedWishListItem, WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useAddWish = (): UseMutationResult<WishListItemType, unknown, AddItemFormResource> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: AddItemFormResource) => {
      try {
        const { data } = await api.post('/api/wish/create', formData);

        if (data) {
          // TODO Replace with constant
          await queryClient.refetchQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser });
        }
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.message);
        }
      }
    },
  });
};

export const useParseLink = (): UseMutationResult<ParsedWishListItem, unknown, string, unknown> => {
  const api = useApi();

  return useMutation({
    mutationFn: async (url: string) => {
      if (!url) return;

      try {
        const { data } = await api.post('/api/wish/parse', { url });

        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.message);
        }
      }
    },
  });
};
