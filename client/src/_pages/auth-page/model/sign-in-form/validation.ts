import { object, type ObjectSchema, string } from 'yup';

import { SignInResource } from '../types';

export const signInSchema: ObjectSchema<SignInResource> = object({
  email: string().trim().email('Enter a valid email address.').required('Enter your email.'),
  password: string().required('Enter your password.'),
});
