import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useAddWish } from '@/entities/add-item-form/model';
import { Button } from '@/shared/components/button';
import { FormCheckbox } from '@/shared/components/form-checkbox';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { FormSelect } from '@/shared/components/form-select';
import { FormTextarea } from '@/shared/components/form-textarea';
import { CURRENCY_OPTIONS } from '@/shared/consts';
import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';
import { AddItemFormResource } from '@/shared/types';

interface Props {
  onBack: () => void;
}

export const AddItemForm: FC<Props> = ({ onBack }) => {
  const addItem = useAddWish();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<AddItemFormResource>();
  const formFields = watch();

  const handleFormSubmit = async (formData: AddItemFormResource) => {
    const response = await addItem.mutateAsync(formData);
    if (response) {
      onBack();
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Add item</h1>
        <button onClick={onBack} className="flex gap-2">
          <ArrowLeftIcon />
          Back
        </button>
      </div>
      <FormField htmlFor="title" label="Title" required>
        <FormInput id="title" name="title" placeholder="Title" control={control} />
      </FormField>

      <FormField htmlFor="description" label="Description">
        <FormTextarea id="description" name="description" placeholder="Description" control={control} />
      </FormField>

      <FormField htmlFor="url" label="Link">
        <FormInput id="url" name="url" type="url" placeholder="Link" control={control} />
      </FormField>

      <FormField htmlFor="price" label="Price" required>
        <div className="flex gap-2">
          <FormSelect name="currency" control={control} options={CURRENCY_OPTIONS} defaultValue="BYN" />
          <FormInput id="price" name="price" placeholder="0.00" control={control} />
        </div>
      </FormField>

      <FormField htmlFor="imageUrl" label="Image link">
        <FormInput id="imageUrl" name="imageUrl" type="url" placeholder="Image link" control={control} />
      </FormField>

      <FormField htmlFor="hidden_from_others">
        <FormCheckbox
          id="hidden_from_others"
          name="isHidden"
          control={control}
          label="Hide from others"
          defaultValue={false}
        />
      </FormField>

      <Button disabled={isSubmitting || !formFields.title || !formFields.price}>Add item</Button>
    </form>
  );
};
