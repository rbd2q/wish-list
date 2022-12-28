import { FCWithChildren } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow, useLayer } from 'react-laag';
import { useState } from 'react';
import styles from './Dropdown.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface Props {}

export const Dropdown: FCWithChildren<Props> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
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
                <Link href="/profile">
                  <a className={styles.dropdownOption}>
                    <div className={clsx(styles.menuItem, router.pathname === '/profile' && styles.menuItemActive)}>
                      <span className="geecko-profile-layout__menu-wrapper-link-title geecko-profile-layout__menu-wrapper-link-title--dropdown m-l-8">
                        Profile
                      </span>
                    </div>
                  </a>
                </Link>
              </li>

              <Arrow {...arrowProps} backgroundColor="var(--surface-two)" />
            </motion.ul>
          )}
        </AnimatePresence>,
      )}
    </div>
  );
};
