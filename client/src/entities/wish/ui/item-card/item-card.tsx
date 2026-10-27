import clsx from 'clsx';
import { Gift } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { navigationConfig } from '@/shared/config/navigation';
import { CurrencyEnum, formatPrice } from '@/shared/lib/currency';

import { WishListItemType } from '../../model/types';
import { PriorityBadge } from '../priority-badge';
import { ItemCardVariant } from './item-card-variant';

interface ItemCardProps {
  item: WishListItemType;
  preferredCurrency?: CurrencyEnum;
  action?: ReactNode;
  variant?: ItemCardVariant;
}

export const ItemCard: FC<ItemCardProps> = ({
  item,
  preferredCurrency = CurrencyEnum.USD,
  action,
  variant = ItemCardVariant.DEFAULT,
}) => {
  const isCompact = variant === ItemCardVariant.COMPACT;
  const coverImageUrl = item.imageUrls[0];
  const price = formatPrice(item.prices?.[preferredCurrency], preferredCurrency) ?? 'Price not specified';

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Link
        href={navigationConfig.wish(item.id)}
        aria-label={`View ${item.title}`}
        className={clsx(
          'relative block shrink-0 overflow-hidden bg-surface-secondary',
          isCompact ? 'aspect-square' : 'h-60',
        )}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Gift size={32} aria-hidden="true" />
          <span className="text-sm">Image unavailable</span>
        </div>
        {coverImageUrl ? (
          <img
            key={coverImageUrl}
            src={coverImageUrl}
            alt=""
            loading="lazy"
            className={clsx(
              'absolute bg-surface-secondary',
              isCompact
                ? 'inset-3 h-[calc(100%_-_24px)] w-[calc(100%_-_24px)] object-cover'
                : 'inset-0 h-full max-h-60 w-full object-contain p-3',
            )}
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden';
            }}
          />
        ) : null}
        {isCompact && item.isCompleted ? (
          <span className="absolute bottom-4 left-4 rounded-full bg-surface/95 px-2 py-0.5 text-[10px] font-medium text-foreground">
            Completed
          </span>
        ) : null}
        {isCompact ? (
          <span className="absolute top-4 right-4">
            <PriorityBadge priority={item.priority} className="px-2! py-0.5! text-[10px]!" />
          </span>
        ) : null}
      </Link>
      <div className={clsx('flex flex-1 flex-col', isCompact ? 'gap-2.5 p-4' : 'gap-4 p-4')}>
        <h2
          className={clsx(
            'min-w-0 font-medium wrap-anywhere',
            isCompact ? 'line-clamp-2 min-h-10 text-sm leading-5' : 'text-base',
          )}>
          <Link href={navigationConfig.wish(item.id)} className="hover:underline">
            {item.title}
          </Link>
        </h2>
        <p className={clsx('mt-auto font-semibold', isCompact ? 'text-xl' : 'text-lg')}>{price}</p>
        <div className="flex items-center gap-2">{action}</div>
      </div>
    </article>
  );
};
