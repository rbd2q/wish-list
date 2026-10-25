import type { Control } from 'react-hook-form';

import type { CollectionValues } from '@/entities/collection';
import { FormField } from '@/shared/ui/form-field';
import { FormInput } from '@/shared/ui/form-input';
import { FormTextarea } from '@/shared/ui/form-textarea';

import { COLLECTION_FORM_CONFIG } from '../config';

interface CollectionInformationProps {
  control: Control<CollectionValues>;
}

export const CollectionInformation = ({ control }: CollectionInformationProps) => (
  <section aria-labelledby="collection-information" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
    <h2 id="collection-information" className="mb-5 font-semibold">
      Basic information
    </h2>
    <FormField label="Collection name" htmlFor="collection-name" required>
      <FormInput
        id="collection-name"
        name="name"
        control={control}
        maxLength={COLLECTION_FORM_CONFIG.nameMaxLength}
        required
        autoComplete="off"
        placeholder="e.g. Tech gadgets, Dream vacation"
      />
    </FormField>
    <FormField label="Description" htmlFor="collection-description" className="mb-0">
      <FormTextarea
        id="collection-description"
        name="description"
        control={control}
        maxLength={COLLECTION_FORM_CONFIG.descriptionMaxLength}
        placeholder="What’s this collection about?"
      />
    </FormField>
  </section>
);
