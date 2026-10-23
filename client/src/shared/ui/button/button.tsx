'use client';

import { Button as HeroUIButton, type ButtonRootProps } from '@heroui/react';
import clsx from 'clsx';

import { FCWithChildren } from '../../lib/react';
import styles from './button.module.scss';

// TODO: Refactor component, add more variants
export type ButtonProps = ButtonRootProps;

export const Button: FCWithChildren<ButtonProps> = ({ className, variant = 'primary', size = 'md', ...props }) => (
  <HeroUIButton
    className={clsx(
      styles.button,
      styles[`button_${variant}`],
      styles[`button_${size}`],
      props.isIconOnly && styles.button_icon,
      className,
    )}
    variant={variant}
    size={size}
    {...props}
  />
);
