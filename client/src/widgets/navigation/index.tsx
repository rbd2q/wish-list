'use client';

import { useContext } from 'react';

import { AuthContext } from '@/entities/authorization/auth-context';
import { Brand } from '@/shared/components/brand';

import styles from './navigation.module.scss';
import { MobileNavigation } from './ui/mobile-navigation';
import { NavigationMenu } from './ui/navigation-menu';

export const Navigation = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <aside className={styles.sidebar} aria-label="Sidebar">
        <div className={styles.header_brand}>
          <Brand />
        </div>
        <NavigationMenu onLogout={auth.logout} />
      </aside>
      <MobileNavigation onLogout={auth.logout} />
    </>
  );
};
