'use client';

import { useRouter } from 'next/navigation';
import { PricesBlock } from '@/entities/prices-block';
import { useAddToMyWishlist, useGetMyWishItem } from '@/pages/wish-list-item-page/model';
import { useGetMyWishlist } from '@/pages/wish-list-page/model';
import { Button } from '@/shared/components/button';
import { useCurrentUser } from '@/shared/hooks/use-get-current-user';
import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';

interface WishListItemPageProps {
  id: string;
}

export const WishListItemPage = ({ id }: WishListItemPageProps) => {
  const router = useRouter();
  const user = useCurrentUser();
  const addItem = useAddToMyWishlist();
  const wish = useGetMyWishItem(id);
  const wishlist = useGetMyWishlist();

  const isInMyWishList =
    user.data?._id === wish.data?.userId || wishlist.data?.filter((item) => item.title === wish.data?.title).length;

  const handleAddToMyWishlist = async () => {
    if (wish.data) {
      await addItem.mutateAsync(wish.data);
    }
  };

  return (
    <>
      <button onClick={() => router.back()} className="flex gap-2 mb-2">
        <ArrowLeftIcon />
        Back
      </button>
      {wish.data && user.data ? (
        <div className="flex w-full max-w-6xl bg-white rounded-md px-12 py-8">
          <div className="w-1/2">
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
            {!isInMyWishList ? (
              <Button onClick={handleAddToMyWishlist} rounded="md">
                Add to my wishlist
              </Button>
            ) : null}
          </div>

          <div className="w-1/2 ml-12">
            <h1 className="text-2xl font-semibold text-[#adadad] mb-4">{wish.data.title}</h1>
            {wish.data.description ? <p>{wish.data.description}</p> : null}
            <div className="text-[#6c757d] mt-4">Added: {new Date(wish.data.date).toLocaleDateString()}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
