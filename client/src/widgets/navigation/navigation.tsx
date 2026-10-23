'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useContext } from 'react';

import { AuthContext } from '@/entities/session';
import { navigationConfig } from '@/shared/config/navigation';
import { Brand } from '@/shared/ui/brand';

import styles from './navigation.module.scss';
import { MobileNavigation, NavigationMenu } from './ui';

export const Navigation = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace(navigationConfig.auth);
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
