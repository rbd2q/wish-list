import { FC, useContext } from 'react';
import { FormField } from '../../shared/components/form-field';
import { FormInput } from '../../shared/components/form-input';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { AuthFormResource } from '../../shared/types';
import { Button } from '../../shared/components/button';
import { useApi } from '../../shared/hooks/useApi';
import { showErrorToast } from '../../utils';
import { ToastContainer } from '../../shared/components/toast';
import { AuthContext } from '../authorization/auth-context';

export const SignInForm: FC = () => {
  const auth = useContext(AuthContext);
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
      const response = await request('/api/auth/login', 'POST', data);
      auth.login(response.token, response.userId);
    } catch (e) {
      // TODO
      // @ts-ignore
      showErrorToast(e.message);
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
