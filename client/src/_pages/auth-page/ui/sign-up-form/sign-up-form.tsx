import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { CURRENCY_OPTIONS, CurrencyEnum } from '@/shared/lib/currency';
import { Button } from '@/shared/ui/button';
import { FormDatePicker } from '@/shared/ui/form-date-picker';
import { FormField } from '@/shared/ui/form-field';
import { FormInput } from '@/shared/ui/form-input';
import { FormPasswordInput } from '@/shared/ui/form-password-input';
import { FormPhoneInput } from '@/shared/ui/form-phone-input';
import { FormSelect } from '@/shared/ui/form-select';

import { useSignUp } from '../../api';
import { type SignUpResource, signUpSchema } from '../../model';

export const SignUpForm = () => {
  const { mutate: signUp, isPending: isSigningUp } = useSignUp();
  const { control, handleSubmit } = useForm<SignUpResource>({
    disabled: isSigningUp,
    resolver: yupResolver(signUpSchema),
    defaultValues: { preferredCurrency: CurrencyEnum.BYN },
  });
  const handleFormSubmit = (formData: SignUpResource) => signUp(formData);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start organizing what you love</p>
      </div>
      <fieldset disabled={isSigningUp} className="min-w-0">
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
        <Button isDisabled={isSigningUp} isPending={isSigningUp} fullWidth type="submit">
          {isSigningUp ? 'Creating account…' : 'Sign up'}
        </Button>
      </fieldset>
    </form>
  );
};
