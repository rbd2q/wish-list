import { useState } from 'react';

import type { WishListItemType } from '@/entities/wish';

export const useExistingWishes = (items: WishListItemType[], collectionId: string) => {
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const availableItems = items.filter((wish) => !wish.collectionIds?.includes(collectionId));
  const displayedItems = availableItems.filter((wish) => wish.title.toLocaleLowerCase().includes(normalizedSearch));
  const hasAvailableItems = !!availableItems.length;

  return { search, setSearch, displayedItems, hasAvailableItems };
};
