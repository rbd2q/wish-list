import { ExternalLink, Pencil } from 'lucide-react';
import { Fragment } from 'react';

import type { WishListItemType } from '@/entities/wish';
import { navigationConfig } from '@/shared/config/navigation';
import { getStoreUrl } from '@/shared/lib/url';
import { ButtonLink } from '@/shared/ui/button-link';

import { CollectionWishMenu } from './collection-wish-menu';

interface CollectionWishActionsProps {
  wish: WishListItemType;
  onRemove: (wishId: string) => void;
  isRemoving: boolean;
}

export const CollectionWishActions = ({ wish, onRemove, isRemoving }: CollectionWishActionsProps) => {
  const storeUrl = getStoreUrl(wish.url);

  return (
    <Fragment>
      {storeUrl ? (
        <ButtonLink
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-8! flex-1 rounded-lg! px-3! py-1! text-xs! [&_svg]:size-3.5!">
          <ExternalLink aria-hidden="true" />
          Visit Store<span className="sr-only"> (opens in a new tab)</span>
        </ButtonLink>
      ) : (
        <span className="flex-1 text-xs text-muted-foreground">{wish.isCompleted ? 'Completed' : 'No store link'}</span>
      )}
      <ButtonLink
        href={navigationConfig.editWish(wish.id)}
        aria-label={`Edit ${wish.title}`}
        className="size-8! min-h-8! rounded-lg! bg-surface-secondary! p-0! text-muted-foreground! [&_svg]:size-4!">
        <Pencil aria-hidden="true" />
      </ButtonLink>
      <CollectionWishMenu wish={wish} onRemove={onRemove} isRemoving={isRemoving} />
    </Fragment>
  );
};
