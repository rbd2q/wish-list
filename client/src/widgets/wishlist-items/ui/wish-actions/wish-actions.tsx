import { ExternalLink } from 'lucide-react';
import { Fragment } from 'react';

import type { WishListItemType } from '@/entities/wish';
import { WishOwnerActions, WishOwnerActionsVariant } from '@/features/manage-wish';
import { getStoreUrl } from '@/shared/lib/url';
import { ButtonLink } from '@/shared/ui/button-link';

interface WishActionsProps {
  item: WishListItemType;
}

export const WishActions = ({ item }: WishActionsProps) => {
  const storeUrl = getStoreUrl(item.url);

  return (
    <Fragment>
      {storeUrl ? (
        <ButtonLink
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 whitespace-nowrap">
          <ExternalLink size={16} aria-hidden="true" />
          Visit store
        </ButtonLink>
      ) : null}
      <WishOwnerActions wish={item} variant={WishOwnerActionsVariant.COMPACT} />
    </Fragment>
  );
};
