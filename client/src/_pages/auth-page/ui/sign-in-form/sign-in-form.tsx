import { yupResolver } from '@hookform/resolvers/yup';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/form-field';
import { FormInput } from '@/shared/ui/form-input';
import { FormPasswordInput } from '@/shared/ui/form-password-input';

import { useSignIn } from '../../api';
import { type SignInResource, signInSchema } from '../../model';

export const SignInForm = () => {
  const { mutate: signIn, isPending: isSigningIn } = useSignIn();
  const { control, handleSubmit } = useForm<SignInResource>({
    disabled: isSigningIn,
    resolver: yupResolver(signInSchema),
  });
  const handleFormSubmit = (formData: SignInResource) => signIn(formData);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to your wishlist</p>
      </div>
      <fieldset disabled={isSigningIn} className="min-w-0">
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
        <Button isDisabled={isSigningIn} isPending={isSigningIn} fullWidth type="submit">
          {isSigningIn ? 'Signing in…' : 'Sign in'}
        </Button>
      </fieldset>
    </form>
  );
};
