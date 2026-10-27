import type { WishListItemType } from '@/entities/wish';

import { ExistingWishOption } from './existing-wish-option';

interface ExistingWishesResultsProps {
  items: WishListItemType[];
  hasAvailableItems: boolean;
  isPending: boolean;
  onAdd: (wishId: string) => void;
}

export const ExistingWishesResults = ({ items, hasAvailableItems, isPending, onAdd }: ExistingWishesResultsProps) => {
  if (!items.length) {
    return (
      <p role="status" className="py-6 text-muted-foreground">
        {hasAvailableItems ? 'No matching wishes.' : 'All your wishes are already here. Create a new wish to add more.'}
      </p>
    );
  }

  return (
    <ul>
      {items.map((wish) => (
        <ExistingWishOption key={wish.id} wish={wish} onAdd={onAdd} isPending={isPending} />
      ))}
    </ul>
  );
};
