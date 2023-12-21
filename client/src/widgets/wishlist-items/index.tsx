import { FC } from 'react';

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
              <button
                key={item._id}
                className="relative flex items-center justify-center w-[calc(33.3%-12px)] aspect-square border border-gray-300 rounded-lg bg-white bg-contain bg-no-repeat bg-center group"
                style={{
                  backgroundImage: item.imageUrl
                    ? `url(${item?.imageUrl})`
                    : 'url("/images/product-image-fallback.svg")',
                }}
              >
                <div className="hidden absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50 group-hover:block" />
                <span className="hidden group-hover:block text-white z-10">{item.title}</span>
              </button>
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
