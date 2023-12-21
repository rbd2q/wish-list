import { ButtonHTMLAttributes } from 'react';

import { FCWithChildren } from '../../types';
import styles from './Button.module.scss';

interface ExtendedProps {
  variant?: 'primary' | 'outlined';
  color?: 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  disabled?: boolean;
}

export type ButtonProps = ExtendedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FCWithChildren<ButtonProps> = ({
  variant = 'primary',
  color = 'primary',
  size = 'md',
  rounded = 'sm',
  isLoading,
  disabled,
  onClick,
  children,
}) => (
  <button
    disabled={disabled || isLoading}
    data-variant={variant}
    data-color={color}
    data-size={size}
    data-rounded={rounded}
    data-loading={isLoading}
    className={styles.Button}
    onClick={onClick}
  >
    {children}
  </button>
);
