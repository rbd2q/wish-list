import { useId } from 'react';
import { type Control, useController } from 'react-hook-form';
import type { InferType } from 'yup';

import { CollectionOptions, useMyCollections } from '@/entities/collection';
import { FormError } from '@/shared/ui/form-error';
import { RequestError } from '@/shared/ui/request-error';

import type { wishSchema } from '../../model';

interface FormCollectionOptionsProps {
  control: Control<InferType<typeof wishSchema>>;
}

export const FormCollectionOptions = ({ control }: FormCollectionOptionsProps) => {
  const errorId = useId();
  const { data: collections = [], isLoading, isError, refetch } = useMyCollections();
  const {
    field: { name, value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name: 'collectionIds', control });

  const handleRetry = () => {
    void refetch();
  };

  if (isLoading) {
    return <p role="status">Loading collections…</p>;
  }

  if (isError) {
    return <RequestError message="Could not load collections." onRetry={handleRetry} />;
  }

  if (!collections.length) {
    return <p>No collections yet. You can save without a collection.</p>;
  }

  return (
    <div>
      <CollectionOptions
        collections={collections}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        isInvalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <FormError id={errorId}>{error.message}</FormError>}
    </div>
  );
};
