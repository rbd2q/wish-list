'use client';

import { useCurrentUser } from '@/entities/session';
import { useGetMyWishItem } from '@/entities/wish';
import { RequestError } from '@/shared/ui/request-error';

import { WishDetails, WishDetailsSkeleton, WishPageLayout } from './ui';

interface WishListItemPageProps {
  id: string;
}

export const WishListItemPage = ({ id }: WishListItemPageProps) => {
  const { data: user, isLoading: isLoadingUser, isError: isUserError, refetch: refetchUser } = useCurrentUser();
  const { data: wish, isLoading: isLoadingWish, isError: isWishError, refetch: refetchWish } = useGetMyWishItem(id);

  const isLoading = isLoadingUser || isLoadingWish;
  const isError = isUserError || isWishError;

  const handleRetry = () => {
    refetchWish();
    refetchUser();
  };

  return (
    <WishPageLayout>
      {isLoading ? (
        <WishDetailsSkeleton />
      ) : isError ? (
        <RequestError message="Could not load the wish and your profile." onRetry={handleRetry} />
      ) : !wish || !user ? (
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h1 className="text-xl font-semibold">Wish unavailable</h1>
          <p className="mt-2 text-muted-foreground">This wish does not exist or is no longer public.</p>
        </div>
      ) : (
        <WishDetails wish={wish} preferredCurrency={user.preferredCurrency} isOwner={wish.userId === user.id} />
      )}
    </WishPageLayout>
  );
};
