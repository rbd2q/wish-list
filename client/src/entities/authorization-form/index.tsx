import { FC, useState } from 'react';

import styles from './authorization-form.module.css';
import clsx from 'clsx';

import { SignInForm } from '../sign-in-form';
import { SignUpForm } from '../sign-up-form';

export const AuthorizationForm: FC = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="rounded-xl bg-white px-8 py-6 w-full mx-auto max-w-lg">
      <div className="w-full flex py-4">
        <button
          onClick={() => setHasAccount(true)}
          className={clsx(styles.switchButton, hasAccount && styles.switchButtonActive)}
        >
          Sign In
        </button>
        <button
          onClick={() => setHasAccount(false)}
          className={clsx(styles.switchButton, !hasAccount && styles.switchButtonActive)}
        >
          Sign Up
        </button>
      </div>
      {hasAccount ? <SignInForm /> : <SignUpForm />}
    </div>
  );
};
