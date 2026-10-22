import { Plus } from 'lucide-react';

import { ButtonLink } from '@/shared/components/button-link';
import { navigationConfig } from '@/shared/config/navigation';

interface Props {
  activeCount: number;
  completedCount: number;
  isUnavailable: boolean;
}

export const WishlistHeader = ({ activeCount, completedCount, isUnavailable }: Props) => (
  <header className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold md:text-3xl">My Wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {isUnavailable ? 'Your wishes in one place' : `${activeCount} active · ${completedCount} completed`}
      </p>
    </div>
    <div className="md:hidden">
      <ButtonLink href={navigationConfig.addWish}>
        <Plus size={18} aria-hidden="true" />
        Add item
      </ButtonLink>
    </div>
  </header>
);
