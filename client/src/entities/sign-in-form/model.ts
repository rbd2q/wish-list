import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useContext } from 'react';

import { AuthContext } from '@/entities/authorization/auth-context';
import { AUTH_MUTATION_KEYS } from '@/shared/config/mutation-keys';
import { useApi } from '@/shared/hooks/useApi';
import { SignInResource } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useSignIn = (): UseMutationResult<void, unknown, SignInResource> => {
  const auth = useContext(AuthContext);
  const api = useApi();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.signIn,
    mutationFn: async (formData: SignInResource) => {
      const { data } = await api.post('/api/auth/login', formData);
      auth.login(data.token, data.userId);
    },
    onError: (error) => {
      const message = isAxiosError(error) ? error.response?.data?.message : undefined;
      showErrorToast(message || 'Unable to sign in. Please try again.');
    },
  });
};
