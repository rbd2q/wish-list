'use client';

import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import { AuthContextProvider } from '@/entities/authorization/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: { retry: false, refetchOnWindowFocus: false },
      },
    });
  }

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
    </AuthContextProvider>
  );
}
