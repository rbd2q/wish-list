import clsx from 'clsx';
import { FC, useState } from 'react';

import { ItemCard } from '@/entities/item-card';
import { Button } from '@/shared/components/button';
import { EmptyBlock } from '@/shared/components/empty-block';
import { WishListItemType } from '@/shared/types';

type ActiveItemsType = 'not_completed' | 'completed';

interface Props {
  items: WishListItemType[] | undefined;
  isLoading: boolean;
  isIdeasPage?: boolean;
  handleShowForm?: () => void;
}

export const WishlistItems: FC<Props> = ({ items, isLoading, isIdeasPage, handleShowForm }) => {
  const [activeSection, setActiveSection] = useState<ActiveItemsType>('not_completed');

  const displayedItems = isIdeasPage
    ? items
    : items?.filter((item) => (activeSection === 'not_completed' ? !item.isCompleted : item.isCompleted));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return items?.length ? (
    <div className="w-full flex flex-col flex-1 items-center">
      {!isIdeasPage ? (
        <>
          <Button onClick={handleShowForm}>Add item</Button>

          <div className="flex gap-4 mt-8 text-start">
            <button
              className={clsx(
                'font-semibold text-lg text-[#adadad]',
                activeSection === 'not_completed' && 'text-black',
              )}
              onClick={() => setActiveSection('not_completed')}
            >
              Active
            </button>
            <button
              className={clsx('font-semibold text-lg text-[#adadad]', activeSection === 'completed' && 'text-black')}
              onClick={() => setActiveSection('completed')}
            >
              Completed
            </button>
          </div>
        </>
      ) : null}

      {displayedItems?.length ? (
        <div className="flex gap-3 w-full flex-wrap mt-6">
          {displayedItems?.map((item) => (
            <ItemCard key={item._id} item={item} isIdeasPage={isIdeasPage} />
          ))}
        </div>
      ) : (
        <EmptyBlock />
      )}
    </div>
  ) : (
    <div className="h-full max-w-md mx-auto flex flex-col items-center justify-center">
      <EmptyBlock />
      <Button onClick={handleShowForm}>Add item</Button>
    </div>
  );
};
