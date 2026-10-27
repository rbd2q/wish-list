import clsx from 'clsx';

import { type Collection, COLLECTION_COLOR_CLASSES, COLLECTION_ICON_COMPONENTS } from '@/entities/collection';
import type { WishListItemType } from '@/entities/wish';

import { CollectionHeaderLayout } from './collection-header-layout';
import { CollectionStats } from './collection-stats';
import { CollectionStatsSkeleton } from './collection-stats-skeleton';

interface CollectionHeaderProps {
  collection: Collection;
  wishes: WishListItemType[];
  areWishesAvailable: boolean;
  isWishesLoading: boolean;
  total?: string;
  highPriorityCount: number;
}

export const CollectionHeader = ({
  collection,
  wishes,
  areWishesAvailable,
  isWishesLoading,
  total,
  highPriorityCount,
}: CollectionHeaderProps) => {
  const Icon = COLLECTION_ICON_COMPONENTS[collection.icon];

  return (
    <CollectionHeaderLayout collectionId={collection.id} wishes={wishes} isDisabled={!areWishesAvailable}>
      <span
        className={clsx(
          'flex size-16 shrink-0 items-center justify-center rounded-2xl',
          COLLECTION_COLOR_CLASSES[collection.color],
        )}>
        <Icon size={32} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h1 className="min-h-8 text-2xl font-semibold leading-8 wrap-anywhere">{collection.name}</h1>
        <p className="mt-1 min-h-5 text-sm leading-5 whitespace-pre-line wrap-anywhere text-muted-foreground">
          {collection.description}
        </p>
        {isWishesLoading ? (
          <CollectionStatsSkeleton wishCount={collection.wishCount} />
        ) : (
          <CollectionStats
            wishCount={collection.wishCount}
            total={areWishesAvailable ? total : undefined}
            highPriorityCount={areWishesAvailable ? highPriorityCount : undefined}
          />
        )}
      </div>
    </CollectionHeaderLayout>
  );
};
