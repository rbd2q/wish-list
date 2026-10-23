import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { AuthContext } from '@/entities/session';
import { useApi } from '@/shared/api';
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
      const message = isAxiosError(error) ? error.response?.data?.message : undefined;
      showErrorToast(message || 'Unable to sign in. Please try again.');
    },
  });
};
