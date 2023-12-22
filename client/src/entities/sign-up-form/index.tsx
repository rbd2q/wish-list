import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSignUp } from '@/entities/sign-up-form/model';
import { Button } from '@/shared/components/button';
import { FormDatePicker } from '@/shared/components/form-date-picker';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { FormPhoneInput } from '@/shared/components/form-phone-input';
import { FormSelect } from '@/shared/components/form-select';
import { ToastContainer } from '@/shared/components/toast';
import { CURRENCY_OPTIONS } from '@/shared/consts';
import { AuthFormResource } from '@/shared/types';

export const SignUpForm: FC = () => {
  const signUp = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<AuthFormResource>();

  const formFields = watch();

  const handleFormSubmit: SubmitHandler<AuthFormResource> = async (formData: AuthFormResource) => {
    await signUp.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>

      <FormField htmlFor="email" label="Email" required>
        <FormInput id="email" name="email" type="email" placeholder="E-mail" control={control} />
      </FormField>

      <FormField htmlFor="password" label="Password" required>
        <FormInput id="password" name="password" type="password" placeholder="Password" control={control} />
      </FormField>

      <FormField htmlFor="name" label="Name" required>
        <FormInput id="name" name="name" placeholder="Name" control={control} />
      </FormField>

      <div className="flex gap-16">
        <FormField htmlFor="currency" label="Preferred currency" required>
          <FormSelect name="currency" control={control} options={CURRENCY_OPTIONS} defaultValue="BYN" />
        </FormField>
        <FormField htmlFor="birthDate" label="Date of Birth">
          <FormDatePicker id="birthDate" name="birthDate" control={control} />
        </FormField>
      </div>

      <FormField htmlFor="phone" label="Phone">
        <FormPhoneInput id="phone" name="phone" control={control} />
      </FormField>

      <Button disabled={!formFields.password || !formFields.email} isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
