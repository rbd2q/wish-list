import clsx from 'clsx';

import type { WishListItemType } from '@/entities/wish';
import type { CurrencyEnum } from '@/shared/lib/currency';

import { useIdeasMasonry } from '../model';
import { IdeasCard } from './ideas-card';

interface IdeasGridProps {
  items: WishListItemType[];
  preferredCurrency: CurrencyEnum;
}

export const IdeasGrid = ({ items, preferredCurrency }: IdeasGridProps) => {
  const { containerRef, height, positions, columnWidth } = useIdeasMasonry(items);

  return (
    <div
      ref={containerRef}
      role="list"
      className="relative grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-3"
      style={{ height }}>
      {items.map((item, index) => {
        const position = positions[index];

        return (
          <div
            key={item.id}
            role="listitem"
            className={clsx('min-w-0', position && 'absolute')}
            style={{
              width: columnWidth,
              top: position?.top,
              left: position?.left,
            }}>
            <IdeasCard item={item} preferredCurrency={preferredCurrency} />
          </div>
        );
      })}
    </div>
  );
};
