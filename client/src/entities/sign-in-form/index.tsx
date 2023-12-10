import { FC, useContext } from 'react';
import { UnpackNestedValue, useForm } from 'react-hook-form';

import { Button } from '@/shared/components/button';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { ToastContainer } from '@/shared/components/toast';
import { useApi } from '@/shared/hooks/useApi';
import { AuthFormResource } from '@/shared/types';
import { showErrorToast } from '@/utils';

import { AuthContext } from '../authorization/auth-context';

export const SignInForm: FC = () => {
  const auth = useContext(AuthContext);
  const api = useApi();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<AuthFormResource>();
  const formFields = watch();

  const handleFormSubmit = async (formData: UnpackNestedValue<AuthFormResource>) => {
    try {
      const { data } = await api.post('/api/auth/login', formData);
      auth.login(data.token, data.userId);
    } catch (error) {
      // TODO
      showErrorToast(error.message);
    }
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
