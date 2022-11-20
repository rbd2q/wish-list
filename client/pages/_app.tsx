import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContextProvider } from '../src/entities/authorization/auth-context';

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
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClientRef.current}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}
