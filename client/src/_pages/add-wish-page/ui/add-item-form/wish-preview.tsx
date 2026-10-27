import Image from 'next/image';

import { PriorityBadge, type WishPriority } from '@/entities/wish';
import { CurrencyEnum } from '@/shared/lib/currency';

interface WishPreviewProps {
  priority?: WishPriority;
  imageUrl?: string;
  title?: string;
  price?: string;
  currency?: CurrencyEnum;
  description?: string;
}

export const WishPreview = ({ imageUrl, title, price, currency, description, priority }: WishPreviewProps) => {
  return (
    <aside className="min-w-0">
      <h2 className="mb-3 text-lg font-semibold">Preview</h2>
      <article className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="relative flex aspect-square items-center justify-center bg-surface-secondary">
          {imageUrl ? (
            <Image unoptimized fill src={imageUrl} alt="Wish preview" className="object-contain p-4" />
          ) : (
            <span className="text-muted-foreground">Image unavailable</span>
          )}
        </div>
        <div className="space-y-3 p-5">
          {priority ? <PriorityBadge priority={priority} /> : null}
          <h3 className="text-xl font-semibold wrap-anywhere">{title || 'Wish title'}</h3>
          <p>
            {price || '0'} {currency}
          </p>
          {description ? <p className="whitespace-pre-wrap wrap-anywhere">{description}</p> : null}
        </div>
      </article>
    </aside>
  );
};
