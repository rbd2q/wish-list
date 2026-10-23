'use client';

import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';

import { FCWithChildren } from '@/shared/lib/react';
import { ToastContainer } from '@/shared/ui/toast';

import { AuthContextProvider } from './auth-provider';
import { SessionQueryProvider } from './session-query-provider';

export const Providers: FCWithChildren = ({ children }) => (
  <AuthContextProvider>
    <SessionQueryProvider>{children}</SessionQueryProvider>
    <ToastContainer />
  </AuthContextProvider>
);
