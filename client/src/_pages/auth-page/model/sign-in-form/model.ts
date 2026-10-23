import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { AuthContext } from '@/entities/session';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { navigationConfig } from '@/shared/config/navigation';
import { showErrorToast } from '@/shared/lib/notifications';

import { AUTH_MUTATION_KEYS } from '../mutation-keys';
import { SignInResource } from '../types';

export const useSignIn = (): UseMutationResult<void, unknown, SignInResource> => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const api = useApi();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.signIn,
    mutationFn: async (formData: SignInResource) => {
      const { data } = await api.post('/api/auth/login', formData);
      login(data.token);
      router.replace(navigationConfig.home);
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Unable to sign in. Please try again.'));
    },
  });
};
