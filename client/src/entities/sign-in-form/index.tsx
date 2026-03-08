import { ArrowRightIcon, Lock, Mail } from 'lucide-react';
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
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-sm text-gray-500">Enter your email and password to continue</p>
      </div>
      <FormField htmlFor="email" label="Email">
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          control={control}
          startContent={<Mail className="text-gray-400" />}
        />
      </FormField>

      <FormField htmlFor="password" label="Password">
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          control={control}
          startContent={<Lock className="text-gray-400" />}
        />
      </FormField>

      <Button isDisabled={!formFields.password || !formFields.email} isPending={isSubmitting} fullWidth type="submit">
        Sign In
        <ArrowRightIcon />
      </Button>
    </form>
  );
};
