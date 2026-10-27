import { Fragment } from 'react';

import { EmptyBlock } from '@/shared/ui/empty-block';

import { WishlistSection } from '../../enums';

interface Props {
  hasFilters: boolean;
  hasWishes: boolean;
  section: WishlistSection;
}

export const WishlistEmpty = ({ hasFilters, hasWishes, section }: Props) => (
  <div className="grid flex-1 content-center justify-items-center px-4 py-10 text-center">
    {hasFilters ? (
      <Fragment>
        <p className="font-medium">No matching wishes</p>
        <p className="mt-2 text-sm text-muted-foreground">Try another title, collection, priority, or status filter.</p>
      </Fragment>
    ) : (
      <Fragment>
        <EmptyBlock />
        <p className="text-sm text-muted-foreground">
          {!hasWishes
            ? 'Add your first wish to get started.'
            : section === WishlistSection.COMPLETED
              ? 'Your completed wishes will appear here.'
              : 'You have no active wishes.'}
        </p>
      </Fragment>
    )}
  </div>
);
