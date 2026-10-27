import { Skeleton } from '@heroui/react';

import { CollectionHeaderLayout } from './collection-header-layout';
import { CollectionStatsSkeleton } from './collection-stats-skeleton';

interface CollectionHeaderSkeletonProps {
  collectionId: string;
}

export const CollectionHeaderSkeleton = ({ collectionId }: CollectionHeaderSkeletonProps) => (
  <CollectionHeaderLayout collectionId={collectionId} wishes={[]} isDisabled>
    <Skeleton className="size-16 shrink-0 rounded-2xl motion-reduce:animate-none" />
    <div className="min-w-0 flex-1" aria-busy="true">
      <h1 className="sr-only">Loading collection…</h1>
      <Skeleton className="h-8 w-36 max-w-full rounded-md motion-reduce:animate-none" />
      <div className="mt-1 min-h-5">
        <Skeleton className="h-5 w-52 max-w-full rounded-md motion-reduce:animate-none" />
      </div>
      <CollectionStatsSkeleton />
    </div>
  </CollectionHeaderLayout>
);
