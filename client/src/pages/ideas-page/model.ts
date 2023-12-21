import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useGetAllItems = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery(['all-wishes'], async () => {
    try {
      const { data } = await api.get('/api/wish/ideas');
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};
