import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSignUp } from '@/entities/sign-up-form/model';
import { Button } from '@/shared/components/button';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { ToastContainer } from '@/shared/components/toast';
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
      <FormField htmlFor="name" label="Name" required>
        <FormInput id="name" name="name" placeholder="Name" control={control} />
      </FormField>

      <FormField htmlFor="email" label="Email" required>
        <FormInput id="email" name="email" type="email" placeholder="E-mail" control={control} />
      </FormField>

      <FormField htmlFor="password" label="Password" required>
        <FormInput id="password" name="password" type="password" placeholder="Password" control={control} />
      </FormField>

      <Button disabled={!formFields.password || !formFields.email} isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
