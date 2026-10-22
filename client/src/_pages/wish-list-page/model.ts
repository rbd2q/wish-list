import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { WISHLIST_QUERY_KEYS } from '@/shared/config/query-keys';
import { useCurrentUser } from '@/shared/hooks/use-get-current-user';
import { useApi } from '@/shared/hooks/useApi';
import { CurrencyEnum, WishListItemType } from '@/shared/types';
import { showErrorToast } from '@/utils';

import { WishlistSection, WishlistSort } from './enums';

export const useGetMyWishlist = (): UseQueryResult<WishListItemType[]> => {
  const api = useApi();

  return useQuery({
    queryKey: WISHLIST_QUERY_KEYS.currentUser,
    queryFn: async () => {
      try {
        const { data } = await api.get('/api/wish');
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data?.message || 'Could not load your wishlist.');
        }
        throw error;
      }
    },
  });
};

const compareWishlistItems = (a: WishListItemType, b: WishListItemType, sort: WishlistSort, currency: CurrencyEnum) => {
  if (sort === WishlistSort.NEWEST) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  if (sort === WishlistSort.OLDEST) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }

  const aPrice = a.prices?.[currency];
  const bPrice = b.prices?.[currency];

  if (!Number.isFinite(aPrice) && !Number.isFinite(bPrice)) {
    return 0;
  }

  if (!Number.isFinite(aPrice)) {
    return 1;
  }

  if (!Number.isFinite(bPrice)) {
    return -1;
  }

  if (sort === WishlistSort.PRICE_ASC) {
    return aPrice - bPrice;
  }
  return bPrice - aPrice;
};

// TODO: Move filtering and sorting to the backend in WIS-21:
// https://linear.app/wish-list-wishy/issue/WIS-21
export const useWishlistFilters = (items: WishListItemType[] | undefined) => {
  const [section, setSection] = useState<WishlistSection>(WishlistSection.ACTIVE);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<WishlistSort>(WishlistSort.NEWEST);
  const user = useCurrentUser();
  const currency = user.data?.preferredCurrency ?? 'USD';
  const wishes = items ?? [];
  const completedCount = wishes.filter((item) => item.isCompleted).length;
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const showCompleted = section === WishlistSection.COMPLETED;

  const filteredItems = wishes.filter((item) => {
    if (Boolean(item.isCompleted) !== showCompleted) {
      return false;
    }
    return item.title.toLocaleLowerCase().includes(normalizedSearch);
  });
  const displayedItems = filteredItems.sort((a, b) => compareWishlistItems(a, b, sort, currency));

  return {
    section,
    setSection,
    search,
    setSearch,
    sort,
    setSort,
    currency,
    wishes,
    completedCount,
    displayedItems,
  };
};
