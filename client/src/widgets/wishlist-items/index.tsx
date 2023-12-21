import { FC } from 'react';

import { ItemCard } from '@/entities/item-card';
import { Button } from '@/shared/components/button';
import { EmptyBlock } from '@/shared/components/empty-block';
import { WishListItemType } from '@/shared/types';

interface Props {
  items: WishListItemType[] | undefined;
  isLoading: boolean;
  handleShowForm: () => void;
}

export const WishlistItems: FC<Props> = ({ items, isLoading, handleShowForm }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {items?.length ? (
        <div className="w-full flex flex-col items-center">
          <Button onClick={handleShowForm}>Add item</Button>
          <div className="flex gap-3 w-full flex-wrap mt-8">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full max-w-md mx-auto flex flex-col items-center justify-center">
          <EmptyBlock />
          <Button onClick={handleShowForm}>Add item</Button>
        </div>
      )}
    </>
  );
};
