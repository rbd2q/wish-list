'use client';

import { Fragment, useContext } from 'react';

import { AuthContext } from '@/entities/session';
import { Brand } from '@/shared/ui/brand';

import styles from './navigation.module.scss';
import { MobileNavigation, NavigationMenu } from './ui';

export const Navigation = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <aside className={styles.sidebar} aria-label="Sidebar">
        <div className={styles.header_brand}>
          <Brand />
        </div>
        <NavigationMenu onLogout={handleLogout} />
      </aside>
      <MobileNavigation onLogout={handleLogout} />
    </Fragment>
  );
};
