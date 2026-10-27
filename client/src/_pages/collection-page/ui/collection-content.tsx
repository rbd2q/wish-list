import type { WishListItemType } from '@/entities/wish';
import type { CurrencyEnum } from '@/shared/lib/currency';
import { RequestError } from '@/shared/ui/request-error';

import { CollectionWishes } from './collection-wishes';
import { CollectionWishesSkeleton } from './collection-wishes-skeleton';

interface CollectionContentProps {
  items: WishListItemType[];
  currency: CurrencyEnum;
  isLoading: boolean;
  isError: boolean;
  isRemoving: boolean;
  onRemove: (wishId: string) => void;
  onRetry: () => void;
}

export const CollectionContent = ({
  items,
  currency,
  isLoading,
  isError,
  isRemoving,
  onRemove,
  onRetry,
}: CollectionContentProps) => {
  if (isLoading) return <CollectionWishesSkeleton />;

  if (isError) return <RequestError message="Could not load collection wishes." onRetry={onRetry} />;

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold">No wishes yet</h2>
        <p className="mt-2 text-muted-foreground">Create a wish or add one from your wishlist to this collection.</p>
      </div>
    );
  }

  return <CollectionWishes items={items} onRemove={onRemove} isRemoving={isRemoving} currency={currency} />;
};
