import { Search } from 'lucide-react';

import { Input } from '@/shared/components/input';
import { Select, type SelectOption } from '@/shared/components/select';
import { CurrencyEnum } from '@/shared/types';

import { WishlistSort } from '../../enums';

const dateSortOptions: SelectOption[] = [
  { value: WishlistSort.NEWEST, name: 'Most recent' },
  { value: WishlistSort.OLDEST, name: 'Oldest first' },
];

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sort: WishlistSort;
  onSortChange: (value: WishlistSort) => void;
  currency: CurrencyEnum;
}

export const WishlistFilters = ({ search, onSearchChange, sort, onSortChange, currency }: Props) => {
  const sortOptions: SelectOption[] = [
    ...dateSortOptions,
    { value: WishlistSort.PRICE_ASC, name: `Price: low to high (${currency})` },
    { value: WishlistSort.PRICE_DESC, name: `Price: high to low (${currency})` },
  ];

  const handleSortChange = (value: string | null) => {
    if (value) {
      onSortChange(value as WishlistSort);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          aria-label="Search wishes by title"
          placeholder="Search your wishlist…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          startContent={<Search size={18} aria-hidden="true" />}
        />
        <div className="w-full shrink-0 sm:w-64">
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
      </div>
    </>
  );
};
