import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useGetAllItems = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery({
    queryKey: ['all-wishes'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/api/wish/ideas');
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.message);
        }
      }
    },
  });
};
