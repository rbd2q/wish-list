import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode, useState } from 'react';
import { Arrow, useLayer } from 'react-laag';

import { FCWithChildren } from '@/shared/types';

import styles from './dropdown.module.scss';

interface Props {
  children: ReactNode;
}

export const Dropdown: FCWithChildren<Props> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClose = () => {
    setOpen(false);
  };

  const { renderLayer, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: handleClose,
    onDisappear: handleClose,
    overflowContainer: true,
    auto: true,
    placement: 'bottom-end',
    triggerOffset: 12,
    containerOffset: 16,
    arrowOffset: 16,
  });

  return (
    <div>
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              {...layerProps}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                type: 'spring',
                stiffness: 800,
                damping: 35,
              }}
              className={styles.inner}
            >
              <div className={styles.dropdownHeading}>
                <div className="flex items-center mr-14">{children}</div>
              </div>
              <li className={styles.dropdownLi}>
                <Link href="/profile" className={styles.dropdownOption}>
                  <div className={clsx(styles.menuItem, pathname === '/profile' && styles.menuItemActive)}>
                    <span className="-profile-layout__menu-wrapper-link-title -profile-layout__menu-wrapper-link-title--dropdown m-l-8">
                      Profile
                    </span>
                  </div>
                </Link>
              </li>

              <Arrow {...(arrowProps as ComponentProps<typeof Arrow>)} backgroundColor="var(--surface-two)" />
            </motion.ul>
          )}
        </AnimatePresence>,
      )}
    </div>
  );
};
