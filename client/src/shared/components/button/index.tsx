import { FCWithChildren } from '../../types';
import styles from './Button.module.scss';

interface Props {
  variant?: 'primary' | 'outlined';
  color?: 'primary' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FCWithChildren<Props> = ({
  variant = 'primary',
  color = 'primary',
  isLoading,
  disabled,
  onClick,
  children,
}) => (
  <button
    disabled={disabled || isLoading}
    data-variant={variant}
    data-color={color}
    data-loading={isLoading}
    className={styles.Button}
    onClick={onClick}
  >
    {children}
  </button>
);
