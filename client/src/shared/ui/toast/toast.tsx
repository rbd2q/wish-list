import { FC, ReactNode } from 'react';
import { toast, ToastContainer as ToastifyToastContainer } from 'react-toastify';

import { ToastType } from './types';

export const ToastContainer: FC = () => <ToastifyToastContainer hideProgressBar position="top-center" />;

export type ToastOptions = {
  autoClose?: false | number;
  type?: ToastType;
};

export const showToast = (message: ReactNode, options: ToastOptions = {}) => {
  const { type } = options;

  toast(message, {
    type,
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
