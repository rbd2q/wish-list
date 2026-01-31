import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useDeleteItem = (): UseMutationResult<WishListItemType, unknown, string> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      try {
        const { data } = await api.delete(`/api/wish/${itemId}`);
        if (data) {
          await queryClient.refetchQueries({ queryKey: ['current-user-wish-list'] });
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

export const useMarkAsCompleted = (): UseMutationResult<WishListItemType, unknown, string> => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      try {
        const { data } = await api.patch(`/api/wish/${itemId}`);
        if (data) {
          await queryClient.refetchQueries({ queryKey: ['current-user-wish-list'] });
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
