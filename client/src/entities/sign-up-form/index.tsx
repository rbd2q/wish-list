import { FC } from 'react';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { AuthFormResource } from '../../shared/types';
import { FormField } from '../../shared/components/form-field';
import { FormInput } from '../../shared/components/form-input';
import { useApi } from '../../shared/hooks/useApi';
import { Button } from '../../shared/components/button';
import { showErrorToast, showSuccessToast } from '../../utils';
import { ToastContainer } from '../../shared/components/toast';

export const SignUpForm: FC = () => {
  const { request } = useApi();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<AuthFormResource>();

  const formFields = watch();

  const handleFormSubmit = async (data: UnpackNestedValue<AuthFormResource>) => {
    try {
      await request('/api/auth/register', 'POST', data);
      showSuccessToast('User created');
    } catch (e) {
      // TODO
      // @ts-ignore
      showErrorToast(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
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
