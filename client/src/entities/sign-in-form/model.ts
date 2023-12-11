import { AxiosError } from 'axios';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { AuthContext } from '@/entities/authorization/auth-context';
import { useApi } from '@/shared/hooks/useApi';
import { AuthFormResource } from '@/shared/types';
import { showErrorToast } from '@/utils';

export const useSignIn = (): UseMutationResult<void, unknown, AuthFormResource> => {
  const auth = useContext(AuthContext);
  const api = useApi();

  return useMutation(async (formData: AuthFormResource) => {
    try {
      const { data } = await api.post('/api/auth/login', formData);
      auth.login(data.token, data.userId);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.message);
      }
    }
  });
};
