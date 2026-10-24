import { isAxiosError } from 'axios';
import Link from 'next/link';

import { useCurrentUser } from '@/entities/session';
import { isWishInWishlist, PricesBlock, useGetMyWishItem, useGetMyWishlist } from '@/entities/wish';
import { AddToWishlistButton } from '@/features/add-to-wishlist';
import { navigationConfig } from '@/shared/config/navigation';
import { RequestError } from '@/shared/ui/request-error';

import { WishGallery } from './wish-gallery';

interface WishDetailsProps {
  id: string;
}

export const WishDetails = ({ id }: WishDetailsProps) => {
  const { data: user, isLoading: isLoadingUser, isError: isUserError, refetch: refetchUser } = useCurrentUser();
  const {
    data: wish,
    isLoading: isLoadingWish,
    isError: isWishError,
    error: wishError,
    refetch: refetchWish,
  } = useGetMyWishItem(id);
  const { data: wishlist } = useGetMyWishlist();

  const isLoading = isLoadingUser || isLoadingWish;
  const isError = isUserError || isWishError;
  const isNotFound = isAxiosError(wishError) && wishError.response?.status === 404;
  const errorMessage = isNotFound
    ? 'This wish does not exist or is unavailable.'
    : 'Could not load the wish and your profile.';
  const isInMyWishList = user?.id === wish?.userId || (!!wish && isWishInWishlist(wish, wishlist ?? []));

  const handleRetry = () => {
    refetchWish();
    refetchUser();
  };

  if (isLoading) {
    return <p role="status">Loading wish…</p>;
  }

  if (isError) {
    return <RequestError message={errorMessage} onRetry={handleRetry} />;
  }

  if (!wish || !user) {
    return <p>Wish unavailable.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-5 md:grid-cols-2 md:gap-8 md:p-8">
      <div className="min-w-0">
        <WishGallery key={wish.id} images={wish.imageUrls} title={wish.title} />
        <PricesBlock prices={wish.prices} preferredCurrency={user.preferredCurrency} />
        <a
          target="_blank"
          className="block text-center w-full bg-amber-300 rounded-md px-6 py-2 mt-8 mb-4"
          href={wish.url}
          rel="noreferrer">
          View source
        </a>
        {!isInMyWishList ? <AddToWishlistButton wish={wish} /> : null}
      </div>

      <div className="min-w-0">
        {wish.userId === user.id ? (
          <Link href={navigationConfig.editWish(wish.id)} className="mb-4 inline-block underline">
            Edit wish
          </Link>
        ) : null}
        <h1 className="text-2xl font-semibold mb-4">{wish.title}</h1>
        {wish.description ? <p>{wish.description}</p> : null}
        <div className="text-[#6c757d] mt-4">Added: {new Date(wish.date).toLocaleDateString()}</div>
      </div>
    </div>
  );
};
