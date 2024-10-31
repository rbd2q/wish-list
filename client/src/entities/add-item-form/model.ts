import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { useApi } from '@/shared/hooks/useApi';
import { AddItemFormResource, ParsedWishListItem, WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useAddWish = (): UseMutationResult<WishListItemType, unknown, AddItemFormResource> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation(async (formData: AddItemFormResource) => {
    try {
      const { data } = await api.post('/api/wish/create', formData);
      if (data) {
        // TODO Replace with constant
        await queryClient.refetchQueries(['current-user-wish-list']);
      }
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};

export const useParseLink = (): UseMutationResult<ParsedWishListItem, unknown, string, unknown> => {
  const api = useApi();

  return useMutation(async (url: string) => {
    if (!url) return;

    try {
      const { data } = await api.post('/api/wish/parse', { url });

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};
