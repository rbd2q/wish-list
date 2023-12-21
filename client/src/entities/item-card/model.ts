import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useDeleteItem = (): UseMutationResult<WishListItemType, unknown, string> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation(async (itemId: string) => {
    try {
      const { data } = await api.delete(`/api/wish/${itemId}`);
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

export const useMarkAsCompleted = (): UseMutationResult<WishListItemType, unknown, string> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation(async (itemId: string) => {
    try {
      const { data } = await api.patch(`/api/wish/${itemId}`);
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
