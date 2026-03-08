import { FC, useState } from 'react';

import { SignInForm } from '../sign-in-form';
import { SignUpForm } from '../sign-up-form';
// import styles from './authorization-form.module.css';

export const AuthorizationForm: FC = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="rounded-xl bg-white px-8 py-6 w-full mx-auto max-w-lg">
      {hasAccount ? <SignInForm /> : <SignUpForm />}
      <div className="flex gap-2 items-center justify-center mt-4">
        <span>{hasAccount ? "Don't have an account?" : 'Already have an account?'}</span>
        <button
          type="button"
          className="text-purple-600 hover:text-purple-700 font-medium"
          onClick={() => setHasAccount(!hasAccount)}
        >
          {hasAccount ? 'Create account' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};
