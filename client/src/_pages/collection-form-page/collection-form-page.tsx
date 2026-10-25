'use client';

import { useCollection } from '@/entities/collection';
import { getApiErrorMessage } from '@/shared/api';
import { RequestError } from '@/shared/ui/request-error';

import { CollectionForm, CollectionFormHeader, CollectionFormSkeleton } from './ui';

interface CollectionFormPageProps {
  id?: string;
}

export const CollectionFormPage = ({ id }: CollectionFormPageProps) => {
  const { data: collection, isLoading, isError, error, refetch } = useCollection(id);

  if (id && isLoading) {
    return <CollectionFormSkeleton />;
  }

  if (id && isError) {
    <RequestError message={getApiErrorMessage(error, 'Could not load the collection.')} onRetry={refetch} />;
  }

  if (id && !collection) return <p role="alert">This collection is unavailable.</p>;

  return (
    <div className="flex w-full flex-col gap-6">
      <CollectionFormHeader isEditing={!!id} />
      <CollectionForm key={id ?? 'new'} collection={id ? collection : undefined} />
    </div>
  );
};
