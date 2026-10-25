import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { navigationConfig } from '@/shared/config/navigation';
import { ButtonLink } from '@/shared/ui/button-link';

interface CollectionsLayoutProps {
  children: ReactNode;
}

export const CollectionsLayout = ({ children }: CollectionsLayoutProps) => (
  <div className="w-full space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold">Collections</h1>
        <p className="mt-2 text-sm text-muted-foreground">Organize your wishes into personal collections.</p>
      </div>
      <ButtonLink href={navigationConfig.newCollection}>
        <Plus className="size-5" aria-hidden="true" />
        New collection
      </ButtonLink>
    </header>
    {children}
  </div>
);
