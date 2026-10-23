'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { useCurrentUser } from '@/entities/session';
import { PricesBlock, useGetMyWishItem, useGetMyWishlist } from '@/entities/wish';
import { AddToWishlistButton } from '@/features/add-to-wishlist';

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
    <Fragment>
      <button type="button" onClick={() => router.back()} className="flex gap-2 mb-2">
        <ArrowLeft size={24} aria-hidden="true" />
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
              rel="noreferrer">
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
    </Fragment>
  );
};
