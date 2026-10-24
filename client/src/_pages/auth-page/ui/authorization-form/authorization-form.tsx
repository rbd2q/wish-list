import { useIsMutating } from '@tanstack/react-query';
import { useState } from 'react';

import { Brand } from '@/shared/ui/brand';

import { AUTH_MUTATION_KEYS } from '../../api';
import { AuthIntro } from '../auth-intro';
import { SignInForm } from '../sign-in-form';
import { SignUpForm } from '../sign-up-form';

export const AuthorizationForm = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const isSubmitting = useIsMutating({ mutationKey: AUTH_MUTATION_KEYS.all }) > 0;

  return (
    <div className="grid w-full max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-10">
      <AuthIntro />

      <section className="mx-auto w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-8 md:hidden">
          <Brand />
        </div>
        {hasAccount ? <SignInForm /> : <SignUpForm />}
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center text-sm text-muted-foreground">
          <span>{hasAccount ? "Don't have an account?" : 'Already have an account?'}</span>
          <button
            type="button"
            className="rounded text-primary font-medium hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
            onClick={() => setHasAccount(!hasAccount)}>
            {hasAccount ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </section>
    </div>
  );
};
