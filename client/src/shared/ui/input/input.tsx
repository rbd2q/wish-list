'use client';

import { Input as HeroUIInput, type InputRootProps } from '@heroui/react';
import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

import styles from './input.module.scss';

export interface InputProps extends InputRootProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
  isInvalid?: boolean;
}

// TODO: Refactor component
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startContent, endContent, isInvalid, className, fullWidth = true, ...props }, ref) => (
    <div
      className={clsx(styles.wrapper, fullWidth && styles.wrapper_fullWidth)}
      data-invalid={isInvalid ? 'true' : undefined}>
      {startContent != null ? <span className={styles.prefix}>{startContent}</span> : null}
      <HeroUIInput ref={ref} className={clsx(styles.input, className)} fullWidth {...props} />
      {endContent != null ? <span className={styles.suffix}>{endContent}</span> : null}
    </div>
  ),
);
Input.displayName = 'Input';
