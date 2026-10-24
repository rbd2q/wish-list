import type { Control } from 'react-hook-form';
import type { InferType } from 'yup';

import { useMyCollections } from '@/entities/collection';
import { RequestError } from '@/shared/ui/request-error';

import type { wishSchema } from '../../model';

interface CollectionsFieldProps {
  control: Control<InferType<typeof wishSchema>>;
}

// TODO: Update ccomponent
export const CollectionsField = ({ control }: CollectionsFieldProps) => {
  const { data: collections, isLoading, isError, refetch } = useMyCollections();

  const handleRetry = () => {
    refetch();
  };

  return (
    <fieldset className="my-5 min-w-0">
      <legend className="mb-2 font-medium">Collections (optional)</legend>
      {isLoading ? (
        <p role="status">Loading collections…</p>
      ) : isError ? (
        <RequestError message="Could not load collections." onRetry={handleRetry} />
      ) : collections?.length ? (
        collections.map((collection) => {
          return (
            <label key={collection.id} className="flex gap-2 py-2">
              <input type="checkbox" value={collection.id} {...control.register('collectionIds')} />
              {collection.name}
            </label>
          );
        })
      ) : (
        <p>No collections yet. You can save without a collection.</p>
      )}
    </fieldset>
  );
};
