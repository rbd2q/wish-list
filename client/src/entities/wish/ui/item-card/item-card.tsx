import { Gift } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { navigationConfig } from '@/shared/config/navigation';
import { CurrencyEnum } from '@/shared/lib/currency';

import { WishListItemType } from '../../model/types';

interface ItemCardProps {
  item: WishListItemType;
  preferredCurrency?: CurrencyEnum;
  action?: ReactNode;
}

export const ItemCard: FC<ItemCardProps> = ({ item, preferredCurrency = CurrencyEnum.USD, action }) => {
  const coverImageUrl = item.imageUrls[0];
  const price = item.prices?.[preferredCurrency];

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Link
        href={navigationConfig.wish(item.id)}
        aria-label={`View ${item.title}`}
        className="relative block h-60 shrink-0 overflow-hidden bg-surface-secondary">
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
            className="absolute inset-0 h-full max-h-60 w-full object-contain bg-surface-secondary p-3"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden';
            }}
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h2 className="min-w-0 text-base font-medium wrap-anywhere">
          <Link href={navigationConfig.wish(item.id)} className="hover:underline">
            {item.title}
          </Link>
        </h2>
        <p className="mt-auto text-lg font-semibold">
          {Number.isFinite(price)
            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: preferredCurrency }).format(price)
            : 'Price not specified'}
        </p>
        <div className="flex items-center gap-2">{action}</div>
      </div>
    </article>
  );
};
