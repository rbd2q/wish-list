import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';

import { useDeleteItem, useMarkAsCompleted } from '@/entities/item-card/model';
import { Button } from '@/shared/components/button';
import { DeleteIcon } from '@/shared/icons/DeleteIcon';
import { WishListItemType } from '@/shared/types';

interface Props {
  item: WishListItemType;
  isIdeasPage?: boolean;
}

export const ItemCard: FC<Props> = ({ item, isIdeasPage }) => {
  const router = useRouter();
  const deleteItem = useDeleteItem();
  const completeItem = useMarkAsCompleted();

  const handleClickItem = async () => {
    await router.push(`wish-list/${item._id}`);
  };

  const handleDeleteItem = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await deleteItem.mutateAsync(item._id);
  };

  const handleMarkAsCompleted = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await completeItem.mutateAsync(item._id);
  };

  return (
    <button
      onClick={handleClickItem}
      className="relative flex items-center justify-center w-[calc(33.3%-12px)] aspect-square border border-gray-300 rounded-lg bg-white bg-contain bg-no-repeat bg-center group"
      style={{
        backgroundImage: item.imageUrl ? `url(${item?.imageUrl})` : 'url("/images/product-image-fallback.svg")',
      }}
    >
      <div className="hidden absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50 group-hover:block" />
      {!isIdeasPage ? (
        <button
          onClick={handleDeleteItem}
          className="hidden group-hover:block absolute top-2 right-2 text-white border border-white rounded-md p-1 hover:bg-red-600 hover:text-white"
        >
          <DeleteIcon />
        </button>
      ) : null}

      <span className="hidden group-hover:block text-white z-10">{item.title}</span>
      {!item.isCompleted && !isIdeasPage ? (
        <div className="hidden group-hover:block absolute bottom-3 right-6 left-6">
          <Button onClick={handleMarkAsCompleted} size="sm" rounded="md">
            Completed
          </Button>
        </div>
      ) : null}
    </button>
  );
};
