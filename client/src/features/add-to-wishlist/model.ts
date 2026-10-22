import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { WISHLIST_QUERY_KEYS } from '@/shared/config/query-keys';
import { useApi } from '@/shared/hooks/useApi';
import { WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useWishlistMembership = () => {
  const api = useApi();
  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.currentUser,
    queryFn: async () => {
      const { data } = await api.get<WishListItemType[]>('/api/wish');
      return data;
    },
  });
};

export const useAddToMyWishlist = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { data } = await api.post<WishListItemType>(`/api/wish/${itemId}/copy`);
      return data;
    },
    onSuccess: (wish) => {
      queryClient.setQueryData<WishListItemType[]>(WISHLIST_QUERY_KEYS.currentUser, (items) => {
        if (!items) {
          return [wish];
        }
        return [...items, wish];
      });
      return queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEYS.currentUser });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof AxiosError
          ? error.response?.data?.message || 'Could not add the wish. Try again.'
          : 'Could not add the wish. Try again.',
      );
    },
  });
};
