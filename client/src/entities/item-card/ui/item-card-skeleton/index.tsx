import { Skeleton } from '@heroui/react';

export const ItemCardSkeleton = () => (
  <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-border bg-surface">
    <Skeleton className="h-60 w-full rounded-none motion-reduce:animate-none" />
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-full rounded-md motion-reduce:animate-none" />
        <Skeleton className="h-5 w-3/4 rounded-md motion-reduce:animate-none" />
      </div>
      <Skeleton className="mt-2 h-6 w-28 rounded-md motion-reduce:animate-none" />
      <Skeleton className="h-12 w-full rounded-xl motion-reduce:animate-none" />
    </div>
  </div>
);
