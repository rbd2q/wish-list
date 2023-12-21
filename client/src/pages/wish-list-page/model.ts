import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useGetMyWishlist = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery(['current-user-wish-list'], async () => {
    try {
      const { data } = await api.get('/api/wish');
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};
