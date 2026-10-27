import { Skeleton } from '@heroui/react';

interface CollectionStatsSkeletonProps {
  wishCount?: number;
}

export const CollectionStatsSkeleton = ({ wishCount }: CollectionStatsSkeletonProps) => (
  <div
    className="mt-2 grid grid-cols-[auto_auto] justify-start gap-x-4 gap-y-1 text-xs leading-4 text-muted-foreground sm:flex sm:flex-wrap"
    role="status"
    aria-busy="true">
    <div className="min-h-4">
      {wishCount === undefined ? (
        <Skeleton className="h-4 w-12 rounded-md motion-reduce:animate-none" />
      ) : (
        `${wishCount} ${wishCount === 1 ? 'item' : 'items'}`
      )}
    </div>
    <Skeleton className="h-4 w-28 rounded-md motion-reduce:animate-none" />
    <Skeleton className="h-4 w-24 rounded-md motion-reduce:animate-none" />
  </div>
);
