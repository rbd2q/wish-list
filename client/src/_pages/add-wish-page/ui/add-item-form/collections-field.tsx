import type { Control } from 'react-hook-form';
import type { InferType } from 'yup';

import type { wishSchema } from '../../model';
import { FormCollectionOptions } from './form-collection-options';

interface CollectionsFieldProps {
  control: Control<InferType<typeof wishSchema>>;
}

export const CollectionsField = ({ control }: CollectionsFieldProps) => (
  <fieldset className="my-5 min-w-0">
    <legend className="mb-2 font-medium">Collections (optional)</legend>
    <FormCollectionOptions control={control} />
  </fieldset>
);
