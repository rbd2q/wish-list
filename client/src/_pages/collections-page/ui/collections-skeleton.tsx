import { times } from 'lodash';

export const CollectionsSkeleton = () => (
  <div role="status" aria-label="Loading collections" className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {times(3, (index) => {
      return <div key={index} className="h-80 rounded-2xl bg-surface-secondary motion-safe:animate-pulse" />;
    })}
    <span className="sr-only">Loading collections…</span>
  </div>
);
