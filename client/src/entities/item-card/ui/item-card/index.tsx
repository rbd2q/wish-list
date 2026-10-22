import { Check, ExternalLink, Gift } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { Button } from '@/shared/components/button';
import { ButtonLink } from '@/shared/components/button-link';
import { DeleteIcon } from '@/shared/icons/DeleteIcon';
import { CurrencyEnum, WishListItemType } from '@/shared/types';

import { useDeleteItem, useMarkAsCompleted } from '../../model';

interface Props {
  item: WishListItemType;
  isIdeasPage?: boolean;
  preferredCurrency?: CurrencyEnum;
  action?: ReactNode;
}

export const ItemCard: FC<Props> = ({ item, isIdeasPage, preferredCurrency = 'USD', action }) => {
  const deleteItem = useDeleteItem();
  const completeItem = useMarkAsCompleted();
  const isPending = deleteItem.isPending || completeItem.isPending;
  const price = item.prices?.[preferredCurrency];
  const storeUrl = item.url && /^https?:\/\//i.test(item.url) ? item.url : undefined;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Link
        href={`/wish-list/${item.id}`}
        aria-label={`View ${item.title}`}
        className="relative block h-60 shrink-0 overflow-hidden bg-surface-secondary"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Gift size={32} aria-hidden="true" />
          <span className="text-sm">Image unavailable</span>
        </div>
        {item.imageUrl ? (
          <img
            key={item.imageUrl}
            src={item.imageUrl}
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
          <Link href={`/wish-list/${item.id}`} className="hover:underline">
            {item.title}
          </Link>
        </h2>
        <p className="mt-auto text-lg font-semibold">
          {Number.isFinite(price)
            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: preferredCurrency }).format(price)
            : 'Price not specified'}
        </p>
        <div className="flex items-center gap-2">
          {action}
          {!isIdeasPage && storeUrl ? (
            <ButtonLink
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 flex-1 whitespace-nowrap"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Visit store
            </ButtonLink>
          ) : null}
          {!isIdeasPage ? (
            <div className="flex shrink-0 items-center gap-2">
              {!item.isCompleted ? (
                <Button
                  size="sm"
                  variant="secondary"
                  isIconOnly
                  isDisabled={isPending}
                  aria-label={`Complete ${item.title}`}
                  onPress={() => completeItem.mutate(item.id)}
                >
                  <Check size={18} aria-hidden="true" />
                </Button>
              ) : (
                <span className="flex h-10 w-12 items-center justify-center text-primary" title="Completed">
                  <Check size={18} aria-hidden="true" />
                  <span className="sr-only">Completed</span>
                </span>
              )}
              <Button
                size="sm"
                variant="secondary"
                isIconOnly
                isDisabled={isPending}
                aria-label={`Delete ${item.title}`}
                onPress={() => deleteItem.mutate(item.id)}
              >
                <DeleteIcon />
              </Button>
              {isPending ? (
                <span role="status" className="sr-only">
                  Saving…
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};
