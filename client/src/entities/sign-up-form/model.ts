import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useContext } from 'react';

import { AuthContext } from '@/entities/authorization/auth-context';
import { AUTH_MUTATION_KEYS } from '@/shared/config/mutation-keys';
import { useApi } from '@/shared/hooks/useApi';
import { SignUpResource } from '@/shared/types';
import { showErrorToast, showSuccessToast } from '@/utils';

export const useSignUp = (): UseMutationResult<void, unknown, SignUpResource> => {
  const auth = useContext(AuthContext);
  const api = useApi();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.signUp,
    mutationFn: async (formData: SignUpResource) => {
      await api.post('/api/auth/register', formData);
      showSuccessToast('User created');
      try {
        const { data } = await api.post('/api/auth/login', { email: formData.email, password: formData.password });
        auth.login(data.token, data.userId);
      } catch {
        showErrorToast('Your account was created, but automatic sign-in failed. Please sign in.');
      }
    },
    onError: (error) => {
      const message = isAxiosError(error) ? error.response?.data?.message : undefined;
      showErrorToast(message || 'Unable to create your account. Please try again.');
    },
  });
};
