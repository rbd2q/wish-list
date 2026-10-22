import { ItemCard } from '@/entities/item-card';
import { AddToWishlistButton } from '@/features/add-to-wishlist';
import { EmptyBlock } from '@/shared/components/empty-block';
import { CurrencyEnum, WishListItemType } from '@/shared/types';

interface Props {
  items: WishListItemType[];
  isIdeasPage?: boolean;
  preferredCurrency?: CurrencyEnum;
}

export const WishlistItems = ({ items, isIdeasPage, preferredCurrency }: Props) => {
  if (!items.length) {
    return <EmptyBlock />;
  }

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,288px),1fr))] gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isIdeasPage={isIdeasPage}
          preferredCurrency={preferredCurrency}
          action={isIdeasPage ? <AddToWishlistButton wish={item} /> : undefined}
        />
      ))}
    </div>
  );
};
