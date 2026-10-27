import { Skeleton } from '@heroui/react';
import { times } from 'lodash';

export const CollectionWishesSkeleton = () => (
  <div aria-busy="true" className="w-full">
    <span role="status" className="sr-only">
      Loading collection wishes…
    </span>
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {times(4, (index) => (
        <div key={index} aria-hidden="true" className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="aspect-square bg-surface-secondary p-3">
            <Skeleton className="size-full rounded-none motion-reduce:animate-none" />
          </div>
          <div className="flex flex-col gap-2.5 p-4">
            <div className="flex h-10 flex-col gap-1">
              <Skeleton className="h-4 w-full rounded-md motion-reduce:animate-none" />
              <Skeleton className="h-4 w-3/4 rounded-md motion-reduce:animate-none" />
            </div>
            <Skeleton className="h-7 w-28 rounded-md motion-reduce:animate-none" />
            <Skeleton className="h-8 w-full rounded-lg motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
