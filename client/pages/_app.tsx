import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';

import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthContextProvider } from '@/entities/authorization/auth-context';
import { PageTitle } from '@/shared/components/page-title';

export default function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <HydrationBoundary state={pageProps?.dehydratedState}>
          <PageTitle />
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
