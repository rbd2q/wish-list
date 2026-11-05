'use client';

import { RequestError } from '@/shared/ui/request-error';
import { WishlistItems, WishlistItemsSkeleton } from '@/widgets/wishlist-items';

import { useProfileDetails } from './model';
import { ProfileEmpty, ProfileHeader, ProfileHeaderSkeleton, ProfileRecentHeader } from './ui';

export const ProfilePage = () => {
  const { user, stats, recentWishes, total, isLoading, isError, handleRetry } = useProfileDetails();

  if (!isLoading && (isError || !user || !stats)) {
    return <RequestError message="Could not load your profile." onRetry={handleRetry} />;
  }

  return (
    <div className="-mt-8 flex w-[100cqw] self-center flex-col">
      {isLoading || !user || !stats ? (
        <ProfileHeaderSkeleton />
      ) : (
        <ProfileHeader user={user} wishCount={stats.wishCount} collectionCount={stats.collectionCount} total={total} />
      )}
      <section
        className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-5 py-8 md:px-8"
        aria-labelledby="recent-wishes-heading">
        <ProfileRecentHeader />
        {isLoading ? (
          <WishlistItemsSkeleton />
        ) : recentWishes.length ? (
          <WishlistItems items={recentWishes} preferredCurrency={stats?.currency} showPriority={false} />
        ) : (
          <ProfileEmpty />
        )}
      </section>
    </div>
  );
};
