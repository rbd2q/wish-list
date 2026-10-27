import { ItemCard, ItemCardVariant, type WishListItemType } from '@/entities/wish';
import type { CurrencyEnum } from '@/shared/lib/currency';

import { CollectionWishActions } from './collection-wish-actions';

interface CollectionWishesProps {
  items: WishListItemType[];
  onRemove: (wishId: string) => void;
  isRemoving: boolean;
  currency: CurrencyEnum;
}

export const CollectionWishes = ({ items, onRemove, isRemoving, currency }: CollectionWishesProps) => (
  <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {items.map((wish) => (
      <ItemCard
        key={wish.id}
        item={wish}
        variant={ItemCardVariant.COMPACT}
        preferredCurrency={currency}
        action={<CollectionWishActions wish={wish} onRemove={onRemove} isRemoving={isRemoving} />}
      />
    ))}
  </div>
);
