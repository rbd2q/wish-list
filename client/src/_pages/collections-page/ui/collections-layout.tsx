import { LayoutGrid, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { navigationConfig } from '@/shared/config/navigation';
import { ButtonLink } from '@/shared/ui/button-link';

interface CollectionsLayoutProps {
  children: ReactNode;
}

export const CollectionsLayout = ({ children }: CollectionsLayoutProps) => (
  <div className="flex w-full flex-col gap-6">
    <header className="-mt-8 w-[100cqw] self-center border-b border-border bg-surface">
      <div className="mx-auto flex min-h-24 max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LayoutGrid className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">Collections</h1>
            <p className="mt-1 text-sm text-muted-foreground">Organize your wishlist by theme</p>
          </div>
        </div>
        <ButtonLink
          href={navigationConfig.newCollection}
          className="min-h-10! rounded-2xl! px-4! py-2! shadow-sm! [&_svg]:size-4!">
          <Plus className="size-4" aria-hidden="true" />
          New Collection
        </ButtonLink>
      </div>
    </header>
    {children}
  </div>
);
