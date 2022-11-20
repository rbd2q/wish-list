import styles from './Button.module.scss';
import { FCWithChildren } from '../../types';

interface Props {
  variant?: 'primary' | 'outlined';
  color?: 'primary' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button: FCWithChildren<Props> = ({
  variant = 'primary',
  color = 'primary',
  isLoading,
  disabled,
  children,
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      data-variant={variant}
      data-color={color}
      data-loading={isLoading}
      className={styles.Button}
    >
      {children}
    </button>
  );
};
