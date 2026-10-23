import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { AuthContext } from '@/entities/session';
import { getApiErrorMessage, useApi } from '@/shared/api';
import { navigationConfig } from '@/shared/config/navigation';
import { showErrorToast, showSuccessToast } from '@/shared/lib/notifications';

import { AUTH_MUTATION_KEYS } from '../mutation-keys';
import { SignUpResource } from '../types';

export const useSignUp = (): UseMutationResult<void, unknown, SignUpResource> => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const api = useApi();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.signUp,
    mutationFn: async (formData: SignUpResource) => {
      await api.post('/api/auth/register', formData);
      showSuccessToast('User created');
      try {
        const { data } = await api.post('/api/auth/login', { email: formData.email, password: formData.password });
        login(data.token);
        router.replace(navigationConfig.home);
      } catch {
        showErrorToast('Your account was created, but automatic sign-in failed. Please sign in.');
      }
    },
    onError: (error) => {
      showErrorToast(getApiErrorMessage(error, 'Unable to create your account. Please try again.'));
    },
  });
};
