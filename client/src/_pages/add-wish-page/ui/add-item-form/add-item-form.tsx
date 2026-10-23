import { ArrowLeft, Trash2 } from 'lucide-react';
import { FC, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CURRENCY_OPTIONS, CurrencyEnum } from '@/shared/lib/currency';
import { Button } from '@/shared/ui/button';
import { FormCheckbox } from '@/shared/ui/form-checkbox';
import { FormField } from '@/shared/ui/form-field';
import { FormInput } from '@/shared/ui/form-input';
import { FormSelect } from '@/shared/ui/form-select';
import { FormTextarea } from '@/shared/ui/form-textarea';

import { type AddItemFormResource, AddItemType, useAddWish, useParseLink } from '../../model';

interface Props {
  onBack: () => void;
}

export const AddItemForm: FC<Props> = ({ onBack }) => {
  const { mutateAsync: addWish, isPending: isAdding } = useAddWish();
  const { mutateAsync: parseLink, isPending: isParsing } = useParseLink();
  const [step, setStep] = useState<AddItemType>(AddItemType.PARSE_ITEM);
  const [images, setImages] = useState<Array<string>>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
  } = useForm<AddItemFormResource>({ defaultValues: { primaryCurrency: CurrencyEnum.BYN, isHidden: false } });
  const formFields = watch();

  const handleParseLink = async () => {
    if (!formFields.link) return;

    const data = await parseLink(formFields.link);
    setValue('title', data.title);
    setValue('price', data.price);
    setValue('description', data.description);
    setValue('imageUrl', data.imageUrl);
    setValue('url', data.url);
    setImages(data.images ?? []);
    setStep(AddItemType.MANUALLY_ADD_ITEM);
  };

  const handleContinue = async (formData: AddItemFormResource) => {
    try {
      if (step === AddItemType.PARSE_ITEM) {
        if (formData.link) {
          await handleParseLink();
        } else {
          setStep(AddItemType.MANUALLY_ADD_ITEM);
        }
      } else {
        await addWish(formData);
        onBack();
      }
    } catch {
      // Mutation hooks show request errors; preserve the current form and step.
      return;
    }
  };

  const handleDeleteImage = (index: number) => () => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const isPending = isSubmitting || isAdding || isParsing;

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit(handleContinue)}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Add item</h1>
        <button type="button" onClick={onBack} className="flex gap-2">
          <ArrowLeft size={24} aria-hidden="true" />
          Back
        </button>
      </div>
      {step === AddItemType.PARSE_ITEM ? (
        <div className="flex flex-col gap-4">
          <div className="px-4 py-2 bg-[#fff3e0] rounded-lg">
            You can add an item by entering the link to the product page
          </div>
          <FormField htmlFor="link" label="Link">
            <FormInput id="link" name="link" type="url" placeholder="https://..." control={control} />
          </FormField>
        </div>
      ) : (
        <Fragment>
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
              <FormSelect name="primaryCurrency" control={control} options={CURRENCY_OPTIONS} />
              <FormInput id="price" name="price" placeholder="0.00" control={control} />
            </div>
          </FormField>

          <FormField htmlFor="imageUrl" label="Image link">
            <FormInput id="imageUrl" name="imageUrl" type="url" placeholder="Image link" control={control} />
          </FormField>

          {images.length ? (
            <div className="flex w-full overflow-scroll gap-2 mb-4">
              {images.map((image, index) => (
                <div key={image} className="relative bg-white w-fit flex-none">
                  <button
                    onClick={handleDeleteImage(index)}
                    className="absolute top-2 right-2 text-black border border-black rounded-md p-1 hover:bg-red-600 hover:text-white hover:border-white">
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                  <img src={image} className="w-full h-full" alt="Item" />
                </div>
              ))}
            </div>
          ) : null}

          <FormField htmlFor="hidden_from_others">
            <FormCheckbox id="hidden_from_others" name="isHidden" control={control} label="Hide from others" />
          </FormField>
        </Fragment>
      )}

      <Button
        type="submit"
        isDisabled={isPending || (step === AddItemType.MANUALLY_ADD_ITEM && (!formFields.title || !formFields.price))}
        isPending={isPending}>
        {step === AddItemType.PARSE_ITEM ? 'Continue' : 'Add item'}
      </Button>
    </form>
  );
};
