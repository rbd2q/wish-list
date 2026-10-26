import { Plus } from 'lucide-react';
import Link from 'next/link';

import { type Collection, CollectionCard } from '@/entities/collection';
import { DeleteCollection } from '@/features/delete-collection';
import { navigationConfig } from '@/shared/config/navigation';

interface CollectionsListProps {
  collections: Collection[];
}

export const CollectionsList = ({ collections }: CollectionsListProps) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {collections.map((collection) => (
      <CollectionCard key={collection.id} collection={collection}>
        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
          <Link
            href={navigationConfig.editCollection(collection.id)}
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`Edit ${collection.name}`}>
            Edit
          </Link>
          <DeleteCollection id={collection.id} name={collection.name} />
        </div>
      </CollectionCard>
    ))}
    <Link
      href={navigationConfig.newCollection}
      className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface p-6 text-center hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Plus className="size-6" aria-hidden="true" />
      </span>
      <span className="font-semibold">Create collection</span>
      <span className="max-w-48 text-sm text-muted-foreground">Organize your wishes into themed groups.</span>
    </Link>
  </div>
);
