import Link from 'next/link';

import type { WishListItemType } from '@/entities/wish';
import { navigationConfig } from '@/shared/config/navigation';
import { type CurrencyEnum, formatPrice } from '@/shared/lib/currency';

import { IdeasImage } from './ideas-image';

interface IdeasCardProps {
  item: WishListItemType;
  preferredCurrency: CurrencyEnum;
}

export const IdeasCard = ({ item, preferredCurrency }: IdeasCardProps) => {
  const coverImageUrl = item.imageUrls[0];
  const price = formatPrice(item.prices?.[preferredCurrency], preferredCurrency) ?? 'Price not specified';

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface">
      <Link
        href={navigationConfig.wish(item.id)}
        className="group block rounded-2xl outline-offset-[-3px] focus-visible:outline-2 focus-visible:outline-primary">
        <div className="min-h-24 overflow-hidden bg-surface-secondary">
          <IdeasImage key={coverImageUrl} src={coverImageUrl} />
        </div>
        <div className="space-y-2 p-3">
          <h2 className="text-sm font-medium leading-snug wrap-anywhere group-hover:underline">{item.title}</h2>
          <p className="text-right text-xs text-muted-foreground">{price}</p>
        </div>
      </Link>
    </article>
  );
};
