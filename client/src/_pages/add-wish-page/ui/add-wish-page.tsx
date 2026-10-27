'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCurrentUser } from '@/entities/session';
import { useGetMyWishItem } from '@/entities/wish';
import { navigationConfig } from '@/shared/config/navigation';
import { RequestError } from '@/shared/ui/request-error';

import { AddItemForm } from './add-item-form';

interface AddWishPageProps {
  id?: string;
}

export const AddWishPage = ({ id }: AddWishPageProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const collectionId = searchParams.get('collectionId') ?? undefined;

  const { data: wish, isLoading, isError, refetch } = useGetMyWishItem(id ?? '');
  const { data: user, isLoading: isUserLoading, isError: isUserError, refetch: refetchUser } = useCurrentUser();

  const returnToWishlist = () => {
    push(
      id
        ? navigationConfig.wish(id)
        : collectionId
          ? navigationConfig.collection(collectionId)
          : navigationConfig.wishlist,
    );
  };

  const handleRetry = () => {
    refetch();
    refetchUser();
  };

  if (id && (isLoading || isUserLoading)) {
    return (
      <div role="status" className="flex min-h-64 w-full flex-col items-center justify-center gap-3">
        <LoaderCircle aria-hidden="true" className="size-10 animate-spin text-primary motion-reduce:animate-none" />
        <span>Loading wish…</span>
      </div>
    );
  }

  if (id && (isError || isUserError)) {
    return (
      <RequestError
        message={isUserError ? 'Could not load your profile. Try again to edit this wish.' : 'Could not load the wish.'}
        onRetry={handleRetry}
      />
    );
  }

  // TODO: Replace with middleware
  if (id && (!wish || wish.userId !== user?.id)) return <p>This wish is unavailable for editing.</p>;

  return (
    <AddItemForm key={id ?? 'new'} wish={id ? wish : undefined} collectionId={collectionId} onBack={returnToWishlist} />
  );
};
