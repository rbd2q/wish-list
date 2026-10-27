import { useState } from 'react';

import { useCurrentUser } from '@/entities/session';
import { WishListItemType, WishPriority } from '@/entities/wish';
import { CurrencyEnum } from '@/shared/lib/currency';

import { WishlistSection, WishlistSort } from './enums';

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
  const [collectionIds, setCollectionIds] = useState<string[]>([]);
  const [priority, setPriority] = useState<WishPriority | null>(null);
  const [sort, setSort] = useState<WishlistSort>(WishlistSort.NEWEST);
  const user = useCurrentUser();

  const currency = user.data?.preferredCurrency ?? CurrencyEnum.USD;
  const wishes = items ?? [];
  const completedCount = wishes.filter((item) => item.isCompleted).length;
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const hasFilters = !!normalizedSearch || !!collectionIds.length || !!priority;
  const showCompleted = section === WishlistSection.COMPLETED;

  const filteredItems = wishes.filter((item) => {
    if (!!item.isCompleted !== showCompleted) {
      return false;
    }

    if (collectionIds.length && !item.collectionIds?.some((id) => collectionIds.includes(id))) {
      return false;
    }

    if (priority && item.priority !== priority) {
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
    collectionIds,
    setCollectionIds,
    hasFilters,
    priority,
    setPriority,
    sort,
    setSort,
    currency,
    wishes,
    completedCount,
    displayedItems,
  };
};
