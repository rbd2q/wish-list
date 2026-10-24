import * as yup from 'yup';

import { WishPriority } from '@/entities/wish';
import { CurrencyEnum } from '@/shared/lib/currency';

export const optionalUrl = yup
  .string()
  .trim()
  .default('')
  .max(4096, 'URL is too long')
  .test('http-url', 'Enter a valid HTTP or HTTPS URL', (value) => {
    if (!value) return true;
    try {
      const url = new URL(value);

      return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
    } catch {
      return false;
    }
  });

export const wishSchema = yup.object({
  priority: yup.mixed<WishPriority>().oneOf(Object.values(WishPriority)).required('Choose a priority'),
  title: yup.string().trim().max(500, 'Use up to 500 characters').required('Enter a title'),
  price: yup
    .string()
    .trim()
    .transform((value: string) => value.replace(',', '.'))
    .required('Enter a price')
    .test(
      'price',
      'Enter a finite non-negative price',
      (value) => !!value && /^\d+(\.\d+)?$/.test(value) && Number.isFinite(Number(value)),
    ),
  primaryCurrency: yup.mixed<CurrencyEnum>().oneOf(Object.values(CurrencyEnum)).required('Choose a currency'),
  url: optionalUrl,
  photos: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        src: yup
          .string()
          .required()
          .test('photo-url', 'Enter a valid image URL', (value, context) => {
            return context.parent.file instanceof File || optionalUrl.isValidSync(value);
          }),
        file: yup.mixed<File>().optional(),
      }),
    )
    .max(5, 'You can add up to 5 photos')
    .required(),
  description: yup.string().trim().max(10000, 'Use up to 10000 characters').default(''),
  isHidden: yup.boolean().required(),
  collectionIds: yup.array().of(yup.string().required()).required(),
});
