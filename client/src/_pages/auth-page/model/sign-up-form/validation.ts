import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { object, type ObjectSchema, string } from 'yup';

import { CurrencyEnum } from '@/shared/lib/currency';

import { SignUpResource } from '../types';

export const signUpSchema: ObjectSchema<SignUpResource> = object({
  email: string().trim().email('Enter a valid email address.').required('Enter your email.'),
  name: string().trim().required('Enter your name.'),
  password: string().required('Enter your password.').min(6, 'Use at least 6 characters.'),
  preferredCurrency: string<CurrencyEnum>()
    .oneOf(Object.values(CurrencyEnum), 'Choose a currency.')
    .required('Choose a currency.'),
  birthDate: string()
    .transform((value) => value || undefined)
    .optional()
    .test('birth-date', 'Enter a valid date of birth in the past.', (value) => {
      if (!value) return true;
      try {
        return parseDate(value).compare(today(getLocalTimeZone())) <= 0;
      } catch {
        return false;
      }
    }),
  phone: string()
    .transform((value) => value || undefined)
    .optional()
    .test('phone', 'Enter a valid phone number with country code.', (value) => !value || isValidPhoneNumber(value)),
});
