import { Skeleton } from '@heroui/react';
import { times } from 'lodash';

export const ProfileHeaderSkeleton = () => (
  <header className="border-b border-border bg-surface" aria-busy="true">
    <div className="mx-auto w-full max-w-[1200px] px-5 py-8 md:px-8">
      <h1 className="sr-only" role="status">
        Loading profile…
      </h1>
      <div className="flex items-center gap-4 sm:gap-6" aria-hidden="true">
        <Skeleton className="size-20 shrink-0 rounded-2xl motion-reduce:animate-none sm:size-24" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-7 w-44 max-w-full rounded-md motion-reduce:animate-none" />
          <Skeleton className="h-5 w-60 max-w-full rounded-md motion-reduce:animate-none" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" aria-hidden="true">
        {times(4, (index) => (
          <Skeleton
            key={index}
            className="h-[84px] rounded-2xl motion-reduce:animate-none last:col-span-2 sm:last:col-span-1"
          />
        ))}
      </div>
    </div>
  </header>
);
