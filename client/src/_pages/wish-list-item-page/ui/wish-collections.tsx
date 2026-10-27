import clsx from 'clsx';
import Link from 'next/link';

import { COLLECTION_COLOR_CLASSES, useMyCollections } from '@/entities/collection';
import { navigationConfig } from '@/shared/config/navigation';
import { RequestError } from '@/shared/ui/request-error';

interface WishCollectionsProps {
  collectionIds: string[];
}

export const WishCollections = ({ collectionIds }: WishCollectionsProps) => {
  const { data: collections = [], isLoading, isError, refetch } = useMyCollections();

  if (!collectionIds.length) return null;

  if (isLoading) return <p role="status">Loading collections…</p>;

  if (isError) return <RequestError message="Could not load wish collections." onRetry={refetch} />;

  const selectedCollections = collections.filter((collection) => collectionIds.includes(collection.id));

  if (!selectedCollections.length) return null;

  return (
    <section aria-label="Wish collections">
      <h2 className="mb-2 font-medium">Collections</h2>
      <div className="flex flex-wrap gap-2">
        {selectedCollections.map((collection) => (
          <Link
            key={collection.id}
            href={navigationConfig.collection(collection.id)}
            className={clsx(
              'inline-flex min-h-11 items-center rounded-xl px-3 text-sm wrap-anywhere hover:underline',
              COLLECTION_COLOR_CLASSES[collection.color],
            )}>
            {collection.name}
          </Link>
        ))}
      </div>
    </section>
  );
};
