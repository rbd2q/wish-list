'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/entities/session';
import { getApiErrorMessage } from '@/shared/api';
import { showErrorToast } from '@/shared/lib/notifications';
import { FCWithChildren } from '@/shared/lib/react';

const SessionQueryCache: FCWithChildren = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            const message = query.meta?.errorMessage;

            if (typeof message === 'string') {
              showErrorToast(getApiErrorMessage(error, message));
            }
          },
        }),
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
        },
      }),
  );

  useEffect(
    () => () => {
      void queryClient.cancelQueries();
    },
    [queryClient],
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const SessionQueryProvider: FCWithChildren = ({ children }) => {
  const { token } = useContext(AuthContext);

  return <SessionQueryCache key={token ?? 'guest'}>{children}</SessionQueryCache>;
};
