import { yupResolver } from '@hookform/resolvers/yup';
import { noop } from 'lodash';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { InferType } from 'yup';

import { WishListItemType, WishPriority } from '@/entities/wish';
import { CURRENCY_OPTIONS, CurrencyEnum } from '@/shared/lib/currency';
import { Button } from '@/shared/ui/button';
import { FormCheckbox } from '@/shared/ui/form-checkbox';
import { FormField } from '@/shared/ui/form-field';
import { FormInput } from '@/shared/ui/form-input';
import { FormSelect } from '@/shared/ui/form-select';
import { FormTextarea } from '@/shared/ui/form-textarea';

import { useParseLink, useSaveWish } from '../../api';
import { applyParsedWish, wishSchema } from '../../model';
import { CollectionsField } from './collections-field';
import { PhotoEditor } from './photo-editor';
import { PriorityField } from './priority-field';
import { WishPreview } from './wish-preview';

type Values = InferType<typeof wishSchema>;

interface AddItemFormProps {
  onBack: () => void;
  wish?: WishListItemType;
  collectionId?: string;
}

export const AddItemForm = ({ onBack, wish, collectionId }: AddItemFormProps) => {
  const { mutateAsync: saveWish, isPending: isSaving } = useSaveWish(wish?.id);
  const { mutateAsync: parseLink, isPending: isParsing } = useParseLink();

  const [images, setImages] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    getFieldState,
    trigger,
    formState: { isSubmitting },
  } = useForm<Values>({
    resolver: yupResolver(wishSchema),
    defaultValues: {
      priority: wish?.priority ?? WishPriority.MEDIUM,
      title: wish?.title ?? '',
      price: wish ? String(wish.prices[wish.primaryCurrency]) : '',
      primaryCurrency: wish?.primaryCurrency ?? CurrencyEnum.BYN,
      description: wish?.description ?? '',
      url: wish?.url ?? '',
      photos: (wish?.imageUrls ?? []).map((src) => ({ id: src, src })),
      isHidden: wish?.isHidden ?? false,
      collectionIds: wish?.collectionIds ?? (collectionId ? [collectionId] : []),
    },
  });

  const { title, price, primaryCurrency, photos, description, priority } = useWatch({ control });
  const preview = photos?.[0]?.src;
  const isPending = isSubmitting || isSaving || isParsing;

  const handleSave = async (values: Values) => {
    try {
      await saveWish(values);
      onBack();
    } catch {
      noop();
    }
  };

  const handleParse = async () => {
    if (!(await trigger('url')) || !getValues('url')) return;

    const before = getValues();

    try {
      const data = await parseLink(before.url);

      if (getValues('url') !== before.url) return;

      setImages(applyParsedWish({ getValues, getFieldState, setValue }, before, data));
    } catch {
      noop();
    }
  };

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <form
        onSubmit={handleSubmit(handleSave)}
        noValidate
        className="min-w-0 rounded-2xl border border-border bg-surface p-5 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">{wish ? 'Edit wish' : 'Add wish'}</h1>
          <Button type="button" variant="secondary" onPress={onBack}>
            Cancel
          </Button>
        </div>
        <FormField htmlFor="url" label="Product link">
          <FormInput id="url" name="url" placeholder="https://…" control={control} />
        </FormField>
        <Button type="button" variant="secondary" onPress={handleParse} isDisabled={isPending}>
          Autofill from link
        </Button>
        <p className="my-4 text-sm text-muted-foreground">
          Enter details manually or autofill from a product link. Your manual changes are kept.
        </p>
        <FormField htmlFor="title" label="Title" required>
          <FormInput id="title" name="title" control={control} />
        </FormField>
        <FormField htmlFor="description" label="Description">
          <FormTextarea id="description" name="description" control={control} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField htmlFor="price" label="Price" required>
            <FormInput id="price" name="price" inputMode="decimal" control={control} />
          </FormField>
          <FormField htmlFor="currency" label="Currency" required>
            <FormSelect id="currency" name="primaryCurrency" control={control} options={CURRENCY_OPTIONS} />
          </FormField>
        </div>
        <PhotoEditor control={control} candidates={images} isDisabled={isPending} />
        <PriorityField control={control} />
        <CollectionsField control={control} />
        <FormCheckbox name="isHidden" control={control} label="Hide from others" />
        <Button className="mt-6" type="submit" isDisabled={isPending} isPending={isPending}>
          {isSaving ? 'Uploading photos and saving…' : wish ? 'Save changes' : 'Add wish'}
        </Button>
      </form>
      <WishPreview
        imageUrl={preview}
        title={title}
        price={price}
        currency={primaryCurrency}
        priority={priority}
        description={description}
      />
    </div>
  );
};
