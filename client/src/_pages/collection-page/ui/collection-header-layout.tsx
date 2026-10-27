import { ArrowLeft, Pencil, Plus } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { WishListItemType } from '@/entities/wish';
import { navigationConfig } from '@/shared/config/navigation';
import { ButtonLink } from '@/shared/ui/button-link';

import { AddExistingWishes } from './add-existing-wishes';

interface CollectionHeaderLayoutProps {
  collectionId: string;
  wishes: WishListItemType[];
  isDisabled: boolean;
  children: ReactNode;
}

export const CollectionHeaderLayout = ({ collectionId, wishes, isDisabled, children }: CollectionHeaderLayoutProps) => (
  <header className="w-full border-b border-border bg-surface">
    <div className="mx-auto w-full max-w-[1344px] px-5 pt-6 pb-6 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={navigationConfig.collections}
          className="inline-flex min-h-8 items-center gap-2 text-xs text-muted-foreground hover:text-primary hover:underline">
          <ArrowLeft size={14} aria-hidden="true" />
          All Collections
        </Link>
        <ButtonLink
          href={navigationConfig.addWishToCollection(collectionId)}
          className="min-h-8! rounded-2xl! px-4! py-1.5! text-xs! [&_svg]:size-3.5!">
          <Plus aria-hidden="true" />
          Add Item
        </ButtonLink>
      </div>
      <div className="mt-6 flex flex-wrap items-start gap-4">
        {children}
        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:self-end">
          <AddExistingWishes items={wishes} collectionId={collectionId} isDisabled={isDisabled} />
          <Link
            href={navigationConfig.editCollection(collectionId)}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2 text-xs text-muted-foreground hover:bg-surface-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
            <Pencil size={14} aria-hidden="true" />
            Edit collection
          </Link>
        </div>
      </div>
    </div>
  </header>
);
