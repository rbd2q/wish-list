import { ReactNode } from 'react';

import { showToast } from '../../ui/toast';

export const showSuccessToast = (content: ReactNode): void => {
  showToast(content, { type: 'success' });
};

export const showErrorToast = (content: ReactNode): void => {
  showToast(content, { type: 'error' });
};
