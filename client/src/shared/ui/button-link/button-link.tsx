import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps } from 'react';

import styles from '../button/button.module.scss';

export const ButtonLink = ({ className, ...props }: ComponentProps<typeof Link>) => {
  return <Link className={clsx(styles.button, styles.button_primary, styles.button_md, className)} {...props} />;
};
