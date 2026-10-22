import { yupResolver } from '@hookform/resolvers/yup';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/button';
import { FormField } from '@/shared/components/form-field';
import { FormInput } from '@/shared/components/form-input';
import { FormPasswordInput } from '@/shared/components/form-password-input';
import { SignInResource } from '@/shared/types';

import { useSignIn } from './model';
import { signInSchema } from './validation';

export const SignInForm = () => {
  const signIn = useSignIn();
  const { control, handleSubmit } = useForm<SignInResource>({
    disabled: signIn.isPending,
    resolver: yupResolver(signInSchema),
  });
  const handleFormSubmit = (formData: SignInResource) => signIn.mutate(formData);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to your wishlist</p>
      </div>
      <fieldset disabled={signIn.isPending} className="min-w-0">
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
            autoComplete="current-password"
            placeholder="Your password"
            control={control}
          />
        </FormField>
        <Button isDisabled={signIn.isPending} isPending={signIn.isPending} fullWidth type="submit">
          {signIn.isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </fieldset>
    </form>
  );
};
