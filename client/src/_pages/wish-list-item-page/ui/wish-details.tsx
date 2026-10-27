import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PricesBlock, type WishListItemType } from '@/entities/wish';
import { AddToWishlistButton } from '@/features/add-to-wishlist';
import { WishOwnerActions } from '@/features/manage-wish';
import { navigationConfig } from '@/shared/config/navigation';
import type { CurrencyEnum } from '@/shared/lib/currency';
import { getStoreUrl } from '@/shared/lib/url';
import { ButtonLink } from '@/shared/ui/button-link';

import { WishAddedDate } from './wish-added-date';
import { WishCollections } from './wish-collections';
import { WishDescription } from './wish-description';
import { WishGallery } from './wish-gallery';
import { WishSource } from './wish-source';

interface WishDetailsProps {
  wish: WishListItemType;
  preferredCurrency: CurrencyEnum;
  isOwner: boolean;
}

export const WishDetails = ({ wish, preferredCurrency, isOwner }: WishDetailsProps) => {
  const { replace } = useRouter();

  const sourceUrl = getStoreUrl(wish.url);
  const collectionIds = wish.collectionIds ?? [];
  const hasCollections = isOwner && !!collectionIds.length;

  const handleDeleted = () => replace(navigationConfig.wishlist);

  return (
    <article className="grid min-w-0 grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
      <WishGallery key={wish.id} images={wish.imageUrls} title={wish.title} />
      <div className="min-w-0 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold leading-tight wrap-anywhere lg:text-3xl">{wish.title}</h1>
          <PricesBlock prices={wish.prices} preferredCurrency={preferredCurrency} />
        </div>
        <WishDescription description={wish.description} />
        <WishSource sourceUrl={sourceUrl} />
        <WishAddedDate date={wish.date} />
        {hasCollections ? <WishCollections collectionIds={collectionIds} /> : null}
        <div className="space-y-3">
          {sourceUrl ? (
            <ButtonLink href={sourceUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <ShoppingBag size={18} aria-hidden="true" />
              Visit store
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          ) : null}
          {isOwner ? <WishOwnerActions wish={wish} onDeleted={handleDeleted} /> : <AddToWishlistButton wish={wish} />}
        </div>
      </div>
    </article>
  );
};
