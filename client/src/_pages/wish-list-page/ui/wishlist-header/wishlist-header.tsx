import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { navigationConfig } from '@/shared/config/navigation';
import { ButtonLink } from '@/shared/ui/button-link';

interface WishlistHeaderProps {
  activeCount: number;
  completedCount: number;
  isUnavailable: boolean;
  children: ReactNode;
}

export const WishlistHeader = ({ activeCount, completedCount, isUnavailable, children }: WishlistHeaderProps) => (
  <header className="-mt-8 w-[100cqw] self-center border-b border-border bg-surface">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-5 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
      </div>
      {children}
    </div>
  </header>
);
