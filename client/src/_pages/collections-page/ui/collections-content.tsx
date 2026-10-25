'use client';

import { FolderPlus } from 'lucide-react';

import { useMyCollections } from '@/entities/collection';
import { navigationConfig } from '@/shared/config/navigation';
import { ButtonLink } from '@/shared/ui/button-link';
import { RequestError } from '@/shared/ui/request-error';

import { CollectionsList } from './collections-list';
import { CollectionsSkeleton } from './collections-skeleton';

export const CollectionsContent = () => {
  const { data: collections = [], isLoading, isError, refetch } = useMyCollections();

  if (isLoading) {
    return <CollectionsSkeleton />;
  }

  if (isError) {
    return <RequestError message="Could not load your collections." onRetry={refetch} />;
  }

  if (!collections.length) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-14 text-center">
        <FolderPlus className="size-10 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Your first collection starts here</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Group wishes by theme, event, or person. All collections are personal.
        </p>
        <ButtonLink href={navigationConfig.newCollection}>Create collection</ButtonLink>
      </div>
    );
  }

  return <CollectionsList collections={collections} />;
};
