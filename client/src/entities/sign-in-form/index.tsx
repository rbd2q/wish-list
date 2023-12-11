import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useSignIn } from '@/entities/sign-in-form/model';
import { Button } from '@/shared/components/button';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { ToastContainer } from '@/shared/components/toast';
import { AuthFormResource } from '@/shared/types';

export const SignInForm: FC = () => {
  const signIn = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<AuthFormResource>();
  const formFields = watch();

  const handleFormSubmit = async (formData: AuthFormResource) => {
    await signIn.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
      <FormField htmlFor="email" label="Email">
        <FormInput id="email" name="email" type="email" placeholder="E-mail" control={control} />
      </FormField>

      <FormField htmlFor="password" label="Password">
        <FormInput id="password" name="password" type="password" placeholder="Password" control={control} />
      </FormField>

      <Button disabled={!formFields.password || !formFields.email} isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
