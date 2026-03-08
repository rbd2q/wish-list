import { ArrowRightIcon, Lock, Mail, User } from 'lucide-react';
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
  } = useForm<AuthFormResource>({ defaultValues: { currency: 'BYN' } });

  const formFields = watch();

  const handleFormSubmit: SubmitHandler<AuthFormResource> = async (formData: AuthFormResource) => {
    await signUp.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ToastContainer />
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="text-sm text-gray-500">Start organizing your wishlist today</p>
      </div>

      <FormField htmlFor="email" label="Email" required>
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          control={control}
          startContent={<Mail className="text-gray-400" />}
        />
      </FormField>
      <FormField htmlFor="password" label="Password" required>
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          control={control}
          startContent={<Lock className="text-gray-400" />}
        />
      </FormField>

      <FormField htmlFor="name" label="Name" required>
        <FormInput
          id="name"
          name="name"
          control={control}
          placeholder="Enter your name"
          startContent={<User className="text-gray-400" />}
        />
      </FormField>

      <div className="flex gap-4">
        <FormField className="flex-1 min-w-0" htmlFor="currency" label="Preferred currency" required>
          <FormSelect name="currency" control={control} options={CURRENCY_OPTIONS} />
        </FormField>
        <FormField className="flex-1 min-w-0" htmlFor="birthDate" label="Date of Birth">
          <FormDatePicker id="birthDate" name="birthDate" control={control} />
        </FormField>
      </div>

      <FormField htmlFor="phone" label="Phone">
        <FormPhoneInput id="phone" name="phone" control={control} />
      </FormField>

      <Button isDisabled={!formFields.password || !formFields.email} isPending={isSubmitting} fullWidth type="submit">
        Sign Up
        <ArrowRightIcon />
      </Button>
    </form>
  );
};
