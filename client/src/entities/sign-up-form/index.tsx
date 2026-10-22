import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/button';
import { FormDatePicker } from '@/shared/components/form-date-picker';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { FormPasswordInput } from '@/shared/components/form-password-input';
import { FormPhoneInput } from '@/shared/components/form-phone-input';
import { FormSelect } from '@/shared/components/form-select';
import { CURRENCY_OPTIONS } from '@/shared/consts';
import { SignUpResource } from '@/shared/types';

import { useSignUp } from './model';
import { signUpSchema } from './validation';

export const SignUpForm = () => {
  const signUp = useSignUp();
  const { control, handleSubmit } = useForm<SignUpResource>({
    disabled: signUp.isPending,
    resolver: yupResolver(signUpSchema),
    defaultValues: { preferredCurrency: 'BYN' },
  });
  const handleFormSubmit = (formData: SignUpResource) => signUp.mutate(formData);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start organizing what you love</p>
      </div>
      <fieldset disabled={signUp.isPending} className="min-w-0">
        <FormField htmlFor="name" label="Full name" required>
          <FormInput
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            control={control}
            startContent={<User className="size-4" aria-hidden="true" />}
          />
        </FormField>
        <FormField htmlFor="email" label="Email" required>
          <FormInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            control={control}
            startContent={<Mail className="size-4" aria-hidden="true" />}
          />
        </FormField>
        <FormField htmlFor="password" label="Password" required>
          <FormPasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Minimum 6 characters"
            control={control}
          />
        </FormField>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <FormField htmlFor="preferredCurrency" label="Currency" required>
            <FormSelect id="preferredCurrency" name="preferredCurrency" control={control} options={CURRENCY_OPTIONS} />
          </FormField>
          <FormField htmlFor="birthDate" label="Date of birth (optional)">
            <FormDatePicker id="birthDate" name="birthDate" control={control} />
          </FormField>
        </div>
        <FormField htmlFor="phone" label="Phone (optional)">
          <FormPhoneInput
            id="phone"
            name="phone"
            control={control}
            defaultCountry="BY"
            autoComplete="tel"
            placeholder="Phone number"
          />
        </FormField>
        <Button isDisabled={signUp.isPending} isPending={signUp.isPending} fullWidth type="submit">
          {signUp.isPending ? 'Creating account…' : 'Sign up'}
        </Button>
      </fieldset>
    </form>
  );
};
