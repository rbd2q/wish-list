import { ItemCard, WishListItemType } from '@/entities/wish';
import { AddToWishlistButton } from '@/features/add-to-wishlist';
import { CurrencyEnum } from '@/shared/lib/currency';
import { EmptyBlock } from '@/shared/ui/empty-block';

import { WishActions } from '../wish-actions';

interface WishlistItemsProps {
  items: WishListItemType[];
  isIdeasPage?: boolean;
  preferredCurrency?: CurrencyEnum;
  showPriority?: boolean;
}

export const WishlistItems = ({ items, isIdeasPage, preferredCurrency, showPriority }: WishlistItemsProps) => {
  if (!items.length) {
    return <EmptyBlock />;
  }

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,288px),1fr))] gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          preferredCurrency={preferredCurrency}
          showPriority={showPriority}
          action={isIdeasPage ? <AddToWishlistButton wish={item} /> : <WishActions item={item} />}
        />
      ))}
    </div>
  );
};
