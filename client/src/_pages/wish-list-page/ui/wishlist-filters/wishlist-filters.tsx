import { Search } from 'lucide-react';
import type { ChangeEvent } from 'react';

import { WishPriority } from '@/entities/wish';
import { CurrencyEnum } from '@/shared/lib/currency';
import { Input } from '@/shared/ui/input';
import { Select, type SelectOption } from '@/shared/ui/select';

import { WishlistPriorityFilter, WishlistSort } from '../../enums';
import { WishlistCollectionFilter } from './wishlist-collection-filter';

const dateSortOptions: SelectOption[] = [
  { value: WishlistSort.NEWEST, name: 'Most recent' },
  { value: WishlistSort.OLDEST, name: 'Oldest first' },
];

const priorityOptions: SelectOption[] = [
  { value: WishlistPriorityFilter.ALL, name: 'All priorities' },
  { value: WishPriority.HIGH, name: 'High' },
  { value: WishPriority.MEDIUM, name: 'Medium' },
  { value: WishPriority.LOW, name: 'Low' },
];

interface WishlistFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: WishlistSort;
  onSortChange: (value: WishlistSort) => void;
  priority: WishPriority | null;
  onPriorityChange: (value: WishPriority | null) => void;
  currency: CurrencyEnum;
  collectionIds: string[];
  onCollectionsChange: (value: string[]) => void;
}

export const WishlistFilters = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  priority,
  onPriorityChange,
  currency,
  collectionIds,
  onCollectionsChange,
}: WishlistFiltersProps) => {
  const sortOptions: SelectOption[] = [
    ...dateSortOptions,
    { value: WishlistSort.PRICE_ASC, name: `Price: low to high (${currency})` },
    { value: WishlistSort.PRICE_DESC, name: `Price: high to low (${currency})` },
  ];

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleSortChange = (value: string | null) => {
    if (value) {
      onSortChange(value as WishlistSort);
    }
  };

  const handlePriorityChange = (value: string | null) => {
    onPriorityChange(value === WishlistPriorityFilter.ALL ? null : (value as WishPriority | null));
  };

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))]">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <Input
            type="search"
            aria-label="Search wishes by title"
            placeholder="Search your wishlist…"
            value={search}
            onChange={handleSearchChange}
            startContent={<Search size={18} aria-hidden="true" />}
          />
        </div>
        <div className="min-w-0">
          <span id="wishlist-sort-label" className="sr-only">
            Sort wishes
          </span>
          <Select
            aria-labelledby="wishlist-sort-label"
            value={sort}
            onChange={handleSortChange}
            options={sortOptions}
          />
        </div>
        <div className="min-w-0">
          <span id="wishlist-priority-label" className="sr-only">
            Filter wishes by priority
          </span>
          <Select
            aria-labelledby="wishlist-priority-label"
            value={priority ?? WishlistPriorityFilter.ALL}
            onChange={handlePriorityChange}
            options={priorityOptions}
          />
        </div>
      </div>
      <WishlistCollectionFilter value={collectionIds} onChange={onCollectionsChange} />
    </div>
  );
};
