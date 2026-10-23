'use client';

import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Brand } from '@/shared/ui/brand';

import { NavigationMenu } from '../navigation-menu';
import styles from './mobile-navigation.module.scss';

interface MobileNavigationProps {
  onLogout: () => void;
}

export const MobileNavigation = ({ onLogout }: MobileNavigationProps) => {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDialogElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    menuRef.current?.close();
  };

  const openMenu = () => {
    menuRef.current?.showModal();
    setIsMenuOpen(true);
  };

  const handleLogout = () => {
    closeMenu();
    onLogout();
  };

  useEffect(() => {
    // Also close on browser back/forward and programmatic navigation.
    menuRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = () => {
      if (desktopQuery.matches) menuRef.current?.close();
    };

    desktopQuery.addEventListener('change', handleResize);

    return () => desktopQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <Fragment>
      <header className={styles.header}>
        <Brand />
        <button
          type="button"
          className={styles.header_toggle}
          onClick={openMenu}
          aria-label="Open navigation"
          aria-expanded={isMenuOpen}>
          <Menu aria-hidden="true" />
        </button>
      </header>
      <dialog
        ref={menuRef}
        id="mobile-navigation"
        aria-label="Navigation"
        className={styles.menu}
        onClose={() => setIsMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}>
        <div className={styles.menu_content}>
          <div className={styles.menu_heading}>
            <Brand onNavigate={closeMenu} />
            <button
              type="button"
              className={styles.header_toggle}
              onClick={closeMenu}
              aria-label="Close navigation"
              autoFocus>
              <X aria-hidden="true" />
            </button>
          </div>
          <NavigationMenu onNavigate={closeMenu} onLogout={handleLogout} />
        </div>
      </dialog>
    </Fragment>
  );
};
