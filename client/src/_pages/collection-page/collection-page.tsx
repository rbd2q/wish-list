'use client';

import { RequestError } from '@/shared/ui/request-error';

import { useChangeMembership } from './api';
import { MembershipAction, useCollectionDetails } from './model';
import { CollectionContent, CollectionHeader, CollectionHeaderSkeleton } from './ui';

interface CollectionPageProps {
  id: string;
}

export const CollectionPage = ({ id }: CollectionPageProps) => {
  const {
    collection,
    wishes,
    items,
    currency,
    total,
    highPriorityCount,
    areWishesAvailable,
    isLoading,
    isError,
    isWishesLoading,
    isWishesError,
    handleRetry,
  } = useCollectionDetails(id);
  const { mutate: changeMembership, isPending: isRemoving } = useChangeMembership(id);

  const handleRemoveWish = (wishId: string) => {
    changeMembership({ wishId, action: MembershipAction.REMOVE });
  };

  if (!isLoading && (isError || !collection)) {
    return <RequestError message="Could not load the collection." onRetry={handleRetry} />;
  }

  return (
    <div className="-mt-8 flex w-[100cqw] self-center flex-col">
      {collection ? (
        <CollectionHeader
          collection={collection}
          wishes={wishes}
          areWishesAvailable={areWishesAvailable}
          isWishesLoading={isWishesLoading}
          total={total}
          highPriorityCount={highPriorityCount}
        />
      ) : (
        <CollectionHeaderSkeleton collectionId={id} />
      )}
      <div className="mx-auto w-full max-w-[1280px] px-5 py-6 md:px-8">
        <CollectionContent
          items={items}
          currency={currency}
          isLoading={isLoading || isWishesLoading}
          isError={isWishesError}
          isRemoving={isRemoving}
          onRemove={handleRemoveWish}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
};
