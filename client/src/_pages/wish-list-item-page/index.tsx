'use client';

import { useRouter } from 'next/navigation';

import { useGetMyWishItem } from '@/_pages/wish-list-item-page/model';
import { useGetMyWishlist } from '@/_pages/wish-list-page/model';
import { PricesBlock } from '@/entities/prices-block';
import { AddToWishlistButton } from '@/features/add-to-wishlist';
import { useCurrentUser } from '@/shared/hooks/use-get-current-user';
import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';

interface WishListItemPageProps {
  id: string;
}

export const WishListItemPage = ({ id }: WishListItemPageProps) => {
  const router = useRouter();
  const user = useCurrentUser();
  const wish = useGetMyWishItem(id);
  const wishlist = useGetMyWishlist();

  const isInMyWishList =
    user.data?.id === wish.data?.userId || wishlist.data?.filter((item) => item.title === wish.data?.title).length;

  return (
    <>
      <button type="button" onClick={() => router.back()} className="flex gap-2 mb-2">
        <ArrowLeftIcon />
        Back
      </button>
      {wish.data && user.data ? (
        <div className="grid w-full grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-5 md:grid-cols-2 md:gap-8 md:p-8">
          <div className="min-w-0">
            <img
              className="w-full aspect-auto mb-6"
              src={wish.data.imageUrl || '/images/product-image-fallback.svg'}
              alt="Wish list item"
            />
            <PricesBlock prices={wish.data.prices} preferredCurrency={user.data.preferredCurrency} />
            <a
              target="_blank"
              className="block text-center w-full bg-amber-300 rounded-md px-6 py-2 mt-8 mb-4"
              href={wish.data.url}
              rel="noreferrer"
            >
              View source
            </a>
            {!isInMyWishList ? <AddToWishlistButton wish={wish.data} /> : null}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-semibold mb-4">{wish.data.title}</h1>
            {wish.data.description ? <p>{wish.data.description}</p> : null}
            <div className="text-[#6c757d] mt-4">Added: {new Date(wish.data.date).toLocaleDateString()}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
