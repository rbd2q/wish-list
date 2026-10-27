import type { Metadata } from 'next';

import { AuthPage } from '@/_pages/auth-page';

export const metadata: Metadata = {
  title: 'Welcome',
};

const AuthRoute = () => <AuthPage />;

export default AuthRoute;
