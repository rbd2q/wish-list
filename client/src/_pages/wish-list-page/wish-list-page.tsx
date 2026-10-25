import { Fragment } from 'react';

import { useGetMyWishlist } from '@/entities/wish';
import { Button } from '@/shared/ui/button';
import { WishlistItems, WishlistItemsSkeleton } from '@/widgets/wishlist-items';

import { useWishlistFilters } from './model';
import { WishlistEmpty, WishlistFilters, WishlistHeader, WishlistStatus } from './ui';

export const WishListPage = () => {
  const { data, isLoading, isError, refetch } = useGetMyWishlist();
  const {
    wishes,
    section,
    completedCount,
    currency,
    setSection,
    search,
    setSearch,
    sort,
    setSort,
    collectionIds,
    setCollectionIds,
    hasFilters,
    displayedItems,
  } = useWishlistFilters(data);

  const isUnavailable = isLoading || isError;
  const activeCount = wishes.length - completedCount;

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <WishlistHeader activeCount={activeCount} completedCount={completedCount} isUnavailable={isUnavailable} />
      <WishlistStatus
        section={section}
        onSectionChange={setSection}
        activeCount={activeCount}
        completedCount={completedCount}
        isUnavailable={isUnavailable}
      />
      <WishlistFilters
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        currency={currency}
        collectionIds={collectionIds}
        onCollectionsChange={setCollectionIds}
      />
      {isLoading ? (
        <WishlistItemsSkeleton />
      ) : isError ? (
        <div role="alert" className="rounded-xl border border-border bg-surface p-6">
          <p>Could not load your wishlist.</p>
          <Button className="mt-4" onPress={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : displayedItems.length ? (
        <Fragment>
          <p role="status" className="sr-only">
            {displayedItems.length} wishes found
          </p>
          <WishlistItems items={displayedItems} preferredCurrency={currency} />
        </Fragment>
      ) : (
        <WishlistEmpty hasFilters={hasFilters} hasWishes={!!wishes.length} section={section} />
      )}
    </div>
  );
};
