'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { type Collection, CollectionColor, CollectionIcon, type CollectionValues } from '@/entities/collection';
import { DeleteCollection } from '@/features/delete-collection';
import { getApiErrorMessage } from '@/shared/api';
import { navigationConfig } from '@/shared/config/navigation';
import { Button } from '@/shared/ui/button';

import { useSaveCollection } from '../api';
import { collectionSchema } from '../model';
import { CollectionColorPicker } from './collection-color-picker';
import { CollectionIconPicker } from './collection-icon-picker';
import { CollectionInformation } from './collection-information';
import { CollectionPreview } from './collection-preview';

interface CollectionFormProps {
  collection?: Collection;
}

export const CollectionForm = ({ collection }: CollectionFormProps) => {
  const { push } = useRouter();
  const { control, register, handleSubmit } = useForm<CollectionValues>({
    resolver: yupResolver(collectionSchema),
    defaultValues: {
      name: collection?.name ?? '',
      description: collection?.description ?? '',
      icon: collection?.icon ?? CollectionIcon.HOUSE,
      color: collection?.color ?? CollectionColor.EMERALD,
    },
  });
  const { mutate: saveCollection, isPending, isError, error } = useSaveCollection(collection?.id);

  const returnToCollections = () => {
    push(navigationConfig.collections);
  };

  const handleFormSubmit = (values: CollectionValues) => {
    if (isPending) return;

    saveCollection(values, { onSuccess: returnToCollections });
  };

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-start">
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)} className="min-w-0">
        <fieldset disabled={isPending} className="min-w-0 space-y-5">
          <CollectionInformation control={control} />
          <CollectionIconPicker register={register} />
          <CollectionColorPicker register={register} />
          {isError && (
            <p role="alert" className="text-sm text-destructive">
              {getApiErrorMessage(error, 'Could not save the collection. Your changes are still here. Try again.')}
            </p>
          )}
          <Button type="submit" isDisabled={isPending} className="w-full">
            {isPending ? 'Saving…' : collection ? 'Save changes' : 'Create collection'}
          </Button>
        </fieldset>
        {collection && (
          <div className="mt-6 border-t border-border pt-6">
            <DeleteCollection
              id={collection.id}
              name={collection.name}
              onDeleted={returnToCollections}
              isDisabled={isPending}
            />
          </div>
        )}
      </form>
      <CollectionPreview control={control} collection={collection} />
    </div>
  );
};
