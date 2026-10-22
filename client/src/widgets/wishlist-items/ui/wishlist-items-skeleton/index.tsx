import { times } from 'lodash';

import { ItemCardSkeleton } from '@/entities/item-card';

export const WishlistItemsSkeleton = () => {
  return (
    <div aria-busy="true" className="w-full">
      <span role="status" className="sr-only">
        Loading wishes…
      </span>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,288px),1fr))] gap-4">
        {times(6, (index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
