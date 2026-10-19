'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useContext, useMemo } from 'react';

import { AuthContext } from '@/entities/authorization/auth-context';
import { Dropdown } from '@/shared/components/dropdown';
import { ProfileIcon } from '@/shared/icons/ProfileIcon';
import { WalletIcon } from '@/shared/icons/WalletIcon';
import { WishListIcon } from '@/shared/icons/WishListIcon';
import { AVATAR_EMPTY } from '@/shared/utils/constants';

import styles from './Header.module.css';

export const Header: FC = () => {
  const pathname = usePathname();
  const auth = useContext(AuthContext);

  const avatarStyle = useMemo(
    () => ({
      backgroundImage: `url("${AVATAR_EMPTY}")`,
    }),
    [],
  );

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="w-full bg-white px-12 py-3 flex items-center justify-between">
      <div className="flex w-full">
        <Link href="/" className="flex items-center">
          <img src="/images/wish-list-logo.jpg" alt="logo" className={styles.logo} />
          <span className="font-bold">Wishlist</span>
        </Link>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-12 ml-20">
            <Link
              href="/wish-list"
              className={clsx(
                'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
                pathname === '/wish-list' && 'bg-[#edeef0]',
              )}
            >
              <WishListIcon />
              Wishlist
            </Link>
            <Link
              href="/profile"
              className={clsx(
                'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
                pathname === '/profile' && 'bg-[#edeef0]',
              )}
            >
              <ProfileIcon />
              Profile
            </Link>
            <Link
              href="/budget"
              className={clsx(
                'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
                pathname === '/budget' && 'bg-[#edeef0]',
              )}
            >
              <WalletIcon />
              Budget
            </Link>
            <Link
              href="/ideas"
              className={clsx(
                'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
                pathname === '/ideas' && 'bg-[#edeef0]',
              )}
            >
              <WalletIcon />
              Ideas
            </Link>
          </div>
          <button onClick={handleLogout} className="text-red-400 text-sm">
            Logout
          </button>
        </div>
      </div>
      <div>
        <Dropdown>
          <img alt="" style={avatarStyle} className="w-6 h-6 rounded-full" />
        </Dropdown>
      </div>
    </div>
  );
};
