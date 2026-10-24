import type { UseFormReturn } from 'react-hook-form';
import type { InferType } from 'yup';

import type { ParsedWishListItem } from '../api';
import { optionalUrl, wishSchema } from './schema';

type WishFormValues = InferType<typeof wishSchema>;
type WishFormMethods = Pick<UseFormReturn<WishFormValues>, 'getValues' | 'getFieldState' | 'setValue'>;

export const applyParsedWish = (
  { getValues, getFieldState, setValue }: WishFormMethods,
  before: WishFormValues,
  data: ParsedWishListItem,
) => {
  const values = {
    title: data.title,
    price: data.price == null ? undefined : String(data.price),
    description: data.description,
    url: data.url || before.url,
    primaryCurrency: data.primaryCurrency,
  };

  for (const name of Object.keys(values) as Array<keyof typeof values>) {
    const value = values[name];

    if (value !== undefined && !getFieldState(name).isDirty && getValues(name) === before[name]) {
      setValue(name, value, { shouldValidate: false });
    }
  }

  if (
    !getValues('photos').length &&
    !getFieldState('photos').isDirty &&
    data.imageUrl &&
    optionalUrl.isValidSync(data.imageUrl)
  ) {
    setValue('photos', [{ id: data.imageUrl, src: data.imageUrl }]);
  }

  return [...new Set([data.imageUrl, ...(data.images ?? [])].filter((src): src is string => !!src))];
};
