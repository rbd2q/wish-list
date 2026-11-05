import { Heart, Plus } from 'lucide-react';

import { navigationConfig } from '@/shared/config/navigation';
import { ButtonLink } from '@/shared/ui/button-link';

export const ProfileEmpty = () => (
  <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-12 text-center">
    <Heart className="size-10 text-primary" aria-hidden="true" />
    <h3 className="text-xl font-semibold">Your wishlist starts here</h3>
    <p className="max-w-md text-sm text-muted-foreground">Add your first wish and find your latest items here.</p>
    <ButtonLink href={navigationConfig.addWish}>
      <Plus className="size-4" aria-hidden="true" />
      Add item
    </ButtonLink>
  </div>
);
