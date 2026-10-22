import { FC } from 'react';

import { AuthorizationForm } from '@/entities/authorization-form';

export const AuthPage: FC = () => (
  <div className="flex min-h-dvh w-full items-center justify-center bg-background px-5 py-6 md:px-8">
    <AuthorizationForm />
  </div>
);
